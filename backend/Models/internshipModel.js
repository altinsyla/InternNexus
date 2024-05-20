const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Internship = new Schema({
  internshipID: {
    type: Number,
    required: true,
  },
  image: {
    type: String, //VARCHAR osht formati i fotove mu rujt duhet me perdor MULTER
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
});

module.exports = mongoose.model("internshipModel", Internship);
