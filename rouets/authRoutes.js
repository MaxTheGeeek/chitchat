const { Router } = require('express');
const { session } = require('express-session');
const User = require('../Models/user');
const url = require('url');
const path = require('path');
const sessionChecker = require('../middlewares/sessionChecker');

const authController = require('../controllers/authController');

const router = Router();

router.get('/', sessionChecker, authController.renderLogin);
router.get('/register', sessionChecker, authController.getRegister);
router.post('/register', sessionChecker, authController.postRegister);

router.get('/login', sessionChecker, authController.getLogin);

router.post('/login', sessionChecker, authController.postLogin);

// router.use((req, res, next) => {
//   next({
//     status: 404,
//     message: 'Not Found',
//   });
// });

// router.use((err, req, res, next) => {
//   if (err.status === 404) {
//     return res.status(400).render('404');
//   }

//   if (err.status === 500) {
//     return res.status(500).render('500');
//   }

//   next();
// });
module.exports = router;
