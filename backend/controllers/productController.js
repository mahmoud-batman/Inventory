const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

/**
 * @function getAllProducts
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

module.exports = getAllProducts;
