import WebSocket from 'ws';
import hyperid from 'hyperid';
import { GameObject } from '../../darwin-types/GameObject';
import { UserContext } from '../../darwin-types/UserContext';
import store from './Store';

const hyperIdInstance = hyperid();

export default class MainController {
  static newConnection(ws: WebSocket, id: string): void {
    const unitId = hyperIdInstance();

    const userCtx: UserContext = { unitId };

    store.userContextMap[id] = userCtx;
    store.userContextIds.push(id);

    const unit: GameObject = {
      id: unitId,
      position: {
        x: Math.floor(Math.random() * 21),
        y: Math.floor(Math.random() * 21),
      },
    };
    ws.send(JSON.stringify(unit));
  }

  static newMessage(msg: any, ws: WebSocket, id: string) {
    ws.send(`got message ${msg}`);
  }
}
