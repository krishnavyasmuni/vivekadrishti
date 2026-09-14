from pathlib import Path
import csv, hashlib, json, re, shutil, unicodedata, zipfile
from indic_transliteration import sanscript

SOURCE = Path('_bhavishya_source/DharmicData/Purana/Bhavishya Purana')
ROOT = Path('Bhavishya_Purana_Stylo_Corpus')
CORPUS = ROOT / 'corpus'
DEV = ROOT / 'corpus_devanagari'

if ROOT.exists():
    shutil.rmtree(ROOT)
CORPUS.mkdir(parents=True)
DEV.mkdir(parents=True)

sections = [
    ('1. Brahma Parva', 'Brahma', 216, 'Brāhmaparvan'),
    ('2.1. Madhyama Parva', 'Madhyama1', 21, 'Madhyamaparvan part 1'),
    ('2.2. Madhyama Parva', 'Madhyama2', 20, 'Madhyamaparvan part 2'),
    ('2.3. Madhyama Parva', 'Madhyama3', 20, 'Madhyamaparvan part 3'),
    ('3.1. Pratisarga Parva', 'Pratisarga1', 7, 'Pratisargaparvan khaṇḍa 1'),
    ('3.2. Pratisarga Parva', 'Pratisarga2', 35, 'Pratisargaparvan khaṇḍa 2'),
    ('3.3. Pratisarga Parva', 'Pratisarga3', 32, 'Pratisargaparvan khaṇḍa 3'),
    ('3.4. Pratisarga Parva', 'Pratisarga4', 26, 'Pratisargaparvan khaṇḍa 4'),
    ('4. Uttara Parva', 'Uttara', 208, 'Uttaraparvan'),
]

digit_re = re.compile(r'\d+', flags=re.UNICODE)
dot_run_re = re.compile(r'(?:\s*\.\s*){2,}')
standalone_punct_re = re.compile(r'^[\s\.।|/\\,:;\-–—]+$')
colophon_re = re.compile(r'^इति\s+श्री?भविष्य.*(?:अध्याय|पर्व)', re.UNICODE)


def extract_text(path: Path) -> str:
    data = json.loads(path.read_text(encoding='utf-8'))
    chunks = []
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and isinstance(item.get('text'), str):
                chunks.append(item['text'])
            elif isinstance(item, str):
                chunks.append(item)
    elif isinstance(data, dict) and isinstance(data.get('text'), str):
        chunks.append(data['text'])
    if not chunks:
        raise ValueError(f'No Sanskrit text found in {path}')
    return '\n'.join(chunks)


def clean_devanagari(text: str) -> str:
    text = unicodedata.normalize('NFC', text).replace('\ufeff', '')
    text = digit_re.sub('', text)
    text = dot_run_re.sub(' ', text)
    out = []
    for raw in text.splitlines():
        line = re.sub(r'[ \t]+', ' ', raw).strip()
        line = re.sub(r'(^|\s)\.(?=\s|$)', ' ', line)
        line = re.sub(r'\s+', ' ', line).strip()
        if not line or standalone_punct_re.fullmatch(line):
            continue
        if colophon_re.search(line):
            continue
        out.append(line)
    return unicodedata.normalize('NFC', '\n'.join(out)).strip()


def to_iast(dev: str) -> str:
    txt = sanscript.transliterate(dev, sanscript.DEVANAGARI, sanscript.IAST)
    txt = unicodedata.normalize('NFC', txt)
    txt = txt.replace('।।', '||').replace('।', '|')
    txt = re.sub(r'[ \t]+', ' ', txt)
    txt = re.sub(r' *\n *', '\n', txt)
    return txt.strip()


rows = []
for folder, prefix, expected, label in sections:
    d = SOURCE / folder
    if not d.is_dir():
        raise FileNotFoundError(d)
    chapter_paths = {int(p.stem): p for p in d.glob('*.json') if p.stem.isdigit()}
    actual_numbers = sorted(chapter_paths)
    wanted_numbers = list(range(1, expected + 1))
    if actual_numbers != wanted_numbers:
        missing = sorted(set(wanted_numbers) - set(actual_numbers))
        extra = sorted(set(actual_numbers) - set(wanted_numbers))
        raise RuntimeError(f'{folder}: chapter sequence mismatch; missing={missing}, extra={extra}')

    for n in wanted_numbers:
        source_path = chapter_paths[n]
        dev = clean_devanagari(extract_text(source_path))
        iast = to_iast(dev)
        if len(iast) < 20 or len(dev) < 20:
            raise RuntimeError(f'Implausibly short chapter: {folder}/{n}.json')
        filename = f'{prefix}_{n:03d}.txt'
        (CORPUS / filename).write_text(iast + '\n', encoding='utf-8', newline='\n')
        (DEV / filename).write_text(dev + '\n', encoding='utf-8', newline='\n')
        rows.append({
            'filename': filename,
            'section': prefix,
            'section_label': label,
            'chapter': n,
            'source_path': str(source_path.relative_to(Path('_bhavishya_source'))),
            'iast_characters': len(iast),
            'devanagari_characters': len(dev),
            'iast_tokens_whitespace': len(iast.split()),
            'sha256_iast': hashlib.sha256((iast + '\n').encode('utf-8')).hexdigest(),
        })

files = sorted(CORPUS.glob('*.txt'))
if len(files) != 585 or len(rows) != 585:
    raise RuntimeError(f'Expected 585 chapter files, got {len(files)}')

with (ROOT / 'metadata.csv').open('w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)

validation = [
    'Bhavishya Purana Stylo corpus validation',
    '=========================================',
]
for folder, prefix, expected, label in sections:
    found = len(list(CORPUS.glob(f'{prefix}_*.txt')))
    validation.append(f'{prefix:12s} expected={expected:3d} found={found:3d} ' + ('OK' if found == expected else 'MISMATCH'))
validation += [
    '-----------------------------------------',
    f'TOTAL        expected=585 found={len(files)} OK',
    '',
    'All corpus files are UTF-8 plain text.',
    'corpus/ = IAST Roman Sanskrit for direct Stylo use with Roman Sanskrit comparison corpora.',
    'corpus_devanagari/ = the same cleaned chapters in Devanagari.',
]
(ROOT / 'VALIDATION.txt').write_text('\n'.join(validation) + '\n', encoding='utf-8')

readme = '''BHAVIṢYA PURĀṆA — READY-TO-USE R STYLO CORPUS
================================================

USE THIS FOLDER IN STYLO:
    corpus/

It contains exactly 585 UTF-8 .txt files, one file per textual chapter:
    Brahma_001.txt ... Brahma_216.txt
    Madhyama1_001.txt ... Madhyama1_021.txt
    Madhyama2_001.txt ... Madhyama2_020.txt
    Madhyama3_001.txt ... Madhyama3_020.txt
    Pratisarga1_001.txt ... Pratisarga1_007.txt
    Pratisarga2_001.txt ... Pratisarga2_035.txt
    Pratisarga3_001.txt ... Pratisarga3_032.txt
    Pratisarga4_001.txt ... Pratisarga4_026.txt
    Uttara_001.txt ... Uttara_208.txt

FORMAT
------
* Sanskrit text only
* UTF-8
* IAST / Roman Sanskrit in corpus/
* one chapter per .txt file
* numeric verse/chapter/footnote markers removed
* repetitive explicit Bhaviṣya chapter colophons removed
* Sanskrit wording, word order, speaker formulae, sandhi and punctuation retained
* Unicode NFC

A separate corpus_devanagari/ folder contains the same cleaned chapters in Devanagari.
Do not mix both scripts in one character-trigram analysis.

SOURCE
------
Structured chapter data:
https://github.com/jayeshmepani/HinduScriptures/tree/main/DharmicData/Purana/Bhavishya%20Purana

Pratisarga 3.4 chapter 26 is included from the actual data directory even though one
HTML index in that repository incorrectly stops at 25.

R / STYLO
---------
Copy corpus/ into your R project. For character trigrams use:

    analyzed.features = "c"
    ngram.size = 3
    encoding = "UTF-8"
'''
(ROOT / 'README.txt').write_text(readme, encoding='utf-8')

zip_path = Path('Bhavishya_Purana_Stylo_Corpus.zip')
if zip_path.exists():
    zip_path.unlink()
with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for p in sorted(ROOT.rglob('*')):
        if p.is_file():
            z.write(p, p.as_posix())

print('\n'.join(validation))
print(f'ZIP={zip_path} size={zip_path.stat().st_size}')
