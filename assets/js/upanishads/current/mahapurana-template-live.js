/*
 * Unified Upanishad encyclopedia renderer.
 * Preserves the existing 108-text research data while using the same
 * continuous, text-only layout as the Mahapurana pages.
 */
(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const D = window.SCRIPTURE_DETAIL_DATA || {};
  const R = window.SCRIPTURE_PRINCIPAL_RICH || {};
  const U = window.SCRIPTURE_UPANISHAD_UNITS || {};
  const TITLES = ['Date','Structure','Contents','Theology','Influence','Rites','Critical edition','Further reading','References'];

  const PRINCIPAL_NAMES = {
    'Īśāvāsya':'Isha','Kena':'Kena','Kaṭha':'Katha','Praśna':'Prashna','Muṇḍaka':'Mundaka',
    'Māṇḍūkya':'Mandukya','Taittirīya':'Taittiriya','Aitareya':'Aitareya',
    'Chāndogya':'Chandogya','Bṛhadāraṇyaka':'Brihadaranyaka'
  };
  const PRINCIPAL_MUKTIKA = {
    'Īśāvāsya':1,'Kena':2,'Kaṭha':3,'Praśna':4,'Muṇḍaka':5,
    'Māṇḍūkya':6,'Taittirīya':7,'Aitareya':8,'Chāndogya':9,'Bṛhadāraṇyaka':10
  };
  const DEVA = {
    'Īśāvāsya':'ईशावास्योपनिषद्','Kena':'केनोपनिषद्','Kaṭha':'कठोपनिषद्',
    'Praśna':'प्रश्नोपनिषद्','Muṇḍaka':'मुण्डकोपनिषद्','Māṇḍūkya':'माण्डूक्योपनिषद्',
    'Taittirīya':'तैत्तिरीयोपनिषद्','Aitareya':'ऐतरेयोपनिषद्',
    'Chāndogya':'छान्दोग्योपनिषद्','Bṛhadāraṇyaka':'बृहदारण्यकोपनिषद्'
  };

  const englishize = value => String(value || '')
    .replace(/[ŚśṢṣ]/g, c => c === c.toUpperCase() ? 'Sh' : 'sh')
    .replace(/[ṚṛṜṝ]/g, c => c === c.toUpperCase() ? 'Ri' : 'ri')
    .replace(/[Ṅṅ]/g, c => c === c.toUpperCase() ? 'Ng' : 'ng')
    .replace(/[Ññ]/g, c => c === c.toUpperCase() ? 'Ny' : 'ny')
    .replace(/[ṂṃṀṁ]/g, c => c === c.toUpperCase() ? 'M' : 'm')
    .replace(/[Ḥḥ]/g, c => c === c.toUpperCase() ? 'H' : 'h')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const txt = v => typeof v === 'string' ? v :
    (v?.text || v?.claim || v?.summary || v?.full || v?.short || v?.description ||
     v?.note || v?.title || v?.t || v?.d || '');
  const norm = v => englishize(String(v || '')).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const uniq = values => {
    const seen = new Set();
    return values.flatMap(v => Array.isArray(v) ? v : [v]).map(txt).map(v=>String(v||'').trim()).filter(v=>{
      const k=norm(v); if(!k || seen.has(k)) return false; seen.add(k); return true;
    });
  };

  const dataFor = name => Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});
  function nested(obj,name){
    if(!obj || typeof obj !== 'object') return {};
    if(obj[name] && typeof obj[name] === 'object') return obj[name];
    for(const value of Object.values(obj)){
      if(value && typeof value === 'object' && !Array.isArray(value) && value[name]) return value[name];
      if(Array.isArray(value)){
        const hit=value.find(x=>x&&typeof x==='object'&&(x.name===name||x.title===name));
        if(hit) return hit;
      }
    }
    return {};
  }
  const richFor = name => Object.assign({},nested(R,name),nested(U,name));
  const displayName = name => PRINCIPAL_NAMES[name] || englishize(name);
  const displayText = value => englishize(txt(value));
  const shortValue = value => {
    let s = displayText(value).replace(/\s+/g,' ').trim();
    if (!s) return '';
    const sentence = s.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
    if (sentence && sentence.length <= 170) s = sentence;
    if (s.length > 170) s = s.slice(0,167).replace(/\s+\S*$/,'') + '...';
    return s;
  };
  const paragraph = value => value ? `<p>${esc(displayText(value))}</p>` : '';

  function fallbackResearch(name,e,r){
    const sourceObj=v=>{
      if(!v)return null;
      if(typeof v==='string')return{title:v,detail:'',url:''};
      return{title:v.title||v.t||v.citation||v.name||txt(v)||'Source',detail:v.detail||v.d||v.note||v.description||'',url:/^https?:\/\//i.test(String(v.url||v.u||v.href||''))?String(v.url||v.u||v.href):''};
    };
    const raw=[...arr(e.sources),...arr(e.refs),...arr(e.bibliography),...arr(e.primarySources),...arr(r.sources),...arr(r.refs),...arr(r.bibliography)];
    raw.push({title:'Muktika Upanishad — traditional 108-text canon',detail:'Traditional sequence and Vedic affiliation.',url:'https://sanskritdocuments.org/doc_upanishhat/upanishad_list.html'});
    raw.push({title:'SanskritDocuments — Upanishad collection',detail:'Electronic Sanskrit access aid.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    const refs=[],seen=new Set();
    raw.map(sourceObj).filter(Boolean).forEach(s=>{const k=norm(s.title);if(!k||seen.has(k))return;seen.add(k);refs.push(s);});
    return {sections:{
      date:uniq([e.period,e.date,e.dating,e.datingBasis,e.history,r.period,r.date]),
      structure:uniq([e.structure,e.extent,r.structure,r.extent,...arr(e.chapterMap),...arr(r.chapterMap)]),
      contents:uniq([e.overview,e.summary,r.overview,r.summary,...arr(e.contents),...arr(e.keyContents),...arr(r.contents),...arr(r.keyContents)]),
      theology:uniq([e.profile,e.theology,e.philosophy,r.profile,r.theology,r.philosophy,e.significance,r.significance,...arr(e.themes),...arr(r.themes)]),
      critical:uniq([e.manuscripts,e.recensions,e.edition,e.criticalEdition,e.textualHistory,r.manuscripts,r.recensions,r.edition,r.criticalEdition]),
      reception:uniq([e.reception,e.commentaries,e.significance,r.reception,r.commentaries,r.significance]),
      social:uniq([e.ritualHistory,e.socialHistory,e.dharma,e.ritual,e.yoga,e.renunciation,r.ritualHistory,r.socialHistory,r.dharma,r.ritual,r.yoga,r.renunciation]),
      further:refs.map(s=>s.title)
    },references:refs};
  }

  function makeLead(name,e,r){
    const lines=uniq([...arr(r.lead),e.overview,e.summary,r.overview,r.summary,e.significance,r.significance]).slice(0,2);
    if(lines.length) return lines.map(paragraph).join('');
    return `<p>${esc(`${displayName(name)} Upanishad is part of the received Upanishadic corpus. This article separates traditional classification from historical composition, textual transmission, doctrine and reception.`)}</p>`;
  }
  function devaFor(name,e,r){return r.deva || e.deva || e.sanskritTitle || r.sanskritTitle || DEVA[name] || '';}

  function makeInfobox(name,button,e,r,research){
    const group=button.dataset.type || research?.group || e.group || e.type || 'Upanishad';
    const veda=button.dataset.veda || e.veda || r.veda || '';
    const muktika=research?.muktika || PRINCIPAL_MUKTIKA[name] || '';
    const rows=[
      ['Religion','Hinduism'],['Classification',group],...(muktika ? [['Muktika',`No. ${muktika}`]] : []),
      ['Language','Sanskrit'],['Vedic affiliation',veda],
      ['Period',shortValue(r.date || e.period || e.date || e.dating)],
      ['Structure',shortValue(r.structure || e.structure || e.extent)]
    ].filter(([,v])=>String(v||'').trim());
    return `<aside class="kena-infobox universal-infobox purana-full-infobox"><div class="kena-infobox-title">${esc(displayName(name))} Upanishad</div>${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(englishize(v))}</span></div>`).join('')}</aside>`;
  }

  function build(name,button){
    const e=dataFor(name),r=richFor(name);
    const research=window.UPANISHAD_RESEARCH_108?.[name] || fallbackResearch(name,e,r);
    const s=research.sections || {};
    const sectionData=[s.date,s.structure,s.contents,s.theology,s.reception,s.social,s.critical,s.further];
    const sectionHtml=sectionData.map((items,i)=>{
      const vals=uniq(items);
      const body=(vals.length?vals:[`Research note: the current dossier does not yet support a more precise claim under ${TITLES[i]}.`]).map(paragraph).join('');
      return `<section class="kena-section purana-full-section mahapurana-article-section" id="up-live-${i+1}"><h2>${TITLES[i]}</h2><div class="mahapurana-collapse-body">${body}</div></section>`;
    }).join('');
    const refs=arr(research.references);
    const refsHtml=`<section class="kena-section purana-full-section mahapurana-article-section universal-references" id="up-live-9"><h2>References</h2><div class="mahapurana-collapse-body"><ol>${refs.map(s=>`<li>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(englishize(s.title||'Source'))}</a>`:esc(englishize(s.title||'Source'))}${s.detail?` — ${esc(englishize(s.detail))}`:''}</li>`).join('')}</ol></div></section>`;
    const toc=`<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${TITLES.map((t,i)=>`<li><a href="#up-live-${i+1}" data-up-target="up-live-${i+1}">${esc(t)}</a></li>`).join('')}</ol></nav>`;
    return `<article class="purana-full-article universal-wiki-article mahapurana-wiki-article upanishad-research-complete">${makeInfobox(name,button,e,r,research)}<div class="kena-lead">${makeLead(name,e,r)}</div>${toc}${sectionHtml}${refsHtml}</article>`;
  }

  function emphasize(container){
    const terms=['Brahman','Atman','Vedanta','Veda','Upanishad','Sanskrit','moksha','karma','dharma','yoga','renunciation'];
    const re=new RegExp(`\\b(${terms.join('|')})\\b`,'gi');
    container.querySelectorAll('.kena-lead p,.mahapurana-collapse-body p,.mahapurana-collapse-body li').forEach(el=>{
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];
      while(walker.nextNode()){const n=walker.currentNode;if(!n.parentElement?.closest('a,strong,h1,h2,h3'))nodes.push(n);}
      nodes.forEach(node=>{
        const text=node.nodeValue;
        if(!text || !re.test(text)){re.lastIndex=0;return;}
        re.lastIndex=0;const frag=document.createDocumentFragment();let pos=0,m;
        while((m=re.exec(text))){if(m.index>pos)frag.append(document.createTextNode(text.slice(pos,m.index)));const strong=document.createElement('strong');strong.textContent=m[0];frag.append(strong);pos=m.index+m[0].length;}
        if(pos<text.length)frag.append(document.createTextNode(text.slice(pos)));node.replaceWith(frag);re.lastIndex=0;
      });
    });
  }

  let backdrop=null,reader=null,researchLoader=null;
  function close(){
    backdrop?.remove();reader?.remove();backdrop=reader=null;document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});
  }
  function clearLegacy(){
    document.querySelectorAll('.kena-article-backdrop,.scripture-wiki-backdrop,.current-up-backdrop,.up-research-backdrop,.chandogya-backdrop').forEach(x=>x.remove());
    document.querySelectorAll('.kena-article-reader,.scripture-wiki-reader,.current-up-reader,.up-research-reader,.chandogya-reader').forEach(x=>x.remove());
  }
  function ensureResearch(done){
    if(window.UPANISHAD_RESEARCH_108){done();return;}
    if(researchLoader){researchLoader.addEventListener('load',done,{once:true});return;}
    researchLoader=document.createElement('script');researchLoader.src='/vivekadrishti/assets/js/upanishads/current/research-108-complete.js?build=20260828-upanishad-unified-v1';researchLoader.async=false;
    researchLoader.addEventListener('load',done,{once:true});researchLoader.addEventListener('error',done,{once:true});document.head.append(researchLoader);
  }

  function open(button){
    const name=button.dataset.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim();if(!name)return false;
    close();clearLegacy();button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    const e=dataFor(name),r=richFor(name),deva=devaFor(name,e,r);
    backdrop=document.createElement('div');backdrop.className='kena-article-backdrop scripture-wiki-backdrop purana-full-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader purana-full-reader mahapurana-wiki-reader upanishad-mahapurana-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${displayName(name)} Upanishad encyclopedia article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad · encyclopedia article</span><h1>${esc(displayName(name))} Upanishad ${deva?`<span class="purana-devanagari-title" lang="sa-Deva">${esc(String(deva).split('/')[0].trim())}</span>`:''}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${build(name,button)}</div>`;
    document.body.append(backdrop,reader);document.documentElement.classList.add('kena-article-open');emphasize(reader);reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }

  window.addEventListener('click',ev=>{
    const button=ev.target.closest?.('#scripture-browser .shastra-name[data-kind="Upaniṣad"]');if(!button)return;
    ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();ensureResearch(()=>open(button));
  },true);
  document.addEventListener('click',ev=>{
    if(ev.target===backdrop||ev.target.closest?.('.upanishad-mahapurana-reader .kena-article-close')){close();return;}
    const link=ev.target.closest?.('.upanishad-mahapurana-reader .kena-toc a[data-up-target]');
    if(link){ev.preventDefault();const sec=document.getElementById(link.dataset.upTarget);sec?.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',`#${link.dataset.upTarget}`);}
  },true);
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&reader)close();},true);
  window.UPANISHAD_LIVE_TEMPLATE='unified-text-only-v1';
})();
