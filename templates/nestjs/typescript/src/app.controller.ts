import { Controller, Get } from "@nestjs/common";
import { checkDatabaseConnection } from "./database/database.js";

@Controller()
export class AppController {
  @Get("health")
  async getHealth() {
    await checkDatabaseConnection();

    return {
      status: "ok",
      database: "connected",
    };
  }
}