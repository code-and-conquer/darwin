import WebSocket from 'ws';
import hyperid from 'hyperid';
import { GameObject } from '../../darwin-types/GameObject';
import { UserContext } from '../../darwin-types/UserContext';
import { ServerStore } from '../../darwin-types/ServerStore';

const hyperIdInstance = hyperid();

export default class MainController {
  private static store: ServerStore = {
    matchState: {
      objectIds: [],
      objectMap: {},
    },
    userContexts: {
      userContextIds: [],
      userContextMap: {},
    },
  };

  static newConnection(ws: WebSocket, connectionId: string): void {
    // generate a unit
    const unitId = hyperIdInstance();
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

    // send matchState to client
    ws.send(JSON.stringify(this.store.matchState));
  }

  static newMessage(msg: WebSocket.Data, ws: WebSocket, id: string): void {
    ws.send(`got message ${msg} from ${id}`);
  }
}
