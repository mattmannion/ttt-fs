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
    return () => {
      s.off('join');
      s.off('leave');
    };
  }, [s]);

  return (
    <div style={styles}>
      <div>sockets</div>
      <br />

      {/* form start */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post(location + '/login', {
            username: 'mm',
            password: 'mm',
          });
        }}
      >
        <button type='submit'>login mm</button>
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post(location + '/login', {
            username: 'mgr',
            password: 'mgr',
          });
        }}
      >
        <button type='submit'>login mgr</button>
      </form>
      {/* form end */}

      <div style={styles}>
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

              if (data) s.emit('join', data);
            } catch (error) {
              console.log('no user');
            }
          }}
        >
          join
        </button>

        {/* LEAVE */}
        <button
          onClick={async (e) => {
            e.preventDefault();

            try {
              const { data } = await axios.get(location + '/profile');

              if (data) s.emit('leave', data);
            } catch (error) {
              console.log('no user');
            }
          }}
        >
          leave
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();

            try {
              const { data } = await axios.get(location + '/profile');

              if (data) s.emit('clients', data);
            } catch (error) {
              console.log('no user');
            }
          }}
        >
          get clients
        </button>
      </div>
    </div>
  );
}
