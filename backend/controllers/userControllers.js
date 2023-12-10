const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { generateToken, validateNamePassword } = require("../utils/user");

// all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

// register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;

  // Validation
  validateNamePassword(req, res);

  // check user already exists
  const userExists = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("name has already been registered");
  }

  // create user
  const user = await User.create({ name, password });

  if (!user) {
    res.status(500);
    throw new Error("server error");
  } else {
    const { _id, name, photo, password } = user;

    // generate token
    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 + 86400),
    });
    res.send({ _id, name, photo, password });
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Validation
  validateNamePassword(req, res);

  // check if user exists
  const user = await User.findOne({ name });
  if (!user) {
    res.status(500);
    throw new Error("User not found ,please sign up");
  }
  // check password
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    res.status(500);
    throw new Error("Incorrect password");
  }
  // generate token
  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 + 86400),
  });
  res.send({ name, password });
});

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
};
