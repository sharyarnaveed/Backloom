import type { Database, Framework, Language, ORM } from "../config/types.js";
import { CLIError } from "./errors.js";

export interface CLIArguments {
  projectName?: string;
  framework?: Framework;
  language?: Language;
  database?: Database;
  orm?: ORM;
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

      if (
        language !== "javascript" &&
        language !== "typescript"
      ) {
        throw new CLIError(
          "Language must be either javascript or typescript."
        );
      }

      result.language = language;
      continue;
    }

    if (flag === "--database") {
      const database = value ?? args[++i];

      if (!database) {
        throw new CLIError("Missing value for --database.");
      }

      if (
        database !== "postgresql" &&
        database !== "none"
      ) {
        throw new CLIError(
          "Database must be either postgresql or none."
        );
      }

      result.database = database;
      continue;
    }

    if (flag === "--orm") {
      const orm = value ?? args[++i];

      if (!orm) {
        throw new CLIError("Missing value for --orm.");
      }

      if (orm !== "prisma" && orm !== "none") {
        throw new CLIError(
          "ORM must be either prisma or none."
        );
      }

      result.orm = orm;
      continue;
    }

    throw new CLIError(`Unknown option: ${flag}`);
  }

  return result;
}