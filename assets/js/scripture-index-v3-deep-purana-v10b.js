(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Purāṇa:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const R='Ludo Rocher, The Puranas (Wiesbaden, 1986)';
  const H='R. C. Hazra, Studies in the Puranic Records on Hindu Rites and Customs and related Purana studies';
  const AIT='Ancient Indian Tradition and Mythology English translation series, Motilal Banarsidass';
  const W=(title,url,detail)=>({title:`Wikipedia — ${title}`,detail,url});

  put('Brahma Purāṇa',{
    sanskritTitle:'ब्रह्मपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'A layered text with material ranging from the early centuries CE to the medieval period; the received pilgrimage-heavy recension is substantially later than its oldest cited material.',extent:'About 245 chapters in the common printed recension; verse totals vary by manuscript and edition',
    leadParagraphs:[
      'The Brahma Purana is called “Brahma” from its narrative authority, but the received work is not mainly a theology of Brahma. It is a composite Purana in which creation and genealogy coexist with very large blocks of sacred geography, especially the Purushottama-Jagannatha region of Odisha and the Gautami or Godavari pilgrimage cycle.',
      'Its shape makes the text a good example of how a Purana grows. The conventional five Purana subjects occupy only part of the received work; pilgrimage mahatmyas, vows, temple cults and regional sacred histories became equally important to the form that survives.'
    ],articleSections:[
      {title:'Date and textual formation',paragraphs:[
        'Verses attributed to a Brahma Purana were known relatively early, but the present text cannot be assigned wholesale to one early date. The wording and regional cult material show repeated expansion.',
        'The surviving corpus contains extensive Odisha and Godavari material that belongs to historical religious landscapes developing over many centuries. The safest chronology therefore distinguishes an older Purana title and core from the later received pilgrimage compilation.',
        'Hazra and later Purana scholarship repeatedly warn that citations in medieval digests may point to an older Brahma Purana passage no longer found in exactly the same place in modern printed editions.'
      ]},
      {title:'Structure and major blocks',books:[
        {number:1,title:'Creation and genealogical materials',summary:'Cosmogony, gods, sages, Manus and dynastic material establish the conventional Purana frame but do not dominate the whole received text.'},
        {number:2,title:'Purushottama and Odisha',summary:'Large sections praise Purushottama-Kshetra, Jagannatha, sacred sites of Odisha and related Vaishnava and Saura cult geography.'},
        {number:3,title:'Gautami Mahatmya',summary:'An extensive sacred geography of the Godavari, narrating the river’s sanctity, tirthas, myths, ritual merits and pilgrimage sequence.'},
        {number:4,title:'Dharma, vrata and worship',summary:'Domestic and public religious duties, vows, gifts, ritual observance and deity worship appear throughout the text rather than in one neat manual.'}
      ]},
      {title:'Purushottama, Jagannatha and sacred geography',paragraphs:[
        'The Odisha materials are central to the received Brahma Purana. Purushottama is presented through sacred landscape, deity, temple and pilgrimage rather than as an abstract doctrine alone.',
        'These chapters are important for the history of Jagannatha because they show Sanskrit Purana literature absorbing and organizing a regional cult into a wider sacred geography of Vishnu and Krishna.',
        'The same principle operates in the Gautami Mahatmya: a river becomes a chain of mythic places, ritual acts and remembered stories, turning geography into a scripture that can be travelled.'
      ]},
      {title:'Manuscripts and regional growth',paragraphs:[
        'The chapter order and extent of the Brahma Purana vary. A verse number from one edition should therefore not be treated as universally portable without checking the recension.',
        'The large mahatmya blocks are not evidence that the work is “inauthentic”; they are evidence of how Purana transmission worked. Regional sacred traditions could be incorporated into a recognized Purana title while retaining older cosmological and genealogical layers.',
        'Modern editions often print the received corpus as one book, but textual history requires separating blocks and comparing quotations, manuscripts and parallel passages in other Puranas.'
      ]},
      {title:'Theology and ritual life',paragraphs:[
        'The work contains Vaishnava, Saura and mixed deity material. Its title does not force every chapter into a single Brahma-centred theology.',
        'Pilgrimage, bathing, gifts, vows and temple worship repeatedly connect cosmological merit to concrete places and ritual calendars. The religious world of the text is therefore lived and geographic as much as doctrinal.'
      ]},
      {title:'Editions and reception',paragraphs:[
        'The Sanskrit text circulated in several printed recensions and was translated in the Ancient Indian Tradition and Mythology series. The Gautami and Odisha materials have also been studied separately because their regional histories are substantial enough to form subjects in their own right.',
        'The Brahma Purana is frequently cited in discussions of Jagannatha, Konark, tirtha literature and the transformation of regional cults within pan-Indian Sanskrit sacred geography.'
      ]}
    ],sources:merge(D['Purāṇa:Brahma Purāṇa']?.sources,[W('Brahma Purana','https://en.wikipedia.org/wiki/Brahma_Purana','Received structure, pilgrimage character and textual history.'),R,H,AIT,'Brahma Purana Sanskrit editions and Gautami Mahatmya studies'])
  });

  put('Bhaviṣya Purāṇa',{
    sanskritTitle:'भविष्यपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'Extremely layered: older material coexists with sections composed or revised from the medieval period into the 18th–19th centuries.',extent:'Common Bombay recension: four parvas—Brahma, Madhyama, Pratisarga and Uttara—with hundreds of chapters; other manuscripts differ sharply',
    leadParagraphs:[
      'The Bhavishya Purana is one of the clearest examples of a Purana as a living textual archive. Its title means “future,” but the received manuscripts are not simply a book of prophecy. They contain dharma, ritual, solar worship, Tantra, festivals, vows, donations, pilgrimage and historical-looking narratives that were revised over a very long period.',
      'The four-parva printed form should not be mistaken for a single composition. The Brahma, Madhyama, Pratisarga and Uttara materials have different histories, and some manuscripts omit or rearrange major divisions.'
    ],articleSections:[
      {title:'Date and composition',paragraphs:[
        'The text known today cannot be dated as one work. Older Purana and Dharma material stands beside unmistakably later sections. The Pratisarga narratives contain knowledge of medieval and early modern political and religious history, and parts of them reach into the nineteenth century.',
        'Earlier references to a Bhavishya or Bhavishyat Purana show that a text under this name existed long before the latest layers. The historical problem is therefore continuity of title, not the fiction that every surviving chapter was composed at the same time.',
        'Hazra, Rocher and other Purana scholars treat the received text as heavily accreted. This is exactly the kind of case where a date range must be attached to a section, not to the title alone.'
      ]},
      {title:'The four parvas',books:[
        {number:1,title:'Brahma Parva',summary:'A large body of rites, social and domestic rules, festivals, deity worship and substantial Saura material. The common Bombay edition numbers more than two hundred chapters.'},
        {number:2,title:'Madhyama Parva',summary:'A later ritual and Tantric section, organized in subdivisions and concerned with mantra, worship and religious procedure.'},
        {number:3,title:'Pratisarga Parva',summary:'Dynastic and “future history” narratives, including material on later religious communities, medieval rulers, Mughals and early modern events. This is the most textually controversial part.'},
        {number:4,title:'Uttara Parva / Bhavishyottara',summary:'A massive handbook of vrata, festivals, tithi observance, gifts, pilgrimage and religious merit; often treated as an independent Bhavishyottara Purana tradition.'}
      ]},
      {title:'Solar worship and ritual culture',paragraphs:[
        'The Brahma Parva preserves important Saura material, including accounts connected with Shakadvipa and priestly groups associated with solar worship. These passages are historically significant even though they stand inside a highly composite Purana.',
        'Festival calendars, deity worship and household observances make much of the text closer to a ritual compendium than a mythological narrative. The Uttara material in particular became useful for the history of vrata and dana.'
      ]},
      {title:'Pratisarga and historical accretion',paragraphs:[
        'The Pratisarga Parva follows the Purana technique of narrating future rulers from the perspective of an earlier sacred frame. But the surviving section reflects knowledge of events and communities far later than the putative narrator.',
        'References to Islam, Christianity, Sikhism, Mughal rulers, later political events and even British-era material are evidence of continued rewriting. They should not be projected backwards as predictions from the early first millennium.',
        'This does not make the entire Bhavishya Purana late. It demonstrates that the title remained open to new historical interpretation long after older ritual sections were already in circulation.'
      ]},
      {title:'Manuscripts and recensions',paragraphs:[
        'Five broad manuscript forms have been reported, and not all preserve the same parvas. Printed editions therefore represent one branch of a larger, unstable history.',
        'The Uttara Parva also circulates as Bhavishyottara. Treating every Bhavishyottara citation as automatically identical with every Bhavishya manuscript can create false chapter references.',
        'A responsible citation should name parva, khanda where relevant, chapter, and edition.'
      ]},
      {title:'Reception and modern controversy',paragraphs:[
        'Because the Pratisarga contains late material about non-Hindu religions and recent history, isolated verses are frequently circulated polemically. Their date and manuscript context matter more here than in almost any other Purana.',
        'For historians, the Bhavishya Purana is valuable precisely because it documents how a Sanskrit sacred title remained responsive to changing political and religious worlds.'
      ]}
    ],sources:merge(D['Purāṇa:Bhaviṣya Purāṇa']?.sources,[W('Bhavishya Purana','https://en.wikipedia.org/wiki/Bhavishya_Purana','Four parvas, manuscript variation and chronology of later layers.'),R,H,'Rajendra Chandra Hazra on the Bhavishya and Bhavishyottara traditions','Bhavishya Purana Bombay/Venkateshvara editions'])
  });

  put('Brahmavaivarta Purāṇa',{
    sanskritTitle:'ब्रह्मवैवर्तपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'An older text under the title existed by the late first millennium CE; the dominant received recension was extensively rewritten, probably in Bengal, in the 15th–16th centuries.',extent:'4 khandas, about 274–276 chapters; traditional count 18,000 verses',
    leadParagraphs:[
      'The received Brahmavaivarta Purana is a Krishna-centred Purana in which Radha, Krishna and divine Prakriti organize the theology of creation. Its four khandas move through Brahma, Prakriti and the goddesses, Ganesha, and a very large Krishna cycle.',
      'Its textual history is unusually important because medieval legal writers quote an older Brahmavaivarta that differs drastically from the surviving text. The present Purana is therefore not simply “late” or “early”: an old title was transformed into a much later devotional corpus.'
    ],articleSections:[
      {title:'Date and textual history',paragraphs:[
        'Evidence from quotations shows that a Brahmavaivarta Purana existed by the early medieval period. Hazra argued for an older version by roughly the seventh century, and later nibandha writers quote many passages under the title.',
        'The striking fact is that most of those older quoted verses are absent from the common manuscripts. The dominant recension therefore underwent a major rewrite, usually placed in the fifteenth or sixteenth century and associated with eastern India.',
        'The related Brahmakaivarta title and manuscripts labelled Adi-Brahmavaivarta further complicate the history. They cannot simply be merged with the common four-khanda text.'
      ]},
      {title:'The four khandas',books:[
        {number:1,title:'Brahma Khanda',summary:'Creation and theological framing in which Krishna is the primordial source and Brahman is interpreted through Krishna’s supreme reality.'},
        {number:2,title:'Prakriti Khanda',summary:'The divine feminine, especially Radha, Durga, Lakshmi, Sarasvati and Savitri, interpreted as manifestations of primordial Prakriti.'},
        {number:3,title:'Ganesha Khanda',summary:'Birth, deeds and worship of Ganesha integrated into the Purana’s wider Krishna-centred cosmology.'},
        {number:4,title:'Krishnajanma Khanda',summary:'The largest section, narrating Radha-Krishna, Goloka, divine love, Krishna’s birth and extensive devotional mythology.'}
      ]},
      {title:'Radha, Krishna and Goloka',paragraphs:[
        'The Purana gives Radha an unusually elevated place. She is not only Krishna’s beloved but the primordial feminine principle inseparable from him.',
        'Goloka is placed above ordinary cosmic worlds and becomes the eternal setting of Radha-Krishna. This theology had major importance for later Krishna devotional imagination even where later sampradayas did not accept every detail of the text.',
        'The work also identifies other gods and goddesses within a unified hierarchy centred on Krishna and Radha, producing a theology that is both sectarian and strongly integrative.'
      ]},
      {title:'Dharma and later additions',paragraphs:[
        'The received text contains chapters on social duty, life stages, gifts, vows and other Smriti-like topics. Comparison with older quotations suggests that some of this material belongs to the later redactional history.',
        'This makes the Brahmavaivarta especially useful for studying how Purana and Dharma literature could be rewritten in response to medieval devotional culture.'
      ]},
      {title:'Manuscripts and related titles',paragraphs:[
        'Manuscripts vary in chapter totals and in the relationship between Brahmavaivarta and Brahmakaivarta. A title match by itself is not enough to establish textual identity.',
        'The older quotation record is one of the strongest examples in Purana studies of how a recognized title can survive while the contents under that title change radically.'
      ]},
      {title:'Reception',paragraphs:[
        'The Purana’s Radha-Krishna mythology influenced eastern Indian devotional literature, visual culture and performance. It is frequently discussed alongside the Bhagavata Purana, though the two works differ sharply in date, style and theology.',
        'Its strong feminine theology also makes it important for the study of relations between Vaishnava and Shakta conceptual worlds.'
      ]}
    ],sources:merge(D['Purāṇa:Brahmavaivarta Purāṇa']?.sources,[W('Brahma Vaivarta Purana','https://en.wikipedia.org/wiki/Brahma_Vaivarta_Purana','Four khandas, radical rewriting and Radha-Krishna theology.'),R,H,'R. C. Hazra on older Brahmavaivarta quotations','Brahmavaivarta Purana Sanskrit editions'])
  });

  put('Vāmana Purāṇa',{
    sanskritTitle:'वामनपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'A layered early-medieval Purana, with much of the received text commonly placed between roughly the 7th and 11th centuries CE.',extent:'About 95 chapters in the common received text; verse totals vary',
    leadParagraphs:[
      'The Vamana Purana is named for Vishnu’s Vamana avatara, but its received contents are far more strongly concerned with Shiva, sacred geography and pilgrimage than the title alone suggests. Kurukshetra and northern Indian tirthas occupy a major place.',
      'The work therefore exposes a basic weakness in modern sectarian labels: Purana titles, catalogue classifications and the actual theology of surviving chapters do not always line up.'
    ],articleSections:[
      {title:'Date and formation',paragraphs:[
        'The surviving Vamana Purana is composite. Linguistic, sectarian and geographic layers suggest formation across the early medieval period rather than one authorial moment.',
        'Older descriptions of the Vamana Purana do not always match the present text, indicating loss, replacement or substantial recensional growth.'
      ]},
      {title:'Contents and sacred geography',books:[
        {number:1,title:'Mythic and cosmological opening',summary:'Creation, gods, sages and episodes that establish the Purana frame.'},
        {number:2,title:'Shiva and Parvati narratives',summary:'Large Shaiva narrative blocks, including stories of Shiva, Sati/Parvati and sacred forms of the Lord.'},
        {number:3,title:'Kurukshetra Mahatmya',summary:'Tirthas, rivers, shrines and ritual merits of Kurukshetra and surrounding sacred geography.'},
        {number:4,title:'Vamana and Vaishnava material',summary:'The Vamana-Bali cycle and Vishnu material appear within a corpus whose broader received character remains mixed.'}
      ]},
      {title:'Kurukshetra as sacred landscape',paragraphs:[
        'The text treats Kurukshetra not merely as the battlefield of the Mahabharata but as a dense tirtha landscape whose lakes, rivers and shrines carry distinct myths and ritual rewards.',
        'This transformation of epic geography into pilgrimage geography is a major feature of Purana religion: a remembered sacred event becomes a network of repeatable ritual journeys.'
      ]},
      {title:'Sectarian character',paragraphs:[
        'Substantial Shaiva material makes the Vamana Purana impossible to describe as simply a Vaishnava book because of its title. The text praises Shiva, Parvati and Shaiva sacred sites alongside Vishnu narratives.',
        'The mixed character is historically informative. It shows that Purana communities copied and expanded recognized titles within religious environments where sectarian boundaries were porous.'
      ]},
      {title:'Manuscripts and missing material',paragraphs:[
        'The received text does not preserve every feature attributed to the Vamana Purana in older catalogues. Chapter totals and boundaries vary among editions.',
        'The title also appears in some Upapurana lists, another reminder that Mahapurana/Upapurana classification was not fixed by one universally accepted canon.'
      ]},
      {title:'Editions and study',paragraphs:[
        'Modern study uses Sanskrit printed editions, the AITM translation series and comparative Purana scholarship. The Kurukshetra material is particularly important for historians of pilgrimage and sacred geography.'
      ]}
    ],sources:merge(D['Purāṇa:Vāmana Purāṇa']?.sources,[W('Vamana Purana','https://en.wikipedia.org/wiki/Vamana_Purana','Received contents, mixed Shaiva character and pilgrimage.'),R,H,AIT,'Vamana Purana Sanskrit editions'])
  });

  put('Varāha Purāṇa',{
    sanskritTitle:'वराहपुराणम्',traditionalAuthor:'Vyasa; framed through Varaha and Earth',language:'Sanskrit',period:'A layered early-medieval Vaishnava Purana, with major growth between roughly the 9th and 12th centuries CE and later additions.',extent:'Common editions around 217–218 chapters; the surviving text is shorter than traditional verse counts',
    leadParagraphs:[
      'The Varaha Purana is framed as teaching associated with Vishnu’s Varaha form and Bhudevi, but the surviving work is dominated as much by sacred geography, vrata and temple religion as by the boar avatara itself.',
      'Mathura and north Indian pilgrimage receive extensive treatment. Goddess material and regional cults also appear, making the text a large archive of medieval Vaishnava sacred geography rather than a continuous Varaha biography.'
    ],articleSections:[
      {title:'Date and textual formation',paragraphs:[
        'The received text is later than the oldest classical Purana cores and was assembled through multiple strata. Temple, pilgrimage and sectarian material point strongly to the early medieval period.',
        'Older descriptions of the Varaha Purana do not perfectly match the extant recension, suggesting loss and substitution as well as addition.'
      ]},
      {title:'Major contents',books:[
        {number:1,title:'Varaha-Bhudevi frame',summary:'The divine dialogue supplies the authority through which cosmology, ritual and sacred places are taught.'},
        {number:2,title:'Mathura Mahatmya',summary:'An extensive sacred geography of Mathura, its tirthas, Vishnu/Krishna associations and merits of pilgrimage.'},
        {number:3,title:'Vrata and worship',summary:'Vows, deity worship, ritual observance and gifts occupy a substantial portion of the received text.'},
        {number:4,title:'Goddess and regional materials',summary:'Devi narratives and local sacred traditions appear inside the broader Vaishnava frame.'}
      ]},
      {title:'Mathura and Vaishnava geography',paragraphs:[
        'The Mathura material is especially important for the formation of Krishna-Vishnu sacred geography. It maps religious memory onto a sequence of places and ritual acts rather than narrating one linear story.',
        'The text helps show how a city and its surrounding landscape became scripturally organized as a sacred region long before modern pilgrimage guidebooks.'
      ]},
      {title:'Varaha theology',paragraphs:[
        'Varaha appears as a cosmic form of Vishnu whose rescue of Earth carries both mythic and theological significance. The Earth herself becomes interlocutor and recipient of sacred instruction.',
        'The work’s Vaishnava orientation does not eliminate other deities. Purana theology frequently integrates local and sectarian cults inside a larger hierarchy rather than excluding them.'
      ]},
      {title:'Manuscripts and extent',paragraphs:[
        'The surviving Varaha Purana does not reach the verse total assigned to it in traditional catalogues, and the arrangement of chapters varies.',
        'Because much of the work consists of mahatmya and ritual blocks, a citation should identify the actual edition and chapter rather than rely on a conventional total.'
      ]},
      {title:'Reception and study',paragraphs:[
        'The Purana is important for historians of Mathura, Vaishnava pilgrimage and the interaction of temple worship, vrata and regional sacred geography. Modern editions and translations have made its scattered ritual corpus more accessible.'
      ]}
    ],sources:merge(D['Purāṇa:Varāha Purāṇa']?.sources,[W('Varaha Purana','https://en.wikipedia.org/wiki/Varaha_Purana','Date, chapter count and sacred-geography contents.'),R,H,AIT,'Varaha Purana Sanskrit editions'])
  });

  put('Matsya Purāṇa',{
    sanskritTitle:'मत्स्यपुराणम्',traditionalAuthor:'Vyasa; narrated through Matsya',language:'Sanskrit',period:'A layered Purana with an important early core, often placed broadly between the 3rd and 7th centuries CE, followed by substantial later accretion.',extent:'291 chapters in a common recension; roughly 14,000 verses in many printed editions',
    leadParagraphs:[
      'The Matsya Purana opens with Vishnu’s fish avatara and the flood but rapidly becomes an encyclopedic Purana. Creation, genealogies, royal duty, funerary rites, tirthas, temple planning, image-making, architecture and gifts all stand within the same work.',
      'Its technical chapters are particularly important because they preserve early Sanskrit discussions of temple and image construction. The text therefore belongs as much to the history of Indian architecture and iconography as to mythological literature.'
    ],articleSections:[
      {title:'Date and formation',paragraphs:[
        'The Matsya Purana contains material of different ages. Genealogical and cosmological passages belong to the older Purana repertoire, while temple, iconographic and ritual sections were expanded across later centuries.',
        'A broad first-millennium CE range is more defensible than one date for all 291 chapters. Individual technical blocks must be compared with parallel shilpa and dharma literature.'
      ]},
      {title:'Narrative and encyclopedic structure',books:[
        {number:1,title:'Matsya and the flood',summary:'The fish warns Manu, preserves life and sacred knowledge, and establishes the frame for subsequent teaching.'},
        {number:2,title:'Creation, Manus and dynasties',summary:'Cosmogony, genealogies, manvantaras and royal lines connect the work to classical Purana history.'},
        {number:3,title:'Dharma and ancestral rites',summary:'Shraddha, gifts, vows, impurity, royal obligations and religious conduct.'},
        {number:4,title:'Temple, image and architecture',summary:'Measurements, plans, iconographic forms, temple types, town planning and construction rules make this one of the Purana’s most distinctive technical blocks.'},
        {number:5,title:'Tirtha and regional sacred material',summary:'Pilgrimage and sacred geography are woven through later portions of the corpus.'}
      ]},
      {title:'The flood narrative',paragraphs:[
        'The Matsya-Manu story connects cosmic catastrophe, preservation of living beings and preservation of sacred knowledge. Its form can be compared with flood narratives in the Shatapatha Brahmana and later Purana retellings.',
        'The Purana does not end when the flood ends. The episode functions as a revelation frame that authorizes a vast encyclopedia of subsequent instruction.'
      ]},
      {title:'Architecture and iconography',paragraphs:[
        'The technical chapters discuss proportions of images, temple forms, foundations, plans and the ritual conditions under which sacred architecture is made.',
        'These passages must be read with other shilpa traditions; they are neither a universal building code nor an accidental appendix. Their presence shows the Purana acting as a repository of practical sacred knowledge.'
      ]},
      {title:'Genealogy and royal history',paragraphs:[
        'Dynastic lists in the Matsya are among the materials used in comparative Purana chronology. They preserve traditional sequences of kings rather than a modern continuous historiography.',
        'Differences between Matsya, Vayu, Vishnu, Brahmanda and Bhagavata genealogies are historically important because they reveal separate lines of Purana transmission.'
      ]},
      {title:'Manuscripts, editions and reception',paragraphs:[
        'The text is composite and chapter boundaries vary in the manuscript tradition. Modern printed editions stabilized one convenient 291-chapter form.',
        'Architectural historians, historians of kingship and Purana scholars use different parts of the work, making Matsya one of the clearest examples of the genre’s encyclopedic reach.'
      ]}
    ],sources:merge(D['Purāṇa:Matsya Purāṇa']?.sources,[W('Matsya Purana','https://en.wikipedia.org/wiki/Matsya_Purana','291 chapters, encyclopedic contents and architecture material.'),R,H,AIT,'Matsya Purana Sanskrit editions','Studies of Purana architecture and iconography'])
  });

  put('Kūrma Purāṇa',{
    sanskritTitle:'कूर्मपुराणम्',traditionalAuthor:'Vyasa; framed through Kurma',language:'Sanskrit',period:'A composite early-medieval Purana, with major received strata broadly c. 7th–11th centuries CE.',extent:'Two principal parts in the common recension; about 95 chapters and roughly 17,000 traditional verses, though extant totals vary',
    leadParagraphs:[
      'The Kurma Purana is named for Vishnu’s tortoise avatara but is notable for a deliberately inclusive theology in which Vishnu, Shiva and the Goddess can be interpreted within one supreme reality. It combines cosmology, dharma, pilgrimage and yoga with major teaching texts such as the Ishvara Gita.',
      'It is also important to this index because its opening gives an explicit list of Upapuranas. The Purana is therefore both a religious text and a witness to how Sanskrit tradition itself classified neighbouring scriptures.'
    ],articleSections:[
      {title:'Date and textual history',paragraphs:[
        'The Kurma Purana developed in the early medieval period and shows evidence of several theological layers. Its Shaiva and Vaishnava materials are not easily reduced to one sectarian redaction.',
        'The received organization into Purva and Uttara divisions is more stable than many large Purana complexes, but individual passages still show recensional variation.'
      ]},
      {title:'Major contents',books:[
        {number:1,title:'Purva division',summary:'Creation, cosmology, avatara and deity narratives, genealogies, sacred geography and ritual instruction.'},
        {number:2,title:'Ishvara Gita',summary:'A substantial teaching attributed to Shiva/Ishvara on knowledge, yoga, devotion and liberation.'},
        {number:3,title:'Vyasa Gita and dharma material',summary:'Instruction on conduct, stages of life, renunciation, ritual and the path to liberation.'},
        {number:4,title:'Uttara division',summary:'Further dharma, pilgrimage, ritual, theology and closing materials.'}
      ]},
      {title:'Ishvara Gita',paragraphs:[
        'The Ishvara Gita is one of the most important philosophical blocks in the Purana. Shiva teaches a path combining knowledge of the supreme, yogic discipline and devotion.',
        'Its presence inside a text named for a Vishnu avatara shows why the Kurma cannot be read through a simple modern sectarian label. The work repeatedly moves across names of the divine while maintaining a hierarchical theology of liberation.'
      ]},
      {title:'Dharma, yoga and renunciation',paragraphs:[
        'The Purana discusses ashrama, ritual duty, pilgrimage and renunciation in a way that brings Purana and Dharma literature close together.',
        'Yoga is not presented as a detached technical system. It is embedded in theology, purification and knowledge of the supreme Lord.'
      ]},
      {title:'Upapurana catalogue',paragraphs:[
        'Kurma Purana 1.1 preserves one of the traditional eighteen-name Upapurana lists. Its contents overlap with, but do not duplicate, lists in the Devi Bhagavata, Padma and Brihaddharma Puranas.',
        'Those disagreements are historically valuable. They show that “the eighteen Upapuranas” was a classificatory ideal with several received witness-lists rather than one universally fixed table.'
      ]},
      {title:'Reception and study',paragraphs:[
        'The Kurma Purana is important to comparative Shaiva-Vaishnava theology, yoga history and Purana catalogue studies. Modern editions and translations allow its embedded Gitas to be read as coherent teaching texts within the larger Purana.'
      ]}
    ],sources:merge(D['Purāṇa:Kūrma Purāṇa']?.sources,[W('Kurma Purana','https://en.wikipedia.org/wiki/Kurma_Purana','Structure, theology and Ishvara Gita.'),R,H,AIT,'Kurma Purana Sanskrit editions'])
  });

  put('Brahmāṇḍa Purāṇa',{
    sanskritTitle:'ब्रह्माण्डपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'An old Purana title with early genealogical and cosmological strata; the received corpus contains additions ranging through the medieval period.',extent:'Large multi-part Purana; common recensions contain more than 150 chapters, with major embedded works varying by manuscript',
    leadParagraphs:[
      'The Brahmanda Purana takes its name from the cosmic egg, the brahmanda, and preserves a vast mixture of cosmology, geography, genealogy, dynastic history, ritual and later sectarian texts. Its transmission is especially complicated because some celebrated works occur only in particular recensions.',
      'The Lalitopakhyana and Lalita Sahasranama made the text central to later Sri Vidya and Shakta reception. In other manuscript traditions the Adhyatma Ramayana is transmitted as part of the Brahmanda Purana, though that placement is not uniform across all witnesses.'
    ],articleSections:[
      {title:'Date and textual layers',paragraphs:[
        'The Brahmanda shares old genealogical and cosmological material with the Vayu Purana, suggesting an early common textual reservoir. Later ritual, Shakta and Rama-oriented material entered some recensions over centuries.',
        'The result is not one clean date but a layered history. An early genealogy passage and the Adhyatma Ramayana cannot automatically be assigned to the same period.'
      ]},
      {title:'Cosmology and dynasties',paragraphs:[
        'The work contains extensive accounts of the cosmic egg, worlds, mountains, oceans, time cycles, Manus and royal genealogies. These sections place it close to the classical Purana project of mapping sacred space and sacred time.',
        'Its dynastic lists are important for comparison with Vayu, Matsya and Vishnu because agreement and divergence among those texts help reconstruct older Purana traditions.'
      ]},
      {title:'Lalitopakhyana and Lalita Sahasranama',paragraphs:[
        'The Lalitopakhyana narrates the Goddess Lalita/Tripurasundari, the destruction of Bhandasura and the divine organization of Sri Vidya worship.',
        'Within this narrative appears the Lalita Sahasranama, the thousand names of the Goddess, which became one of the most widely recited Shakta hymns in South India and beyond.',
        'Its liturgical life far exceeds the number of readers who study the entire Brahmanda Purana, illustrating how embedded Purana texts can acquire independent canonical force.'
      ]},
      {title:'Adhyatma Ramayana',paragraphs:[
        'Some recensions transmit the Adhyatma Ramayana within the Brahmanda Purana. This text retells the Rama story through an explicitly Vedantic and devotional theology in which Rama is the supreme Brahman.',
        'Its manuscript placement varies, so a bibliography must distinguish “Brahmanda Purana including Adhyatma Ramayana” from recensions where the latter circulates independently.'
      ]},
      {title:'Manuscripts and recensional problems',paragraphs:[
        'The Brahmanda title covers significantly different manuscript configurations. Embedded works, chapter totals and section boundaries vary.',
        'The Padma Purana even lists “another Brahmanda” among its Upapuranas, making it especially important not to merge every Brahmanda title in a catalogue with the extant Mahapurana.'
      ]},
      {title:'Reception',paragraphs:[
        'The work is a major source for Shakta liturgy, Sri Vidya, Purana cosmology and the textual history of the Adhyatma Ramayana. Different religious communities encounter the Brahmanda Purana through different embedded works rather than through one uniform reading practice.'
      ]}
    ],sources:merge(D['Purāṇa:Brahmāṇḍa Purāṇa']?.sources,[W('Brahmanda Purana','https://en.wikipedia.org/wiki/Brahmanda_Purana','Cosmology, Lalitopakhyana, Adhyatma Ramayana and recensional variation.'),R,H,AIT,'Brahmanda Purana Sanskrit editions','Lalitopakhyana and Adhyatma Ramayana studies'])
  });

  put('Vāyu Purāṇa',{
    sanskritTitle:'वायुपुराणम्',traditionalAuthor:'Vyasa; taught through Vayu',language:'Sanskrit',period:'Among the older Purana textual traditions; major core material is commonly placed in the early first millennium CE, with later redaction and overlap with Shaiva Purana traditions.',extent:'Common printed text around 112 chapters; traditional verse counts are much larger than the surviving recension',
    leadParagraphs:[
      'The Vayu Purana is one of the most important sources for early Purana cosmology and genealogy. It preserves detailed accounts of creation, world geography, manvantaras, sages and dynasties, and has a close textual relationship with material transmitted under Shaiva Purana titles.',
      'Its value lies less in a single famous devotional story than in the density of old Purana structures preserved across its chapters. Historians repeatedly compare it with the Brahmanda, Matsya and Vishnu Puranas when reconstructing the development of the genre.'
    ],articleSections:[
      {title:'Date and relationship to the Shiva tradition',paragraphs:[
        'Substantial Vayu material is early relative to many medieval Puranas, though the received text is still layered. Genealogical and cosmological passages often preserve archaic Purana formulations.',
        'The Vayu Purana has long been connected with the Shiva Purana textual tradition. Some historical catalogues and printed traditions use the titles in overlapping ways, but the surviving Vayu should not simply be collapsed into the modern seven-samhita Shiva Purana.'
      ]},
      {title:'Major subjects',books:[
        {number:1,title:'Creation and cosmic time',summary:'Primary and secondary creation, kalpas, manvantaras, cosmic measurements and the succession of worlds.'},
        {number:2,title:'Geography and astronomy',summary:'Jambudvipa, mountains, rivers, planetary regions and the organization of sacred space.'},
        {number:3,title:'Rishis and genealogies',summary:'Lineages of sages, Prajapatis, gods and royal houses, with dense material used in comparative Purana chronology.'},
        {number:4,title:'Dharma and ritual',summary:'Gifts, rites, sacred observances and Shaiva-associated religious material appear throughout the text.'}
      ]},
      {title:'Genealogy as sacred history',paragraphs:[
        'Vayu’s genealogies are not merely lists. They connect cosmic cycles, rishis and human dynasties into one temporal order.',
        'Because related lists appear in Brahmanda, Matsya and Vishnu, differences among them are evidence for separate textual branches and editorial histories.'
      ]},
      {title:'Cosmology and geography',paragraphs:[
        'The Purana’s geography maps continents, mountains, rivers and heavens within a cosmological model rather than modern physical cartography.',
        'These sections were foundational to the later Purana imagination and help explain why the Vayu is treated as a key witness to older Purana formation.'
      ]},
      {title:'Manuscripts and title history',paragraphs:[
        'The relationship between Vayu and texts called Shiva or Vayaviya in different catalogues is a genuine textual-history problem. Similarity of chapter content does not prove that every title referred to one immutable book.',
        'Modern editions distinguish the Vayu Purana as an independent corpus while studying its parallels with Shaiva literature.'
      ]},
      {title:'Reception and scholarship',paragraphs:[
        'The text is central to scholarship on Purana genealogy, early cosmology and the evolution of Shaiva Purana traditions. Its importance is therefore disproportionately scholarly compared with its visibility in popular retellings.'
      ]}
    ],sources:merge(D['Purāṇa:Vāyu Purāṇa']?.sources,[W('Vayu Purana','https://en.wikipedia.org/wiki/Vayu_Purana','Early Purana character, contents and relation to Shiva Purana.'),R,H,AIT,'Vayu Purana Sanskrit editions','F. E. Pargiter and later Purana genealogy studies'])
  });

  put('Devī Bhāgavata Purāṇa',{
    sanskritTitle:'देवीभागवतपुराणम्',traditionalAuthor:'Vyasa',language:'Sanskrit',period:'Commonly placed in the early medieval period, broadly c. 9th–14th centuries CE, with the received twelve-skandha form often associated with the later part of that range.',extent:'12 skandhas, 318 chapters, traditionally 18,000 verses',
    leadParagraphs:[
      'The Devi Bhagavata Purana is a twelve-skandha Shakta scripture in which Devi is the supreme reality, the source of the gods, the cosmos and liberation. Its architecture deliberately echoes the twelve-skandha form of the Bhagavata Purana while developing a Goddess-centred theology.',
      'The text ranges through creation, Devi manifestations, royal and sage narratives, pilgrimage, mantra, yoga and bhakti. It also preserves one of the traditional Upapurana lists used by this index.'
    ],articleSections:[
      {title:'Date and status as Mahapurana',paragraphs:[
        'The received Devi Bhagavata belongs to the medieval Shakta expansion of Purana literature. Internal theology, relation to Tantra and citation history place it later than the oldest classical Purana cores.',
        'Its chapter colophons call the work a Mahapurana. Some later catalogue traditions classify the Bhagavata title differently, producing a long-standing debate over whether “Bhagavata” in the eighteen Mahapuranas means the Krishna-centred Bhagavata or the Devi Bhagavata. Both texts themselves claim high Purana status.',
        'This index preserves the Devi Bhagavata’s own Mahapurana claim rather than erasing it because another list became more standard in modern handbooks.'
      ]},
      {title:'The twelve skandhas',books:[
        {number:1,title:'Skandha 1',summary:'Frame narratives, Vyasa, Janamejaya and the authority of Devi; includes the text’s Upapurana catalogue.'},
        {number:2,title:'Skandha 2',summary:'Dynastic and mythic narratives establishing the wider Purana setting.'},
        {number:3,title:'Skandha 3',summary:'Devi theology, creation and the supremacy of the Goddess.'},
        {number:4,title:'Skandha 4',summary:'Further divine narratives and the workings of Devi’s maya and grace.'},
        {number:5,title:'Skandha 5',summary:'Major Goddess narratives including battles and manifestations related to the broader Shakta mythic world.'},
        {number:6,title:'Skandha 6',summary:'Royal and sage narratives, karma and religious instruction.'},
        {number:7,title:'Skandha 7',summary:'Contains the celebrated Devi Gita, a systematic teaching on the supreme Goddess, devotion, knowledge and yoga.'},
        {number:8,title:'Skandha 8',summary:'Cosmology, worlds, sacred geography and the structure of the universe.'},
        {number:9,title:'Skandha 9',summary:'Goddess forms, prakriti and extensive theological narratives.'},
        {number:10,title:'Skandha 10',summary:'Manvantaras, Devi manifestations and sacred history.'},
        {number:11,title:'Skandha 11',summary:'Dharma, ritual, vows, daily worship and religious observance.'},
        {number:12,title:'Skandha 12',summary:'Mantra, Gayatri, spiritual practice, concluding theology and praise of the text.'}
      ]},
      {title:'Devi Gita',paragraphs:[
        'The Devi Gita in the seventh skandha is one of the most influential philosophical passages of the Purana. Devi teaches herself as supreme Brahman while also affirming personal devotion, meditation and divine form.',
        'The text integrates Vedantic language with Shakta theology: the same Goddess can be described as beyond attributes and as the gracious Lord who receives worship.',
        'Its later independent circulation shows how an embedded Purana section can function almost as a scripture within a scripture.'
      ]},
      {title:'Shakta theology',paragraphs:[
        'Devi is not merely one deity among others. Brahma, Vishnu and Shiva act through her power, and creation itself is interpreted through her as supreme consciousness and prakriti.',
        'The Purana draws on earlier Devi traditions such as the Devi Mahatmya but expands them into a complete cosmology, devotional theology and ritual world.'
      ]},
      {title:'Manuscripts and transmission',paragraphs:[
        'The twelve-skandha architecture is stable, but manuscripts and printed editions vary at the verse level. Traditional 18,000-verse counts are symbolic catalogue totals rather than exact descriptions of every codex.',
        'The text circulated especially strongly in regions with developed Shakta traditions and was commented upon and translated into several Indian languages.'
      ]},
      {title:'Reception and classification debates',paragraphs:[
        'The Devi Bhagavata became a major scripture for Shakta theology, Gayatri worship and Goddess devotion. The Devi Gita is especially widely cited.',
        'Modern discussions often reduce the text to the question “is it a Mahapurana?” The more useful historical fact is that several Purana traditions disagreed about canonical lists, while the Devi Bhagavata itself repeatedly asserts Mahapurana status.'
      ]}
    ],sources:merge(D['Purāṇa:Devī Bhāgavata Purāṇa']?.sources,[W('Devi-Bhagavata Purana','https://en.wikipedia.org/wiki/Devi-Bhagavata_Purana','Twelve skandhas, Devi Gita and Mahapurana-status debate.'),R,H,'C. Mackenzie Brown, The Triumph of the Goddess','Devi Bhagavata Purana Sanskrit editions and translations'])
  });

  put('Mahābhāgavata Purāṇa',{
    sanskritTitle:'महाभागवतपुराणम्',traditionalAuthor:'Vyasa in the Purana tradition',language:'Sanskrit',period:'A medieval Shakta Purana, generally placed after the Devi Mahatmya and within the developed tantric-Shakta environment of the second millennium CE.',extent:'A substantial Shakta Purana transmitted in chapters culminating in a colophon that calls it a Mahapurana; exact extent varies by edition',
    leadParagraphs:[
      'The Mahabhagavata Purana is a Shakta Purana distinct from both the Krishna-centred Bhagavata and the Devi Bhagavata. Its own concluding colophon calls the work a Mahapurana, which is why it appears separately in this index rather than being silently absorbed into a standardized list of eighteen.',
      'The text presents the Goddess through a developed Shakta mythological and tantric world, including forms of Devi, Shiva-Shakti relations and sacred narratives that belong to medieval Goddess religion.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The Mahabhagavata belongs to the medieval development of Shakta Purana literature. Its theological vocabulary presupposes a world in which Devi, Tantra and regional Goddess cults had already become deeply integrated into Sanskrit scripture.',
        'Unlike the Devi Bhagavata, it did not become equally widespread in modern pan-Indian print culture, which makes manuscript and regional study especially important.'
      ]},
      {title:'Contents and Goddess theology',paragraphs:[
        'The work develops Devi as supreme power and places multiple Goddess forms inside one theological hierarchy. Shiva and Shakti are interpreted through a strongly Shakta cosmology rather than as independent competing deities.',
        'Narratives, ritual instruction and theological praise coexist, as is normal in Purana literature. The text should not be reduced to one mythic episode simply because modern scholarship has focused on its Shakta identity.'
      ]},
      {title:'Relation to other Bhagavata titles',paragraphs:[
        'Bhagavata is not one unique book-name in the Purana world. The Krishna Bhagavata, Devi Bhagavata and Mahabhagavata are separate textual traditions with overlapping claims to sacred prestige.',
        'Keeping the titles separate prevents a modern catalogue from erasing genuine historical disagreement about which Bhagavata a traditional list or citation intends.'
      ]},
      {title:'Mahapurana colophon',paragraphs:[
        'The chapter 81 colophon identifies the work as a Mahapurana. A colophon is not the same thing as universal acceptance by every other Purana list, but it is primary textual evidence for how the work presents its own status.',
        'For this index that self-classification is enough to make the title visible alongside the more familiar eighteen rather than hiding it as an “error.”'
      ]},
      {title:'Manuscripts and study',paragraphs:[
        'The Mahabhagavata is less securely standardized than the Bhagavata and Devi Bhagavata. Editions and manuscript catalogues therefore matter more than secondary summaries for chapter-level claims.',
        'Shakta textual scholarship compares it with the Kalika Purana, Devi Bhagavata, Devi Mahatmya and tantric literature to place its myths and ritual vocabulary historically.'
      ]},
      {title:'Reception',paragraphs:[
        'Its importance is strongest within the history of Shakta scripture and the study of alternative Purana canons. It demonstrates that the category “Mahapurana” remained contested and textually productive beyond the familiar eighteen-name list.'
      ]}
    ],sources:merge(D['Purāṇa:Mahābhāgavata Purāṇa']?.sources,[R,H,'Mahabhagavata Purana Sanskrit editions and chapter 81 colophon','Shakta Purana and Tantra scholarship'])
  });
})();