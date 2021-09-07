const mongoose = require('mongoose');

//connect to mongoose
const uri =
  'mongodb+srv://max:111@webmax.kirem.mongodb.net/webmax?retryWrites=true&w=majority';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((res) => console.log('database connected'))
  .catch((err) => console.log(err));