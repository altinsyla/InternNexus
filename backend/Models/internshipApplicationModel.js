const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipApplication = new Schema({
  applicationID: {
    type: Number,
    required: true
  },
  internshipTitle: {
    type: String, //Ktu e marrim titullin e internshipit prej Internshipit, kur dojm me kriju aplikim tri veq e bajm internshipTitle(Application) = internshipTitle(Internships) tu i bo import dy tabelat
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
