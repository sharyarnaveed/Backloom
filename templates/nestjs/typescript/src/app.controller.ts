import { Controller, Get } from "@nestjs/common";
import { prisma } from "./database/prisma.js";

@Controller()
export class AppController {
  @Get("health")
  async getHealth() {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: "ok",
      database: "connected",
    };
  }
}