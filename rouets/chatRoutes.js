const { Router } = require('express');
const chatController = require('../controllers/chatController');

const router = Router();

router.get('/index', (req, res) => {
  console.log('index', req.session.user);
  res.render('index', { username: req.session.user.username });
});

router.post('/index', (req, res) => {
  try {
    res.render('chat', req.body);
  } catch (error) {
    console.log(error);
  }
});

router.post('/chat', (req, res) => {
  res.render('chat', req.body);
});

router.get('/chat', (req, res) => {
  const { user } = req.session;
  console.log(req.query.room);
  console.log(user);
  res.render('chat', {
    username: req.query.username,
    room: req.query.room,
  });
});

module.exports = router;
