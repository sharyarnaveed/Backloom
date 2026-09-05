import type { Response } from "express";

export function sendSuccess(
  res: Response,
  data: unknown,
  statusCode = 200
) {
  return res.status(statusCode).json(data);
}