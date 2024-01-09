const Purchase = require("../models/purchase");
const purchaseStock = require("./purchaseStock");

const HTTP_STATUS = {
  SUCCESS: 200,
  ERROR: 402,
};

// Add Purchase Details
const addPurchase = async (req, res) => {
  try {
    const { userID, productID, quantityPurchased, purchaseDate, totalPurchaseAmount } = req.body;

    const newPurchase = new Purchase({
      userID,
      productID,
      quantityPurchased,
      purchaseDate,
      totalPurchaseAmount,
    });

    await newPurchase.save();

    purchaseStock(productID, quantityPurchased);
    res.status(HTTP_STATUS.SUCCESS).json(newPurchase);
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error);
  }
};

// Get All Purchase Data
const getPurchaseData = async (req, res) => {
  try {
    const findAllPurchaseData = await Purchase.find({ userID: req.params.userID })
      .sort({ _id: -1 })
      .populate("ProductID");

    res.json(findAllPurchaseData);
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error);
  }
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
  try {
    const purchaseData = await Purchase.find({ userID: req.params.userID });
    const totalPurchaseAmount = purchaseData.reduce(
      (total, purchase) => total + purchase.TotalPurchaseAmount,
      0
    );

    res.json({ totalPurchaseAmount });
  } catch (error) {
    res.status(HTTP_STATUS.ERROR).send(error);
  }
};

module.exports = { addPurchase, getPurchaseData, getTotalPurchaseAmount };
