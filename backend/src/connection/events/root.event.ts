import { io, ws } from 'src/connection/io';
import { v4 } from 'uuid';

let state = {
  msg: 'msg',
  gamers: 'gamers',
  counter: 0,
  room: '',
};

io.on(ws.on.connect, (s) => {
  console.log('connection');

  state.room = v4();

  s.on(ws.socket.on.gamers, () => {
    io.emit(ws.socket.emit.gamers, { msg: 'gamers', room: state.room });
  });

  s.on(ws.socket.on.msg, (msg: string) => {
    state.msg = msg;

    // io.emit(ws.socket.emit.gamers, {
    //   msg: state.msg + ' ' + state.counter++,
    //   room: state.room,
    // });
  });

  s.on('room', (room) => {
    s.join(room);
    console.log('2nd thread', s.rooms.has(state.room));
  });

  s.on(ws.on.disconnect, () => {
    console.log('connection lost');
  });
});

// io.sockets.on('connection', (s) => {
// });
