const express = require("express");
const router = express.Router();
const { createUser } = require("../db/adapters/users");

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  if (password.length < 8) {
    next({
      name: "InvalidCredentialsError",
      message: "Password must be at least 8 characters long",
    });
  }
  const user = createUser(username, password);
  console.log(user);
});

module.exports = router;
