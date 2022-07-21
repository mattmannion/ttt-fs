import { io } from 'socket.io-client';

const socket = io('ws://localhost:7890');

socket.on('gamers', (arg) => {
  console.log(arg);
});

export default function Home() {
  return (
    <div>
      get rekt
      <div>idiot</div>
    </div>
  );
}
