const { Router } = require("express");
const { mysqlconnection } = require("../service/mysqlConnection");

const AuthRouter = Router({ strict: true });

AuthRouter.post("/login", (req, res) => {
  let request = req.body;

  if ((request.username != "") & (request.password != "")) {
    let selectQuery = "SELECT * FROM users WHERE username = ? AND password = ?";
    mysqlconnection.query(
      selectQuery,
      [request.username, request.password],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
        } else {
          if (result.length == 0) {
            res.status(400).send("User does not exists.");
          } else {
            res.status(200).send("User Succuessfully logged in.");
          }
        }
      }
    );
  } else {
    res.status(400).send("Mandatory input fields required.");
  }
});

AuthRouter.post("/signup", (req, res) => {
  let request = req.body;
  if (
    request.name != "" &&
    request.username != "" &&
    request.email != "" &&
    request.password != ""
  ) {
    let insertQuery =
      "INSERT INTO USERS(name,email,username,password) values(?,?,?,?)";
    mysqlconnection.query(
      insertQuery,
      [request.name, request.email, request.username, request.password],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
        } else {
          console.log(result);
          res.status(200).send("User Registered");
        }
      }
    );
  } else {
    res.status(400).send("Mandatory input fields required.");
  }
});

module.exports = { AuthRouter };

// {
//   "username": "kjumde1",
//   "password": "kjumde1",
//   "email": "krunaljumde24@gmail.com",
//   "name": "Krunal Jumde"
// }
