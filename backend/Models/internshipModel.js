const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Internship = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("internshipModel", Internship);
