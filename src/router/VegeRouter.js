const { Router } = require("express");
const { mysqlconnection } = require("../service/mysqlConnection");
const { Result } = require("express-validator");

const VegeRouter = Router({ strict: true });

VegeRouter.get("/getVegtableDetails", (req, res) => {
  mysqlconnection.query("SELECT * FROM product_vegetable", (err, result) => {
    if (err) console.log(err);
    res.status(200).send(result);
  });
});

VegeRouter.post("/addVegetable", (req, res) => {
  console.log(req.body);
  let obj = req.body;
  mysqlconnection.query(
    "INSERT INTO dukaan_db.product_vegetable (`productId`,`productName`,`productActualPrice`,`productDiscountedPrice`,`productQuantity`,`productQuantityType`,`productImageName`)  VALUES (?,?,?,?,?,?,?)",
    [
      'v100',
      obj.productName,
      obj.productActualPrice,
      obj.productDiscountedPrice,
      obj.productQuantity,
      obj.productQuantityType,
      "product_image",
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
      } else {
        console.log(result);
        res.status(201).send("Vegetable Added.");
      }
    }
  );
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
