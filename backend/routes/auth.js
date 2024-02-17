const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw Error("Please fill all fields");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw Error("Please provide a username and a password");
    }

    const user = await User.findOne({ username });
    const matchPass = await bcrypt.compare(password, user.password);
    if (!user || !matchPass) {
      throw Error("Invalid username or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(401).json({ success: false, error: error.message });
  }
});

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
}

module.exports = router;
