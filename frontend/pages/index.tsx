import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:7890');
socket.emit('gamers');

export default function Home() {
  const [msg, setMsg] = useState<string>('loading');
  const [room, setRoom] = useState<string>('loading');

  useEffect(() => {
    // socket = io('ws://localhost:7890');
    const fn = (arg: any) => {
      setMsg(arg.room);
      setRoom(arg.room);
    };

    socket.on('gamers', fn);
    return () => {
      socket.off('gamers', fn);
    };
  }, []);

  console.log('room id:', room);

  return (
    <div>
      <div>sockets</div>
      <div>msg: {msg}</div>
      <button
        onClick={(e) => {
          e.preventDefault();

          socket.emit('msg', 'from next');
          if (room !== 'loading') socket.emit('room', room);
        }}
      >
        btn
      </button>
    </div>
  );
}
