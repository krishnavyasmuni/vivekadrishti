(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const previousOpen = window.openScriptureEncyclopedia;
  const ALLOWED = new Set(['Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka','Upaniṣad','Mahāpurāṇa','Upapurāṇa','Both','Smṛti','Vedāṅga']);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const plain = x => typeof x === 'string' ? x : (x?.claim || x?.text || x?.full || x?.short || x?.title || '');
  const uniq = xs => [...new Set(xs.map(plain).map(x=>String(x||'').trim()).filter(Boolean))];
  const split = v => String(v || '').split(' · ').map(x => x.trim()).filter(Boolean);
  const slug = s => String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  const roman = s => String(s ?? '')
    .replace(/Ś/g,'Sh').replace(/ś/g,'sh')
    .replace(/Ṣ/g,'Sh').replace(/ṣ/g,'sh')
    .replace(/Ṛ/g,'Ri').replace(/ṛ/g,'ri')
    .replace(/Ṝ/g,'Ri').replace(/ṝ/g,'ri')
    .replace(/Ṅ/g,'Ng').replace(/ṅ/g,'ng')
    .replace(/Ñ/g,'Ny').replace(/ñ/g,'ny')
    .replace(/Ṃ|Ṁ/g,'M').replace(/ṃ|ṁ/g,'m')
    .replace(/Ḥ/g,'H').replace(/ḥ/g,'h')
    .replace(/Ṭ/g,'T').replace(/ṭ/g,'t')
    .replace(/Ḍ/g,'D').replace(/ḍ/g,'d')
    .replace(/Ṇ/g,'N').replace(/ṇ/g,'n')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');

  const cleanResearchVoice = html => String(html||'')
    .replace(/According to Wikipedia,?\s*/gi,'')
    .replace(/According to Hindupedia,?\s*/gi,'')
    .replace(/According to Grokipedia,?\s*/gi,'')
    .replace(/Wikipedia (?:says|states|notes|describes|summarizes|lists)\s+/gi,'')
    .replace(/Hindupedia (?:says|states|notes|describes|summarizes|lists)\s+/gi,'')
    .replace(/Grokipedia (?:says|states|notes|describes|summarizes|lists)\s+/gi,'')
    .replace(/Hazra (?:says|states|notes|describes|summarizes|lists)\s+/gi,'')
    .replace(/Rocher (?:says|states|notes|describes|summarizes|lists)\s+/gi,'')
    .replace(/The (?:main |separate )?Wikipedia article (?:says|states|notes|describes|summarizes|lists)\s+/gi,'')
    .replace(/The (?:main |separate )?Hindupedia article (?:says|states|notes|describes|summarizes|lists)\s+/gi,'');

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
    if (i.kind === 'Vedāṅga') return `Vedāṅga:${i.name}`;
    if (i.kind === 'Veda' || ['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind)) return `Vedic:${i.name}`;
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind)) return `Purāṇa:${i.name}`;
    return `${i.kind}:${i.name}`;
  }

  function entryFor(i) {
    const D = window.SCRIPTURE_DETAIL_DATA || {};
    return Object.assign({}, D[i.name] || {}, D[keyFor(i)] || {});
  }

  function sourceObj(x) {
    if (!x) return null;
    if (typeof x === 'object') return {title:x.title || x.citation || x.text || x.claim || 'Source', detail:x.detail || x.note || '', url:x.url || x.href || ''};
    const s = String(x).trim();
    const m = s.match(/https?:\/\/\S+/);
    return {title:s.replace(/\s+https?:\/\/\S+.*/,'').trim() || s, detail:'', url:m ? m[0] : ''};
  }

  function sourcesFor(e,i) {
    const raw = [...arr(e.bibliography), ...arr(e.sources), ...arr(e.primarySources), i.source, ...i.maha, ...i.upa].filter(Boolean);
    const seen = new Set();
    return raw.map(sourceObj).filter(Boolean).filter(s=>{const k=(s.title+'|'+s.url).toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  }

  const cite = nums => nums.length ? nums.map(n=>`<sup class="universal-cite"><button type="button" data-universal-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('') : '';
  const picks = (sources, start=0, count=2) => {
    if (!sources.length) return [];
    const out=[];
    for(let j=0;j<Math.min(count,sources.length);j++) out.push(((start+j)%sources.length)+1);
    return [...new Set(out)];
  };

  function P(text, refs=[]) {
    if (!text) return '';
    return `<p>${cleanResearchVoice(esc(plain(text)))}${cite(refs)}</p>`;
  }

  function rawP(html, refs=[]) {
    if (!html) return '';
    return `<p>${cleanResearchVoice(html)}${cite(refs)}</p>`;
  }

  function divisionFromString(text, n, refs) {
    const s = plain(text).trim();
    const colon = s.indexOf(':');
    if (colon > 0 && colon < 90) {
      const title = s.slice(0,colon).trim();
      const rest = s.slice(colon+1).trim();
      return `<div class="universal-division"><h3>${esc(title)}</h3>${rest ? P(rest,refs) : ''}</div>`;
    }
    return `<div class="universal-division">${P(s,refs)}</div>`;
  }

  function booksHtml(items, sources, offset=0) {
    const xs = arr(items); if(!xs.length) return '';
    return `<div class="universal-books">${xs.map((b,n)=>{
      const refs=picks(sources,offset+n,2);
      if(typeof b==='string') return divisionFromString(b,n,refs);
      const num=b.number ?? n+1;
      const title=b.title || b.name || `Book ${num}`;
      const text=b.summary || b.text || b.description || '';
      return `<div class="universal-division"><h3>${esc(String(num))}. ${esc(title)}</h3>${text?P(text,refs):''}</div>`;
    }).join('')}</div>`;
  }

  function customSectionHtml(s, sources, idx) {
    if(!s) return '';
    const title=s.title || `Section ${idx+1}`;
    let body='';
    const paras=arr(s.paragraphs || s.text);
    paras.forEach((x,n)=> body += P(x,picks(sources,idx+n,2)));
    if(s.books) body += booksHtml(s.books,sources,idx);
    arr(s.subsections).forEach((sub,n)=>{
      body += `<h3>${esc(sub.title||'')}</h3>`;
      arr(sub.paragraphs || sub.text).forEach((x,k)=> body += P(x,picks(sources,idx+n+k,2)));
      if(sub.books) body += booksHtml(sub.books,sources,idx+n);
      arr(sub.bullets).forEach((x,k)=> body += P(x,picks(sources,idx+n+k,1)));
    });
    arr(s.bullets).forEach((x,n)=> body += P(x,picks(sources,idx+n,1)));
    if(s.note) body += `<div class="kena-note">${esc(plain(s.note))}</div>`;
    return body ? `<section class="kena-section" data-title="${esc(title)}"><h2>${esc(title)}</h2>${body}</section>` : '';
  }

  function compactDate(period) {
    const s=String(period||'').trim();
    if(!s) return '';
    const first=s.split(/;|\.(?=\s+[A-Z])/)[0].trim();
    return first.length>125 ? first.slice(0,122).trim()+'…' : first;
  }

  function leadParagraphs(i,e,sources) {
    const out=[];
    const supplied=arr(e.leadParagraphs);
    if(supplied.length) supplied.forEach((x,n)=>out.push(P(x,picks(sources,n,2))));
    else {
      if(e.overview || e.summary) out.push(P(e.overview || e.summary,picks(sources,0,2)));
      if(e.significance) out.push(P(e.significance,picks(sources,1,1)));
      if(!out.length) {
        let x=`${roman(i.name)} is a ${roman(i.kind)} represented in the traditional scripture index.`;
        if(i.veda) x+=` It is associated with the ${roman(i.veda)}.`;
        if(i.branch) x+=` The indexed recension or school is ${roman(i.branch)}.`;
        out.push(P(x,picks(sources,0,1)));
      }
    }
    return out.join('');
  }

  function infobox(i,e,sources) {
    const rows=[];
    rows.push(['Type',roman(i.kind)]);
    if(e.traditionalAuthor) rows.push(['Author',roman(e.traditionalAuthor).replace(/\s*\(traditional attribution\)/gi,'')]);
    if(e.language) rows.push(['Language',roman(e.language)]);
    if(i.veda) rows.push(['Veda',roman(i.veda)]);
    if(i.branch) rows.push(['School / recension',roman(i.branch)]);
    if(i.type) rows.push(['Traditional group',roman(i.type)]);
    if(i.sect) rows.push(['Sectarian grouping',roman(i.sect)]);
    if(e.extent) rows.push(['Extent',roman(e.extent)]);
    if(e.booksCount) rows.push(['Divisions',roman(e.booksCount)]);
    if(e.verseCount) rows.push(['Verse count',roman(e.verseCount)]);
    if(e.period) rows.push(['Date',roman(compactDate(e.period))]);
    if(e.primaryRecensions) rows.push(['Recensions',roman(arr(e.primaryRecensions).join('; '))]);
    if(i.maha.length) rows.push(['Mahapurana witnesses',String(i.maha.length)]);
    if(i.upa.length) rows.push(['Upapurana witnesses',String(i.upa.length)]);
    if(sources.length) rows.push(['Sources',String(sources.length)]);
    const dev=e.sanskritTitle ? `<div class="universal-devanagari">${esc(String(e.sanskritTitle).split('/')[0].trim())}</div>` : '';
    const image=e.imageUrl || e.image || e.artworkUrl || '';
    const caption=e.imageCaption || e.artworkCaption || '';
    const fig=image ? `<figure class="universal-infobox-image"><img src="${esc(image)}" loading="lazy" alt=""><figcaption>${esc(caption)}</figcaption></figure>` : '';
    return `<aside class="kena-infobox universal-infobox"><div class="kena-infobox-title">${esc(roman(i.name))}</div>${dev}${fig}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function buildArticle(i,e) {
    const sources=sourcesFor(e,i);
    const custom=arr(e.articleSections);
    const take=(re)=>custom.filter(s=>re.test(String(s?.title||'')));
    const dateCustom=take(/date|composition|textual history|formation/i);
    const transCustom=take(/manuscript|recension|transmission|critical edition|text and transmission/i);
    const structureCustom=take(/contents|structure|skandha|aṃśa|amsa|kanda|parva|book|chapter|division/i);
    const consumed=new Set([...dateCustom,...transCustom,...structureCustom]);
    const otherCustom=custom.filter(s=>!consumed.has(s));
    const sections=[];

    let date='';
    if(e.period) date += `<h3>Date</h3>${P(e.period,picks(sources,0,2))}`;
    if(e.milieu) date += `<h3>Historical setting</h3>${P(e.milieu,picks(sources,1,2))}`;
    if(e.history) date += `<h3>Composition and development</h3>${P(e.history,picks(sources,0,2))}`;
    if(e.datingBasis) date += `<h3>Basis for the chronology</h3>${P(e.datingBasis,picks(sources,1,2))}`;
    dateCustom.forEach((s,n)=>{
      arr(s.paragraphs || s.text).forEach((x,k)=> date += P(x,picks(sources,n+k,2)));
      if(s.subsections) arr(s.subsections).forEach((sub,k)=>{date += `<h3>${esc(sub.title||'')}</h3>`;arr(sub.paragraphs||sub.text).forEach((x,j)=>date += P(x,picks(sources,k+j,2)));});
    });
    if(date) sections.push({id:'universal-date',title:'Date and composition',html:`<section class="kena-section" id="universal-date"><h2>Date and composition</h2>${date}</section>`});

    let trans='';
    if(i.branch) trans += P(`The ${roman(i.branch)} label identifies the school or recension represented by this entry.`,picks(sources,0,1));
    if(e.manuscripts) trans += `<h3>Manuscripts and recensions</h3>${P(e.manuscripts,picks(sources,0,2))}`;
    if(e.primaryRecensions) trans += `<h3>Major recensions</h3>${P(arr(e.primaryRecensions).join('; ')+'.',picks(sources,0,2))}`;
    arr(e.dependencies).forEach((x,n)=>{ if(n===0) trans += `<h3>Related texts and parallels</h3>`; trans += P(x,picks(sources,n,1)); });
    if(e.status) trans += `<h3>State of the text</h3>${P(e.status,picks(sources,0,2))}`;
    if(i.maha.length || i.upa.length || i.source) {
      trans += `<h3>Traditional catalogue evidence</h3>`;
      if(i.source) trans += P(i.source,picks(sources,Math.max(0,sources.length-1),1));
      if(i.maha.length) trans += P(`Mahapurana witnesses include ${i.maha.map(roman).join('; ')}.`,picks(sources,Math.max(0,sources.length-i.maha.length),1));
      if(i.upa.length) trans += P(`Upapurana witnesses include ${i.upa.map(roman).join('; ')}.`,picks(sources,Math.max(0,sources.length-i.upa.length),1));
    }
    transCustom.forEach((s,n)=>{
      arr(s.paragraphs || s.text).forEach((x,k)=>trans += P(x,picks(sources,n+k,2)));
      if(s.books) trans += booksHtml(s.books,sources,n);
      arr(s.subsections).forEach((sub,k)=>{trans += `<h3>${esc(sub.title||'')}</h3>`;arr(sub.paragraphs||sub.text).forEach((x,j)=>trans += P(x,picks(sources,k+j,2)));});
    });
    if(trans) sections.push({id:'universal-transmission',title:'Manuscripts and transmission',html:`<section class="kena-section" id="universal-transmission"><h2>Manuscripts and transmission</h2>${trans}</section>`});

    let structure='';
    if(e.structure) structure += P(e.structure,picks(sources,0,2));
    const maps=uniq([...arr(e.chapterMap),...arr(e.contents),...arr(e.keyContents)]);
    if(maps.length) structure += `<div class="universal-books">${maps.map((x,n)=>divisionFromString(x,n,picks(sources,n,2))).join('')}</div>`;
    const features=uniq([...arr(e.namedFeatures),...arr(e.primaryEvidence),...arr(e.primaryPassages)]);
    if(features.length){structure += `<h3>Important passages, episodes and rites</h3>`;features.forEach((x,n)=>structure += P(x,picks(sources,n,1)));}
    structureCustom.forEach((s,n)=>{
      arr(s.paragraphs || s.text).forEach((x,k)=>structure += P(x,picks(sources,n+k,2)));
      if(s.books) structure += booksHtml(s.books,sources,n);
      arr(s.subsections).forEach((sub,k)=>{structure += `<h3>${esc(sub.title||'')}</h3>`;arr(sub.paragraphs||sub.text).forEach((x,j)=>structure += P(x,picks(sources,k+j,2)));if(sub.books)structure += booksHtml(sub.books,sources,k);});
    });
    if(structure) sections.push({id:'universal-contents',title:'Structure and contents',html:`<section class="kena-section" id="universal-contents"><h2>Structure and contents</h2>${structure}</section>`});

    otherCustom.forEach((s,n)=>{
      const id=`universal-${slug(s.title)||'section-'+n}`;
      const html=customSectionHtml(s,sources,n+2).replace('<section class="kena-section"',`<section class="kena-section" id="${id}"`);
      if(html) sections.push({id,title:s.title||`Section ${n+1}`,html});
    });

    let thought='';
    if(e.profile) thought += P(e.profile,picks(sources,0,2));
    arr(e.themes).forEach((x,n)=> thought += P(x,picks(sources,n,1)));
    if(e.ritualHistory) thought += `<h3>Ritual and social setting</h3>${P(e.ritualHistory,picks(sources,1,2))}`;
    if(thought && !otherCustom.some(s=>/theology|teaching|philosoph|religion|bhakti|ritual|doctrine/i.test(String(s?.title||'')))) sections.push({id:'universal-teaching',title:'Teachings and religious setting',html:`<section class="kena-section" id="universal-teaching"><h2>Teachings and religious setting</h2>${thought}</section>`});

    let rec='';
    if(e.reception) rec += P(e.reception,picks(sources,1,2));
    if(e.significance && !arr(e.leadParagraphs).length) rec += P(e.significance,picks(sources,1,1));
    arr(e.scholarlyDebates).forEach((x,n)=>{if(n===0)rec += `<h3>Textual and historical questions</h3>`;rec += P(x,picks(sources,n,2));});
    if(e.hazraNotes) rec += P(e.hazraNotes,picks(sources,0,2));
    if(rec && !otherCustom.some(s=>/reception|commentar|scholar/i.test(String(s?.title||'')))) sections.push({id:'universal-reception',title:'Commentary and reception',html:`<section class="kena-section" id="universal-reception"><h2>Commentary and reception</h2>${rec}</section>`});

    if(sources.length) {
      sections.push({id:'universal-references',title:'References',html:`<section class="kena-section kena-references universal-references" id="universal-references"><h2>References</h2><ol>${sources.map((s,n)=>`<li id="universal-ref-${n+1}"><b>${n+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`});
    }

    const toc=sections.map(s=>`<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('');
    return `<article class="scripture-wiki-article universal-wiki-article" data-universal-name="${esc(i.name)}">${infobox(i,e,sources)}<div class="kena-lead">${leadParagraphs(i,e,sources)}</div>${toc?`<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>`:''}${sections.map(s=>s.html).join('')}</article>`;
  }

  let shade=null, reader=null, currentSources=[];
  function close(){shade?.remove();reader?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}

  function normalizeVisible(container){
    const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{const p=node.parentElement;if(!p||p.closest('.universal-source-card,[lang="sa-Deva"],.universal-devanagari'))return;node.nodeValue=roman(node.nodeValue);});
  }

  function openUniversal(button){
    const i=infoFor(button);
    if(!ALLOWED.has(i.kind)) return typeof previousOpen==='function' ? previousOpen(button) : false;
    if(i.kind==='Upaniṣad' && i.name==='Kena') return typeof previousOpen==='function' ? previousOpen(button) : false;
    close();
    button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    const e=entryFor(i); currentSources=sourcesFor(e,i);
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop universal-wiki-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader universal-wiki-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${roman(i.name)} encyclopedia article`);
    const dev=e.sanskritTitle ? `<div class="universal-title-dev">${esc(String(e.sanskritTitle).split('/')[0].trim())}</div>` : '';
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Scripture encyclopedia</span><h1>${esc(roman(i.name))}</h1>${dev}</div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${buildArticle(i,e)}</div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');normalizeVisible(reader);reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }

  function showSource(n){
    const s=currentSources[n-1];if(!s)return;
    document.querySelector('.universal-source-card')?.remove();
    const card=document.createElement('aside');card.className='itihasa-source-card universal-source-card';
    card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.title)}</strong>${s.detail?`<p>${esc(s.detail)}</p>`:''}${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;
    document.body.append(card);card.querySelector('.itihasa-source-close')?.addEventListener('click',()=>card.remove());
  }

  document.addEventListener('click',e=>{const b=e.target.closest?.('.universal-cite button');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.universalNote));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.universal-wiki-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('universal-wiki-v1-style')){
    const s=document.createElement('style');s.id='universal-wiki-v1-style';s.textContent=`
      .universal-wiki-reader{max-width:1160px!important;background:#f7f4ee!important}
      .universal-wiki-reader .kena-article-head{background:#fbfaf7!important;border-bottom:1px solid rgba(74,66,56,.16)!important;padding-bottom:17px!important}
      .universal-wiki-reader .kena-article-head h1{margin:0 0 2px!important;color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:40px!important;font-weight:400!important;line-height:1.08!important}
      .universal-title-dev,.universal-devanagari{color:#746b61;font-family:'Noto Serif Devanagari','Nirmala UI',serif;font-size:17px;line-height:1.3;margin:1px 0 4px}
      .universal-wiki-reader .kena-article-head .eyebrow{color:#7a7168!important;font-family:Merriweather,Georgia,serif!important;font-size:11px!important;letter-spacing:.08em!important}
      .universal-wiki-reader .kena-article-scroll{background:#fbfaf7!important}
      .universal-wiki-article{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important}
      .universal-wiki-article p,.universal-wiki-article li,.universal-wiki-article dd,.universal-wiki-article dt{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:16.1px!important;line-height:1.66!important;font-weight:400!important}
      .universal-wiki-article p{margin:0 0 17px!important}.universal-wiki-article .kena-lead p{font-size:16.5px!important;line-height:1.68!important}
      .universal-wiki-article .kena-section{margin-top:28px!important}.universal-wiki-article .kena-section h2{margin:30px 0 15px!important;padding:0 0 6px!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:28px!important;font-weight:400!important;line-height:1.18!important;border-bottom:1px solid rgba(0,120,122,.32)!important}
      .universal-wiki-article .kena-section h3{margin:22px 0 9px!important;color:#4a433b!important;font-family:Vollkorn,Georgia,serif!important;font-size:21px!important;font-weight:500!important;line-height:1.24!important}
      .universal-wiki-article a,.universal-wiki-article .kena-toc a{color:#5b3ec4!important;text-decoration:none!important}.universal-wiki-article a:hover{text-decoration:underline!important}
      .universal-cite{vertical-align:super}.universal-cite button{border:0;background:transparent;color:#5b3ec4;padding:0 1px;font:600 10px/1 Merriweather,Georgia,serif;cursor:pointer}
      .universal-wiki-article .kena-toc{background:#f5f1ea!important;color:#3c362e!important;border:1px solid rgba(92,82,70,.24)!important;font-family:Merriweather,Georgia,serif!important}.universal-wiki-article .kena-toc-title{color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:20px!important;font-weight:400!important}
      .universal-infobox{width:318px!important;background:#f4f1eb!important;color:#3c362e!important;border:1px solid rgba(92,82,70,.30)!important;font-family:Merriweather,Georgia,serif!important}.universal-infobox .kena-infobox-title{background:rgba(0,111,113,.075)!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:22px!important;font-weight:500!important}.universal-infobox .kena-info-row,.universal-infobox .kena-info-row b,.universal-infobox .kena-info-row span{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:12.5px!important;line-height:1.42!important}
      .universal-infobox-image{margin:5px 0 7px;padding:3px;border:1px solid rgba(92,82,70,.20);background:#fbfaf7}.universal-infobox-image img{display:block;width:100%;height:auto}.universal-infobox-image figcaption{padding:5px;color:#746b61;font:12px/1.4 Merriweather,Georgia,serif}
      .universal-division{margin:0 0 18px}.universal-division h3{margin-bottom:6px!important}.universal-division p{margin-bottom:8px!important}
      .universal-references ol{padding-left:1.25em!important}.universal-references li{margin:0 0 11px!important;font-size:14px!important;line-height:1.55!important;color:#5f574e!important}
      .universal-source-card{font-family:Merriweather,Georgia,serif!important;color:#3c362e!important}.universal-source-card a{color:#5b3ec4!important}
      @media(max-width:760px){.universal-infobox{width:100%!important;float:none!important;margin:0 0 18px!important}.universal-wiki-reader .kena-article-head h1{font-size:34px!important}.universal-wiki-article p,.universal-wiki-article li{font-size:15.8px!important;line-height:1.65!important}.universal-wiki-article .kena-section h2{font-size:26px!important}.universal-wiki-article .kena-section h3{font-size:20px!important}}
    `;document.head.append(s);
  }

  window.openScriptureEncyclopedia=function(button){
    const i=infoFor(button);
    if(i.kind==='Itihāsa') return typeof previousOpen==='function' ? previousOpen(button) : false;
    return openUniversal(button);
  };
  window.SCRIPTURE_UNIVERSAL_WIKI_V1=true;
})();