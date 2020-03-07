import WebSocket from 'ws';
import hyperid from "hyperid";
import {GameObject} from "../../darwin-types/GameObject";

const hyperIdInstance = hyperid();

export default class MainController {
  static newConnection(ws: WebSocket): void {
    const unit: GameObject = {
      id: hyperIdInstance(),
      position: {
        x: Math.floor(Math.random() * (21)),
        y: Math.floor(Math.random() * (21)),
      }
    };
    ws.send(JSON.stringify(unit));
  }
}
