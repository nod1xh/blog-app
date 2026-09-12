const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const moment = require("moment");

// Get all posts
router.get("/allposts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ success: true, data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
});

// Get the newest posts for the homepage.
// Sorted by _id because it starts with a creation timestamp -- the `date`
// field is a DD-MM-YYYY string and cannot be sorted chronologically.
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 }).limit(3);
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
});

// Get post by ID
router.get("/allposts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!req.params.id) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Post not found",
    });
  }
});

// Add a post
router.post("/allposts", auth.verifyToken, async (req, res) => {
  try {
    const currentDate = moment().format("DD-MM-YYYY");
    const username = req.username;
    const userId = req.userId;
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: username,
      date: currentDate,
      userId: userId,
    });
    const savedPost = await post.save();
    res.json({ success: true, data: savedPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong, please try again later.",
    });
  }
});

// Edit post
router.put("/allposts/:id", auth.authDelete, async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        message:
          "You don't have permission to delete or edit posts created by other users.",
      });
    }
    post.title = req.body.title;
    post.content = req.body.content;

    const updatedPost = await post.save();

    res.json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong while updating the post",
    });
  }
});

// Delete post
router.delete("/allposts/:id", auth.authDelete, async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        message:
          "You don't have permission to delete or edit posts created by other users.",
      });
    }

    await post.deleteOne();

    console.log(userId, post.userId);

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
