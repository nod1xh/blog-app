const express = require("express");

const app = express();

const port = 3000;

let server = app.listen(port, () => {
  console.log(`Listening on URL http://localhost:${port}`);
});

console.log(server);
