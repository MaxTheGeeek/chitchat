const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config');
const { v4: uuidv4 } = require('uuid');

const {
  authRoutes,
  chatRoutes,
  profileRoutes,
  peerRoutes,
} = require('./rouets');

const app = express();

app.set('view engine', 'ejs');

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: false,
    maxAge: 600000,
  })
);

app.use((req, res, next) => {
  console.log('cookies ======>', req.cookies);
  console.log('session ======>', req.session);

  next();
});

app.use(authRoutes);
app.use(chatRoutes);
app.use(profileRoutes);
// app.use(peerRoutes);

// app.use('/peerjs', (req, res, next) => {
//   res.send(peerServer);
//   next();
// });
app.get('/videocall', (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.all('*', (req, res) => {
  res.status(404).render('404');
});

module.exports = app;
