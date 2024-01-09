const Product = require("../models/Product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

const HTTP_STATUS = {
  SUCCESS: 200,
  ERROR: 402,
};

// Add Product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      userID: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      stock: 0, // Consider using a constant for the initial stock
      description: req.body.description,
    });

    const result = await newProduct.save();
    res.status(HTTP_STATUS.SUCCESS).json(result);
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error);
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const findAllProducts = await Product.find({
      userID: req.params.userId,
    }).sort({ _id: -1 });

    res.json(findAllProducts);
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error);
  }
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.params.id });
    const deletePurchaseProduct = await Purchase.deleteOne({
      ProductID: req.params.id,
    });
    const deleteSaleProduct = await Sales.deleteOne({
      ProductID: req.params.id,
    });

    res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error);
  }
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
      },
      { new: true }
    );

    res.json(updatedResult);
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error.message || "Internal Server Error");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
