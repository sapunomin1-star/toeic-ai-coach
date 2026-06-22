import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import type { Part } from "../../types/question";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIBRARY_PATH = path.resolve(
  __dirname,
  "../patterns/reading-template-patterns.json",
);

type ReadingTemplateLibrary = {
  source_policy: {
    allowed: string[];
    forbidden: string[];
  };
  patterns: Partial<Record<Part, string[]>>;
};

let cachedLibrary: ReadingTemplateLibrary | null = null;

function loadReadingTemplateLibrary(): ReadingTemplateLibrary {
  if (!cachedLibrary) {
    cachedLibrary = JSON.parse(
      fs.readFileSync(LIBRARY_PATH, "utf8"),
    ) as ReadingTemplateLibrary;
  }
  return cachedLibrary;
}

export function readingTemplatePrompt(part: Part): string {
  const library = loadReadingTemplateLibrary();
  const patterns = library.patterns[part] ?? [];
  return [
    "Use the local Reading OCR only as an abstract source of exam structure.",
    `Allowed: ${library.source_policy.allowed.join(" ")}`,
    `Forbidden: ${library.source_policy.forbidden.join(" ")}`,
    `Abstract ${part} patterns: ${patterns.join(" ")}`,
  ].join("\n");
}
