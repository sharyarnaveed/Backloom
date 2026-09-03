import { test } from "node:test";
import assert from "node:assert";
import { validationprojectname } from "../src/utils/valication.js";

test("valid project name", () => {
  assert.strictEqual(validationprojectname("my-api"), true);
});

test("empty project name", () => {
  assert.strictEqual(
    validationprojectname(""),
    "Project name cannot be empty."
  );
});

test("project name with uppercase letters", () => {
  assert.strictEqual(
    validationprojectname("My-api"),
    "Project name can only contain lowercase letters, numbers, and hyphens."
  );
});

test("project name with invalid characters", () => {
  assert.strictEqual(
    validationprojectname("my_api"),
    "Project name can only contain lowercase letters, numbers, and hyphens."
  );
});

test("project name starting with hyphen", () => {
  assert.strictEqual(
    validationprojectname("-my-api"),
    "Project name cannot start or end with a hyphen."
  );
});

test("project name ending with hyphen", () => {
  assert.strictEqual(
    validationprojectname("my-api-"),
    "Project name cannot start or end with a hyphen."
  );
});