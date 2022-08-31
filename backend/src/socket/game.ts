import type { Server, Socket } from 'socket.io';

export function GameThread(io: Server, socket: Socket) {
  socket.on('reset_game', () => io.emit('reset_game', ''));

  socket.on('ticker', (arg) => io.emit('ticker', arg));

  socket.on('cell_1', (arg) => io.emit('cell_1', arg));
  socket.on('cell_2', (arg) => io.emit('cell_2', arg));
  socket.on('cell_3', (arg) => io.emit('cell_3', arg));
  socket.on('cell_4', (arg) => io.emit('cell_4', arg));
  socket.on('cell_5', (arg) => io.emit('cell_5', arg));
  socket.on('cell_6', (arg) => io.emit('cell_6', arg));
  socket.on('cell_7', (arg) => io.emit('cell_7', arg));
  socket.on('cell_8', (arg) => io.emit('cell_8', arg));
  socket.on('cell_9', (arg) => io.emit('cell_9', arg));
}
