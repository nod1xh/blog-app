const mongoose = require("mongoose");
const mongoClient = require("mongodb");

const MONGO_URI =
  "mongodb+srv://nod1x:elmedin123@cluster0.x4lukb8.mongodb.net/?retryWrites=true&w=majority";

const connectToDb = async () => {
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`Mongo Connected: ${conn.connection.host}`);
};

module.exports = connectToDb;
