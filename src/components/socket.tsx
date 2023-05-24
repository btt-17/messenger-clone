import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =  'http://localhost:8000';

const socket = io(URL, {
    autoConnect: false
});

export default socket;