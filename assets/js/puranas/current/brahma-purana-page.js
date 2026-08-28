(() => {
  const root = document.getElementById('mahapurana-standalone');
  if (!root) return;

  const englishize = value => String(value || '')
    .replace(/[ŚśṢṣ]/g, c => c === c.toUpperCase() ? 'Sh' : 'sh')
    .replace(/[ṚṛṜṝ]/g, c => c === c.toUpperCase() ? 'Ri' : 'ri')
    .replace(/[Ṅṅ]/g, c => c === c.toUpperCase() ? 'Ng' : 'ng')
    .replace(/[Ññ]/g, c => c === c.toUpperCase() ? 'Ny' : 'ny')
    .replace(/[ṂṃṀṁ]/g, c => c === c.toUpperCase() ? 'M' : 'm')
    .replace(/[Ḥḥ]/g, c => c === c.toUpperCase() ? 'H' : 'h')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function cleanLatinText(){
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || parent.closest('[lang="sa-Deva"], .brahma-devanagari-title, .universal-devanagari')) return;
      node.nodeValue = englishize(node.nodeValue);
    });
  }

  function highlightKeyTerms(){
    const terms = [
      'Brahma Purana','Mahapurana','Adi Purana','Vyasa','Lomaharshana','Naimisharanya',
      'R. C. Hazra','Surabhi Trivedi','Odisha','Utkala','Purushottama','Jagannatha',
      'Gautami Mahatmya','Godavari','Vishnu Purana','Markandeya Purana','Vayu Purana',
      'Mahabharata','Krishna','Balarama','Subhadra','Samkhya','Yoga','Purvabhaga','Uttarabhaga',
      'Konark Sun Temple','Vaishnavism','Shaivism','Shaktism','Brahmottara Purana','Surya'
    ].sort((a,b) => b.length - a.length);
    const facts = [
      /\b245 chapters\b/gi,/\b10,000 verses\b/gi,/\bchapters?\s+\d+[–-]\d+\b/gi,
      /\b(?:9th|10th|11th|12th|13th) century\b/gi,
      /\b(?:ninth|tenth|eleventh|twelfth|thirteenth) centur(?:y|ies)\b/gi
    ];
    const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    const termRe = new RegExp('\\b(' + escaped.join('|') + ')\\b','gi');

    root.querySelectorAll('.kena-lead p, .mahapurana-collapse-body p, .mahapurana-collapse-body li').forEach(el => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        const n = walker.currentNode;
        const p = n.parentElement;
        if (!p || p.closest('a,strong,.wiki-keyterm,.wiki-fact')) continue;
        nodes.push(n);
      }
      nodes.forEach(node => {
        const text = node.nodeValue;
        if (!text || !text.trim()) return;
        const matches = [];
        termRe.lastIndex = 0;
        let m;
        while ((m = termRe.exec(text))) matches.push({start:m.index,end:m.index+m[0].length,cls:'wiki-keyterm'});
        facts.forEach(re => {
          re.lastIndex = 0;
          let fm;
          while ((fm = re.exec(text))) matches.push({start:fm.index,end:fm.index+fm[0].length,cls:'wiki-fact'});
        });
        if (!matches.length) return;
        matches.sort((a,b) => a.start-b.start || (b.end-b.start)-(a.end-a.start));
        const filtered = [];
        let end = -1;
        matches.forEach(x => { if (x.start >= end) { filtered.push(x); end = x.end; } });
        const frag = document.createDocumentFragment();
        let pos = 0;
        filtered.forEach(x => {
          if (x.start > pos) frag.appendChild(document.createTextNode(text.slice(pos,x.start)));
          const strong = document.createElement('strong');
          strong.className = x.cls;
          strong.textContent = text.slice(x.start,x.end);
          frag.appendChild(strong);
          pos = x.end;
        });
        if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
        node.replaceWith(frag);
      });
    });
  }

  function makeContinuousArticle(){
    root.querySelectorAll('.mahapurana-collapse-section').forEach(section => {
      section.classList.remove('mahapurana-collapse-section','is-open');
      section.classList.add('brahma-article-section');
      const h = section.querySelector(':scope > h2');
      const body = section.querySelector(':scope > .mahapurana-collapse-body');
      if (h) {
        h.removeAttribute('role');
        h.removeAttribute('tabindex');
        h.removeAttribute('aria-expanded');
      }
      if (body) {
        body.hidden = false;
        body.removeAttribute('hidden');
      }
    });
  }

  function reorderArticleAndToc(){
    const desired = [
      ['Date of composition','Date'],
      ['Structure','Structure'],
      ['Contents','Contents'],
      ['Theology','Theology'],
      ['Influences and reception','Influence'],
      ['Rites, dharma and social history','Rites'],
      ['Critical edition','Critical edition'],
      ['Further reading','Further reading'],
      ['References','References']
    ];

    const sections = [...root.querySelectorAll('.brahma-article-section')];
    if (!sections.length) return;
    const parent = sections[0].parentElement;
    const byTitle = new Map();
    sections.forEach(section => {
      const h = section.querySelector(':scope > h2');
      if (h) byTitle.set(h.textContent.trim(), {section, h});
    });

    desired.forEach(([oldTitle,newTitle]) => {
      const found = byTitle.get(oldTitle);
      if (!found) return;
      found.h.textContent = newTitle;
      parent.appendChild(found.section);
    });

    const toc = root.querySelector('.kena-toc');
    const ol = toc?.querySelector('ol');
    if (!ol) return;
    const items = [...ol.querySelectorAll(':scope > li')];
    const byLinkText = new Map();
    items.forEach(li => {
      const a = li.querySelector('a');
      if (a) byLinkText.set(a.textContent.trim(), {li,a});
    });
    desired.forEach(([oldTitle,newTitle]) => {
      const found = byLinkText.get(oldTitle);
      if (!found) return;
      found.a.textContent = newTitle;
      ol.appendChild(found.li);
    });
  }

  async function applyExactWikipediaImage(){
    const figure = root.querySelector('.brahma-infobox-image');
    const img = figure?.querySelector('img');
    const link = figure?.querySelector('a');
    const cap = figure?.querySelector('figcaption');
    if (!figure || !img || !link) return;
    try {
      const api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&titles=Brahma_Purana&prop=pageimages|info&inprop=url&pithumbsize=1400';
      const response = await fetch(api, {mode:'cors', cache:'no-store'});
      if (!response.ok) throw new Error('Wikipedia image request failed');
      const json = await response.json();
      const page = Object.values(json?.query?.pages || {})[0];
      if (!page || ('missing' in page) || !page.thumbnail?.source) throw new Error('No Brahma Purana page image');
      img.src = page.thumbnail.source;
      img.alt = 'Lead image from the Wikipedia article on the Brahma Purana';
      link.href = page.fullurl || 'https://en.wikipedia.org/wiki/Brahma_Purana';
      if (cap) cap.textContent = 'Lead image from Wikipedia’s Brahma Purana article.';
      figure.classList.add('has-image');
    } catch (err) {
      console.warn('Brahma Purana Wikipedia image unavailable', err);
      figure.classList.remove('has-image');
    }
  }

  function refine(){
    if (!root.classList.contains('is-loaded')) return false;

    document.title = 'Brahma Purana — Viveka Drishti';
    const eyebrow = root.querySelector('.kena-article-head .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Purana · encyclopedia article';
    const heading = root.querySelector('.kena-article-head h1');
    if (heading) heading.innerHTML = 'Brahma Purana <span class="brahma-devanagari-title" lang="sa-Deva">ब्रह्मपुराणम्</span>';

    const box = root.querySelector('.universal-infobox');
    if (box) box.innerHTML = `
      <figure class="brahma-infobox-image">
        <a href="https://en.wikipedia.org/wiki/Brahma_Purana" target="_blank" rel="noopener noreferrer"><img alt=""></a>
        <figcaption>Lead image from Wikipedia’s Brahma Purana article.</figcaption>
      </figure>
      <div class="kena-infobox-title">Brahma Purana</div>
      <div class="universal-devanagari" lang="sa-Deva">ब्रह्मपुराणम्</div>
      <div class="kena-info-row"><b>Tradition</b><span>Attributed to Vyasa</span></div>
      <div class="kena-info-row"><b>Language</b><span>Sanskrit</span></div>
      <div class="kena-info-row"><b>Dating</b><span>Layered text; main received compilation broadly <strong>10th–12th century CE</strong>, with older material preserved</span></div>
      <div class="kena-info-row"><b>Textual character</b><span>Layered Puranic compilation with distinct regional and pilgrimage strata</span></div>
      <div class="kena-info-row"><b>Key regions</b><span>Odisha / Purushottama and the Godavari sacred landscape</span></div>
      <div class="kena-info-row"><b>Main themes</b><span>Cosmology, pilgrimage, Krishna traditions, ritual, dharma, Samkhya, Yoga and liberation</span></div>
      <div class="kena-info-row"><b>Received text</b><span><strong>245 chapters</strong></span></div>
      <div class="kena-info-row"><b>Traditional count</b><span><strong>10,000 verses</strong></span></div>`;

    cleanLatinText();
    highlightKeyTerms();
    makeContinuousArticle();
    reorderArticleAndToc();
    applyExactWikipediaImage();

    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'start'}));
    }
    return true;
  }

  if (refine()) return;
  const observer = new MutationObserver(() => {
    if (refine()) observer.disconnect();
  });
  observer.observe(root, {childList:true, subtree:true, attributes:true});
})();
