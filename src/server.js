const express = require("express");
const connect = require("./database/mongooseConnection.js");
const { AuthRouter } = require("./router/AuthRouter.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { VegeRouter } = require("./router/VegeRouter.js");
const ImageUploadRouter = require("./router/ImageUploadRouter.js");

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());

app.use(AuthRouter);
app.use(VegeRouter);
app.use(ImageUploadRouter);

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
  if (err) console.log(err);
  else {
    console.log(`dukaan-svc is running on port ${port}`);
    connect();
  }
});
