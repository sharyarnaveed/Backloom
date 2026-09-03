import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

import {
  directoryExists,
  copyDirectory,
  replaceInFile,
  replaceInDirectory,
} from "../src/utils/filesystem.js";

test("directoryExists detects a directory", async () => {
  const tempDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "backend-cli-")
  );

  assert.strictEqual(
    await directoryExists(tempDirectory),
    true
  );

  await fs.rm(tempDirectory, {
    recursive: true,
    force: true,
  });
});

test("copyDirectory copies files", async () => {
  const tempDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "backend-cli-")
  );

  const source = path.join(tempDirectory, "source");
  const destination = path.join(tempDirectory, "destination");

  await fs.mkdir(source);
  await fs.writeFile(
    path.join(source, "test.txt"),
    "Hello"
  );

  await copyDirectory(source, destination);

  const content = await fs.readFile(
    path.join(destination, "test.txt"),
    "utf8"
  );

  assert.strictEqual(content, "Hello");

  await fs.rm(tempDirectory, {
    recursive: true,
    force: true,
  });
});

test("replaceInFile replaces text", async () => {
  const tempDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "backend-cli-")
  );

  const filePath = path.join(tempDirectory, "test.txt");

  await fs.writeFile(
    filePath,
    "Hello {{PROJECT_NAME}}"
  );

  await replaceInFile(
    filePath,
    "{{PROJECT_NAME}}",
    "my-api"
  );

  const content = await fs.readFile(
    filePath,
    "utf8"
  );

  assert.strictEqual(content, "Hello my-api");

  await fs.rm(tempDirectory, {
    recursive: true,
    force: true,
  });
});

test("replaceInDirectory replaces text in nested files", async () => {
  const tempDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "backend-cli-")
  );

  const nestedDirectory = path.join(
    tempDirectory,
    "nested"
  );

  await fs.mkdir(nestedDirectory);

  await fs.writeFile(
    path.join(tempDirectory, "one.txt"),
    "{{PROJECT_NAME}}"
  );

  await fs.writeFile(
    path.join(nestedDirectory, "two.txt"),
    "Project: {{PROJECT_NAME}}"
  );

  await replaceInDirectory(
    tempDirectory,
    "{{PROJECT_NAME}}",
    "my-api"
  );

  const firstFile = await fs.readFile(
    path.join(tempDirectory, "one.txt"),
    "utf8"
  );

  const secondFile = await fs.readFile(
    path.join(nestedDirectory, "two.txt"),
    "utf8"
  );

  assert.strictEqual(firstFile, "my-api");
  assert.strictEqual(secondFile, "Project: my-api");

  await fs.rm(tempDirectory, {
    recursive: true,
    force: true,
  });
});
