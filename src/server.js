const express = require("express");
const { AuthRouter } = require("./router/AuthRouter.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { VegeRouter } = require("./router/VegeRouter.js");
const { FruitRouter } = require("./router/FruitRouter.js");
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(AuthRouter);
app.use(VegeRouter);
app.use(FruitRouter);

app.listen(8080, (err) => {
  if (err) console.log(err);
  else {
    console.log("dukaan-svc is running on port 8080");
  }
});
