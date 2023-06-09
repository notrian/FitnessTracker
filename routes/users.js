const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../db/adapters/users");
const { getAllPublicRoutinesByUser, getAllRoutinesByUser } = require("../db/adapters/routines");
const { authRequired } = require("./util");

router.get("/me", authRequired, async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByUsername(verify.username);

    res.send({ message: "Successfully got user data", data: user });
  } catch (error) {
    next({
      name: "Incorrect credentials",
      message: "The login information provided is not correct",
      data: null,
    });
  }
});

router.get("/:username/routines", authRequired, async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getUserByUsername(username);
    if (user === []) throw error;

    const routines = await getAllRoutinesByUser(username);
    res.send({ message: "Successfully got users routines", data: routines });
  } catch (error) {
    next({
      name: "Not found",
      message: "Account with supplied username does not exist",
      data: null,
    });
  }
});

module.exports = router;
