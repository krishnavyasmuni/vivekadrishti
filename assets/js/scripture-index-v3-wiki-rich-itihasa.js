(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{D[`Itihāsa:${name}`]=Object.assign({},D[`Itihāsa:${name}`]||D[name]||{},data);};

  put('Mahābhārata',{
    sanskritTitle:'महाभारतम्',
    alternateTitles:['Bhārata'],
    traditionalAuthor:'Vyāsa',
    language:'Sanskrit',
    booksCount:'18 parvans; about 100 named upaparvans in the received architecture',
    verseCount:'Traditionally about 100,000 ślokas; the BORI Critical Edition has about 73,800 verses',
    extent:'One of the longest surviving epic compositions in world literature; the Harivaṃśa is commonly transmitted as a khila or supplement',
    primaryRecensions:['Northern manuscript traditions','Southern manuscript traditions and regional subrecensions'],
    leadParagraphs:[
      'The Mahābhārata is not simply the story of a war between the Pāṇḍavas and Kauravas. In its received Sanskrit form it is an enormous library built around that war: dynastic history, myth, law, kingship, pilgrimage, ritual, moral argument, yoga, renunciation, liberation theology and hundreds of embedded stories are folded into an eighteen-book narrative. The Bhagavad Gītā is only one famous episode inside this much larger work.',
      'The central plot begins with a succession struggle inside the Kuru dynasty. The five Pāṇḍava brothers and the hundred sons of Dhṛtarāṣṭra grow up as rivals, share and divide a kingdom, and finally become enemies after Yudhiṣṭhira loses his realm and Draupadī is humiliated in the dice hall. Thirteen years of exile lead to failed diplomacy and then to the eighteen-day battle at Kurukṣetra. The victory does not resolve the moral problem: most of the epic after the war is about grief, responsibility, kingship and the cost of winning.',
      'The work is also a textual tradition rather than one frozen ancient manuscript. Different regions preserved different readings and substantial additional passages. Between 1919 and 1966 the Bhandarkar Oriental Research Institute compared manuscripts from across South Asia and produced a Critical Edition intended to reconstruct the common ancestor of the surviving manuscript traditions. Popular printed editions remain longer because they retain passages that the critical editors placed in the apparatus or appendices.'
    ],
    articleSections:[
      {
        title:'Story and narrative frame',
        paragraphs:[
          'The Mahābhārata tells its story through several nested narrators. At its outermost level the bard Ugraśravas Sauti recounts the epic to sages gathered in the Naimiṣa forest. Inside that telling lies Vaiśampāyana’s recitation of the Bhārata to King Janamejaya during the king’s snake sacrifice. The main Kuru story is therefore presented as remembered family history, ritual recitation and moral interpretation all at once.',
          'The dynastic conflict begins generations before the war. Bhīṣma’s vow, the unusual births of Dhṛtarāṣṭra, Pāṇḍu and Vidura, the divine paternity of the Pāṇḍavas, Karṇa’s secret birth, and the rivalry between Duryodhana and the Pāṇḍavas create a succession crisis that no simple legal rule can solve. The epic repeatedly makes dharma difficult by placing legitimate duties in conflict with one another.',
          'The dice match is the irreversible turning point. Yudhiṣṭhira loses wealth, kingdom, brothers, himself and finally Draupadī. Draupadī’s question—whether a man who had already lost himself still had the legal power to stake his wife—becomes one of the epic’s most famous unresolved arguments about law and authority. The exile books then widen the narrative into a vast anthology of sacred geography, legends, ethical debates and precedents.'
        ]
      },
      {
        title:'The eighteen parvans',
        paragraphs:['A parvan is simply a major book of the epic. The received Mahābhārata has eighteen of them. Their lengths are extremely unequal: Śānti and Anuśāsana are vast didactic books, while the final books are very short.'],
        books:[
          {number:1,title:'Ādi Parvan — The Book of the Beginning',summary:'Origins of the Kuru dynasty, births of the Pāṇḍavas and Kauravas, childhood rivalry, the lac-house plot, Draupadī’s svayaṃvara, the Pāṇḍavas’ marriage to Draupadī, and the establishment of Indraprastha.'},
          {number:2,title:'Sabhā Parvan — The Book of the Assembly Hall',summary:'The royal court at Indraprastha, Yudhiṣṭhira’s rājasūya, the killing of Śiśupāla, Duryodhana’s jealousy, the dice games, Draupadī’s humiliation and the sentence of exile.'},
          {number:3,title:'Vana or Āraṇyaka Parvan — The Book of the Forest',summary:'Twelve years of forest exile. Contains pilgrimage accounts and major embedded narratives including Nala and Damayantī, Sāvitrī, Rāma’s story, and long discussions of dharma.'},
          {number:4,title:'Virāṭa Parvan — The Book of Virāṭa',summary:'The thirteenth year of exile spent incognito at King Virāṭa’s court, ending with Arjuna’s return to arms and the recovery of Virāṭa’s cattle.'},
          {number:5,title:'Udyoga Parvan — The Book of Effort',summary:'Diplomacy and preparations for war. Kṛṣṇa attempts a final peace mission; alliances are chosen; both sides accept that battle has become nearly unavoidable.'},
          {number:6,title:'Bhīṣma Parvan',summary:'The opening of the Kurukṣetra war under Bhīṣma’s command. The Bhagavad Gītā occurs here, immediately before Arjuna enters battle.'},
          {number:7,title:'Droṇa Parvan',summary:'Droṇa becomes commander. The war grows more destructive, including the death of Abhimanyu and the nightmarish escalation of tactics that violate earlier ideals of combat.'},
          {number:8,title:'Karṇa Parvan',summary:'Karṇa commands the Kaurava army and finally fights Arjuna. Their long rivalry ends with Karṇa’s death.'},
          {number:9,title:'Śalya Parvan',summary:'Śalya becomes the final Kaurava commander; the organized war collapses, and Bhīma defeats Duryodhana in the mace duel.'},
          {number:10,title:'Sauptika Parvan — The Book of the Sleeping Warriors',summary:'Aśvatthāman, Kṛpa and Kṛtavarman attack the sleeping Pāṇḍava camp at night, killing Draupadī’s sons and many surviving allies.'},
          {number:11,title:'Strī Parvan — The Book of the Women',summary:'The women of both sides mourn the dead. Gāndhārī confronts the victors and Kṛṣṇa; the epic turns from battle to grief and moral reckoning.'},
          {number:12,title:'Śānti Parvan — The Book of Peace',summary:'The largest didactic book. The dying Bhīṣma instructs Yudhiṣṭhira on kingship, crisis ethics, social order, renunciation, metaphysics and liberation.'},
          {number:13,title:'Anuśāsana Parvan — The Book of Instructions',summary:'Further teachings from Bhīṣma on gifts, duties, vows, ethics, social practice and religious observance, followed by Bhīṣma’s death.'},
          {number:14,title:'Āśvamedhika Parvan',summary:'Yudhiṣṭhira performs the horse sacrifice; Arjuna follows the sacrificial horse through renewed encounters. Includes the Anugītā and reflections on postwar restoration.'},
          {number:15,title:'Āśramavāsika Parvan',summary:'Dhṛtarāṣṭra, Gāndhārī and Kuntī retire to the forest. Their deaths mark the disappearance of the older generation.'},
          {number:16,title:'Mausala Parvan',summary:'The Yādava clan destroys itself in a fratricidal catastrophe; Kṛṣṇa dies and Dvārakā is lost.'},
          {number:17,title:'Mahāprasthānika Parvan',summary:'The Pāṇḍavas renounce the kingdom and begin their final journey north. One by one Draupadī and the brothers fall, leaving Yudhiṣṭhira and a dog.'},
          {number:18,title:'Svargārohaṇa Parvan',summary:'Yudhiṣṭhira reaches the final test, encounters heaven and hell, and the epic resolves the destinies of its principal figures.'}
        ]
      },
      {
        title:'Major embedded works and episodes',
        paragraphs:['The epic constantly interrupts the Kuru story with other narratives and teachings. These are not ornamental digressions: characters use older stories, myths and doctrines to argue about what should be done in the present crisis.'],
        bullets:[
          'Bhagavad Gītā — Kṛṣṇa’s teaching to Arjuna on action, knowledge, devotion, yoga and divine manifestation in Bhīṣma Parvan.',
          'Nala and Damayantī — a story of kingship, gambling, exile, separation and recovery told to Yudhiṣṭhira during the forest exile.',
          'Sāvitrī and Satyavān — Sāvitrī confronts Yama and wins back her husband’s life through intelligence, resolve and devotion.',
          'Rāmopākhyāna — a compressed telling of the Rāma story inside the Vana Parvan.',
          'Yakṣa-praśna — Yudhiṣṭhira answers a mysterious being’s questions on ethics, wisdom and human life.',
          'Nārāyaṇīya — a major Vaiṣṇava theological unit within Śānti Parvan.',
          'Mokṣadharma — an enormous collection of teachings on renunciation, self, yoga, Sāṃkhya-like analysis and liberation within Śānti Parvan.',
          'Anugītā — a postwar teaching in Āśvamedhika Parvan that explicitly looks back to the setting of the Bhagavad Gītā.'
        ]
      },
      {
        title:'Dharma, politics and philosophy',
        paragraphs:[
          'The Mahābhārata rarely presents dharma as a list of easy rules. Its most memorable situations are collisions of duties: loyalty to kin versus justice, truthfulness versus survival, royal duty versus renunciation, vows versus consequences, and the obligations of a warrior versus the horror of killing relatives. Yudhiṣṭhira, Bhīṣma, Draupadī, Karṇa, Arjuna and Kṛṣṇa repeatedly give different answers to the same moral problem.',
          'The postwar Śānti and Anuśāsana books make the epic one of the largest surviving archives of premodern Indian political and ethical thought. They discuss taxation, ministers, punishment, emergency ethics, gifts, social obligations, non-violence, asceticism and liberation. The famous claim that whatever is found elsewhere may be found here reflects the epic’s self-presentation as more than heroic poetry.',
          'Religiously, the text contains Vedic ritual, ascetic and renunciant ideals, Sāṃkhya and Yoga terminology, devotion to Nārāyaṇa/Kṛṣṇa, Śaiva material and many local cultic traditions. These layers should not be flattened into one philosophical school.'
        ]
      },
      {
        title:'Textual history and the Critical Edition',
        paragraphs:[
          'No single ancient manuscript of the entire Mahābhārata survives. Medieval manuscripts differ in thousands of places and sometimes preserve large passages absent from other regions. Scholars therefore speak of northern and southern manuscript traditions, with further regional groupings inside them.',
          'The Bhandarkar Oriental Research Institute project began in 1919 and published the Critical Edition over several decades, with V. S. Sukthankar establishing the method for the Ādi Parvan and later editors continuing book by book. The editors did not choose the shortest manuscript. They compared the relationships among manuscripts and printed in the main text readings they judged recoverable from the common ancestor of the surviving traditions; substantial secondary passages were recorded in the critical apparatus and appendices.',
          'This is why verse counts differ so dramatically between editions. The Sanskrit epic itself traditionally describes a Mahābhārata of roughly 100,000 verses. A modern digital count of the BORI Critical Edition is about 73,800 verses, whereas large vulgate and southern-recension editions can be above 90,000. A citation must therefore identify the edition whenever exact chapter or verse numbering matters.',
          'The Harivaṃśa, a major collection on Kṛṣṇa, genealogy and cosmology, is commonly transmitted as a khila or supplement to the Mahābhārata. Modern critical scholarship edits it separately rather than silently treating it as a nineteenth main parvan.'
        ]
      },
      {
        title:'Commentaries, translations and reception',
        paragraphs:[
          'The Mahābhārata has generated Sanskrit commentaries, regional retellings, temple and performance traditions, vernacular epics, dramatic works and modern novels, films and television series. Nīlakaṇṭha’s seventeenth-century Bhāratabhāvadīpa became especially influential in the manuscript and print culture of the northern vulgate.',
          'Modern scholarship is built around the Critical Edition but does not agree on a single theory of how the epic grew. Earlier scholars often imagined a simple heroic core enlarged by priestly didactic additions. Later work has emphasized the deliberate architecture of the received epic, the difficulty of reconstructing hypothetical pre-texts, and the need to distinguish the history of composition from the history of manuscripts.',
          'English translation traditions include K. M. Ganguli’s nineteenth-century rendering of the vulgate, the University of Chicago translation begun by J. A. B. van Buitenen and continued by James L. Fitzgerald and others, and complete modern translations based on the Critical Edition.'
        ]
      }
    ],
    bibliography:[
      'V. S. Sukthankar et al., eds., The Mahābhārata: Critical Edition, Bhandarkar Oriental Research Institute, Pune, 1919–1966.',
      'V. S. Sukthankar, Prolegomena to the Critical Edition of the Ādiparvan.',
      'J. A. B. van Buitenen, trans., The Mahābhārata, University of Chicago Press.',
      'James L. Fitzgerald, trans. and studies of the Śānti and later parvans, University of Chicago Press.',
      'Vishwa Adluri and Joydeep Bagchee, Philology and Criticism: A Guide to Mahābhārata Textual Criticism, 2018.',
      'Simon Brodbeck, “Mahābhārata,” Oxford Bibliographies in Hinduism.',
      'Alf Hiltebeitel, studies on the Mahābhārata and its religious worlds.',
      'SanskritDocuments, electronic text of the BORI Critical Edition based on Muneo Tokunaga and John Smith.',
      'Manipal Academy of Higher Education, Computational Analyses of Mahābhārata, digital concordance and verse counts.'
    ]
  });

  put('Rāmāyaṇa',{
    sanskritTitle:'रामायणम्',
    alternateTitles:['Vālmīki Rāmāyaṇa'],
    traditionalAuthor:'Vālmīki',
    language:'Sanskrit',
    booksCount:'7 kāṇḍas in the received text',
    verseCount:'Traditionally about 24,000 ślokas; the Baroda Critical Edition is substantially shorter',
    extent:'Roughly 600 sargas in the critical text; exact chapter and verse totals vary by recension and edition',
    primaryRecensions:['Northern textual traditions','Southern recension','Northwestern and northeastern/eastern manuscript groups'],
    leadParagraphs:[
      'The Vālmīki Rāmāyaṇa is the Sanskrit epic of Rāma, Sītā, Lakṣmaṇa, Hanumān and the war against Rāvaṇa. Its plot is far more than a rescue story. The poem asks what an ideal son owes a father, what a king owes a kingdom, what spouses owe one another, whether obedience can become morally destructive, and how private suffering is transformed when a prince is expected to embody public dharma.',
      'In the received seven-book text, Rāma loses the throne of Ayodhyā on the eve of his coronation and accepts fourteen years of exile. Sītā and Lakṣmaṇa accompany him. Rāvaṇa abducts Sītā from the forest; Rāma forms an alliance with Sugrīva and the vānaras; Hanumān crosses the ocean and finds Sītā in Laṅkā; an army builds a crossing to the island; Rāvaṇa is defeated; and Rāma returns to Ayodhyā. The final Uttarakāṇḍa then complicates the triumph by narrating Sītā’s later exile, the birth of Lava and Kuśa, and the end of Rāma’s earthly reign.',
      'Like the Mahābhārata, the Rāmāyaṇa survives in several manuscript traditions rather than one original codex. The Oriental Institute at Baroda produced a seven-volume Critical Edition between 1960 and 1975 from manuscripts representing major regional traditions. Textual critics generally regard much of Bālakāṇḍa and Uttarakāṇḍa as later than the central narrative, but both books are integral to the received epic and to the history of Hindu Rāma devotion.'
    ],
    articleSections:[
      {
        title:'Plot',
        paragraphs:[
          'The narrative is driven by a succession crisis. Daśaratha intends to crown his eldest son Rāma, but Kaikeyī invokes two boons previously granted by the king: her own son Bharata must receive the throne, and Rāma must spend fourteen years in the forest. Rāma accepts the order rather than allow his father to violate his word. Bharata later rejects the moral legitimacy of Kaikeyī’s demand, but Rāma still refuses to return before the exile is complete.',
          'The forest story changes the scale of the poem. Rāma and Lakṣmaṇa encounter sages, rākṣasas and competing forms of ascetic and royal duty. Śūrpaṇakhā’s encounter with the brothers and the killing of Khara bring the exiles into Rāvaṇa’s world. Mārīca takes the form of the golden deer, Sītā is left vulnerable, and Rāvaṇa carries her to Laṅkā.',
          'The Kiṣkindhā and Sundara books shift attention to alliances and to Hanumān. Rāma kills Vālin and restores Sugrīva; search parties are sent in all directions; Hanumān makes the ocean crossing, enters Laṅkā, finds Sītā in the Aśoka grove, delivers Rāma’s signet ring, refuses her proposal that he carry her away immediately, burns part of Laṅkā after his capture, and returns with proof that she is alive.',
          'The Yuddhakāṇḍa narrates the bridge to Laṅkā and a long war in which Kumbhakarṇa, Indrajit and finally Rāvaṇa are killed. The victory is followed by the controversial ordeal of Sītā, Rāma’s return, and coronation. Uttarakāṇḍa then presents a second crisis: public suspicion leads Rāma to send the pregnant Sītā away; she finds refuge with Vālmīki, gives birth to Lava and Kuśa, and the boys eventually recite the Rāmāyaṇa before their father.'
        ]
      },
      {
        title:'The seven kāṇḍas',
        paragraphs:['A kāṇḍa is a major book of the poem. The seven-book arrangement familiar today is ancient, but the individual books did not all necessarily reach their present form at the same time.'],
        books:[
          {number:1,title:'Bālakāṇḍa — Book of Childhood',summary:'Vālmīki and the origin of the poem; Rāma’s birth; Viśvāmitra’s arrival; Tāṭakā and the protection of the sacrifice; Ahalyā; the breaking of Śiva’s bow; marriage to Sītā; Paraśurāma.'},
          {number:2,title:'Ayodhyākāṇḍa — Book of Ayodhyā',summary:'Planned coronation, Kaikeyī’s boons, Daśaratha’s collapse, Rāma’s exile, Bharata’s rejection of the throne and Rāma’s decision to complete the fourteen-year vow.'},
          {number:3,title:'Araṇyakāṇḍa — Book of the Forest',summary:'Forest hermitages, encounters with rākṣasas, Śūrpaṇakhā, the golden deer, Rāvaṇa’s abduction of Sītā, Jaṭāyu’s death and the beginning of the search.'},
          {number:4,title:'Kiṣkindhākāṇḍa',summary:'Rāma’s alliance with Hanumān and Sugrīva, conflict with Vālin, Sugrīva’s restoration, and the organization of the worldwide search for Sītā.'},
          {number:5,title:'Sundarakāṇḍa — The Beautiful Book',summary:'Hanumān’s leap to Laṅkā, search through the city, meeting with Sītā, confrontation with the rākṣasas, burning of Laṅkā and return to Rāma.'},
          {number:6,title:'Yuddhakāṇḍa — Book of War',summary:'Crossing to Laṅkā, Vibhīṣaṇa’s defection, major battles, deaths of Kumbhakarṇa and Indrajit, Rāvaṇa’s defeat, Sītā’s ordeal, return to Ayodhyā and coronation.'},
          {number:7,title:'Uttarakāṇḍa — Final Book',summary:'Prehistory of Rāvaṇa and the rākṣasas, the later reign of Rāma, Śambūka, Sītā’s exile, Lava and Kuśa, Vālmīki’s poem, Sītā’s final return to the Earth and the conclusion of Rāma’s life.'}
        ]
      },
      {
        title:'Characters and major themes',
        subsections:[
          {title:'Rāma and kingship',paragraphs:['In the central books Rāma is repeatedly presented as an exemplary prince whose strength is inseparable from obedience, restraint and political duty. Later theological passages identify him more explicitly as Viṣṇu incarnate. The tension between human exemplar and divine avatāra is one of the clearest signs of the poem’s religious development.']},
          {title:'Sītā',paragraphs:['Sītā is not a passive object of rescue. She insists on accompanying Rāma into exile, rebukes Rāvaṇa, debates Hanumān’s proposed rescue, survives captivity without accepting Rāvaṇa’s authority, and repeatedly confronts the consequences of Rāma’s public role. Her ordeal after the war and later banishment became some of the most debated episodes in the entire Rāma tradition.']},
          {title:'Hanumān',paragraphs:['Hanumān becomes the epic’s model of intelligent and effective service. Sundarakāṇḍa gives him the longest independent heroic sequence: he reasons, changes size, searches systematically, speaks diplomatically to Sītā, calculates when force is useful, and returns with the information needed for the campaign. Later bhakti traditions make this service the foundation of Hanumān devotion.']},
          {title:'Dharma and moral conflict',paragraphs:['The poem explores filial obedience, marital fidelity, brotherhood, royal justice, the ethics of warfare and the tension between personal feeling and public reputation. Episodes such as the killing of Vālin, Sītā’s ordeal and her later exile remain difficult precisely because the poem does not erase the cost of Rāma’s decisions.']}
        ]
      },
      {
        title:'Textual history and recensions',
        paragraphs:[
          'The surviving Sanskrit Rāmāyaṇa is the result of a long oral and manuscript history. Northern, southern and other regional manuscript groups differ substantially, sometimes in the presence, order and wording of entire episodes. For this reason exact verse numbers from one printed edition often do not match another.',
          'The seven-volume Critical Edition prepared at the Oriental Institute, Baroda, between 1960 and 1975 compared manuscripts from the major recensional traditions and reconstructed the readings judged ancestral to them. Like the Mahābhārata Critical Edition, it does not claim to reproduce Vālmīki’s handwritten original; it reconstructs the common textual ancestor accessible through surviving manuscript evidence.',
          'Many philologists regard books 2–6 as closer to the older epic narrative, while much of Bālakāṇḍa and Uttarakāṇḍa is later in language, theology and narrative function. That does not mean the two books are modern or unimportant. Their material is ancient, widely transmitted and essential to the later conception of Rāma as an avatāra of Viṣṇu, to the story of the poem’s own composition, and to the received ending of Sītā and Rāma.',
          'Traditional descriptions speak of about 24,000 ślokas. Critical editions contain fewer because they exclude many verses that occur only in later or restricted manuscript branches. The difference is a textual-history issue, not evidence that ordinary printed Rāmāyaṇas are merely “wrong.”'
        ]
      },
      {
        title:'Rāma traditions beyond Vālmīki',
        paragraphs:[
          'The Sanskrit Vālmīki Rāmāyaṇa became the starting point for an enormous family of retellings rather than a script that later authors simply copied. Sanskrit works such as the Adhyātma Rāmāyaṇa and Ānanda Rāmāyaṇa, Tamil Kampa Rāmāyaṇam, Tulsīdās’s Rāmcaritmānas, Jain and Buddhist Rāma narratives, and Southeast Asian versions all reshape characters and theology for new communities.',
          'The story entered temple sculpture, dance, drama, recitation, village performance, royal ideology and devotional practice across South and Southeast Asia. Scholars therefore distinguish the Vālmīki text from the wider “Rāmāyaṇa tradition,” which contains hundreds of literary and performative versions.',
          'Modern translations based on the Baroda Critical Edition include the multi-volume translation project led by Robert P. Goldman and colleagues at the University of California, Berkeley, which combines translation with extensive philological annotation.'
        ]
      }
    ],
    bibliography:[
      'G. H. Bhatt and U. P. Shah et al., eds., The Vālmīki Rāmāyaṇa: Critical Edition, Oriental Institute, Baroda, 7 vols., 1960–1975.',
      'Robert P. Goldman et al., trans., The Rāmāyaṇa of Vālmīki: An Epic of Ancient India, Princeton University Press.',
      'John Brockington, Righteous Rāma: The Evolution of an Epic, Oxford University Press, 1984.',
      'John Brockington, studies of Rāmāyaṇa language, recensions and textual history.',
      'Mandakranta Bose, ed., The Ramayana Revisited, Oxford University Press, 2004.',
      'Mandakranta Bose, “Rāmāyaṇa in the Hindu Tradition,” Oxford Bibliographies in Hinduism, 2016.',
      'A. K. Ramanujan, “Three Hundred Rāmāyaṇas: Five Examples and Three Thoughts on Translation.”',
      'University of California, Berkeley, Rāmāyaṇa Translation Project materials and research reports.'
    ]
  });
})();