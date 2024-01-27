const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const mysqlconnection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

mysqlconnection.connect((err) => {
  if (err) throw err;
  else console.log("MySQL database connected.");
});

module.exports = { mysqlconnection };
