const mongoose = require('mongoose');
const emailValidator = require('email-validator');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true ,
    minlength: 3,
    maxlength: 30,
  },
  //   username: {
  //     type: String,
  //     trim: true,
  //     unique: true,
  //     minlength: 3,
  //     maxlength: 30,
  //   },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: emailValidator.validate,
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  // avatar: {
  //   type: String,
  // },
});

// UserSchema.pre('save', (next) => {
//   const user = this;
//   if (this.isNew || this.isModified('password')) {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) return next(err);
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         if (err) return next(err);
//         user.password = hash;
//         return next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

const User = mongoose.model('user', UserSchema);
module.exports = User;
