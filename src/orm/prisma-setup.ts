import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import type { Language } from "../config/types.js";
import {
  addDependency,
  addScript,
} from "../utils/package-json.js";

export async function setupPrisma(
  language: Language,
  projectPath: string
): Promise<void> {
  console.log("Setting up Prisma...");

await addDependency(
  projectPath,
  "prisma",
  "^6.16.2",
  true
);

await addDependency(
  projectPath,
  "@prisma/client",
  "^6.16.2"
);

await addScript(
  projectPath,
  "postinstall",
  "prisma generate"
);

  await addDependency(
    projectPath,
    "@prisma/client",
    "^6.16.2"
  );

  if (language === "typescript") {
    await addDependency(
      projectPath,
      "@types/node",
      "^22.0.0",
      true
    );
  }

  const prismaPath = path.join(projectPath, "prisma");

  await mkdir(prismaPath, { recursive: true });

  const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

  await writeFile(
    path.join(prismaPath, "schema.prisma"),
    schema
  );
}