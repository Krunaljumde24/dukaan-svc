const { Router } = require("express");
const bcrypt = require("bcrypt");

const AuthRouter = Router({ strict: true });

const User = require("../model/User");

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

AuthRouter.post("/login", async (req, res) => {
  let { username, password } = req.body;

  if (username && password && username != "" && password != "") {
    try {
      let user = await User.find({ username: username });
      if (user && Object.keys(user).length != 0) {
        bcrypt.compare(password, user[0].password, (err, status) => {
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
        });
      } else {
        res.status(400).send("User does not exist");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    }
  } else {
    res.status(400).send("Please enter valid username and password.");
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
    bcrypt.hash(request.password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        let obj = new User({
          name: request.name,
          email: request.email,
          username: request.username,
          password: hash,
        });
        try {
          await obj.save();
          res.status(200).send("User Registered");
        } catch (error) {
          if (error.message.includes("duplicate key")) {
            res.status(400).send("User already exists.");
          } else {
            console.log(error);
            res.status(500).send(error.message);
          }
        }
      }
    });
  } else {
    res.status(400).send("Mandatory input fields required.");
  }
});


module.exports = { AuthRouter };
