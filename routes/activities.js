const express = require("express");
const {
  getAllActivities,
  createActivity,
  updateActivity,
} = require("../db/adapters/activities");
const { getPublicRoutinesByActivity } = require("../db/adapters/routines");
const { authRequired } = require("./util");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send({
      message: "got all activities",
      data: activities,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", authRequired, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newActivity = await createActivity(name, description);
    res.send({
      message: "created activity",
      data: newActivity,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:activityId", authRequired, async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const { name, description } = req.body;
    const updatedActivity = await updateActivity(activityId, name, description);

    if (!updatedActivity) {
      next({
        name: "ActivityNotFound",
        message: "A activity with that id does not exist",
      });
      return;
    }

    res.send({
      message: "updated activity",
      data: updatedActivity,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:activityId/routines", async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const publicRoutines = await getPublicRoutinesByActivity(activityId);
    console.log(publicRoutines);

    res.send({
      message: "got all public routines by activity",
      data: publicRoutines,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
