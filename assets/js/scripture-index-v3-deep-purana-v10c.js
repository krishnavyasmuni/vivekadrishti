(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Purāṇa:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const H='R. C. Hazra, Studies in the Upapuranas';
  const R='Ludo Rocher, The Puranas';
  const W=(title,url,detail)=>({title:`Wikipedia — ${title}`,detail,url});

  put('Nṛsiṃha Purāṇa',{
    sanskritTitle:'नृसिंहपुराणम्',traditionalAuthor:'Vyasa tradition',language:'Sanskrit',period:'A layered Vaishnava Upapurana whose received core is generally assigned to the early medieval period.',extent:'Common printed recension about 68 chapters; verse totals vary',
    leadParagraphs:[
      'The Nrisimha Purana is a Vaishnava Upapurana centred on Vishnu and especially Narasimha, but it is not simply a retelling of Prahlada and Hiranyakashipu. Creation, dynasties, pilgrimage, vrata, funerary and devotional material surround the avatara narratives.',
      'Its presence in several independent Upapurana lists makes the title one of the more securely attested members of the minor-Purana corpus.'
    ],articleSections:[
      {title:'Date and textual formation',paragraphs:[
        'The text is earlier than many late sectarian Upapuranas but still belongs to the layered medieval Purana world. Chapters differ in literary character, suggesting more than one stage of compilation.',
        'The surviving Nrisimha Purana should be distinguished from numerous Nrisimha mahatmyas, Nrisimha-tapaniya texts and later ritual manuals that share the deity but not the same textual identity.'
      ]},
      {title:'Structure and contents',paragraphs:[
        'The common edition contains roughly sixty-eight chapters. The contents move through cosmology and dynastic material, Vishnu narratives, sacred observance and the Narasimha cycle rather than forming one continuous biography.',
        'Prahlada and Narasimha provide the theological centre: the avatara demonstrates divine protection of the devotee and the defeat of a ruler whose apparent invulnerability rests on a false reading of his boon.'
      ]},
      {title:'Narasimha theology',paragraphs:[
        'Narasimha is interpreted as Vishnu’s supreme protective power, simultaneously terrifying to the hostile and gracious to the devotee. Later Vaishnava ritual traditions drew heavily on this dual imagery.',
        'The Purana belongs to the broader Sanskrit process by which an epic-Purana avatara became the focus of independent mantra, temple and sectarian traditions.'
      ]},
      {title:'Dharma, vrata and pilgrimage',paragraphs:[
        'The work embeds deity narrative inside ordinary Purana religion: vows, gifts, pilgrimage and ritual merit. This material explains how Narasimha devotion moved from story into repeatable religious practice.',
        'As with other Upapuranas, individual ritual chapters can have a different history from the narrative core and should be dated separately where evidence permits.'
      ]},
      {title:'Manuscripts and catalogue evidence',paragraphs:[
        'Nrisimha appears in the Devi Bhagavata, Kurma, Brihaddharma and related Upapurana catalogues. That repeated attestation is stronger evidence for the title than the status of many lost names.',
        'Printed recensions stabilize one chapter order, but manuscripts and quotations should still be checked for verse-level claims.'
      ]},
      {title:'Reception',paragraphs:[
        'The Purana contributed to the Sanskrit authority of Narasimha worship alongside the Bhagavata, Vishnu Purana and Nrisimha-tapaniya Upanishads. Its relative neglect in modern English scholarship is not a measure of its traditional importance.'
      ]}
    ],sources:merge(D['Purāṇa:Nṛsiṃha Purāṇa']?.sources,[H,R,'Nrisimha Purana Sanskrit editions and translations','Purana catalogue passages preserved in Devi Bhagavata and Kurma Purana'])
  });

  put('Kapila Purāṇa',{
    sanskritTitle:'कपिलपुराणम्',traditionalAuthor:'Kapila tradition',language:'Sanskrit',period:'A regional medieval Upapurana associated especially with Odisha sacred geography.',extent:'A comparatively short Purana; chapter totals vary by edition',
    leadParagraphs:[
      'The Kapila Purana is a regional Upapurana whose surviving form is especially important for the sacred geography of Odisha. It connects temples, tirthas, rivers and local myths with a recognized Sanskrit Purana title.',
      'Its importance is therefore different from a cosmological Mahapurana: it shows how regional pilgrimage landscapes were canonized through Purana narration.'
    ],articleSections:[
      {title:'Date and provenance',paragraphs:[
        'The received work belongs to the medieval eastern Indian Purana environment. Its geographic interests strongly connect it with Odisha rather than with an abstract pan-Indian setting.',
        'The title Kapila is ancient, but the existence of the sage Kapila in older literature does not date the surviving Kapila Purana.'
      ]},
      {title:'Sacred geography',paragraphs:[
        'The text describes holy places, temples and pilgrimage routes in Odisha, linking local sites to pan-Indian gods and mythic events.',
        'This form of Purana writing turns a regional landscape into a sacred map: bathing places, shrines and ritual acts become parts of one narrative geography.'
      ]},
      {title:'Jagannatha and regional cults',paragraphs:[
        'Material connected with Purushottama/Jagannatha and other Odisha deities situates local temple traditions inside wider Vaishnava and Purana frameworks.',
        'The work should therefore be read beside the Odisha sections of the Brahma, Skanda and other Puranas rather than in isolation.'
      ]},
      {title:'Ritual and merit',paragraphs:[
        'Pilgrimage, vrata, gifts and worship are central because the text is concerned with what a pilgrim does at a sacred place, not merely with the place’s mythical origin.',
        'The promised fruits of ritual are part of the literary technology of a mahatmya: narrative and religious practice reinforce one another.'
      ]},
      {title:'Manuscripts and editions',paragraphs:[
        'Kapila Purana is less widely printed than the Mahapuranas. Regional manuscripts and editions therefore remain crucial, and chapter references should name the edition used.',
        'The title’s appearance in more than one traditional Upapurana list supports its independent status even though its modern circulation is comparatively limited.'
      ]},
      {title:'Historical significance',paragraphs:[
        'For the history of Hinduism, the Kapila Purana is evidence for the Sanskritization and scriptural organization of Odisha pilgrimage. Its regional specificity is a strength, not a sign that the text is peripheral.'
      ]}
    ],sources:merge(D['Purāṇa:Kapila Purāṇa']?.sources,[H,R,'Kapila Purana Sanskrit/Odia editions','Studies of Odisha Purana literature and sacred geography'])
  });

  put('Kālikā Purāṇa',{
    sanskritTitle:'कालिकापुराणम्',traditionalAuthor:'Purana tradition',language:'Sanskrit',period:'Generally placed around the 10th–11th centuries CE, associated with Kamarupa in Assam.',extent:'About 90 chapters in the common recension',
    leadParagraphs:[
      'The Kalika Purana is one of the most important Shakta Upapuranas. Composed in the religious world of Kamarupa, it centres the Goddess, Kamakhya, regional sacred geography, Shiva-Shakti mythology and detailed ritual instruction.',
      'It is especially valuable because theology, pilgrimage and Tantra are not separate subjects in the work. The Goddess is revealed through a landscape, a temple cult and a ritual system at once.'
    ],articleSections:[
      {title:'Date and Kamarupa setting',paragraphs:[
        'The text is usually placed around the tenth or eleventh century. Its knowledge of Kamarupa and Kamakhya situates the received work firmly in the religious history of Assam.',
        'The title Kalika should not be confused with every later Kali tantra. The Purana has its own narrative frame, chapter sequence and regional theological agenda.'
      ]},
      {title:'Major contents',books:[
        {number:1,title:'Goddess mythology',summary:'Narratives of Devi, Shiva, Sati and manifestations of the Goddess establish the theological frame.'},
        {number:2,title:'Kamakhya and Kamarupa',summary:'Sacred geography, pithas, mountains, rivers and the special holiness of the Kamakhya region.'},
        {number:3,title:'Ritual and mantra',summary:'Puja, initiation, offerings, mantra and other forms of Shakta practice.'},
        {number:4,title:'Royal and sacrificial material',summary:'Kingship, ritual power and controversial sacrificial prescriptions occur in some of the most discussed chapters.'}
      ]},
      {title:'Kamakhya',paragraphs:[
        'Kamakhya is not simply one pilgrimage site among many. The Purana makes the Goddess’s presence in Kamarupa a central expression of Shakta sacred geography.',
        'The text helped articulate a theology in which the physical landscape, the female generative principle and the supreme Goddess are mutually illuminating.'
      ]},
      {title:'Ritual and sacrifice',paragraphs:[
        'The Kalika Purana contains unusually detailed ritual prescriptions, including offerings and sacrificial material that has attracted disproportionate modern attention.',
        'Those chapters belong inside a much larger system of mantra, worship, temple, kingship and sacred geography; isolating one rite can seriously misrepresent the text’s scope.'
      ]},
      {title:'Manuscripts and textual history',paragraphs:[
        'The work survives as a coherent regional Purana but still shows manuscript variation. Printed editions commonly use a ninety-chapter organization.',
        'Its placement in Upapurana catalogues and its strong independent manuscript tradition make it one of the clearest examples of an Upapurana with major historical importance.'
      ]},
      {title:'Reception',paragraphs:[
        'The Kalika Purana remains central to scholarship on Kamakhya, Assam, Shakta Tantra and medieval Goddess worship. It also influenced later accounts of pithas and the ritual geography of the northeast.'
      ]}
    ],sources:merge(D['Purāṇa:Kālikā Purāṇa']?.sources,[W('Kalika Purana','https://en.wikipedia.org/wiki/Kalika_Purana','Date, Kamarupa setting, Kamakhya and ritual contents.'),H,R,'Kalika Purana Sanskrit editions','Studies of Kamakhya and Assamese Shaktism'])
  });

  put('Sāmba Purāṇa',{
    sanskritTitle:'साम्बपुराणम्',traditionalAuthor:'Purana tradition; centred on Samba',language:'Sanskrit',period:'A layered Saura Upapurana, with substantial material generally placed between the 7th and 12th centuries CE.',extent:'84 chapters in a common recension',
    leadParagraphs:[
      'The Samba Purana is the major Sanskrit Purana of Surya worship. Its central narrative tells how Samba, son of Krishna, is afflicted with disease, worships the Sun, is healed and establishes a solar cult with specialist priests.',
      'Around that story the text builds an entire Saura religious system: cosmology, solar names and forms, temple and image construction, initiation, mantra, festivals, ratha processions, homa, yoga and the history of Maga priests.'
    ],articleSections:[
      {title:'Date and textual formation',paragraphs:[
        'The work contains strata of different ages, but its developed temple, iconographic and Saura ritual system belongs to the early medieval world of institutional Sun worship.',
        'Passages overlap with the Bhavishya Purana and other Saura materials, making source direction and borrowing important questions in textual history.'
      ]},
      {title:'The Samba narrative',paragraphs:[
        'Samba’s disease and cure provide the human narrative through which Surya’s supreme healing power is revealed. The pilgrimage to Mitravana and establishment of an image convert personal crisis into temple foundation myth.',
        'The story links Krishna’s Yadava world to an independent solar tradition without reducing Surya to a decorative Vaishnava deity.'
      ]},
      {title:'Eighty-four chapters and ritual system',paragraphs:[
        'The early chapters discuss Surya’s forms, cosmic role, rays, planets, time, attendants and the Samba story. Later chapters become increasingly technical.',
        'Image proportions, temple construction, consecration, flag raising, ratha-yatra, homa, diksha, mandala, mantra and daily conduct form a practical Saura ritual handbook inside the Purana.',
        'This internal movement from myth to institution is one reason the Samba Purana is so valuable for the history of sectarian Hinduism.'
      ]},
      {title:'Maga priests and Shakadvipa',paragraphs:[
        'The Purana famously connects solar worship with Maga priests brought from Shakadvipa. This material has generated long debate about Iranian, Central Asian and Indian priestly connections.',
        'Whatever the historical reconstruction, the text itself uses the story to authorize a specialist hereditary priesthood for Surya temples.'
      ]},
      {title:'Surya iconography and temple',paragraphs:[
        'The image-making chapters describe Surya’s bodily proportions, attendants, dress and ritual installation. They can be compared with surviving medieval Sun images and temple traditions.',
        'The Purana therefore preserves not only theology about the Sun but instructions for making divine presence visible in stone, wood, architecture and festival procession.'
      ]},
      {title:'Reception',paragraphs:[
        'The Samba Purana is indispensable to the study of Saura religion, Sun temples and the Maga tradition. Even after independent Saura sectarian institutions declined, many of its ritual and mythic patterns survived in wider Hindu worship of Surya.'
      ]}
    ],sources:merge(D['Purāṇa:Sāmba Purāṇa']?.sources,[H,R,{title:'Vedapath — Samba Purana',detail:'Eighty-four chapter structure and chapter-by-chapter Sanskrit/translation access.',url:'https://vedapath.app/en/samba-purana'},'Samba Purana Sanskrit editions','Studies of Saura religion and Maga priests'])
  });

  put('Saura Purāṇa',{
    sanskritTitle:'सौरपुराणम्',traditionalAuthor:'Purana tradition; revelation associated with Surya',language:'Sanskrit',period:'A medieval Shaiva Upapurana transmitted under a Saura title, generally placed in the second half of the first millennium or early second millennium CE.',extent:'About 69 chapters in common editions',
    leadParagraphs:[
      'The Saura Purana is a striking warning against classifying a text solely from its title. Although “Saura” suggests a Sun-centred Purana and Surya supplies the revelatory frame, the received work is strongly Shaiva and praises Shiva as supreme.',
      'Its chapters combine Shiva theology, sacred geography, vrata, pilgrimage and religious practice while retaining a solar narrative authority.'
    ],articleSections:[
      {title:'Date and sectarian setting',paragraphs:[
        'The received text belongs to the medieval sectarian Purana world. Its Shaiva theology presupposes developed Shiva worship and pilgrimage institutions.',
        'The contrast between title and content is historically useful: a Purana could retain the name of its speaker or transmission frame even when its doctrinal centre was elsewhere.'
      ]},
      {title:'Contents',paragraphs:[
        'The common recension is organized in roughly sixty-nine chapters covering creation, Shiva’s supremacy, sacred places, ritual observance and devotional instruction.',
        'Rather than narrating a continuous Surya mythology, the text uses Surya as a teacher within a Shaiva sacred universe.'
      ]},
      {title:'Shiva theology',paragraphs:[
        'Shiva is presented as the highest Lord and the goal of worship. The Purana participates in the same broad medieval movement that produced Shaiva mahatmyas and sectarian Purana expansions.',
        'This does not erase Surya; it places the Sun inside a theological hierarchy centred on Shiva.'
      ]},
      {title:'Pilgrimage and vrata',paragraphs:[
        'Sacred geography and ritual vows translate the theology into practice. Visiting a tirtha, fasting, worship and gift-giving become means of entering the merit and grace associated with Shiva.',
        'These sections should be compared with parallel Shaiva passages in Skanda, Linga and Shiva Puranas.'
      ]},
      {title:'Catalogue identity',paragraphs:[
        'Saura Purana appears as a distinct Upapurana in several traditional lists. It should not be merged with the Samba Purana or with generic Saura scripture simply because all involve the Sun.',
        'The distinct title is evidence for multiple textual currents within historical Sun worship.'
      ]},
      {title:'Study',paragraphs:[
        'The work is especially important to historians of sectarian classification because its Shaiva contents contradict the expectations created by its name. Hazra’s Upapurana studies remain fundamental for identifying the text and its relation to neighbouring works.'
      ]}
    ],sources:merge(D['Purāṇa:Saura Purāṇa']?.sources,[H,R,'Saura Purana Sanskrit editions','Studies of medieval Shaiva and Saura Purana literature'])
  });

  put('Śivadharma Purāṇa',{
    sanskritTitle:'शिवधर्मपुराणम् / शिवधर्मशास्त्रम्',traditionalAuthor:'Shaiva scriptural tradition',language:'Sanskrit',period:'An early medieval Shaiva lay scripture, with important strata often placed around the 6th–8th centuries CE and later growth in the wider Shivadharma corpus.',extent:'Part of the larger Shivadharma textual corpus; manuscript organization varies',
    leadParagraphs:[
      'The Shivadharma Purana belongs to the Shivadharma corpus, one of the earliest major Sanskrit attempts to define a religious life for lay devotees of Shiva. It is therefore not merely a mythology book but a Shaiva dharma scripture concerned with worship, conduct, merit, initiation and community.',
      'Its manuscript history is complicated because Shivadharma, Shivadharmottara and associated works often circulate together in multi-text codices. Modern scholarship increasingly treats the corpus as a major source for early devotional Shaivism.'
    ],articleSections:[
      {title:'Date and corpus formation',paragraphs:[
        'Important layers are earlier than many sectarian Puranas and belong to the centuries when temple-oriented Shaivism was expanding beyond specialist ascetics into household communities.',
        'The label “Shivadharma Purana” can refer to a work inside a larger manuscript corpus rather than one universally standardized printed volume. The exact text must therefore be identified by incipit, colophon and manuscript sequence.'
      ]},
      {title:'Shaiva dharma for householders',paragraphs:[
        'The scripture defines merit through worship of Shiva, linga, mantra, gifts, fasting and devotional observance while still addressing householders embedded in ordinary social life.',
        'This is historically important because it shows bhakti and sectarian identity becoming a form of dharma rather than a practice restricted to renunciant initiates.'
      ]},
      {title:'Worship and merit',paragraphs:[
        'Temple and linga worship, offerings, vows and the support of Shaiva religious institutions are repeatedly linked with enormous religious merit.',
        'The text helps explain how Shaiva communities created scriptural equivalents to the dana, vrata and pilgrimage systems found across Purana religion.'
      ]},
      {title:'The wider Shivadharma corpus',paragraphs:[
        'Manuscripts often transmit Shivadharma together with Shivadharmottara and other Shaiva texts. Those neighbouring works expand topics such as yoga, cosmology, ritual and religious knowledge.',
        'Treating the corpus as one undifferentiated “Purana” obscures its layered literary structure; treating every manuscript title as unrelated obscures the historical collection. Both levels have to be preserved.'
      ]},
      {title:'Manuscripts',paragraphs:[
        'A large Nepalese and South Asian manuscript record has transformed modern understanding of the corpus. Critical work compares palm-leaf and paper witnesses rather than relying solely on late printed editions.',
        'This manuscript richness makes Shivadharma one of the strongest cases where catalogue-level labels on an index need a substantial textual-history page.'
      ]},
      {title:'Reception and scholarship',paragraphs:[
        'The corpus is now central to research on early Shaiva lay religion, religious gifting, temple communities and the spread of devotional Shaivism. Its historical importance is far greater than its limited visibility in popular English lists of Puranas.'
      ]}
    ],sources:merge(D['Purāṇa:Śivadharma Purāṇa']?.sources,[H,R,'The Shivadharma Project and critical manuscript studies','Shivadharma and Shivadharmottara Sanskrit manuscript editions'])
  });

  put('Viṣṇudharmottara Purāṇa',{
    sanskritTitle:'विष्णुधर्मोत्तरपुराणम्',traditionalAuthor:'Vaishnava Purana tradition',language:'Sanskrit',period:'A layered early-medieval encyclopedic Upapurana, with major strata broadly c. 6th–10th centuries CE.',extent:'3 khandas; the third is especially famous for its extensive arts material',
    leadParagraphs:[
      'The Vishnudharmottara Purana is one of the most intellectually wide-ranging Upapuranas. Its three khandas cover cosmology, geography, ritual, astronomy, omens, iconography and religious practice, while the third khanda contains one of Sanskrit literature’s most celebrated discussions of painting, sculpture, architecture, music and dance.',
      'The text is therefore crucial to art history, not because it is a secular handbook hidden inside a Purana, but because it understands the arts as interconnected forms of sacred representation.'
    ],articleSections:[
      {title:'Date and relation to Vishnudharma',paragraphs:[
        'The title “Vishnudharmottara” means a continuation or supplement to Vishnudharma, but the work developed into a large independent encyclopedia.',
        'Its materials belong to several periods. The arts chapters reflect mature traditions of image, painting and performance rather than one moment of invention.'
      ]},
      {title:'The three khandas',books:[
        {number:1,title:'First khanda',summary:'Cosmology, sacred history, geography, ritual and religious instruction in a Vaishnava Purana frame.'},
        {number:2,title:'Second khanda',summary:'Astronomy, calendrical and omen material, ritual knowledge and further encyclopedic subjects.'},
        {number:3,title:'Third khanda',summary:'Iconography, temple and image theory, painting, dance, music, dramatic and artistic disciplines, including the famous dialogue on the interdependence of the arts.'}
      ]},
      {title:'Painting and image-making',paragraphs:[
        'The third khanda’s Chitrasutra is a foundational Sanskrit text on painting. It discusses proportion, posture, expression, colour and the qualities of images.',
        'Painting is not isolated from other arts. The text famously presents knowledge as a chain: to understand painting one must understand dance; to understand dance, music; and so on. Representation is therefore an integrated sacred science.'
      ]},
      {title:'Dance, music and performance',paragraphs:[
        'Chapters on dance and music preserve technical classifications that can be compared with Natyashastra traditions. Their presence inside a Vaishnava Purana demonstrates the genre’s encyclopedic ambition.',
        'The arts are connected to temple, deity and ritual contexts rather than presented solely for courtly entertainment.'
      ]},
      {title:'Manuscripts and editions',paragraphs:[
        'The text survives in multiple manuscripts and has been edited in Sanskrit, with major scholarly studies of the third khanda by Priyabala Shah and art historians.',
        'Because the most famous arts chapters are often excerpted, citations should preserve their place in the larger three-khanda Purana.'
      ]},
      {title:'Reception',paragraphs:[
        'Vishnudharmottara is one of the principal Sanskrit sources used in modern study of Indian painting, iconography, sculpture, architecture and performing arts. Its importance reaches far beyond scholars who otherwise specialize in Purana literature.'
      ]}
    ],sources:merge(D['Purāṇa:Viṣṇudharmottara Purāṇa']?.sources,[W('Vishnudharmottara Purana','https://en.wikipedia.org/wiki/Vishnudharmottara_Purana','Three khandas and the arts/Chitrasutra material.'),H,R,'Priyabala Shah, Vishnudharmottara Purana studies','Stella Kramrisch and later Indian art-history scholarship'])
  });

  put('Viṣṇudharma Purāṇa',{
    sanskritTitle:'विष्णुधर्मपुराणम् / विष्णुधर्माः',traditionalAuthor:'Vaishnava Dharma-Purana tradition',language:'Sanskrit',period:'An early Vaishnava dharma text with important strata in the first millennium CE and later transmission.',extent:'A substantial chaptered Vaishnava dharma corpus; chapter totals differ among editions',
    leadParagraphs:[
      'The Vishnudharma is a Vaishnava religious text that joins Purana narrative with rules of worship, vrata, gifts, pilgrimage and devotional conduct. It is closely related in title-history to the Vishnudharmottara but should not be collapsed into that later encyclopedic continuation.',
      'Its importance lies in the formation of a specifically Vaishnava dharma: ordinary religious duties are reoriented around Vishnu, his images, names, festivals and sacred observances.'
    ],articleSections:[
      {title:'Date and textual identity',paragraphs:[
        'The Vishnudharma contains old Vaishnava religious material but developed over time. Manuscripts and quotations reveal a text known well before many later medieval Vaishnava Puranas.',
        'The name is sometimes treated loosely in catalogues; a scholarly article must distinguish Vishnudharma, Vishnudharmottara and the Vishnu Smriti.'
      ]},
      {title:'Vaishnava dharma',paragraphs:[
        'The work integrates worship of Vishnu with daily and calendrical religious life. Fasting, gifts, festivals, image worship and sacred names are presented as forms of dharma rather than optional sectarian decoration.',
        'This process is one of the major ways classical Brahmanical dharma became sectarianized without ceasing to claim wider scriptural authority.'
      ]},
      {title:'Vrata, festival and image worship',paragraphs:[
        'The text gives ritual procedures and merits for observances directed to Vishnu and his forms. These chapters help reconstruct early Vaishnava festival culture and temple practice.',
        'Image worship is treated as a legitimate and powerful religious action within a scriptural dharma framework.'
      ]},
      {title:'Narrative and instruction',paragraphs:[
        'Stories are used to explain why a vow, gift or devotional act has power. The narrative therefore functions as the theological argument for ritual practice.',
        'This pattern places Vishnudharma squarely inside Purana literature even when particular chapters resemble a ritual or Dharma manual.'
      ]},
      {title:'Manuscripts and relation to Vishnudharmottara',paragraphs:[
        'The “uttara” in Vishnudharmottara signals a continuation, but the two texts have distinct manuscript lives. Their boundaries should be preserved in cataloguing and citation.',
        'Modern scholarship uses both works together to reconstruct early Vaishnava religion while still treating them as separate compositions.'
      ]},
      {title:'Reception',paragraphs:[
        'The Vishnudharma is an important source for the history of Vaishnava ritual, image worship and devotional dharma. Its relative absence from standard “eighteen Purana” lists obscures how influential such Upapurana/Dharma corpora could be.'
      ]}
    ],sources:merge(D['Purāṇa:Viṣṇudharma Purāṇa']?.sources,[H,R,'Vishnudharma Sanskrit editions and manuscript studies','Early Vaishnava dharma and image-worship scholarship'])
  });

  put('Bṛhannāradīya Purāṇa',{
    sanskritTitle:'बृहन्नारदीयपुराणम्',traditionalAuthor:'Narada tradition',language:'Sanskrit',period:'A medieval Vaishnava Purana with important bhakti and ritual material.',extent:'Commonly transmitted in 38 chapters; verse totals vary',
    leadParagraphs:[
      'The Brihannaradiya Purana is a Vaishnava text associated with Narada and distinct from the Naradiya Mahapurana. Its compact chapters emphasize devotion, sacred names, vrata, pilgrimage and religious conduct.',
      'It is best known today for verses praising repetition of Hari’s name in Kali Yuga, but that famous citation belongs to a wider Purana devoted to practical Vaishnava religion.'
    ],articleSections:[
      {title:'Date and identity',paragraphs:[
        'The text belongs to medieval Vaishnava bhakti literature. Its name means “great/extended Naradiya,” yet catalogue traditions also contain other Narada titles, so title matching requires care.',
        'The Brihaddharma Purana lists Brihannaradiya separately from Naradiya, primary evidence that traditional cataloguers themselves distinguished the works.'
      ]},
      {title:'Thirty-eight chapters',paragraphs:[
        'The common recension is comparatively compact. Chapters move among Vishnu worship, sacred places, religious vows, duties and praise of divine-name recitation.',
        'The short scale makes the work easier to transmit as a practical devotional Purana than the huge encyclopedic Mahapuranas.'
      ]},
      {title:'The divine name',paragraphs:[
        'The celebrated “Harer nama” passage gives repetition of Hari’s name a special role in Kali Yuga. Later bhakti traditions, especially Gaudiya Vaishnavism, cite it extensively.',
        'Its force inside the Purana comes from a broader theology in which devotion is made accessible through repeatable practices rather than through rare sacrificial competence.'
      ]},
      {title:'Ritual and pilgrimage',paragraphs:[
        'Vrata, sacred days and pilgrimage remain important; bhakti does not erase ritual life. Instead, the text reorganizes ritual around Vishnu and devotional remembrance.',
        'This mixture is characteristic of medieval Vaishnava Purana religion and should not be flattened into a slogan about “name chanting only.”'
      ]},
      {title:'Catalogue and manuscript history',paragraphs:[
        'The existence of Naradiya, Brihannaradiya and “another Naradiya” in different Purana lists is a real bibliographic problem. They should remain separate until manuscript evidence demonstrates identity.',
        'Printed editions of Brihannaradiya provide a stable working text, but quotations should retain the chapter/verse reference of the edition used.'
      ]},
      {title:'Reception',paragraphs:[
        'The work became especially visible through later Vaishnava citation of its Kali-Yuga and nama passages. Its textual identity is also important for scholars reconstructing the fluid Purana catalogue tradition.'
      ]}
    ],sources:merge(D['Purāṇa:Bṛhannāradīya Purāṇa']?.sources,[H,R,'Brihannaradiya Purana Sanskrit editions','Vaishnava bhakti literature citing Brihannaradiya 38'])
  });

  put('Kriyāyogasāra Purāṇa',{
    sanskritTitle:'क्रियायोगसारपुराणम्',traditionalAuthor:'Vaishnava Purana tradition',language:'Sanskrit',period:'A medieval Vaishnava Upapurana centred on practical religious observance.',extent:'A comparatively little-published independent Purana; manuscript/edition extent varies',
    leadParagraphs:[
      'The Kriyayogasara Purana uses “kriya-yoga” in the broad Purana sense of religious action: worship, vows, purification, gifts and devotional practice. It should not be mistaken for a manual of Patanjali’s Kriya Yoga or for modern yoga postures.',
      'Its presence in the Brihaddharma Purana’s Upapurana list provides a clear traditional catalogue witness to a distinct title.'
    ],articleSections:[
      {title:'Textual identity and date',paragraphs:[
        'The work belongs to medieval practical Vaishnava religion. It is far less widely printed than the Mahapuranas, so manuscript catalogues and Hazra’s Upapurana research remain especially important.',
        'Its title describes a religious method rather than one mythic protagonist, which can make the work easy to confuse with similarly named ritual sections in other Puranas.'
      ]},
      {title:'Kriya-yoga as religious practice',paragraphs:[
        'Kriya in this context means sacred action. Puja, vrata, offerings, purification and disciplined observance are ways of directing bodily action toward Vishnu.',
        'The text therefore represents the ritual side of bhakti: devotion is embodied in repeated acts and calendars rather than existing only as an inward emotion.'
      ]},
      {title:'Vrata and worship',paragraphs:[
        'The practical emphasis makes vows and worship procedures central. Merit is attached to correct observance, remembrance of Vishnu and ethical/religious discipline.',
        'Such chapters help reconstruct the household and temple environment in which medieval Vaishnava devotion was practiced.'
      ]},
      {title:'Relation to larger Purana literature',paragraphs:[
        'Many of its subjects also appear in Padma, Naradiya and Vishnudharma traditions. Parallel material does not make the title redundant; it shows a shared ritual repertoire circulating across Vaishnava Puranas.',
        'Source comparison is necessary to determine borrowing and local redaction.'
      ]},
      {title:'Manuscripts and catalogue evidence',paragraphs:[
        'The Brihaddharma list names Kriyayogasara as an Upapurana. That primary list evidence should be kept visible because modern handbooks often omit the title entirely.',
        'Where a complete critical edition is unavailable, the article must distinguish securely edited passages from descriptions based on catalogue or secondary scholarship.'
      ]},
      {title:'Significance',paragraphs:[
        'The work is evidence that the Upapurana category included specialized practical scriptures, not only smaller mythological compilations. Its religious focus complements the more narrative Mahapuranas.'
      ]}
    ],sources:merge(D['Purāṇa:Kriyāyogasāra Purāṇa']?.sources,[H,R,'Kriyayogasara Purana manuscript catalogues and Sanskrit editions','Brihaddharma Purana Upapurana catalogue'])
  });

  put('Bṛhaddharma Purāṇa',{
    sanskritTitle:'बृहद्धर्मपुराणम्',traditionalAuthor:'Purana tradition',language:'Sanskrit',period:'A medieval eastern Indian Purana, often associated with Bengal and generally placed in the late first or early second millennium CE.',extent:'Three large khandas in common editions; chapter totals vary',
    leadParagraphs:[
      'The Brihaddharma Purana is an eastern Indian Dharma-Purana combining Goddess devotion, social and ritual teaching, sacred narrative and regional religious culture. For this index it has an additional importance: it preserves explicit lists of Upapuranas and Smriti authorities that differ from better-known “standard” lists.',
      'The work therefore deserves to be read both as a religious scripture and as a witness to how medieval Hindu authors themselves organized the textual tradition.'
    ],articleSections:[
      {title:'Date and Bengal setting',paragraphs:[
        'Language, social material and regional religious interests connect the received text strongly with medieval Bengal/eastern India.',
        'The work should not be projected back to the age of the oldest Puranas merely because it uses the Purana genre. Its value lies precisely in documenting a later regional Brahmanical and Shakta religious world.'
      ]},
      {title:'Three-part structure',books:[
        {number:1,title:'Purva Khanda',summary:'Foundational narratives, dharma, sacred authority and early portions of the work’s religious world.'},
        {number:2,title:'Madhya Khanda',summary:'Extended mythology, Goddess and regional material, social-religious teaching and sacred narratives.'},
        {number:3,title:'Uttara Khanda',summary:'Further dharma, ritual, lineage and concluding materials; exact chapter organization depends on edition.'}
      ]},
      {title:'Goddess and regional religion',paragraphs:[
        'The text gives substantial place to Devi and eastern Indian sacred traditions. Its theology belongs to a cultural world in which Shakta devotion and Brahmanical dharma were deeply intertwined.',
        'Regional myths are not secondary curiosities: they show how Purana Sanskrit became a medium for local religious history.'
      ]},
      {title:'Purana and Smriti catalogues',paragraphs:[
        'Brihaddharma 1.25 names eighteen Upapuranas, including titles absent from the Devi Bhagavata and Kurma lists. This is one of the primary witnesses used by the index.',
        'Its Dharma-authority lists likewise preserve a medieval understanding of Smriti canon. The differences from Yajnavalkya and Parashara should be displayed, not harmonized away.'
      ]},
      {title:'Social and dharma material',paragraphs:[
        'The work contains prescriptions and classifications reflecting its own historical setting. These passages are useful evidence for medieval normative thought but should not be generalized as timeless descriptions of all Hindu society.',
        'Dharma is presented through story, genealogy, ritual and social classification rather than through the compact sutra or verse format of classical Dharmashastra.'
      ]},
      {title:'Manuscripts and reception',paragraphs:[
        'The text circulated especially in eastern India and is known through Sanskrit and Bengali scholarly traditions. Modern Purana scholarship uses it extensively for catalogue history precisely because its lists preserve alternatives to the familiar eighteen-name schemes.'
      ]}
    ],sources:merge(D['Purāṇa:Bṛhaddharma Purāṇa']?.sources,[H,R,'Brihaddharma Purana Sanskrit/Bengali editions and translations','Brihaddharma Purana 1.25 catalogue passage','Studies of medieval Bengal religious literature'])
  });
})();