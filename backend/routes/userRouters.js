const express = require("express");
const {
  registerUser,
  getAllUsers,
  loginUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
