const express = require("express");
const connectDB = require("./config/db");
connectDB();

const data = require("./data/posts");

const port = process.env.PORT || 5000;

const app = express();

// Instructions for server on how to handle different types of incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.json({ message: data });
});

const postsRouter = require("./routes/posts");
app.use("/allposts", postsRouter);

app.listen(port, () => {
  console.log(`Listening on URL http://localhost:${port}`);
});
