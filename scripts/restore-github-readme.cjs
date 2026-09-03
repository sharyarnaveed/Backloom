const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const githubReadme = path.join(root, "README.md");
const backupReadme = path.join(root, ".README.github.backup.md");

if (fs.existsSync(backupReadme)) {
  fs.copyFileSync(backupReadme, githubReadme);
  fs.rmSync(backupReadme);
  console.log("Restored GitHub README.md.");
}
