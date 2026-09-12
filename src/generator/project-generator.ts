import path from "node:path";
import { fileURLToPath } from "node:url";
import { CLIError } from "../utils/errors.js";
import type { ProjectConfig } from "../config/types.js";
import {
  copyDirectory,
  directoryExists,
  replaceInDirectory,
} from "../utils/filesystem.js";
import { installpackage } from "../utils/packagemanager.js";
import { setupDatabase } from "../database/database-setup.js";
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

async function resolveTemplatePath(
  config: ProjectConfig
): Promise<string> {
  let directory = currentDirectory;

  while (true) {
    const templatePath = path.resolve(
      directory,
      "templates",
      config.framework,
      config.language
    );

    if (await directoryExists(templatePath)) {
      return templatePath;
    }

    const parentDirectory = path.dirname(directory);

    if (parentDirectory === directory) {
      throw new CLIError(
        `Template not found for ${config.framework} + ${config.language}.`
      );
    }

    directory = parentDirectory;
  }
}

export async function generateProject(
  config: ProjectConfig
): Promise<void> {
  const projectPath = path.resolve(
    process.cwd(),
    config.projectName
  );

  const templatePath = await resolveTemplatePath(config);

  const projectExists = await directoryExists(projectPath);

  if (projectExists) {
    throw new CLIError(
      `Directory "${config.projectName}" already exists.`
    );
  }

  console.log(`\nCreating project in: ${projectPath}`);
  console.log(`Using template: ${templatePath}`);


await copyDirectory(templatePath, projectPath);

await replaceInDirectory(
  projectPath,
  "{{PROJECT_NAME}}",
  config.projectName
);

await setupDatabase(
  config.database,
  config.language,
  projectPath
);

console.log("\nInstalling dependencies...");
await installpackage(projectPath);
}
