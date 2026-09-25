import type { Request, Response } from "express";
import { getHealth } from "../services/health.service.js";


export async function healthController(
  _req: Request,
  res: Response
) {
  res.json(await getHealth());
}