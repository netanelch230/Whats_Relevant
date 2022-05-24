const ENDPOINT_SOCKET = 'http://192.168.1.11:3000';
import React from 'react';
import io from 'socket.io-client';
const SocketContext = React.createContext(socket);
const socket = io(ENDPOINT_SOCKET);
export {SocketContext, socket};
