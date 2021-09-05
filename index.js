const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const env = require('./.env');
const mongoose = require('mongoose');
const db = require('./config/db');
const ejs = require('ejs');
const authRoutes = require('./rouets/authRoutes');
const io = require('./rouets/io');

// const {
//   generateMessage,
//   generateLocationMessage,
// } = require('./src/utils/messages');
// const {
//   addUser,
//   removeUser,
//   getUser,
//   getUsersInRoom,
// } = require('./src/utils/users');
const res = require('express/lib/response');

const app = express();
const server = http.createServer(app);
io.attach(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, 'public');

//middlewares

app.use(express.static(publicDirectoryPath));
app.use(express.json());

//View engine
app.set('view engine', 'ejs');

// routes
app.use(authRoutes);
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/chat', (req, res) => res.render('chat'));

// app.post('/login', (req, res) => {
//   res.render('login');
// });
// app.get('/register', (req, res) => res.render('register'));
// app.post('/register', (req, res) => res.render('register'));
// app.get('/logout', (req, res) => res.render('logout'));

//Socket.io

// io.on('connection', (socket) => {
//   console.log('Socket connected');

//   socket.on('join', (options, callback) => {
//     const { error, user } = addUser({ id: socket.id, ...options });

//     if (error) {
//       return callback(error);
//     }

//     socket.join(user.room);

//     socket.emit('message', generateMessage('Admin', 'Welcome!'));
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         'message',
//         generateMessage('Admin', `${user.username} has joined!`)
//       );
//     io.to(user.room).emit('roomData', {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });
//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', generateMessage(user.username, message));
//     callback();
//   });

//   socket.on('sendLocation', (coords, callback) => {
//     const user = getUser(socket.id);
//     io.to(user.room).emit(
//       'locationMessage',
//       generateLocationMessage(
//         user.username,
//         `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
//       )
//     );
//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         'message',
//         generateMessage('Admin', `${user.username} left!`)
//       );
//       io.to(user.room).emit('roomData', {
//         room: user.room,
//         users: getUsersInRoom(user.room),
//       });
//     }
//   });
// });

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
