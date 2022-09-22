const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.userId)
    
    if (!user) {
      return res.status(400).json({
        msg: "Please verify your email and complete onboarding first",
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route:  POST /api/auth
// @desc:   Login user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (password.length < 1) {
    return res
      .status(400)
      .json({ msg: "Password must be atleast 8 characters long" });
  }

  try {
    // Check if user is registered
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.status(400).json({ msg: "This user does not exist." });
    }

    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(400).json({ msg: "Invalid credentials" });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    const token = access_token;

    res.json({
      msg: "Login Success!",
      token,
      refresh_token,
      access_token,
      user: {
        name: user.username,
        email: user.email,
        isOwner: user.isOwner
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "180m" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = router;
