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



let count = 0;
io.on('connection', (socket) => {
    console.log('New Websocket connection');

    socket.emit('countUpdated', count);
    
    socket.on('increment', () => {
        count++;
        // socket.emit('countUpdated', count);
        io.emit('countUpdated', count);
    })
})

server.listen(port, () => {
    console.log(`Server on port ${port}!`);
});