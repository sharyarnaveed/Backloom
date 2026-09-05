import type { FastifyReply, FastifyRequest } from "fastify";
import { getHealth } from "../services/health.service.js";

export async function healthController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send(getHealth());
}