
import io from "socket.io-client";
import { SOCKET_URL } from './servers';

export const socket = io(SOCKET_URL,{
    transports: [ "websocket" ],
    upgrade:false
});