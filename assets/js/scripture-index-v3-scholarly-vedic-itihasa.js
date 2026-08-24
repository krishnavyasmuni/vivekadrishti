(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const putV=(name,data)=>{D[`Vedic:${name}`]=Object.assign({},D[`Vedic:${name}`]||D[name]||{},data);};
  const put=(kind,name,data)=>{D[`${kind}:${name}`]=Object.assign({},D[`${kind}:${name}`]||D[name]||{},data);};
  const JAM='Stephanie W. Jamison and Joel P. Brereton, The Rigveda: The Earliest Religious Poetry of India (Oxford, 2014)';
  const WIT='Michael Witzel, studies on Vedic texts, schools and chronology';
  const KEITH='A. B. Keith, The Religion and Philosophy of the Veda and Upanishads / Vedic ritual-text studies';
  const CALAND='W. Caland, editions and studies of Sāmavedic Brāhmaṇas and śrauta ritual';

  putV('Śākala Saṃhitā',{
    overview:'The Śākala recension is the principal complete surviving Ṛgveda Saṃhitā: 1,028 hymns in the common count, organized in ten maṇḍalas and transmitted with extraordinary oral precision. Its “family books” (2–7) are older and more internally homogeneous than the heterogeneous books 1 and 10.',
    period:'Late second millennium BCE, internally stratified; exact absolute dating is debated and cannot be reduced to one year. The family books are generally earlier than much of books 1 and 10.',
    milieu:'Northwestern Indo-Aryan sacrificial-poetic culture before the mature Brāhmaṇa ritual system.',
    history:'Śākala is one recension of a once wider Ṛgvedic textual field. The padapāṭha, accentuation and oral recitation traditions preserve a highly controlled text, while comparison with Bāṣkala and ancillary material reveals older variation.',
    datingBasis:'Historical linguistics, geography, material culture, internal relative chronology of maṇḍalas and comparison with Iranian/Indo-European evidence.',
    chapterMap:['Maṇḍalas 2–7: family books.','Maṇḍalas 1 and 10: heterogeneous/later collections with major speculative hymns.','Maṇḍala 9: Soma Pavamāna hymns.','Maṇḍala 8: distinctive metrical/poetic corpus.'],
    namedFeatures:['Nāsadīya hymn (10.129)','Puruṣa Sūkta (10.90)','Hymns to Agni, Indra, Soma, Uṣas, Aśvins, Varuṇa and others'],
    manuscripts:'The textual authority is primarily oral-recensional; manuscripts are secondary witnesses to a much older memorized tradition.',
    bibliography:[JAM,WIT,'Oldenberg, Prolegomena on Ṛgvedic textual history']
  });
  putV('Bāṣkala Saṃhitā',{
    overview:'Bāṣkala is an ancient Ṛgvedic recension distinct from Śākala. A complete independent continuous Bāṣkala Saṃhitā is not securely preserved, but variant readings, khila/supplement traditions and references in Vedic scholarship demonstrate the existence of the school.',
    period:'Ancient Ṛgvedic recensional tradition; not a late derivative simply because the complete text is lost.',
    history:'Modern reconstruction is fragmentary and comparative. The dossier therefore distinguishes attested recensional evidence from a nonexistent modern “complete Bāṣkala text.”',
    status:'Partly lost as an independent continuous recension.',
    bibliography:[WIT,'Ṛgvedic recension/manuscript studies','Oldenberg and later Vedic textual scholarship']
  });

  putV('Aitareya Brāhmaṇa',{
    overview:'A principal Ṛgvedic Brāhmaṇa explaining the solemn sacrifice from the perspective of the Hotṛ and Ṛgvedic recitation. It contains detailed Soma ritual exegesis, royal-consecration material, priestly functions and embedded myths used to justify ritual acts.',
    period:'Early first millennium BCE, broadly c. 9th–8th centuries BCE for major strata, with internal layering.',
    milieu:'Mature śrauta ritual culture of the Aitareya/Śākala sphere.',
    history:'The text belongs to a phase when inherited mantras were being systematized through ritual prose and speculative etymology.',
    chapterMap:['40 adhyāyas grouped into eight pañcikās in the received organization.','Large Soma-sacrifice blocks.','Royal consecration and ritual legends.'],
    bibliography:['A. B. Keith, Rigveda Brahmanas',KEITH,WIT]
  });
  putV('Kauṣītaki (Śāṅkhāyana) Brāhmaṇa',{
    overview:'The second major surviving Ṛgvedic Brāhmaṇa, belonging to the Kauṣītaki/Śāṅkhāyana tradition. Its thirty chapters provide a parallel ritual-exegetical system to Aitareya, making comparison between the two schools philologically important.',
    period:'Early first millennium BCE, broadly comparable to the later Brāhmaṇa period of Aitareya.',
    chapterMap:['30 chapters in the received text.','Soma ritual and Hotṛ recitation.','Ritual legend and symbolic explanation.'],
    bibliography:['A. B. Keith, Rigveda Brahmanas',WIT]
  });
  putV('Aitareya Āraṇyaka',{
    overview:'The Aitareya Āraṇyaka stands at the transition between elaborate ritual exegesis and Upaniṣadic interiorization. It treats Mahāvrata, recitation, prāṇa, speech, meditative correspondences and ultimately the self/consciousness material transmitted as the Aitareya Upaniṣad.',
    period:'Late Brāhmaṇa/early Upaniṣadic horizon, broadly first half of the first millennium BCE.',
    history:'Different books have different character and age; the Upaniṣadic portions should not be assumed contemporaneous with every ritual section.',
    bibliography:['A. B. Keith, The Aitareya Aranyaka',OLE='Patrick Olivelle, The Early Upaniṣads (1998)',WIT]
  });
  putV('Kauṣītaki (Śāṅkhāyana) Āraṇyaka',{
    overview:'A Ṛgvedic forest-text combining ritual interpretation, prāṇa speculation, contemplative teaching and the material transmitted as the Kauṣītaki Upaniṣad.',
    period:'Late Brāhmaṇa/early Upaniṣadic horizon; internally layered.',
    history:'The boundary between Āraṇyaka and Upaniṣad is a feature of transmission, not a modern clean genre break.',
    bibliography:[KEITH,'Patrick Olivelle, The Early Upaniṣads',WIT]
  });

  const sama=['Kauthuma Saṃhitā','Rāṇāyanīya Saṃhitā','Jaiminīya (Talavakāra) Saṃhitā'];
  sama.forEach(name=>putV(name,{period:'Early first millennium BCE in received liturgical organization, drawing overwhelmingly on older Ṛgvedic verses.',milieu:'Soma-sacrifice chant culture of the Udgātṛ priests.',history:'Sāmavedic Saṃhitās reorganize mantra material for sung performance; their textual history is inseparable from specialized oral melody traditions (gāna), not merely the printed verse text.',datingBasis:'Relation to Ṛgvedic source verses, development of śrauta liturgy and recensional comparison.',bibliography:[CALAND,WIT,'Sāmaveda recensional and chant studies']}));
  putV('Kauthuma Saṃhitā',{overview:'The dominant surviving Sāmaveda recension, arranging mostly Ṛgvedic verses as the textual basis for sāman chants.',chapterMap:['Pūrvārcika: basic verse collection.','Uttarārcika: verses arranged for ritual sequences.','Separate gāna traditions preserve the actual melodic elaborations.']});
  putV('Rāṇāyanīya Saṃhitā',{overview:'A living Sāmavedic recension closely related to Kauthuma but with its own phonetic, accentual and chant transmission.'});
  putV('Jaiminīya (Talavakāra) Saṃhitā',{overview:'A major independent Sāmavedic recension preserving archaic and distinctive readings, ritual ordering and chant traditions, linked to the Jaiminīya Brāhmaṇa and Jaiminīya Upaniṣad Brāhmaṇa.'});

  const samaB=['Tāṇḍya (Pañcaviṃśa) Brāhmaṇa','Ṣaḍviṃśa Brāhmaṇa','Sāmavidhāna Brāhmaṇa','Ārṣeya Brāhmaṇa','Daivata Brāhmaṇa','Chāndogya (Mantra) Brāhmaṇa','Saṃhitopaniṣad Brāhmaṇa','Vaṃśa Brāhmaṇa','Jaiminīya Brāhmaṇa','Jaiminīya Ārṣeya Brāhmaṇa','Jaiminīya Upaniṣad Brāhmaṇa'];
  samaB.forEach(name=>putV(name,{period:'Brāhmaṇa-period Sāmavedic prose, broadly early first millennium BCE, with significant relative differences among texts.',milieu:'Technical Sāman/śrauta ritual schools.',history:'These works are functionally diverse—ritual manuals, chant catalogues, deity indexes, genealogies and speculative prose—so “Sāmaveda Brāhmaṇa” is not one homogeneous genre.',bibliography:[CALAND,WIT]}));
  putV('Tāṇḍya (Pañcaviṃśa) Brāhmaṇa',{chapterMap:['25 prapāṭhakas.','Large Soma sacrifices and extended sattra sessions.','Precise assignment of stotras/sāmans to ritual moments.']});
  putV('Ṣaḍviṃśa Brāhmaṇa',{chapterMap:['Supplementary “26th” relation to Pañcaviṃśa.','Adbhuta material on omens/portents and ritual pacification.']});
  putV('Jaiminīya Brāhmaṇa',{overview:'A major Jaiminīya ritual prose text rich in archaic myth and distinctive Sāmavedic exegesis; it is not simply a variant of Tāṇḍya.'});
  putV('Jaiminīya Upaniṣad Brāhmaṇa',{overview:'A Jaiminīya prose work at the border of Brāhmaṇa and Upaniṣadic speculation, containing chant symbolism, myth and teachings that anticipate/overlap later philosophical inquiry.'});

  putV('Vājasaneyi Saṃhitā (Mādhyandina)',{overview:'The Mādhyandina recension of the Śukla Yajurveda: a relatively ordered collection of sacrificial formulas/mantras whose explanatory prose is transmitted separately in the Śatapatha Brāhmaṇa.',period:'Early first millennium BCE; younger than much Ṛgvedic poetry and part of the mature Yajurvedic ritual system.',bibliography:[WIT,'Albrecht Weber / Vājasaneyi Saṃhitā editions']});
  putV('Vājasaneyi Saṃhitā (Kāṇva)',{overview:'The Kāṇva recension of the Śukla Yajurveda, preserving its own order/readings and a corresponding Kāṇva Śatapatha tradition.',period:'Early first millennium BCE; recensional differences are historically significant.',bibliography:[WIT,'Kāṇva Vājasaneyi/Śatapatha editions']});
  ['Śatapatha Brāhmaṇa (Mādhyandina)','Śatapatha Brāhmaṇa (Kāṇva)'].forEach(name=>putV(name,{overview:'The Śatapatha Brāhmaṇa is the largest and intellectually richest Vedic Brāhmaṇa: detailed śrauta ritual, Agnicayana, royal rites, flood myth, cosmology and speculative passages that culminate in the Bṛhadāraṇyaka Upaniṣad.',period:'Broadly c. 8th–6th centuries BCE across layers; Mādhyandina and Kāṇva recensions differ.',milieu:'Śukla-Yajurvedic śrauta ritual and speculative theology.',history:'A layered work rather than one-time composition; recensional comparison is central.',chapterMap:['Agnihotra and major śrauta rites.','Agnicayana/fire-altar theology.','Aśvamedha and royal ritual.','Manu/flood narrative and other myths.','Late books leading into Bṛhadāraṇyaka.'],bibliography:[WIT,'Julius Eggeling, The Satapatha-Brahmana','Patrick Olivelle, The Early Upaniṣads']}));
  ['Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Mādhyandina)','Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Kāṇva)'].forEach(name=>putV(name,{period:'Late Śatapatha / early Upaniṣadic horizon, broadly 7th–6th centuries BCE for major philosophical strata.',history:'The “Āraṇyaka / Bṛhadāraṇyaka” boundary is recensional and textual; the philosophical material grows from the final ritual books rather than standing wholly outside them.',bibliography:['Patrick Olivelle, The Early Upaniṣads',WIT]}));

  const kyS=['Taittirīya Saṃhitā','Maitrāyaṇī Saṃhitā','Kāṭhaka Saṃhitā','Kapiṣṭhala-Kaṭha Saṃhitā'];
  kyS.forEach(name=>putV(name,{period:'Early first millennium BCE, with relative differences among the Black-Yajurveda schools.',milieu:'Kṛṣṇa-Yajurvedic ritual schools in which mantra and explanatory prose are interwoven in the Saṃhitā itself.',history:'Unlike Śukla Yajurveda, Black-Yajurveda Saṃhitās mix formulas with prose explanation; comparison among Taittirīya, Maitrāyaṇī, Kāṭhaka and Kapiṣṭhala is crucial for reconstructing ritual-text history.',bibliography:[WIT,KEITH,'Black-Yajurveda critical/recensional studies']}));
  putV('Taittirīya Brāhmaṇa',{overview:'The principal surviving Brāhmaṇa of the Taittirīya school, supplementing the mixed mantra-prose Saṃhitā with further śrauta ritual, myth and exegesis.',period:'First millennium BCE, broadly Brāhmaṇa period.',bibliography:[WIT,KEITH]});
  putV('Vādhūla Brāhmaṇa / Anvākhyāna',{overview:'Fragmentarily preserved Vādhūla material of the Black Yajurveda, important precisely because it preserves a less dominant ritual school and readings outside the Taittirīya mainstream.',status:'Fragmentary/partly preserved; modern reconstruction depends on manuscripts and quoted/related Vādhūla material.',bibliography:[WIT,'Vādhūla textual studies']});
  putV('Taittirīya Āraṇyaka',{overview:'A layered Taittirīya forest-text containing ritual, mantra and speculative sections; it transmits the Taittirīya Upaniṣad and other important late-Vedic materials.',period:'Late Brāhmaṇa to early Upaniṣadic horizon.',bibliography:[WIT,'Patrick Olivelle, The Early Upaniṣads']});
  putV('Maitrāyaṇīya Āraṇyaka',{overview:'Forest/speculative material connected with the Maitrāyaṇīya school and the later Maitrī/Maitrāyaṇī Upaniṣadic tradition.',period:'Late Vedic / early classical layered transmission.',bibliography:[WIT,DEU='Paul Deussen, Sixty Upanishads of the Veda']});

  ['Śaunaka Saṃhitā','Paippalāda Saṃhitā'].forEach(name=>putV(name,{period:'Late Vedic hymn/mantra corpus, generally later than the oldest Ṛgvedic strata but preserving material of varied age.',milieu:'Atharvavedic ritual culture: healing, protection, household concerns, royal rites, speculative hymns and ritual power.',history:'Śaunaka and Paippalāda are genuinely distinct recensions. The recovery/publication of Paippalāda manuscripts transformed modern understanding of the Atharvaveda.',bibliography:[WIT,'D. Bhattacharya / Paippalāda Atharvaveda studies','Atharvaveda Śaunaka critical editions']}));
  putV('Gopatha Brāhmaṇa',{overview:'The sole surviving Brāhmaṇa of the Atharvaveda, presenting Atharvavedic claims to ritual authority, cosmogony and reinterpretations of the broader Vedic sacrificial system.',period:'Comparatively late Brāhmaṇa prose; exact strata debated.',history:'The work partly adapts older Brāhmaṇa material while asserting an Atharvavedic place in śrauta orthodoxy.',bibliography:[WIT,'Gopatha Brāhmaṇa critical studies']});

  put('Itihāsa','Mahābhārata',{
    overview:'The Mahābhārata is a massive Sanskrit epic and didactic archive centered on the Kuru dynastic conflict, but the war narrative is only part of its received form. Political ethics, dharma debates, pilgrimage, mythology, mokṣa teaching and the Bhagavad Gītā are integrated into an eighteen-parvan structure.',
    period:'Composition and redaction extend over centuries, conventionally from the last centuries BCE into the early centuries CE; individual books/layers differ markedly.',
    milieu:'North-Indian epic, Brahmanical and courtly traditions absorbing śramaṇa, dharma and bhakti/yoga discourse.',
    history:'The Bhandarkar Oriental Research Institute Critical Edition reconstructs a text from a vast manuscript tradition rather than reproducing any one regional vulgate. Northern and southern recensions differ significantly.',
    datingBasis:'Linguistic layers, external references, development of dharma/bhakti philosophy, manuscript stemmatics and comparison with early inscriptions/literature.',
    chapterMap:['Ādi: origins and genealogy.','Sabha: court and dice.','Vana: exile and embedded narratives.','Virāṭa/Udyoga: return and war preparation.','Bhīṣma–Śalya: war books; Bhagavad Gītā in Bhīṣma.','Śānti/Anuśāsana: enormous postwar dharma, kingship and mokṣa teaching.','Āśvamedhika–Svargārohaṇa: aftermath, withdrawal and final ascent.'],
    scholarlyPositions:['BORI Critical Edition (Sukthankar et al., 1933–1966): foundational manuscript-critical reconstruction.','James L. Fitzgerald and other modern scholars emphasize the layered relation between heroic epic and later didactic redaction.'],
    bibliography:['V. S. Sukthankar et al., The Mahābhārata: Critical Edition (BORI)','J. A. B. van Buitenen / James L. Fitzgerald, Mahābhārata translations and studies','Alf Hiltebeitel, Mahābhārata studies']
  });
  put('Itihāsa','Rāmāyaṇa',{
    overview:'The Vālmīki Rāmāyaṇa is a seven-kāṇḍa Sanskrit epic centered on Rāma’s exile, Sītā’s abduction, the Laṅkā war and the problem of royal/dharmic order. Text-critical scholarship distinguishes an older narrative core from substantial later growth, especially in Bāla and Uttara.',
    period:'Core composition commonly placed in the last centuries BCE, with redaction and expansion into the early centuries CE; exact dates remain debated.',
    milieu:'Early classical Sanskrit epic and royal-dharma culture, later receiving strong Vaiṣṇava avatāra theology.',
    history:'The Baroda Oriental Institute Critical Edition compares northern/southern manuscript traditions. Bālakāṇḍa and Uttarakāṇḍa contain major materials widely regarded as later than the central books, though they are integral to most received traditions.',
    chapterMap:['Bāla: birth, Viśvāmitra, Sītā marriage.','Ayodhyā: succession crisis and exile.','Araṇya: forest life and Sītā’s abduction.','Kiṣkindhā: alliance with Sugrīva/Hanumān.','Sundara: Hanumān in Laṅkā.','Yuddha: war and return.','Uttara: later reign, Sītā’s exile, Lava/Kuśa and conclusion.'],
    scholarlyPositions:['Baroda Critical Edition: manuscript-critical reconstruction of the Sanskrit epic.','Robert P. Goldman and the Berkeley translation project: philological introductions to individual kāṇḍas and their textual history.'],
    bibliography:['The Vālmīki Rāmāyaṇa: Critical Edition (Oriental Institute, Baroda)','Robert P. Goldman et al., The Rāmāyaṇa of Vālmīki','Sheldon Pollock, Rāmāyaṇa studies']
  });

  const vedanga={
    'Śikṣā':{overview:'Śikṣā is the Vedic discipline of phonetics and recitation: articulation, accent, quantity, euphony and preservation of mantra sound.',period:'Roots in late Vedic oral analysis; surviving Śikṣā treatises span a long period.',chapterMap:['Varṇa/articulation.','Svara/accent.','Mātrā/quantity.','Balāman/speech effort.','Sāman and recitational continuity.'],bibliography:['Prātiśākhya literature','Pāṇinīya Śikṣā and other Śikṣā texts',WIT]},
    'Kalpa':{overview:'Kalpa systematizes ritual procedure. Its literature includes Śrautasūtras for solemn sacrifice, Gṛhyasūtras for domestic rites, Dharmasūtras for conduct and Śulbasūtras for altar geometry.',period:'Major sūtra corpora mainly first millennium BCE, with school-specific chronologies.',chapterMap:['Śrauta ritual.','Domestic saṃskāras.','Dharma/ācāra.','Śulba altar geometry.'],bibliography:['Kalpasūtra editions','Jan Gonda / Vedic ritual studies',OLDS]},
    'Vyākaraṇa':{overview:'Vyākaraṇa is grammatical analysis, ultimately dominated by Pāṇini’s Aṣṭādhyāyī and its commentarial tradition. Its Vedic function is preservation and interpretation of correct linguistic form.',period:'Pre-Pāṇinian grammatical analysis is Vedic; Pāṇini is conventionally placed around the mid-first millennium BCE, with Kātyāyana and Patañjali later.',chapterMap:['Aṣṭādhyāyī: generative sūtra grammar.','Dhātupāṭha/Gaṇapāṭha ancillary lists.','Kātyāyana vārttikas.','Patañjali Mahābhāṣya.'],bibliography:['Pāṇini, Aṣṭādhyāyī','George Cardona, Pāṇini: A Survey of Research']},
    'Nirukta':{overview:'Nirukta is Vedic etymology/semantic explanation. Yāska’s Nirukta interprets difficult Vedic words and the Nighaṇṭu lexical lists, preserving debates about language and deity interpretation.',period:'Usually placed before or around the early Pāṇinian period in the mid-first millennium BCE; exact date debated.',chapterMap:['Nighaṇṭu lexical lists.','Yāska’s etymologies.','Nairukta debates on meaning and deities.'],bibliography:['Yāska, Nirukta','Lakshman Sarup, The Nighaṇṭu and the Nirukta']},
    'Chandas':{overview:'Chandas is Vedic and Sanskrit metrics. Piṅgala’s Chandaḥsūtra systematizes metrical patterns, while Vedic recitational traditions preserve older metrical analysis.',period:'Vedic metrical knowledge is ancient; Piṅgala is generally placed in the later first millennium BCE, exact date uncertain.',chapterMap:['Vedic metres: gāyatrī, triṣṭubh, jagatī, anuṣṭubh etc.','Syllabic/metrical combinatorics in Piṅgala.'],bibliography:['Piṅgala, Chandaḥsūtra','Studies of Vedic metre']},
    'Jyotiṣa':{overview:'Vedāṅga Jyotiṣa is the calendrical/astronomical discipline needed to time Vedic rites. The surviving Ṛg/Yajur recensions are compact and mathematically organized around ritual calendrics.',period:'Its dating is heavily debated; the transmitted text is usually placed in the late Vedic/early classical period, while astronomical data have generated much wider proposals.',chapterMap:['Lunisolar calendar.','Nakṣatras.','Intercalation and ritual timing.','Five-year yuga scheme.'],scholarlyDebates:['Dating from astronomical parameters versus dating the received linguistic/textual form.'],bibliography:['Vedāṅga Jyotiṣa editions','David Pingree and Indian astronomy scholarship']}
  };
  Object.entries(vedanga).forEach(([name,data])=>put('Vedāṅga',name,data));
})();