const http = require('http');
const io = require('socket.io')();

const RpsGame = require('./rps-game')

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

io.listen(process.env.PORT);