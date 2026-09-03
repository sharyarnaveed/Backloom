import fs from "node:fs/promises";
import path from "node:path";

export async function directoryExists(
  directoryPath: string
): Promise<boolean> {
  try {
    const stats = await fs.stat(directoryPath);

    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function copyDirectory(
  source: string,
  destination: string
): Promise<void> {
  await fs.cp(source, destination, {
    recursive: true,
  });
}

export async function replaceInFile(
  filePath: string,
  search: string,
  replacement: string
): Promise<void> {
  const content = await fs.readFile(filePath, "utf8");

  const updatedContent = content.replaceAll(search, replacement);

  await fs.writeFile(filePath, updatedContent, "utf8");
}

export async function replaceInDirectory(
  directoryPath: string,
  search: string,
  replacement: string
): Promise<void> {
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      await replaceInDirectory(
        entryPath,
        search,
        replacement
      );
    } else {
      await replaceInFile(
        entryPath,
        search,
        replacement
      );
    }
  }
}