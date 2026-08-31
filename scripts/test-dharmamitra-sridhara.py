#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

import requests
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

SOURCE = Path('assets/data/bhagavad-gita-sridhara-source/chapter-18.json')
OUT = Path('assets/data/bhagavad-gita-sridhara-source/dharmamitra-test-18.json')
API = 'https://dharmamitra.org/api/tagging/'


def to_iast(text: str) -> str:
    text = re.sub(r'Sanskrit Commentary By Sri Sridhara Swami', ' ', text, flags=re.I)
    text = re.sub(r'\s+', ' ', text).strip()
    return transliterate(text, sanscript.DEVANAGARI, sanscript.IAST)


data = json.loads(SOURCE.read_text(encoding='utf-8'))
verses = ['15', '16']
inputs = [to_iast(data['verses'][v]) for v in verses]
resp = requests.post(API, json={
    'texts': inputs,
    'mode': 'unsandhied-lemma-morphosyntax',
    'human_readable_tags': True,
}, timeout=180)
resp.raise_for_status()
results = resp.json().get('results', [])
payload = {
    'endpoint': API,
    'mode': 'unsandhied-lemma-morphosyntax',
    'verses': {
        v: {'input': inp, 'raw': raw}
        for v, inp, raw in zip(verses, inputs, results)
    },
}
OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(OUT)
