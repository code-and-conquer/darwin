import WebSocket, { OPEN } from 'ws';
import { MatchUpdate, Message, ScriptUpdate, UserId } from '@darwin/types';
import GameController from './GameController';
import { createServerStore } from './createServerStore';

// time until a new game will be started after previous one terminated
export const GAME_RESTART_TIME = 10000;

export default class MainController {
  private store = createServerStore();

  private gameController: GameController;

  constructor() {
    this.gameController = new GameController(
      this.getMatchUpdateExecutor(),
      this.getTerminateExecutor()
    );
  }

  newConnection(ws: WebSocket, userId: UserId): void {
    ws.on('message', this.getMessageListener(userId));

    const userConnection = this.store.userConnnections.userConnectionMap[
      userId
    ];

    if (userConnection === undefined) {
      this.storeNewUserConnection(ws, userId);
    } else {
      userConnection.push(ws);
    }
  }

  private getMatchUpdateExecutor(): (
    userId: UserId,
    matchUpdate: MatchUpdate
  ) => void {
    return (userId: UserId, matchUpdate: MatchUpdate): void => {
      this.store.userConnnections.userConnectionMap[userId].forEach(ws => {
        ws.send(JSON.stringify(matchUpdate));
      });
    };
  }

  private getTerminateExecutor(): () => void {
    return (): void => {
      setTimeout(() => {
        this.removeInactiveUsers();

        this.gameController = new GameController(
          this.getMatchUpdateExecutor(),
          this.getTerminateExecutor()
        );
        this.store.userConnnections.userConnectionIds.forEach(id => {
          this.gameController.appendUser(id);
        });
      }, GAME_RESTART_TIME);
    };
  }

  /**
   * Remove users from store if there is not at least one connection alive
   * @private
   * @memberof MainController
   */
  private removeInactiveUsers(): void {
    this.store.userConnnections.userConnectionIds.forEach(userId => {
      const foundAliveConnections = this.store.userConnnections.userConnectionMap[
        userId
      ].some((ws: WebSocket) => {
        return ws.readyState === OPEN;
      });
      if (!foundAliveConnections) {
        this.removeStoredUser(userId);
      }
    });
  }

  private removeStoredUser(userId: UserId): void {
    this.store.userConnnections.userConnectionIds = this.store.userConnnections.userConnectionIds.filter(
      id => id !== userId
    );
    delete this.store.userConnnections.userConnectionMap[userId];
  }

  private getMessageListener(userId: string) {
    return (data: string): void => {
      const message = JSON.parse(data) as Message;
      switch (message.type) {
        case 'scriptUpdate':
          this.handleUserScript(userId, message as ScriptUpdate);
          break;
        default:
          break;
      }
    };
  }

  private handleUserScript(userContextId: UserId, message: ScriptUpdate): void {
    this.gameController.setScript(userContextId, {
      script: message.payload.script,
    });
  }

  private storeNewUserConnection(ws: WebSocket, userId: UserId): void {
    this.store.userConnnections.userConnectionMap[userId] = [ws];
    this.store.userConnnections.userConnectionIds.push(userId);
    this.gameController.appendUser(userId);
  }
}
