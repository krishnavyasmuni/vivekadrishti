/*
 * Unified 108-Upaniṣad research reader.
 * This file intentionally occupies the existing tail-loader path so the legacy
 * scripture index does not need another brittle script-order dependency.
 */
(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const R = window.SCRIPTURE_PRINCIPAL_RICH || {};
  const U = window.SCRIPTURE_UPANISHAD_UNITS || {};
  const previousOpen = window.openScriptureEncyclopedia;

  const GROUPS = {
    'Mukhya':['Aitareya','Kauṣītaki','Kena','Chāndogya','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya'],
    'Sāmānya Vedānta':['Ātmabodha','Mudgala','Vajrasūcī','Mahā','Sāvitrī','Garbha','Sarvasāra','Śukarahasya','Skanda','Śārīraka','Ekākṣara','Akṣi','Prāṇāgnihotra','Subāla','Mantrikā','Nirālamba','Paiṅgala','Adhyātma','Muktikā','Annapūrṇā','Sūrya','Ātma'],
    'Sannyāsa':['Nirvāṇa','Āruṇi','Maitreya','Sannyāsa','Kuṇḍikā','Brahma','Avadhūta','Kaṭharudra','Jābāla','Paramahaṃsa','Bhikṣuka','Turīyātītāvadhūta','Yājñavalkya','Śāṭyāyanīya','Nārada-Parivrājaka','Paramahaṃsa-Parivrājaka','Parabrahma'],
    'Yoga':['Nādabindu','Yogacūḍāmaṇi','Jābāladarśana','Amṛtabindu','Amṛtanāda','Kṣurikā','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Yogaśikhā','Yogakuṇḍalinī','Varāha','Haṃsa','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advayatāraka','Śāṇḍilya','Pāśupatabrahma','Mahāvākya'],
    'Vaiṣṇava':['Vāsudeva','Avyakta','Nārāyaṇa','Kali-Saṇṭāraṇa','Tārasāra','Nṛsiṃhatāpanī','Tripādvibhūti-Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Garuḍa'],
    'Śaiva':['Akṣamālikā','Rudrākṣajābāla','Jābāli','Kaivalya','Kālāgnirudra','Dakṣiṇāmūrti','Rudrahṛdaya','Pañcabrahma','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Śarabha','Bhasmajābāla','Gaṇapati'],
    'Śākta':['Tripurā','Saubhāgyalakṣmī','Bahvṛca','Sarasvatī-rahasya','Sītā','Tripurātāpinī','Devī','Bhāvanā']
  };
  const ALL = new Set(Object.values(GROUPS).flat());
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

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = value => String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const arr = value => Array.isArray(value) ? value.filter(Boolean) : (value ? [value] : []);
  const text = value => typeof value === 'string' ? value : (value?.text || value?.claim || value?.summary || value?.full || value?.short || value?.description || value?.note || value?.title || '');
  const uniq = values => {
    const seen = new Set();
    return values.flatMap(v => Array.isArray(v) ? v : [v]).map(text).map(v => String(v || '').trim()).filter(v => {
      const k = norm(v); if (!k || seen.has(k)) return false; seen.add(k); return true;
    });
  };
  const groupOf = name => Object.keys(GROUPS).find(group => GROUPS[group].includes(name)) || 'Upaniṣad';
  const dataFor = name => Object.assign({}, D[name] || {}, D[`Upaniṣad:${name}`] || {});

  function sourceObj(value){
    if (!value) return null;
    if (typeof value === 'string') return {title:value, detail:'', url:''};
    return {
      title:value.title || value.t || value.citation || value.name || 'Source',
      detail:value.detail || value.d || value.note || value.description || '',
      url:value.url || value.u || value.href || ''
    };
  }
  function safeUrl(url){ return /^https?:\/\//i.test(String(url || '')) ? String(url) : ''; }
  function uniqueSources(values){
    const seen = new Set();
    const out = [];
    values.map(sourceObj).filter(Boolean).forEach(s => {
      const key = norm(`${s.title} ${s.detail}`); if (!key || seen.has(key)) return; seen.add(key);
      s.url = safeUrl(s.url); out.push(s);
    });
    return out;
  }
  function sourcesFor(name,e,d){
    const group = groupOf(name);
    const sources = uniqueSources([
      ...arr(d?.sources),...arr(d?.refs),...arr(d?.bibliography),
      ...arr(e?.sources),...arr(e?.refs),...arr(e?.bibliography),...arr(e?.primarySources)
    ]);
    const add = s => {
      const candidate = sourceObj(s); if (!candidate) return;
      candidate.url = safeUrl(candidate.url);
      const key = norm(candidate.title); if (sources.some(x => norm(x.title) === key)) return;
      sources.push(candidate);
    };
    add({title:'Muktikā Upaniṣad — traditional 108-text canon',detail:'Used for the traditional sequence and Vedic affiliations of the 108-text Muktikā list. Canonical affiliation is not treated as a historical date of composition.',url:'https://sanskritdocuments.org/doc_upanishhat/upanishad_list.html'});
    add({title:'SanskritDocuments — Upaniṣad collection',detail:'Electronic Sanskrit witnesses and title cross-checking. Used as an access aid, not as a substitute for critical textual scholarship.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    add({title:'Upaniṣad Brahmayogin — commentarial corpus on the 108 Upaniṣads',detail:'Premodern/early modern commentarial witness used for the received 108-text corpus; edition witness rather than proof of the age of the root text.',url:'https://archive.org/details/108_Upanishads_with_Sanskrit_Commentary_of_Upanishad_Brahma_Yogin'});
    if (group === 'Mukhya') add({title:'Patrick Olivelle — The Early Upaniṣads: Annotated Text and Translation (Oxford University Press, 1998)',detail:'Sanskrit text, translation, variant readings, emendations and historical-philological discussion for the early Upaniṣads.',url:'https://academic.oup.com/book/50014'});
    if (group === 'Sannyāsa') add({title:'Patrick Olivelle — Samnyāsa Upaniṣads: Hindu Scriptures on Asceticism and Renunciation (Oxford University Press, 1992)',detail:'Translation and historical study of the renunciation Upaniṣads and ascetic institutions.',url:'https://academic.oup.com/book/50187'});
    return sources;
  }

  function specialistSections(e){
    return arr(e?.articleSections).map(section => ({
      title:section.title || section.t || '',
      paragraphs:uniq(section.paragraphs || section.ps || []),
      subs:arr(section.books || section.subs).map((sub,i) => ({
        title:sub.title || sub.h || (sub.number ? `${sub.number}` : `Section ${i+1}`),
        paragraphs:uniq([sub.summary,sub.text,sub.note,...arr(sub.paragraphs),...arr(sub.ps)])
      }))
    })).filter(s => s.title);
  }
  function principalSections(d){
    return arr(d?.sections).map(section => ({
      title:section.title || section.t || '',
      paragraphs:uniq(section.paragraphs || section.ps || []),
      subs:arr(section.subs).map((sub,i) => ({
        title:sub.title || sub.h || `Section ${i+1}`,
        paragraphs:uniq(sub.paragraphs || sub.ps || [])
      }))
    })).filter(s => s.title);
  }
  function unitSubs(name){
    return arr(U[name]).map((unit,i) => {
      if (Array.isArray(unit)) return {title:unit[0] || `Teaching ${i+1}`, paragraphs:uniq(unit[1] || [])};
      return {title:unit.title || unit.h || `Teaching ${i+1}`, paragraphs:uniq([unit.summary,unit.text,unit.note,...arr(unit.paragraphs),...arr(unit.ps)])};
    }).filter(u => u.paragraphs.length || u.title);
  }
  function matching(pool,re){ return pool.filter(s => re.test(s.title)); }
  function flatten(sections){ return uniq(sections.flatMap(s => [...(s.paragraphs || []),...(s.subs || []).flatMap(sub => sub.paragraphs || [])])); }
  function subsFrom(sections){
    const out = [];
    sections.forEach(s => {
      if (s.subs?.length) out.push(...s.subs);
      else if (s.paragraphs?.length) out.push({title:s.title, paragraphs:s.paragraphs});
    });
    const seen = new Set();
    return out.filter(sub => {
      const k=norm(sub.title); if(!k||seen.has(k))return false; seen.add(k); return true;
    });
  }

  function socialContext(group,name){
    const common = `The ${name} Upaniṣad is a normative religious text, not a demographic record. Prescriptions, ideals and literary social categories should not be converted directly into statistics about historical society.`;
    const map = {
      'Mukhya':'Its social world should be read in relation to late Vedic teaching, ritual specialists, householders, kings, students and renunciatory tendencies where the text itself supplies evidence.',
      'Sāmānya Vedānta':'Its historical value lies chiefly in later Vedānta pedagogy and contemplative discipline. Apparent continuity with early Vedic language does not by itself establish an early date.',
      'Sannyāsa':'Its prescriptions can illuminate the ideals, classifications and rites of renunciation, but those prescriptions must be distinguished from the full diversity of lived ascetic institutions.',
      'Yoga':'Its technical vocabulary can illuminate the history of yogic practice. Different Yoga Upaniṣads often represent different stages or syntheses, so techniques should not be projected backward as one timeless system.',
      'Vaiṣṇava':'Its deity-specific mantras, narratives and contemplative practices are evidence for later Vaiṣṇava scripturalization and reception, not evidence that every practice belongs to the oldest Vedic period.',
      'Śaiva':'Its Śaiva ritual and theological vocabulary should be situated within the history of later Śaiva traditions and the broader appropriation of Vedic authority.',
      'Śākta':'Its mantra, goddess and Śrīvidyā-related materials should be compared with wider Śākta and Tantric textual traditions rather than isolated from their later ritual context.'
    };
    return [map[group] || '', common].filter(Boolean);
  }

  function buildSections(name,e,d,sources){
    const pool = [...specialistSections(e),...principalSections(d)];
    const units = unitSubs(name);
    const group = groupOf(name);

    const dateMatches = matching(pool,/date|chronolog|textual identity|textual character|historical|period/i);
    const structureMatches = matching(pool,/structure|division|arrangement|architecture|book|chapter|section/i);
    const contentMatches = matching(pool,/content|walkthrough|teaching sequence|text and content|outline|synopsis/i);
    const doctrineMatches = matching(pool,/theolog|philosoph|doctrine|central teaching|teaching|metaphys|language.*interpret|method.*interpret|self|brahman|nondual|devotion/i);
    const editionMatches = matching(pool,/manuscript|recension|transmission|edition|veda affiliation|textual witness|critical/i);
    const receptionMatches = matching(pool,/reception|commentar|influence|later use|scholarship|legacy/i);
    const practiceMatches = matching(pool,/ritual|yoga|renunciation|ascetic|practice|dharma|social|ethic|caste|varna|mantra|worship|vrata|meditation/i);

    const dateParas = uniq([
      d?.date ? `Proposed date / range: ${d.date}.` : '',
      e?.period ? `Received-form chronology: ${e.period}.` : '',
      e?.milieu || '', e?.datingBasis ? `Dating basis: ${e.datingBasis}` : '',
      ...flatten(dateMatches),
      `Muktikā places ${name} at No. ${MUK[name] || '—'} and assigns it a Vedic affiliation. That canonical affiliation belongs to the received 108-text classification and is not, by itself, evidence for the historical date of composition.`
    ]);

    const structureParas = uniq([
      d?.structure ? `Structure: ${d.structure}` : '',
      e?.structure || '',e?.extent || '',
      ...flatten(structureMatches),
      units.length ? `The present research dossier resolves the received text into ${units.length} teaching unit${units.length===1?'':'s'} where the underlying data permits a section-by-section map.` : ''
    ]);

    const contentSubs = units.length ? units : subsFrom(contentMatches);
    const contentParas = uniq([
      ...flatten(contentMatches),
      contentSubs.length ? `The outline below follows the internal sequence of the received text rather than reducing it to a list of isolated famous quotations.` : '',
      !contentSubs.length ? `The available repository dossier currently describes the ${name} Upaniṣad thematically; future textual work should retain the exact order of the Sanskrit witness when a stable section division is available.` : ''
    ]);

    const doctrineParas = uniq([
      d?.doctrine || d?.theology || '',e?.doctrine || e?.theology || '',
      ...arr(e?.themes).map(t => text(t)),
      ...flatten(doctrineMatches),
      e?.significance || ''
    ]);

    const recensionText = arr(e?.primaryRecensions).map(r => `Recensional witness: ${text(r)}`);
    const editionParas = uniq([
      e?.manuscripts || '', e?.history || '',
      ...recensionText,
      ...flatten(editionMatches),
      `A responsible citation should identify the Sanskrit edition, recension or manuscript witness used. A late anthology, a Vedic affiliation in Muktikā, and a modern critical edition are three different kinds of evidence and must not be conflated.`,
      !/critical edition/i.test(flatten(editionMatches).join(' ')) ? `This dossier does not claim a stemmatic critical edition unless one is explicitly identified in the references below; absence of such a claim should not be read as proof that no scholarly edition exists.` : ''
    ]);

    const receptionParas = uniq([
      e?.reception || '',e?.significance || '',d?.reception || '',
      ...flatten(receptionMatches),
      `The text's inclusion in the Muktikā canon and in the Upaniṣad Brahmayogin commentarial corpus belongs to its reception history. Later Vedānta, Yoga or sectarian interpretation must be distinguished from the historical formation of the root text.`
    ]);

    const practiceParas = uniq([
      ...flatten(practiceMatches),
      ...socialContext(group,name)
    ]);

    const reading = sources.slice(0,10).map(s => `${s.title}${s.detail ? ` — ${s.detail}` : ''}`);

    return [
      {title:'Date of composition', paragraphs:dateParas},
      {title:'Structure', paragraphs:structureParas, subs:subsFrom(structureMatches).slice(0,8)},
      {title:'Contents', paragraphs:contentParas, subs:contentSubs},
      {title:'Philosophy and theology', paragraphs:doctrineParas},
      {title:'Manuscripts, recensions and critical editions', paragraphs:editionParas, subs:subsFrom(editionMatches).slice(0,8)},
      {title:'Influences, commentaries and reception', paragraphs:receptionParas, subs:subsFrom(receptionMatches).slice(0,8)},
      {title:'Ritual, yoga, renunciation and social history', paragraphs:practiceParas, subs:subsFrom(practiceMatches).slice(0,8)},
      {title:'Further reading', paragraphs:reading}
    ];
  }

  function leadFor(name,e,d){
    const group=groupOf(name);
    const leads=uniq([
      ...arr(d?.lead),...arr(d?.leadParagraphs),...arr(e?.lead),...arr(e?.leadParagraphs),
      e?.summary || '',
      `The ${name} Upaniṣad is treated here as a distinct textual witness within the traditional Muktikā collection of 108 Upaniṣads. This article separates historical composition, received Vedic affiliation, manuscript transmission, later commentary and modern scholarship rather than collapsing them into a single “date.”`,
      `Modern thematic classification places it in the ${group} group. That label is useful for navigation and reception history, but it does not imply that all texts in the group were composed together or share one historical author.`
    ]);
    return leads.slice(0,4);
  }

  function imageFor(e,d){
    const image=d?.image || e?.image || e?.artwork;
    const src=image?.src || image?.url || '';
    if(!safeUrl(src)) return null;
    return {src,href:safeUrl(image.href || image.page || image.url || src),caption:image.caption || image.cap || image.note || 'Textual witness.'};
  }

  function infobox(name,e,d,button){
    const group=groupOf(name), image=imageFor(e,d);
    const rows=[
      ['Muktikā no.',MUK[name] || '—'],
      ['Type',`${group} Upaniṣad`],
      ['Vedic affiliation',d?.veda || button?.dataset?.veda || e?.veda || 'See Muktikā tradition'],
      ['Date',d?.date || e?.period || 'Disputed / uncertain; see chronology'],
      ['Language',e?.language || d?.language || 'Sanskrit'],
      ['Structure',d?.structure || e?.structure || e?.extent || 'See structure section']
    ];
    const setting=d?.school || d?.setting || e?.textualSetting || e?.milieu || '';
    if(setting) rows.splice(4,0,['Historical school / setting',setting]);
    if(arr(e?.primaryRecensions).length) rows.splice(4,0,['Recensions',arr(e.primaryRecensions).map(text).join('; ')]);
    if(e?.traditionalAuthor) rows.push(['Traditional attribution',e.traditionalAuthor]);
    return `<aside class="up-research-infobox"><div class="up-research-infobox-title">${esc(name)} Upaniṣad</div>${image?`<figure><a href="${esc(image.href||image.src)}" target="_blank" rel="noopener"><img src="${esc(image.src)}" alt="" loading="lazy"></a>${image.caption?`<figcaption>${esc(image.caption)}</figcaption>`:''}</figure>`:''}${rows.map(([k,v])=>`<div class="up-research-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function paragraphHTML(p){ return p ? `<p>${esc(p)}</p>` : ''; }
  function subsectionHTML(sub,i,j){
    return `<section class="up-research-subsection" id="up-r-${i}-${j}"><h3>${esc(sub.title)}</h3>${(sub.paragraphs||[]).map(paragraphHTML).join('')}</section>`;
  }
  function detailsHTML(section,i){
    const body=(section.paragraphs||[]).map(paragraphHTML).join('')+(section.subs||[]).map((sub,j)=>subsectionHTML(sub,i,j)).join('');
    return `<details class="up-research-section" id="up-r-${i}"><summary><span>${esc(section.title)}</span><span class="up-research-chevron" aria-hidden="true">▾</span></summary><div class="up-research-section-body">${body}</div></details>`;
  }
  function referencesHTML(sources,index){
    return `<details class="up-research-section up-research-references" id="up-r-${index}" open><summary><span>References</span><span class="up-research-chevron" aria-hidden="true">▾</span></summary><div class="up-research-section-body"><ol>${sources.map((s,i)=>`<li id="up-ref-${i+1}"><span class="up-ref-num">${i+1}.</span> <strong>${esc(s.title)}</strong>${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></div></details>`;
  }
  function tocHTML(sections){
    return `<details class="up-research-toc" open><summary>Contents</summary><ol>${sections.map((s,i)=>`<li><a href="#up-r-${i}" data-up-open="up-r-${i}">${esc(s.title)}</a>${s.subs?.length?`<ol>${s.subs.map((sub,j)=>`<li><a href="#up-r-${i}-${j}" data-up-open="up-r-${i}">${esc(sub.title)}</a></li>`).join('')}</ol>`:''}</li>`).join('')}<li><a href="#up-r-${sections.length}" data-up-open="up-r-${sections.length}">References</a></li></ol></details>`;
  }

  let backdrop=null,reader=null;
  function closeResearch(){
    backdrop?.remove(); reader?.remove(); backdrop=reader=null;
    document.documentElement.classList.remove('up-research-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});
  }
  function closeLegacy(){
    document.querySelectorAll('.current-up-backdrop,.current-up-reader,.kena-article-backdrop,.kena-article-reader').forEach(el=>el.remove());
    document.documentElement.classList.remove('kena-article-open');
  }
  function openResearch(button,name){
    closeResearch(); closeLegacy();
    const e=dataFor(name),d=R[name]||{},sources=sourcesFor(name,e,d),sections=buildSections(name,e,d,sources);
    const title=d?.title || `${name} Upaniṣad`, deva=d?.deva || e?.sanskritTitle || DEVA[name] || '';
    button?.classList?.add('is-active'); button?.setAttribute?.('aria-pressed','true');
    backdrop=document.createElement('div'); backdrop.className='up-research-backdrop';
    reader=document.createElement('section'); reader.className='up-research-reader universal-wiki-reader';
    reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${title} research article`);
    reader.innerHTML=`<header class="up-research-head"><div><div class="up-research-eyebrow">Upaniṣad encyclopedia · Muktikā ${MUK[name]||'—'}/108</div><h1>${esc(title)}</h1>${deva?`<div class="up-research-dev">${esc(deva)}</div>`:''}</div><button class="up-research-close" type="button" aria-label="Close article">×</button></header><div class="up-research-scroll"><article class="upanishad-research-article">${infobox(name,e,d,button)}<div class="up-research-lead">${leadFor(name,e,d).map(paragraphHTML).join('')}</div><div class="up-research-method-note"><strong>Research method.</strong> Canonical affiliation, historical chronology, recension/manuscript evidence, commentary and modern scholarship are treated as separate evidentiary layers. Where no critical edition is identified, the article says so rather than inventing one.</div>${tocHTML(sections)}${sections.map(detailsHTML).join('')}${referencesHTML(sources,sections.length)}</article></div>`;
    document.body.append(backdrop,reader);document.documentElement.classList.add('up-research-open');
    reader.querySelector('.up-research-close')?.focus({preventScroll:true});
    return true;
  }

  window.openScriptureEncyclopedia=function(button){
    const name=button?.dataset?.name || button?.querySelector?.('span')?.textContent?.trim() || '';
    const kind=button?.dataset?.kind || '';
    if(kind==='Upaniṣad' && ALL.has(name)) return openResearch(button,name);
    return typeof previousOpen==='function' ? previousOpen(button) : false;
  };

  document.addEventListener('click',event=>{
    if(event.target===backdrop || event.target.closest?.('.up-research-close')){ closeResearch(); return; }
    const link=event.target.closest?.('.up-research-toc a[data-up-open]');
    if(link && reader?.contains(link)){
      event.preventDefault();
      const id=link.dataset.upOpen,target=document.getElementById(id);
      if(target?.tagName==='DETAILS') target.open=true;
      const anchor=document.getElementById((link.getAttribute('href')||'').replace(/^#/,'')) || target;
      anchor?.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&reader)closeResearch();});

  function enhanceIndex(){
    const holder=root.querySelector('.upanishad-holder');
    if(!holder) return;
    const stage=holder.closest('.browser-stage');
    if(stage && !stage.querySelector('.up-research-index-intro')){
      const intro=document.createElement('div');intro.className='up-research-index-intro';
      intro.innerHTML='<strong>Muktikā corpus: 108 Upaniṣads.</strong> The groups below are a navigational classification. Vedic affiliation in the received Muktikā list is shown separately from historical dating in each research article.';
      holder.insertAdjacentElement('beforebegin',intro);
    }
    holder.querySelectorAll('.upanishad-group').forEach((group,groupIndex)=>{
      if(group.dataset.upResearchIndex==='1') return;
      group.dataset.upResearchIndex='1';
      const h3=group.querySelector(':scope > h3'),grid=group.querySelector(':scope > .shastra-grid');
      if(h3&&grid){
        const label=Object.keys(GROUPS)[groupIndex] || h3.textContent.trim(),count=grid.querySelectorAll('.upanishad-name').length;
        const toggle=document.createElement('button');toggle.type='button';toggle.className='up-research-group-toggle';toggle.setAttribute('aria-expanded',groupIndex===0?'true':'false');
        toggle.innerHTML=`<span>${esc(label)}</span><small>${count} texts</small><b aria-hidden="true">▾</b>`;
        h3.textContent='';h3.append(toggle);
        if(groupIndex!==0) group.classList.add('is-collapsed');
        toggle.addEventListener('click',()=>{const collapsed=group.classList.toggle('is-collapsed');toggle.setAttribute('aria-expanded',collapsed?'false':'true');});
      }
      group.querySelectorAll('.upanishad-name').forEach(card=>{
        const name=card.dataset.name,small=card.querySelector('small'),span=card.querySelector('span'); if(!name||!small||small.dataset.upResearchMeta==='1')return;
        if(span) span.textContent=name;
        const veda=card.dataset.veda||small.textContent.trim(); small.textContent=`Muktikā ${MUK[name]||'—'} · ${veda}`;small.dataset.upResearchMeta='1';
      });
    });
  }
  enhanceIndex();
  new MutationObserver(enhanceIndex).observe(root,{childList:true,subtree:true});

  if(!document.getElementById('upanishad-wiki-research-style')){
    const style=document.createElement('style');style.id='upanishad-wiki-research-style';style.textContent=`
      html.up-research-open,html.up-research-open body{overflow:hidden!important}
      .up-research-backdrop{position:fixed;inset:0;z-index:10020;background:rgba(0,0,0,.38);backdrop-filter:blur(1px)}
      .up-research-reader{position:fixed;z-index:10021;inset:2.5vh 3vw;background:#fff;color:#202122;border:1px solid #a2a9b1;box-shadow:0 12px 48px rgba(0,0,0,.28);display:flex;flex-direction:column;max-width:1280px;margin:auto;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Lato,Helvetica,Arial,sans-serif}
      .up-research-head{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:18px 28px 15px;border-bottom:1px solid #a2a9b1;background:#fff}
      .up-research-eyebrow{font-size:12px;line-height:1.4;color:#54595d;text-transform:uppercase;letter-spacing:.055em;margin-bottom:4px}
      .up-research-head h1{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:38px;line-height:1.1;margin:0;color:#202122}
      .up-research-dev{font-family:"Noto Serif Devanagari","Nirmala UI",serif;color:#54595d;font-size:17px;margin-top:4px}
      .up-research-close{border:0;background:transparent;color:#54595d;font-size:34px;line-height:1;padding:0 3px;cursor:pointer}
      .up-research-close:hover{color:#202122;background:#eaecf0}
      .up-research-scroll{overflow:auto;padding:0 28px 36px}
      .upanishad-research-article{max-width:1120px;margin:0 auto;padding:22px 0 40px;font-size:15.7px;line-height:1.62;color:#202122}
      .upanishad-research-article p{margin:.65em 0 1em}
      .up-research-lead{font-size:16px;line-height:1.67}
      .up-research-infobox{float:right;clear:right;width:320px;margin:0 0 22px 30px;border:1px solid #a2a9b1;background:#f8f9fa;font-size:13px;line-height:1.45}
      .up-research-infobox-title{text-align:center;font-weight:700;font-size:16px;padding:8px;background:#eaecf0;border-bottom:1px solid #a2a9b1}
      .up-research-infobox figure{margin:0;border-bottom:1px solid #c8ccd1;background:#fff}
      .up-research-infobox img{display:block;width:100%;max-height:360px;object-fit:contain;background:#fff}
      .up-research-infobox figcaption{padding:5px 7px;color:#54595d;font-size:11px}
      .up-research-info-row{display:grid;grid-template-columns:112px 1fr;gap:8px;padding:5px 8px;border-top:1px solid #eaecf0}
      .up-research-info-row b{font-weight:600}
      .up-research-method-note{clear:left;max-width:720px;margin:14px 0 18px;padding:10px 12px;border-left:3px solid #a2a9b1;background:#f8f9fa;color:#54595d;font-size:13px;line-height:1.55}
      .up-research-toc{display:block;clear:left;width:min(720px,calc(100% - 360px));border:1px solid #a2a9b1;background:#f8f9fa;margin:18px 0 24px;font-size:13px}
      .up-research-toc>summary{font-weight:700;cursor:pointer;padding:8px 12px;list-style:none}
      .up-research-toc>summary::-webkit-details-marker{display:none}
      .up-research-toc>ol{margin:0;padding:0 12px 10px 36px}
      .up-research-toc ol ol{margin:2px 0 5px;padding-left:22px}
      .upanishad-research-article a{color:#36c;text-decoration:none}
      .upanishad-research-article a:hover{text-decoration:underline}
      .up-research-section{clear:both;border-top:1px solid #a2a9b1;margin:0}
      .up-research-section>summary{display:flex;justify-content:space-between;align-items:center;gap:16px;cursor:pointer;list-style:none;padding:12px 2px 9px;font-family:Georgia,"Times New Roman",serif;font-size:24px;line-height:1.2;color:#202122}
      .up-research-section>summary::-webkit-details-marker{display:none}
      .up-research-chevron{font-family:Arial,sans-serif;font-size:15px;color:#72777d;transition:transform .15s ease}
      .up-research-section[open] .up-research-chevron{transform:rotate(180deg)}
      .up-research-section-body{padding:0 4px 16px}
      .up-research-subsection h3{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:18px;font-weight:600;margin:19px 0 7px;border-bottom:1px solid #eaecf0;padding-bottom:3px}
      .up-research-references ol{padding-left:24px}
      .up-research-references li{margin:8px 0;font-size:13.5px;line-height:1.55}
      .up-ref-num{color:#54595d}
      .up-research-index-intro{max-width:980px;margin:8px 0 18px;padding:10px 12px;border:1px solid #a2a9b1;background:#f8f9fa;color:#202122;font:14px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .upanishad-holder .upanishad-group{border-top:1px solid #a2a9b1;margin:0!important;padding:0 0 10px!important;background:#fff!important}
      .upanishad-holder .upanishad-group>h3{margin:0!important;padding:0!important;background:#fff!important;border:0!important}
      .up-research-group-toggle{width:100%;display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:12px;border:0;background:#f8f9fa;color:#202122;text-align:left;padding:10px 12px;cursor:pointer;font:600 16px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .up-research-group-toggle small{font-size:12px;color:#72777d;font-weight:400}
      .up-research-group-toggle b{font-size:13px;color:#72777d;transition:transform .15s ease}
      .upanishad-group.is-collapsed .up-research-group-toggle b{transform:rotate(-90deg)}
      .upanishad-group.is-collapsed>.shastra-grid{display:none!important}
      .upanishad-holder .shastra-grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0!important;border-top:1px solid #eaecf0}
      .upanishad-holder .upanishad-name{display:block!important;width:100%;min-height:0!important;text-align:left!important;border:0!important;border-bottom:1px solid #eaecf0!important;background:#fff!important;padding:9px 11px!important;border-radius:0!important;box-shadow:none!important;color:#36c!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important}
      .upanishad-holder .upanishad-name span{display:block;color:#36c!important;font-size:14px!important;font-weight:400!important}
      .upanishad-holder .upanishad-name small{display:block;margin-top:2px;color:#72777d!important;font-size:11px!important;line-height:1.35!important;font-weight:400!important}
      .upanishad-holder .upanishad-name:hover{background:#f8f9fa!important;text-decoration:underline}
      .upanishad-holder .upanishad-name.is-active{background:#eaecf0!important;outline:2px solid #36c;outline-offset:-2px}
      @media(max-width:820px){
        .up-research-reader{inset:0;max-width:none;border:0}
        .up-research-head{padding:14px 16px 12px}.up-research-head h1{font-size:31px}.up-research-scroll{padding:0 16px 28px}
        .upanishad-research-article{padding-top:16px;font-size:15.4px}.up-research-infobox{float:none;width:100%;margin:0 0 18px}
        .up-research-toc{width:100%;max-width:none}.up-research-section>summary{font-size:22px}
        .upanishad-holder .shastra-grid{grid-template-columns:1fr!important}
      }
    `;document.head.append(style);
  }

  window.SCRIPTURE_UPANISHADS_RESEARCH_READER='wiki-research-v1';
})();