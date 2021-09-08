
import io from "socket.io-client";
import { SOCKET_URL,CHAT_SOCKET_URL } from './servers';

export const socket = io(SOCKET_URL,{
    transports: [ "websocket" ],
    upgrade:false
});


export const socket2 = io(CHAT_SOCKET_URL,{
    transports: [ "websocket" ],
    upgrade:false,
    autoConnect:false
});