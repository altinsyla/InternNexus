const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");



const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
    default: `default.jpg`,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number, // 1 for Student, 2 for company, 3 for admin
    required: true,
  },
  about: {
    type: String,
  },

  //arrays
  courses: { type: [String], default: [] },
  university: { type: [String], default: [] },
  highschool: { type: [String], default: [] },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "skillsModel" }],
});

User.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("password before: \n" + this.password);
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    console.log("password after: \n" + this.password);
  }
  next();
});

User.pre("save", function (next) {
  if (this.isNew && !this.image) {
    this.image = `default.jpg`;
  }
  next();
});


User.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("userModel", User);
