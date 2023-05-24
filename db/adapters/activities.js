const client = require("../client");

async function getActivityById(id) {
  try {
    let { rows } = await client.query(
      `
          SELECT * FROM activities
          WHERE id=$1
        `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    let { rows } = await client.query(`SELECT * FROM activities;`);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createActivity(name, description) {
  try {
    const insertObj = await client.query(
      `
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING;
      `,
      [name, description]
    );

    return insertObj.rows;
  } catch (error) {
    throw error;
  }
}

async function updateActivity(activityId, name, description) {
  try {
    const {
      rows: [activitiy],
    } = await client.query(
      `
      UPDATE activities
      SET "name"=$2, "description"=$3
      WHERE id=$1
      RETURNING *;
    `,
      [activityId, name, description]
    );

    return activitiy;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
};
