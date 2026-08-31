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

parser = Parser(input_encoding='SLP1', output_encoding='SLP1', score=False, replace_ending_visarga='s')
analyzer = LexicalSandhiAnalyzer()


def clean_to_slp(text: str) -> list[str]:
    text = re.sub(r'Sanskrit Commentary By Sri Sridhara Swami', ' ', text, flags=re.I)
    text = re.sub(r'[।॥?—–,:;\-]+', ' ', text)
    deva = re.sub(r'[^\u0900-\u097F\s]', ' ', text)
    slp = transliterate(deva, sanscript.DEVANAGARI, sanscript.SLP1)
    return [x for x in re.split(r'\s+', slp) if x]


def base_for(unit: str) -> str:
    obj = SanskritObject(unit, encoding='SLP1')
    tags = analyzer.getMorphologicalTags(obj)
    if not tags:
        return unit
    base = str(tags[0][0]).split('#', 1)[0]
    return base or unit


def analyse(text: str):
    out = []
    for raw in clean_to_slp(text):
        pieces = [raw]
        try:
            result = next(iter(parser.split(raw, limit=1)), None)
            if result is not None and result.split:
                pieces = [str(x) for x in result.split]
        except Exception:
            pass
        for piece in pieces:
            out.append({'surface_slp1': piece, 'lemma_slp1': base_for(piece)})
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
