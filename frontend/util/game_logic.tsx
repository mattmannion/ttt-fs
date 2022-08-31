import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

const X = 'X';
const O = 'O';

export function WinCond(
  cell_1: MutableRefObject<HTMLDivElement>,
  cell_2: MutableRefObject<HTMLDivElement>,
  cell_3: MutableRefObject<HTMLDivElement>,
  cell_4: MutableRefObject<HTMLDivElement>,
  cell_5: MutableRefObject<HTMLDivElement>,
  cell_6: MutableRefObject<HTMLDivElement>,
  cell_7: MutableRefObject<HTMLDivElement>,
  cell_8: MutableRefObject<HTMLDivElement>,
  cell_9: MutableRefObject<HTMLDivElement>,
  win: boolean,
  setWin: Dispatch<SetStateAction<boolean>>,
  result: string,
  setResult: Dispatch<SetStateAction<string>>,
  socket: Socket
) {
  const c1 = cell_1.current.innerText;
  const c2 = cell_2.current.innerText;
  const c3 = cell_3.current.innerText;
  const c4 = cell_4.current.innerText;
  const c5 = cell_5.current.innerText;
  const c6 = cell_6.current.innerText;
  const c7 = cell_7.current.innerText;
  const c8 = cell_8.current.innerText;
  const c9 = cell_9.current.innerText;

  if (win) {
    if (
      //left to right   [top]
      (c1 === X && c2 === X && c3 === X) ||
      //left to right   [middle]
      (c4 === X && c5 === X && c6 === X) ||
      //left to right   [bottom]
      (c7 === X && c8 === X && c9 === X) ||
      //top left to bottom right [diagonal]
      (c1 === X && c5 === X && c9 === X) ||
      //bottom left to top right [diagonal]
      (c7 === X && c5 === X && c3 === X) ||
      //top to bottom   [left]
      (c1 === X && c4 === X && c7 === X) ||
      //top to bottom   [middle]
      (c2 === X && c5 === X && c8 === X) ||
      //top to bottom   [right]
      (c3 === X && c6 === X && c9 === X)
    ) {
      //     console.log(
      //       `
      // /////////////////////////////
      // ////////// X Wins! //////////
      // /////////////////////////////
      //   `
      //     );

      setResult('X');
      setWin(false);

      //
    } else if (
      //left to right   [top]
      (c1 === O && c2 === O && c3 === O) ||
      //left to right   [middle]
      (c4 === O && c5 === O && c6 === O) ||
      //left to right   [bottom]
      (c7 === O && c8 === O && c9 === O) ||
      //top left to bottom right [diagonal]
      (c1 === O && c5 === O && c9 === O) ||
      //bottom left to top right [diagonal]
      (c7 === O && c5 === O && c3 === O) ||
      //top to bottom   [left]
      (c1 === O && c4 === O && c7 === O) ||
      //top to bottom   [middle]
      (c2 === O && c5 === O && c8 === O) ||
      //top to bottom   [right]
      (c3 === O && c6 === O && c9 === O)
    ) {
      //     console.log(
      //       `
      // /////////////////////////////
      // ////////// O Wins! //////////
      // /////////////////////////////
      //   `
      //     );

      setResult('O');
      setWin(false);

      //
    } else if (
      c1 !== '' &&
      c2 !== '' &&
      c3 !== '' &&
      c4 !== '' &&
      c5 !== '' &&
      c6 !== '' &&
      c7 !== '' &&
      c8 !== '' &&
      c9 !== ''
    ) {
      //     console.log(
      //       `
      // /////////////////////////////
      // ///////// Tie Game! /////////
      // /////////////////////////////
      //   `
      //     );

      setResult('Tie');
      setWin(false);

      //
    }
  } else {
    if (result === X) socket.emit('ticker', 'X Wins!');
    else if (result === O) socket.emit('ticker', 'O Wins!');
    else socket.emit('ticker', "It's a tie...");
  }
}
