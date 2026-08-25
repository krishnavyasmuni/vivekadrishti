(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Purāṇa:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const R='Ludo Rocher, The Puranas (Wiesbaden, 1986)';
  const H='R. C. Hazra, Studies in the Puranic Records on Hindu Rites and Customs and related Purana studies';
  const AIT='Ancient Indian Tradition and Mythology English translation series, Motilal Banarsidass';

  put('Bhāgavata Purāṇa',{
    sanskritTitle:'श्रीमद्भागवतम् / भागवतपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'Principal received redaction commonly placed between c. 500–1000 CE, with many scholars favouring the 9th–early 10th century and others arguing for substantial Gupta-period material.',extent:'12 skandhas, 335 chapters in a common recension, traditionally 18,000 verses',
    leadParagraphs:[
      'The Bhagavata Purana is a twelve-skandha scripture centred on Bhagavan, above all Krishna, and on bhakti as the highest orientation of religious life. Its seven-day frame places the dying king Parikshit before Shuka, but the work expands far beyond one final sermon: creation, avatara, cosmology, royal genealogy, Sankhya, Yoga, Dharma, Vedic theology and long devotional narratives are woven into the question of how a person remembers God at death.',
      'The tenth skandha is the best-known because it narrates Krishna from birth and Vraja childhood through Mathura and Dvaraka. Yet the Purana deliberately prepares for that book through nine earlier skandhas. Narada’s instruction to Vyasa, Kapila and Devahuti, Dhruva, Prithu, Rishabha, Bharata, Ajamila, Prahlada, Gajendra and Vamana establish a theology in which hearing and recounting divine acts are themselves forms of revelation.',
      'Its Sanskrit reception is unusually rich. Sridhara Svamin’s Bhavarthadipika became a commentary respected across sectarian boundaries; later Vallabha, Gaudiya Vaishnava, Nimbarka and other traditions developed distinct readings of the same Purana rather than merely repeating one medieval interpretation.'
    ],articleSections:[
      {title:'Date, provenance and textual formation',paragraphs:[
        'The received Bhagavata was certainly known by the early eleventh century. Modern dates range widely because literary style, references to southern bhakti, philosophical vocabulary, temple iconography and citation history do not all point with equal force in one direction.',
        'A commonly cited range is about 500–1000 CE. Many scholars place the final redaction in the ninth or early tenth century, while arguments from Gupta and early Pallava religious art have been used to support the existence of substantial Bhagavata narrative and theology earlier than that.',
        'The old proposal that Bopadeva composed the Purana in the thirteenth century cannot account for earlier citation and reception. The historical problem is therefore not whether the text predates Bopadeva, but how far before the eleventh century the received twelve-skandha form should be placed.'
      ]},
      {title:'The twelve skandhas',paragraphs:['A skandha is a major book. The architecture moves from Parikshit’s impending death through creation and divine manifestation, reaches its narrative centre in Krishna, then closes with Uddhava, the destruction of the Yadavas, Kali Yuga and Parikshit’s liberation.'],books:[
        {number:1,title:'Skandha 1',summary:'Naimisha sages and Suta; aftermath of the Mahabharata; Krishna’s departure; Vyasa’s dissatisfaction; Narada teaches him to narrate Bhagavan; Parikshit is cursed; Shuka arrives on the Ganga.'},
        {number:2,title:'Skandha 2',summary:'Parikshit asks what one should hear and remember when death is near. Shuka teaches meditation on the cosmic person, creation and the major subjects of Purana.'},
        {number:3,title:'Skandha 3',summary:'Vidura and Maitreya; creation; Varaha; Kapila’s birth to Devahuti and his teachings on consciousness, prakriti, yoga and bhakti.'},
        {number:4,title:'Skandha 4',summary:'Daksha and Sati; Dhruva; Prithu; the Pracetasas; Narada’s allegory of Puranjana; kingship, devotion and the limits of ritual pride.'},
        {number:5,title:'Skandha 5',summary:'Priyavrata; Rishabha and Bharata; Jada Bharata; extensive cosmography of Jambudvipa, planetary regions and hells.'},
        {number:6,title:'Skandha 6',summary:'Ajamila and the divine name; Daksha’s descendants; Indra, Vritra and the theology of apparent enemy-devotion; vows, sin and grace.'},
        {number:7,title:'Skandha 7',summary:'Prahlada and Narasimha; the failure of Hiranyakashipu; extended teaching on bhagavata-dharma and social/life-stage duties.'},
        {number:8,title:'Skandha 8',summary:'Manvantaras; Gajendra; churning of the ocean; Mohini; Bali and Vamana; the divine protection of devotees across cosmic ages.'},
        {number:9,title:'Skandha 9',summary:'Solar and lunar dynasties; Ambarisha, Yayati and others; a condensed Ramayana; movement through Yadu genealogy toward Krishna.'},
        {number:10,title:'Skandha 10',summary:'Krishna’s birth, Gokula and Vrindavana, Putana, Kaliya, Govardhana, rasa, Akrura, Kamsa, Mathura, Dvaraka, marriages, wars and later lila. It is the longest skandha and the devotional centre of the work.'},
        {number:11,title:'Skandha 11',summary:'The Yadava end; Uddhava Gita; teachings on bhakti, jnana, yoga, the avadhuta and twenty-four teachers; Krishna’s withdrawal from visible earthly lila.'},
        {number:12,title:'Skandha 12',summary:'Kali Yuga and future dynasties, dissolution, Markandeya material, Purana catalogues, Parikshit’s death and a final praise of hearing the Bhagavata.'}
      ]},
      {title:'Krishna and the tenth skandha',paragraphs:[
        'The tenth skandha does not present Krishna only as an avatara who appears for a limited task. The work repeatedly frames him as Bhagavan himself, while still retaining a broad avatara theology in which Narayana, Vishnu, cosmic forms and many descents belong to one supreme reality.',
        'Vraja narrative moves from infant danger to pastoral play, Govardhana and the rasa cycle. The gopis’ devotion became decisive for later bhakti because the text portrays love that values Krishna above reputation, reward and even conventional religious calculation.',
        'Mathura and Dvaraka are not an appendix to childhood Krishna. The later half of the skandha develops royal, marital and political narratives, including Jarasandha, Rukmini, Narakasura, Bana and the Yadava world that prepares the final books.'
      ]},
      {title:'Bhakti, jnana and yoga',paragraphs:[
        'The Bhagavata does not simply oppose devotion to philosophy. It repeatedly uses Upanishadic, Sankhya and Yoga vocabularies while arguing that their fulfilment lies in relation to Bhagavan.',
        'A famous triad speaks of the same nondual reality as Brahman, Paramatman and Bhagavan according to the mode of realization. Later Vedanta schools interpret that relation differently, which is why the text could become authoritative for several Vaishnava systems without producing one identical metaphysics.',
        'Hearing, chanting, remembering, serving, worshipping and surrendering appear throughout the work. Narrative form is therefore theological: listening to the Purana is one of the practices the Purana itself recommends.'
      ]},
      {title:'Manuscripts, commentaries and editions',paragraphs:[
        'The Bhagavata is more architecturally coherent than many encyclopedic Puranas, but manuscript variation still affects verse reading, chapter division and commentary. The traditional count of 18,000 verses is a canonical number rather than an exact description of every surviving manuscript.',
        'Sridhara Svamin’s Bhavarthadipika became the most widely authoritative early commentary. Vallabha’s Subodhini, the Gaudiya commentarial tradition of Jiva Gosvamin and Vishvanatha Cakravartin, and many regional traditions built further theological readings on the same Sanskrit text.',
        'Modern study uses printed Sanskrit editions, manuscript evidence and the extensive commentarial record. A passage from one skandha should be cited by skandha, chapter and verse, not by a translation page.'
      ]},
      {title:'Reception in Hindu traditions',paragraphs:[
        'The Purana became foundational for Krishna-centred bhakti across Sanskrit and vernacular traditions. Its stories generated painting, temple iconography, kirtan, dance-drama, rasa performance and vast retellings in Indian languages.',
        'Gajendra, Dhruva, Prahlada and Ajamila are often transmitted independently of the full book. The Bhagavata’s cultural history is therefore both a history of the twelve-skandha text and of episodes that escaped the codex into public devotion.',
        'Gaudiya Vaishnavas famously call the Bhagavata the natural commentary on Vedanta-sutra; Pushtimarga gives the text a central liturgical and theological place; other Vaishnava lineages receive it through their own doctrines of deity, grace and liberation.'
      ]}
    ],sources:merge(D['Purāṇa:Bhāgavata Purāṇa']?.sources,[{title:'Wikipedia — Bhagavata Purana',detail:'Structure, date debates, theology and reception.',url:'https://en.wikipedia.org/wiki/Bhagavata_Purana'},R,'Edwin F. Bryant, “The Date and Provenance of the Bhagavata Purana”','Daniel P. Sheridan, The Advaitic Theism of the Bhagavata Purana','Sridhara Svamin, Bhavarthadipika','Bhagavata Purana Sanskrit editions'])
  });

  put('Viṣṇu Purāṇa',{
    sanskritTitle:'विष्णुपुराणम्',traditionalAuthor:'Vyasa; spoken by Parashara to Maitreya',language:'Sanskrit',period:'An early coherent core is commonly placed around the 4th–5th centuries CE, with later additions in subsequent centuries.',extent:'6 amshas, 126 chapters, about 7,000 surviving verses; traditional catalogue count 23,000',
    leadParagraphs:[
      'The Vishnu Purana is one of the most tightly organized Mahapuranas. Parashara teaches Maitreya through six amshas that move from creation to cosmography, manvantaras and dharma, royal genealogy, Krishna’s life and finally Kali Yuga, dissolution and liberation.',
      'Unlike Puranas dominated by later pilgrimage accretions, the received Vishnu Purana retains an unusually strong relation to the classical five Purana subjects—creation, recreation, genealogy, manvantaras and dynastic narrative. Its fifth amsha gives a major early Krishna biography that can be compared with the Harivamsha and Bhagavata.'
    ],articleSections:[
      {title:'Date and textual history',paragraphs:[
        'A substantial core is commonly assigned to the Gupta period, around the fourth or fifth century CE. Individual chapters and recensional details may be younger, but the work is usually treated as one of the earlier comparatively coherent Mahapuranas.',
        'The surviving text is much shorter than the traditional 23,000-verse catalogue count. This difference may reflect lost material, differing definitions of the title or the conventional nature of Purana verse totals; it should not be “corrected” by importing chapters from other works.'
      ]},
      {title:'The six amshas',books:[
        {number:1,title:'First amsha — creation and early kings',summary:'Cosmogony, tattvas, births of gods and sages, Dhruva, Prithu, Prahlada and Narasimha, and the establishment of major cosmic and royal patterns.'},
        {number:2,title:'Second amsha — world and cosmos',summary:'Jambudvipa, oceans, mountains, Bharata, planetary regions, sun and moon, subterranean worlds and hells.'},
        {number:3,title:'Third amsha — manvantaras and dharma',summary:'Cosmic ages, Vyasa and division of the Veda, varna-ashrama duties, samskaras, shraddha and household religious practice.'},
        {number:4,title:'Fourth amsha — dynasties',summary:'Solar and lunar royal genealogies, including the lines that culminate in the Kurus and Yadavas.'},
        {number:5,title:'Fifth amsha — Krishna',summary:'The longest part: Krishna’s birth, Gokula childhood, Kamsa, Mathura and Dvaraka, preserving an important classical form of the Krishna cycle.'},
        {number:6,title:'Sixth amsha — Kali, dissolution and liberation',summary:'Kali Yuga, types of cosmic dissolution, yoga and the final relation of knowledge and devotion to Vishnu.'}
      ]},
      {title:'Krishna narrative and comparison',paragraphs:[
        'The fifth amsha is indispensable for reconstructing the development of Krishna mythology. It shares episodes with the Harivamsha and later Bhagavata but differs in scale, theological emphasis and narrative elaboration.',
        'The text moves rapidly through Vraja relative to the Bhagavata. Comparing the three Sanskrit traditions reveals how older heroic and dynastic Krishna material was increasingly interpreted through devotional theology.'
      ]},
      {title:'Cosmology and genealogy',paragraphs:[
        'The second and fourth amshas provide two classical Purana archives: a mapped cosmos and a lineage-based history. Geography is cosmological rather than modern cartography; genealogy connects gods, rishis, Manus and royal houses across enormous cycles of time.',
        'These sections were repeatedly mined by later writers trying to synchronize dynasties and Purana chronology. Their value is greatest when read as the text’s own sacred history rather than forced into a single modern chronology.'
      ]},
      {title:'Vaishnava theology',paragraphs:[
        'Vishnu is the highest reality through whom creation, preservation and dissolution are understood, yet the work can use language of Brahman, Purusha, Prakriti and Yoga. Its theology is systematic without being a later sectarian manual in the style of some medieval Puranas.',
        'Devotion and knowledge converge in the final amsha. The Purana’s influence on later Vaishnava Vedanta comes partly from this ability to integrate classical cosmology with a supreme Vishnu theology.'
      ]},
      {title:'Editions and reception',paragraphs:[
        'H. H. Wilson’s nineteenth-century English translation was one of the earliest complete Purana translations and shaped modern discussion. Later Sanskrit editions and scholarship compare manuscripts and parallel Purana passages.',
        'Traditional Vaishnava commentators and later theologians cite the Vishnu Purana extensively, especially for cosmology, avatara, divine supremacy and genealogy. Ramanuja and later Sri Vaishnava literature draw on Purana passages as scriptural support.'
      ]}
    ],sources:merge(D['Purāṇa:Viṣṇu Purāṇa']?.sources,[{title:'Wikipedia — Vishnu Purana',detail:'Six amshas, 126 chapters, verse count and pancalakshana structure.',url:'https://en.wikipedia.org/wiki/Vishnu_Purana'},R,H,'H. H. Wilson, The Vishnu Purana','Vishnu Purana Sanskrit editions'])
  });

  put('Śiva Purāṇa',{
    sanskritTitle:'शिवपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'Oldest substantial strata commonly placed around the 10th–11th centuries CE; surviving recensions include material added or revised through the 14th century and later.',extent:'Common seven-samhita recension about 24,000 verses; alternative six-samhita and other organizations survive',primaryRecensions:['Seven-samhita printed recension','Six-samhita recension and other manuscript organizations'],
    leadParagraphs:[
      'The Shiva Purana is a large Shaiva Purana devoted to Shiva as supreme Lord, the linga, creation, ritual, mantra, yoga, pilgrimage and the divine family of Sati, Parvati, Skanda and Ganesha. Its best-known modern form is divided into seven samhitas, but the manuscript history makes it impossible to speak of one universally fixed table of contents.',
      'The Rudra Samhita contains much of the narrative material most readers recognize: Sati and Daksha, Parvati’s birth and austerities, Shiva’s marriage, Kumara, Ganesha and major battles. The other samhitas develop linga worship, sacred geography, initiation, mantra, cosmology and liberation.'
    ],articleSections:[
      {title:'Date and recensional history',paragraphs:[
        'The surviving Shiva Purana is a medieval layered text. Hazra and other scholars place old substantial chapters around the tenth or eleventh century, while portions of extant recensions are later than the fourteenth century.',
        'Nineteenth-century editors encountered markedly different manuscripts. The Bombay recension has often been treated as preserving an older organization than some eastern and southern printed versions, but no one manuscript is simply “the original Shiva Purana.”',
        'Older Purana catalogues describe a much larger Shiva Purana divided into twelve samhitas. The discrepancy with surviving six- and seven-samhita forms is direct evidence of textual loss and reorganization.'
      ]},
      {title:'The common seven samhitas',books:[
        {number:1,title:'Vidyeshvara Samhita',summary:'Opening theology, greatness of the Purana, linga, forms of Shiva worship, sacred ash, rudraksha and foundational ritual instruction.'},
        {number:2,title:'Rudra Samhita',summary:'The great narrative book, itself divided into sections on creation, Sati, Parvati, Kumara and battle. It contains Daksha’s sacrifice, Shiva’s marriage and much of the divine-family mythology.'},
        {number:3,title:'Shatarudra Samhita',summary:'Many manifestations and forms of Shiva, extending theology beyond one anthropomorphic form.'},
        {number:4,title:'Kotirudra Samhita',summary:'Linga worship, sacred sites, jyotirlinga material, vows and ritual practices.'},
        {number:5,title:'Uma Samhita',summary:'Cosmology, birth and death, dharma and teachings associated with Uma and Shaiva religious knowledge.'},
        {number:6,title:'Kailasa Samhita',summary:'Initiation, mantra, Om, renunciation and esoteric Shaiva knowledge.'},
        {number:7,title:'Vayaviya Samhita',summary:'A two-part discourse transmitted through Vayu covering cosmology, Shiva theology, yoga, ritual and liberation.'}
      ]},
      {title:'Sati, Parvati and the divine household',paragraphs:[
        'The Sati-Daksha cycle explains the violent rupture between Shiva and a sacrificial order that refuses him honour. Sati’s self-destruction and Virabhadra’s destruction of the sacrifice became one of the foundational narratives through which later Shaiva and Shakta traditions understood divine dignity and the limits of ritual arrogance.',
        'Parvati’s rebirth, tapas and marriage to Shiva turn the same conflict into reconciliation. The birth narratives of Skanda and Ganesha connect cosmic necessity with the intimate world of the divine household, a feature central to later temple and vernacular Hinduism.'
      ]},
      {title:'Linga, mantra and worship',paragraphs:[
        'The linga is treated as both concrete object of worship and sign of Shiva beyond limited form. Ritual sections prescribe installation, offering, mantra, ash and rudraksha, while mythic sections explain why these practices carry divine power.',
        'The text’s worship system belongs to developed medieval Shaivism rather than to one simple continuation of Vedic Rudra ritual. Yet it repeatedly anchors itself in Vedic mantra and cosmological language.'
      ]},
      {title:'Yoga and liberation',paragraphs:[
        'Later samhitas describe meditation, yoga, mantra and knowledge as means toward Shiva. Liberation is not reduced to post-mortem residence in a heaven; the text also works with knowledge of Shiva as the reality behind self and cosmos.',
        'Different passages use devotional, ritual and philosophical idioms, reflecting the composite character of the Purana rather than a single scholastic system.'
      ]},
      {title:'Editions and textual caution',paragraphs:[
        'Chapter references are recension-sensitive. A verse cited from the seven-samhita Venkateshvara or modern Motilal Banarsidass tradition may not occur under the same numbering in a six-samhita manuscript.',
        'This is especially important for claims about which other Puranas the Shiva Purana names. Catalogue passages must be cited by the actual recension and chapter rather than attributed vaguely to “the Shiva Purana.”'
      ]}
    ],sources:merge(D['Purāṇa:Śiva Purāṇa']?.sources,[{title:'Wikipedia — Shiva Purana',detail:'Dating, manuscript recensions and surviving samhita organizations.',url:'https://en.wikipedia.org/wiki/Shiva_Purana'},R,H,AIT,'J. L. Shastri, Shiva Purana translation'])
  });

  put('Liṅga Purāṇa',{
    sanskritTitle:'लिङ्गपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'Old core proposed between c. 5th–10th centuries CE; the received two-part text continued to expand.',extent:'Purvabhaga 108 chapters; Uttarabhaga 55 chapters in common manuscripts, though the text itself gives an older total of 46 for the latter',
    leadParagraphs:[
      'The Linga Purana is a Shaiva Mahapurana in which the linga becomes a theological sign of Shiva as beginningless, immeasurable and not confined to anthropomorphic form. It combines that theology with creation, cosmic time, ritual, pilgrimage, vows, yoga and narratives of Shiva’s manifestations.',
      'The received work has two parts. Its own statement that the second part once contained forty-six chapters, while extant versions contain fifty-five, is unusually clear internal evidence that the Purana continued to grow.'
    ],articleSections:[
      {title:'Date and growth',paragraphs:[
        'Proposals for the oldest core range from the fifth to tenth centuries CE. The span reflects the difficulty of dating a work whose cosmological, ritual and pilgrimage materials did not all enter the recension at once.',
        'The mismatch between the Uttarabhaga’s self-described forty-six chapters and the fifty-five now transmitted strongly suggests later expansion. It gives the textual historian a concrete case where the Purana itself remembers a shorter form.'
      ]},
      {title:'Two-part structure',books:[
        {number:1,title:'Purvabhaga — 108 chapters',summary:'Creation and cycles, emergence and significance of the linga, Shiva narratives, ritual observance, sacred places, cosmology and large bodies of Shaiva theology.'},
        {number:2,title:'Uttarabhaga — 55 extant chapters',summary:'Further ritual, vrata, yoga and theological material; its transmitted size exceeds the forty-six chapters claimed in its own closing statement.'}
      ]},
      {title:'The linga as cosmic sign',paragraphs:[
        'The Purana repeatedly treats the linga as more than a cult image. Famous narratives of the endless pillar dramatize the inability of Brahma and Vishnu to measure Shiva’s beginning or end, translating transcendence into a ritual symbol that can nevertheless be worshipped.',
        'This theology allows form and formlessness to coexist. The devotee approaches a physical linga precisely as the sign of a Lord who exceeds every measurable form.'
      ]},
      {title:'Shaiva religion in an encyclopedic Purana',paragraphs:[
        'Shaiva supremacy is central, but the text retains Vedic material and honours Vishnu and Brahma in many passages. Theological hierarchy does not erase the broader Puranic universe.',
        'Vratas, installation, pilgrimage, mantra and yoga show how a medieval Purana functions as a practical religious archive rather than a single continuous myth.'
      ]},
      {title:'Manuscripts and editions',paragraphs:[
        'Different versions preserve variations in the second part and in ritual blocks. The common 108+55 chapter division is a useful reference system but should not be projected backward as the only historical form.',
        'Modern translations in the Ancient Indian Tradition and Mythology series follow printed Sanskrit recensions; specialist work compares their chapter structure against manuscript catalogues and Purana citations.'
      ]}
    ],sources:merge(D['Purāṇa:Liṅga Purāṇa']?.sources,[{title:'Wikipedia — Linga Purana',detail:'Date range, Purva/Uttara structure and internal evidence of expansion.',url:'https://en.wikipedia.org/wiki/Linga_Purana'},R,H,AIT])
  });

  put('Garuḍa Purāṇa',{
    sanskritTitle:'गरुडपुराणम्',traditionalAuthor:'Vyasa; dialogue of Vishnu and Garuda',language:'Sanskrit',period:'A medieval encyclopedic core developed across the first millennium CE; surviving recensions include substantial later material.',extent:'About 8,000 surviving verses; Purvakhanda roughly 229–243 chapters and Pretakhanda/Uttarakhanda roughly 34–49 chapters depending on recension; traditional count 19,000',
    leadParagraphs:[
      'The Garuda Purana is a Vaishnava encyclopedic Purana framed as knowledge received by Garuda from Vishnu. Popular reception often reduces it to death, funeral rites and the journey after death, but that material belongs mainly to the much smaller Pretakhanda. Most of the surviving Purana concerns the world of the living.',
      'Its Purvakhanda covers worship, sacred geography, iconography, polity, medicine, gemology, grammar, metrics, yoga and other sciences. The Pretakhanda describes death ritual, the preta state, Yama’s realm, consequences of action and the duties of survivors.'
    ],articleSections:[
      {title:'Recensions and verse totals',paragraphs:[
        'Traditional catalogues assign 19,000 verses, while extant manuscripts preserve roughly 8,000. The gap cannot be solved by assuming one modern edition is defective; Garuda manuscripts circulate in distinct recensions with different chapter counts.',
        'Purvakhanda can contain about 229 chapters or more than 240 depending on edition. Pretakhanda varies still more dramatically, from the mid-thirties to nearly fifty chapters. Some Venkateshvara editions add a Brahmakhanda.'
      ]},
      {title:'Purvakhanda — the encyclopedic majority',paragraphs:[
        'The first part constitutes roughly nine-tenths of much of the received text. Vishnu worship and Vaishnava festival material stand beside Panchayatana, iconography, temple construction, geography, medicine, veterinary or bodily knowledge, gems, omens, polity, grammar and poetics.',
        'The diversity is not evidence that the Purana has “no real subject.” Medieval Puranas often function as archives in which sacred authority organizes many useful sciences around a theological frame.'
      ]},
      {title:'Pretakhanda — death and the dead',paragraphs:[
        'The Pretakhanda describes rites from death and cremation through offerings for the preta and the transition toward ancestor status. It also maps Yama’s domain, punishments for actions and the post-mortem journey in vivid narrative language.',
        'Three substantially different Pretakhanda versions are known. A funeral pamphlet or Garuda-purana-saroddhara therefore cannot automatically stand for every manuscript of the complete Mahapurana.',
        'The popularity of this section in household death ritual explains why many modern readers encounter it detached from the much larger encyclopedic first part.'
      ]},
      {title:'Medicine, gems and technical knowledge',paragraphs:[
        'Chapters on Ayurveda, toxicology and physical health coexist with gem-testing, omens and practical sciences. Such material is valuable for intellectual history precisely because a Purana can preserve technical knowledge outside the specialist shastra in which it originated.',
        'Borrowing and adaptation are common. A technical chapter may derive from a specialist source and acquire a new life when inserted into a Purana with wider circulation.'
      ]},
      {title:'Vaishnava frame and plural worship',paragraphs:[
        'Vishnu is the framing teacher, yet the Purvakhanda also contains Shaiva, Shakta, Surya, Ganesha and Smarta material. The presence of multiple deities should be read as the religious breadth of the received text rather than as proof that the Vaishnava frame is meaningless.'
      ]},
      {title:'Editions and reception',paragraphs:[
        'The Garuda Purana Saroddhara, commented by Navanidhirama and translated in the early twentieth century, strongly shaped English-language knowledge of the death material but is an extract/commentarial tradition rather than the complete Purana.',
        'Full editions and translations must identify whether they follow a two-khanda or expanded recension. Chapter references to funeral material are particularly unsafe without that information.'
      ]}
    ],sources:merge(D['Purāṇa:Garuḍa Purāṇa']?.sources,[{title:'Wikipedia — Garuda Purana',detail:'Purva/Pretakhanda structure, verse totals and content range.',url:'https://en.wikipedia.org/wiki/Garuda_Purana'},R,AIT,'Garuda Purana Saroddhara of Navanidhirama'])
  });

  put('Nāradīya Purāṇa',{
    sanskritTitle:'नारदीयपुराणम् / नारदपुराणम्',traditionalAuthor:'Vyasa; Nārada as principal sacred authority',language:'Sanskrit',period:'Layered medieval text; Hazra places major early portions before the 11th century, with substantial later growth.',extent:'Purvabhaga 125 chapters in four padas; Uttarabhaga 82 chapters in a common recension',
    leadParagraphs:[
      'The Naradiya Purana is a Vaishnava Mahapurana transmitted in two large parts and closely associated with Narada. It is particularly valuable for bhakti, temple worship, pilgrimage and its summaries or catalogues of other sacred literature.',
      'Its title created a famous bibliographic problem because Narada/Naradiya works occur in both Mahapurana and Upapurana lists. Modern scholarship distinguishes the large Naradiya Mahapurana from the Brihannaradiya Upapurana rather than treating every “Naradiya” catalogue-name as the same manuscript.'
    ],articleSections:[
      {title:'Naradiya and Brihannaradiya',paragraphs:[
        'The Mahapurana called Narada or Naradiya has two bhagas. Brihannaradiya is a different, shorter Upapurana of about thirty-eight chapters in its common printed form.',
        'The distinction was not obvious to early European cataloguers because both are Vaishnava, both use Narada’s authority and manuscript titles can vary. Traditional lists themselves sometimes preserve more than one Naradiya-type title.'
      ]},
      {title:'Purvabhaga',paragraphs:['The first part has 125 chapters divided into four padas. It ranges across creation, devotion, vows, worship, sacred places, religious disciplines and large surveys of scripture and sectarian practice.','Its encyclopedic notices about other Puranas and branches of knowledge are especially important to Purana bibliography because they record how one medieval text understood the larger canon.']},
      {title:'Uttarabhaga',paragraphs:['The second part contains eighty-two chapters in the common recension and includes the Rukmangada narrative, alongside religious observance and pilgrimage material.','The difference in tone and chronology among blocks supports a layered history rather than one author composing 207 chapters in a single sitting.']},
      {title:'Bhakti and worship',paragraphs:['Vishnu-bhakti is prominent, with mantra, image worship, vrata and sacred places integrated into a larger theology of devotion. The text also transmits practical instruction intended for temple and household religion rather than only cosmological myth.']},
      {title:'Dating and Hazra’s analysis',paragraphs:[
        'Early scholars sometimes dated the whole work very late because manuscripts contain material reflecting medieval and early-modern religious history. Hazra instead separated strata, placing substantial portions of the Purvabhaga and Uttarabhaga before the eleventh century and other parts later.',
        'This layered approach is essential. A late chapter cannot automatically date the oldest core, while an early quotation cannot prove that every present chapter was already attached.'
      ]},
      {title:'Catalogue value',paragraphs:['The Naradiya Purana is one of the texts that helps reconstruct traditional ideas about Purana classification, ritual authorities and sacred literature. Its bibliographic statements are evidence for the period of the particular passage, not timeless catalogues outside textual history.']}
    ],sources:merge(D['Purāṇa:Nāradīya Purāṇa']?.sources,[{title:'Wikipedia — Naradiya Purana',detail:'Two bhagas, distinction from Brihannaradiya and Hazra’s stratification.',url:'https://en.wikipedia.org/wiki/Naradiya_Purana'},R,H,AIT])
  });

  put('Agni Purāṇa',{
    sanskritTitle:'अग्निपुराणम्',traditionalAuthor:'Vyasa; Agni as teacher',language:'Sanskrit',period:'Oldest recoverable encyclopedic layers after c. 7th century and before the early 11th century; additions continued into the late medieval/early modern period.',extent:'382 or 383 chapters; roughly 12,000–15,000 verses in surviving editions',
    leadParagraphs:[
      'The Agni Purana is one of the clearest examples of a Purana functioning as an encyclopedia. Agni transmits sacred knowledge, but the received 382–383 chapters range from avatara and ritual through temple architecture, iconography, polity, warfare, law, medicine, grammar, metrics and poetics.',
      'Its abrupt movement between subjects is part of its textual character. The work accumulated specialist material over centuries, often preserving compact summaries of sciences whose fuller treatment belongs to separate shastras.'
    ],articleSections:[
      {title:'Date and encyclopedic growth',paragraphs:[
        'The text is later than the earliest Puranic cores. A form of Agni Purana existed before al-Biruni in the early eleventh century, while some present chapters may be as late as the seventeenth century.',
        'The result is not one chronological layer. Mythological chapters, ritual sections, art theory and technical digests must be dated by their own sources and parallels.'
      ]},
      {title:'382–383 chapter structure',paragraphs:[
        'Published recensions differ by a chapter and by thousands of verses. There is no elegant division into six amshas or twelve skandhas; subjects often follow one another with little transition.',
        'That apparently untidy structure reflects the Purana’s encyclopedic function. Blocks can be recognized by topic even when they are not named as formal books.'
      ]},
      {title:'Myth, worship and iconography',paragraphs:[
        'Early portions include avatara narratives and religious instruction. Large iconographic sections describe measurements and identifying features of deities, image installation, temple plans and ritual worship.',
        'These chapters became important to historians of Indian art because they preserve textual norms for images and architecture that can be compared with surviving temples and sculptures.'
      ]},
      {title:'Polity and warfare',paragraphs:[
        'The Purana discusses kingship, fortification, army organization, diplomacy, causes of war and martial techniques. Such chapters overlap the concerns of Arthashastra and Dhanurveda literature.',
        'Their presence shows that Purana compilers understood royal and military knowledge as part of a sacred encyclopedia rather than as an alien secular domain.'
      ]},
      {title:'Grammar, metrics and poetics',paragraphs:[
        'Compact chapters summarize Sanskrit grammar, chandas and literary theory. The poetics material has been studied because it transmits definitions and classifications parallel to independent alankara-shastra texts.',
        'A summary in Agni Purana can preserve a version of a doctrine that differs from the specialist treatise, making the Purana a witness to the circulation of scholarly knowledge.'
      ]},
      {title:'Medicine and practical sciences',paragraphs:[
        'Ayurvedic, veterinary, gemological and agricultural materials appear beside ritual and theology. They should be studied comparatively rather than assumed to originate with the Purana itself.',
        'This borrowing is not plagiarism in the modern sense; compendia were one way technical knowledge reached readers outside a narrow specialist lineage.'
      ]},
      {title:'Editions',paragraphs:[
        'Rajendralal Mitra’s nineteenth-century Bibliotheca Indica edition was the first major printed Sanskrit publication. Manmatha Nath Dutt produced an early English translation, while the Ancient Indian Tradition and Mythology series provides a later full translation.',
        'Because recensions differ in chapter count, claims about a technical topic should cite chapter and edition rather than “Agni Purana” alone.'
      ]}
    ],sources:merge(D['Purāṇa:Agni Purāṇa']?.sources,[{title:'Wikipedia — Agni Purana',detail:'382/383 chapters, encyclopedic contents and chronology.',url:'https://en.wikipedia.org/wiki/Agni_Purana'},R,AIT,'Rajendralal Mitra, Agni Purana edition','Manmatha Nath Dutt, Agni Purana translation'])
  });

  put('Mārkaṇḍeya Purāṇa',{
    sanskritTitle:'मार्कण्डेयपुराणम्',traditionalAuthor:'Vyasa; Markandeya as principal sage',language:'Sanskrit',period:'Early Puranic core commonly placed c. 3rd–6th centuries CE; Devi Mahatmya generally c. 5th–6th century.',extent:'137 chapters in common complete editions; Devi Mahatmya = chapters 81–93, 700 verses in its received liturgical count',
    leadParagraphs:[
      'The Markandeya Purana is one of the older surviving Puranas and one of the least dominated by a single sectarian frame. It opens from unanswered Mahabharata questions, moves through teachings delivered by wise birds, manvantara and royal narratives, Yoga and Dharma, and contains within chapters 81–93 the Devi Mahatmya.',
      'The Devi Mahatmya transformed the religious history of the whole work. Its thirteen chapters present Mahadevi as the supreme cosmic power in three great mythic cycles and became an independent liturgical scripture recited as Durga Saptashati or Chandi.'
    ],articleSections:[
      {title:'Date and manuscripts',paragraphs:[
        'The Purana’s early literary style and close relation to epic material support a relatively old date for major portions, often in the third-to-sixth centuries CE. The Devi Mahatmya is generally placed in the fifth or sixth century and is securely earlier than the 608 CE Dadhimati inscription that quotes it.',
        'A complete Nepalese palm-leaf manuscript dated around 998 CE provides important physical evidence for the medieval text. Early printed editions differed at the ending, with one Calcutta version stopping in chapter 136 while Bombay and Poona editions carry the Dama narrative through chapter 137.'
      ]},
      {title:'Jaimini, Markandeya and the wise birds',paragraphs:[
        'Jaimini approaches Markandeya with questions left unresolved by the Mahabharata. Markandeya directs him to four wise birds in the Vindhyas, whose replies fill a large early block of the Purana.',
        'The framing device links the Purana directly with Itihasa while creating room for moral instruction, karma, Dharma, shraddha and narrative exempla.'
      ]},
      {title:'Yoga and Dattatreya',paragraphs:[
        'Chapters around 39–43 contain significant Yoga teaching. Dattatreya appears as a teacher in a jnana-oriented, strongly nondual environment.',
        'This material is important for the history of Dattatreya because it predates many later tantric and yogic portrayals and presents him within a Purana concerned with knowledge and liberation.'
      ]},
      {title:'Devi Mahatmya — chapters 81–93',books:[
        {number:1,title:'Madhu and Kaitabha',summary:'Vishnu lies in cosmic sleep while the Goddess as Mahamaya is praised; she enables the destruction of the demons and is revealed as primordial power.'},
        {number:2,title:'Mahishasura cycle',summary:'The energies of the gods unite as the Goddess, who defeats the buffalo demon Mahishasura. This cycle establishes her not as a subordinate consort but as the concentrated shakti of the gods and their superior defender.'},
        {number:3,title:'Shumbha and Nishumbha cycle',summary:'The Goddess manifests Kali, Chamunda and other forms, destroys Dhumralochana, Chanda-Munda, Raktabija and finally Shumbha-Nishumbha, then grants boons to King Suratha and the merchant Samadhi.'}
      ],paragraphs:['The received text is arranged as thirteen chapters and ritually counted as seven hundred verses. Its hymns—the Brahmani praise, Shakradi stuti, Aparajita/Ya Devi hymn and Narayani stuti—became central in Shakta liturgy.']},
      {title:'Goddess theology',paragraphs:[
        'The Devi Mahatmya identifies the Goddess with sleep, hunger, intelligence, power, prosperity and the consciousness present in beings. She can be gentle and terrifying because the text makes all cosmic functions expressions of one Devi.',
        'This synthesis was foundational for later Shaktism. Older goddesses and local battle traditions are organized into a theology in which Mahadevi is the supreme reality from whom the gods receive power.'
      ]},
      {title:'Critical edition and reception',paragraphs:[
        'F. E. Pargiter’s early translation emphasized genealogical and historical interests; Thomas Coburn’s study of the Devi Mahatmya transformed modern understanding of its theology and liturgical reception. A modern critical Markandeya edition was published by the Oriental Institute, Vadodara.',
        'The Purana’s reception is bifurcated: the complete 137-chapter work remains a major Puranic source, while the thirteen-chapter Devi Mahatmya circulates independently on a vastly larger liturgical scale.'
      ]}
    ],sources:merge(D['Purāṇa:Mārkaṇḍeya Purāṇa']?.sources,[{title:'Wikipedia — Markandeya Purana',detail:'137 chapters, chronology, manuscripts and Devi Mahatmya.',url:'https://en.wikipedia.org/wiki/Markandeya_Purana'},{title:'Wikipedia — Devi Mahatmya',detail:'Thirteen chapters, 700 verses and date evidence.',url:'https://en.wikipedia.org/wiki/Devi_Mahatmya'},R,'Thomas B. Coburn, Devi Mahatmya: The Crystallization of the Goddess Tradition','F. E. Pargiter, Markandeya Purana'])
  });

  put('Padma Purāṇa',{
    sanskritTitle:'पद्मपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'Textual layers range broadly from c. 4th–15th centuries CE, with major medieval and later recensional expansion.',extent:'Five-khanda Bengal recension and six-khanda western recension; one of the largest Puranic corpora',primaryRecensions:['Bengal recension','Western/printed recension'],
    leadParagraphs:[
      'The Padma Purana is a vast, highly layered Purana whose surviving recensions differ at the level of entire khandas and dozens of chapters. Pilgrimage, vrata, Dharma, creation, Vishnu devotion, Shiva narratives, sacred rivers and sectarian classification all occupy large blocks.',
      'The western recension familiar from many printed editions has six khandas; the older Bengal recension has five and lacks or rearranges substantial material. A claim attributed to “Padma Purana” must therefore identify the khanda and ideally the recension.'
    ],articleSections:[
      {title:'Bengal and western recensions',paragraphs:[
        'The Bengal recension has Srishti, Bhumi, Svarga, Patala and Uttara khandas. The western recension has Adi/Svarga, Bhumi, Brahma, Patala, Srishti and Uttara, with a different order and substantial added material.',
        'Bengal Bhumi contains extra chapters in comparison with some western forms, while Patala likewise differs substantially. A large Dharma-shastra block in Srishti is absent from Bengal manuscripts.',
        'These are not minor copyist errors. The Padma title covered a textual complex that continued to absorb and reorganize regional and sectarian material.'
      ]},
      {title:'Major khandas',books:[
        {number:1,title:'Srishti / Adi-Svarga material',summary:'Creation, cosmic and divine narratives, Pushkar and other sacred geography, and in some recensions substantial Dharma material.'},
        {number:2,title:'Bhumi Khanda',summary:'Legends woven into a broad religious geography of the earth, kings, Dharma and pilgrimage.'},
        {number:3,title:'Svarga or Brahma Khanda',summary:'Heavenly worlds, deities, sacred rites and pilgrimage; its exact identity and placement depend strongly on recension.'},
        {number:4,title:'Patala Khanda',summary:'Large narrative and pilgrimage sections, including extensive Rama-related and Vaishnava material in common printed forms.'},
        {number:5,title:'Uttara Khanda',summary:'A very large late layer containing vrata, bhakti, sectarian theology, Purana and Smriti classifications, sacred months and numerous influential later passages.'}
      ]},
      {title:'Pilgrimage and sacred geography',paragraphs:[
        'Pushkar appears prominently near the beginning of western editions, and many other tirtha-mahatmyas turn rivers, temples and landscapes into narrated sacred space. A pilgrimage chapter normally combines geography with myth: the story explains why a place carries a particular religious potency.',
        'Such blocks can have independent regional histories. Their presence is one reason the Purana expanded over centuries as new sacred centres entered broader Sanskrit networks.'
      ]},
      {title:'Sectarian classifications',paragraphs:[
        'The Uttara Khanda contains influential classifications of Puranas and Smritis, including the sattvika-rajasika-tamasika schemes used in this index. These lists became famous in later sectarian polemic.',
        'The classifications are themselves statements made by a particular Padma recension and layer. They should be quoted accurately rather than retrojected as a universal prehistoric Hindu canon.'
      ]},
      {title:'Dating the layers',paragraphs:[
        'Proposals range from early first-millennium material to additions well into the fifteenth or sixteenth century. References to later temple geography and sectarian debates demonstrate that some extant passages are medieval or early modern.',
        'The proper unit of dating is therefore the khanda or passage. Saying “the Padma Purana is fourth century” or “the Padma Purana is fifteenth century” obscures the actual history.'
      ]},
      {title:'Textual use',paragraphs:[
        'Because the two major recensions differ so substantially, online translations and printed volumes often represent only one textual line. Chapter numbers from a Bengal manuscript may not match the western Venkateshvara-style edition.',
        'This page consequently treats Padma as a recensional complex and attaches list claims to their precise khanda witness whenever the index itself depends on them.'
      ]}
    ],sources:merge(D['Purāṇa:Padma Purāṇa']?.sources,[{title:'Wikipedia — Padma Purana',detail:'Bengal/western recensions, five/six khandas and broad chronology.',url:'https://en.wikipedia.org/wiki/Padma_Purana'},R,H,AIT,'Padma Purana Sanskrit editions'])
  });

  put('Skanda Purāṇa',{
    sanskritTitle:'स्कन्दपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'Old Skandapurana core generally c. 6th–8th centuries CE; the enormous later khanda corpus continued growing through the medieval period.',extent:'Old critical Skandapurana and a much larger later seven-khanda printed corpus; traditionally among the largest Puranas',primaryRecensions:['Old Skandapurana manuscript tradition','Later seven-khanda/mahatmya corpus'],
    leadParagraphs:[
      'The name Skanda Purana covers one of the most complicated textual histories in Puranic literature. An early Skandapurana survives in old Nepalese manuscripts and is being critically edited; a vastly larger later corpus, familiar from printed editions, is organized into khandas and dominated by pilgrimage mahatmyas, Shaiva sacred geography and regional traditions.',
      'The Purana is Shaiva, but it is not simply the biography of Skanda. Shiva, sacred places, tirthas, regional myths, vrata and temple landscapes occupy far more of the received corpus than a continuous narrative of Karttikeya.'
    ],articleSections:[
      {title:'The old Skandapurana',paragraphs:[
        'The discovery and study of early Nepalese palm-leaf manuscripts transformed the field. One famous manuscript is dated around 810 CE and preserves a text much smaller and structurally different from the giant printed Skanda Purana known in modern India.',
        'The old text contains early Shaiva mythology, sacred geography and the development of Pashupata-oriented religious worlds. Its relatively early physical witnesses make it exceptionally important for reconstructing the formation of Puranic Shaivism.'
      ]},
      {title:'The later seven-khanda corpus',paragraphs:[
        'A common printed organization has seven large khandas, including Maheshvara, Vaishnava, Brahma, Kashi, Avanti, Nagara and Prabhasa under varying labels and subdivisions.',
        'These khandas contain enormous tirtha-mahatmyas and can circulate almost as independent regional Puranas. Their total size far exceeds the old Skandapurana and cannot be treated as a simple unchanged expansion of one eighth-century manuscript.'
      ]},
      {title:'Kashi and sacred geography',paragraphs:[
        'The Kashi Khanda is among the most famous parts of the later corpus. It maps Varanasi through temples, lingas, rivers, boundaries and salvation narratives, making the city itself a sacred text that can be ritually traversed.',
        'Similar processes occur in Prabhasa, Avanti and other mahatmyas. The Skanda tradition is therefore indispensable for studying how regional landscapes entered the Sanskrit sacred geography of all-India pilgrimage.'
      ]},
      {title:'Manuscript contamination and misplaced khandas',paragraphs:[
        'The giant corpus is bibliographically unstable. A famous example is the Reva Khanda: printed Skanda editions incorporated a long Reva text that manuscript research associates with the Vayu Purana, while a different Reva Khanda belongs to Skanda.',
        'Such cases show why printed nineteenth- and twentieth-century compilations cannot automatically determine ancient Purana boundaries.'
      ]},
      {title:'Critical Edition project',paragraphs:[
        'The Groningen/Leiden Skandapurana project has produced a critical edition of the old text from early manuscripts, beginning with volumes edited by Rob Adriaensen, Hans Bakker and Harunaga Isaacson and continued by Peter Bisschop, Yuko Yokochi and others.',
        'Its goal differs from editing the later seven-khanda corpus. The project reconstructs the oldest recoverable Skandapurana tradition, while later mahatmyas require their own manuscript histories.'
      ]},
      {title:'Shaiva history and reception',paragraphs:[
        'The early text is a major source for Pashupata and emerging Puranic Shaivism; later khanda traditions show Shaiva sacred geography adapting to regional temples and pilgrimage networks.',
        'That long continuity is precisely why “Skanda Purana” cannot be reduced to one date or one table of contents. It is both an early Purana and the title of a medieval textual library.'
      ]}
    ],sources:merge(D['Purāṇa:Skanda Purāṇa']?.sources,[{title:'Wikipedia — Skanda Purana',detail:'Early Nepalese manuscript, later seven-khanda corpus and Critical Edition.',url:'https://en.wikipedia.org/wiki/Skanda_Purana'},R,'Skandapurana Critical Edition, Groningen/Leiden volumes','Hans T. Bakker and Peter Bisschop, studies of the Skandapurana','Juergen Neuss, Reva Khanda textual studies'])
  });
})();