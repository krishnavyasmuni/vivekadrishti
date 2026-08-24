#!/usr/bin/env python3
import json, re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'assets' / 'data' / 'canto10-sridhara-word-for-word'
counts = Counter()
by_chapter = {}
for chapter in range(8, 91):
    path = DATA / f'{chapter:02d}.json'
    if not path.exists():
        continue
    data = json.loads(path.read_text(encoding='utf-8'))
    local = Counter()
    for entry in data.values():
        text = entry.get('word_for_word', '') if isinstance(entry, dict) else str(entry)
        for part in text.split(';'):
            part = part.strip().rstrip('.')
            if ' — ' not in part:
                continue
            left, right = [x.strip() for x in part.split(' — ', 1)]
            if left and right == left:
                counts[left] += 1
                local[left] += 1
    by_chapter[str(chapter)] = local.most_common(60)

out = {
    'total_unresolved_occurrences': sum(counts.values()),
    'unique_unresolved_forms': len(counts),
    'top_unresolved': counts.most_common(1500),
    'by_chapter': by_chapter,
}
(DATA / 'unresolved-frequency.json').write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'total_unresolved_occurrences': sum(counts.values()), 'unique_unresolved_forms': len(counts), 'top_100': counts.most_common(100)}, ensure_ascii=False, indent=2))
