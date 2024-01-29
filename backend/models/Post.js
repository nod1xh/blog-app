const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    author: { type: String },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  { collection: "myPosts" }
);

module.exports = mongoose.model("Post", postSchema);
