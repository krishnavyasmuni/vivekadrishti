#!/usr/bin/env python3
"""Canto 2 loose-block aware entry point for the final Śrīdhara completion."""
from __future__ import annotations

import re
from pathlib import Path

import complete_sridhara_bulk as base


def extract_canto2_complete() -> dict[int, dict[str, str]]:
    from bs4 import BeautifulSoup

    files = [base.C2_ROOT / "index.html"] + sorted((base.C2_ROOT / "fragments").glob("*.html"))
    result: dict[int, dict[str, str]] = {ch: {} for ch in range(1, 11)}
    id_re = re.compile(r"^sb-2-(\d+)-(\d+)(?:-(\d+))?$", re.I)

    def source_from_details(details) -> str:
        explicit = details.find(attrs={"lang": re.compile(r"^sa")})
        if explicit:
            txt = explicit.get_text(" ", strip=True)
            if base.DEV.search(txt):
                return base.clean(txt)
        block = details.find(class_="sb-source-content")
        if block:
            txt = block.get_text(" ", strip=True)
            if base.DEV.search(txt):
                return base.clean(txt)
        pieces = []
        for child in details.find_all(["p", "div"], recursive=False):
            txt = child.get_text(" ", strip=True)
            if base.DEV.search(txt):
                pieces.append(txt)
        return base.clean("\n\n".join(pieces))

    for path in files:
        if not path.exists():
            continue
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="replace"), "html.parser")
        for heading in soup.select('h3.sb-verse[id^="sb-2-"]'):
            match = id_re.match(str(heading.get("id") or ""))
            if not match:
                continue
            chapter = int(match.group(1))
            if not 1 <= chapter <= 10:
                continue
            start = int(match.group(2)); end = int(match.group(3) or match.group(2))
            key = str(start) if start == end else f"{start}-{end}"

            container = heading.find_parent("section", class_="sb-verse-section")
            candidates = []
            if container is not None:
                candidates = container.find_all("details")
            else:
                # The original hand-built chapters in index.html predate the
                # shared section wrapper. Walk only this verse's sibling block.
                node = heading.next_sibling
                while node is not None:
                    name = getattr(node, "name", None)
                    classes = getattr(node, "get", lambda *_: [])("class", []) if name else []
                    if name == "h3" and "sb-verse" in classes:
                        break
                    if name == "h2" and "sb-chapter" in classes:
                        break
                    if name == "details":
                        candidates.append(node)
                    node = node.next_sibling

            details = None
            for candidate in candidates:
                summary = candidate.find("summary")
                if summary and "Śrīdhara Sanskrit" in summary.get_text(" ", strip=True):
                    details = candidate
                    break
            if details is None:
                continue
            source = source_from_details(details)
            if source:
                result[chapter][key] = source

    counts = {chapter: len(entries) for chapter, entries in result.items()}
    print("Canto 2 extracted source counts:", counts)
    return result


base.extract_canto2 = extract_canto2_complete
base.main()
