const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
  likedBy: {
    type: Array,
  },
  dislikes: {
    type: Array,
  },
  dislikedBy: {
    type: Array,
  },
  pending: {
    type: Array,
  },
  matches: {
    type: Array,
  },
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
