const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    message:String
});
const contactModel = mongoose.model("contact", contactSchema);
module.exports = contactModel;
