const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const generalTools = require('../tools/general-tools');
const User = require('../Models/user');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

router.post('/avatar', (req, res) => {
  const upload = generalTools.uploadAvatar.single('avatar');

  upload(req, res, (err)=> {
    if (err instanceof multer.MulterError) {
      res.status(500).send('Server Error!');
    } else if (err) {
      res.status(404).send(err.message);
    } else {
      User.findByIdAndUpdate(
        req.session.user._id,
        { avatar: req.file.filename },
        { new: true },
        (err, user) => {
          if (err) {
            res.status(500).json({ msg: 'Server Error!' });
          } else {
            if (req.session.user.avatar) {
              fs.unlink(
                path.join(
                  __dirname,
                  '../public/images/avatars',
                  req.session.user.avatar
                ),
                (err) => {
                  if (err) {
                    res.status(500).json({ msg: 'Server Error!' });
                  } else {
                    req.session.user = user;

                    res.redirect('/user/dashboard');
                  }
                }
              );
            } else {
              req.session.user = user;

              res.redirect('/user/dashboard');
            }
          }
        }
      );
    }
  });
});

module.exports = router;
