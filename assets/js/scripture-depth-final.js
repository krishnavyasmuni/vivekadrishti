(() => {
  const D = window.SCRIPTURE_DETAIL_DATA || {};
  const U = window.SCRIPTURE_UPANISHAD_UNITS || {};
  const previousOpen = window.openScriptureEncyclopedia;
  if (typeof previousOpen !== 'function') return;

  const PURANA_KINDS = new Set(['Mahāpurāṇa','Upapurāṇa','Both']);
  const UP_EXCLUDE = new Set(['Kena','Chāndogya']);
  const GENERIC_IMG = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/A_monk_meditates_under_a_tree.jpg';
  const GENERIC_PAGE = 'https://commons.wikimedia.org/wiki/File:A_monk_meditates_under_a_tree.jpg';

  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const plain = x => typeof x === 'string' ? x : (x?.text || x?.claim || x?.summary || x?.full || x?.short || x?.title || '');
  const uniq = xs => {
    const seen = new Set();
    return xs.map(plain).map(x => String(x || '').trim()).filter(x => {
      const k = x.toLowerCase().replace(/\s+/g,' ');
      if (!k || seen.has(k)) return false;
      seen.add(k); return true;
    });
  };
  const slug = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const ascii = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ṣ/g,'s').replace(/ś/g,'s').replace(/ṛ/g,'r').replace(/ṝ/g,'r').replace(/ṇ/g,'n').replace(/ñ/g,'n').replace(/ṅ/g,'n').replace(/ṭ/g,'t').replace(/ḍ/g,'d').replace(/ṃ|ṁ/g,'m');

  function addSection(article, title, paragraphs, subsections = []) {
    const existing = [...article.querySelectorAll('.kena-section > h2')].some(h => h.textContent.trim().toLowerCase() === title.toLowerCase());
    if (existing) return null;
    const ps = uniq(paragraphs);
    const subs = subsections.filter(s => s && s.title && uniq(s.paragraphs || []).length);
    if (!ps.length && !subs.length) return null;
    const sec = document.createElement('section');
    sec.className = 'kena-section depth-final-section';
    sec.id = `depth-${slug(title)}`;
    const h2 = document.createElement('h2');
    h2.textContent = title;
    sec.append(h2);
    ps.forEach(t => { const p = document.createElement('p'); p.textContent = t; sec.append(p); });
    subs.forEach((s, i) => {
      const h3 = document.createElement('h3');
      h3.id = `${sec.id}-${i+1}`;
      h3.textContent = s.title;
      sec.append(h3);
      uniq(s.paragraphs || []).forEach(t => { const p = document.createElement('p'); p.textContent = t; sec.append(p); });
    });
    const refs = article.querySelector('#universal-references, #scripture-references, #cup-refs, .kena-references, .universal-references');
    if (refs) refs.before(sec); else article.append(sec);
    return sec;
  }

  function headingExists(article, re) {
    return [...article.querySelectorAll('.kena-section > h2')].some(h => re.test(h.textContent));
  }

  function enrichPurana(article, button, name) {
    if (!article || article.dataset.depthFinalPurana === '1') return;
    article.dataset.depthFinalPurana = '1';
    const e = Object.assign({}, D[name] || {}, D[`Purāṇa:${name}`] || {});

    const identity = [];
    if (e.sanskritTitle) identity.push(`The Sanskrit title is ${e.sanskritTitle}.`);
    if (e.traditionalAuthor) identity.push(`Traditional attribution associates the work with ${e.traditionalAuthor}.`);
    if (e.extent) identity.push(`The received extent is ${e.extent}.`);
    if (e.booksCount) identity.push(`Its major division count is ${e.booksCount}.`);
    if (e.verseCount) identity.push(`Traditional or received verse count: ${e.verseCount}.`);
    if (button?.dataset?.sect) identity.push(`In this index it is placed in the ${button.dataset.sect} sectarian grouping; that label describes the dominant received profile rather than every layer of the text.`);
    if (button?.dataset?.maha) identity.push(`Mahāpurāṇa catalogue witnesses recorded by the index include ${button.dataset.maha.split(' · ').join('; ')}.`);
    if (button?.dataset?.upa) identity.push(`Upapurāṇa catalogue witnesses recorded by the index include ${button.dataset.upa.split(' · ').join('; ')}.`);
    if (identity.length && !headingExists(article,/canonical identity|classification|title and identity/i)) addSection(article,'Title, classification and canonical identity',identity);

    const themeParas = [];
    if (e.profile) themeParas.push(e.profile);
    if (e.ritualHistory) themeParas.push(e.ritualHistory);
    const themes = uniq(arr(e.themes));
    if (themes.length) themeParas.push(`Major themes include ${themes.join('; ')}.`);
    const features = uniq([...arr(e.namedFeatures), ...arr(e.primaryEvidence), ...arr(e.primaryPassages)]);
    const themeSubs = features.length ? [{title:'Important narratives, doctrines and ritual features',paragraphs:features}] : [];
    if ((themeParas.length || themeSubs.length) && !headingExists(article,/teachings and religious setting|theology|religious world|doctrine and practice/i)) {
      addSection(article,'Religious world, doctrine and practice',themeParas,themeSubs);
    }

    const scholarship = [];
    if (e.status) scholarship.push(e.status);
    scholarship.push(...arr(e.scholarlyPositions), ...arr(e.scholarlyDebates));
    if (e.hazraNotes) scholarship.push(e.hazraNotes);
    const related = uniq(arr(e.dependencies));
    const scholarSubs = related.length ? [{title:'Parallels and related texts',paragraphs:related}] : [];
    if ((scholarship.length || scholarSubs.length) && !headingExists(article,/scholarship and textual questions|commentary and reception|reception and scholarship/i)) {
      addSection(article,'Scholarship and textual questions',scholarship,scholarSubs);
    }

    rebuildToc(article);
    resolvePuranaArt(article, name);
  }

  function enrichUpanishad(article, name) {
    if (!article || article.dataset.depthFinalUpanishad === '1' || UP_EXCLUDE.has(name)) return;
    article.dataset.depthFinalUpanishad = '1';
    const e = Object.assign({}, D[name] || {}, D[`Upaniṣad:${name}`] || {});

    const teaching = [];
    if (e.profile) teaching.push(e.profile);
    teaching.push(...arr(e.themes));
    if (e.ritualHistory) teaching.push(e.ritualHistory);
    if (e.significance) teaching.push(e.significance);
    const evidence = uniq([...arr(e.namedFeatures), ...arr(e.primaryEvidence), ...arr(e.primaryPassages), ...arr(e.keyPassages)]);
    const subs = evidence.length ? [{title:'Characteristic passages and teaching motifs',paragraphs:evidence}] : [];
    if ((teaching.length || subs.length) && !headingExists(article,/teachings, doctrines and practice|contents and teaching|doctrine, practice|bhakti|yoga and liberation/i)) {
      addSection(article,'Teachings, doctrines and practice',teaching,subs);
    }

    const scholarship = [];
    if (e.status) scholarship.push(e.status);
    scholarship.push(...arr(e.scholarlyPositions), ...arr(e.scholarlyDebates));
    const rel = uniq(arr(e.dependencies));
    const ssubs = rel.length ? [{title:'Textual parallels and dependencies',paragraphs:rel}] : [];
    if ((scholarship.length || ssubs.length) && !headingExists(article,/textual relationships and scholarly questions|reception and scholarship|commentaries, reception and scholarship/i)) {
      addSection(article,'Textual relationships and scholarly questions',scholarship,ssubs);
    }

    const units = arr(U[name]);
    if (units.length && !headingExists(article,/text and contents.*section by section/i)) {
      addSection(article,'Text and contents — section by section',
        [`This walkthrough follows the received sequence of the ${name} Upanishad so that its argument is visible as a text rather than reduced to a list of themes.`],
        units.map((u,i)=>Array.isArray(u)?{title:u[0]||`Section ${i+1}`,paragraphs:[u[1]||'']}:{title:u.title||`Section ${i+1}`,paragraphs:[u.text||u.summary||u.note||'']})
      );
    }
    rebuildToc(article);
  }

  function rebuildToc(article) {
    const toc = article.querySelector('.kena-toc');
    if (!toc) return;
    let ol = toc.querySelector(':scope > ol');
    if (!ol) { ol = document.createElement('ol'); toc.append(ol); }
    ol.innerHTML = '';
    const sections = [...article.querySelectorAll(':scope > .kena-section')];
    sections.forEach((sec, i) => {
      const h2 = sec.querySelector(':scope > h2');
      if (!h2) return;
      if (!sec.id) sec.id = `depth-sec-${i+1}`;
      const li = document.createElement('li');
      const a = document.createElement('a'); a.href = `#${sec.id}`; a.textContent = h2.textContent.trim(); li.append(a);
      const h3s = [...sec.querySelectorAll(':scope > h3')];
      if (h3s.length) {
        const sub = document.createElement('ol');
        h3s.forEach((h3,j)=>{
          if (!h3.id) h3.id = `${sec.id}-${j+1}`;
          const sli = document.createElement('li'); const sa = document.createElement('a'); sa.href=`#${h3.id}`; sa.textContent=h3.textContent.trim(); sli.append(sa); sub.append(sli);
        });
        li.append(sub);
      }
      ol.append(li);
    });
  }

  function ensurePuranaFigure(article) {
    const box = article.querySelector('.universal-infobox, .kena-infobox');
    if (!box) return null;
    let figure = box.querySelector('.universal-infobox-image, figure');
    if (!figure) {
      figure = document.createElement('figure'); figure.className='universal-infobox-image depth-purana-art';
      const title = box.querySelector('.kena-infobox-title'); const dev = box.querySelector('.universal-devanagari');
      (dev || title)?.insertAdjacentElement('afterend', figure);
    }
    let a = figure.querySelector('a');
    if (!a) { a=document.createElement('a'); a.target='_blank'; a.rel='noopener'; figure.prepend(a); }
    let img = a.querySelector('img');
    if (!img) { img=document.createElement('img'); img.loading='eager'; a.append(img); }
    let cap = figure.querySelector('figcaption');
    if (!cap) { cap=document.createElement('figcaption'); figure.append(cap); }
    figure.style.display='';
    return {figure,a,img,cap};
  }

  function setPuranaGeneric(article) {
    const f=ensurePuranaFigure(article); if(!f) return;
    f.a.href=GENERIC_PAGE; f.a.target='_blank'; f.a.rel='noopener';
    f.img.removeAttribute('onerror'); f.img.referrerPolicy='no-referrer'; f.img.alt='Contemplative forest scene'; f.img.onerror=null; f.img.src=GENERIC_IMG;
    f.cap.textContent=''; f.cap.style.display='none'; f.figure.classList.add('depth-generic-art');
  }

  function setPuranaWiki(article,page) {
    if(!page?.thumbnail?.source) return false;
    const f=ensurePuranaFigure(article); if(!f) return false;
    f.figure.classList.remove('depth-generic-art');
    f.a.href=page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent((page.title||'').replace(/ /g,'_'))}`;
    f.img.removeAttribute('onerror'); f.img.referrerPolicy='no-referrer'; f.img.alt=page.title||''; f.img.onerror=()=>setPuranaGeneric(article); f.img.src=page.thumbnail.source;
    f.cap.textContent=page.title ? `${page.title} — Wikipedia` : ''; f.cap.style.display=page.title?'':'none';
    return true;
  }

  async function lookupWiki(name) {
    const wanted = ascii(name).replace(/Purana$/i,'Purana').trim();
    try {
      let url=`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages%7Cinfo&piprop=thumbnail&pithumbsize=1000&inprop=url&titles=${encodeURIComponent(wanted)}`;
      let res=await fetch(url,{mode:'cors',credentials:'omit'}); let data=await res.json(); let pages=Object.values(data?.query?.pages||{});
      let page=pages.find(p=>p.thumbnail?.source&&!p.missing); if(page)return page;
      url=`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit=6&gsrsearch=${encodeURIComponent(wanted)}&prop=pageimages%7Cinfo&piprop=thumbnail&pithumbsize=1000&inprop=url`;
      res=await fetch(url,{mode:'cors',credentials:'omit'}); data=await res.json(); pages=Object.values(data?.query?.pages||{}).filter(p=>p.thumbnail?.source);
      const stem=ascii(name).replace(/\s*Purana$/i,'').toLowerCase();
      pages.sort((a,b)=>{
        const score=p=>{const t=ascii(p.title||'').toLowerCase();return (t===ascii(wanted).toLowerCase()?100:0)+(t.includes(stem)?60:0)+(t.includes('purana')?20:0);};
        return score(b)-score(a);
      });
      return pages[0]||null;
    } catch (_) { return null; }
  }

  async function resolvePuranaArt(article,name) {
    if(article.dataset.depthPuranaArt==='1') return;
    article.dataset.depthPuranaArt='1';
    const existing=article.querySelector('.universal-infobox-image img');
    if(!existing?.src) setPuranaGeneric(article);
    const page=await lookupWiki(name);
    if(page && article.isConnected) setPuranaWiki(article,page);
    else if(!article.querySelector('.universal-infobox-image img')?.src) setPuranaGeneric(article);
  }

  function apply(button) {
    const kind=button?.dataset?.kind||'';
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';
    if (PURANA_KINDS.has(kind)) {
      const article=document.querySelector('.universal-wiki-article');
      if(article) enrichPurana(article,button,name);
    } else if(kind==='Upaniṣad' && !UP_EXCLUDE.has(name)) {
      const article=document.querySelector('.current-up-article');
      if(article) enrichUpanishad(article,name);
    }
  }

  window.openScriptureEncyclopedia=function(button){
    const result=previousOpen(button);
    if(result!==false){
      apply(button);
      queueMicrotask(()=>apply(button));
      setTimeout(()=>apply(button),60);
    }
    return result;
  };

  if(!document.getElementById('scripture-depth-final-style')){
    const style=document.createElement('style'); style.id='scripture-depth-final-style'; style.textContent=`
      .depth-final-section h3{margin-top:1.15em!important}
      .depth-purana-art img,.universal-infobox-image img{display:block;width:100%;height:auto;max-height:430px;object-fit:cover}
      .depth-generic-art figcaption{display:none!important}
      .kena-toc ol ol{margin-top:4px;padding-left:1.35em}
      .kena-toc ol ol li{margin:2px 0}
    `; document.head.append(style);
  }
  window.SCRIPTURE_DEPTH_FINAL = '20260825';
})();