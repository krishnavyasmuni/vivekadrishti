(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const DATA_BASE = '/vivekadrishti/assets/data/canto10-sridhara-word-for-word/';
  const DICT_ENDPOINT = 'https://www.sanskrit-lexicon.uni-koeln.de/scans/awork/apidev/api1/salt_multidict.php';
  const chapterCache = new Map();
  const dictionaryCache = new Map();
  const pendingDictionary = new Map();

  const COMMON = new Map(Object.entries({
    'a':'not','an':'not','na':'not','mā':'do not','ca':'and','tu':'but','api':'also','eva':'only; indeed','hi':'indeed; because','vai':'indeed','uta':'and; also','atha':'now; then','athavā':'or else','vā':'or','khalu':'indeed','nūnam':'certainly','kila':'indeed; it is said','sma':'indeed; formerly','ha':'indeed','aho':'oh','hanta':'alas; indeed','bata':'alas; indeed',
    'iti':'thus','ity':'thus','ityādi':'and so on','ity-ādi':'and so on','ityarthaḥ':'this is the meaning','ity-arthaḥ':'this is the meaning','iti-arthaḥ':'this is the meaning','itibhāvaḥ':'thus is the sense','iti-bhāvaḥ':'thus is the sense','ityāha':'thus he says','ity-āha':'thus he says','iti-āha':'thus he says','ityuktam':'thus stated','ity-uktam':'thus stated',
    'atra':'here','tatra':'there; in that','yatra':'where','kutra':'where','sarvatra':'everywhere','anyatra':'elsewhere','antar':'within','antaḥ':'within','bahiḥ':'outside','agre':'before; in front','paścāt':'afterwards','puraḥ':'before; in front','upari':'above','adhaḥ':'below','madhye':'in the middle; among','samīpe':'near','dūre':'far',
    'adya':'today; now','idānīm':'now','tadā':'then','kadā':'when','sadā':'always','nityam':'always; eternally','punaḥ':'again','bhūyaḥ':'again; further','sakṛt':'once','kramāt':'in order','yugapat':'simultaneously','ciram':'for a long time','śīghram':'quickly',
    'yataḥ':'because; from which','ataḥ':'therefore; from this','tataḥ':'then; from that','yasmāt':'because; from which','tasmāt':'therefore; from that','yathā':'as; just as','tathā':'so; in that way','yathāvat':'properly; as it is','yathoktam':'as stated','yathā-uktam':'as stated','yathāyogam':'as appropriate','yathā-yogam':'as appropriate','yathāsaṅkhyam':'in corresponding order','yathā-saṅkhyam':'in corresponding order','yadā':'when','yadi':'if','cet':'if','tarhi':'then','kintu':'but','kiṁtu':'but','tathāpi':'nevertheless','ataeva':'therefore indeed','ata-eva':'therefore indeed',
    'kim':'what','kiṁ':'what','kaḥ':'who','kā':'who; which','ke':'who; which','kasya':'whose; of whom','kasmai':'to whom','kasmāt':'from whom; why','katham':'how','kutaḥ':'from where; why','kati':'how many','kimartham':'for what purpose; why','kim-artham':'for what purpose; why','nanu':'but surely; indeed','nanv':'but surely',
    'yaḥ':'who; which','yā':'who; which','yat':'which; that which','ye':'those who','yasya':'whose; of which','yasmin':'in whom; in which','yena':'by whom; by which','yasmai':'to whom; for which','yam':'whom; which','yān':'whom; which','yayoḥ':'of the two who; of the two which','yeṣām':'of whom; of which','yeṣu':'in whom; in which','saḥ':'he; that','sā':'she; that','tat':'that','te':'they; those','tasya':'of him; of that','tasmin':'in him; in that','tena':'by him; by that','tasmai':'to him; for that','tam':'him; that','tān':'them; those','tayā':'by her; by that','tayoḥ':'of those two','teṣām':'of them','teṣu':'in them','ayam':'this; he','iyam':'this; she','idam':'this','ime':'these','asya':'of this; of him','asmin':'in this','anena':'by this','asmai':'to this; to him','imam':'this','etad':'this','etat':'this','eṣaḥ':'this; he','eṣā':'this; she','ete':'these','etasya':'of this','etena':'by this','amuṣya':'of that','asau':'that one',
    'aham':'I','ahaṁ':'I','mama':'my; of me','mayā':'by me','mahyaṁ':'to me','mām':'me','vayam':'we','asmākam':'our; of us','asmābhiḥ':'by us','naḥ':'us; our','tvam':'you','tvaṁ':'you','tava':'your; of you','tvayā':'by you','tubhyaṁ':'to you','tvām':'you','yūyam':'you all','yuṣmākam':'your; of you all','sva':'own; self','svayam':'himself; oneself',
    'anya':'other','anyat':'other','apara':'other; later','ubha':'both','ubhaya':'both','eka':'one','dvi':'two','tri':'three','catur':'four','pañca':'five','ṣaṭ':'six','sapta':'seven','aṣṭa':'eight','nava':'nine','daśa':'ten','sarva':'all','viśva':'all; universe','akhila':'all; entire','sakala':'all; complete','samasta':'all; entire','kiñcit':'something; a little','kiñcid':'something; a little','bahu':'many; much','alpa':'little; small','mahā':'great','mahat':'great','parama':'supreme','para':'higher; other','uttama':'highest; excellent','adhama':'lowest','mukhya':'principal','gauṇa':'secondary','pūrva':'previous; eastern','uttara':'later; northern; answer','prathama':'first','dvitīya':'second','tṛtīya':'third','caturtha':'fourth','śeṣa':'remaining; remainder',
    'artha':'meaning; object; purpose','arthaḥ':'meaning; object; purpose','artham':'for the purpose; meaning','bhāva':'sense; purport; state','bhāvaḥ':'sense; purport; state','abhiprāya':'intention; intended sense','abhiprāyeṇa':'with the intended sense','tātparya':'purport; intention','lakṣaṇa':'characteristic; definition','viśeṣa':'specific distinction','sāmānya':'general','bheda':'difference; division','saṁjñā':'designation; name','nāma':'name','pada':'word; term; position','vākya':'sentence; statement','śabda':'word; sound','vacana':'statement; grammatical number','ekavacanam':'singular number','eka-vacanam':'singular number','bahuvacanam':'plural number','bahu-vacanam':'plural number','liṅga':'gender; mark','vibhakti':'case ending','samāsa':'compound','dhātu':'verbal root','pratyaya':'suffix; cognition','upasarga':'prefix','anvaya':'connection; syntactic connection','vyākhyā':'explanation; commentary','vyākhyānam':'explanation','vyākhyāta':'explained','vyākhyātam':'explained','avyākhyātam':'unexplained','śruti':'scripture; hearing','smṛti':'remembered scripture; remembrance','purāṇa':'Purāṇa','śāstra':'scripture','śloka':'verse','ślokaḥ':'verse','śloke':'in the verse','sūtra':'aphorism','uktam':'stated','ukta':'stated','uktaḥ':'stated','uktā':'stated','uktāni':'stated things','proktam':'declared','prokta':'declared','kathitam':'narrated','kathita':'narrated','nirūpitam':'established; described','nirūpita':'established; described','varṇitam':'described','varṇita':'described','lakṣitam':'characterized','jñeyam':'to be known','jñeya':'to be known','draṣṭavyam':'to be seen','śrotavyam':'to be heard','śrotavya':'to be heard','mantavyam':'to be considered','bodhyam':'to be understood',
    'āha':'says','āhuḥ':'they say','uvāca':'said','brūte':'says','brūhi':'tell','brūmaḥ':'we say','vakti':'says','vadati':'says','vada':'speak; tell','vadasva':'speak; tell','kathayati':'narrates','kathaya':'narrate; tell','kathyate':'is narrated','ucyate':'is said','abhidhīyate':'is denoted','āmananti':'they call','manyate':'considers','manye':'I consider','matam':'opinion; considered','paśyati':'sees','paśya':'see','dṛśyate':'is seen','śṛṇoti':'hears','śṛṇu':'hear','śrutvā':'having heard','śrutam':'heard','jānāti':'knows','viduḥ':'they know','vetti':'knows','vidvān':'learned person','buddhvā':'having understood','budhyate':'understands','smarati':'remembers','smṛtvā':'having remembered','cintayati':'thinks','icchati':'desires','icchan':'desiring','prārthayate':'prays; requests','pṛcchati':'asks','pṛṣṭaḥ':'asked','uttaram':'answer',
    'asti':'is','santi':'are','āsīt':'was','bhavati':'is; becomes','bhavanti':'are; become','bhavet':'may be; becomes','syāt':'may be','sambhavati':'arises; is possible','ghaṭate':'is possible; occurs','vartate':'exists; remains','tiṣṭhati':'stands; remains','avasthita':'situated','vidyate':'exists','nāsti':'does not exist','abhāva':'absence','sattā':'existence',
    'karoti':'does; makes','kurute':'does; makes','kuru':'do; make','kṛtvā':'having done; having made','kṛta':'done; made','kṛtam':'done; made','kṛtaḥ':'done; made','akārṣīt':'did','dadāti':'gives','dattam':'given','datta':'given','dattvā':'having given','prayacchati':'bestows','prayacchataḥ':'of one who bestows','gṛhṇāti':'takes','gṛhītvā':'having taken','dhārayati':'holds','dhṛta':'held; bearing','tyajati':'abandons','tyaktvā':'having abandoned','rakṣati':'protects','arakṣat':'protected','rakṣita':'protected','jagopa':'protected','hanti':'kills','hatvā':'having killed','hata':'killed','vadha':'killing','jayati':'conquers','jita':'conquered','tarati':'crosses','ataran':'they crossed','gacchati':'goes','agāt':'went','gata':'gone','gataḥ':'gone','gatvā':'having gone','āgata':'come; arrived','āgatya':'having come','praviśati':'enters','praviṣṭa':'entered','nirgacchati':'goes out','upaiti':'approaches; attains','eti':'goes; comes','yāti':'goes','nayati':'leads','ānayati':'brings','labhate':'obtains','labdha':'obtained','prāpnoti':'attains','prāpta':'attained','utpadyate':'arises; is born','jāyate':'is born','jāta':'born','janma':'birth','mriyate':'dies','mṛtyu':'death','jīvati':'lives','jīva':'living being',
    'bhagavat':'the Supreme Lord','bhagavān':'the Supreme Lord','bhagavataḥ':'of the Supreme Lord','bhagavati':'in the Supreme Lord','bhagavatā':'by the Supreme Lord','īśvara':'Lord; controller','īśa':'Lord','paramātmā':'Supersoul','ātman':'self','ātmā':'self','ātmānam':'self','brahman':'Brahman; Absolute','brahma':'Brahman; Absolute','hari':'Hari','hareḥ':'of Hari','kṛṣṇa':'Kṛṣṇa','kṛṣṇaḥ':'Kṛṣṇa','kṛṣṇasya':'of Kṛṣṇa','rāma':'Rāma','viṣṇu':'Viṣṇu','nārāyaṇa':'Nārāyaṇa','vāsudeva':'Vāsudeva','govinda':'Govinda','gopāla':'Gopāla','baladeva':'Baladeva','śrī':'Śrī; sacred; glorious','deva':'deity; god','devī':'goddess','sura':'god; demigod','asura':'demon','ṛṣi':'sage','muni':'sage','rājā':'king','nṛpa':'king','brāhmaṇa':'brāhmaṇa','vaiṣṇava':'Vaiṣṇava','bhakta':'devotee','bhakti':'devotion','jñāna':'knowledge','vijñāna':'realized knowledge','yoga':'yoga; connection','dharma':'dharma; duty','adharma':'unrighteousness','karma':'action; karma','mokṣa':'liberation','mukti':'liberation','saṁsāra':'worldly existence','bhava':'worldly existence; becoming','māyā':'māyā; illusory power','śakti':'power','kāla':'time','puruṣa':'person; Puruṣa','prakṛti':'nature; material nature','guṇa':'quality; mode','līlā':'pastime','carita':'deed; history','kathā':'narration; account','vīrya':'heroic deed; potency','rūpa':'form','svarūpa':'own form; essential nature','aṁśa':'part; portion','avatāra':'descent; incarnation','avatīrṇa':'descended','deha':'body','śarīra':'body','aṅga':'limb; body','manas':'mind','manaḥ':'mind','buddhi':'intelligence','citta':'mind; consciousness','hṛdaya':'heart','indriya':'sense','prāṇa':'life-air; living being','loka':'world','jagat':'world; universe','viśvam':'universe','sarga':'creation','sṛṣṭi':'creation','saṁhāra':'destruction','pralaya':'dissolution','kula':'family','vaṁśa':'dynasty','putra':'son','suta':'son','tanaya':'son','pitṛ':'father; ancestor','mātṛ':'mother','mātā':'mother','bhāryā':'wife','pati':'husband; lord','sakhā':'friend','jana':'person; people','janāḥ':'people','prāṇin':'living being','paśu':'animal','gaja':'elephant','go':'cow; earth; speech','gauḥ':'cow; earth; speech','vraja':'Vraja','gokula':'Gokula','mathurā':'Mathurā','dvārakā':'Dvārakā','vṛndāvana':'Vṛndāvana',
    'satya':'true; truth','satyam':'true','mithyā':'false','śubha':'auspicious','aśubha':'inauspicious','sukha':'happiness','duḥkha':'suffering','ānanda':'bliss','paramānanda':'supreme bliss','prema':'love','kāma':'desire','krodha':'anger','lobha':'greed','moha':'delusion','bhaya':'fear','śoka':'sorrow','tṛṣṇā':'thirst; craving','tarṣa':'thirst; craving','icchā':'desire','dayā':'compassion','kṛpā':'mercy','prasāda':'grace; favor','mahima':'greatness','yaśas':'glory','tejas':'splendor; power','bala':'strength','śaurya':'heroism','aiśvarya':'lordship; opulence','mādhurya':'sweetness','saundarya':'beauty','doṣa':'fault','kāraṇa':'cause','hetu':'cause; reason','phala':'fruit; result','upāya':'means','sādhana':'means; practice','sādhya':'goal','viṣaya':'object; subject','āśraya':'shelter','ādhāra':'support','nimitta':'cause; occasion','prayojana':'purpose','sambandha':'relation','bīja':'seed','nidāna':'source; cause','anta':'end','ādi':'beginning; and so on','madhya':'middle','krama':'order; sequence','prakāra':'manner; kind','rīti':'manner','rasa':'rasa; relish','amṛta':'nectar; immortality','mṛta':'dead','amṛtam':'nectar; immortality',
    'sahita':'together with','saha':'with','vinā':'without','ṛte':'without; except','prati':'toward; regarding','anu':'after; according to','adhika':'more; greater','nyūna':'less; deficient','tulya':'equal; like','iva':'like; as if','vat':'like; possessing','mātra':'only; measure','kevala':'only; exclusive','evaṁ':'thus; in this way','evam':'thus; in this way','tadvat':'like that','tad-vat':'like that','sarvathā':'in every way','viśeṣataḥ':'especially','prāyaḥ':'generally; mostly','vastutaḥ':'in reality','sākṣāt':'directly','svataḥ':'by itself; intrinsically','parasparam':'mutually','krameṇa':'gradually; in order','saṅkṣepeṇa':'briefly','vistareṇa':'in detail','spaṣṭam':'clearly','sphuṭam':'clearly','samyak':'properly; completely','ati':'very; exceedingly','atyanta':'extreme; complete','nitarām':'greatly','sarvadā':'always',
    'śravaṇa':'hearing','kīrtana':'glorification','smaraṇa':'remembrance','darśana':'seeing; vision','sevā':'service','pūjā':'worship','stuti':'praise','praṇāma':'obeisance','namas':'obeisance','namaḥ':'obeisance','śaraṇa':'shelter','śaraṇam':'shelter','caraṇa':'foot','pāda':'foot; quarter','padma':'lotus','kamala':'lotus','mukha':'face; mouth','netra':'eye','cakṣuḥ':'eye','karṇa':'ear','śrotra':'ear; hearing','hasta':'hand','kara':'hand; doer','kukṣi':'womb; belly','garbha':'womb; embryo','hṛt':'heart','udara':'belly','mukta':'liberated','mumukṣu':'seeker of liberation','viṣayin':'material enjoyer','viṣayi':'material enjoyer','dṛṣṭi':'vision','antar-dṛṣṭi':'inward vision','bahir-dṛṣṭi':'outward vision','antaryāmin':'Inner Controller',
    'samudra':'ocean','sāgara':'ocean','nadī':'river','jala':'water','vāri':'water','agni':'fire','vahni':'fire','sūrya':'sun','soma':'moon','candra':'moon','pṛthivī':'earth','bhūmi':'earth','ākāśa':'ether; sky','vāyu':'air','vana':'forest','giri':'mountain','parvata':'mountain','nagara':'city','pura':'city','gṛha':'house','grāma':'village','ratha':'chariot','cakra':'disc; wheel','gadā':'mace','astra':'weapon','śastra':'weapon','yuddha':'battle','samara':'battle','sainya':'army','śatru':'enemy','mitra':'friend','plava':'boat','timiṅgila':'timiṅgila sea-monster','vatsa':'calf','padam':'footprint; step',
    'ādau':'at the beginning','ante':'at the end','mūlam':'root; basis','mūla':'root; basis','siddha':'established; perfected','siddham':'established','prasiddha':'well known','aprasiddha':'not well known','saṅgati':'connection','saṅgatiḥ':'connection','udāharaṇa':'example','dṛṣṭānta':'example','nirṇaya':'conclusion','siddhānta':'conclusion; doctrine','saṁśaya':'doubt','samādhāna':'resolution; answer','praśna':'question','uttaraḥ':'answer','pūrvapakṣa':'prima facie objection','siddhāntaḥ':'established conclusion','tātparyam':'purport','vyavahāra':'usage; practice','laukika':'ordinary; worldly','vaidika':'Vedic','śāstrīya':'scriptural'
  }));

  const CASE_RULES = [
    [/ebhyaḥ$/u, 'a', 'from/for {x}s'], [/ānām$/u, 'a', 'of {x}s'], [/ayoḥ$/u, 'a', 'of the two {x}s'], [/eṣu$/u, 'a', 'in/among {x}s'], [/aiḥ$/u, 'a', 'by/with {x}s'], [/ābhyām$/u, 'a', 'by/from/for the two {x}s'],
    [/asya$/u, 'a', 'of {x}'], [/āya$/u, 'a', 'to/for {x}'], [/ena$/u, 'a', 'by/with {x}'], [/āt$/u, 'a', 'from {x}'], [/e$/u, 'a', 'in/on {x}'], [/am$/u, 'a', '{x}'], [/aḥ$/u, 'a', '{x}'], [/āḥ$/u, 'a', '{x}s'], [/ān$/u, 'a', '{x}s'], [/au$/u, 'a', 'the two {x}s'],
    [/yāḥ$/u, 'ī', 'of {x}'], [/yām$/u, 'ī', 'in {x}'], [/yā$/u, 'ī', 'by {x}'], [/īnām$/u, 'ī', 'of {x}s'], [/īṣu$/u, 'ī', 'in {x}s'],
    [/inaḥ$/u, 'in', 'of {x}'], [/inā$/u, 'in', 'by {x}'], [/ini$/u, 'in', 'in {x}'], [/inam$/u, 'in', '{x}'],
    [/oḥ$/u, 'u', 'of the two {x}s'], [/unā$/u, 'u', 'by {x}'], [/ave$/u, 'u', 'to/for {x}'], [/um$/u, 'u', '{x}'], [/uḥ$/u, 'u', '{x}'],
    [/bhiḥ$/u, '', 'by/with {x}s'], [/bhyaḥ$/u, '', 'from/for {x}s'], [/nām$/u, '', 'of {x}s']
  ];

  const VERB_FORMS = new Map(Object.entries({
    'āha':'says','āhuḥ':'they say','uvāca':'said','ūcuḥ':'they said','abravīt':'said','bravīti':'says','brūte':'says','brūhi':'tell','vada':'tell','vadati':'says','vadasva':'tell','ucyate':'is said','uktam':'stated','uktaḥ':'stated','uktā':'stated','proktam':'declared','kathitam':'narrated','kathyate':'is narrated','varṇyate':'is described','varṇitam':'described','nirūpyate':'is established; is described','nirūpitam':'established; described','dṛśyate':'is seen','paśyati':'sees','śṛṇoti':'hears','śrutvā':'having heard','jānāti':'knows','viduḥ':'they know','vetti':'knows','manyate':'considers','manye':'I consider','pṛcchati':'asks','prāha':'said','asti':'is','santi':'are','āsīt':'was','bhavati':'is; becomes','bhavanti':'are; become','bhavet':'may be','syāt':'may be','vartate':'exists; remains','vidyate':'exists','karoti':'does; makes','kurute':'does; makes','kuru':'do; make','kṛtvā':'having done; having made','dadāti':'gives','dattvā':'having given','gṛhṇāti':'takes','gṛhītvā':'having taken','gacchati':'goes','yāti':'goes','eti':'goes; comes','gatvā':'having gone','āgatya':'having come','praviśati':'enters','praviṣṭaḥ':'entered','labhate':'obtains','prāpnoti':'attains','jāyate':'is born','mriyate':'dies','hanti':'kills','hatvā':'having killed','rakṣati':'protects','jagopa':'protected','tarati':'crosses','dadau':'gave','cakāra':'did; made','akarot':'did; made','abhavat':'became; was','babhūva':'became; was','jagāma':'went','yayau':'went','dadarśa':'saw','śuśrāva':'heard','mene':'considered','jajñe':'was born','lebhe':'obtained','uvāha':'carried; married','nināya':'led; brought','ānayat':'brought','prayayau':'departed','upāgamat':'approached; came','āyayau':'came','tiṣṭhati':'stands; remains','sthitaḥ':'situated','sthita':'situated'
  }));

  function normalize(text) {
    return String(text || '').normalize('NFC').toLowerCase().replace(/[’‘`´]/g, "'")
      .replace(/^[^a-zāīūṛṝḷṃṁḥṅñṭḍṇśṣ'\-]+|[^a-zāīūṛṝḷṃṁḥṅñṭḍṇśṣ'\-]+$/gu, '')
      .replace(/^['-]+|['-]+$/g, '').trim();
  }

  function cleanMeaning(text) {
    return String(text || '').replace(/\s+/g, ' ').replace(/^[-—–,:;\s]+|[-—–,:;\s]+$/g, '')
      .replace(/\s*\([^)]{0,100}\)\s*/g, ' ').replace(/\b(?:m|f|n|mf|mfn|adj|adv|ind|pron|part|prep|conj|interj)\.?\s*/gi, '')
      .replace(/\s+/g, ' ').trim();
  }

  function verseIdentity(section) {
    const heading = section.querySelector(':scope > h3[id^="sb-10-"]');
    const match = heading?.id.match(/^sb-10-(\d+)-(\d+)(?:-(\d+))?$/);
    if (!match) return null;
    return { chapter: Number(match[1]), start: Number(match[2]), end: Number(match[3] || match[2]) };
  }

  function hasSridhara(section) {
    return Boolean(section.querySelector(':scope > .sb-bhasya .sb-source-content')?.textContent?.trim());
  }

  function sridharaIast(section) {
    const blocks = section.querySelectorAll(':scope > .sb-transliteration-details .sb-source-block');
    for (const block of blocks) {
      const label = block.querySelector('.sb-source-label')?.textContent || '';
      if (/Śrīdhara/i.test(label)) return block.querySelector('.sb-source-content')?.textContent?.trim() || '';
    }
    return '';
  }

  function contextLexicon(section) {
    const map = new Map();
    const text = section.querySelector(':scope > .sb-word-details .sb-source-content')?.textContent || '';
    text.split(/\s*;\s*/).forEach((piece) => {
      let match = piece.match(/^\s*([^—–:]+?)\s*[—–:]\s*(.+)$/);
      if (!match) match = piece.match(/^\s*(\S+)\s+(.+)$/);
      if (!match) return;
      const left = normalize(match[1]);
      const right = cleanMeaning(match[2]).replace(/[.;]+$/g, '');
      if (left && right && right.length < 220) map.set(left, right);
    });
    return map;
  }

  async function chapterData(chapter) {
    if (!chapterCache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      chapterCache.set(chapter, fetch(`${DATA_BASE}${file}.json?v=5`, { cache: 'force-cache' })
        .then((response) => response.ok ? response.json() : {}).catch(() => ({})));
    }
    return chapterCache.get(chapter);
  }

  function normalizeStaticEntry(value) {
    if (!value) return '';
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'object' && !Array.isArray(value)) return String(value.word_for_word || value.wordForWord || '').trim();
    return '';
  }

  function staticForRange(data, start, end) {
    const directKey = start === end ? String(start) : `${start}-${end}`;
    const direct = normalizeStaticEntry(data[directKey]);
    if (direct) return direct;
    if (start === end) return '';
    return Array.from({ length: end - start + 1 }, (_, index) => normalizeStaticEntry(data[String(start + index)]))
      .filter(Boolean).join(' ').trim();
  }

  function localLookup(token, context) {
    const key = normalize(token);
    if (!key) return '';
    if (context.has(key)) return context.get(key);
    if (COMMON.has(key)) return COMMON.get(key);
    if (VERB_FORMS.has(key)) return VERB_FORMS.get(key);
    const withoutAvagraha = key.replace(/^'+/, '');
    if (withoutAvagraha !== key) {
      if (context.has(withoutAvagraha)) return context.get(withoutAvagraha);
      if (COMMON.has(withoutAvagraha)) return COMMON.get(withoutAvagraha);
      if (VERB_FORMS.has(withoutAvagraha)) return VERB_FORMS.get(withoutAvagraha);
    }
    for (const [pattern, replacement, template] of CASE_RULES) {
      if (!pattern.test(key)) continue;
      const stem = key.replace(pattern, replacement);
      const stemMeaning = context.get(stem) || COMMON.get(stem) || VERB_FORMS.get(stem);
      if (stemMeaning) return template.replace('{x}', stemMeaning);
    }
    return '';
  }

  function dictionaryCandidates(token) {
    const key = normalize(token);
    if (!key) return [];
    const out = [key];
    CASE_RULES.forEach(([pattern, replacement]) => { if (pattern.test(key)) out.push(key.replace(pattern, replacement)); });
    const simple = [[/ḥ$/u,''],[/ṃ$/u,''],[/ṁ$/u,''],[/am$/u,'a'],[/ena$/u,'a'],[/asya$/u,'a'],[/āya$/u,'a'],[/āt$/u,'a'],[/eṣu$/u,'a'],[/ānām$/u,'a'],[/aiḥ$/u,'a'],[/ebhyaḥ$/u,'a'],[/yaḥ$/u,'ī'],[/yām$/u,'ī'],[/yā$/u,'ī'],[/inaḥ$/u,'in'],[/inā$/u,'in'],[/ini$/u,'in']];
    simple.forEach(([pattern, replacement]) => { if (pattern.test(key)) out.push(key.replace(pattern, replacement)); });
    return [...new Set(out.filter((value) => value.length > 1))].slice(0, 8);
  }

  function extractDictionaryMeaning(payload) {
    const dicts = payload?.dicts || {};
    const order = ['ap90','mw','pw','shs','vcp',...Object.keys(dicts)];
    for (const dict of order) {
      const entry = dicts[dict]?.[0];
      if (!entry) continue;
      if (Array.isArray(entry.sense) && entry.sense.length) {
        const first = entry.sense[0];
        const sense = cleanMeaning(typeof first === 'string' ? first : first?.text || first?.gloss || '');
        if (sense) return sense.slice(0, 180);
      }
      const raw = entry.csl?.text || '';
      if (!raw) continue;
      let text = cleanMeaning(raw).replace(/^[\u0900-\u097f\s0-9.,;:'"()\-]+/u, '').replace(/^[a-zāīūṛṝḷṃṁḥṅñṭḍṇśṣ0-9.'\-]+\s+/iu, '');
      const englishStart = text.search(/\b(?:to|a|an|the|one|who|which|of|in|on|with|from|for|by|and|or|not|very|great|small|being|having|making|going|coming|saying|knowing|seeing|hearing|giving|taking|lord|god|king|man|woman|body|mind|world|time|place|name|form|quality|action|state|power|desire|love|knowledge|water|fire)\b/i);
      if (englishStart > 0) text = text.slice(englishStart);
      text = text.split(/\s*[;।॥]\s*/)[0].split(/\s{2,}/)[0].trim();
      if (text.length > 180) text = text.slice(0,177).replace(/\s+\S*$/, '') + '…';
      if (text) return text;
    }
    return '';
  }

  function jsonpLookup(key) {
    return new Promise((resolve) => {
      const cb = `__c10mw_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement('script');
      let finished = false;
      const timer = setTimeout(() => finish(''), 8000);
      function finish(value) {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        try { delete window[cb]; } catch (_) { window[cb] = undefined; }
        script.remove();
        resolve(value || '');
      }
      window[cb] = (payload) => finish(extractDictionaryMeaning(payload));
      script.onerror = () => finish('');
      script.src = `${DICT_ENDPOINT}?key=${encodeURIComponent(key)}&input=roman&output=roman&size=1&field=id,text,headwordIast,sense&callback=${encodeURIComponent(cb)}`;
      document.head.appendChild(script);
    });
  }

  function cachedDictionaryLookup(token) {
    const key = normalize(token);
    if (!key) return '';
    if (dictionaryCache.has(key)) return dictionaryCache.get(key);
    try {
      const stored = localStorage.getItem(`c10-wfw:${key}`);
      if (stored) { dictionaryCache.set(key, stored); return stored; }
    } catch (_) {}
    return '';
  }

  async function dictionaryLookup(token) {
    const key = normalize(token);
    if (!key) return '';
    const cached = cachedDictionaryLookup(key);
    if (cached) return cached;
    if (pendingDictionary.has(key)) return pendingDictionary.get(key);
    const request = (async () => {
      for (const candidate of dictionaryCandidates(key)) {
        const meaning = await jsonpLookup(candidate);
        if (meaning) {
          dictionaryCache.set(key, meaning);
          try { localStorage.setItem(`c10-wfw:${key}`, meaning); } catch (_) {}
          return meaning;
        }
      }
      dictionaryCache.set(key, '');
      return '';
    })().finally(() => pendingDictionary.delete(key));
    pendingDictionary.set(key, request);
    return request;
  }

  function tokensFromIast(text) {
    return String(text || '').replace(/\[[^\]]*\]/g, ' ').replace(/\|+/g, ' ').replace(/[0-9]+(?:\.[0-9]+)*/g, ' ')
      .replace(/[“”"()[\]{}<>]/g, ' ').split(/\s+/).map(normalize).filter(Boolean);
  }

  function chooseUnits(token, context) {
    if (localLookup(token, context) || cachedDictionaryLookup(token) || !token.includes('-')) return [token];
    return token.split('-').map(normalize).filter(Boolean);
  }

  function renderGloss(units, meanings) {
    return units.map((unit, index) => `${unit} — ${meanings[index] || unit}`).join('; ') + (units.length ? '.' : '');
  }

  async function resolveAutomaticGloss(iast, context, content, useRemote) {
    const units = [];
    tokensFromIast(iast).forEach((token) => units.push(...chooseUnits(token, context)));
    const meanings = units.map((unit) => localLookup(unit, context) || cachedDictionaryLookup(unit));
    content.textContent = renderGloss(units, meanings);
    if (!useRemote) return;
    const unresolved = [...new Set(units.filter((unit,index) => !meanings[index]))];
    if (!unresolved.length) return;
    content.dataset.loading = 'true';
    const queue = unresolved.slice();
    const worker = async () => {
      while (queue.length) {
        const unit = queue.shift();
        await dictionaryLookup(unit);
        for (let i = 0; i < units.length; i += 1) if (units[i] === unit) meanings[i] = localLookup(unit, context) || cachedDictionaryLookup(unit);
        content.textContent = renderGloss(units, meanings);
      }
    };
    await Promise.all(Array.from({ length: Math.min(4, queue.length) }, worker));
    content.dataset.loading = 'false';
    content.textContent = renderGloss(units, meanings);
  }

  function makeDetails() {
    const details = document.createElement('details');
    details.className = 'sb-details sb-sridhara-wfw-details';
    details.open = false;
    const summary = document.createElement('summary');
    summary.textContent = 'Śrīdhara word-for-word';
    const wrapper = document.createElement('div');
    wrapper.className = 'sb-source-block';
    const label = document.createElement('strong');
    label.className = 'sb-source-label';
    label.textContent = 'Śrīdhara word-for-word';
    const content = document.createElement('div');
    content.className = 'sb-source-content sb-sridhara-word-for-word';
    wrapper.append(label, content);
    details.append(summary, wrapper);
    return { details, content };
  }

  async function enhance(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    if (section.dataset.sridharaEnglishChecked === 'true') return;
    section.dataset.sridharaEnglishChecked = 'true';
    if (!hasSridhara(section)) return;
    const identity = verseIdentity(section);
    const iast = sridharaIast(section);
    if (!identity || !iast) return;
    const { details, content } = makeDetails();
    section.appendChild(details);
    const data = await chapterData(identity.chapter);
    if (!section.isConnected) return;
    const exact = staticForRange(data, identity.start, identity.end);
    if (exact) {
      content.textContent = exact;
      details.dataset.glossSource = 'chapter-data';
      return;
    }
    const context = contextLexicon(section);
    await resolveAutomaticGloss(iast, context, content, false);
    details.dataset.glossSource = 'lexical';
    details.addEventListener('toggle', () => {
      if (details.open && details.dataset.remoteResolved !== 'true') {
        details.dataset.remoteResolved = 'true';
        resolveAutomaticGloss(iast, context, content, true);
      }
    });
  }

  function scan(node = root) {
    if (node instanceof HTMLElement && node.matches('.sb-verse-section')) enhance(node);
    node.querySelectorAll?.('.sb-verse-section').forEach(enhance);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) scan(node);
    }));
  });
  observer.observe(root, { childList: true, subtree: true });
  scan();
})();