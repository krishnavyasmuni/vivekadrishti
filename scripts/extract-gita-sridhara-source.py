#!/usr/bin/env python3
"""Extract Śrīdhara Svāmī's Sanskrit Bhagavad Gītā commentary chapter-by-chapter.

No translation is performed here. This creates a stable local source snapshot
from vedicscriptures/bhagavad-gita so reviewed literal English glosses can be
prepared directly from the Sanskrit without relying on machine translation.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

COUNTS = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78]


def clean(text: str) -> str:
    text = (text or "").replace("\u00a0", " ").strip()
    text = re.sub(r"^\s*[।॥]+\s*\d+(?:\.\d+)?\s*[।॥]*\s*", "", text)
    return re.sub(r"\s+", " ", text).strip()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("assets/data/bhagavad-gita-sridhara-source"),
    )
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)

    for chapter, count in enumerate(COUNTS, start=1):
        verses = {}
        for verse in range(1, count + 1):
            path = args.source / "slok" / f"bhagavadgita_chapter_{chapter}_slok_{verse}.json"
            with path.open("r", encoding="utf-8") as handle:
                data = json.load(handle)
            srid = ((data.get("srid") or {}).get("sc") or "")
            verses[str(verse)] = clean(srid)

        payload = {
            "_meta": {
                "chapter": chapter,
                "source": "vedicscriptures/bhagavad-gita",
                "source_field": "srid.sc",
                "purpose": "source snapshot for original literal English glossing",
            },
            "verses": verses,
        }
        target = args.output / f"chapter-{chapter}.json"
        target.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {target}")


if __name__ == "__main__":
    main()
