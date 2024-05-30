const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username."],
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
  },
  email: {
    type: String,
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
