const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");
const featuredPosts = require("../data/posts");
const moment = require("moment");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

// Get all posts
router.get("/allposts", async (req, res) => {
  try {
    const posts = await Post.find();
    for (let i = 0; i < posts.length; i++) {
      posts[i].id = posts[i]._id.toHexString();
    }
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get featured posts / homepage
router.get("/", (req, res) => {
  try {
    res.json({ success: true, data: featuredPosts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get post by ID
router.get("/allposts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({ success: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get a featured post by ID
router.get("/:id", (req, res) => {
  try {
    const post = featuredPosts.filter((featuredPost) => {
      return featuredPost._id === +req.params.id;
    });
    res.json({ success: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Add a post
router.post(
  "/allposts",
  upload.single("image"),
  verifyToken,
  async (req, res) => {
    try {
      const currentDate = moment().format("DD-MM-YYYY");
      const username = req.username;
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: username,
        image: {
          src: req.file.filename,
          contentType: req.file.mimetype,
        },
        date: currentDate,
        // id not needed, id gets generated by MongoDB, date is default in a model
      });
      const savedPost = await post.save();
      res.json({ success: true, data: savedPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }
);

// Edit post
router.put("/allposts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      },
      {
        new: true,
      }
    );
    res.json({ success: true, data: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Something went wrong while updating the post",
    });
  }
});

// Delete post
router.delete("/allposts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const imagePath = path.join(__dirname, "../uploads", post.image.src);
    fs.unlinkSync(imagePath);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
