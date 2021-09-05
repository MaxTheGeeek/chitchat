const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  RoomName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
    username: {}
  },
  //   username: {
  //     type: String,
  //     trim: true,
  //     unique: true,
  //     minlength: 3,
  //     maxlength: 30,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('Room', RoomSchema);
