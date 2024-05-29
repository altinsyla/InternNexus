const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Skills = new Schema({
  skillName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("skillsModel", Skills);
