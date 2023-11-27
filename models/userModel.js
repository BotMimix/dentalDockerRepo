const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'User must have a username'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'User must have a password'],
  },
  role: {
    type: String,
    required: [true, 'User must have a role'],
    enum: ['Practice Manager', 'Dentist', 'Dental Hygienist', 'Clerk'], // enum specifies an array of allowed values
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;