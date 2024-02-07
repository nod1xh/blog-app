const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    id: Number,
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    image: {
      src: String,
      contentType: String,
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
      default: new Date().toISOString().slice(0, 10),
    },
  },

  { collection: "posts" }
);

module.exports = mongoose.model("Post", postSchema);
