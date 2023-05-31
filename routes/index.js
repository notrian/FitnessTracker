const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next({
      name: "InternalServerError",
      message: "Site is having issues",
      data: null,
    });
  }
});

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/activities", require("./activities"));
router.use("/routines", require("./routines"));
router.use("/routineActivities", require("./routine_activities"));

router.all("*", (req, res, next) => {
  next({
    name: "Not found",
    message: "That endpoint does not exists",
  });
});

module.exports = router;
