(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const H='R. C. Hazra, Studies in the Upapurāṇas';
  const HR='R. C. Hazra, Studies in the Purāṇic Records on Hindu Rites and Customs';
  const R='Ludo Rocher, The Purāṇas';
  const patch=(name,extra)=>{const base=D[`Purāṇa:${name}`]||D[name]||{};D[`Purāṇa:${name}`]=Object.assign({},base,extra,{sources:[...new Set([...(base.sources||[]),...(extra.sources||[])])]});};
  const catalogue=(name,note,refs=[])=>patch(name,{
    overview:`${name} is securely a Purāṇic catalogue-title in the śāstric witnesses attached to this card, but the evidence does not justify pretending that one complete, critically established surviving book can simply be opened under this exact title.`,
    history:note,
    chapterMap:['No responsible chapter-by-chapter synopsis is supplied unless a continuous recension of this exact title can be securely identified.','The useful evidence is therefore the history of the title: catalogues, manuscript notices, quoted verses and attempts to identify it with other Purāṇic works.'],
    manuscripts:'Manuscript survival is fragmentary, ambiguous, or tied to texts whose exact identity with the catalogue-title remains disputed.',
    hazraNotes:'Hazra treats such names by separating the evidence of Purāṇic catalogues from later identifications. This prevents a title in an Upapurāṇa list from being automatically equated with a better-known Mahāpurāṇa or similarly named work.',
    status:'Textual identity uncertain or incompletely recoverable. Classification-attestation is firmer than a full contents reconstruction.',
    primaryEvidence:refs,
    sources:[H,R,'New Catalogus Catalogorum / Sanskrit manuscript catalogues where applicable']
  });

  patch('Sāmba Purāṇa',{
    period:'Hazra dates the present Sāmba Purāṇa between about 500 and 800 CE, and considers it likely to belong toward the earlier part of that range. He separately dates several later/interpolated chapters.',
    milieu:'An early medieval Saura environment centered on Sūrya worship, with strong interest in image worship, temple ritual and the Maga/Śākadvīpī priestly tradition.',
    history:'The text is not one chronological block. Hazra distinguishes an older body (especially chs. 1–38, 44–46 and 84) from a later Jñānottara-type stratum (chs. 39–43 and 47–83), and argues that still other chapters are interpolations. The transmitted chapter count varies because manuscripts divide the same material differently.',
    datingBasis:'Its presence in early Upapurāṇa lists, parallels with Bhaviṣya/other Purāṇas, the development of Saura image-cult, and the relative age of the ritual/Tantric material are used to establish successive layers.',
    chapterMap:['Chs. 1–several early chapters: Sūrya theology and the frame of Sūta speaking to the sages.','Sāmba cycle: Nārada/Kṛṣṇa curse, Sāmba’s leprosy, journey to Mitravana on the Candrabhāgā, worship of the Sun and cure.','Solar cult chapters: installation and characteristics of Sūrya images, temple building, ritual offerings and the role/origin of Maga priests.','Vrata/dāna material: especially Saptamī observances, fasts, gifts and solar calendrical religion.','Chs. 39–43 and 47–83 (Hazra’s later group): nyāsa, mudrā, bīja-mantra, initiation, abhicāra, sannyāsa and yoga.','Ch. 84: karmavipāka/conclusion and rewards connected with hearing/reciting the text.'],
    contents:['Sāmba’s disease-and-cure narrative at the Sun shrine of Mitravana/Candrabhāgā.','The twelve Ādityas and solar cosmology.','Rules for constructing Sūrya images from different materials and building temples.','Maga/Śākadvīpī Brahmins as solar priests.','Daily and festival worship of Sūrya, flowers, lamps, bathing and offerings.','Saptamī vratas and religious gifts.','Six ritual acts such as vaśīkaraṇa, ākarṣaṇa, māraṇa, uccāṭana, vidveṣaṇa and stambhana in later ritual strata.','Nyāsa, mudrā, bīja, initiation, yoga and ascetic material in later chapters.'],
    namedFeatures:['Sāmba’s leprosy and healing by Sūrya','Mitravana/Candrabhāgā','Maga priests','Saptamī worship','Jñānottara stratum','Ṣaṭkarman ritual'],
    ritualHistory:'The book is exceptionally valuable for the institutional history of Indian Sun worship: it links mythic legitimation of Sāmba’s cult with temples, images, a distinctive priesthood, calendrical vratas and increasingly mantra/Tantra-shaped ritual technology.',
    dependencies:['Close parallels and shared verses with Bhaviṣya/Bhaviṣyottara materials.','Hazra compares passages with Varāha, Brahma and Skanda traditions when separating early and late material.'],
    manuscripts:'Printed editions often have 84 chapters, while manuscripts may show roughly 70, 75, 83 or similar totals because sections are split/combined differently. Hazra therefore reconstructs strata by content and manuscript comparison, not chapter count alone.',
    hazraNotes:'Hazra’s key point is that “the date of the Sāmba Purāṇa” cannot be one date for every chapter. His 500–800 CE range applies to the work’s formation, while the ritual/Tantric Jñānottara material and several interpolations are later.',
    primaryEvidence:['Sāmba Purāṇa: Sāmba–Sūrya narrative and solar-image/temple chapters','Hazra, Studies in the Upapurāṇas, Sāmba Purāṇa study, especially his chapter-grouping and dating discussion'],
    reception:'A primary textual source for the history of Saura religion, especially the Sāmba myth, Maga priests and formal Sūrya image-cult.',
    sources:[H,HR,R,'Sāmba Purāṇa Sanskrit editions']
  });

  patch('Viṣṇudharma Purāṇa',{
    period:'Hazra places the Viṣṇudharma around 200–300 CE and argues that it had become a respected Dharma authority by the beginning of the 5th century.',
    milieu:'Early Vaiṣṇava Dharma and image-worship culture before the heavy absorption of later Tantric ritual. It combines Purāṇic narrative, Dharma prescriptions, vrata/dāna, icon worship and yoga.',
    history:'The text is structured through multiple embedded dialogues rather than one continuous story. Hazra regards it as early and emphasizes that it is free from developed Tantric features. Some chapters shared with Bhaviṣyottara have complicated direction-of-borrowing; not every chapter is necessarily the same age.',
    datingBasis:'Early nakṣatra order beginning with Kṛttikā, absence of later Tantric features, the texts it knows, and its established authority by the early 5th century are central to Hazra’s dating.',
    chapterMap:['Early chapters: kings and sages are directed toward Vaiṣṇava kriyā-yoga and devotional discipline.','Prahlāda/Śukra material: qualities of Bhagavatas, image worship, temple construction, songs, hymns and instruments in Viṣṇu worship.','Chs. 43–63: Kṛṣṇa–Yudhiṣṭhira dialogue sequence.','Chs. 76–81: Prahlāda on Viṣṇu’s powers, cakra and Vaiṣṇava kriyā-yoga; advice to Bali.','Chs. 83–91: vows and religious gifts connected with Vasiṣṭha/Māndhātṛ material.','Chs. 95–96: Viṣṇu as brahman/source and cosmological manifestation without change.','Chs. 97–100: para/apara yoga, yama, niyama, āsana, prāṇāyāma, dhāraṇā, dhyāna and samādhi.','Chs. 101–104: varṇa/āśrama duties, advaita-like knowledge, Viṣṇu’s supreme form, yugas and Kalkin.'],
    contents:['Bhagavata identity defined by Veda-respect, ahiṃsā, devotion and service to Viṣṇu.','Viṣṇu temples and images in gold, silver, copper, brass, stone, wood, earth or painting.','Specific vratas including Vikrama, Viṣṇu-pada-traya, Śuddhi and Kṛṣṇāṣṭamī/Devakī vrata.','Religious gifts such as go-dāna, tila-dhenu, ghṛta-dhenu and jala-dhenu.','Kriyā-yoga as external devotional practice and jñāna-yoga/para-yoga as inner realization.','Detailed aṣṭāṅga-like yogic disciplines culminating in samādhi.','Dharma, caste/order duties, karma, rebirth, Kali-yuga and Kalkin.'],
    namedFeatures:['Prahlāda as Vaiṣṇava teacher','Kriyā-yoga versus jñāna-yoga','Viṣṇu image construction','Vikramavrata / Viṣṇupadatrayavrata','Yoga chs. 97–100'],
    ritualHistory:'It documents an early stage in which Vaiṣṇava image worship and temple construction are fully legitimate Dharma, yet the text still lacks the elaborate later Tantric ritual systems found in medieval Purāṇas.',
    dependencies:['Many chapters parallel Bhaviṣyottara; Hazra examines case-by-case whether Viṣṇudharma is source or borrower.','It knows early Dharma literature and the Bhagavad Gītā-type synthesis of selfless action, devotion and knowledge.'],
    manuscripts:'Hazra worked from several Sanskrit manuscripts because the work was not uniformly available in reliable print; his chapter descriptions often cite folio numbers and variant witnesses.',
    hazraNotes:'Hazra treats Viṣṇudharma as one of the earliest major Vaiṣṇava Upapurāṇas and a historical bridge between Dharmaśāstra and full Purāṇic devotional religion.',
    primaryEvidence:['Viṣṇudharma chs. 75, 99: temple/image construction','Chs. 83–91: vratas and dānas','Chs. 97–100: yoga','Ch. 101: universal and varṇa/āśrama duties','Hazra, Studies in the Upapurāṇas, Viṣṇudharma study'],
    sources:[H,HR,R,'Viṣṇudharma Sanskrit manuscripts/editions']
  });

  patch('Viṣṇudharmottara Purāṇa',{
    period:'Hazra places the Viṣṇudharmottara broadly in 400–500 CE; other specialists have proposed related Gupta/early post-Gupta dates for important strata, especially the famous third khaṇḍa.',
    milieu:'A Gupta-age or early post-Gupta Vaiṣṇava encyclopedic Dharma/Purāṇa culture in which religion, statecraft, ritual, iconography and fine arts are treated as interconnected sciences.',
    history:'The work expands the Viṣṇudharma-type world into a huge encyclopedia. Hazra tracks material borrowed from or shared with Viṣṇudharma and later parallels. The received text is divided into three khaṇḍas and circulated widely across India and Nepal in several scripts.',
    datingBasis:'Citation history, relationship to Viṣṇudharma, political/cultural vocabulary, iconographic and astronomical material, and manuscript evidence are all used; dates differ somewhat by section.',
    chapterMap:['Khaṇḍa I: extensive legends, cosmology, geography, genealogies, Purūravas–Urvāśī cycle, śrāddha and Dharma material.','Khaṇḍa II: statecraft, omens, warfare and royal/ritual knowledge alongside religious material.','Khaṇḍa III ch. 1: image-making and the interdependence of arts.','Khaṇḍa III chs. 2–17: grammar, lexicography, metrics and rhetoric.','Khaṇḍa III chs. 18–19: vocal and instrumental music.','Khaṇḍa III chs. 20–34: dance and dramaturgy.','Khaṇḍa III chs. 35–43: Citrasūtra—painting, body proportions, wall preparation, pigments, iconographic representation, landscapes and rasa.','Later third-khaṇḍa chapters: image/icon construction, temple and ritual topics.'],
    contents:['Purūravas and Urvaśī narrative cycle.','Origin and detailed performance of śrāddha, including time, place, recipients and offerings.','Royal duties, warfare, omens and practical sciences.','Theory of music, instruments, dance, acting and rasa.','Painting: wall preparation, pigments, proportions, types of painting, representation of gods/humans/nature and emotional rasas.','Sculpture, iconography and temple/image worship.'],
    namedFeatures:['Purūravas–Urvāśī cycle','Citrasūtra chs. III.35–43','Interdependence of song → instruments → dance → painting','Śrāddha chapters','Royal/warfare encyclopedic material'],
    ritualHistory:'The text is a major witness to the Purāṇic absorption of specialist śāstras. Religious image worship is embedded in a total theory of arts: one must understand music to understand dance, and dance to understand painting.',
    dependencies:['Hazra identifies chapters dependent on/parallel to Viṣṇudharma.','The third khaṇḍa engages the technical worlds of Nāṭya, chandas, alaṃkāra, music, iconography and painting rather than inventing those disciplines ex nihilo.'],
    manuscripts:'The three-khaṇḍa text has a wide manuscript distribution in Devanāgarī, Śāradā, Bengali and Newari traditions; section/chapter numbering can vary across editions.',
    hazraNotes:'For Hazra the Viṣṇudharmottara is not merely a “book on painting.” Its arts chapters are only one part of a vast Dharma-Purāṇa encyclopedia whose earlier sections are equally important for ritual and social history.',
    primaryEvidence:['Viṣṇudharmottara III.1–43: interdependence of arts, music, dance and Citrasūtra','Khaṇḍa I śrāddha and Purūravas–Urvāśī sequences','Hazra, Studies in the Upapurāṇas, Viṣṇudharmottara study'],
    reception:'Its third-khaṇḍa Citrasūtra is one of the most important Sanskrit sources for premodern Indian painting theory, while the whole work remains a major encyclopedia of religious culture.',
    sources:[H,R,'Priyabala Shah / Stella Kramrisch studies and translations of the Viṣṇudharmottara','Viṣṇudharmottara Sanskrit editions']
  });

  patch('Nṛsiṃha Purāṇa',{
    period:'Hazra dates the present Nṛsiṃha Purāṇa to about 400–500 CE, probably toward the latter half of the 5th century, while recognizing later interpolated material.',
    milieu:'Early Vaiṣṇava Purāṇic culture in which older genealogy/cosmology coexists with Bhagavata, Pāñcarātra and ritual strands.',
    history:'Hazra treats it as one of the oldest important extant Vaiṣṇava Upapurāṇas. The work itself claims the classical five Purāṇic characteristics, but manuscript comparison shows that several narrative and sectarian blocks are later additions or expansions.',
    datingBasis:'Its dynastic/genealogical material, relative age of Bhagavata and Pāñcarātra passages, citation history and manuscript variation are used to separate strata.',
    chapterMap:['Chs. 7–12: Kṛṣṇa/Bhāgavata-colored material including the twelve-syllable Vāsudeva mantra.','Chs. 13–18: a stronger Pāñcarātra stamp, including the eight-syllable Nārāyaṇa mantra.','Chs. 22–23: solar and lunar genealogies.','Ch. 24: manvantaras.','Chs. 25–29: dynastic history.','Ch. 30: geography of the earth.','Chs. 57–60: varṇāśrama-dharma.','Ch. 61: yoga.','Ch. 62: Vedic mode of Viṣṇu worship.','Ch. 63: popular/devotional mode of worship.'],
    contents:['Nṛsiṃha/Viṣṇu theology and avatāra material.','Vāsudeva and Nārāyaṇa mantras representing distinguishable devotional strata.','Genealogies, manvantaras and earth-geography.','Varṇa and āśrama duties.','Yoga and two styles of Viṣṇu worship.','Hymns including Āditya-name traditions and other devotional material.'],
    namedFeatures:['Oṃ namo bhagavate vāsudevāya','Oṃ namo nārāyaṇāya','Genealogical chs. 22–29','Yoga ch. 61','Viṣṇu worship chs. 62–63'],
    dependencies:['Different blocks show affinities with Bhagavata/Vāsudeva and Pāñcarātra traditions rather than one homogeneous theological vocabulary.'],
    manuscripts:'Hazra compares manuscripts to identify stories/chapters absent in some witnesses and therefore likely secondary.',
    hazraNotes:'The crucial point is stratification: Nṛsiṃha is early as a Purāṇic work, but its Bhagavata and Pāñcarātra blocks do not all belong to one moment.',
    primaryEvidence:['Nṛsiṃha Purāṇa chs. 22–30, 57–63','Hazra, Studies in the Upapurāṇas, Nṛsiṃha Purāṇa study'],
    sources:[H,R,'Nṛsiṃha Purāṇa Sanskrit editions']
  });

  patch('Kriyāyogasāra Purāṇa',{
    period:'Earlier than the Bṛhaddharma Purāṇa’s 13th-century catalogue and known from manuscripts; Hazra places it in medieval Bengal and treats it as an independent work later attached to the Padma Purāṇa for authority.',
    milieu:'Vaiṣṇava devotional culture of Bengal, especially a Kali-yuga setting in which kriyā-yoga means concrete acts of Hari-bhakti rather than merely abstract meditation.',
    history:'The work generally circulates in about 25 chapters. It was transmitted independently but was also attached to Padma-Purāṇa collections, illustrating how smaller Purāṇic works could seek Mahāpurāṇa authority through textual incorporation.',
    chapterMap:['Ch. 1: frame and praise of kriyā-yoga/Hari devotion in Kali.','Ch. 2: creation—Mahāviṣṇu, Brahmā/Viṣṇu/Rudra, Ādyā Prakṛti as Brāhmī/Lakṣmī/Ambikā, and geography.','Subsequent chapters: practical Vaiṣṇava religious acts, tīrtha/vrata/dāna and devotional observance rather than one continuous mythic narrative.'],
    contents:['Hari-bhakti expressed through ritual action in Kali-yuga.','Creation theology joining Mahāviṣṇu and triadic goddess powers.','Sacred geography, tīrthas, vratas and gifts.','Polemic against pāṣaṇḍa/anti-orthodox groups in a specifically medieval eastern Indian setting.'],
    manuscripts:'Hazra cites independent manuscripts, including a dated manuscript, while also noting its later attachment to Padma-Purāṇa transmission.',
    hazraNotes:'For Hazra its independence matters: “Kriyāyogasāra” should not simply be described as a chapter of Padma Purāṇa because its manuscript and catalogue history show a separate Upapurāṇic identity.',
    primaryEvidence:['Kriyāyogasāra chs. 1–2','Bṛhaddharma Purāṇa’s Upapurāṇa catalogue','Hazra, Studies in the Upapurāṇas, Kriyāyogasāra study'],
    sources:[H,R,'Kriyāyogasāra manuscripts/printed appendices']
  });

  patch('Ādi Purāṇa',{
    period:'The surviving medieval Vaiṣṇava Ādi Purāṇa is later than the early catalogue-name and has a complicated relationship to other Kṛṣṇa Purāṇas; its exact date is debated.',
    milieu:'Medieval Kṛṣṇa-bhakti, with strong interest in Kṛṣṇa’s līlā, aesthetic categories and nāma devotion.',
    history:'Hazra distinguishes the extant Ādi Purāṇa from an older lost work under the same title. Manuscripts vary around 51–52 chapters; one printed form with only 29 chapters has secondary opening material. Its Kṛṣṇa narratives show literary interaction with Brahmavaivarta-type traditions.',
    chapterMap:['Large early/middle portion: Kṛṣṇa birth and exploits.','Ch. 32: Dhenuka’s previous-birth story.','Ch. 39: rāsa-krīḍā-vilāsa.','Chs. 42–44: classification of nāyakas and nāyikās in an explicitly aestheticized bhakti world.','Ch. 45: nāma-māhātmya, praise of the divine name.','Later chapters: further Kṛṣṇa narratives and devotional instruction.'],
    contents:['Kṛṣṇa’s Vraja and later exploits.','Rāsa-līlā elaboration.','Aesthetic taxonomy of lovers (nāyaka/nāyikā).','Glorification of Kṛṣṇa’s name.','Stories with parallels in later Kṛṣṇa Purāṇic literature.'],
    dependencies:['Strong parallels/interactions with Brahmavaivarta Kṛṣṇa material; the direction and age of borrowing must be assessed passage by passage.'],
    manuscripts:'Hazra notes manuscripts of roughly 51–52 chapters and criticizes the much shorter printed recension for secondary additions/omissions.',
    hazraNotes:'The name “Ādi Purāṇa” is historically slippery: catalogue evidence for an older title does not automatically prove that the surviving Kṛṣṇa-centered medieval text is identical with the earliest work so named.',
    sources:[H,R,'Ādi Purāṇa manuscripts/editions cited by Hazra']
  });

  patch('Bṛhannāradīya Purāṇa',{
    period:'Hazra places the Bṛhannāradīya roughly in 750–900 CE.',
    milieu:'Medieval Vaiṣṇava bhakti and Dharma culture before fully developed Tantric ritual dominates the text.',
    history:'A distinct work later absorbed extensively into the received Nārada/Nāradīya Purāṇa. Hazra maps corresponding chapters to show that the two titles should not be collapsed historically.',
    chapterMap:['Early chapters: hymns and theology of Viṣṇu-Nārāyaṇa and avatāras.','Ritual/Dharma blocks: impurity and purification, śrāddha and tithi determination.','Gaṅgā-māhātmya and bathing/pilgrimage material.','Ch. 31: twofold yoga—kriyā-yoga and jñāna-yoga—with image worship as a preliminary discipline.'],
    contents:['Lists ten named avatāras including Matsya, Kūrma, Varāha, Nṛsiṃha, Vāmana, Paraśurāma, Rāma and Kalki.','Numerous Viṣṇu-Nārāyaṇa hymns.','Kriyā-yoga through worship of Viṣṇu in images, Brahmins, earth, fire, sun and pictures.','Jñāna-yoga as purified intellect/realization.','Śrāddha, purity, calendrical religion and Gaṅgā devotion.'],
    namedFeatures:['Kriyā-yoga/jñāna-yoga ch. 31','Gaṅgā-māhātmya','Avatāra list'],
    dependencies:['Large portions were incorporated into the received Nāradīya/Nārada Purāṇa; Hazra gives chapter correspondences.'],
    hazraNotes:'This is exactly why a card called “Bṛhannāradīya” should have its own dossier: it is not merely a spelling variant of Nāradīya Purāṇa.',
    sources:[H,HR,R,'Bṛhannāradīya Sanskrit editions']
  });

  patch('Kālikā Purāṇa',{
    period:'The present Kālikā Purāṇa is generally placed in the early medieval period; Hazra argues it cannot be earlier than about 750 CE and connects it closely with Kāmarūpa. An older non-Tantric Kālikā/Kālī Purāṇa known from quotations appears to have preceded it.',
    milieu:'Kāmarūpa/Assam and adjoining eastern India, where Śākta, Śaiva and regional goddess cults were being integrated with Purāṇic and Tantric ritual.',
    history:'Hazra sharply distinguishes the extant Tantric Kālikā Purāṇa from an earlier work of similar name cited by older authors. The received text normally has around 90–96 chapters depending on manuscript/edition.',
    chapterMap:['Opening chapters: creation, Dakṣa and the prajāpatis, Sandhyā, Kāma/Madana and the mythic prehistory of the Goddess.','Large mythic blocks: Satī/Pārvatī, Śiva and Goddess narratives.','Kāmarūpa/Kāmakhyā materials: geography, pīṭha theology and local sacred landscape.','Ritual chapters: Durgā/Kālī worship, mantra, bali, temple/image and vrata observance.','Chs. around 54–58 are associated in scholarship with explicitly Tantric/Vaiṣṇavī-tantra type ritual material.'],
    contents:['Kāmakhyā and Kāmarūpa sacred geography.','Śākta creation and Goddess mythology.','Śiva–Satī/Pārvatī narratives.','Detailed pūjā, mantra and sacrificial/bali prescriptions.','Royal, calendrical and festival religion.','Integration of local northeast Indian goddess traditions into Sanskrit Purāṇic theology.'],
    namedFeatures:['Kāmakhyā','Kāmarūpa','Śākta/Tantric ritual chapters','Bali prescriptions'],
    ritualHistory:'The work is a crucial source for the Sanskritization and systematization of Kāmarūpa’s Goddess cults. Its ritual sections document a stage at which Tantra has been absorbed directly into Purāṇic authority.',
    manuscripts:'Recensions differ in chapter count and wording; comparison is essential because the title was also attached to an earlier, apparently different, Kālikā/Kālī Purāṇa.',
    hazraNotes:'Hazra uses quotation history to show that the present Tantric work replaced or eclipsed an older text under a similar title. That distinction is more historically useful than giving one date to “the Kālikā Purāṇa.”',
    primaryEvidence:['Kālikā Purāṇa opening creation/Kāma cycle','Kāmakhyā/Kāmarūpa and ritual chapters','Hazra, Studies in the Upapurāṇas, Kālikā Purāṇa study'],
    reception:'One of the most important Sanskrit sources for the history of Śāktism and Kāmakhyā worship in Assam.',
    sources:[H,R,'Kālikā Purāṇa Sanskrit editions','K. L. Barua, Early History of Kāmarūpa']
  });

  patch('Mahābhāgavata Purāṇa',{
    period:'A comparatively late Śākta Purāṇa. Hazra places it in medieval eastern India and argues from its developed Tantric, Rādhā-Kṛṣṇa and regional Kāmarūpa/Bengal features that it is much later than the early Purāṇic corpus.',
    milieu:'Eastern Bengal/Sylhet–Kāmarūpa cultural zone, combining Bengali-style Durgā worship, Kāmakhyā, Tantra, Śaiva-Śākta theology and Kṛṣṇa/Rādhā materials.',
    history:'Manuscripts normally contain about 80–81 chapters. Hazra notes a strong eastern-Bengal manuscript distribution and analyzes the text as an independent Śākta Purāṇa. Its chapter colophons use Upapurāṇa language in the surviving transmission, while other scriptural evidence may give the title a different classificatory status.',
    chapterMap:['Chs. 15–19: Bhagavatī-gītā and its māhātmya.','Chs. 44–45: developed mantra/Tantric ritual material.','Chs. 49–58: distinctive identification and interaction of Kṛṣṇa/Rādhā with Kālī/Śiva-centered theology.','Chs. 69–70: Bhāgīrathī/Padmā river material.','Chs. 76–78 and related passages: Kāmarūpa and mahāpīṭha praise.','Autumn Durgā cycle: bodhana in bilva, Ṣaṣṭhī adhivāsa, Saptamī/Aṣṭamī/Navamī worship, patrikā entry and Daśamī immersion.'],
    contents:['Devī as Ādyā Prakṛti and even the source of the great gods and their śaktis.','Bhagavatī-gītā: Goddess-centered metaphysics and religious instruction.','Ten Mahāvidyās and developed Tantric vocabulary.','Kāmakhyā and pīṭha theology.','Bengal-style autumnal Durgā worship linked with the Rāma story.','Kṛṣṇa/Rādhā material reworked within Śākta theology.','Six ritual acts and combined Vedic/Āgamic religious ideals.'],
    namedFeatures:['Bhagavatī-gītā chs. 15–19','Kāmakhyā','Mahāvidyās','Autumn Durgā-pūjā sequence','Kṛṣṇa/Rādhā–Kālī/Śiva synthesis'],
    ritualHistory:'Its Durgā-pūjā sequence is historically valuable because it closely resembles the eastern Indian/Bengali festival pattern: bodhana, adhivāsa, the Saptamī–Navamī image cycle and Daśamī immersion.',
    manuscripts:'Hazra reports numerous Bengali manuscripts, especially from eastern Bengal/Sylhet; chapter counts hover around 80–81. A manuscript labeled “first part” does not prove a securely preserved second part.',
    hazraNotes:'Hazra treats the work as evidence for a late eastern synthesis of Veda, Purāṇa and Tantra. Its regional ritual details are more useful for dating/provenance than its traditional claim to remote antiquity.',
    primaryEvidence:['Mahābhāgavata chs. 15–19, 44–45, 49–58, 69–70, 76–78','Hazra, Studies in the Upapurāṇas, Mahābhāgavata study'],
    sources:[H,R,'Mahābhāgavata Purāṇa Sanskrit/English editions and manuscript studies']
  });

  patch('Devī Bhāgavata Purāṇa',{
    period:'Hazra argues that the received Devī Bhāgavata cannot be earlier than about 950 CE; modern proposals vary, but it belongs to the mature medieval Śākta Purāṇic world rather than the early Purāṇic layer.',
    milieu:'Medieval Sanskrit Śākta bhakti and Tantra, synthesizing older epic/Purāṇic mythology with Goddess theology, pilgrimage, mantra and ritual.',
    history:'The twelve-skandha text deliberately presents itself as a Bhāgavata/Purāṇa centered on Devī. Hazra identifies substantial reuse of older literature: portions of its Mahiṣa/Devī cycle follow the Mārkaṇḍeya Purāṇa’s Devī Māhātmya; other blocks parallel the Brahmavaivarta Prakṛti-khaṇḍa and Mahābhārata stories.',
    chapterMap:['Skandhas I–II: Purāṇic frame, cosmology and narrative foundations.','Skandhas III–IV: Goddess theology, creation and devotional material.','Skandha V chs. 21–35: Devī battle narratives heavily dependent on the Mārkaṇḍeya Devī Māhātmya tradition.','Skandha VII: major Śākta theological teaching including the Devī Gītā in the later part.','Skandha IX: extensive Prakṛti/Goddess material with strong Brahmavaivarta parallels.','Later skandhas: mantra, pūjā, pīṭhas, vratas, yogic/Tantric and cosmological material.'],
    contents:['Devī as supreme brahman/Śakti and source of the gods.','Devī Gītā: theology, devotion, knowledge and meditation.','Mahiṣāsura and other Goddess battle cycles.','Pīṭhas, Goddess pilgrimage and ritual worship.','Mantra/Tantric practice, pañcāyatana and Mahāvidyā-related traditions.','Harīścandra, Nara-Nārāyaṇa and other older epic/Purāṇic narratives retold in a Śākta framework.'],
    namedFeatures:['Devī Gītā','Mahiṣāsura cycle','Śākta pīṭhas','Mahāvidyā/Tantric material'],
    dependencies:['Skandha V battle cycle draws substantially on Mārkaṇḍeya Purāṇa/Devī Māhātmya.','Hazra argues much of Skandha IX is indebted to the received Brahmavaivarta Prakṛti-khaṇḍa.','Several narratives adapt Mahābhārata/Purāṇic sources.'],
    hazraNotes:'Hazra’s dating argument is cumulative: developed Tantra, intertextual dependence on medieval Purāṇic materials, pañcāyatana/Mahāvidyā features and citation history all point away from an early date.',
    primaryEvidence:['Devī Bhāgavata V.21–35','Devī Gītā in Skandha VII','Skandha IX Prakṛti material','Hazra, Studies in the Upapurāṇas, Devī Bhāgavata study'],
    reception:'A central Purāṇic scripture of later Śāktism, especially important for presenting Goddess devotion in the full narrative/theological scale of a Bhāgavata Purāṇa.',
    sources:[H,R,'Devī Bhāgavata Purāṇa Sanskrit editions/translations','C. Mackenzie Brown, The Triumph of the Goddess / Devī Gītā studies']
  });

  patch('Bṛhaddharma Purāṇa',{
    period:'Hazra argues for composition in the latter half of the 13th century CE, while acknowledging a few isolated later additions.',
    milieu:'Medieval Bengal, probably the Gaṅgā/Triveṇī–western/eastern Bengal cultural zone, in a society where Brahmanical Dharma was negotiating Śākta, Śaiva, Vaiṣṇava, Tantric and changing political realities.',
    history:'The text has three khaṇḍas. The Vaṅgavāsī and Asiatic Society editions differ, especially because the latter omits the last seven Uttara-khaṇḍa chapters found in most manuscripts. Hazra argues those chapters are genuine to the transmitted work rather than late spurious appendices.',
    chapterMap:['Pūrva-khaṇḍa: dharma, gurus/parents, tīrthas, deity worship, months/tithis, Purāṇa/Upapurāṇa lists, cows/Brahmins and regional ritual.','Madhya-khaṇḍa: creation, Śiva/Viṣṇu/Devī narratives, Gaṅgā theology and sacred geography.','Uttara-khaṇḍa: social classification, occupations, purity/food, Bengal customs and further Dharma material.','I.22: autumnal Durgā worship in a form close to Bengal/Mithilā/Kāmarūpa practice.','III.13–14: thirty-six mixed castes and occupational classification.','III.5.44–46: restricted permission for Brahmins to eat certain fish—an unusually regional marker.'],
    contents:['Gaṅgā glorification and a dense sacred geography extending into Bengal.','Durgā worship with bodhana in bilva and regional autumn-festival rites.','Varṇāśrama and a specifically Bengali scheme of social groups/occupations.','Purāṇa/Upapurāṇa catalogues.','Śiva, Viṣṇu and Śākta narratives and an explicit claim that the work is Vaiṣṇava, Śaiva and Śākta.','Food customs, local flora and proverbs reflecting Bengali usage.','Kṛṣṇa-līlā material influenced by the devotional literary world of medieval Bengal.'],
    namedFeatures:['Bengal Durgā-pūjā I.22','Thirty-six castes III.13–14','Fish rule III.5.44–46','Gaṅgā name-lists and Bengal tīrthas','Purāṇa/Upapurāṇa catalogue I.25'],
    ritualHistory:'Hazra uses the work almost like an ethnographic snapshot of medieval Bengal: its food sequence, fish rules, Durgā worship, local tīrthas, caste vocabulary and Gaṅgā geography line up with eastern Indian practice far more closely than a pan-Indian abstract Dharma manual would.',
    dependencies:['The Kṛṣṇa-līlā song shows literary affinity with the Gītagovinda world.','It alludes to/uses older Purāṇic and Dharma traditions while adapting them to Bengal.'],
    manuscripts:'Two major printed traditions differ in readings and extent. Most manuscripts support the Vaṅgavāsī Uttara-khaṇḍa chs. 15–21 omitted by the ASB edition.',
    hazraNotes:'Hazra’s date rests not on one line but a network of historical clues: Bengal social custom, Yavana/Muslim-era consciousness, absence of later Caitanya-era Navadvīpa prominence, regional Durgā ritual, and manuscript/citation history.',
    primaryEvidence:['Bṛhaddharma I.22; I.25; II Gaṅgā material; III.5; III.13–14','Hazra, Studies in the Upapurāṇas, Bṛhaddharma study'],
    reception:'A major source for medieval Bengal’s religious and social history and for the local synthesis of Śākta, Śaiva, Vaiṣṇava and Dharma traditions.',
    sources:[H,R,'Bṛhaddharma Purāṇa Vaṅgavāsī and ASB editions','R. C. Hazra, Journal of the University of Gauhati study on Bṛhaddharma']
  });

  // Major Purāṇas for which Hazra’s rites-and-customs chronology is particularly useful.
  patch('Viṣṇu Purāṇa',{
    chapterMap:['Aṃśa I: creation, Prakṛti/Puruṣa cosmology, Dhruva, Pṛthu and early mythic history.','Aṃśa II: continents, oceans, mountains, celestial regions and hells.','Aṃśa III: manvantaras, Vedic śākhās, varṇāśrama, saṃskāras, householder duties and śrāddha.','Aṃśa IV: solar/lunar dynasties down to major royal lines.','Aṃśa V: Kṛṣṇa from birth and childhood through Mathurā/Dvārakā.','Aṃśa VI: Kali-yuga, dissolution, yoga/knowledge and liberation.'],
    ritualHistory:'Hazra uses especially the third aṃśa as evidence for the stage at which Purāṇas absorbed Dharmaśāstra: birth/naming, marriage, daily householder conduct, impurity and detailed śrāddha are no longer peripheral but integral to Purāṇic religion.',
    primaryEvidence:['Viṣṇu Purāṇa III.10–16: saṃskāra, householder and śrāddha materials','III.17–18: polemic against Veda-rejecting groups','V: Kṛṣṇa narrative','Hazra, Purāṇic Records, Viṣṇu Purāṇa chronology/rites sections'],
    hazraNotes:'Hazra’s chronology treats different Viṣṇu-Purāṇa chapters by the rites and institutions they presuppose; the work should not be dated by averaging every layer into one number.',
    sources:[HR,R,'H. H. Wilson, Viṣṇu Purāṇa','M. M. Pathak / critical studies of Viṣṇu Purāṇa']
  });
  patch('Mārkaṇḍeya Purāṇa',{
    chapterMap:['Opening Jaimini frame and narrative answers by the four wise birds.','Dharma/social and mythic sections with kings, sages and manvantaras.','Chs. 81–93 in common numbering: Devī Māhātmya—Madhu-Kaiṭabha, Mahiṣāsura and Śumbha-Niśumbha cycles.','Later sections: manvantara, solar/genealogical and religious material.'],
    ritualHistory:'Hazra treats much of the Mārkaṇḍeya as valuable early evidence because large parts lack the later proliferation of tīrtha/vrata/Tantric institutions seen in medieval Purāṇas; the Devī Māhātmya itself then becomes a landmark in the emergence of autonomous Goddess theology.',
    dependencies:['The opening uses unresolved Mahābhārata questions as its narrative engine.','Later Śākta Purāṇas repeatedly borrow or rewrite the Devī Māhātmya cycle.'],
    hazraNotes:'Rather than dating the whole book from the Devī Māhātmya alone, Hazra separates older narrative/Dharma strata from later religious development.',
    sources:[HR,R,'F. E. Pargiter, Mārkaṇḍeya Purāṇa','Thomas Coburn, Devī Māhātmya studies']
  });
  patch('Kūrma Purāṇa',{
    chapterMap:['Pūrva-bhāga: Kūrma/Viṣṇu frame, cosmology, mythology and sectarian material.','Uttara-bhāga: extensive Dharma, purity, gifts, penances, tīrtha and Śaiva/Pāśupata-shaped teaching.','Īśvara Gītā: Śiva-centered philosophical/yogic discourse.','Vyāsa Gītā/Dharma blocks: āśrama, ācāra, aśauca, dāna and prāyaścitta.'],
    history:'Hazra reconstructs an older Vaiṣṇava/Pāñcarātra Kūrma layer and later “Pāśupatized” or Śaiva redactional strata. This is a textbook case where the sect label of a Purāṇa changed during transmission.',
    ritualHistory:'Its Dharma chapters document how Purāṇic religion absorbed classical Smṛti categories while also giving Śiva, Viṣṇu, Sūrya and other deities places in daily worship.',
    hazraNotes:'Hazra proposed an older Vaiṣṇava Kūrma around the mid-first millennium and later Śaiva/Pāśupata reworking; later scholars debate exactly which chapters belong to each stratum.',
    scholarlyDebates:['Whether Hazra’s “Pāśupatized” chapters are all later additions or whether some belong to the older core.','How early the Pāñcarātra Kūrma stratum should be dated.'],
    sources:[HR,R,'Kūrma Purāṇa critical/English editions','A. S. Gupta, studies of Kūrma Purāṇa strata']
  });
  patch('Liṅga Purāṇa',{
    chapterMap:['Pūrvabhāga: liṅga as cosmic/unmanifest principle, creation, Śiva manifestations and myth.','Large ritual blocks: liṅga installation, image/icon rules, vratas, festivals and sacred places.','Yoga and liberation material.','Uttarabhāga: additional ritual, myth and tīrtha material in the received recension.'],
    ritualHistory:'Hazra’s rites-and-customs analysis treats the Liṅga Purāṇa as evidence for an increasingly institutional Śaiva world: image/liṅga consecration, vrata calendars, pilgrimage and temple-centered worship are far more developed than in the earliest Purāṇic layers.',
    hazraNotes:'Hazra dates chapter groups rather than treating every Śaiva ritual passage as equally old; later tīrtha and Tantric-style material can postdate the theological core by centuries.',
    sources:[HR,R,'Liṅga Purāṇa Sanskrit/English editions']
  });
  patch('Agni Purāṇa',{
    chapterMap:['Early myth/ritual material: avatāras, pūjā, mantra and religious observance.','Architecture/iconography blocks: temple planning, images, proportions and consecration.','Royal science: polity, warfare, weapons, fortification and administration.','Language/literature: grammar, lexicography, metrics, poetics and dramaturgy.','Practical sciences: medicine, veterinary knowledge, gems and other encyclopedic topics.','Tantric/mantra sections of differing date.'],
    history:'The Agni Purāṇa is an anthology of strata, not an authored encyclopedia produced in one century. Hazra and later scholars date individual technical blocks separately: grammar/lexicography, metrics, poetics and Tantra do not all belong to the same redaction.',
    ritualHistory:'For Hazra it is a late stage of Purāṇic expansion: ritual and Dharma now sit beside almost every branch of practical śāstra, making “Purāṇa” a vehicle for transmitting condensed technical knowledge.',
    dependencies:['Many technical chapters summarize or parallel specialist śāstras on architecture, poetics, grammar, polity and medicine.'],
    hazraNotes:'Dating “the Agni Purāṇa” with one century is particularly misleading. Hazra’s chapter chronology is more useful than a single headline date.',
    sources:[HR,R,'Agni Purāṇa Sanskrit editions','Studies of Agni Purāṇa poetics/iconography']
  });

  // Catalogue/fragmentary titles: useful evidence without invented plots.
  catalogue('Sanatkumāra Purāṇa','The title recurs in several Upapurāṇa catalogues. More than one text/fragment may have circulated under Sanatkumāra’s name, so the catalogue evidence is stronger than any single modern identification.',['Devī Bhāgavata 1.3.13–16','Kūrma Purāṇa 1.1.17–20']);
  catalogue('Daurvāsasa Purāṇa','A Durvāsas-attributed title appears repeatedly in Upapurāṇa catalogues. The surviving evidence is not sufficient to assign one continuous extant recension and chapter synopsis.',['Devī Bhāgavata 1.3.13–16','Kūrma Purāṇa 1.1.17–20','Padma Pātāla list']);
  catalogue('Kapila Purāṇa','A Kapila Purāṇa is repeatedly listed; texts under the name also circulate regionally, but identity between catalogue-title and surviving recensions must be established rather than assumed.',['Devī Bhāgavata 1.3.13–16','Kūrma Purāṇa 1.1.17–20','Padma Pātāla list']);
  catalogue('Mānava Purāṇa','A Mānava title is listed by Devī Bhāgavata and Padma; a complete securely identified recension is not available for a responsible narrative synopsis.',['Devī Bhāgavata 1.3.13–16','Padma Pātāla list']);
  catalogue('Auśanasa Purāṇa','An Uśanas/Auśanasa Purāṇa is listed in multiple Upapurāṇa catalogues; the title is distinct from Dharma/Śukra texts unless manuscript evidence proves identity.',['Devī Bhāgavata 1.3.13–16','Kūrma Purāṇa 1.1.17–20','Padma Pātāla list']);
  catalogue('Varuṇa Purāṇa','A Varuṇa title appears in the major Upapurāṇa catalogues. Hazra discusses Varuṇa-related Purāṇic material separately from any casual identification with a better-known text.',['Devī Bhāgavata 1.3.13–16','Kūrma Purāṇa 1.1.17–20','Padma Pātāla list','Bṛhaddharma 1.25']);
  catalogue('Parāśara Purāṇa','A Parāśara Purāṇa is a recurrent Upapurāṇa title; surviving Parāśara works of other genres should not be merged with it without evidence.',['Devī Bhāgavata 1.3.13–16','Kūrma Purāṇa 1.1.17–20','Padma Pātāla list']);
  catalogue('Mārīca Purāṇa','Mārīca appears in Kūrma/Padma Upapurāṇa lists; the title is primarily a catalogue witness in the present state of evidence.',['Kūrma Purāṇa 1.1.17–20','Padma Pātāla list']);
  catalogue('Bhārgava Purāṇa','Bhārgava is widely listed among Upapurāṇas, but a single securely established complete recension behind every citation has not been demonstrated.',['Kūrma Purāṇa 1.1.17–20','Padma Pātāla list','Bṛhaddharma 1.25']);
  catalogue('Vāsiṣṭha Purāṇa','The Devī Bhāgavata list names a Vāsiṣṭha Upapurāṇa. It must be distinguished from Vasiṣṭha Dharma texts and other sage-attributed literature.',['Devī Bhāgavata 1.3.13–16']);
  catalogue('Nandikṛta Purāṇa','Devī Bhāgavata transmits a Nandi/Nandikṛta title. Its relation to Nandīśvara/Nandikeśvara works in other catalogues is a textual problem, not a safe synonym.',['Devī Bhāgavata 1.3.13–16']);
  catalogue('Āditya Purāṇa','An Āditya title appears in Devī Bhāgavata and Bṛhaddharma lists. It belongs to the Saura title-complex but should not automatically be equated with the Sāmba or Saura Purāṇa.',['Devī Bhāgavata 1.3.13–16','Bṛhaddharma 1.25']);
  catalogue('Māheśvara Purāṇa','Māheśvara appears in several Upapurāṇa lists. The name is Śaiva, but that alone does not establish the contents or identity of the lost/uncertain catalogue text.',['Devī Bhāgavata 1.3.13–16','Kūrma Purāṇa 1.1.17–20']);
  catalogue('Māheśa Purāṇa','Padma’s Māheśa title may be related to Māheśvara traditions, but the wording is preserved separately here because the source itself differs.',['Padma Purāṇa, Pātāla-khaṇḍa Upapurāṇa list']);
  catalogue('Kaumāra Purāṇa','Padma lists Kaumāra; the title indicates a Kumāra/Skanda association but does not by itself prove identity with the Mahāpurāṇa Skanda or any surviving Kaumāra text.',['Padma Purāṇa, Pātāla-khaṇḍa Upapurāṇa list']);
  catalogue('Āṇḍa Purāṇa','Padma’s transmitted “Āṇḍa”/Skanda-type reading is kept separate because manuscript/OCR/list variants make automatic identification hazardous.',['Padma Purāṇa, Pātāla-khaṇḍa Upapurāṇa list']);
  catalogue('Another Nāradīya Purāṇa','Padma explicitly marks this as another Nāradīya. It is therefore deliberately not merged with the received Nāradīya Mahāpurāṇa.',['Padma Purāṇa, Pātāla-khaṇḍa Upapurāṇa list']);
  catalogue('Another Brahmāṇḍa Purāṇa','Padma explicitly presents another Brahmāṇḍa-type title in its Upapurāṇa list; the index therefore does not make the main Brahmāṇḍa Mahāpurāṇa “Both” on that evidence.',['Padma Purāṇa, Pātāla-khaṇḍa Upapurāṇa list']);
  catalogue('Nandīśvara Purāṇa','Hazra discusses Nandīśvara/Nandikeśvara as a later Śaiva Upapurāṇic title cited by ritual digests; quoted material survives, but the exact original continuous book is problematic.',['Bṛhaddharma 1.25','Hazra, Nandikeśvara Purāṇa study']);
  catalogue('Bṛhannandīśvara Purāṇa','A “great Nandīśvara” is separately named in Bṛhaddharma and related traditions. It should not be collapsed into Nandīśvara simply because the names are similar.',['Bṛhaddharma 1.25','Hazra, Bṛhannandikeśvara discussion']);
  catalogue('Dharma Purāṇa','Bṛhaddharma’s list includes a Dharma Purāṇa title. Its relation to the Bṛhaddharma itself and other Dharma-named Purāṇic works requires manuscript evidence.',['Bṛhaddharma 1.25']);
})();