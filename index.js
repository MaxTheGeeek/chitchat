const path = require('path');
const http = require('http');
const express = require('express');
const env = require('./.env');
const db = require('./config/db');
const ejs = require('ejs');
const authRoutes = require('./rouets/authRoutes');
const chatRoutes = require('./rouets/chatRoutes');
const io = require('./rouets/io');
const config = require('./config/config');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
app.use(cookieParser());

app.use(
  session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: false,
  })
);

//View engine
app.set('view engine', 'ejs');

// routes
app.use(authRoutes);
app.use(chatRoutes);

// app.use((req, res, next) => {
//   if (req.cookies.usid && !req.session.user) {
//     res.clearCookie('usid');
//   }
//   next();
// });


//log
app.use((req, res, next) => {
  // console.log('cookies ======>', req.cookies);
  console.log('session ======>', req.session);

  next();
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
