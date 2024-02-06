const express = require("express");
const router = express.Router();
const middleware = require('../middleware/account');

const {
  login,
  singup,
  getProfileDetails,
  setBasicUserDetails
} = require("../controller/userController");

router.post("/signup", singup);
router.post("/login", login);
router.get("/user-profile-details", middleware, getProfileDetails);
router.post("/set-basic-user-details", setBasicUserDetails)

module.exports = router;
