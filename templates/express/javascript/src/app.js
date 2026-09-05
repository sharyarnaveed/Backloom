import express from "express";
import healthRoutes from "./routes/health.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use(healthRoutes);

app.use(errorMiddleware);

export default app;