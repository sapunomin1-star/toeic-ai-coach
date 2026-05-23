# Hy3 — TOEIC Question QA Review

You are a TOEIC exam quality reviewer. Review the following question for correctness and quality.

## Review Criteria

1. **Correct answer uniqueness** — Is the marked answer truly the ONLY correct one?
2. **Distractor plausibility** — Are all distractors plausible enough that a student might choose them?
3. **No alternative answers** — Could any distractor be argued as correct under a reasonable interpretation?
4. **Context consistency** — Do the choices fit the sentence/passage context naturally?
5. **TOEIC authenticity** — Does this feel like a real TOEIC question?

## Question to Review

- Part: {{part}}
- Question: {{question}}
{% if passage %}Passage: {{passage}}{% endif %}
- Choices:
  A: {{choiceA}}
  B: {{choiceB}}
  C: {{choiceC}}
  D: {{choiceD}}
- Marked answer: {{answer}}
- Difficulty: {{difficulty}}

## Output Format

Output valid JSON only:
```json
{
  "is_valid": true,
  "confidence": "high",
  "issues": [],
  "suggestions": []
}
```

- is_valid: true if the question is correct and good quality
- confidence: "high" (clearly correct), "medium" (mostly fine, minor concerns), "low" (possibly wrong)
- issues: list of specific problems found
- suggestions: how to fix the issues
