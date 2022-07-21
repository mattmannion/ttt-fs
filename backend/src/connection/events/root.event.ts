import { io, ws } from 'src/connection/io';

let state = {
  msg: 'msg',
  gamers: 'gamers',
  counter: 0,
};

io.on(ws.on.connect, (s) => {
  console.log('connection');

  s.on(ws.socket.on.msg, (msg: string) => {
    state.msg = msg;
    io.emit(ws.socket.emit.gamers, state.msg + ' ' + state.counter++);
  });

  s.on(ws.on.disconnect, () => {
    console.log('connection lost');
  });
});
