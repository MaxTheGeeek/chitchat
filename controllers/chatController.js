// module.exports.chat_get = (req, res) => {
//   if (!req.session.user && !req.cookies.usid) {
//     return res.render('register');
//   }
//   res.render('chat');
// };

// module.exports.chat_post = async (req, res) => {
//   const { username, password } = req.body;
//   console.log(req.body);
//   try {
//     res.render('index', { username });
//   } catch (err) {
//     console.log(err);
//     res.status(404).send('There is an error');
//   }
// };
