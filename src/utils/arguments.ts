import type { Framework, Language } from "../config/types.js";
import { CLIError } from "./errors.js";

export interface CLIArguments {
  projectName?: string;
  framework?: Framework;
  language?: Language;
}

export function parseArguments(args: string[]): CLIArguments {
  const result: CLIArguments = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (!arg.startsWith("--")) {
      if (!result.projectName) {
        result.projectName = arg;
        continue;
      }

      throw new CLIError(`Unexpected argument: ${arg}`);
    }

    const [flag, value] = arg.split("=");

    if (flag === "--framework") {
      const framework = value ?? args[++i];
if (!framework) {
  throw new CLIError("Missing value for --framework.");
}
  if (
  framework !== "express" &&
  framework !== "fastify" &&
  framework !== "nestjs"
) {
  throw new CLIError(
    "Framework must be either express, fastify, or nestjs."
  );

}

      result.framework = framework;
      continue;
    }

    if (flag === "--language") {
      const language = value ?? args[++i];
if (!language) {
  throw new CLIError("Missing value for --language.");
}
      if (language !== "javascript" && language !== "typescript") {
        throw new CLIError(
          "Language must be either javascript or typescript."
        );
      }

      result.language = language;
      continue;
    }

    throw new CLIError(`Unknown option: ${flag}`);
  }

  return result;
}