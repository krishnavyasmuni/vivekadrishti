(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{D[`Purāṇa:${name}`]=Object.assign({},D[`Purāṇa:${name}`]||D[name]||{},data);};
  const H='R. C. Hazra, Studies in the Purāṇic Records on Hindu Rites and Customs (1940; reprints)';
  const R='Ludo Rocher, The Purāṇas (Wiesbaden, 1986)';

  put('Brahma Purāṇa',{
    overview:'The extant Brahma Purāṇa is a composite Purāṇic work whose received form is dominated not by a single cosmogony but by sacred geography and tīrtha-māhātmya, especially material connected with Orissa/Oḍra and the Jagannātha/Puruṣottama region, alongside creation, genealogy, dharma and Vaiṣṇava mythology.',
    period:'The title is old, but much of the extant work is medieval and regionally redacted. Individual sections must be dated separately rather than treating the whole received text as the “original Brahma Purāṇa.”',
    milieu:'Layered Purāṇic compilation with strong eastern-Indian/Oḍiśā sacred-geographical interests in important received strata.',
    history:'Purāṇic catalogues describe a Brahma Purāṇa, but the present text has undergone substantial replacement and accretion. Scholarship has long noted extensive overlap with other Purāṇas and a large body of regional tīrtha material.',
    datingBasis:'Regional sacred geography, temple/cult history, textual parallels, Nibandha quotation and comparison with catalogue descriptions of the Brahma Purāṇa.',
    chapterMap:['Cosmogony and genealogical material.','Myths of Viṣṇu and other deities.','Large tīrtha-māhātmya blocks.','Puruṣottama/Jagannātha and eastern sacred geography in major received sections.','Dharma, gifts, vows and pilgrimage observance.'],
    scholarlyPositions:[`${R}: stresses that the extant Brahma Purāṇa cannot be treated as a simple unchanged representative of the ancient catalogue-title.`,`${H}: Purāṇic ritual/custom evidence must be evaluated section by section for chronology.`],
    bibliography:[H,R,'Brahma Purāṇa, Ānandāśrama/other Sanskrit editions','Studies of the Puruṣottama/Jagannātha māhātmya tradition']
  });

  put('Śiva Purāṇa',{
    overview:'The received Śiva Purāṇa is a major Śaiva Purāṇic complex devoted to Śiva’s supremacy, liṅga worship, cosmology, ritual and the narrative cycle of Śiva, Satī/Pārvatī, Gaṇeśa, Skanda and the divine household. Its most important textual fact is recensional instability: printed editions do not all preserve the same saṃhitā structure.',
    period:'The surviving redactions are predominantly medieval, with material of differing ages; broad ranges around the 10th–14th centuries CE are often used for substantial received strata.',
    milieu:'Mainstream Sanskrit Śaiva Purāṇic religion integrating mythology, vrata, pilgrimage, mantra and liṅga/temple worship.',
    history:'Traditional notices describe different numbers and names of saṃhitās, while modern printed recensions arrange the text differently. The relation between the Śiva Purāṇa and Vāyu-related older material is itself part of Purāṇic textual history.',
    datingBasis:'Recensional comparison, citation history, development of Śaiva ritual/theology and relation to Vāyu and other Śaiva Purāṇas.',
    chapterMap:['Creation and Śiva-theology.','Satī, Dakṣa and Pārvatī cycles.','Śiva marriage and divine-family narratives.','Gaṇeśa and Skanda traditions.','Liṅga worship, ritual, vrata and tīrtha.','Yoga, liberation and devotional theology.'],
    manuscripts:'Multiple saṃhitā organizations circulate; chapter references must therefore specify edition/recension.',
    scholarlyPositions:[`${R}: treats the Śiva Purāṇa’s differing recensions and its complicated relation to Purāṇic catalogues as a central textual problem.`],
    bibliography:[R,H,'Śiva Purāṇa, Veṅkaṭeśvara and other Sanskrit recensions','Studies of Śiva-Purāṇa recensional history']
  });

  put('Nāradīya Purāṇa',{
    overview:'The extant Nāradīya/Nārada Purāṇa is a medieval Vaiṣṇava devotional-ritual compendium associated with Nārada. It treats bhakti, worship, pilgrimage, vrata, mantra and calendrical practice and is unusually valuable for its notices and summaries of other scriptures and Purāṇas.',
    period:'Major received strata are generally early-/high-medieval, commonly around the 10th–12th centuries CE, with later additions.',
    milieu:'Vaiṣṇava bhakti and ritual compendium culture using Nārada as the paradigmatic transmitting sage.',
    history:'The name is text-critically dangerous. Bṛhannāradīya is a distinct work, and the Padma Upapurāṇa catalogue explicitly speaks of “another Nāradīya.” The extant Mahāpurāṇa must therefore not absorb every Nārada-associated catalogue title.',
    datingBasis:'Citation history, mature Vaiṣṇava ritual forms, internal survey of Purāṇic literature and recensional/manuscript evidence.',
    chapterMap:['Vaiṣṇava bhakti and deity worship.','Vratas, festivals and calendrical observance.','Tīrthas and pilgrimage.','Mantra and ritual practice.','Notices/summaries of Purāṇas and branches of sacred learning.'],
    status:'Distinguish exact title/recension in every citation: Nāradīya Mahāpurāṇa ≠ Bṛhannāradīya ≠ Padma’s “another Nāradīya.”',
    bibliography:[R,H,'Nāradīya Purāṇa Sanskrit editions','R. C. Hazra, studies of Bṛhannāradīya/Nārada-associated Purāṇic texts']
  });

  put('Bhaviṣya Purāṇa',{
    overview:'The Bhaviṣya Purāṇa is one of the most visibly accretional Purāṇas. Its name, “future,” encouraged prophetic framing, but the received text also contains vrata, ritual, Sūrya-oriented material, social/religious prescriptions and very late historical-looking passages. These layers cannot be assigned one ancient date.',
    period:'A long accretional history extending from older Purāṇic/ritual strata into the late medieval and even early-modern period in some received sections.',
    milieu:'Layered ritual, Saura and prophetic/historical Purāṇic compilation repeatedly updated by later redactors.',
    history:'Different parvans have radically different chronological profiles. References to later peoples, religions and historical circumstances are evidence of accretion, not proof that the entire Purāṇa was composed late or that its “predictions” predate the events described.',
    datingBasis:'Section-specific historical references, ritual history, quotation by earlier authors and comparison of manuscripts/printed recensions.',
    chapterMap:['Older vrata/ritual and religious observance.','Sūrya/Saura-associated materials.','Dharma and calendrical prescriptions.','Pratisarga/“future” sections with demonstrably late historical accretions.'],
    scholarlyPositions:[`${R}: Bhaviṣya is a paradigmatic case for refusing a single date for a Purāṇa.`,`Hazra’s ritual-historical method separates older religious practice from late additions rather than treating all sections as contemporary.`],
    status:'Any historical claim from Bhaviṣya must cite the exact parvan/chapter and recension; generic claims about “the Bhaviṣya Purāṇa says…” are philologically unsafe.',
    bibliography:[R,H,'Bhaviṣya Purāṇa Sanskrit editions','Specialist studies of Bhaviṣya/Pratisarga textual accretion']
  });

  put('Varāha Purāṇa',{
    overview:'The extant Varāha Purāṇa is framed through Varāha and Earth but is substantially a tīrtha/vrata and sacred-geography text rather than a continuous avatāra biography. Mathurā and Vaiṣṇava sacred space are especially prominent, while Goddess and mixed sectarian materials also occur.',
    period:'Composite medieval Purāṇa with strata of different age; the received text does not preserve all features attributed to the ancient Varāha title in Purāṇic catalogues.',
    milieu:'Vaiṣṇava sacred-geography and pilgrimage culture, with later mixed ritual/sectarian accretions.',
    history:'The discrepancy between catalogue descriptions and the surviving book suggests loss, replacement or substantial redaction. Textual identity therefore has to be discussed at the level of the extant recension.',
    datingBasis:'Tīrtha geography, ritual development, citation history and comparison with older catalogue descriptions.',
    chapterMap:['Varāha–Bhūdevī dialogue frame.','Mathurā and other tīrtha-māhātmyas.','Vratas, gifts and religious observance.','Vaiṣṇava mythology and sacred geography.','Goddess/mixed materials in received strata.'],
    scholarlyPositions:[`${R}: emphasizes the mismatch between many Purāṇic titles/catalogue descriptions and the contents of extant recensions; Varāha is a clear example.`],
    bibliography:[R,H,'Varāha Purāṇa Sanskrit editions','Studies of Mathurā-māhātmya and Vaiṣṇava sacred geography']
  });
})();