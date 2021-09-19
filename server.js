const dotenv = require('dotenv').config({
  path: './.env',
});
const db = require('./config/db');
const io = require('./rouets/io');

const app = require('./app');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server is up on port ${PORT}!`)
);

io.attach(server);
