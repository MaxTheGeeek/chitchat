const { Router } = require('express');

const router = Router();

router.get('/index', (req, res) => {
  const { user } = req.session;
  console.log('index', user);
  res.render('index', { username: user.username });
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
  console.log(req.session);
  console.log(req.query);
  res.render('chat', {
    username: req.session.user.username,
    room: req.query.room,
  });
});

router.get('/videocall', (req, res) => {
  res.render('videoCall');
});


router.use((req, res, next) => {
  next({
    status: 404,
    message: 'Not Found',
  });
});

router.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(400).render('404');
  }

  if (err.status === 500) {
    return res.status(500).render('500');
  }

  next();
});
module.exports = router;
