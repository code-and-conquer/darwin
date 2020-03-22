import WebSocket from 'ws';
import hyperid from 'hyperid';
import { UserContext, UserContextId } from '../../darwin-types/UserContext';
import { ConnectionId, createStore, UserEntry } from './ServerStore';
import performTick from './game-engine';
import { Message } from '../../darwin-types/messages/Message';
import { ScriptUpdate } from '../../darwin-types/messages/ScriptUpdate';
import { MatchUpdate } from '../../darwin-types/messages/MatchUpdate';
import GAME_OBJECT_TYPES from './constants/gameObjects';
import { Unit } from '../../darwin-types/game-objects/Unit';
import { ConnectionInitialization } from '../../darwin-types/messages/ConnectionInitialization';

export const TICK_INTERVAL = 2000;

/**
 * Main controller, which handles new connections and stores match data and other server data.
 */
export default class MainController {
  private hyperIdInstance = hyperid();

  private store = createStore();

  private isTicking = false;

  private tickingInterval: NodeJS.Timeout;

  newConnection(ws: WebSocket, requestedConnectionId: ConnectionId): void {
    const connectionId = this.getConnectionId(requestedConnectionId);
    MainController.sendConnectionId(ws, connectionId);

    ws.on('message', this.getMessageListener(connectionId));

    const userId: UserContextId = connectionId;
    const userContext = this.store.userContexts.userContextMap[userId];

    if (userContext === undefined) {
      this.addNewUserContext(ws, userId);
    } else {
      userContext.connections.push(ws);
    }

    if (!this.isTicking) {
      this.startTicking();
    }
  }

  /**
   * Looks up the connection id in the store.
   * It returns the found connectionId or generates a new one respectively.
   * @param requestedConnectionId The connection id the client requests
   */
  private getConnectionId(requestedConnectionId: string): ConnectionId {
    if (
      requestedConnectionId &&
      this.store.userContexts.userContextIds.includes(requestedConnectionId)
    ) {
      return requestedConnectionId;
    }
    return this.hyperIdInstance();
  }

  private static sendConnectionId(ws: WebSocket, connectionId: string): void {
    const message: ConnectionInitialization = {
      type: 'connectionInitialization',
      payload: {
        connectionId,
      },
    };
    ws.send(JSON.stringify(message));
  }

  private getMessageListener(connectionId: string) {
    return (data: string): void => {
      const message = JSON.parse(data) as Message;
      switch (message.type) {
        case 'scriptUpdate':
          this.handleUserScript(connectionId, message as ScriptUpdate);
          break;
        default:
          break;
      }
    };
  }

  private addNewUserContext(ws: WebSocket, userId: string): void {
    const unit = this.generateUnit();
    this.addUnitToMatchState(unit);
    const userCtx: UserEntry = {
      userContext: {
        unitId: unit.id,
        userScript: {
          script: '',
        },
      },
      connections: [ws],
    };
    this.addUserEntryToStore(userId, userCtx);
  }

  private addUserEntryToStore(userId: string, userCtx: UserEntry): void {
    this.store.userContexts.userContextMap[userId] = userCtx;
    this.store.userContexts.userContextIds.push(userId);
  }

  private addUnitToMatchState(unit: Unit): void {
    this.store.matchState.objectMap[unit.id] = unit;
    this.store.matchState.objectIds.push(unit.id);
  }

  generateUnit(): Unit {
    return {
      id: this.hyperIdInstance(),
      type: GAME_OBJECT_TYPES.UNIT,
      health: 100,
      position: {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      },
    };
  }

  handleUserScript(userContextId: UserContextId, message: ScriptUpdate): void {
    this.updateUserScript(userContextId, message.payload.script);
  }

  updateUserScript(userContextId: UserContextId, script: string): void {
    this.store.userContexts.userContextMap[
      userContextId
    ].userContext.userScript.script = script;
  }

  private startTicking(): void {
    this.isTicking = true;
    this.tickingInterval = setInterval(this.getTickExecutor(), TICK_INTERVAL);
  }

  private getTickExecutor() {
    return (): void => {
      this.performTick();
      this.notifyUsers();
    };
  }

  private notifyUsers(): void {
    this.store.userContexts.userContextIds
      .map(id => this.store.userContexts.userContextMap[id])
      .forEach(userEntry => {
        const matchUpdate = this.generateMatchUpdate(
          MainController.getPlainUserContext(userEntry.userContext)
        );
        userEntry.connections.forEach(ws => {
          ws.send(JSON.stringify(matchUpdate));
        });
      });
  }

  private static getPlainUserContext(userContext: UserContext): UserContext {
    return {
      unitId: userContext.unitId,
    };
  }

  private generateMatchUpdate(userContext: UserContext): MatchUpdate {
    return {
      type: 'matchUpdate',
      payload: {
        state: this.store.matchState,
        userContext,
        meta: {
          currentTick: this.store.currentTick,
        },
      },
    };
  }

  private performTick(): void {
    this.store.currentTick++;
    const userContexts = this.store.userContexts.userContextIds
      .map(id => this.store.userContexts.userContextMap[id])
      .map(userEntry => userEntry.userContext);
    this.store.matchState = performTick(this.store.matchState, userContexts);
  }

  private stopTicking(): void {
    clearInterval(this.tickingInterval);
  }
}
