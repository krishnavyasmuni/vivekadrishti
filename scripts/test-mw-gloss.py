#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
import sqlite3
import sys
import xml.etree.ElementTree as ET

DB = sys.argv[1]
WORDS = ['etad','eva','sarvakarman','hetutva','ah','SarIra','karman','tri','antar','BU','vANmanas','vAcika','mAnasa','triviDa','Adi','Darmya','kf','nara','tad','sarva','paYcan','kevala','nirupADika','asaNga','Atman','kartf','dfS','Sastra','AcArya','upadeSa','tyAga','buddhi','durmati','samyak']


def body_text(xml: str) -> str:
    m = re.search(r'<body>(.*?)</body>', xml, flags=re.S)
    if not m:
        return ''
    body = m.group(1)
    body = re.sub(r'<ls>.*?</ls>', ' ', body, flags=re.S)
    body = re.sub(r'<s>.*?</s>', ' ', body, flags=re.S)
    body = re.sub(r'<[^>]+>', ' ', body)
    body = html.unescape(body)
    body = re.sub(r'\s+', ' ', body).strip(' ,;¦')
    return body

con = sqlite3.connect(DB)
out = {}
for word in WORDS:
    rows = con.execute('SELECT key, lnum, data FROM mw WHERE key=? LIMIT 5', (word,)).fetchall()
    out[word] = [{'lnum': r[1], 'body': body_text(r[2])} for r in rows]
print(json.dumps(out, ensure_ascii=False, indent=2))
