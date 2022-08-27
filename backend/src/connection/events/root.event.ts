import type { ClientSession } from 'src/util/util';
import { io, ws } from 'src/connection/io';
import { SetSess, UseSess } from 'src/util/util';
import { v4 } from 'uuid';

let socketinit = true;

let player_pool: ClientSession[] = [];
const waiting_room = 'waiting_room';

io.on(ws.on.connect, (s) => {
  if (socketinit) {
    console.log('socket server live');
    socketinit = false;
  }
  console.log(s.rooms);

  // waiting room
  s.on(ws.socket.on.matchmaking, (cs: ClientSession) => {
    UseSess(cs, async (session) => {
      s.join(waiting_room);
      if (!player_pool.find((f) => f.session.username === session.username)) {
        player_pool.push(cs);
        console.log(session.username + ' joined matchmaking');
        console.log('pp:', player_pool);
      } else {
        console.log(session.username + ' is matchmaking');
        console.log('pp:', player_pool);
      }

      if (player_pool.length > 1) {
        console.log('match found');

        const match_id = v4();

        player_pool.slice(0, 2).forEach((player) => {
          SetSess(player, (session) => {
            session.match_id = match_id;
          });
          console.log(player.session.username + ' left the matchmaking');
          s.leave(waiting_room);

          s.join(match_id);
        });

        player_pool = player_pool.slice(2);

        console.log('new pp:', player_pool);
        console.log(
          'players in match ' + match_id,
          await io.in(match_id).allSockets()
        );
      }
    });
  });

  s.on('clients', async (cs: ClientSession) => {
    console.log('player_pool', player_pool);
    console.log('waiting room', await io.in(waiting_room).allSockets());
    console.log('rooms', s.rooms);
    if (cs.session) {
      console.log(
        'client count',
        io.sockets.adapter.rooms.get(waiting_room)?.size
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
  s.on(ws.socket.on.leave, (cs: ClientSession) => {
    UseSess(cs, (session) => {
      if (session.username && session.sid) {
        player_pool = player_pool.filter((f) => {
          s.leave(waiting_room);
          console.log(session.username + ' left the matchmaking');
          return f === cs;
        });

        console.log('pp:', player_pool, s.rooms);
      } else {
        console.log('no room', s.rooms);
      }
    });
  });

  // leave game
  s.on('leave_game', (cs: ClientSession) => {
    SetSess(cs, (session) => {
      if (session.match_id) {
        s.leave(session.match_id);
        console.log(session.username + ' left match ' + session.match_id);
        session.match_id = undefined;
      } else console.log(session.username + ' is not in a game');
    });
  });
});
