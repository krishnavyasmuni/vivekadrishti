(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Vedic:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const addSources=(cur,extra)=>[...new Map([...(cur||[]),...extra].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const WIKI_VEDAS={title:'Wikipedia — Vedas',detail:'Fourfold Vedic canon, Samhita/Brahmana/Aranyaka/Upanishad layers and school transmission.',url:'https://en.wikipedia.org/wiki/Vedas'};
  const WIKI_RV={title:'Wikipedia — Rigveda',detail:'Ten mandalas, family books, recension history, Brahmanas and Aranyakas.',url:'https://en.wikipedia.org/wiki/Rigveda'};
  const WIKI_SV={title:'Wikipedia — Samaveda',detail:'Liturgical purpose, verse totals, surviving recensions and relation to Rigvedic verses.',url:'https://en.wikipedia.org/wiki/Samaveda'};
  const WIKI_BRAH={title:'Wikipedia — Brahmana',detail:'Survey of surviving Vedic Brahmanas and their school affiliations.',url:'https://en.wikipedia.org/wiki/Brahmana'};
  const WIKI_AR={title:'Wikipedia — Aranyaka',detail:'Survey of the principal Aranyakas and their internal divisions.',url:'https://en.wikipedia.org/wiki/Aranyaka'};
  const WIKI_AB={title:'Wikipedia — Aitareya Brahmana',detail:'Forty chapters in eight pancikas and detailed Soma/royal-ritual contents.',url:'https://en.wikipedia.org/wiki/Aitareya_Brahmana'};
  const WIKI_PB={title:'Wikipedia — Panchavimsha Brahmana',detail:'Twenty-five prapathakas, 347 khandas and Samavedic chant assignments.',url:'https://en.wikipedia.org/wiki/Panchavimsha_Brahmana'};
  const WIKI_SADV={title:'Wikipedia — Sadvimsha Brahmana',detail:'Appendix to the Panchavimsha and relation of its final Adbhuta section to omens.',url:'https://en.wikipedia.org/wiki/Sadvimsha_Brahmana'};
  const WIKI_JUB={title:'Wikipedia — Jaiminiya Upanishad Brahmana',detail:'Jaiminiya/Talavakara school, Kena location and early printed edition by Oertel.',url:'https://en.wikipedia.org/wiki/Jaiminiya_Upanishad_Brahmana'};
  const JAM='Stephanie W. Jamison and Joel P. Brereton, The Rigveda: The Earliest Religious Poetry of India (Oxford, 2014)';
  const WIT='Michael Witzel, studies on Vedic canon, schools, geography and chronology';
  const OLD='Hermann Oldenberg, Prolegomena on Rigvedic textual history and Die Religion des Veda';
  const KEITH='A. B. Keith, Rigveda Brahmanas and The Aitareya Aranyaka';
  const CALAND='W. Caland, editions and studies of Samavedic Brahmanas and Srauta ritual';
  const OERTEL='Hanns Oertel, The Jaiminiya or Talavakara Upanishad Brahmana (JAOS 16, 1896)';

  put('Ṛgveda',{
    sanskritTitle:'ऋग्वेदः',language:'Vedic Sanskrit',traditionalAuthor:'Vedic rishis; arranged in the Vyasa tradition',period:'Principal hymn layers c. 1500–1200 BCE; later additions and redaction within the late second millennium BCE.',extent:'10 mandalas; 1,028 hymns in the common Sakala count',primaryRecensions:['Sakala (complete)','Baskala (partly recoverable)'],
    leadParagraphs:[
      'The Rigveda is the oldest of the four Vedas and the principal surviving collection of early Vedic praise-poetry. Its ten mandalas contain hymns addressed to Agni, Indra, Soma, the Ashvins, Ushas, Varuna, the Maruts, Savitr, Vishnu, Rudra and many other deities, together with riddles, dialogues, royal praise, funeral verses, marriage verses and speculative hymns on creation and the cosmic person.',
      'The received Rigveda is not a miscellany assembled at random. Mandalas 2–7 are the so-called family books, each associated with a major rishi lineage and preserving a comparatively coherent older core. Mandala 9 is devoted to Soma Pavamana. Mandalas 1 and 10 are broader anthologies containing both older material and important later hymns, including the Nasadiya Sukta, Purusha Sukta, Devi Sukta and several dialogue hymns.',
      'The text survives above all through the Sakala recension, whose oral tradition preserves accent and wording with extraordinary precision. Evidence for the Baskala recension, khilas or supplementary hymns, padapatha and Pratishakhya traditions shows that the Rigvedic textual world was once wider than the single printed Samhita most readers now encounter.'
    ],
    articleSections:[
      {title:'Date and formation',paragraphs:[
        'The core of the Rigveda belongs to the late second millennium BCE. Relative chronology is clearer than an exact year: the family books are generally older than much of Mandalas 1 and 10, and the language, geography and social world belong to an Indo-Aryan culture centred first in the north-west and gradually extending eastward.',
        'The collection was shaped over generations of poet-priest families. The hymns preserve names of rishis and lineages, but the received arrangement is the result of later ordering and recensional stabilization. Dating the collection therefore means distinguishing the composition of individual hymns from the later act of arranging and fixing the Samhita.',
        'Linguistic comparison with Avestan, the geography of rivers, chariot vocabulary, pastoral and sacrificial institutions and the absence of later Gangetic political forms are among the main historical tools used in modern chronology.'
      ]},
      {title:'The ten mandalas',paragraphs:['The internal architecture is one of the most important facts about the Rigveda because chronology, priestly lineage and subject matter often follow mandala boundaries.'],books:[
        {number:1,title:'Mandala 1',summary:'A large anthology of hymns from several families. It opens with Agni and contains major hymns to Indra, the Ashvins, Ushas, Savitr and other deities. Its diversity and relationship to the family books show that it was assembled as part of the broader framing of the collection.'},
        {number:2,title:'Mandala 2',summary:'The Gritsamada family book. It is compact and strongly organized by deity, with important hymns to Agni and Indra and some of the oldest linguistic features of the collection.'},
        {number:3,title:'Mandala 3',summary:'Associated with Vishvamitra. It contains the famous Gayatri/Savitri mantra at 3.62.10 and hymns reflecting the Bharata milieu, including the river hymn and material connected with Sudas.'},
        {number:4,title:'Mandala 4',summary:'Associated with Vamadeva Gautama. Dense poetic diction and mythic allusion make it one of the more difficult family books; its Indra hymns are especially important for early Vedic mythology.'},
        {number:5,title:'Mandala 5',summary:'Associated chiefly with the Atri lineage. It includes hymns to Mitra-Varuna, the Ashvins, Ushas, Savitr and the Vishvedevas and preserves a wide ritual-poetic repertoire.'},
        {number:6,title:'Mandala 6',summary:'The Bharadvaja family book. It contains many hymns connected with sacrificial patronage and the Bharata political world, alongside a strong concentration on Agni and Indra.'},
        {number:7,title:'Mandala 7',summary:'The Vasistha family book. It preserves some of the clearest poetic evidence for the Battle of the Ten Kings and the kingship of Sudas, as well as celebrated hymns to Varuna and other deities.'},
        {number:8,title:'Mandala 8',summary:'A distinctive collection dominated by the Kanva and Angirasa traditions. Its metres, refrains and arrangement differ from the central family books; the Valakhilya hymns are attached to this textual sphere.'},
        {number:9,title:'Mandala 9',summary:'Entirely devoted to Soma Pavamana, Soma in the process of purification. The hymns are organized around the ritual pressing and filtering of Soma and re-use language and metres from different poet families.'},
        {number:10,title:'Mandala 10',summary:'A large and varied book containing funerary and marriage hymns, dialogue hymns, the Purusha Sukta, Nasadiya Sukta, Devi Sukta and other speculative compositions. Its language and social vocabulary often mark it as relatively late within the Rigvedic collection.'}
      ]},
      {title:'Oral text and recensions',paragraphs:[
        'The Sakala recension became the principal complete Rigveda. Its samhita-patha preserves the continuous recited text with sandhi and accent, while the Padapatha attributed to Sakalya separates words and supplies an ancient analysis of the text. More elaborate recitation patterns developed as techniques for protecting sequence and pronunciation.',
        'Baskala is the other major recension known from ancient testimony. It is not preserved today as a complete independent Samhita, but variant readings, khila traditions and later citations demonstrate that the Rigveda once circulated in more than one school form.',
        'Manuscripts are comparatively late witnesses to a much older oral text. Their importance lies in recording regional and scholastic transmission, while the stability of the accented oral recension remains central to Rigvedic textual criticism.'
      ]},
      {title:'Ritual, poetry and theology',paragraphs:[
        'Rigvedic hymns are acts of sacred speech situated within sacrifice, but they are not reducible to ritual instructions. Poets praise deities, recall myths, negotiate patronage, pose riddles, dramatize conversations and speculate about the origin of being. The same hymn can work as liturgical speech and as theological poetry.',
        'Agni mediates between sacrificer and gods; Indra is celebrated above all for power, victory and the release of waters; Soma is plant, drink and deity; Varuna embodies a majestic moral and cosmic sovereignty; Ushas reveals the order of dawn; the Ashvins rescue worshippers from danger. These figures are understood through many overlapping epithets rather than a later fixed mythological system.',
        'The speculative hymns of the later collection are especially influential because they ask whether the cosmos arose from being or non-being, describe the universe through the sacrifice of the Purusha, and allow sacred speech itself to speak in the first person. Later Hindu traditions repeatedly re-read these hymns through Vedanta, Purana, ritual and bhakti.'
      ]},
      {title:'Editions and study',paragraphs:[
        'Modern study depends on the accented Sanskrit text, the Padapatha, recensional evidence and the medieval commentary of Sayana, alongside comparative philology. Jamison and Brereton provide a major modern translation; Oldenberg and later Vedic philologists remain important for textual formation and ritual context.',
        'The Rigveda should therefore be cited by mandala, hymn and verse rather than by the pagination of a modern edition. That system lets a reader move between Sanskrit editions, translations and commentaries without confusing the structure of the Veda with a modern printed book.'
      ]}
    ],
    sources:addSources([], [WIKI_RV,WIKI_VEDAS,JAM,WIT,OLD,'Sayana, Rigveda-bhashya'])
  });

  put('Śākala Saṃhitā',{
    sanskritTitle:'शाकलसंहिता',language:'Vedic Sanskrit',period:'c. 1500–1200 BCE for the principal hymn layers; final recensional stabilization later in the second millennium BCE.',extent:'1,028 hymns in 10 mandalas; about 10,600 verses',
    leadParagraphs:[
      'The Sakala Samhita is the complete surviving recension through which the Rigveda is ordinarily known. It preserves the ten-mandala arrangement, the accented samhita-patha and a tightly controlled oral tradition whose word division is analysed in the Padapatha of Sakalya.',
      'Calling it a “recension” does not mean it is a late rewriting of an otherwise lost original. It is one ancient school-form of the Rigveda. The comparison with Baskala, khila material, phonetic treatises and later quotations shows both extraordinary stability and the existence of genuine early variation.'
    ],
    articleSections:[
      {title:'Arrangement of the Samhita',paragraphs:['The ten mandalas are not equal in age or internal design. Books 2–7 form the lineage-centred core; Book 9 gathers Soma Pavamana hymns by ritual function; Books 1 and 10 frame the collection with broader anthologies; Book 8 has its own metrical and family character.'],books:[
        {number:'2–7',title:'Family books',summary:'Each is associated with a major rishi family and tends to arrange hymns by deity, then by decreasing hymn length and metre. This strong internal pattern is one reason they are treated as an older core.'},
        {number:9,title:'Soma Pavamana',summary:'A specialized ritual anthology in which hymns from different lineages are grouped around Soma’s purification rather than a single family.'},
        {number:'1 and 10',title:'Framing anthologies',summary:'Large multi-lineage books containing both old material and later compositions, including some of the most famous philosophical, social and funerary hymns.'},
        {number:8,title:'Kanva/Angirasa sphere',summary:'A metrically and stylistically distinctive book; the Valakhilya group associated with the eighth mandala illustrates the complicated boundary between core and supplementary material.'}
      ]},
      {title:'Textual apparatus of oral preservation',paragraphs:[
        'The samhita-patha gives the connected recitation, where phonetic combination changes the visible form of neighbouring words. The Padapatha separates them and became an ancient tool of grammatical and textual control. Pratishakhya literature describes accent, sound and recitation in still greater technical detail.',
        'Later vikriti recitations rearrange words according to fixed patterns. Their purpose is not to produce new scripture but to protect sequence and pronunciation by making memorization redundant in several directions.'
      ]},
      {title:'Difference from Baskala and khila material',paragraphs:[
        'The Baskala recension is known to have differed in readings and supplementary organization. Khilas, or supplementary hymns, are preserved around the Rigvedic tradition but do not all belong to the Sakala core in the same way as the 1,028 hymns.',
        'Textual criticism therefore distinguishes the Sakala Samhita from the larger historical Rigvedic repertoire. That distinction matters when a hymn appears in a later anthology or supplement but not in the numbered Sakala text.'
      ]},
      {title:'Use and reception',paragraphs:[
        'The Sakala text supplies most modern citations to the Rigveda and is the basis of the best-known editions and translations. Its hymns also continue to be recited in ritual contexts, while selected suktas acquired powerful lives in later Hindu practice far beyond the original solemn-sacrifice setting.',
        'The Gayatri mantra, Purusha Sukta, Nasadiya Sukta, Sri/Devi-associated hymns, marriage hymns and funerary verses are examples of passages whose later reception cannot be understood merely from their position in a modern anthology.'
      ]}
    ],sources:addSources(D['Vedic:Śākala Saṃhitā']?.sources,[WIKI_RV,JAM,WIT,OLD])
  });

  put('Bāṣkala Saṃhitā',{
    sanskritTitle:'बाष्कलसंहिता',language:'Vedic Sanskrit',status:'An ancient Rigvedic recension not preserved today as one complete continuous Samhita; recoverable through quotations, variant readings and supplementary traditions.',
    leadParagraphs:[
      'The Baskala Samhita was an independent recension of the Rigveda. It should not be described as a mere appendix to Sakala simply because Sakala is the complete recension that survived most successfully.',
      'What can be recovered comes from ancient grammatical and ritual references, comparisons of readings, khila material and later manuscript traditions. The result is a historical dossier rather than a modern complete Baskala Rigveda that can be opened from first hymn to last.'
    ],
    articleSections:[
      {title:'Recensional identity',paragraphs:[
        'Ancient Vedic literature knows multiple Rigvedic schools, and Baskala is one of the best attested. Its existence proves that the fixed Rigveda was transmitted in more than one line even after the hymn collection had become highly stable.',
        'Differences between recensions could include the presence of supplementary hymns, the ordering of material and individual readings. Such differences are especially valuable because they help distinguish very old recensional variation from later copying errors.'
      ]},
      {title:'What survives',paragraphs:[
        'No complete independent Baskala Samhita survives in the same state as the Sakala text. Evidence is scattered across quotations, scholastic testimony and material associated with the Rigvedic khilas. Scholars therefore reconstruct features of the recension cautiously and do not assign every supplementary hymn to Baskala without evidence.',
        'The lost or incomplete state is itself historically important. Vedic schools could disappear even when their readings survived indirectly in the literature of rival schools or in ancillary texts.'
      ]},
      {title:'Relation to Rigvedic supplements',paragraphs:[
        'The Baskala tradition is frequently discussed alongside khila hymns because some supplementary material stands outside the numbered Sakala corpus. But “khila” is a textual category, not a synonym for “Baskala.” Each hymn has to be evaluated by its own recensional evidence.',
        'For the scripture index, this means the page should distinguish secure Baskala testimony from attractive but unproven reconstructions. A lost recension deserves more textual history, not invented chapter summaries.'
      ]},
      {title:'Importance for textual criticism',paragraphs:[
        'Even fragmentary Baskala evidence can reveal which forms of a Rigvedic verse were already circulating before the dominance of the Sakala recension. It therefore provides a control on the assumption that one surviving school must preserve every ancient detail.',
        'Together with the Padapatha, Pratishakhyas and khila traditions, Baskala evidence belongs to the wider history of how the Rigveda became one of the most precisely transmitted ancient texts in the world.'
      ]}
    ],sources:addSources(D['Vedic:Bāṣkala Saṃhitā']?.sources,[WIKI_RV,WIT,OLD,'Studies of Rigvedic recensions and khilas'])
  });

  put('Aitareya Brāhmaṇa',{
    sanskritTitle:'ऐतरेयब्राह्मणम्',language:'Vedic Sanskrit',traditionalAuthor:'Mahidasa Aitareya',booksCount:'8 pancikas, each of 5 chapters',extent:'40 adhyayas',period:'Major strata broadly c. 900–700 BCE; exact internal chronology remains debated.',
    leadParagraphs:[
      'The Aitareya Brahmana is a principal Rigvedic prose text of the Sakala/Aitareya tradition. Its forty chapters explain the solemn sacrifice chiefly from the perspective of the Hotr priest, whose duty is to recite Rigvedic verses at the correct ritual moments.',
      'The text is especially rich in Soma ritual, priestly recitation, royal consecration and explanatory myths. Its narratives are not detachable folklore inserted for entertainment: they commonly explain why a rite, formula or social relation has the form it does.'
    ],
    articleSections:[
      {title:'Forty chapters in eight pancikas',paragraphs:['The received organization groups the forty adhyayas into eight sets of five. The sequence moves from the basic Soma sacrifice into extended rites, priestly specialisms, expiation and finally royal consecration.'],books:[
        {number:1,title:'Pancika I',summary:'Consecration, introductory sacrifice, purchase and bringing of Soma, the Pravargya and the movement of fire, Soma and offerings toward the high altar.'},
        {number:2,title:'Pancika II',summary:'Animal sacrifice, morning litany, Aponaptriya rites, ritual cups for major deities and the Ajya Shastra.'},
        {number:3,title:'Pancika III',summary:'Prauga Shastra, Vashat, Nivids, Marutvatiya and Nishkevalya recitations, Vaishvadeva and Agnimaruta, and general Agnishtoma procedure.'},
        {number:4,title:'Pancika IV',summary:'Shodashin and Atiratra, the Ashvina Shastra, Gavam Ayana, six-day rites, Vishuvant and the opening of the Dvadashaha sequence.'},
        {number:5,title:'Pancika V',summary:'Further Dvadashaha days, followed by the Agnihotra and discussion of the Brahman priest.'},
        {number:6,title:'Pancika VI',summary:'Special Hotraka offices, the Gravastut and Subrahmanya, Sattra and Ahina recitations, Sampata hymns, Valakhilyas and third-pressing Shilpa Shastras.'},
        {number:7,title:'Pancika VII',summary:'Distribution of the sacrificial victim, expiation of ritual mistakes, the celebrated Shunahshepa narrative and preparations for royal consecration.'},
        {number:8,title:'Pancika VIII',summary:'Soma-day stotras and shastras, anointing of the king, the great anointing of Indra and king, and the office of the royal purohita.'}
      ]},
      {title:'Shunahshepa and royal ritual',paragraphs:[
        'The Shunahshepa narrative in the seventh pancika is one of the most discussed Brahmana stories. Its placement within ritual exposition matters: the story is connected to sacrificial substitution, priestly power and the transformation of a dangerous ritual situation through recited verses.',
        'The final pancikas move strongly toward kingship. Consecration is presented not merely as political ceremony but as a sacrificial construction of royal authority, with Indra providing a divine model for the king.'
      ]},
      {title:'Hotr-centred ritual science',paragraphs:[
        'Because the Aitareya belongs to the Rigvedic sphere, it gives unusual attention to shastras, litanies and the exact work of reciting priests. A ritual action is repeatedly tied to the verse used, the deity addressed, the metre, the moment in the Soma sequence and the symbolic result expected.',
        'This makes the text a major source for reconstructing the division of labour among Vedic priests and for understanding how Rigvedic poetry was embedded in the mature Shrauta ritual system.'
      ]},
      {title:'Textual history and editions',paragraphs:[
        'Aitareya and Kaushitaki preserve related bodies of Rigvedic ritual explanation but arrange and formulate them differently. Comparison between the two is one of the main ways scholars study the development of Rigvedic Brahmana prose.',
        'A. B. Keith translated both Rigvedic Brahmanas, while Sanskrit editions preserve the text together with the long commentarial tradition. Chapter references should be given by pancika/adhyaya or adhyaya rather than by modern page number.'
      ]}
    ],sources:addSources(D['Vedic:Aitareya Brāhmaṇa']?.sources,[WIKI_AB,WIKI_BRAH,KEITH,WIT])
  });

  put('Kauṣītaki (Śāṅkhāyana) Brāhmaṇa',{
    sanskritTitle:'कौषीतकिब्राह्मणम् / शाङ्खायनब्राह्मणम्',language:'Vedic Sanskrit',extent:'30 adhyayas; 226 khandas in a common description',period:'Broadly later Rigvedic Brahmana period, c. 800–600 BCE for major strata.',
    leadParagraphs:[
      'The Kaushitaki, also called Shankhayana, Brahmana is the second major surviving Rigvedic Brahmana. It belongs to the Kaushitaki/Shankhayana tradition and gives a parallel ritual-exegetical system to the Aitareya Brahmana.',
      'Its thirty chapters are more compactly and systematically arranged than Aitareya in several sections. The first portion treats offerings and fire ritual, while the great bulk of the text is concerned with Soma sacrifice, recitation and priestly procedure.'
    ],
    articleSections:[
      {title:'Thirty-chapter organization',paragraphs:[
        'The received text has thirty adhyayas. A commonly cited summary assigns the first six to food and offering sacrifices and the remainder predominantly to Soma ritual. Within that broad division, the text discusses Hotr recitations, ritual sequences, priestly duties, myths and the logic of sacrificial substitutions.',
        'The compact arrangement is important when comparing it with Aitareya. The two works share older ritual and mythic material but organize it in distinct school redactions rather than copying one another mechanically.'
      ]},
      {title:'Relation to Aitareya',paragraphs:[
        'Aitareya and Kaushitaki often preserve parallel explanations and legends. Their agreements point toward a common Rigvedic ritual heritage, while their differences reveal how individual schools selected, reordered and systematized that inherited material.',
        'This comparison is one of the clearest examples of why “the Brahmana explanation” should not be treated as a single pan-Vedic commentary. Each school had its own textual architecture and its own preferred forms of explanation.'
      ]},
      {title:'School, Aranyaka and Upanishad',paragraphs:[
        'The name Kaushitaki also appears in the associated Aranyaka and Upanishad. The Kaushitaki Upanishad does not simply form four chapters of the thirty-chapter Brahmana itself; it belongs to the wider Kaushitaki/Shankhayana forest-text tradition.',
        'Keeping those levels distinct prevents a common modern confusion in which “Kaushitaki Brahmana Upanishad” is mistaken for a chapter physically embedded in every manuscript of the Brahmana.'
      ]},
      {title:'Text and study',paragraphs:[
        'The work survives as a coherent Brahmana and has been studied alongside Aitareya since the nineteenth century. Keith’s translation remains historically important, while later scholarship uses the two Rigvedic texts comparatively for ritual, language and school history.',
        'Its value lies precisely in being a second Rigvedic witness: where two schools agree, the tradition may be older than either redaction; where they differ, the divergence itself becomes historical evidence.'
      ]}
    ],sources:addSources(D['Vedic:Kauṣītaki (Śāṅkhāyana) Brāhmaṇa']?.sources,[WIKI_BRAH,KEITH,WIT])
  });

  put('Aitareya Āraṇyaka',{
    sanskritTitle:'ऐतरेयारण्यकम्',language:'Vedic Sanskrit',traditionalAuthor:'Aitareya/Mahidasa tradition',period:'Late Brahmana to early Upanishadic period, broadly first half of the first millennium BCE.',
    leadParagraphs:[
      'The Aitareya Aranyaka is the forest-text of the Aitareya Rigvedic tradition. It begins from the Mahavrata and other ritual questions but progressively turns toward recitation, breath, symbolic correspondences and the nature of the self.',
      'Its internal diversity is essential. The work is not one philosophical treatise written at a sitting: different books have different ritual and speculative character, and the Aitareya Upanishad is embedded within the second Aranyaka rather than standing historically outside the Vedic school corpus.'
    ],
    articleSections:[
      {title:'Books and internal layers',paragraphs:[
        'The received Aranyaka is conventionally divided into several books or Aranyakas. The first deals especially with the Mahavrata. The second develops symbolic and contemplative interpretation and contains, in its later chapters, the Aitareya Upanishad. The third is often called the Samhitopanishad because it treats recitational and phonetic matters. Later books contain more technical ritual material.',
        'This uneven structure is historical evidence: “Aranyaka” names a layer of school transmission in which ritual, recitation and speculation coexist, not a single literary genre with one subject.'
      ]},
      {title:'Mahavrata and interiorization',paragraphs:[
        'The Mahavrata material grows from a major ritual day associated with the Gavam Ayana and related solemn rites. The Aranyaka re-reads the rite through correspondences between liturgical components, the human body, breath, speech and cosmic powers.',
        'Such correspondences are one of the paths by which late Vedic thought moves from external performance toward knowledge of the person who performs and knows the sacrifice.'
      ]},
      {title:'Aitareya Upanishad within the Aranyaka',paragraphs:[
        'The fourth, fifth and sixth chapters of the second Aranyaka constitute the Aitareya Upanishad in the common reckoning. They move from creation by the Self to embodiment, the three births and the identification of consciousness with Brahman.',
        'The location matters because the famous Upanishadic doctrine grows from the same school text that discusses Mahavrata, recitation and prana. The philosophical material is continuous with late Vedic speculation even when later readers extract it as an independent scripture.'
      ]},
      {title:'Recitation and Samhitopanishad',paragraphs:[
        'The third Aranyaka analyses forms of Vedic recitation and the relation of sounds in the continuous Samhita. Such passages show that textual preservation itself had become a subject of sacred reflection.',
        'The technical treatment of pronunciation, word connection and accent is not peripheral to the Veda: it reflects the belief that correct sacred speech is a condition of ritual and contemplative efficacy.'
      ]},
      {title:'Editions and commentaries',paragraphs:[
        'A. B. Keith produced a major edition and translation based on manuscripts available in Britain and the Royal Asiatic Society. Traditional editions also preserve Sayana and other scholastic materials.',
        'Because the Upanishadic chapters circulate separately, citations should specify whether a reference is to the Aranyaka numbering or to the independent Aitareya Upanishad numbering.'
      ]}
    ],sources:addSources(D['Vedic:Aitareya Āraṇyaka']?.sources,[WIKI_AR,KEITH,'A. B. Keith, The Aitareya Aranyaka',WIT])
  });

  put('Kauṣītaki (Śāṅkhāyana) Āraṇyaka',{
    sanskritTitle:'कौषीतक्यारण्यकम् / शाङ्खायनारण्यकम्',language:'Vedic Sanskrit',period:'Late Brahmana to early Upanishadic period; internally layered.',extent:'15 chapters in the common recension',
    leadParagraphs:[
      'The Kaushitaki or Shankhayana Aranyaka is the forest-text of the corresponding Rigvedic school. It combines Mahavrata ritual, the Kaushitaki Upanishad, recitational teaching, praise of prana, internalized Agnihotra, rites against danger and a concluding genealogy of teachers.',
      'Its fifteen-chapter structure makes the transition from ritual to Upanishadic reflection especially visible. Rather than leaving sacrifice behind all at once, the text repeatedly turns ritual elements into meditations on breath, person, speech and cosmic powers.'
    ],
    articleSections:[
      {title:'Fifteen chapters',paragraphs:['The chapter sequence is unusually informative because major textual units can be located with some precision.'],books:[
        {number:'1–2',title:'Mahavrata',summary:'Ritual exposition of the Mahavrata, connecting liturgical structure with larger symbolic meanings.'},
        {number:'3–6',title:'Kaushitaki Upanishad',summary:'The prose Upanishad on post-mortem paths, prana, Indra and Pratardana, Balaki and Ajatashatru, and the relation between consciousness and the self.'},
        {number:'7–8',title:'Samhitopanishad',summary:'Teaching on the connected Vedic text and recitation, where phonetic joining is itself interpreted through sacred correspondences.'},
        {number:9,title:'Prana',summary:'A sustained praise of breath/life-power as the coordinating principle of the faculties.'},
        {number:10,title:'Internal Agnihotra',summary:'The external fire offering is read through the human person: Agni in speech, Vayu in prana, Sun in sight, Moon in mind and other divine correspondences.'},
        {number:'11–12',title:'Protection, dreams and prayer',summary:'Ritual and interpretive material concerning danger, illness, dreams and the fruits of prayer.'},
        {number:'13–14',title:'Philosophical discipline',summary:'Detachment from bodily identification, hearing-reflection-meditation and compact mantras on Brahman.'},
        {number:15,title:'Teacher genealogy',summary:'A long lineage tracing the transmission of teaching through successive teachers back toward primordial authority.'}
      ]},
      {title:'Upanishad and Aranyaka as one school text',paragraphs:[
        'The Kaushitaki Upanishad is often printed independently, but its placement within the Aranyaka is essential for historical interpretation. The philosophical dialogue is surrounded by ritual, prana speculation and recitational teaching from the same school world.',
        'Different manuscript traditions number the Upanishadic chapters differently. This is why modern translations can cite different chapter sequences while still translating substantially the same text.'
      ]},
      {title:'Prana and internal sacrifice',paragraphs:[
        'The ninth and tenth chapters are especially important for the movement from ritual action toward embodied cosmology. Breath becomes the coordinating life-power, and the Agnihotra is reimagined through divine powers located in the person.',
        'This kind of internalization does not reject Vedic sacrifice; it claims to know what sacrifice ultimately means by locating its powers within the knower.'
      ]},
      {title:'Transmission and study',paragraphs:[
        'The Aranyaka survives with its own recensional and numbering problems, and the Kaushitaki Upanishad developed a separate translation history. Max Muller, Deussen, Keith and later editors helped establish the relation among the Brahmana, Aranyaka and Upanishad.',
        'A modern article should therefore give both the independent Upanishad citation where useful and the larger Aranyaka location when discussing textual history.'
      ]}
    ],sources:addSources(D['Vedic:Kauṣītaki (Śāṅkhāyana) Āraṇyaka']?.sources,[WIKI_AR,'Paul Deussen, Sixty Upanishads of the Veda',KEITH,WIT])
  });

  put('Sāmaveda',{
    sanskritTitle:'सामवेदः',language:'Vedic Sanskrit',period:'The received Samhita belongs broadly c. 1200–1000 BCE, while many source verses are older Rigvedic poetry.',extent:'1,875 numbered verses in a common Kauthuma-based count, with repetitions',primaryRecensions:['Kauthuma','Ranayaniya','Jaiminiya/Talavakara'],
    leadParagraphs:[
      'The Samaveda is the Veda of liturgical chant. Its verses are overwhelmingly drawn from the Rigveda, but the Samaveda is not a redundant copy: it reorganizes mantra for performance by the Udgatr priests and links textual verses to highly specialized melodies preserved in separate gana traditions.',
      'Three major recensions survive: Kauthuma, Ranayaniya and Jaiminiya. Kauthuma and Ranayaniya are closely related; Jaiminiya preserves more independent readings, ordering and chant traditions. The wider Samavedic literature is exceptionally rich in Brahmanas because the assignment, transformation and meaning of chants demanded technical explanation.'
    ],
    articleSections:[
      {title:'From Rigvedic verse to Saman chant',paragraphs:[
        'Most Samavedic verses have Rigvedic parallels, but their function changes when they enter the chant system. A verse may be repeated, broken into melodic units, expanded by stobha syllables and assigned to a precise moment in the Soma sacrifice.',
        'The printed arcika therefore preserves only the textual basis of performance. The actual saman exists in the relation between the verse and a melody taught through the gana collections and living oral lineages.'
      ]},
      {title:'Arcika and Gana',paragraphs:[
        'The verse collections are commonly divided into Purvarcika and Uttararcika. The Purvarcika provides a basic repertoire organized largely by deity and ritual use; the Uttararcika arranges verses in sequences required for particular ceremonies.',
        'Separate song books such as Gramageyagana and Aranyagana preserve melodic elaboration. This two-level structure—verse text and performed melody—is fundamental to the Samaveda and explains why merely comparing verse totals with the Rigveda misses its liturgical identity.'
      ]},
      {title:'The three surviving recensions',paragraphs:[
        'Kauthuma became the most widespread printed recension. Ranayaniya remains closely related but maintains its own phonetic and melodic traditions. Jaiminiya or Talavakara is more independent and is attached to a distinctive Brahmana and Upanishad-Brahmana corpus.',
        'Recensional differences include verse order, phonetic detail and chant tradition. Because melody is transmitted orally, a manuscript of the Samhita cannot by itself represent the whole recension.'
      ]},
      {title:'Priests and Soma liturgy',paragraphs:[
        'The Udgatr group—the Udgatr, Prastotr, Pratihart and Subrahmanya in different ritual contexts—handles sung praise within the Soma sacrifice. Samavedic Brahmanas explain which stotra is performed, with which saman, at which pressing and for what ritual effect.',
        'This specialized role is why the Samaveda became a central source for Indian reflection on sacred sound, melody and the power of correctly ordered chant.'
      ]},
      {title:'Later importance',paragraphs:[
        'The Chandogya Upanishad grows directly from Samavedic reflection on chant, Om, breath and ritual correspondences. The Kena belongs to the Jaiminiya/Talavakara school. These connections show that major Upanishadic speculation emerged from the technical world of Vedic performance rather than from a separate philosophical institution.',
        'The Samaveda also remains a living recitational and musical tradition. Its performance systems are among the most elaborate surviving examples of oral liturgical music in the ancient world.'
      ]}
    ],sources:addSources([], [WIKI_SV,WIKI_VEDAS,CALAND,WIT,'Wayne Howard, Samavedic chant studies'])
  });

  ['Kauthuma Saṃhitā','Rāṇāyanīya Saṃhitā','Jaiminīya (Talavakāra) Saṃhitā'].forEach((name,idx)=>{
    const rec=['Kauthuma','Ranayaniya','Jaiminiya/Talavakara'][idx];
    const special=idx===0?[
      'Kauthuma is the dominant surviving Samaveda recension and underlies many modern printed editions. Its Purvarcika and Uttararcika organize the verse repertoire used with a large family of gana or melody texts.',
      'Because Kauthuma has a rich living oral tradition, textual criticism must take account of recitation and song transmission as well as manuscripts.'
    ]:idx===1?[
      'Ranayaniya is closely related to Kauthuma in verse text but remains an independent school with its own pronunciation, accentual details and melodic transmission.',
      'Its importance lies precisely in the comparison: close agreement reveals the shared Kauthuma-Ranayaniya heritage, while divergences show that chant schools could maintain distinct performance identities even when their written arcikas were similar.'
    ]:[
      'Jaiminiya, also called Talavakara, preserves the most independent of the major surviving Samaveda recensions. Its verse readings, ritual ordering and melodies often diverge from Kauthuma-Ranayaniya.',
      'The recension is attached to the Jaiminiya Brahmana, Jaiminiya Arsheya and Jaiminiya Upanishad Brahmana, making it a complete alternative Samavedic school world rather than a variant songbook.'
    ];
    put(name,{sanskritTitle:idx===0?'कौथुमसंहिता':idx===1?'राणायनीयसंहिता':'जैमिनीयसंहिता',language:'Vedic Sanskrit',period:'Received liturgical organization broadly early first millennium BCE, using many older Rigvedic verses.',primaryRecensions:[rec],leadParagraphs:[`${name} is the ${rec} recension of the Samaveda Samhita. Its verses form the textual basis for sung samans performed by Udgatr priests in the Soma ritual.`,...special],articleSections:[
      {title:'Verse collection and ritual order',paragraphs:['The Samhita organizes mostly Rigvedic verses according to Samavedic liturgical needs. Purvarcika-type collections provide a basic repertoire, while Uttararcika sequences arrange verses for concrete Soma performances. The same verse may therefore occur more than once because ritual position, not literary economy, governs the arrangement.']},
      {title:'Melody beyond the printed Samhita',paragraphs:['A Samaveda verse becomes a saman only through melodic treatment. Gana texts and oral instruction preserve elongation, repetition, inserted syllables and melodic movement that cannot be inferred from the plain verse line alone.','This is why the school identity of a Samaveda recension includes its singing tradition. A manuscript edition that prints only the mantra text preserves one indispensable layer but not the whole performance.']},
      {title:'Recensional character',paragraphs:special},
      {title:'Brahmana and school literature',paragraphs:[idx===2?'The Jaiminiya recension is linked to the Jaiminiya Brahmana, Jaiminiya Arsheya Brahmana and Jaiminiya Upanishad Brahmana, including the larger textual setting of the Kena Upanishad.':'The Kauthuma-Ranayaniya sphere is linked especially to the Panchavimsha/Tandya, Sadvimsha, Samavidhana, Arsheya, Daivata, Mantra/Chandogya, Samhitopanishad and Vamsha Brahmanas.','These associated works explain chant assignment, ritual sequence, deities, lineages and the symbolic meaning of Samavedic performance.']},
      {title:'Transmission and study',paragraphs:['The recension is preserved through oral recitation, chant lineages and manuscripts. Because melody has its own notation and pedagogy, comparative study must combine textual philology with documentation of living performance traditions.']}
    ],sources:addSources(D[`Vedic:${name}`]?.sources,[WIKI_SV,CALAND,WIT,'Wayne Howard, Samavedic chant studies'])});
  });

  put('Tāṇḍya (Pañcaviṃśa) Brāhmaṇa',{
    sanskritTitle:'ताण्ड्यमहाब्राह्मणम् / पञ्चविंशब्राह्मणम्',language:'Vedic Sanskrit',extent:'25 prapathakas; 347 khandas',period:'Early Samavedic Brahmana period, broadly early first millennium BCE.',
    leadParagraphs:[
      'The Tandya Mahabrahmana, better known as the Panchavimsha Brahmana because it contains twenty-five prapathakas, is the great ritual Brahmana of the Kauthuma-Ranayaniya Samaveda. Its central concern is the work of the Udgatr priests and the exact samans used in Soma ritual.',
      'The text is one of the best guides to the architecture of extended Soma sacrifices. It moves from chant structures and basic rites through Dvadashaha, one-day and multi-day ceremonies, ahinas and long sattras. It also preserves the famous Vratyastoma rites associated with the ritual incorporation of vratyas.'
    ],
    articleSections:[
      {title:'Twenty-five prapathakas',paragraphs:['The large-scale organization tracks the increasing complexity and duration of Soma ritual.'],books:[
        {number:1,title:'Prapathaka 1',summary:'A collection of yajus and preliminary materials used around Samavedic performance.'},
        {number:'2–3',title:'Vistutis',summary:'Technical arrangements of stotra structure and the ways verses are expanded or distributed in chant.'},
        {number:'4–9.2',title:'Basic and variant Soma rites',summary:'Jyotishtoma, Ukthya, Atiratra and other one-day or limited-duration forms, with detailed assignment of chants.'},
        {number:'9.3–9.10',title:'Soma expiations',summary:'Prayaschitta for mistakes and disruptions in the Soma ritual.'},
        {number:'10–15',title:'Dvadashaha',summary:'The twelve-day rite treated through its successive days and chant structures.'},
        {number:'16–19',title:'Ekaha rites',summary:'Special one-day Soma ceremonies.'},
        {number:'20–22',title:'Ahina rites',summary:'Multi-day rituals of intermediate duration.'},
        {number:'23–25',title:'Sattras',summary:'Long sacrificial sessions and their specialized chant requirements.'}
      ]},
      {title:'Vratyastoma',paragraphs:['Among its most discussed rites are Vratyastomas connected with vratya groups. The ritual does not fit simple modern ethnic categories; it shows Vedic ritual as capable of defining and transforming religious-social status through sacrificial participation.','The passages became central to modern debates about who the vratyas were and how Vedic communities understood insiders, outsiders and ritual incorporation.']},
      {title:'The Udgatr’s ritual map',paragraphs:['The Brahmana repeatedly assigns particular stotras and samans to exact points in a ceremony. Its detail is therefore functional: a singer must know not only a melody but when that melody belongs, which priest begins it, how it relates to the pressing of Soma and what ritual result is attached to the performance.','This makes Panchavimsha indispensable for reconstructing Samavedic liturgy and for understanding why the Samaveda generated such an extensive technical prose literature.']},
      {title:'Relation to Sadvimsha',paragraphs:['The Sadvimsha Brahmana is transmitted as a supplement or “twenty-sixth” continuation. The relation is historical and functional: the later work fills gaps, treats additional rites and eventually moves into omen literature in its Adbhuta section.']},
      {title:'Editions and scholarship',paragraphs:['W. Caland’s edition and translation remain fundamental for the text, while modern study compares the Brahmana with Srautasutras and living Samavedic practice. Citation by prapathaka and khanda is essential because modern page numbers vary across editions.']}
    ],sources:addSources(D['Vedic:Tāṇḍya (Pañcaviṃśa) Brāhmaṇa']?.sources,[WIKI_PB,WIKI_BRAH,CALAND,WIT])
  });

  put('Ṣaḍviṃśa Brāhmaṇa',{
    sanskritTitle:'षड्विंशब्राह्मणम्',language:'Vedic Sanskrit',extent:'5 adhyayas in the common recension',period:'Later than the core Panchavimsha Brahmana but still within the Samavedic Brahmana tradition.',
    leadParagraphs:[
      'The Sadvimsha Brahmana is the “twenty-sixth” Brahmana: a supplement to the twenty-five-book Panchavimsha Brahmana of the Kauthuma Samaveda. Its contents are deliberately miscellaneous because it fills ritual and exegetical topics not covered in the larger work.',
      'Its fifth and latest section is commonly called the Adbhuta Brahmana. There the focus turns to unusual signs, omens and ritual means of averting their consequences, showing how Samavedic ritual knowledge expanded beyond the central Soma liturgy.'
    ],articleSections:[
      {title:'Supplement to Panchavimsha',paragraphs:['The title itself explains the literary relationship. Rather than beginning a wholly new ritual system, the text acts as a twenty-sixth book attached to Panchavimsha and assumes familiarity with the larger Samavedic liturgy.','Topics include the Subrahmanya formula, specialized one-day rites and ceremonies intended for destructive or protective purposes.']},
      {title:'Five adhyayas and the Adbhuta section',paragraphs:['The received work has five adhyayas. The final adhyaya became known as the Adbhuta Brahmana because it catalogues prodigies, portents and their ritual pacification.','This omen material is sometimes classified toward Vedanga or Vidhana literature because its function differs from the older Brahmana explanation of standard Soma sacrifice.']},
      {title:'Ritual history',paragraphs:['The desultory character is historically useful. It shows a school continuing to extend its ritual canon after the main Panchavimsha system had already achieved authority.','Later Kalpa authors presuppose at least parts of this supplementary material, which helps establish its place within the development of Kauthuma ritual literature.']},
      {title:'Text and editions',paragraphs:['Caland’s work remains a standard point of reference for the Sadvimsha and related Samavedic texts. A modern citation should distinguish ordinary Sadvimsha chapters from the final Adbhuta material when discussing omen literature.']}
    ],sources:addSources(D['Vedic:Ṣaḍviṃśa Brāhmaṇa']?.sources,[WIKI_SADV,WIKI_BRAH,CALAND])
  });

  put('Sāmavidhāna Brāhmaṇa',{
    sanskritTitle:'सामविधानब्राह्मणम्',language:'Vedic Sanskrit',extent:'3 prapathakas',period:'Later Samavedic Brahmana/Vidhana phase, still early relative to classical Dharma literature.',
    leadParagraphs:[
      'The Samavidhana Brahmana is a Kauthuma Samavedic text concerned with what particular samans can accomplish outside the central architecture of the Soma sacrifice. Its three prapathakas prescribe chant for desired results, protection, success, expiation and other specific aims.',
      'For that reason scholars often place it near Vidhana literature rather than treating it as a typical Brahmana. Its importance is precisely that it shows the ritual power of Saman chant being generalized beyond the great public sacrifice.'
    ],articleSections:[
      {title:'Three-prapathaka structure',paragraphs:['The work arranges prescriptions around the use of samans for concrete ends. The logic is pragmatic: identify the aim, the chant and the manner or occasion of performance.','Unlike Panchavimsha, it is not primarily a continuous map of Soma liturgy; it is a repertoire of applications grounded in the sacred efficacy of Samavedic song.']},
      {title:'From Brahmana to Vidhana',paragraphs:['“Vidhana” literature tells a practitioner how a mantra or chant may be deployed for a specified result. Samavidhana stands close to that genre and therefore broadens the picture of what a Samavedic Brahmana can contain.','The text has been used in dating discussions because it appears to precede some early Dharma literature while already representing a developed post-liturgical application of Vedic chant.']},
      {title:'Religious significance',paragraphs:['The work makes audible performance itself a ritual instrument. A saman is not merely a beautiful melody added to a sacrifice; correctly selected sacred sound can be directed toward protection, success, atonement and the management of danger.']},
      {title:'Editions and study',paragraphs:['Caland and later Samaveda specialists studied the text in relation to Kauthuma Brahmanas and Vidhana traditions. Its prescriptions are best interpreted comparatively with Srautasutra, Grihya and mantra-application literature rather than isolated as “magic songs.”']}
    ],sources:addSources(D['Vedic:Sāmavidhāna Brāhmaṇa']?.sources,[WIKI_BRAH,CALAND,'Studies of Vidhana literature'])
  });

  const smallSama={
    'Ārṣeya Brāhmaṇa':{dev:'आर्षेयब्राह्मणम्',lead:'The Arsheya Brahmana is a Kauthuma Samavedic catalogue of samans arranged through the rishis associated with them. Its apparently list-like form is a technical map of chant authority: a singer must know not only a melody but the seer and textual identity attached to it.',paras:['The work belongs to the cataloguing side of Samavedic scholarship. Where Panchavimsha explains ritual deployment, Arsheya helps identify the repertoire itself.','Rishi attribution in this context is part of liturgical classification and transmission. It connects individual samans with remembered lines of revelation and with the school’s system for locating chants.','Its value for modern scholarship lies in cross-checking names, chant identities and the internal organization of the Kauthuma repertoire.']},
    'Daivata Brāhmaṇa':{dev:'दैवतब्राह्मणम्',lead:'The Daivata Brahmana is a Kauthuma Samavedic technical text concerned with the deities of samans and the identification of divine recipients attached to particular chants.',paras:['A Samavedic chant can be classified by verse, melody, seer and deity. The Daivata text focuses on the deity-side of that system and therefore belongs to the school’s apparatus for correct ritual identification.','Such catalogues prevent a modern mistake: the deity of a performed saman cannot always be inferred simply from the most obvious noun in the verse. School tradition preserves its ritual identification.','The text is best studied together with Arsheya, Samhitopanishad and other short Kauthuma Brahmanas as parts of one technical scholastic environment.']},
    'Saṃhitopaniṣad Brāhmaṇa':{dev:'संहितोपनिषद्ब्राह्मणम्',lead:'The Samhitopanishad Brahmana is a Kauthuma Samavedic work on the connected recited text, phonetic joining and the deeper significance of Samhita recitation.',paras:['Its subject is the Veda as sounded continuously. Sandhi, joining and recitational form become objects of reflection rather than invisible mechanics.','The text belongs to a wider Vedic tendency to interpret phonetic structure symbolically. Speech, breath, sound and cosmic correspondence meet in the act of reciting a Samhita correctly.','For textual history it also shows that recitation theory developed inside Brahmana literature before later phonetic disciplines were fully separated as Vedanga.']},
    'Vaṃśa Brāhmaṇa':{dev:'वंशब्राह्मणम्',lead:'The Vamsha Brahmana is a short Kauthuma Samavedic genealogy of teachers. Its central content is not ritual procedure but the succession through which Samavedic knowledge is said to have been transmitted.',paras:['Teacher lists are historical evidence of a special kind. They express authority and continuity even when they cannot be converted mechanically into modern chronological dates.','The genealogy places learning in a lineage: the Veda is not merely a text-object but something heard from a teacher and preserved through named succession.','Comparable teacher lists occur in Aranyakas and Upanishads, making the Vamsha Brahmana important for the history of guru-parampara as a textual form.']},
    'Jaiminīya Ārṣeya Brāhmaṇa':{dev:'जैमिनीयार्षेयब्राह्मणम्',lead:'The Jaiminiya Arsheya Brahmana is the Jaiminiya-school counterpart to Samavedic chant catalogues that identify samans through their rishis and traditional associations.',paras:['Its chief importance is recensional. It reveals how the independent Jaiminiya school organized a repertoire that cannot simply be reconstructed from Kauthuma lists.','Comparison with Kauthuma Arsheya material helps distinguish inherited Samavedic classifications from innovations or reorganizations within individual schools.','Because Jaiminiya chant tradition is especially distinctive, even a catalogue text becomes evidence for a broader alternative history of Samavedic performance.']}
  };
  Object.entries(smallSama).forEach(([name,x])=>put(name,{sanskritTitle:x.dev,language:'Vedic Sanskrit',period:'Samavedic Brahmana period; exact absolute dating is uncertain.',leadParagraphs:[x.lead],articleSections:[{title:'Purpose and contents',paragraphs:x.paras},{title:'Place in the Samaveda',paragraphs:[`${name} belongs to the technical literature through which a Samavedic school classified, preserved and interpreted its chant repertoire. Its short size should not be confused with insignificance: such texts supply the metadata needed to perform and transmit a much larger oral system.`]},{title:'Transmission and study',paragraphs:[`Modern study of ${name} depends on comparison with the related Samhita, gana texts, other Brahmanas and school-specific ritual manuals. The text is therefore most informative when read as one component of a living recensional system rather than as an isolated handbook.`]}],sources:addSources(D[`Vedic:${name}`]?.sources,[WIKI_BRAH,CALAND,WIT])}));

  put('Chāndogya (Mantra) Brāhmaṇa',{
    sanskritTitle:'छान्दोग्यब्राह्मणम् / मन्त्रब्राह्मणम्',language:'Vedic Sanskrit',extent:'The Mantra Brahmana forms the first 2 prapathakas of a 10-prapathaka Chandogya/Upanishad-Brahmana complex.',period:'Late Vedic period; older household-mantra material precedes the Upanishadic compilation attached to it.',
    leadParagraphs:[
      'The Chandogya Brahmana is the Kauthuma Samavedic textual complex whose first two prapathakas are commonly called the Mantra Brahmana and whose following eight prapathakas form the Chandogya Upanishad.',
      'The Mantra Brahmana preserves mantras for domestic rites, especially marriage, birth and household observance. Its juxtaposition with the eight-chapter Upanishad makes the larger text an unusually clear witness to the continuity between grihya religion and philosophical upasana.'
    ],articleSections:[
      {title:'The two Mantra Brahmana chapters',paragraphs:['The first two prapathakas are divided into smaller khandas and contain Vedic formulas for household rites. Marriage occupies a prominent place, with prayers for prosperity, long life, mutual unity and offspring.','Birth and family rites likewise show that Samavedic sacred speech was used far beyond the Soma altar. The text belongs to the domestic life of Vedic households as well as the priestly world of great sacrifice.']},
      {title:'From Mantra Brahmana to Chandogya Upanishad',paragraphs:['Prapathakas 3–10 of the larger complex are the Chandogya Upanishad. Their meditations on Om, Saman, breath, cosmology and the Self therefore follow directly after a domestic-mantra corpus in the transmitted text.','This architecture is historically important: philosophical Upanishadic teaching is not placed in opposition to Vedic ritual life but transmitted as its deeper contemplative continuation within the same school.']},
      {title:'Marriage and household religion',paragraphs:['The marriage mantras include prayers for concord and the joining of hearts, showing how Vedic language sanctifies a social transition by placing it within cosmic and divine order.','Such passages continued to influence later grihya and Hindu marriage practice, even when communities encountered them through ritual manuals rather than by reading the entire Brahmana.']},
      {title:'Textual naming',paragraphs:['“Chandogya Brahmana,” “Mantra Brahmana” and “Chandogyopanishad Brahmana” can refer to overlapping textual units in different catalogues. A precise article therefore states whether it means the two-prapathaka mantra section or the complete ten-prapathaka complex including the Upanishad.']}
    ],sources:addSources(D['Vedic:Chāndogya (Mantra) Brāhmaṇa']?.sources,[WIKI_BRAH,{title:'Wikipedia — Chandogya Upanishad',detail:'Eight Upanishadic chapters attached to the Chandogya Brahmana.',url:'https://en.wikipedia.org/wiki/Chandogya_Upanishad'},CALAND])
  });

  put('Jaiminīya Brāhmaṇa',{
    sanskritTitle:'जैमिनीयब्राह्मणम्',language:'Vedic Sanskrit',period:'Old Samavedic Brahmana prose, broadly early first millennium BCE with internal layers.',
    leadParagraphs:[
      'The Jaiminiya Brahmana is the principal ritual Brahmana of the Jaiminiya Samaveda. It is not a variant copy of the Kauthuma Panchavimsha Brahmana: it preserves its own ritual ordering, distinctive myths, archaic prose and explanations of Saman performance.',
      'The work is exceptionally important because the Jaiminiya school survived less widely than Kauthuma. Its Brahmana therefore preserves alternative forms of myths and ritual explanations that would otherwise disappear from the history of Vedic religion.'
    ],articleSections:[
      {title:'Ritual architecture',paragraphs:['The Brahmana is organized around Samavedic performance within Soma sacrifice: the choice and interpretation of samans, the acts of Udgatr priests and the sacrificial contexts in which chants acquire power.','Its treatment overlaps the ritual world of Panchavimsha but often differs in narrative, wording and sequence, revealing a genuinely independent school tradition.']},
      {title:'Myth and archaic prose',paragraphs:['Jaiminiya is famous for preserving myths in forms that can be older or simply different from the versions familiar in other Brahmanas. The stories are woven into ritual reasoning and frequently explain the origin or efficacy of a chant.','Because the prose can be difficult and the manuscripts are less abundant, the text has played a major role in philological reconstruction of early Samavedic language and mythology.']},
      {title:'Relation to Jaiminiya Upanishad Brahmana',paragraphs:['The Jaiminiya Brahmana and Jaiminiya Upanishad Brahmana belong to the same school but are distinct works. The latter moves more strongly toward symbolic and Upanishadic speculation and contains the larger textual setting of the Kena.','Keeping them separate is essential: “Jaiminiya Brahmana” is the ritual Brahmana proper; “Jaiminiya Upanishad Brahmana” is a different school text at the Brahmana-Aranyaka-Upanishad boundary.']},
      {title:'Transmission and editions',paragraphs:['The Jaiminiya tradition was preserved in South India and attracted major modern editorial work because its manuscripts opened an alternative Samavedic archive. Caland, Oertel and later scholars used it to revise reconstructions based solely on the more widespread Kauthuma tradition.']}
    ],sources:addSources(D['Vedic:Jaiminīya Brāhmaṇa']?.sources,[WIKI_BRAH,CALAND,WIT,'Studies and editions of the Jaiminiya Brahmana'])
  });

  put('Jaiminīya Upaniṣad Brāhmaṇa',{
    sanskritTitle:'जैमिनीयोपनिषद्ब्राह्मणम् / तालवकारोपनिषद्ब्राह्मणम्',language:'Vedic Sanskrit',period:'Late Vedic Brahmana/early Upanishadic period, probably before c. 600 BCE for substantial strata.',
    leadParagraphs:[
      'The Jaiminiya Upanishad Brahmana, also called the Talavakara Upanishad Brahmana, is a Samavedic text of the Jaiminiya school standing at the boundary between Brahmana, Aranyaka and early Upanishadic speculation.',
      'It contains elaborate reflection on chant, breath, ritual power, myths and hidden correspondences. Four sections of its fourth chapter later circulated independently as the Kena Upanishad, which means Kena can be read both as a famous short Upanishad and as part of this larger Jaiminiya school book.'
    ],articleSections:[
      {title:'Place in the Jaiminiya school',paragraphs:['The work belongs to the same broad school as the Jaiminiya Samhita and Jaiminiya Brahmana but has a more speculative character. It repeatedly asks what hidden power lies behind a chant, a deity, breath or an act of knowing.','Modern catalogues sometimes call it an Aranyaka because of this position between ritual prose and Upanishadic teaching. The genre label is less important than its actual place in the transmitted Jaiminiya corpus.']},
      {title:'Kena within the larger work',paragraphs:['The material known independently as the Kena Upanishad corresponds in modern Jaiminiya Upanishad Brahmana numbering to 4.18–21. This location explains the older title Talavakara Upanishad.','Reading the surrounding chapters shows that Kena’s question about the power behind speech, mind and breath grows naturally from Samavedic speculation on the hidden agency behind ritual and sacred sound.']},
      {title:'Myth, chant and speculation',paragraphs:['The work preserves numerous narratives and symbolic equations in which samans, gods, breaths, cosmic regions and human faculties mirror one another. Such material is neither mere ritual manual nor later systematic philosophy.','It is precisely this intermediate character that makes the text valuable for tracing how Brāhmana-style exegesis develops into Upanishadic inquiry.']},
      {title:'Modern recovery',paragraphs:['The work became far better known after South Indian manuscripts were reported in the nineteenth century. Hanns Oertel published a major text, translation and notes in 1896, allowing scholars to study Kena in its larger school context.','Later research, including work on Jaiminiya oral and manuscript traditions, has continued to clarify its internal divisions and relationship to other Samavedic texts.']}
    ],sources:addSources(D['Vedic:Jaiminīya Upaniṣad Brāhmaṇa']?.sources,[WIKI_JUB,OERTEL,WIT,{title:'Vedic Heritage Portal — Jaiminiyopanishad Brahmana',detail:'Government of India overview of the Jaiminiya text.',url:'https://vedicheritage.gov.in/brahmanas/jaiminiya-upanishad-brahmana/'}])
  });

  put('Talavakāra (Jaiminīya-Upaniṣad) Āraṇyaka',{
    sanskritTitle:'तालवकारारण्यकम्',language:'Vedic Sanskrit',period:'Late Vedic period; substantially overlaps the Jaiminiya Upanishad Brahmana tradition.',
    leadParagraphs:[
      'The label Talavakara or Jaiminiya-Upanishad Aranyaka is used for the forest/speculative layer of the Jaiminiya Samaveda associated with the text better known in modern scholarship as the Jaiminiya Upanishad Brahmana.',
      'The naming is genuinely messy because older catalogues and editions divide Brahmana, Aranyaka and Upanishad material differently. The important point is the school identity: this is the Talavakara/Jaiminiya speculative corpus within which the Kena is transmitted.'
    ],articleSections:[
      {title:'Why the title varies',paragraphs:['Vedic genre boundaries are not uniform across schools. Material that one catalogue labels an Upanishad Brahmana can be described elsewhere as an Aranyaka because it occupies the same late ritual/speculative position that Aranyakas hold in other Vedas.','A responsible article therefore treats “Talavakara Aranyaka” as a transmission label tied to the Jaiminiya Upanishad Brahmana complex rather than pretending there are always two entirely separate complete books.']},
      {title:'Contents and character',paragraphs:['The corpus explores the symbolic meaning of Samavedic chant, breath, deities and the human faculties. Mythic narratives repeatedly become vehicles for explaining a hidden reality behind ritual powers.','The Kena passage is the most famous surviving extract, but the surrounding material is essential for understanding why questions about speech, mind and power arise in a Samavedic setting.']},
      {title:'Textual history',paragraphs:['Nineteenth-century discovery and publication of Jaiminiya manuscripts changed the understanding of this corpus. Earlier scholars knew Kena independently; Oertel and later editors were able to place it within the wider Talavakara text.','Modern scholarship continues to use both names because they reflect real history in the cataloguing and interpretation of the school’s literature.']}
    ],sources:addSources(D['Vedic:Talavakāra (Jaiminīya-Upaniṣad) Āraṇyaka']?.sources,[WIKI_JUB,WIKI_AR,OERTEL,WIT])
  });

  put('Chāndogya Āraṇyaka',{
    sanskritTitle:'छान्दोग्यारण्यकम्',language:'Vedic Sanskrit',period:'Late Vedic Samavedic speculative tradition; title boundaries vary in catalogues.',
    leadParagraphs:[
      'The designation Chandogya Aranyaka refers to the forest/speculative layer of the Kauthuma Samaveda associated with the textual environment of the Chandogya Brahmana and Chandogya Upanishad.',
      'Unlike the Aitareya or Taittiriya Aranyakas, the title is not represented in modern print by one universally standardized independent book. The relevant material is transmitted through the Chandogya Brahmana-Upanishad complex and related Kauthuma texts.'
    ],articleSections:[
      {title:'Place in Kauthuma transmission',paragraphs:['The Kauthuma school transmits a chain from mantra and household material into the eight-chapter Chandogya Upanishad. Catalogues that use the Aranyaka label are identifying the contemplative forest-layer within that broader school tradition.','This is why the page should explain the textual relationship instead of inventing a separate chapter list unsupported by a standard recension.']},
      {title:'Chant, meditation and Upanishadic development',paragraphs:['Chandogya speculation begins from Saman performance: Om, Udgitha, breath, speech, sun and chant are interpreted through increasingly expansive meditations.','The movement is characteristic of an Aranyaka horizon. Ritual sound is retained, but its deepest efficacy is relocated into knowledge of correspondences and ultimately into teaching about Sat, Atman and Brahman.']},
      {title:'Relation to the Chandogya Upanishad',paragraphs:['The eight chapters now known as the Chandogya Upanishad are the major surviving philosophical expression of this Kauthuma environment. They include Uddalaka and Shvetaketu, Satyakama Jabala, the five fires, Narada and Sanatkumara, and the teaching of the small space in the heart.','Because later tradition extracts the Upanishad as an independent classic, the Aranyaka-level school context can disappear from view unless it is made explicit.']},
      {title:'Textual caution',paragraphs:['The title “Chandogya Aranyaka” is therefore best treated as a historical-catalogical designation rather than a license to manufacture an independent continuous text. Where an edition uses the name, its exact boundaries should be stated.']}
    ],sources:addSources(D['Vedic:Chāndogya Āraṇyaka']?.sources,[WIKI_AR,{title:'Wikipedia — Chandogya Upanishad',url:'https://en.wikipedia.org/wiki/Chandogya_Upanishad',detail:'Structure and position within the Samaveda.'},CALAND,WIT])
  });
})();