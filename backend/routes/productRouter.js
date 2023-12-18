const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getAllProducts,
  addNewProducts,
  updateProduct,
  getProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", protect, addNewProducts);
router.patch("/:id", protect, updateProduct);
router.get("/:id", protect, getProduct);

module.exports = router;
