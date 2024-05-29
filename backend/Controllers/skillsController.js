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
  //   console.log(req.body);

  if (!skillName) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate skills
    const existingSkillName = await Skills.findOne({ skillName });
    if (existingSkillName) {
      return res
        .status(409)
        .json({ message: "Skill with this name already exists!" });
    }

    const newSkill = await Skills.create({
      skillName,
    });

    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSkill = async (req, res) => {
  const id = req.params.id;
  try {
    let updateSkill = await Skills.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateSkill);
  } catch (error) {
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
