// const eogaming = require("../assets/images/eogaming.jpg");
// const gaccessories = require("../assets/images/gamingaccessories.jpg");
// const pc = require("../assets/images/pc.jpg");

const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const featuredPosts = require("../data/posts");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Get all posts
router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.json({ success: true, data: post, featuredPosts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({ success: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Add a post
router.post("/", upload.single("image"), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    // date and id not needed, id gets generated by MongoDB, date is default in a model
  });

  try {
    const savedPost = await post.save();
    res.json({ success: true, data: savedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Edit the post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
        },
      },
      {
        new: true,
      }
    );
    res.json({ success: true, data: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
