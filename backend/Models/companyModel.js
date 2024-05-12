const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema({
  name: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("companyModel", Company);
