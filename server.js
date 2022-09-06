// server.js
const express = require('express');
const app = express();
 
const server = app.listen(8000, () =>
  console.log('The server is all fired up on port 8000')
);
 
// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

io.on("connection", socket => {
    // NOTE:Each client that connects gets their socket id!
    console.log(socket.id);
    //if this is logged in our node terminal, that means a new client
    //has successfully completed the handshake!
    
    //We add all of our additional event listeners
    //right inside this function
    //NOTE "connection" is a BUILD IN event listeners

    console.log('Nice to meet you: Socket ID:', socket.id, ' **handshake**');
    io.emit('check 123');
    socket.emit('check 456');
    console.log('emits done')
    socket.on('event_from_client', data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    });
}

);