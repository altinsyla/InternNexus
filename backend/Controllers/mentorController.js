const Mentor = require('../Models/mentorModel');

const getAllMentors = async (req, res) => {
  try {
    const Mentors = await Mentor.find();
    res.status(200).json(Mentors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleMentor = async (req, res) => {
  const id = req.params.id;
  try {
    const Mentor = await Mentor.findOne({ _id: id });
    res.status(200).json(Mentor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createMentor = async (req, res) => {
    const {
        name,
        role,
        imageUrl,
    } = req.body;
  
    console.log(req.body);
  
    if (
      !name ||
      !role ||
      !imageUrl
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
  
    try {
      const existingMentorByRoll = await Mentor.findOne({ name });
      if (existingMentorByRoll) {
        return res
          .status(409)
          .json({ message: "Mentor with this name already exists" });
      }

      const newMentor = await Mentor.create({
        name,
        role,
        imageUrl,
      });
  
      res.status(201).json(newMentor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updateMentor = async (req, res) => {
  const id = req.params.id;
  try {
    const updateMentor = await Mentor.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateMentor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMentor = async (req, res) => {
  const id = req.params.id;
  try {
    await Mentor.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getAllMentors,
    getSingleMentor,
    createMentor,
    updateMentor,
    deleteMentor,
};
