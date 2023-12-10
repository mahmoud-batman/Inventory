const express = require("express");
const {
  registerUser,
  getAllUsers,
  loginUser,
  getUser,
  loggedInStatus,
  logout,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-user", protect, getUser);
router.get("/logged-in", loggedInStatus);
router.get("/logout", protect, logout);
module.exports = router;
