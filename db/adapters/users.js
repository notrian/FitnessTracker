const client = require("../client");

const bcrypt = require("bcrypt");
const saltRounds = 10;

async function createUser(username, password) {
  try {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const { rows } = await client.query(
      `
      INSERT INTO users("username", "password") 
      VALUES($1, $2) 
      ON CONFLICT ("username") DO NOTHING 
      RETURNING *;
    `,
      [username, hashedPassword]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUser(username, password) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );

    const res = bcrypt.compareSync(password, user.password);

    if (res) {
      return user;
    } else {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1;
    `,
      [id]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
