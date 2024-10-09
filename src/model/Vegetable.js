const mongoose = require("mongoose");

const VegetableSchema = mongoose.Schema({
  productId: String,
  productName: String,
  productActualPrice: Number,
  productDiscountedPrice: Number,
  productQuantity: Number,
  productQuantityType: String,
  productImageName: String,
  productImageUrl: String,
});

const Vegetable = mongoose.model("Vegetable", VegetableSchema);

module.exports = Vegetable;
