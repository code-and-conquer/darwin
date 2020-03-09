import WebSocket from 'ws';
import hyperid from 'hyperid';
import { GameObject } from '../../darwin-types/GameObject';
import { UserContext } from '../../darwin-types/UserContext';
import { ServerStore, createStore } from './ServerStore';

/**
 * Main controller, which handles new connections and stores match data and other server data.
 */
export default class MainController {
  private static hyperIdInstance: hyperid.Instance = hyperid();

  private static store: ServerStore = createStore();

  private static isTicking = false;

  static tickingInterval: NodeJS.Timeout;

  static newConnection(ws: WebSocket, connectionId: string): void {
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

  static newMessage(msg: WebSocket.Data, ws: WebSocket, id: string): void {
    ws.send(`got message ${msg} from ${id}`);
  }

  static startTicking(): void {
    this.isTicking = true;
    this.tickingInterval = setInterval(() => {
      this.store.matchState.tick++;
      for (const [id, ws] of this.store.connections) {
        ws.send(`Hello ${id}`);
        ws.send(JSON.stringify(this.store.matchState));
      }
    }, 2000);
  }

  static stopTicking(): void {
    clearInterval(this.tickingInterval);
  }
}
