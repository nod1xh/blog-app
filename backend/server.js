const express = require("express");
const cors = require("cors");
const data = require("./data/posts");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
const app = express();

// Instructions for server on how to handle different types of incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Exposing images folder for featured posts
app.use(express.static("images"));
app.use(express.static("uploads"));

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const postsRouter = require("./routes/posts");
app.use("/", postsRouter);

app.listen(port, () => {
  console.log(`Listening on URL http://localhost:${port}`);
});
