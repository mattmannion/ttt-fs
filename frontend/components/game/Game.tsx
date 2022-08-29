import type { Socket } from 'socket.io-client';
import { useEffect, useRef } from 'react';

interface GameProps {
  socket: Socket;
}

export function Game({ socket }: GameProps) {
  const cell_1 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_2 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_3 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_4 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_5 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_6 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_7 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_8 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_9 = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    socket.on('clear_cells', (arg) => {
      cell_1.current.innerText = arg;
      cell_2.current.innerText = arg;
      cell_3.current.innerText = arg;
      cell_4.current.innerText = arg;
      cell_5.current.innerText = arg;
      cell_6.current.innerText = arg;
      cell_7.current.innerText = arg;
      cell_8.current.innerText = arg;
      cell_9.current.innerText = arg;
    });

    socket.on('cell_1', (arg) => (cell_1.current.innerText = arg));
    socket.on('cell_2', (arg) => (cell_2.current.innerText = arg));
    socket.on('cell_3', (arg) => (cell_3.current.innerText = arg));
    socket.on('cell_4', (arg) => (cell_4.current.innerText = arg));
    socket.on('cell_5', (arg) => (cell_5.current.innerText = arg));
    socket.on('cell_6', (arg) => (cell_6.current.innerText = arg));
    socket.on('cell_7', (arg) => (cell_7.current.innerText = arg));
    socket.on('cell_8', (arg) => (cell_8.current.innerText = arg));
    socket.on('cell_9', (arg) => (cell_9.current.innerText = arg));

    return () => {
      socket.off('clear_cells');

      socket.off('cell_1');
      socket.off('cell_2');
      socket.off('cell_3');
      socket.off('cell_4');
      socket.off('cell_5');
      socket.off('cell_6');
      socket.off('cell_7');
      socket.off('cell_8');
      socket.off('cell_9');
    };
  }, [socket]);

  return (
    <div className='game'>
      <div className='game__ticker'>ticker</div>
      <button onClick={() => socket.emit('clear_cells')}>clear</button>
      <div className='game__board'>
        <div
          className='game__board-cell'
          ref={cell_1}
          onClick={() => {
            cell_1.current.innerText.length === 0 && socket.emit('cell_1', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_2}
          onClick={() => {
            cell_2.current.innerText.length === 0 && socket.emit('cell_2', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_3}
          onClick={() => {
            cell_3.current.innerText.length === 0 && socket.emit('cell_3', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_4}
          onClick={() => {
            cell_4.current.innerText.length === 0 && socket.emit('cell_4', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_5}
          onClick={() => {
            cell_5.current.innerText.length === 0 && socket.emit('cell_5', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_6}
          onClick={() => {
            cell_6.current.innerText.length === 0 && socket.emit('cell_6', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_7}
          onClick={() => {
            cell_7.current.innerText.length === 0 && socket.emit('cell_7', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_8}
          onClick={() => {
            cell_8.current.innerText.length === 0 && socket.emit('cell_8', 'X');
          }}
        />
        <div
          className='game__board-cell'
          ref={cell_9}
          onClick={() => {
            cell_9.current.innerText.length === 0 && socket.emit('cell_9', 'X');
          }}
        />
      </div>
    </div>
  );
}
