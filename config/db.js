const mongoose = require('mongoose');

//connect to mongoose
const uri =
  'mongodb+srv://maxbehzadi82:1268873Max@webmax.kirem.mongodb.net/chat-app?retryWrites=true&w=majority';

mongoose
  .connect(uri, { keepAlive: true, keepAliveInitialDelay: 300000 })
  .then((res) => console.log('database connected'))
  .catch((err) => console.log(err));
