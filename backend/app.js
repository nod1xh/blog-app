const express = require("express");
const connectDB = require("./db");
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log(`Listening on URL http://localhost:${port}`);
});
