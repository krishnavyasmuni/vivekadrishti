(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const patch=(name,extra)=>{const cur=D[name]||{};if(extra.sources)extra.sources=[...new Set([...(cur.sources||[]),...extra.sources])];D[name]=Object.assign(cur,extra);};
  const patchMany=(names,extra)=>names.forEach(n=>patch(n,Object.assign({},extra)));

  patchMany(['Śākala Saṃhitā','Bāṣkala Saṃhitā'],{
    period:'Broadly c. 1500–1000 BCE for the Ṛgvedic hymn corpus, with different family collections belonging to different generations; the received redaction is later than the oldest hymns.',
    milieu:'Northwestern South Asia, especially the Punjab and adjoining regions, in an oral Indo-Aryan sacrificial-poetic culture.',
    history:'The hymns were composed orally by many poet-seer lineages and preserved for centuries without writing. The Śākala recension became the principal complete surviving Ṛgvedic text; Bāṣkala represents an ancient alternative transmission known through recensional evidence, variant readings and supplementary material.',
    datingBasis:'Dating rests mainly on archaic Vedic Sanskrit, comparison with Indo-Iranian and Mitanni evidence, relative linguistic strata inside the Veda, and the material culture presupposed by the hymns rather than datable manuscripts.',
    reception:'The Ṛgveda became the foundational hymn collection of later śrauta ritual and a source continuously reinterpreted by Brāhmaṇa, Vedāṅga, Mīmāṃsā, Vedānta and modern philology.',
    sources:['Stephanie W. Jamison & Joel P. Brereton, The Rigveda','Jarrod Whitaker, Oxford Bibliographies: Rig Veda','Vedic Heritage Portal — Ṛgveda']
  });
  patch('Śākala Saṃhitā',{
    contents:['1,028 hymns in the received count, arranged in ten maṇḍalas.','Books 2–7 are the family books associated with major priestly-poetic lineages such as Gṛtsamada, Viśvāmitra, Vāmadeva, Atri, Bharadvāja and Vasiṣṭha.','Hymns praise Agni, Indra, Soma, the Aśvins, Uṣas, Varuṇa, Maruts and many other deities and ritual powers.','Book 10 contains famous speculative and social hymns such as the Nāsadīya creation hymn, Puruṣa Sūkta, funeral hymns and marriage material.','The text also includes riddles, dialogue hymns, royal praise, battle memory, prayers for cattle, sons, rain, protection and victory.'],
    namedFeatures:['Nāsadīya Sūkta (10.129)','Puruṣa Sūkta (10.90)','Devī/Vāk Sūkta (10.125)','Marriage hymn (10.85)','Funeral hymns in Book 10']
  });

  patchMany(['Aitareya Brāhmaṇa','Kauṣītaki (Śāṅkhāyana) Brāhmaṇa'],{
    period:'Later Vedic prose, broadly c. 900–600 BCE; exact dates vary by layer and school.',
    milieu:'Ṛgvedic śrauta priestly schools in the later Vedic world, when ritual performance and its explanation became increasingly systematized.',
    history:'These works grew as school-specific prose explanations of how Ṛgvedic verses function inside elaborate sacrifice. They preserve both technical ritual instruction and older narrative material used to explain or authorize rites.',
    datingBasis:'Relative chronology comes from their Middle/Late Vedic prose, ritual system, relation to the Saṃhitā and comparison with other Brāhmaṇa texts.',
    sources:['Vedic Heritage Portal — Ṛgveda Brāhmaṇas','A. B. Keith, Rigveda Brahmanas','Vedic prose chronology studies']
  });
  patch('Aitareya Brāhmaṇa',{
    period:'Usually placed somewhere within c. 900–700/600 BCE; the Vedic Heritage Portal gives a very broad 1000–500 BCE range.',
    contents:['Detailed treatment of Soma sacrifices and the recitations of the hotṛ priest.','Agniṣṭoma and related Soma rites, morning/midday/evening pressings, priestly roles and mantra placement.','Royal consecration (rājasūya/abhiṣeka) material in the later books.','Narratives inserted into ritual explanation, including the famous Śunaḥśepa story.'],
    namedFeatures:['Śunaḥśepa narrative','Royal consecration material','Eight pañcikās / forty adhyāyas'],
    sources:['Vedic Heritage Portal — Aitareya Brāhmaṇa','Virpi Hämeen-Anttila, study of the Śunaḥśepa narrative']
  });
  patch('Kauṣītaki (Śāṅkhāyana) Brāhmaṇa',{
    contents:['Thirty chapters in the received form.','Detailed Soma-sacrifice procedure and hotṛ recitation.','Comparative variants of myths, ritual etymologies and sacrificial explanations that differ from the Aitareya school.','Material useful for reconstructing how two Ṛgvedic schools organized the same broader śrauta world.']
  });

  patchMany(['Aitareya Āraṇyaka','Kauṣītaki (Śāṅkhāyana) Āraṇyaka'],{
    period:'Late Vedic, broadly c. 800–500 BCE, with older and younger layers inside each collection.',
    milieu:'The “forest-text” phase of Vedic reflection, where sacrificial symbolism is increasingly interiorized into meditation, breath, speech and the self.',
    history:'Āraṇyakas are not simply books written “in forests”; they are school texts positioned between Brāhmaṇa ritual exegesis and Upaniṣadic speculation. Their internal layers often preserve both ritual and philosophical material.',
    datingBasis:'Language, ritual assumptions and their textual relationship to Brāhmaṇas and early Upaniṣads provide the main relative dating evidence.',
    sources:['Vedic Heritage Portal — Āraṇyakas','Patrick Olivelle, The Early Upaniṣads']
  });
  patch('Aitareya Āraṇyaka',{
    contents:['Mahāvrata ritual and its symbolic interpretation.','Meditations linking speech, breath, meter, body and cosmos.','The Aitareya Upaniṣad embedded within the collection, with creation from the self, entry of consciousness into the body, and the teaching that consciousness (prajñāna) is brahman.']
  });
  patch('Kauṣītaki (Śāṅkhāyana) Āraṇyaka',{
    contents:['Ritual and meditative reinterpretation of Ṛgvedic practice.','Teachings on prāṇa, senses and the interior sacrifice.','Upaniṣadic sections transmitted as the Kauṣītaki Upaniṣad, including dialogues on the path after death, prāṇa and consciousness.']
  });

  patchMany(['Kauthuma Saṃhitā','Rāṇāyanīya Saṃhitā','Jaiminīya (Talavakāra) Saṃhitā'],{
    period:'Main Saṃhitā formation broadly c. 1200–900 BCE, after much of the Ṛgveda but still within the early-to-middle Vedic period.',
    milieu:'Specialist udgātṛ chanting traditions of Soma sacrifice. The Sāmaveda reorganizes mostly Ṛgvedic verses for musical-liturgical performance.',
    history:'The Sāmaveda was transmitted through multiple śākhās with distinctive accent and melody systems. Kauthuma became the most widespread; Rāṇāyanīya and Jaiminīya preserve important alternative oral traditions.',
    datingBasis:'Relative linguistic chronology and dependence on already-existing Ṛgvedic verses show that the Sāmavedic collections are later than most Ṛgvedic hymn composition.',
    reception:'These recensions are foundational for the history of Indian sacred chant because the same verse may be transformed into a sāman through specialized melodic patterns.',
    sources:['Vedic Heritage Portal — Sāmaveda','W. Caland, Sāmavedic ritual studies','Vedic textual-history surveys']
  });
  patch('Kauthuma Saṃhitā',{contents:['Pūrvārcika: verses grouped largely by deity and ritual use.','Uttarārcika: verses arranged in sequences for Soma-sacrifice performance.','The written Saṃhitā supplies the verse-text; full melody belongs to associated chant traditions such as Grāmageya and Āraṇyageya.']});
  patch('Jaiminīya (Talavakāra) Saṃhitā',{history:'The Jaiminīya/Talavakāra school preserves a notably independent Sāmavedic tradition with archaic readings and a connected Brāhmaṇa-Upaniṣad corpus. Its survival has been much more restricted geographically than Kauthuma.'});

  patchMany(['Tāṇḍya (Pañcaviṃśa) Brāhmaṇa','Ṣaḍviṃśa Brāhmaṇa','Sāmavidhāna Brāhmaṇa','Ārṣeya Brāhmaṇa','Daivata Brāhmaṇa','Chāndogya (Mantra) Brāhmaṇa','Saṃhitopaniṣad Brāhmaṇa','Vaṃśa Brāhmaṇa','Jaiminīya Brāhmaṇa','Jaiminīya Ārṣeya Brāhmaṇa','Jaiminīya Upaniṣad Brāhmaṇa'],{
    period:'Broadly c. 1000–600 BCE, with substantial variation among individual Sāmavedic Brāhmaṇas.',
    milieu:'Specialist Sāmavedic priestly schools concerned with chant, Soma ritual, ritual classification and the genealogy of teachers.',
    history:'Unlike a single “Sāmaveda Brāhmaṇa,” the Sāmavedic tradition generated a large family of technical texts. Some are ritual manuals, others catalogues, deity-indexes, genealogies or speculative prose.',
    datingBasis:'Middle/Late Vedic language and the development of the śrauta chant system provide relative chronological anchors.',
    sources:['Vedic Heritage Portal — Sāmaveda Brāhmaṇas','W. Caland, editions/studies of Sāmavedic Brāhmaṇas']
  });
  patch('Tāṇḍya (Pañcaviṃśa) Brāhmaṇa',{contents:['Twenty-five prapāṭhakas.','Detailed mapping of stotras and sāmans onto Soma rituals.','Extended sattra sessions, special rites and priestly performance sequences.']});
  patch('Ṣaḍviṃśa Brāhmaṇa',{contents:['Supplement to the Pañcaviṃśa tradition.','Ritual material not covered in the earlier twenty-five books.','The Adbhuta material on ominous or extraordinary phenomena and rites for their pacification.']});
  patch('Jaiminīya Brāhmaṇa',{contents:['Large and archaic prose corpus of the Jaiminīya school.','Soma ritual exposition combined with numerous myths and narrative explanations.','Important variants of stories otherwise known from other Vedic schools.']});
  patch('Jaiminīya Upaniṣad Brāhmaṇa',{period:'Late Vedic, broadly c. 800–600 BCE, though the collection is layered.',contents:['Speculation on sāman, sound, breath and cosmic correspondences.','Narratives and teacher lineages.','Material transitional between Brāhmaṇa ritual exegesis and Upaniṣadic philosophy.']});

  patchMany(['Talavakāra (Jaiminīya-Upaniṣad) Āraṇyaka','Chāndogya Āraṇyaka'],{
    period:'Late Vedic, broadly c. 800–500 BCE.',
    milieu:'Sāmavedic contemplative traditions that interiorize chant and sacrifice.',
    history:'These layers stand close to the formation of the Kena and Chāndogya Upaniṣadic traditions; boundaries between Brāhmaṇa, Āraṇyaka and Upaniṣad are partly editorial and school-specific.',
    sources:['Vedic Heritage Portal — Sāmaveda Āraṇyakas','Patrick Olivelle, The Early Upaniṣads']
  });

  patchMany(['Vājasaneyi Saṃhitā (Mādhyandina)','Vājasaneyi Saṃhitā (Kāṇva)'],{
    period:'Broadly c. 1100–800 BCE for the formation of the White Yajurvedic Saṃhitā, with later recensional stabilization.',
    milieu:'Later Vedic yajus-priest traditions of north India. Unlike the Black Yajurveda, the White Yajurveda separates the mantra collection from its principal Brāhmaṇa exposition.',
    history:'The Mādhyandina and Kāṇva recensions preserve related but not identical forms of the Vājasaneyi Saṃhitā. Their differences continue into the Śatapatha Brāhmaṇa and Bṛhadāraṇyaka traditions.',
    datingBasis:'Late Vedic Sanskrit, ritual development and comparison with Kṛṣṇa Yajurvedic collections provide the main relative chronology.',
    sources:['Vedic Heritage Portal — Śukla Yajurveda','Jan Gonda, Vedic literature surveys']
  });
  patchMany(['Śatapatha Brāhmaṇa (Mādhyandina)','Śatapatha Brāhmaṇa (Kāṇva)'],{
    period:'Broadly c. 900–600 BCE, with layers; among the latest and most extensive major Brāhmaṇas.',
    milieu:'White Yajurvedic ritual schools associated with the eastern expansion of later Vedic culture, including the Kuru-Pañcāla/Videha horizon.',
    history:'The Śatapatha is a vast ritual-theological prose work transmitted in Mādhyandina and Kāṇva recensions. It preserves elaborate śrauta ritual, myths, cosmology and the prose environment from which the Bṛhadāraṇyaka Upaniṣad emerged.',
    contents:['Agnihotra, new/full moon rites and Soma ritual.','Construction and symbolism of the fire altar (agnicayana).','Aśvamedha and royal ritual.','Myths such as Manu and the flood, Prajāpati, and ritualized cosmogony.','The final books lead into Bṛhadāraṇyaka Upaniṣadic speculation.'],
    reception:'It is one of the richest sources for later Vedic ritual, social history and speculative theology and is indispensable for interpreting the Bṛhadāraṇyaka Upaniṣad.',
    sources:['Śatapatha Brāhmaṇa editions/translations','Vedic Heritage Portal','Patrick Olivelle, The Early Upaniṣads']
  });
  patchMany(['Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Mādhyandina)','Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Kāṇva)'],{
    period:'Roughly 7th–6th centuries BCE for major Bṛhadāraṇyaka layers, while the surrounding Śatapatha material is broader and layered.',
    history:'The “Āraṇyaka” label here marks the late ritual/speculative books of the Śatapatha tradition out of which the Bṛhadāraṇyaka Upaniṣad is transmitted in two major recensions.',
    contents:['Interiorization of sacrifice.','Yājñavalkya dialogues on ātman and brahman.','Maitreyi and Gārgī dialogues.','Neti neti, rebirth, karma and liberation.'],
    sources:['Patrick Olivelle, The Early Upaniṣads','Signe Cohen, The Classical Upaniṣads']
  });

  patchMany(['Taittirīya Saṃhitā','Maitrāyaṇī Saṃhitā','Kāṭhaka Saṃhitā','Kapiṣṭhala-Kaṭha Saṃhitā'],{
    period:'Broadly c. 1200–900 BCE, with differences among the Kṛṣṇa Yajurvedic schools and layers.',
    milieu:'Adhvaryu ritual schools of the Black Yajurveda, where mantras and prose ritual explanation are interwoven rather than separated into Saṃhitā and Brāhmaṇa as in the White Yajurveda.',
    history:'These recensions represent once-flourishing śākhās of the Black Yajurveda. Taittirīya survives most fully; Maitrāyaṇī and Kāṭhaka are also substantial, while Kapiṣṭhala-Kaṭha is fragmentary.',
    datingBasis:'Their archaic-to-late Vedic linguistic layers and relationship to the śrauta ritual system establish a relative chronology after the oldest Ṛgvedic poetry.',
    sources:['Vedic Heritage Portal — Kṛṣṇa Yajurveda','Vedic recension studies']
  });
  patch('Taittirīya Saṃhitā',{contents:['Seven kāṇḍas in the received tradition.','Mantras and prose for new/full moon rites, Soma sacrifice, animal sacrifice, royal rites and agnicayana.','The famous Śrī Rudram/Namakam occurs in the fourth kāṇḍa.'],namedFeatures:['Śrī Rudram / Namakam','Agnicayana material','Royal and Soma rites']});
  patch('Kapiṣṭhala-Kaṭha Saṃhitā',{status:'Only portions survive; the recension is known through incomplete manuscripts/fragments and comparison with the Kāṭhaka tradition.'});
  patchMany(['Taittirīya Brāhmaṇa','Vādhūla Brāhmaṇa / Anvākhyāna'],{
    period:'Broadly c. 900–700 BCE, though individual sections may be earlier or later.',
    milieu:'Black Yajurvedic ritual schools elaborating rites not fully explained in their Saṃhitā layers.',
    history:'Because Kṛṣṇa Yajurvedic Saṃhitās already contain prose, the boundary between “Saṃhitā” and “Brāhmaṇa” is less clean than in the White Yajurveda.',
    sources:['Vedic Heritage Portal — Yajurveda Brāhmaṇas','Vedic ritual scholarship']
  });
  patchMany(['Taittirīya Āraṇyaka','Maitrāyaṇīya Āraṇyaka'],{
    period:'Broadly c. 800–500 BCE, with clearly layered material.',
    milieu:'Late Black Yajurvedic ritual-contemplative traditions.',
    history:'These collections combine ritual material, recitation, cosmology and contemplative teaching; famous Upaniṣadic passages are embedded in or closely attached to them.',
    sources:['Vedic Heritage Portal — Yajurveda Āraṇyakas','Patrick Olivelle, The Early Upaniṣads']
  });
  patch('Taittirīya Āraṇyaka',{contents:['Pravargya and other ritual material.','The Taittirīya Upaniṣad in the later portion.','The Mahānārāyaṇa material in some recensional arrangements.','Meditations on food, breath, sound, self and brahman.']});

  patchMany(['Śaunaka Saṃhitā','Paippalāda Saṃhitā'],{
    period:'Core Atharvavedic materials are broadly later than the oldest Ṛgveda but still Vedic, often placed c. 1200–900 BCE with younger layers continuing later.',
    milieu:'Domestic, healing, royal and protective ritual traditions alongside speculative hymns; the Atharvaveda preserves a social and ritual world partly different from the śrauta-dominated three-Veda system.',
    history:'Two principal surviving recensions are Śaunaka and Paippalāda. Paippalāda manuscripts, especially from Odisha/Kashmir transmission, have transformed modern study by preserving readings absent from Śaunaka.',
    contents:['Healing charms against disease, poison and demons.','Rites for love, rivalry, protection, kingship and household welfare.','Funerary and royal material.','Speculative hymns on skambha, breath, time and cosmic principles.'],
    reception:'The Atharvaveda was later fully integrated as the fourth Veda, though older ritual systems sometimes speak primarily of three Vedas.',
    sources:['Vedic Heritage Portal — Atharvaveda','Atharvaveda Paippalāda scholarship','Atharvaveda translations/studies']
  });
  patch('Gopatha Brāhmaṇa',{
    period:'Probably one of the latest major Brāhmaṇa texts, broadly c. 700–500 BCE or later in parts.',
    milieu:'Atharvavedic scholastic ritual culture seeking to articulate the place of the fourth Veda within the broader Vedic system.',
    history:'The Gopatha is the only surviving Brāhmaṇa of the Atharvaveda. It incorporates and adapts material known from other Brāhmaṇas while asserting Atharvavedic ritual authority.',
    contents:['Cosmological and ritual myths.','Explanations of priestly offices and sacrifice.','Arguments for the Atharvaveda and brahman priest.','Adaptations of older Brāhmaṇa material into an Atharvavedic frame.'],
    sources:['Vedic Heritage Portal — Gopatha Brāhmaṇa','Gopatha Brāhmaṇa editions and comparative studies']
  });

  patch('Rāmāyaṇa',{
    period:'Layered composition broadly from c. 5th/4th century BCE to the early centuries CE; the core narrative is older than many didactic and theological additions.',
    milieu:'North Indian Sanskrit epic tradition, later received throughout South and Southeast Asia in many recensions, vernacular retellings and performance traditions.',
    history:'The Vālmīki Rāmāyaṇa is not the product of one datable writing event. The text grew through oral and literary transmission; Books 1 and 7 are often treated as containing substantial later material relative to the central narrative.',
    datingBasis:'Language, comparison with the Mahābhārata and Buddhist/Jain literature, political-social references, and the stratification of its seven kāṇḍas provide relative evidence.',
    contents:['Bāla: Rāma’s youth, Viśvāmitra, Ahalyā and marriage to Sītā.','Ayodhyā: succession crisis, Kaikeyī’s boons and exile.','Araṇya: forest life, Śūrpaṇakhā and Sītā’s abduction.','Kiṣkindhā: alliance with Sugrīva and Hanumān.','Sundara: Hanumān’s journey to Laṅkā and meeting with Sītā.','Yuddha: war with Rāvaṇa and return.','Uttara: later reign, Sītā’s exile, Lava-Kuśa and final departures.'],
    namedFeatures:['Rāma-Sītā marriage','Bharata and the sandals','Golden deer and abduction','Hanumān in Laṅkā','Setubandha','War with Rāvaṇa','Agni-parīkṣā','Lava and Kuśa'],
    profile:'Epic dharma is explored through kingship, family loyalty, exile, fidelity and difficult conflicts between personal virtue and royal obligation. Later reception increasingly treats Rāma as Viṣṇu’s avatāra.',
    reception:'It generated enormous Sanskrit, vernacular, Jain, Buddhist and Southeast Asian retelling traditions, temple cultures, performance genres and devotional movements.',
    sources:['Robert P. Goldman et al., The Rāmāyaṇa of Vālmīki','Critical-edition scholarship on the Rāmāyaṇa','Epic chronology studies']
  });
  patch('Mahābhārata',{
    period:'Layered composition and redaction broadly c. 400 BCE–400 CE, with older heroic material and later didactic/theological additions.',
    milieu:'North Indian Sanskrit epic and bardic-Brahmanical traditions that expanded a dynastic war story into an encyclopedic discourse on dharma, kingship, liberation and sacred history.',
    history:'The poem repeatedly describes its own expansion and survives in major northern and southern manuscript traditions. The BORI Critical Edition reconstructs the common archetypal text from a vast manuscript base rather than reproducing any single regional vulgate.',
    datingBasis:'Linguistic layers, comparison with early Buddhist/Jain and Dharma literature, internal political/social references and manuscript stratification.',
    contents:['The Kuru-Pāṇḍava dynastic conflict, dice game, exile and Kurukṣetra war.','Bhagavad Gītā within the Bhīṣma Parvan.','Nārāyaṇīya, Mokṣadharma and extensive liberation philosophy.','Śānti and Anuśāsana books on kingship, law, gifts, ethics and social order.','Nala-Damayantī, Sāvitrī, Śakuntalā and many embedded narratives.','Post-war grief, Aśvamedha, forest retirement and the final ascent.'],
    namedFeatures:['Bhagavad Gītā','Dice game and Draupadī’s humiliation','Bhīṣma on the bed of arrows','Nala-Damayantī','Sāvitrī','Yakṣa questions','Mokṣadharma','Svargārohaṇa'],
    profile:'The epic repeatedly insists that dharma is subtle (sūkṣma) and stages conflicts in which every available duty has costs. It also contains major Vaiṣṇava, Śaiva, Sāṃkhya-Yoga and renunciatory materials.',
    reception:'Together with the Rāmāyaṇa it became a fundamental narrative reservoir for Hindu ethics, pilgrimage, drama, art, political thought and devotional traditions.',
    sources:['BORI Critical Edition of the Mahābhārata','James L. Fitzgerald, Mahābhārata studies','Oxford/Cambridge epic scholarship']
  });

  const vedangaCommon={
    period:'Vedāṅga disciplines develop across the late Vedic and early classical periods, roughly the first millennium BCE; individual surviving treatises have different dates.',
    history:'The Muṇḍaka Upaniṣad names six Vedāṅgas as auxiliary sciences needed for preserving and correctly performing Vedic learning. The button here represents a discipline, not one single book.',
    sources:['Muṇḍaka Upaniṣad 1.1.5','Vedic Heritage Portal — Vedāṅgas','History of Sanskrit śāstra studies']
  };
  patch('Śikṣā',Object.assign({},vedangaCommon,{overview:'Śikṣā is the Vedāṅga of phonetics and correct recitation: articulation, accent, quantity, euphony and the disciplined production of Vedic sound.',contents:['Place and manner of articulation.','Vowel/consonant length and phonetic categories.','Vedic accent and tonal recitation.','Rules preserving oral accuracy across śākhās.'],reception:'Śikṣā literature underpins the extraordinary precision of Vedic oral transmission and later Sanskrit phonetic analysis.'}));
  patch('Kalpa',Object.assign({},vedangaCommon,{overview:'Kalpa is the Vedāṅga of ritual procedure. Its literature is not one text but families of Śrauta, Gṛhya, Dharma and Śulba sūtras associated with Vedic schools.',contents:['Śrautasūtras for large public sacrifices.','Gṛhyasūtras for domestic rites such as marriage and saṃskāras.','Dharmasūtras for conduct and social-religious duties.','Śulbasūtras for altar geometry and measurement.'],reception:'Kalpa literature became a major bridge from Vedic ritual into Dharmaśāstra and classical Hindu domestic practice.'}));
  patch('Vyākaraṇa',Object.assign({},vedangaCommon,{overview:'Vyākaraṇa is grammatical analysis, preserving and explaining correct Sanskrit forms. Earlier grammatical traditions culminate for us in Pāṇini’s Aṣṭādhyāyī, though the discipline is older than Pāṇini.',contents:['Morphology and derivation.','Sandhi and phonological operations.','Nominal and verbal formation.','Technical metalanguage and generative rule systems.'],reception:'Pāṇinian grammar became one of South Asia’s most influential intellectual systems and the model of rigorous śāstric analysis.'}));
  patch('Nirukta',Object.assign({},vedangaCommon,{overview:'Nirukta is Vedic etymology and semantic explanation, especially the interpretation of archaic or obscure words. Yāska’s Nirukta is the principal surviving classical work.',contents:['Explanation of difficult Vedic vocabulary.','Etymological derivation (nirvacana).','Interpretation of deity names and Vedic passages.','Discussion of whether nouns derive from verbal roots.'],reception:'Yāska is one of the earliest surviving Indian theorists of language, meaning and scriptural interpretation.'}));
  patch('Chandas',Object.assign({},vedangaCommon,{overview:'Chandas is the analysis of poetic meter, essential for preserving the metrical form of Vedic hymns. Piṅgala’s Chandaḥsūtra is the best-known later systematic work.',contents:['Vedic meters such as Gāyatrī, Triṣṭubh and Jagatī.','Syllable counting and metrical pattern.','Later combinatorial analysis of metrical possibilities.'],reception:'Metric analysis served both Vedic preservation and the development of classical Sanskrit poetics.'}));
  patch('Jyotiṣa',Object.assign({},vedangaCommon,{overview:'Vedāṅga Jyotiṣa is the calendrical-astronomical discipline needed to place sacrifices at correct seasonal, lunar and stellar times. It is not identical with the much later full classical astral sciences.',contents:['Lunar and solar calendrics.','Nakṣatra reckoning.','Tithi and ritual timing.','Intercalation and synchronization of cycles.'],reception:'It is one of the earliest surviving Sanskrit traditions of mathematical calendrics and became a precursor to later jyotiḥśāstra.'}));
})();