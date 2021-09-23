const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const generalTools = require('../tools/general-tools');
const User = require('../Models/user');

const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('profile', { user: req.session.user });
});

// router.post('/avatar', (req, res) => {
//   const upload = generalTools.uploadAvatar.single('avatar');

//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       res.status(500).send('Server Error!');
//     } else if (err) {
//       res.status(404).send(err.message);
//     } else {
//       User.findByIdAndUpdate(
//         req.body.user._id,
//         { avatar: req.file.filename },
//         { new: true },
//         (err, user) => {
//           if (err) {
//             res.status(500).json({ msg: 'Server Error!' });
//           } else {
//             if (req.body.user.avatar) {
//               fs.unlink(
//                 path.join(
//                   __dirname,
//                   '../public/img/avatars',
//                   req.body.user.avatar
//                 ),
//                 (err) => {
//                   if (err) {
//                     res.status(500).json({ msg: 'Server Error!' });
//                   } else {
//                     req.body.user = user;

//                     res.redirect('/user/profile');
//                   }
//                 }
//               );
//             } else {
//               req.session.user = user;

//               res.redirect('/user/profile');
//             }
//           }
//         }
//       );
//     }
//   });
// });

module.exports = router;
