import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:7890');
export default function Home() {
  const [msg, setMsg] = useState<string>('loading');

  useEffect(() => {
    socket.on('gamers', (arg) => {
      console.log('cl', arg);

      setMsg(arg);
    });
  }, []);
  return (
    <div>
      <div>sockets</div>
      <div>msg: {msg}</div>
      <button
        onClick={(e) => {
          e.preventDefault();

          socket.emit('msg', 'from next');
        }}
      >
        btn
      </button>
    </div>
  );
}
