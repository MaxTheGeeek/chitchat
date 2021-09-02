const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
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
    unique: true,
    minlength: 3,
    maxlength: 30,
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
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
