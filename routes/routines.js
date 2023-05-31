const express = require("express");
const { getAllPublicRoutines } = require("../db/adapters/routines");
const { createRoutine, destroyRoutine } = require("../db/adapters/routines");
const { getRoutineById } = require("../db/adapters/routines");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const publicRoutines = await getAllPublicRoutines();
  res.send({
    message: "got all public routines",
    data: publicRoutines,
  });
});

router.post("/", async (req, res, next) => {
  const { creatorId, isPublic, name, goal } = req.body;
  const newRoutine = await createRoutine(creatorId, isPublic, name, goal);
  res.send({
    message: "created routine",
    data: newRoutine,
  });
});

router.delete("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;
  const routine = await destroyRoutine(routineId);
  if (!routine) throw error;
  res.send({
    message: "deleted routine",
    data: null,
  });
});

module.exports = router;
