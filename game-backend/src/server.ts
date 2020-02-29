import http from 'http';
import WebSocket from 'ws';
import MainController from './MainController';

// initialize server
const server = http.createServer();
const WSServer = new WebSocket.Server({
  server,
});

WSServer.on('connection', (ws) => {
  MainController.newConnection(ws);
});

// start server
server.listen(8080, '0.0.0.0');
