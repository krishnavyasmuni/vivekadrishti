(()=>{
  const root=document.getElementById('mahapurana-standalone');
  if(!root)return;

  const ROUTES={'brahma-purana':'Brahma Purāṇa','padma-purana':'Padma Purāṇa','vishnu-purana':'Viṣṇu Purāṇa','shiva-purana':'Śiva Purāṇa','linga-purana':'Liṅga Purāṇa','garuda-purana':'Garuḍa Purāṇa','naradiya-purana':'Nāradīya Purāṇa','bhagavata-purana':'Bhāgavata Purāṇa','agni-purana':'Agni Purāṇa','skanda-purana':'Skanda Purāṇa','bhavishya-purana':'Bhaviṣya Purāṇa','brahmavaivarta-purana':'Brahmavaivarta Purāṇa','markandeya-purana':'Mārkaṇḍeya Purāṇa','vamana-purana':'Vāmana Purāṇa','varaha-purana':'Varāha Purāṇa','matsya-purana':'Matsya Purāṇa','kurma-purana':'Kūrma Purāṇa','brahmanda-purana':'Brahmāṇḍa Purāṇa','vayu-purana':'Vāyu Purāṇa','devi-bhagavata-purana':'Devī Bhāgavata Purāṇa','mahabhagavata-purana':'Mahābhāgavata Purāṇa'};
  const routeSlug=location.pathname.split('/').filter(Boolean).pop()||'';
  const name=root.dataset.purana||ROUTES[routeSlug]||'';
  const TITLES=['Date of composition','Structure','Contents','Theology','Critical edition','Influences and reception','Rites, dharma and social history','Further reading','References'];
  const KEYS=['date','structure','contents','theology','critical','reception','social','further'];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||x?.summary||x?.description||x?.note||x?.title||x?.citation||x?.name||'');
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const uniq=xs=>{const seen=new Set();return xs.flatMap(arr).map(plain).map(x=>String(x||'').trim()).filter(x=>{const k=norm(x);if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Failed to load '+src));document.head.appendChild(s)});
  const wanted=src=>{
    if(src.includes('/assets/js/puranas/current/'))return !/(?:reader|polish|ui|images|standalone)\.js(?:\?|$)/.test(src);
    return ['scripture-index-v3-details-puranas','scripture-index-v3-deep-purana-history','scripture-index-v3-deep-final-fixes','scripture-index-v3-details-overrides','scripture-index-v3-scholarly-puranas','scripture-index-v3-wiki-rich-puranas-major','scripture-index-v3-deep-purana-v10','scripture-index-v3-deep-purana-specials','scripture-index-v3-research-puranas-hazra','scripture-index-v3-research-purana-extra'].some(x=>src.includes(x));
  };
  const classify=title=>{
    const t=norm(title);
    if(/date|chronolog|formation|provenance|composition/.test(t))return'date';
    if(/structure|book|skandha|khanda|samhita|chapter|division|organization/.test(t))return'structure';
    if(/manuscript|critical|edition|recension|textual|transmission|variant/.test(t))return'critical';
    if(/theolog|philosoph|bhakti|jnana|yoga|vedanta|doctrine|supreme/.test(t))return'theology';
    if(/influence|reception|commentar|legacy|scholar|later use/.test(t))return'reception';
    if(/rite|ritual|dharma|social|custom|pilgrim|tirtha|vrata|temple|gift|funeral|shraddha|worship|festival/.test(t))return'social';
    if(/further|reading|bibliograph/.test(t))return'further';
    return'contents';
  };
  const sourceObj=s=>{
    if(!s)return null;
    if(typeof s==='string')return{title:s,detail:'',url:''};
    return{title:s.title||s.citation||s.name||plain(s)||'Source',detail:s.detail||s.description||s.note||'',url:/^https?:\/\//i.test(String(s.url||s.href||''))?String(s.url||s.href):''};
  };
  const sourcesFor=e=>{
    const out=[],seen=new Set();
    [...arr(e.sources),...arr(e.references),...arr(e.refs),...arr(e.primarySources),...arr(e.bibliography)].map(sourceObj).filter(Boolean).forEach(s=>{const k=norm((s.title||'')+' '+(s.url||''));if(!k||seen.has(k))return;seen.add(k);out.push(s)});
    const defaults=[
      {title:'Ludo Rocher, The Purāṇas (1986)',detail:'Standard survey of Purāṇic textual history, recensions, chronology and bibliography.',url:'https://books.google.com/books?id=n0-4RJh5FgoC'},
      {title:'R. C. Hazra, Studies in the Puranic Records on Hindu Rites and Customs',detail:'Historical study of Purāṇic strata, rites, customs and Dharmaśāstra relations.',url:'https://books.google.com/books?id=Jar4V3piCeQC'}
    ];
    defaults.forEach(s=>{const k=norm(s.title);if(!seen.has(k)){seen.add(k);out.push(s)}});
    return out;
  };
  const sectionParts=s=>{
    const paragraphs=uniq([s?.paragraphs,s?.text,s?.summary,s?.note]);
    const bullets=uniq([s?.bullets]);
    const subs=[];
    arr(s?.books).forEach((b,i)=>{
      if(typeof b==='string')bullets.push(b);
      else{const title=b?.title||b?.name||b?.number||`Part ${i+1}`;const ps=uniq([b?.summary,b?.text,b?.description,b?.note,b?.paragraphs]);const bs=uniq([b?.bullets]);subs.push({title:String(title),paragraphs:ps,bullets:bs});}
    });
    arr(s?.subsections||s?.subs).forEach((sub,i)=>subs.push({title:String(sub?.title||sub?.name||`Subsection ${i+1}`),paragraphs:uniq([sub?.paragraphs,sub?.text,sub?.summary,sub?.note]),bullets:uniq([sub?.bullets])}));
    return{paragraphs,bullets,subs};
  };
  function buildSections(e,sources){
    const buckets=Object.fromEntries(KEYS.map(k=>[k,{paragraphs:[],bullets:[],subs:[]} ]));
    arr(e.articleSections).forEach(s=>{const key=classify(s?.title);const p=sectionParts(s);buckets[key].paragraphs.push(...p.paragraphs);buckets[key].bullets.push(...p.bullets);buckets[key].subs.push(...p.subs)});
    buckets.date.paragraphs.push(...uniq([e.period,e.date,e.dating,e.history,e.datingBasis,e.hazraNotes,e.milieu,e.textualSetting]));
    buckets.structure.paragraphs.push(...uniq([e.structure,e.extent,e.booksCount,e.verseCount]));
    buckets.structure.bullets.push(...uniq([e.primaryRecensions,e.chapterMap]));
    buckets.contents.paragraphs.push(...uniq([e.overview,e.summary]));
    buckets.contents.bullets.push(...uniq([e.contents,e.keyContents,e.namedFeatures,e.primaryPassages]));
    buckets.theology.paragraphs.push(...uniq([e.profile,e.theology,e.philosophy,e.themes,e.teachings]));
    buckets.critical.paragraphs.push(...uniq([e.manuscripts,e.criticalEdition,e.edition,e.textualHistory]));
    buckets.critical.bullets.push(...uniq([e.primaryEvidence,e.primaryRecensions]));
    buckets.reception.paragraphs.push(...uniq([e.reception,e.significance]));
    buckets.reception.bullets.push(...uniq([e.dependencies,e.scholarlyPositions,e.scholarlyDebates,e.commentaries]));
    buckets.social.paragraphs.push(...uniq([e.ritualHistory,e.socialHistory,e.dharma]));
    buckets.social.bullets.push(...uniq([e.rituals,e.vratas,e.sacredGeography,e.pilgrimage]));
    buckets.further.bullets.push(...uniq([sources.map(s=>s.title),e.bibliography]));

    const generic={
      date:[`The ${name} is a composite Purāṇic textual tradition rather than a work that can safely be assigned to one author and one year. The date reported here therefore distinguishes proposed composition or redactional strata from the dates of surviving manuscripts, quotations and printed editions.`],
      structure:[`The structure of the ${name} must be reported recension by recension. Chapter, khaṇḍa, saṃhitā or skandha counts in a printed edition are evidence for that received form and are not automatically the architecture of every manuscript witness.`],
      contents:[`The contents are described from the received text and identified textual strata. Where sections circulate independently or differ between recensions, the article treats that variation as part of the textual history rather than forcing a single synthetic table of contents.`],
      theology:[`The theological profile of the ${name} is described from its individual strata and narrative settings. Later Vedānta, Śaiva, Vaiṣṇava or Śākta interpretations are attributed to their historical interpreters rather than silently projected onto the whole Purāṇa.`],
      critical:[`A printed Sanskrit edition is not automatically a critical edition. This section distinguishes manuscript witnesses, recensions, editorial collation and genuinely critical editions; where no stemmatic critical edition is identified in the dossier, the article says so rather than inventing one.`],
      reception:[`Reception is traced through quotation, commentary, incorporation into later literature, ritual use, manuscript copying, regional transmission and modern scholarship. Traditional classification alone is not treated as proof of historical influence.`],
      social:[`Purāṇic prescriptions concerning ritual, pilgrimage, gift, caste, āśrama, kingship, domestic observance and temple practice are normative sources. They are not treated as direct demographic descriptions without corroborating historical evidence.`],
      further:[`For textual history and bibliography, consult the specialist works in References alongside the Sanskrit edition or critical edition identified for this Purāṇa.`]
    };
    KEYS.forEach(k=>{
      buckets[k].paragraphs=uniq(buckets[k].paragraphs);
      buckets[k].bullets=uniq(buckets[k].bullets);
      if(!buckets[k].paragraphs.length&&!buckets[k].bullets.length&&!buckets[k].subs.length)buckets[k].paragraphs=generic[k];
    });
    return buckets;
  }
  const renderBody=part=>{
    let h=part.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('');
    if(part.bullets.length)h+=`<ul>${part.bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    part.subs.forEach(sub=>{h+=`<h3>${esc(sub.title)}</h3>${sub.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}${sub.bullets.length?`<ul>${sub.bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}`});
    return h;
  };
  const renderRef=(s,i)=>`<li id="ref-${i+1}">${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(s.title)}</b></a>`:`<b>${esc(s.title)}</b>`}${s.detail?` — ${esc(s.detail)}`:''}</li>`;
  const setOpen=(section,open)=>{
    if(!section)return;
    const body=section.querySelector(':scope > .mahapurana-collapse-body');
    const h=section.querySelector(':scope > h2');
    if(!body||!h)return;
    section.classList.toggle('is-open',open);body.hidden=!open;h.setAttribute('aria-expanded',open?'true':'false');
  };

  async function run(){
    try{
      const response=await fetch('/vivekadrishti/articles/scripture/?manifest=purana60-v2',{cache:'no-cache'});
      if(!response.ok)throw new Error('Could not read Scripture Index loader manifest');
      const doc=new DOMParser().parseFromString(await response.text(),'text/html');
      const sources=[...doc.querySelectorAll('script[src]')].map(s=>s.getAttribute('src')).filter(Boolean).filter(wanted);
      const seen=new Set();
      for(const src of sources){if(seen.has(src))continue;seen.add(src);await load(src)}
      document.title=`${name} — Purāṇa Research | Viveka Dṛṣṭi`;
      const D=window.SCRIPTURE_DETAIL_DATA||{};
      const e=Object.assign({},D[name]||{},D['Purāṇa:'+name]||{});
      if(!Object.keys(e).length)throw new Error('No article data found for '+name);
      const refs=sourcesFor(e);
      const sections=buildSections(e,refs);
      const info=[['Corpus',e.corpus||(/Upapur/i.test(e.kind||'')?'Upapurāṇa':'Purāṇa')],['Sanskrit',e.sanskritTitle],['Traditional attribution',e.traditionalAuthor],['Language',e.language||'Sanskrit'],['Date / textual formation',e.period||e.date],['Structure',e.booksCount||e.structure],['Extent',e.extent],['Verse count',e.verseCount]].filter(x=>x[1]);
      const lead=uniq([e.leadParagraphs,e.overview,e.summary]).slice(0,4);
      const toc=`<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${TITLES.map((t,i)=>`<li><a href="#section-${i+1}" data-section="section-${i+1}">${esc(t)}</a></li>`).join('')}</ol></nav>`;
      const infobox=info.length?`<aside class="kena-infobox universal-infobox purana-full-infobox"><div class="kena-infobox-title">${esc(name)}</div>${info.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(plain(v))}</span></div>`).join('')}</aside>`:'';
      const sectionHtml=KEYS.map((k,i)=>`<section class="kena-section purana-full-section mahapurana-collapse-section" id="section-${i+1}"><h2 role="button" tabindex="0" aria-expanded="false">${TITLES[i]}</h2><div class="mahapurana-collapse-body" hidden>${renderBody(sections[k])}</div></section>`).join('');
      const references=`<section class="kena-section purana-full-section mahapurana-collapse-section universal-references" id="section-9"><h2 role="button" tabindex="0" aria-expanded="false">References</h2><div class="mahapurana-collapse-body" hidden><ol>${refs.map(renderRef).join('')}</ol><p><b>Editorial method:</b> dates of composition, manuscript witnesses, printed editions and critical editions are treated as different kinds of evidence. Composite or disputed strata are identified rather than harmonized into a single fictive authorial moment.</p></div></section>`;
      root.innerHTML=`<section class="mahapurana-wiki-reader mahapurana-static-reader"><header class="kena-article-head"><span class="eyebrow">Purāṇa · encyclopedia article</span><h1>${esc(name)}</h1></header><div class="kena-article-scroll"><article class="purana-full-article universal-wiki-article mahapurana-wiki-article">${infobox}<div class="kena-lead">${lead.map(p=>`<p>${esc(p)}</p>`).join('')}</div>${toc}${sectionHtml}${references}</article></div></section>`;
      root.classList.add('is-loaded');
      root.addEventListener('click',ev=>{
        const tocLink=ev.target.closest('.kena-toc a[data-section]');
        if(tocLink){ev.preventDefault();const sec=document.getElementById(tocLink.dataset.section);setOpen(sec,true);sec?.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',`#${tocLink.dataset.section}`);return;}
        const h=ev.target.closest('.mahapurana-collapse-section > h2');if(h){const sec=h.parentElement;setOpen(sec,!sec.classList.contains('is-open'));}
      });
      root.addEventListener('keydown',ev=>{const h=ev.target.closest('.mahapurana-collapse-section > h2');if(!h||(ev.key!=='Enter'&&ev.key!==' '))return;ev.preventDefault();const sec=h.parentElement;setOpen(sec,!sec.classList.contains('is-open'));});
      if(location.hash){const target=document.getElementById(location.hash.slice(1));if(target?.classList.contains('mahapurana-collapse-section')){setOpen(target,true);requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}
    }catch(err){console.error(err);root.innerHTML=`<div class="mahapurana-static-error"><h2>Article data could not be loaded</h2><p>${esc(err.message||err)}</p><p><a href="/vivekadrishti/articles/scripture/">Return to the Scripture Index</a>.</p></div>`}
  }
  run();
})();