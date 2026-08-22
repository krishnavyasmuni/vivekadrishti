from pathlib import Path
import re,sys
from bs4 import BeautifulSoup
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

ROOT=Path(__file__).resolve().parents[1]
FILES=list(ROOT.glob('articles/bhavishya-purana-brahmaparvan-chapter-*/index.html'))
FILES.append(ROOT/'articles/bhavisya-purana-addresses-varna-system/index.html')

def chapter_for(section):
    h=section.find('h3',id=True)
    m=re.match(r'bp-1-(\d+)-(\d+)$',h.get('id','')) if h else None
    return (int(m.group(1)),int(m.group(2))) if m else (None,None)

def add_devanagari_mapping(details):
    box=details.find('div',recursive=False)
    if not box or box.find(class_='wfw-map'): return True
    raw=' '.join(box.stripped_strings)
    parts=[x.strip() for x in raw.split(';') if x.strip()]
    mapped=[]
    for part in parts:
        bits=re.split(r'\s+[—–-]\s+',part,maxsplit=1)
        if len(bits)!=2:
            return False
        term,meaning=bits
        paired=re.match(r'^(.+?)\s*\(([^()]*)\)\s*$',term)
        if paired and re.search(r'[ऀ-ॿ]',paired.group(1)):
            dev,iast=paired.group(1).strip(),paired.group(2).strip()
        elif re.search(r'[a-zA-Zāīūṛṝḷṅñṭḍṇśṣṃḥ]',term):
            iast=term
            try: dev=transliterate(iast,sanscript.IAST,sanscript.DEVANAGARI)
            except Exception: return False
        else:
            return False
        mapped.append(f'<span lang="sa">{dev}</span> <span class="wfw-iast">({iast})</span> — {meaning}')
    if not mapped: return False
    box.clear()
    inner=BeautifulSoup('<div class="wfw-map">'+';<br>'.join(mapped)+'</div>','html.parser').div
    box.append(inner)
    return True

def process(path):
    text=path.read_text()
    soup=BeautifulSoup(text,'html.parser')
    total=good=bad=0
    for section in soup.select('section'):
        ch,verse=chapter_for(section)
        h=section.find('h3')
        if ch is not None and h: h.string=f'BP 1.{ch}.{verse}'
        details=next((d for d in section.find_all('details',recursive=False) if d.find('summary') and 'Word-for-word' in d.find('summary').get_text()),None)
        if details:
            total+=1
            if add_devanagari_mapping(details): good+=1
            else:
                bad+=1
                details['data-wfw-audit']='needs-manual-correction'
    path.write_text(str(soup))
    return total,good,bad

if __name__=='__main__':
    grand=[0,0,0]
    for path in FILES:
        a=process(path)
        grand=[x+y for x,y in zip(grand,a)]
        print(path.relative_to(ROOT),*a)
    print('TOTAL',*grand)
