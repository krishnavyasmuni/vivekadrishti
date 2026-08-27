/*
 * Unified 108-Upaniṣad encyclopedia renderer.
 * Uses the exact Mahāpurāṇa visual/interaction template and the corpus-wide
 * scholarly research layer when available.
 */
(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const D = window.SCRIPTURE_DETAIL_DATA || {};
  const R = window.SCRIPTURE_PRINCIPAL_RICH || {};
  const U = window.SCRIPTURE_UPANISHAD_UNITS || {};
  const TITLES = ['Date of composition','Structure','Contents','Theology','Critical edition','Influences and reception','Rites, dharma and social history','Further reading','References'];

  const MUK = {
    'Īśāvāsya':1,'Kena':2,'Kaṭha':3,'Praśna':4,'Muṇḍaka':5,'Māṇḍūkya':6,'Taittirīya':7,'Aitareya':8,'Chāndogya':9,'Bṛhadāraṇyaka':10,
    'Brahma':11,'Kaivalya':12,'Jābāla':13,'Śvetāśvatara':14,'Haṃsa':15,'Āruṇi':16,'Garbha':17,'Nārāyaṇa':18,'Paramahaṃsa':19,'Amṛtabindu':20,
    'Amṛtanāda':21,'Atharvaśiras':22,'Atharvaśikhā':23,'Maitrāyaṇī':24,'Kauṣītaki':25,'Bṛhajjābāla':26,'Nṛsiṃhatāpanī':27,'Kālāgnirudra':28,'Maitreya':29,'Subāla':30,
    'Kṣurikā':31,'Mantrikā':32,'Sarvasāra':33,'Nirālamba':34,'Śukarahasya':35,'Vajrasūcī':36,'Tejobindu':37,'Nādabindu':38,'Dhyānabindu':39,'Brahmavidyā':40,
    'Yogatattva':41,'Ātmabodha':42,'Nārada-Parivrājaka':43,'Triśikhi-Brāhmaṇa':44,'Sītā':45,'Yogacūḍāmaṇi':46,'Nirvāṇa':47,'Maṇḍala-Brāhmaṇa':48,'Dakṣiṇāmūrti':49,'Śarabha':50,
    'Skanda':51,'Tripādvibhūti-Mahānārāyaṇa':52,'Advayatāraka':53,'Rāmarahasya':54,'Rāmatāpanī':55,'Vāsudeva':56,'Mudgala':57,'Śāṇḍilya':58,'Paiṅgala':59,'Bhikṣuka':60,
    'Mahā':61,'Śārīraka':62,'Yogaśikhā':63,'Turīyātītāvadhūta':64,'Sannyāsa':65,'Paramahaṃsa-Parivrājaka':66,'Akṣamālikā':67,'Avyakta':68,'Ekākṣara':69,'Annapūrṇā':70,
    'Sūrya':71,'Akṣi':72,'Adhyātma':73,'Kuṇḍikā':74,'Sāvitrī':75,'Ātma':76,'Pāśupatabrahma':77,'Parabrahma':78,'Avadhūta':79,'Tripurātāpinī':80,
    'Devī':81,'Tripurā':82,'Kaṭharudra':83,'Bhāvanā':84,'Rudrahṛdaya':85,'Yogakuṇḍalinī':86,'Bhasmajābāla':87,'Rudrākṣajābāla':88,'Gaṇapati':89,'Jābāladarśana':90,
    'Tārasāra':91,'Mahāvākya':92,'Pañcabrahma':93,'Prāṇāgnihotra':94,'Gopālatāpanī':95,'Kṛṣṇa':96,'Yājñavalkya':97,'Varāha':98,'Śāṭyāyanīya':99,'Hayagrīva':100,
    'Dattātreya':101,'Garuḍa':102,'Kali-Saṇṭāraṇa':103,'Jābāli':104,'Saubhāgyalakṣmī':105,'Sarasvatī-rahasya':106,'Bahvṛca':107,'Muktikā':108
  };
  const DEVA = {
    Aitareya:'ऐतरेयोपनिषद्',Kauṣītaki:'कौषीतक्युपनिषद्',Kena:'केनोपनिषद्',Chāndogya:'छान्दोग्योपनिषद्',Maitrāyaṇī:'मैत्रायणीयोपनिषद्',Kaṭha:'कठोपनिषद्',Taittirīya:'तैत्तिरीयोपनिषद्',Śvetāśvatara:'श्वेताश्वतरोपनिषद्',Īśāvāsya:'ईशावास्योपनिषद्',Bṛhadāraṇyaka:'बृहदारण्यकोपनिषद्',Praśna:'प्रश्नोपनिषद्',Muṇḍaka:'मुण्डकोपनिषद्',Māṇḍūkya:'माण्डूक्योपनिषद्',Vajrasūcī:'वज्रसूच्युपनिषद्',Muktikā:'मुक्तिकोपनिषद्',Nārāyaṇa:'नारायणोपनिषद्',Gopālatāpanī:'गोपालतापनीयोपनिषद्',Devī:'देव्युपनिषद्',Kaivalya:'कैवल्योपनिषद्',Jābāla:'जाबालोपनिषद्'
  };

  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const txt = v => typeof v === 'string' ? v : (v?.text || v?.claim || v?.summary || v?.full || v?.short || v?.description || v?.note || v?.title || v?.t || v?.d || '');
  const norm = v => String(v || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
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
  const p = v => v ? `<p>${esc(txt(v))}</p>` : '';

  function fallbackResearch(name,e,r){
    const sourceObj=v=>{
      if(!v)return null;
      if(typeof v==='string')return{title:v,detail:'',url:''};
      return{title:v.title||v.t||v.citation||v.name||txt(v)||'Source',detail:v.detail||v.d||v.note||v.description||'',url:/^https?:\/\//i.test(String(v.url||v.u||v.href||''))?String(v.url||v.u||v.href):''};
    };
    const raw=[...arr(e.sources),...arr(e.refs),...arr(e.bibliography),...arr(e.primarySources),...arr(r.sources),...arr(r.refs),...arr(r.bibliography)];
    raw.push({title:'Muktikā Upaniṣad — traditional 108-text canon',detail:'Traditional sequence and Vedic affiliation only.',url:'https://sanskritdocuments.org/doc_upanishhat/upanishad_list.html'});
    raw.push({title:'SanskritDocuments — Upaniṣad collection',detail:'Electronic Sanskrit access aid.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    const refs=[],seen=new Set();raw.map(sourceObj).filter(Boolean).forEach(s=>{const k=norm(s.title);if(!k||seen.has(k))return;seen.add(k);refs.push(s);});
    const period=uniq([e.period,e.date,e.dating,e.datingBasis,e.history,r.period,r.date]);
    const structure=uniq([e.structure,e.extent,r.structure,r.extent,...arr(e.chapterMap),...arr(r.chapterMap)]);
    const contents=uniq([e.overview,e.summary,r.overview,r.summary,...arr(e.contents),...arr(e.keyContents),...arr(r.contents),...arr(r.keyContents)]);
    const theology=uniq([e.profile,e.theology,e.philosophy,r.profile,r.theology,r.philosophy,e.significance,r.significance,...arr(e.themes),...arr(r.themes)]);
    const critical=uniq([e.manuscripts,e.recensions,e.edition,e.criticalEdition,e.textualHistory,r.manuscripts,r.recensions,r.edition,r.criticalEdition]);
    const reception=uniq([e.reception,e.commentaries,e.significance,r.reception,r.commentaries,r.significance]);
    const social=uniq([e.ritualHistory,e.socialHistory,e.dharma,e.ritual,e.yoga,e.renunciation,r.ritualHistory,r.socialHistory,r.dharma,r.ritual,r.yoga,r.renunciation]);
    return {sections:{date:period,structure,contents,theology,critical,reception,social,further:refs.map(s=>s.title)},references:refs};
  }

  function makeLead(name,e,r){
    const lines = uniq([
      ...arr(r.lead),e.overview,e.summary,r.overview,r.summary,e.significance,r.significance
    ]).slice(0,3);
    if(lines.length) return lines.map(p).join('');
    return p(`${name} is one of the 108 Upaniṣads in the received Muktikā corpus. This research article separates later canonical affiliation from historical composition, manuscript transmission, doctrinal interpretation and reception.`);
  }

  function makeInfobox(name,button,e,r,research){
    const group = button.dataset.type || research?.group || e.group || e.type || 'Upaniṣad';
    const veda = button.dataset.veda || e.veda || r.veda || '';
    const deva = r.deva || e.deva || e.sanskritTitle || r.sanskritTitle || DEVA[name] || '';
    const rows = [
      ['Muktikā',`No. ${research?.muktika || MUK[name] || '—'}`],
      ['Type',group],
      ['Received Vedic affiliation',veda],
      ['Date',r.date || e.period || e.date || 'See Date of composition'],
      ['Textual setting',r.setting || e.textualSetting || e.setting || 'See article'],
      ['Structure',r.structure || e.structure || e.extent || 'See Structure']
    ].filter(([,v])=>v);
    return `<aside class="kena-infobox universal-infobox purana-full-infobox"><div class="kena-infobox-title">${esc(name)} Upaniṣad</div>${deva?`<div class="universal-devanagari" lang="sa-Deva">${esc(String(deva).split('/')[0].trim())}</div>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(txt(v))}</span></div>`).join('')}</aside>`;
  }

  function build(name,button){
    const e=dataFor(name),r=richFor(name);
    const research=window.UPANISHAD_RESEARCH_108?.[name] || fallbackResearch(name,e,r);
    const s=research.sections || {};
    const sectionData=[s.date,s.structure,s.contents,s.theology,s.critical,s.reception,s.social,s.further];
    const sectionHtml=sectionData.map((items,i)=>{
      const vals=uniq(items);
      const body=(vals.length?vals:[`Research note: the current dossier does not yet support a more precise claim under ${TITLES[i]}. The section is retained rather than filled with invented detail.`]).map(p).join('');
      return `<section class="kena-section purana-full-section mahapurana-collapse-section" id="up-live-${i+1}"><h2 role="button" tabindex="0" aria-expanded="false">${TITLES[i]}</h2><div class="mahapurana-collapse-body" hidden>${body}</div></section>`;
    }).join('');
    const refs=arr(research.references);
    const refsHtml=`<section class="kena-section purana-full-section mahapurana-collapse-section universal-references" id="up-live-9"><h2 role="button" tabindex="0" aria-expanded="false">References</h2><div class="mahapurana-collapse-body" hidden><ol>${refs.map(s=>`<li>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title||'Source')}</a>`:esc(s.title||'Source')}${s.detail?` — ${esc(s.detail)}`:''}</li>`).join('')}</ol></div></section>`;
    const toc=`<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${TITLES.map((t,i)=>`<li><a href="#up-live-${i+1}" data-up-target="up-live-${i+1}">${esc(t)}</a></li>`).join('')}</ol></nav>`;
    const deva=r.deva||e.deva||e.sanskritTitle||r.sanskritTitle||DEVA[name]||'';
    return `<article class="purana-full-article universal-wiki-article mahapurana-wiki-article upanishad-research-complete"><div class="mahapurana-main-title">${esc(name)} Upaniṣad</div>${deva?`<div class="mahapurana-devanagari" lang="sa-Deva">${esc(String(deva).split('/')[0].trim())}</div>`:''}${makeInfobox(name,button,e,r,research)}<div class="kena-lead">${makeLead(name,e,r)}</div>${toc}${sectionHtml}${refsHtml}</article>`;
  }

  let backdrop=null,reader=null,researchLoader=null;
  function close(){
    backdrop?.remove();reader?.remove();backdrop=reader=null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});
  }
  function clearLegacy(){
    document.querySelectorAll('.kena-article-backdrop,.scripture-wiki-backdrop,.current-up-backdrop,.up-research-backdrop,.chandogya-backdrop').forEach(x=>x.remove());
    document.querySelectorAll('.kena-article-reader,.scripture-wiki-reader,.current-up-reader,.up-research-reader,.chandogya-reader').forEach(x=>x.remove());
  }
  function ensureResearch(done){
    if(window.UPANISHAD_RESEARCH_108){done();return;}
    if(researchLoader){researchLoader.addEventListener('load',done,{once:true});return;}
    researchLoader=document.createElement('script');
    researchLoader.src='/vivekadrishti/assets/js/upanishads/current/research-108-complete.js?build=20260827-research108-1';
    researchLoader.async=false;
    researchLoader.addEventListener('load',done,{once:true});
    researchLoader.addEventListener('error',done,{once:true});
    document.head.append(researchLoader);
  }
  function open(button){
    const name=button.dataset.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim();
    if(!name)return false;
    close();clearLegacy();button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    backdrop=document.createElement('div');backdrop.className='kena-article-backdrop scripture-wiki-backdrop purana-full-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader purana-full-reader mahapurana-wiki-reader upanishad-mahapurana-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${name} Upaniṣad encyclopedia article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upaniṣad · encyclopedia article</span><h1>${esc(name)} Upaniṣad</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${build(name,button)}</div>`;
    document.body.append(backdrop,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }
  function setOpen(sec,state){
    const body=sec?.querySelector(':scope > .mahapurana-collapse-body'),h=sec?.querySelector(':scope > h2');if(!body||!h)return;
    sec.classList.toggle('is-open',state);body.hidden=!state;h.setAttribute('aria-expanded',state?'true':'false');
  }

  window.addEventListener('click',ev=>{
    const button=ev.target.closest?.('#scripture-browser .shastra-name[data-kind="Upaniṣad"]');
    if(!button)return;ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();ensureResearch(()=>open(button));
  },true);
  document.addEventListener('click',ev=>{
    if(ev.target===backdrop||ev.target.closest?.('.upanishad-mahapurana-reader .kena-article-close')){close();return;}
    const link=ev.target.closest?.('.upanishad-mahapurana-reader .kena-toc a[data-up-target]');
    if(link){ev.preventDefault();const sec=document.getElementById(link.dataset.upTarget);setOpen(sec,true);sec?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const h=ev.target.closest?.('.upanishad-mahapurana-reader .mahapurana-collapse-section > h2');
    if(h){ev.preventDefault();const sec=h.parentElement;setOpen(sec,!sec.classList.contains('is-open'));}
  },true);
  document.addEventListener('keydown',ev=>{
    if(ev.key==='Escape'&&reader){close();return;}
    const h=ev.target.closest?.('.upanishad-mahapurana-reader .mahapurana-collapse-section > h2');
    if(h&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();const sec=h.parentElement;setOpen(sec,!sec.classList.contains('is-open'));}
  },true);

  window.UPANISHAD_LIVE_TEMPLATE='mahapurana-exact-research-108-v2';
})();