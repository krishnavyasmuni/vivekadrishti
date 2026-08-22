from pathlib import Path
from bs4 import BeautifulSoup
import html,re,sys

ROOT=Path(__file__).resolve().parents[1]
WORK=Path('/Users/macbook/Documents/Codex/2026-08-20/new-chat/work')
TITLES={26:'Traditional Bodily Signs',27:'Traditional Marks of a King',28:'Traditional Marks of Women',29:'Worship and Mantras of Gaṇeśa'}

def add(ch):
    template=BeautifulSoup((ROOT/'articles/bhavishya-purana-brahmaparvan-chapter-25/index.html').read_text(),'html.parser')
    source=BeautifulSoup((WORK/f'bhavishya_ch{ch}_complete.html').read_text(),'html.parser')
    source_body=source.select_one('body > div') or source.find('div')
    title=f'Bhaviṣya Purāṇa — Brāhmaparvan — Chapter {ch}'
    template.title.string=f'{title} — Viveka Dṛṣṭi'
    template.find('meta',attrs={'name':'description'})['content']=f'{title}: Sanskrit text, English translation, word-for-word analysis, and transliteration.'
    template.select_one('.article-heading h1').string=title
    template.select_one('.article-date').string='22 August 2026'
    article_body=template.select_one('.article-body')
    article_body.clear(); article_body.append(source_body)
    target=ROOT/f'articles/bhavishya-purana-brahmaparvan-chapter-{ch}/index.html'
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(str(template))

def update_index():
    path=ROOT/'pages/bhavishya-purana-brahmaparvan/index.html'
    soup=BeautifulSoup(path.read_text(),'html.parser'); ul=soup.select_one('.empyrean-introduction-content ul')
    existing={a.get('href') for a in ul.select('a')}
    marker=next((li for li in ul.find_all('li',recursive=False) if 'Chapters 39–44' in li.get_text()),None)
    for ch in (26,27,28,29):
        href=f'/vivekadrishti/articles/bhavishya-purana-brahmaparvan-chapter-{ch}/'
        if href in existing: continue
        frag=BeautifulSoup(f'<li><a href="{href}" style="font-size:20px;font-weight:400;line-height:1.5;text-decoration:none;color:#6731fb;font-family:Merriweather,serif">Chapter {ch} — {TITLES[ch]}</a></li>','html.parser').li
        if marker: marker.insert_before(frag)
        else: ul.append(frag)
    path.write_text(str(soup))

for ch in (26,27,28,29): add(ch)
update_index()
