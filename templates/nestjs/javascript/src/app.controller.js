const { Controller, Get } = require("@nestjs/common");

class AppController {
  getHello() {
    return "Hello from {{PROJECT_NAME}}";
  }
}

Get()(AppController.prototype, "getHello");
Controller()(AppController);

module.exports = { AppController };