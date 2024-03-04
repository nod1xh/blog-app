const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors middleware
app.use(
  cors({
    origin: "https://blog-app-frontend-7som.onrender.com",
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.options(
  "*",
  cors({
    origin: "https://blog-app-frontend-7som.onrender.com",
    credentials: true,
  })
);

app.use(express.static("images"));

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const postsRouter = require("./routes/posts");
app.use("/", postsRouter);

app.listen(port, () => {
  console.log(`Listening on URL http://localhost:${port}`);
});
