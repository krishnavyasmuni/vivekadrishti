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
MODE = 'segmentation-lemma-morphosyntax'


def clean_deva(text: str) -> str:
    text = re.sub(r'Sanskrit Commentary By Sri Sridhara Swami', ' ', text, flags=re.I)
    text = text.replace('--', ' ').replace('?', ' ')
    return re.sub(r'\s+', ' ', text).strip()


def sentence_chunks(text: str, max_chars: int = 180) -> list[str]:
    text = clean_deva(text)
    pieces = [p.strip() for p in re.split(r'[।॥]+', text) if p.strip()]
    out: list[str] = []
    for piece in pieces:
        iast = transliterate(piece, sanscript.DEVANAGARI, sanscript.IAST)
        if len(iast) <= max_chars:
            out.append(iast)
            continue
        words = iast.split()
        current: list[str] = []
        size = 0
        for word in words:
            extra = len(word) + (1 if current else 0)
            if current and size + extra > max_chars:
                out.append(' '.join(current))
                current = [word]
                size = len(word)
            else:
                current.append(word)
                size += extra
        if current:
            out.append(' '.join(current))
    return out


data = json.loads(SOURCE.read_text(encoding='utf-8'))
verses = ['15', '16']
verse_chunks = {v: sentence_chunks(data['verses'][v]) for v in verses}
flat = [(v, i, text) for v in verses for i, text in enumerate(verse_chunks[v])]
inputs = [x[2] for x in flat]
resp = requests.post(API, json={
    'texts': inputs,
    'mode': MODE,
    'human_readable_tags': True,
}, timeout=180)
resp.raise_for_status()
results = resp.json().get('results', [])

payload = {'endpoint': API, 'mode': MODE, 'verses': {}}
for verse in verses:
    payload['verses'][verse] = {'chunks': []}
for (verse, index, inp), raw in zip(flat, results):
    payload['verses'][verse]['chunks'].append({'index': index, 'input': inp, 'raw': raw})

OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(OUT)
