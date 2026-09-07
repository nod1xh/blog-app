require("dotenv").config();

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Which frontend is allowed to talk to this server.
// Set CLIENT_URL in the .env file to change it.
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const corsOptions = { origin: clientUrl, credentials: true };

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.static("images"));

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const postsRouter = require("./routes/posts");
app.use("/", postsRouter);

app.listen(port, () => {
  console.log(`Listening on URL http://localhost:${port}`);
});
