#!/usr/bin/env python3
"""Build complete source-aligned English for Sridhara Svami, Bhagavatam Cantos 2 and 10.

This script never summarizes the commentary.  It translates the exact Sanskrit
Bhavartha-dipika block attached to each verse/range and stores that direct English
next to the existing lexical word-for-word layer.  Hand-reviewed records are
preserved verbatim and take precedence over machine-direct records.

The machine pass uses Google's Sanskrit -> English translation endpoint only as
a direct translation engine.  Records produced by it are marked source_aligned,
not reviewed, so the data never falsely claims human philological review.
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from threading import Lock

ROOT = Path(__file__).resolve().parents[1]
C10_SOURCE = ROOT / "assets" / "data" / "canto10-sridhara-source"
C10_OUT = ROOT / "assets" / "data" / "canto10-sridhara-word-for-word"
C2_OUT = ROOT / "assets" / "data" / "canto2-sridhara-reviewed"
C2_ARTICLE = ROOT / "articles" / "srimad-bhagavatam-second-canto-sridhara-svami-rebuild"
CACHE_FILE = ROOT / "assets" / "data" / "sridhara-direct-translation-cache.json"

GOOGLE_URL = "https://translate.googleapis.com/translate_a/single"
UA = "vivekadrishti-sridhara-direct-translation/1.0"
METHOD = "google-sa-en-direct-2026-08-24"

DEVANAGARI = re.compile(r"[\u0900-\u097f]")
NO_COMMENTARY = re.compile(r"^\s*न\s+व्याख्यातम्[।.]?\s*$", re.U)
SEPARATOR = re.compile(r"^[-_=]{12,}\**\s*$")
VERSE_TRAILER = re.compile(r"\s*॥\s*[०-९0-9]+(?:[.\-–—][०-९0-9]+)*\s*॥?\s*$")

cache_lock = Lock()
try:
    CACHE: dict[str, str] = json.loads(CACHE_FILE.read_text(encoding="utf-8")) if CACHE_FILE.exists() else {}
except Exception:
    CACHE = {}


def clean_source(text: str) -> str:
    text = str(text or "").replace("\u200b", "").replace("\ufeff", "")
    lines = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or SEPARATOR.fullmatch(line):
            if lines and lines[-1] != "":
                lines.append("")
            continue
        line = line.replace("**", "").replace("\\'", "'")
        line = re.sub(r"\\([\\`*_{}\[\]()#+\-.!])", r"\1", line)
        lines.append(line.strip())
    text = "\n".join(lines)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip(" \n*-_")


def no_commentary(text: str) -> bool:
    compact = clean_source(text)
    compact = VERSE_TRAILER.sub("", compact).strip()
    return bool(NO_COMMENTARY.fullmatch(compact))


def source_hash(text: str) -> str:
    return hashlib.sha256(clean_source(text).encode("utf-8")).hexdigest()


def split_for_translation(text: str, limit: int = 850) -> list[str]:
    """Split without changing order/content, preferring Sanskrit sentence boundaries."""
    text = clean_source(text)
    if len(text) <= limit:
        return [text] if text else []

    units = re.split(r"(?<=[।॥?!])\s+|\n{2,}", text)
    chunks: list[str] = []
    current = ""
    for unit in units:
        unit = unit.strip()
        if not unit:
            continue
        if len(unit) > limit:
            # Long scholastic sentences: split conservatively at commas/semicolons,
            # then only at spaces as a last resort. Nothing is omitted.
            subunits = re.split(r"(?<=[,;:])\s+", unit)
        else:
            subunits = [unit]
        for sub in subunits:
            sub = sub.strip()
            if not sub:
                continue
            while len(sub) > limit:
                cut = sub.rfind(" ", 0, limit)
                if cut < limit // 2:
                    cut = limit
                piece, sub = sub[:cut].strip(), sub[cut:].strip()
                if current:
                    chunks.append(current)
                    current = ""
                if piece:
                    chunks.append(piece)
            candidate = f"{current} {sub}".strip() if current else sub
            if len(candidate) <= limit:
                current = candidate
            else:
                if current:
                    chunks.append(current)
                current = sub
    if current:
        chunks.append(current)
    return chunks


def google_translate_once(text: str) -> str:
    payload = urllib.parse.urlencode({
        "client": "gtx",
        "sl": "sa",
        "tl": "en",
        "dt": "t",
        "q": text,
    }).encode("utf-8")
    request = urllib.request.Request(
        GOOGLE_URL,
        data=payload,
        headers={
            "User-Agent": UA,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        data = json.loads(response.read().decode("utf-8"))
    result = "".join(part[0] for part in (data[0] or []) if part and part[0])
    return re.sub(r"\s+", " ", result).strip()


def direct_translate(text: str) -> str:
    text = clean_source(text)
    if not text:
        return ""
    if no_commentary(text):
        return "Not explained."
    key = source_hash(text)
    with cache_lock:
        cached = CACHE.get(key)
    if cached:
        return cached

    chunks = split_for_translation(text)
    translated: list[str] = []
    for chunk in chunks:
        last_error: Exception | None = None
        for attempt in range(7):
            try:
                translated.append(google_translate_once(chunk))
                last_error = None
                break
            except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, json.JSONDecodeError) as exc:
                last_error = exc
                time.sleep(min(12.0, 0.7 * (2 ** attempt)))
        if last_error is not None:
            raise RuntimeError(f"translation failed after retries: {chunk[:120]!r}: {last_error}")
    result = " ".join(part for part in translated if part).strip()
    with cache_lock:
        CACHE[key] = result
    return result


def load_json(path: Path) -> dict:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else {}
    except Exception:
        return {}


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def reviewed_records(data: dict) -> dict:
    return {
        str(key): value
        for key, value in data.items()
        if isinstance(value, dict) and value.get("reviewed") is True
    }


def source_aligned_record(source: str, translation: str, lexical: str = "") -> dict:
    record = {
        "source_aligned": True,
        "translation_method": METHOD,
        "source_sha256": source_hash(source),
        "translation": translation.strip(),
    }
    if lexical.strip():
        record["word_for_word"] = lexical.strip()
    else:
        # Never invent a summary for the lexical layer. If no earlier lexical
        # gloss exists, preserve the exact Sanskrit unit next to its direct
        # English translation so the correspondence stays visible and auditable.
        record["word_for_word"] = f"{clean_source(source)} — {translation.strip()}"
    return record


def build_canto10() -> tuple[int, int]:
    jobs: list[tuple[int, str, str, str]] = []
    outputs: dict[int, dict] = {}
    total_actual = 0

    for chapter in range(1, 91):
        source_doc = load_json(C10_SOURCE / f"{chapter:02d}.json")
        source_entries = source_doc.get("entries") if isinstance(source_doc.get("entries"), dict) else {}
        existing = load_json(C10_OUT / f"{chapter:02d}.json")
        out = reviewed_records(existing)
        outputs[chapter] = out

        for key, meta in source_entries.items():
            if not isinstance(meta, dict):
                continue
            source = clean_source(meta.get("sanskrit", ""))
            if not source:
                continue
            total_actual += 1

            # A hand-reviewed exact-key record always wins.
            if key in out:
                continue

            lexical = ""
            prior = existing.get(str(key))
            if isinstance(prior, dict):
                lexical = str(prior.get("word_for_word") or prior.get("wordForWord") or "").strip()
            elif isinstance(prior, str):
                lexical = prior.strip()

            if no_commentary(source):
                out[str(key)] = source_aligned_record(source, "Not explained.", lexical or "na vyākhyātam — not explained")
                continue
            jobs.append((chapter, str(key), source, lexical))

    def run(job: tuple[int, str, str, str]):
        chapter, key, source, lexical = job
        return chapter, key, source_aligned_record(source, direct_translate(source), lexical)

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(run, job) for job in jobs]
        done = 0
        for future in as_completed(futures):
            chapter, key, record = future.result()
            outputs[chapter][key] = record
            done += 1
            if done % 50 == 0 or done == len(jobs):
                print(f"Canto 10 direct translations: {done}/{len(jobs)}")

    for chapter, out in outputs.items():
        # Natural numeric ordering, ranges by their first number.
        ordered = dict(sorted(out.items(), key=lambda item: tuple(int(x) for x in re.findall(r"\d+", item[0])[:2]) or (9999,)))
        write_json(C10_OUT / f"{chapter:02d}.json", ordered)

    return total_actual, len(jobs)


def extract_canto2_sections() -> dict[int, dict[str, dict[str, str]]]:
    try:
        from bs4 import BeautifulSoup
    except Exception as exc:
        raise SystemExit(f"BeautifulSoup is required for Canto 2 extraction: {exc}")

    files = [C2_ARTICLE / "index.html"] + sorted((C2_ARTICLE / "fragments").glob("*.html"))
    chapters: dict[int, dict[str, dict[str, str]]] = {ch: {} for ch in range(1, 11)}
    id_re = re.compile(r"^sb-2-(\d+)-(\d+)(?:-(\d+))?$", re.I)

    for path in files:
        if not path.exists():
            continue
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="replace"), "html.parser")
        for section in soup.select("section"):
            heading = section.select_one(".sb-verse[id]")
            ident = (heading.get("id") if heading else section.get("aria-labelledby")) or ""
            match = id_re.match(ident)
            if not match:
                continue
            chapter = int(match.group(1))
            if not (1 <= chapter <= 10):
                continue
            start = int(match.group(2))
            end = int(match.group(3) or match.group(2))
            key = str(start) if start == end else f"{start}-{end}"

            details = None
            for candidate in section.find_all("details", recursive=False):
                summary = candidate.find("summary")
                if summary and "Śrīdhara Sanskrit" in summary.get_text(" ", strip=True):
                    details = candidate
                    break
            if details is None:
                continue

            source = ""
            for candidate in details.find_all(["p", "div"], recursive=True):
                lang = str(candidate.get("lang") or "")
                text = candidate.get_text(" ", strip=True)
                if DEVANAGARI.search(text) and (lang.startswith("sa") or not source):
                    source = text
                    if lang.startswith("sa"):
                        break
            source = clean_source(source)
            if not source:
                continue

            lexical = ""
            for p in details.find_all(["p", "div"], recursive=True):
                text = p.get_text(" ", strip=True)
                if re.match(r"^Śrīdhara\s+word-for-word\.?", text, re.I):
                    lexical = re.sub(r"^Śrīdhara\s+word-for-word\.?\s*", "", text, flags=re.I).strip()
                    break

            chapters[chapter][key] = {"source": source, "word_for_word": lexical}
    return chapters


def build_canto2() -> tuple[int, int]:
    extracted = extract_canto2_sections()
    jobs: list[tuple[int, str, str, str]] = []
    outputs: dict[int, dict] = {}
    total = 0

    for chapter in range(1, 11):
        existing = load_json(C2_OUT / f"{chapter:02d}.json")
        out = reviewed_records(existing)
        outputs[chapter] = out
        for key, item in extracted.get(chapter, {}).items():
            source = clean_source(item.get("source", ""))
            lexical = str(item.get("word_for_word") or "").strip()
            if not source:
                continue
            total += 1
            if key in out:
                continue
            if no_commentary(source):
                out[key] = source_aligned_record(source, "Not explained.", lexical or "na vyākhyātam — not explained")
            else:
                jobs.append((chapter, key, source, lexical))

    def run(job: tuple[int, str, str, str]):
        chapter, key, source, lexical = job
        return chapter, key, source_aligned_record(source, direct_translate(source), lexical)

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(run, job) for job in jobs]
        done = 0
        for future in as_completed(futures):
            chapter, key, record = future.result()
            outputs[chapter][key] = record
            done += 1
            if done % 40 == 0 or done == len(jobs):
                print(f"Canto 2 direct translations: {done}/{len(jobs)}")

    for chapter, out in outputs.items():
        ordered = dict(sorted(out.items(), key=lambda item: tuple(int(x) for x in re.findall(r"\d+", item[0])[:2]) or (9999,)))
        write_json(C2_OUT / f"{chapter:02d}.json", ordered)

    return total, len(jobs)


def validate() -> None:
    errors: list[str] = []

    # Every exact Canto 10 Sanskrit block must now have an English data record.
    for chapter in range(1, 91):
        src = load_json(C10_SOURCE / f"{chapter:02d}.json").get("entries", {})
        data = load_json(C10_OUT / f"{chapter:02d}.json")
        for key, meta in (src.items() if isinstance(src, dict) else []):
            source = clean_source(meta.get("sanskrit", "")) if isinstance(meta, dict) else ""
            if not source:
                continue
            record = data.get(str(key))
            if not isinstance(record, dict):
                errors.append(f"C10 {chapter}.{key}: missing record")
                continue
            if not str(record.get("translation") or record.get("direct_translation") or "").strip():
                errors.append(f"C10 {chapter}.{key}: missing direct translation")
            if not str(record.get("word_for_word") or record.get("wordForWord") or "").strip():
                errors.append(f"C10 {chapter}.{key}: missing word-for-word")
            if record.get("generated") is True:
                errors.append(f"C10 {chapter}.{key}: stale generated marker")

    c2 = extract_canto2_sections()
    for chapter, entries in c2.items():
        data = load_json(C2_OUT / f"{chapter:02d}.json")
        for key, item in entries.items():
            if not clean_source(item.get("source", "")):
                continue
            record = data.get(key)
            if not isinstance(record, dict):
                errors.append(f"C2 {chapter}.{key}: missing record")
                continue
            if not str(record.get("translation") or record.get("direct_translation") or "").strip():
                errors.append(f"C2 {chapter}.{key}: missing direct translation")
            if not str(record.get("word_for_word") or record.get("wordForWord") or "").strip():
                errors.append(f"C2 {chapter}.{key}: missing word-for-word")

    if errors:
        print("\n".join(errors[:100]), file=sys.stderr)
        raise SystemExit(f"validation failed: {len(errors)} issue(s)")
    print("Validation passed: every extracted Sridhara block in Cantos 2 and 10 has direct English and a word-for-word layer.")


def main() -> None:
    if not C10_SOURCE.exists():
        raise SystemExit("Run tools/extract_canto10_sridhara.py first")
    C10_OUT.mkdir(parents=True, exist_ok=True)
    C2_OUT.mkdir(parents=True, exist_ok=True)

    c10_total, c10_new = build_canto10()
    c2_total, c2_new = build_canto2()
    write_json(CACHE_FILE, CACHE)
    validate()
    print(f"Canto 10: {c10_total} exact source blocks, {c10_new} machine-direct translations added/refreshed")
    print(f"Canto 2: {c2_total} exact source blocks, {c2_new} machine-direct translations added/refreshed")


if __name__ == "__main__":
    main()
