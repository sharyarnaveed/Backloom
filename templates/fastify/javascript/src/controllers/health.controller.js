import { getHealth } from "../services/health.service.js";

export function healthController() {
  return getHealth();
}