(() => {
  const root=document.getElementById('scripture-browser');
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const D=window.SCRIPTURE_DETAIL_DATA||{};
  if(!root||!Object.keys(R).length)return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const PRINCIPAL=new Set(['Aitareya','Kauṣītaki','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya']);
  let shade=null,reader=null,currentSources=[];

  const sourceObj=x=>{
    if(!x)return null;
    if(typeof x==='string')return{t:x,d:'',u:''};
    return{t:x.t||x.title||x.citation||x.text||'Source',d:x.d||x.detail||x.note||'',u:x.u||x.url||x.href||''};
  };
  const sourcesFor=(name,d)=>{
    const out=(d.refs||[]).map(sourceObj).filter(Boolean);
    const extra=D[name]||{};
    [...(Array.isArray(extra.sources)?extra.sources:[]),...(Array.isArray(extra.bibliography)?extra.bibliography:[])].map(sourceObj).filter(Boolean).forEach(s=>out.push(s));
    if(d.image?.href)out.push({t:'Wikimedia Commons — manuscript image',d:d.image.cap||`${d.title} manuscript.`,u:d.image.href});
    const seen=new Set();
    return out.filter(s=>{const k=(s.t+'|'+s.u).toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  };
  const cite=nums=>(nums||[]).map(n=>`<sup class="up-cite"><button type="button" data-pr15-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const P=x=>{const text=Array.isArray(x)?x[0]:x;const refs=Array.isArray(x)?x[1]:[];return `<p>${esc(text)}${cite(refs)}</p>`;};

  const metadataSection=d=>({
    t:'Text, school and structure',
    ps:[
      [`The ${d.title} belongs to the ${d.veda}${d.school?` and is transmitted in the ${d.school} tradition`:''}. Its textual setting is ${d.setting||'within the Vedic Upanishadic corpus'}, and the received work is arranged as ${d.structure||'a compact Upanishadic text'}.`,[1,2]],
      [`In the Muktika list it is ${d.muktika||'included among the principal Upanishads'}. The received Sanskrit text should be read in its Vedic school and recensional setting rather than as an isolated modern book.`,[2,3]]
    ]
  });

  const extraSections=(name,d)=>{
    const e=D[name]||{};const out=[];
    const hasTitle=re=>(d.sections||[]).some(s=>re.test(s.t||''));
    if((e.manuscripts||e.history)&&!hasTitle(/manuscript|transmission|textual history/i)){
      const ps=[];
      if(e.manuscripts)ps.push([e.manuscripts,[1,3]]);
      if(e.history)ps.push([e.history,[1,2]]);
      if(ps.length)out.push({t:'Manuscripts and transmission',ps});
    }
    const themes=Array.isArray(e.themes)?e.themes:[];
    if((themes.length||e.significance||e.overview)&&!hasTitle(/teaching|doctrine|interpret/i)){
      const ps=[];
      if(e.overview)ps.push([e.overview,[2,4]]);
      if(themes.length)ps.push([`Major themes include ${themes.join(', ')}. These teachings belong to the sequence of the text and should not be detached from the chapter or dialogue in which they occur.`,[2,5]]);
      if(e.significance)ps.push([e.significance,[3,5]]);
      if(ps.length)out.push({t:'Major teachings and interpretation',ps});
    }
    const debates=Array.isArray(e.scholarlyDebates)?e.scholarlyDebates:[];
    if(debates.length)out.push({t:'Scholarly questions',ps:debates.map((x,i)=>[x,[1,2+(i%3)]])});
    if((e.reception||d.commentators)&&!hasTitle(/commentar|reception|influence/i)){
      const ps=[];
      if(d.commentators)ps.push([`${d.title} was interpreted in major Vedantic traditions; important commentators and associated traditions include ${d.commentators}. Their readings often agree on the authority of the text while disagreeing about the relation of the individual self, Brahman, divine agency and liberation.`,[3,5]]);
      if(e.reception)ps.push([e.reception,[2,5]]);
      out.push({t:'Commentaries and influence',ps});
    }
    return out;
  };

  function sectionsFor(name,d){
    const raw=(d.sections||[]).map(s=>({t:s.t,ps:[...(s.ps||[])],subs:[...(s.subs||[])]}));
    const used=new Set();
    const dateIdx=raw.findIndex(s=>/^Date\b|^Recensions, layers and historical/i.test(s.t||''));
    const textIdx=raw.findIndex((s,i)=>i!==dateIdx&&/^(Textual|Text,|Text and|Recensions|Textual history|Recensions,)/i.test(s.t||''));
    const out=[];
    if(dateIdx>=0){used.add(dateIdx);out.push({t:'Date and composition',ps:raw[dateIdx].ps,subs:raw[dateIdx].subs});}
    else out.push({t:'Date and composition',ps:[[`The ${d.title} is generally dated to ${d.date||'the first millennium BCE'}. Absolute dates for Upanishadic texts remain approximate and are reconstructed from language, ritual setting, intertextual parallels and the relative development of Vedic thought.`,[1,2,3]]]});
    const meta=metadataSection(d);
    if(textIdx>=0){used.add(textIdx);meta.ps.push(...raw[textIdx].ps);meta.subs=raw[textIdx].subs;}
    out.push(meta);
    raw.forEach((s,i)=>{if(!used.has(i))out.push(s);});
    out.push(...extraSections(name,d));
    return out;
  }

  const sectionHTML=(s,i)=>{
    let body=(s.ps||[]).map(P).join('');
    (s.subs||[]).forEach((sub,j)=>{body+=`<h3 id="pr15-sec-${i}-sub-${j}">${esc(sub.h)}</h3>${(sub.ps||[]).map(P).join('')}`;});
    return `<section class="kena-section ch-section" id="pr15-sec-${i}"><h2>${esc(s.t)}</h2>${body}</section>`;
  };
  const tocHTML=secs=>secs.map((s,i)=>`<li><a href="#pr15-sec-${i}">${esc(s.t)}</a>${s.subs?.length?`<ol>${s.subs.map((sub,j)=>`<li><a href="#pr15-sec-${i}-sub-${j}">${esc(sub.h)}</a></li>`).join('')}</ol>`:''}</li>`).join('');
  const infobox=d=>{
    const rows=[['Date',d.date],['Type',d.type],['Veda',d.veda],['School',d.school],['Textual setting',d.setting],['Structure',d.structure],['Muktika',d.muktika],['Major commentators',d.commentators],['Famous teaching',d.famous]].filter(x=>x[1]);
    return `<aside class="kena-infobox ch-infobox"><div class="kena-infobox-title">${esc(d.title)}</div>${d.deva?`<div class="ch-dev">${esc(d.deva)}</div>`:''}${d.image?`<figure class="wiki-infobox-image"><a href="${esc(d.image.href)}" target="_blank" rel="noopener"><img src="${esc(d.image.src)}" loading="lazy" alt="${esc(d.title)} manuscript"></a><figcaption>${esc(d.image.cap||'')}</figcaption></figure>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  };
  const references=()=>`<section class="kena-section ch-section" id="pr15-references"><h2>References</h2><ol class="ch-reference-list">${currentSources.map((s,i)=>`<li id="pr15-ref-${i+1}"><b>${i+1}.</b> ${esc(s.t)}${s.d?` — ${esc(s.d)}`:''}${s.u?` <a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;
  const close=()=>{shade?.remove();reader?.remove();document.querySelector('.principal15-source-card')?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});};
  const showSource=n=>{const s=currentSources[n-1];if(!s)return;document.querySelector('.principal15-source-card')?.remove();const card=document.createElement('aside');card.className='itihasa-source-card ch-source-card principal15-source-card';card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.t)}</strong>${s.d?`<p>${esc(s.d)}</p>`:''}${s.u?`<a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(card);card.querySelector('button')?.addEventListener('click',()=>card.remove());};

  function open(button,name,d){
    close();button.classList.add('is-active');button.setAttribute('aria-pressed','true');currentSources=sourcesFor(name,d);
    const secs=sectionsFor(name,d);
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up-wiki-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up-wiki-reader ch-wiki-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${d.title} article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(d.title)}</h1>${d.deva?`<div class="up-title-dev">${esc(d.deva)}</div>`:''}</div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article up-wiki-article ch-wiki-article">${infobox(d)}<div class="kena-lead ch-lead">${(d.lead||[]).map(P).join('')}</div><nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${tocHTML(secs)}<li><a href="#pr15-references">References</a></li></ol></nav>${secs.map(sectionHTML).join('')}${references()}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }

  document.addEventListener('click',e=>{const b=e.target.closest?.('.shastra-name');if(!b)return;const name=b.dataset.name||b.querySelector('span')?.textContent?.trim()||b.textContent.trim();if(!PRINCIPAL.has(name)||!R[name])return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open(b,name,R[name]);},true);
  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-pr15-note]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.pr15Note));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.ch-wiki-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});
  window.SCRIPTURE_PRINCIPAL_CHANDOGYA_CLONE_V15=true;
})();
