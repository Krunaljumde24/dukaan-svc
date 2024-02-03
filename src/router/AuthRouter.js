const { Router } = require("express");
const { mysqlconnection } = require("../service/mysqlConnection");
const bcrypt = require("bcrypt");

const AuthRouter = Router({ strict: true });

AuthRouter.get("/encrypt", (req, res) => {
  let encryptedPassword = bcrypt.hash(req.query.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      console.log(hash);
      res.send(hash);
    }
  });
});

AuthRouter.get("/checkPwd", (req, res) => {
  bcrypt.compare(
    req.query.password,
    "$2b$10$GhJEmB5N/rzOJ2v6ljEGwO3hBIU/SxE046SlMf85.Wq/Ot8VItbD.",
    (err, result) => {
      res.send(result);
    }
  );
});

AuthRouter.post("/login", (req, res) => {
  let request = req.body;

  if ((request.username != "") & (request.password != "")) {
    let selectQuery = "SELECT password FROM users WHERE username = ?";

    mysqlconnection.query(selectQuery, [request.username], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        if (result.length != 0) {
          bcrypt.compare(
            request.password,
            result[0].password,
            (err, status) => {
              if (err) {
                console.log(err);
                res.status(500).send("Something went wrong.");
              } else {
                if (status) {
                  res.status(200).send("User Succuessfully logged in.");
                } else {
                  res.status(400).send("Username or password is incorrect.");
                }
              }
            }
          );
        } else {
          res.status(400).send("User does not exist");
        }
      }
    });
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

    bcrypt.hash(request.password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        mysqlconnection.query(
          insertQuery,
          [request.name, request.email, request.username, hash],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(err.message);
            } else {
              res.status(200).send("User Registered");
            }
          }
        );
      }
    });
  } else {
    res.status(400).send("Mandatory input fields required.");
  }
});

module.exports = { AuthRouter };
