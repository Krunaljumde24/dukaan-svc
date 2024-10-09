const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { MONGO_DB_PWD } = process.env;
const pwd = encodeURIComponent(MONGO_DB_PWD);

const uri = `mongodb+srv://krunaljumde:${pwd}@devspace-mongodb-cluste.e3zikt5.mongodb.net/dukaan?retryWrites=true&w=majority&appName=devspace-mongodb-cluster`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

let connect = async () => {
  try {
    let conn = await mongoose.connect(uri, clientOptions);
    console.log("MongoDB Connected.");
  } catch (error) {
    console.log("Failed to connect to MongoDB");
    console.log(error);
  }
};

module.exports = connect;
