
const mongoose = require("mongoose");
const User = new mongoose.Schema({
  name: { type: String },
  gender: { type: String },
  email: { type: String },
  password: { type: String },
  contact: { type: String },
  dateOfBirth: { type: String },
  panCardNum: { type: Number },
  residencyType : { type: String },
  otp: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
});
const userModel = mongoose.model("user", User);
module.exports = userModel;
