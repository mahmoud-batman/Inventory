const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

/**
 * @function getAllProducts
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
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

const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({ message: `${product.name} is deleted.` });
});

module.exports = {
  getAllProducts,
  addNewProducts,
  updateProduct,
  getProduct,
  deleteProduct,
};
