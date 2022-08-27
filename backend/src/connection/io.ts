// import { cfg } from 'src/util/env';
import { app } from 'src/server';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GlobImport } from 'src/util/util';

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: <string[]>['http://localhost:3000'],
    credentials: true,
  },
});

// collects all emits in events and executes here
(async () => {
  const events = GlobImport({
    path: '/connection/events',
    file_ext: '.event.*',
  });

  await events;
})();

export const ws: {
  on: {
    connect: 'connect';
    disconnect: 'disconnect';
  };
  socket: {
    on: {
      gamers: 'gamers';
      msg: 'msg';
      join: 'join';
      leave: 'leave';
      matchmaking: 'matchmaking';
    };
    emit: {
      gamers: 'gamers';
      msg: 'msg';
      join: 'join';
      leave: 'leave';
    };
  };
} = {
  on: {
    connect: 'connect',
    disconnect: 'disconnect',
  },
  socket: {
    on: {
      gamers: 'gamers',
      msg: 'msg',
      join: 'join',
      leave: 'leave',
      matchmaking: 'matchmaking',
    },
    emit: {
      gamers: 'gamers',
      msg: 'msg',
      join: 'join',
      leave: 'leave',
    },
  },
};
