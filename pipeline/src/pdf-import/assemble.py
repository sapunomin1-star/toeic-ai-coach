#!/usr/bin/env python3
"""
Assemble per-page extraction JSON into candidate questions.

The 新東方 book prints each test twice: once as a blank test paper, and again in
the explanation section with the correct choice in bold. That redundancy is the
safety net here — a question is only accepted when its stem and choices from the
test paper match the restatement in the explanation section. An answer key that
silently slid by one question would be worse than no import at all, so anything
that fails the match is quarantined for review rather than guessed at.

Output:
  output/pdf-import/<book>-assembled.json   accepted questions
  output/pdf-import/<book>-review.json      everything rejected, with a reason
  output/pdf-import/<book>-report.txt       human-readable summary

Usage:
  python3 assemble.py --book xd
"""

from __future__ import annotations  # system python here is 3.9

import argparse
import json
import pathlib
import re
import sys
from collections import defaultdict

HERE = pathlib.Path(__file__).resolve().parent
OUT_ROOT = HERE.parent.parent / "output" / "pdf-import"

# Old-format TOEIC (pre-2016), which is what the 新東方 book uses.
OLD_FORMAT_PARTS = [(101, 140, "Part 5"), (141, 152, "Part 6"), (153, 200, "Part 7")]
# New-format TOEIC (2016+), used by the Eduwill book.
NEW_FORMAT_PARTS = [(101, 130, "Part 5"), (131, 146, "Part 6"), (147, 200, "Part 7")]

BOOK_FORMAT = {"xd": OLD_FORMAT_PARTS, "ed": NEW_FORMAT_PARTS}

STEM_MATCH_THRESHOLD = 0.60   # token overlap between paper and explanation stem
CHOICE_MATCH_THRESHOLD = 0.55


def part_by_number(number: int, layout) -> str | None:
    for lo, hi, part in layout:
        if lo <= number <= hi:
            return part
    return None


# A listening item carries a transcript, which looks exactly like a reading
# passage in the extracted JSON. What separates them is that the source is
# spoken: the instruction line names a conversation or talk, and the questions
# ask about "the speaker".
# Only document types that cannot be printed. "announcement", "notice",
# "introduction" and "tour information" all appear as printed reading passages
# in the reading-only book, so listing them here mislabelled real Part 7 items;
# the "speaker"/"listener" wording in the questions catches those cases anyway.
SPOKEN_HEADER = re.compile(
    r"conversation|\btalk\b|telephone message|recorded message|"
    r"broadcast|podcast|excerpt from a meeting|radio",
    re.I,
)
SPOKEN_STEM = re.compile(r"\b(speakers?|listeners?)\b", re.I)


def part_by_shape(q: dict) -> str | None:
    """Classify by the shape of the item rather than its number.

    Both books mix numbered full tests (101-200) with drill sections that
    restart their own numbering, so a number-range table alone silently drops
    every drill question. Shape is what actually defines the part:
      Part 3/4 - a spoken transcript (conversation vs monologue)
      Part 5   - a standalone sentence with a blank, no passage
      Part 6   - a passage carrying this question's blank inline
      Part 7   - a passage plus a real comprehension question
    """
    passage = q.get("passage") or ""
    stem = (q.get("stem") or "").strip()
    header = q.get("passage_header") or ""
    blank_here = f"---({q['number']})---" in passage

    if blank_here:
        return "Part 6"
    if passage:
        if not stem:
            return None
        if SPOKEN_HEADER.search(header) or SPOKEN_STEM.search(stem):
            return "Part 3" if re.search(r"conversation", header, re.I) else "Part 4"
        return "Part 7"
    if not stem:
        return None
    return "Part 5" if re.search(r"-{3,}|_{3,}", stem) else None


def norm_tokens(text: str) -> set[str]:
    return set(re.findall(r"[a-z0-9]+", (text or "").lower()))


def similarity(a: str, b: str) -> float:
    ta, tb = norm_tokens(a), norm_tokens(b)
    if not ta or not tb:
        return 1.0 if not ta and not tb else 0.0
    return len(ta & tb) / max(len(ta), len(tb))


def load_pages(book: str) -> list[dict]:
    d = OUT_ROOT / book
    pages = []
    for f in sorted(d.glob(f"{book}_p*.json")):
        try:
            pages.append(json.loads(f.read_text()))
        except json.JSONDecodeError:
            print(f"WARN unreadable {f.name}", file=sys.stderr)
    pages.sort(key=lambda p: p.get("_page_index", 0))
    return pages


def segment_by_test(pages: list[dict]) -> tuple[list[dict], list[dict]]:
    """Split page records into paper-side and answer-side, tagging test index.

    Both sides run 101..200 repeatedly. A drop in question number marks the
    start of the next test on that side. The two sides are tracked with
    independent counters because the book prints all papers first, then all
    explanations.
    """
    paper, answers = [], []
    counters = {"paper": 0, "answer": 0}
    high_water = {"paper": 0, "answer": 0}

    for page in pages:
        questions = page.get("questions") or []
        if not questions:
            # The books lay a reading document on the left page and its
            # questions on the right, so a page can carry a passage and no
            # questions at all. Skipping it would orphan every question in the
            # set. Such a page is always paper-side and stays in the test the
            # counter is currently on.
            if page.get("passages"):
                paper.append({"page": page, "test": counters["paper"]})
            continue
        # A page belongs to the answer side when it reveals correct choices.
        revealed = [q for q in questions if q.get("answer")]
        side = "answer" if len(revealed) >= max(1, len(questions) // 2) else "paper"

        numbers = [q.get("number") for q in questions if isinstance(q.get("number"), int)]
        if not numbers:
            continue
        # Only a genuine wrap (late in one test back to the start of the next)
        # counts. Small backwards steps happen constantly — a stray partial
        # question caught at the top of a page is enough — and treating those as
        # test boundaries shattered the book into dozens of phantom tests.
        if min(numbers) <= 115 and high_water[side] >= 170:
            counters[side] += 1
            high_water[side] = 0
        high_water[side] = max(high_water[side], max(numbers))

        record = {"page": page, "test": counters[side]}
        (answers if side == "answer" else paper).append(record)
    return paper, answers


def collect_paper(paper_pages: list[dict]) -> dict[tuple[int, int], dict]:
    """(page_index, number) -> question dict, with its passage attached.

    Keyed by page rather than by inferred test number: a question appears exactly
    once in the paper section, so this cannot collide, whereas keying on the
    inferred test index would silently drop a question whenever two tests were
    mistakenly given the same index.
    """
    out: dict[tuple[int, int], dict] = {}
    # passage text keyed by (test, tuple(question_numbers))
    passage_parts: dict[tuple, list[str]] = defaultdict(list)
    passage_meta: dict[tuple, dict] = {}

    # A passage group is identified by where it starts, not by its question
    # numbers. Teaching books restart numbering in every unit, so dozens of
    # unrelated documents share the numbers 1-3; keying on those merged them
    # into one blob and attached questions to the wrong reading. Fragments only
    # join across a page break, which is the one case a document is genuinely
    # split.
    open_groups: dict[tuple, tuple] = {}
    prev_page_index = None
    for rec in paper_pages:
        page, test = rec["page"], rec["test"]
        page_index = page.get("_page_index")
        for p in page.get("passages") or []:
            nums = tuple(sorted(n for n in (p.get("question_numbers") or [])
                                if isinstance(n, int)))
            if not nums:
                continue
            prior = open_groups.get((test, nums))
            continued = (
                prior is not None
                and p.get("continues_from_previous_page")
                and prev_page_index is not None
                and prior[1] >= prev_page_index
            )
            key = prior[0] if continued else (test, nums, page_index)
            open_groups[(test, nums)] = (key, page_index)
            passage_parts[key].append((p.get("text") or "").strip())
            meta = passage_meta.setdefault(key, {"doc_type": p.get("doc_type"),
                                                 "header": p.get("header")})
            if not meta.get("header") and p.get("header"):
                meta["header"] = p["header"]
        prev_page_index = page_index

        for q in page.get("questions") or []:
            num = q.get("number")
            if not isinstance(num, int):
                continue
            out[(page.get("_page_index"), num)] = {
                "test": test,
                "number": num,
                "stem": (q.get("stem") or "").strip(),
                "choices": q.get("choices") or {},
                "page_index": page.get("_page_index"),
                # The number printed on the page, which is what the answer
                # booklet cites ("題本 p.187") when pointing back at a question.
                "printed_page": page.get("printed_page_number"),
            }

    # Attach each passage to the questions printed with it. The books put the
    # document on the left page and its questions on the right, so the nearest
    # question page at or after the passage is the right one; picking the
    # globally-first match instead would hand the passage to a same-numbered
    # question from a different unit.
    for key in sorted(passage_parts, key=lambda k: (k[2], k[0])):
        test, nums, start_page = key
        text = "\n\n".join(t for t in passage_parts[key] if t)
        meta = passage_meta[key]
        for order, num in enumerate(nums, start=1):
            candidates = [
                q for q in out.values()
                if q["number"] == num and q["test"] == test and not q.get("passage")
                and q["page_index"] is not None
                and start_page - 1 <= q["page_index"] <= start_page + 2
            ]
            if not candidates:
                continue
            q = min(candidates, key=lambda c: abs(c["page_index"] - start_page))
            q["passage"] = text
            q["passage_numbers"] = list(nums)
            q["passage_order"] = order
            q["passage_group_key"] = f"{test}-{start_page}-{'-'.join(map(str, nums))}"
            q["doc_type"] = meta.get("doc_type")
            q["passage_header"] = meta.get("header")
    return out


def collect_answers(answer_pages: list[dict]) -> dict[int, list[dict]]:
    """question number -> every revealed answer in the book carrying that number.

    Keyed by number alone, not by (test, number): which test an explanation page
    belongs to is inferred from page order, and one misread page would shift that
    counter and silently mis-key every answer after it. Matching on content
    instead makes the pairing independent of page segmentation.
    """
    out: dict[int, list[dict]] = defaultdict(list)
    for rec in answer_pages:
        page, test = rec["page"], rec["test"]
        for q in page.get("questions") or []:
            num, ans = q.get("number"), q.get("answer")
            if not isinstance(num, int) or ans not in ("A", "B", "C", "D"):
                continue
            stem = (q.get("stem") or "").strip()
            choices = q.get("choices") or {}
            # Bare answer-key-table rows carry a letter and nothing else. They
            # cannot be content-matched, and leaving them in the pool lets a
            # question "match" a row that says nothing about it. They are picked
            # up separately as an independent cross-check.
            if not stem and not any((choices.get(c) or "").strip()
                                    for c in ("A", "B", "C", "D")):
                continue
            out[num].append({
                "answer": ans,
                "stem": stem,
                "choices": choices,
                "test": test,
                "page_index": page.get("_page_index"),
            })
    return out


def collect_answer_tables(answer_pages: list[dict]) -> list[tuple[int, dict[int, str]]]:
    """The compact answer-key tables, as (page index, {number: letter}).

    Each test is preceded by one of these. Used only to confirm the letter that
    content matching already produced, never as the sole source: a table row has
    no text to tie it to a particular question.
    """
    tables: list[tuple[int, dict[int, str]]] = []
    for rec in answer_pages:
        page = rec["page"]
        rows: dict[int, str] = {}
        bare = 0
        for q in page.get("questions") or []:
            num, ans = q.get("number"), q.get("answer")
            if not isinstance(num, int) or ans not in ("A", "B", "C", "D"):
                continue
            rows[num] = ans
            if not (q.get("stem") or "").strip():
                bare += 1
        # A real table lists a whole test at once, with no question text.
        if len(rows) >= 40 and bare >= len(rows) * 0.8:
            tables.append((page.get("_page_index", 0), rows))
    tables.sort(key=lambda t: t[0])
    return tables


def collect_answer_anchors(book: str) -> dict[int, list[dict]]:
    """Answers from a Chinese answer booklet, each with an English anchor.

    Books that only print `7. (A)` give nothing to match on, and question
    numbers restart in every unit, so a letter alone cannot be attached to a
    question with any confidence. These booklets do name the correct choice in
    the prose ("答案要選 (A) promptly"), and that English fragment is enough to
    identify which question — and which letter — the entry belongs to.
    """
    out: dict[int, list[dict]] = defaultdict(list)
    d = OUT_ROOT / f"{book}-answers"
    if not d.exists():
        return out
    for f in sorted(d.glob("*.json")):
        try:
            page = json.loads(f.read_text())
        except json.JSONDecodeError:
            continue
        for item in page.get("items") or []:
            num, ans = item.get("number"), item.get("answer")
            text = (item.get("answer_text") or "").strip()
            if not isinstance(num, int) or ans not in ("A", "B", "C", "D") or not text:
                continue
            out[num].append({
                "answer": ans,
                "answer_text": text,
                "section": (page.get("section_label") or "").upper(),
                "page_index": page.get("_page_index"),
            })
    return out


def collect_workbook_answers(book: str) -> dict[tuple[int, int], list[dict]]:
    """(question-book page, item number) -> answer entries.

    The answer booklet cites the page it is answering ("PRACTICE 題本 p.187"),
    which is an exact pointer back to the questions — unlike the item numbers
    alone, which restart in every unit. Headings appear once and the entries
    below them continue onto later pages, so the last heading seen carries
    forward until the next one replaces it.
    """
    out: dict[tuple[int, int], list[dict]] = defaultdict(list)
    d = OUT_ROOT / f"{book}-answers"
    if not d.exists():
        return out
    current_page: int | None = None
    for f in sorted(d.glob("*.json")):
        try:
            page = json.loads(f.read_text())
        except json.JSONDecodeError:
            continue
        for item in page.get("items") or []:
            num, ans = item.get("number"), item.get("answer")
            wp = item.get("workbook_page")
            if isinstance(wp, int):
                current_page = wp
            if not isinstance(num, int) or ans not in ("A", "B", "C", "D"):
                continue
            if current_page is None:
                continue
            out[(current_page, num)].append({
                "answer": ans,
                "answer_text": (item.get("answer_text") or "").strip(),
                "workbook_page": current_page,
                "page_index": page.get("_page_index"),
            })
        # A heading can sit at the foot of a page with its entries overleaf.
        for h in page.get("headings") or []:
            if isinstance(h.get("workbook_page"), int):
                current_page = h["workbook_page"]
    return out


def match_by_anchor(q: dict, part: str, candidates: list[dict]):
    """Find the booklet entry whose quoted English is one of this question's choices."""
    best = None
    best_score = 0.0
    runner_up = 0.0
    for cand in candidates:
        # Only a "PART n" side tab says anything about which part an entry
        # belongs to; unit labels do not, so they must not filter anything out.
        section = cand["section"].replace(" ", "")
        if section.startswith("PART") and part.upper().replace(" ", "") not in section:
            continue
        choice_text = q["choices"].get(cand["answer"]) or ""
        score = similarity(cand["answer_text"], choice_text)
        # A short quote such as "even though" is a substring of the full choice
        # rather than the whole of it; treat containment as a full match.
        norm_choice = re.sub(r"[^a-z0-9 ]+", "", choice_text.lower())
        norm_anchor = re.sub(r"[^a-z0-9 ]+", "", cand["answer_text"].lower())
        if norm_anchor and norm_anchor in norm_choice:
            score = max(score, 0.95)
        if score > best_score:
            runner_up, best_score, best = best_score, score, cand
        elif score > runner_up:
            runner_up = score
    return best, best_score, runner_up


def table_for_page(tables, page_index: int) -> dict[int, str] | None:
    """The answer table that opens the explanation block containing this page."""
    chosen = None
    for start, rows in tables:
        if start <= page_index:
            chosen = rows
        else:
            break
    return chosen


def best_answer_match(q: dict, candidates: list[dict]) -> tuple[dict | None, float, float, float]:
    """Pick the explanation-side entry that actually restates this question.

    Returns (candidate, stem_sim, choice_sim, runner_up_score). A close runner-up
    means two questions in the book look alike, so the caller can refuse rather
    than coin-flip between them.
    """
    scored = []
    for cand in candidates:
        stem_sim = similarity(q["stem"], cand["stem"])
        letters = [c for c in ("A", "B", "C", "D")
                   if q["choices"].get(c) and cand["choices"].get(c)]
        choice_sim = (
            sum(similarity(q["choices"][c], cand["choices"][c]) for c in letters) / len(letters)
            if letters else 0.0
        )
        combined = choice_sim if not norm_tokens(q["stem"]) else (stem_sim + choice_sim) / 2
        scored.append((combined, stem_sim, choice_sim, cand))
    if not scored:
        return None, 0.0, 0.0, 0.0
    scored.sort(key=lambda s: -s[0])
    top = scored[0]
    runner_up = scored[1][0] if len(scored) > 1 else 0.0
    return top[3], top[1], top[2], runner_up


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--book", required=True)
    ap.add_argument(
        "--single-source", action="store_true",
        help="also take questions whose answer is marked on the same page "
             "(teaching-style books); no cross-check is possible for these")
    args = ap.parse_args()
    book = args.book
    layout = BOOK_FORMAT[book]
    allow_single_source = args.single_source

    pages = load_pages(book)
    paper_pages, answer_pages = segment_by_test(pages)
    paper = collect_paper(paper_pages)
    answers = collect_answers(answer_pages)
    tables = collect_answer_tables(answer_pages)
    anchors = collect_answer_anchors(book)
    workbook = collect_workbook_answers(book)
    ed_cross = defaultdict(int)

    accepted, review = [], []
    cross = {"agree": 0, "disagree": 0, "no_table": 0}
    kinds = defaultdict(int)
    for p in pages:
        kinds[p.get("page_kind", "?")] += 1

    # Each explanation entry restates exactly one question. If two paper
    # questions both claim the same entry, at least one pairing is wrong.
    claimed: dict[tuple, list[int]] = defaultdict(list)

    for key in sorted(paper):
        q = paper[key]
        test, num = q["test"], q["number"]
        part = part_by_shape(q)
        expected = part_by_number(num, layout)
        candidates = answers.get(num, [])
        a, stem_sim, choice_sim, runner_up = best_answer_match(q, candidates)
        combined = choice_sim if not norm_tokens(q["stem"]) else (stem_sim + choice_sim) / 2

        def reject(reason: str) -> None:
            review.append({**q, "reason": reason,
                           "answer_side": a and {"answer": a["answer"],
                                                 "stem": a["stem"]}})

        if part is None:
            reject("could not classify part from question shape")
            continue

        # Books with a Chinese answer booklet are matched on its English anchor
        # instead; there is no restated test paper to pair against.
        if anchors or workbook:
            # Two independent readings of the same booklet: the page-and-number
            # citation, and the English the explanation quotes. Neither is
            # trusted blindly — where both speak they must agree.
            cand, score, runner = match_by_anchor(q, part, anchors.get(num, []))
            anchor_answer = None
            if cand is not None and score >= 0.80 and runner <= score - 0.15:
                anchor_answer = cand["answer"]

            wb_answer = None
            rows = workbook.get((q.get("printed_page"), num), []) if q.get("printed_page") else []
            distinct = {r["answer"] for r in rows}
            if len(distinct) == 1:
                wb_answer = rows[0]["answer"]
            elif len(distinct) > 1:
                ed_cross["ambiguous_page"] += 1

            if anchor_answer and wb_answer:
                if anchor_answer != wb_answer:
                    ed_cross["disagree"] += 1
                    reject(f"booklet page cites {wb_answer} but its explanation quotes "
                           f"{anchor_answer}")
                    continue
                ed_cross["agree"] += 1
                answer_source = "booklet-cross-checked"
            elif anchor_answer:
                ed_cross["anchor_only"] += 1
                answer_source = "booklet-english-quote"
            elif wb_answer:
                ed_cross["page_only"] += 1
                answer_source = "booklet-page-citation"
            else:
                reject("no answer-booklet entry matches this question")
                continue

            final_answer = anchor_answer or wb_answer
            if part in ("Part 6", "Part 7") and not q.get("passage"):
                reject(f"{part} question has no passage")
                continue
            accepted.append({
                "source": book,
                "test": test,
                "number": num,
                "part": part,
                "stem": q["stem"],
                "choices": {c: q["choices"][c] for c in ("A", "B", "C", "D")},
                "answer": final_answer,
                "passage": q.get("passage"),
                "passage_numbers": q.get("passage_numbers"),
                "passage_order": q.get("passage_order"),
                "passage_group_key": q.get("passage_group_key"),
                "passage_header": q.get("passage_header"),
                "doc_type": q.get("doc_type"),
                "match": {"stem": None, "choices": round(score, 3),
                          "runner_up": round(runner, 3)},
                "answer_source": answer_source,
                "answer_page": (cand or (rows[0] if rows else {})).get("page_index"),
                "workbook_page": q.get("printed_page"),
                "page_index": q.get("page_index"),
            })
            continue

        if expected and expected != part:
            # Inside a full 101-200 test the printed numbering is authoritative,
            # so a shape that disagrees means something was misread upstream.
            reject(f"shape says {part} but number {num} belongs to {expected}")
            continue
        if a is None:
            reject("no answer found in explanation section")
            continue
        if len([c for c in ("A", "B", "C", "D")
                if q["choices"].get(c) and a["choices"].get(c)]) < 4:
            reject("fewer than 4 choices present on both sides")
            continue
        if combined < STEM_MATCH_THRESHOLD or choice_sim < CHOICE_MATCH_THRESHOLD:
            reject(f"paper/explanation mismatch (stem={stem_sim:.2f} choices={choice_sim:.2f})")
            continue
        if runner_up > combined - 0.12:
            reject(f"ambiguous answer match (best={combined:.2f} runner-up={runner_up:.2f})")
            continue
        if part in ("Part 6", "Part 7") and not q.get("passage"):
            reject(f"{part} question has no passage")
            continue

        claimed[(a["page_index"], num)].append(len(accepted))
        accepted.append({
            "source": book,
            "test": test,
            "number": num,
            "part": part,
            "stem": q["stem"],
            "choices": {c: q["choices"][c] for c in ("A", "B", "C", "D")},
            "answer": a["answer"],
            "passage": q.get("passage"),
            "passage_numbers": q.get("passage_numbers"),
            "passage_order": q.get("passage_order"),
            "passage_group_key": q.get("passage_group_key"),
            "passage_header": q.get("passage_header"),
            "doc_type": q.get("doc_type"),
            "match": {"stem": round(stem_sim, 3), "choices": round(choice_sim, 3),
                      "runner_up": round(runner_up, 3)},
            "answer_page": a["page_index"],
            "page_index": q.get("page_index"),
        })

    # Cross-check against the answer-key tables, but only once a table is shown
    # to belong to the block it precedes. Tables are located by page order, and
    # one unrecognised table shifts every later block onto the wrong key — which
    # showed up as a whole test's worth of "disagreements" that were really the
    # comparison being wrong, not the answers.
    block_of: dict[int, int] = {}
    for i, q in enumerate(accepted):
        table = table_for_page(tables, q["answer_page"])
        if table is not None:
            block_of[i] = max(start for start, _ in tables if start <= q["answer_page"])

    trusted_blocks = set()
    for start, rows in tables:
        members = [i for i, s in block_of.items() if s == start]
        checkable = [i for i in members if rows.get(accepted[i]["number"])]
        if len(checkable) < 20:
            continue
        agree = sum(1 for i in checkable
                    if rows[accepted[i]["number"]] == accepted[i]["answer"])
        if agree / len(checkable) >= 0.90:
            trusted_blocks.add(start)

    table_rejects: set[int] = set()
    for i, q in enumerate(accepted):
        start = block_of.get(i)
        if start is None or start not in trusted_blocks:
            cross["no_table"] += 1
            continue
        rows = dict(tables)[start]
        table_answer = rows.get(q["number"])
        if table_answer is None:
            cross["no_table"] += 1
        elif table_answer != q["answer"]:
            cross["disagree"] += 1
            table_rejects.add(i)
            accepted[i] = {
                **q,
                "reason": f"answer table says {table_answer} but explanation "
                          f"says {q['answer']}",
            }
        else:
            cross["agree"] += 1
            accepted[i] = {**q, "answer_source": "paper+explanation+table"}
    if table_rejects:
        review.extend(accepted[i] for i in sorted(table_rejects))
        accepted = [q for i, q in enumerate(accepted) if i not in table_rejects]
        claimed = defaultdict(list)
        for i, q in enumerate(accepted):
            claimed[(q["answer_page"], q["number"])].append(i)

    # An explanation entry restates exactly one question, so two claims on the
    # same entry means one of them is spurious — usually a page whose bold
    # answers went unrecognised, leaving it filed as a test paper. Keep the
    # clearly better match and drop the rest; if the scores are close there is
    # nothing to choose between them, so drop them all.
    dropped: set[int] = set()
    for idxs in claimed.values():
        if len(idxs) < 2:
            continue
        ranked = sorted(idxs, key=lambda i: -accepted[i]["match"]["choices"])
        best, second = ranked[0], ranked[1]
        margin = (accepted[best]["match"]["choices"]
                  - accepted[second]["match"]["choices"])
        losers = ranked[1:] if margin >= 0.10 else ranked
        for idx in losers:
            dropped.add(idx)
            accepted[idx] = {**accepted[idx],
                             "reason": "another question matched the same explanation entry"}
    if dropped:
        review.extend(accepted[i] for i in sorted(dropped))
        accepted = [q for i, q in enumerate(accepted) if i not in dropped]

    # Teaching-style books print a question and mark its answer on the same
    # page, so those items never appear on the paper side and the pairing logic
    # above would drop them. There is nothing to cross-check — the answer sits
    # beside the question — so they are taken as-is and tagged single-source.
    if allow_single_source:
        used = {(q["answer_page"], q["number"]) for q in accepted}
        for rec in answer_pages:
            page = rec["page"]
            page_index = page.get("_page_index")
            page_passages = {
                n: p for p in (page.get("passages") or [])
                for n in (p.get("question_numbers") or [])
            }
            for item in page.get("questions") or []:
                num, ans = item.get("number"), item.get("answer")
                if not isinstance(num, int) or ans not in ("A", "B", "C", "D"):
                    continue
                if (page_index, num) in used:
                    continue
                choices = item.get("choices") or {}
                if not all((choices.get(c) or "").strip() for c in ("A", "B", "C", "D")):
                    continue
                p = page_passages.get(num)
                candidate = {
                    "test": rec["test"],
                    "number": num,
                    "stem": (item.get("stem") or "").strip(),
                    "choices": choices,
                    "passage": (p or {}).get("text"),
                    "passage_numbers": (p or {}).get("question_numbers"),
                    "passage_header": (p or {}).get("header"),
                    "passage_group_key": f"same-page-{page_index}",
                }
                part = part_by_shape(candidate)
                if part is None:
                    continue
                accepted.append({
                    "source": book,
                    "test": rec["test"],
                    "number": num,
                    "part": part,
                    "stem": candidate["stem"],
                    "choices": {c: choices[c] for c in ("A", "B", "C", "D")},
                    "answer": ans,
                    "passage": candidate["passage"],
                    "passage_numbers": candidate["passage_numbers"],
                    "passage_order": None,
                    "passage_group_key": candidate.get("passage_group_key"),
                    "passage_header": candidate["passage_header"],
                    "doc_type": (p or {}).get("doc_type"),
                    "match": {"stem": None, "choices": None, "runner_up": None},
                    "answer_source": "same-page",
                    "answer_page": page_index,
                    "page_index": page_index,
                })

    for q in accepted:
        # "cross-checked" means the paper and the explanation restate the same
        # question, which pins the pairing. Only the +table variant has a second
        # reading of the letter itself.
        q.setdefault("answer_source", "paper+explanation")

    (OUT_ROOT / f"{book}-assembled.json").write_text(
        json.dumps(accepted, ensure_ascii=False, indent=1))
    (OUT_ROOT / f"{book}-review.json").write_text(
        json.dumps(review, ensure_ascii=False, indent=1))

    by_part = defaultdict(int)
    by_source = defaultdict(int)
    for q in accepted:
        by_part[q["part"]] += 1
        by_source[q["answer_source"]] += 1
    reasons = defaultdict(int)
    for r in review:
        reasons[re.sub(r"[\d.]+", "N", r["reason"])] += 1
    tests_paper = len({q["test"] for q in paper.values()})
    tests_ans = len({c["test"] for cands in answers.values() for c in cands})

    lines = [
        f"book: {book}",
        f"pages extracted: {len(pages)}  kinds: {dict(kinds)}",
        f"test papers detected: {tests_paper}   answer sets detected: {tests_ans}",
        f"paper questions: {len(paper)}   "
        f"answer entries: {sum(len(v) for v in answers.values())}",
        f"answer-key tables found: {len(tables)}",
        f"cross-check vs table: agree={cross['agree']} disagree={cross['disagree']} "
        f"no-table={cross['no_table']}",
        (f"booklet pairing: {dict(ed_cross)}" if ed_cross else None),
        f"ACCEPTED: {len(accepted)}  {dict(by_part)}",
        f"  answer source: {dict(by_source)}",
        f"REVIEW:   {len(review)}",
        *[f"   - {c:>4}x {r}" for r, c in sorted(reasons.items(), key=lambda kv: -kv[1])],
    ]
    report = "\n".join(l for l in lines if l)
    (OUT_ROOT / f"{book}-report.txt").write_text(report + "\n")
    print(report)


if __name__ == "__main__":
    main()
