const { Router } = require('express');
const chatController = require('../controllers/chatController');

const router = Router();

router.get('/chat', chatController.chat_get);

router.get('/index', (req, res) => {
  res.render('index');
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

module.exports = router;
