const Skills = require("../Models/skillsModel");

const getAllSkills = async (req, res) => {
  try {
    let skills = await Skills.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleSkill = async (req, res) => {
  const id = req.params.id;
  try {
    let skill = await Skills.findOne({ _id: id });
    res.status(200).json(skill);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createSkill = async (req, res) => {
  const { skillName } = req.body;

  if (!skillName) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check if skillName already exists
    let existingSkill = await Skills.findOne({ skillName });

    if (!existingSkill) {
      // Skill doesn't exist, create new skill
      existingSkill = await Skills.create({
        skillName,
      });
    }

    res.status(201).json(existingSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateSkill = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Updating skill with ID: ${id}`);
    console.log("Request body:", req.body);

    // Ensure only valid fields are updated
    const { name } = req.body; // Assuming name is the field to update

    const updatedSkill = await Skills.findOneAndUpdate(
      { _id: id },
      { name }, // Update only the name field for example
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    console.log("Updated skill:", updatedSkill);
    res.status(200).json(updatedSkill);
  } catch (error) {
    console.error("Error updating skill:", error.message);
    res.status(400).json({ message: error.message });
  }
};


const deleteSkill = async (req, res) => {
  const id = req.params.id;
  try {
    await Skills.findByIdAndDelete({ _id: id });
    res.status(204).json({ message: "Skill deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSkills,
  getSingleSkill,
  createSkill,
  updateSkill,
  deleteSkill,

};
