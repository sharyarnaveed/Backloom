require("dotenv").config();

const { Pool } = require("pg");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined.");
}

const db = new Pool({
  connectionString: databaseUrl,
});

async function checkDatabaseConnection() {
  await db.query("SELECT 1");
}

module.exports = {
  db,
  checkDatabaseConnection,
};