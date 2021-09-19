const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config');

const authRoutes = require('./rouets/authRoutes');
const chatRoutes = require('./rouets/chatRoutes');
const profileRoutes = require('./rouets/profileRoutes');

const app = express();

app.set('view engine', 'ejs');

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
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

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// TODO: 404 error

module.exports = app;