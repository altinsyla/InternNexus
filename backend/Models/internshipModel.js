const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Internship = new Schema({
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  offers: {
    type: String,
    required: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("internshipModel", Internship);
