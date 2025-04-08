const mongoose = require('mongoose');

// Define the schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
