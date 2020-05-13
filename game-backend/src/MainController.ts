import WebSocket, { OPEN } from 'ws';
import {
  MatchUpdate,
  Message,
  ScriptUpdate,
  UserId,
  RoleRequest,
  Role,
} from '@darwin/types';
import GameController from './GameController';
import { createServerStore } from './createServerStore';

// time until a new game will be started after previous one terminated
export const GAME_RESTART_TIME = 10000;

export default class MainController {
  private store = createServerStore();

  private gameController: GameController | null = null;

  private isRestartingGame = false;

  newConnection(ws: WebSocket, userId: UserId): void {
    ws.on('message', this.getMessageListener(userId));

    const userConnection = this.store.userConnnections.userConnectionMap[
      userId
    ];

    if (userConnection === undefined) {
      this.storeNewUserConnection(ws, userId);
    } else {
      userConnection.connections.push(ws);
    }
  }

  private getTickNotificationExecutor(): (matchUpdate: MatchUpdate) => void {
    return (matchUpdate: MatchUpdate): void => {
      const spectators = this.getSpectators();
      spectators.forEach(userId => {
        return this.sendMatchUpdateToUser(userId, matchUpdate);
      });
    };
  }

  private getMatchUpdateExecutor(): (
    userId: UserId,
    matchUpdate: MatchUpdate
  ) => void {
    return (userId: UserId, matchUpdate: MatchUpdate): void => {
      return this.sendMatchUpdateToUser(userId, matchUpdate);
    };
  }

  private sendMatchUpdateToUser(
    userId: UserId,
    matchUpdate: MatchUpdate
  ): void {
    this.store.userConnnections.userConnectionMap[userId].connections.forEach(
      ws => {
        ws.send(JSON.stringify(matchUpdate));
      }
    );
  }

  private filterUsersByRole(role: Role): UserId[] {
    return this.store.userConnnections.userConnectionIds.filter(id => {
      return this.store.userConnnections.userConnectionMap[id].role === role;
    });
  }

  private getSpectators(): UserId[] {
    return this.filterUsersByRole(Role.SPECTATOR);
  }

  private getPlayers(): UserId[] {
    return this.filterUsersByRole(Role.PLAYER);
  }

  private startGame(): void {
    const playerIds = this.getPlayers();

    this.gameController = new GameController(
      playerIds,
      this.getMatchUpdateExecutor(),
      this.getTickNotificationExecutor(),
      this.getTerminateExecutor()
    );
  }

  private getTerminateExecutor(): () => void {
    return (): void => {
      this.gameController = null;
      this.isRestartingGame = true;
      setTimeout(() => {
        this.isRestartingGame = false;
        this.removeInactiveUsers();

        this.checkMatch();
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
      ].connections.some((ws: WebSocket) => {
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
        case 'roleRequest':
          this.handleRoleRequest(userId, message as RoleRequest);
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

  private handleRoleRequest(userId: string, message: RoleRequest): void {
    const { newRole } = message.payload;
    this.store.userConnnections.userConnectionMap[userId].role = newRole;

    if (!this.isRestartingGame) {
      this.checkMatch();
    }
  }

  private checkMatch(): void {
    if (this.gameController === null && this.getPlayers().length > 1) {
      this.startGame();
    }
  }

  private storeNewUserConnection(ws: WebSocket, userId: UserId): void {
    this.store.userConnnections.userConnectionMap[userId] = {
      connections: [ws],
      role: Role.SPECTATOR,
    };
    this.store.userConnnections.userConnectionIds.push(userId);
  }
}
