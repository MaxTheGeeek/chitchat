exports.renderLogin = async (req, res) => {
  res.render('login', {
    msg: req.query.msg,
  });
};
const User = require('../Models/user');
const url = require('url');
const path = require('path');

exports.postRegister = async (req, res) => {
  User.findOne(
    {
      username: req.session.user.username.trim(),
    },
    (err, existUser) => {
      if (err)
        return res.redirect(
          url.format({
            pathname: '/register',
            query: {
              err: 'Server error',
            },
          })
        );

      if (existUser) {
        return res.redirect(
          url.format({
            pathname: '/',
            query: {
              msg: 'Username Already Exist :(',
            },
          })
        );
      }
    }
  );

  const { username, email, password } = req.body;
  if (req.body.username && req.body.email && req.body.password) {
    const user = User.create({
      username,
      email,
      password,
    });
    return res.redirect(
      url.format({
        pathname: '/login',
        query: {
          msg: 'Please login to app',
        },
      })
    );
  }
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
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

  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
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

      req.session.user = user;

      console.log('/login', req.session.user);

      res.redirect('/index');
    }
  );
};