const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
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
//   skills: {
//     type: [String],
//   },
//   role: {
//     type: Number, // 1 for Student, 2 for company, 3 for admin
//     required: true,
//   }
});

module.exports = mongoose.model("userModel", User);