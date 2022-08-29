import type { Server, Socket } from 'socket.io';
import type { ClientSession } from 'src/util/util';
import { UseSess, SetSess } from 'src/util/util';
import { v4 } from 'uuid';

export function MatchMakingThread(
  io: Server,
  socket: Socket,
  player_pool: ClientSession[]
) {
  socket.on('matchmaking', (cs: ClientSession) => {
    UseSess(cs, async (session) => {
      socket.join('waiting_room');
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
          socket.leave('waiting_room');

          socket.join(match_id);
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
}
