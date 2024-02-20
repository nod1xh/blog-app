const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

async function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }
    req.username = user.username;
    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

function getUserId(token) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  return decodedToken.userId;
}

async function authDelete(req, res, next) {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this post" });
    }

    const userId = getUserId(token);

    if (!userId) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = userId; // Attach the user ID to the request object

    next(); // Call next to pass control to the next middleware
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { verifyToken, authDelete };
