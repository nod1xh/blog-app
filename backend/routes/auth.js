const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = require("../utils/userAuth");
const validateUserCredentials = require("../utils/validateUserCredentials");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    const userUsername = await User.findOne({ username });

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields." });
    }

    const validation = validateUserCredentials(username, password);
    if (!validation.success) {
      return res.status(401).json(validation);
    }

    const authResult = userAuth(userEmail, userUsername);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({
        success: true,
        message: "Please provide username or password",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please sign up.",
        field: "username",
      });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(401).json({
        success: true,
        message: "Invalid password.",
        field: "password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
