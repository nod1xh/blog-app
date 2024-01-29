const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "BlogApp",
  });
  console.log(`Mongo Connected: ${conn.connection.host}`);
};

module.exports = connectToDb;
