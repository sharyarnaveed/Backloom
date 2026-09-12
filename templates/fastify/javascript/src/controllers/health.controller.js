import { getHealth } from "../services/health.service.js";

export async function healthController(
  _request,
  reply
) {
  return reply.send(await getHealth());
}