import 'socket.io';

declare module 'socket.io' {
  interface IncomingMessage {
    session: { [key: string]: string | undefined };
  }
}
