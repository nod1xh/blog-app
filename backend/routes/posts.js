// const eogaming = require("../assets/images/eogaming.jpg");
// const gaccessories = require("../assets/images/gamingaccessories.jpg");
// const pc = require("../assets/images/pc.jpg");

const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

const postsData = [
  {
    id: 1, // Zamijeniti sa UUID
    title: "Building Your Dream Gaming PC: A Step-by-Step Guide",
    content: "Content of blog post one..",
    author: "Dino Hodzic",
    date: new Date().toISOString().slice(0, 10), // Zamijeniti sa funkcijom koja generise novi datum kada se doda post.
  },
  {
    id: 2,
    title: "The Evolution of PC Gaming: From Pixels to Ray Tracing",
    content: "Content of blog post two..",
    author: "Elmedin Hodzic",
    date: new Date().toISOString().slice(0, 10),
  },
  {
    id: 3,
    title: "Behind the Screens: Exploring the World of PC Gaming Accessories",
    content: "Content of blog post three..",
    author: "John Doe",
    date: new Date().toISOString().slice(0, 10),
  },
];

// Get all posts
router.get("/", (req, res) => {
  res.json({ success: true, data: postsData });
});

// Get post by ID
router.get("/:id", (req, res) => {
  const post = postsData.find((post) => post.id === +req.params.id);

  if (!post) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  res.json({ success: true, data: post });
});

// Add a post
router.post("/", (req, res) => {
  const post = {
    id: postsData.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString().slice(0, 10),
  };

  postsData.push(post);

  res.json({ success: true, data: post });
});

module.exports = router;
