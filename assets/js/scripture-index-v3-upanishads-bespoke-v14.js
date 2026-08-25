(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const previousOpen=window.openScriptureEncyclopedia;
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||x?.title||'');
  const uniq=xs=>[...new Set(xs.map(plain).map(x=>String(x||'').trim()).filter(Boolean))];
  const roman=s=>String(s??'')
    .replace(/Ś/g,'Sh').replace(/ś/g,'sh').replace(/Ṣ/g,'Sh').replace(/ṣ/g,'sh')
    .replace(/Ṛ/g,'Ri').replace(/ṛ/g,'ri').replace(/Ṝ/g,'Ri').replace(/ṝ/g,'ri')
    .replace(/Ṅ/g,'Ng').replace(/ṅ/g,'ng').replace(/Ñ/g,'Ny').replace(/ñ/g,'ny')
    .replace(/Ṃ|Ṁ/g,'M').replace(/ṃ|ṁ/g,'m').replace(/Ḥ/g,'H').replace(/ḥ/g,'h')
    .replace(/Ṭ/g,'T').replace(/ṭ/g,'t').replace(/Ḍ/g,'D').replace(/ḍ/g,'d').replace(/Ṇ/g,'N').replace(/ṇ/g,'n')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC')
    .replace(/nyj/gi,'nj').replace(/jny/gi,'jn').replace(/ngkh/gi,'nkh').replace(/ngk/gi,'nk');

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
  const groupOf=n=>Object.keys(GROUPS).find(g=>GROUPS[g].includes(n))||'Upanishad';
  const key=n=>`Upaniṣad:${n}`;

  const commons=(file,caption)=>({file,src:`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`,href:`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,caption});
  const ART={
    Aitareya:commons('Aitareya Upanishad, Sanskrit, Rigveda, Devanagari script, 1865 CE manuscript.jpg','Aitareya Upanishad, Rigvedic Devanagari manuscript, 1865. Wikimedia Commons.'),
    Kauṣītaki:commons('Rigveda MS2097.jpg','Rigvedic manuscript tradition. Wikimedia Commons.'),
    Kaṭha:commons('Katha Upanishad, Sanskrit, Grantha script, Whish Manuscript Collection acquired 1836 CE.jpg','Katha Upanishad palm-leaf manuscript in Grantha script, Whish Collection, acquired 1836. Wikimedia Commons.'),
    Taittirīya:commons('Screenshot Taittiriya Upanishad.jpg','Taittiriya Upanishad manuscript page. Wikimedia Commons.'),
    Īśāvāsya:commons('MS Indic 37, Isa upanisad. Wellcome L0027330.jpg','Isha Upanishad manuscript. Wellcome Collection / Wikimedia Commons.'),
    Bṛhadāraṇyaka:commons('Brihadaranyaka upanishad adhyaya 1 folio 3b, pages 1r 1v 2r 2v, Schoenberg Center manuscript, Penn Library.jpg','Brihadaranyaka Upanishad manuscript folios, Penn Libraries. Wikimedia Commons.'),
    Māṇḍūkya:commons('Mandukya Upanisad verses 1-3, Atharvaveda, Sanskrit, Devanagari.jpg','Mandukya Upanishad opening verses in Devanagari. Wikimedia Commons.'),
    Vajrasūcī:commons('Vajrasuchi Upanishad sample i, Samaveda, Sanskrit, Devanagari script, 1728 CE manuscript.jpg','Vajrasuchi Upanishad manuscript, 1728. Wikimedia Commons.')
  };
  const GROUP_ART={
    'Sannyāsa':commons('Sannyasi’ a Saiva mendicant - Tashrih al-aqvam (1825), f.363v - BL Add. 27255.jpg','A Shaiva sannyasi, 1825, from Tashrih al-aqvam. British Library / Wikimedia Commons.'),
    'Yoga':commons('An old painting of an Indian Yogi, emphasizing the seven chakras with Sanskrit text.png','Indian yogi with a subtle-body diagram, c. 1880. Public-domain image on Wikimedia Commons.'),
    'Vaiṣṇava':commons('Vishnu Mandala.jpg','Mandala of Vishnu, Nepal, dated 1420. LACMA / Wikimedia Commons.'),
    'Śaiva':commons('Shiva Painting.jpg','Four-armed Shiva, Indian painting, c. 1800. Wellcome Collection / Wikimedia Commons.'),
    'Śākta':commons('Painting of a devi (goddess) among the flames, Mandi, Pahari, ca.1700–1725.png','Goddess among flames, Mandi, c. 1700–1725. Public-domain Pahari painting on Wikimedia Commons.')
  };

  const HINDU={title:'Hindupedia — Upanishads',detail:'Traditional Hindu classification of the Upanishadic corpus and received 108-text lists.',url:'https://www.hindupedia.com/en/Upani%E1%B9%A3ads'};
  const WIKI_URL={
    Aitareya:'https://en.wikipedia.org/wiki/Aitareya_Upanishad',Kauṣītaki:'https://en.wikipedia.org/wiki/Kaushitaki_Upanishad',Kena:'https://en.wikipedia.org/wiki/Kena_Upanishad',Maitrāyaṇī:'https://en.wikipedia.org/wiki/Maitrayaniya_Upanishad',Kaṭha:'https://en.wikipedia.org/wiki/Katha_Upanishad',Taittirīya:'https://en.wikipedia.org/wiki/Taittiriya_Upanishad',Śvetāśvatara:'https://en.wikipedia.org/wiki/Shvetashvatara_Upanishad',Īśāvāsya:'https://en.wikipedia.org/wiki/Isha_Upanishad',Bṛhadāraṇyaka:'https://en.wikipedia.org/wiki/Brihadaranyaka_Upanishad',Praśna:'https://en.wikipedia.org/wiki/Prashna_Upanishad',Muṇḍaka:'https://en.wikipedia.org/wiki/Mundaka_Upanishad',Māṇḍūkya:'https://en.wikipedia.org/wiki/Mandukya_Upanishad',
    Nādabindu:'https://en.wikipedia.org/wiki/Nadabindu_Upanishad',Yogacūḍāmaṇi:'https://en.wikipedia.org/wiki/Yogachudamani_Upanishad',Amṛtabindu:'https://en.wikipedia.org/wiki/Amritabindu_Upanishad',Kṣurikā:'https://en.wikipedia.org/wiki/Kshurika_Upanishad',Tejobindu:'https://en.wikipedia.org/wiki/Tejobindu_Upanishad',Dhyānabindu:'https://en.wikipedia.org/wiki/Dhyanabindu_Upanishad',Brahmavidyā:'https://en.wikipedia.org/wiki/Brahmavidya_Upanishad',Yogatattva:'https://en.wikipedia.org/wiki/Yogatattva_Upanishad',Yogaśikhā:'https://en.wikipedia.org/wiki/Yogashikha_Upanishad',Yogakuṇḍalinī:'https://en.wikipedia.org/wiki/Yoga-kundalini_Upanishad',Varāha:'https://en.wikipedia.org/wiki/Varaha_Upanishad',Haṃsa:'https://en.wikipedia.org/wiki/Hamsa_Upanishad',Maṇḍala-Brāhmaṇa:'https://en.wikipedia.org/wiki/Mandala-brahmana_Upanishad',Advayatāraka:'https://en.wikipedia.org/wiki/Advayataraka_Upanishad',Śāṇḍilya:'https://en.wikipedia.org/wiki/Shandilya_Upanishad',Pāśupatabrahma:'https://en.wikipedia.org/wiki/Pashupatabrahma_Upanishad',Mahāvākya:'https://en.wikipedia.org/wiki/Mahavakya_Upanishad',
    Nārāyaṇa:'https://en.wikipedia.org/wiki/Narayana_Upanishad',Kali-Saṇṭāraṇa:'https://en.wikipedia.org/wiki/Kali-Sa%E1%B9%87%E1%B9%AD%C4%81ra%E1%B9%87a_Upani%E1%B9%A3ad',Gopālatāpanī:'https://en.wikipedia.org/wiki/Gopala_Tapani_Upanishad',
    Rudrākṣajābāla:'https://en.wikipedia.org/wiki/Rudrakshajabala_Upanishad',Kaivalya:'https://en.wikipedia.org/wiki/Kaivalya_Upanishad',Atharvaśiras:'https://en.wikipedia.org/wiki/Atharvashiras_Upanishad',Gaṇapati:'https://en.wikipedia.org/wiki/Ganapati_Atharvasirsa',
    Saubhāgyalakṣmī:'https://en.wikipedia.org/wiki/Saubhagyalakshmi_Upanishad',Tripurātāpinī:'https://en.wikipedia.org/wiki/Tripuratapini_Upanishad',Devī:'https://en.wikipedia.org/wiki/Devi_Upanishad',Bhāvanā:'https://en.wikipedia.org/wiki/Bhavana_Upanishad',
    Vajrasūcī:'https://en.wikipedia.org/wiki/Vajrasuchi_Upanishad',Muktikā:'https://en.wikipedia.org/wiki/Muktik%C4%81',Jābāla:'https://en.wikipedia.org/wiki/Jabala_Upanishad'
  };

  const sourceObj=x=>{
    if(!x)return null;
    if(typeof x==='object')return{title:x.title||x.citation||x.text||x.claim||'Source',detail:x.detail||x.note||'',url:x.url||x.href||''};
    return{title:String(x),detail:'',url:''};
  };
  function sources(name,e,art){
    const raw=[];
    if(WIKI_URL[name])raw.push({title:`Wikipedia — ${roman(name)} Upanishad`,detail:'Text-specific chronology, structure, contents, manuscript history and reception.',url:WIKI_URL[name]});
    raw.push(HINDU);
    [...arr(e.sources),...arr(e.bibliography),...arr(e.primarySources)].forEach(x=>raw.push(sourceObj(x)));
    if(art)raw.push({title:'Wikimedia Commons — article image',detail:art.caption,url:art.href});
    const seen=new Set();return raw.filter(Boolean).filter(s=>{const k=(s.title+'|'+s.url).toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  }
  const cite=nums=>nums.map(n=>`<sup class="up14-cite"><button type="button" data-up14-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  function chooseRefs(ss,section,i){
    if(!ss.length)return[];
    const wiki=ss.findIndex(s=>/wikipedia/i.test(s.title));
    const hindu=ss.findIndex(s=>/hindupedia/i.test(s.title));
    const academic=ss.findIndex(s=>/olivelle|deussen|aiyar|ayyangar|warrier|sastri|radhakrishnan|upanishad brahmayogin|sprockhoff|edition|sanskrit/i.test(s.title));
    const out=[];
    if(/date|text|manuscript|recension|history|structure/i.test(section)&&wiki>=0)out.push(wiki+1);
    if(academic>=0)out.push(academic+1);
    if(!out.length&&wiki>=0)out.push(wiki+1);
    if(/reception|commentar|tradition|worship|ritual/i.test(section)&&hindu>=0)out.push(hindu+1);
    if(!out.length)out.push((i%ss.length)+1);
    return [...new Set(out)].slice(0,2);
  }
  const P=(text,refs=[])=>text?`<p>${esc(roman(plain(text)))}${cite(refs)}</p>`:'';
  const meaningfulTitle=t=>{
    const s=roman(String(t||'').trim());
    return s&&!/^(?:Teaching|Ascetic teaching|Unit|Part|Section)\s*\d+$/i.test(s)?s:'';
  };

  function info(button){const d=button.dataset;return{name:d.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim(),kind:d.kind||'',veda:d.veda||'',type:d.type||''};}
  function entry(name){return Object.assign({},D[name]||{},D[key(name)]||{});}
  function artFor(name){return ART[name]||GROUP_ART[groupOf(name)]||null;}
  function figure(a,cls='wiki-infobox-image'){return a?`<figure class="${cls}"><a href="${a.href}" target="_blank" rel="noopener"><img src="${a.src}" loading="lazy" alt=""></a><figcaption>${esc(a.caption)}</figcaption></figure>`:'';}

  function renderBooks(books,ss,sectionTitle,offset){
    return arr(books).map((b,i)=>{
      if(typeof b==='string')return P(b,chooseRefs(ss,sectionTitle,offset+i));
      const title=meaningfulTitle(b.title||b.name||'');
      const text=b.summary||b.text||b.description||'';
      return `<div class="up14-unit">${title?`<h3>${esc(title)}</h3>`:''}${P(text,chooseRefs(ss,sectionTitle,offset+i))}</div>`;
    }).join('');
  }
  function renderSection(s,ss,index){
    if(!s)return'';const title=roman(s.title||`Section ${index+1}`);let body='';
    arr(s.paragraphs||s.text).forEach((x,i)=>body+=P(x,chooseRefs(ss,title,index+i)));
    if(s.books)body+=renderBooks(s.books,ss,title,index+2);
    arr(s.subsections).forEach((sub,j)=>{
      const st=meaningfulTitle(sub.title)||roman(sub.title||'');if(st)body+=`<h3>${esc(st)}</h3>`;
      arr(sub.paragraphs||sub.text).forEach((x,k)=>body+=P(x,chooseRefs(ss,title,index+j+k)));
      if(sub.books)body+=renderBooks(sub.books,ss,title,index+j+4);
      arr(sub.bullets).forEach((x,k)=>body+=P(x,chooseRefs(ss,title,index+j+k+5)));
    });
    arr(s.bullets).forEach((x,i)=>body+=P(x,chooseRefs(ss,title,index+i+3)));
    if(!body)return'';
    const id=`up14-${String(index+1).padStart(2,'0')}`;
    return {id,title,html:`<section class="kena-section up14-section" id="${id}"><h2>${esc(title)}</h2>${body}</section>`};
  }

  function fallbackSections(name,e,ss){
    const sections=[];
    let date='';
    if(e.period)date+=P(e.period,chooseRefs(ss,'Date and composition',0));
    if(e.history)date+=P(e.history,chooseRefs(ss,'Date and composition',1));
    if(e.milieu)date+=P(e.milieu,chooseRefs(ss,'Date and composition',2));
    if(date)sections.push({title:'Date and composition',paragraphs:[] ,__html:date});
    const contents=uniq([e.structure,...arr(e.contents),...arr(e.keyContents),...arr(e.chapterMap)]);
    if(contents.length)sections.push({title:'Text and contents',paragraphs:contents});
    const teaching=uniq([e.profile,e.overview,e.significance,...arr(e.themes)]);
    if(teaching.length)sections.push({title:'Teaching and interpretation',paragraphs:teaching});
    const reception=uniq([e.reception,...arr(e.scholarlyDebates)]);
    if(reception.length)sections.push({title:'Commentaries and reception',paragraphs:reception});
    return sections.map((s,i)=>s.__html?{id:`up14-f-${i}`,title:s.title,html:`<section class="kena-section up14-section" id="up14-f-${i}"><h2>${esc(s.title)}</h2>${s.__html}</section>`}:renderSection(s,ss,i)).filter(Boolean);
  }

  function compact(v,max=120){const s=roman(String(v||'').replace(/\s+/g,' ').trim());return s.length>max?s.slice(0,max-1).trim()+'…':s;}
  function infobox(name,e,i,ss,art){
    const rows=[];rows.push(['Type',roman(groupOf(name))]);
    rows.push(['Muktika no.',String(ORDER.indexOf(name)+1)]);
    if(i.veda)rows.push(['Veda',roman(i.veda));
    else if(e.veda)rows.push(['Veda',roman(e.veda));
    if(e.traditionalAuthor)rows.push(['School / frame',compact(e.traditionalAuthor,80)]);
    if(e.period)rows.push(['Date',compact(e.period,115)]);
    if(e.extent)rows.push(['Structure',compact(e.extent,130)]);
    else if(e.structure)rows.push(['Structure',compact(e.structure,130)]);
    if(e.primaryRecensions)rows.push(['Recensions',compact(arr(e.primaryRecensions).join('; '),145)]);
    rows.push(['Language',roman(e.language||'Sanskrit')]);
    rows.push(['Sources',String(ss.length)]);
    const dev=e.sanskritTitle?String(e.sanskritTitle).split('/')[0].trim():'';
    return `<aside class="kena-infobox up14-infobox"><div class="kena-infobox-title">${esc(roman(name))} Upanishad</div>${dev?`<div class="up14-dev">${esc(dev)}</div>`:''}${figure(art)}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }
  function lead(name,e,ss){
    const xs=uniq([...arr(e.leadParagraphs),e.lead,e.overview,e.significance]).slice(0,3);
    if(xs.length)return xs.map((x,i)=>P(x,chooseRefs(ss,'Lead',i))).join('');
    return P(`${roman(name)} Upanishad belongs to the ${roman(groupOf(name))} group in the Muktika canon.`,chooseRefs(ss,'Lead',0));
  }
  function refsHtml(ss){return `<section class="kena-section up14-references" id="up14-references"><h2>References</h2><ol>${ss.map((s,i)=>`<li id="up14-ref-${i+1}"><b>${i+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;}

  let shade=null,reader=null,currentSources=[];
  function close(){shade?.remove();reader?.remove();shade=reader=null;document.querySelector('.up14-source-card')?.remove();document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}
  function showSource(n){const s=currentSources[n-1];if(!s)return;document.querySelector('.up14-source-card')?.remove();const card=document.createElement('aside');card.className='itihasa-source-card up14-source-card';card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.title)}</strong>${s.detail?`<p>${esc(s.detail)}</p>`:''}${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(card);card.querySelector('.itihasa-source-close')?.addEventListener('click',()=>card.remove());}

  function open(button){
    const i=info(button);if(i.kind!=='Upaniṣad')return typeof previousOpen==='function'?previousOpen(button):false;
    if(i.name==='Chāndogya'||i.name==='Kena')return typeof previousOpen==='function'?previousOpen(button):false;
    close();button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    const e=entry(i.name),art=artFor(i.name),ss=sources(i.name,e,art);currentSources=ss;
    let sections=arr(e.articleSections).map((s,n)=>renderSection(s,ss,n)).filter(Boolean);
    if(!sections.length)sections=fallbackSections(i.name,e,ss);
    sections.push({id:'up14-references',title:'References',html:refsHtml(ss)});
    const toc=sections.map(s=>`<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('');
    const dev=e.sanskritTitle?String(e.sanskritTitle).split('/')[0].trim():'';
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up14-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up14-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${roman(i.name)} Upanishad article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(roman(i.name))} Upanishad</h1>${dev?`<div class="up14-title-dev">${esc(dev)}</div>`:''}</div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article up14-article">${infobox(i.name,e,i,ss,art)}<div class="kena-lead up14-lead">${lead(i.name,e,ss)}</div><nav class="kena-toc up14-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>${sections.map(s=>s.html).join('')}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }

  document.addEventListener('click',e=>{const b=e.target.closest?.('.up14-cite button');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.up14Note));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.up14-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('upanishads-bespoke-v14-style')){
    const st=document.createElement('style');st.id='upanishads-bespoke-v14-style';st.textContent=`
      .up14-reader{max-width:1160px!important;background:#f7f4ee!important}.up14-reader .kena-article-head{background:#fbfaf7!important;border-bottom:1px solid rgba(74,66,56,.16)!important;padding-bottom:17px!important}.up14-reader .kena-article-head h1{margin:0 0 2px!important;color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:40px!important;font-weight:400!important;line-height:1.08!important}.up14-title-dev,.up14-dev{color:#746b61;font-family:'Noto Serif Devanagari','Nirmala UI',serif;font-size:17px;line-height:1.3;margin:1px 0 4px}.up14-reader .kena-article-head .eyebrow{color:#7a7168!important;font-family:Merriweather,Georgia,serif!important;font-size:11px!important;letter-spacing:.08em!important}.up14-reader .kena-article-scroll{background:#fbfaf7!important}.up14-article{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important}.up14-article p,.up14-article li{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:16.1px!important;line-height:1.67!important;font-weight:400!important}.up14-article p{margin:0 0 17px!important}.up14-lead p{font-size:16.5px!important;line-height:1.69!important}.up14-section{margin-top:29px!important}.up14-section h2,.up14-references h2{margin:30px 0 15px!important;padding:0 0 6px!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:28px!important;font-weight:400!important;line-height:1.18!important;border-bottom:1px solid rgba(0,120,122,.32)!important}.up14-section h3{margin:22px 0 9px!important;color:#4a433b!important;font-family:Vollkorn,Georgia,serif!important;font-size:21px!important;font-weight:500!important;line-height:1.24!important}.up14-article a,.up14-toc a{color:#5b3ec4!important;text-decoration:none!important}.up14-article a:hover{text-decoration:underline!important}.up14-cite{vertical-align:super}.up14-cite button{border:0;background:transparent;color:#5b3ec4;padding:0 1px;font:600 10px/1 Merriweather,Georgia,serif;cursor:pointer}.up14-infobox{width:320px!important;background:#f4f1eb!important;color:#3c362e!important;border:1px solid rgba(92,82,70,.30)!important;font-family:Merriweather,Georgia,serif!important}.up14-infobox .kena-infobox-title{background:rgba(0,111,113,.075)!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:22px!important;font-weight:500!important}.up14-infobox .kena-info-row,.up14-infobox .kena-info-row b,.up14-infobox .kena-info-row span{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:12.5px!important;line-height:1.42!important}.up14-infobox .wiki-infobox-image{margin:6px 0 8px!important;padding:3px!important;background:#fbfaf7!important;border:1px solid rgba(92,82,70,.20)!important}.up14-infobox .wiki-infobox-image img{display:block;width:100%;height:auto;max-height:300px;object-fit:contain}.up14-infobox .wiki-infobox-image figcaption{padding:5px;color:#746b61;font:11.5px/1.42 Merriweather,Georgia,serif}.up14-toc{background:#f5f1ea!important;color:#3c362e!important;border:1px solid rgba(92,82,70,.24)!important;font-family:Merriweather,Georgia,serif!important}.up14-toc .kena-toc-title{color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:20px!important;font-weight:400!important}.up14-unit{margin:0 0 20px}.up14-unit h3{margin-bottom:7px!important}.up14-unit p{margin-bottom:9px!important}.up14-references ol{padding-left:1.25em!important}.up14-references li{margin:0 0 10px!important;font-size:14px!important;line-height:1.55!important;color:#5f574e!important}.up14-source-card{font-family:Merriweather,Georgia,serif!important;color:#3c362e!important}.up14-source-card a{color:#5b3ec4!important}@media(max-width:760px){.up14-infobox{width:100%!important;float:none!important;margin:0 0 18px!important}.up14-reader .kena-article-head h1{font-size:34px!important}.up14-article p,.up14-article li{font-size:15.8px!important;line-height:1.65!important}.up14-section h2,.up14-references h2{font-size:26px!important}.up14-section h3{font-size:20px!important}}
    `;document.head.append(st);
  }
  window.openScriptureEncyclopedia=function(button){const i=info(button);if(i.kind==='Upaniṣad')return open(button);return typeof previousOpen==='function'?previousOpen(button):false;};
  window.SCRIPTURE_UPANISHADS_BESPOKE_V14=true;
})();