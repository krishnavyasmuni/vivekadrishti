(() => {
  const previousOpen = window.openScriptureEncyclopedia;
  if (typeof previousOpen !== 'function') return;

  const D = window.SCRIPTURE_DETAIL_DATA || {};
  const PURANA_KINDS = new Set(['Mahāpurāṇa','Upapurāṇa','Both']);

  const HAZRA_RITES_URL = 'https://www.griet.ac.in/images/rare/Studies%20in%20the%20Puranic%20Records%20on%20Hindu%20Rites%20and%20Customs.pdf';
  const HAZRA_UPA_URL = 'https://www.wisdomlib.org/hinduism/book/studies-in-the-upapuranas';
  const HINDU_MAHA_URL = 'https://hindupedia.com/en/Pur%C4%81%E1%B9%87as';
  const HINDU_UPA_URL = 'https://hindupedia.com/en/Upapur%C4%81%E1%B9%87as';
  const ROCHER_URL = 'https://books.google.com/books?id=n0-4RJh5FgoC';
  const GENERIC_IMG = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/A_monk_meditates_under_a_tree.jpg';

  const WIKI = {
    'Brahma Purāṇa':'Brahma_Purana','Padma Purāṇa':'Padma_Purana','Viṣṇu Purāṇa':'Vishnu_Purana','Śiva Purāṇa':'Shiva_Purana',
    'Liṅga Purāṇa':'Linga_Purana','Garuḍa Purāṇa':'Garuda_Purana','Nāradīya Purāṇa':'Naradiya_Purana','Bhāgavata Purāṇa':'Bhagavata_Purana',
    'Agni Purāṇa':'Agni_Purana','Skanda Purāṇa':'Skanda_Purana','Bhaviṣya Purāṇa':'Bhavishya_Purana','Brahmavaivarta Purāṇa':'Brahma_Vaivarta_Purana',
    'Mārkaṇḍeya Purāṇa':'Markandeya_Purana','Vāmana Purāṇa':'Vamana_Purana','Varāha Purāṇa':'Varaha_Purana','Matsya Purāṇa':'Matsya_Purana',
    'Kūrma Purāṇa':'Kurma_Purana','Brahmāṇḍa Purāṇa':'Brahmanda_Purana','Vāyu Purāṇa':'Vayu_Purana','Devī Bhāgavata Purāṇa':'Devi_Bhagavata_Purana',
    'Mahābhāgavata Purāṇa':'Mahabhagavata_Purana','Nṛsiṃha Purāṇa':'Narasimha_Purana','Kālikā Purāṇa':'Kalika_Purana','Sāmba Purāṇa':'Samba_Purana',
    'Saura Purāṇa':'Saura_Purana','Viṣṇudharmottara Purāṇa':'Vishnudharmottara_Purana','Bṛhaddharma Purāṇa':'Brihaddharma_Purana'
  };

  const HINDU_SPECIFIC = {
    'Ādi Purāṇa':'https://hindupedia.com/en/%C4%80dipur%C4%81na',
    'Āditya Purāṇa':'https://hindupedia.com/en/%C4%80dityapur%C4%81%E1%B9%87a'
  };

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const plain = x => typeof x === 'string' ? x : (x?.text || x?.claim || x?.summary || x?.full || x?.short || x?.title || '');
  const uniq = xs => { const seen = new Set(); return xs.map(plain).map(x => String(x||'').trim()).filter(x => { const k=x.toLowerCase().replace(/\s+/g,' '); if(!k||seen.has(k))return false;seen.add(k);return true; }); };
  const slug = s => String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  function entryFor(name) { return Object.assign({}, D[name] || {}, D[`Purāṇa:${name}`] || {}); }
  function sourceObj(x) {
    if (!x) return null;
    if (typeof x === 'string') {
      const m = x.match(/https?:\/\/\S+/);
      return {title:x.replace(/\s+https?:\/\/\S+.*/,'').trim() || x, detail:'', url:m?m[0]:''};
    }
    return {title:x.title || x.citation || x.text || x.claim || 'Source', detail:x.detail || x.note || '', url:x.url || x.href || ''};
  }
  function wikiUrl(name) {
    const p = WIKI[name];
    return p ? `https://en.wikipedia.org/wiki/${p}` : `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(name)}`;
  }
  function sourcesFor(name, kind, e) {
    const out = [];
    out.push({key:'hazra-rites',title:'R. C. Hazra — Studies in the Purāṇic Records on Hindu Rites and Customs',detail:'Chronology of Purāṇic chapters; rites, customs, social history and the absorption of Tantric material.',url:HAZRA_RITES_URL});
    if (kind !== 'Mahāpurāṇa') out.push({key:'hazra-upa',title:'R. C. Hazra — Studies in the Upapurāṇas',detail:'Textual identity, chronology, sectarian history, ritual and manuscript evidence for Upapurāṇas.',url:HAZRA_UPA_URL});
    out.push({key:'wiki',title:`Wikipedia — ${name}`,detail:'Article-specific cross-check for structure, manuscript history, dating, contents and reception.',url:wikiUrl(name)});
    out.push({key:'hindupedia',title:`Hindupedia — ${name}`,detail:'Traditional encyclopedia cross-check for contents, classification, ritual and received tradition.',url:HINDU_SPECIFIC[name] || (kind === 'Mahāpurāṇa' ? HINDU_MAHA_URL : HINDU_UPA_URL)});
    out.push({key:'grok',title:`Grokipedia search — ${name}`,detail:'Additional encyclopedia lead; claims are retained only when corroborated by stronger textual or scholarly sources.',url:`https://grokipedia.com/search?q=${encodeURIComponent(name)}`});
    out.push({key:'rocher',title:'Ludo Rocher — The Purāṇas',detail:'Modern survey of Purāṇa textual history, classification, recensions and scholarship.',url:ROCHER_URL});
    [...arr(e.sources),...arr(e.bibliography),...arr(e.primarySources),...arr(e.references)].map(sourceObj).filter(Boolean).forEach(s=>out.push(s));
    const seen=new Set();
    return out.filter(s=>{const k=(s.title+'|'+s.url).toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  }

  function sourceIndex(sources,key){const i=sources.findIndex(s=>s.key===key);return i>=0?i+1:0;}
  function citeLink(n,sources){if(!n)return'';const s=sources[n-1];if(!s)return'';return `<sup class="purana-source-cite"><a href="${esc(s.url||`#purana-ref-${n}`)}"${s.url?' target="_blank" rel="noopener"':''} title="${esc(s.title)}">[${n}]</a></sup>`;}
  function p(text,cite=''){ if(!text)return''; return `<p>${esc(plain(text))}${cite}</p>`; }

  function sectionSources(title,sources,kind){
    const t=String(title||'').toLowerCase();
    if(/ritual|dharma|social|custom|vrata|gift|dāna|sraddha|śrāddha|tantr/.test(t)) return [sourceIndex(sources,'hazra-rites')];
    if(/upapur|catalog|classification|identity|lost|attestation/.test(t) && kind!=='Mahāpurāṇa') return [sourceIndex(sources,'hazra-upa')];
    if(/date|chronolog|formation|manuscript|recension|edition|transmission/.test(t)) return [sourceIndex(sources,kind==='Mahāpurāṇa'?'hazra-rites':'hazra-upa'),sourceIndex(sources,'rocher')].filter(Boolean).slice(0,2);
    if(/contents|structure|book|skandha|khanda|khaṇḍa|chapter|narrative|episode/.test(t)) return [sourceIndex(sources,'wiki'),sourceIndex(sources,'hindupedia')].filter(Boolean).slice(0,2);
    if(/theolog|bhakti|shaiva|śaiva|vaish|vaiṣ|shakta|śākta|religious|doctrine|philosoph/.test(t)) return [sourceIndex(sources,'wiki'),sourceIndex(sources,'hindupedia')].filter(Boolean).slice(0,2);
    if(/reception|influence|commentar|scholar/.test(t)) return [sourceIndex(sources,'wiki'),sourceIndex(sources,'rocher')].filter(Boolean).slice(0,2);
    return [sourceIndex(sources,'wiki')].filter(Boolean);
  }

  function renderParagraphs(items, refs, sources) {
    const xs = uniq(arr(items));
    return xs.map((x,i)=>p(x,i===0 ? refs.map(n=>citeLink(n,sources)).join('') : '')).join('');
  }
  function renderBooks(books,refs,sources){
    const xs=arr(books); if(!xs.length)return'';
    return `<div class="purana-books">${xs.map((b,i)=>{
      if(typeof b==='string') return `<div class="purana-book">${p(b,i===0?refs.map(n=>citeLink(n,sources)).join(''):'')}</div>`;
      const title=b.title||b.name||`Book ${b.number||i+1}`;
      const num=b.number ? `${b.number}. ` : '';
      return `<div class="purana-book"><h3>${esc(num+title)}</h3>${renderParagraphs([b.summary,b.text,b.description,b.note],i===0?refs:[],sources)}</div>`;
    }).join('')}</div>`;
  }
  function renderCustomSection(s, idx, sources, kind) {
    const title=s?.title || `Section ${idx+1}`;
    const refs=sectionSources(title,sources,kind);
    let body=renderParagraphs(s?.paragraphs || s?.text,refs,sources);
    body+=renderBooks(s?.books,refs,sources);
    arr(s?.subsections).forEach((sub,j)=>{
      const st=sub.title||`Subsection ${j+1}`;
      body+=`<h3>${esc(st)}</h3>${renderParagraphs(sub.paragraphs||sub.text,j===0?refs:[],sources)}${renderBooks(sub.books,refs,sources)}`;
      const bullets=uniq(arr(sub.bullets)); if(bullets.length) body+=`<ul>${bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    });
    const bullets=uniq(arr(s?.bullets)); if(bullets.length) body+=`<ul>${bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    if(s?.note)body+=`<div class="kena-note">${esc(plain(s.note))}</div>`;
    if(!body)return null;
    return {id:`pur-${slug(title)}-${idx}`,title,html:`<section class="kena-section ch-section purana-full-section" id="pur-${slug(title)}-${idx}"><h2>${esc(title)}</h2>${body}</section>`};
  }

  function automaticSections(name,kind,e,sources,customTitles){
    const secs=[];
    const has = re => customTitles.some(t=>re.test(t));
    const mk=(title,paras,subs=[])=>{
      const refs=sectionSources(title,sources,kind); const ps=uniq(paras); const goodSubs=subs.filter(x=>x&&x.title&&uniq(x.paragraphs||[]).length);
      if(!ps.length&&!goodSubs.length)return;
      let body=renderParagraphs(ps,refs,sources);
      goodSubs.forEach((s,j)=>{body+=`<h3>${esc(s.title)}</h3>${renderParagraphs(s.paragraphs,j===0?refs:[],sources)}`;});
      secs.push({id:`pur-auto-${slug(title)}`,title,html:`<section class="kena-section ch-section purana-full-section" id="pur-auto-${slug(title)}"><h2>${esc(title)}</h2>${body}</section>`});
    };

    if(!has(/date|chronolog|formation|textual history/i)) mk('Date, composition and textual formation',[e.period,e.milieu,e.history,e.datingBasis,e.status]);
    if(!has(/manuscript|recension|edition|transmission/i)) mk('Manuscripts, recensions and editions',[e.manuscripts, arr(e.primaryRecensions).length?`Major recensions or textual organizations: ${arr(e.primaryRecensions).map(plain).join('; ')}.`:'',...arr(e.dependencies).map(plain)]);
    if(!has(/structure|contents|skandha|khaṇḍa|khanda|book|chapter/i)) mk('Structure and complete contents',[e.extent,e.structure,e.booksCount?`Major divisions: ${e.booksCount}.`:'',e.verseCount?`Verse count or traditional extent: ${e.verseCount}.`:'',...arr(e.chapterMap),...arr(e.contents),...arr(e.keyContents),...arr(e.namedFeatures)]);
    if(!has(/ritual|dharma|social|custom|vrata|pilgrimage|sacred geography/i)) mk('Ritual, dharma, sacred geography and social world',[e.ritualHistory,...arr(e.rituals),...arr(e.sacredGeography),...arr(e.pilgrimage),...arr(e.dharma),...arr(e.socialHistory)]);
    if(!has(/theolog|teaching|philosoph|bhakti|religious|doctrine/i)) mk('Theology, philosophy and religious profile',[e.profile,...arr(e.themes),...arr(e.teachings)]);
    if(!has(/commentar|reception|influence|scholar/i)) mk('Commentaries, reception and scholarship',[e.reception,e.significance,e.hazraNotes,...arr(e.scholarlyDebates)]);
    mk('Canonical classification and catalogue evidence',[kind==='Mahāpurāṇa'?`${name} is presented here under the Mahāpurāṇa witnesses preserved by the index.`:`${name} is presented here under Upapurāṇa or overlapping Purāṇa catalogue witnesses; the lists of eighteen Upapurāṇas vary substantially across Sanskrit sources.`,kind==='Both'?`${name} occurs in both Mahāpurāṇa and Upapurāṇa witness sets in this index, so classification must be cited from the particular Sanskrit catalogue rather than treated as universally fixed.`:'']);
    return secs;
  }

  function lead(name,e,sources,kind){
    const supplied=uniq(arr(e.leadParagraphs));
    const ps=supplied.length?supplied:uniq([e.overview,e.summary,e.significance,e.profile]);
    const refs=[sourceIndex(sources,'wiki'),sourceIndex(sources,kind==='Mahāpurāṇa'?'hazra-rites':'hazra-upa')].filter(Boolean).slice(0,2);
    return (ps.length?ps:[`${name} is a Purāṇa represented in the traditional scripture index. This article distinguishes the received text, its historical layers, its ritual and theological profile, and the catalogue tradition under which the title is classified.`]).map((x,i)=>p(x,i===0?refs.map(n=>citeLink(n,sources)).join(''):'')).join('');
  }

  function infobox(name,kind,e,button){
    const rows=[];
    if(e.period)rows.push(['Date',e.period]);
    rows.push(['Classification',kind]);
    if(button?.dataset?.sect)rows.push(['Sectarian profile',button.dataset.sect]);
    if(e.traditionalAuthor)rows.push(['Traditional attribution',String(e.traditionalAuthor).replace(/\s*\(traditional attribution\)/gi,'')]);
    if(e.language)rows.push(['Language',e.language]);
    if(e.extent)rows.push(['Extent',e.extent]);
    if(e.booksCount)rows.push(['Major divisions',e.booksCount]);
    if(e.verseCount)rows.push(['Verse count',e.verseCount]);
    if(arr(e.primaryRecensions).length)rows.push(['Recensions',arr(e.primaryRecensions).map(plain).join('; ')]);
    if(button?.dataset?.maha)rows.push(['Mahāpurāṇa witnesses',button.dataset.maha.split(' · ').join('; ')]);
    if(button?.dataset?.upa)rows.push(['Upapurāṇa witnesses',button.dataset.upa.split(' · ').join('; ')]);
    const dev=e.sanskritTitle?`<div class="universal-devanagari">${esc(String(e.sanskritTitle).split('/')[0].trim())}</div>`:'';
    return `<aside class="kena-infobox universal-infobox purana-full-infobox"><div class="kena-infobox-title">${esc(name)}</div>${dev}<figure class="universal-infobox-image purana-wiki-image"><img src="${esc(GENERIC_IMG)}" alt="" loading="lazy"><figcaption></figcaption></figure>${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function toc(sections){return sections.map(s=>`<li><a href="#${esc(s.id)}">${esc(s.title)}</a></li>`).join('');}
  function refsHtml(sources){return `<section class="kena-section ch-section kena-references universal-references" id="purana-references"><h2>References</h2><ol>${sources.map((s,i)=>`<li id="purana-ref-${i+1}"><b>${i+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;}

  let shade=null, reader=null;
  function close(){shade?.remove();reader?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');document.querySelectorAll('#scripture-browser .shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}

  async function setWikiImage(name,figure){
    if(!figure)return;
    const img=figure.querySelector('img'), cap=figure.querySelector('figcaption');
    const page=WIKI[name]; if(!page){cap.remove();return;}
    try{
      const api=`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|info&inprop=url&pithumbsize=700&titles=${encodeURIComponent(page.replace(/_/g,' '))}`;
      const r=await fetch(api,{mode:'cors'}); if(!r.ok)throw new Error('wiki'); const j=await r.json(); const p=Object.values(j?.query?.pages||{})[0];
      if(p?.thumbnail?.source){img.src=p.thumbnail.source;cap.textContent=`Image from the Wikipedia article on ${name}.`;}
      else cap.remove();
    }catch(_){cap.remove();}
    img.onerror=()=>{img.onerror=null;img.src=GENERIC_IMG;cap?.remove();};
  }

  function openPurana(button,name,kind){
    close();
    const e=entryFor(name), sources=sourcesFor(name,kind,e);
    const custom=arr(e.articleSections);
    const customTitles=custom.map(s=>String(s?.title||''));
    const sections=[];
    automaticSections(name,kind,e,sources,customTitles).forEach(s=>sections.push(s));
    custom.forEach((s,i)=>{const x=renderCustomSection(s,i,sources,kind);if(x)sections.push(x);});
    const seen=new Set();
    const ordered=sections.filter(s=>{const k=s.title.toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
    const refs=refsHtml(sources);
    button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop universal-wiki-backdrop purana-full-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader universal-wiki-reader purana-full-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${name} article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Purāṇa encyclopedia</span><h1>${esc(name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article universal-wiki-article purana-full-article">${infobox(name,kind,e,button)}<div class="kena-lead ch-lead">${lead(name,e,sources,kind)}</div><nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc(ordered)}<li><a href="#purana-references">References</a></li></ol></nav>${ordered.map(s=>s.html).join('')}${refs}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.addEventListener('click',close);shade.addEventListener('click',close);
    const fig=reader.querySelector('.purana-wiki-image'); setWikiImage(name,fig);
    reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
    return true;
  }

  window.openScriptureEncyclopedia=function(button){
    const kind=button?.dataset?.kind||'';
    if(!PURANA_KINDS.has(kind))return previousOpen(button);
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';
    return openPurana(button,name,kind);
  };
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('purana-full-reader-style')){
    const style=document.createElement('style');style.id='purana-full-reader-style';style.textContent=`
      .purana-full-article{max-width:1120px;margin:0 auto;font-family:Merriweather,Georgia,serif;color:#202122;font-size:16px;line-height:1.72}
      .purana-full-article .purana-books{margin:10px 0 18px}
      .purana-full-article .purana-book{margin:0 0 18px}
      .purana-full-article .purana-book h3{margin:17px 0 6px;font:600 21px/1.25 Vollkorn,Georgia,serif;color:#202122}
      .purana-source-cite{vertical-align:super;margin-left:2px}.purana-source-cite a{font:12px/1 Arial,sans-serif;color:#36c;text-decoration:none}.purana-source-cite a:hover{text-decoration:underline}
      .purana-full-infobox .universal-infobox-image img{width:100%;height:auto;display:block;max-height:420px;object-fit:contain;background:#fff}
      .purana-full-infobox .universal-infobox-image figcaption:empty{display:none}
      .purana-full-section ul{margin:0 0 16px 28px}.purana-full-section li{margin:0 0 7px}
    `;document.head.append(style);
  }
})();
