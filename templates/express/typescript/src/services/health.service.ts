import { prisma } from "../config/prisma.js";

export async function getHealth() {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
  };
}