import { input, select } from "@inquirer/prompts";
import type {
  Framework,
  Language,
  ProjectConfig,
} from "../config/types.js";
import { CLIError } from "../utils/errors.js";
import { validationprojectname } from "../utils/valication.js";

export async function getProjectConfig(
  initialProjectName?: string
): Promise<ProjectConfig> {
  const projectName = initialProjectName ?? await input({
    message: "What is the name of your project?",
    validate: validationprojectname
  });

  const validationResult = validationprojectname(projectName);

  if (validationResult !== true) {
    throw new CLIError(validationResult);
  }

  const framework = await select<Framework>({
    message: "Which framework do you want to use?",
    choices: [
      {
        name: "Express",
        value: "express",
      },
      {
        name: "Fastify",
        value: "fastify",
      }
    ],
  });

  const language = await select<Language>({
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

  return {
    projectName,
    framework,
    language,
  };
}
