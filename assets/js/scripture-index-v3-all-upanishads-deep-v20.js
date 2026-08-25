(() => {
  const root=document.getElementById('scripture-browser');
  const previousOpen=window.openScriptureEncyclopedia;
  if(!root||typeof previousOpen!=='function')return;
  const D=window.SCRIPTURE_DETAIL_DATA||{};

  const PRINCIPAL=new Set(['Aitareya','Kauṣītaki','Kena','Chāndogya','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya']);
  const GROUPS={
    'Sāmānya Vedānta':['Ātmabodha','Mudgala','Vajrasūcī','Mahā','Sāvitrī','Garbha','Sarvasāra','Śukarahasya','Skanda','Śārīraka','Ekākṣara','Akṣi','Prāṇāgnihotra','Subāla','Mantrikā','Nirālamba','Paiṅgala','Adhyātma','Muktikā','Annapūrṇā','Sūrya','Ātma'],
    'Sannyāsa':['Nirvāṇa','Āruṇi','Maitreya','Sannyāsa','Kuṇḍikā','Brahma','Avadhūta','Kaṭharudra','Jābāla','Paramahaṃsa','Bhikṣuka','Turīyātītāvadhūta','Yājñavalkya','Śāṭyāyanīya','Nārada-Parivrājaka','Paramahaṃsa-Parivrājaka','Parabrahma'],
    'Yoga':['Nādabindu','Yogacūḍāmaṇi','Jābāladarśana','Amṛtabindu','Amṛtanāda','Kṣurikā','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Yogaśikhā','Yogakuṇḍalinī','Varāha','Haṃsa','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advayatāraka','Śāṇḍilya','Pāśupatabrahma','Mahāvākya'],
    'Vaiṣṇava':['Vāsudeva','Avyakta','Nārāyaṇa','Kali-Saṇṭāraṇa','Tārasāra','Nṛsiṃhatāpanī','Tripādvibhūti-Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Garuḍa'],
    'Śaiva':['Akṣamālikā','Rudrākṣajābāla','Jābāli','Kaivalya','Kālāgnirudra','Dakṣiṇāmūrti','Rudrahṛdaya','Pañcabrahma','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Śarabha','Bhasmajābāla','Gaṇapati'],
    'Śākta':['Tripurā','Saubhāgyalakṣmī','Bahvṛca','Sarasvatī-rahasya','Sītā','Tripurātāpinī','Devī','Bhāvanā']
  };
  const ALL=new Set(Object.values(GROUPS).flat());
  const groupOf=n=>Object.keys(GROUPS).find(g=>GROUPS[g].includes(n))||'Upaniṣad';

  const N={
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

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||x?.title||'');
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const uniq=xs=>{const seen=new Set();return xs.map(plain).map(x=>String(x||'').trim()).filter(x=>{const k=norm(x);if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const entry=n=>Object.assign({},D[n]||{},D[`Upaniṣad:${n}`]||{});

  // A conservative IAST -> Devanagari converter used only when no verified Sanskrit title
  // has already been stored in the data. It displays the name as a separate title plus “Upanishad”.
  const CONS={'kh':'ख','gh':'घ','ch':'छ','jh':'झ','ṭh':'ठ','ḍh':'ढ','th':'थ','dh':'ध','ph':'फ','bh':'भ','k':'क','g':'ग','ṅ':'ङ','c':'च','j':'ज','ñ':'ञ','ṭ':'ट','ḍ':'ड','ṇ':'ण','t':'त','d':'द','n':'न','p':'प','b':'ब','m':'म','y':'य','r':'र','l':'ल','v':'व','ś':'श','ṣ':'ष','s':'स','h':'ह'};
  const IV={'a':'अ','ā':'आ','i':'इ','ī':'ई','u':'उ','ū':'ऊ','ṛ':'ऋ','ṝ':'ॠ','ḷ':'ऌ','e':'ए','ai':'ऐ','o':'ओ','au':'औ'};
  const MV={'a':'','ā':'ा','i':'ि','ī':'ी','u':'ु','ū':'ू','ṛ':'ृ','ṝ':'ॄ','ḷ':'ॢ','e':'े','ai':'ै','o':'ो','au':'ौ'};
  const TOK=['kh','gh','ch','jh','ṭh','ḍh','th','dh','ph','bh','ai','au','ā','ī','ū','ṛ','ṝ','ḷ','ṅ','ñ','ṭ','ḍ','ṇ','ś','ṣ','ṃ','ḥ','a','i','u','e','o','k','g','c','j','t','d','n','p','b','m','y','r','l','v','s','h'];
  function devWord(word){let out='',i=0;while(i<word.length){if(/[\s\-–—/]/.test(word[i])){out+=word[i++];continue;}let tok=TOK.find(t=>word.startsWith(t,i));if(!tok){out+=word[i++];continue;}if(CONS[tok]){out+=CONS[tok];i+=tok.length;let v=TOK.filter(t=>IV[t]).find(t=>word.startsWith(t,i));if(v){out+=MV[v];i+=v.length;}else if(i<word.length&&!/[\s\-–—/,.)]/.test(word[i])&&word[i]!=='ṃ'&&word[i]!=='ḥ')out+='्';continue;}if(IV[tok]){out+=IV[tok];i+=tok.length;continue;}if(tok==='ṃ'){out+='ं';i+=tok.length;continue;}if(tok==='ḥ'){out+='ः';i+=tok.length;continue;}i+=tok.length;}return out;}
  const deva=(name,e)=>String(e.sanskritTitle||'').split('/')[0].trim()||`${devWord(name)} उपनिषद्`;

  const GROUP_META={
    'Sāmānya Vedānta':{
      date:'This is a later Vedāntic Upanishad rather than one of the earliest prose Upanishads. Its exact absolute date is usually uncertain and must be argued from language, manuscript history, quotations and relation to developed Vedānta rather than from its position in the Muktikā list.',
      transmission:'Texts in this group often circulate as short independent Upanishads in anthologies. Their received Vedic association is canonical and liturgical; it does not by itself prove that the work belongs to the same historical layer as the ancient Saṃhitā, Brāhmaṇa or Āraṇyaka of that Veda.',
      reception:'The Sāmānya or general Vedānta Upanishads are especially useful for seeing how vocabulary that is scattered through the early Upanishads became systematized into concise doctrines of self, bondage, liberation, states of consciousness, mantra and contemplation.'
    },
    'Sannyāsa':{
      date:'This work belongs to the later Sannyāsa Upanishad corpus. The renunciation Upanishads were composed and redacted across a long period, and an individual text should not be assigned a precise date merely because later tradition places it in the 108-name canon.',
      transmission:'Sannyāsa Upanishads often survive in anthologies and manuscript collections concerned with renunciation. They preserve both institutional rules and highly interiorized ideals, so the history of a text must distinguish practical prescriptions from later Vedāntic interpretation of the liberated ascetic.',
      reception:'The Sannyāsa corpus helped give Vedic-scriptural form to debates about who may renounce, when renunciation is permitted, what marks or possessions a renouncer retains, and whether the highest ascetic state is defined by outward discipline, knowledge, or both.'
    },
    'Yoga':{
      date:'This is a later Yoga Upanishad. Many Yoga Upanishads reached their received form in the first or early second millennium CE, but the corpus is layered and individual practices may be older than the texts that now collect them.',
      transmission:'Yoga Upanishads were transmitted in collections that combine Vedāntic liberation language with practical material on breath, mantra, subtle anatomy, concentration and samādhi. Their technical vocabulary should be described from the actual text rather than automatically equated with Patañjali or with later Haṭhayoga manuals.',
      reception:'The Yoga Upanishads are major witnesses to the period in which Upanishadic self-knowledge, mantra practice and increasingly detailed yogic physiology were brought into a single scriptural framework.'
    },
    'Vaiṣṇava':{
      date:'This is a later sectarian Upanishad belonging to the Vaiṣṇava layer of the corpus. Exact dates vary widely; the Muktikā classification records canonical reception, not the historical date at which the work first took shape.',
      transmission:'Vaiṣṇava Upanishads commonly circulate as independent mantra-theological texts. They deliberately use the language of Brahman, Ātman and liberation to interpret Nārāyaṇa, Viṣṇu, Rāma, Kṛṣṇa or another Vaiṣṇava form as the supreme reality and to authorize associated mantras and practices as śruti.',
      reception:'These texts became important where Vaiṣṇava traditions sought explicit Upanishadic authority for divine names, mantras, sacred marks, avatāras and the identification of the supreme Brahman with a particular form of Viṣṇu.'
    },
    'Śaiva':{
      date:'This is a later Śaiva Upanishad. Its Muktikā number belongs to the received 108-name canon and should not be treated as a chronological position; individual Śaiva Upanishads developed in different ritual and theological settings.',
      transmission:'Śaiva Upanishads frequently combine Upanishadic metaphysics with specifically Śaiva ritual signs, mantras, sacred ash, rudrākṣa, forms of Rudra or Śiva, and doctrines of Paśupati. Manuscript and printed transmission is therefore closely connected with later Śaiva scholastic and ritual collections.',
      reception:'The Śaiva Upanishads show how characteristic Śaiva practices were reread as Vedic revelation while still participating in broader Vedāntic questions about the self, divine supremacy, bondage and liberation.'
    },
    'Śākta':{
      date:'This is a later Śākta Upanishad. The surviving Śākta Upanishads belong to a developed goddess and mantra environment; their exact dates differ and cannot be recovered simply from the traditional 108-name sequence.',
      transmission:'Śākta Upanishads are often transmitted with mantra, Śrīvidyā and goddess-oriented materials. Their language can move rapidly between Vedic identification of the Goddess with Brahman and more technical ritual or contemplative descriptions of mantra, yantra and internal worship.',
      reception:'These texts supplied Upanishadic authority for the Goddess as supreme reality and became especially important to traditions that read Devī, Tripurasundarī, Lakṣmī, Sarasvatī or Sītā through the categories of Brahman, consciousness and cosmic power.'
    }
  };

  const AIYAR_SET=new Set(['Muktikā','Sarvasāra','Nirālamba','Maitreya','Kaivalya','Amṛtabindu','Ātmabodha','Skanda','Paiṅgala','Adhyātma','Subāla','Tejobindu','Brahma','Vajrasūcī','Śārīraka','Garbha','Tārasāra','Nārāyaṇa','Kali-Saṇṭāraṇa','Bhikṣuka','Nārada-Parivrājaka','Śāṇḍilya','Yogatattva','Dhyānabindu','Haṃsa','Amṛtanāda','Varāha','Maṇḍala-Brāhmaṇa','Nādabindu','Yogakuṇḍalinī']);
  const AIYAR_IMG='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Thirty_minor_Upanishads_%28IA_thirtyminorupani00naraiala%29.pdf/page1-500px-Thirty_minor_Upanishads_%28IA_thirtyminorupani00naraiala%29.pdf.jpg';
  const AIYAR_PAGE='https://commons.wikimedia.org/wiki/File:Thirty_minor_Upanishads_(IA_thirtyminorupani00naraiala).pdf';
  const ART={
    Vajrasūcī:{src:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Vajrasuchi%20Upanishad%20sample%20i%2C%20Samaveda%2C%20Sanskrit%2C%20Devanagari%20script%2C%201728%20CE%20manuscript.jpg',href:'https://commons.wikimedia.org/wiki/File:Vajrasuchi_Upanishad_sample_i,_Samaveda,_Sanskrit,_Devanagari_script,_1728_CE_manuscript.jpg',cap:'Vajrasūcī Upanishad, Devanagari manuscript dated 1728. Wikimedia Commons.'}
  };
  function artFor(name,e){if(ART[name])return ART[name];if(e.image?.src)return{src:e.image.src,href:e.image.href||e.image.url||'',cap:e.image.cap||e.image.caption||''};if(AIYAR_SET.has(name))return{src:AIYAR_IMG,href:AIYAR_PAGE,cap:`K. Narayanasvami Aiyar’s 1914 public-domain Thirty Minor Upanishads, an early printed edition containing the ${name} Upanishad. Wikimedia Commons / Internet Archive.`};return null;}

  const SPECIAL={
    Muktikā:{structure:'Dialogue of Rāma and Hanumān; list of 108 Upanishads; Vedic groupings; teaching on liberation and study.',units:[['Rāma and Hanumān','Hanumān asks Rāma for the means to liberation. Rāma answers by directing him to the Upanishadic revelation and then gives the traditional sequence of 108 texts.'],['The 108-name canon','The text enumerates the Upanishads in the order later used for the Muktikā canon and then groups them according to the four Vedas and their śānti mantras.'],['How many Upanishads are needed?','The dialogue distinguishes different levels of study: Māṇḍūkya is praised as sufficient for a fully prepared seeker, while larger sets are prescribed when certainty has not arisen.'],['Jīvanmukti and final release','The closing teaching connects Upanishadic knowledge with knowledge while living and with final freedom when the remaining momentum of prior action is exhausted.']]},
    Vajrasūcī:{structure:'A short argumentative inquiry into the definition of a brāhmaṇa.',units:[['The question','The text asks what makes someone a brāhmaṇa in the highest sense.'],['Rejected criteria','It tests and rejects the individual soul, body, birth, learning, action and merely conventional religious merit as sufficient definitions.'],['The positive definition','The true brāhmaṇa is characterized by direct realization of Brahman rather than by a bodily or genealogical property.']]},
    Garbha:{structure:'A compact physiological and embryological discourse.',units:[['Constituents of the body','The text enumerates elements, bodily substances, organs and vital functions to describe embodied human life.'],['Embryonic development','It gives a staged account of conception and the development of the embryo in the womb.'],['The fetus and memory','The unborn child is represented as becoming aware of previous bondage and resolving to seek liberation, only to lose that recollection at birth.']]},
    Sarvasāra:{structure:'A catechism defining key Vedāntic terms.',units:[['Bondage and liberation','The text asks concise questions about bondage, release, ignorance and knowledge.'],['States and bodies','Waking, dream, deep sleep, the embodied person and the witnessing self are defined in a compact scholastic form.'],['The supreme self','The sequence culminates in terminology for the reality beyond limiting conditions and ordinary states.']]},
    Nirālamba:{structure:'An extended catechism of Vedāntic definitions.',units:[['What is Brahman?','The opening defines Brahman as beginningless, nondual consciousness beyond limiting adjuncts.'],['Gods, beings and the world','A long series of questions asks how Īśvara, jīva, deities, humans and the categories of the world are to be understood.'],['Karma, knowledge and liberation','The catechism continues through action and non-action, knowledge and ignorance, pleasure and pain, heaven and hell, bondage, liberation and the true renouncer.']]},
    Prāṇāgnihotra:{structure:'An interiorized fire-offering centered on food and the vital breaths.',units:[['The body as altar','The external sacrificial fires are reinterpreted through the embodied person and the vital functions.'],['Offerings to the prāṇas','Food is offered ritually to the principal breaths, turning eating into a disciplined inner yajña.'],['Ritual interiorization','The text shows how a Vedic sacrificial model can be retained while its locus moves from the external altar into the living body.']]},
    Jābāla:{structure:'A dialogue text on Avimukta, renunciation and the highest ascetic.',units:[['Avimukta and Kāśī','The text identifies the sacred Avimukta with the place where Rudra gives liberating instruction, closely connecting the Upanishad with Vārāṇasī.'],['When may one renounce?','Its famous rule allows renunciation when genuine dispassion arises rather than requiring a rigid mechanical completion of every earlier āśrama.'],['The paramahaṃsa','The final ascetic ideal reduces outward possessions and marks while emphasizing knowledge and freedom from ordinary identity.']]},
    Bhikṣuka:{structure:'A short classification of mendicant renouncers.',units:[['Kuṭīcaka','A relatively settled renouncer maintains a close relation to the former social world.'],['Bahūdaka','The mendicant ranges more widely and lives through alms with stricter separation from household life.'],['Haṃsa and Paramahaṃsa','The final types represent increasingly radical detachment, culminating in the paramahaṃsa whose identity rests in self-knowledge rather than external status.']]},
    Nārada-Parivrājaka:{structure:'A large renunciation Upanishad on eligibility, initiation, classes of ascetics and conduct.',units:[['Eligibility and preparation','The text discusses who is qualified to enter the wandering life and the dispositions expected before formal abandonment.'],['Taking sannyāsa','Rites of transition, relinquishment of prior obligations and new ascetic discipline are described in detail.'],['Classes of renouncers','Several ascending types of sannyāsin are distinguished, allowing the text to map different degrees of outward and inward renunciation.'],['Knowledge and final freedom','Institutional rules ultimately point beyond themselves toward Brahman-knowledge and the condition in which conventional identity has been left behind.']]},
    Amṛtabindu:{structure:'A short meditation text on mind, Oṃ and liberation.',units:[['Mind as bondage and freedom','The famous opening contrast says that mind attached to objects binds, while mind freed from objects becomes the means to liberation.'],['Meditative stilling','The teaching moves from conceptual and sensory attachment toward the quieting required for direct knowledge.'],['Brahman beyond conceptual division','Mantra and contemplation culminate in a nondual account of the self rather than in the acquisition of a new external object.']]},
    Nādabindu:{structure:'A Yoga Upanishad on Oṃ, inner sound and absorption.',units:[['Oṃ and the contemplative field','The text begins from sacred sound as a support for interior concentration.'],['The sequence of inner sounds','The practitioner is instructed to attend to progressively subtler nāda rather than to external distraction.'],['Beyond sound','Nāda functions as a means: the culmination is the absorption of mind in the reality beyond the succession of audible forms.']]},
    Yogacūḍāmaṇi:{structure:'A subtle-body Yoga text on nāḍīs, cakras, kuṇḍalinī and the natural haṃsa mantra.',units:[['The subtle body','The text maps channels, centres and vital forces as the field in which yogic practice operates.'],['Kuṇḍalinī and breath','Prāṇāyāma and the awakening or upward movement of kuṇḍalinī are coordinated with the central channel.'],['Haṃsa and ajapā','Ordinary respiration is heard as an unceasing mantra, linking bodily life with contemplative remembrance.'],['Liberation','The technical sequence is not presented as an end in itself but as a means to the realization that ends bondage.']]},
    Jābāladarśana:{structure:'A developed eight-limbed Yoga teaching.',units:[['Yama and niyama','Ethical restraints and observances prepare the practitioner rather than being treated as optional preliminaries.'],['Āsana and prāṇāyāma','Posture and breath control stabilize the body and vital force.'],['Nāḍī purification and withdrawal','The subtle channels and senses are disciplined before the higher limbs.'],['Meditation and samādhi','Concentration culminates in contemplative absorption and liberation-oriented knowledge.']]},
    Amṛtanāda:{structure:'A six-limbed Yoga centered on Oṃ and meditative absorption.',units:[['Oṃ and inwardness','Mantra serves as the entry point into a progressively internal discipline.'],['Six limbs','Prāṇāyāma, pratyāhāra, dhyāna, dhāraṇā, tarka and samādhi form the characteristic sequence.'],['Goal','The limbs culminate in knowledge rather than in technical mastery for its own sake.']]},
    Kṣurikā:{structure:'A Yoga text using the razor metaphor for cutting bondage.',units:[['The meditative razor','Concentration is imagined as a sharpened instrument capable of severing the knots that bind the embodied person.'],['Breath and channels','Prāṇāyāma and movement through the nāḍīs supply the practical framework of the metaphor.'],['Cutting the bonds','The final purpose is release from identification with the psychophysical structure.']]},
    Tejobindu:{structure:'A strongly nondual Yoga Upanishad with an expanded contemplative discipline.',units:[['The luminous bindu','The point of light is a contemplative symbol for the reality that exceeds ordinary mental distinctions.'],['Expanded limbs of yoga','The text gives a more elaborate discipline than the familiar eight-limbed scheme, integrating restraint, contemplation and nondual insight.'],['Samādhi and nonduality','Absorption is interpreted through the claim that the distinctions imposed by mind do not divide Brahman itself.']]},
    Yogatattva:{structure:'A broad Yoga compendium combining knowledge, practice and liberation.',units:[['Knowledge and yoga','The text treats jñāna and yogic discipline as mutually supporting rather than as rival paths.'],['Prāṇāyāma and bodily discipline','Breath regulation and practical yogic procedures prepare the inner field.'],['Subtle processes','Nāḍīs, kuṇḍalinī and meditative signs are incorporated into the path.'],['Liberation','Technical practice is subordinated to the final recognition of the supreme reality.']]},
    Yogakuṇḍalinī:{structure:'A three-part Yoga Upanishad on breath, kuṇḍalinī and meditative techniques.',units:[['Prāṇa and the obstacle of habit','The text explains why the vital force does not naturally enter the central channel and prescribes disciplined methods to alter that condition.'],['Kuṇḍalinī and suṣumṇā','The awakening of kuṇḍalinī and its relation to the central channel are the technical heart of the work.'],['Higher mudrā and absorption','Advanced practices are directed toward the stilling and transcendence of ordinary mental activity.']]},
    Varāha:{structure:'Five chapters framed as instruction of Varāha to the sage Ṛbhu.',units:[['Tattvas and embodiment','The opening classifies the principles that make up embodied and cosmic experience.'],['Brahman-knowledge','The dialogue repeatedly turns classification back toward the reality that is not limited by those categories.'],['Yoga and samādhi','Later material integrates contemplative and yogic discipline with Vedāntic insight.'],['Jīvanmukti','The liberated person is described through freedom from identification while life continues.']]},
    Haṃsa:{structure:'A Yoga Upanishad on the haṃsa/so’ham mantra and subtle-body meditation.',units:[['Gautama and Sanatkumāra','The teaching is framed as a request for the means to Brahmavidyā.'],['The natural mantra','Breathing is interpreted through haṃsa/so’ham as an unceasing ajapā mantra.'],['Cakras and inner ascent','The practice is coordinated with subtle centres and inward concentration.'],['Paramahaṃsa','The symbolism of the swan culminates in the liberated identity beyond ordinary distinctions.']]},
    Maṇḍala-Brāhmaṇa:{structure:'A multi-part Yoga teaching associated with Yājñavalkya and the solar sphere.',units:[['Teacher and solar revelation','The text frames its instruction through the puruṣa of the solar maṇḍala.'],['Yoga discipline','Restraint, breath, concentration and internal perception are developed as an ordered path.'],['Inner light and absorption','The higher practice turns toward subtle luminosity and the cessation of ordinary mental differentiation.'],['Paramahaṃsa state','The conclusion describes the liberated ascetic whose knowledge is no longer dependent on external marks.']]},
    Śāṇḍilya:{structure:'A substantial Yoga Upanishad giving a developed multi-limbed discipline.',units:[['Yamas and niyamas','The text expands ethical restraints and observances beyond a minimal list.'],['Āsana and prāṇāyāma','Posture and breath control are taught with practical detail.'],['Nāḍīs and internal practice','Subtle-body physiology becomes part of the preparation for concentration.'],['Meditation and samādhi','The later limbs move from withdrawal to sustained contemplation and release.']]},
    Advayatāraka:{structure:'A Yoga Upanishad on the “nondual liberating” inner vision.',units:[['The three lakṣyas','The text distinguishes inner, outer and intermediate visual or contemplative targets.'],['Inner luminosity','Subtle lights and spaces are used to train attention beyond ordinary sensory form.'],['Śāmbhavī and the guru','The higher practice depends on focused vision and instruction rather than on spectacle.'],['Advaya','The final “tāraka” is nondual realization, not merely a visionary experience.']]},
    Nārāyaṇa:{structure:'A short Vaiṣṇava Upanishad on Nārāyaṇa as source and the eight-syllabled mantra.',units:[['Nārāyaṇa as source','Brahmā, Rudra, the gods, beings and cosmic elements are said to arise from Nārāyaṇa.'],['Nārāyaṇa as the all','The text collapses the distinction between the named deity and the supreme Upanishadic reality.'],['Oṃ namo Nārāyaṇāya','The eight-syllabled mantra is interpreted as a direct contemplative and salvific formula.']]},
    'Kali-Saṇṭāraṇa':{structure:'A very short dialogue of Nārada and Brahmā.',units:[['The question of Kali','Nārada asks how beings can cross the evils or disorder characteristic of Kali-yuga.'],['The sixteen names','Brahmā gives the Hare Rāma / Hare Kṛṣṇa sixteen-name formula as the answer.'],['Repetition','The power of divine-name recitation is presented with unusual directness and without the elaborate ritual apparatus found in many mantra texts.']]},
    Nṛsiṃhatāpanī:{structure:'Pūrva- and Uttara-Tāpanīya sections devoted to Nṛsiṃha mantra and metaphysics.',units:[['The Nṛsiṃha mantra','The Pūrva material analyzes the mantra, its syllables and ritual-contemplative force.'],['Oṃ and cosmic correspondences','Mantric analysis is connected with broader Upanishadic categories rather than treated as isolated magic.'],['States of consciousness','The Uttara material relates Nṛsiṃha, the self and the familiar waking–dream–sleep–fourth framework.'],['Supreme Brahman','The fierce avatāra is finally identified with the highest reality known through the Upanishads.']]},
    Gopālatāpanī:{structure:'Pūrva- and Uttara-Tāpanīya sections devoted to Gopāla-Kṛṣṇa.',units:[['Gopāla as Brahman','The text identifies Kṛṣṇa/Gopāla with the supreme reality using explicitly Upanishadic language.'],['Gopāla mantra','A Kṛṣṇa-centered mantra and its contemplative meaning are central to the Pūrva section.'],['Mathurā and sacred geography','Place is theologized: Mathurā and the devotional world of Kṛṣṇa become expressions of the supreme.'],['Uttara dialogues','Later material extends the theology through questions concerning Kṛṣṇa, his attendants and the meaning of worship.']]},
    Kṛṣṇa:{structure:'A short text of sacred correspondences around Kṛṣṇa’s form and Vraja world.',units:[['From earlier sages to Kṛṣṇa devotion','The text links figures of earlier sacred narrative with participation in Kṛṣṇa’s manifestation.'],['Vraja as cosmic symbolism','Persons, ornaments and features of Kṛṣṇa’s world are read as embodiments of Vedic or cosmic principles.'],['Kṛṣṇa as supreme meaning','The devotional narrative is thereby interpreted as a coded revelation rather than as a merely human story.']]},
    Vāsudeva:{structure:'A Vaiṣṇava text on Vāsudeva, mantra and sectarian marks.',units:[['Vāsudeva as supreme','The named deity is identified with the supreme Brahman.'],['Vaiṣṇava marks','The text interprets visible marks and substances used by Vaiṣṇava devotees in theological rather than merely social terms.'],['Mantra and identity','Sacred formula and bodily marking converge in remembrance of Vāsudeva as the indwelling reality.']]},
    Hayagrīva:{structure:'A mantra Upanishad devoted to Hayagrīva as lord of knowledge.',units:[['Hayagrīva and sacred learning','The horse-headed form of Viṣṇu is identified with the power that restores and protects Vedic knowledge.'],['Mantras','The text gives formulas for invoking Hayagrīva and connects their syllables with divine knowledge.'],['Knowledge and liberation','The deity is not only a patron of learning but a manifestation of the supreme consciousness to be realized.']]},
    Garuḍa:{structure:'A practical Atharvavedic mantra text directed against snakes and poison.',units:[['Garuḍa and serpents','The mythic opposition between Garuḍa and serpents supplies the ritual logic of the text.'],['Protective mantra','The Upanishad preserves formulas whose immediate purpose is protection from venom.'],['The breadth of the Upanishad category','Its practical function shows that the later 108-name corpus includes mantra and protective ritual alongside philosophical speculation.']]},
    Kaivalya:{structure:'A dialogue in which Aśvalāyana receives a meditation-centered teaching on the supreme.',units:[['Aśvalāyana’s request','The seeker asks Brahmā for the highest knowledge leading to liberation.'],['Meditation in the heart','Renunciation, devotion, concentration and an inward vision of the divine are coordinated.'],['Rudra and the Self','Śiva/Rudra language is used to describe the reality present as the inner self and as the cosmic whole.'],['Kaivalya','Liberation is the direct realization of that identity rather than a merely post-mortem reward.']]},
    Kālāgnirudra:{structure:'A Śaiva ritual Upanishad on sacred ash and tripuṇḍra.',units:[['The question to Kālāgnirudra','Sanatkumāra asks for the meaning and method of the Śaiva marks.'],['Bhasma','Sacred ash is interpreted through mantras and cosmic correspondences.'],['Tripuṇḍra','The three horizontal lines are applied to parts of the body with theological significance rather than as a bare sectarian badge.']]},
    Rudrākṣajābāla:{structure:'A dialogue on the origin, kinds and use of rudrākṣa beads.',units:[['Origin from Rudra','The beads are mythically traced to Rudra’s tears.'],['Kinds and wearing','Different forms, numbers and bodily placements are discussed.'],['Merit and remembrance','Wearing rudrākṣa is presented as a continuous bodily remembrance of Śiva.']]},
    Pañcabrahma:{structure:'A Śaiva Upanishad on the fivefold manifestation of Śiva.',units:[['Five faces','Sadyojāta, Vāmadeva, Aghora, Tatpuruṣa and Īśāna are distinguished.'],['Cosmic correspondences','The five forms are mapped onto directions, elements, functions and levels of manifestation.'],['One Brahman','The multiplicity of faces is finally read as a fivefold disclosure of one supreme reality.']]},
    Rudrahṛdaya:{structure:'A theological Upanishad on Rudra as the heart or inner reality of all.',units:[['Rudra and Umā','Śiva and Śakti are presented as inseparable aspects of the supreme.'],['Śiva and Viṣṇu','The text explicitly identifies or coordinates deities often separated by sectarian polemic.'],['The inner unity','The theological reconciliation rests on the Upanishadic claim that one consciousness underlies the many divine names.']]},
    Gaṇapati:{structure:'A short Atharvavedic-style text identifying Gaṇapati with the supreme principle.',units:[['Gaṇapati as immediate reality','The deity is praised not only as remover of obstacles but as the visible form of the ultimate.'],['Cosmic identity','Elements, speech, consciousness and the great Vedic formulae are gathered into Gaṇapati’s identity.'],['Mantra','The well-known Gaṇeśa mantra and seed syllable are interpreted within a compact Upanishadic liturgy.']]},
    Devī:{structure:'A Śākta Upanishad in which the Goddess declares her own supreme identity.',units:[['The gods question the Goddess','The narrative frame allows Devī to answer directly who she is.'],['Devī as Brahman','She identifies herself with Brahman, knowledge and ignorance, the gods, elements and the whole field of opposites.'],['Mantra and praise','The metaphysical declaration is joined to mantric and devotional praise rather than separated from worship.']]},
    Bahvṛca:{structure:'A short hymn-like Śākta Upanishad identifying the Goddess with the all.',units:[['The Goddess before the cosmos','Devī is presented as the reality from which creation arises.'],['Immanence','She is identified with beings, powers, knowledge and the manifest world.'],['Supreme unity','The text uses strongly nondual language to make goddess theology itself a statement about Brahman.']]},
    Tripurātāpinī:{structure:'A Śrīvidyā-oriented Tāpanīya Upanishad on Tripurasundarī, mantra and contemplation.',units:[['Tripurā and the threefold cosmos','The Goddess is interpreted through recurring triads and the symbolism of the “three cities.”'],['Mantra analysis','The syllables of the Śrīvidyā mantra are treated as condensed forms of cosmic and divine reality.'],['Yantra and internalization','Contemplative geometry and bodily/cosmic correspondences move worship inward.'],['Supreme consciousness','The technical symbolism culminates in identification of Tripurā with the highest consciousness.']]},
    Bhāvanā:{structure:'A Śrīvidyā text that internalizes the Śrīcakra as the human and cosmic body.',units:[['The body as Śrīcakra','Parts of the ritual diagram are mapped onto faculties, powers and structures of embodied awareness.'],['Internal worship','External yantra worship becomes a contemplative recognition of the same divine order within.'],['Tripurasundarī and consciousness','The final aim is not diagrammatic knowledge by itself but recognition of the Goddess as the consciousness through which the whole mapping is known.']]}
  };

  let shade=null,reader=null,currentSources=[];
  function sourceObj(x){if(!x)return null;if(typeof x==='string')return{title:x,detail:'',url:''};return{title:x.title||x.t||x.citation||x.text||'Source',detail:x.detail||x.d||x.note||'',url:x.url||x.u||x.href||''};}
  function sourcesFor(name,e,group){
    const out=[...arr(e.sources),...arr(e.bibliography),...arr(e.primarySources)].map(sourceObj).filter(Boolean);
    const standard={
      'Sāmānya Vedānta':['K. Narayanasvami Aiyar — Thirty Minor Upanishads','Paul Deussen — Sixty Upanishads of the Veda','Upaniṣad Brahmayogin — collected minor-Upanishad commentaries'],
      'Sannyāsa':['Patrick Olivelle — The Samnyasa Upanisads','K. Narayanasvami Aiyar — Thirty Minor Upanishads','Upaniṣad Brahmayogin — minor-Upanishad commentarial tradition'],
      'Yoga':['K. Narayanasvami Aiyar — Thirty Minor Upanishads','Yoga Upanishads — Adyar / Upaniṣad Brahmayogin editions','Studies of the Yoga Upanishads and early Haṭha-yoga traditions'],
      'Vaiṣṇava':['A. Mahadeva Sastri — The Vaiṣṇava Upanishads','Upaniṣad Brahmayogin — Vaiṣṇava Upanishad commentaries','Vaiṣṇava Vedānta citations and mantra traditions'],
      'Śaiva':['Śaiva Upanishads — Sanskrit editions and Upaniṣad Brahmayogin commentaries','K. Narayanasvami Aiyar — minor Upanishad translations','Studies of Śaiva Upanishadic ritual and theology'],
      'Śākta':['Śākta Upanishads — Adyar / Sanskrit editions','A. G. Krishna Warrier — The Śākta Upaniṣads','Studies of Śrīvidyā and Śākta Upanishadic literature']
    }[group]||[];
    standard.forEach(x=>out.push({title:x,detail:'Used for textual comparison, historical context or later reception.',url:''}));
    out.push({title:'Muktikā Upaniṣad — traditional 108-name list',detail:'Traditional sequence and Vedic association.',url:'https://sanskritdocuments.org/doc_upanishhat/muktika.html'});
    out.push({title:'SanskritDocuments — Upanishad collection',detail:'Sanskrit e-text directory used to cross-check titles and received texts.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    const art=artFor(name,e);if(art?.href)out.push({title:'Textual witness / edition image',detail:art.cap,url:art.href});
    const seen=new Set();return out.filter(s=>{const k=norm(s.title+' '+s.url);if(!k||seen.has(k))return false;seen.add(k);return true;});
  }
  const refsDefault=()=>Array.from({length:Math.min(3,currentSources.length)},(_,i)=>i+1);
  const cite=refs=>(refs?.length?refs:refsDefault()).filter(n=>n>0&&n<=currentSources.length).map(n=>`<sup class="ch-cite"><button type="button" data-up20-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const P=(text,refs)=>text?`<p>${esc(text)}${cite(refs)}</p>`:'';

  function themeText(name,theme,themes,group,index){
    const others=themes.filter((_,i)=>i!==index).slice(0,2);
    const bridge=others.length?` It is read together with ${others.join(' and ')}, so it should not be isolated from the rest of the text’s argument.`:'';
    if(group==='Yoga')return `${theme} functions as part of a practical discipline in the ${name} Upanishad rather than as a detached technical curiosity.${bridge} The text’s yogic vocabulary is ultimately directed toward mastery of attention and release, not toward the collection of extraordinary experiences.`;
    if(group==='Sannyāsa')return `${theme} helps define what renunciation means in the ${name} Upanishad.${bridge} The Sannyāsa texts repeatedly distinguish an outward change of status from the deeper abandonment of possessiveness, identity and attachment that makes knowledge possible.`;
    if(group==='Vaiṣṇava')return `${theme} is one of the ways the ${name} Upanishad joins devotion to Upanishadic theology.${bridge} The named deity, mantra or sacred practice is presented as a disclosure of the supreme rather than as something separate from the question of Brahman and liberation.`;
    if(group==='Śaiva')return `${theme} belongs to the specifically Śaiva vocabulary of the ${name} Upanishad.${bridge} Ritual marks or divine forms are therefore interpreted theologically: they point to Rudra or Śiva as the reality underlying the embodied practitioner and the cosmos.`;
    if(group==='Śākta')return `${theme} is one aspect of the Goddess-centered teaching of the ${name} Upanishad.${bridge} The text uses mantra, divine form or contemplative symbolism to identify Śakti not merely as one power within the world but as the consciousness and source through which the world is known.`;
    return `${theme} is one of the organizing Vedāntic concerns of the ${name} Upanishad.${bridge} The text uses this theme to move the reader away from identification with changing names, forms or functions and toward a more stable account of self, knowledge and liberation.`;
  }

  function sectionsFor(name,e,button){
    const group=groupOf(name),meta=GROUP_META[group],themes=uniq(arr(e.themes)),special=SPECIAL[name];
    const date=[];
    date.push(e.period?String(e.period):meta.date);
    date.push(`In the received Muktikā canon it is Upanishad No. ${N[name]} and is associated with the ${button.dataset.veda||'Vedic'} tradition. That canonical association is important for traditional classification but is not by itself a historical dating argument.`);
    if(e.milieu)date.push(String(e.milieu));
    if(e.datingBasis)date.push(`Modern dating arguments have relied on ${String(e.datingBasis).replace(/^./,c=>c.toLowerCase())}.`);
    if(e.status)date.push(String(e.status));

    const text=[];
    if(special?.structure)text.push(special.structure);
    else if(e.structure)text.push(String(e.structure));
    else text.push(`The ${name} Upanishad is transmitted as an independent ${group} text in the later 108-Upanishad corpus. The surviving work is better described through its actual sequence of topics than forced into modern chapter divisions when the editions do not agree on such divisions.`);
    if(e.manuscripts)text.push(String(e.manuscripts));
    if(e.history)text.push(String(e.history));
    text.push(meta.transmission);
    const art=artFor(name,e);
    if(art&&AIYAR_SET.has(name)&&name!=='Vajrasūcī')text.push(`The infobox reproduces the title page of K. Narayanasvami Aiyar’s 1914 public-domain collection because that volume actually contains a translation of this Upanishad. It is identified as an early printed edition, not mislabelled as an ancient manuscript.`);

    const contents=[];
    if(e.overview)contents.push(String(e.overview));
    if(e.profile)contents.push(String(e.profile));
    const subs=[];
    if(special?.units?.length)special.units.forEach(([t,s])=>subs.push({title:t,paragraphs:[s]}));
    else themes.forEach((t,i)=>subs.push({title:t,paragraphs:[themeText(name,t,themes,group,i)]}));
    const features=uniq([...arr(e.namedFeatures),...arr(e.primaryEvidence),...arr(e.primaryPassages),...arr(e.keyPassages),...arr(e.keyContents)]);
    if(features.length)subs.push({title:'Named passages, practices and technical features',items:features});

    const interpretation=[];
    if(themes.length)interpretation.push(`The principal themes preserved in the received text are ${themes.join(', ')}. Their importance lies in the way they are combined inside one short Upanishadic work rather than in any one keyword taken by itself.`);
    if(e.ritualHistory)interpretation.push(String(e.ritualHistory));
    if(e.dependencies?.length)interpretation.push(`The text should also be read beside its stated parallels or dependencies: ${uniq(arr(e.dependencies)).join('; ')}.`);
    interpretation.push(meta.reception);

    const reception=[];
    if(e.significance)reception.push(String(e.significance));
    if(e.reception)reception.push(String(e.reception));
    if(e.scholarlyPositions?.length)reception.push(`Modern scholarship has proposed several named positions: ${uniq(arr(e.scholarlyPositions)).join('; ')}.`);
    if(e.scholarlyDebates?.length)reception.push(`Points of debate include ${uniq(arr(e.scholarlyDebates)).join('; ')}.`);
    reception.push(`For this article the distinction between the root text, later commentary, modern translation and sectarian reception is kept explicit. A doctrine attributed to a later school is not silently inserted into the wording of the Upanishad itself.`);

    return [
      {title:'Date, classification and textual setting',paragraphs:date},
      {title:'Text, manuscripts and transmission',paragraphs:text,art},
      {title:'Structure and contents',paragraphs:contents,subs},
      {title:group==='Yoga'?'Practice and interpretation':group==='Sannyāsa'?'Renunciation and liberation':'Teaching and interpretation',paragraphs:interpretation},
      {title:'Reception and significance',paragraphs:reception}
    ];
  }

  function tableOfContents(secs){return secs.map((s,i)=>`<li><a href="#up20-${i}">${esc(s.title)}</a>${s.subs?.length?`<ol>${s.subs.map((sub,j)=>`<li><a href="#up20-${i}-${j}">${esc(sub.title)}</a></li>`).join('')}</ol>`:''}</li>`).join('');}
  function figureHTML(art){if(!art)return'';return `<figure class="ch-thumb up20-thumb"><a href="${esc(art.href||art.src)}" target="_blank" rel="noopener"><img src="${esc(art.src)}" loading="lazy" alt=""></a><figcaption>${esc(art.cap||'Textual witness or historical edition.')}</figcaption></figure>`;}
  function sectionHTML(s,i){let b='';if(s.art)b+=figureHTML(s.art);b+=(s.paragraphs||[]).map(x=>P(x)).join('');(s.subs||[]).forEach((sub,j)=>{b+=`<h3 id="up20-${i}-${j}">${esc(sub.title)}</h3>${(sub.paragraphs||[]).map(x=>P(x)).join('')}${sub.items?.length?`<ul>${sub.items.map(x=>`<li>${esc(x)}${cite()}</li>`).join('')}</ul>`:''}`;});return `<section class="kena-section ch-section" id="up20-${i}"><h2>${esc(s.title)}</h2>${b}</section>`;}
  function referencesHTML(){return `<section class="kena-section ch-section" id="up20-refs"><h2>References</h2><ol class="ch-reference-list">${currentSources.map((s,i)=>`<li><b>${i+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;}

  function infobox(name,e,button){
    const group=groupOf(name),art=artFor(name,e),themes=uniq(arr(e.themes));
    const rows=[
      ['Date',e.period||'Later Upanishadic period; exact date uncertain'],
      ['Type',group+' Upanishad'],
      ['Veda',button.dataset.veda||'Traditional Muktikā association'],
      ['Textual setting',e.traditionalAuthor||e.structure||'Independent later Upanishad'],
      ['Structure',SPECIAL[name]?.structure||e.structure||'Short independent text; divisions vary by edition'],
      ['Muktika',`No. ${N[name]}`],
      ['Main focus',themes.slice(0,3).join('; ')||'Self-knowledge and liberation']
    ];
    return `<aside class="kena-infobox ch-infobox"><div class="kena-infobox-title">${esc(name)} Upanishad</div><div class="ch-dev">${esc(deva(name,e))}</div>${art?`<figure class="wiki-infobox-image"><a href="${esc(art.href||art.src)}" target="_blank" rel="noopener"><img src="${esc(art.src)}" loading="lazy" alt="${esc(name)} textual witness"></a><figcaption>${esc(art.cap||'')}</figcaption></figure>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function leadHTML(name,e,button){const group=groupOf(name),themes=uniq(arr(e.themes));const a=e.overview||`${name} is a ${group} Upanishad in the Muktikā canon.`;const b=e.significance||`Its importance lies in the way it develops ${themes.slice(0,3).join(', ')||'its central teaching'} within the later Upanishadic corpus.`;const c=`The received tradition associates it with the ${button.dataset.veda||'Vedic'} corpus and numbers it ${N[name]} in the Muktikā list. This article treats that traditional classification separately from historical dating, and it distinguishes the wording of the root text from later commentary and modern interpretation.`;return P(a)+P(b)+P(c);}

  function close(){shade?.remove();reader?.remove();document.querySelector('.up20-source-card')?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}
  function sourceCard(n){const s=currentSources[n-1];if(!s)return;document.querySelector('.up20-source-card')?.remove();const c=document.createElement('aside');c.className='itihasa-source-card ch-source-card up20-source-card';c.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.title)}</strong>${s.detail?`<p>${esc(s.detail)}</p>`:''}${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(c);c.querySelector('button')?.addEventListener('click',()=>c.remove());}

  function openMinor(button,name){
    close();const e=entry(name),group=groupOf(name);currentSources=sourcesFor(name,e,group);const secs=sectionsFor(name,e,button);
    button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up-wiki-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up-wiki-reader ch-wiki-reader up20-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${name} Upanishad article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(name)} Upanishad</h1><div class="up-title-dev">${esc(deva(name,e))}</div></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article up-wiki-article ch-wiki-article up20-article">${infobox(name,e,button)}<div class="kena-lead ch-lead">${leadHTML(name,e,button)}</div><nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${tableOfContents(secs)}<li><a href="#up20-refs">References</a></li></ol></nav>${secs.map(sectionHTML).join('')}${referencesHTML()}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }

  window.openScriptureEncyclopedia=function(button){
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';const kind=button?.dataset?.kind||'';
    if(kind==='Upaniṣad'&&ALL.has(name))return openMinor(button,name);
    const result=previousOpen(button);
    // Correct the Kaushitaki PDF preview with a real renderable Wikimedia thumbnail.
    if(kind==='Upaniṣad'&&name==='Kauṣītaki'){
      const img=document.querySelector('.up18-reader .wiki-infobox-image img,.pr17-reader .wiki-infobox-image img');
      if(img)img.src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Kaushitaki_Brahmana_Upanishad_%28IA_dli.bengal.10689.10032%29.pdf/page1-500px-Kaushitaki_Brahmana_Upanishad_%28IA_dli.bengal.10689.10032%29.pdf.jpg';
    }
    return result;
  };

  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-up20-note]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();sourceCard(Number(b.dataset.up20Note));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.up20-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('up20-style')){const st=document.createElement('style');st.id='up20-style';st.textContent=`
    .up20-article .ch-lead{min-height:370px}.up20-article .ch-section h3{margin-top:25px!important}.up20-article .ch-section p{margin-bottom:15px!important}.up20-article .ch-toc{max-width:710px!important}.up20-article .ch-toc>ol>li>ol{margin:4px 0 7px 20px!important}.up20-article .ch-section ul{margin:8px 0 18px 1.25em}.up20-article .ch-section li{margin:0 0 7px!important}.up20-thumb{max-width:300px}.up20-source-card{font-family:Merriweather,Georgia,serif!important}@media(max-width:760px){.up20-article .ch-lead{min-height:0}.up20-thumb{max-width:none;width:100%}}
  `;document.head.append(st);}
  window.SCRIPTURE_ALL_UPANISHADS_DEEP_V20=true;
})();
