#!/usr/bin/env python3
"""
Page-level extractor for scanned TOEIC prep books.

Renders each PDF page with PyMuPDF and sends it to a vision model, which
transcribes the page into structured JSON. One JSON file per page, so the run
is resumable: an interrupted run picks up where it stopped, and a single bad
page can be re-done by deleting its file.

Both source books are pure image scans (no text layer), so this replaces OCR
entirely rather than post-processing it.

Usage:
  python3 extract.py --book xd --pages 30-120
  python3 extract.py --book xd --pages all --workers 8
  python3 extract.py --book ed --pages 150-260
"""

import argparse
import base64
import json
import os
import pathlib
import sys
import threading
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

import fitz  # PyMuPDF

HERE = pathlib.Path(__file__).resolve().parent
PIPELINE_ROOT = HERE.parent.parent
OUT_ROOT = PIPELINE_ROOT / "output" / "pdf-import"
DESKTOP = pathlib.Path.home() / "Desktop"

BOOKS = {
    # 新東方《TOEIC 托業閱讀全真模擬1000題》— old-format TOEIC, 10 reading tests
    # (Part 5 = 101-140, Part 6 = 141-152, Part 7 = 153-200) plus a Chinese
    # explanation section in which the correct choice is printed in bold.
    "xd": DESKTOP / (
        "TOEIC 托業閱讀全真模擬1000題 (新東方) "
        "(z-library.sk, 1lib.sk, z-lib.sk).pdf"
    ),
    # Eduwill《New TOEIC 一本攻克新制多益聽力＋閱讀850+》— new-format, traditional
    # Chinese, teaching units interleaved with practice sets.
    "ed": DESKTOP / (
        "New TOEIC 一本攻克新制多益聽力＋閱讀850+ ：完全比照最新考題趨勢精準命題"
        "（附QR Code線上音檔） (Eduwill語學硏究所 編關亭薇) "
        "(z-library.sk, 1lib.sk, z-lib.sk).pdf"
    ),
}

MODEL = os.environ.get("PDF_IMPORT_MODEL", "gpt-5-mini")
RENDER_DPI = 200

# Two providers so a run is not stranded when one account runs out of credit;
# both speak the OpenAI chat-completions shape, so only the endpoint and key differ.
PROVIDERS = {
    "openai": ("https://api.openai.com/v1/chat/completions", "OPENAI_API_KEY"),
    "openrouter": ("https://openrouter.ai/api/v1/chat/completions", "OPENROUTER_API_KEY"),
}

PROMPT = """You transcribe pages from a scanned TOEIC test-preparation book into JSON.

Return JSON only, with exactly this shape:
{
  "page_kind": "test_questions" | "explanations" | "teaching" | "front_matter" | "answer_key_table" | "other",
  "printed_page_number": <int or null>,
  "test_label": "<the test/chapter number printed on the side tab, or null>",
  "passages": [
    {
      "header": "<e.g. 'Questions 147-149 refer to the following article.' — null if absent>",
      "question_numbers": [147, 148, 149],
      "doc_type": "article" | "letter" | "e-mail" | "advertisement" | "notice" | "form" | "memo" | "chart" | "text-message" | "other",
      "text": "<full text of the reading document, verbatim, newlines preserved>",
      "continues_from_previous_page": true | false,
      "continues_on_next_page": true | false
    }
  ],
  "questions": [
    {
      "number": 147,
      "stem": "<the question sentence; \\"\\" if this is a passage blank with no stem>",
      "choices": {"A": "...", "B": "...", "C": "...", "D": "..."},
      "answer": "A" | "B" | "C" | "D" | null
    }
  ],
  "notes": "<anything illegible or unusual; \\"\\" if nothing>"
}

Rules:
1. Transcribe VERBATIM. Do not paraphrase, translate, summarise, or fix the
   author's grammar. This book contains deliberate errors as distractors.
2. This is a noisy scan. Vertical scan lines can cut through letters
   ("mentiorjed" = "mentioned"). Repair only damage of that kind, where the
   intended word is unambiguous. Never rewrite something merely because it
   looks odd.
3. Blanks inside a passage: write them as ---(147)--- using that blank's
   question number. Blanks inside a standalone sentence (Part 5): write the
   blank as -------.
4. "answer": ONLY fill this when THIS page marks the correct choice — bold
   text in the explanation section, or a "答案是(X)" line. Otherwise null.
   Never guess or reason out the answer yourself. A wrong answer key is worse
   than a missing one.
5. Chinese text on the page (translations, explanations, vocabulary lists) is
   NOT needed — skip it entirely. Only English test content and the answer
   markings matter.
6. Pages of prose instruction with no numbered test items are "teaching" or
   "front_matter": return empty passages and questions for them.
7. If a passage started on an earlier page, still transcribe the part visible
   here and set continues_from_previous_page.
"""


ANSWER_PROMPT = """This page is from the Traditional-Chinese answer booklet of a TOEIC
prep book. Each entry is a question number, its answer letter, a 中譯
(translation), a 解說 (explanation), and a 單字 (vocabulary) list.

Section headings on the page cross-reference the question book, like
「UNIT 06 找出同義詞　題本p.186」 or 「PRACTICE　題本 p.187」. That page number is
the single most important thing on this page: it says which page of the
question book the entries below it belong to. Entries continue under the most
recent heading, including from a previous page when this one opens with no
heading of its own.

Return JSON only:
{
  "page_kind": "answer_booklet",
  "section_label": "<the part/unit printed on the side tab, e.g. 'PART 5', 'UNIT 04'; null if none>",
  "printed_page_number": <this booklet page's own printed number, or null>,
  "headings": [
    {"label": "PRACTICE", "workbook_page": 187}
  ],
  "items": [
    {
      "number": 7,
      "answer": "A",
      "workbook_page": 187,
      "answer_text": "<the English wording of the correct choice as quoted in the 解說, e.g. 'promptly', 'resulting from', 'to abandon'; null if the 解說 quotes no English>"
    }
  ],
  "notes": ""
}

Rules:
1. "answer" is the letter printed in parentheses next to the item number.
2. "workbook_page" is the 題本 page number of the heading this entry sits under.
   Use null when no heading appears above it on this page — never guess a
   number, and never carry one over from a different section.
3. "headings" lists every 題本 reference on the page, in top-to-bottom order,
   even when no entries follow it here.
4. "answer_text" must be copied from the English that appears inside the 解說
   sentence naming the answer (typically after 答案要選 / 答案為 / 因此選).
   Copy the English only — no Chinese, no letter, no quotation marks. If the
   explanation names no English wording, use null.
5. Do not translate, and do not invent an answer_text that is not printed.
6. Include every numbered entry on the page, in order.
"""


def load_api_key(var: str) -> str:
    """Read a key from pipeline/.env without echoing it anywhere."""
    env_path = PIPELINE_ROOT / ".env"
    if not env_path.exists():
        sys.exit(f"missing {env_path}")
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if line.startswith(f"{var}="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit(f"{var} not found in pipeline/.env")


ENDPOINT = PROVIDERS["openai"][0]
API_KEY = ""
_print_lock = threading.Lock()
_usage = {"in": 0, "out": 0, "pages": 0}


def log(msg: str) -> None:
    with _print_lock:
        print(msg, flush=True)


def render_page(doc: fitz.Document, index: int) -> bytes:
    pix = doc[index].get_pixmap(dpi=RENDER_DPI)
    return pix.tobytes("jpeg", jpg_quality=88)


def call_vision(image_bytes: bytes, prompt: str, attempt_budget: int = 4) -> dict:
    b64 = base64.b64encode(image_bytes).decode()
    body = json.dumps({
        "model": MODEL,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {
                    "url": f"data:image/jpeg;base64,{b64}", "detail": "high"}},
            ],
        }],
        "response_format": {"type": "json_object"},
        "max_completion_tokens": 16000,
    }).encode()

    delay = 4.0
    last_err = None
    for attempt in range(attempt_budget):
        req = urllib.request.Request(
            ENDPOINT,
            data=body,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {API_KEY}",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                data = json.loads(resp.read())
            usage = data.get("usage", {})
            with _print_lock:
                _usage["in"] += usage.get("prompt_tokens", 0)
                _usage["out"] += usage.get("completion_tokens", 0)
                _usage["pages"] += 1
            content = data["choices"][0]["message"]["content"]
            finish = data["choices"][0].get("finish_reason")
            parsed = json.loads(content)
            parsed["_finish_reason"] = finish
            return parsed
        except (urllib.error.HTTPError, urllib.error.URLError,
                TimeoutError, json.JSONDecodeError, KeyError) as err:
            last_err = err
            if isinstance(err, urllib.error.HTTPError) and err.code not in (
                    429, 500, 502, 503, 504):
                raise RuntimeError(
                    f"HTTP {err.code}: {err.read()[:300].decode(errors='replace')}"
                ) from err
            if attempt < attempt_budget - 1:
                time.sleep(delay)
                delay *= 2
    raise RuntimeError(f"vision call failed after retries: {last_err}")


def process_page(book: str, pdf_path: pathlib.Path, index: int,
                 out_dir: pathlib.Path, prompt: str) -> str:
    out_file = out_dir / f"{book}_p{index:04d}.json"
    if out_file.exists():
        return "skip"
    doc = fitz.open(pdf_path)  # per-thread handle; fitz docs are not thread-safe
    try:
        img = render_page(doc, index)
    finally:
        doc.close()
    result = call_vision(img, prompt)
    result["_page_index"] = index
    result["_book"] = book
    out_file.write_text(json.dumps(result, ensure_ascii=False, indent=1))
    kind = result.get("page_kind", "?")
    nq = len(result.get("questions") or result.get("items") or [])
    npass = len(result.get("passages") or [])
    return f"p{index} {kind} q={nq} passages={npass}"


def parse_pages(spec: str, page_count: int) -> list[int]:
    if spec == "all":
        return list(range(page_count))
    pages: list[int] = []
    for chunk in spec.split(","):
        chunk = chunk.strip()
        if "-" in chunk:
            lo, hi = chunk.split("-")
            pages.extend(range(int(lo), int(hi) + 1))
        else:
            pages.append(int(chunk))
    return [p for p in pages if 0 <= p < page_count]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--book", required=True, choices=sorted(BOOKS))
    ap.add_argument("--pages", required=True, help="'all', '30-120', or '4,9,17'")
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--provider", choices=sorted(PROVIDERS), default="openai")
    ap.add_argument("--model", default=None, help="override the vision model id")
    ap.add_argument("--mode", choices=("pages", "answers"), default="pages",
                    help="'answers' reads the Chinese answer booklet, where the\n"
                         "correct choice is named in the explanation prose")
    args = ap.parse_args()

    global ENDPOINT, API_KEY, MODEL
    ENDPOINT, key_var = PROVIDERS[args.provider]
    API_KEY = load_api_key(key_var)
    if args.model:
        MODEL = args.model

    pdf_path = BOOKS[args.book]
    if not pdf_path.exists():
        sys.exit(f"PDF not found: {pdf_path}")

    probe = fitz.open(pdf_path)
    page_count = probe.page_count
    probe.close()

    pages = parse_pages(args.pages, page_count)
    prompt = ANSWER_PROMPT if args.mode == "answers" else PROMPT
    out_dir = OUT_ROOT / (f"{args.book}-answers" if args.mode == "answers"
                          else args.book)
    out_dir.mkdir(parents=True, exist_ok=True)
    todo = [p for p in pages if not (out_dir / f"{args.book}_p{p:04d}.json").exists()]
    log(f"{args.book}: {len(pages)} pages requested, {len(todo)} to do "
        f"({len(pages) - len(todo)} already extracted), model={MODEL}")

    started = time.time()
    failures: list[tuple[int, str]] = []
    done = 0
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {
            pool.submit(process_page, args.book, pdf_path, p, out_dir, prompt): p
            for p in todo
        }
        for fut in as_completed(futures):
            page = futures[fut]
            done += 1
            try:
                msg = fut.result()
            except Exception as err:  # noqa: BLE001 - report, keep going
                failures.append((page, str(err)[:200]))
                msg = f"p{page} FAILED: {str(err)[:120]}"
            if done % 10 == 0 or "FAIL" in msg:
                rate = done / max(time.time() - started, 1e-6)
                log(f"[{done}/{len(todo)}] {msg} | {rate*60:.0f} pages/min")

    elapsed = time.time() - started
    # gpt-5-mini list price, USD per 1M tokens.
    cost = _usage["in"] / 1e6 * 0.25 + _usage["out"] / 1e6 * 2.0
    log(f"\ndone in {elapsed/60:.1f} min | pages={_usage['pages']} "
        f"tokens in={_usage['in']} out={_usage['out']} | est ${cost:.2f}")
    if failures:
        log(f"FAILURES ({len(failures)}): " +
            ", ".join(f"p{p}" for p, _ in failures[:40]))
        for p, err in failures[:10]:
            log(f"  p{p}: {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()
