import type { FastifyInstance } from "fastify";
import { healthController } from "../controllers/health.controller.js";

export default async function healthRoutes(
  app: FastifyInstance
) {
  app.get("/health", healthController);
}