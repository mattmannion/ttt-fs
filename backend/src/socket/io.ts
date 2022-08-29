// import { cfg } from 'src/util/env';
import { app } from 'src/server';
import { createServer } from 'http';
import { Server } from 'socket.io';
import type { ClientSession } from 'src/util/util';
import { SetSess, UseSess } from 'src/util/util';
import { GameThread } from 'src/socket/game';
import { MatchMakingThread } from 'src/socket/matchmaking';

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: <string[]>['http://localhost:3000'],
    credentials: true,
  },
});

let socketinit = true;

let player_pool: ClientSession[] = [];

io.on('connect', (socket) => {
  if (socketinit) {
    console.log('socket server live');
    socketinit = false;
  }
  console.log(socket.rooms);

  MatchMakingThread(io, socket, player_pool);

  GameThread(io, socket);

  socket.on('clients', async (cs: ClientSession) => {
    console.log('player_pool', player_pool);
    console.log('waiting room', await io.in('waiting_room').allSockets());
    console.log('rooms', socket.rooms);
    if (cs.session) {
      console.log(
        'client count',
        io.sockets.adapter.rooms.get('waiting_room')?.size
      );

      if (cs.session.match_id) {
        console.log(
          'players in ' + cs.session.match_id,
          io.sockets.adapter.rooms.get(cs.session.match_id)?.size
        );
      }
    }
  });

  // leave waiting room
  socket.on('leave', (cs: ClientSession) => {
    UseSess(cs, (session) => {
      if (session.username && session.sid) {
        player_pool = player_pool.filter((f) => {
          socket.leave('waiting_room');
          console.log(session.username + ' left the matchmaking');
          return f === cs;
        });

        console.log('pp:', player_pool, socket.rooms);
      } else {
        console.log('no room', socket.rooms);
      }
    });
  });

  // leave game
  socket.on('leave_game', (cs: ClientSession) => {
    SetSess(cs, (session) => {
      if (session.match_id) {
        socket.leave(session.match_id);
        console.log(session.username + ' left match ' + session.match_id);
        session.match_id = undefined;
      } else console.log(session.username + ' is not in a game');
    });
  });
});
