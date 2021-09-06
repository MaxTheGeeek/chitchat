const User = require('../Models/User');

module.exports.register_get = (req, res) => {
  res.render('register');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.register_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.status(404).send('There is an error');
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    res.render('index', { username });
  } catch (err) {
    console.log(err);
    res.status(404).send('There is an error');
  }
};


