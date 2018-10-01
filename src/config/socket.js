import openSocket from 'socket.io-client';
import { SOCKETS_URL } from './config';

const socket = openSocket(SOCKETS_URL);

export {
  socket
}
