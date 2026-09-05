#!/usr/bin/env node

import { getProjectConfig } from "./prompts/project-prompts.js";
import { generateProject } from "./generator/project-generator.js";
const command = process.argv[2];
const cliArgs = process.argv.slice(3);
import packageJson from "../package.json" with { type: "json" };
import { parseArguments } from "./utils/arguments.js";



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
    console.error("\nUsage: backloom init [project-name]");
    process.exit(1);
  }
  console.log("Backloom\n");
const args = parseArguments(cliArgs);
const config = await getProjectConfig(
  args.projectName,
  args.framework,
  args.language
);
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
