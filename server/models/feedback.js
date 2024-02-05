const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  message: String,
});
const feedbackModel = mongoose.model("feedback", feedbackSchema);
module.exports = feedbackModel;
