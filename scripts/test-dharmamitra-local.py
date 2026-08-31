#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

import torch
from transformers import AutoTokenizer, T5ForConditionalGeneration

MODEL = 'chronbmm/sanskrit5-multitask'
REV = 'c0d2ada54f3d19903149425aa888a203601423f8'
OUT = Path('assets/data/bhagavad-gita-sridhara-source/dharmamitra-local-test.json')
TEXTS = [
    'eteṣāmeva sarvakarmahetutvamāha śarīreti',
    'yathoktaiḥ pañcabhiḥ prārabhyamāṇaṃ karma triṣvevāntarbhāvyaśarīravāṅmanobhirityuktaṃ',
    "śarīrādibhiryadyatkarma dharmya vā'dharmyaṃ vā karoti narastasya sarvasya karmaṇa ete pañca hetavaḥ",
    'tatra sarvasminkarmaṇi ete pañca hetava ityevaṃ sati kevalaṃ nirupādhikamasaṅgamātmānaṃ tu yaḥ kartāraṃ paśyati',
]

tokenizer = AutoTokenizer.from_pretrained(MODEL, revision=REV)
model = T5ForConditionalGeneration.from_pretrained(MODEL, revision=REV).eval()
enc = tokenizer(['SLM ' + x for x in TEXTS], return_tensors='pt', padding=True, truncation=True, max_length=512)
with torch.inference_mode():
    gen = model.generate(**enc, max_length=512, num_beams=1)
raw = tokenizer.batch_decode(gen, skip_special_tokens=True)
OUT.write_text(json.dumps({'model':MODEL,'revision':REV,'inputs':TEXTS,'outputs':raw},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(OUT)
