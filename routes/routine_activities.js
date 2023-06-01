const express = require("express");
const {
  addActivityToRoutine,
  getRoutineActivityByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activites");
const { authRequired } = require("./util");
const router = express.Router();

router.post("/", authRequired, async (req, res, next) => {
  try {
    const { routineId, activityId, count, duration } = req.body;
    const alreadyExists = await getRoutineActivityByRoutine(routineId);
    if (
      alreadyExists &&
      (await alreadyExists.find((value) => value.activity_id === activityId))
    ) {
      next({
        name: "already exists",
        message: "A routine activity with that routine already exists",
      });
      return;
    }
    const addActivity = await addActivityToRoutine(
      routineId,
      activityId,
      count,
      duration
    );
    res.send({ name: "added activity to routine", data: addActivity });
  } catch (error) {
    next({
      name: "not found",
      message: "a routine activity with that id does not exist",
    });
  }
});

router.patch("/:routineActivityId", authRequired, async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;
    const updatedRoutineActivity = await updateRoutineActivity(
      routineActivityId,
      count,
      duration
    );

    if (!updatedRoutineActivity) {
      next({
        name: "RoutineActivityNotFound",
        message: "A routine activity with that id does not exist",
      });
      return;
    }

    res.send({
      message: "updated routine activity",
      data: updatedRoutineActivity,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:routineActivityId", authRequired, async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;
    const routineActivity = await destroyRoutineActivity(routineActivityId);

    if (!routineActivity) {
      next({
        name: "RoutineActivityNotFound",
        message: "A routine activity with that id does not exist",
      });
      return;
    }

    res.send({
      message: "deleted routine activity",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
