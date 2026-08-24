#!/usr/bin/env python3
"""Extract only Śrīdhara Svāmī's Bhāvārtha-dīpikā blocks for Canto 10.

This does not translate anything. It creates compact chapter JSON files from the
Vishvasa Sanskrit source so the English translation pass can be done against
Śrīdhara's text without carrying all of the other commentaries.
"""

from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

BASE = "https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIya-prastutiH/10/"
OUT = Path("assets/data/canto10-sridhara-source")

DEVA_DIGITS = str.maketrans("०१२३४५६७८९", "0123456789")
MARKER = re.compile(r"॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*॥")
# Vishvasa has both fully-bold labels (`... :** commentary`) and entries where
# the first glossed word remains inside the same bold span (`... : तल्** ...`).
# Stop at the colon, not at the markdown closing delimiter, so neither form is
# silently dropped from the source audit.
LABEL = re.compile(r"\*\*(?:श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)|श्रीधर-स्वामी|श्रीधरः)\s*:\s*(?:\*\*)?")
STOP = re.compile(
    r"\n(?:_{4,}|\*\*(?:वंशीधरः|वीरराघव|विजयध्वज|श्रीनाथ|सनातन|जीव-?गोस्वामी|विश्वनाथ|बलदेव))"
)


def chapter_file(ch: int) -> str:
    return f"{ch:02d}"


def source_path(ch: int) -> str:
    if ch <= 11:
        return f"01-11/{chapter_file(ch)}.md"
    if ch <= 17:
        return f"12-17/{chapter_file(ch)}.md"
    if ch <= 28:
        return f"18-28/{chapter_file(ch)}.md"
    if ch == 29:
        return "29-33_rasa-panchAdhyAya/29.md"
    if ch == 30:
        return "29-33_rasa-panchAdhyAya/30_atha-triMshodhyAyaH_unnumbered.md"
    if ch == 31:
        return "29-33_rasa-panchAdhyAya/31_athaikatriMshodhyAyaH_unnumbered.md"
    if ch == 32:
        return "29-33_rasa-panchAdhyAya/32_atha-dvAtriMshodhyAyaH_unnumbered.md"
    if ch == 33:
        return "29-33_rasa-panchAdhyAya/33_atha-trayastriMshodhyAyaH_unnumbered.md"
    if ch <= 49:
        return f"34-49/{chapter_file(ch)}.md"
    if ch <= 59:
        return f"50-59/{chapter_file(ch)}.md"
    if ch <= 69:
        return f"60-69/{chapter_file(ch)}.md"
    if ch <= 79:
        return f"70-79/{chapter_file(ch)}.md"
    if 80 <= ch <= 84:
        return "80-86/70_athAshItitamo-dhyayaH.md"
    if ch == 85:
        return "80-86/72_bhagavatA_devakI-prArthanayA_tadIya-mRta-putrAN.md"
    if ch == 86:
        return "80-86/74_10_86_1.md"
    if ch == 87:
        return "87.md"
    if ch == 88:
        return "88-90/70.md"
    if ch == 89:
        return "88-90/71.md"
    if ch == 90:
        return "88-90/72.md"
    raise ValueError(ch)


def fetch(path: str) -> str:
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "vivekadrishti-source-extractor"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read().decode("utf-8")


def clean_inline(text: str) -> str:
    text = re.sub(r"\[\^[^\]]+\]", "", text)
    text = re.sub(r"\\([\\`*_{}\[\]()#+\-.!])", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"__([^_]+)__", r"\1", text)
    text = re.sub(r"\*([^*\n]+)\*", r"\1", text)
    text = re.sub(r"_([^_\n]+)_", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    # Remove a dangling markdown close left when the first glossed word was
    # included in the same bold span as the label.
    text = re.sub(r"^\s*([^\n*]+?)\*\*\s+", r"\1 ", text)
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def is_placeholder(text: str) -> bool:
    compact = re.sub(r"\s+", "", text)
    return (
        not compact
        or compact.startswith("[+++]")
        or compact in {"+++", "[+++]{।मर्क्}", "[+++]{.mark}"}
    )


def parse(markdown: str, chapter: int) -> dict[str, dict[str, object]]:
    markers = list(MARKER.finditer(markdown))
    out: dict[str, dict[str, object]] = {}
    for i, marker in enumerate(markers):
        canto = int(marker.group(1).translate(DEVA_DIGITS))
        ch = int(marker.group(2).translate(DEVA_DIGITS))
        if canto != 10 or ch != chapter:
            continue
        start = int(marker.group(3).translate(DEVA_DIGITS))
        end = int((marker.group(4) or marker.group(3)).translate(DEVA_DIGITS))
        segment_end = markers[i + 1].start() if i + 1 < len(markers) else len(markdown)
        segment = markdown[marker.end():segment_end]
        label = LABEL.search(segment)
        if not label:
            continue
        commentary = segment[label.end():]
        stop = STOP.search(commentary)
        if stop:
            commentary = commentary[:stop.start()]
        commentary = clean_inline(commentary)
        key = str(start) if start == end else f"{start}-{end}"
        out[key] = {
            "start": start,
            "end": end,
            "sanskrit": "" if is_placeholder(commentary) else commentary,
            "source_available": not is_placeholder(commentary),
        }
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    cache: dict[str, str] = {}
    for chapter in range(1, 91):
        path = source_path(chapter)
        if path not in cache:
            print(f"fetch {path}")
            cache[path] = fetch(path)
        data = {
            "chapter": chapter,
            "source_path": path,
            "entries": parse(cache[path], chapter),
        }
        (OUT / f"{chapter:02d}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"chapter {chapter}: {len(data['entries'])} Śrīdhara blocks")


if __name__ == "__main__":
    main()
