const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const singup = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      return res.json({
        success: false,
        msg: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    return res.json({
      success: true,
      msg: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    return res.json({
      success: false,
      msg: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!validPassword) {
      return res.json({
        success: false,
        msg: "Incorrect Credentials",
      });
    }
    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    await findUser.save();
    res.json({
      success: true,
      msg: "Login successful",
      token: token,
    });
  } catch (err) {
    return res.json({
      success: false,
      msg: err.message,
    });
  }
};

// get profile details
const getProfileDetails = async (req, resp) => {
  try {
    const isUser = await User.findById(req.accountId);
    resp.send(isUser);
  } catch (err) {
    resp.send(err);
  }
};

module.exports = {
  login,
  singup,
  getProfileDetails,
};
