import Fastify from "fastify";
import healthRoutes from "./routes/health.routes.js";
import plugins from "./plugins/index.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(plugins);
  app.register(healthRoutes);

  return app;
}