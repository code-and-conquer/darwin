import http from 'http';
import url from 'url';
import WebSocket from 'ws';
import { UserId } from '@darwin/types';
import MainController from './MainController';
import {
  initHeartbeatInterval,
  initHeartbeatCheck,
  WebSocketWithStatus,
} from './helper/heartbeat';

function extractUserId(req: http.IncomingMessage): UserId {
  const searchParams = new URLSearchParams(url.parse(req.url).query);
  return searchParams.get('userId');
}

// initialize server
const server = http.createServer();
const WSServer = new WebSocket.Server({
  server,
});
const mainController = new MainController();

initHeartbeatInterval(WSServer);
WSServer.on(
  'connection',
  (ws: WebSocketWithStatus, req: http.IncomingMessage) => {
    const userId = extractUserId(req);
    initHeartbeatCheck(ws);
    mainController.newConnection(ws, userId);
  }
);

// start server
server.listen(8080, '0.0.0.0');
