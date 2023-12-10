const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const getAllProducts = require("../controllers/productController");

router.get("/", getAllProducts);

module.exports = router;
