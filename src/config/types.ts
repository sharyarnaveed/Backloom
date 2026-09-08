export type Framework =
  | "express"
  | "fastify"
  |"nestjs";

export type Language =
  | "typescript"
  | "javascript";

export interface ProjectConfig {
  projectName: string;
  framework: Framework;
  language: Language;
}