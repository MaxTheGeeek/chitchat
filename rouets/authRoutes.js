const { Router } = require('express');
const User = require('../Models/user');
const url = require('url');
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');

const router = Router();

// router.get('/', authController.login_get);
// router.get('/register', authController.register_get);
// router.post('/register', authController.register_post);
// router.post('/login', authController.login_post);

//GET register routes

router.get('/register', generalTools.sessionChecker, async (req, res) => {
  res.render('register', { msg: req.query.msg });
});

//POST register routes
router.post('/register', generalTools.sessionChecker, async (req, res) => {
  User.findOne({ username: req.body.username.trim() }, (err, existUser) => {
    if (err)
      return res.redirect(
        url.format({ pathname: '/register', query: { err: 'Server error' } })
      );

    if (existUser) {
      return res.redirect(
        url.format({
          pathname: '/register',
          query: {
            msg: 'Username Already Exist :(',
          },
        })
      );
    }
  });

  const { username, email, password } = req.body;
  if (req.body.username && req.body.email && req.body.password) {
    const user = User.create({ username, email, password });
    return res.redirect(
      url.format({
        pathname: '/login',
        query: { msg: 'Please login to app' },
      })
    );
  }
});

//GET login routes

router.get('/login', generalTools.sessionChecker, (req, res) => {
  res.render('login');
});

//POST login routes
router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.redirect(
      url.format({
        pathname: '/login',
        query: {
          msg: 'Empty Field :(',
        },
      })
    );
  }

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.redirect(
        url.format({
          pathname: '/login',
          query: {
            msg: 'Server Error :(',
          },
        })
      );
    }
    if (!user) {
      return res.redirect(
        url.format({
          pathname: '/login',
          query: {
            msg: 'User Not Found :(',
          },
        })
      );
    }
    if (!req.body.password === user.password) {
      return res.redirect(
        url.format({
          pathname: '/login',
          query: {
            msg: 'User Not Found :(',
          },
        })
      );
    }

    // req.session.user = user;

    res.redirect('/index', { username: user.username });
  });
});
module.exports = router;
