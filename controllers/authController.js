// const User = require('../Models/User');
const url = require('url');
// const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');





//Register Requests
// module.exports.register_get = (req, res) => {
//   if (req.cookies.usid) {
//     return res.render('login');
//   }
//   res.render('register');
// }; 



// module.exports.register_post = (req, res) => {
//   const { username, email, password } = req.body;

//   if (req.cookies.usid && req.session.key) {
//     return res.render('login');
//   }
//   try {
//     const user = await User.create({ username, email, password });
//     res.render('login');
//   } catch (err) {
//     console.log(err);
//     res.status(404).send('There is an error');
//   }
// };

//Login request

// module.exports.login_get = (req, res) => {
//   if (req.cookies.usid) {
//     return res.render('login');
//   }

//   res.render('register');
// };

// module.exports.login_post = async (req, res) => {
//   const { username, password } = req.body;
//   console.log(req.body);
//   try {
//     const user = await User.findOne({ username, password });
//     res.render('index', { username });
//   } catch (err) {
//     console.log(err);
//     res.status(404).send('There is an error');
//   }
// };

// module.exports.chat_post = async (req, res) => {
//   if (!req.session.user || !req.cookies.user_sid) {
//     return res.redirect('login');
//   }
//   res.render('chat', req.body);
// };
