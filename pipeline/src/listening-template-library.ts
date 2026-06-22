import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import type { Part, SkillTag } from "../../types/question";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIBRARY_PATH = path.resolve(
  __dirname,
  "../patterns/listening-template-patterns.json",
);

type ListeningTemplatePattern = {
  id: string;
  part: Part;
  skill_tag: SkillTag;
  scenario_type: string;
  generation_brief: string;
  answer_support: string;
  distractor_patterns: string[];
  image_prompt_seed?: string;
  visual_allowed?: boolean;
};

type ListeningTemplateLibrary = {
  source_policy: {
    allowed: string[];
    forbidden: string[];
  };
  accent_policy: {
    target_accents: string[];
    rotation: string;
    note: string;
  };
  image_policy: {
    part: string;
    provider: string;
    model: string;
    requirements: string[];
  };
  patterns: ListeningTemplatePattern[];
};

let cachedLibrary: ListeningTemplateLibrary | null = null;

export function loadListeningTemplateLibrary(): ListeningTemplateLibrary {
  if (!cachedLibrary) {
    cachedLibrary = JSON.parse(
      fs.readFileSync(LIBRARY_PATH, "utf8"),
    ) as ListeningTemplateLibrary;
  }
  return cachedLibrary;
}

export function getListeningTemplates(part: Part): ListeningTemplatePattern[] {
  return loadListeningTemplateLibrary().patterns.filter(
    (pattern) => pattern.part === part,
  );
}

export function listeningTemplatePrompt(
  part: Part,
  options: {
    maxPatterns?: number;
    includeAccentPolicy?: boolean;
    includeImagePolicy?: boolean;
  } = {},
): string {
  const library = loadListeningTemplateLibrary();
  const patterns = getListeningTemplates(part).slice(0, options.maxPatterns);
  const blocks = patterns.map((pattern, index) => {
    const imageSeed = pattern.image_prompt_seed
      ? `\n  Image prompt seed: ${pattern.image_prompt_seed}`
      : "";
    const visualRule =
      pattern.visual_allowed === false
        ? "\n  Visual rule: spoken evidence only; do not require a chart, table, or graphic."
        : "";
    return [
      `${index + 1}. ${pattern.id}`,
      `  Scenario: ${pattern.scenario_type}`,
      `  Brief: ${pattern.generation_brief}`,
      `  Answer support: ${pattern.answer_support}`,
      `  Distractors: ${pattern.distractor_patterns.join("; ")}`,
      imageSeed,
      visualRule,
    ].join("\n");
  });

  const lines = [
    "Use the abstract listening template patterns below only as inspiration.",
    `Allowed: ${library.source_policy.allowed.join(" ")}`,
    `Forbidden: ${library.source_policy.forbidden.join(" ")}`,
  ];

  if (options.includeAccentPolicy) {
    lines.push(
      `Accent target for the later audio step: ${library.accent_policy.target_accents.join(", ")}.`,
      library.accent_policy.rotation,
    );
  }

  if (options.includeImagePolicy && part === "Part 1") {
    lines.push(
      `Image generation: ${library.image_policy.provider} ${library.image_policy.model}.`,
      `Image requirements: ${library.image_policy.requirements.join(" ")}`,
    );
  }

  lines.push(`Templates for ${part}:`, patterns.length ? blocks.join("\n") : "No templates found.");
  return lines.join("\n");
}
