const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = expressAsyncHandler(async (req, res, next) => {
  try {
    // check if token exists
    const token = req.cookies.token;
    if (!token) {
      res.status(500);
      throw new Error("Please Login first");
    }

    // retrieve user using token
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    const userObj = await User.findById(userId).select("-password");
    req.userObj = userObj;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Please Login first");
  }
});

module.exports = protect;
