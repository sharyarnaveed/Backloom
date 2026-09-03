export type Framework = "express";

export type Language = "typescript" | "javascript";

export interface ProjectConfig {
  projectName: string;
  framework: Framework;
  language: Language;
}