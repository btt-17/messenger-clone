const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require('dotenv')

dotenv.config()
const router = require('./routes');
const cors = require('cors');
const database = require('./database');
const server = require('http').Server(app);
const socket = require('./socket');

database.connectToServer();
// Socket
const socketIO = require('socket.io')(server, {
    cors: {
        origin: true,
    }
})

socket(socketIO);

// server
server.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());

    app.use('/', router);
})


