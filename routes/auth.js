const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUser, getUser } = require("../db/adapters/users");
const { authRequired } = require("./util");

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      status: 406,
      status_message: "MissingCredentialsError",
      data: "Please supply both a username and password",
    });
    return;
  }
  if (password.length < 8) {
    next({
      status: 406,
      status_message: "InvalidCredentialsError",
      data: "Password must be at least 8 characters long",
    });
    return;
  }

  try {
    const user = await createUser(username, password);
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({ status: 200, status_message: "Successfully registered", data: user });
  } catch (error) {
    next({
      status: 401,
      status_message: "UsernameAlreadyTaken",
      data: "An account with that username already exists",
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
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({ status: 200, status_message: "Successfully logged in", data: user });
  } catch (error) {
    next({
      status: 401,
      status_message: "InvalidLoginCredentials",
      data: "The username or password supplied is incorrect",
    });
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      status: 200,
      status_message: "Successfully logged out",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
