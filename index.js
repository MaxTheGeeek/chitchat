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

const res = require('express/lib/response');

const app = express();
const server = http.createServer(app);
io.attach(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, 'public');

//middlewares

app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//View engine
app.set('view engine', 'ejs');

// routes
app.use(authRoutes);
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/chat', (req, res) => {
  let a = req.body;
  console.log(a);
  res.render('chat', req.body)
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
