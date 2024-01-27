const { mysqlconnection } = require("./mysqlConnection.js");

let register = (obj) => {
  let name = obj.name;
  let email = obj.email;
  let username = obj.username;
  let password = obj.password;

  let result = userExists(email, username);
  if (!result) {
  } else {
  }
};

let userExists = (email, username) => {
  mysqlconnection.query(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [email, username],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
      }
    }
  );
  return false;
};

// let createUser = (name,email,username, )

module.exports = { register, userExists };
