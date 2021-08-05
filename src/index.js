const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

//call express package
const app = express();

//Allow us to create new server manually and refactoring in app
const server = http.createServer(app);

//Create server to support socketio
const io = socketio(server);

const port = process.env.PORT || 3000;

// Join public folder to project directory
const publicPath = path.join(__dirname, '../public');

// Use middleware for factorization public folder from routes
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New Websocket connection');

    socket.emit('message', "welcome to Chitchat");
    socket.broadcast.emit('message','User is online!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User is offline');
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`)
    })
})

server.listen(port, () => {
    console.log(`Server on port ${port}!`);
})