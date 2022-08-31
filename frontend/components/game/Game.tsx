import type { Socket } from 'socket.io-client';
import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { WinCond } from '/util/game_logic';

interface GameProps {
  socket: Socket;
}

function setFirstPlayer() {
  return Math.trunc(Math.random() * 2) === 1 ? 'O' : 'X';
}

export function Game({ socket }: GameProps) {
  const tickerRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const cell_1 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_2 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_3 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_4 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_5 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_6 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_7 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_8 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const cell_9 = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [player, setPlayer] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [win, setWin] = useState<boolean>(true);

  const win_cond = () =>
    WinCond(
      cell_1,
      cell_2,
      cell_3,
      cell_4,
      cell_5,
      cell_6,
      cell_7,
      cell_8,
      cell_9,
      win,
      setWin,
      result,
      setResult,
      socket
    );

  function game_loop(
    cell: MutableRefObject<HTMLDivElement>,
    num: number,
    player: string
  ) {
    const to = setTimeout(() => win_cond(), 10);
    if (win) {
      if (cell.current.innerText.length === 0) {
        socket.emit('cell_' + num, player);

        setPlayer(player === 'X' ? 'O' : 'X');
        socket.emit('ticker', `It's ${player === 'X' ? 'O' : 'X'}'s turn!`);

        win_cond();
      } else clearTimeout(to);
    }
  }

  useEffect(() => {
    socket.on('reset_game', (arg) => {
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

    socket.on('ticker', (arg) => (tickerRef.current.innerText = arg));

    socket.on('cell_1', (arg) => (cell_1.current.innerText = arg));
    socket.on('cell_2', (arg) => (cell_2.current.innerText = arg));
    socket.on('cell_3', (arg) => (cell_3.current.innerText = arg));
    socket.on('cell_4', (arg) => (cell_4.current.innerText = arg));
    socket.on('cell_5', (arg) => (cell_5.current.innerText = arg));
    socket.on('cell_6', (arg) => (cell_6.current.innerText = arg));
    socket.on('cell_7', (arg) => (cell_7.current.innerText = arg));
    socket.on('cell_8', (arg) => (cell_8.current.innerText = arg));
    socket.on('cell_9', (arg) => (cell_9.current.innerText = arg));

    setPlayer(setFirstPlayer());
    if (result.length > 0) win_cond();

    return () => {
      socket.off('reset_game');

      socket.off('ticker');

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
  }, [socket, result, win]);

  return (
    <div className='game'>
      <div className='game__ticker' ref={tickerRef}>
        Player {player} goes first
      </div>
      <button
        onClick={() => {
          socket.emit('reset_game');

          setPlayer(setFirstPlayer());
          socket.emit('ticker', 'Player ' + player + ' goes first');

          setResult('');
          setWin(true);
        }}
      >
        reset
      </button>
      <div className='game__board'>
        <div
          className='game__board-cell'
          ref={cell_1}
          onClick={() => game_loop(cell_1, 1, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_2}
          onClick={() => game_loop(cell_2, 2, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_3}
          onClick={() => game_loop(cell_3, 3, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_4}
          onClick={() => game_loop(cell_4, 4, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_5}
          onClick={() => game_loop(cell_5, 5, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_6}
          onClick={() => game_loop(cell_6, 6, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_7}
          onClick={() => game_loop(cell_7, 7, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_8}
          onClick={() => game_loop(cell_8, 8, player)}
        />
        <div
          className='game__board-cell'
          ref={cell_9}
          onClick={() => game_loop(cell_9, 9, player)}
        />
      </div>
    </div>
  );
}
