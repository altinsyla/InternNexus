const InternshipApplication = require('../Models/internshipApplicationModel');
const multer = require('multer');
const path = require('path');

// qitu e marrim CV edhe e rujm te uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const getAllInternshipApplications = async (req, res) => {
  try {
    const internshipApplications = await InternshipApplication.find();
    res.status(200).json(internshipApplications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleInternshipApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const internshipApplication = await InternshipApplication.findById(id);
    res.status(200).json(internshipApplication);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createInternshipApplication = async (req, res) => {
  const { internshipID, username, additionalMessage } = req.body;
  const cv = req.file ? req.file.filename : "";

  try {
    // qikjo e gjen aplikimin e fundit te nje useri n'baze te username
    const lastApplication = await InternshipApplication.findOne({ username }).sort({ applyDate: -1 });

    // qikjo e kontrollon nese ka pas naj internship brenda 24h nese ka, nconsole e qet errorin(mir o me ba si alert)
    if (lastApplication && (Date.now() - lastApplication.applyDate.getTime()) < (24 * 60 * 60 * 1000)) {
      return res.status(403).json({ message: "You can apply only once in 24 hours." });
    }

    const newInternshipApplication = await InternshipApplication.create({
      internshipID,
      cv,
      username,
      additionalMessage,
      applyDate: Date.now(),
    });

    res.status(201).json(newInternshipApplication);
  } catch (error) {
    console.error("Error creating internship application:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateInternshipApplication = async (req, res) => {
  const { id } = req.params;
  const { internshipID, username, additionalMessage } = req.body;
  const updatedData = {
    internshipID, username, additionalMessage
  };
  if (req.file) {
    updatedData.cv = req.file.filename;
  }

  try {
    const updatedInternshipApplication = await InternshipApplication.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedInternshipApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteInternshipApplication = async (req, res) => {
  const { id } = req.params;
  try {
    await InternshipApplication.findByIdAndDelete(id);
    res.status(204).json({ message: "Internship Application deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllInternshipApplications,
  getSingleInternshipApplication,
  createInternshipApplication,
  updateInternshipApplication,
  deleteInternshipApplication,
  upload,
};
