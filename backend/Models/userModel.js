const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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

User.pre('save', async function(next) {
  if (!this.isModified('password')) {
      return next();
  }
  const salt = await bcrypt.genSalt(12);
  
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

User.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("userModel", User);