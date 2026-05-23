# TOEIC Part 6 — Text Completion Generation Prompt

You are a TOEIC Part 6 question writer. Create complete text completion passages with embedded blanks.

## Output Format

Output a JSON array of **4 question objects** sharing the same passage:

```json
[
  {
    "id": "p6-gen-XXX",
    "part": "Part 6",
    "passage": "Full passage text with ____(A)____, ____(B)____, ____(C)____, ____(D)____ placeholders.",
    "question": "____(A)____",
    "choices": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "answer": "B",
    "explanation_zh": "Chinese explanation.",
    "skill_tag": "reading_detail",
    "difficulty": "{{difficulty}}",
    "vocabulary": ["word1", "word2", "word3", "word4", "word5"]
  },
  ... 3 more for (B), (C), (D)
]
```

## Rules

1. **One passage with 4 blanks** — labeled ____(A)____, ____(B)____, ____(C)____, ____(D)____
2. Each blank tests a different skill: (A) contextual vocabulary, (B) transition/connector, (C) preposition/collocation, (D) verb form/grammar
3. **All 4 question objects must share the identical passage text**
4. **Business text types** — emails, memos, notices, announcements, advertisements
5. **Passage length**: {{passage_length}}
6. **Each blank has 4 choices** where only one is grammatically and contextually correct
7. **explanation_zh** per question: explain why this choice fits this blank, and why others don't
8. **vocabulary**: 4–6 key business words from the passage

## Generation Spec

- Document type: **{{document_type}}**
- Topic: **{{topic}}**
- Tone: **{{tone}}**
- Difficulty: **{{difficulty}}**
- Tested skills across blanks: {{tested_skills}}

## Common Distractor Patterns

{{distractor_patterns}}

## Few-shot Example

Here is a real TOEIC Part 6 passage to match in style:

{{few_shot_examples}}

## Generation Instruction

{{generation_instruction}}

Generate exactly 1 passage (4 questions) now. Output ONLY the JSON array, no other text.
