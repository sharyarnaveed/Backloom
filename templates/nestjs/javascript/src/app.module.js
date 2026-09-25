const { Module } = require("@nestjs/common");
const { AppController } = require("./app.controller");

class AppModule {}

Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})(AppModule);

module.exports = { AppModule };