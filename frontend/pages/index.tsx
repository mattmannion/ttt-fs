import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:7890');

export default function Home() {
  const [msg, setMsg] = useState<string>('loading');
  const [room, setRoom] = useState<string>('loading');

  useEffect(() => {
    function fn(arg: any) {
      setMsg(arg.room);
      setRoom(arg.room);
    }

    socket.on('gamers', fn);
    socket.emit('gamers');

    console.log('room id:', room);

    return () => {
      socket.off('gamers', fn);
    };
  }, [socket]);

  return (
    <div>
      <div>sockets</div>
      <div>msg: {msg}</div>
      <button
        onClick={(e) => {
          e.preventDefault();

          socket.emit('msg', 'from next');
          socket.emit('room', room);
        }}
      >
        btn
      </button>
    </div>
  );
}
