(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const Kane='P. V. Kane, History of Dharmaśāstra';
  const Oli='Patrick Olivelle, The Oxford History of Hinduism: Hindu Law / Dharmaśāstra studies';
  const make=(display,source,extra={})=>{const b=D[source]||D[display]||{};D[`Smṛti:${display}`]=Object.assign({},b,extra,{sources:[...new Set([...(b.sources||[]),...(extra.sources||[])])]});};

  make('Manu','Manu',{
    chapterMap:['1 — creation, Manu’s authority and cosmic/social order.','2 — sources of dharma, initiation, Vedic study and brahmacarya.','3 — marriage, household ritual, hospitality and śrāddha.','4 — householder conduct and livelihoods.','5 — food, impurity, death and women.','6 — forest life and renunciation.','7 — kingship, administration and war.','8 — courts and the eighteen titles of litigation.','9 — marriage/family, sons, property and inheritance.','10 — varṇa, mixed groups and occupations.','11 — sins, gifts and penances.','12 — karma, rebirth, guṇas, knowledge and release.'],
    manuscripts:'The Manusmṛti survives in a very large manuscript/commentarial tradition. Olivelle’s critical edition reconstructs an archetype by comparing manuscript families rather than simply reproducing the later vulgate.',
    scholarlyDebates:['Date of the final redaction within roughly the last centuries BCE/early centuries CE; Olivelle argues for about the 2nd century CE.','How much older Dharmasūtra, artha and social material was reorganized by the metrical redactor.','The difference between prescriptive śāstra and actual social practice.'],
    primaryEvidence:['Manusmṛti 2: sources of dharma and student discipline','Manusmṛti 7–9: kingship, litigation and inheritance','Manusmṛti 11–12: penance, karma and liberation'],
    sources:['Patrick Olivelle, Manu’s Code of Law: A Critical Edition and Translation',Kane,Oli]
  });
  make('Yājñavalkya','Yājñavalkya',{
    chapterMap:['Ācāra — sources of dharma, saṃskāras, marriage, householder duties, śrāddha, gifts and kingship.','Vyavahāra — courts, plaint/reply, documents, witnesses, possession, ordeals, debt, partnership, boundaries, assault/theft/adultery and inheritance.','Prāyaścitta — impurity, funerals, sins, penance, karma, subtle body, asceticism, yoga and liberation.'],
    manuscripts:'The text is compact but has a substantial commentarial tradition; the Mitākṣarā became so influential that later legal reception often reads Yājñavalkya through Vijñāneśvara’s interpretation.',
    scholarlyDebates:['Olivelle argues for a 4th–5th-century Gupta-period redaction and reconstructs its textual history.','The degree to which its sophisticated document law reflects Gupta-era administrative practice rather than merely inherited norm.'],
    primaryEvidence:['Yājñavalkya Smṛti 1.4–5: its own list of Dharma authorities','Book 2: written evidence, witnesses, ordeals and litigation','Book 3: penance, yoga and liberation'],
    sources:['Patrick Olivelle, A Treatise on Dharma (Yājñavalkya)','Patrick Olivelle, Yājñavalkya Dharmaśāstra: textual-history studies',Kane,Oli]
  });
  make('Viṣṇu','Viṣṇu',{
    chapterMap:['1 — Varāha/Viṣṇu frame: Earth asks about dharma.','2 — varṇa duties.','3 — king and administration.','4 — weights and measures.','5 — criminal/civil offences.','6 — debt and interest.','7 — written documents.','8 — witnesses.','9–14 — ordeals.','15–18 — inheritance and sons.','19–21 — funerals and offerings for the dead.','22–23 — impurity.','24–26 — women.','27–32 — saṃskāras.','33–42 — major/minor sins.','43–45 — hells and transmigration.','46–57 — penances.','58–70 — householder duties.','71–72 — snātaka/self-restraint.','73–86 — śrāddha.','87–93 — gifts and merit.','94–95 — forest-dweller.','96 — renouncer.','97 — meditation on Viṣṇu.','98–100 — concluding religious material.'],
    ritualHistory:'The text is especially useful because it shows a Dharma corpus being deliberately Vaiṣṇavized: ordinary law, impurity, śrāddha and penance are retained, but the whole is reframed by Varāha/Viṣṇu and culminates in explicit meditation on Viṣṇu.',
    manuscripts:'The received text mixes prose sūtra-like passages with metrical additions, supporting the theory that a Kāṭhaka Dharma core was reworked rather than composed all at once as a 100-chapter verse code.',
    scholarlyDebates:['Patrick Olivelle argues for roughly the 7th century CE and a Kashmir/Kāṭhaka milieu; older datings varied more widely.','How much of the prose core belongs to an earlier Kāṭhaka Dharma text and how much was transformed during Vaiṣṇava redaction.'],
    primaryEvidence:['Viṣṇu Smṛti 1: Varāha–Earth frame','Chs. 7–14: documents, witnesses and ordeals','Chs. 43–57: hells/transmigration and penance','Chs. 73–86: śrāddha','Ch. 97: Viṣṇu meditation'],
    sources:['Patrick Olivelle, “The Date and Provenance of the Viṣṇu-Smṛti”','Julius Jolly, Institutes of Vishnu',Kane,Oli]
  });
  make('Vaiṣṇava','Viṣṇu',{primaryEvidence:['Padma Purāṇa, Uttarakhāṇḍa 263.86–90: “Vaiṣṇava” in the Rājasa six','For the surviving Viṣṇu Dharma text, see the Viṣṇu dossier; identification of the adjectival list-name with that exact recension should remain explicit rather than automatic.']});
  make('Āpastamba','Āpastamba',{
    chapterMap:['Dharmasūtra Praśna 1: student discipline, Vedic study, food/purity and the beginning of householder Dharma.','Praśna 2: marriage, household obligations, inheritance, penance, social norms and ascetic alternatives.'],
    manuscripts:'The Dharmasūtra survives as two praśnas inside the larger Āpastamba Kalpasūtra; calling it simply an independent “Smṛti book” obscures its original school-curriculum setting.',
    scholarlyDebates:['Relative chronology among Āpastamba, Gautama, Baudhāyana and Vasiṣṭha.','Regional location of the Āpastamba school and how far its customs represent a southern/deccan Vedic environment.'],
    primaryEvidence:['Āpastamba Dharmasūtra 1–2','Yājñavalkya Smṛti 1.4–5 and Parāśara Smṛti 1.12–15 naming Āpastamba'],
    sources:['Patrick Olivelle, Dharmasūtras',Kane,Oli]
  });
  make('Gautama','Gautama',{
    chapterMap:['Sources of dharma and social categories.','Student, householder and āśrama duties.','Marriage, inheritance and kinship.','Purity, food and impurity.','King, punishment and judicial rules.','Penance and restoration.','Funeral/ancestral rites.'],
    manuscripts:'Survives as a prose Dharmasūtra traditionally connected with Sāmavedic Gautama tradition; it should be distinguished from later verse collections attributed to Gautama.',
    primaryEvidence:['Gautama Dharmasūtra','Yājñavalkya, Parāśara and Padma lists naming Gautama'],
    sources:['Patrick Olivelle, Dharmasūtras',Kane,Oli]
  });
  make('Vasiṣṭha','Vasiṣṭha',{
    chapterMap:['Sources of dharma and sacred/social geography.','Student/householder obligations and marriage.','Purity, diet and impurity.','Inheritance and legal rules.','Family/women.','Major sins and detailed penances.','Ascetic discipline and restoration.'],
    manuscripts:'A composite Dharmasūtra containing both prose and verse. It is the strongest surviving textual anchor for the authority called Vasiṣṭha; later Vasiṣṭha-smṛti verses need not all derive from this same recension.',
    primaryEvidence:['Vasiṣṭha Dharmasūtra','Yājñavalkya/Parāśara lists','Padma Purāṇa Sāttvika list'],
    sources:['Patrick Olivelle, Dharmasūtras',Kane,Oli]
  });
  make('Vāsiṣṭha','Vasiṣṭha');
  make('Parāśara','Parāśara',{
    chapterMap:['Opening: nineteen Dharma authorities and the problem of Dharma in Kali-yuga.','Ācāra material: household/social conduct, food and purity.','Birth/death impurity and family rites.','Livelihood/agricultural rules.','Prāyaścitta material: penances and ritual restoration.'],
    manuscripts:'The received Parāśara Smṛti is a medieval text under an ancient sage-name; chapter divisions and commentarial transmission matter when quoting it as “the” law of Kali-yuga.',
    primaryEvidence:['Parāśara Smṛti 1.12–15: nineteen authorities','Opening Kali-yuga framing','Prāyaścitta sections'],
    sources:['Parāśara Smṛti Sanskrit editions',Kane,Oli]
  });
  make('Pārāśara','Parāśara');
  make('Bṛhaspati','Bṛhaspati',{
    chapterMap:['Reconstructed judicial sections: constitution of courts and judges.','Stages of suit: plaint, reply and legal procedure.','Witnesses, documents and other proof.','Debt, interest, surety and repayment.','Contracts, deposits, partnership and commerce.','Property, inheritance and boundaries.','Offences and royal punishment.'],
    manuscripts:'No complete continuous Bṛhaspati Smṛti manuscript is known. Modern “texts” are reconstructions made from hundreds of quotations in later commentaries and nibandhas; sequence and attribution therefore carry different confidence levels.',
    scholarlyDebates:['Whether all verses attributed to Bṛhaspati derive from one lost Dharmaśāstra.','Reconstruction of original chapter order from later quotation-contexts.'],
    primaryEvidence:['Bṛhaspati verses quoted in medieval Dharma digests and commentaries','Yājñavalkya Smṛti 1.4–5 naming Bṛhaspati'],
    sources:['K. V. Rangaswami Aiyangar / reconstructed Bṛhaspati Smṛti',Kane,Oli]
  });
  make('Bārhaspatya','Bṛhaspati');
  make('Kātyāyana','Kātyāyana',{
    chapterMap:['Reconstructed rules on judicial procedure.','Written documents and documentary proof.','Property and boundaries.','Inheritance and partition.','Strīdhana/women’s property.','Other civil-law fragments preserved in digests.'],
    manuscripts:'Like Bṛhaspati, the classical Kātyāyana Dharma/legal text is reconstructed chiefly from later quotations rather than one intact early manuscript.',
    primaryEvidence:['Kātyāyana fragments in medieval nibandhas/commentaries','Yājñavalkya and Parāśara lists naming Kātyāyana'],
    sources:['Kātyāyana Smṛti fragment collections',Kane,Oli]
  });

  const fragmentNames=['Atri','Hārīta','Uśanas','Aṅgiras','Yama','Saṃvarta','Vyāsa','Śaṅkha','Likhita','Dakṣa','Śātātapa','Kāśyapa','Garga','Pracetas','Bhāradvāja','Taittira'];
  fragmentNames.forEach(n=>make(n,n,{
    chapterMap:['No secure original chapter map can be reconstructed from a single early manuscript.','The recoverable corpus consists of verses/sections attributed to this authority in later Smṛti collections, commentaries and Dharma digests; subjects vary by citation.'],
    manuscripts:'The ancient authority is better attested than one continuous original book. Extant works bearing the name may be later compilations and must be separated from older quoted fragments.',
    scholarlyDebates:['Which quoted verses belong to an original text versus later pseudonymous collections.','Whether differently titled “Vṛddha-”, “Laghu-” or combined Smṛtis represent recensions, later expansions or independent compilations.'],
    primaryEvidence:['The śāstric list displayed on this card','Quoted fragments collected in Dharmaśāstra editions/digests'],
    sources:[Kane,Oli,'Smṛti fragment collections and manuscript catalogues']
  }));
  make('Ātreya','Atri'); make('Auśanasa','Uśanas'); make('Sāṃvarta','Saṃvarta');
})();