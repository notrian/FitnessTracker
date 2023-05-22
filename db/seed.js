const client = require("./client");
const { users, activities, routines, routine_activities } = require("./seedData");

async function dropTables() {
  // Drop all tables in order
  try {
    await client.query(`
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS routine_activities;
        DROP TABLE IF EXISTS users;
    `);
  } catch (err) {
    throw err;
  }
}

async function createTables() {
  // Define your tables and fields
  try {
    await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE routines(
            id SERIAL PRIMARY KEY
            creator_id INTEGER REFERENCES users(id)
            is_public BOOLEAN DEFAULT false
            name VARCHAR(255) UNIQUE NOT NULL
            goal TEXT NOT NULL
        );
        CREATE TABLE activities(
            id SERIAL PRIMARY KEY
            name VARCHAR(255) UNIQUE NOT NULL
            description TEXT NOT NULL
        );
        CREATE TABLE routine_activities(
            id SERIAL PRIMARY KEY
            routine_id INTEGER REFERENCES routines (id)
            activity_id INTEGER REFERENCES activities (id)
            duration INTEGER
            count INTEGER
        );
    `);
  } catch (err) {
    throw err;
  }
}

async function populateTables() {
  // Seed tables with dummy data from seedData.js
  try {
    await client.query(`
        INSERT INTO users(username, password)
        VALUES("jeff", "12345");

        INSERT INTO routines(creator_id, is_public, name, goal)
        VALUES(1, true, "Sandwich", "get sandwich");

        INSERT INTO activities(name, description)
        VALUES("Walk", "walk in park");

        INSERT INTO routine_activities(routine_id, activity_id, duration, count)
        VALUES(1, 1, 20, 1);
    `);
  } catch (err) {
    throw err;
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
