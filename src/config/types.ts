export type Framework =
  | "express"
  | "fastify"
  | "nestjs";

export type Language =
  | "typescript"
  | "javascript";

export type Database =
  | "postgresql"
  | "none";

export type ORM =
  | "prisma"
  | "none";

export interface ProjectConfig {
  projectName: string;
  framework: Framework;
  language: Language;
  database: Database;
  orm: ORM;
}