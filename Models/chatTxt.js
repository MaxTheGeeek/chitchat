const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  mobile: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['admin', 'blogger'],
    default: 'blogger',
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
