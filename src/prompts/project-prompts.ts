import { input, select } from "@inquirer/prompts";
import type {
  Framework,
  Language,
  ProjectConfig,
  Database
} from "../config/types.js";
import { CLIError } from "../utils/errors.js";
import { validationprojectname } from "../utils/valication.js";

export async function getProjectConfig(
  initialProjectName?: string,
  initialFramework?: Framework,
  initialLanguage?: Language,
  initialDatabase?: Database
): Promise<ProjectConfig> {
  const projectName = initialProjectName ?? await input({
    message: "What is the name of your project?",
    validate: validationprojectname
  });

  const validationResult = validationprojectname(projectName);

  if (validationResult !== true) {
    throw new CLIError(validationResult);
  }

const framework =
  initialFramework ??
  await select<Framework>({
    message: "Which framework do you want to use?",
    choices: [
      {
        name: "Express",
        value: "express",
      },
      {
        name: "Fastify",
        value: "fastify",
      },
       {
        name: "Nest JS",
        value: "nestjs",
      },
    ],
  });

const language =
  initialLanguage ??
  await select<Language>({
    message: "Which language do you want to use?",
    choices: [
      {
        name: "TypeScript",
        value: "typescript",
      },
      {
        name: "JavaScript",
        value: "javascript",
      },
    ],
  });
const database =
  initialDatabase ??
  await select<Database>({
    message: "Which database do you want to use?",
    choices: [
      {
        name: "PostgreSQL",
        value: "postgresql",
      },
      {
        name: "None",
        value: "none",
      },
    ],
  });
  return {
    projectName,
    framework,
    language,
    database
  };
}
