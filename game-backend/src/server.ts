import http from 'http';
import url from 'url';
import WebSocket from 'ws';
import MainController from './MainController';
import { ConnectionId } from './ServerStore';

function extractConnectionId(req: http.IncomingMessage): ConnectionId {
  const searchParams = new URLSearchParams(url.parse(req.url).query);
  if (searchParams.has('connectionId')) {
    return searchParams.get('connectionId');
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
  const connectionId = extractConnectionId(req);
  mainController.newConnection(ws, connectionId);
});

// start server
server.listen(8080, '0.0.0.0');
