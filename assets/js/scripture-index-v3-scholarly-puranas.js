(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const put = (name, data) => { D[`Purāṇa:${name}`] = Object.assign({}, D[`Purāṇa:${name}`] || D[name] || {}, data); };
  const H40 = 'R. C. Hazra, Studies in the Purāṇic Records on Hindu Rites and Customs (Dacca, 1940; repr. Delhi, 1975/1987)';
  const HU1 = 'R. C. Hazra, Studies in the Upapurāṇas, vol. I (Calcutta, 1958)';
  const HU2 = 'R. C. Hazra, Studies in the Upapurāṇas, vol. II (Calcutta, 1963)';
  const ROCHER = 'Ludo Rocher, The Purāṇas (Wiesbaden: Harrassowitz, 1986)';
  const DIMMITT = 'Cornelia Dimmitt and J. A. B. van Buitenen, Classical Hindu Mythology: A Reader in the Sanskrit Purāṇas (Philadelphia, 1978)';

  put('Vāyu Purāṇa', {
    overview:'The Vāyu Purāṇa is one of the most important witnesses to the older genealogical-cosmological stratum of Purāṇic literature. Vāyu is the transmitting speaker, but the work is not a “wind-god scripture”: its central concerns are sarga/pratisarga, manvantaras, cosmic geography, dynastic genealogy, rites and an early Śaiva-Pāśupata religious environment.',
    period:'Older strata are commonly assigned to the Gupta or immediately pre-/post-Gupta centuries, roughly 4th–6th c. CE; the received text also contains later matter. A single date for every chapter is methodologically indefensible.',
    milieu:'Early classical Purāṇic historiography and Pāśupata/Śaiva religious culture, with strong overlap with the Brahmāṇḍa textual tradition.',
    history:'Vāyu and Brahmāṇḍa share extensive blocks of material and preserve old genealogical lists used by Pargiter and later historians. The relation is not one of a simple one-time copy: the two represent closely related recensional/redactional traditions. Hazra explicitly treats Vāyu and Brahmāṇḍa as pre-eminently Pāśupata in their earlier form.',
    datingBasis:'Relative chronology from dynastic lists, early sectarian vocabulary, quotation history, and comparison with Brahmāṇḍa. The Purāṇic text must be dated by strata rather than by its traditional speaker.',
    chapterMap:['Cosmogony and cyclic creation/dissolution.','Manvantaras and the organization of cosmic time.','Jambūdvīpa, lokas and sacred geography.','Long solar/lunar and sage genealogies.','Ritual, vows, funerary and religious observances.','Śaiva/Pāśupata theological passages.'],
    primaryEvidence:['Compare the dynastic and cosmological blocks with parallel Brahmāṇḍa passages.','The Purāṇic catalogues themselves disagree whether Vāyu or Śiva occupies one of the eighteen principal slots.'],
    scholarlyPositions:[`${H40}: treats the Vāyu/Brahmāṇḍa material among the early Purāṇic strata and uses rites/customs as chronological evidence.`,`${ROCHER}: stresses the impossibility of assigning one date to a Purāṇa as if it were a single-authored book.`],
    bibliography:[H40, ROCHER, 'F. E. Pargiter, Ancient Indian Historical Tradition (1922)', 'Vāyu Purāṇa, critical/printed Sanskrit editions']
  });

  put('Mārkaṇḍeya Purāṇa', {
    overview:'The Mārkaṇḍeya Purāṇa is an unusually narrative Purāṇa whose older core is not organized around the supremacy of one sectarian deity. Its most famous embedded work is the Devī Māhātmya, but the surrounding Purāṇa also contains Jaimini’s questions, accounts of manvantaras, kings, sages, dharma and cosmological material.',
    period:'Hazra places important chapters of the extant Mārkaṇḍeya among the earliest surviving Purāṇic materials; a broad 4th–6th c. CE horizon is commonly used for major strata. The Devī Māhātmya is securely early medieval/classical and was established by the early 7th century at the latest.',
    milieu:'Classical Purāṇic narrative culture, with the Devī Māhātmya representing a decisive crystallization of Sanskrit Goddess theology.',
    history:'The received Purāṇa is layered. Hazra isolates early chapters on internal evidence; the Devī Māhātmya (common numbering 81–93) is an embedded, relatively self-contained composition that later circulated independently as the Durgā Saptashatī/Caṇḍī.',
    datingBasis:'Hazra, Purāṇic Records, pp. 8–13, uses ritual/social and sectarian criteria to distinguish early Mārkaṇḍeya material. External reception of the Devī Māhātmya supplies a terminus ante quem.',
    chapterMap:['Opening Jaimini-frame and narrative answers.','Manvantara cycles and royal/sage narratives.','Devī Māhātmya: Madhu–Kaiṭabha, Mahiṣāsura, Śumbha–Niśumbha cycles (commonly chs. 81–93).','Later cosmological, dharma and genealogical material.'],
    namedFeatures:['Devī Māhātmya / Durgā Saptashatī','Mahiṣāsuramardinī narrative','Śumbha–Niśumbha cycle'],
    scholarlyPositions:[`${H40}, pp. 8–13: uses the Mārkaṇḍeya as a major witness for old Purāṇic strata.`,`F. E. Pargiter’s translation/edition remains fundamental for the received text and its chapter structure.`],
    bibliography:[H40, ROCHER, 'F. E. Pargiter, The Mārkaṇḍeya Purāṇa (Bibliotheca Indica translation)', 'Thomas B. Coburn, Devī-Māhātmya: The Crystallization of the Goddess Tradition (1984)']
  });

  put('Viṣṇu Purāṇa', {
    overview:'The Viṣṇu Purāṇa is among the most tightly organized Mahāpurāṇas. In six aṃśas it integrates creation, cosmography, Vedic and social order, dynastic history, Kṛṣṇa’s life, the Kali age, dissolution and liberation into a strongly Vaiṣṇava theological architecture.',
    period:'A substantial classical core is usually placed around the 4th–5th c. CE, though individual sections may be older or later. Scholarly dating remains approximate.',
    milieu:'Classical Vaiṣṇava/Pāñcarātra-inflected Purāṇic theology framed as Parāśara teaching Maitreya.',
    history:'Compared with highly accretional Purāṇas, Viṣṇu shows unusual macro-structural coherence. Hazra regards its early form as Pāñcarātra in character. Later transmission nevertheless produced variant readings and additions.',
    datingBasis:'Classical Sanskrit style, sectarian development, dynastic horizon, relationship to older Purāṇic genealogical material and citation history.',
    chapterMap:['Aṃśa I (22 chs.): creation, Prahlāda and early mythology.','Aṃśa II (16 chs.): cosmography and cosmic geography.','Aṃśa III (18 chs.): manvantaras, Vedic branches, varṇa/āśrama and ritual order.','Aṃśa IV (24 chs.): royal genealogies.','Aṃśa V (38 chs.): Kṛṣṇa from birth through Dvārakā.','Aṃśa VI (8 chs.): Kali age, dissolution and mokṣa.'],
    primaryEvidence:['The six-aṃśa architecture should be cited when describing contents rather than reducing the work to “Viṣṇu devotion.”'],
    scholarlyPositions:[`${HU1}, ch. I: Hazra describes the earliest Viṣṇu-Purāṇa form as Pāñcarātra in character.`,`${ROCHER}: treats the text as comparatively coherent while warning against single-date models.`],
    bibliography:[H40, HU1, ROCHER, 'H. H. Wilson, The Vishnu Purana (translation with extensive notes)', 'M. M. Pathak et al., critical and textual studies of the Viṣṇu Purāṇa']
  });

  put('Matsya Purāṇa', {
    overview:'The Matsya Purāṇa begins from the Matsya/flood cycle but becomes an encyclopedic Purāṇa: creation and genealogies coexist with śrāddha, gifts, royal duties, tīrthas, temple architecture, iconography and sculpture.',
    period:'Older layers probably belong to the first half of the first millennium CE; substantial architectural, ritual and tīrtha material was revised over later centuries.',
    milieu:'Classical Purāṇic Vaiṣṇava frame expanding into dharma and technical śāstra.',
    history:'The text itself is important for Purāṇic self-definition, including its famous discussion of Purāṇa characteristics and catalogues. Its architecture/iconography blocks have their own textual history and parallels in technical literature.',
    datingBasis:'Comparison with Vāyu/Brahmāṇḍa genealogies, the development of temple architecture and iconographic terminology, and quotation history.',
    chapterMap:['Matsya and flood narrative.','Creation, manvantaras and genealogies.','Śrāddha, dāna, vrata and royal duties.','Temple architecture, image measurement and iconography.','Tīrtha-māhātmyas and sacred geography.'],
    primaryEvidence:['Matsya ch. 53 is central for Purāṇic classification and self-description.'],
    scholarlyPositions:[`${H40}: uses Matsya repeatedly in reconstructing the chronology of Purāṇic rites and customs.`,`Specialist architectural studies isolate the temple/image chapters as important witnesses to early medieval śilpa practice.`],
    bibliography:[H40, ROCHER, 'Matsya Purāṇa, Ānandāśrama/Veṅkaṭeśvara editions', 'P. K. Acharya and later studies of Matsya architectural chapters']
  });

  put('Kūrma Purāṇa', {
    overview:'The extant Kūrma Purāṇa is a composite but intellectually important text in which Vaiṣṇava and Śaiva materials are deliberately interwoven. It contains the Īśvara Gītā, yoga and mokṣa teaching, dharma, ritual and pilgrimage, and it preserves an influential Upapurāṇa catalogue.',
    period:'Major received strata are generally placed in the early medieval period, with older material embedded; no unitary date should be assigned.',
    milieu:'A Purāṇic environment mediating Vaiṣṇava and Śaiva theology, with important Pāñcarātra and Śaiva elements.',
    history:'Hazra argues that the earliest form of the extant Kūrma was Pāñcarātra in character. The received text is not simply that early layer: later Śaiva and synthetic material significantly reshaped it.',
    datingBasis:'Sectarian redaction, citation history, parallels with other Purāṇas and the relative chronology of yoga/dharma passages.',
    chapterMap:['Cosmology and avatāra framing.','Dharma, āśrama and ritual instruction.','Īśvara Gītā: Śaiva-theistic yoga and liberation.','Tīrtha and sacred geography.','Purāṇa/Upapurāṇa cataloguing.'],
    scholarlyPositions:[`${HU1}, ch. I: Hazra explicitly characterizes the earliest extant Kūrma form as Pāñcarātra.`,`${ROCHER}: emphasizes composite sectarian redaction rather than a simple “Vaiṣṇava” or “Śaiva” label.`],
    bibliography:[H40, HU1, ROCHER, 'Kūrma Purāṇa, critical/Veṅkaṭeśvara editions']
  });

  put('Bhāgavata Purāṇa', {
    overview:'The Bhāgavata is a highly literary twelve-skandha Vaiṣṇava Purāṇa centered on Bhagavān—above all Kṛṣṇa—and on bhakti as an epistemic, emotional and soteriological mode. It is not merely a Kṛṣṇa biography: cosmology, avatāra theology, Sāṃkhya-like analysis, royal narratives, yoga, ethics and Vedāntic reflection are distributed across the whole work.',
    period:'Modern scholarship usually places the received redaction after the 8th c. CE and before al-Bīrūnī’s early-11th-c. notice. Proposals vary; Edwin Bryant emphasizes how inconclusive many standard dating arguments are.',
    milieu:'Mature Sanskrit Vaiṣṇava bhakti, probably southern or south-influenced in the dominant scholarly model, engaging earlier Purāṇic, epic and Vedāntic traditions.',
    history:'Older theories attributing the text to the 13th-century Bopadeva are untenable because the text is attested earlier. The principal debate concerns how far before al-Bīrūnī the present redaction should be placed and whether artistic/temple evidence allows an earlier horizon.',
    datingBasis:'Upper limit from al-Bīrūnī; debated philosophical comparison with Śaṅkara; art-historical arguments; linguistic and devotional evidence. Bryant’s study is valuable precisely because it separates secure termini from weak circular arguments.',
    chapterMap:['Sk. 1–2: Parīkṣit/Śuka frame; avatāra theology and hearing scripture.','Sk. 3: Vidura–Maitreya, Kapila, creation.','Sk. 4–5: Dhruva, Pṛthu, Ṛṣabha, cosmography.','Sk. 6–7: Ajāmila; Prahlāda/Nṛsiṃha.','Sk. 8–9: Gajendra, ocean-churning, Vāmana, dynasties.','Sk. 10: Kṛṣṇa—Vraja, rāsa, Mathurā, Dvārakā.','Sk. 11: Uddhava teaching, yoga, bhakti.','Sk. 12: Kali, dynasties, conclusion.'],
    namedFeatures:['Dhruva','Ajāmila','Prahlāda and Nṛsiṃha','Gajendra','Rāsa-līlā','Uddhava Gītā'],
    scholarlyPositions:['Edwin F. Bryant, “The Date and Provenance of the Bhāgavata Purāṇa”: surveys the competing chronological arguments and notes the current post-8th-c. tendency while challenging overconfidence.','Rocher declines to give precise single dates to Purāṇas because of their redactional histories.'],
    bibliography:[ROCHER, 'Edwin F. Bryant, “The Date and Provenance of the Bhāgavata Purāṇa” (2004)', 'Bhāgavata Purāṇa Sanskrit editions and Śrīdhara Svāmin’s commentary', 'Daniel P. Sheridan, The Advaitic Theism of the Bhāgavata Purāṇa (1986)']
  });

  put('Brahmāṇḍa Purāṇa', {
    overview:'The Brahmāṇḍa Purāṇa is an old cosmological-genealogical Purāṇic complex closely related to Vāyu. Its received recensions also carry celebrated later materials, especially the Lalitopākhyāna/Lalitā-sahasranāma and, in some transmission, the Adhyātma Rāmāyaṇa.',
    period:'Old cosmological/genealogical strata belong to the first half of the first millennium CE; major embedded works are later and must be dated separately.',
    milieu:'Early Pāśupata/Śaiva-associated Purāṇic historiography later opened to Śrīvidyā and Rāma-oriented accretions.',
    history:'Vāyu and Brahmāṇḍa preserve parallel old blocks. The existence of later Śākta and Rāma materials demonstrates why “date of the Brahmāṇḍa Purāṇa” cannot mean one moment.',
    chapterMap:['Cosmogony and cosmic egg.','Geography and cosmic time.','Genealogies and manvantaras.','Lalitopākhyāna / Lalitā-sahasranāma in major recensions.','Adhyātma Rāmāyaṇa in some later transmission.'],
    scholarlyPositions:[`${HU1}, ch. I: Hazra characterizes Vāyu and Brahmāṇḍa as pre-eminently Pāśupata in early form.`,`${ROCHER}: stresses recensional variability of the famous embedded works.`],
    bibliography:[H40, HU1, ROCHER, 'Brahmāṇḍa Purāṇa printed Sanskrit editions', 'Douglas Renfrew Brooks, scholarship on Śrīvidyā/Lalitā traditions']
  });

  put('Liṅga Purāṇa', {
    overview:'The Liṅga Purāṇa is a Śaiva work in which the liṅga is theologized as the sign of an unmanifest, beginningless Śiva. Alongside the famous cosmic-pillar theology it contains creation cycles, liṅga installation and worship, iconography, vrata, tīrtha, yoga and dharma.',
    period:'Composite early-medieval text; different strata are commonly placed across roughly the 5th–10th c. CE and later.',
    milieu:'Mainstream Purāṇic Śaivism, especially liṅga theology and ritual.',
    history:'Hazra devotes a discrete chronological study to the Liṅga Purāṇa (Purāṇic Records, pp. 94–106), distinguishing older and later chapters through ritual/sectarian criteria and quotation history.',
    datingBasis:'Hazra’s method compares rites, sectarian developments, quotations in Nibandhas and textual parallels. Later Tantric vocabulary cannot simply be projected onto the oldest layers.',
    chapterMap:['Pūrvabhāga: cosmology, the liṅga as cosmic principle, Śiva mythology and ritual.','Uttarabhāga: further rites, vows, tīrthas, yoga and religious observance.'],
    hazraNotes:`${H40}, pp. 94–106 is the key classic study for chapter-level stratification of this Purāṇa.`,
    bibliography:[H40, ROCHER, 'Liṅga Purāṇa Sanskrit editions', 'Studies of Śaiva Purāṇic ritual and liṅga theology']
  });

  put('Padma Purāṇa', {
    overview:'The Padma Purāṇa is not a single uniform theological treatise but a vast recensional complex of khaṇḍas containing cosmogony, tīrtha-māhātmyas, vratas, dharma, Vaiṣṇava theology, Śaiva materials, sacred-river traditions and later sectarian polemic. Different printed editions do not represent a single stable archetype.',
    period:'Its strata range widely. Hazra argues that the oldest Sṛṣṭi-khaṇḍa material preserves early Brahmā-oriented Purāṇic content, while many Uttara/Pātāla and sectarian sections are substantially later.',
    milieu:'Layered pan-Indian Purāṇic compilation with especially strong pilgrimage/vrata and later Vaiṣṇava sectarian redactions.',
    history:'Hazra’s Purāṇic Records, pp. 107–127, is specifically devoted to the Padma and its chronological strata. He treats the Sṛṣṭi-khaṇḍa as preserving the earliest material and uses quotations, doctrinal development and ritual history to isolate later additions.',
    datingBasis:'Khaṇḍa-by-khaṇḍa comparison, Nibandha quotations, sectarian doctrine, tīrtha geography and ritual history. A date assigned to one Padma khaṇḍa must not be generalized to another.',
    chapterMap:['Sṛṣṭi-khaṇḍa: creation and older Brahmā-oriented material.','Bhūmi/Svarga materials: geography, kings, sacred places and religious narratives.','Pātāla-khaṇḍa: major narrative/sectarian blocks and Upapurāṇa catalogue in the relevant recension.','Uttara-khaṇḍa: extensive vrata, dharma, tīrtha and sectarian materials; includes the guṇa-classifications used elsewhere on this site in particular editions.'],
    hazraNotes:`${H40}, pp. 107–127; Hazra also remarks (via later cross-reference) that the earliest Sṛṣṭi-khaṇḍa portions were compiled by Brahmā-worshippers.`,
    status:'Edition-specific chapter numbers matter. The Veṅkaṭeśvara, Ānandāśrama, Bengali and other recensions can differ markedly.',
    bibliography:[H40, ROCHER, 'Padma Purāṇa, Ānandāśrama and Veṅkaṭeśvara editions', 'Studies of Padma Purāṇa tīrtha/vrata literature']
  });

  put('Garuḍa Purāṇa', {
    overview:'The Garuḍa Purāṇa is a Vaiṣṇava encyclopedic Purāṇa whose popular identification with death rites represents only one part of the received work. It includes funerary ritual and preta cosmology, but also dharma, medicine, gems, omens, yoga, mantra, expiation and other technical subjects.',
    period:'Hazra dates the extant Garuḍa roughly 850–1000 CE, most probably the 10th century, while recognizing later accretions.',
    milieu:'Early-medieval Vaiṣṇava encyclopedism and ritual culture.',
    history:'Hazra’s dedicated discussion is Purāṇic Records, pp. 141–145. The text exists in recensional forms, and popular “Preta-khaṇḍa only” editions distort the proportions of the complete Purāṇa.',
    datingBasis:'Quotation history, comparison with other Purāṇas and ritual/technical vocabulary. Hazra explicitly uses the 850–1000 range in later cross-references.',
    chapterMap:['Ācāra/dharma and religious observance.','Medicine, gems, omens and encyclopedic śāstra.','Preta/funerary rites, afterlife and hells.','Yoga, mantra and liberation-oriented material.'],
    hazraNotes:`${H40}, pp. 141–145: classic chronological analysis; Hazra elsewhere summarizes the extant Garuḍa as 850–1000 CE, probably 10th c.`,
    bibliography:[H40, ROCHER, 'Garuḍa Purāṇa Sanskrit editions/English translation', 'B. H. Kapadia, studies of the Garuḍa Purāṇa']
  });

  put('Agni Purāṇa', {
    overview:'The Agni Purāṇa is one of the clearest examples of Purāṇic encyclopedism. Myth and ritual occupy only part of a work that also incorporates temple construction, image-making, iconography, polity, warfare, grammar, lexicography, metrics, poetics, drama, medicine and other technical disciplines.',
    period:'The received encyclopedic redaction is largely early medieval, with older nuclei and later chapters; no single date fits the whole work.',
    milieu:'A Sanskrit knowledge-compendium in Purāṇic narrative form, drawing heavily on specialist śāstra.',
    history:'Hazra devotes Purāṇic Records pp. 134–140 to the Agni and wrote separately on the “genuine Āgneya-Purāṇa.” Specialist studies show that many technical sections summarize or adapt prior śāstric materials.',
    datingBasis:'Borrowings from datable technical literature, quotation history, iconographic/architectural development and linguistic strata.',
    contents:['Avatāra/mythological and ritual sections.','Temple architecture, pratimā-lakṣaṇa and consecration.','Rājadharma, statecraft, warfare and archery.','Vyākaraṇa, kośa, chandas, alaṅkāra and nāṭya.','Āyurveda, veterinary, gemological and other technical chapters.'],
    dependencies:['Many chapters parallel or abbreviate specialist works; the direction of borrowing must be studied section by section rather than assumed for the whole Purāṇa.'],
    hazraNotes:`${H40}, pp. 134–140; see also Hazra, “Studies in the Genuine Āgneya-Purāṇa,” Our Heritage 1.2 (1953).`,
    bibliography:[H40, ROCHER, 'S. D. Gyani, Agni-Purāṇa: A Study (1964)', 'Marie-Thérèse de Mallmann, Les enseignements iconographiques de l’Agni Purāṇa (1963)']
  });

  put('Skanda Purāṇa', {
    overview:'“Skanda Purāṇa” names two related but textually very different realities: an early Skandapurāṇa recoverable from old Nepalese manuscripts and critically edited by Adriaensen, Bakker, Isaacson, Bisschop and Yokochi; and the enormous later khaṇḍa corpus familiar from printed editions. A scholarly entry must keep them separate.',
    period:'The early recoverable Skandapurāṇa belongs before the 9th century and is generally placed around the 6th–7th centuries CE; a very old Nepalese manuscript was copied around the early 9th century. The later khaṇḍas accumulated for centuries afterward.',
    milieu:'Early Śaiva Purāṇic sacred geography and myth, subsequently transformed into a vast network of regional tīrtha-māhātmyas.',
    history:'The modern critical-edition project demonstrated that the Nepalese manuscript tradition preserves an older text not identical with the later seven-khaṇḍa printed Skanda. Treating all printed Skanda material as the “original Purāṇa” is philologically untenable.',
    datingBasis:'Paleography of Nepalese manuscripts; historical geography; internal dynastic/cultic references; stemmatic comparison in the Groningen/Leiden critical edition.',
    chapterMap:['Early critical text: Śiva mythology, origins of sacred centers, Vārāṇasī cycle and early Śaiva geography.','Later printed corpus: Maheśvara, Vaiṣṇava, Brahma, Kāśī, Āvantya, Nāgara, Prabhāsa and numerous regional sub-khaṇḍas depending on edition.'],
    manuscripts:'The critical edition is based on old Nepalese manuscripts; one famous palm-leaf witness is dated around 810/811 CE. Later regional manuscripts represent a much expanded textual history.',
    scholarlyPositions:['R. Adriaensen, H. T. Bakker & H. Isaacson, “Towards a Critical Edition of the Skandapurāṇa,” Indo-Iranian Journal 37 (1994): 325–331.','The Skandapurāṇa critical edition, Groningen Oriental Studies/Brill, explicitly separates the old recension from later printed khaṇḍa corpora.'],
    bibliography:[H40, ROCHER, 'R. Adriaensen, H. T. Bakker & H. Isaacson, The Skandapurāṇa, vol. I (1998)', 'H. T. Bakker & H. Isaacson, vol. IIA (2005)', 'H. T. Bakker, P. C. Bisschop & Y. Yokochi, later critical volumes']
  });

  put('Vāmana Purāṇa', {
    overview:'The received Vāmana Purāṇa is a striking case where title and contents diverge. Vāmana/Trivikrama material is present, but the extant work contains extensive Śaiva mythology, pilgrimage and sacred-geography material. Hazra therefore treats the textual identity of the present work critically rather than assuming that it straightforwardly equals the ancient “Vāmana Mahāpurāṇa” described by catalogues.',
    period:'The received text is composite and largely early medieval; individual layers differ.',
    milieu:'Mixed Purāṇic compilation with strong Śaiva/tīrtha components despite its Vaiṣṇava title.',
    history:'Hazra devotes Purāṇic Records pp. 76–92 to the Vāmana. The mismatch between Purāṇic descriptions of the Vāmana and the present narrator/content is part of his argument about textual replacement/redaction.',
    datingBasis:'Comparison of the received text with Matsya/Skanda catalogue descriptions, sectarian content and ritual/tīrtha strata.',
    scholarlyPositions:[`${H40}, pp. 76–92: detailed analysis of the extant Vāmana and its relation to the catalogue-title.`,`Purāṇa scholarship repeatedly uses Vāmana as a warning against classifying a received text by title alone.`],
    bibliography:[H40, ROCHER, 'Vāmana Purāṇa Sanskrit editions', 'Purāṇa Bulletin studies on the Vāmana Purāṇa']
  });

  put('Brahmavaivarta Purāṇa', {
    overview:'The received Brahmavaivarta is a late, highly transformed Kṛṣṇa-Rādhā and Prakṛti/Goddess Purāṇa divided into Brahma-, Prakṛti-, Gaṇeśa- and Kṛṣṇajanma-khaṇḍas. Its present theology cannot simply be projected back onto an older work of the same title.',
    period:'An older Brahmavaivarta existed in the first millennium, but the dominant received redaction is substantially late medieval, with important 15th–16th-c. features.',
    milieu:'Late-medieval eastern Indian Kṛṣṇa-Rādhā devotional and Goddess/Tantric environment.',
    history:'Hazra’s Purāṇic Records pp. 166–173 treats the work’s chronology; he and later scholars emphasize extensive rewriting. The Prakṛti-khaṇḍa and developed Rādhā theology are especially important for locating the received form.',
    chapterMap:['Brahma-khaṇḍa.','Prakṛti-khaṇḍa: goddesses and cosmic female powers.','Gaṇeśa-khaṇḍa.','Kṛṣṇajanma-khaṇḍa: Kṛṣṇa, Rādhā and devotional mythology.'],
    hazraNotes:`${H40}, pp. 166–173: the classic chronological discussion of the extant redaction.`,
    bibliography:[H40, ROCHER, 'Brahmavaivarta Purāṇa Sanskrit editions', 'Studies of Rādhā-Kṛṣṇa theology and eastern Indian Purāṇic redaction']
  });

  put('Devī Bhāgavata Purāṇa', {
    overview:'The Devī Bhāgavata is a twelve-skandha Śākta Purāṇa that deliberately reworks the Bhāgavata model around Devī/Bhuvaneśvarī as the supreme Brahman and Śakti. It contains cosmology, avatāra-like Goddess manifestations, pilgrimage, vrata, yoga, mantra and the Devī Gītā.',
    period:'Most modern scholarship places the received text around 1000–1200 CE, though individual strata may differ. Hazra argued for roughly the 11th–12th centuries.',
    milieu:'Medieval Sanskrit Śāktism synthesizing Purāṇic bhakti, Vedānta, Tantra and Goddess mythology.',
    history:'The text competes canonically with the Vaiṣṇava Bhāgavata and consciously imitates Bhāgavata architecture. Hazra and later scholars identify borrowings and redactional relationships, including complex relations with Brahmavaivarta material.',
    chapterMap:['12 skandhas in the Bhāgavata manner.','Sk. 1–6: cosmogony, Goddess narratives, dynastic/mythic materials.','Sk. 7.31–40: Devī Gītā—Devī as brahman, yoga, bhakti and knowledge.','Later skandhas: Śākta cosmology, ritual, pilgrimage, mantra and devotional theology.'],
    namedFeatures:['Devī Gītā (7.31–40)','Bhuvaneśvarī theology','Śākta recasting of Bhāgavata cosmology'],
    scholarlyPositions:[`${HU2}, ch. 6.5: Hazra’s extended analysis of the Devī Bhāgavata.`,`C. Mackenzie Brown, The Triumph of the Goddess (1990): canonical models and theological vision of the text.`,`Tracy Pintchman and Brown place the received work broadly in the 11th–12th-c. environment.`],
    bibliography:[HU2, ROCHER, 'C. Mackenzie Brown, The Triumph of the Goddess (1990)', 'C. Mackenzie Brown, The Devī Gītā (1998)', 'Tracy Pintchman, studies of Devī Purāṇic theology']
  });

  put('Mahābhāgavata Purāṇa', {
    overview:'The Mahābhāgavata is a distinct Śākta Purāṇa and must not be confused with the Vaiṣṇava Bhāgavata. It is an 81-chapter Goddess text strongly connected with eastern India/Bengal–Kāmarūpa religious culture and with Durgā/Śākta ritual mythology.',
    period:'Hazra places it before the Bṛhaddharma Purāṇa and in a medieval eastern-Indian setting; later research often places its received form around the 11th–13th centuries, with the exact range debated.',
    milieu:'Śākta eastern India, probably Bengal/eastern Bengal adjacent to Kāmarūpa.',
    history:'Hazra’s vol. II study (Mahābhāgavata, pp. c. 259–283 in his pagination) compares the printed Bombay and Vaṅgavāsī editions and manuscript evidence. He argues that the later Bṛhaddharma borrowed substantial material from it.',
    datingBasis:'Intertextual priority over Bṛhaddharma, eastern regional cult/geography, linguistic and ritual features, and comparison of printed/manuscript recensions.',
    chapterMap:['81 chapters in the received text.','Goddess cosmogony and supremacy.','Śiva–Devī mythic cycles and Durgā-oriented ritual material.','Eastern Indian Śākta customs and sacred geography.'],
    scholarlyPositions:[`${HU2}, ch. 6.4: distinguishes Mahābhāgavata from the Vaiṣṇava Bhāgavata and argues for eastern-Indian provenance.`,`Hazra notes that the text calls itself Purāṇa/Mahāpurāṇa and that Bṛhaddharma includes it among “Mahat Purāṇas.”`],
    bibliography:[HU2, 'Prabir Kumar Nanda Goswami, Mahābhāgavata Purāṇa: Translation and Study', ROCHER]
  });

  put('Sāmba Purāṇa', {
    overview:'The Sāmba Purāṇa is the principal extant Saura Upapurāṇa. Its narrative core explains Sāmba’s disease, his cure through Sūrya worship, the establishment of the Sun cult and the importation of Maga priests; the work then expands into image/temple ritual, mantras, vratas, calendrical observances and later ritual technologies.',
    period:'Hazra argues for 500–800 CE for the earlier Sāmba text, probably toward the earlier part of that interval; he explicitly insists that this is not the date of all chapters.',
    milieu:'Early medieval Sūrya worship, including the Maga/Śākadvīpī priestly tradition and temple/image cult.',
    history:'Hazra divides the received text into two principal strata. The earlier group comprises chs. 1–38, 44–46 and 84; a second group comprises chs. 39–43 and 47–83. His argument uses internal endings, inconsistent lists, borrowings and parallels with Bhaviṣya.',
    datingBasis:'Hazra, Studies in the Upapurāṇas I, Sāmba chapter, esp. the discussion corresponding to printed pp. ~58–121: terminus from Bhaviṣya borrowings, Varāha reference and later citation; internal split at ch. 39.',
    chapterMap:['Early core: Sāmba, Sūrya, disease/cure, Mitravana, Magas, image and temple worship.','Ritual system: solar mantras, installation, daily worship, vratas and gifts.','Later/Uttara material: expanded ritual, Tantric-style nyāsa/mudrā/bīja, abhicāra and related practices.'],
    primaryEvidence:['Sāmba 39.1 and 39.5 are central to Hazra’s argument that a new Uttara portion begins there.'],
    hazraNotes:`${HU1}, ch. 2.2: detailed verse-by-verse stratification; Hazra dates the older Sāmba between 500 and 800 CE and separates chs. 1–38, 44–46, 84 from 39–43, 47–83.`,
    bibliography:[HU1, ROCHER, 'Sāmba Purāṇa Sanskrit editions', 'Studies of Maga/Śākadvīpī Brahmins and Sūrya worship']
  });

  put('Viṣṇudharma Purāṇa', {
    overview:'The Viṣṇudharma is an early, extensive Vaiṣṇava Dharma text of more than 4,000 verses in roughly 105 chapters. It is less a narrative Purāṇa than a religious manual: vrata, dāna, tīrtha, worship, image-cult, ethical/dharmic rules, Vaiṣṇava myths and yoga are organized as authoritative practice.',
    period:'Hazra argues for an early core around the 2nd–4th centuries CE, while identifying later interpolations; the precise dating of individual chapters differs.',
    milieu:'Early Vaiṣṇava Dharma and image-worship culture confronting rival religious movements and elaborating bhakti/ritual within a Brahmanical frame.',
    history:'Hazra notes that the work itself does not simply call itself an Upapurāṇa; later authorities variously treat it as śāstra, Smṛti, Purāṇa-like authority or Purāṇa. Its literary classification changed over time.',
    datingBasis:'Quotation by early Dharma authors, antiquity of ritual forms, sectarian history, and identification of later insertions such as parts of the Buddha-avatāra material.',
    chapterMap:['Dharma and Vaiṣṇava ritual.','Vratas and gifts.','Tīrthas and sacred observance.','Image worship and devotion to Viṣṇu.','Yoga and liberation.','Mythic exempla supporting religious practice.'],
    primaryEvidence:['Hazra identifies part of ch. 66 (Buddha-avatāra material) as later/spurious and treats other chapters as secondary additions.','Later Dharma compilers quote complete or partial chapters from Viṣṇudharma, providing external textual witnesses.'],
    hazraNotes:`${HU1}, ch. 3.2 (begins around printed p. 118): one of Hazra’s fullest demonstrations that an Upapurāṇa-classified work can be earlier than many Mahāpurāṇas.`,
    bibliography:[HU1, ROCHER, 'Viṣṇudharma manuscripts/editions', 'Studies of early Vaiṣṇava Dharma and image worship']
  });

  put('Viṣṇudharmottara Purāṇa', {
    overview:'The Viṣṇudharmottara is a three-khaṇḍa encyclopedic work extending Vaiṣṇava Dharma into cosmology, astronomy, omens, royal science and the arts. Its third khaṇḍa is famous for the interdependence of arts culminating in the Citrasūtra on painting.',
    period:'Hazra places the principal work before c. 600 CE and argues that Bhāmaha and Daṇḍin knew it; later additions are present. Modern art-historical scholarship treats the text as layered.',
    milieu:'Early classical/Gupta–post-Gupta encyclopedic Vaiṣṇava Dharma culture in which ritual, kingship and arts form one knowledge system.',
    history:'The work’s literary status is unstable in tradition: manuscripts and later authors attach it to Viṣṇu, Padma or Garuḍa, or treat it simply as authoritative śāstra/tantra. Hazra uses this instability to argue that it was not originally conceived as an ordinary Purāṇa.',
    datingBasis:'Knowledge by Bhāmaha/Daṇḍin; architectural vocabulary; astronomical history; quotation and manuscript evidence. Hazra notes that its temple chapters do not use the mature Nāgara/Drāviḍa/Vesara tripartition.',
    chapterMap:['Khaṇḍa I: myths, cosmology, geography, chronology and religious instruction.','Khaṇḍa II: royal/dharmic and ritual subjects, omens, calendrics and sciences.','Khaṇḍa III: grammar/metrics, music, dance/drama, iconography, architecture and painting; Citrasūtra commonly chs. 35–43 in the third khaṇḍa.'],
    namedFeatures:['Citrasūtra','Interdependence of song → instrumental music → dance → painting','Temple architecture chapters III.86–95 in Hazra’s discussion'],
    hazraNotes:`${HU1}, ch. 3.3; Hazra uses literary borrowing and technical history to argue for an early date and later accretions.`,
    bibliography:[HU1, ROCHER, 'Priyabala Shah, Viṣṇudharmottara-Purāṇa studies/editions', 'Stella Kramrisch and later scholarship on the Citrasūtra']
  });

  put('Nṛsiṃha Purāṇa', {
    overview:'The extant Nṛsiṃha Purāṇa is an old Vaiṣṇava Upapurāṇa, not merely one Nṛsiṃha myth. It begins with sages at Prayāga and includes cosmology, dynastic/mythic material, avatāra narratives, dharma and extensive Vaiṣṇava religious instruction.',
    period:'Hazra regards it as one of the oldest and most important extant Vaiṣṇava Upapurāṇas; major core strata belong to the first millennium CE well before many later Upapurāṇas.',
    milieu:'Early Vaiṣṇava Purāṇic-Dharma culture with Nṛsiṃha as a central but not exclusive focus.',
    history:'Hazra’s chapter distinguishes the extant Nṛsiṃha from the lost/quoted Bṛhannṛsiṃha and from other similarly named works. This distinction matters because later compilers sometimes conflate quotations.',
    datingBasis:'Citation history, relations to other Purāṇas, ritual forms and the separate history of the Bṛhannṛsiṃha title.',
    primaryEvidence:['Opening Prayāga frame in the extant text.','Hazra documents Nṛsiṃha-caturdaśī verses attributed to a distinct Bṛhannṛsiṃha that are absent from the present Nṛsiṃha text.'],
    hazraNotes:`${HU1}, ch. 3.4, beginning around printed p. 219: extensive textual and chronological analysis.`,
    bibliography:[HU1, ROCHER, 'Nṛsiṃha Purāṇa printed Sanskrit edition', 'Studies of Nṛsiṃha cult and Purāṇic literature']
  });

  put('Kālikā Purāṇa', {
    overview:'The extant Kālikā Purāṇa is a major Śākta text centered on Kāmarūpa/Kāmākhyā, Goddess theology, Śiva-Śakti mythology, sacred geography, bali, vrata and Tantric-inflected ritual. It is one of the most important textual witnesses to the formation of the Kāmākhyā cult.',
    period:'Usually placed around the 10th–11th centuries CE for its principal redaction, with recensional variation and possible later material.',
    milieu:'Kāmarūpa/Assamese Śākta religious culture, strongly tied to Kāmākhyā and regional sacred geography.',
    history:'Hazra distinguishes the present Kālikā from an earlier lost Kālikā title. The Veṅkaṭeśvara 93-chapter and Vaṅgavāsī 90-chapter editions are substantially the same work but differ in chapter division.',
    datingBasis:'Regional geography, developed Śākta/Tantric ritual, political-cultural context of Kāmarūpa, citation history and edition comparison.',
    chapterMap:['Goddess cosmology and mythology.','Kāmākhyā/Kāmarūpa sacred geography.','Animal sacrifice/bali and ritual prescriptions.','Vratas, mantra and Śākta-Tantric practice.','Myths of Śiva, Satī, Devī and regional cults.'],
    manuscripts:'Hazra compares the major printed recensions and notes differences in chapter division; the text must also be distinguished from the lost Kālikā cited in older lists.',
    hazraNotes:`${HU2}, ch. 6.3: full study of the extant Kālikā; ${HU2}, ch. 8.3: separate notice of an earlier lost Kālikā.`,
    bibliography:[HU2, ROCHER, 'Kālikā Purāṇa Sanskrit editions', 'Bani Kanta Kakati, The Mother Goddess Kāmākhyā', 'Modern studies of Kāmarūpa Śāktism']
  });

  put('Bṛhaddharma Purāṇa', {
    overview:'The Bṛhaddharma Purāṇa is a late medieval eastern-Indian Purāṇa of exceptional value for the social and ritual history of Bengal. It combines Goddess devotion, Gaṅgā and tīrtha material, caste/social classification, food rules, Durgā-pūjā and a distinctive Purāṇic catalogue.',
    period:'Hazra places the extant work in the latter half of the 13th century CE, with possible later additions.',
    milieu:'Medieval Bengal, probably eastern Bengal; the text reflects regional customs and a religious world closely connected with Kāmarūpa and Bengali Śākta practice.',
    history:'Hazra compares the Vaṅgavāsī Bengali-script edition, the Asiatic Society edition and manuscript evidence. The two printed editions do not always agree. The work borrows from the Mahābhāgavata and thus helps establish relative chronology.',
    datingBasis:'Bengal-specific social custom, Durgā-pūjā practice, textual dependence on Mahābhāgavata, regional geography and comparison of manuscripts/editions.',
    contents:['Dharma and ritual in a Bengali setting.','Durgā worship and regional festival practice.','Gaṅgā and sacred geography.','Food rules including regional fish regulations.','A large caste/social classification scheme.','Purāṇa/Upapurāṇa catalogues preserving unusual titles.'],
    primaryEvidence:['Hazra highlights Bṛhaddharma III.5.44–46 on fish for Brahmins under restrictions.','The text’s Purāṇa list is crucial for the Mahābhāgavata and several Nandīśvara-type titles.'],
    hazraNotes:`${HU2}, ch. 7.3: detailed philological/social-historical analysis of the two editions and Bengali customs.`,
    bibliography:[HU2, ROCHER, 'Bṛhaddharma Purāṇa, Vaṅgavāsī and Asiatic Society editions', 'Studies of medieval Bengal Dharma and Durgā-pūjā']
  });

  put('Saura Purāṇa', {
    overview:'Despite its title and Sūrya as narrator, the extant Saura Purāṇa is predominantly Śaiva/Pāśupata. It is therefore a textbook example of why sectarian classification cannot be inferred from title alone.',
    period:'Hazra and later study place the principal extant work broadly c. 950–1200 CE, with later additions.',
    milieu:'North-Indian medieval Śaiva/Pāśupata culture using a Saura narrative frame.',
    history:'The received text has 69 chapters in the common edition and shows disturbed order and later accretions. It must also be distinguished from lost Saura/Sauradharma titles in older lists.',
    contents:['Śiva theology and Pāśupata-oriented devotion.','Ritual and vrata.','Sacred geography and religious observance.','Sūrya as transmitting frame rather than theological center.'],
    hazraNotes:`${HU1} treats the Saura corpus; later analytical studies build on Hazra’s dating and textual observations.`,
    bibliography:[HU1, ROCHER, 'W. Jahn, Das Saurapurāṇam', 'Analytical studies of the Saura Purāṇa']
  });

  put('Bṛhannandīśvara Purāṇa', {
    overview:'Bṛhannandīśvara is not securely extant as one complete Purāṇa. Its scholarly importance lies in a large body of quotations—especially in Bengali ritual digests—preserving material on Durgā-pūjā and calendrical observance.',
    period:'Earlier than the late-medieval Bengali Nibandhas that quote it; Hazra reconstructs its relative chronology from those citations rather than assigning a fictive author-date.',
    milieu:'Śākta/Śaiva ritual culture with particularly important reception in Bengal.',
    history:'Hazra distinguishes Bṛhannandīśvara from Nandīśvara/Nandikeśvara. The title occurs in Bṛhaddharma and Ekāmra lists; surviving verses are dispersed in later works, so reconstruction is citation-based.',
    contents:['Nava-patrikā and Saptamī observance in Durgā-pūjā.','Mahāsnāna and Aṣṭamī rites.','Music, dance, homa and bali in the festival sequence.','Calendrical and ritual prescriptions preserved by later digest writers.'],
    manuscripts:'No single critically established continuous text; evidence is catalogue + quotation + manuscript notices.',
    hazraNotes:`${HU2}, ch. 8.2: reconstructs the work from lists and quotations rather than treating it as an extant book.`,
    bibliography:[HU2, 'Raghunandana and other Bengali Dharma/ritual digests quoting Bṛhannandīśvara', 'Sanskrit manuscript catalogues']
  });

  put('Nandīśvara Purāṇa', {
    overview:'Nandīśvara/Nandikeśvara/Nandikeśa is a lost or fragmentarily recoverable Purāṇa-title distinct from Bṛhannandīśvara. Its surviving profile is reconstructed from catalogue attestations and quotations in Dharma/ritual compilations.',
    period:'Hazra argues that it cannot be very early and places it before the later works that quote it; the safest chronology is relative, not a precise year.',
    history:'Bṛhaddharma manuscripts vary among Nandīśvara, Nandikeśvara and Nandikeśa. Later Nibandhas quote verses under these names, giving a scattered textual afterlife.',
    contents:['Ritual/calendrical prescriptions known from later quotations.','Durgā-pūjā and other observance material in the Bengali reception.'],
    hazraNotes:`${HU2}, ch. 8.4: traces variant names, Purāṇic lists and quotations in Samvatsara-pradīpa, Nirṇaya-sindhu, Ācāra-mayūkha, Vīramitrodaya, Raghunandana and others.`,
    bibliography:[HU2, 'Bengali and pan-Indian Dharma-Nibandhas quoting Nandīśvara', 'Sanskrit manuscript catalogues']
  });

  // Evidence-only dossiers for catalogue titles whose exact continuous text is not securely recoverable.
  const evidenceOnly = {
    'Daurvāsasa Purāṇa':'Hazra devotes a separate notice (Upapurāṇas I, ch. 5.11) to the Daurvāsasa/Durvāsasokta title, which is widely attested in Upapurāṇa lists but not securely represented by one extant continuous text.',
    'Auśanasa Purāṇa':'Hazra, Upapurāṇas II, ch. 9.4, collects the list-attestations and surviving evidence for the Auśanasa title; a complete original text cannot simply be assumed from later similarly named literature.',
    'Another Nāradīya Purāṇa':'The Padma list explicitly says “another Nāradīya”; a scholarly catalogue must preserve that distinction rather than identify it automatically with the extant Nāradīya Mahāpurāṇa.',
    'Another Brahmāṇḍa Purāṇa':'The Padma list explicitly marks another Brahmāṇḍa; this is evidence for a distinct catalogue-title or recension and must not automatically make the extant Mahāpurāṇa “Both.”',
    'Ādya / Sanatkumāra Purāṇa':'The title occurs in Upapurāṇa catalogues with variant forms; its identity has to be established from manuscripts/quotations rather than normalized into a famous extant Purāṇa.',
    'Sanatkumāra Purāṇa':'Widely attested as an Upapurāṇa title, but the relationship among texts circulating under Sanatkumāra names is complex and cannot be reduced to one secure continuous recension.',
    'Āṇḍa Purāṇa':'A catalogue form in the Padma tradition; exact identification is uncertain and should remain an evidence dossier rather than an invented content summary.',
    'Kapila Purāṇa':'A Kapila Purāṇa/Upapurāṇa tradition is attested, but the identity and recensional history of extant/quoted Kapila material require separate manuscript study.',
    'Mānava Purāṇa':'A catalogue title; it must not be silently equated with Manu Smṛti or other Mānava literature.',
    'Varuṇa Purāṇa':'Known from Upapurāṇa lists and manuscript/quotation evidence; the exact text behind each citation is not sufficiently stable for a synthetic chapter summary without a chosen recension.',
    'Parāśara Purāṇa':'A Purāṇic title distinct from the Parāśara Smṛti; extant and quoted materials require recension-specific treatment.',
    'Bhārgava Purāṇa':'Catalogue and quotation evidence attest the title; a complete, critically secure archetype is not available.',
    'Mārīca Purāṇa':'Catalogue-attested Upapurāṇa title with uncertain continuous textual survival.',
    'Kaumāra Purāṇa':'Catalogue title associated with Kumāra/Skanda traditions; exact relation to Skanda and other Kaumāra texts is not securely fixed.',
    'Āditya Purāṇa':'Hazra, Upapurāṇas II, ch. 9.2, treats this as a lost/fragmentarily recoverable title; quotations and catalogues are the primary evidence.',
    'Kriyāyogasāra Purāṇa':'Hazra, Upapurāṇas I, ch. 4.2, treats Kriyāyogasāra as a distinct Vaiṣṇava Upapurāṇic work; its textual identity should be based on that evidence rather than inferred from title alone.',
    'Bṛhannāradīya Purāṇa':'A distinct Nārada-associated text treated by Hazra (Upapurāṇas I, ch. 4.6); it must be separated from Nāradīya Mahāpurāṇa and the Padma list’s “another Nāradīya.”',
    'Śivadharma Purāṇa':'The Śivadharma textual corpus is an early Śaiva Dharma tradition with a complex manuscript history; its relation to a single “Śivadharma Purāṇa” catalogue-title must be handled through the critical Śivadharma corpus rather than a generic Purāṇa synopsis.',
    'Māheśvara Purāṇa':'Catalogue-attested Śaiva Upapurāṇa title; exact textual identity varies across citations and manuscripts.',
    'Māheśa Purāṇa':'Padma-list form that should not automatically be collapsed into Māheśvara without textual evidence.',
    'Nandikṛta Purāṇa':'Devī Bhāgavata’s list preserves a Nandi/Nanda-associated title; its relation to Nandīśvara, Nandikeśvara and Bṛhannandīśvara requires manuscript-level distinction.',
    'Dharma Purāṇa':'Bṛhaddharma’s catalogue preserves this title; a secure continuous text matching it is not established.',
    'Vāsiṣṭha Purāṇa':'Catalogue-attested title distinct from Vasiṣṭha Dharma literature; exact Purāṇic text remains uncertain.'
  };
  Object.entries(evidenceOnly).forEach(([name,note])=>put(name,{
    overview:`${name} is best treated as a text-critical evidence problem rather than as a safely reconstructable continuous Purāṇa.`,
    history:note,
    period:'No defensible single date can be assigned without first identifying the exact recension or quotation-corpus behind the title.',
    chapterMap:['No chapter map is supplied because a continuous critically established recension of this exact title is not securely available.'],
    manuscripts:'Evidence comes from Purāṇic catalogues, manuscript catalogues, quotations in Dharma/Nibandha literature, or partial/variant texts.',
    scholarlyPositions:['Hazra’s method is to distinguish catalogue-attestation from identification of an extant text; similarly named titles are not automatically identical.'],
    bibliography:[HU1, HU2, ROCHER, 'Relevant Sanskrit manuscript catalogues and quotation sources']
  }));
})();