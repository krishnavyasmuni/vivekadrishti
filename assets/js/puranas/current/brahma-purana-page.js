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
    const facts = [/\b245 chapters\b/gi,/\b10,000 verses\b/gi,/\bchapters?\s+\d+[–-]\d+\b/gi,/\b(?:10th|11th|12th|13th) century\b/gi,/\b(?:tenth|eleventh|twelfth|thirteenth) centur(?:y|ies)\b/gi];
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

  function makeTopLayout(){
    const article = root.querySelector('.mahapurana-wiki-article');
    const lead = root.querySelector('.kena-lead');
    const toc = root.querySelector('.kena-toc');
    const box = root.querySelector('.universal-infobox');
    if (!article || !lead || !toc || !box || article.querySelector('.brahma-top-grid')) return;
    const grid = document.createElement('div');
    grid.className = 'brahma-top-grid';
    const main = document.createElement('div');
    main.className = 'brahma-top-main';
    const side = document.createElement('div');
    side.className = 'brahma-top-side';
    article.insertBefore(grid, article.firstChild);
    grid.append(main, side);
    main.append(lead, toc);
    side.append(box);
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
        <a href="https://commons.wikimedia.org/wiki/File:6th_century_Brahma_on_Cave_3_ceiling,_Badami_Hindu_cave_temple_Karnataka_3.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/6th%20century%20Brahma%20on%20Cave%203%20ceiling%2C%20Badami%20Hindu%20cave%20temple%20Karnataka%203.jpg?width=1000" alt="Sixth-century sculpture of Brahma from Cave 3 at Badami">
        </a>
        <figcaption>6th-century sculpture of Brahma from Cave 3 at Badami — the image used on Wikipedia's Brahma article.</figcaption>
      </figure>
      <div class="kena-infobox-title">Brahma Purana</div>
      <div class="universal-devanagari" lang="sa-Deva">ब्रह्मपुराणम्</div>
      <div class="kena-info-row"><b>Tradition</b><span>Attributed to Vyasa</span></div>
      <div class="kena-info-row"><b>Language</b><span>Sanskrit</span></div>
      <div class="kena-info-row"><b>Received text</b><span><strong>245 chapters</strong></span></div>
      <div class="kena-info-row"><b>Traditional count</b><span><strong>10,000 verses</strong></span></div>`;

    cleanLatinText();
    highlightKeyTerms();
    makeTopLayout();
    return true;
  }

  if (refine()) return;
  const observer = new MutationObserver(() => {
    if (refine()) observer.disconnect();
  });
  observer.observe(root, {childList:true, subtree:true, attributes:true});
})();
