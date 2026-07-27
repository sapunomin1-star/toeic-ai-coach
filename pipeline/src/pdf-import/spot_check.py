#!/usr/bin/env python3
"""
Sample accepted questions and render the book page each answer came from.

The automated pairing checks are structural — they prove the explanation entry
restates the same question, not that the letter was read off the page
correctly. This renders the source page so a human (or a vision-capable
reviewer) can confirm the key against the printed book.

Usage:
  python3 spot_check.py --book xd --sample 10 [--seed 7]
"""

from __future__ import annotations

import argparse
import json
import pathlib
import random

import fitz

from extract import BOOKS  # reuse the one place the PDF paths are defined

HERE = pathlib.Path(__file__).resolve().parent
OUT_ROOT = HERE.parent.parent / "output" / "pdf-import"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--book", required=True, choices=sorted(BOOKS))
    ap.add_argument("--sample", type=int, default=10)
    ap.add_argument("--seed", type=int, default=1)
    args = ap.parse_args()

    accepted = json.loads(
        (OUT_ROOT / f"{args.book}-assembled.json").read_text())
    if not accepted:
        raise SystemExit("nothing assembled yet")

    rng = random.Random(args.seed)
    sample = rng.sample(accepted, min(args.sample, len(accepted)))
    sample.sort(key=lambda q: q.get("answer_page") or 0)

    check_dir = OUT_ROOT / f"{args.book}-spotcheck"
    check_dir.mkdir(exist_ok=True)
    for old in check_dir.glob("*.png"):
        old.unlink()

    doc = fitz.open(BOOKS[args.book])
    lines = []
    for q in sample:
        page = q.get("answer_page")
        lines.append(
            f"Q{q['number']} ({q['part']}, test {q['test']}) "
            f"-> extracted answer {q['answer']}   "
            f"[answer page pdf#{page}, stem match {q['match']['stem']}]"
        )
        lines.append(f"    {q['stem'][:110]}")
        for letter in ("A", "B", "C", "D"):
            mark = "*" if letter == q["answer"] else " "
            lines.append(f"   {mark}({letter}) {q['choices'][letter][:100]}")
        lines.append("")
        if page is not None:
            out = check_dir / f"answerpage_{page:04d}.png"
            if not out.exists():
                doc[page].get_pixmap(dpi=200).save(out)
    doc.close()

    report = "\n".join(lines)
    (check_dir / "sample.txt").write_text(report)
    print(report)
    print(f"rendered answer pages into {check_dir}")


if __name__ == "__main__":
    main()
