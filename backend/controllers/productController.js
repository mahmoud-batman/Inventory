const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

/**
 * @function getAllProducts
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send("products");
});

const addNewProducts = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;
  //   Validation
  if (!name) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const product = await Product.create({ user: req.userObj.id, name });
  res.status(201).json(product);
});

module.exports = {
  getAllProducts,
  addNewProducts,
};
