import assert from "node:assert/strict";
import {
  mkdtempSync,
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import {
  QUESTIONS,
  buildDailyPlan,
  buildMockTestPlan,
  buildListeningMockPlan,
} from "../data/questions";
import { QUESTION_BANK_SOURCES } from "../data/question-banks.generated";
import { createQuestionBank } from "../lib/questions/createBank";
import { parseQuestionPack } from "../lib/questions/pack";
import {
  validateQuestion,
  validateQuestionGroup,
} from "../lib/questions/validation";
import { PART_LIST, type Question } from "../types/question";
import {
  assertRegistryCurrent,
  MANIFEST_PATH,
  REGISTRY_PATH,
  readManifest,
  renderRegistry,
} from "./questions/registry";
import { loadSources, reviewAddition, writePack } from "./questions/service";
import { createPackDraft } from "./questions/templates";
import { mkdirSync } from "node:fs";
import {
  renderGeneratedAppend,
  appendQuestions,
} from "../pipeline/src/questions-writer";

async function main() {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const fixture: Question = {
    id: "p5-test-import-001",
    part: "Part 5",
    question: "The quarterly safety briefing begins _______ 9 a.m. on Tuesday.",
    choices: { A: "at", B: "in", C: "of", D: "with" },
    answer: "A",
    explanation_zh:
      "具體時刻 9 a.m. 前使用介系詞 at，表示說明會於上午九點開始。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["briefing"],
  };
  const pack = parseQuestionPack({
    schemaVersion: 1,
    id: "test-import",
    title: "Import fixture",
    questions: [fixture],
  });

  assertRegistryCurrent(root);
  assert.equal(validateQuestion(fixture).valid, true);
  for (const bad of [
    null,
    [],
    {},
    { ...fixture, choices: null },
    { ...fixture, answer: 3 },
    { ...fixture, vocabulary: [null] },
    { ...fixture, explanation_zh: 42 },
    { ...fixture, transcript: {} },
    { ...fixture, passage_group_type: ["single"] },
    { ...fixture, audioChoices: { ...fixture.choices, extra: "bad" } },
  ]) {
    assert.equal(
      validateQuestion(bad).valid,
      false,
      `Malformed input must fail: ${JSON.stringify(bad)}`,
    );
  }
  assert.throws(
    () => parseQuestionPack({ ...pack, schemaVersion: 2 }),
    /schemaVersion/,
  );
  assert.throws(
    () => parseQuestionPack({ ...pack, id: "../escape" }),
    /Bank id/,
  );
  assert.throws(
    () =>
      parseQuestionPack({
        ...pack,
        questions: [{ ...fixture, id: "p6-wrong-part" }],
      }),
    /id must begin/,
  );
  assert.throws(
    () =>
      parseQuestionPack({
        ...pack,
        questions: [{ ...fixture, difficlty: "B1" }],
      }),
    /Unknown question field/,
  );
  assert.throws(
    () => parseQuestionPack({ ...pack, questions: [fixture, fixture] }),
    /Duplicate/,
  );
  for (const part of PART_LIST)
    assert.throws(
      () => parseQuestionPack(createPackDraft("draft", part)),
      /Missing|Invalid|vocabulary/,
    );

  // Complete reading/listening units are required at the import boundary.
  for (const part of ["Part 3", "Part 4", "Part 6", "Part 7"] as const) {
    const first = QUESTIONS.find(
      (q) =>
        q.part === part &&
        (part !== "Part 7" || q.passage_group_type === "single"),
    )!;
    const group = QUESTIONS.filter(
      (q) =>
        q.part === part &&
        (first.transcript
          ? q.transcript === first.transcript
          : q.passage_group_id === first.passage_group_id),
    );
    assert.doesNotThrow(() => parseQuestionPack({ ...pack, questions: group }));
    assert.throws(
      () => parseQuestionPack({ ...pack, questions: group.slice(1) }),
      /Incomplete|question_order/,
    );
    assert.throws(
      () =>
        parseQuestionPack({
          ...pack,
          questions: group.map((q) => ({ ...q, question_order: 1 })),
        }),
      /question_order/,
    );
  }
  assert.equal(
    validateQuestionGroup([
      { ...fixture, part: "Part 7", passage: "one" },
      { ...fixture, part: "Part 7", passage: "two" },
    ]).valid,
    false,
  );

  const isolated = createQuestionBank([pack]);
  assert.equal(isolated.getQuestionById(fixture.id), fixture); // parser preserves the question value
  assert.deepEqual(
    isolated.queryQuestions({ bankIds: [pack.id], parts: ["Part 5"] }),
    [fixture],
  );
  assert.deepEqual(isolated.queryQuestions({ bankIds: ["unknown"] }), []);
  assert.deepEqual(isolated.queryQuestions({ excludeIds: [fixture.id] }), []);
  assert.equal(isolated.getQuestionSource(fixture.id), pack.id);
  assert.equal(isolated.getQuestionById("missing"), undefined);
  assert.throws(() => createQuestionBank([pack, pack]), /Duplicate/);
  assert.throws(() => isolated.buildMockTestPlan(), /incomplete/);
  assert.throws(() => isolated.buildListeningMockPlan(), /incomplete/);

  // Prove the normal add path accepts useful content and rejects quality/teaching regressions.
  assert.equal(reviewAddition(pack, QUESTION_BANK_SOURCES).questions, 1);
  assert.throws(
    () =>
      reviewAddition(
        { ...pack, questions: [QUESTIONS[0]] },
        QUESTION_BANK_SOURCES,
      ),
    /Duplicate question/,
  );
  assert.throws(
    () =>
      reviewAddition(
        {
          ...pack,
          questions: [{ ...fixture, vocabulary: ["zz-no-teaching-entry"] }],
        },
        QUESTION_BANK_SOURCES,
      ),
    /teaching definitions/,
  );
  assert.throws(
    () =>
      reviewAddition(
        {
          ...pack,
          questions: [
            {
              ...fixture,
              explanation_zh: "正確答案為 B，這裡必須使用不同介系詞。",
            },
          ],
        },
        QUESTION_BANK_SOURCES,
      ),
    /quality check failed/,
  );
  const p6 = QUESTIONS.find((q) => q.part === "Part 6")!;
  assert.throws(
    () =>
      reviewAddition(
        {
          ...pack,
          questions: QUESTIONS.filter(
            (q) => q.passage_group_id === p6.passage_group_id,
          ).map((q, index) => ({ ...q, id: `p6-new-group-${index}` })),
        },
        QUESTION_BANK_SOURCES,
      ),
    /passage_group_id/,
  );

  // Legacy generators now share one safe append path, including an initially empty bank.
  for (const initial of [
    "",
    JSON.stringify(fixture),
    JSON.stringify(fixture) + ",",
  ]) {
    const raw = `export const GENERATED_QUESTIONS = [${initial}\n];\n`;
    const updated = renderGeneratedAppend(raw, [
      { ...fixture, id: "p5-appended-002" },
    ]);
    const compiled = ts.transpileModule(updated, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;
    const exports: { GENERATED_QUESTIONS?: Question[] } = {};
    new Function("exports", compiled)(exports);
    assert.equal(exports.GENERATED_QUESTIONS?.at(-1)?.id, "p5-appended-002");
    assert.equal(exports.GENERATED_QUESTIONS?.length, initial ? 2 : 1);
  }
  assert.throws(
    () => appendQuestions([{ ...fixture, id: QUESTIONS[0].id }], true),
    /duplicate question id/,
  );
  assert.throws(
    () => appendQuestions([{ ...fixture, choices: null }], true),
    /choices/,
  );

  // Filesystem round trip: no replacement, no changes on review, registered JSON loads end to end.
  const temp = mkdtempSync(resolve(tmpdir(), "toeic-bank-test-"));
  try {
    mkdirSync(resolve(temp, "data"));
    writeFileSync(resolve(temp, MANIFEST_PATH), "[]\n");
    writeFileSync(resolve(temp, REGISTRY_PATH), renderRegistry([]));
    reviewAddition(pack, []);
    assert.equal(readFileSync(resolve(temp, MANIFEST_PATH), "utf8"), "[]\n");
    assert.equal(
      existsSync(resolve(temp, "data/question-packs/test-import.json")),
      false,
    );
    writePack(temp, pack, []);
    assertRegistryCurrent(temp);
    const loaded = await loadSources(temp);
    const generated = await import(
      pathToFileURL(resolve(temp, REGISTRY_PATH)).href
    );
    assert.deepEqual(generated.QUESTION_BANK_SOURCES, loaded);
    assert.deepEqual(
      createQuestionBank(loaded).getQuestionById(fixture.id),
      fixture,
    );
    assert.throws(
      () => writePack(temp, pack, readManifest(temp)),
      /already exists/,
    );
    assert.throws(
      () => writePack(temp, { ...pack, id: "second" }, []),
      /Manifest changed/,
    );
    writeFileSync(resolve(temp, REGISTRY_PATH), "stale");
    assert.throws(() => assertRegistryCurrent(temp), /stale/);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }

  // Runtime callers keep complete and exact plans with seen-question avoidance intact.
  const daily = buildDailyPlan();
  assert.equal(daily.questions.filter((q) => q.part === "Part 6").length, 4);
  for (const [plan, expected] of [
    [buildMockTestPlan(), [30, 16, 54]],
    [buildListeningMockPlan(), [6, 25, 39, 30]],
  ] as const) {
    assert.equal(plan.length, 100);
    assert.equal(new Set(plan.map((q) => q.id)).size, 100);
    const parts =
      plan[0].part === "Part 5"
        ? ["Part 5", "Part 6", "Part 7"]
        : ["Part 1", "Part 2", "Part 3", "Part 4"];
    assert.deepEqual(
      parts.map((part) => plan.filter((q) => q.part === part).length),
      expected,
    );
  }

  // Follow static imports/re-exports, not type imports or import() boundaries.
  // This guards against accidentally pulling a 3,303-question bank into the initial UI bundle.
  function staticDependencies(file: string): string[] {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const result: string[] = [];
    for (const node of source.statements) {
      if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node))
        continue;
      if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier))
        continue;
      if (ts.isExportDeclaration(node) && node.isTypeOnly) continue;
      if (ts.isImportDeclaration(node) && node.importClause) {
        if (node.importClause.isTypeOnly) continue;
        const bindings = node.importClause.namedBindings;
        if (
          !node.importClause.name &&
          bindings &&
          ts.isNamedImports(bindings) &&
          bindings.elements.every((entry) => entry.isTypeOnly)
        )
          continue;
      }
      const specifier = node.moduleSpecifier.text;
      if (!specifier.startsWith("@/") && !specifier.startsWith(".")) continue;
      const base = specifier.startsWith("@/")
        ? resolve(root, specifier.slice(2))
        : resolve(file, "..", specifier);
      const target = [
        base,
        `${base}.ts`,
        `${base}.tsx`,
        resolve(base, "index.ts"),
      ].find(
        (candidate) =>
          existsSync(candidate) && /\.(ts|tsx|json)$/.test(candidate),
      );
      if (target) result.push(target);
    }
    return result;
  }
  const visited = new Set<string>();
  function assertLazyBoundary(file: string) {
    if (visited.has(file) || file.endsWith(".json")) return;
    visited.add(file);
    for (const dependency of staticDependencies(file)) {
      assert.ok(
        !dependency.startsWith(resolve(root, "data") + "/") ||
          dependency === resolve(root, "data/question-revisions.ts"),
        `Static content import: ${file} -> ${dependency}`,
      );
      assertLazyBoundary(dependency);
    }
  }
  for (const route of [
    "",
    "practice",
    "quiz",
    "dashboard",
    "wrongbook",
    "vocabulary",
    "vocabulary-quiz",
    "study-plan",
    "mock-test",
    "listening-mock",
    "full-mock",
    "mock-review/[snapshotId]",
  ])
    assertLazyBoundary(resolve(root, "app", route, "page.tsx"));
  console.log(
    "Question bank checks passed: schema, templates, atomic groups, import round trip, quality gates, catalog, exact plans, lazy bundle boundary.",
  );
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
