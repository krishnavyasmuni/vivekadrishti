(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const put=(name,data)=>{D[`Smṛti:${name}`]=Object.assign({},D[`Smṛti:${name}`]||D[name]||{},data);};
  const OLDS='Patrick Olivelle, Dharmasūtras: The Law Codes of Āpastamba, Gautama, Baudhāyana, and Vasiṣṭha (Oxford, 1999/2000)';
  const OLMANU='Patrick Olivelle, Manu’s Code of Law: A Critical Edition and Translation of the Mānava-Dharmaśāstra (Oxford, 2005)';
  const OLYAJ='Patrick Olivelle, A Treatise on Dharma: Yājñavalkya Dharmaśāstra (Murty Classical Library, 2019)';
  const KANE='P. V. Kane, History of Dharmaśāstra, 5 vols. (Poona: BORI, 1930–1962)';

  put('Manu',{
    overview:'“Manu” in a Smṛti list points to the Mānava Dharmaśāstra/Manusmṛti tradition, a deliberately organized metrical treatise rather than a transcript of primordial law. The received text constructs a comprehensive theory of dharma joining Vedic authority, social order, household ritual, kingship, litigation, penance, karma and liberation.',
    period:'Olivelle’s critical study places the final redaction broadly around the 2nd century CE; older scholarship proposed wider ranges from the last centuries BCE into the early centuries CE.',
    milieu:'Early classical Brahmanical śāstra after the Dharmasūtra period, when school-specific prose Dharma was recast as a universalizing metrical Dharmaśāstra.',
    history:'The text survives in a large manuscript and commentary tradition. Olivelle’s critical edition reconstructs an archetype by comparing manuscripts rather than simply reproducing Kullūka’s later vulgate. Medhātithi is the earliest major surviving commentator and is indispensable for reception history.',
    datingBasis:'Metrical/literary form, relationship to earlier Dharmasūtras, political/legal institutions, comparison with Arthaśāstra-type material and later works that cite Manu.',
    chapterMap:['Ch. 1: creation and Manu’s authority.','Ch. 2: sources of dharma, initiation and Vedic study.','Ch. 3: marriage, household rites, hospitality, śrāddha.','Chs. 4–5: daily conduct, food, purity, women and death impurity.','Ch. 6: forest-dweller and renouncer.','Chs. 7–9: king, courts, eighteen titles of law, family/property/inheritance.','Ch. 10: varṇa, mixed groups and livelihoods.','Ch. 11: sin and penance.','Ch. 12: karma, rebirth, guṇas, knowledge and release.'],
    scholarlyPositions:[`${OLMANU}: critical text and argument for the work’s literary/redactional unity and historical setting.`,`${KANE}: encyclopedic documentation of Manu’s relation to earlier and later Dharma literature.`],
    bibliography:[OLMANU,KANE,'Medhātithi, Manubhāṣya','Donald R. Davis Jr., The Spirit of Hindu Law (2010)']
  });

  put('Yājñavalkya',{
    overview:'The Yājñavalkya Dharmaśāstra is a concise, highly systematic classical Dharma text whose organization became enormously influential. Its three adhyāyas—ācāra, vyavahāra and prāyaścitta—separate religious conduct, jurisprudence and expiation while still connecting all three to kingship, household order and liberation.',
    period:'Generally placed in the 4th–5th centuries CE, broadly Gupta-period.',
    milieu:'Mature classical Dharmaśāstra with developed courts, documentary evidence, property rules and a more systematized yoga/soteriology than earlier texts.',
    history:'The anonymous redactor speaks through the authority of Yājñavalkya. The text’s later authority was magnified by Vijñāneśvara’s Mitākṣarā, which became foundational to medieval and colonial-era Hindu legal interpretation.',
    datingBasis:'Legal institutions and written documents, numismatic/astral terminology, relationship to Manu and earlier Dharma texts, and Gupta-period cultural context.',
    chapterMap:['Ācāra: sources of dharma, initiation, marriage, household duties, śrāddha, gifts, kingly conduct.','Vyavahāra: courts, plaint/reply, witnesses, documents, possession, ordeals, debt, deposits, partnerships, boundaries, assault, theft, adultery and inheritance.','Prāyaścitta: impurity, funerary rules, sins, penance, karma, subtle body, yoga and liberation.'],
    namedFeatures:['Three-part architecture: Ācāra / Vyavahāra / Prāyaścitta','Highly developed documentary evidence','Mitākṣarā reception'],
    scholarlyPositions:[`${OLYAJ}: modern text-historical treatment and translation; situates the work in the Gupta-period legal-intellectual world.`,`${KANE}: documents its exceptional influence through Mitākṣarā and later Nibandhas.`],
    bibliography:[OLYAJ,KANE,'Vijñāneśvara, Mitākṣarā','Patrick Olivelle, studies on the textual history of Yājñavalkya Dharmaśāstra']
  });

  put('Viṣṇu',{
    overview:'The Viṣṇu Smṛti (Vaiṣṇava Dharmaśāstra) is a surviving hundred-chapter Dharma text in mixed prose and verse. Its distinctive feature is the recasting of an older Kāṭhaka Dharma tradition into an explicitly Vaiṣṇava frame: Viṣṇu, after raising Earth as Varāha, teaches her dharma.',
    period:'Patrick Olivelle places the received Vaiṣṇava redaction around the 7th century CE; broader modern ranges often span c. 6th–8th centuries.',
    milieu:'A Kāṭhaka/Black-Yajurveda Dharma tradition reworked in a Kashmir-associated Vaiṣṇava/Pāñcarātra religious environment.',
    history:'The prose strata preserve sūtra-like Dharma material while metrical and Vaiṣṇava sections reveal redaction. The work is therefore especially useful for seeing an older Dharma corpus absorbed into sectarian Purāṇic religion.',
    datingBasis:'Kāṭhaka affiliation, geography, Vaiṣṇava iconography, Pāñcarātra-style imagery and comparison with the development of other Dharmaśāstras.',
    chapterMap:['1: Varāha–Earth frame.','2–4: varṇa duties, king, weights/measures.','5–8: offences, debt, documents, witnesses.','9–14: ordeals.','15–18: inheritance and sons.','19–23: funerals and impurity.','24–32: women and saṃskāras.','33–45: sins, hells and transmigration.','46–57: penances.','58–70: householder duties.','73–86: śrāddha.','87–93: gifts.','94–96: forest life and asceticism.','97: meditation on Viṣṇu.','98–100: concluding religious material.'],
    scholarlyPositions:['Patrick Olivelle, “The Date and Provenance of the Viṣṇu-Smṛti”: argues for the Kāṭhaka/Kashmir and Vaiṣṇava-redaction setting.','Julius Jolly’s edition/translation remains important for the received 100-chapter text.'],
    bibliography:['Patrick Olivelle, “The Date and Provenance of the Viṣṇu-Smṛti”',KANE,'Julius Jolly, The Institutes of Vishnu']
  });
  D['Smṛti:Vaiṣṇava']=D['Smṛti:Viṣṇu'];

  put('Āpastamba',{
    overview:'The Āpastamba Dharma text is not originally a free-standing metrical “Smṛti”; it is two praśnas within the larger Āpastamba Kalpasūtra of the Black Yajurveda. It covers student and householder conduct, food, purity, marriage, property, penance, social norms and competing āśrama/renunciation theories.',
    period:'Olivelle’s relative chronology makes Āpastamba the oldest of the four extant classical Dharmasūtras, around the early 3rd century BCE; Kane proposed 450–350 BCE.',
    milieu:'Vedic school-based Dharma, probably connected with southern/Deccan transmission of the Āpastamba tradition.',
    history:'Its location inside a Kalpasūtra matters: Dharma here is still part of a Vedic school curriculum, before the universalizing verse Dharmaśāstras of Manu/Yājñavalkya.',
    datingBasis:'Absence of later mixed-class schemes, terminology, relation to Patañjali-era institutions and comparison with Gautama/Baudhāyana/Vasiṣṭha.',
    chapterMap:['Student initiation and Vedic study.','Teacher/student obligations.','Household rites and food/purity.','Marriage and sexual conduct.','Inheritance/property.','Penance and social exclusion.','Custom as a source of Dharma.','Renunciation/ascetic ideals.'],
    scholarlyPositions:[`${OLDS}, introduction: argues Āpastamba precedes Gautama; contrasts this with Kane’s older chronology.`,`Kane’s chronology places Āpastamba later than Gautama, illustrating genuine scholarly disagreement.`],
    bibliography:[OLDS,KANE,'Āpastamba Kalpasūtra/Dharmasūtra critical editions']
  });

  put('Gautama',{
    overview:'The Gautama Dharmasūtra is a terse prose Dharma text covering sources of dharma, life-stages, marriage, inheritance, purity, royal justice, penance and funerary/ancestral practice. Its extreme aphoristic compression appears deliberate rather than automatically proving great antiquity.',
    period:'Olivelle places Gautama around the middle of the 3rd century BCE, after Āpastamba; Kane famously proposed 600–400 BCE, and other scholars have defended an earlier Gautama.',
    milieu:'Early Dharmaśāstra, probably in a northwestern/western intellectual environment; traditionally associated with Sāmaveda.',
    history:'The text’s use of terms such as yavana and its mature āśrama vocabulary are central to modern relative dating debates.',
    datingBasis:'Terminology, āśrama system, social categories, the complete exclusion of verse, relation to Pāṇinian aphoristic style and comparison with Āpastamba.',
    scholarlyPositions:[`${OLDS}, introduction: places Āpastamba before Gautama and explains why Gautama’s perfect sūtra style need not make it older.`,`Kane and Lingat represent major alternative chronological schemes.`],
    bibliography:[OLDS,KANE,'Robert Lingat, The Classical Law of India']
  });

  put('Vasiṣṭha',{
    overview:'The Vasiṣṭha Dharmasūtra is a comparatively late and composite member of the early sūtra corpus. It combines prose and verse and covers dharma sources, marriage, purity, inheritance, law, major sins and elaborate penance.',
    period:'Olivelle places it around the late 1st century BCE; older schemes allow a wider 300–100 BCE or even early-CE range.',
    milieu:'Late Dharmasūtra culture approaching the metrical Smṛti period.',
    history:'Unlike Āpastamba, no complete surrounding Kalpasūtra survives. The work’s use of written evidence and first-person style in some passages are among the markers of its relative lateness.',
    datingBasis:'Written evidence in judicial procedure, literary style, social geography, comparison with the earlier Dharmasūtras.',
    bibliography:[OLDS,KANE]
  });
  D['Smṛti:Vāsiṣṭha']=D['Smṛti:Vasiṣṭha'];

  put('Parāśara',{
    overview:'The extant Parāśara Smṛti is an early-medieval Dharmaśāstra especially associated with yuga-dharma: later tradition reads it as adapting Dharma to Kali-yuga. Its surviving text concentrates on ācāra, impurity, domestic/social rules and prāyaścitta rather than the full jurisprudential architecture of Yājñavalkya.',
    period:'Often placed around the 8th century CE in recent Dharmaśāstra histories, though it is textually layered and uses the authority of the ancient sage Parāśara.',
    milieu:'Early-medieval Brahmanical Dharma responding to the problem of which earlier rules remain applicable in Kali-yuga.',
    history:'The sage-name is traditional, not an authorship claim in the modern historical sense. The work became disproportionately influential through medieval debates over Kali-age practice.',
    chapterMap:['Opening: Dharma authorities and yuga framework.','Ācāra: household/social practice, purity and livelihood.','Prāyaścitta: expiations for sins and impurity.'],
    bibliography:[KANE,'Parāśara Smṛti Sanskrit editions','Modern studies of yuga-dharma']
  });
  D['Smṛti:Pārāśara']=D['Smṛti:Parāśara'];

  put('Bṛhaspati',{
    overview:'The Bṛhaspati Smṛti is a major lost Dharmaśāstra recoverable in substantial fragments through quotations in medieval legal commentaries and digests. The recoverable material is exceptionally legalistic: court constitution, pleadings, evidence, documents, debt, contracts, partnerships, property and commercial disputes.',
    period:'Major reconstructed strata are usually placed around the 5th–6th centuries CE, though the surviving quotation-corpus need not be homogeneous.',
    milieu:'Mature classical jurisprudence, alongside Nārada and Kātyāyana.',
    history:'Because no continuous archetypal manuscript survives, every reconstructed “chapter” depends on quotation attribution and editorial ordering. A scholarly dossier must distinguish reconstructed text from a directly transmitted book.',
    chapterMap:['Courts and judges.','Plaint/reply and stages of litigation.','Witnesses and documents.','Debt, interest and surety.','Contracts/deposits/partnerships.','Property/inheritance.','Royal punishment and offences.'],
    status:'Lost as a continuous independent text; substantially reconstructed from quotations.',
    bibliography:[KANE,'K. V. Rangaswami Aiyangar, reconstructed Bṛhaspati Smṛti','Studies of classical Indian vyavahāra']
  });
  D['Smṛti:Bārhaspatya']=D['Smṛti:Bṛhaspati'];

  put('Kātyāyana',{
    overview:'Kātyāyana is one of the great specialist jurists of classical Dharmaśāstra. His Smṛti is lost as a continuous book but can be partially reconstructed from later quotations, particularly on documentary evidence, property, inheritance, strīdhana and judicial procedure.',
    period:'Generally placed in the later classical period, roughly 5th–6th centuries CE, with exact dating debated.',
    history:'Medieval legal digests preserve the text piecemeal. Attributions must therefore be checked quotation by quotation; a modern synthetic “Kātyāyana Smṛti” is a reconstruction.',
    contents:['Documents and their evidentiary force.','Property/ownership and possession.','Inheritance and partition.','Strīdhana.','Court procedure and proof.'],
    bibliography:[KANE,'Collections/reconstructions of Kātyāyana Smṛti fragments','Studies of classical Hindu legal procedure']
  });

  const fragments={
    'Atri':'Atri is repeatedly named as a Dharma authority; Atri-smṛti recensions exist, but their relationship to a single ancient original is not straightforward. The dossier should distinguish extant late collections from quotations attributed to Atri in older Dharma literature.',
    'Hārīta':'Hārīta is an old and frequently cited Dharma authority. Material attributed to Hārīta survives in quotations and recensions dealing with ācāra, household/religious rules and purity; the textual corpus is layered.',
    'Uśanas':'Uśanas/Śukra is named as a Dharma authority, but Dharma verses, polity traditions and later Śukranīti-type literature cannot automatically be collapsed into one authorial text.',
    'Aṅgiras':'Aṅgiras is a scripturally named Dharma promulgator whose attributed verses survive largely through quotations and compilations, especially on conduct and expiation.',
    'Yama':'Yama is frequently cited as a Dharma authority. The quotation-corpus is real, but there is no securely transmitted single ancient Yama Smṛti matching every later attribution.',
    'Saṃvarta':'Saṃvarta appears in multiple śāstric lists and later quotation literature; recoverable rules concern conduct, purity and penance, but the archetypal work is lost/unstable.',
    'Vyāsa':'Numerous Dharma verses and collections circulate under Vyāsa’s name. They must be separated by textual history; “Vyāsa Smṛti” is not one unproblematic authorial object.',
    'Śaṅkha':'Śaṅkha is often paired with Likhita and is also cited independently. Śaṅkha/Śaṅkha-Likhita textual traditions overlap and survive in compilatory forms.',
    'Likhita':'Likhita is paired with Śaṅkha in Dharma tradition but also named independently; the surviving corpus is mainly quotation/compilation and cannot be treated as one secure ancient codex.',
    'Dakṣa':'Dakṣa is widely cited on conduct, āśrama, purity and ritual observance; extant Dakṣa collections and older quotations represent a layered attribution-history.',
    'Śātātapa':'Śātātapa and Vṛddha-Śātātapa texts/quotations circulate in multiple forms. Attribution and chronology need source-by-source checking.',
    'Kāśyapa':'Kāśyapa is a scripturally named Dharma authority, but no single continuous ancient Kāśyapa Dharmaśāstra survives securely; quotations and later recensions are the evidence.',
    'Garga':'Garga is named as a Dharma authority, but the sage-name also labels major Jyotiṣa and ritual texts. Dharma quotations must be kept separate from astrological Garga literature.',
    'Pracetas':'Pracetas is named in the Parāśara list and later Dharma quotation; the independent source text is not securely extant.',
    'Bhāradvāja':'The Padma list names Bhāradvāja among its Sāttvika Dharma authorities; the name belongs to multiple Vedic/śāstric traditions, and a unique ancient Smṛti is not recoverable.',
    'Taittira':'This is a textually sensitive name in the Padma guṇa-list. It should be preserved as the edition reads it; identification with a better-known Smṛtikāra requires philological evidence, not normalization.'
  };
  Object.entries(fragments).forEach(([name,note])=>put(name,{
    overview:`${name} is a Dharma authority named by the scriptural list on this page, but the historical textual object behind the name is fragmentary, recensional or reconstructed rather than a securely preserved single book.`,
    history:note,
    period:'A precise date cannot responsibly be assigned to the authority-name as a whole; individual quotations/recensions may belong to different periods.',
    manuscripts:'Evidence consists of quotations in commentators/Nibandhas, late Smṛti collections, manuscript catalogues and occasionally distinct recensions bearing the sage-name.',
    scholarlyPositions:[`${KANE}: primary research tool for tracing which later authors quote which Smṛti authorities and for separating extant books from reconstructed quotation-corpora.`],
    bibliography:[KANE,'Relevant Dharma-Nibandhas and manuscript catalogues','Critical studies of Smṛti fragments']
  }));
})();