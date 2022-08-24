import { SessionData } from 'express-session';
import { store } from 'src/api/middleware/redis.session';
import { io, ws } from 'src/connection/io';
import { v4 } from 'uuid';

interface State {
  room_id: string;
}

let state: State = {
  room_id: '',
};

function SetSession(
  data: ClientSession,
  fn: (session: SessionData) => void
): void {
  if (data && data.session && data.session.sid) {
    const { sid } = data.session;
    store.get(sid, (_, session) => {
      if (session && session.sid) {
        fn(session);
        store.set(sid, session);
      }
    });
  }
}

interface ClientSession {
  session: SessionData | undefined;
}

io.on(ws.on.connect, (s) => {
  console.log(s.rooms);

  s.on(ws.socket.on.join, async (cs: ClientSession) => {
    console.log('pong');

    SetSession(cs, (session) => {
      session.gamers = 'gamers';
      session.thing = 'another';
    });

    // attach to new users
    // s.join(v4());

    // console.log(s.request);
  });

  // delete
  s.on(ws.socket.on.leave, () => {
    if (s.rooms.has(state.room_id)) {
      s.leave(state.room_id);

      console.log('user left the room');
      console.log(s.rooms);
    } else {
      console.log('no room');
    }
  });

  // create
  s.on(ws.socket.on.gamers, () => {
    state.room_id = v4();

    s.join(state.room_id);
    s.rooms.has(state.room_id);
    console.log(s.rooms, 'room created');
  });

  s.on(ws.on.disconnect, () => {
    console.log('disconnected');
  });
});
