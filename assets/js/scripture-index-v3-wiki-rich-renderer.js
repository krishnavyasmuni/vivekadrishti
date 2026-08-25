(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const allowed = new Set(['Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka','Upaniṣad','Mahāpurāṇa','Upapurāṇa','Both','Itihāsa','Smṛti','Vedāṅga']);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const split = v => String(v || '').split(' · ').map(x => x.trim()).filter(Boolean);
  const plain = x => typeof x === 'string' ? x : (x?.claim || x?.text || x?.full || x?.short || '');
  const uniq = xs => [...new Set(xs.map(plain).filter(Boolean))];
  const slug = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const P = html => html ? `<p>${html}</p>` : '';

  let shade = null;
  let reader = null;

  function infoFor(button) {
    const d = button.dataset;
    return {
      name:d.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim(),
      kind:d.kind || '', veda:d.veda || '', type:d.type || '', branch:d.branch || '', sect:d.sect || '', source:d.source || '', group:d.group || '',
      maha:split(d.maha), upa:split(d.upa)
    };
  }
  function keyFor(i) {
    if (i.kind === 'Upaniṣad') return `Upaniṣad:${i.name}`;
    if (i.kind === 'Smṛti') return `Smṛti:${i.name}`;
    if (i.kind === 'Itihāsa') return `Itihāsa:${i.name}`;
    if (i.kind === 'Vedāṅga') return `Vedāṅga:${i.name}`;
    if (i.kind === 'Veda' || ['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind)) return `Vedic:${i.name}`;
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind)) return `Purāṇa:${i.name}`;
    return `${i.kind}:${i.name}`;
  }
  function entryFor(i) {
    const D = window.SCRIPTURE_DETAIL_DATA || {};
    return Object.assign({}, D[i.name] || {}, D[keyFor(i)] || {});
  }
  function refsFor(e,i) { return uniq([...arr(e.bibliography),...arr(e.sources),i.source,...i.maha,...i.upa]); }

  function close() {
    shade?.remove(); reader?.remove(); shade = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});
  }

  function infobox(i,e,refs) {
    const rows=[];
    rows.push(['Type',i.kind]);
    if (e.sanskritTitle) rows.push(['Sanskrit',e.sanskritTitle]);
    if (e.alternateTitles) rows.push(['Also known as',arr(e.alternateTitles).join(', ')]);
    if (e.traditionalAuthor) rows.push(['Traditional author',e.traditionalAuthor]);
    if (e.language) rows.push(['Language',e.language]);
    if (i.veda) rows.push(['Veda',i.veda]);
    if (i.branch) rows.push(['School / recension',i.branch]);
    if (i.type) rows.push(['Traditional group',i.type]);
    if (i.sect) rows.push(['Sectarian grouping',i.sect]);
    if (e.extent) rows.push(['Extent',e.extent]);
    if (e.booksCount) rows.push(['Books / divisions',e.booksCount]);
    if (e.verseCount) rows.push(['Verse count',e.verseCount]);
    if (e.period) rows.push(['Date',e.period]);
    if (e.primaryRecensions) rows.push(['Major recensions',arr(e.primaryRecensions).join('; ')]);
    if (i.maha.length) rows.push(['Mahāpurāṇa witnesses',String(i.maha.length)]);
    if (i.upa.length) rows.push(['Upapurāṇa witnesses',String(i.upa.length)]);
    if (refs.length) rows.push(['References',String(refs.length)]);
    return `<aside class="kena-infobox"><div class="kena-infobox-title">${esc(i.name)}</div>${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function paragraphs(xs) { return arr(xs).map(x=>P(esc(plain(x)))).join(''); }
  function bullets(xs) { const a=uniq(arr(xs)); return a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''; }
  function books(xs) {
    const a=arr(xs); if(!a.length) return '';
    return `<div class="wiki-book-list">${a.map((b,n)=>{
      if (typeof b === 'string') return `<div class="wiki-book"><b>${n+1}</b><div>${esc(b)}</div></div>`;
      const num=b.number ?? (n+1), title=b.title || b.name || `Book ${num}`, text=b.summary || b.text || '';
      return `<div class="wiki-book"><b>${esc(num)}</b><div><strong>${esc(title)}</strong>${text?`<p>${esc(text)}</p>`:''}</div></div>`;
    }).join('')}</div>`;
  }

  function longSections(e) {
    const out=[];
    arr(e.articleSections).forEach((s,n)=>{
      if(!s) return;
      const title=s.title || `Section ${n+1}`;
      const id=`wiki-${slug(title)||n+1}`;
      let body='';
      body += paragraphs(s.paragraphs || s.text);
      if (s.books) body += books(s.books);
      if (s.bullets) body += bullets(s.bullets);
      if (s.note) body += `<div class="kena-note">${esc(s.note)}</div>`;
      if (s.subsections) {
        arr(s.subsections).forEach(sub=>{
          body += `<h3>${esc(sub.title || '')}</h3>${paragraphs(sub.paragraphs || sub.text)}${sub.books?books(sub.books):''}${sub.bullets?bullets(sub.bullets):''}`;
        });
      }
      if(body) out.push({id,title,html:`<section class="kena-section" id="${id}"><h2>${esc(title)}</h2>${body}</section>`});
    });
    return out;
  }

  function defaultSections(i,e) {
    const out=[];
    let body='';
    if(e.period) body+=`<h3>Date</h3>${P(esc(e.period))}`;
    if(e.milieu) body+=`<h3>Historical setting</h3>${P(esc(e.milieu))}`;
    if(e.history) body+=`<h3>Textual development</h3>${P(esc(e.history))}`;
    if(e.datingBasis) body+=`<h3>How the date is argued</h3>${P(esc(e.datingBasis))}`;
    if(body) out.push({id:'scripture-history',title:'Textual history and date',html:`<section class="kena-section" id="scripture-history"><h2>Textual history and date</h2>${body}</section>`});

    body='';
    if(e.structure) body+=P(esc(e.structure));
    const cm=uniq([...arr(e.chapterMap),...arr(e.contents),...arr(e.keyContents)]);
    if(cm.length) body+=`<h3>Contents</h3>${bullets(cm)}`;
    const nf=uniq([...arr(e.namedFeatures),...arr(e.primaryEvidence),...arr(e.primaryPassages)]);
    if(nf.length) body+=`<h3>Major episodes, doctrines or passages</h3>${bullets(nf)}`;
    if(body) out.push({id:'scripture-contents',title:'Structure and contents',html:`<section class="kena-section" id="scripture-contents"><h2>Structure and contents</h2>${body}</section>`});

    body='';
    if(i.branch) body+=P(`The label “${esc(i.branch)}” identifies the transmitted school or recension represented by this entry.`);
    if(e.manuscripts) body+=`<h3>Manuscripts and recensions</h3>${P(esc(e.manuscripts))}`;
    if(arr(e.dependencies).length) body+=`<h3>Parallels and related texts</h3>${bullets(e.dependencies)}`;
    if(e.status) body+=`<h3>What is uncertain</h3><div class="kena-note">${esc(e.status)}</div>`;
    if(i.maha.length||i.upa.length){body+=`<h3>Traditional catalogue evidence</h3>`;if(i.maha.length)body+=P(`Listed as a Mahāpurāṇa in: ${esc(i.maha.join('; '))}.`);if(i.upa.length)body+=P(`Listed as an Upapurāṇa in: ${esc(i.upa.join('; '))}.`);}
    if(body) out.push({id:'scripture-transmission',title:'Text and transmission',html:`<section class="kena-section" id="scripture-transmission"><h2>Text and transmission</h2>${body}</section>`});

    body='';
    if(e.profile) body+=`<h3>Religious and philosophical profile</h3>${P(esc(e.profile))}`;
    if(arr(e.themes).length) body+=`<h3>Main themes</h3>${bullets(e.themes)}`;
    if(e.ritualHistory) body+=`<h3>Ritual and social material</h3>${P(esc(e.ritualHistory))}`;
    if(body) out.push({id:'scripture-ideas',title:'Ideas, religion and practice',html:`<section class="kena-section" id="scripture-ideas"><h2>Ideas, religion and practice</h2>${body}</section>`});

    body='';
    if(e.reception) body+=`<h3>Later reception</h3>${P(esc(e.reception))}`;
    if(e.significance) body+=`<h3>Significance</h3>${P(esc(e.significance))}`;
    if(arr(e.scholarlyPositions).length) body+=`<h3>Major scholarly positions</h3>${bullets(e.scholarlyPositions)}`;
    if(arr(e.scholarlyDebates).length) body+=`<h3>Scholarly debates</h3>${bullets(e.scholarlyDebates)}`;
    if(e.hazraNotes) body+=`<h3>Specialist textual analysis</h3>${P(esc(e.hazraNotes))}`;
    if(body) out.push({id:'scripture-reception',title:'Reception and scholarship',html:`<section class="kena-section" id="scripture-reception"><h2>Reception and scholarship</h2>${body}</section>`});
    return out;
  }

  function article(i,e) {
    const refs=refsFor(e,i);
    const leads=arr(e.leadParagraphs).length?arr(e.leadParagraphs):[e.overview || e.summary || `${i.name} is represented in this scripture index.`];
    const custom=longSections(e);
    const defaults=defaultSections(i,e);
    const usedTitles=new Set(custom.map(s=>s.title.toLowerCase()));
    const sections=[...custom,...defaults.filter(s=>!usedTitles.has(s.title.toLowerCase()))];
    if(refs.length) sections.push({id:'scripture-references',title:'References',html:`<section class="kena-section kena-references" id="scripture-references"><h2>References</h2><ol>${refs.map((r,n)=>`<li id="scripture-ref-${n+1}">${esc(r)}</li>`).join('')}</ol></section>`});
    const toc=sections.map(s=>`<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('');
    return `<article class="scripture-wiki-article">${infobox(i,e,refs)}<div class="kena-lead">${leads.map(x=>P(esc(plain(x)))).join('')}</div>${toc?`<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>`:''}${sections.map(s=>s.html).join('')}</article>`;
  }

  function open(button) {
    const i=infoFor(button); if(!allowed.has(i.kind)) return false; if(i.kind==='Upaniṣad'&&i.name==='Kena') return false;
    close(); button.classList.add('is-active'); button.setAttribute('aria-pressed','true');
    const e=entryFor(i);
    shade=document.createElement('div'); shade.className='kena-article-backdrop scripture-wiki-backdrop';
    reader=document.createElement('section'); reader.className='kena-article-reader scripture-wiki-reader'; reader.setAttribute('role','dialog'); reader.setAttribute('aria-modal','true'); reader.setAttribute('aria-label',`${i.name} encyclopedia article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Scripture encyclopedia</span><h1>${esc(i.name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${article(i,e)}</div>`;
    document.body.append(shade,reader); document.documentElement.classList.add('kena-article-open'); reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
    return true;
  }

  window.openScriptureEncyclopedia=open;
  window.SCRIPTURE_RICH_WIKI_RENDERER=true;
  document.addEventListener('click',e=>{if(e.target===shade || e.target.closest?.('.scripture-wiki-reader .kena-article-close')) close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader) close();});
})();