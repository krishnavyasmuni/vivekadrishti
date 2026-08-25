#!/usr/bin/env python3
"""Audit Sanskrit and literal-gloss coverage for the Canto 2/10 articles.

This is deliberately a strict corpus check.  A passage is not counted as complete
merely because some English prose is present: it must have a non-placeholder
Śrīdhara Sanskrit block and an explicit ``word_for_word`` gloss.
"""

from __future__ import annotations

import argparse
import html
import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CANTO2 = ROOT / "articles/srimad-bhagavatam-second-canto-sridhara-svami-rebuild"
CANTO10_SOURCE = ROOT / "assets/data/canto10-sridhara-source"
CANTO10_GLOSSES = ROOT / "assets/data/canto10-sridhara-word-for-word"

SECTION_RE = re.compile(
    r'<section\b[^>]*aria-labelledby="(sb-2-\d+-\d+(?:-\d+)?)"[^>]*>(.*?)</section>',
    re.DOTALL,
)
DEVA_RE = re.compile(r'<(?:div|p)\b[^>]*lang="sa-Deva"[^>]*>(.*?)</(?:div|p)>', re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")


def text_content(fragment: str) -> str:
    fragment = re.sub(r"<br\s*/?>", "\n", fragment, flags=re.IGNORECASE)
    return html.unescape(TAG_RE.sub("", fragment)).strip()


def is_placeholder(value: str) -> bool:
    compact = re.sub(r"\s+", "", value or "")
    return not compact or compact in {"नव्याख्यातम्।", "नव्याख्यातम्", "+++", "[+++]"}


def canto2_inventory() -> dict[str, object]:
    files = [CANTO2 / "index.html", *sorted((CANTO2 / "fragments").glob("batch-*.html"))]
    entries: list[dict[str, object]] = []
    for path in files:
        source = path.read_text(encoding="utf-8")
        for match in SECTION_RE.finditer(source):
            section = match.group(2)
            deva = [text_content(item) for item in DEVA_RE.findall(section)]
            sridhara = deva[-1] if "Śrīdhara Sanskrit" in section and deva else ""
            entries.append(
                {
                    "id": match.group(1),
                    "file": str(path.relative_to(ROOT)),
                    "verse_sanskrit": deva[0] if deva else "",
                    "sridhara_sanskrit": sridhara,
                    "has_literal_gloss": "sb-sridhara-word-for-word" in section,
                    "has_prose_commentary": "Śrīdhara’s Commentary" in section,
                }
            )
    counts = Counter(item["id"] for item in entries)
    return {
        "passages": len(entries),
        "unique_passages": len(counts),
        "duplicate_ids": sorted(key for key, count in counts.items() if count > 1),
        "missing_verse_sanskrit": [item["id"] for item in entries if not item["verse_sanskrit"]],
        "missing_sridhara_sanskrit": [item["id"] for item in entries if is_placeholder(str(item["sridhara_sanskrit"]))],
        "missing_literal_gloss": [item["id"] for item in entries if not item["has_literal_gloss"]],
        "prose_commentary_passages": [item["id"] for item in entries if item["has_prose_commentary"]],
    }


def load_entries(path: Path, nested: bool) -> dict[str, dict[str, object]]:
    if not path.exists():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    return data.get("entries", {}) if nested else data


def canto10_inventory() -> dict[str, object]:
    chapters: list[dict[str, object]] = []
    total_source = total_available = total_glossed = 0
    for chapter in range(1, 91):
        name = f"{chapter:02d}.json"
        source = load_entries(CANTO10_SOURCE / name, nested=True)
        glosses = load_entries(CANTO10_GLOSSES / name, nested=False)
        available = {
            key for key, value in source.items()
            if bool(value.get("source_available")) and not is_placeholder(str(value.get("sanskrit", "")))
        }
        glossed = {
            key for key, value in glosses.items()
            if str(value.get("word_for_word", "")).strip()
        }
        missing = sorted(available - glossed, key=lambda key: tuple(map(int, key.split("-"))))
        orphaned = sorted(glossed - set(source), key=lambda key: tuple(map(int, key.split("-"))))
        chapters.append(
            {
                "chapter": chapter,
                "source_blocks": len(source),
                "available_sanskrit": len(available),
                "literal_glosses": len(glossed & available),
                "missing_literal_gloss": missing,
                "orphaned_literal_gloss": orphaned,
            }
        )
        total_source += len(source)
        total_available += len(available)
        total_glossed += len(glossed & available)
    return {
        "chapters": chapters,
        "source_blocks": total_source,
        "available_sanskrit": total_available,
        "literal_glosses": total_glossed,
        "missing_literal_glosses": total_available - total_glossed,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true", help="emit the complete machine-readable report")
    args = parser.parse_args()
    report = {"canto2": canto2_inventory(), "canto10": canto10_inventory()}
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        c2, c10 = report["canto2"], report["canto10"]
        print(
            "Canto 2: "
            f"{c2['unique_passages']} unique passages; "
            f"{len(c2['missing_sridhara_sanskrit'])} missing Sanskrit; "
            f"{len(c2['missing_literal_gloss'])} missing literal glosses; "
            f"{len(c2['prose_commentary_passages'])} prose-commentary passages"
        )
        print(
            "Canto 10: "
            f"{c10['available_sanskrit']} available Sanskrit blocks in 90 chapters; "
            f"{c10['literal_glosses']} literal glosses; "
            f"{c10['missing_literal_glosses']} missing literal glosses"
        )
    failures = (
        bool(report["canto2"]["duplicate_ids"])
        or bool(report["canto2"]["missing_verse_sanskrit"])
        or bool(report["canto2"]["missing_sridhara_sanskrit"])
        or bool(report["canto2"]["missing_literal_gloss"])
        or bool(report["canto2"]["prose_commentary_passages"])
        or bool(report["canto10"]["missing_literal_glosses"])
    )
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
