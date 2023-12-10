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
      expires: new Date(Date.now() + 1000 * 86400),
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
    expires: new Date(Date.now() + 1000 * 86400),
  });
  res.send({ name, password, token });
});

// Get user data
const getUser = asyncHandler(async (req, res) => {
  const { userObj } = req;
  if (userObj) {
    res.send(req.userObj);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// logged in status
const loggedInStatus = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.send(false);
    }
    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    return res.json(false);
  }
});

// logout
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  getUser,
  loggedInStatus,
  logout,
};
