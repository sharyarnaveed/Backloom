const { Controller, Get } = require("@nestjs/common");
const { prisma } = require("./database/prisma.js");

class AppController {
  async getHealth() {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: "ok",
      database: "connected",
    };
  }
}

Controller()(AppController);

Get("health")(
  AppController.prototype,
  "getHealth",
  Object.getOwnPropertyDescriptor(
    AppController.prototype,
    "getHealth"
  )
);

module.exports = {
  AppController,
};