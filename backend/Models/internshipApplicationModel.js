const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipApplication = new Schema({
  applicationID: {
    type: Number,
    required: true
  },
  internshipID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true
  },
  studentID: {
    type: Number, //I njejti sen vlen nalt si me internship ktu e kem me student
    required: true
  },
  applyDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("internshipApplicationModel", InternshipApplication);
