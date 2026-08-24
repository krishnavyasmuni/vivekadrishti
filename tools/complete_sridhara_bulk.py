#!/usr/bin/env python3
"""Complete the English Śrīdhara layer for Bhāgavatam Cantos 2 and 10.

The source of truth is the exact Bhāvārtha-dīpikā Sanskrit already extracted
for Canto 10 and the Sanskrit embedded in the Canto 2 rebuild. Existing
hand-reviewed records are preserved. Everything else is translated directly,
clause by clause, with no summary prose inserted by this script.

Machine-completed records are deliberately marked ``source_aligned`` rather
than ``reviewed``. Their word-for-word field is built from the same Sanskrit
clauses used for the continuous English so we never fall back to the old
Monier-Williams dictionary dump.
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
C10_SOURCE = ROOT / "assets/data/canto10-sridhara-source"
C10_OUT = ROOT / "assets/data/canto10-sridhara-word-for-word"
C2_OUT = ROOT / "assets/data/canto2-sridhara-reviewed"
C2_ROOT = ROOT / "articles/srimad-bhagavatam-second-canto-sridhara-svami-rebuild"
CACHE_PATH = ROOT / "assets/data/sridhara-clause-translation-cache.json"
REPORT_PATH = ROOT / "assets/data/sridhara-completion-report.json"

GOOGLE_URL = "https://translate.googleapis.com/translate_a/single"
UA = "vivekadrishti-sridhara-clause-completion/1.0"
METHOD = "google-sa-en-clause-aligned-2026-08-24"
DEV = re.compile(r"[\u0900-\u097f]")
NO_COMMENT = re.compile(r"^\s*न\s+व्याख्यातम्[।.]?\s*$", re.U)
SEP = re.compile(r"^[-_=]{10,}\**\s*$")
TRAILER = re.compile(r"\s*॥\s*[०-९0-9]+(?:\s*[-.–—]\s*[०-९0-9]+)*\s*॥?\s*$")
MARKER = re.compile(r"ZZQ\s*(\d{6})\s*ZZ", re.I)

cache_lock = Lock()
try:
    CACHE: dict[str, str] = json.loads(CACHE_PATH.read_text(encoding="utf-8")) if CACHE_PATH.exists() else {}
except Exception:
    CACHE = {}


def clean(text: str) -> str:
    text = str(text or "").replace("\u200b", "").replace("\ufeff", "")
    out: list[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or SEP.fullmatch(line):
            if out and out[-1] != "":
                out.append("")
            continue
        line = line.replace("**", "")
        line = re.sub(r"\\([\\`*_{}\[\]()#+\-.!])", r"\1", line)
        out.append(line.strip())
    text = "\n".join(out)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip(" \n*-_")


def uncommented(text: str) -> bool:
    value = TRAILER.sub("", clean(text)).strip()
    return bool(NO_COMMENT.fullmatch(value))


def digest(text: str) -> str:
    return hashlib.sha256(clean(text).encode("utf-8")).hexdigest()


def load(path: Path) -> dict:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else {}
    except Exception:
        return {}


def save(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def natural_key(key: str) -> tuple[int, int]:
    nums = [int(x) for x in re.findall(r"\d+", key)]
    if not nums:
        return (9999, 9999)
    return (nums[0], nums[1] if len(nums) > 1 else nums[0])


def reviewed_complete(value, chapter: int | None = None) -> bool:
    if not isinstance(value, dict):
        return False
    word = str(value.get("word_for_word") or value.get("wordForWord") or "").strip()
    trans = str(value.get("translation") or value.get("direct_translation") or "").strip()
    explicit = value.get("reviewed") is True
    legacy_manual = chapter is not None and chapter <= 7 and value.get("generated") is not True and value.get("source_aligned") is not True
    return bool(word and trans and (explicit or legacy_manual))


def split_long(value: str, limit: int = 260) -> list[str]:
    value = value.strip()
    if len(value) <= limit:
        return [value] if value else []
    # First prefer real syntactic punctuation. Then cut only at spaces.
    parts = re.split(r"(?<=[,;:])\s+", value)
    if len(parts) == 1:
        parts = [value]
    out: list[str] = []
    current = ""
    for part in parts:
        part = part.strip()
        if not part:
            continue
        while len(part) > limit:
            cut = part.rfind(" ", 0, limit)
            if cut < limit // 2:
                cut = limit
            if current:
                out.append(current)
                current = ""
            out.append(part[:cut].strip())
            part = part[cut:].strip()
        candidate = f"{current} {part}".strip() if current else part
        if len(candidate) <= limit:
            current = candidate
        else:
            if current:
                out.append(current)
            current = part
    if current:
        out.append(current)
    return out


def clauses(text: str) -> list[str]:
    """Return ordered Sanskrit translation units without dropping any prose."""
    value = clean(text)
    if not value:
        return []
    # Sentence-level commentary glosses are the natural literal units. Quoted
    # metrical material is retained in order just like prose.
    rough = re.split(r"(?<=[।॥?!])\s+|\n{2,}", value)
    out: list[str] = []
    for part in rough:
        part = part.strip()
        if not part:
            continue
        out.extend(split_long(part))
    return out


def request_translation(text: str) -> str:
    payload = urllib.parse.urlencode({
        "client": "gtx",
        "sl": "sa",
        "tl": "en",
        "dt": "t",
        "q": text,
    }).encode("utf-8")
    req = urllib.request.Request(
        GOOGLE_URL,
        data=payload,
        headers={"User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=45) as response:
        data = json.loads(response.read().decode("utf-8"))
    return "".join(p[0] for p in (data[0] or []) if p and p[0]).strip()


def retry_translate(text: str) -> str:
    last = None
    for attempt in range(7):
        try:
            result = request_translation(text)
            if result:
                return result
            last = RuntimeError("empty translation")
        except Exception as exc:  # network/API failures are retried below
            last = exc
        time.sleep(min(12.0, 0.8 * (2 ** attempt)))
    raise RuntimeError(f"translation failed after retries: {last}")


def batch_groups(items: list[tuple[int, str]], char_limit: int = 3200, item_limit: int = 18):
    batch: list[tuple[int, str]] = []
    size = 0
    for item in items:
        extra = len(item[1]) + 24
        if batch and (size + extra > char_limit or len(batch) >= item_limit):
            yield batch
            batch = []
            size = 0
        batch.append(item)
        size += extra
    if batch:
        yield batch


def translate_batch(batch: list[tuple[int, str]]) -> dict[int, str]:
    if len(batch) == 1:
        idx, text = batch[0]
        return {idx: retry_translate(text)}
    body = "\n".join(f"ZZQ{idx:06d}ZZ\n{text}" for idx, text in batch)
    translated = retry_translate(body)
    matches = list(MARKER.finditer(translated))
    parsed: dict[int, str] = {}
    for pos, match in enumerate(matches):
        idx = int(match.group(1))
        start = match.end()
        end = matches[pos + 1].start() if pos + 1 < len(matches) else len(translated)
        value = translated[start:end].strip(" \n:;-—")
        if value:
            parsed[idx] = value
    wanted = {idx for idx, _ in batch}
    if wanted.issubset(parsed):
        return {idx: parsed[idx] for idx, _ in batch}
    # Marker handling can vary. Fall back only for this small batch, never for
    # the whole corpus.
    return {idx: retry_translate(text) for idx, text in batch}


def translate_unique(texts: list[str]) -> dict[str, str]:
    unique: list[str] = []
    seen: set[str] = set()
    translated: dict[str, str] = {}
    for text in texts:
        key = digest(text)
        cached = CACHE.get(key)
        if cached:
            translated[text] = cached
        elif text not in seen:
            seen.add(text)
            unique.append(text)

    indexed = list(enumerate(unique))
    groups = list(batch_groups(indexed))
    print(f"Need {len(unique)} unique Sanskrit clause translations in {len(groups)} batches")

    completed = 0
    with ThreadPoolExecutor(max_workers=5) as pool:
        future_map = {pool.submit(translate_batch, group): group for group in groups}
        for future in as_completed(future_map):
            result = future.result()
            for idx, english in result.items():
                text = unique[idx]
                translated[text] = english
                with cache_lock:
                    CACHE[digest(text)] = english
            completed += 1
            if completed % 25 == 0 or completed == len(groups):
                print(f"Translation batches: {completed}/{len(groups)}")

    return translated


def extract_canto2() -> dict[int, dict[str, str]]:
    from bs4 import BeautifulSoup

    files = [C2_ROOT / "index.html"] + sorted((C2_ROOT / "fragments").glob("*.html"))
    result: dict[int, dict[str, str]] = {ch: {} for ch in range(1, 11)}
    id_re = re.compile(r"^sb-2-(\d+)-(\d+)(?:-(\d+))?$", re.I)

    for path in files:
        if not path.exists():
            continue
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="replace"), "html.parser")
        for section in soup.find_all("section"):
            heading = section.find(class_="sb-verse")
            ident = (heading.get("id") if heading else section.get("aria-labelledby")) or ""
            match = id_re.match(str(ident))
            if not match:
                continue
            chapter = int(match.group(1))
            if not 1 <= chapter <= 10:
                continue
            start = int(match.group(2)); end = int(match.group(3) or match.group(2))
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
            # Prefer the explicit Sanskrit source element. This captures the
            # entire commentary when it is a single source block.
            explicit = details.find(attrs={"lang": re.compile(r"^sa")})
            if explicit and DEV.search(explicit.get_text(" ", strip=True)):
                source = explicit.get_text(" ", strip=True)
            else:
                block = details.find(class_="sb-source-content")
                if block and DEV.search(block.get_text(" ", strip=True)):
                    source = block.get_text(" ", strip=True)
                else:
                    pieces = []
                    for child in details.find_all(["p", "div"], recursive=False):
                        txt = child.get_text(" ", strip=True)
                        if DEV.search(txt):
                            pieces.append(txt)
                    source = "\n\n".join(pieces)
            source = clean(source)
            if source:
                result[chapter][key] = source
    return result


def source_aligned(source: str, ordered_clauses: list[str], translations: dict[str, str], manual_word: str = "") -> dict:
    english_parts = [translations[c].strip() for c in ordered_clauses if translations.get(c, "").strip()]
    translation = " ".join(english_parts).strip()
    if manual_word.strip():
        word = manual_word.strip()
        lexical_reviewed = True
    else:
        pairs = [f"{c} — {translations[c].strip()}" for c in ordered_clauses if translations.get(c, "").strip()]
        word = "; ".join(pairs).strip()
        lexical_reviewed = False
    record = {
        "source_aligned": True,
        "translation_method": METHOD,
        "source_sha256": digest(source),
        "word_for_word": word,
        "translation": translation,
    }
    if lexical_reviewed:
        record["lexical_reviewed"] = True
    return record


def main() -> None:
    C2_OUT.mkdir(parents=True, exist_ok=True)
    C10_OUT.mkdir(parents=True, exist_ok=True)

    # Build a corpus of only the records that genuinely need completion.
    tasks: list[dict] = []
    c10_outputs: dict[int, dict] = {}
    c10_source_count = 0
    c10_no_comment = 0
    c10_reviewed = 0

    for chapter in range(1, 91):
        src_doc = load(C10_SOURCE / f"{chapter:02d}.json")
        entries = src_doc.get("entries") if isinstance(src_doc.get("entries"), dict) else {}
        existing = load(C10_OUT / f"{chapter:02d}.json")
        out: dict = {}
        c10_outputs[chapter] = out
        for key, meta in entries.items():
            if not isinstance(meta, dict):
                continue
            source = clean(meta.get("sanskrit", ""))
            if not source:
                continue
            c10_source_count += 1
            prior = existing.get(str(key))
            if reviewed_complete(prior, chapter):
                out[str(key)] = prior
                c10_reviewed += 1
                continue
            manual_word = ""
            if isinstance(prior, dict) and chapter <= 7 and prior.get("generated") is not True:
                manual_word = str(prior.get("word_for_word") or prior.get("wordForWord") or "").strip()
            if uncommented(source):
                out[str(key)] = {
                    "source_aligned": True,
                    "translation_method": METHOD,
                    "source_sha256": digest(source),
                    "word_for_word": "na vyākhyātam — not explained",
                    "translation": "Not explained.",
                }
                c10_no_comment += 1
                continue
            task_clauses = clauses(source)
            tasks.append({"canto": 10, "chapter": chapter, "key": str(key), "source": source, "clauses": task_clauses, "manual_word": manual_word})

    c2_sources = extract_canto2()
    c2_outputs: dict[int, dict] = {}
    c2_source_count = 0
    c2_no_comment = 0
    c2_reviewed = 0
    for chapter in range(1, 11):
        existing = load(C2_OUT / f"{chapter:02d}.json")
        out: dict = {}
        c2_outputs[chapter] = out
        for key, source in c2_sources.get(chapter, {}).items():
            c2_source_count += 1
            prior = existing.get(key)
            if reviewed_complete(prior):
                out[key] = prior
                c2_reviewed += 1
                continue
            if uncommented(source):
                out[key] = {
                    "source_aligned": True,
                    "translation_method": METHOD,
                    "source_sha256": digest(source),
                    "word_for_word": "na vyākhyātam — not explained",
                    "translation": "Not explained.",
                }
                c2_no_comment += 1
                continue
            tasks.append({"canto": 2, "chapter": chapter, "key": key, "source": source, "clauses": clauses(source), "manual_word": ""})

    all_clauses = [clause for task in tasks for clause in task["clauses"]]
    translations = translate_unique(all_clauses)

    for task in tasks:
        record = source_aligned(task["source"], task["clauses"], translations, task["manual_word"])
        if task["canto"] == 10:
            c10_outputs[task["chapter"]][task["key"]] = record
        else:
            c2_outputs[task["chapter"]][task["key"]] = record

    for chapter, data in c10_outputs.items():
        save(C10_OUT / f"{chapter:02d}.json", dict(sorted(data.items(), key=lambda kv: natural_key(kv[0]))))
    for chapter, data in c2_outputs.items():
        save(C2_OUT / f"{chapter:02d}.json", dict(sorted(data.items(), key=lambda kv: natural_key(kv[0]))))

    save(CACHE_PATH, CACHE)

    # Final coverage validation. A source block can only pass if both English
    # layers are present. No generated/dictionary record is accepted.
    errors: list[str] = []
    c10_completed = 0
    for chapter in range(1, 91):
        src = load(C10_SOURCE / f"{chapter:02d}.json").get("entries", {})
        data = load(C10_OUT / f"{chapter:02d}.json")
        if not isinstance(src, dict):
            continue
        for key, meta in src.items():
            source = clean(meta.get("sanskrit", "")) if isinstance(meta, dict) else ""
            if not source:
                continue
            rec = data.get(str(key))
            if not isinstance(rec, dict):
                errors.append(f"C10 {chapter}.{key}: missing record"); continue
            if rec.get("generated") is True:
                errors.append(f"C10 {chapter}.{key}: old generated record survived")
            if not str(rec.get("word_for_word") or "").strip():
                errors.append(f"C10 {chapter}.{key}: missing word-for-word")
            if not str(rec.get("translation") or "").strip():
                errors.append(f"C10 {chapter}.{key}: missing direct translation")
            if isinstance(rec, dict) and str(rec.get("word_for_word") or "").strip() and str(rec.get("translation") or "").strip():
                c10_completed += 1

    c2_completed = 0
    for chapter, entries in c2_sources.items():
        data = load(C2_OUT / f"{chapter:02d}.json")
        for key, source in entries.items():
            rec = data.get(key)
            if not isinstance(rec, dict):
                errors.append(f"C2 {chapter}.{key}: missing record"); continue
            if not str(rec.get("word_for_word") or "").strip():
                errors.append(f"C2 {chapter}.{key}: missing word-for-word")
            if not str(rec.get("translation") or "").strip():
                errors.append(f"C2 {chapter}.{key}: missing direct translation")
            if str(rec.get("word_for_word") or "").strip() and str(rec.get("translation") or "").strip():
                c2_completed += 1

    report = {
        "scope": "Śrīdhara Svāmī Bhāvārtha-dīpikā — Bhāgavatam Cantos 2 and 10",
        "completed_at": "2026-08-24",
        "policy": "Exact Sanskrit source; reviewed records preserved; remaining records translated directly clause-by-clause; no dictionary-generated prose and no summary layer.",
        "canto_10": {
            "source_blocks": c10_source_count,
            "completed_blocks": c10_completed,
            "hand_reviewed_preserved": c10_reviewed,
            "explicit_no_commentary": c10_no_comment,
        },
        "canto_2": {
            "source_blocks": c2_source_count,
            "completed_blocks": c2_completed,
            "hand_reviewed_preserved": c2_reviewed,
            "explicit_no_commentary": c2_no_comment,
        },
        "machine_direct_records_are_marked_source_aligned_not_reviewed": True,
        "validation_errors": errors,
    }
    save(REPORT_PATH, report)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if errors:
        print("\n".join(errors[:100]), file=sys.stderr)
        raise SystemExit(f"coverage validation failed with {len(errors)} issue(s)")
    if c10_completed != c10_source_count:
        raise SystemExit(f"Canto 10 coverage mismatch: {c10_completed}/{c10_source_count}")
    if c2_completed != c2_source_count:
        raise SystemExit(f"Canto 2 coverage mismatch: {c2_completed}/{c2_source_count}")


if __name__ == "__main__":
    main()
