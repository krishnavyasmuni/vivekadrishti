(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const categoryAbout = {
    'Mukhya': 'One of the principal Upaniṣads: an early philosophical text concerned with Brahman, Ātman, consciousness, liberation and the meaning of Vedic teaching.',
    'Sāmānya Vedānta': 'A general Vedānta Upaniṣad concerned with the self, Brahman, knowledge and liberation rather than one particular sectarian deity or practice.',
    'Sannyāsa': 'A renunciatory Upaniṣad concerned with ascetic life, detachment, the marks of the renouncer and liberation through knowledge.',
    'Yoga': 'A Yoga Upaniṣad concerned with meditative practice, breath, mantra, the subtle body, concentration and liberation.',
    'Vaiṣṇava': 'A Vaiṣṇava Upaniṣad presenting Viṣṇu, Nārāyaṇa, Rāma, Kṛṣṇa or another Vaiṣṇava form through Vedic and Vedāntic language.',
    'Śaiva': 'A Śaiva Upaniṣad concerned with Rudra-Śiva, Śaiva symbols or practice, and the identity of the supreme reality with Śiva.',
    'Śākta': 'A Śākta Upaniṣad centred on Devī or Śakti, often joining goddess theology with mantra, contemplative practice and Vedāntic metaphysics.'
  };

  const specialAbout = {
    'Īśāvāsya': 'A compact meditation on seeing the whole world as pervaded by the Lord, holding action and renunciation together, and knowing the Self beyond death.',
    'Kena': 'Asks what power impels the mind, speech and senses, and teaches Brahman as the reality behind every faculty yet beyond their grasp.',
    'Kaṭha': 'The dialogue of Naciketas and Yama: death, immortality, the Self, disciplined choice and the path beyond rebirth.',
    'Praśna': 'Six students put six questions to the sage Pippalāda about creation, prāṇa, the senses, dream, Oṃ and the supreme person.',
    'Muṇḍaka': 'Contrasts lower and higher knowledge, describes Brahman through striking images, and emphasizes knowledge and renunciation as the way to liberation.',
    'Māṇḍūkya': 'Twelve terse verses interpret Oṃ through waking, dream, deep sleep and the transcendent fourth state, turīya.',
    'Taittirīya': 'Moves from Vedic education and ethics to the five sheaths of the person and a celebrated inquiry into Brahman as bliss.',
    'Aitareya': 'Reflects on creation, embodiment and birth, culminating in the identification of consciousness as the deepest reality of the person.',
    'Chāndogya': 'A vast collection of teachings on sacred sound, meditation and the Self, including Uddālaka’s teaching “tat tvam asi”.',
    'Bṛhadāraṇyaka': 'One of the oldest and largest Upaniṣads: Yājñavalkya, “neti neti”, karma, rebirth, the Self and the search for what cannot perish.',
    'Kauṣītaki': 'Explores prāṇa, consciousness, rebirth and the relation between the individual person and the highest reality.',
    'Śvetāśvatara': 'A strongly theistic Upaniṣad combining meditation and yoga with teachings on the supreme Lord, Rudra and the source of the cosmos.',
    'Maitrāyaṇī': 'A later philosophical Upaniṣad on the Self, mind, bondage, time, rebirth and meditative disciplines.',
    'Vajrasūcī': 'A sharp inquiry into who is truly a brāhmaṇa, rejecting simple identification with birth, body, learning or ritual status.',
    'Muktikā': 'A dialogue of Rāma and Hanumān on liberation and the study of the Upaniṣads; it supplies the famous list of 108.',
    'Nārāyaṇa': 'Identifies Nārāyaṇa with the supreme reality and places Vaiṣṇava theology in a concise Vedic-Upaniṣadic frame.',
    'Kali-Saṇṭāraṇa': 'A very short Vaiṣṇava text presenting repetition of divine names as a means of crossing the difficulties of the Kali age.',
    'Nṛsiṃhatāpanī': 'A Vaiṣṇava text focused on Nṛsiṃha, mantra, sacred syllables and the interpretation of the deity as supreme Brahman.',
    'Gopālatāpanī': 'A Kṛṣṇa-centred Upaniṣad on Gopāla-Kṛṣṇa, mantra, worship and the identity of Kṛṣṇa with the highest reality.',
    'Rāmarahasya': 'A Rāma-centred Upaniṣad concerned with Rāma mantra, sacred names and the theological meaning of Rāma.',
    'Rāmatāpanī': 'Develops Rāma theology through mantra, contemplative symbolism and identification of Rāma with Brahman.',
    'Gaṇapati': 'Identifies Gaṇapati with the absolute reality and gives the well-known Gaṇapati Atharvaśīrṣa style of mantra and contemplation.',
    'Devī': 'Presents Devī as the supreme reality, joining goddess theology to the language of Brahman and cosmic power.',
    'Tripurātāpinī': 'A Śrīvidyā-oriented text on Tripurā, mantra, sacred diagrams and contemplative interpretation.',
    'Dakṣiṇāmūrti': 'Presents Śiva as the silent supreme teacher and connects knowledge of the Self with the Dakṣiṇāmūrti form.',
    'Kaivalya': 'A compact meditation on liberation, devotion to Rudra-Śiva and realization of the Self as the supreme reality.',
    'Haṃsa': 'Uses the natural rhythm of the breath and the haṃsa/so’ham mantra as a contemplative path toward realization.',
    'Śāṇḍilya': 'A Yoga Upaniṣad describing yogic discipline, ethical restraints, posture, breath, concentration and contemplative practice.',
    'Mahāvākya': 'A short contemplative Upaniṣad concerned with great Vedāntic sayings and realization of the identity of Self and Brahman.'
  };

  const upanishads = {
    'Mukhya': [
      ['Aitareya','Ṛgveda'],['Kauṣītaki','Ṛgveda'],['Kena','Sāmaveda'],['Chāndogya','Sāmaveda'],['Maitrāyaṇī','Sāmaveda'],
      ['Kaṭha','Kṛṣṇa Yajurveda'],['Taittirīya','Kṛṣṇa Yajurveda'],['Śvetāśvatara','Kṛṣṇa Yajurveda'],['Īśāvāsya','Śukla Yajurveda'],['Bṛhadāraṇyaka','Śukla Yajurveda'],
      ['Praśna','Atharvaveda'],['Muṇḍaka','Atharvaveda'],['Māṇḍūkya','Atharvaveda']
    ],
    'Sāmānya Vedānta': [
      ['Ātmabodha','Ṛgveda'],['Mudgala','Ṛgveda'],['Vajrasūcī','Sāmaveda'],['Mahā','Sāmaveda'],['Sāvitrī','Sāmaveda'],
      ['Garbha','Kṛṣṇa Yajurveda'],['Sarvasāra','Kṛṣṇa Yajurveda'],['Śukarahasya','Kṛṣṇa Yajurveda'],['Skanda','Kṛṣṇa Yajurveda'],['Śārīraka','Kṛṣṇa Yajurveda'],['Ekākṣara','Kṛṣṇa Yajurveda'],['Akṣi','Kṛṣṇa Yajurveda'],['Prāṇāgnihotra','Kṛṣṇa Yajurveda'],
      ['Subāla','Śukla Yajurveda'],['Mantrikā','Śukla Yajurveda'],['Nirālamba','Śukla Yajurveda'],['Paiṅgala','Śukla Yajurveda'],['Adhyātma','Śukla Yajurveda'],['Muktikā','Śukla Yajurveda'],
      ['Annapūrṇā','Atharvaveda'],['Sūrya','Atharvaveda'],['Ātma','Atharvaveda']
    ],
    'Sannyāsa': [
      ['Nirvāṇa','Ṛgveda'],['Āruṇi','Sāmaveda'],['Maitreya','Sāmaveda'],['Sannyāsa','Sāmaveda'],['Kuṇḍikā','Sāmaveda'],
      ['Brahma','Kṛṣṇa Yajurveda'],['Avadhūta','Kṛṣṇa Yajurveda'],['Kaṭharudra','Kṛṣṇa Yajurveda'],
      ['Jābāla','Śukla Yajurveda'],['Paramahaṃsa','Śukla Yajurveda'],['Bhikṣuka','Śukla Yajurveda'],['Turīyātītāvadhūta','Śukla Yajurveda'],['Yājñavalkya','Śukla Yajurveda'],['Śāṭyāyanīya','Śukla Yajurveda'],
      ['Nāradaparivrājaka','Atharvaveda'],['Paramahaṃsa-Parivrājaka','Atharvaveda'],['Parabrahma','Atharvaveda']
    ],
    'Yoga': [
      ['Nādabindu','Ṛgveda'],['Yogacūḍāmaṇi','Sāmaveda'],['Jābāladarśana','Sāmaveda'],
      ['Amṛtabindu','Kṛṣṇa Yajurveda'],['Amṛtanāda','Kṛṣṇa Yajurveda'],['Kṣurikā','Kṛṣṇa Yajurveda'],['Tejobindu','Kṛṣṇa Yajurveda'],['Dhyānabindu','Kṛṣṇa Yajurveda'],['Brahmavidyā','Kṛṣṇa Yajurveda'],['Yogatattva','Kṛṣṇa Yajurveda'],['Yogaśikhā','Kṛṣṇa Yajurveda'],['Yogakuṇḍalinī','Kṛṣṇa Yajurveda'],['Varāha','Kṛṣṇa Yajurveda'],
      ['Haṃsa','Śukla Yajurveda'],['Triśikhi-Brāhmaṇa','Śukla Yajurveda'],['Maṇḍala-Brāhmaṇa','Śukla Yajurveda'],['Advayatāraka','Śukla Yajurveda'],
      ['Śāṇḍilya','Atharvaveda'],['Pāśupatabrahma','Atharvaveda'],['Mahāvākya','Atharvaveda']
    ],
    'Vaiṣṇava': [
      ['Vāsudeva','Sāmaveda'],['Avyakta','Sāmaveda'],['Nārāyaṇa','Kṛṣṇa Yajurveda'],['Kali-Saṇṭāraṇa','Kṛṣṇa Yajurveda'],['Tārasāra','Śukla Yajurveda'],
      ['Nṛsiṃhatāpanī','Atharvaveda'],['Tripādvibhūti-Mahānārāyaṇa','Atharvaveda'],['Rāmarahasya','Atharvaveda'],['Rāmatāpanī','Atharvaveda'],['Gopālatāpanī','Atharvaveda'],['Kṛṣṇa','Atharvaveda'],['Hayagrīva','Atharvaveda'],['Dattātreya','Atharvaveda'],['Garuḍa','Atharvaveda']
    ],
    'Śaiva': [
      ['Akṣamālikā','Ṛgveda'],['Rudrākṣajābāla','Sāmaveda'],['Jābāli','Sāmaveda'],
      ['Kaivalya','Kṛṣṇa Yajurveda'],['Kālāgnirudra','Kṛṣṇa Yajurveda'],['Dakṣiṇāmūrti','Kṛṣṇa Yajurveda'],['Rudrahṛdaya','Kṛṣṇa Yajurveda'],['Pañcabrahma','Kṛṣṇa Yajurveda'],
      ['Atharvaśiras','Atharvaveda'],['Atharvaśikhā','Atharvaveda'],['Bṛhajjābāla','Atharvaveda'],['Śarabha','Atharvaveda'],['Bhasmajābāla','Atharvaveda'],['Gaṇapati','Atharvaveda']
    ],
    'Śākta': [
      ['Tripurā','Ṛgveda'],['Saubhāgyalakṣmī','Ṛgveda'],['Bahvṛca','Ṛgveda'],['Sarasvatī-rahasya','Kṛṣṇa Yajurveda'],
      ['Sītā','Atharvaveda'],['Tripurātāpinī','Atharvaveda'],['Devī','Atharvaveda'],['Bhāvanā','Atharvaveda']
    ]
  };

  const vedas = [
    {
      name:'Ṛgveda', about:'The oldest Vedic collection, centred on metrical hymns to deities and cosmic powers.',
      groups:{
        'Saṃhitā / recensions':['Śākala Saṃhitā','Bāṣkala tradition'],
        'Brāhmaṇas':['Aitareya Brāhmaṇa','Kauṣītaki (Śāṅkhāyana) Brāhmaṇa'],
        'Āraṇyakas':['Aitareya Āraṇyaka','Kauṣītaki / Śāṅkhāyana Āraṇyaka']
      }
    },
    {
      name:'Sāmaveda', about:'A Veda of melodies and liturgical chanting, drawing much of its verse material from the Ṛgveda for sacrificial song.',
      groups:{
        'Saṃhitā / recensions':['Kauthuma Saṃhitā','Rāṇāyanīya Saṃhitā','Jaiminīya (Talavakāra) Saṃhitā'],
        'Brāhmaṇas':['Tāṇḍya / Pañcaviṃśa Brāhmaṇa','Ṣaḍviṃśa Brāhmaṇa','Sāmavidhāna Brāhmaṇa','Ārṣeya Brāhmaṇa','Daivata Brāhmaṇa','Mantra / Chāndogya Brāhmaṇa','Saṃhitopaniṣad Brāhmaṇa','Vaṃśa Brāhmaṇa','Jaiminīya Brāhmaṇa','Jaiminīya Ārṣeya Brāhmaṇa','Jaiminīya Upaniṣad Brāhmaṇa'],
        'Āraṇyakas':['Talavakāra / Jaiminīya-Upaniṣad Āraṇyaka','Chāndogya Āraṇyaka']
      }
    },
    {
      name:'Śukla Yajurveda', about:'The “White” Yajurveda, in which sacrificial formulas are collected separately from their principal Brāhmaṇa exposition.',
      groups:{
        'Saṃhitā / recensions':['Vājasaneyi Saṃhitā — Mādhyaṃdina','Vājasaneyi Saṃhitā — Kāṇva'],
        'Brāhmaṇas':['Śatapatha Brāhmaṇa — Mādhyaṃdina','Śatapatha Brāhmaṇa — Kāṇva'],
        'Āraṇyakas':['Bṛhadāraṇyaka layer of the Śatapatha tradition']
      }
    },
    {
      name:'Kṛṣṇa Yajurveda', about:'The “Black” Yajurveda traditions intermingle sacrificial formulas with explanatory prose in several surviving schools.',
      groups:{
        'Saṃhitā / recensions':['Taittirīya Saṃhitā','Maitrāyaṇī Saṃhitā','Kāṭhaka Saṃhitā','Kapiṣṭhala-Kaṭha Saṃhitā'],
        'Brāhmaṇas':['Taittirīya Brāhmaṇa','Vādhūla Anvākhyāna / associated fragmentary material'],
        'Āraṇyakas':['Taittirīya Āraṇyaka','Maitrāyaṇīya Āraṇyaka']
      }
    },
    {
      name:'Atharvaveda', about:'A Vedic collection rich in domestic rites, healing, royal ritual, protective formulas and speculative hymns.',
      groups:{
        'Saṃhitā / recensions':['Śaunaka Saṃhitā','Paippalāda Saṃhitā'],
        'Brāhmaṇas':['Gopatha Brāhmaṇa'],
        'Āraṇyakas':['No extant Atharvavedic Āraṇyaka is known']
      }
    }
  ];

  const itihasa = [
    ['Vālmīki Rāmāyaṇa','Epic narrative of Rāma, Sītā, Lakṣmaṇa and Hanumān, combining kingship, dharma, devotion and the ideal of righteous action.'],
    ['Mahābhārata','The enormous epic of the Kuru conflict, containing narrative, dharma, philosophy and theology; the Bhagavad Gītā occurs within the Bhīṣma-parvan.'],
    ['Harivaṃśa','A supplement to the Mahābhārata devoted especially to Kṛṣṇa, the Yādavas, genealogies and cosmological narrative.']
  ];

  const puranaAbout = {
    'Brahma Purāṇa':'An early Purāṇic compilation on creation, sacred geography, pilgrimage and religious observance.',
    'Padma Purāṇa':'A very large Purāṇa spanning cosmology, pilgrimage, sacred places, ritual and several devotional traditions.',
    'Viṣṇu Purāṇa':'A major Vaiṣṇava Purāṇa on cosmology, dynasties, avatāras and Viṣṇu as the supreme reality.',
    'Śiva Purāṇa':'A Śaiva Purāṇa devoted to Śiva, his forms, myths, worship and theology.',
    'Bhāgavata Purāṇa':'A foundational bhakti Purāṇa especially famous for its theology of Kṛṣṇa, avatāras and loving devotion.',
    'Nāradīya Purāṇa':'A devotional and ritual Purāṇa associated with Nārada, containing material on worship, pilgrimage and religious practice.',
    'Mārkaṇḍeya Purāṇa':'A diverse Purāṇa whose most famous section is the Devī Māhātmya, a central scripture of Goddess worship.',
    'Agni Purāṇa':'An encyclopaedic Purāṇa ranging from ritual and theology to polity, architecture, grammar, medicine and the arts.',
    'Bhaviṣya Purāṇa':'A composite Purāṇa with ritual, social, dynastic and “future” or prophetic-style sections accumulated over a long history.',
    'Brahmavaivarta Purāṇa':'A later Purāṇa strongly associated with Kṛṣṇa and Rādhā, creation theology and devotional mythology.',
    'Liṅga Purāṇa':'A Śaiva Purāṇa centred on the liṅga, Śiva, cosmology, sacred time and worship.',
    'Varāha Purāṇa':'A Vaiṣṇava Purāṇa framed around Varāha, with substantial pilgrimage and sacred-geography material.',
    'Skanda Purāṇa':'The largest Purāṇa, especially rich in regional sacred geography, pilgrimage traditions and Śaiva material.',
    'Vāmana Purāṇa':'A Purāṇa named for Vāmana but containing substantial Śaiva, cosmological and geographical material.',
    'Kūrma Purāṇa':'A Purāṇa framed through the Kūrma incarnation, combining Vaiṣṇava, Śaiva and yogic teaching.',
    'Matsya Purāṇa':'Known for the flood narrative and extensive material on kingship, temple construction, iconography and genealogies.',
    'Garuḍa Purāṇa':'A Vaiṣṇava Purāṇa famous for ritual and afterlife material, alongside medicine, ethics and religious observance.',
    'Brahmāṇḍa Purāṇa':'A cosmological Purāṇa containing large-scale accounts of the universe and important material connected with the Lalitā tradition.'
  };

  const puranas = {
    'Mahāpurāṇas':['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Bhāgavata Purāṇa','Nāradīya Purāṇa','Mārkaṇḍeya Purāṇa','Agni Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Liṅga Purāṇa','Varāha Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Garuḍa Purāṇa','Brahmāṇḍa Purāṇa'],
    'Upapurāṇas — one traditional set':['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Bṛhannāradīya Purāṇa','Śivarahasya Purāṇa','Durvāsas Purāṇa','Kapila Purāṇa','Vāmana Upapurāṇa','Bhārgava Purāṇa','Vāruṇa Purāṇa','Kālikā Purāṇa','Sāmba Purāṇa','Nandi / Nanda Purāṇa','Sūrya Purāṇa','Parāśara Purāṇa','Vāsiṣṭha Purāṇa','Gaṇeśa Purāṇa','Mudgala Purāṇa','Haṃsa Purāṇa'],
    'Other attested Upapurāṇa titles':['Viṣṇudharma Purāṇa','Viṣṇudharmottara Purāṇa','Śivadharma Purāṇa','Māheśvara Purāṇa','Ekāmra Purāṇa','Devī Bhāgavata Purāṇa','Devī Purāṇa','Mahābhāgavata Purāṇa','Bhagavatī Purāṇa','Caṇḍī / Caṇḍikā Purāṇa','Devīrahasya','Saura Purāṇa','Ādi Purāṇa','Kalki Purāṇa','Puruṣottama Purāṇa','Kriyāyogasāra','Bhaviṣyottara Purāṇa','Bṛhaddharma Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa']
  };

  const smritis = {
    'Yājñavalkya’s twenty authorities':['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha'],
    'Additional names in a Padma-Purāṇa enumeration':['Marīci','Pulastya','Pracetas','Bhṛgu','Nārada','Kāśyapa','Viśvāmitra','Devala','Ṛṣyaśṛṅga','Gārgya','Baudhāyana','Paiṭhīnasi','Jābāli','Sumantu','Pāraskara','Lokākṣi','Kuthumi'],
    'Upasmṛti authorities':['Jābāli','Nāciketa','Skanda','Lāṅgākṣi','Kāśyapa','Vyāsa','Sanatkumāra','Sumantu','Pitāmaha','Vyāghra','Kārṣṇājini','Jātūkarṇa','Kapiñjala','Baudhāyana','Kāṇāda','Viśvāmitra','Paiṭhīnasi','Gobhila']
  };

  const vedanga = [
    ['Śikṣā','Vedic phonetics and correct recitation: accent, sound, articulation and preservation of oral transmission.'],
    ['Kalpa','Ritual procedure, including Śrauta, Gṛhya, Dharma and Śulba traditions.'],
    ['Vyākaraṇa','Grammar and linguistic analysis; Pāṇini’s Aṣṭādhyāyī is the classical landmark.'],
    ['Nirukta','Explanation and etymology of difficult Vedic words, classically associated with Yāska.'],
    ['Chandas','The study of Vedic and Sanskrit metre, classically associated with Piṅgala.'],
    ['Jyotiṣa','The calendrical and astronomical discipline used to determine ritual timing.'],
    ['Pūrva-Mīmāṃsā','The interpretive philosophy of Vedic injunction, ritual and dharma, classically grounded in Jaimini’s Mīmāṃsā Sūtras.'],
    ['Vedānta / Uttara-Mīmāṃsā','Philosophical interpretation of the Upaniṣads, Brahman and liberation, with the Brahma Sūtras as a foundational text.'],
    ['Nyāya','The tradition of logic, debate, inference and epistemology associated with the Nyāya Sūtras.'],
    ['Vaiśeṣika','A philosophical system analysing categories of reality, substances, qualities and causation.'],
    ['Sāṃkhya','A dualist analysis of consciousness (puruṣa) and nature (prakṛti), classically summarized in the Sāṃkhyakārikā.'],
    ['Yoga','Patañjali’s classical system of disciplined practice, meditation and the stilling of mental activity.']
  ];

  const agama = [
    ['Pāñcarātra','A major Vaiṣṇava Āgamic tradition of theology, mantra, icon worship and temple ritual.'],
    ['Vaikhānasa','A Vaiṣṇava ritual tradition especially important in temple worship and image consecration.'],
    ['Śaiva Āgamas','Large Śaiva corpora on theology, initiation, mantra, yoga, iconography and temple ritual; Śaiva Siddhānta recognizes twenty-eight principal Āgamas.'],
    ['Śākta Tantras','Goddess-centred tantric scriptures on mantra, initiation, ritual, subtle-body practice and traditions such as Śrīvidyā and Kaula.'],
    ['Upavedas','Traditional auxiliary sciences commonly including Āyurveda, Dhanurveda, Gāndharvaveda and architectural or Sthāpatya traditions.']
  ];

  const corpusButtons = [...root.querySelectorAll('.corpus-button')];
  const stage = root.querySelector('.browser-stage');

  function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function info(title, meta, about) {
    return `<div class="text-info" aria-live="polite"><div class="text-info-head"><strong>${esc(title)}</strong>${meta ? `<span>${esc(meta)}</span>` : ''}</div><p>${esc(about)}</p></div>`;
  }

  function textButton(name, meta, about, className='text-button') {
    return `<button class="${className}" type="button" data-title="${esc(name)}" data-meta="${esc(meta || '')}" data-about="${esc(about)}">${esc(name)}</button>`;
  }

  function wireTextButtons(scope) {
    scope.querySelectorAll('[data-about]').forEach(button => {
      button.addEventListener('click', () => {
        scope.querySelectorAll('[data-about].is-active').forEach(b => b.classList.remove('is-active'));
        button.classList.add('is-active');
        let target = scope.querySelector('.text-info');
        if (!target) {
          target = document.createElement('div');
          target.className = 'text-info';
          scope.appendChild(target);
        }
        target.outerHTML = info(button.dataset.title, button.dataset.meta, button.dataset.about);
      });
    });
  }

  function renderVedas() {
    stage.innerHTML = `<div class="panel-intro"><h2>Vedas</h2><p>Click a Veda, then click any surviving Saṃhitā, Brāhmaṇa or Āraṇyaka title for a quick description.</p></div><div class="veda-list"></div>`;
    const list = stage.querySelector('.veda-list');
    vedas.forEach(v => {
      const row = document.createElement('details');
      row.className = 'simple-details';
      row.innerHTML = `<summary><span>${esc(v.name)}</span><small>${esc(v.about)}</small></summary><div class="details-inside"></div>`;
      const inside = row.querySelector('.details-inside');
      Object.entries(v.groups).forEach(([group, items]) => {
        const block = document.createElement('div');
        block.className = 'layer-block';
        block.innerHTML = `<h3>${esc(group)}</h3><div class="text-grid">${items.map(name => textButton(name, `${v.name} · ${group}`, group.startsWith('Saṃhitā') ? `A ${group.toLowerCase()} text belonging to the ${v.name} textual family.` : group === 'Brāhmaṇas' ? `A Brāhmaṇa text of the ${v.name} tradition, explaining and interpreting Vedic ritual and liturgy.` : `An Āraṇyaka or forest-text layer of the ${v.name} tradition, moving from ritual exposition toward symbolic and contemplative teaching.`)).join('')}</div>`;
        inside.appendChild(block);
      });
      list.appendChild(row);
      wireTextButtons(row);
    });
  }

  function renderUpanishads() {
    stage.innerHTML = `<div class="panel-intro"><h2>108 Upaniṣads</h2><p>Organised by traditional type. Each title also shows its Vedic association when opened.</p></div><div class="subnav" role="tablist"></div><div class="upanishad-area"></div>`;
    const nav = stage.querySelector('.subnav');
    const area = stage.querySelector('.upanishad-area');
    const labels = ['Mukhya','Sāmānya Vedānta','Sannyāsa','Yoga','Vaiṣṇava','Śaiva','Śākta'];

    function showCategory(label) {
      nav.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b.dataset.category === label));
      const items = upanishads[label];
      area.innerHTML = `<p class="category-note">${esc(categoryAbout[label])}</p><div class="text-grid upanishad-grid">${items.map(([name,veda]) => textButton(name, `${label} · ${veda}`, specialAbout[name] || categoryAbout[label])).join('')}</div>`;
      wireTextButtons(area);
    }

    labels.forEach(label => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.category = label;
      b.textContent = label;
      b.addEventListener('click', () => showCategory(label));
      nav.appendChild(b);
    });
    showCategory('Mukhya');
  }

  function renderItihasa() {
    stage.innerHTML = `<div class="panel-intro"><h2>Itihāsa</h2></div><div class="text-grid">${itihasa.map(([name,about]) => textButton(name,'Itihāsa',about)).join('')}</div>`;
    wireTextButtons(stage);
  }

  function renderGrouped(title, groups, aboutFor) {
    stage.innerHTML = `<div class="panel-intro"><h2>${esc(title)}</h2></div><div class="subnav"></div><div class="group-area"></div>`;
    const nav = stage.querySelector('.subnav');
    const area = stage.querySelector('.group-area');
    const labels = Object.keys(groups);
    function show(label) {
      nav.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b.dataset.group === label));
      area.innerHTML = `<div class="text-grid">${groups[label].map(name => textButton(name,label,aboutFor(name,label))).join('')}</div>`;
      wireTextButtons(area);
    }
    labels.forEach(label => {
      const b = document.createElement('button');
      b.type = 'button'; b.dataset.group = label; b.textContent = label;
      b.addEventListener('click', () => show(label));
      nav.appendChild(b);
    });
    show(labels[0]);
  }

  function renderPuranas() {
    renderGrouped('Purāṇas', puranas, (name,label) => puranaAbout[name] || (label.startsWith('Mahā') ? 'One of the eighteen works conventionally grouped as Mahāpurāṇas, containing combinations of cosmology, genealogy, myth, pilgrimage, ritual and theology.' : 'A Purāṇic work transmitted in an Upapurāṇa or secondary-Purāṇa classification; the exact lists differ between traditional sources.'));
  }

  function renderSmritis() {
    renderGrouped('Smṛti & Dharmaśāstra', smritis, (name,label) => `${name} is named in the ${label.toLowerCase()} tradition as an authority on dharma. Smṛti literature addresses conduct, law, ritual obligation, social duties, penance and legal procedure; many attributed works survive only partly or through quotation.`);
  }

  function renderSimple(title, items) {
    stage.innerHTML = `<div class="panel-intro"><h2>${esc(title)}</h2></div><div class="text-grid">${items.map(([name,about]) => textButton(name,title,about)).join('')}</div>`;
    wireTextButtons(stage);
  }

  const renderers = {
    vedas: renderVedas,
    upanishads: renderUpanishads,
    itihasa: renderItihasa,
    puranas: renderPuranas,
    smriti: renderSmritis,
    vedanga: () => renderSimple('Vedāṅga & Darśana', vedanga),
    agama: () => renderSimple('Āgama & allied traditions', agama)
  };

  corpusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.corpus;
      const wasActive = button.classList.contains('is-active');
      corpusButtons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-expanded','false'); });
      if (wasActive) {
        stage.innerHTML = '';
        stage.hidden = true;
        return;
      }
      button.classList.add('is-active');
      button.setAttribute('aria-expanded','true');
      stage.hidden = false;
      renderers[key]();
      if (window.innerWidth < 700) stage.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();