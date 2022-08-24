// import type { SessionData } from 'express-session';
import { io, ws } from 'src/connection/io';
import { ClientSession, SetSess, UseSess } from 'src/util/util';
import { v4 } from 'uuid';

io.on(ws.on.connect, (s) => {
  console.log(s.rooms);

  s.on(ws.socket.on.join, async (cs: ClientSession) => {
    console.log('pong');

    SetSess(cs, (session) => {
      if (session.match && s.rooms.has(session.match)) {
        console.log('user already joined:', session.match);
        console.log(s.rooms);
      } else {
        session.match = v4();

        s.join(session.match);
        console.log(session.match + ' joined');
        console.log(s.rooms);
      }
    });
  });

  // delete
  s.on(ws.socket.on.leave, (cs: ClientSession) => {
    SetSess(cs, (session) => {
      if (session && session.match) {
        s.leave(session.match);
        session.match = undefined;

        console.log('user left the room');
        console.log(s.rooms);
      } else {
        console.log('no room');
        console.log(s.rooms);
      }
    });
  });

  s.on('clients', (cs: ClientSession) => {
    UseSess(cs, async (session) => {
      if (session && session.match) {
        const clients = await io.in(session.match).allSockets();
        console.log('clients', clients);
      }
    });
  });
});
