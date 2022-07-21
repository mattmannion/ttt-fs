import { io } from 'src/connection/io';

io.on('connection', (socket) => {
  socket.emit('gamers', 'hello');
});
