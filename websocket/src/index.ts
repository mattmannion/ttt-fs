import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.emit('gamers', 'hello');
});

console.log('live');
httpServer.listen(7891);
