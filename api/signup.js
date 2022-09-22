const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User.model");

const sendEmail = require("../server-utils/sendEmail");
const readHTML = require("../server-utils/readHTML");

// @route:  POST /api/signup
// @desc:   Register a new user
router.post("/", async (req, res) => {
  const { name, username, email, password, isOwner } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be atleast 6 characters long" });
  }

  try {
    // Check if user is already registered
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: "You are already registered" });
    }

    // Check if username is already taken
    user = await User.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: "Username is already taken" });
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      isOwner
    });

    // Hash the password
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    // Sign JWT and return token
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: "Please check your email to verify your registration",
        token,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
