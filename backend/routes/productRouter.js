const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getAllProducts,
  addNewProducts,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", protect, addNewProducts);

module.exports = router;
