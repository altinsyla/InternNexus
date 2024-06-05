const Internship = require("../Models/internshipModel");
const multer = require("multer");
const path = require("path");

//qikjo ta mundson me i ru fotot, 'public/images' veni ku ruhen fotot kur bohen upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const getAllInternships = async (req, res) => {
  const { category } = req.query;
  let query = {};

  if (category === "Front-End Developer") {
    query.category = category;
  } else if (category === "Back-End Developer") {
    query.category = category;
  } else if (category === "Full Stack Developer") {
    query.category = category;
  } else if (category === "Data Scientist") {
    query.category = category;
  } else if (category === "Machine Learning Engineer") {
    query.category = category;
  } else if (category === "DevOps Engineer") {
    query.category = category;
  } else if (category === "Cloud Architect") {
    query.category = category;
  } else if (category === "Cybersecurity Analyst") {
    query.category = category;
  } else if (category === "AI Engineer") {
    query.category = category;
  } else if (category === "Blockchain Developer") {
    query.category = category;
  } else if (category === "IoT Developer") {
    query.category = category;
  } else if (category === "Mobile Application Developer") {
    query.category = category;
  } else if (category === "UI/UX Designer") {
    query.category = category;
  }
  try {
    const internships = await Internship.find(query);
    res.status(200).json(internships);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleInternship = async (req, res) => {
  const { id } = req.params;
  try {
    const internship = await Internship.findById(id);
    if (!internship) {
      return res.status(404).json({ error: "Internship not found" });
    }
    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createInternship = async (req, res) => {
  const {
    username,
    title,
    type,
    location,
    duration,
    requirements,
    offers,
    category,
  } = req.body;

  const image = req.file ? req.file.filename : "";

  try {
    const newInternship = await Internship.create({
      username,
      image: image,
      title,
      type,
      location,
      duration,
      requirements,
      offers,
      category,
    });

    res.status(201).json(newInternship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInternship = async (req, res) => {
  const { id } = req.params;
  const { title, type, location, duration, requirements, offers, category } =
    req.body;
  const updatedData = {
    title,
    type,
    location,
    duration,
    requirements,
    offers,
    category,
  };

  if (req.file) {
    updatedData.image = req.file.filename;
  }

  try {
    const updatedInternship = await Internship.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteInternship = async (req, res) => {
  const { id } = req.params;
  try {
    const internship = await Internship.findByIdAndDelete(id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    res.status(204).json({ message: "Internship deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllInternships,
  getSingleInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  upload,
};
