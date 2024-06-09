const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipApplication = new Schema({
  internshipID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  applyDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
  additionalMessage: {
    type: String,
  }
});

module.exports = mongoose.model("internshipApplicationModel", InternshipApplication);
