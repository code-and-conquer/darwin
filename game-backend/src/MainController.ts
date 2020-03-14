import WebSocket from 'ws';
import hyperid from 'hyperid';
import { GameObject } from '../../darwin-types/GameObject';
import {
  UserContextId,
  UserExecutionContext,
} from '../../darwin-types/UserContext';
import { ConnectionId, createStore } from './ServerStore';
import { MatchUpdate } from '../../darwin-types/messages/MatchUpdate';
import performTick from './game-engine';
import { Message } from '../../darwin-types/messages/Message';
import { ScriptUpdate } from '../../darwin-types/messages/ScriptUpdate';

export const TICK_INTERVAL = 2000;

/**
 * Main controller, which handles new connections and stores match data and other server data.
 */
export default class MainController {
  private hyperIdInstance = hyperid();

  private store = createStore();

  private isTicking = false;

  private tickingInterval: NodeJS.Timeout;

  newConnection(ws: WebSocket, connectionId: ConnectionId): void {
    this.store.connections.push([connectionId, ws]);

    ws.on('message', (data: string) => {
      const message = JSON.parse(data) as Message;
      switch (message.type) {
        case 'scriptUpdate':
          this.handleUserScript(connectionId, message as ScriptUpdate);
          break;
        default:
          break;
      }
    });

    // generate a unit
    const unitId = this.hyperIdInstance();
    const unit: GameObject = {
      id: unitId,
      position: {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      },
    };

    // add it to the match state
    this.store.matchState.objectMap[unit.id] = unit;
    this.store.matchState.objectIds.push(unit.id);

    // add the generated unit to the user context
    const userCtx: UserExecutionContext = {
      unitId,
      userScript: {
        script: '',
      },
    };
    this.store.userContexts.userContextMap[connectionId] = userCtx;
    this.store.userContexts.userContextIds.push(connectionId);

    if (!this.isTicking && this.store.connections.length) {
      this.startTicking();
    }
  }

  handleUserScript(userContextId: UserContextId, message: ScriptUpdate): void {
    this.updateUserScript(userContextId, message.payload.script);
  }

  updateUserScript(userContextId: UserContextId, script: string): void {
    this.store.userContexts.userContextMap[
      userContextId
    ].userScript.script = script;
  }

  private startTicking(): void {
    this.isTicking = true;
    this.tickingInterval = setInterval(() => {
      const matchUpdate = this.generateMatchUpdate();
      for (const [, ws] of this.store.connections) {
        ws.send(JSON.stringify(matchUpdate));
      }
    }, TICK_INTERVAL);
  }

  private generateMatchUpdate(): MatchUpdate {
    this.store.currentTick++;
    const userContexts = this.store.userContexts.userContextIds.map(
      id => this.store.userContexts.userContextMap[id]
    );
    this.store.matchState = performTick(this.store.matchState, userContexts);
    return {
      type: 'matchUpdate',
      payload: {
        state: this.store.matchState,
        meta: {
          currentTick: this.store.currentTick,
        },
      },
    };
  }

  private stopTicking(): void {
    clearInterval(this.tickingInterval);
  }
}
