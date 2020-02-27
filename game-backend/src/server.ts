import http from 'http';
import WebSocket from 'ws';

const server = http.createServer();
const WSServer = new WebSocket.Server({
  server,
});

/* eslint-disable no-console */
WSServer.on('connection', (ws) => {
  console.log('asdfasdf');

  ws.on('message', (message) => {
    console.log(`received ${message}`);
  });
});
/* eslint-enable no-console */
