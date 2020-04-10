/* eslint no-param-reassign: ["error", { "props": false }]*/
import WebSocket from 'ws';

export interface WebSocketWithStatus extends WebSocket {
  isAlive?: boolean;
}

export const WEBSOCKET_HEARTBEAT_INTERVAL = 3000;
let interval: NodeJS.Timeout;

function heartbeat(): void {
  this.isAlive = true;
}

export function initHeartbeatInterval(wsServer: WebSocket.Server): void {
  if (!interval) {
    interval = setInterval(() => {
      wsServer.clients.forEach((ws: WebSocketWithStatus) => {
        if (!ws.isAlive) {
          ws.terminate();
          return;
        }
        ws.isAlive = false;
        ws.ping();
      });
    }, WEBSOCKET_HEARTBEAT_INTERVAL);
    wsServer.on('close', () => {
      clearInterval(interval);
    });
  }
}

export function initHeartbeatCheck(connection: WebSocketWithStatus): void {
  connection.isAlive = true;
  connection.on('pong', heartbeat);
}
