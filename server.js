const dotenv = require('dotenv').config({
  path: './.env',
});
const db = require('./config/db');
const io = require('./rouets/io');

const { app, server } = require('./app');

io.attach(server);
