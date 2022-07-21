import { cfg } from 'src/util/env';
import { app } from 'src/server';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { GlobImport } from 'src/util/util';

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: <string[]>[...cfg.cors.whitelist],
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
