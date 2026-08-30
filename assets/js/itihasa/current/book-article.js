(function(){
  'use strict';
  const data=window.ITIHASA_BOOKS||{};
  const key=document.body.dataset.bookKey||'';
  const book=data[key];
  const root=document.getElementById('itihasa-book-root');
  if(!root)return;

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const paragraphs=items=>(items||[]).map(p=>`<p>${esc(p)}</p>`).join('');
  const link=s=>s?.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`:esc(s?.title||'');

  if(!book){
    root.innerHTML='<p>This article could not be loaded. Return to the Scripture Index and choose the book again.</p>';
    return;
  }

  document.title=`${book.title} — Viveka Dṛṣṭi`;
  const meta=document.querySelector('meta[name="description"]');
  if(meta)meta.content=book.description||`${book.title}: scholarly guide to structure, contents, textual history and interpretation.`;

  const unitToc=(book.units||[]).map((unit,i)=>`<li><a href="#unit-${i+1}-${slug(unit.title)}">${esc(unit.title)}</a></li>`).join('');
  const units=(book.units||[]).map((unit,i)=>`<section class="itihasa-unit" id="unit-${i+1}-${slug(unit.title)}"><h3>${esc(unit.title)} ${unit.range?`<span class="itihasa-range">${esc(unit.range)}</span>`:''}</h3>${paragraphs(unit.paragraphs)}</section>`).join('');
  const interpretations=(book.interpretation||[]).map(part=>`<div class="itihasa-interpretation"><h3>${esc(part.title)}</h3>${paragraphs(part.paragraphs)}</div>`).join('');
  const facts=[
    ['Work',book.work],['Position',book.position],['Meaning',book.meaning],['Language','Sanskrit'],
    ['Commonly printed extent',book.traditionalExtent],['Critical-edition extent',book.criticalExtent],
    ['Principal setting',book.setting],['Textual basis',book.textualBasis]
  ].filter(([,v])=>v);
  const sources=(book.sources||[]).map(s=>`<li>${link(s)}${s.detail?` — ${esc(s.detail)}`:''}</li>`).join('');
  const previous=book.previous?`<a href="${esc(book.previous.url)}">← ${esc(book.previous.title)}</a>`:'<span></span>';
  const next=book.next?`<a href="${esc(book.next.url)}">${esc(book.next.title)} →</a>`:'<span></span>';

  root.innerHTML=`
    <header class="kena-article-head">
      <span class="eyebrow">${esc(book.work)} · standalone scholarly article</span>
      <h1>${esc(book.title)} ${book.devanagari?`<span class="itihasa-deva" lang="sa-Deva">${esc(book.devanagari)}</span>`:''}</h1>
      <span class="itihasa-book-number">${esc(book.position)}</span>
    </header>
    <aside class="itihasa-infobox" aria-label="Article facts">
      <div class="itihasa-infobox-title">${esc(book.title)}</div>
      ${facts.map(([k,v])=>`<div class="itihasa-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}
    </aside>
    <div class="itihasa-lead">${paragraphs(book.lead)}</div>
    <div class="itihasa-article-grid">
      <nav class="itihasa-side-toc" aria-label="Contents">
        <div class="kena-toc-title">Contents</div>
        <ol>
          <li><a href="#date-text">Date and textual position</a></li>
          <li><a href="#structure">Structure and numbering</a></li>
          <li><a href="#contents">Contents</a><ol class="itihasa-toc-sub">${unitToc}</ol></li>
          <li><a href="#interpretation">Interpretation</a></li>
          <li><a href="#reception">Reception and influence</a></li>
          <li><a href="#textual-history">Critical edition and transmission</a></li>
          <li><a href="#references">References</a></li>
        </ol>
      </nav>
      <div class="itihasa-book-content">
        <section id="date-text"><h2>Date and textual position</h2>${paragraphs(book.history)}</section>
        <section id="structure"><h2>Structure and numbering</h2>${paragraphs(book.structure)}${book.numberingNote?`<div class="itihasa-extent-note">${esc(book.numberingNote)}</div>`:''}</section>
        <section id="contents"><h2>Contents</h2>${paragraphs(book.contentsIntro)}${units}</section>
        <section id="interpretation"><h2>Interpretation and significance</h2>${interpretations}</section>
        <section id="reception"><h2>Reception and influence</h2>${paragraphs(book.reception)}</section>
        <section id="textual-history"><h2>Critical edition and transmission</h2>${paragraphs(book.textualHistory)}</section>
        <section id="references"><h2>References and further reading</h2><ol class="itihasa-reference-list">${sources}</ol><p class="itihasa-source-note">Chapter and sarga ranges are identified by the numbering system named above; regional recensions and translations may divide the same material differently.</p></section>
        <nav class="itihasa-neighbours" aria-label="Adjacent books">${previous}${next}</nav>
      </div>
    </div>`;
})();
