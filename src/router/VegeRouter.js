const { Router } = require("express");
const { mysqlconnection } = require("../service/mysqlConnection");

const VegeRouter = Router({ strict: true });

VegeRouter.get("/getVegtableDetails", (req, res) => {
  mysqlconnection.query("SELECT * FROM product_vegetable", (err, result) => {
    if (err) console.log(err);
    res.status(200).send(result);
  });
});

VegeRouter.post("/addVegetable", (req, res) => {
  console.log(req.body);
  res.status(201).send('Vegetable Added.')
});

module.exports = { VegeRouter };
