const mongoose = require("mongoose");
const Franchies = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  contact: { type: String },
  password: { type: String },
  otp: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
});
const frenchiesModel = mongoose.model("franchise", Franchies);
module.exports = frenchiesModel;
