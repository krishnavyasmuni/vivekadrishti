(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const patch=(name,extra)=>{const cur=D[name]||{};if(extra.sources)extra.sources=[...new Set([...(cur.sources||[]),...extra.sources])];D[name]=Object.assign(cur,extra);};
  const alias=(from,to)=>{if(D[to])D[from]=D[to];};
  const commonSources=['Patrick Olivelle, The Oxford History of Hinduism: Hindu Law — A New History of Dharmaśāstra','P. V. Kane, History of Dharmaśāstra','Patrick Olivelle, Dharmasūtras: The Law Codes of Ancient India'];

  patch('Manu',{
    period:'The received Mānava Dharmaśāstra is generally placed around the 2nd century CE in Patrick Olivelle’s recent chronology; older scholarship offered broader ranges from roughly 2nd century BCE to 2nd/3rd century CE.',
    milieu:'Early classical Brahmanical śāstra culture after the Dharmasūtras, when dharma was recast from school-specific prose rules into an ambitious metrical treatise claiming universal authority through Manu.',
    history:'The extant Manusmṛti is a carefully organized verse Dharmaśāstra, not simply a transcription of primordial law. Olivelle’s critical edition shows extensive manuscript variation and identifies redactional work. The text draws on earlier dharma traditions and also on artha/political thought.',
    datingBasis:'Linguistic and metrical form, relationship to the earlier Dharmasūtras, social and political institutions assumed by the text, and the chronology of later works that use or react to Manu.',
    contents:['Chapter 1: cosmic creation, Manu’s authority and the framework of social order.','Chapter 2: sources of dharma, initiation, Vedic study and the student.','Chapter 3: marriage, household rites, hospitality and śrāddha.','Chapter 4: daily conduct and livelihoods of householders.','Chapter 5: food, impurity, death and rules concerning women.','Chapter 6: forest-dweller and renouncer ideals.','Chapter 7: origin and duties of kings, government and war.','Chapter 8: courts and the eighteen grounds of litigation—debt, deposits, contracts, boundaries, assault, theft, inheritance, gambling and more.','Chapter 9: husband-wife relations, sons, property and inheritance.','Chapter 10: varṇa, mixed groups and livelihood.','Chapter 11: sins, gifts and penances.','Chapter 12: karma, rebirth, guṇas, knowledge and final release.'],
    namedFeatures:['Eighteen titles of law in chapter 8','Four āśramas','Royal dharma','Detailed prāyaścitta system','Karma/rebirth conclusion'],
    profile:'A comprehensive Brahmanical social-religious vision that combines ritual duty, household order, kingship, jurisprudence, penance and soteriology. It is prescriptive literature, not a neutral description of how every community in ancient India actually lived.',
    status:'The text survives abundantly but with a large manuscript tradition. Modern critical work distinguishes the reconstructable archetype from later regional/commentarial readings.',
    reception:'It became the most famous Dharmaśāstra, attracting major commentaries such as Medhātithi’s and later becoming disproportionately prominent in colonial representations of “Hindu law.”',
    sources:['Patrick Olivelle, Manu’s Code of Law: A Critical Edition and Translation','St Andrews Encyclopaedia of Theology — Law and Religion in Brahmanism',...commonSources]
  });

  patch('Yājñavalkya',{
    period:'Composed in the 4th or 5th century CE, probably in the Gupta period.',
    milieu:'Olivelle argues that the literary setting in Mithilā/Videha and the historical context point toward eastern India/Magadha in the Gupta age, though the named sage Yājñavalkya is a framing authority rather than the historical author.',
    history:'The work is a later, more concise and technically organized Dharmaśāstra than Manu. Its anonymous redactor presents the teaching as Yājñavalkya’s response to sages. It reflects a mature world of written contracts, developed courts, ordeals and increasingly systematized yoga.',
    datingBasis:'Technical legal vocabulary, prominence of written documents, coin terminology, references reflecting post-Hellenistic astral knowledge, and Gupta-period cultural context.',
    contents:['Ācāra chapter: sources of dharma, initiation, marriage, household duties, śrāddha, gifts, kingly conduct and daily religion.','Vyavahāra chapter: courts, plaint and reply, witnesses, written documents, possession, ordeals, debt, deposits, partnerships, boundary disputes, assault, theft, adultery, inheritance and other litigation.','Prāyaścitta chapter: impurity, funerary obligations, sins, penance, ascetic discipline, karma, subtle-body ideas, yoga and liberation.'],
    namedFeatures:['Three-part structure: Ācāra / Vyavahāra / Prāyaścitta','Written contracts signed by parties/witnesses','Developed law of evidence','Yoga in the third chapter'],
    profile:'A Dharmaśāstra that combines ritual and religious duty with unusually mature jurisprudence. It is shorter and more systematic than Manu and became especially authoritative for medieval legal interpretation.',
    reception:'Vijñāneśvara’s 11th–12th-century Mitākṣarā commentary made Yājñavalkya the backbone of an enormous later legal tradition; Mitākṣarā doctrine also became central to Anglo-Hindu law.',
    sources:['Patrick Olivelle, A Treatise on Dharma (Yājñavalkya)','Patrick Olivelle, Yājñavalkya Dharmaśāstra: The Textual History of a Hindu Legal Code','Murty Classical Library — A Treatise on Dharma',...commonSources]
  });

  patch('Viṣṇu',{
    period:'Usually placed around the 7th century CE by Patrick Olivelle; broader modern summaries often give roughly 6th–8th centuries CE.',
    milieu:'A Vaiṣṇava recasting of an older Dharma tradition associated with the Kāṭhaka branch of the Black Yajurveda. Olivelle argues for a Kashmiri provenance and a religious environment influenced by Vaiṣṇava/Pāñcarātra iconography.',
    history:'The Viṣṇu Smṛti is unusual because prose sūtra-like material and metrical verses coexist. An older Kāṭhaka Dharma core appears to have been rewritten so that Viṣṇu becomes the divine teacher. The frame opens after Varāha raises Earth and she asks Viṣṇu about dharma.',
    datingBasis:'Kāṭhaka textual affiliation, specifically Vaiṣṇava iconography, geography, ritual vocabulary and comparison with the development of Pāñcarātra-style imagery.',
    contents:['Ch. 1: Viṣṇu/Varāha frame and Earth’s question.','Ch. 2: duties of the varṇas.','Ch. 3: the king and royal administration.','Ch. 4: weights and measures.','Ch. 5: criminal and civil offences.','Ch. 6: debt and interest.','Ch. 7: written documents.','Ch. 8: witnesses.','Chs. 9–14: ordeals as modes of proof.','Chs. 15–18: inheritance and sons.','Chs. 19–21: funerals and offerings for the dead.','Chs. 22–23: impurity.','Chs. 24–26: rules concerning women.','Chs. 27–32: saṃskāras and life-cycle rites.','Chs. 33–42: major and minor sins.','Chs. 43–45: hells and transmigration.','Chs. 46–57: penances.','Chs. 58–70: householder duties.','Chs. 71–72: snātaka and self-restraint.','Chs. 73–86: śrāddha.','Chs. 87–93: gifts and religious merit.','Chs. 94–95: forest-dwelling.','Ch. 96: the ascetic.','Ch. 97: meditation on Viṣṇu.','Chs. 98–100: concluding religious material.'],
    namedFeatures:['100-chapter received structure','Varāha and Earth frame','Extended ordeal chapters','Meditation on Viṣṇu in ch. 97'],
    profile:'Dharmaśāstra recast in an explicitly Vaiṣṇava theological frame. Legal rules sit beside purity, penance, funerary practice, pilgrimage, life stages and Viṣṇu devotion.',
    reception:'One of only a small number of classical Dharmaśāstras to survive substantially complete. It is especially valuable for seeing the intersection of Dharma law with developing Vaiṣṇava religion.',
    sources:['Patrick Olivelle, “The Date and Provenance of the Viṣṇu-Smṛti”','Julius Jolly, The Institutes of Vishnu','St Andrews Encyclopaedia of Theology — Law and Religion in Brahmanism',...commonSources]
  });
  alias('Vaiṣṇava','Viṣṇu');

  patch('Āpastamba',{
    period:'Āpastamba’s Dharmasūtra is the oldest of the four extant Dharmasūtras in Olivelle’s current chronology: roughly 3rd to early 2nd century BCE.',
    milieu:'A Black Yajurvedic ritual school, probably rooted in the southern Deccan/peninsular transmission of the Āpastamba tradition, before the later metrical Smṛti genre became dominant.',
    history:'The Dharmasūtra forms two praśnas of the much larger Āpastamba Kalpasūtra. It therefore began as part of a school-specific Vedic ritual curriculum rather than a stand-alone universal “law code.”',
    datingBasis:'Absence/presence of later technical Dharma categories, language, relation to Patañjali and other sūtra literature, and comparison with Gautama/Baudhāyana/Vasiṣṭha.',
    contents:['Student initiation, Vedic study and teacher-student duties.','Householder obligations, food and purity.','Marriage, sexual conduct and family rules.','Inheritance and property.','Penance and exclusion from caste/community.','Discussion of custom and the authority of people who know dharma.','Renunciatory/ascetic ideals alongside householder dharma.'],
    profile:'Early school-based dharma rather than a royal legal code. It is especially important for its nuanced acknowledgment of accepted custom and living moral practice.',
    reception:'A foundational source for the early history of Dharmaśāstra and for comparison with the later universalizing projects of Manu and Yājñavalkya.',
    sources:['Patrick Olivelle, Dharmasūtras','Patrick Olivelle, The Oxford History of Hinduism: Hindu Law',...commonSources]
  });

  patch('Gautama',{
    period:'Late 2nd to early 1st century BCE in Olivelle’s current chronology.',
    milieu:'An early Brahmanical Dharma school traditionally connected with the Sāmaveda; the exact historical relationship between the Dharma text and surviving Gautama school traditions is complex.',
    history:'The Gautama Dharmasūtra is concise prose aphorism and is one of the earliest surviving attempts to arrange dharma systematically beyond one ritual sequence.',
    datingBasis:'Its vocabulary and social categories are later than Āpastamba in Olivelle’s reconstruction but earlier than Baudhāyana/Vasiṣṭha; comparison with Patañjali and the development of the term dvija is especially important.',
    contents:['Sources of dharma and social classes.','Student and householder rules.','Four āśramas and ascetic options.','Marriage and inheritance.','Rules of purity and food.','King, punishment and judicial procedure.','Penances for serious offences.','Funeral and ancestral rites.'],
    profile:'A compact early Dharma text in which ritual, social conduct, royal authority and expiation already form a recognizable Dharmaśāstra system.',
    sources:['Patrick Olivelle, Dharmasūtras','Patrick Olivelle, The Oxford History of Hinduism: Hindu Law',...commonSources]
  });

  patch('Vasiṣṭha',{
    period:'Early to late 1st century CE in Olivelle’s current chronology, making it the latest of the four extant classical Dharmasūtras.',
    milieu:'Late Dharmasūtra culture already approaching the age of metrical Smṛtis; the work reuses older prose material but also contains numerous verses.',
    history:'Vasiṣṭha is a composite Dharmasūtra rather than a single-author treatise. Its relatively late position is reflected by features such as written evidence in legal procedure and stylistic tendencies closer to later Smṛti.',
    datingBasis:'Use of written evidence, first-person authorial language in late chapters, social-geographic concepts and comparison with the other three surviving Dharmasūtras.',
    contents:['Sources of dharma and sacred geography.','Student/householder conduct and marriage.','Purity and food.','Inheritance and judicial rules.','Women and family obligations.','Major sins and detailed penances.','Ascetic practices and restoration through expiation.'],
    profile:'A bridge between the earlier sūtra stage and later verse Dharmaśāstra.',
    sources:['Patrick Olivelle, Dharmasūtras','Patrick Olivelle, The Oxford History of Hinduism: Hindu Law',...commonSources]
  });
  alias('Vāsiṣṭha','Vasiṣṭha');

  patch('Parāśara',{
    period:'The extant Parāśara Smṛti is usually placed around the 8th century CE in recent Dharmaśāstra histories, though it contains older-looking material and was augmented in transmission.',
    milieu:'Early medieval Dharmaśāstra framed as teachings of Parāśara and strongly associated in later reception with rules appropriate to Kali-yuga.',
    history:'The text is much later than the Vedic sage whose name it bears. It became authoritative because it explicitly discusses the changing applicability of dharma across yugas and was heavily interpreted by medieval authors.',
    datingBasis:'Its relationship to earlier Smṛtis, developed yuga-dharma language, citation history and later commentarial reception.',
    contents:['Opening discussion of Dharma authorities and the special conditions of Kali-yuga.','Ācāra: domestic/social conduct, food and purity.','Birth/death impurity and family rites.','Rules relating to agriculture and livelihoods.','Prāyaścitta: penances for a range of offences and ritual impurities.'],
    namedFeatures:['Kali-yuga dharma','Its own list of nineteen Dharma authorities'],
    profile:'A comparatively compact Dharma text remembered above all for the idea that the rules suited to Kali-yuga differ from those of earlier ages.',
    reception:'Highly influential in medieval and early modern debates about which Dharma rules remain applicable in the present age.',
    sources:['Parāśara Smṛti Sanskrit editions','St Andrews Encyclopaedia of Theology — Dharmaśāstra chronology',...commonSources]
  });
  alias('Pārāśara','Parāśara');

  patch('Bṛhaspati',{
    period:'Probably c. 5th–6th centuries CE for the major Dharmaśāstra represented by the surviving fragments, although not every quoted verse need belong to one date.',
    milieu:'Mature classical jurisprudence, when Dharmaśāstra developed specialist writing on courts, procedure, contracts and commerce.',
    history:'The Bṛhaspati Smṛti no longer survives as a complete manuscript. Modern editors reconstructed a substantial work from quotations preserved in medieval commentaries and legal digests. This means chapter order and exact wording are partly reconstructive.',
    datingBasis:'Dependence on/relationship to earlier Dharma works, highly developed legal terminology, citation by later authors and comparison with Nārada/Kātyāyana.',
    contents:['Constitution of courts and qualifications of judges.','Plaint, answer and stages of a lawsuit.','Witnesses and documentary evidence.','Debt, interest, sureties and repayment.','Contracts, deposits, partnerships and commercial disputes.','Property, inheritance and boundary questions.','Offences and royal punishment.'],
    profile:'One of the clearest Dharmaśāstra moves toward specialized jurisprudence rather than encyclopedic life-cycle religion.',
    status:'Lost as a continuous independent manuscript; reconstructed from a large body of later quotations.',
    reception:'A major authority for medieval Hindu legal digests even though the root text itself disappeared.',
    sources:['K. V. Rangaswami Aiyangar, reconstruction of Bṛhaspati Smṛti','Patrick Olivelle, Manu and the later Dharma tradition',...commonSources]
  });
  alias('Bārhaspatya','Bṛhaspati');

  patch('Kātyāyana',{
    period:'Probably c. 6th century CE, broadly within the later classical legal-Dharmaśāstra phase; exact dating of individual fragments is uncertain.',
    milieu:'Specialist jurisprudential Dharmaśāstra with particular interest in documents, property and litigation.',
    history:'Like Bṛhaspati, Kātyāyana’s Dharma work is lost as a complete independent manuscript and is reconstructed from extensive quotations in later legal literature.',
    datingBasis:'Technical legal vocabulary, relationship to earlier works, and citation/quotation history in medieval digests.',
    contents:['Rules for drafting, authenticating and challenging written documents.','Witnesses and judicial proof.','Property possession and ownership.','Inheritance and partition.','Women’s property (strīdhana).','Debt and commercial disputes.','Court procedure and royal adjudication.'],
    profile:'A technical legal authority whose surviving fragments are especially valuable for documentary evidence and property law.',
    status:'Reconstructed from medieval citations; no complete original manuscript survives.',
    reception:'Frequently quoted by later jurists on vyavahāra and property.',
    sources:['P. V. Kane, reconstructed Kātyāyana material','Patrick Olivelle, Manu and the later Dharma tradition',...commonSources]
  });

  const fragmentAuthorities={
    'Atri':['Probably early-classical to medieval strata under the sage-name; no single securely datable original survives.',['Conduct and purity rules quoted under Atri’s name.','Penances and domestic religious duties.','Extant Atri-smṛti recensions whose relationship to the ancient authority is uncertain.']],
    'Hārīta':['Ancient Dharma authority known early, but surviving Hārīta/Vṛddha-Hārīta textual forms are later and composite.',['Householder conduct and purity.','Marriage/family and ritual duties in quoted material.','Later Vaiṣṇava-flavored Vṛddha-Hārīta recensions that should not be simply equated with the earliest Hārīta.']],
    'Uśanas':['Ancient authority traditionally identified with Śukra; the date and unity of surviving Uśanas/Śukra materials are uncertain.',['Penance and conduct.','Royal/political rules in some attributed quotations.','Multiple Śukra/Uśanas traditions that cannot all be one original Smṛti.']],
    'Aṅgiras':['Ancient named authority; chiefly recoverable from attributed verses and later compilations.',['Penances and expiation.','Purity and domestic conduct.','Dharma verses cited by medieval compilers.']],
    'Yama':['Ancient named Dharma authority; a single original Yama Smṛti is not extant.',['Rules on sins and penances.','Purity, death and religious conduct.','Quotations preserved in Dharma digests.']],
    'Saṃvarta':['Ancient authority named in scriptural lists; surviving material is fragmentary/compilatory.',['Purity and ascetic conduct.','Penances.','Householder and ritual rules quoted by later jurists.']],
    'Vyāsa':['The sage-name Vyāsa became attached to many Dharma verse collections of different ages.',['Pilgrimage, gifts and śrāddha in some Vyāsa-attributed collections.','Purity and penance.','Numerous “Vyāsa” quotations whose source-history is not one book.']],
    'Śaṅkha':['Early and influential authority, often paired with Likhita; independent and combined textual traditions survive only imperfectly.',['Conduct and purity.','Penance and social duties.','Rules cited as Śaṅkha or Śaṅkha-Likhita.']],
    'Likhita':['Ancient Dharma authority strongly associated with Śaṅkha; original independent text lost.',['Conduct and penance.','Royal punishment/dharma stories associated with Likhita in broader tradition.','Śaṅkha-Likhita quotations in later Dharma literature.']],
    'Dakṣa':['Ancient Dharma authority; several later Dakṣa Smṛti collections exist but are not securely one early original.',['Āśrama and daily conduct.','Purity and ritual observance.','Rules concerning household religious life and penance.']],
    'Śātātapa':['Frequently cited Dharma authority; Śātātapa and Vṛddha-Śātātapa texts/quotations represent more than one layer.',['Prāyaścitta and purification.','Ritual impurity.','Domestic/religious conduct.']],
    'Kāśyapa':['Ancient sage-name used across many śāstric fields; the Dharma authority in these lists is not represented by one secure complete Smṛti.',['Dharma rules preserved by quotation.','Conduct, purity and ritual topics in attributed fragments.']],
    'Garga':['Named Dharma authority but also a name central to Jyotiṣa traditions, which must be kept textually distinct.',['Dharma quotations on conduct/social rules.','Fragments attributed to a Garga Smṛti rather than astrological Garga works.']],
    'Pracetas':['Ancient authority named in Parāśara and later Dharma citation; complete original text lost.',['Dharma maxims and rules known through quotation.','Conduct and legal/religious topics in later compilations.']],
    'Bhāradvāja':['Ancient sage-name counted in the Padma Purāṇa’s Smṛti classification; no secure complete Dharmaśāstra survives under this exact authority.',['Dharma authority mainly known by attestation/quotation.','Do not conflate automatically with Vedic Bhāradvāja ritual texts.']],
    'Taittira':['A textually difficult name in the Padma Purāṇa’s Rājasa Smṛti list.',['The secure information is the Padma Purāṇa’s own classification.','It should not be silently emended into a better-known lawgiver unless manuscript evidence warrants it.']]
  };

  Object.entries(fragmentAuthorities).forEach(([name,[period,contents]])=>patch(name,{
    period,
    milieu:'Dharmaśāstra transmission in which older sage-authorities were preserved through citation, anthologies and later recensions even after an original continuous work was lost.',
    history:'The name is ancient and scripturally attested as a Dharma authority, but the surviving textual evidence does not justify pretending that every verse attributed to this sage came from one unchanged book by one historical author.',
    datingBasis:'Citation history, language of surviving fragments, manuscript collections and comparison with datable Dharma texts; in many cases only relative chronology is possible.',
    contents,
    status:'Original textual unity/date uncertain; evidence consists of fragments, later recensions and/or quotations. The drawer therefore describes only what can be responsibly recovered.',
    reception:'The authority remained usable because medieval jurists cited the name as precedent even when the root work itself was no longer continuously transmitted.',
    sources:commonSources
  }));

  alias('Ātreya','Atri');
  alias('Auśanasa','Uśanas');
  alias('Sāṃvarta','Saṃvarta');
})();