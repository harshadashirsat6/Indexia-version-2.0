const express = require("express");
const router = express.Router();
const { feedback, contact } = require("../controller/commonController");
const accountMiddleware = require("../middleware/account");

router.post("/feedback", accountMiddleware, feedback);
router.post("/contact", accountMiddleware, contact);

module.exports = router;
