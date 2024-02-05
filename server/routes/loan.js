const express = require("express");
const router = express.Router();
const { loan } = require("../controller/loan");
const accountMiddleware = require("../middleware/account");

router.post("/loan", accountMiddleware, loan);

module.exports = router;
