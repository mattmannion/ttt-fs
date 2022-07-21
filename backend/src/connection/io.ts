import { cfg } from 'src/util/env';
import { app } from 'src/server';

import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: <string[]>[...cfg.cors.whitelist].filter((f) => f),
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.emit('gamers', 'hello');
});

export { io, server };
