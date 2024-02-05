// Functions for feedback and contact
const Contact = require("../models/contact");
const Feedback = require("../models/feedback");


const feedback = async (req, resp) => {
    try {
        const Feedback = await Feedback.create(req.body)
        resp.send(Feedback)
        
    } catch (err) {
        resp.send(err)
    }
};

// Function For Contact
const contact = async (req, resp) => {
  try {
    const newContact = await Contact.create(req.body);
    resp.send(newContact);
  } catch (err) {
    resp.send(err);
  }
};

module.exports = {
    feedback,
    contact
}
