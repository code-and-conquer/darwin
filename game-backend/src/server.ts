import http from 'http';
import WebSocket from 'ws';
import MainController from './MainController';

// initialize server
const server = http.createServer();
const WSServer = new WebSocket.Server({
  server,
});

WSServer.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
  const connectionId = (req.headers['sec-websocket-key'] as string)
  MainController.newConnection(ws, connectionId);

  ws.on('message', (msg) => {
    MainController.newMessage(msg, ws, connectionId)
  })
});



// start server
server.listen(8080, '0.0.0.0');
