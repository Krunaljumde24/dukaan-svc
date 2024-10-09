const { Router } = require("express");
const mongoose = require("mongoose");
const Vegetable = require("../model/Vegetable.js");
const VegeRouter = Router({ strict: true });

VegeRouter.get("/getVegtableDetails", async (req, res) => {
  try {
    let result = await Vegetable.find();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong.");
  }
});

VegeRouter.post("/addVegetable", (req, res) => {
  console.log(req.body);
  let obj = req.body;
  // mysqlconnection.query(
  //   "INSERT INTO dukaan_db.product_vegetable (`productId`,`productName`,`productActualPrice`,`productDiscountedPrice`,`productQuantity`,`productQuantityType`,`productImageName`)  VALUES (?,?,?,?,?,?,?)",
  //   [
  //     "v100",
  //     obj.productName,
  //     obj.productActualPrice,
  //     obj.productDiscountedPrice,
  //     obj.productQuantity,
  //     obj.productQuantityType,
  //     "product_image",
  //   ],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send("Internal server error.");
  //     } else {
  //       console.log(result);
  //       res.status(201).send("Vegetable Added.");
  //     }
  //   }
  // );
});

// VegeRouter.get("/getUniqueProductId", (req, res) => {
//   mysqlconnection.query(
//     "SELECT COUNT(*) as 'COUNT' FROM product_vegetable",
//     (err, result) => {

//       res.status(200).send(JSON.stringify(result[0]));
//     }
//   );
// });

module.exports = { VegeRouter };
