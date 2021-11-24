const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const RpsGame = require('./rps-game')

const app = express(); //App is an object and a function, it is our listener

const clientPath = `${__dirname}/../client` ;
console.log('Serving static from', clientPath)

//We want to serve static files to the user
app.use(express.static(clientPath));

const server=http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on(`connection`, (sock) => {
    console.log('Someone connected');

    if (waitingPlayer) {
        new RpsGame(waitingPlayer, sock);
        waitingPlayer = null;
    }
    else{
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waiting for an opponent')
    }

    sock.on('message', (text) => {
        io.emit('message', text);  //io.emit sends it to everyone who is connected, including the client itself. Sock.emit only to client
    })
});

server.on('error', (err) => {
    console.error('Server error:', err);
});  //when there is an error, call this callback funciton

server.listen(8080, () => { //when it listens to 8080, the function is called
    console.log('RPS started on 8080')
});