import http from 'http';
import url from 'url';
import WebSocket from 'ws';
import { UserId } from '@darwin/types';
import MainController from './MainController';

function extractUserId(req: http.IncomingMessage): UserId {
  const searchParams = new URLSearchParams(url.parse(req.url).query);
  if (searchParams.has('userId')) {
    return searchParams.get('userId');
  }
  return null;
}

// initialize server
const server = http.createServer();
const WSServer = new WebSocket.Server({
  server,
});
const mainController = new MainController();

WSServer.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
  const userId = extractUserId(req);
  mainController.newConnection(ws, userId);
});

// start server
server.listen(8080, '0.0.0.0');
