const client = require("../client");
const { getUserByUsername } = require("./users");

async function getRoutineById(routineId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT *
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities.routine_id
      JOIN activities ON routine_activities.activity_id = activities.id
      WHERE routines.id = $1;
    `,
      [routineId]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = client.query(`SELECT * FROM routines;`);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities.routine_id
      JOIN activities ON routine_activities.activity_id = activities.id;
    `,
      []
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(
      //   `
      //   SELECT *
      //   FROM routines
      //   JOIN routine_activities ON routines.id = routine_activities.routine_id
      //   JOIN activities ON routine_activities.activity_id = activities.id
      //   WHERE is_public=true;
      // `,
      `
      SELECT routines.id, routines.creator_id, routines.is_public, routines.name, routines.goal, users.username AS creator_name,
      jsonb_agg(
        jsonb_build_object(
          'routine_id', routine_activities.routine_id,
          'activity_id', routine_activities.activity_id,
          'duration', routine_activities.duration,
          'count', routine_activities.count,
          'name', activities.name,
          'description', activities.description
        )
      ) AS activities
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities.routine_id
      JOIN activities ON routine_activities.activity_id = activities.id
      JOIN users ON routines.creator_id = users.id
      WHERE is_public = true
      GROUP BY routines.id, users.username;
    `,
      []
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(username) {
  try {
    const user = await getUserByUsername(username);

    const { rows } = await client.query(
      `
      SELECT *
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities.routine_id
      JOIN activities ON routine_activities.activity_id = activities.id
      WHERE creator_id=$1;
    `,
      [user.id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutinesByUser(username) {
  try {
    const user = await getUserByUsername(username);

    const { rows } = await client.query(
      `
      SELECT *
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities.routine_id
      JOIN activities ON routine_activities.activity_id = activities.id
      WHERE creator_id=$1 AND is_public=true;
    `,
      [user.id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity(activityId) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities.routine_id
      JOIN activities ON routine_activities.activity_id = activities.id
      WHERE routines.is_public = true AND activities.id = $1;
    `,
      [activityId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createRoutine(creatorId, isPublic, name, goal) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO routines(creator_id, is_public, name, goal)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING;
      `,
      [creatorId, isPublic, name, goal]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine(routineId, isPublic, name, goal) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      UPDATE routines
      SET "is_public"=$2, "name"=$3, "goal"=$4
      WHERE id=$1
      RETURNING *;
    `,
      [routineId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(routineId) {
  try {
    await client.query(
      `
      DELETE FROM routine_activities
      WHERE routine_id=$1;
      `,
      [routineId]
    );
    await client.query(
      `
      DELETE FROM routines
      WHERE id=$1;
      `,
      [routineId]
    );

    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getAllPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
