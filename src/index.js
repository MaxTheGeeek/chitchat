const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const {generateMessage , generateLocationMessage} = require('./utils/messages')

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

    //inform other users when user joins the chat ans send welcome msg to user
    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast.emit('message', generateMessage('User is online!'));

    socket.on('sendMessage', (message , callback) => {
        io.emit('message', generateMessage(message));
        callback('message delivered');
    })


    //inform when user goes offline
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('User is offline'));
    })

    
    //get cordinates of users and send it as a google map location
    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage',  generateLocationMessage(`https://maps.google.com/?q=${coords.latitude},${coords.longitude}`))
        callback('location shared!');
    })
})



//listen to the port and run the server
server.listen(port, () => {
    console.log(`Server on port ${port}!`);
})