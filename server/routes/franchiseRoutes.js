const express = require("express");
const router = express.Router();
const { login, singup } = require("../controller/franchiseController");

router.post("/franchise/signup", singup);
router.post("/franchise/login", login);

module.exports = router;
