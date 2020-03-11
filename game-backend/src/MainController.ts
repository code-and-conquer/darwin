import WebSocket from 'ws';
import hyperid from 'hyperid';
import { GameObject } from '../../darwin-types/GameObject';
import { UserContext } from '../../darwin-types/UserContext';
import { ServerStore, createStore } from './ServerStore';

/**
 * Main controller, which handles new connections and stores match data and other server data.
 */
export default class MainController {
  private hyperIdInstance: hyperid.Instance = hyperid();

  private store: ServerStore = createStore();

  private isTicking = false;

  private tickingInterval: NodeJS.Timeout;

  newConnection(ws: WebSocket, connectionId: string): void {
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
      this.store.matchState.tick++;
      for (const [, ws] of this.store.connections) {
        ws.send(JSON.stringify(this.store.matchState));
      }
    }, 2000);
  }

  private stopTicking(): void {
    clearInterval(this.tickingInterval);
  }
}
