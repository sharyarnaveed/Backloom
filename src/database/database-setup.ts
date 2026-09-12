import path from "node:path";
import { writeFile } from "node:fs/promises";
import type { Database, Language } from "../config/types.js";
import { addDependency } from "../utils/package-json.js";

export async function setupDatabase(
  database: Database,
  language: Language,
  projectPath: string
): Promise<void> {
  if (database === "none") {
    return;
  }

  if (database === "postgresql") {
    console.log("Setting up PostgreSQL...");

    const envExample = `DATABASE_URL=postgresql://username:password@localhost:5432/database
`;

    await writeFile(
      path.join(projectPath, ".env.example"),
      envExample
    );

    await addDependency(
      projectPath,
      "pg",
      "^8.16.3"
    );
    await addDependency(
  projectPath,
  "dotenv",
  "^17.2.2"
);


    return;
  }
  if (language === "typescript") {
  await addDependency(
    projectPath,
    "@types/pg",
    "^8.15.5",
    true
  );
}
}