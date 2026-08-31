#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from functools import lru_cache
from pathlib import Path

from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from sanskrit_parser.api import Parser
from sanskrit_parser.base.sanskrit_base import SanskritObject
from sanskrit_parser.parser.sandhi_analyzer import LexicalSandhiAnalyzer

SOURCE = Path('assets/data/bhagavad-gita-sridhara-source/chapter-18.json')
OUT = Path('assets/data/bhagavad-gita-sridhara-source/parser-test-18.json')

# Lexical scoring ranks plausible Sanskrit splits above merely possible ones.
parser = Parser(input_encoding=sanscript.SLP1, output_encoding=sanscript.SLP1, score=True, replace_ending_visarga='s')
analyzer = LexicalSandhiAnalyzer()


def clean_to_slp(text: str) -> list[str]:
    text = re.sub(r'Sanskrit Commentary By Sri Sridhara Swami', ' ', text, flags=re.I)
    text = re.sub(r'[।॥?—–,:;\-]+', ' ', text)
    deva = re.sub(r'[^\u0900-\u097F\s]', ' ', text)
    slp = transliterate(deva, sanscript.DEVANAGARI, sanscript.SLP1)
    return [x for x in re.split(r'\s+', slp) if x]


@lru_cache(maxsize=None)
def tags_for(unit: str):
    obj = SanskritObject(unit, encoding=sanscript.SLP1)
    try:
        raw = analyzer.getMorphologicalTags(obj) or []
    except Exception:
        return ()
    return tuple(
        (
            str(base).split('#', 1)[0],
            tuple(sorted(str(tag) for tag in tags)),
        )
        for base, tags in raw
    )


@lru_cache(maxsize=None)
def split_if_needed(raw: str) -> tuple[str, ...]:
    # If the supplied orthographic unit is already a valid inflected Sanskrit
    # word, preserve it. Split only units that require sandhi resolution.
    if tags_for(raw):
        return (raw,)
    try:
        candidates = list(parser.split(raw, limit=20) or [])
    except Exception:
        return (raw,)

    # Parser output is already lexical-score ranked. Reject obvious junk and
    # take the first plausible candidate rather than inventing our own ranking.
    for candidate in candidates:
        pieces = tuple(str(x) for x in candidate.split)
        if not pieces:
            continue
        if any(len(x) <= 1 for x in pieces):
            continue
        if sum(1 for x in pieces if not tags_for(x)) > max(1, len(pieces) // 3):
            continue
        return pieces
    return (raw,)


def analyse(text: str):
    out = []
    for raw in clean_to_slp(text):
        for piece in split_if_needed(raw):
            analyses = tags_for(piece)
            lemma, tags = analyses[0] if analyses else (piece, ())
            out.append({
                'surface_slp1': piece,
                'lemma_slp1': lemma,
                'tags': list(tags),
            })
    return out


data = json.loads(SOURCE.read_text(encoding='utf-8'))
payload = {'verses': {}}
for verse in ('15', '16'):
    payload['verses'][verse] = {
        'sanskrit': data['verses'][verse],
        'analysis': analyse(data['verses'][verse]),
    }

OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(OUT)
