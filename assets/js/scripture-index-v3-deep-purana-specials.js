(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Purāṇa:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];

  put('Vāyu Purāṇa',{
    sanskritTitle:'वायुपुराणम्',traditionalAuthor:'Vyāsa tradition; Vāyu as principal transmitting speaker',language:'Sanskrit',
    period:'One of the oldest extant Purāṇic complexes. An early recoverable form is commonly placed around c. 300–500 CE, but the received text continued to grow for centuries; the Gayā-māhātmya is a later accretion attested before the fifteenth century.',
    extent:'Four-pāda recension: 112 chapters (Prakriyā 1–6, Anuśaṅga 7–64, Upodghāta 65–99, Upasaṃhāra 100–112); other editions divide the work into two khaṇḍas with different chapter numbering.',
    primaryRecensions:['Four-pāda Ānandāśrama / Vaṅgavāsī arrangement','Two-khaṇḍa Asiatic Society / Veṅkaṭeśvara arrangement','Gayā-māhātmya transmitted with variable status'],
    leadParagraphs:[
      'The Vāyu Purāṇa is one of the most important witnesses to the early formation of the Purāṇa genre. Although Vāyu is the transmitting deity, the work is not a narrow scripture of the wind-god: its major concerns are creation and dissolution, cosmic time, geography, manvantaras, long genealogies of sages and kings, ritual, yoga and an early Śaiva-Pāśupata religious environment.',
      'Its textual history is inseparable from the Brahmāṇḍa Purāṇa. Large blocks of the two works are closely parallel, and scholarship generally treats them as descendants of a related older Purāṇic corpus rather than as two books that were always completely independent.',
      'The Vāyu is also unusually important for external chronology. Bāṇabhaṭṭa knew it in the seventh century, al-Bīrūnī quoted a form of it in the early eleventh century, and medieval authors cite the Gayā material. These witnesses show both the antiquity of the title and the continuing growth of the received book.'
    ],
    articleSections:[
      {title:'Date and textual formation',paragraphs:[
        'Modern scholarship generally places the earliest recoverable Vāyu material in the first half of the first millennium CE, often around the fourth or fifth century. That range applies to a core or major redaction, not to every surviving chapter.',
        'The relation with the Brahmāṇḍa Purāṇa is central to the chronology. Their shared cosmological and genealogical blocks imply descent from a closely related textual complex, while differences show later independent redaction.',
        'Later insertions can sometimes be isolated. Hazra treated several ritual and yoga passages as secondary, and the Gayā-māhātmya has its own transmission history. The work therefore has to be dated by strata.'
      ]},
      {title:'The four-pāda recension',paragraphs:['The Ānandāśrama and Vaṅgavāsī editions organize the received text into four named pādas. This arrangement gives a useful map of the work even though other editions use a two-khaṇḍa structure.'],books:[
        {number:1,title:'Prakriyā-pāda — chapters 1–6',summary:'Opening frame, summary of Purāṇic teaching and foundational cosmogony.'},
        {number:2,title:'Anuśaṅga-pāda — chapters 7–64',summary:'Large cosmological, genealogical, ritual and religious blocks, including lineages, śrāddha and other classical Purāṇic subjects.'},
        {number:3,title:'Upodghāta-pāda — chapters 65–99',summary:'Cosmic ages, geography, celestial order, manvantaras, religious instruction and extensive mythic-historical material.'},
        {number:4,title:'Upasaṃhāra-pāda — chapters 100–112',summary:'Late cosmological and eschatological material and, in many recensions, the Gayā-māhātmya praising the sacred landscape of Gayā.'}
      ]},
      {title:'Genealogy, cosmic time and sacred history',paragraphs:[
        'The Vāyu preserves long lists of patriarchs, sages, solar and lunar dynasties and rulers. These sections attracted early historians such as F. E. Pargiter because they overlap with other Purāṇas while preserving distinctive sequences.',
        'The genealogies are not modern annals. They belong to a cyclical cosmology organized by kalpas and manvantaras, where dynastic memory is embedded inside repeated cosmic creation and dissolution.',
        'Comparison with Brahmāṇḍa, Matsya, Viṣṇu and epic genealogies remains one of the principal methods for studying the older Purāṇic historical tradition.'
      ]},
      {title:'Śaiva and Pāśupata religious profile',paragraphs:[
        'Important strata have a marked Śaiva and Pāśupata orientation. Śiva is praised through cosmological and devotional passages, yet the work also contains substantial Vaiṣṇava and nonsectarian material typical of early Purāṇic compilation.',
        'The religious profile therefore should not be reduced to a modern single-sect label. The Vāyu is valuable precisely because it preserves a stage in which cosmology, genealogy, vrata, yoga and developing sectarian theology remain closely interwoven.'
      ]},
      {title:'Manuscripts, editions and the Gayā-māhātmya',paragraphs:[
        'Printed editions do not agree on the macrostructure. The Asiatic Society and Veṅkaṭeśvara traditions use two large khaṇḍas, while Ānandāśrama and Vaṅgavāsī use the four pādas. Chapter numbers therefore need an edition or recension.',
        'The Gayā-māhātmya, usually chapters 105–112 in the four-pāda editions, is absent from some manuscripts and also circulated independently. Its variable position is direct evidence of Purāṇic accretion.',
        'A related textual problem concerns the Revā-khaṇḍa. Manuscript research has shown that material later printed under the Skanda Purāṇa can belong to a Vāyu transmission, illustrating how unstable Purāṇic book-boundaries could become.'
      ]},
      {title:'Reception and modern scholarship',paragraphs:[
        'The Vāyu Purāṇa is foundational for modern Purāṇa studies because it combines early external attestation with unusually rich genealogical parallels. Rocher, Hazra, Pargiter and later specialists repeatedly use it when reconstructing the growth of the genre.',
        'Its importance is therefore double: it is a major religious text in its own right and a comparative archive for the formation of several other Purāṇic traditions.'
      ]}
    ],
    sources:merge(D['Purāṇa:Vāyu Purāṇa']?.sources,[
      {title:'Wikipedia — Vayu Purana',detail:'History, early dating, recensions and chapter structure.',url:'https://en.wikipedia.org/wiki/Vayu_Purana'},
      {title:'Vishvasa — Vāyu Purāṇa structure notes',detail:'Four-pāda and two-khaṇḍa arrangements; Gayā and Revā textual issues.',url:'https://vishvasa.github.io/purANam/vAyu-purANam/articles/wiki-on-structure/'},
      'Ludo Rocher, The Purāṇas (1986)','R. C. Hazra, Studies in the Purāṇic Records on Hindu Rites and Customs','F. E. Pargiter, Ancient Indian Historical Tradition','Rajendralal Mitra and Ānandāśrama Sanskrit editions of the Vāyu Purāṇa'
    ])
  });

  put('Devī Bhāgavata Purāṇa',{
    sanskritTitle:'देवीभागवतपुराणम्',traditionalAuthor:'Vyāsa (traditional attribution); narrated to Janamejaya in the received frame',language:'Sanskrit',
    period:'Most scholarship places the received work between roughly the 9th and 14th centuries CE; Hazra proposed the 11th–12th centuries and Tracy Pintchman c. 1000–1200 CE. Individual layers, including the Devī Gītā, may have separate histories.',
    extent:'12 skandhas, 318 chapters; the text traditionally claims 18,000 verses.',
    leadParagraphs:[
      'The Devī Bhāgavata Purāṇa is a twelve-skandha Śākta scripture that reorganizes the literary world of the Purāṇas around Devī as the supreme reality. Creation, avatāras, royal narratives, pilgrimage, mantra, yoga and bhakti all appear, but Brahmā, Viṣṇu and Śiva are themselves understood through the power of the Goddess.',
      'The work deliberately presents itself as a Bhāgavata and as a Mahāpurāṇa. This produces a historical classification dispute because many Vaiṣṇava lists place the Kṛṣṇa-centred Bhāgavata Purāṇa in the canonical slot, whereas Śākta traditions defend the Devī Bhāgavata’s own claim. The disagreement is evidence for competing Purāṇic canons, not a mistake that can be erased by choosing one list.',
      'Its seventh skandha contains the Devī Gītā, a major theological discourse that combines devotion to a personal Goddess with Vedāntic language about Brahman, meditation and liberation. The later books also preserve highly developed Śākta ritual, sacred geography and Śrīvidyā-oriented materials.'
    ],
    articleSections:[
      {title:'Date, authorship and formation',paragraphs:[
        'The traditional author is Vyāsa, but the historical text is medieval and layered. Most modern scholars reject very early dates and place substantial formation between the late first millennium and the twelfth century, with some portions later.',
        'Hazra argued for an eleventh- or twelfth-century horizon; Pintchman places the work around 1000–1200 CE. C. Mackenzie Brown treats the Devī Gītā and other sections as units whose exact relation to the first complete redaction must be investigated separately.',
        'The text’s mature Śākta theology, ritual vocabulary and intertextual relationships with other Purāṇas are central to these chronological arguments.'
      ]},
      {title:'The twelve skandhas',paragraphs:['The received text explicitly gives a twelve-skandha, 318-chapter architecture. Chapter totals by skandha are stable enough to provide a useful map of the corpus.'],books:[
        {number:1,title:'Skandha 1 — 20 chapters',summary:'Opening frame, Vyāsa, Śuka, Hayagrīva, Madhu-Kaiṭabha and praise of the Goddess as the power behind the gods.'},
        {number:2,title:'Skandha 2 — 12 chapters',summary:'Continuation of dynastic and narrative framing, linking the Purāṇic discourse to the Kuru and Janamejaya world.'},
        {number:3,title:'Skandha 3 — 30 chapters',summary:'Creation, divine power and major Goddess-centred cosmological narratives.'},
        {number:4,title:'Skandha 4 — 25 chapters',summary:'Further royal, divine and avatāra narratives recast within Śākta theology.'},
        {number:5,title:'Skandha 5 — 35 chapters',summary:'Extended Goddess mythology, battles and manifestations of divine power.'},
        {number:6,title:'Skandha 6 — 31 chapters',summary:'Royal and sage narratives, karma, religious duty and the transition to the work’s major theological centre.'},
        {number:7,title:'Skandha 7 — 40 chapters',summary:'The Devī Gītā occupies the final ten chapters; devotion, knowledge, meditation and the supreme nature of Devī are systematically developed.'},
        {number:8,title:'Skandha 8 — 24 chapters',summary:'Cosmography, worlds, sacred geography and the Goddess-centred ordering of the universe.'},
        {number:9,title:'Skandha 9 — 50 chapters',summary:'The longest skandha, with major Goddess narratives, manifestations and devotional theology.'},
        {number:10,title:'Skandha 10 — 13 chapters',summary:'Manvantaras and further Purāṇic cosmological-historical organization.'},
        {number:11,title:'Skandha 11 — 24 chapters',summary:'Ritual, conduct, worship, mantra and religious practice.'},
        {number:12,title:'Skandha 12 — 14 chapters',summary:'Gāyatrī, Śrīvidyā-oriented material, the supreme Goddess and the closing praise of the scripture.'}
      ]},
      {title:'Devī as Brahman and cosmic power',paragraphs:[
        'The text identifies Devī with both nirguṇa and saguṇa reality: she is the transcendent ground beyond qualities and the dynamic Śakti through whom creation, preservation and dissolution occur.',
        'This allows the Purāṇa to appropriate vocabularies of Advaita, Sāṃkhya and bhakti without subordinating the Goddess to a male deity. Prakṛti, consciousness, Māyā and Brahman are repeatedly re-read through supreme Devī.',
        'Lakṣmī, Sarasvatī, Kālī and other goddesses can appear as differentiated powers while remaining manifestations of one ultimate Mahādevī.'
      ]},
      {title:'The Devī Gītā',paragraphs:[
        'The last ten chapters of the seventh skandha circulate independently as the Devī Gītā. The discourse teaches the nature of the Goddess, devotion, meditation, yoga and liberation in a form consciously comparable to other Sanskrit gītā traditions.',
        'Its theology combines personal devotion with nondual metaphysics: the worshipper approaches Devī through form and name while being led toward realization of the supreme reality she embodies.',
        'Because the unit has an independent reception history, scholars debate whether every part belongs to the earliest complete Devī Bhāgavata redaction.'
      ]},
      {title:'Ritual, mantra, pilgrimage and Śrīvidyā',paragraphs:[
        'The later books move from mythology into repeatable religious practice. Pūjā, mantra, sacred diagrams, vows, pilgrimage and goddess festivals make the cosmic Devī present in embodied ritual life.',
        'Śrīvidyā-oriented passages and descriptions of the Goddess’s supreme realm connect the Purāṇa to broader Tantric and Śākta traditions while keeping the authority of the Purāṇa genre.',
        'The text is therefore not only a mythology of the Goddess; it is also a handbook of how a Goddess-centred universe is worshipped.'
      ]},
      {title:'Manuscripts, commentaries and Mahāpurāṇa status',paragraphs:[
        'The work survives in many manuscripts and printed editions. Nīlakaṇṭha’s commentary is an important premodern witness to interpretation, and modern scholarship compares Sanskrit editions with regional transmission.',
        'Its self-identification as a Mahāpurāṇa is historically significant. Competing lists that instead canonize the Vaiṣṇava Bhāgavata show that the number eighteen did not always correspond to one universally fixed set of titles.',
        'Citation should specify skandha, chapter and verse because translations and manuscript traditions differ in wording and verse count.'
      ]},
      {title:'Reception',paragraphs:[
        'The Devī Bhāgavata is one of the major Sanskrit scriptural authorities of Śāktism. Its Devī Gītā, Goddess cosmology and ritual materials shaped later theology, vernacular retellings and devotional practice.',
        'Modern scholarship, especially the work of C. Mackenzie Brown and Tracy Pintchman, has made it central to discussions of Goddess theology, Śākta bhakti and the relationship between Purāṇa and Tantra.'
      ]}
    ],
    sources:merge(D['Purāṇa:Devī Bhāgavata Purāṇa']?.sources,[
      {title:'Wikipedia — Devi Bhagavata Purana',detail:'Dating, twelve-skandha structure, Devī Gītā and theological profile.',url:'https://en.wikipedia.org/wiki/Devi_Bhagavata_Purana'},
      {title:'SanskritDocuments — Devī Bhāgavata',detail:'Sanskrit text and skandha/chapter index.',url:'https://sanskritdocuments.org/doc_purana/'},
      'R. C. Hazra, Studies in the Upapurāṇas','C. Mackenzie Brown, The Triumph of the Goddess','Tracy Pintchman, studies of the Devī Bhāgavata and Hindu Goddess traditions','Nīlakaṇṭha commentary and Sanskrit printed editions'
    ])
  });

  put('Mahābhāgavata Purāṇa',{
    sanskritTitle:'महाभागवतपुराणम्',traditionalAuthor:'Vyāsa tradition',language:'Sanskrit',
    period:'A late-medieval Śākta Purāṇic work. Modern summaries often place it around the 10th–11th centuries, while Hazra’s relative chronology and later textual studies allow a broader c. 10th–13th-century horizon for the received work.',
    extent:'81 chapters in the commonly studied printed recension.',
    leadParagraphs:[
      'The Mahābhāgavata Purāṇa, also called the Devī Purāṇa in some modern scholarship, is a Śākta Purāṇic work centred on Mahādevī and her manifestations as Satī, Pārvatī, Kālī, Gaṅgā and other goddesses. It brings Goddess mythology, Tantric forms of worship and Vedāntic language into a continuous Purāṇic narrative.',
      'The text is especially important for the Satī-Pārvatī cycle. Dakṣa, Satī’s self-destruction, the scattering of the Goddess’s body, the formation of Śākta pīṭhas, Pārvatī’s rebirth and her reunion with Śiva are not isolated legends but parts of a theology in which the Goddess is prior to and greater than the forms through which she manifests.',
      'Its title must be handled carefully. “Mahābhāgavata” can function as a classification claim, and the text has been described differently as Mahāpurāṇa or Upapurāṇa in different contexts. The surviving 81-chapter work should be studied from its own manuscripts and colophons rather than merged with the Devī Bhāgavata merely because both are Śākta Bhāgavata traditions.'
    ],
    articleSections:[
      {title:'Date, provenance and classification',paragraphs:[
        'The work belongs to the medieval Śākta textual world. A Bengal connection is often proposed, and a broad tenth- to thirteenth-century horizon accommodates the competing chronological arguments better than a single precise year.',
        'Hazra compared the Mahābhāgavata with the Bṛhaddharma Purāṇa and other Śākta materials to establish relative chronology. Such comparison is more reliable than dating the text from the traditional attribution to Vyāsa.',
        'Classification is itself part of the evidence. Some sources and colophons elevate the work through a Mahāpurāṇa label, while modern scholarship often treats it among the Upapurāṇas. The article therefore preserves the dispute rather than hiding it.'
      ]},
      {title:'Eighty-one-chapter narrative architecture',paragraphs:[
        'The commonly studied recension contains eighty-one chapters. Unlike encyclopedic Purāṇas that jump between unrelated manuals, the Mahābhāgavata is strongly organized around the unfolding identity of the Goddess and the Satī-Pārvatī cycle.',
        'The narrative moves from supreme Mahādevī to embodied Goddess forms, the Dakṣa conflict, death and rebirth, the reconstitution of Śiva-Śakti union, pīṭha geography and later theological or ritual elaboration.'
      ]},
      {title:'Satī, Dakṣa and the Śākta pīṭhas',paragraphs:[
        'The Dakṣa sacrifice becomes a decisive theological event. Satī’s rejection of her father’s insult and her death break the apparent separation between divine power and the sacrificial order represented by Dakṣa.',
        'The scattering of Satī’s body is used to explain a geography of Goddess pīṭhas. Sacred place is therefore generated from the Goddess’s own body, turning pilgrimage into a map of divine embodiment.',
        'Different Śākta texts count and locate pīṭhas differently. The Mahābhāgavata is one important witness in this developing medieval geography rather than the sole source of one fixed list.'
      ]},
      {title:'Pārvatī, Kālī, Gaṅgā and the many forms of Mahādevī',paragraphs:[
        'Satī’s rebirth as Pārvatī allows the text to narrate asceticism, desire, marriage and cosmic restoration while maintaining that the Goddess exceeds every individual manifestation.',
        'Kālī and other fierce forms reveal divine power that cannot be reduced to domestic consort theology. Gaṅgā and other goddesses are also integrated into the same supreme feminine reality.',
        'This theological strategy lets the Purāṇa absorb diverse local and pan-Indian goddess traditions without surrendering a single supreme Mahādevī.'
      ]},
      {title:'Tantric and Vedāntic synthesis',paragraphs:[
        'The Mahābhāgavata reflects a world in which Purāṇic Goddess mythology and Tantric ritual categories are already deeply interconnected. The Mahāvidyās and other specialized forms of Goddess worship belong to this broader religious environment.',
        'At the same time, the text uses Vedāntic language to identify the Goddess with the highest reality. Mythic plurality and metaphysical unity are therefore not opposites: the many goddesses are manifestations of one supreme power.'
      ]},
      {title:'Textual relationships and manuscripts',paragraphs:[
        'The work shares material and themes with the Bṛhaddharma Purāṇa, Devī Bhāgavata, Kālīkā Purāṇa and later pīṭha literature. Direction of borrowing must be established passage by passage rather than assumed from similar stories.',
        'Printed editions from Bengal and Bombay and manuscript witnesses used by Hazra and later researchers form the basis of modern study. A critical edition capable of resolving every recensional question is still a desideratum.'
      ]},
      {title:'Reception and significance',paragraphs:[
        'The Mahābhāgavata is important for the history of medieval Śāktism because it preserves a stage in which pīṭha geography, Tantric Goddess forms and Purāṇic narrative were being integrated into one Sanskrit scripture.',
        'Its relative obscurity beside the Devī Māhātmya and Devī Bhāgavata should not be mistaken for lack of historical value. It is a major comparative source for the development of Goddess mythology in eastern India.'
      ]}
    ],
    sources:merge(D['Purāṇa:Mahābhāgavata Purāṇa']?.sources,[
      {title:'Wikipedia — Mahabhagavata Purana',detail:'Śākta profile, Bengal association and major Goddess narratives.',url:'https://en.wikipedia.org/wiki/Mahabhagavata_Purana'},
      {title:'Prabir Kumar Nanda Goswami — Mahabhagavata Purana translation and study',detail:'Study of the 81-chapter text, date, sources and Śākta theology.',url:'https://www.wisdomlib.org/hinduism/book/mahabhagavata-purana-translation'},
      'R. C. Hazra, Studies in the Upapurāṇas, vol. II','Mahābhāgavata Purāṇa printed Sanskrit editions','Comparative studies of the Bṛhaddharma and Śākta Purāṇic corpus'
    ])
  });
})();