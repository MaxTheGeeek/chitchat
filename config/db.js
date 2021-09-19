const mongoose = require('mongoose');

const config = require('./config');

const uri = config.mongoUri;

// connect to mongoose
mongoose
  .connect(uri, { keepAlive: true, keepAliveInitialDelay: 300000 })
  .then((res) => console.log('database connected'))
  .catch((err) => console.log(err));
