const express = require("express");
const {
  registerUser,
  getAllUsers,
  loginUser,
  getUser,
  loggedInStatus,
  logout,
  updateUser,
  updatePassword,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logged-in", loggedInStatus);
router.get("/logout", protect, logout);
router.get("/get-user", protect, getUser);
router.patch("/update-user", protect, updateUser);
router.patch("/update-password", protect, updatePassword);
module.exports = router;
