import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { parseArguments } from "../src/utils/arguments.js";

describe("parseArguments", () => {
  it("should parse project name", () => {
    const result = parseArguments(["my-api"]);

    assert.equal(result.projectName, "my-api");
  });

  it("should parse framework", () => {
    const result = parseArguments([
      "my-api",
      "--framework",
      "fastify",
    ]);

    assert.equal(result.framework, "fastify");
  });

  it("should parse language", () => {
    const result = parseArguments([
      "my-api",
      "--language",
      "javascript",
    ]);

    assert.equal(result.language, "javascript");
  });

  it("should parse framework and language together", () => {
    const result = parseArguments([
      "my-api",
      "--framework",
      "fastify",
      "--language",
      "javascript",
    ]);

    assert.equal(result.projectName, "my-api");
    assert.equal(result.framework, "fastify");
    assert.equal(result.language, "javascript");
  });

  it("should support equals syntax", () => {
    const result = parseArguments([
      "my-api",
      "--framework=fastify",
      "--language=javascript",
    ]);

    assert.equal(result.framework, "fastify");
    assert.equal(result.language, "javascript");
  });

  it("should reject an invalid framework", () => {
    assert.throws(
      () => parseArguments([
        "my-api",
        "--framework",
        "nest",
      ]),
      /Framework must be either express or fastify/
    );
  });

  it("should reject an invalid language", () => {
    assert.throws(
      () => parseArguments([
        "my-api",
        "--language",
        "python",
      ]),
      /Language must be either javascript or typescript/
    );
  });

  it("should reject an unknown option", () => {
    assert.throws(
      () => parseArguments([
        "my-api",
        "--foo",
        "bar",
      ]),
      /Unknown option: --foo/
    );
  });

  it("should reject a missing framework value", () => {
    assert.throws(
      () => parseArguments([
        "my-api",
        "--framework",
      ]),
      /Missing value for --framework/
    );
  });

  it("should reject a missing language value", () => {
    assert.throws(
      () => parseArguments([
        "my-api",
        "--language",
      ]),
      /Missing value for --language/
    );
  });
});