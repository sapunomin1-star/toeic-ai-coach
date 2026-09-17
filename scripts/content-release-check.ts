/** Release regressions: no learner data or paid/network calls. */
import { strict as assert } from "node:assert";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { QUESTIONS } from "../data/questions";
import { VOCABULARY } from "../data/vocabulary";
import { QUESTION_REVISED_AT, REVISION_TAG_REQUIRED, isDisputedQuestion } from "../data/question-revisions";
import { TERM_GLOSSES, QUESTION_SENSES } from "../data/vocabulary-support";
import { COMPLETED_TERM_GLOSSES } from "../data/term-glosses-completed";
import { createTermResolver } from "../lib/termResolution";
import evidence from "../docs/audits/2026-09-12-learning-quality/COMPLETION-EVIDENCE.json";
import patch from "../pipeline/patches/term-gloss-quality.json";

const hash = (path: string) => createHash("sha256").update(readFileSync(new URL(path, import.meta.url))).digest("hex");
assert.equal(hash("../data/term-glosses-completed.ts"), evidence.vocabulary.completedFileSha256, "update the editorial evidence when the release bank changes");
assert.equal(evidence.vocabulary.inputTerms, evidence.vocabulary.reviewedTerms);
assert.equal(COMPLETED_TERM_GLOSSES.length, evidence.vocabulary.completedGlossEntries);
assert.equal(new Set(TERM_GLOSSES.map(e=>e.term)).size, TERM_GLOSSES.length);
for (const e of TERM_GLOSSES) {
  assert.ok(e.term.trim() && /[\u3400-\u9fff]/.test(e.meaning_zh), `missing definition: ${e.term}`);
  assert.ok(!/^(?:待補|待確認)$|TODO|尚未收錄/.test(e.meaning_zh), `placeholder: ${e.term}`);
}
for (const q of QUESTIONS) for (const term of q.vocabulary ?? []) assert.ok(!(term in patch.spellings), `${q.id}: nonstandard teaching tag ${term}`);
const resolver = createTermResolver({ items: VOCABULARY, glosses: TERM_GLOSSES, senses: QUESTION_SENSES });
for (const [term, fragment] of [["up for", "續訂"], ["percent off", "六折"], ["go out of business", "倒閉"], ["toner cartridges", "碳粉匣"], ["used to", "原形動詞"]]) {
  const r=resolver.resolve(term);
  assert.equal(r.kind,"gloss");
  if(r.kind==="gloss") assert.ok(r.gloss.meaning_zh.includes(fragment),`${term}: contextual definition regressed`);
}
assert.equal(evidence.audio.verification.length,4);
for(const audio of evidence.audio.verification) {
  const q=QUESTIONS.find(q=>q.id===audio.id)!;
  assert.ok(q && q.part==="Part 2");
  assert.equal(q.audioUrl,audio.url,"text must ship with its verified versioned recording");
  assert.ok(q.audioUrl.endsWith(`${q.id}-quality-20260917.mp3`));
  assert.equal(isDisputedQuestion(q.id),false);
  assert.ok(REVISION_TAG_REQUIRED.has(q.id));
  assert.ok(Date.parse(QUESTION_REVISED_AT[q.id])>=Date.parse("2026-09-17T00:00:00Z"));
  assert.equal(q.audioScript,[`Q: ${q.question}`,...(["A","B","C"] as const).map(l=>`(${l}) ${q.choices[l]}`)].join("\n"));
  assert.equal(audio.expected,[q.question,...(["A","B","C"] as const).map(l=>`Letter ${l}. ${q.choices[l]}`)].join(" "));
  assert.ok(audio.passed && audio.wordErrorRate<=0.03 && audio.duration>10 && audio.duration<30);
}
console.log(`Content release passed: ${TERM_GLOSSES.length} glosses, zero malformed teaching tags, 4 verified audio revisions`);
