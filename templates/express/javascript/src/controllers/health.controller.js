import { checkDatabaseConnection } from "../config/database.js";

export async function getHealth() {
  await checkDatabaseConnection();

  return {
    status: "ok",
    database: "connected",
  };
}