const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  password: {
    type: String,
    required: [true, 'Password is must'],
    minlength: 8,
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  photo: String,

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
