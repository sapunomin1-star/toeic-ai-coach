#!/usr/bin/env python3
"""
Assemble the listening section of the Eduwill full mock test.

Listening is laid out differently from reading, which is why it gets its own
assembler. In the test paper a Part 1 item is just a photo and a Part 2 item is
just the line "Mark your answer on your answer sheet." — the words only exist in
the script section of the answer booklet. Part 3/4 is the reverse: the questions
are printed in the paper and only the transcript lives in the booklet.

The mock is a single self-contained test numbered 1-200, and its answer key is
one table citing 題本 p.207. Inside that block a question number identifies
exactly one question, so the key is exact — unlike the unit drills, where
numbering restarts constantly. The key table also quotes the correct choice in
English, which is checked against the question's own choices so the pairing and
the letter are both confirmed.

Part 1 is skipped: it needs the photograph, which only exists as part of a
scanned page.

Output: output/pdf-import/ed-listening.json

Usage:
  python3 assemble-listening.py
"""

from __future__ import annotations

import json
import pathlib
import re
from collections import defaultdict

HERE = pathlib.Path(__file__).resolve().parent
OUT_ROOT = HERE.parent.parent / "output" / "pdf-import"

MOCK_WORKBOOK_PAGE = 207        # what the answer key cites
PAPER_PAGES = range(207, 218)   # printed pages holding the listening paper
PART2_RANGE = range(7, 32)
PART34_RANGE = range(32, 101)

# Inline markers like "38" sit in the transcript to show where each answer is
# heard. They help a reader of the book and would only confuse a listener.
ANSWER_MARKER = re.compile(r"(?<=[\s])\d{1,3}(?=[A-Z])|(?<=[\s])\d{1,3}\s(?=[A-Z][a-z])")


def load_pages() -> list[dict]:
    pages = []
    for f in sorted((OUT_ROOT / "ed").glob("ed_p*.json")):
        try:
            pages.append(json.loads(f.read_text()))
        except json.JSONDecodeError:
            continue
    pages.sort(key=lambda p: p.get("_page_index", 0))
    return pages


def load_answer_key() -> dict[int, dict]:
    """The mock's answer table: number -> {answer, answer_text}."""
    out: dict[int, dict] = {}
    for f in sorted((OUT_ROOT / "ed-answers").glob("*.json")):
        try:
            page = json.loads(f.read_text())
        except json.JSONDecodeError:
            continue
        for item in page.get("items") or []:
            if item.get("workbook_page") != MOCK_WORKBOOK_PAGE:
                continue
            num, ans = item.get("number"), item.get("answer")
            if not isinstance(num, int) or ans not in ("A", "B", "C", "D"):
                continue
            out[num] = {
                "answer": ans,
                "answer_text": (item.get("answer_text") or "").strip(),
            }
    return out


def norm(text: str) -> set[str]:
    return set(re.findall(r"[a-z0-9]+", (text or "").lower()))


def similarity(a: str, b: str) -> float:
    ta, tb = norm(a), norm(b)
    if not ta or not tb:
        return 0.0
    return len(ta & tb) / max(len(ta), len(tb))


def clean_transcript(text: str, numbers: tuple[int, ...]) -> str:
    """Strip the answer-location markers the book prints inside the script.

    The book inserts the question number at the point in the script where its
    answer is heard. Only this group's own numbers are removed, so a number that
    is genuinely part of the dialogue ("we need 30 more boxes") survives.
    """
    cleaned = text
    # Markers can sit next to each other ("59 60 I want to talk...") when two
    # answers are heard in the same line. Removing one exposes the next, so keep
    # sweeping until a pass changes nothing.
    for _ in range(len(numbers) + 1):
        before = cleaned
        for n in numbers:
            # The transcription writes the marker either bare or in the
            # ---(n)--- form the prompt uses for blanks.
            cleaned = cleaned.replace(f"---({n})---", " ")
            cleaned = re.sub(rf"(?<![\d]){n}(?=\s*[A-Za-z])", "", cleaned)
        if cleaned == before:
            break
    cleaned = re.sub(r"[ \t]{2,}", " ", cleaned)
    return re.sub(r"[ \t]+\n", "\n", cleaned).strip()


def main() -> None:
    pages = load_pages()
    key = load_answer_key()
    if not key:
        raise SystemExit("no mock answer key found — run extract.py --mode answers first")

    # Questions as printed in the test paper (Part 3/4 only carry text there).
    paper: dict[int, dict] = {}
    for page in pages:
        if page.get("printed_page_number") not in PAPER_PAGES:
            continue
        for q in page.get("questions") or []:
            num = q.get("number")
            if not isinstance(num, int):
                continue
            choices = q.get("choices") or {}
            if not all((choices.get(c) or "").strip() for c in ("A", "B", "C", "D")):
                continue
            paper[num] = {
                "number": num,
                "stem": (q.get("stem") or "").strip(),
                "choices": choices,
                "page_index": page.get("_page_index"),
            }

    # Scripts and transcripts, which live in the booklet after the key table.
    transcripts: dict[tuple[int, ...], dict] = {}
    part2: dict[int, dict] = {}
    for page in pages:
        if (page.get("_page_index") or 0) < 340:
            continue
        for p in page.get("passages") or []:
            nums = tuple(sorted(n for n in (p.get("question_numbers") or [])
                                if isinstance(n, int) and n in PART34_RANGE))
            if len(nums) != 3:
                continue
            transcripts[nums] = {
                "text": clean_transcript(p.get("text") or "", nums),
                "header": p.get("header") or "",
            }
        for q in page.get("questions") or []:
            num = q.get("number")
            if not isinstance(num, int) or num not in PART2_RANGE:
                continue
            choices = q.get("choices") or {}
            present = [c for c in ("A", "B", "C") if (choices.get(c) or "").strip()]
            if len(present) != 3 or (choices.get("D") or "").strip():
                continue
            if not (q.get("stem") or "").strip():
                continue
            part2[num] = {
                "number": num,
                "stem": q["stem"].strip(),
                "choices": {c: choices[c].strip() for c in present},
                "page_index": page.get("_page_index"),
            }

    accepted, rejected = [], []

    def reject(num: int, reason: str) -> None:
        rejected.append({"number": num, "reason": reason})

    # Part 2 — the spoken prompt plus three spoken responses.
    for num, item in sorted(part2.items()):
        entry = key.get(num)
        if not entry:
            reject(num, "not in the mock answer key")
            continue
        letter = entry["answer"]
        if letter not in item["choices"]:
            reject(num, f"key says {letter} but only {sorted(item['choices'])} were read")
            continue
        anchor = entry["answer_text"]
        score = similarity(anchor, item["choices"][letter]) if anchor else None
        if anchor and score < 0.55:
            reject(num, f"key quotes text that does not match choice {letter} ({score:.2f})")
            continue
        accepted.append({
            "source": "ed",
            "part": "Part 2",
            "number": num,
            "stem": item["stem"],
            "choices": item["choices"],
            "answer": letter,
            "audio_script": item["stem"],
            "match": {"anchor": round(score, 3) if score is not None else None},
            "page_index": item["page_index"],
        })

    # Part 3/4 — paper question plus the transcript it belongs to.
    for nums, tr in sorted(transcripts.items()):
        part = "Part 3" if re.search(r"conversation", tr["header"], re.I) else "Part 4"
        group = []
        ok = True

        # A transcript is spoken English. Anything else here means the page's
        # graphic or its vocabulary list was captured instead of the script,
        # which leaves a question that cannot be answered from what is heard.
        text = tr["text"]
        if len(re.findall(r"[㐀-鿿]", text)) > 2:
            for n in nums:
                reject(n, "transcript captured Chinese page furniture, not the script")
            continue
        if len(text) < 200 or not re.search(r"\b(I|we|you|the|to)\b", text, re.I):
            for n in nums:
                reject(n, "transcript too short or not connected speech")
            continue
        # New-format TOEIC pairs some questions with a chart the listener reads.
        # Without that image the question is unanswerable, and the app selects
        # whole transcript groups, so the whole set has to go.
        if any(re.search(r"look at the graphic", (paper.get(n) or {}).get("stem", ""), re.I)
               for n in nums):
            for n in nums:
                reject(n, "set includes a graphic question and the chart is not extractable")
            continue
        for order, num in enumerate(nums, start=1):
            item = paper.get(num)
            entry = key.get(num)
            if item is None:
                reject(num, "no question printed in the test paper")
                ok = False
                continue
            if entry is None:
                reject(num, "not in the mock answer key")
                ok = False
                continue
            letter = entry["answer"]
            anchor = entry["answer_text"]
            score = similarity(anchor, item["choices"][letter]) if anchor else None
            if anchor and score < 0.55:
                reject(num, f"key quotes text that does not match choice {letter} ({score:.2f})")
                ok = False
                continue
            group.append({
                "source": "ed",
                "part": part,
                "number": num,
                "stem": item["stem"],
                "choices": {c: item["choices"][c] for c in ("A", "B", "C", "D")},
                "answer": letter,
                "transcript": tr["text"],
                "transcript_group": "-".join(map(str, nums)),
                "question_order": order,
                "match": {"anchor": round(score, 3) if score is not None else None},
                "page_index": item["page_index"],
            })
        # The app selects whole transcript groups and requires exactly three, so
        # a partial group is worse than none.
        if ok and len(group) == 3:
            accepted.extend(group)
        elif group:
            for g in group:
                reject(g["number"], "incomplete transcript group")

    by_part = defaultdict(int)
    for q in accepted:
        by_part[q["part"]] += 1
    (OUT_ROOT / "ed-listening.json").write_text(
        json.dumps(accepted, ensure_ascii=False, indent=1))
    (OUT_ROOT / "ed-listening-review.json").write_text(
        json.dumps(rejected, ensure_ascii=False, indent=1))

    print(f"answer key entries for the mock: {len(key)}")
    print(f"paper questions found: {len(paper)}   part2 scripts: {len(part2)}   "
          f"transcript groups: {len(transcripts)}")
    print(f"ACCEPTED: {len(accepted)} {dict(by_part)}")
    print(f"REJECTED: {len(rejected)}")
    reasons = defaultdict(int)
    for r in rejected:
        reasons[re.sub(r"[\d.]+", "N", r["reason"])] += 1
    for r, c in sorted(reasons.items(), key=lambda kv: -kv[1]):
        print(f"   {c:>4}x {r}")


if __name__ == "__main__":
    main()
