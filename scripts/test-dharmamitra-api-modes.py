#!/usr/bin/env python3
import json
import requests

API = 'https://dharmamitra.org/api/tagging/'
TEXTS = [
    'eteṣāmeva sarvakarmahetutvamāha śarīreti',
    'tatra sarvasminkarmaṇi ete pañca hetava ityevaṃ sati',
]
MODES = [
    'segmentation',
    'lemma',
    'lemma-morphosyntax',
    'segmentation-morphosyntax',
    'segmentation-lemma-morphosyntax',
    'unsandhied-lemma-morphosyntax',
]
out = {}
for mode in MODES:
    out[mode] = {}
    for human in (True, False):
        try:
            r = requests.post(API, json={'texts': TEXTS, 'mode': mode, 'human_readable_tags': human}, timeout=180)
            out[mode][str(human).lower()] = {'status': r.status_code, 'body': r.json() if r.headers.get('content-type','').startswith('application/json') else r.text}
        except Exception as e:
            out[mode][str(human).lower()] = {'error': repr(e)}
with open('assets/data/bhagavad-gita-sridhara-source/dharmamitra-api-modes.json','w',encoding='utf-8') as f:
    json.dump(out,f,ensure_ascii=False,indent=2)
