const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username."],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
  },
});

module.exports = mongoose.model("User", userSchema);
