(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;

  const previousOpen=window.openScriptureEncyclopedia;
  const D=window.SCRIPTURE_DETAIL_DATA||{};
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};

  // Kena + Chandogya keep their bespoke readers. The other principal texts
  // already use v17, except Kausitaki which is handled here to repair its image.
  const PRINCIPAL_V17=new Set(['Aitareya','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya']);

  const GROUPS={
    'Mukhya':['Aitareya','Kauṣītaki','Kena','Chāndogya','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya'],
    'Sāmānya Vedānta':['Ātmabodha','Mudgala','Vajrasūcī','Mahā','Sāvitrī','Garbha','Sarvasāra','Śukarahasya','Skanda','Śārīraka','Ekākṣara','Akṣi','Prāṇāgnihotra','Subāla','Mantrikā','Nirālamba','Paiṅgala','Adhyātma','Muktikā','Annapūrṇā','Sūrya','Ātma'],
    'Sannyāsa':['Nirvāṇa','Āruṇi','Maitreya','Sannyāsa','Kuṇḍikā','Brahma','Avadhūta','Kaṭharudra','Jābāla','Paramahaṃsa','Bhikṣuka','Turīyātītāvadhūta','Yājñavalkya','Śāṭyāyanīya','Nārada-Parivrājaka','Paramahaṃsa-Parivrājaka','Parabrahma'],
    'Yoga':['Nādabindu','Yogacūḍāmaṇi','Jābāladarśana','Amṛtabindu','Amṛtanāda','Kṣurikā','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Yogaśikhā','Yogakuṇḍalinī','Varāha','Haṃsa','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advayatāraka','Śāṇḍilya','Pāśupatabrahma','Mahāvākya'],
    'Vaiṣṇava':['Vāsudeva','Avyakta','Nārāyaṇa','Kali-Saṇṭāraṇa','Tārasāra','Nṛsiṃhatāpanī','Tripādvibhūti-Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Garuḍa'],
    'Śaiva':['Akṣamālikā','Rudrākṣajābāla','Jābāli','Kaivalya','Kālāgnirudra','Dakṣiṇāmūrti','Rudrahṛdaya','Pañcabrahma','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Śarabha','Bhasmajābāla','Gaṇapati'],
    'Śākta':['Tripurā','Saubhāgyalakṣmī','Bahvṛca','Sarasvatī-rahasya','Sītā','Tripurātāpinī','Devī','Bhāvanā']
  };
  const ORDER=Object.values(GROUPS).flat();
  const ALL=new Set(ORDER);
  const groupOf=n=>Object.keys(GROUPS).find(g=>GROUPS[g].includes(n))||'Upaniṣad';
  const muktika=n=>{const i=ORDER.indexOf(n);return i<0?'':`No. ${i+1}`;};

  const DEVA={
    Aitareya:'ऐतरेयोपनिषद्',Kauṣītaki:'कौषीतक्युपनिषद्',Kena:'केनोपनिषद्',Chāndogya:'छान्दोग्योपनिषद्',Maitrāyaṇī:'मैत्रायणीयोपनिषद्',Kaṭha:'कठोपनिषद्',Taittirīya:'तैत्तिरीयोपनिषद्',Śvetāśvatara:'श्वेताश्वतरोपनिषद्',Īśāvāsya:'ईशावास्योपनिषद्',Bṛhadāraṇyaka:'बृहदारण्यकोपनिषद्',Praśna:'प्रश्नोपनिषद्',Muṇḍaka:'मुण्डकोपनिषद्',Māṇḍūkya:'माण्डूक्योपनिषद्',Vajrasūcī:'वज्रसूच्युपनिषद्',Muktikā:'मुक्तिकोपनिषद्',Nārāyaṇa:'नारायणोपनिषद्',Gopālatāpanī:'गोपालतापनीयोपनिषद्',Devī:'देव्युपनिषद्',Kaivalya:'कैवल्योपनिषद्',Jābāla:'जाबालोपनिषद्'
  };

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||x?.title||'');
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const uniq=xs=>{const seen=new Set();return xs.map(plain).map(x=>String(x||'').trim()).filter(x=>{const k=norm(x);if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const entry=name=>Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});

  const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
  const commonsPage=file=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;

  const ART={
    // Special:Redirect with page + width asks Commons for a renderable page-one thumbnail.
    Kauṣītaki:{src:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kaushitaki_Brahmana_Upanishad_(IA_dli.bengal.10689.10032).pdf?page=1&width=640',href:'https://commons.wikimedia.org/wiki/File:Kaushitaki_Brahmana_Upanishad_(IA_dli.bengal.10689.10032).pdf',cap:'E. B. Cowell’s 1861 Kaushitaki-Brahmana-Upanishad, with Sankarananda’s commentary and English translation. Public-domain scan, Wikimedia Commons.'},
    Vajrasūcī:{src:commons('Vajrasuchi Upanishad sample i, Samaveda, Sanskrit, Devanagari script, 1728 CE manuscript.jpg'),href:commonsPage('Vajrasuchi Upanishad sample i, Samaveda, Sanskrit, Devanagari script, 1728 CE manuscript.jpg'),cap:'Vajrasuchi Upanishad manuscript, Samaveda, Devanagari, dated 1728. Wikimedia Commons.'}
  };

  const SPECIAL={
    Kauṣītaki:{
      setting:'Kauṣītaki / Śāṅkhāyana Āraṇyaka tradition',
      structure:'4 prose chapters; placement in the larger Āraṇyaka varies by witness',
      commentators:'Śaṅkarānanda; later Vedānta citation tradition',
      famous:'Prāṇa, consciousness, Indra–Pratardana and Ajātaśatru',
      transmission:[
        'The four-chapter Kauṣītaki Upanishad belongs to the Kauṣītaki or Śāṅkhāyana Rigvedic Āraṇyaka tradition, but its chapter placement is not numbered identically in every manuscript and edition. The four teaching chapters are recognisable as a unit even when their location inside the larger Āraṇyaka is cited differently.',
        'The image used here is the public-domain 1861 Bibliotheca Indica edition prepared by E. B. Cowell. It prints the Sanskrit text together with Śaṅkarānanda’s commentary and an English translation. It is a printed textual witness rather than an ancient palm-leaf manuscript, and the caption identifies it as such.',
        'For precise citation, the independent four-chapter numbering and the enclosing Āraṇyaka numbering should both be recorded. This avoids treating one modern editorial arrangement as if it were the only form of the transmitted text.'
      ],
      table:[['Witness / convention','Textual arrangement'],['Independent Upanishad editions','4 chapters'],['Larger textual home','Kauṣītaki / Śāṅkhāyana Āraṇyaka'],['Manuscript issue','Āraṇyaka chapter numbering varies across witnesses and editions'],['Cowell 1861','Sanskrit text with Śaṅkarānanda commentary and English translation']]
    }
  };

  let shade=null,reader=null,currentSources=[];
  const sourceObj=x=>{if(!x)return null;if(typeof x==='string')return{title:x,detail:'',url:''};return{title:x.title||x.t||x.citation||x.text||'Source',detail:x.detail||x.d||x.note||'',url:x.url||x.u||x.href||''};};
  function sourcesFor(name,e,d){
    const out=[];
    [...arr(d?.refs),...arr(e.sources),...arr(e.bibliography),...arr(e.primarySources)].map(sourceObj).filter(Boolean).forEach(x=>out.push(x));
    out.push({title:'Muktikā Upaniṣad — traditional list of 108',detail:'Traditional sequence and Vedic associations used by the index.',url:'https://sanskritdocuments.org/doc_upanishhat/muktika.html'});
    out.push({title:'SanskritDocuments — Upanishad collection',detail:'Sanskrit e-text collection used as a cross-check for titles and transmitted text divisions.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    const image=ART[name]||d?.image||e.image||e.artwork;
    if(image?.href)out.push({title:'Image / textual witness',detail:image.cap||image.caption||'',url:image.href});
    const seen=new Set();return out.filter(s=>{const k=norm(s.title+' '+s.url);if(!k||seen.has(k))return false;seen.add(k);return true;});
  }
  const defaultRefs=()=>Array.from({length:Math.min(3,currentSources.length)},(_,i)=>i+1);
  const cite=refs=>(refs?.length?refs:defaultRefs()).filter(n=>n>0&&n<=currentSources.length).map(n=>`<sup class="ch-cite"><button type="button" data-up18-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const P=(text,refs)=>text?`<p>${esc(text)}${cite(refs)}</p>`:'';

  function dateSection(name,e,button){
    const ps=[];
    if(e.period)ps.push(`The ${name} Upanishad is ${String(e.period).replace(/^./,c=>c.toLowerCase())}.`);
    if(e.milieu)ps.push(String(e.milieu));
    if(e.datingBasis)ps.push(`The dating is based on ${String(e.datingBasis).replace(/^./,c=>c.toLowerCase())}.`);
    if(e.status)ps.push(String(e.status));
    if(!ps.length)ps.push(`The precise date of the ${name} Upanishad is uncertain. It belongs to the ${groupOf(name)} group in the traditional 108-Upanishad arrangement and is associated there with the ${button.dataset.veda||'Vedic'} tradition.`);
    return {title:'Date, classification and textual setting',paragraphs:ps};
  }

  function structureSection(name,e){
    const ps=[];const subs=[];
    if(e.structure)ps.push(String(e.structure));
    if(e.extent)ps.push(`Extent and received form: ${e.extent}.`);
    if(e.manuscripts)ps.push(String(e.manuscripts));
    if(e.history)ps.push(String(e.history));
    const contents=uniq([...arr(e.contents),...arr(e.chapterMap),...arr(e.keyContents)]);
    if(contents.length)subs.push({title:'Arrangement and contents',items:contents});
    const parallels=uniq([...arr(e.dependencies),...arr(e.parallels),...arr(e.relatedTexts)]);
    if(parallels.length)subs.push({title:'Parallels and related texts',items:parallels});
    if(!ps.length&&!subs.length)ps.push(`The received text is preserved as an individual ${groupOf(name)} Upanishad in the Muktikā corpus. The article will distinguish the transmitted text from later summaries and commentarial interpretation as more manuscript and edition data is added.`);
    return {title:'Text, structure and transmission',paragraphs:ps,subs};
  }

  function teachingSection(name,e){
    const ps=[];const subs=[];
    if(e.overview)ps.push(String(e.overview));
    else if(e.summary)ps.push(String(e.summary));
    if(e.profile)ps.push(String(e.profile));
    const themes=uniq(arr(e.themes));
    if(themes.length)subs.push({title:'Main themes',items:themes});
    const features=uniq([...arr(e.namedFeatures),...arr(e.primaryEvidence),...arr(e.primaryPassages),...arr(e.keyPassages)]);
    if(features.length)subs.push({title:'Important passages, practices or episodes',items:features});
    if(!ps.length)ps.push(`The text is principally concerned with ${themes.length?themes.join(', '):'the religious and philosophical concerns characteristic of its traditional classification'}.`);
    return {title:'Contents and teaching',paragraphs:ps,subs};
  }

  function practiceSection(name,e){
    const ps=[];const subs=[];
    if(e.ritualHistory)ps.push(String(e.ritualHistory));
    if(e.practice)ps.push(String(e.practice));
    if(e.doctrine)ps.push(String(e.doctrine));
    const practices=uniq([...arr(e.practices),...arr(e.rituals),...arr(e.disciplines)]);
    if(practices.length)subs.push({title:'Practices and disciplines',items:practices});
    const themes=uniq(arr(e.themes));
    if(!ps.length&&themes.length)ps.push(`The teaching is organised around ${themes.join(', ')}. These terms are treated here as features of this particular text rather than as a generic description of all Upanishads in the same category.`);
    return ps.length||subs.length?{title:groupOf(name)==='Yoga'?'Yoga, practice and liberation':groupOf(name)==='Sannyāsa'?'Renunciation and liberation':'Doctrine, practice and interpretation',paragraphs:ps,subs}:null;
  }

  function receptionSection(e){
    const ps=[];const subs=[];
    if(e.significance)ps.push(String(e.significance));
    if(e.reception)ps.push(String(e.reception));
    if(e.hazraNotes)ps.push(String(e.hazraNotes));
    const positions=uniq([...arr(e.scholarlyPositions),...arr(e.scholarlyDebates)]);
    if(positions.length)subs.push({title:'Scholarly questions',items:positions});
    return ps.length||subs.length?{title:'Commentaries, reception and scholarship',paragraphs:ps,subs}:null;
  }

  function richSections(d){
    return arr(d?.sections).map(s=>({title:s.t||s.title,paragraphs:arr(s.ps||s.paragraphs).map(x=>Array.isArray(x)?{text:x[0],refs:x[1]}:{text:plain(x),refs:defaultRefs()}),subs:arr(s.subs||s.books).map(sub=>({title:sub.h||sub.title||`${sub.number||''} ${sub.title||''}`.trim(),paragraphs:arr(sub.ps||sub.paragraphs||(sub.summary?[sub.summary]:[])).map(x=>Array.isArray(x)?{text:x[0],refs:x[1]}:{text:plain(x),refs:defaultRefs()})}))}));
  }

  function deepSections(e){
    return arr(e.articleSections).map(s=>({title:s.title,paragraphs:arr(s.paragraphs).map(x=>({text:plain(x),refs:defaultRefs()})),subs:arr(s.books).map(b=>({title:`${b.number?b.number+' — ':''}${b.title||'Section'}`,paragraphs:[{text:b.summary||'',refs:defaultRefs()}]}))}));
  }

  function makeSections(name,e,d,button){
    // Kausitaki receives the fully researched principal material plus corrected textual witness.
    if(name==='Kauṣītaki'){
      const out=[];const seen=new Set();const add=s=>{if(!s?.title)return;const k=norm(s.title);if(seen.has(k))return;seen.add(k);out.push(s);};
      richSections(d).forEach(add);deepSections(e).forEach(add);
      const sp=SPECIAL.Kauṣītaki;
      const ms={title:'Manuscripts, recensions and editions',paragraphs:sp.transmission.map(x=>({text:x,refs:defaultRefs()})),subs:[],table:sp.table};
      const idx=Math.max(0,out.findIndex(s=>/date|textual setting|composition/i.test(s.title))+1);out.splice(idx,0,ms);
      return out;
    }
    const out=[dateSection(name,e,button),structureSection(name,e),teachingSection(name,e),practiceSection(name,e),receptionSection(e)].filter(Boolean);
    return out;
  }

  function sectionHTML(s,i){
    let body='';
    body+=arr(s.paragraphs).map(p=>typeof p==='object'&&p.text!==undefined?P(p.text,p.refs):P(plain(p),defaultRefs())).join('');
    if(s.table?.length)body+=`<div class="up18-table-wrap"><table class="up18-table"><tbody>${s.table.map((r,ri)=>`<tr>${r.map(c=>ri===0?`<th>${esc(c)}</th>`:`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    arr(s.subs).forEach((sub,j)=>{
      body+=`<h3 id="up18-sec-${i}-sub-${j}">${esc(sub.title)}</h3>`;
      if(sub.items?.length)body+=`<ul class="up18-detail-list">${sub.items.map(x=>`<li>${esc(x)}${cite(defaultRefs())}</li>`).join('')}</ul>`;
      body+=arr(sub.paragraphs).map(p=>typeof p==='object'&&p.text!==undefined?P(p.text,p.refs):P(plain(p),defaultRefs())).join('');
    });
    return `<section class="kena-section ch-section" id="up18-sec-${i}"><h2>${esc(s.title)}</h2>${body}</section>`;
  }

  function tocHTML(secs){
    return secs.map((s,i)=>`<li><a href="#up18-sec-${i}">${esc(s.title)}</a>${arr(s.subs).length?`<ol>${s.subs.map((sub,j)=>`<li><a href="#up18-sec-${i}-sub-${j}">${esc(sub.title)}</a></li>`).join('')}</ol>`:''}</li>`).join('');
  }

  function imageFor(name,e,d){
    const raw=ART[name]||d?.image||e.image||e.artwork;
    if(!raw)return null;
    if(typeof raw==='string')return{src:raw,href:raw,cap:''};
    return{src:raw.src||raw.url||raw.image||'',href:raw.href||raw.page||raw.url||raw.src||'',cap:raw.cap||raw.caption||raw.credit||''};
  }

  function infobox(name,e,d,button){
    const sp=SPECIAL[name]||{};const image=imageFor(name,e,d);
    const title=d?.title||`${name} Upanishad`;
    const deva=d?.deva||e.sanskritTitle||DEVA[name]||'';
    const themes=uniq(arr(e.themes));
    const rows=[
      ['Date',d?.date||e.period||'Date uncertain'],
      ['Type',d?.type||`${groupOf(name)} Upanishad`],
      ['Veda',d?.veda||button.dataset.veda||''],
      ['School / tradition',d?.school||e.school||e.traditionalAuthor||''],
      ['Textual setting',sp.setting||d?.setting||e.textualSetting||e.extent||''],
      ['Structure',sp.structure||d?.structure||e.structure||e.extent||''],
      ['Muktika',d?.muktika||muktika(name)],
      ['Major commentators',sp.commentators||d?.commentators||e.commentators||(groupOf(name)==='Mukhya'?'':'Upaniṣad Brahmayogin tradition')],
      ['Characteristic teaching',sp.famous||d?.famous||e.famous||themes.slice(0,3).join('; ')]
    ].filter(x=>x[1]);
    return `<aside class="kena-infobox ch-infobox"><div class="kena-infobox-title">${esc(title)}</div>${deva?`<div class="ch-dev">${esc(String(deva).split('/')[0].trim())}</div>`:''}${image?.src?`<figure class="wiki-infobox-image"><a href="${esc(image.href||image.src)}" target="_blank" rel="noopener"><img src="${esc(image.src)}" loading="lazy" alt="${esc(title)} textual witness"></a><figcaption>${esc(image.cap||`${title} textual witness.`)}</figcaption></figure>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function leadHTML(name,e,d){
    const leads=[];
    arr(d?.lead).forEach(x=>leads.push(Array.isArray(x)?x[0]:plain(x)));
    arr(e.leadParagraphs).forEach(x=>leads.push(plain(x)));
    if(e.overview)leads.push(String(e.overview));
    if(e.significance)leads.push(String(e.significance));
    const unique=uniq(leads).slice(0,3);
    if(!unique.length)unique.push(`${name} is a ${groupOf(name)} Upanishad in the traditional Muktikā list of 108. This article separates its transmitted text, classification and surviving evidence from later interpretation.`);
    return unique.map(x=>P(x,defaultRefs())).join('');
  }

  function refsHTML(){
    return `<section class="kena-section ch-section" id="up18-references"><h2>References</h2><ol class="ch-reference-list">${currentSources.map((s,i)=>`<li><b>${i+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;
  }

  function close(){shade?.remove();reader?.remove();document.querySelector('.up18-source-card')?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}
  function showSource(n){const s=currentSources[n-1];if(!s)return;document.querySelector('.up18-source-card')?.remove();const c=document.createElement('aside');c.className='itihasa-source-card ch-source-card up18-source-card';c.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.title)}</strong>${s.detail?`<p>${esc(s.detail)}</p>`:''}${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(c);c.querySelector('button')?.addEventListener('click',()=>c.remove());}

  function openAll(button,name){
    close();const e=entry(name),d=R[name]||{};currentSources=sourcesFor(name,e,d);const secs=makeSections(name,e,d,button);
    button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up-wiki-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up-wiki-reader ch-wiki-reader up18-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${d.title||name+' Upanishad'} article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(d.title||name+' Upanishad')}</h1>${(d.deva||e.sanskritTitle||DEVA[name])?`<div class="up-title-dev">${esc(d.deva||String(e.sanskritTitle||DEVA[name]).split('/')[0])}</div>`:''}</div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article up-wiki-article ch-wiki-article up18-article">${infobox(name,e,d,button)}<div class="kena-lead ch-lead">${leadHTML(name,e,d)}</div><nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${tocHTML(secs)}<li><a href="#up18-references">References</a></li></ol></nav>${secs.map(sectionHTML).join('')}${refsHTML()}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }

  window.openScriptureEncyclopedia=function(button){
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';
    const kind=button?.dataset?.kind||'';
    if(kind!=='Upaniṣad'||!ALL.has(name))return typeof previousOpen==='function'?previousOpen(button):false;
    if(name==='Kena'||name==='Chāndogya')return typeof previousOpen==='function'?previousOpen(button):false;
    if(PRINCIPAL_V17.has(name))return typeof previousOpen==='function'?previousOpen(button):false;
    return openAll(button,name);
  };

  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-up18-note]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.up18Note));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.up18-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('up18-style')){
    const st=document.createElement('style');st.id='up18-style';st.textContent=`
      .up18-article .ch-lead{min-height:360px}.up18-article .ch-section h3{margin-top:25px!important}.up18-article .ch-section p{margin-bottom:15px!important}.up18-article .ch-toc{max-width:690px!important}.up18-article .ch-toc>ol>li>ol{margin-top:3px!important;margin-bottom:5px!important}.up18-detail-list{margin:8px 0 18px 1.25em!important}.up18-detail-list li{margin:0 0 7px!important}.up18-table-wrap{clear:both;margin:14px 0 22px;overflow-x:auto}.up18-table{width:100%;border-collapse:collapse;background:#fff;font:13px/1.45 Merriweather,Georgia,serif}.up18-table th,.up18-table td{border:1px solid #a2a9b1;padding:8px 10px;text-align:left;vertical-align:top}.up18-table th{background:#eaecf0;font-weight:700}.up18-source-card{font-family:Merriweather,Georgia,serif!important}@media(max-width:760px){.up18-article .ch-lead{min-height:0}.up18-table{font-size:12.5px}}
    `;document.head.append(st);
  }
  window.SCRIPTURE_ALL_UPANISHADS_V18=true;
})();
