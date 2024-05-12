const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipApplication = new Schema({
  positionTitle: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  employmentType: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  offerDetails: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("internshipApplicationModel", InternshipApplication);
