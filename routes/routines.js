const express = require("express");
const { getAllPublicRoutines, updateRoutine } = require("../db/adapters/routines");
const { createRoutine, destroyRoutine } = require("../db/adapters/routines");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const publicRoutines = await getAllPublicRoutines();
    res.send({
      message: "got all public routines",
      data: publicRoutines,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { creatorId, isPublic, name, goal } = req.body;
    const newRoutine = await createRoutine(creatorId, isPublic, name, goal);
    res.send({
      message: "created routine",
      data: newRoutine,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:routineId", async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { isPublic, name, goal } = req.body;
    const updatedRoutine = await updateRoutine(routineId, isPublic, name, goal);

    if (!updatedRoutine) {
      next({ name: "RoutineNotFound", message: "A routine with that id does not exist" });
      return;
    }

    res.send({
      message: "updated routine",
      data: updatedRoutine,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:routineId", async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const routine = await destroyRoutine(routineId);

    if (!routine) {
      next({ name: "RoutineNotFound", message: "A routine with that id does not exist" });
      return;
    }

    res.send({
      message: "deleted routine",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
