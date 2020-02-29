import WebSocket from 'ws';
import Unit from './Unit';

export default class MainController {
  static newConnection(ws: WebSocket): void {
    const unit = new Unit();
    ws.send(JSON.stringify(unit));
  }
}
