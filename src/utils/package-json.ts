import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

export async function addDependency(
  projectPath: string,
  dependency: string,
  version: string,
  dev = false
): Promise<void> {
  const packageJsonPath = path.join(projectPath, "package.json");

  const packageJson = JSON.parse(
    await readFile(packageJsonPath, "utf-8")
  );

const dependencyType = dev
  ? "devDependencies"
  : "dependencies";

packageJson[dependencyType] ??= {};

packageJson[dependencyType][dependency] = version;

  await writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  );
}