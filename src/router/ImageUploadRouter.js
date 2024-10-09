const express = require("express");

const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const ImageUploadRouter = express.Router({ strict: true });

ImageUploadRouter.get("/test", (req, res) => {
  res.send("Test is working.");
});

ImageUploadRouter.post("/uploadSingle", async (req, res) => {
  if (req.body && Object.keys(req.body).length != 0) {
    let path = "DevSpace/dukaan/vegetables";
    let { fileName, imageContent } = req.body;
    // console.log(req.body);

    try {
      let uploadObj = await cloudinary.uploader.upload(imageContent, {
        folder: path,
        public_id: fileName,
      });
      console.log(uploadObj.secure_url);
      res.status(201).send("Image Uploaded.");
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    }
  } else {
    res.status(400).send("Bad Request.");
  }
});

module.exports = ImageUploadRouter;
