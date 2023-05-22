import { Client } from "pg";

const client = new Client("postgres://localhost:5432/fitnesstracker");

module.exports = client;
