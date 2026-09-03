#!/usr/bin/env node

import { getProjectConfig } from "./prompts/project-prompts.js";
import { generateProject } from "./generator/project-generator.js";
const command = process.argv[2];
const projectName = process.argv[3];
import packageJson from "../package.json" with { type: "json" };




async function main() {
  if (command === "--help" || command === "-h") {
    console.log(`
Backloom

Usage:
  backloom init [project-name]

Commands:
  init    Create a new backend project

Options:
  -h, --help    Show help
`);

    return;
  }
  if (command === "--version" || command === "-v") {
  console.log(packageJson.version);
  return;
}
  if (command !== "init") {
    console.error("\nUsage: backloom init");
    process.exit(1);
  }
  console.log("Backloom\n");

  const config = await getProjectConfig(projectName);

  console.log("\nYour configuration:");
  console.log(`  Project: ${config.projectName}`);
  console.log(`  Framework: ${config.framework}`);
  console.log(`  Language: ${config.language}`);

  await generateProject(config);

  console.log("\nProject created successfully!");
  console.log(`  cd ${config.projectName}`);
  console.log("  npm run dev");
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
