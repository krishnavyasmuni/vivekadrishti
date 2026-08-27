/* Final live router: every Muktika Upanisad uses the approved Mahapurana article shell. */
(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;

  const D=window.SCRIPTURE_DETAIL_DATA||{};
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const U=window.SCRIPTURE_UPANISHAD_UNITS||{};
  const TITLES=['Date of composition','Structure','Contents','Theology','Critical edition','Influences and reception','Rites, dharma and social history','Further reading','References'];
  const MUK={
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
  const DEVA={Aitareya:'ऐतरेयोपनिषद्',Kauṣītaki:'कौषीतक्युपनिषद्',Kena:'केनोपनिषद्',Chāndogya:'छान्दोग्योपनिषद्',Maitrāyaṇī:'मैत्रायणीयोपनिषद्',Kaṭha:'कठोपनिषद्',Taittirīya:'तैत्तिरीयोपनिषद्',Śvetāśvatara:'श्वेताश्वतरोपनिषद्',Īśāvāsya:'ईशावास्योपनिषद्',Bṛhadāraṇyaka:'बृहदारण्यकोपनिषद्',Praśna:'प्रश्नोपनिषद्',Muṇḍaka:'मुण्डकोपनिषद्',Māṇḍūkya:'माण्डूक्योपनिषद्',Vajrasūcī:'वज्रसूच्युपनिषद्',Muktikā:'मुक्तिकोपनिषद्',Nārāyaṇa:'नारायणोपनिषद्',Gopālatāpanī:'गोपालतापनीयोपनिषद्',Devī:'देव्युपनिषद्',Kaivalya:'कैवल्योपनिषद्',Jābāla:'जाबालोपनिषद्'};

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const txt=v=>typeof v==='string'?v:(v?.text||v?.claim||v?.summary||v?.full||v?.short||v?.description||v?.note||v?.title||'');
  const norm=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const uniq=values=>{const seen=new Set();return values.flatMap(v=>Array.isArray(v)?v:[v]).map(txt).map(v=>String(v||'').trim()).filter(v=>{const k=norm(v);if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const dataFor=name=>Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});
  function nested(obj,name){
    if(!obj||typeof obj!=='object')return{};
    if(obj[name]&&typeof obj[name]==='object')return obj[name];
    for(const value of Object.values(obj)){
      if(value&&typeof value==='object'&&!Array.isArray(value)&&value[name])return value[name];
      if(Array.isArray(value)){const hit=value.find(x=>x&&typeof x==='object'&&(x.name===name||x.title===name));if(hit)return hit;}
    }
    return{};
  }
  const richFor=name=>Object.assign({},nested(R,name),nested(U,name));
  const p=v=>v?`<p>${esc(txt(v))}</p>`:'';
  function sourceObj(v){if(!v)return null;if(typeof v==='string')return{title:v,detail:'',url:''};return{title:v.title||v.citation||v.name||txt(v)||'Source',detail:v.detail||v.note||v.description||'',url:/^https?:\/\//i.test(v.url||v.href||'')?(v.url||v.href):''};}
  function sourcesFor(e,r){
    const raw=[...arr(e.sources),...arr(e.refs),...arr(e.bibliography),...arr(e.primarySources),...arr(r.sources),...arr(r.refs),...arr(r.bibliography)];
    raw.push({title:'Muktikā Upaniṣad — traditional 108-text canon',detail:'Traditional sequence and received Vedic affiliation; not used as a historical dating authority.',url:'https://sanskritdocuments.org/doc_upanishhat/upanishad_list.html'});
    raw.push({title:'SanskritDocuments — Upaniṣad collection',detail:'Electronic Sanskrit text/access cross-check.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    const out=[],seen=new Set();for(const v of raw){const s=sourceObj(v);if(!s)continue;const k=norm(s.title);if(!k||seen.has(k))continue;seen.add(k);out.push(s);}return out;
  }
  function articleSections(e,r){return [...arr(e.articleSections),...arr(r.articleSections)].filter(x=>x&&typeof x==='object');}
  function specialist(e,r,re){return articleSections(e,r).filter(s=>re.test(String(s.title||s.t||''))).flatMap(s=>[...arr(s.paragraphs||s.text),...arr(s.bullets),...arr(s.books).map(x=>txt(x))]);}
  function groupContext(group){
    if(/Sanny/i.test(group))return'Renunciation prescriptions are normative evidence for ascetic ideals and institutions, not a census of how all renouncers lived.';
    if(/Yoga/i.test(group))return'Yoga Upaniṣads preserve distinct techniques and strata; they should not be projected backward as one timeless, uniform yoga system.';
    if(/Vaiṣ/i.test(group))return'The text belongs to the later Vaiṣṇava scripturalization of Vedic authority; received Vedic affiliation does not by itself establish an early Vedic date.';
    if(/Śaiva|Shaiva/i.test(group))return'The text should be read within later Śaiva uses of Vedic authority while keeping canonical affiliation separate from historical composition.';
    if(/Śākta|Shakta/i.test(group))return'The text should be compared with Śākta, Tantric and Śrīvidyā traditions where relevant, without collapsing those traditions into a single date or school.';
    if(/Mukhya/i.test(group))return'The early Upaniṣadic social world includes ritual specialists, teachers, students, householders, kings and emerging renunciatory tendencies; prescriptive scenes remain literary evidence rather than demographic statistics.';
    return'This Upaniṣad is a normative religious text. Its ritual and social prescriptions are evidence for ideals and debates, not direct demographic records.';
  }
  function build(name,button){
    const e=dataFor(name),r=richFor(name),group=button.dataset.type||e.group||e.type||'Upaniṣad',veda=button.dataset.veda||e.veda||'';
    const sources=sourcesFor(e,r);
    const date=uniq([e.period,e.date,e.dating,e.datingBasis,e.history,e.milieu,r.period,r.date,r.datingBasis,...specialist(e,r,/date|chronolog|history|formation/i)]);
    const structure=uniq([e.structure,e.extent,e.booksCount,e.verseCount,r.structure,r.extent,...arr(e.chapterMap),...arr(r.chapterMap),...specialist(e,r,/structure|division|chapter|book|section/i)]);
    const contents=uniq([...arr(e.contents),...arr(e.keyContents),...arr(e.namedFeatures),...arr(r.contents),...arr(r.keyContents),...arr(r.namedFeatures),...specialist(e,r,/content|summary|text and contents|section by section/i)]);
    const theology=uniq([e.profile,e.theology,e.philosophy,r.profile,r.theology,r.philosophy,...arr(e.themes),...arr(e.teachings),...arr(r.themes),...arr(r.teachings),...specialist(e,r,/theolog|philosoph|doctrine|teaching|brahman|atman|ātman|bhakti/i)]);
    const critical=uniq([e.manuscripts,e.recensions,e.edition,e.criticalEdition,e.textualHistory,r.manuscripts,r.recensions,r.edition,r.criticalEdition,...arr(e.primaryRecensions),...arr(r.primaryRecensions),...specialist(e,r,/manuscript|recension|edition|transmission|textual/i)]);
    const reception=uniq([e.reception,e.significance,e.commentaries,r.reception,r.significance,r.commentaries,...arr(e.scholarlyPositions),...arr(e.scholarlyDebates),...arr(r.scholarlyPositions),...arr(r.scholarlyDebates),...specialist(e,r,/reception|commentar|influence|scholar/i)]);
    const social=uniq([e.ritualHistory,e.socialHistory,e.dharma,e.ritual,e.yoga,e.renunciation,r.ritualHistory,r.socialHistory,r.dharma,r.ritual,r.yoga,r.renunciation,...arr(e.rituals),...arr(e.social),...arr(r.rituals),...specialist(e,r,/ritual|dharma|social|yoga|renunc|sanny|rite|practice/i),groupContext(group)]);
    const further=sources.map(s=>s.title);
    const fallback=label=>`The current research dossier does not yet identify text-specific evidence for ${label.toLowerCase()}. This heading is retained so every Upaniṣad follows the same research template.`;
    const sectionData=[date,structure,contents,theology,critical,reception,social,further];
    const sectionHtml=sectionData.map((items,i)=>{
      let body='';const vals=uniq(items);if(vals.length)body=vals.map(x=>p(x)).join('');else body=p(fallback(TITLES[i]));
      if(i===4&&!critical.length)body+=p('No stemmatic critical edition is claimed here unless one is explicitly identified in the text-specific dossier.');
      return `<section class="kena-section purana-full-section mahapurana-collapse-section" id="up-live-${i+1}"><h2 role="button" tabindex="0" aria-expanded="false">${TITLES[i]}</h2><div class="mahapurana-collapse-body" hidden>${body}</div></section>`;
    }).join('');
    const refs=`<section class="kena-section purana-full-section mahapurana-collapse-section universal-references" id="up-live-9"><h2 role="button" tabindex="0" aria-expanded="false">References</h2><div class="mahapurana-collapse-body" hidden><ol>${sources.map(s=>`<li>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`:esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}</li>`).join('')}</ol></div></section>`;
    const lead=uniq([e.overview,e.summary,r.overview,r.summary,e.significance]).slice(0,2);
    const leadHtml=(lead.length?lead:[`${name} is one of the Upaniṣads represented in the Muktikā corpus. This article separates received canonical classification from historical dating and textual transmission.`]).map(p).join('');
    const rows=[['Muktikā',MUK[name]?`No. ${MUK[name]}`:''],['Type',group],['Received Vedic affiliation',veda],['Date',e.period||r.period||'See Date of composition'],['Language',e.language||r.language||'Sanskrit'],['Structure',e.structure||r.structure||'See Structure']].filter(x=>x[1]);
    const dev=e.sanskritTitle||r.sanskritTitle||DEVA[name]||'';
    const infobox=`<aside class="kena-infobox universal-infobox purana-full-infobox"><div class="kena-infobox-title">${esc(name)}</div>${dev?`<div class="universal-devanagari" lang="sa-Deva">${esc(String(dev).split('/')[0].trim())}</div>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(txt(v))}</span></div>`).join('')}</aside>`;
    const toc=`<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${TITLES.map((t,i)=>`<li><a href="#up-live-${i+1}" data-up-target="up-live-${i+1}">${esc(t)}</a></li>`).join('')}</ol></nav>`;
    return {html:`<article class="purana-full-article universal-wiki-article mahapurana-wiki-article"><div class="mahapurana-main-title">${esc(name)}</div>${dev?`<div class="mahapurana-devanagari" lang="sa-Deva">${esc(String(dev).split('/')[0].trim())}</div>`:''}${infobox}<div class="kena-lead">${leadHtml}</div>${toc}${sectionHtml}${refs}</article>`};
  }

  let backdrop=null,reader=null;
  function close(){backdrop?.remove();reader?.remove();backdrop=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}
  function clearLegacy(){document.querySelectorAll('.kena-article-backdrop,.scripture-wiki-backdrop,.current-up-backdrop,.up-research-backdrop').forEach(x=>x.remove());document.querySelectorAll('.kena-article-reader,.scripture-wiki-reader,.current-up-reader,.up-research-reader,.chandogya-reader').forEach(x=>x.remove());}
  function open(button){
    const name=button.dataset.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim();if(!name)return;
    close();clearLegacy();button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    const built=build(name,button);
    backdrop=document.createElement('div');backdrop.className='kena-article-backdrop scripture-wiki-backdrop purana-full-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader purana-full-reader mahapurana-wiki-reader upanishad-mahapurana-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${name} encyclopedia article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upaniṣad · encyclopedia article</span><h1>${esc(name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${built.html}</div>`;
    document.body.append(backdrop,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }
  function setOpen(sec,state){const body=sec?.querySelector(':scope > .mahapurana-collapse-body'),h=sec?.querySelector(':scope > h2');if(!body||!h)return;sec.classList.toggle('is-open',state);body.hidden=!state;h.setAttribute('aria-expanded',state?'true':'false');}

  window.addEventListener('click',ev=>{
    const button=ev.target.closest?.('#scripture-browser .shastra-name[data-kind="Upaniṣad"]');
    if(!button)return;ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();open(button);
  },true);
  document.addEventListener('click',ev=>{
    if(ev.target===backdrop||ev.target.closest?.('.upanishad-mahapurana-reader .kena-article-close')){close();return;}
    const link=ev.target.closest?.('.upanishad-mahapurana-reader .kena-toc a[data-up-target]');if(link){ev.preventDefault();const sec=document.getElementById(link.dataset.upTarget);setOpen(sec,true);sec?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const h=ev.target.closest?.('.upanishad-mahapurana-reader .mahapurana-collapse-section > h2');if(h){ev.preventDefault();const sec=h.parentElement;setOpen(sec,!sec.classList.contains('is-open'));}
  },true);
  document.addEventListener('keydown',ev=>{
    if(ev.key==='Escape'&&reader){close();return;}
    const h=ev.target.closest?.('.upanishad-mahapurana-reader .mahapurana-collapse-section > h2');if(h&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();const sec=h.parentElement;setOpen(sec,!sec.classList.contains('is-open'));}
  },true);

  window.UPANISHAD_LIVE_TEMPLATE='mahapurana-exact-v1';
})();