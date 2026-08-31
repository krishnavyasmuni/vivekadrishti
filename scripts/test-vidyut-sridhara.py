#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

import vidyut
from vidyut.cheda import Chedaka
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

SOURCE = Path('assets/data/bhagavad-gita-sridhara-source/chapter-18.json')
OUT = Path('assets/data/bhagavad-gita-sridhara-source/vidyut-test-18.json')
DATA = Path('/tmp/vidyut-data')


def to_slp1(text: str) -> str:
    text = re.sub(r'Sanskrit Commentary By Sri Sridhara Swami', ' ', text, flags=re.I)
    text = re.sub(r'[।॥?—–,:;]+', ' ', text)
    deva = re.sub(r'[^\u0900-\u097F\s\-]', ' ', text)
    return re.sub(r'\s+', ' ', transliterate(deva, sanscript.DEVANAGARI, sanscript.SLP1)).strip()


if not DATA.exists():
    vidyut.download_data(DATA)

chedaka = Chedaka(DATA)
data = json.loads(SOURCE.read_text(encoding='utf-8'))
payload = {'verses': {}}

for verse in ('15', '16'):
    source = data['verses'][verse]
    tokens = []
    for token in chedaka.run(to_slp1(source)):
        tokens.append({
            'surface_slp1': token.text,
            'lemma_slp1': token.lemma,
            'info': repr(token.data),
        })
    payload['verses'][verse] = {'sanskrit': source, 'tokens': tokens}

OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(OUT)
