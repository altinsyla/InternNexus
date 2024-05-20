const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strict", true);
  return mongoose.connect(url);
};

module.exports = connectDB;