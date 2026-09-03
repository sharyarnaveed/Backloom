import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

import { copyDirectory, replaceInDirectory } from "../src/utils/filesystem.js";

test("project template is copied and project name is replaced", async () => {
  const tempDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "backend-cli-")
  );

  const templatePath = path.resolve(
    process.cwd(),
    "templates",
    "express",
    "typescript"
  );

  const projectPath = path.join(tempDirectory, "test-api");

  await copyDirectory(templatePath, projectPath);

  await replaceInDirectory(
    projectPath,
    "{{PROJECT_NAME}}",
    "test-api"
  );

  const packageJsonPath = path.join(
    projectPath,
    "package.json"
  );

  const packageJson = await fs.readFile(
    packageJsonPath,
    "utf8"
  );

  assert.ok(packageJson.includes('"name": "test-api"'));

  await fs.rm(tempDirectory, {
    recursive: true,
    force: true,
  });
});

