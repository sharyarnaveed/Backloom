import { healthController } from "../controllers/health.controller.js";

export default async function healthRoutes(app) {
  app.get("/health", healthController);
}