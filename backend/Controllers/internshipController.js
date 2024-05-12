const Internship = require('../Models/internshipModel');

const getAllInternships = async (req, res) => {
  try {
    const Internships = await Internship.find();
    res.status(200).json(Internships);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleInternship = async (req, res) => {
  const id = req.params.id;
  try {
    const Internship = await Internship.findOne({ _id: id });
    res.status(200).json(Internship);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createInternship = async (req, res) => {
    const {
        title,
        type,
        location,
        image,
    } = req.body;
  
    console.log(req.body);
  
    if (
      !title ||
      !type ||
      !location ||
      !image
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
  
    try {
      const existingInternshipByRoll = await Internship.findOne({ title });
      if (existingInternshipByRoll) {
        return res
          .status(409)
          .json({ message: "Internship with this ID already exists" });
      }
  
      const newInternship = await Internship.create({
        title,
        type,
        location,
        image,
      });
  
      res.status(201).json(newInternship);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updateInternship = async (req, res) => {
  const id = req.params.id;
  try {
    const updateInternship = await Internship.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteInternship = async (req, res) => {
  const id = req.params.id;
  try {
    await Internship.findOneAndDelete({ _id: id });
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
    deleteInternship
};
