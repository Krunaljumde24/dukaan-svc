const { Router } = require("express");
const { mysqlconnection } = require("../service/mysqlConnection");

const FruitRouter = Router({ strict: true });

FruitRouter.post("/addFruit", (req, res) => {
  console.log(req.body);
  res.status(201).send("Fruit Added.");
});

module.exports = { FruitRouter };
