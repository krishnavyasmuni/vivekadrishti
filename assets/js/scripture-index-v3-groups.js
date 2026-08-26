(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const nav = root.querySelector('.corpus-nav');
  const stage = root.querySelector('.browser-stage');
  if (!nav || !stage) return;

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));

  const vedaCorpus = [
    {name:'Ṛgveda',sections:{
      'Saṃhitā':[['Śākala Saṃhitā','Śākala'],['Bāṣkala Saṃhitā','Bāṣkala']],
      'Brāhmaṇa':[['Aitareya Brāhmaṇa','Aitareya / Śākala'],['Kauṣītaki (Śāṅkhāyana) Brāhmaṇa','Kauṣītaki / Śāṅkhāyana']],
      'Āraṇyaka':[['Aitareya Āraṇyaka','Aitareya'],['Kauṣītaki (Śāṅkhāyana) Āraṇyaka','Kauṣītaki / Śāṅkhāyana']]
    }},
    {name:'Sāmaveda',sections:{
      'Saṃhitā':[['Kauthuma Saṃhitā','Kauthuma'],['Rāṇāyanīya Saṃhitā','Rāṇāyanīya'],['Jaiminīya (Talavakāra) Saṃhitā','Jaiminīya / Talavakāra']],
      'Brāhmaṇa':[['Tāṇḍya (Pañcaviṃśa) Brāhmaṇa','Kauthuma'],['Ṣaḍviṃśa Brāhmaṇa','Kauthuma'],['Sāmavidhāna Brāhmaṇa','Kauthuma'],['Ārṣeya Brāhmaṇa','Kauthuma'],['Daivata Brāhmaṇa','Kauthuma'],['Chāndogya (Mantra) Brāhmaṇa','Kauthuma'],['Saṃhitopaniṣad Brāhmaṇa','Kauthuma'],['Vaṃśa Brāhmaṇa','Kauthuma'],['Jaiminīya Brāhmaṇa','Jaiminīya'],['Jaiminīya Ārṣeya Brāhmaṇa','Jaiminīya'],['Jaiminīya Upaniṣad Brāhmaṇa','Jaiminīya / Talavakāra']],
      'Āraṇyaka':[['Talavakāra (Jaiminīya-Upaniṣad) Āraṇyaka','Jaiminīya / Talavakāra'],['Chāndogya Āraṇyaka','Kauthuma']]
    }},
    {name:'Śukla Yajurveda',sections:{
      'Saṃhitā':[['Vājasaneyi Saṃhitā (Mādhyandina)','Mādhyandina'],['Vājasaneyi Saṃhitā (Kāṇva)','Kāṇva']],
      'Brāhmaṇa':[['Śatapatha Brāhmaṇa (Mādhyandina)','Mādhyandina'],['Śatapatha Brāhmaṇa (Kāṇva)','Kāṇva']],
      'Āraṇyaka':[['Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Mādhyandina)','Mādhyandina'],['Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Kāṇva)','Kāṇva']]
    }},
    {name:'Kṛṣṇa Yajurveda',sections:{
      'Saṃhitā':[['Taittirīya Saṃhitā','Taittirīya'],['Maitrāyaṇī Saṃhitā','Maitrāyaṇī'],['Kāṭhaka Saṃhitā','Kāṭhaka'],['Kapiṣṭhala-Kaṭha Saṃhitā','Kapiṣṭhala-Kaṭha']],
      'Brāhmaṇa':[['Taittirīya Brāhmaṇa','Taittirīya'],['Vādhūla Brāhmaṇa / Anvākhyāna','Vādhūla']],
      'Āraṇyaka':[['Taittirīya Āraṇyaka','Taittirīya'],['Maitrāyaṇīya Āraṇyaka','Maitrāyaṇī']]
    }},
    {name:'Atharvaveda',sections:{
      'Saṃhitā':[['Śaunaka Saṃhitā','Śaunaka'],['Paippalāda Saṃhitā','Paippalāda']],
      'Brāhmaṇa':[['Gopatha Brāhmaṇa','Atharvaveda']],
      'Āraṇyaka':[]
    }}
  ];

  const upanishads = {
    'Mukhya':[['Aitareya','Ṛgveda'],['Kauṣītaki','Ṛgveda'],['Kena','Sāmaveda'],['Chāndogya','Sāmaveda'],['Maitrāyaṇī','Sāmaveda'],['Kaṭha','Kṛṣṇa Yajurveda'],['Taittirīya','Kṛṣṇa Yajurveda'],['Śvetāśvatara','Kṛṣṇa Yajurveda'],['Īśāvāsya','Śukla Yajurveda'],['Bṛhadāraṇyaka','Śukla Yajurveda'],['Praśna','Atharvaveda'],['Muṇḍaka','Atharvaveda'],['Māṇḍūkya','Atharvaveda']],
    'Sāmānya Vedānta':[['Ātmabodha','Ṛgveda'],['Mudgala','Ṛgveda'],['Vajrasūcī','Sāmaveda'],['Mahā','Sāmaveda'],['Sāvitrī','Sāmaveda'],['Garbha','Kṛṣṇa Yajurveda'],['Sarvasāra','Kṛṣṇa Yajurveda'],['Śukarahasya','Kṛṣṇa Yajurveda'],['Skanda','Kṛṣṇa Yajurveda'],['Śārīraka','Kṛṣṇa Yajurveda'],['Ekākṣara','Kṛṣṇa Yajurveda'],['Akṣi','Kṛṣṇa Yajurveda'],['Prāṇāgnihotra','Kṛṣṇa Yajurveda'],['Subāla','Śukla Yajurveda'],['Mantrikā','Śukla Yajurveda'],['Nirālamba','Śukla Yajurveda'],['Paiṅgala','Śukla Yajurveda'],['Adhyātma','Śukla Yajurveda'],['Muktikā','Śukla Yajurveda'],['Annapūrṇā','Atharvaveda'],['Sūrya','Atharvaveda'],['Ātma','Atharvaveda']],
    'Sannyāsa':[['Nirvāṇa','Ṛgveda'],['Āruṇi','Sāmaveda'],['Maitreya','Sāmaveda'],['Sannyāsa','Sāmaveda'],['Kuṇḍikā','Sāmaveda'],['Brahma','Kṛṣṇa Yajurveda'],['Avadhūta','Kṛṣṇa Yajurveda'],['Kaṭharudra','Kṛṣṇa Yajurveda'],['Jābāla','Śukla Yajurveda'],['Paramahaṃsa','Śukla Yajurveda'],['Bhikṣuka','Śukla Yajurveda'],['Turīyātītāvadhūta','Śukla Yajurveda'],['Yājñavalkya','Śukla Yajurveda'],['Śāṭyāyanīya','Śukla Yajurveda'],['Nārada-Parivrājaka','Atharvaveda'],['Paramahaṃsa-Parivrājaka','Atharvaveda'],['Parabrahma','Atharvaveda']],
    'Yoga':[['Nādabindu','Ṛgveda'],['Yogacūḍāmaṇi','Sāmaveda'],['Jābāladarśana','Sāmaveda'],['Amṛtabindu','Kṛṣṇa Yajurveda'],['Amṛtanāda','Kṛṣṇa Yajurveda'],['Kṣurikā','Kṛṣṇa Yajurveda'],['Tejobindu','Kṛṣṇa Yajurveda'],['Dhyānabindu','Kṛṣṇa Yajurveda'],['Brahmavidyā','Kṛṣṇa Yajurveda'],['Yogatattva','Kṛṣṇa Yajurveda'],['Yogaśikhā','Kṛṣṇa Yajurveda'],['Yogakuṇḍalinī','Kṛṣṇa Yajurveda'],['Varāha','Kṛṣṇa Yajurveda'],['Haṃsa','Śukla Yajurveda'],['Triśikhi-Brāhmaṇa','Śukla Yajurveda'],['Maṇḍala-Brāhmaṇa','Śukla Yajurveda'],['Advayatāraka','Śukla Yajurveda'],['Śāṇḍilya','Atharvaveda'],['Pāśupatabrahma','Atharvaveda'],['Mahāvākya','Atharvaveda']],
    'Vaiṣṇava':[['Vāsudeva','Sāmaveda'],['Avyakta','Sāmaveda'],['Nārāyaṇa','Kṛṣṇa Yajurveda'],['Kali-Saṇṭāraṇa','Kṛṣṇa Yajurveda'],['Tārasāra','Śukla Yajurveda'],['Nṛsiṃhatāpanī','Atharvaveda'],['Tripādvibhūti-Mahānārāyaṇa','Atharvaveda'],['Rāmarahasya','Atharvaveda'],['Rāmatāpanī','Atharvaveda'],['Gopālatāpanī','Atharvaveda'],['Kṛṣṇa','Atharvaveda'],['Hayagrīva','Atharvaveda'],['Dattātreya','Atharvaveda'],['Garuḍa','Atharvaveda']],
    'Śaiva':[['Akṣamālikā','Ṛgveda'],['Rudrākṣajābāla','Sāmaveda'],['Jābāli','Sāmaveda'],['Kaivalya','Kṛṣṇa Yajurveda'],['Kālāgnirudra','Kṛṣṇa Yajurveda'],['Dakṣiṇāmūrti','Kṛṣṇa Yajurveda'],['Rudrahṛdaya','Kṛṣṇa Yajurveda'],['Pañcabrahma','Kṛṣṇa Yajurveda'],['Atharvaśiras','Atharvaveda'],['Atharvaśikhā','Atharvaveda'],['Bṛhajjābāla','Atharvaveda'],['Śarabha','Atharvaveda'],['Bhasmajābāla','Atharvaveda'],['Gaṇapati','Atharvaveda']],
    'Śākta':[['Tripurā','Ṛgveda'],['Saubhāgyalakṣmī','Ṛgveda'],['Bahvṛca','Ṛgveda'],['Sarasvatī-rahasya','Kṛṣṇa Yajurveda'],['Sītā','Atharvaveda'],['Tripurātāpinī','Atharvaveda'],['Devī','Atharvaveda'],['Bhāvanā','Atharvaveda']]
  };

  const upanishadGroupClass = {'Mukhya':'up-mukhya','Sāmānya Vedānta':'up-samanya','Sannyāsa':'up-sannyasa','Yoga':'up-yoga','Vaiṣṇava':'up-vaisnava','Śaiva':'up-saiva','Śākta':'up-sakta'};

  const smriti = {
    'Yājñavalkya Smṛti':{source:'Yājñavalkya Smṛti 1.4–5',items:['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha']},
    'Parāśara Smṛti':{source:'Parāśara Smṛti 1.12–15',items:['Manu','Vasiṣṭha','Kāśyapa','Garga','Gautama','Uśanas','Atri','Viṣṇu','Saṃvarta','Dakṣa','Aṅgiras','Śātātapa','Hārīta','Yājñavalkya','Āpastamba','Śaṅkha','Likhita','Kātyāyana','Pracetas']},
    'Padma Purāṇa':{source:'Padma Purāṇa, Uttarakhāṇḍa 263.86–90 (Ānandāśrama)',groups:{'Sāttvika':['Vāsiṣṭha','Hārīta','Vyāsa','Pārāśara','Bhāradvāja','Kāśyapa'],'Rājasa':['Yājñavalkya','Ātreya','Taittira','Dakṣa','Kātyāyana','Vaiṣṇava'],'Tāmasa':['Gautama','Bārhaspatya','Sāṃvarta','Yama','Śaṅkha','Auśanasa']}}
  };

  const mahaWitnesses = [
    {source:'Śrīmad Bhāgavata 12.7.22–24',items:['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa']},
    {source:'Vāyu Purāṇa colophon — mahāpurāṇa',items:['Vāyu Purāṇa']},
    {source:'Devī Bhāgavata colophons — mahāpurāṇa',items:['Devī Bhāgavata Purāṇa']},
    {source:'Mahābhāgavata ch. 81 colophon — mahāpurāṇa',items:['Mahābhāgavata Purāṇa']}
  ];

  const upaWitnesses = [
    {source:'Devī Bhāgavata 1.3.13–16',items:['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nāradīya Purāṇa','Śiva Purāṇa','Daurvāsasa Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Sāmba Purāṇa','Nandikṛta Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Āditya Purāṇa','Māheśvara Purāṇa','Bhāgavata Purāṇa','Vāsiṣṭha Purāṇa']},
    {source:'Kūrma Purāṇa 1.1.17–20',items:['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Vāmana Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa']},
    {source:'Padma Purāṇa, Pātāla-khaṇḍa 111.94b–98',items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Āṇḍa Purāṇa','Daurvāsasa Purāṇa','Another Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Another Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśa Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Kaumāra Purāṇa']},
    {source:'Bṛhaddharma Purāṇa 1.25.23–26',items:['Ādi Purāṇa','Āditya Purāṇa','Bṛhannāradīya Purāṇa','Nāradīya Purāṇa','Nandīśvara Purāṇa','Bṛhannandīśvara Purāṇa','Sāmba Purāṇa','Kriyāyogasāra Purāṇa','Kālikā Purāṇa','Dharma Purāṇa','Viṣṇudharmottara Purāṇa','Śivadharma Purāṇa','Viṣṇudharma Purāṇa','Vāmana Purāṇa','Varuṇa Purāṇa','Nṛsiṃha Purāṇa','Bhārgava Purāṇa','Bṛhaddharma Purāṇa']}
  ];

  const sectOrder = ['Vaiṣṇava','Śaiva','Śākta','Saura','Brahmā','Mixed / composite'];
  const sectMap = {
    'Vaiṣṇava':['Padma Purāṇa','Viṣṇu Purāṇa','Bhāgavata Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Brahmavaivarta Purāṇa','Varāha Purāṇa','Vāmana Purāṇa','Nṛsiṃha Purāṇa','Viṣṇudharmottara Purāṇa','Viṣṇudharma Purāṇa','Kriyāyogasāra Purāṇa','Bṛhannāradīya Purāṇa','Another Nāradīya Purāṇa'],
    'Śaiva':['Śiva Purāṇa','Liṅga Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Māheśvara Purāṇa','Māheśa Purāṇa','Nandikṛta Purāṇa','Nandīśvara Purāṇa','Bṛhannandīśvara Purāṇa','Kaumāra Purāṇa'],
    'Śākta':['Devī Bhāgavata Purāṇa','Mahābhāgavata Purāṇa','Kālikā Purāṇa'],
    'Saura':['Saura Purāṇa','Sāmba Purāṇa','Āditya Purāṇa'],
    'Brahmā':['Brahma Purāṇa','Brahmāṇḍa Purāṇa','Another Brahmāṇḍa Purāṇa']
  };
  const sectClass = {'Vaiṣṇava':'sect-vaisnava','Śaiva':'sect-saiva','Śākta':'sect-sakta','Saura':'sect-saura','Brahmā':'sect-brahma','Mixed / composite':'sect-mixed'};

  const corpusButtons = [['vedas','Vedas'],['upanishads','108 Upaniṣads'],['itihasa','Itihāsa'],['puranas','Purāṇas'],['smriti','Smṛti'],['vedanga','Vedāṅga']];
  const itihasa = ['Rāmāyaṇa','Mahābhārata'];
  const vedangas = ['Śikṣā','Kalpa','Vyākaraṇa','Nirukta','Chandas','Jyotiṣa'];

  function buildWitnessMap(witnesses){const map=new Map();witnesses.forEach(({source,items})=>items.forEach(name=>{if(!map.has(name))map.set(name,[]);if(!map.get(name).includes(source))map.get(name).push(source);}));return map;}
  const mahaMap=buildWitnessMap(mahaWitnesses), upaMap=buildWitnessMap(upaWitnesses);
  const allPuranaNames=[...new Set([...mahaMap.keys(),...upaMap.keys()])].sort((a,b)=>a.localeCompare(b,'en'));
  // Category tabs are inclusive sets: a title with both kinds of witness must
  // remain reachable from each canonical category; “Both” is the intersection.
  const puranaLists={'Mahāpurāṇa':allPuranaNames.filter(n=>mahaMap.has(n)),'Upapurāṇa':allPuranaNames.filter(n=>upaMap.has(n)),'Both':allPuranaNames.filter(n=>mahaMap.has(n)&&upaMap.has(n))};
  const sectOf=name=>sectOrder.find(sect=>(sectMap[sect]||[]).includes(name))||'Mixed / composite';

  function tabs(items,active,group){return `<div class="subnav shastra-subnav">${items.map(label=>`<button type="button" class="shastra-tab${label===active?' is-active':''}" data-group="${esc(group)}" data-view="${esc(label)}">${esc(label)}</button>`).join('')}</div>`;}
  function infoPanel(name,rows){return `<div class="shastra-info" aria-live="polite"><strong>${esc(name)}</strong><div class="shastra-info-rows">${rows.filter(Boolean).map(row=>`<div class="shastra-info-row">${esc(row)}</div>`).join('')}</div></div>`;}
  function genericButtons(items,kind,source=''){return `<div class="shastra-grid">${items.map(name=>`<button type="button" class="shastra-name" data-name="${esc(name)}" data-kind="${esc(kind)}" data-source="${esc(source)}"><span>${esc(name)}</span></button>`).join('')}</div>`;}
  function vedaCard([name,branch],veda,type){const cls=type==='Saṃhitā'?'samhita':type==='Brāhmaṇa'?'brahmana':'aranyaka';return `<button type="button" class="shastra-name veda-text-card veda-${cls}" data-name="${esc(name)}" data-kind="${esc(type)}" data-veda="${esc(veda)}" data-branch="${esc(branch)}"><span>${esc(name)}</span><small>${esc(branch)}</small></button>`;}
  function renderVedas(){const body=vedaCorpus.map(veda=>{const sections=Object.entries(veda.sections).map(([type,items])=>{const cls=type==='Saṃhitā'?'samhita':type==='Brāhmaṇa'?'brahmana':'aranyaka';const cards=items.length?`<div class="shastra-grid">${items.map(item=>vedaCard(item,veda.name,type)).join('')}</div>`:`<div class="veda-empty">No extant Āraṇyaka</div>`;return `<section class="veda-type-group veda-type-${cls}"><h4>${esc(type)}</h4>${cards}</section>`;}).join('');return `<section class="veda-family"><h3>${esc(veda.name)}</h3>${sections}</section>`;}).join('');stage.innerHTML=`<h2 class="shastra-title">Vedas</h2><div class="shastra-holder veda-holder">${body}</div>`;}
  function renderUpanishads(){const body=Object.entries(upanishads).map(([group,items])=>{const cls=upanishadGroupClass[group]||'up-mukhya';const cards=items.map(([name,veda])=>`<button type="button" class="shastra-name upanishad-name ${cls}" data-name="${esc(name)}" data-kind="Upaniṣad" data-type="${esc(group)}" data-veda="${esc(veda)}"><span>${esc(name)}</span><small>${esc(veda)}</small></button>`).join('');return `<section class="upanishad-group ${cls}"><h3>${esc(group)}</h3><div class="shastra-grid">${cards}</div></section>`;}).join('');stage.innerHTML=`<h2 class="shastra-title">108 Upaniṣads</h2><div class="shastra-holder upanishad-holder">${body}</div>`;}
  function puranaLegend(){return `<div class="purana-sect-legend">${sectOrder.map(sect=>`<span class="legend-chip ${sectClass[sect]}"><i></i>${esc(sect)}</span>`).join('')}</div>`;}
  function puranaSourceRows(name,view){const rows=[];if(view!=='Upapurāṇa'&&mahaMap.has(name))rows.push(`Mahā: ${mahaMap.get(name).join(' · ')}`);if(view!=='Mahāpurāṇa'&&upaMap.has(name))rows.push(`Upa: ${upaMap.get(name).join(' · ')}`);return rows;}
  function puranaCard(name,view,sect){const rows=puranaSourceRows(name,view);return `<button type="button" class="shastra-name purana-name ${sectClass[sect]}" data-name="${esc(name)}" data-kind="${esc(view)}" data-sect="${esc(sect)}" data-maha="${esc((mahaMap.get(name)||[]).join(' · '))}" data-upa="${esc((upaMap.get(name)||[]).join(' · '))}"><span>${esc(name)}</span><small>${rows.map(esc).join('<br>')}</small></button>`;}
  function renderPuranas(){const types=['Mahāpurāṇa','Upapurāṇa','Both'];if(!types.includes(state.view))state.view=types[0];const sections=sectOrder.map(sect=>{const names=puranaLists[state.view].filter(name=>sectOf(name)===sect);if(!names.length)return'';return `<section class="purana-sect-group ${sectClass[sect]}"><h3>${esc(sect)}</h3><div class="shastra-grid purana-grid">${names.map(name=>puranaCard(name,state.view,sect)).join('')}</div></section>`;}).join('');stage.innerHTML=`<h2 class="shastra-title">Purāṇas</h2>${tabs(types,state.view,'puranas')}${puranaLegend()}<div class="shastra-holder purana-holder">${sections}</div>`;}
  function smritiButtons(names,source,group=''){const cls=group==='Sāttvika'?' guna-sattvika':group==='Rājasa'?' guna-rajasa':group==='Tāmasa'?' guna-tamasa':'';return `<div class="shastra-grid">${names.map(name=>`<button type="button" class="shastra-name${cls}" data-name="${esc(name)}" data-kind="Smṛti" data-source="${esc(source)}" data-group="${esc(group)}"><span>${esc(name)}</span><small>${esc(source)}</small></button>`).join('')}</div>`;}
  function renderSmriti(){const types=Object.keys(smriti);if(!types.includes(state.view))state.view=types[0];const set=smriti[state.view];let body='';if(set.items){body=smritiButtons(set.items,set.source);}else{body=Object.entries(set.groups).map(([group,names])=>{const cls=group==='Sāttvika'?'guna-sattvika':group==='Rājasa'?'guna-rajasa':'guna-tamasa';return `<section class="guna-group ${cls}"><h3>${esc(group)}</h3>${smritiButtons(names,set.source,group)}</section>`;}).join('');}stage.innerHTML=`<h2 class="shastra-title">Smṛti</h2>${tabs(types,state.view,'smriti')}<div class="shastra-holder">${body}</div>`;}

  const state={corpus:null,view:null};
  function render(){nav.innerHTML=corpusButtons.map(([key,label])=>`<button class="corpus-button${state.corpus===key?' is-active':''}" type="button" data-corpus="${key}" aria-expanded="${state.corpus===key?'true':'false'}">${label}</button>`).join('');if(!state.corpus){stage.hidden=true;stage.innerHTML='';return;}stage.hidden=false;if(state.corpus==='vedas')return renderVedas();if(state.corpus==='upanishads')return renderUpanishads();if(state.corpus==='puranas')return renderPuranas();if(state.corpus==='smriti')return renderSmriti();if(state.corpus==='itihasa'){stage.innerHTML=`<h2 class="shastra-title">Itihāsa</h2><div class="shastra-holder">${genericButtons(itihasa,'Itihāsa')}</div>`;return;}if(state.corpus==='vedanga')stage.innerHTML=`<h2 class="shastra-title">Vedāṅga</h2><div class="shastra-holder">${genericButtons(vedangas,'Vedāṅga','Muṇḍaka Upaniṣad 1.1.5')}</div>`;}
  function showInfo(button){stage.querySelectorAll('.shastra-name.is-active').forEach(item=>{item.classList.remove('is-active');item.setAttribute('aria-pressed','false');});button.classList.add('is-active');button.setAttribute('aria-pressed','true');const name=button.dataset.name||button.textContent.trim();const kind=button.dataset.kind||'';const rows=[];if(button.dataset.veda)rows.push(`Veda: ${button.dataset.veda}`);if(button.dataset.type)rows.push(`Type: ${button.dataset.type}`);if(button.dataset.branch)rows.push(`Śākhā / recension: ${button.dataset.branch}`);if(button.dataset.sect)rows.push(`Sect: ${button.dataset.sect}`);if(button.dataset.maha)rows.push(`Mahāpurāṇa: ${button.dataset.maha}`);if(button.dataset.upa)rows.push(`Upapurāṇa: ${button.dataset.upa}`);if(kind==='Smṛti'){if(button.dataset.group)rows.push(`Class: ${button.dataset.group}`);if(button.dataset.source)rows.push(`Source: ${button.dataset.source}`);}else if(button.dataset.source)rows.push(`Source: ${button.dataset.source}`);if(!rows.length&&kind)rows.push(kind);const old=stage.querySelector('.shastra-info');if(old)old.remove();const holder=stage.querySelector('.shastra-holder');if(holder)holder.insertAdjacentHTML('beforeend',infoPanel(name,rows));}
  root.addEventListener('click',event=>{const corpus=event.target.closest('.corpus-button');if(corpus&&nav.contains(corpus)){const key=corpus.dataset.corpus;if(state.corpus===key){state.corpus=null;state.view=null;}else{state.corpus=key;state.view=null;}render();return;}const tab=event.target.closest('.shastra-tab');if(tab&&stage.contains(tab)){state.view=tab.dataset.view;render();return;}const name=event.target.closest('.shastra-name');if(name&&stage.contains(name))showInfo(name);});
  render();
})();