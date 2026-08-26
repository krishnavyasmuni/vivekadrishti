(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const put = (name, data) => {
    D[`Purāṇa:${name}`] = Object.assign({}, D[name] || {}, D[`Purāṇa:${name}`] || {}, data);
  };

  const chapterMap = [
    {
      title:'Aṃśa 1 — Creation (22 chapters)',
      bullets:[
        '1. Maitreya asks Parāśara about the world','2. Parāśara praises Viṣṇu; creation','3. The divisions of time','4. Brahmā creates the world anew','5. Brahmā creates living beings','6. Human society','7. The first patriarchs','8. The eight forms of Rudra','9. Durvāsas curses Indra; the churning of the ocean','10. Descendants of the first patriarchs and Dakṣa’s daughters','11. The birth of Dhruva','12. The trials of Dhruva','13. Dhruva’s descendants','14. Pṛthu’s descendants','15. The Pracetases, Māriṣā, the Ādityas and Prahlāda','16. Maitreya asks about Prahlāda','17. Prahlāda instructs the Daitya boys','18. Prahlāda instructs his teachers','19. Prahlāda’s torments continue','20. Prahlāda attains liberation','21. Kaśyapa’s descendants and the origin of the Maruts','22. Brahmā appoints sovereigns; the nature of the Absolute'
      ]
    },
    {
      title:'Aṃśa 2 — The World (16 chapters)',
      bullets:[
        '1. Priyavrata distributes the continents','2. Jambūdvīpa, the land of the rose-apple tree','3. Bhāratavarṣa','4. Plakṣadvīpa and the other continents','5. The lower realms and the serpent Śeṣa','6. The hell realms','7. The upper spheres and the power of Viṣṇu','8. The movement of the sun, time and the heavenly paths','9. The source of rain','10. The chariot of the sun','11. The sun’s energy','12. The moon and planets','13. The story of Bharata','14. Bharata teaches the highest goal','15. Ṛbhu’s discourse on the highest truth','16. Ṛbhu’s discourse continues'
      ]
    },
    {
      title:'Aṃśa 3 — Society, Veda and ritual (18 chapters)',
      bullets:[
        '1. The past and present Manvantaras','2. The future Manvantaras','3. The Vyāsas arrange the Vedas; the syllable Oṃ','4. The origin and division of the four Vedas','5. The branches of the Yajur Veda','6. The branches of the Sāma and Atharva Vedas; the Purāṇas','7. How to escape the authority of Yama','8. The four varṇas and their duties','9. The four āśramas or stages of life','10. Birth and marriage rites','11. Rituals of the householder','12. The conduct of the wise','13. Rituals relating to birth and death','14. Śrāddha for the ancestors','15. Conducting a Śrāddha','16. Śrāddha offerings','17. Protection afforded by the Vedas; Viṣṇu’s Māyāmoha','18. Māyāmoha confounds the Daityas'
      ]
    },
    {
      title:'Aṃśa 4 — The Royal Dynasties (24 chapters)',
      bullets:[
        '1. The Solar Dynasty: the lineage of Manu','2. Manu’s sons Dhṛṣṭa, Nābhāga and Ikṣvāku','3. The descendants of Ambarīṣa','4. Sagara’s sons excavate the ocean; the story of Rāma','5. The legend of Nimi and the line of Janaka','6. The Lunar Dynasty','7. King Jahnu and the Gaṅgā','8. The descendants of Āyus','9. Raji and Indra','10. Yayāti exchanges old age for youth','11. The line of Yadu','12. Jyāmagha and his descendants','13. Kṛṣṇa and the Syamantaka jewel','14. Vasudeva’s ancestry and Śiśupāla','15. Hiraṇyakaśipu, Rāvaṇa and Śiśupāla','16. The descendants of Turvasu','17. The descendants of Druhyu','18. The descendants of Anu','19. The descendants of Puru','20. The Kaurava and Pāṇḍava lineages','21. Future descendants of Parīkṣit','22. Future descendants of Bṛhadbala','23. Future descendants of Bṛhadratha','24. Future kings and the age of Kali'
      ]
    },
    {
      title:'Aṃśa 5 — Kṛṣṇa (38 chapters)',
      bullets:[
        '1. Vasudeva and Devakī','2. The deities praise Devakī','3. The advent of Kṛṣṇa','4. Kaṃsa plots to kill Kṛṣṇa','5. Kṛṣṇa slays Pūtanā','6. Kṛṣṇa’s childhood','7. Kṛṣṇa subdues Kāliya','8. Balarāma defeats Dhenuka','9. Balarāma destroys Pralamba','10. Autumn in the cattle camp','11. Kṛṣṇa raises Govardhana','12. Indra praises Kṛṣṇa','13. Kṛṣṇa delights the cowherd women','14. Kṛṣṇa slays Ariṣṭa','15. Kaṃsa sends Akrūra','16. Kṛṣṇa slays Keśin','17. Akrūra arrives in Vraja','18. Kṛṣṇa sets out for Mathurā','19. The washerman and garland-maker','20. Mathurā, the wrestling bout and Kaṃsa’s death','21. Ugrasena is reinstated','22. Kṛṣṇa battles Jarāsandha','23. The Yādavas move to Dvārakā','24. Balarāma returns to Vraja','25. Balarāma diverts the Yamunā','26. Kṛṣṇa abducts Rukmiṇī','27. Pradyumna is abducted by a demon','28. Aniruddha; Balarāma slays Rukmin','29. Kṛṣṇa slays Naraka and retrieves Aditi’s earrings','30. Aditi praises Kṛṣṇa','31. The Pārijāta tree is brought to Dvārakā','32. Uṣā dreams of Aniruddha','33. Bāṇa binds Aniruddha and Kṛṣṇa frees him','34. Kṛṣṇa burns Vārāṇasī','35. Balarāma threatens Hastināpura','36. Balarāma defeats Dvivida','37. The destruction of the Yādavas','38. Arjuna leads the women away from Dvārakā'
      ]
    },
    {
      title:'Aṃśa 6 — Dissolution and liberation (8 chapters)',
      bullets:[
        '1. The decline of virtue in Kali-yuga','2. The redeeming virtue of the Kali age','3. The causal dissolution at the end of an aeon','4. Elemental dissolution','5. Final dissolution, suffering and the nature of liberation','6. Khāṇḍikya and Keśidhvaja','7. Keśidhvaja instructs Khāṇḍikya in yoga','8. The benefits of hearing the Viṣṇu Purāṇa'
      ]
    }
  ];

  put('Viṣṇu Purāṇa', {
    sanskritTitle:'विष्णुपुराणम्',
    traditionalAuthor:'Vyāsa (traditional attribution); transmitted as a dialogue of Parāśara and Maitreya',
    language:'Sanskrit',
    booksCount:'6 aṃśas; 126 adhyāyas (22 + 16 + 18 + 24 + 38 + 8)',
    verseCount:'Traditional Purāṇa catalogues: 23,000 ślokas; received editions: roughly 6,000–7,000 verses, depending on edition and counting method',
    period:'Layered Sanskrit Purāṇa; a substantial received form is often placed around the 4th–5th centuries CE, while older scholarship proposed dates from the late BCE centuries to the medieval period',
    status:'Extant Mahāpurāṇa with a comparatively coherent six-aṃśa structure, multiple manuscript witnesses and a modern critical edition (1997–1999)',
    extent:'Six aṃśas and 126 chapters. The traditional figure of 23,000 ślokas is much larger than the surviving six-aṃśa text; this discrepancy should not automatically be described as simple textual loss.',
    primaryRecensions:[
      'The six-aṃśa received text represented by the Baroda critical edition of M. M. Pathak (1997–1999)',
      'Printed and manuscript recensions related to the six-aṃśa text, with local or late additions in some witnesses',
      'Traditional notices of a 23,000-verse Viṣṇu Purāṇa, whose relation to the extant text, Bṛhadviṣṇu traditions and Viṣṇudharmottara material has been debated'
    ],
    leadParagraphs:[
      'The Viṣṇu Purāṇa is one of the eighteen Mahāpurāṇas and one of the most structurally coherent surviving Purāṇas. Its six aṃśas move from creation and cosmology through geography, cosmic time, Vedic transmission, social and ritual order, royal genealogy and the life of Kṛṣṇa, before ending with Kali-yuga, cosmic dissolution, yoga and liberation. Viṣṇu is the theological centre of this universe: creator, sustainer and destroyer are presented as functions or manifestations within the reality that is Viṣṇu.',
      'The text is especially important because it comes unusually close to the classical five-character definition of a Purāṇa: sarga (primary creation), pratisarga (re-creation and cosmic cycles), vaṃśa (genealogies), manvantara (ages of the Manus) and vaṃśānucarita (dynastic histories). Yet it is not merely a mythological chronicle. Aṃśa 3 contains Vedic classification, varṇa and āśrama duties, domestic rites and śrāddha; Aṃśa 6 turns to suffering, renunciation, yoga and liberation; and throughout the work hymns and narratives interpret cosmology through devotion to Viṣṇu.',
      'The received work has 126 chapters. Traditional Purāṇa catalogues assign it 23,000 verses, whereas surviving printed and critically edited forms contain only roughly six to seven thousand. The difference is a problem of textual history, not proof that a fixed sixteen-thousand-verse block simply disappeared. The work circulated in multiple manuscripts and continued to be copied, interpreted and occasionally supplemented for centuries.'
    ],
    overview:'A six-aṃśa Vaiṣṇava Mahāpurāṇa organized around creation, cosmology, world geography, Manvantaras, Vedic transmission, dharma, genealogy, Kṛṣṇa, dissolution and liberation.',
    profile:'The text combines Purāṇic pañcalakṣaṇa material with Vaiṣṇava theology, brahmanical social and ritual teaching, Sāṃkhya-like cosmological categories, yoga and Vedāntic reflection.',
    identityProblem:'Traditional catalogues give 23,000 verses, but the received six-aṃśa text is much shorter. Scholars have variously connected the numerical discrepancy with different counting conventions, lost or expanded recensions, Bṛhadviṣṇu traditions and the occasional treatment of related Vaiṣṇava works as supplements; none of these explanations should be stated as certain without specifying the witness.',
    classificationProblem:'It is securely transmitted and catalogued as a Mahāpurāṇa and is strongly Vaiṣṇava. Later classificatory schemes, including the Padma Purāṇa’s sattva-rajas-tamas grouping, place it among the sattvika Purāṇas. Describing it simply as a “Pāñcarātra text” can be misleading unless one distinguishes broad early Vaiṣṇava/Pāñcarātra affinities from the later technical Pāñcarātra Saṃhitā genre.',
    milieu:'The received text belongs to the classical/early medieval Sanskrit Purāṇic world in which Vedic authority, emerging temple and devotional religiosity, royal genealogy, domestic dharma and Vaiṣṇava theology were being integrated.',
    history:'The Viṣṇu Purāṇa did not arise as a modern single-author book. Its materials include Vedic myth, epic traditions, dharma material, genealogical lore and Kṛṣṇa narratives that were transmitted and reshaped over time. The relative coherence of the six-part structure does not erase this layered history.',
    datingBasis:'Dating arguments have used references to the epics, comparison with the Harivaṃśa and Bhāgavata Purāṇa, dynastic lists, the development of Vaiṣṇava theology, language and style, and citations or reuse in later texts. McComas Taylor judges a fourth–fifth-century CE received extent a reasonable working hypothesis, while emphasizing that it remains an approximation.',
    hazraNotes:'R. C. Hazra proposed an early centuries-CE date for substantial portions of the text and used its rites and customs as historical evidence. Later scholarship generally retains the need for stratification and is more cautious about assigning one date to all ritual, social and theological chapters.',
    chapterMap:[
      'Aṃśa 1 — 22 chapters: creation, cosmic time, Varāha, Brahmā, social origins, Rudra, Lakṣmī and the ocean-churning, Dhruva, Pṛthu, Prahlāda and the nature of the Absolute.',
      'Aṃśa 2 — 16 chapters: Jambūdvīpa and Bhāratavarṣa, the other continents and oceans, lower and upper worlds, hells, astronomy/cosmology, and the Bharata–Ṛbhu teaching.',
      'Aṃśa 3 — 18 chapters: Manvantaras, the Vyāsas and Vedic branches, the Purāṇa list, Yama, varṇa and āśrama, household rites, birth/death rites, śrāddha and Māyāmoha.',
      'Aṃśa 4 — 24 chapters: solar and lunar royal genealogies, Rāma, Nimi and Janaka, Yayāti and his sons, Yadu and Puru, the Kuru-Pāṇḍava lines and future dynasties.',
      'Aṃśa 5 — 38 chapters: the life of Kṛṣṇa from Devakī and the Vraja childhood through Kaṃsa, Mathurā, Dvārakā, Rukmiṇī, Naraka, Bāṇa and the destruction of the Yādavas.',
      'Aṃśa 6 — 8 chapters: Kali-yuga, three modes of dissolution, the unsatisfactoriness of worldly existence, Khāṇḍikya and Keśidhvaja, yoga, liberation and praise of the Purāṇa.'
    ],
    contents:[
      'Creation through Pradhāna/Prakṛti, Mahat, Ahaṃkāra, subtle elements, gross elements and the cosmic egg, with Viṣṇu identified with the causal, sustaining and dissolving principles.',
      'Varāha raises the earth; Brahmā creates beings; the text narrates Dakṣa, Lakṣmī and the churning of the ocean, Dhruva, Pṛthu, the Pracetases and Prahlāda.',
      'A complete Purāṇic cosmography of Bhāratavarṣa, Jambūdvīpa, the surrounding dvīpas and oceans, Mount Meru, lower worlds, hells, planetary regions, sun, moon and cosmic time.',
      'Manvantaras and repeated Vyāsas; division of the Vedas into schools; an eighteen-Purāṇa list and accounts of the transmission of Vedic knowledge.',
      'Varṇa, āśrama, saṃskāra, household conduct, marriage, funerary observances and śrāddha.',
      'Solar and lunar genealogies joining Purāṇic mythic history to Rāma, the Kurus, Pāṇḍavas and Yādavas, followed by future dynasties and Kali-yuga.',
      'A long Kṛṣṇa cycle containing Vraja, Govardhana, the cowherd women, Kaṃsa, Mathurā, Dvārakā, Rukmiṇī, Pradyumna, Aniruddha, Naraka, Bāṇa and the Yādava catastrophe.',
      'Teachings on the defects of saṃsāra, cosmic dissolution, the self, yoga, contemplation and release into the highest reality identified with Viṣṇu.'
    ],
    keyContents:[
      'The Parāśara–Maitreya dialogue is the principal narrative frame.',
      'The Bharata narrative in Aṃśa 2 embeds the teaching of Ṛbhu and Nidāgha and turns cosmography toward nonattachment and knowledge.',
      'Aṃśa 3.6 is important for Purāṇic self-definition because it names the eighteen Purāṇas and describes Purāṇic Saṃhitās.',
      'Aṃśa 3.7 presents the famous instruction that those devoted to Viṣṇu are beyond Yama’s ordinary jurisdiction.',
      'Aṃśa 6.6–7 contains the Khāṇḍikya–Keśidhvaja dialogue on yoga and liberation.'
    ],
    namedFeatures:[
      'Varāha and the raising of the earth','Durvāsas, Indra and the churning of the ocean; praise of Lakṣmī','Dhruva’s austerity and exaltation','Pṛthu and the ordering of kingship and the earth','Prahlāda’s devotion and conflict with Hiraṇyakaśipu','Śeṣa supporting the lower worlds','Bharata, Ṛbhu and Nidāgha','The repeated Vyāsas and division of the Vedas','Yama’s instruction concerning devotees of Viṣṇu','Māyāmoha and the defeat of the Daityas through rejection of Vedic authority','Rāma in the solar genealogy','Yayāti and the exchange of youth and old age','Syamantaka jewel','Śiśupāla as a rebirth in the Hiraṇyakaśipu–Rāvaṇa cycle','Kṛṣṇa’s Vraja childhood and Govardhana','Kaṃsa’s death','Rukmiṇī, Naraka, Pārijāta, Uṣā and Aniruddha, Bāṇa','Destruction of the Yādavas','Kali-yuga and the ease of devotion','Khāṇḍikya and Keśidhvaja on yoga'
    ],
    ritualHistory:'The third aṃśa is one of the work’s most important sources for brahmanical social and ritual history. It moves from Vedic transmission into varṇa and āśrama duties, saṃskāras, household discipline, purity, death rites and śrāddha. These passages should be dated as textual strata rather than assumed to be as old as every cosmological narrative in the work.',
    rituals:[
      'Birth and naming-related rites','Marriage and household ritual obligations','Daily duties of the gṛhastha','Purificatory observances','Death and post-cremation rites','Śrāddha for ancestors','Vedic study and sacrificial obligations','Devotional remembrance and worship of Viṣṇu'
    ],
    vratas:['The received six-aṃśa text is less dominated by large vrata catalogues than many later Purāṇas; vows occur within broader discussions of dharma and devotion rather than forming an enormous independent vrata-māhātmya corpus.'],
    sacredGeography:[
      'Bhāratavarṣa and its mountains, rivers and peoples','Jambūdvīpa and the six other dvīpas','Mount Meru and Lokāloka','The lower worlds and hell realms','Mathurā, Vraja and Dvārakā in the Kṛṣṇa cycle'
    ],
    pilgrimage:['Compared with Purāṇas such as Skanda and Padma, the core six-aṃśa Viṣṇu Purāṇa is not organized around a massive tīrtha-māhātmya itinerary. Some manuscripts and related traditions transmit additional temple or pilgrimage material, so such passages must be tied to a specific recension.'],
    dharma:[
      'Duties of the four varṇas are differentiated, but the text also states general duties applicable across social divisions: benevolence, truthfulness, non-theft, sexual restraint, absence of malice and avoidance of wrongful violence.',
      'The four āśramas are brahmacarya, gṛhastha, vānaprastha and sannyāsa, each treated as part of an ordered religious life.',
      'Devotion to Viṣṇu is presented as compatible with social and ritual duty but ultimately oriented toward liberation beyond rebirth.'
    ],
    socialHistory:[
      'Aṃśa 1 includes a mythic account of the emergence of agriculture, social differentiation and sacrifice.',
      'Aṃśa 3 preserves normative brahmanical ideals of education, household life, gender, purity, death and ancestor ritual; these are prescriptions, not transparent descriptions of how every community lived.',
      'The genealogical books construct royal legitimacy through descent, sacrifice, dharma and linkage to epic lineages.'
    ],
    reception:'The Viṣṇu Purāṇa became an authoritative source for later Vaiṣṇava theology. Rāmānuja cites it extensively in constructing a Vedāntic account in which Brahman is identified with Viṣṇu/Nārāyaṇa; later Śrī Vaiṣṇava writers and commentators continued to treat it as a major scriptural authority. The text also received important Sanskrit commentaries, including the Viṣṇucittīya tradition and Śrīdhara Svāmin’s interpretation.',
    significance:'For modern scholarship it is unusually valuable because its six-part architecture is comparatively stable, its pañcalakṣaṇa material is extensive, its Kṛṣṇa cycle can be compared closely with the Harivaṃśa and Bhāgavata Purāṇa, and a full critical edition is available.',
    scholarlyPositions:[
      'H. H. Wilson’s nineteenth-century analysis placed the received text relatively late, even while recognizing much older traditional material; his 1840 translation was the first major published English translation of a Purāṇa and strongly shaped early Western ideas about the genre.',
      'Vincent Smith proposed roughly 400–300 BCE; C. V. Vaidya roughly the ninth century CE; Winternitz an early first-millennium date but warned against precise dating; R. C. Hazra proposed c. 275–325 CE; R. C. Dikshitar argued for a much earlier BCE range; Roy placed it after the ninth century; Wendy Doniger suggested about 450 CE. These are a history of scholarship, not a single modern consensus.',
      'Ludo Rocher emphasizes that the dating of the Viṣṇu Purāṇa is as contested as that of the Purāṇas generally and that manuscript stratification prevents one date from explaining every passage.',
      'McComas Taylor, working with the critical edition, treats a fourth–fifth-century CE received form as a plausible working estimate rather than a demonstrable exact date.'
    ],
    scholarlyDebates:[
      'Whether the Viṣṇu Purāṇa borrowed from the Harivaṃśa, shared an intermediate source with it, or preserves an independent reworking of common Kṛṣṇa traditions.',
      'Whether the Bhāgavata Purāṇa directly expands the Viṣṇu Purāṇa’s Kṛṣṇa narrative or whether both depend on related earlier traditions.',
      'The direction of borrowing between Purāṇic dharma passages and Dharmaśūtra/Dharmaśāstra literature: Hazra sometimes argued for Purāṇic priority, while later scholars have proposed borrowing into the Purāṇa.',
      'How to interpret the text’s simultaneous personal devotion to Viṣṇu and its strong language about Viṣṇu as the all-encompassing Absolute; Advaita and Viśiṣṭādvaita readers have drawn different metaphysical conclusions.',
      'How the traditional 23,000-verse extent relates to the much shorter received text.'
    ],
    dependencies:[
      'Vedic mythology supplies older motifs, including Indra, cosmic sacrifice, Viṣṇu’s cosmic strides and creation language, but these are reworked in a Purāṇic Vaiṣṇava frame.',
      'The Mahābhārata is known to the text: Vyāsa is praised as its composer, Pāṇḍava genealogies appear, and Kṛṣṇa’s relation to Arjuna is anticipated.',
      'The relation to the Harivaṃśa is close but not mechanically reducible to one-way borrowing.',
      'The Brahma Purāṇa preserves strikingly extensive verbal parallels: Taylor notes that the Kaṇḍu–Pramlocā narrative and nearly the whole Kṛṣṇa cycle occur there with very close wording, generally taken to show reuse of Viṣṇu-Purāṇa-like material by the Brahma Purāṇa or a shared source.',
      'The Bhāgavata Purāṇa develops many of the same Kṛṣṇa traditions with a far more expansive devotional rhetoric.'
    ],
    primaryEvidence:[
      'Pathak critical edition: six aṃśas and 126 adhyāyas','GRETIL electronic text based on the Pathak critical edition','H. H. Wilson’s 1840 translation and later Fitzedward Hall revision','McComas Taylor’s 2021 English translation of the critical text'
    ],
    primaryPassages:[
      'Viṣṇu Purāṇa 1.1–2: Maitreya’s questions, Parāśara’s transmission story and the opening account of Viṣṇu and creation','Viṣṇu Purāṇa 1.9: ocean-churning and Lakṣmī hymn','Viṣṇu Purāṇa 1.16–20: Prahlāda cycle','Viṣṇu Purāṇa 2.13–16: Bharata and the Ṛbhu–Nidāgha teaching','Viṣṇu Purāṇa 3.3–6: repeated Vyāsas, Vedic divisions and Purāṇa classification','Viṣṇu Purāṇa 3.8–16: social duties, āśramas, domestic rites and śrāddha','Viṣṇu Purāṇa 4.1–24: dynastic histories','Viṣṇu Purāṇa 5.1–38: Kṛṣṇa cycle','Viṣṇu Purāṇa 6.1–7: Kali-yuga, dissolution, suffering, yoga and liberation','Viṣṇu Purāṇa 6.8: closing praise and fruits of hearing the text'
    ],
    articleSections:[
      {
        title:'Date of composition and textual formation',
        paragraphs:[
          'No single date can be assigned to every layer of the Viṣṇu Purāṇa. The manuscripts are the products of repeated copying, and the work itself incorporates materials of different kinds and ages. Modern dating therefore asks when something close to the received six-aṃśa form existed, not when every myth in it was first told.',
          'The history of scholarship is unusually wide-ranging. Wilson entertained a late date for the received text; Vincent Smith proposed 400–300 BCE; C. V. Vaidya about the ninth century; Winternitz an early first-millennium setting while warning that precise dating was impossible; Hazra c. 275–325 CE; Dikshitar a much earlier BCE range; Roy a post-ninth-century date; and Wendy Doniger about 450 CE. These estimates reflect very different methods and should not be presented as an eight-way modern consensus.',
          'A more useful present-day formulation is that substantial portions of the received work are compatible with the Gupta or early post-Gupta world. McComas Taylor regards the fourth–fifth centuries CE as a reasonable estimate for the text reaching approximately its current extent, while still stressing that Purāṇic transmission is layered. References to and reuse by later works establish that the Viṣṇu Purāṇa tradition was securely in circulation long before many surviving manuscripts were copied.',
          'The physical date of a manuscript is therefore not the date of the composition it transmits. Many surviving Sanskrit manuscripts are comparatively late copies on paper or palm leaf. Copyists could normalize, omit, rearrange or supplement material, which is precisely why a critical edition based on many witnesses is so valuable.'
        ]
      },
      {
        title:'Structure and the pañcalakṣaṇa model',
        paragraphs:[
          'The extant work has six aṃśas and 126 chapters: 22, 16, 18, 24, 38 and 8 respectively. Aṃśa 5, the Kṛṣṇa book, is the longest; Aṃśa 6 is the shortest.',
          'More than most large Purāṇas, the Viṣṇu Purāṇa visibly organizes a major share of its material around the five classical characteristics of Purāṇa: sarga (primary creation), pratisarga (re-creation and dissolution), vaṃśa (genealogies), manvantara (cycles ruled by Manus) and vaṃśānucarita (histories of dynasties). The fit is not mathematically perfect because the work also contains dharma, ritual, yoga, theology, hymns and cosmography, but the fivefold model genuinely explains much of its architecture.',
          'Traditional catalogues attribute 23,000 verses to the Viṣṇu Purāṇa, whereas the received text has roughly six to seven thousand. Rocher notes that older attempts to solve this by identifying a hypothetical longer Bṛhadviṣṇu or by attaching other texts remain uncertain. A modern article should therefore display both figures and explain the problem instead of putting “23,000 verses” in an infobox as though all are extant.'
        ]
      },
      {
        title:'Narrative frame, authorship and transmission',
        paragraphs:[
          'The principal frame is a dialogue in which Maitreya questions the sage Parāśara. Parāśara explains that, after his father was killed by a Rākṣasa, he began a destructive rite against Rākṣasas; Vasiṣṭha persuaded him to stop, and Pulastya rewarded his restraint by granting knowledge of the Purāṇa. Parāśara then transmits that knowledge to Maitreya.',
          'Like the Mahāpurāṇas generally, tradition ultimately associates the Purāṇa corpus with Vyāsa. This is a statement of sacred authorship and transmission, not evidence that a single historical person wrote the entire surviving text at one moment. The explicit speaking voice of the Viṣṇu Purāṇa is Parāśara, and the work itself also presents a chain of Purāṇic transmission through sages and Sūtas.',
          'Compared with many Purāṇas, the framing remains unusually easy to follow. Embedded stories do occur, but the main Parāśara–Maitreya dialogue is rarely lost beneath many levels of narration.'
        ]
      },
      {
        title:'Detailed contents — complete 126-chapter map',
        paragraphs:[
          'The following map follows the chapter organization of the modern critical text as represented in McComas Taylor’s 2021 translation. Individual printed recensions may title or divide particular units differently, but the six-part 126-chapter architecture is the standard reference point for the received text.'
        ],
        subsections:chapterMap
      },
      {
        title:'Aṃśa 1 — Creation, gods and exemplary devotees',
        paragraphs:[
          'The first aṃśa establishes the work’s cosmology. Viṣṇu is described as the ground from which the universe emerges, in which it persists and into which it returns. Creation is explained through categories closely related to Sāṃkhya—Pradhāna or Prakṛti, Mahat, Ahaṃkāra, subtle elements, gross elements, senses and the cosmic egg—while the Purāṇa identifies the ultimate causal reality behind them with Viṣṇu.',
          'The book moves from measures of cosmic time and Varāha’s raising of the earth to Brahmā’s creation of beings and a mythic account of human society. It then narrates Rudra, Dakṣa’s descendants, Durvāsas and Indra, the churning of the ocean and Lakṣmī, Dhruva’s austerities and exaltation, Pṛthu and the Pracetases.',
          'Chapters 16–20 form the Prahlāda cycle. Prahlāda remains devoted to Viṣṇu despite persecution by Hiraṇyakaśipu and instruction from teachers aligned with his father. The Viṣṇu Purāṇa’s version is an important early Purāṇic form of the story; later Purāṇas elaborate the Nṛsiṃha episode differently. The first aṃśa closes by returning from narrative to metaphysics and the nature of the Absolute.'
        ]
      },
      {
        title:'Aṃśa 2 — Earth, heavens, hells and the teaching of Bharata',
        paragraphs:[
          'The second aṃśa maps the Purāṇic universe. It describes Jambūdvīpa and Bhāratavarṣa, then Plakṣa, Śālmala, Kuśa, Krauñca, Śāka and Puṣkara, together with concentric oceans traditionally characterized by salt water, sugarcane juice, wine, ghee, curds, milk and fresh water. Mountains, rivers, peoples and the cosmic boundary at Lokāloka make geography part of a theological cosmology rather than a modern cartographic exercise.',
          'The text then descends through subterranean realms and Narakas and rises through the planetary and celestial regions. The sun, moon, planets, rain cycle and calendrical time are treated as coordinated parts of a living cosmos governed by Viṣṇu.',
          'Chapters 13–16 change register. King Bharata, after renouncing kingship, becomes attached to a deer and undergoes further births; the narrative culminates in teaching on nonattachment and the highest truth, including the embedded Ṛbhu–Nidāgha discourse. The cosmographic book therefore ends as a philosophical argument about the difference between apparent worldly distinctions and the reality apprehended through knowledge.'
        ]
      },
      {
        title:'Aṃśa 3 — Manvantaras, Vedas, dharma and ritual',
        paragraphs:[
          'The third aṃśa begins with the Manus and cosmic cycles. The current age belongs to Vaivasvata, the seventh Manu. The text also explains the repeated appearance of a Vyāsa who divides and arranges Vedic revelation in successive Dvāpara ages; the present Vyāsa is Kṛṣṇa Dvaipāyana.',
          'Chapters 3–6 are especially important for the history of Hindu textual classification. They describe the division of the four Vedas into branches and teachers, mention four Purāṇic Saṃhitās and give a list of eighteen Purāṇas. This self-conscious placement of Purāṇa alongside Vedic learning is part of the work’s claim to authority.',
          'The middle of the book turns to normative social and ritual teaching: the duties of varṇa, the four āśramas, saṃskāras, marriage, household conduct, purification, death observances and śrāddha. The text differentiates social duties but also gives common moral norms—truthfulness, benevolence, non-theft, restraint, avoidance of malice and wrongful violence—and connects righteous conduct with worship of Viṣṇu.',
          'The final chapters narrate Māyāmoha, a deluding manifestation through whom the Daityas are induced to reject Vedic authority and are thereby made vulnerable to the gods. The episode is polemical and reflects brahmanical competition with doctrines portrayed as anti-Vedic; it should be read historically as sectarian literature, not as a neutral description of Buddhists or Jains.'
        ]
      },
      {
        title:'Aṃśa 4 — Solar, lunar and future dynasties',
        paragraphs:[
          'The fourth aṃśa is the great genealogical book. It begins from Manu and the solar dynasty, passes through Ikṣvāku, Sagara and a compressed Rāma narrative, and includes the line of Nimi and the Janakas of Mithilā. It then turns to the lunar line beginning with Soma, Budha and Purūravas.',
          'Yayāti and his sons provide the branching structure for later peoples and dynasties. The Yadu line leads to the ancestry of Vasudeva and Kṛṣṇa, while the Puru line leads toward Bharata, Kuru, the Kauravas and Pāṇḍavas. The text thus connects Purāṇic genealogy with the narrative world of the Mahābhārata.',
          'The closing chapters move into “future” dynasties from the narrator’s perspective: descendants of Parīkṣit and other lines, followed by later kings and the political decline associated with Kali-yuga. Such lists have repeatedly been used for historical dating, but they are among the portions most likely to have been extended or adjusted during transmission.'
        ]
      },
      {
        title:'Aṃśa 5 — Kṛṣṇa',
        paragraphs:[
          'The fifth aṃśa contains 38 chapters and more than a quarter of the work. Kṛṣṇa is presented as a manifestation of Viṣṇu whose descent responds to the burden of the earth and the tyranny of Kaṃsa. The narrative covers Devakī and Vasudeva, the transfer to the cowherd settlement, Pūtanā, Kāliya, Dhenuka and Pralamba, the seasons of Vraja, Govardhana, Indra’s submission and Kṛṣṇa’s relations with the cowherd women.',
          'The story then moves to Mathurā: Akrūra’s mission, the departure from Vraja, Kaṃsa’s wrestlers and Kaṃsa’s death. Later chapters narrate Jarāsandha’s attacks, the move to Dvārakā, Rukmiṇī, Pradyumna and Aniruddha, Naraka, Aditi’s earrings, the Pārijāta tree, Uṣā and Bāṇa, Balarāma’s exploits, the destruction of the Yādavas and Arjuna’s removal of the surviving women from Dvārakā.',
          'The Viṣṇu Purāṇa stands between the Harivaṃśa and the Bhāgavata Purāṇa in the history of Sanskrit Kṛṣṇa narrative. The precise direction of borrowing is debated. Taylor notes that the Brahma Purāṇa reproduces nearly the whole Viṣṇu-Purāṇa Kṛṣṇa cycle with extremely close wording but a different frame, powerful evidence for the way Purāṇic authors reused large textual blocks.',
          'Compared with the Bhāgavata Purāṇa, the narrative is generally more economical and less saturated with explicit devotional commentary, though devotion remains central. That contrast is one reason the two texts are so valuable when studied together.'
        ]
      },
      {
        title:'Aṃśa 6 — Kali-yuga, dissolution, yoga and liberation',
        paragraphs:[
          'The final aṃśa first describes Kali-yuga as an age of declining social and religious order. It immediately adds a paradoxical advantage: practices that were difficult in earlier ages can bear fruit through comparatively accessible devotion to Viṣṇu. This theme later became important in bhakti traditions.',
          'Chapters 3–5 distinguish modes of cosmic dissolution and turn from cosmic catastrophe to the existential problem of saṃsāra: suffering in birth, youth, old age, death, hell and even the impermanence of heavenly reward. Liberation requires knowledge of the self and freedom from identification with Prakṛti.',
          'The Khāṇḍikya–Keśidhvaja dialogue in chapters 6–7 presents a disciplined yoga involving ethical restraints and observances, posture and breath, withdrawal of the senses, concentration and contemplation. The goal is absorption in the supreme reality identified with Viṣṇu. The final chapter praises hearing and transmitting the Viṣṇu Purāṇa itself.'
        ]
      },
      {
        title:'Theology: Viṣṇu, Brahman, Kṛṣṇa and the other gods',
        paragraphs:[
          'The Purāṇa repeatedly identifies Viṣṇu not merely as one god among others but with the underlying reality of the cosmos. He is spoken of as cause and effect, manifest and unmanifest, the inner self of beings and the reality in which creation, preservation and dissolution occur. Brahmā and Rudra/Śiva are honoured but are situated within this Viṣṇu-centred metaphysics.',
          'The text can therefore sound simultaneously personal and metaphysical. Wilson described it in “pantheistic” terms; later interpreters have read its language through Advaita, Viśiṣṭādvaita and other Vedāntic frameworks. The Purāṇa itself does not map neatly onto the later boundaries of any single Vedānta school.',
          'Kṛṣṇa is the central avatāra of the fifth aṃśa, but the work also knows Varāha, Nṛsiṃha, Vāmana/Trivikrama, Rāma and other manifestations. Its avatāra theology is less standardized than later popular lists of exactly ten forms.',
          'Lakṣmī receives a major hymn in the ocean-churning narrative and is paired with Viṣṇu through complementary theological imagery. Devotion, refuge in Viṣṇu, correct action, knowledge and yoga are not isolated systems in the work; they are repeatedly brought into relation with one another.'
        ]
      },
      {
        title:'Manuscripts, editions and translations',
        paragraphs:[
          'The text survives in many manuscripts and printed recensions. Because manuscripts were repeatedly recopied, a nineteenth-century or later physical witness can preserve much older wording while also containing scribal interventions. The manuscript tradition is therefore evidence to be compared, not a single pristine archetype.',
          'H. H. Wilson published his English translation in 1840, the first major published English translation of a Purāṇa. Fitzedward Hall later revised and annotated it. Wilson’s work remains historically important and is still useful for its notes, but it predates modern manuscript collation.',
          'M. M. Pathak’s Critical Edition of the Viṣṇupurāṇam was published by the Oriental Institute, Vadodara, in two volumes in 1997 and 1999. The project gathered 43 Sanskrit manuscripts and selected 27 for constructing the critical text and apparatus. GRETIL provides an electronic version based on this edition.',
          'McComas Taylor’s The Viṣṇu Purāṇa: Ancient Annals of the God with Lotus Eyes (ANU Press, 2021) is a complete modern English translation based on the critical edition and is available open access. It is the best convenient English starting point for readers who want a modern translation tied to the critical Sanskrit text.'
        ]
      },
      {
        title:'Relationship to other texts and later influence',
        paragraphs:[
          'The Viṣṇu Purāṇa is saturated with older Sanskrit traditions. It reworks Vedic myths, knows the Mahābhārata, alludes to the Rāmāyaṇa world, shares Kṛṣṇa material with the Harivaṃśa and stands in a close but debated relationship with the Bhāgavata Purāṇa.',
          'Its didactic chapters likewise overlap with Dharmaśūtra and Dharmaśāstra concerns. Older scholarship sometimes argued that dharma texts borrowed from the Purāṇa; later scholars have often reversed the direction or proposed common traditions. The safest conclusion is that the relationship must be argued passage by passage.',
          'The work became especially influential in Śrī Vaiṣṇava intellectual history. Rāmānuja cites the Viṣṇu Purāṇa frequently in his Vedāntic works to connect Upaniṣadic Brahman with Viṣṇu/Nārāyaṇa and to articulate the relation of God, selves and world. This reception makes the Purāṇa important not only for mythology but for the history of systematic Vedānta.',
          'Other readers found different possibilities in the same text. Śrīdhara Svāmin and later interpreters could emphasize renunciation and nondual knowledge, while Vaiṣṇava commentators read the same metaphysical language through a theistic framework. The reception history is therefore evidence of the text’s theological range.'
        ]
      },
      {
        title:'Modern cultural adaptation',
        paragraphs:[
          'The 2025 animated film Mahavatar Narsimha drew on the Viṣṇu Purāṇa together with the Nṛsiṃha Purāṇa and Bhāgavata Purāṇa. Director Ashwin Kumar has specifically described reading these Purāṇic sources while developing the film. The adaptation belongs to the modern reception of the Prahlāda–Nṛsiṃha cycle rather than to the textual history of the Sanskrit Purāṇa itself.'
        ]
      }
    ],
    sources:[
      {title:'McComas Taylor — The Viṣṇu Purāṇa: Ancient Annals of the God with Lotus Eyes (ANU Press, 2021)',detail:'Modern complete translation based on the critical edition; introduction discusses date, authorship, audience, intertextuality, theology and the six-book structure.',url:'https://press.anu.edu.au/publications/textbooks/visnu-purana'},
      {title:'M. M. Pathak (ed.) — The Critical Edition of the Viṣṇupurāṇam, 2 vols. (Oriental Institute, 1997–1999)',detail:'Critical Sanskrit edition based on extensive manuscript collation.',url:'https://books.google.com/books/about/The_critical_edition_of_the_Vi%E1%B9%A3%E1%B9%87upur.html?id=BjwqAAAAYAAJ'},
      {title:'GRETIL — Viṣṇupurāṇa critical text',detail:'Electronic Sanskrit text based on Pathak’s critical edition.',url:'https://gretil.sub.uni-goettingen.de/gretil/corpustei/transformations/html/sa_viSNupurANa-crit.htm'},
      {title:'H. H. Wilson — The Vishnu Purana (1840)',detail:'Historic English translation with extensive comparative notes.',url:'https://books.google.com/books?id=dNNCAAAAcAAJ'},
      {title:'Wisdomlib — Taylor translation contents',detail:'Convenient online chapter-by-chapter index of the 2021 translation.',url:'https://www.wisdomlib.org/hinduism/book/the-vishnu-purana-taylor'},
      {title:'Wikipedia — Vishnu Purana',detail:'Used as a coverage checklist for the public-facing article; claims were cross-checked against stronger sources rather than copied.',url:'https://en.wikipedia.org/wiki/Vishnu_Purana'},
      {title:'Ludo Rocher — The Purāṇas (1986)',detail:'Standard modern survey for Purāṇic classification, dating, verse counts and textual history.',url:'https://books.google.com/books?id=n0-4RJh5FgoC'},
      {title:'Sucharita Adluri — Textual Authority in Classical Indian Thought: Ramanuja and the Vishnu Purana (2015)',detail:'Study of the Viṣṇu Purāṇa’s role in Rāmānuja’s Vedānta and Śrī Vaiṣṇava textual authority.',url:'https://www.routledge.com/Textual-Authority-in-Classical-Indian-Thought-Ramanuja-and-the-Visnu-Purana/Adluri/p/book/9780415695756'},
      {title:'Ashwin Kumar interview on Mahavatar Narsimha source texts (2025)',detail:'Modern reception evidence for use of the Viṣṇu Purāṇa in the animated film.',url:'https://www.ottplay.com/news/mahavatar-narsimha-maker-ashwin-kumar-on-why-he-chose-to-start-with-the-fourth-avatar/4ecdc5e0d2422'}
    ],
    bibliography:[
      'Ludo Rocher, The Purāṇas (Wiesbaden: Harrassowitz, 1986)',
      'R. C. Hazra, Studies in the Purāṇic Records on Hindu Rites and Customs',
      'Cornelia Dimmitt and J. A. B. van Buitenen, Classical Hindu Mythology: A Reader in the Sanskrit Purāṇas',
      'Sucharita Adluri, Textual Authority in Classical Indian Thought: Ramanuja and the Vishnu Purana',
      'McComas Taylor, The Viṣṇu Purāṇa: Ancient Annals of the God with Lotus Eyes (2021)'
    ]
  });
})();
