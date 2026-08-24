(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const patch=(name,extra)=>{const cur=D[name]||{};if(extra.sources)extra.sources=[...new Set([...(cur.sources||[]),...extra.sources])];D[name]=Object.assign(cur,extra);};
  const patchMany=(names,extra)=>names.forEach(n=>patch(n,Object.assign({},extra)));

  const earlySources=['Patrick Olivelle, The Early Upaniṣads','Signe Cohen, The Classical Upaniṣads: A Guide','Muktikā Upaniṣad — 108-name/Veda list'];
  const laterSources=['Muktikā Upaniṣad — 108-name/Veda list','Minor Upaniṣad Sanskrit editions','Paul Deussen, Sixty Upanishads of the Veda','Modern specialist studies of minor Upaniṣads'];

  patch('Bṛhadāraṇyaka',{
    period:'One of the two oldest Upaniṣads; major layers are commonly placed around the 7th–6th centuries BCE, give or take a century.',
    milieu:'Late Vedic White Yajurvedic ritual-intellectual culture, preserved in the Śatapatha Brāhmaṇa tradition in Mādhyandina and Kāṇva recensions.',
    history:'The text was not composed as a single philosophical book at one moment. It grew out of late Śatapatha ritual and speculative materials and preserves multiple teaching voices, especially Yājñavalkya. Its two major recensions differ in wording and arrangement.',
    datingBasis:'Archaic prose, dependence on late Brāhmaṇa ritual, relative position before the rise of classical Buddhist/Jain literature, and internal stratification.',
    contents:['Madhu doctrine and cosmic correspondences.','Yājñavalkya–Maitreyi dialogues on immortality and the self.','Gārgī’s interrogation of Yājñavalkya.','The “neti neti” teaching.','Karma, rebirth and the fate of the knower.','The horse-sacrifice reinterpreted cosmically and inwardly.'],
    namedFeatures:['Yājñavalkya and Maitreyi','Gārgī debate','Neti neti','“As is one’s desire, so is one’s will…” karma passage'],
    reception:'A foundational source for later Vedānta. Śaṅkara’s commentary made it central to Advaita, while other Vedānta traditions repeatedly interpret its ātman-brahman passages.',
    sources:earlySources
  });
  patch('Chāndogya',{
    period:'One of the two oldest Upaniṣads; substantial layers are commonly placed around the 7th–6th centuries BCE.',
    milieu:'Sāmavedic Kauthuma ritual and chant culture, where speculation develops from the meanings of sāman, udgītha, breath, speech and sacrifice.',
    history:'The Chāndogya is a large layered prose compilation. Early sections remain close to Sāmavedic ritual symbolism; later sections preserve famous teacher-student narratives and increasingly explicit doctrines of self, rebirth and liberation.',
    datingBasis:'Archaic prose, close dependence on Sāmavedic ritual, relative chronology against later verse Upaniṣads and early śramaṇa literature.',
    contents:['Meditations on Oṃ/udgītha and Sāman chant.','Uddālaka Āruṇi’s teaching to Śvetaketu, including “tat tvam asi.”','Satyakāma Jābāla and the question of truthful qualification for studentship.','The five-fires doctrine and paths after death.','Nārada and Sanatkumāra on the progression from name to bhūman.','Dahara-vidyā, the “small space” within the heart.'],
    namedFeatures:['Tat tvam asi','Satyakāma Jābāla','Five fires','Nārada–Sanatkumāra','Dahara-vidyā'],
    reception:'One of the most cited Upaniṣads in Vedānta and a major source for later doctrines of brahman, meditation, rebirth and liberation.',
    sources:earlySources
  });
  patchMany(['Taittirīya','Aitareya','Kauṣītaki'],{
    period:'Early prose Upaniṣadic layer, broadly c. 6th–5th centuries BCE.',
    milieu:'Late Vedic school traditions still closely tied to Brāhmaṇa/Āraṇyaka ritual culture but increasingly focused on ātman, prāṇa, consciousness and liberation.',
    history:'These texts remain embedded in specific Vedic school corpora rather than circulating originally as free-standing “philosophy books.” Their received form reflects school transmission and layering.',
    datingBasis:'Archaic prose and close relationship to the corresponding Āraṇyakas place them after the oldest Bṛhadāraṇyaka/Chāndogya strata but before most verse Upaniṣads.',
    sources:earlySources
  });
  patch('Taittirīya',{
    contents:['Śikṣāvallī: recitation, student discipline, convocation advice and ethical duties.','Brahmānandavallī: the five kośas from food to bliss and the definition “satyam jñānam anantam brahma.”','Bhṛguvallī: Bhṛgu’s progressive inquiry through food, breath, mind, knowledge and bliss.'],
    namedFeatures:['Five kośas','Satyam jñānam anantam brahma','Convocation address','Bhṛgu’s inquiry']
  });
  patch('Aitareya',{
    contents:['Creation of worlds and guardians from the Self.','Entry of the self/consciousness into embodied life.','Three births of the human being.','The identification “prajñānam brahma” — consciousness is brahman.'],
    namedFeatures:['Prajñānam brahma','Three births','Creation from Ātman']
  });
  patch('Kauṣītaki',{
    contents:['The path of the gods and post-mortem journey.','Indra’s teaching to Pratardana on prāṇa and consciousness.','Bālākī Gārgya and Ajātaśatru on the self.','Prāṇa as the coordinating vital principle.'],
    namedFeatures:['Pratardana–Indra dialogue','Bālākī–Ajātaśatru dialogue','Path after death']
  });

  patchMany(['Kena','Kaṭha','Īśāvāsya','Śvetāśvatara','Muṇḍaka'],{
    period:'Generally placed in the last few centuries BCE, later than the earliest prose Upaniṣads; exact order and dates remain debated.',
    milieu:'Late Vedic/early classical intellectual world in which Upaniṣadic speculation increasingly interacts with renunciatory, theistic and yogic ideas.',
    history:'These are compact verse or mixed-form texts, more literary and doctrinally focused than the sprawling early prose Upaniṣads. Their transmission as distinct works is clearer, though each may still contain layers.',
    datingBasis:'Verse style, philosophical vocabulary, relation to earlier prose Upaniṣads and comparison with early Buddhist/Jain and epic thought.',
    sources:earlySources
  });
  patch('Kena',{
    contents:['Opening questions: by whom are mind, speech, breath, sight and hearing impelled?','Brahman as that which cannot be objectified by ordinary mind or speech.','The yakṣa story in which Agni and Vāyu fail before the mysterious Brahman and Indra learns from Umā Haimavatī.'],
    namedFeatures:['“By whom directed does the mind go forth?”','Yakṣa episode','Umā teaching Indra']
  });
  patch('Kaṭha',{
    contents:['Naciketas’ encounter with Yama after being given to Death by his father.','The three boons, including the Naciketa fire sacrifice and the question of what happens after death.','Śreyas versus preyas — the good versus the merely pleasant.','Chariot allegory of body, senses, mind, intellect and self.','The inverted cosmic aśvattha tree and ascent beyond death.'],
    namedFeatures:['Naciketas and Yama','Śreyas/preyas','Chariot allegory','Inverted aśvattha']
  });
  patch('Īśāvāsya',{
    contents:['Eighteen compact verses attached directly to the Vājasaneyi Saṃhitā.','Tension between renunciation and action.','Seeing all beings in the self and the self in all beings.','Paired discussions of vidyā/avidyā and sambhūti/asambhūti.'],
    namedFeatures:['Īśāvāsyam idaṃ sarvam','Vidyā and avidyā pairing']
  });
  patch('Śvetāśvatara',{
    contents:['Meditation and yogic control of body and senses.','Rudra/Śiva as supreme Lord in strongly theistic passages.','Māyā and māyin imagery.','The unborn triad, cosmic causality and personal devotion to God and guru.'],
    profile:'A key bridge between older Upaniṣadic speculation and later theistic Śaiva/Vedāntic language; it is not a sectarian Purāṇa but does give Rudra unusually elevated status.',
    namedFeatures:['Rudra as supreme','Māyā/māyin','Yoga instructions','Devotion to God and guru']
  });
  patch('Muṇḍaka',{
    contents:['Distinction between lower knowledge (including the Vedas and Vedāṅgas) and higher knowledge of imperishable brahman.','Critique of ritual when treated as the final goal.','Two birds on one tree as individual and witnessing self.','The bow-and-arrow meditation in which Oṃ is the bow and ātman the arrow.'],
    namedFeatures:['Two birds','Higher/lower knowledge','Oṃ as bow']
  });

  patchMany(['Praśna','Māṇḍūkya'],{
    period:'Around the turn of the Common Era or the final centuries BCE/early centuries CE; they are usually treated as among the later classical Upaniṣads.',
    milieu:'Late Upaniṣadic scholastic and meditative traditions in which doctrines are presented compactly and systematically.',
    datingBasis:'Language, systematization and relative dependence on older Upaniṣadic materials.',
    sources:earlySources
  });
  patch('Praśna',{
    contents:['Six students approach Pippalāda and each asks one major question.','Origin of beings and the relation of prāṇa and rayi.','The supremacy and functions of prāṇa.','Dream and deep sleep.','Meditation on Oṃ in one, two or three mātrās.','The puruṣa with sixteen parts.'],
    namedFeatures:['Six questions','Prāṇa doctrine','Oṃ meditation','Sixteen-part puruṣa']
  });
  patch('Māṇḍūkya',{
    contents:['Only twelve mantras in the core text.','Four states/quarters: waking (vaiśvānara), dream (taijasa), deep sleep (prājña), and the “fourth” turīya.','Mapping the four quarters onto A-U-M and the soundless completion of Oṃ.'],
    history:'The short Upaniṣad became vastly influential because Gauḍapāda’s Māṇḍūkya Kārikā was attached to it in later Advaita tradition; the Kārikā is not part of the twelve-mantra Upaniṣad itself.',
    namedFeatures:['Four states','Turīya','A-U-M analysis']
  });
  patch('Maitrāyaṇī',{
    period:'A relatively late classical Upaniṣad, often placed roughly between the last centuries BCE and early centuries CE; its layers may not be contemporary.',
    milieu:'Maitrāyaṇīya school tradition at a stage where Sāṃkhya-like categories, yoga, time speculation and older Upaniṣadic ideas interact.',
    history:'The Maitrī/Maitrāyaṇīya Upaniṣad is textually layered and survives in variant recensions. Its later sections show a more systematized philosophical vocabulary than the oldest Upaniṣads.',
    contents:['King Bṛhadratha’s renunciation and instruction.','Analysis of embodied self and supreme self.','Sixfold yoga.','Time (kāla) and cosmic processes.','Meditation on Oṃ and the sun.'],
    sources:earlySources
  });

  const samanya=['Ātmabodha','Mudgala','Vajrasūcī','Mahā','Sāvitrī','Garbha','Sarvasāra','Śukarahasya','Skanda','Śārīraka','Ekākṣara','Akṣi','Prāṇāgnihotra','Subāla','Mantrikā','Nirālamba','Paiṅgala','Adhyātma','Muktikā','Annapūrṇā','Sūrya','Ātma'];
  patchMany(samanya,{
    period:'Later Upaniṣadic period, mostly first millennium CE into the medieval period; exact dates differ sharply by text and are often not securely recoverable.',
    milieu:'Vedāntic scholastic and devotional environments that adopt the Upaniṣadic form to teach more systematized doctrines than the oldest śruti texts.',
    history:'These works belong to the expanding “minor Upaniṣad” corpus. Many are short synthetic treatises whose current manuscript form is much later than the early classical Upaniṣads. The Muktikā’s 108-text canon is itself a late ordering of an already diverse corpus.',
    datingBasis:'Relative philosophical vocabulary, citation history, manuscript catalogues and dependence on developed Vedānta/Yoga/sectarian traditions; precise dates are rarely possible.',
    reception:'They were important in broadening the category “Upaniṣad” beyond the early Vedic corpus and often serve as concise scriptural authorities for specific Vedāntic doctrines or practices.',
    sources:laterSources
  });
  patch('Vajrasūcī',{
    history:'A polemical text whose authorship and date are debated; Buddhist and Brahmanical Vajrasūcī traditions complicate attribution. The Upaniṣadic version attacks purely birth-based definitions of the true brāhmaṇa.',
    contents:['Systematic rejection of body, birth, learning, ritual and occupation as sufficient definitions of a brāhmaṇa.','The true brāhmaṇa is identified through realization of brahman.'],
    status:'Do not conflate automatically with the Buddhist Vajrasūcī attributed to Aśvaghoṣa; textual relationships are debated.'
  });
  patch('Garbha',{
    contents:['Embryological development in the womb.','Formation of bodily elements and limbs.','The fetus’ awareness and its forgetting at birth.','Embodiment interpreted through karma and rebirth.']
  });
  patch('Muktikā',{
    period:'Late medieval/early modern Upaniṣadic canon-forming text; usually treated as much later than the individual Upaniṣads it catalogues.',
    milieu:'Rāma-Hanumān devotional-Vedāntic setting in which an existing corpus of Upaniṣads is ordered into a canonical list of 108.',
    history:'Its chief historical importance is bibliographic: Rāma teaches Hanumān and enumerates the 108 Upaniṣads with Veda associations. The list became enormously influential in modern printed collections.',
    contents:['Dialogue of Rāma and Hanumān on liberation.','Praise of Māṇḍūkya and Upaniṣadic study.','Canonical enumeration of 108 Upaniṣads and their Veda affiliations.'],
    namedFeatures:['The 108-name list used by this index'],
    sources:['Muktikā Upaniṣad Sanskrit/translation','Studies of Upaniṣad canon formation']
  });

  const sannyasa=['Nirvāṇa','Āruṇi','Maitreya','Sannyāsa','Kuṇḍikā','Brahma','Avadhūta','Kaṭharudra','Jābāla','Paramahaṃsa','Bhikṣuka','Turīyātītāvadhūta','Yājñavalkya','Śāṭyāyanīya','Nārada-Parivrājaka','Paramahaṃsa-Parivrājaka','Parabrahma'];
  patchMany(sannyasa,{
    period:'Sannyāsa Upaniṣads span a very long period: some of the oldest probably belong to the last centuries BCE/first centuries CE, while many others are medieval and several may be as late as the 14th–15th centuries.',
    milieu:'Renunciant institutions seeking Vedic/Upaniṣadic authority for leaving household ritual, adopting mendicancy, and identifying liberation with direct knowledge of brahman.',
    history:'The corpus did not arise all at once. Early texts debate when renunciation is permitted; later works describe increasingly elaborate classes, insignia and ideals of sannyāsins. Their chronology has been studied especially by Joachim Sprockhoff and Patrick Olivelle.',
    datingBasis:'Relative language, institutional forms of sannyāsa, citations and comparison with Dharmaśāstra and monastic traditions.',
    reception:'These texts became scriptural resources in later debates about āśrama, the authority of renunciation and the identity of the jīvanmukta.',
    sources:['Patrick Olivelle, The Samnyasa Upanisads','Studies of Sannyāsa-Upaniṣad chronology','Muktikā Upaniṣad']
  });
  patch('Jābāla',{
    period:'Among the oldest Sannyāsa Upaniṣads; scholarly proposals range from the last few centuries BCE to around the beginning of the Common Era.',
    history:'Its antiquity is suggested by relatively early language and institutions. It is famous for allowing renunciation when genuine dispassion arises rather than insisting on a rigid life-stage sequence.',
    contents:['Avimukta/Kāśī as a sacred locus.','Discussion of the place between the eyebrows and sacred interior geography.','Permission to renounce when dispassion arises.','Ideal of the wandering mendicant and paramahaṃsa.'],
    namedFeatures:['Direct renunciation','Avimukta/Kāśī'],
    sources:['Patrick Olivelle, The Samnyasa Upanisads','Jābāla Upaniṣad textual studies']
  });
  patch('Āruṇi',{
    period:'Probably among the older renunciation Upaniṣads, broadly late centuries BCE to early centuries CE, though exact dating remains uncertain.',
    contents:['Procedure and meaning of giving up ritual possessions.','Renunciation of household ties and Vedic ritual fires.','Movement from external ritual identity to knowledge of ātman.']
  });
  patch('Paramahaṃsa',{
    period:'Often placed near the beginning of the Common Era or within the early stratum of renunciation Upaniṣads.',
    contents:['The highest renouncer abandons staff, tuft, sacred thread and conventional marks.','Non-possession, wandering and indifference to praise/blame.','Interior realization replaces social and ritual identity.']
  });
  patch('Bhikṣuka',{contents:['Four principal mendicant types: Kuṭīcaka, Bahūdaka, Haṃsa and Paramahaṃsa.','Different residence, begging and ascetic disciplines associated with these types.']});
  patch('Nārada-Parivrājaka',{
    period:'Medieval expansion of the Sannyāsa-Upaniṣad tradition; later than the oldest Jābāla/Āruṇi-type works.',
    contents:['Eligibility and initiation into renunciation.','Multiple grades/classes of renouncers.','Rules for begging, food, clothing, wandering and discipline.','Vedāntic teaching on the final identity of the renouncer with brahman.']
  });

  const yoga=['Nādabindu','Yogacūḍāmaṇi','Jābāladarśana','Amṛtabindu','Amṛtanāda','Kṣurikā','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Yogaśikhā','Yogakuṇḍalinī','Varāha','Haṃsa','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advayatāraka','Śāṇḍilya','Pāśupatabrahma','Mahāvākya'];
  patchMany(yoga,{
    period:'Most Yoga Upaniṣads are medieval rather than early Vedic; many likely took their present form between roughly the 10th and 17th centuries CE, though a few preserve older material.',
    milieu:'Haṭha-yoga, mantra, Vedānta and subtle-body traditions that recast yogic practice as “Upaniṣadic” revelation.',
    history:'The group reflects the historical rise of nāḍī, cakra, kuṇḍalinī, mudrā, internal sound and prāṇāyāma systems. Their language and practice-world often presuppose developments much later than Patañjali.',
    datingBasis:'Dependence on developed Haṭha/Mantra/Yoga vocabulary, comparison with medieval yoga texts, anthology history and manuscript evidence.',
    reception:'They are important for tracing how later yogic technologies were integrated with Vedāntic claims of brahman-realization.',
    sources:['Yoga Upaniṣad editions','David Gordon White, histories of Yoga/Tantra','Studies of Yoga Upaniṣads','Muktikā Upaniṣad']
  });
  patch('Yogatattva',{
    period:'Often treated as medieval; David Gordon White places it roughly in the 11th–13th centuries CE, though older datings have been proposed.',
    contents:['Four kinds of yoga and the relation of mantra, laya, haṭha and rāja yoga.','Prāṇāyāma, nāḍī purification, kumbhaka and mudrā.','Stages of yogic attainment and obstacles.','Liberation through the conjunction of yoga and knowledge.'],
    sources:['Studies of the Yogatattva Upaniṣad','David Gordon White, yoga history']
  });
  patch('Yogakuṇḍalinī',{
    period:'Late medieval Yoga-Upaniṣadic milieu; exact date uncertain but its developed Haṭha-kuṇḍalinī system is much later than the classical Upaniṣads.',
    contents:['Three chapters and roughly 171 verses in common editions.','Moderate diet and posture.','Prāṇa control and obstacles to practice.','Śakti-cālana and awakening kuṇḍalinī.','Lambikā/yogic techniques, samādhi and final self-knowledge.'],
    namedFeatures:['Śakti-cālana','Kuṇḍalinī awakening','Prāṇāyāma and mitāhāra']
  });
  patch('Nādabindu',{contents:['Meditation on Oṃ.','Progression through inner sounds compared to ocean, thunder, drums, bells and subtler tones.','Withdrawal from external sound until mind dissolves in the soundless absolute.']});
  patch('Amṛtabindu',{contents:['Mind as the cause of bondage when attached to objects and liberation when objectless.','Meditation on Oṃ and transition beyond the syllable.','Concise nondual reflections on brahman and consciousness.']});

  const vaisnava=['Vāsudeva','Avyakta','Nārāyaṇa','Kali-Saṇṭāraṇa','Tārasāra','Nṛsiṃhatāpanī','Tripādvibhūti-Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Garuḍa'];
  patchMany(vaisnava,{
    period:'Predominantly medieval Vaiṣṇava Upaniṣadic literature, roughly first to second millennium CE; individual texts range from relatively early sectarian works to very late devotional compositions.',
    milieu:'Vaiṣṇava communities using Upaniṣadic language to identify Nārāyaṇa, Viṣṇu, Nṛsiṃha, Rāma, Kṛṣṇa or other forms with brahman and to authorize mantra/bhakti practices.',
    history:'These are not contemporaneous with the oldest prose Upaniṣads. Their sectarian vocabulary, mantra systems and devotional theology reflect later Vaiṣṇava developments.',
    datingBasis:'Citation history, sectarian theology, mantra/tantric vocabulary, relation to Purāṇic and medieval Vaiṣṇava traditions.',
    reception:'Many became important proof-texts for specific Vaiṣṇava communities, especially the Tāpaniya works and deity-specific mantra traditions.',
    sources:['Vaiṣṇava Upaniṣad editions','J. N. Farquhar, Outline of the Religious Literature of India','Studies of Vaiṣṇava sectarian Upaniṣads','Muktikā Upaniṣad']
  });
  patch('Nṛsiṃhatāpanī',{
    period:'A relatively early sectarian Upaniṣad; it appears to have been complete before the 7th century CE, though the exact date is uncertain.',
    history:'The Nṛsiṃha Tāpaniya appears to be the model for later Tāpaniya Upaniṣads. Its existence before/around the time of Gauḍapāda is used as a chronological anchor.',
    contents:['Pūrva and Uttara Tāpaniya sections.','Nṛsiṃha mantra as mantrarāja.','Identification of Nṛsiṃha with Oṃ, ātman and brahman.','Mantric and contemplative analysis of the deity.'],
    sources:['J. N. Farquhar, chronology of Tāpaniya Upaniṣads','Nṛsiṃha Tāpaniya editions/studies']
  });
  patch('Gopālatāpanī',{
    period:'Medieval; composed after the Nṛsiṃha Tāpaniya and certainly before Jīva Gosvāmin’s 16th-century commentary. A broad c. 8th–14th century horizon is safer than a single exact date.',
    milieu:'Kṛṣṇa-centered Vaiṣṇava devotional and mantra theology.',
    history:'The text appears to combine earlier devotional/mantric materials into a larger Tāpaniya-style Upaniṣad. It later became especially authoritative in Gauḍīya Vaiṣṇavism.',
    contents:['Kṛṣṇa/Gopāla identified with supreme brahman.','Gopāla mantras and their contemplation.','Kṛṣṇa’s pastoral identity and devotional theology.','Passages important to later Rādhā-Kṛṣṇa interpretation.'],
    reception:'Jīva Gosvāmin and later Gauḍīya authors treated it as important śruti authority for Kṛṣṇa theology.',
    sources:['Gopāla Tāpaniya text/commentarial tradition','J. N. Farquhar','Studies of Gauḍīya use of Gopāla Tāpaniya']
  });
  patch('Rāmatāpanī',{
    period:'Late medieval; scholarly proposals range roughly from the 11th to 16th centuries CE.',
    history:'Modeled on the earlier Tāpaniya style but adapted to Rāma devotion and mantra theology.',
    contents:['Pūrva and Uttara sections.','Rāma identified with brahman/ātman.','Rāma mantra and yantra interpretation.','Upaniṣadic recasting of Rāma devotion.']
  });
  patch('Rāmarahasya',{
    period:'Very late medieval/early modern; often treated as around the 16th–17th century horizon.',
    contents:['Hanumān as principal teacher in parts of the text.','Rāma-name and bīja-mantra theology.','Rāma identified with sat-cit-ānanda and supreme brahman.','Mantric/yantric material.']
  });
  patch('Kali-Saṇṭāraṇa',{
    period:'Late medieval/early modern devotional Upaniṣad; exact date uncertain.',
    contents:['Nārada asks Brahmā for the means of crossing Kali-yuga.','The text prescribes the sixteen-name Hare Kṛṣṇa/Hare Rāma mantra as the remedy.'],
    namedFeatures:['Sixteen-name mahāmantra'],
    reception:'Extremely influential in later Gauḍīya Vaiṣṇava and Hare Kṛṣṇa traditions because it provides an Upaniṣadic locus for the sixteen-name mantra.'
  });

  const saiva=['Akṣamālikā','Rudrākṣajābāla','Jābāli','Kaivalya','Kālāgnirudra','Dakṣiṇāmūrti','Rudrahṛdaya','Pañcabrahma','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Śarabha','Bhasmajābāla','Gaṇapati'];
  patchMany(saiva,{
    period:'Mostly later sectarian Upaniṣads of the first millennium CE and medieval period; individual dates vary greatly.',
    milieu:'Śaiva ascetic, mantra and ritual traditions recasting Rudra/Śiva, liṅga, ash, rudrākṣa and specific forms such as Dakṣiṇāmūrti as Upaniṣadic revelation.',
    history:'The group developed long after the earliest Upaniṣads and mirrors the growth of organized Śaiva traditions. Some texts are primarily Vedāntic, others ritual/mantric.',
    datingBasis:'Śaiva sectarian vocabulary, ritual forms, intertextuality, commentary/manuscript history.',
    reception:'These works supplied śruti-style authority for later Śaiva practices and identities.',
    sources:['Śaiva Upaniṣad editions','Studies of Śaiva sectarian Upaniṣads','Muktikā Upaniṣad']
  });
  patch('Kaivalya',{
    period:'Relatively early among the sectarian Śaiva Upaniṣads; often placed in the late first millennium BCE or early centuries CE, though the exact date is debated.',
    contents:['Aśvalāyana asks Brahmā for the highest knowledge.','Meditation, renunciation and realization of the inner self.','Rudra/Śiva identified with brahman and the self.','The knower recognizes himself as the consciousness underlying all deities and worlds.'],
    reception:'Frequently printed among popular minor Upaniṣads because it combines concise Vedānta with explicit Śiva theology.'
  });
  patch('Atharvaśiras',{contents:['Rudra as the all-encompassing supreme reality.','Mantric identifications of Rudra with deities, worlds and brahman.','Śaiva reinterpretation of Upaniṣadic monism.']});
  patch('Bhasmajābāla',{contents:['Śaiva use of sacred ash (bhasma/vibhūti).','Tripuṇḍra marks and ritual application.','Kāśī/Śiva devotion and purification symbolism.']});
  patch('Rudrākṣajābāla',{contents:['Mythic origin of rudrākṣa from Rudra/Śiva.','Types and numbers of rudrākṣa beads.','Rules and merits of wearing them as Śaiva religious marks.']});
  patch('Gaṇapati',{
    period:'Late sectarian Upaniṣadic/Ātharvaśīrṣa tradition; probably medieval, though exact dating is uncertain.',
    contents:['Gaṇeśa identified with brahman, ātman and the cosmic elements.','The famous “gaṃ” bīja and Gaṇeśa mantra.','Meditative and ritual praise of Gaṇapati as the ground of speech and consciousness.'],
    reception:'The Gaṇapati Atharvaśīrṣa became one of the most widely recited Sanskrit texts in modern Gaṇeśa worship.'
  });

  const sakta=['Tripurā','Saubhāgyalakṣmī','Bahvṛca','Sarasvatī-rahasya','Sītā','Tripurātāpinī','Devī','Bhāvanā'];
  patchMany(sakta,{
    period:'Predominantly medieval Śākta Upaniṣadic literature, much of it probably between roughly the 10th and 16th centuries CE.',
    milieu:'Śākta and Tantric environments in which Devī, Śrī/Lakṣmī, Tripurā, Sarasvatī or Sītā are identified with brahman and worship is interpreted through mantra, yantra and Vedānta.',
    history:'These texts reflect developed goddess theology rather than the social world of the earliest prose Upaniṣads. They often translate Tantric concepts into an Upaniṣadic idiom.',
    datingBasis:'Dependence on developed Śākta/Tantric vocabulary and ritual, manuscript/commentarial history and relation to Śrīvidyā traditions.',
    reception:'They became scriptural supports for Śākta Vedānta, mantra and Śrīvidyā practices.',
    sources:['Śākta Upaniṣad editions','Studies of Śrīvidyā and Śākta textual history','Muktikā Upaniṣad']
  });
  patch('Tripurātāpinī',{
    period:'Usually treated as medieval, roughly 12th–15th centuries CE.',
    milieu:'Śrīvidyā/Tripurā-oriented Śākta Tantra presented in Upaniṣadic form.',
    contents:['Five chapters in common descriptions.','Śiva and Śakti as conjoint source of manifestation.','Tripurā as supreme consciousness-power.','Mantra, kāmakalā and yantra/cakra symbolism.'],
    namedFeatures:['Tripurā','Kāmakalā','Mantra/yantra interpretation']
  });
  patch('Devī',{
    contents:['Devī declares herself the supreme brahman and the source of gods and cosmos.','Identification of the Goddess with knowledge and ignorance, nature and consciousness.','Praise/mantra material that later Śākta traditions treat as concise śruti authority.']
  });
  patch('Bahvṛca',{contents:['A compact declaration of Devī as the one reality before creation.','The Goddess as consciousness from whom Brahmā, Viṣṇu, Rudra and the universe emerge.']});
})();