import WebSocket from 'ws';
import hyperid from 'hyperid';
import { GameObject } from '../../darwin-types/GameObject';
import { UserContext } from '../../darwin-types/UserContext';
import { createStore, ConnectionId } from './ServerStore';
import { MatchUpdate } from '../../darwin-types/messages/MatchUpdate';

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

    // generate a unit
    const unitId = this.hyperIdInstance();
    const unit: GameObject = {
      id: unitId,
      position: {
        x: Math.floor(Math.random() * 21),
        y: Math.floor(Math.random() * 21),
      },
    };

    // add it to the match state
    this.store.matchState.objectMap[unit.id] = unit;
    this.store.matchState.objectIds.push(unit.id);

    // add the generated unit to the user context
    const userCtx: UserContext = { unitId };
    this.store.userContexts.userContextMap[connectionId] = userCtx;
    this.store.userContexts.userContextIds.push(connectionId);

    if (!this.isTicking && this.store.connections.length) {
      this.startTicking();
    }
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
