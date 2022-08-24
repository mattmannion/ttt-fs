import axios from 'axios';
import { CSSProperties, useEffect } from 'react';
import { io } from 'socket.io-client';

const location = 'http://localhost:7890';

axios.defaults.withCredentials = true;

const styles: CSSProperties | undefined = {
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const s = io('ws://localhost:7890');

export default function Home() {
  useEffect(() => {
    s.emit('join');
    // s.emit('gamers');

    return () => {
      s.off('join');
      s.off('leave');
    };
  }, [s]);

  return (
    <div style={styles}>
      <div>sockets</div>
      <br />

      <div style={styles}>
        <button
          onClick={async () => {
            await axios.post(location + '/login', {
              username: 'mgr',
              password: 'mgr',
            });
          }}
        >
          login
        </button>
        <button
          onClick={async () => {
            try {
              await axios.delete(location + '/login');
            } catch (error) {
              console.log('no user');
            }
          }}
        >
          logout
        </button>
        <button
          onClick={async () => {
            try {
              const { data } = await axios.get(location + '/profile');

              console.log(data.session);
            } catch (err) {
              console.log('no user found');
            }
          }}
        >
          check
        </button>
      </div>
      <br />

      <div style={styles}>
        {/* JOIN */}
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              const { data } = await axios.get(location + '/profile');

              s.emit('join', data);
            } catch (error) {
              console.log('no user');
            }
          }}
        >
          join
        </button>

        {/* LEAVE */}
        <button
          onClick={(e) => {
            e.preventDefault();

            s.emit('leave');
          }}
        >
          leave
        </button>

        {/* GAMERS */}
        <button
          onClick={(e) => {
            e.preventDefault();

            s.emit('gamers');
          }}
        >
          gamers
        </button>
      </div>
    </div>
  );
}
