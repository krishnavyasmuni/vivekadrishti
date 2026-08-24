(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const patch=(name,extra)=>{const cur=D[name]||{};if(extra.sources)extra.sources=[...new Set([...(cur.sources||[]),...extra.sources])];D[name]=Object.assign(cur,extra);};
  const patchMany=(names,extra)=>names.forEach(n=>patch(n,Object.assign({},extra)));
  const rocher=['Ludo Rocher, The Purāṇas','Cornelia Dimmitt & J. A. B. van Buitenen, Classical Hindu Mythology','R. C. Hazra, Purāṇa/Upapurāṇa studies'];

  const layered={
    history:'Like most Purāṇas, this is a stratified work rather than a book composed once by one historical author. Older narrative or ritual units were repeatedly expanded, rearranged and localized during manuscript and recitation history.',
    datingBasis:'Dates are approximate and normally apply to major textual layers or a received redaction, not to every verse. Scholars use quotations by datable authors, dynastic references, sectarian vocabulary, art/ritual history and manuscript evidence.',
    sources:rocher
  };

  patch('Vāyu Purāṇa',Object.assign({},layered,{
    period:'One of the older Purāṇic complexes; major dynastic/cosmological layers are often placed around the 4th–5th centuries CE, with later additions.',
    milieu:'Early classical Purāṇic historiography with strong Śaiva associations but extensive non-sectarian cosmology and genealogy.',
    contents:['Creation and dissolution cycles.','Manvantaras and cosmic time.','Geography of worlds and regions.','Long royal and sage genealogies used in reconstructing early Purāṇic dynastic traditions.','Dharma, rites and Śaiva-associated theology.'],
    profile:'The text is not simply a “wind-god Purāṇa.” Vāyu functions as narrator, while the theological and ritual material is broad and often close to early Śaiva tradition.',
    reception:'Its dynastic lists and close relationship to Brahmāṇḍa/Śiva textual traditions make it central to scholarship on the earliest formation of Purāṇic literature.'
  }));
  patch('Matsya Purāṇa',Object.assign({},layered,{
    period:'An old Purāṇa with early layers commonly placed around the 3rd–5th centuries CE; many sections were revised or added much later.',
    milieu:'Early classical Vaiṣṇava-Purāṇic environment that became strongly encyclopedic.',
    contents:['Matsya and the flood narrative.','Creation, manvantaras and royal genealogies.','Temple architecture, image-making and iconographic rules.','Dharma and duties of kings.','Tīrthas, gifts, śrāddha and ritual observance.','The Purāṇa itself explicitly acknowledges the continuing revision of Purāṇic texts.'],
    namedFeatures:['Matsya/flood story','Architectural and iconographic chapters','Chapter 53 discussion of Purāṇa characteristics'],
    reception:'Important both for mythology and for the history of temple/image prescriptions.'
  }));
  patch('Viṣṇu Purāṇa',Object.assign({},layered,{
    period:'Usually treated as an early/classical Purāṇa; many scholars place a substantial core around the 4th–5th centuries CE, though proposals vary widely.',
    milieu:'Classical Vaiṣṇava Purāṇic theology framed as Parāśara teaching Maitreya.',
    history:'The received text is unusually coherent compared with many Purāṇas, but still contains layers. Its six-book plan may reflect an early systematic redaction.',
    contents:['Book 1: creation, cosmic principles and early myths.','Book 2: cosmography, continents, heavens and hells.','Book 3: manvantaras, Vedic branches, social/religious duties.','Book 4: solar and lunar dynasties.','Book 5: long Kṛṣṇa narrative from birth through major exploits.','Book 6: Kali age, dissolution and liberation.'],
    profile:'Strongly Vaiṣṇava, with Viṣṇu as supreme reality, but still structured around the classical Purāṇic concerns of creation, genealogy, cosmic geography and dharma.',
    reception:'A major source for later Vaiṣṇava cosmology, genealogy and Kṛṣṇa narrative and one of the most frequently used Purāṇas in modern scholarship.'
  }));
  patch('Mārkaṇḍeya Purāṇa',Object.assign({},layered,{
    period:'Among the older Purāṇas; substantial layers are usually placed around the 4th–6th centuries CE. The Devī Māhātmya was certainly established by the 6th century and is quoted by an inscription dated 608 CE.',
    milieu:'Western/central Indian Purāṇic milieu with strong epic narrative inheritance; the Devī Māhātmya represents a major early crystallization of Goddess theology.',
    contents:['Jaimini’s questions after the Mahābhārata and answers through unusual narrative frames.','Manvantaras, kings, sages and dharma.','The Devī Māhātmya (chapters 81–93 in common numbering): Madhu-Kaiṭabha, Mahiṣāsura, and Śumbha-Niśumbha cycles.','Solar and genealogical narratives.'],
    namedFeatures:['Devī Māhātmya / Durgā Saptashatī','Mahiṣāsuramardinī cycle','Śumbha-Niśumbha'],
    reception:'The Devī Māhātmya became one of the foundational scriptures of Śāktism and is still recited independently throughout India.'
  }));
  patch('Brahmāṇḍa Purāṇa',Object.assign({},layered,{
    period:'Early Purāṇic strata probably belong to the first half of the first millennium CE; later recensions absorbed substantial medieval material.',
    milieu:'Cosmological and genealogical Purāṇic tradition with later Śākta and Rāma-oriented accretions in some recensions.',
    contents:['Cosmology of the brahmāṇḍa or cosmic egg.','Cosmic geography and time cycles.','Dynastic and sage genealogies.','Lalitopākhyāna and Lalitā-sahasranāma in important recensions.','Adhyātma Rāmāyaṇa in some later transmission.'],
    status:'Recensions differ markedly. Famous embedded works cannot automatically be assumed to belong to the oldest recoverable Brahmāṇḍa layer.',
    reception:'A major source for Śrīvidyā through the Lalitā material and for later spiritualized Rāma traditions through the Adhyātma Rāmāyaṇa.'
  }));
  patch('Liṅga Purāṇa',Object.assign({},layered,{
    period:'Oldest layers are usually placed somewhere between the 5th and 10th centuries CE; the received work is composite.',
    milieu:'Developing Śaiva Purāṇic theology centered on the liṅga as cosmic sign of the unmanifest Lord.',
    contents:['The endless liṅga/cosmic pillar theology.','Creation and repeated cosmic dissolution.','Śiva’s forms and manifestations.','Liṅga installation, consecration and worship.','Vratas, festivals, tīrthas and yoga.','Iconographic and ritual prescriptions.'],
    profile:'The liṅga is treated philosophically as a sign of the beginningless, formless reality, not merely as a cult image.',
    reception:'Important for mainstream Śaiva theology and ritual interpretation of liṅga worship.'
  }));
  patch('Skanda Purāṇa',Object.assign({},layered,{
    period:'The earliest recoverable Skandapurāṇa is generally placed around the 6th–7th centuries CE; an 8th-century Nepalese palm-leaf manuscript proves an early form existed by then. The huge printed khaṇḍa corpus contains much later material.',
    milieu:'Early Śaiva sacred-geography and pilgrimage culture, later expanding into numerous regional māhātmyas.',
    history:'Modern critical editions distinguish the early Skandapurāṇa preserved in Nepalese manuscripts from the much larger later printed “Skanda Purāṇa” complex. Treating all of these as one uniform text obscures centuries of growth.',
    contents:['Śiva mythology and the rise of Śaiva sacred centers.','Extensive tīrtha-māhātmyas and pilgrimage geography.','Regional legends linked to Kāśī, Nepal, central India and many other areas.','Skanda/Kārttikeya appears, but the work is far broader than his biography.'],
    reception:'Perhaps the single richest Purāṇic archive for the historical formation of Hindu sacred geography.'
  }));
  patch('Agni Purāṇa',Object.assign({},layered,{
    period:'Major encyclopedic redaction usually placed in the early medieval period, often around the 8th–10th centuries CE, with later additions; no single date fits all chapters.',
    milieu:'Purāṇic encyclopedism in which mythology and ritual coexist with technical śāstra.',
    contents:['Mythology, avatāras and ritual.','Temple construction, image measurements and consecration.','Poetics, drama, grammar and metrics.','Polity, warfare, archery and royal administration.','Medicine, veterinary material, gemology and other technical subjects.'],
    history:'Its technical chapters often borrow, summarize or parallel specialist śāstras, making the text an archive of knowledge rather than a single continuous theological argument.',
    reception:'A key witness to how the Purāṇa genre became an encyclopedia of arts, ritual and practical sciences.'
  }));
  patch('Garuḍa Purāṇa',Object.assign({},layered,{
    period:'The received text is usually placed around the 9th–11th centuries CE, with sections added later.',
    milieu:'Vaiṣṇava encyclopedic and ritual culture, later especially associated with death rites.',
    history:'Modern popular editions often isolate the preta/funeral material, producing the false impression that the entire Garuḍa Purāṇa is only about death. The complete work is much broader and exists in differing recensions.',
    contents:['Dialogue of Viṣṇu and Garuḍa.','Funeral rites, preta-state, afterlife, hells and śrāddha.','Dharma, gifts and expiation.','Medicine, gems, omens and other encyclopedic topics.','Yoga and liberation material.'],
    namedFeatures:['Preta/afterlife sections','Funeral and śrāddha prescriptions'],
    reception:'Frequently recited or consulted in mortuary contexts, though this represents only one major strand of the work.'
  }));
  patch('Bhāgavata Purāṇa',Object.assign({},layered,{
    period:'Most modern scholarship places its final redaction somewhere between roughly the 8th and 10th centuries CE, though proposals range earlier; it was certainly known by the early 11th century.',
    milieu:'Mature Sanskrit Vaiṣṇava bhakti culture drawing on earlier Purāṇic, epic, Vedāntic and devotional traditions.',
    history:'The text presents itself as Śuka’s seven-day discourse to the dying king Parīkṣit. Its literary unity is stronger than many Purāṇas, but its exact date and possible regional provenance remain debated.',
    contents:['Skandhas 1–2: Parīkṣit, Śuka, avatāra theology and the framing of hearing scripture.','Skandha 3: Vidura, Maitreya, Kapila and cosmology.','Skandhas 4–5: Dhruva, Pṛthu, Ṛṣabha, cosmography.','Skandhas 6–7: Ajāmila, Prahlāda and Nṛsiṃha.','Skandhas 8–9: Gajendra, churning of ocean, Vāmana, dynasties.','Skandha 10: Kṛṣṇa’s birth, Vraja childhood, rāsa, Mathurā and Dvārakā.','Skandhas 11–12: Uddhava teaching, Kali age and conclusion.'],
    namedFeatures:['Dhruva','Ajāmila','Prahlāda/Nṛsiṃha','Gajendra','Vāmana','Rāsa-līlā','Uddhava Gītā'],
    profile:'Bhakti is not merely ritual devotion but a total reorientation of knowledge, emotion and action toward Bhagavān, especially Kṛṣṇa.',
    reception:'One of the most influential Sanskrit sources for Vaiṣṇava bhakti, shaping Gauḍīya, Vallabha, Nimbārka and many regional devotional traditions.',
    sources:['Edwin Bryant, date/provenance studies of the Bhāgavata Purāṇa','Bhāgavata Purāṇa Sanskrit editions','Ludo Rocher, The Purāṇas']
  }));
  patch('Nārada Purāṇa',Object.assign({},layered,{
    period:'Usually treated as a medieval Purāṇa, with major layers around the 10th–12th centuries CE and later additions.',
    milieu:'Vaiṣṇava devotional and ritual compendium associated with Nārada.',
    contents:['Bhakti and Vaiṣṇava worship.','Vratas, pilgrimage and tīrthas.','Temple/ritual observance.','Summaries and notices of other Purāṇas, Vedas and religious systems.','Sections on mantra, calendrics and religious practice.'],
    history:'The title must be distinguished from Bṛhannāradīya and from catalogue references that explicitly speak of “another Nāradīya.”',
    status:'The received Nārada/Nāradīya Purāṇa should not automatically be equated with every Purāṇic title containing Nārada’s name.'
  }));
  patch('Brahmavaivarta Purāṇa',Object.assign({},layered,{
    period:'An older work under this title probably existed by the first millennium CE, but the dominant received redaction is much later, largely 15th–16th century in character.',
    milieu:'Late medieval eastern Indian/Bengal-adjacent Kṛṣṇa-Rādhā bhakti and goddess theology.',
    history:'The surviving text appears to be a major reworking of an earlier Purāṇa. Its developed Rādhā-Kṛṣṇa theology and knowledge of late bhakti/Tantric currents point to extensive medieval rewriting.',
    contents:['Brahma-khaṇḍa: cosmological theology.','Prakṛti-khaṇḍa: goddesses and divine feminine powers.','Gaṇeśa-khaṇḍa.','Kṛṣṇajanma-khaṇḍa: Kṛṣṇa, Rādhā and devotional mythology.'],
    profile:'Kṛṣṇa is supreme and Rādhā/prakṛti receive an unusually elevated theological position.',
    reception:'Influential in later Rādhā-Kṛṣṇa devotional culture, especially in eastern India.'
  }));
  patch('Śiva Purāṇa',Object.assign({},layered,{
    period:'The surviving text is generally considered medieval, with substantial material around the 10th–14th centuries CE and continuing recensional change.',
    milieu:'Mainstream Sanskrit Śaiva Purāṇic devotion, ritual and mythology.',
    history:'Different manuscripts and printed editions divide the text into different saṃhitās. Older Purāṇic catalogues describe a Śiva Purāṇa whose size/organization does not map neatly onto all modern editions.',
    contents:['Śiva as supreme reality and creator/dissolver.','Satī, Pārvatī, Śiva’s marriage and family mythology.','Liṅga manifestation and worship.','Gaṇeśa and Skanda narratives.','Vratas, pilgrimage, initiation and ritual.','Cosmology and devotional theology.'],
    profile:'Explicitly Śaiva and devotional but also incorporates standard Purāṇic cosmology and broad Hindu ritual worlds.',
    reception:'A major modern source for popular Śiva mythology, though its textual history demands caution when citing chapter structures.'
  }));
  patch('Devī Bhāgavata Purāṇa',Object.assign({},layered,{
    period:'Usually dated around the 11th–12th centuries CE for its main received form, though proposals vary.',
    milieu:'Mature Sanskrit Śākta Purāṇic theology in which Devī is explicitly the supreme brahman and source of the gods.',
    history:'The text presents itself as the Bhāgavata Mahāpurāṇa in a Śākta framework and competes with Vaiṣṇava understandings of which “Bhāgavata” occupies that slot.',
    contents:['Twelve skandhas.','Cosmogony with Mahādevī as supreme.','Goddess myths, pilgrimage, mantra and ritual.','Stories of kings and sages recast in Śākta theology.','The Devī Gītā in Book 7, combining bhakti, Vedānta and Goddess theology.','Śrīvidyā and worship material in later books.'],
    namedFeatures:['Devī Gītā','Mahādevī as supreme brahman','Śrīvidyā-oriented material'],
    reception:'One of the most important Purāṇic scriptures of Śāktism and a major source for theological identification of Devī with nirguṇa/saguṇa brahman.'
  }));
  patch('Mahābhāgavata Purāṇa',Object.assign({},layered,{
    period:'A late medieval Śākta Purāṇic work; precise dating is difficult and different passages may be of different age.',
    milieu:'Śākta devotional mythology with strong concern for Devī, Satī/Pārvatī and the integration of Goddess traditions into a Purāṇic frame.',
    history:'The title is textually difficult because “Mahābhāgavata” also appears in catalogue discussions. The surviving Mahābhāgavata text must be distinguished from merely hypothetical titles inferred from lists.',
    contents:['Śākta retelling of cosmic and divine history.','Devī-centered mythology and the Satī/Pārvatī cycle.','Integration of Śiva, Viṣṇu and Goddess traditions under supreme Devī.','Pilgrimage/ritual and theological materials in the surviving recension.'],
    status:'Late and textually complicated; classification and self-colophons should be cited passage by passage.'
  }));
  patch('Padma Purāṇa',Object.assign({},layered,{
    period:'A very large layered Purāṇa whose major components span roughly the early medieval to late medieval centuries; individual khaṇḍas have different histories.',
    milieu:'Pan-Indian pilgrimage, vrata and sectarian Purāṇic culture with strong Vaiṣṇava layers but extensive Śaiva, tīrtha and dharma material.',
    history:'There is no single meaningful date for “the Padma Purāṇa” as a whole. Major khaṇḍas circulated and grew differently, and regional recensions vary.',
    contents:['Creation/cosmology and genealogical material.','Large tīrtha-māhātmyas and sacred-river praise.','Vratas, gifts, pilgrimage and domestic dharma.','Vaiṣṇava devotional narratives and praise of Viṣṇu.','Śaiva and mixed-sect material.','Internal classifications of Purāṇas and Smṛtis used elsewhere on this index.'],
    profile:'Strong Vaiṣṇava self-positioning appears in important layers, but the total text is too composite to treat every chapter as one sectarian voice.'
  }));
  patch('Brahma Purāṇa',Object.assign({},layered,{
    period:'The received Brahma Purāṇa is substantially medieval, although it contains older Purāṇic material and earlier references to a text under this title.',
    milieu:'Tīrtha-māhātmya and regional sacred-geography culture, especially with strong eastern Indian/Orissan material in the received text.',
    history:'Scholars have long noted that the received Brahma Purāṇa does not look like a simple preservation of the “first Purāṇa” imagined by some traditional lists. Pilgrimage sections and regional material reveal substantial redaction.',
    contents:['Creation and genealogy.','Extensive sacred geography and pilgrimage.','Purī/Jagannātha and eastern Indian sacred sites in important sections.','Sun and Viṣṇu-related myths.','Dharma and ritual observance.']
  }));
  patch('Bhaviṣya Purāṇa',Object.assign({},layered,{
    period:'Extremely layered; sections range from medieval ritual material to very late early-modern/modern accretions. A single composition date is especially misleading here.',
    milieu:'Continuously expanding Purāṇic compilation organized partly around “future” or prophetic framing.',
    history:'Its parvans absorbed new social, ritual and quasi-historical material over a long period. References to comparatively recent peoples/events in some recensions are evidence of late interpolation, not proof that the entire Purāṇa is late.',
    contents:['Vratas, calendrical rites and domestic religion.','Solar and other deity traditions.','Dharma/social prescriptions.','Prophetic/future dynastic sections.','Late historical-looking narratives in some recensions.'],
    status:'One of the clearest examples of a Purāṇa that must be cited by exact parvan/chapter/recension rather than treated as a unitary ancient book.'
  }));
  patch('Kūrma Purāṇa',Object.assign({},layered,{
    period:'Major received layers are often placed roughly 8th–11th centuries CE, with earlier material and later additions.',
    milieu:'Ecumenical Śaiva-Vaiṣṇava Purāṇic environment.',
    contents:['Kūrma/Nārāyaṇa frame.','Īśvara Gītā teaching with strong Śaiva and Vedāntic content.','Yoga, liberation and renunciation.','Dharma, pilgrimage and ritual.','Explicit Upapurāṇa catalogue used in this index.'],
    profile:'Not cleanly reducible to one sect: Vaiṣṇava framing and powerful Śaiva/Īśvara theology coexist.'
  }));
  patch('Vāmana Purāṇa',Object.assign({},layered,{
    period:'The extant core is usually placed around the 9th–11th centuries CE, though earlier material may survive.',
    milieu:'Northern Indian sacred-geography Purāṇic culture with surprisingly strong Śaiva emphasis despite the Vāmana title.',
    history:'The surviving text lacks a larger Bṛhad-Vāmana mentioned in tradition and exists in differing chapter arrangements.',
    contents:['Pulastya-Nārada frame and Vāmana references.','Numerous Śiva myths.','Tīrtha-māhātmyas, especially the Kurukṣetra/Thanesar region.','Goddess material and mixed deity worship.'],
    status:'The extant Vāmana Purāṇa is not simply a Vaiṣṇava Vāmana biography and may differ greatly from older forms behind the title.'
  }));
  patch('Varāha Purāṇa',Object.assign({},layered,{
    period:'The extant recension is commonly placed around the 10th–12th centuries CE and was revised later.',
    milieu:'Vaiṣṇava pilgrimage/ritual culture with Bhūdevī and Varāha framing.',
    history:'Large portions expected from older Purāṇic descriptions are missing; the surviving text looks strongly like a ritual-pilgrimage manual.',
    contents:['Varāha teaching Earth/Bhūdevī.','Mathurā and other tīrtha-māhātmyas.','Vratas, gifts and Vaiṣṇava worship.','Goddess and Śaiva material.','Narratives linked to sacred places rather than a single continuous mythic plot.'],
    status:'Extant manuscripts are incomplete relative to the text imagined in older Purāṇa lists.'
  }));

  patch('Nṛsiṃha Purāṇa',Object.assign({},layered,{
    period:'R. C. Hazra placed the original text in the later 5th century CE, with substantial later additions; it was translated into Telugu by around 1300.',
    milieu:'Vaiṣṇava Upapurāṇic narrative and dharma tradition centered partly on Nṛsiṃha but broader than one avatāra story.',
    contents:['About 68 chapters in common printed editions.','Dynastic lists of solar and lunar kings.','Daśāvatāra narratives in a long central sequence.','A version of the Yama-Gītā material.','Chapters 57–61 overlap with an independent Harita Saṃhitā/Laghu-Harita Smṛti tradition.'],
    reception:'Important evidence for an early Vaiṣṇava Upapurāṇa and for the fluid boundaries between Purāṇa and Dharma literature.',
    sources:['R. C. Hazra, Studies in the Upapurāṇas','Nṛsiṃha Purāṇa printed editions']
  }));
  patch('Kālikā Purāṇa',Object.assign({},layered,{
    period:'Probably c. 10th–11th centuries CE in its received form; some scholarship proposes earlier strata.',
    milieu:'Kāmarūpa/Assam regional Śākta-Tantric culture centered on Kāmākhyā and the political-sacred landscape of Pragjyotiṣa/Kāmarūpa.',
    history:'Local geography, the Naraka dynasty myth and references to the political world of Kāmarūpa make this one of the more geographically locatable Purāṇas.',
    contents:['Satī/Pārvatī mythology and Śiva’s return from ascetic withdrawal.','Kāmākhyā and Kāmārūpa sacred geography.','Naraka and regional royal mythology.','Śākta worship, bali and Tantric ritual.','The Rudhirādhyāya section on blood sacrifice.','Political and ritual instruction.'],
    profile:'Strongly Śākta and regional while also presenting Brahmā, Viṣṇu and Śiva as ultimately integrated.',
    sources:['Studies of Kāmākhyā and the Kālikā Purāṇa','Hugh Urban / South Asia scholarship on Kālikā Purāṇa','R. C. Hazra']
  }));
  patch('Sāmba Purāṇa',Object.assign({},layered,{
    period:'Early medieval Saura Upapurāṇa; exact date remains debated, but the text clearly reflects an established solar cult and image/temple tradition.',
    milieu:'Saura worship of Sūrya, especially traditions connected with Sāmba, Mitravana/Multan and Maga priests.',
    contents:['Kṛṣṇa’s son Sāmba is cursed with disease and cured through worship of Sūrya.','Foundation of a Sun temple at Mitravana on the Candrabhāgā.','Solar cosmology and eclipses.','Iconography of Sūrya and attendants.','Mantras, ritual, gifts, yoga and rules of solar worship.'],
    namedFeatures:['Sāmba’s disease and cure','Mitravana Sun temple','Maga priest traditions'],
    reception:'A central source for the history of organized Saura worship and the mythic origins of important Sun-temple traditions.'
  }));
  patch('Saura Purāṇa',Object.assign({},layered,{
    period:'Medieval; exact date uncertain and probably layered.',
    milieu:'A text bearing a solar title but surviving with substantial Śaiva material, illustrating the instability of sectarian labels in the Upapurāṇa corpus.',
    history:'The title “Saura” does not guarantee that every surviving recension is exclusively about Sūrya. Textual relationships with other Purāṇic and Śaiva materials require recension-specific study.',
    status:'Composite medieval Upapurāṇa; date and sectarian profile should be stated cautiously.'
  }));
  patch('Viṣṇudharmottara Purāṇa',Object.assign({},layered,{
    period:'Layered early-medieval encyclopedic text. Scholars place important artistic sections between roughly the 5th and 7th centuries, while other arguments push parts of the received work later.',
    milieu:'Vaiṣṇava encyclopedic śāstra-Purāṇa culture drawing together religion, polity, science and the arts.',
    history:'The text is a supplement/continuation to the Viṣṇudharma tradition and survives in three large khaṇḍas. Its third book became famous because of unusually systematic treatment of arts.',
    contents:['Cosmology, geography, astronomy and astrology.','Genealogies, law, politics, warfare and medicine.','Grammar, lexicography, metrics and rhetoric.','Music and dance.','Citrasūtra chapters on painting.','Iconography, temple construction, image installation and ritual.'],
    namedFeatures:['Citrasūtra','Music/dance chapters','Iconography and temple sections'],
    reception:'A foundational source for the history of Indian art theory, especially painting, iconography and the interdependence of the arts.',
    sources:['Viṣṇudharmottara Purāṇa editions','Stella Kramrisch / Parul Dave Mukherji on Citrasūtra','Ludo Rocher']
  }));
  patch('Bṛhaddharma Purāṇa',Object.assign({},layered,{
    period:'R. C. Hazra dated the extant text to the second half of the 13th century CE.',
    milieu:'Medieval Bengal; linguistic usages, proverbs and regional religious concerns strongly point to Bengali composition/transmission.',
    history:'The text survives in divergent Asiatic Society and Vaṅgavāsī recensions, especially in the Uttarakhāṇḍa. Its own Purāṇa catalogue is one of the sources used in this index.',
    contents:['Dharma explained through satya, dayā, śānti and ahiṃsā.','Mixed Vaiṣṇava, Śaiva and Śākta mythology.','Regional social/religious material.','Kṛṣṇa and Devī material in the expanded Vaṅgavāsī recension.','Purāṇa classification passages.'],
    profile:'Self-consciously broad: the work can praise itself as Vaiṣṇava, Śaiva and Śākta rather than fitting one exclusive sect label.',
    sources:['R. C. Hazra on Bṛhaddharma Purāṇa','Bṛhaddharma Purāṇa editions','Ludo Rocher']
  }));

  const uncertain=['Sanatkumāra Purāṇa','Daurvāsasa Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Varuṇa Purāṇa','Nandikṛta Purāṇa','Āditya Purāṇa','Māheśvara Purāṇa','Vāsiṣṭha Purāṇa','Śivadharma Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Ādya / Sanatkumāra Purāṇa','Āṇḍa Purāṇa','Another Nāradīya Purāṇa','Another Brahmāṇḍa Purāṇa','Māheśa Purāṇa','Kaumāra Purāṇa','Ādi Purāṇa','Bṛhannāradīya Purāṇa','Nandīśvara Purāṇa','Bṛhannandīśvara Purāṇa','Kriyāyogasāra Purāṇa','Dharma Purāṇa','Viṣṇudharma Purāṇa'];
  patchMany(uncertain,{
    period:'The exact date of the work behind this catalogue-title is uncertain; different titles may represent lost works, altered recensions, or texts surviving under related names.',
    milieu:'Known primarily from Purāṇic catalogues and/or fragmentary later textual transmission.',
    history:'For this title the safe historical fact is the direct śāstric attestation shown above. Purāṇa scholarship repeatedly warns that matching an old catalogue-name to a modern printed text can be uncertain.',
    datingBasis:'Without a securely identified continuous recension, no responsible precise composition date can be assigned from the title alone.',
    status:'Catalogue identity and surviving-text identity are not securely identical in every case. This is intentionally flagged instead of inventing contents.',
    reception:'Its importance here is textual-historical: it shows what Purāṇic traditions themselves counted or remembered, even where the corresponding work is lost or transformed.',
    sources:['R. C. Hazra, Studies in the Upapurāṇas','Ludo Rocher, The Purāṇas','Purāṇa manuscript catalogues']
  });
})();