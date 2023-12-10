const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getAllUsers = (req, res) => {
  res.send("getAllUsers");
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;

  // Validation
  if (!name || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  if (password.toString().length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("name has already been registered");
  }

  const user = await User.create({ name, password });
  if (!user) {
    res.status(500);
    throw new Error("server error");
  } else {
    const { _id, name, photo, password } = user;
    console.log(password);
    res.send({ _id, name, photo, password });
  }
});

module.exports = {
  registerUser,
  getAllUsers,
};
