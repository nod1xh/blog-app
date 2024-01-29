const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // id not needed since MongoDB generates the id
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    content: {
      type: String,
      required: [true, "Please add content"],
    },
    author: {
      type: String,
      required: [true, "Please add an author"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  { collection: "posts" }
);

module.exports = mongoose.model("Post", postSchema);
