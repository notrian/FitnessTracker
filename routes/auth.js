const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUser, getUser } = require("../db/adapters/users");
const { authRequired } = require("./util");

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
      data: null,
    });
    return;
  }
  if (password.length < 8) {
    next({
      name: "InvalidCredentialsError",
      message: "Password must be at least 8 characters long",
      data: null,
    });
    return;
  }

  try {
    const user = await createUser(username, password);
    delete user[0].password;

    const token = jwt.sign(user[0], process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      signed: true,
    });

    res.send({ message: "Successfully registered", data: user });
  } catch (error) {
    next({
      name: "UsernameAlreadyTaken",
      message: "An account with that username already exists",
      data: null,
    });
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUser(username, password);
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      signed: true,
    });

    res.send({ message: "Successfully logged in", data: user });
  } catch (error) {
    next({
      name: "InvalidLoginCredentials",
      message: "The username or password supplied is incorrect",
      data: null,
    });
  }
});

router.get("/logout", authRequired, async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      message: "Successfully logged out",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
