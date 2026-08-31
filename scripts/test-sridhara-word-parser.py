#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from sanskrit_parser.api import Parser
from sanskrit_parser.base.sanskrit_base import SanskritObject
from sanskrit_parser.parser.sandhi_analyzer import LexicalSandhiAnalyzer

SOURCE = Path('assets/data/bhagavad-gita-sridhara-source/chapter-18.json')
OUT = Path('assets/data/bhagavad-gita-sridhara-source/parser-test-18.json')

parser = Parser(input_encoding=sanscript.SLP1, output_encoding=sanscript.SLP1, score=False, replace_ending_visarga='s')
analyzer = LexicalSandhiAnalyzer()


def clean_to_slp(text: str) -> list[str]:
    text = re.sub(r'Sanskrit Commentary By Sri Sridhara Swami', ' ', text, flags=re.I)
    text = re.sub(r'[।॥?—–,:;\-]+', ' ', text)
    deva = re.sub(r'[^\u0900-\u097F\s]', ' ', text)
    slp = transliterate(deva, sanscript.DEVANAGARI, sanscript.SLP1)
    return [x for x in re.split(r'\s+', slp) if x]


def tags_for(unit: str):
    obj = SanskritObject(unit, encoding=sanscript.SLP1)
    raw = analyzer.getMorphologicalTags(obj, tmap=False) or []
    return [
        {
            'lemma': str(base).split('#', 1)[0],
            'tags': sorted(str(tag) for tag in tags),
        }
        for base, tags in raw
    ]


def split_if_needed(raw: str) -> list[str]:
    # A valid inflected word is already a word: do not split it merely because
    # some lower-ranked sandhi analysis can manufacture smaller pieces.
    if tags_for(raw):
        return [raw]
    try:
        candidates = list(parser.split(raw, limit=20))
    except Exception:
        return [raw]
    ranked = []
    for candidate in candidates:
        pieces = [str(x) for x in candidate.split]
        if not pieces:
            continue
        # Prefer the fewest sensible lexical pieces. Strongly reject the
        # one-letter junk splits that ruined the first experiment.
        penalty = len(pieces) * 10 + sum(80 for x in pieces if len(x) <= 1)
        penalty += sum(20 for x in pieces if not tags_for(x))
        ranked.append((penalty, pieces))
    return min(ranked, default=(0, [raw]), key=lambda x: x[0])[1]


def analyse(text: str):
    out = []
    for raw in clean_to_slp(text):
        for piece in split_if_needed(raw):
            analyses = tags_for(piece)
            first = analyses[0] if analyses else {'lemma': piece, 'tags': []}
            out.append({
                'surface_slp1': piece,
                'lemma_slp1': first['lemma'],
                'tags': first['tags'],
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
