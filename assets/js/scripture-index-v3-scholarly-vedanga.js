(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const put = (name, data) => { D[`Vedāṅga:${name}`] = Object.assign({}, D[`Vedāṅga:${name}`] || D[name] || {}, data); };

  put('Śikṣā', {
    overview:'Śikṣā is the Vedāṅga of phonetics and recitation. Its concern is the exact production and transmission of Vedic speech: sounds, accent, quantity, articulation, euphonic combination and the discipline of correct oral performance. It is not one single book but a technical field represented by Prātiśākhyas and later Śikṣā treatises associated with particular Vedic schools.',
    period:'The oldest phonetic material belongs to the late Vedic period and developed alongside the stabilization of the Vedic recensions; many separately titled Śikṣā works are later.',
    history:'Because the Vedas were transmitted orally, phonetic analysis became unusually exact. The Prātiśākhyas describe school-specific pronunciation and recitation, while later Śikṣā texts systematize topics such as sound classes, accent, length and articulation. The field therefore preserves evidence both for ancient linguistics and for the practical technologies of oral transmission.',
    chapterMap:['Sound and articulation: where and how phonemes are produced.','Quantity and accent: short, long and protracted vowels; Vedic pitch accents.','Recitational discipline: continuity, pause, combination and preservation of the text.'],
    themes:['Correct Vedic pronunciation','Accent and vowel quantity','Oral preservation','School-specific recitation'],
    bibliography:['J. F. Staal, Nambudiri Veda Recitation and studies of Vedic oral tradition','Louis Renou, studies of Vedic phonetics and Prātiśākhya literature']
  });

  put('Kalpa', {
    overview:'Kalpa is the Vedāṅga of ritual procedure. It is represented by several related sūtra genres rather than one universal Kalpa book: Śrautasūtras regulate large public Vedic sacrifices, Gṛhyasūtras domestic rites, Dharmasūtras social and normative duties, and Śulbasūtras the geometry required for sacrificial altars.',
    period:'The main Kalpasūtra traditions were composed and revised across the later Vedic and early post-Vedic periods, broadly during the first millennium BCE, with substantial differences among schools.',
    history:'Kalpa translates the ritual explanations of the Brāhmaṇas into compact procedural manuals tied to individual Vedic śākhās. These texts are therefore crucial evidence for how sacrifice was actually organized, how domestic ritual developed, and how Dharma literature emerged from Vedic school traditions.',
    chapterMap:['Śrautasūtra: large-scale śrauta sacrifice.','Gṛhyasūtra: domestic rites such as marriage, initiation and funerary observances.','Dharmasūtra: norms of conduct, status and legal-religious duty.','Śulbasūtra: altar measurement and geometry.'],
    themes:['Ritual procedure','Domestic rites','Dharma','Sacrificial geometry'],
    bibliography:['Patrick Olivelle, Dharmasūtras: The Law Codes of Ancient India','S. N. Sen and A. K. Bag, The Śulbasūtras']
  });

  put('Vyākaraṇa', {
    overview:'Vyākaraṇa is the Vedāṅga of grammar. Its best-known surviving monument is Pāṇini’s Aṣṭādhyāyī, a highly compressed description of Sanskrit that presupposes earlier grammatical traditions and became the foundation of the classical grammatical school.',
    period:'Pāṇini is generally placed in the mid-first millennium BCE, though precise dating remains debated. The grammatical discipline itself is older than the Aṣṭādhyāyī.',
    history:'Vedic interpretation required the ability to analyze forms that were already archaic relative to later speech. Pāṇini systematized both contemporary Sanskrit and Vedic exceptions in nearly four thousand sūtras. Kātyāyana’s Vārttikas and Patañjali’s Mahābhāṣya later turned this concise grammar into a major philosophical and linguistic tradition.',
    chapterMap:['Aṣṭādhyāyī: eight chapters of tightly ordered grammatical rules.','Dhātupāṭha and Gaṇapāṭha: auxiliary lexical lists used by the grammatical system.','Later interpretive layer: Kātyāyana’s Vārttikas and Patañjali’s Mahābhāṣya.'],
    themes:['Sanskrit morphology and syntax','Vedic forms','Rule ordering and derivation','Language analysis'],
    bibliography:['George Cardona, Pāṇini: A Survey of Research','S. D. Joshi and J. A. F. Roodbergen, studies and translations of Pāṇinian grammar']
  });

  put('Nirukta', {
    overview:'Nirukta is the Vedāṅga of etymology and semantic explanation, especially of difficult or archaic Vedic words. The surviving foundational work is Yāska’s Nirukta, which comments on the Nighaṇṭu word-lists and preserves both proposed etymologies and debates among earlier interpreters.',
    period:'Yāska is earlier than or roughly contemporary with the early classical grammatical tradition and is commonly placed before Pāṇini, though exact dates are uncertain.',
    history:'The Nirukta shows that Vedic language had already become difficult enough to require systematic explanation. Yāska discusses how words signify, how divine names can be derived, and how obscure Vedic passages should be interpreted. The work is therefore both a lexicographical tool and one of the earliest surviving Indian texts on semantics and hermeneutics.',
    chapterMap:['Nighaṇṭu background: collections of rare, synonymous and divine terms.','Nirukta exposition: etymological and semantic explanations of those terms.','Interpretive debates: competing explanations of Vedic words and deities.'],
    themes:['Vedic vocabulary','Etymology','Semantics','Scriptural interpretation'],
    bibliography:['Lakshman Sarup, The Nighaṇṭu and the Nirukta of Śrī Yāskācārya','Eivind Kahrs, Indian Semantic Analysis: The Nirvacana Tradition']
  });

  put('Chandas', {
    overview:'Chandas is the Vedāṅga of metre. Vedic hymns are built from recurring metrical patterns such as Gāyatrī, Anuṣṭubh, Triṣṭubh and Jagatī, and metrical analysis was essential both for correct recitation and for understanding the formal organization of revelation. The later Piṅgala Chandaḥsūtra became the best-known systematic treatise on Sanskrit prosody.',
    period:'Vedic metrical knowledge is as old as the hymn collections themselves; formal sūtra-style analysis belongs to the later Vedic and early classical periods. Piṅgala’s date is uncertain.',
    history:'Early metrical classification grew out of recitational practice. Later prosodists systematized syllable weight, line length and combinations of light and heavy syllables. Piṅgala’s work is especially famous for combinatorial procedures used to enumerate metrical patterns.',
    chapterMap:['Vedic metres: classification by syllable count and line structure.','Classical prosody: light and heavy syllables and patterned metres.','Combinatorial analysis: systematic enumeration of possible metrical sequences.'],
    themes:['Vedic metre','Prosody','Recitation','Combinatorics'],
    bibliography:['E. V. Arnold, Vedic Metre in its Historical Development','H. D. Velankar, studies and editions of Piṅgala']
  });

  put('Jyotiṣa', {
    overview:'Jyotiṣa is the Vedāṅga concerned with calendrical and astral calculation for ritual timing. The earliest surviving core is the Vedāṅga Jyotiṣa, transmitted in Ṛgvedic and Yajurvedic versions and attributed by tradition to Lagadha. Its purpose is primarily to coordinate lunar and solar cycles so that sacrifices occur at the required times.',
    period:'The chronology of the Vedāṅga Jyotiṣa is disputed. Scholars generally treat it as an early Indian astral-calendrical text whose transmitted form contains layers and whose exact date cannot be fixed from a single astronomical argument.',
    history:'The text organizes a five-year yuga, lunar months, tithis, nakṣatras and intercalation in a compact scheme suited to ritual scheduling. Later Indian jyotiḥśāstra developed far beyond this Vedāṅga into mathematical astronomy and astrology, but those later sciences should not simply be projected backward into the short early text.',
    chapterMap:['Five-year calendrical cycle.','Lunar and solar reckoning.','Nakṣatras and ritual timing.','Intercalation and synchronization of cycles.'],
    themes:['Ritual calendar','Lunar-solar coordination','Nakṣatras','Time-reckoning'],
    bibliography:['T. S. Kuppanna Sastry, Vedāṅga Jyotiṣa of Lagadha','David Pingree, Jyotiḥśāstra: Astral and Mathematical Literature','Kim Plofker, Mathematics in India']
  });
})();