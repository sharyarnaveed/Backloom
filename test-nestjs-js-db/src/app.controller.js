const { Controller, Get } = require("@nestjs/common");
const {
  checkDatabaseConnection,
} = require("./database/database");

class AppController {
  async getHealth() {
    await checkDatabaseConnection();

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
  Object.getOwnPropertyDescriptor(AppController.prototype, "getHealth")
);

module.exports = {
  AppController,
};