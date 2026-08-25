(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Smṛti:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const KANE='P. V. Kane, History of Dharmasastra';
  const OL='Patrick Olivelle, The Oxford History of Hinduism: Hindu Law — A New History of Dharmasastra';
  const ODS='Patrick Olivelle, Dharmasutras: The Law Codes of Ancient India';
  const W_MANU={title:'Wikipedia — Manusmriti',detail:'Chronology, manuscript variation, contents and commentarial history.',url:'https://en.wikipedia.org/wiki/Manusmriti'};
  const W_YAJ={title:'Wikipedia — Yajnavalkya Smriti',detail:'Three-book structure and 1,010-verse received text.',url:'https://en.wikipedia.org/wiki/Y%C4%81j%C3%B1avalkya_Sm%E1%B9%9Bti'};
  const W_VIS={title:'Wikipedia — Vishnu Smriti',detail:'One hundred chapters, Vaishnava frame and textual history.',url:'https://en.wikipedia.org/wiki/Vishnu_Smriti'};
  const W_AP={title:'Wikipedia — Apastamba Dharmasutra',detail:'Place inside the Apastamba Kalpasutra, two books and chronology.',url:'https://en.wikipedia.org/wiki/Apastamba_Dharmasutra'};
  const W_GAU={title:'Wikipedia — Gautama Dharmasutra',detail:'Twenty-eight chapters, judicial material and early Dharma history.',url:'https://en.wikipedia.org/wiki/Gautama_Dharmasutra'};
  const W_VAS={title:'Wikipedia — Vasishtha Dharmasutra',detail:'1,038 sutras, chronology, topics and manuscript revision.',url:'https://en.wikipedia.org/wiki/Vasishtha_Dharmasutra'};
  const H_PAR={title:'Hindupedia — Parashara Smriti',detail:'Twelve-chapter contents and received verse totals.',url:'https://hindupedia.com/en/Par%C4%81%C5%9Bara_Sm%E1%B9%9Bti'};
  const W_MED={title:'Wikipedia — Medhatithi',detail:'Early major commentator on Manu and chronology of the Manubhashya.',url:'https://en.wikipedia.org/wiki/Medh%C4%81tithi'};

  put('Manu',{
    sanskritTitle:'मनुस्मृतिः / मानवधर्मशास्त्रम्',traditionalAuthor:'Manu, with the teaching transmitted through Bhrigu',language:'Classical Sanskrit',period:'Received Manava Dharmashastra broadly c. 200 BCE–200 CE; modern critical work often places its redaction near the beginning of the Common Era.',extent:'12 chapters; roughly 2,685 verses in the common Kulluka-based vulgate, with substantial manuscript variation',
    leadParagraphs:[
      'The Manusmriti, whose chapter colophons call the work the Manava Dharmashastra, is the most famous metrical treatise on dharma. Manu teaches a comprehensive order of religious life: sources of dharma, initiation and Vedic study, marriage and household duties, the four ashramas, kingship and courts, inheritance, purity, penance, karma and liberation.',
      'The work presents itself as Manu’s teaching to assembled sages, with Bhrigu reciting the law at Manu’s command. That sacred frame should be distinguished from the separate historical question of how the surviving Sanskrit text was edited and transmitted across many manuscripts.',
      'Its later fame was amplified by a vast commentary tradition and, much later, by colonial attempts to use Sanskrit Dharmashastra as if it were a single statutory code. Traditional Hindu jurisprudence was more complicated: Manu was a major authority, but jurists read him alongside Yajnavalkya, Narada, Vishnu, regional custom, nibandhas and earlier commentators.'
    ],articleSections:[
      {title:'Date and textual formation',paragraphs:[
        'The received text belongs after the early Dharmasutras and before most of the mature medieval commentarial tradition. Its polished shloka form, developed treatment of kingship and legal procedure, and reuse of earlier Dharma materials place it in the centuries around the beginning of the Common Era rather than in the linguistic period of the Rigveda.',
        'The work draws on older Dharmasutra traditions and on political and economic reasoning associated with artha. This does not make it a mere compilation: its redactor imposes a strong literary architecture in which cosmic creation, social order, household duty, royal justice, penance and liberation are connected as parts of one theory of dharma.',
        'More than fifty manuscripts are known, and they do not all agree. The Calcutta/Kulluka text became the dominant printed vulgate, but modern critical study has shown that no one late manuscript can simply be equated with the earliest recoverable text.'
      ]},
      {title:'The twelve chapters',paragraphs:['The twelve-chapter structure is stable at the highest level, even though individual verses vary among manuscripts.'],books:[
        {number:1,title:'Creation and the authority of dharma',summary:'Cosmogony, the emergence of Manu, social and cosmic classification, ages of the world and the authority under which the teaching is delivered.'},
        {number:2,title:'Sources of dharma and the student',summary:'Veda, remembered tradition and conduct; initiation, sacred thread, teacher, Vedic study, discipline and the transition out of brahmacharya.'},
        {number:3,title:'Marriage, household and shraddha',summary:'Forms of marriage, duties toward spouse and guests, daily offerings, hospitality, ancestral rites and the religious responsibilities of the householder.'},
        {number:4,title:'Daily conduct',summary:'Livelihood, restraint, social conduct, gifts, food, speech, associations and the disciplined life expected of a learned householder.'},
        {number:5,title:'Food, impurity and family rules',summary:'Permitted and forbidden foods, purification, death impurity, sexual and family matters, and rules affecting women and household purity.'},
        {number:6,title:'Forest-dweller and renouncer',summary:'Vanaprastha and sannyasa, austerity, non-attachment, contemplative discipline and the movement from ritual household life toward liberation.'},
        {number:7,title:'Kingship',summary:'The origin and duties of the king, ministers, taxation, diplomacy, war, punishment and the religious responsibility of government.'},
        {number:8,title:'Courts and the eighteen titles of law',summary:'Judicial procedure, debt, deposits, sale, partnerships, wages, boundaries, assault, theft, sexual offences, property disputes, gambling and punishment.'},
        {number:9,title:'Family, sons and inheritance',summary:'Marriage relations, paternity, sons, partition, inheritance, women’s property and the continuity of the household line.'},
        {number:10,title:'Social classes and livelihood',summary:'Varna, mixed groups, occupations, emergency livelihood and social classification.'},
        {number:11,title:'Sin and penance',summary:'Major offences, gifts, vows, expiation, fasting and ritual means of restoring religious standing.'},
        {number:12,title:'Karma and liberation',summary:'The fruits of action, rebirth, the three gunas, destinies after death, knowledge and the final soteriological frame of the work.'}
      ]},
      {title:'Manuscripts and the critical text',paragraphs:[
        'The familiar Kulluka Bhatta recension is only one branch of a larger manuscript tradition. Verse presence, wording and sequence can differ across regional witnesses and commentators. This matters whenever a modern argument cites “Manu says” without identifying the edition.',
        'Patrick Olivelle’s critical edition compares manuscript families and commentarial evidence rather than simply reprinting the most familiar colonial-era text. Some verses long treated as standard prove less widely attested; other readings preserved by older commentators can be textually important.',
        'The existence of variation does not mean the work has no stable identity. The twelve-chapter architecture and a very large common core are well established; textual criticism asks which wording and verses best explain the surviving branches.'
      ]},
      {title:'Dharma, kingship and law',paragraphs:[
        'Manu does not separate “religion” from “law” in a modern way. The same text discusses initiation, sacrifice, marriage, taxation, evidence, inheritance, penance and rebirth because dharma is conceived as an order spanning personal discipline, household life, political authority and cosmic consequence.',
        'Chapter 8’s eighteen titles of litigation became especially influential in later jurisprudence. Yet the king’s judicial authority is framed by dharma: punishment is presented as a sacred responsibility whose misuse harms both ruler and kingdom.',
        'The text’s social prescriptions are normative arguments, not a census of ancient Indian practice. Inscriptions, narrative literature, other Smritis and regional custom often reveal a social world more varied than one Dharmashastra’s ideal scheme.'
      ]},
      {title:'Commentaries',paragraphs:[
        'Bharuchi is among the earliest known commentators, though his work survives incompletely. Medhatithi’s Manubhashya, probably around the ninth or tenth century, is the oldest complete major commentary and is indispensable because he debates interpretation rather than merely glossing words.',
        'Govindaraja, Kulluka Bhatta, Narayana, Raghavananda and Nandana belong to the later commentary tradition. Kulluka’s text became disproportionately influential in printed and colonial scholarship, which is one reason modern editors compare him with older commentators.',
        'These commentators disagree on difficult verses, legal scope and the relation between textual rule and custom. Their disagreements are part of the history of Manu’s authority rather than noise around a supposedly self-explanatory code.'
      ]},
      {title:'Reception and later legal history',paragraphs:[
        'Manu was cited throughout medieval Dharmashastra, but usually through commentary and digest traditions that reconciled multiple authorities. The idea that one book functioned as the civil statute of all Hindus is largely a modern simplification.',
        'British administrators and Sanskrit pandits elevated selected Dharmashastra texts in the construction of Anglo-Hindu law. Manusmriti’s English translations and accessibility made it unusually prominent, even where living legal practice was mediated by regional schools, commentaries and custom.',
        'Modern debates about caste, gender and social order often focus on Manu because of that visibility. A historical article should distinguish the Sanskrit text, its medieval interpretations, colonial legal use and modern political reception rather than treating all four as one event.'
      ]}
    ],sources:merge(D['Smṛti:Manu']?.sources,[W_MANU,W_MED,'Patrick Olivelle, Manu’s Code of Law: A Critical Edition and Translation',KANE,OL,'Ganganath Jha, Manusmriti with the Manubhashya of Medhatithi'])
  });

  put('Yājñavalkya',{
    sanskritTitle:'याज्ञवल्क्यस्मृतिः',traditionalAuthor:'Yajnavalkya',language:'Classical Sanskrit',period:'Commonly placed in the Gupta age, around the 4th–5th century CE in recent scholarship.',extent:'3 adhyayas; about 1,010 verses in the common text',
    leadParagraphs:[
      'The Yajnavalkya Smriti is one of the most systematic and influential Dharmashastras. Its great strength is organization: instead of spreading material across twelve chapters, it divides dharma into three large books—Achara, Vyavahara and Prayaschitta—covering religious conduct, judicial procedure and expiation.',
      'The text is concise but dense. It treats initiation, marriage, household rites, shraddha, kingship, courts, documentary evidence, debt, inheritance, impurity, funeral duty, yoga and liberation, and its legal chapters became foundational through Vijnaneshvara’s Mitakshara commentary.'
    ],articleSections:[
      {title:'Date and setting',paragraphs:[
        'The received work is later than Manu and the classical Dharmasutras. Developed documentary evidence, mature legal procedure, coin and institutional vocabulary and the cultural world assumed by the text fit the Gupta period well.',
        'Its literary frame places the teaching in the voice of the Vedic sage Yajnavalkya. The sacred authority of that name belongs to the traditional presentation; the historical redaction of the metrical Dharmashastra belongs to a much later age.',
        'The text is often associated with Mithila/Videha in its literary geography, while recent historical work has also explored an eastern Indian Gupta setting.'
      ]},
      {title:'Three-part architecture',books:[
        {number:1,title:'Achara — conduct',summary:'Sources of dharma, initiation, Vedic study, marriage, daily duties, household ritual, shraddha, gifts, purity, the king’s religious responsibilities and the normative life of the ashramas.'},
        {number:2,title:'Vyavahara — legal procedure',summary:'Court constitution, plaint and reply, evidence, witnesses, written documents, possession, ordeals, debt, deposits, partnership, sale, boundaries, assault, theft, adultery, wages, gambling, partition and inheritance.'},
        {number:3,title:'Prayaschitta — expiation and final teaching',summary:'Death impurity, funeral obligations, sins, penances, ascetic discipline, karma, subtle-body reflection, yoga and liberation.'}
      ],paragraphs:['The threefold arrangement became a model of clarity for later jurists. It separates subjects enough to be usable while still presenting them as one integrated dharma tradition.']},
      {title:'Vyavahara and mature jurisprudence',paragraphs:[
        'The second book is one of the central sources for classical Hindu legal procedure. Written documents receive a developed role beside witnesses and possession; stages of litigation are more technically organized than in the early Dharmasutras.',
        'Rules on debt, contracts, boundary disputes, inheritance and property show a juristic literature responding to complex economic and household relations. The work is prescriptive, but it assumes institutions more elaborate than the school-centred world of the earliest Dharma prose.',
        'The concise root verses often require commentary. A single line can generate pages of medieval legal reasoning about evidentiary priority, partition or women’s property.'
      ]},
      {title:'Mitakshara',paragraphs:[
        'Vijnaneshvara’s Mitakshara, composed around the eleventh–twelfth century, became the most influential commentary on Yajnavalkya. It explains the whole Smriti but became especially famous for inheritance and joint-family law.',
        'The commentary does not merely repeat Yajnavalkya. It cites Manu, Narada, Brihaspati, Katyayana and many other authorities, reconciles apparent conflicts and builds a systematic legal argument around terse root verses.',
        'In later Anglo-Hindu law, “Mitakshara law” became the label for a very large regional legal tradition across most of India, contrasted especially with the Bengal Dayabhaga school.'
      ]},
      {title:'Yoga and liberation',paragraphs:[
        'The third book does not end with punishment. It moves through penance and embodied consequence into yoga, the subtle body, karma and liberation. This prevents the work from being reduced to a secular law manual.',
        'Yajnavalkya’s dharma ultimately sits inside a soteriological horizon: proper action, expiation and contemplative discipline are linked to the larger problem of release from rebirth.'
      ]},
      {title:'Textual transmission and study',paragraphs:[
        'The work survives in a stable three-book form with manuscript variation at the verse level. Modern scholarship compares the root text with Mitakshara and other commentaries because commentators can preserve readings older than familiar printed editions.',
        'Its economy makes it especially important for comparative Dharma study: a topic scattered across many verses of Manu may appear as one concentrated legal unit in Yajnavalkya.'
      ]}
    ],sources:merge(D['Smṛti:Yājñavalkya']?.sources,[W_YAJ,'Patrick Olivelle, A Treatise on Dharma (Yajnavalkya)',KANE,OL,'Vijnaneshvara, Mitakshara'])
  });

  put('Viṣṇu',{
    sanskritTitle:'विष्णुस्मृतिः / वैष्णवधर्मशास्त्रम्',traditionalAuthor:'Vishnu',language:'Sanskrit',period:'A layered text built on older Kathaka Dharma material; the received Vaishnava redaction is generally placed in the early medieval period, often around the 7th century CE in recent scholarship.',extent:'100 chapters; prose with embedded and concluding verses',
    leadParagraphs:[
      'The Vishnu Smriti is a complete one-hundred-chapter Dharma text in which classical rules of conduct and law are placed inside an explicitly Vaishnava sacred frame. Vishnu, after raising the Earth in his Varaha form, teaches her the dharma by which human beings sustain the world.',
      'Its combination of prose sutra-like material and verse is one clue to its layered history. An older Dharma tradition connected with the Kathaka school of the Black Yajurveda appears to have been reworked into the surviving Vishnu-centred text.'
    ],articleSections:[
      {title:'Textual history and Vaishnava redaction',paragraphs:[
        'The work contains material that looks older than its final theological frame. Scholars have therefore examined whether a Kathaka Dharmasutra or related school text lies beneath the received recension.',
        'The opening Varaha-Earth dialogue, daily worship of Vishnu and iconographic features belong to a developed Vaishnava religious world. These layers do not make the legal material inauthentic; they show how Dharma literature could be recast within a sectarian devotional tradition.',
        'A Kashmir/Kathaka setting has been proposed on the basis of school affiliation, geography and iconography.'
      ]},
      {title:'The hundred chapters',paragraphs:['The received organization is unusually fine-grained. Rather than twelve or three very large books, Vishnu divides the Dharma system across one hundred short chapters.'],books:[
        {number:'1–4',title:'Frame, varna, king and measures',summary:'Varaha raises Earth; she asks for dharma. The text moves through the social classes, royal duty and standardized weights and measures.'},
        {number:'5–14',title:'Law and proof',summary:'Criminal and civil wrongs, debt, written documents, witnesses and a long series of ordeals.'},
        {number:'15–18',title:'Inheritance and sons',summary:'Heirs, partition and categories of sons.'},
        {number:'19–23',title:'Death and impurity',summary:'Funeral rites, ancestral offerings and purification after death.'},
        {number:'24–32',title:'Women and life-cycle rites',summary:'Family rules and the samskaras from birth through Vedic initiation and marriage.'},
        {number:'33–57',title:'Sin, hell and penance',summary:'Major and minor offences, hells, transmigration and extended systems of expiation.'},
        {number:'58–72',title:'Householder and graduate',summary:'Daily duties, conduct, self-restraint, hospitality and the disciplined life after Vedic study.'},
        {number:'73–93',title:'Shraddha and gifts',summary:'Ancestral ritual and the religious merit of dana.'},
        {number:'94–97',title:'Forest, asceticism and meditation',summary:'Vanaprastha, sannyasa and meditation on Vishnu.'},
        {number:'98–100',title:'Conclusion',summary:'Final religious instructions completing the Vishnu-Earth dialogue.'}
      ]},
      {title:'Law, ordeal and documentary evidence',paragraphs:[
        'The early legal chapters are unusually concrete. Debt, documents and witnesses sit beside a long sequence of ordeals, showing a jurisprudence in which written and testimonial evidence could coexist with sacral modes of proof.',
        'The treatment of criminal offences, property and royal authority is not isolated from purity and penance. Legal wrong can have both public consequence and religious residue.'
      ]},
      {title:'Vaishnava practice',paragraphs:[
        'Vishnu devotion is woven into the Dharma framework rather than appended as a final hymn. Daily puja, meditation and the divine frame identify observance of dharma with service of Vishnu.',
        'This makes the text a major witness to the fusion of older Brahmanical Dharma literature with early medieval temple and bhakti religion.'
      ]},
      {title:'Commentary and reception',paragraphs:[
        'Nandapandita wrote the major surviving commentary, the Vaijayanti, in the seventeenth century. His work belongs to a later learned world but is essential for the received interpretation of difficult prose and legal rules.',
        'Julius Jolly’s nineteenth-century translation introduced the text widely to European scholarship. Recent work has returned to manuscript and redactional questions rather than treating Jolly’s printed recension as historically transparent.'
      ]}
    ],sources:merge(D['Smṛti:Viṣṇu']?.sources,[W_VIS,'Patrick Olivelle, “The Date and Provenance of the Vishnu-Smriti”',KANE,'Julius Jolly, The Institutes of Vishnu','Nandapandita, Vaijayanti'])
  });
  D['Smṛti:Vaiṣṇava']=D['Smṛti:Viṣṇu'];

  put('Āpastamba',{
    sanskritTitle:'आपस्तम्बधर्मसूत्रम्',traditionalAuthor:'Apastamba',language:'Sutra Sanskrit',period:'Among the oldest surviving Dharma texts; commonly placed in the later first millennium BCE, with modern relative chronology often treating the extant recension as the earliest surviving Dharmasutra.',extent:'2 prashnas/books, corresponding to prashnas 28–29 of the 30-prashna Apastamba Kalpasutra',
    leadParagraphs:[
      'The Apastamba Dharmasutra is not an isolated law book. It is the twenty-eighth and twenty-ninth sections of the much larger Apastamba Kalpasutra of the Taittiriya Black Yajurveda, following Shrauta and domestic ritual material and preceding the Shulbasutra.',
      'Its two books move from student discipline to householder life, food, purity, marriage, inheritance, penance and competing models of religious life. The text is especially important because it openly recognizes learned custom and the practice of people who know dharma as sources that cannot always be reduced to a quoted Vedic sentence.'
    ],articleSections:[
      {title:'Place in the Apastamba Kalpasutra',paragraphs:[
        'The first twenty-four prashnas of the larger corpus are principally Shrauta; the twenty-fifth is a mantra section; twenty-six and twenty-seven are domestic ritual; twenty-eight and twenty-nine form the Dharmasutra; the thirtieth is the Shulbasutra.',
        'This architecture explains the original setting of Dharma. Rules about student conduct or inheritance belonged to the same Vedic school curriculum as altar building and Soma sacrifice.'
      ]},
      {title:'Book 1 — student and disciplined life',paragraphs:[
        'The first book begins with sources of dharma and the life of the Vedic student. It discusses teacher, residence, food, dress, study, purity, sexual restraint, social interaction and the end of studentship.',
        'The detail is practical because the text presupposes a real school community. Brahmacharya is not an abstract “life stage”; it is a disciplined relationship to a teacher, a recitational curriculum and a regulated daily body.'
      ]},
      {title:'Book 2 — householder, property and religious options',paragraphs:[
        'The second book turns to marriage, household duty, hospitality, food, inheritance, property, penance and social relations. It also preserves material on ascetic alternatives and the question of how different modes of life relate to Vedic obligation.',
        'Compared with later metrical Smritis, the organization remains recognizably school-based and sutra-like. Many topics are compressed and presuppose oral explanation.'
      ]},
      {title:'Custom and the knowledge of dharma',paragraphs:[
        'Apastamba is famous for acknowledging that not every rule of dharma can be derived by pointing to an extant Vedic passage. The practices of cultured people who understand dharma therefore have evidentiary weight.',
        'This passage became important in modern scholarship because it shows early Dharma authors reflecting on the gap between revelation and the detailed norms required by social life.'
      ]},
      {title:'Chronology and geography',paragraphs:[
        'Older estimates often ranged from roughly the sixth to third centuries BCE. Relative chronology remains debated, but the surviving text is consistently treated as extremely early.',
        'The school is associated with the Black Yajurveda and strongly rooted in southern transmission. That geographic setting matters because Dharma literature did not develop only in the middle Gangetic plain.'
      ]},
      {title:'Textual transmission',paragraphs:[
        'The Dharmasutra’s extensive cross-references to the larger Kalpasutra suggest a tightly integrated school text. Later commentators and modern editors must therefore read the two Dharma prashnas in relation to ritual material outside their immediate boundaries.',
        'Olivelle’s modern translation and study place Apastamba within the comparative history of the four classical surviving Dharmasutras rather than treating it as an early version of Manu.'
      ]}
    ],sources:merge(D['Smṛti:Āpastamba']?.sources,[W_AP,ODS,OL,KANE,'Apastamba Kalpasutra and Dharmasutra Sanskrit editions'])
  });

  put('Gautama',{
    sanskritTitle:'गौतमधर्मसूत्रम्',traditionalAuthor:'Gautama',language:'Sutra Sanskrit',period:'A very early surviving Dharmasutra; recent relative chronology often places it around the late 2nd to early 1st century BCE.',extent:'28 adhyayas; about 973 sutras in a common count',
    leadParagraphs:[
      'The Gautama Dharmasutra is one of the oldest complete Dharma texts. Written almost entirely in terse prose sutras, it moves systematically through sources of dharma, brahmacharya, the ashramas, household and social duty, kingship, litigation, purity, ancestral rites, inheritance, crimes and penances.',
      'Its unusually large share of material on government and judicial procedure makes it especially important for the history of Hindu jurisprudence. The king appears not only as warrior or patron but as judge, tax collector and protector charged with maintaining a lawful social order.'
    ],articleSections:[
      {title:'Twenty-eight chapters',paragraphs:['The chapters can be grouped into several broad blocks.'],books:[
        {number:'1–3',title:'Sources, student and ashramas',summary:'Authority of Veda and tradition, brahmacharya, graduation and the principal modes of adult religious life.'},
        {number:'4–10',title:'Householder and social order',summary:'Marriage, domestic rites, guests, gifts, crisis conduct, social classes, occupations, taxation, war and the relation between Brahmins and king.'},
        {number:'11–13',title:'King and judiciary',summary:'Royal duties, courts, civil and criminal disputes, debts, contracts, punishment and witnesses.'},
        {number:'14–16',title:'Death, ancestors and purity',summary:'Cremation, impurity, shraddha and related personal rites.'},
        {number:'17–28',title:'Food, inheritance, offences and penance',summary:'Diet, property, family succession, serious sins, purification and restoration.'}
      ]},
      {title:'Sources of dharma',paragraphs:[
        'Gautama opens by grounding dharma in Veda and the traditions and practices of those who know it. This short formulation became part of a long Dharma debate over the relation between revealed text, remembered rule and accepted conduct.',
        'Later Smritis expand the hierarchy of sources, but Gautama already shows that legal-religious reasoning cannot operate by scripture quotation alone.'
      ]},
      {title:'Government and procedure',paragraphs:[
        'A notably high proportion of the text concerns kingship and adjudication. Taxes, property, punishment, trial and witnesses are treated as religiously governed institutions rather than merely techniques of statecraft.',
        'The text assumes private property and procedures for resolving disputes, which makes it important alongside Arthashastra traditions for reconstructing early Indian legal thought.'
      ]},
      {title:'Ashramas and renunciation',paragraphs:[
        'Gautama recognizes multiple modes of religious life and preserves early debate over the relation among student, householder, forest-dweller and renouncer. The later four-ashrama system is visible, but the history of how those options were ranked was still developing.'
      ]},
      {title:'School affiliation and date',paragraphs:[
        'Traditional affiliation connects Gautama with a Samavedic school, though the exact relationship to extant Samaveda branches is difficult to reconstruct. The prose style and institutional world place the text before the great metrical Dharmashastras.',
        'Modern relative chronologies differ over its exact position against Apastamba and Baudhayana. The secure point is that Gautama belongs to the earliest surviving layer of systematic Dharma literature.'
      ]}
    ],sources:merge(D['Smṛti:Gautama']?.sources,[W_GAU,ODS,OL,KANE])
  });

  put('Vasiṣṭha',{
    sanskritTitle:'वसिष्ठधर्मसूत्रम्',traditionalAuthor:'Vasistha',language:'Sutra Sanskrit with numerous verses',period:'Later than the earliest Dharmasutras; commonly placed broadly c. 300 BCE–100 CE, with recent relative chronology tending toward the beginning of the Common Era.',extent:'30 chapters; about 1,038 sutras in the received text',
    leadParagraphs:[
      'The Vasistha Dharmasutra is a substantial early Dharma text named for the Rigvedic sage Vasistha. It is more composite than a neat single-author handbook: prose sutras coexist with many verses, manuscripts show revision, and the work’s arrangement already approaches the topical organization of later Smritis.',
      'Its thirty chapters range across sources of dharma, sacred geography, marriage, purity, the life stages, royal and judicial questions, inheritance, major sins, penance and restoration. It is especially important as a bridge between the older school sutras and the later metrical Dharmashastra world.'
    ],articleSections:[
      {title:'Composition and relative date',paragraphs:[
        'Vasistha appears later than the oldest surviving Dharmasutras in several modern reconstructions. Written evidence in judicial procedure and the mixture of sutra prose with verse point toward a stage closer to the early metrical Smritis.',
        'The text also contains passages of different character, and the manuscript tradition includes corrupt or revised sections. Its chronology should therefore be understood as the history of a received composite rather than a single day of composition.'
      ]},
      {title:'Contents of the thirty chapters',paragraphs:[
        'The early chapters discuss sources of dharma, the authority of learned conduct, sacred regions, student and householder obligations, marriage and purity. Middle sections move through life-cycle and social duties, while later chapters devote extensive attention to sin, exclusion, restoration and penance.',
        'Adoption, inheritance, mixed social groups, killing, adultery, theft, suicide and animal killing appear alongside gifts and ritual purification. This breadth shows how Dharma literature binds social order and expiation together.'
      ]},
      {title:'Written evidence and legal procedure',paragraphs:[
        'Vasistha is notable in the history of Dharma law for recognizing written evidence in judicial contexts. The point is chronologically useful because documentary proof becomes more explicit in later juristic literature.',
        'Its presence also shows that Dharma jurisprudence was responding to real administrative techniques rather than remaining confined to oral oath and witness.'
      ]},
      {title:'Penance and restoration',paragraphs:[
        'A large share of the work is concerned with what happens after violation. Major and minor offences are paired with forms of purification, austerity, restitution and readmission.',
        'This restorative dimension is easy to miss when Dharma texts are presented only as prohibitions. The literature assumes that wrong action creates consequences that must be ritually and socially addressed.'
      ]},
      {title:'Textual transmission',paragraphs:[
        'Unlike Apastamba, Vasistha does not survive as an obvious section of a complete Shrauta-Grihya Kalpasutra. The independent state of the text and its revisions make reconstruction more difficult.',
        'Olivelle’s comparative study reads Vasistha against Gautama, Apastamba and Baudhayana to identify shared passages, borrowings and relative chronology.'
      ]}
    ],sources:merge(D['Smṛti:Vasiṣṭha']?.sources,[W_VAS,ODS,OL,KANE])
  });
  D['Smṛti:Vāsiṣṭha']=D['Smṛti:Vasiṣṭha'];

  put('Parāśara',{
    sanskritTitle:'पराशरस्मृतिः / पराशरधर्मसंहिता',traditionalAuthor:'Parashara',language:'Sanskrit verse',period:'The extant recension is later than the early Dharmasutras and Yajnavalkya; dates vary widely in scholarship, with an early-medieval redaction often proposed.',extent:'12 chapters; around 592–602 verses depending on recension/count',
    leadParagraphs:[
      'The Parashara Smriti is the Dharma text most famously associated with rules for Kali Yuga. Its opening frame sends the sages first to Vyasa and then to Parashara to ask what dharma is appropriate for people living in the present age.',
      'The surviving work is much shorter than Manu or Yajnavalkya. Its twelve chapters concentrate mainly on achara and prayashchitta—religious conduct, household duty, birth and death impurity, purification and expiation. The large medieval Parashara-Madhaviya later expands the tradition dramatically, including extensive legal discussion not present as a separate Vyavahara book in the root Smriti.'
    ],articleSections:[
      {title:'Kali Yuga frame',paragraphs:[
        'The opening explicitly asks for dharma suited to Kali Yuga. This gave the work a distinctive later authority whenever jurists argued that an older rule had become too severe or impracticable for the present age.',
        'The text also lists earlier Dharma authorities, which is why its first chapter is one of the primary witnesses used in this scripture index to construct the Smriti list.'
      ]},
      {title:'Twelve chapters',paragraphs:[
        'The first chapter introduces Kali Yuga, daily duties and the authority of Dharma. The following chapters move through household obligations, purity, livelihood, agriculture and numerous expiations connected with death, birth, food, sexual conduct, animals and social-religious transgression.',
        'The arrangement is less systematic than Yajnavalkya. Prayaschitta appears across several chapters rather than in one neatly separated book, which is one reason medieval commentary becomes important for organizing the material.'
      ]},
      {title:'Achara and prayashchitta, not a full Vyavahara book',paragraphs:[
        'The extant root text concentrates on conduct and expiation. It does not contain a full independent judicial book comparable to Yajnavalkya’s Vyavahara adhyaya.',
        'This distinction matters because later readers sometimes treat the legal discussions of the Parashara-Madhaviya as though every one were a verse of the root Parashara Smriti. Madhava’s commentary brings in a huge range of other legal authorities.'
      ]},
      {title:'Parashara-Madhaviya',paragraphs:[
        'Madhavacharya’s fourteenth-century Parashara-Madhaviya is a monumental commentary and digest. It became especially authoritative in South Indian Dharma jurisprudence.',
        'Madhava uses Parashara as the organizing authority but quotes and reconciles many Smritis and nibandha traditions. His treatment of Vyavahara grows from royal-duty passages even though the root text lacks a separate legal book.'
      ]},
      {title:'Textual history',paragraphs:[
        'Yajnavalkya already names Parashara among Dharma authorities, which proves the antiquity of the sage-name as a Smritikara but does not prove that the present twelve-chapter text existed unchanged at that date.',
        'The extant Parashara refers to a developed Kali-Yuga framework and may represent a recasting of older Parashara material. The distinction between ancient authority and surviving recension is essential.'
      ]},
      {title:'Reception',paragraphs:[
        'Parashara became a central source in discussions of yuga-dharma and practical adaptation. Verses were repeatedly cited in later digests concerned with impurity, expiation, marriage and household rules.',
        'Its authority is therefore much larger than its verse count. The root work is compact, while the commentarial tradition turns it into a major node in medieval Dharma reasoning.'
      ]}
    ],sources:merge(D['Smṛti:Parāśara']?.sources,[H_PAR,{title:'Sanatan Hindu Dharma — Parashara Smriti',detail:'Received twelve-chapter organization and Kali-Yuga frame.',url:'https://sanatanhindudharma.org/Dharma_Shashtra/Parashara_Smriti_Part_I'},KANE,'Parashara Smriti with Parashara-Madhaviya'])
  });
  D['Smṛti:Pārāśara']=D['Smṛti:Parāśara'];
})();