const mongoose = require('mongoose');
const userSchema  = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  birthdate: {
    required: false,
    type: String,
  },
  role: {
    required: false,
    type: String,
  },
  id: {
    required: false,
    type: String,
  },
  friends: [
   {
     id: String,
     username: String,
   }
  ],
  genres: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema, "Users");
