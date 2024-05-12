const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Mentor = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("mentorModel", Mentor);