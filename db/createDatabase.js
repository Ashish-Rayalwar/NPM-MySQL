const { Sequelize } = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const database = process.env.DB;
// const config = require(__dirname + '/../config/config.json')[env];
const config = require("../config/config")[env];
config.database = null; // Set the database to null initially

const sequelize = new Sequelize({
  ...config,
  database: null, // Set to null initially
});

async function createDatabase() {
  try {
    // Create the database if not exists
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${database};`;
    await sequelize.query(createDatabaseQuery);

    // Now set the database in the configuration and connect
    sequelize.config.database = database;
    await sequelize.query(createDatabaseQuery);

    console.log(`Database '${database}' created or already exists.`);
  } catch (error) {
    console.error("Error creating database:", error.message);
    throw new Error(error.message, "Plz check your database connection");
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
}

createDatabase();
