const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const githubReadme = path.join(root, "README.md");
const npmReadme = path.join(root, "README.npm.md");
const backupReadme = path.join(root, ".README.github.backup.md");

if (!fs.existsSync(npmReadme)) {
  throw new Error("README.npm.md was not found.");
}

if (!fs.existsSync(backupReadme)) {
  fs.copyFileSync(githubReadme, backupReadme);
}

fs.copyFileSync(npmReadme, githubReadme);
console.log("Using README.npm.md for npm package README.");
