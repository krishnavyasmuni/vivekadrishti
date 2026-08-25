(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const fallbackOpen = window.openScriptureEncyclopedia;

  const ARTICLES = {
    'Mahābhārata': {
      sanskrit:'महाभारतम्', author:'Vyāsa', language:'Sanskrit', extent:'18 parvans; Harivaṃśa transmitted as a supplement',
      date:'Layered composition and redaction, broadly from the last centuries BCE into the early centuries CE',
      notes:[
        {title:'John Brockington, “The Sanskrit Epics”',detail:'The Blackwell Companion to Hinduism (2022). Brockington notes the traditional 100,000-verse scale of the Mahābhārata and that the Critical Edition is still nearly 75,000 verses.',url:'https://onlinelibrary.wiley.com/doi/10.1002/9781119144892.ch5'},
        {title:'V. S. Sukthankar, Prolegomena to the Critical Edition of the Ādiparvan',detail:'Bhandarkar Oriental Research Institute, 1933, especially the opening discussion of the divergent Northern and Southern manuscript traditions and the purpose of the Critical Edition.',url:'https://gretil.sub.uni-goettingen.de/gretil_elib/Suk933__Sukthankar_ProlegomenaMBh1.pdf'},
        {title:'J. A. B. van Buitenen, The Mahābhārata, vol. 1',detail:'University of Chicago Press. Introduction and translation of Ādi Parvan based on the Poona Critical Edition.',url:'https://press.uchicago.edu/ucp/books/book/chicago/M/bo5948252.html'},
        {title:'J. A. B. van Buitenen, The Mahābhārata, vol. 2',detail:'University of Chicago Press. Books 2–3: Sabhā and Vana, with introductions, summaries, notes and concordances.',url:'https://press.uchicago.edu/ucp/books/book/chicago/M/bo5968537.html'},
        {title:'J. A. B. van Buitenen, The Mahābhārata, vol. 3',detail:'University of Chicago Press. Books 4–5: Virāṭa and Udyoga; the latter follows the failed diplomacy before war.',url:'https://press.uchicago.edu/ucp/books/book/chicago/M/bo5976624.html'},
        {title:'J. A. B. van Buitenen, The Bhagavadgītā in the Mahābhārata',detail:'University of Chicago Press, Sanskrit and English. Treats the Gītā as an episode within the Bhīṣma Parvan rather than as a free-standing book.',url:'https://press.uchicago.edu/ucp/books/book/chicago/B/bo5950787.html'},
        {title:'James L. Fitzgerald, The Mahābhārata, Book 12: The Book of Peace',detail:'University of Chicago Press. Modern translation and study of Śānti Parvan, especially kingship, ethics, mokṣa, yoga and Nārāyaṇa theology.',url:'https://press.uchicago.edu/'},
        {title:'Bhandarkar Oriental Research Institute publication catalogue',detail:'BORI lists the complete Critical Edition of the Mahābhārata as a 19-volume Sanskrit set and continues to publish related Mahābhārata materials.',url:'https://bori.ac.in/wp-content/uploads/2024/03/List-of-books-with-Author-and-Lanugage.pdf'},
        {title:'Mahābhārata, Ādiparvan, opening frame',detail:'The epic presents itself through nested recitations: Vaiśampāyana tells the Bhārata to Janamejaya; Ugraśravas Sauti retells it to the sages at Naimiṣa.'},
        {title:'John Brockington, The Sanskrit Epics',detail:'Brockington emphasizes the long growth of both Sanskrit epics and the transformation of heroic poetry through didactic and religious expansion.',url:'https://onlinelibrary.wiley.com/doi/10.1002/9781119144892.ch5'}
      ],
      lead:[
        'The Mahābhārata is one of the largest works of literature ever transmitted. Its famous war between the Pāṇḍavas and Kauravas is the spine of the poem, but not its whole body: the received epic contains dynastic legend, law, political theory, pilgrimage, mythology, ritual, moral argument, ascetic teaching, yoga, liberation doctrines and hundreds of stories placed inside other stories. John Brockington notes that tradition speaks of roughly 100,000 verses; even the critically reconstructed text remains close to 75,000. [[1]]',
        'J. A. B. van Buitenen described the work as “a remarkable collection of epics, legends, romances, theology, and ethical and metaphysical doctrine.” [[3]] That description is useful because it explains why a short plot summary always misrepresents the book. The dice game, Draupadī’s humiliation and the battle of Kurukṣetra occupy only part of a work that repeatedly stops its own narrative to ask what a king owes his subjects, whether truth can become harmful, whether violence can ever be righteous, what remains of duty in catastrophe, and whether political life should finally be renounced.',
        'Tradition attributes the work to Vyāsa, who is also a character inside it. Textually, however, the Mahābhārata reached its surviving form through a long history of recitation, rewriting and manuscript transmission. Sukthankar opened the Critical Edition by stressing that the Northern and Southern manuscript traditions can diverge widely; the point of the edition was not to reproduce one favoured manuscript but to compare the whole surviving tradition. [[2]]'
      ],
      sections:[
        {title:'Narrative frame and the Kuru story',paras:[
          'The poem does not begin as a modern novel with a single narrator. Ugraśravas Sauti arrives among sages performing a long sacrifice at Naimiṣa and tells them what he heard at King Janamejaya’s snake sacrifice. Inside that account, Vyāsa’s disciple Vaiśampāyana recites the history of Janamejaya’s own ancestors. [[9]] The result is a story presented simultaneously as family memory, sacred recitation and argument about how the past should be understood.',
          'The catastrophe is prepared generations before the battle. Bhīṣma renounces kingship and marriage so that his father can marry Satyavatī; the succession then passes through the complicated births of Dhṛtarāṣṭra, Pāṇḍu and Vidura. Pāṇḍu’s five sons and Dhṛtarāṣṭra’s hundred sons are raised together, but Duryodhana experiences the Pāṇḍavas as rivals from childhood. Attempts to kill them fail; after Draupadī’s svayaṃvara and the division of the kingdom, the Pāṇḍavas build Indraprastha and Yudhiṣṭhira performs the rājasūya, a royal consecration that confirms his political ascent.',
          'The dice hall converts rivalry into irreversible injury. Yudhiṣṭhira gambles away wealth, kingdom, his brothers and himself; Draupadī is then dragged into the assembly and asks a question the court cannot cleanly answer: if Yudhiṣṭhira had already lost himself, what right did he still possess to stake her? The scene matters because the epic does not merely tell the audience who is good and who is evil. It makes senior authorities—Bhīṣma among them—confront a legal and moral crisis in which inherited rules do not yield an easy verdict.',
          'The settlement sends the Pāṇḍavas into twelve years of forest exile followed by a thirteenth year in disguise. Vana Parvan expands enormously beyond the immediate plot: Yudhiṣṭhira hears the stories of Nala and Damayantī, Sāvitrī and Satyavān, Rāma, and many other figures whose sufferings become precedents through which the exiles interpret their own. Van Buitenen’s edition accordingly treats the forest book not as filler between the dice game and the war but as a major anthology embedded inside the epic. [[4]]',
          'After the incognito year at Virāṭa’s court, Udyoga Parvan is dominated by attempts to avoid war. Kṛṣṇa’s embassy fails; Duryodhana refuses a settlement; alliances harden. The University of Chicago summary captures the movement of the book from negotiation to the point at which both sides finally march to battle. [[5]]'
        ]},
        {title:'The war and what comes after it',paras:[
          'The Kurukṣetra battle occupies Books 6–10. Bhīṣma commands first, then Droṇa, Karṇa and finally Śalya. The Bhagavad Gītā appears near the beginning of Bhīṣma Parvan when Arjuna refuses to fight after seeing teachers, relatives and friends on both sides. Kṛṣṇa’s response moves through action, knowledge, disciplined yoga, devotion and divine manifestation; in the Mahābhārata it is not an abstract philosophical preface but a speech delivered at the exact moment the epic’s central moral contradiction becomes unbearable. [[6]]',
          'The battle then becomes progressively harder to reconcile with the ideals invoked before it. Abhimanyu is trapped and killed; Droṇa is brought down after a strategically deceptive announcement; Karṇa dies after a sequence of curses and battlefield disadvantages; Bhīma strikes Duryodhana below the waist in the mace duel. Sauptika Parvan continues the destruction after the formal battle when Aśvatthāman attacks the sleeping Pāṇḍava camp and kills Draupadī’s sons.',
          'Victory does not close the epic. Strī Parvan gives the battlefield to the bereaved women and to the grief of Dhṛtarāṣṭra, Gāndhārī and the Pāṇḍavas. Then the poem becomes even more expansive: in Śānti and Anuśāsana Parvans the dying Bhīṣma instructs Yudhiṣṭhira at enormous length on kingship, emergency ethics, social duty, gifts, non-violence, renunciation, Sāṃkhya- and Yoga-like doctrines, liberation and devotion to Nārāyaṇa. Fitzgerald’s work on Book 12 shows why “the war epic” is an inadequate label for a text whose longest intellectual aftermath is about how to live after violence. [[7]]',
          'The final books deliberately dismantle the world the story built. The horse sacrifice restores Yudhiṣṭhira’s kingship, but Dhṛtarāṣṭra, Gāndhārī and Kuntī leave for the forest and die there; the Yādavas destroy one another; Kṛṣṇa dies; the Pāṇḍavas relinquish the kingdom and walk north toward death. The last test of Yudhiṣṭhira, accompanied by a dog he refuses to abandon, brings the epic back to its persistent question: what does dharma demand when the obvious reward for doing it has disappeared?'
        ]},
        {title:'How the eighteen books are arranged',paras:[
          'The first five parvans carry the story from origins to the brink of war. Ādi Parvan establishes genealogy, births, rivalries, Draupadī’s marriage and Indraprastha. Sabhā Parvan contains the rājasūya, dice games and exile. Vana Parvan is the twelve-year forest exile and the epic’s largest early anthology of embedded stories. Virāṭa narrates the year in disguise. Udyoga is the book of diplomacy, embassies, army-building and failed peace.',
          'Books 6–10 are the battle sequence: Bhīṣma, Droṇa, Karṇa and Śalya are named after successive Kaurava commanders, while Sauptika narrates the night massacre that follows Duryodhana’s defeat. Book 11, Strī Parvan, changes the viewpoint from combat to mourning. Books 12 and 13, Śānti and Anuśāsana, then suspend forward plot for a vast body of instruction from Bhīṣma.',
          'The last five books describe restoration and withdrawal: Āśvamedhika contains the horse sacrifice and the Anugītā; Āśramavāsika follows the retirement of the older generation; Mausala narrates the destruction of the Yādavas; Mahāprasthānika follows the Pāṇḍavas’ final journey; Svargārohaṇa resolves their destinies. The Harivaṃśa, devoted to genealogy, cosmology and Kṛṣṇa, is traditionally attached as a khila or supplement rather than counted among the eighteen main parvans.'
        ]},
        {title:'Textual history and the Critical Edition',paras:[
          'There is no single ancient manuscript from which all modern Mahābhāratas descend unchanged. By the time manuscripts survive in large numbers, the text exists in regional families with thousands of smaller variants and many larger additions or omissions. Sukthankar’s Prolegomena is unusually frank about this: he says there was “no doubt whatsoever that the text of the Mahābhārata has undergone numerous changes.” [[2]]',
          'The Bhandarkar Oriental Research Institute began the critical-edition project in 1919. Sukthankar established the editorial method for the Ādi Parvan, and later editors carried it through the remaining books. BORI’s publication catalogue still lists the completed Critical Edition as a nineteen-volume Sanskrit set. [[8]] The constituted text is therefore an editorial reconstruction based on manuscript comparison; the apparatus records important readings that were not printed in the main text.',
          'This explains why verse totals and even familiar episodes can differ between editions. Traditional descriptions speak of about 100,000 verses, while Brockington notes that the Critical Edition is still nearly 75,000. [[1]] A passage absent from the constituted text is not automatically “fake,” nor is a passage present in one late regional manuscript automatically part of the earliest recoverable text. It means the passage belongs to a particular stage or branch of the epic’s transmission, and a careful article should say which.',
          'The familiar story that Gaṇeśa wrote while Vyāsa dictated is a good example. It became famous in later transmission, but the critical editors did not include it in the constituted opening because the manuscript evidence did not support it as part of the common ancestor they were reconstructing. The value of the Critical Edition lies precisely in making that distinction visible instead of silently choosing whichever version is best known.'
        ]},
        {title:'Dharma, theology and argument',paras:[
          'The Mahābhārata does not treat dharma as a glossary entry. It stages situations in which plausible duties collide. Bhīṣma’s vow saves his father’s desire but destabilizes succession. Yudhiṣṭhira’s commitment to the rules of dice helps destroy his household. Arjuna’s horror at killing relatives conflicts with his warrior obligation. Karṇa’s loyalty to Duryodhana persists even after he learns the truth of his birth. Draupadī repeatedly exposes the gap between formal authority and justice.',
          'The text also preserves many religious languages at once. Vedic sacrifice remains important, but so do ascetic withdrawal, Sāṃkhya-like analysis, Yoga, devotion to Kṛṣṇa-Nārāyaṇa, Śaiva mythology, pilgrimage and gifts. Brockington describes the epics as works that grew over a long period while their older heroic world was increasingly given a religious interpretation. [[10]] It is therefore misleading to make the Mahābhārata sound as though a single philosopher sat down and designed one system.',
          'That plurality is part of the reason the work became authoritative. Characters argue, stories contradict one another, and later teachings sometimes reinterpret earlier actions. The epic’s famous encyclopedic self-image—that what concerns the human goals can be found within it—makes more sense when the text is read as a debate carried by an enormous narrative tradition rather than as a manual with one answer per question.'
        ]},
        {title:'Translations and reception',paras:[
          'The Mahābhārata has never existed only as the Sanskrit Critical Edition. Sanskrit commentaries, regional recensions, vernacular retellings, temple traditions, oral performance, drama, painting, modern novels, comics, television and film have all selected different parts of it. Nīlakaṇṭha’s seventeenth-century commentary became especially influential in the northern printed vulgate, while other regions preserved different textual and interpretive habits.',
          'For English readers, K. M. Ganguli’s nineteenth-century translation represents the longer vulgate tradition. Van Buitenen began a new translation from the Critical Edition at Chicago; later scholars, including James L. Fitzgerald, continued the project. That difference matters: two English translations can both be serious and yet contain different passages because they translate different Sanskrit textual bases.'
        ]}
      ]
    },
    'Rāmāyaṇa': {
      sanskrit:'रामायणम्', author:'Vālmīki', language:'Sanskrit', extent:'7 kāṇḍas in the received Vālmīki Rāmāyaṇa',
      date:'Layered epic; older narrative strata precede later Bāla and Uttara growth, with the received work developing across centuries',
      notes:[
        {title:'John Brockington, “The Sanskrit Epics”',detail:'The Blackwell Companion to Hinduism (2022). Brockington describes the Rāmāyaṇa as nearly 20,000 verses in critical form and discusses the long development of the Sanskrit epics.',url:'https://onlinelibrary.wiley.com/doi/10.1002/9781119144892.ch5'},
        {title:'M. S. University of Baroda, Oriental Institute — Critical Edition Wing',detail:'Official account of the 1951–1975 project that produced the Critical Edition of the Vālmīki Rāmāyaṇa in seven volumes, one for each kāṇḍa.',url:'https://msubaroda.ac.in/academics/OI/department/CEW/aboutdepartment'},
        {title:'Robert P. Goldman, The Rāmāyaṇa of Vālmīki, vol. I: Bālakāṇḍa',detail:'Princeton University Press. General introduction, history/historicity, Bālakāṇḍa introduction and discussion of the Critical Edition.',url:'https://www.jstor.org/stable/j.ctt1gsmwgz'},
        {title:'Sheldon I. Pollock, The Rāmāyaṇa of Vālmīki, vol. II: Ayodhyākāṇḍa',detail:'Princeton University Press, 1986. Translation and annotation based on the Baroda Critical Edition, with extensive use of Sanskrit commentaries.',url:'https://www.jstor.org/stable/j.ctt1bmzkgh'},
        {title:'Sheldon I. Pollock, The Rāmāyaṇa of Vālmīki, vol. III: Araṇyakāṇḍa',detail:'Princeton University Press, 1991. Discusses the forest narrative and the abduction of Sītā as the narrative center of the epic.',url:'https://www.jstor.org/stable/j.ctt1bmzkf0'},
        {title:'Sheldon Pollock, “The Rāmāyaṇa Text and the Critical Edition”',detail:'In Goldman, vol. I, pp. 82–93. A concise scholarly account of the manuscript problem and the principles behind the Baroda edition.',url:'https://www.degruyterbrill.com/document/doi/10.1515/9781400884551-007/html'},
        {title:'The Rāmāyaṇa of Vālmīki: The Complete English Translation',detail:'Princeton University Press / JSTOR, 2021. Complete translation of the Critical Edition with a new introduction and glossary.',url:'https://www.jstor.org/stable/j.ctv1n1bs4v'},
        {title:'John Brockington, studies of the growth of the Vālmīki Rāmāyaṇa',detail:'Brockington’s linguistic and stylistic work is central to the view that Books 2–6 contain older narrative strata and that Books 1 and 7 underwent substantial later growth.'},
        {title:'Hindupedia, “Ramayana”',detail:'Useful as a witness to traditional Hindu reception and the enormous religious-cultural life of the Rāma story; historical claims require separate scholarly checking.',url:'https://www.hindupedia.com/en/ramayana'}
      ],
      lead:[
        'The Vālmīki Rāmāyaṇa tells the exile of Rāma of Ayodhyā, the abduction of Sītā by Rāvaṇa, the alliance with the vānaras, the war in Laṅkā and Rāma’s return to kingship. But the poem is not merely an adventure story with a moral attached. It is one of the foundational works through which South Asian traditions have thought about kingship, marriage, loyalty, grief, violence, obedience, reputation and the meaning of dharma. Princeton’s modern critical-edition translation says its influence on the literature, art, religions and cultures of South and Southeast Asia is “perhaps unparalleled in the history of world literature.” [[3]]',
        'The scale is smaller than the Mahābhārata but still immense. Brockington describes the critically established Rāmāyaṇa as almost 20,000 verses; the familiar received count is about 24,000 ślokas in seven kāṇḍas. [[1]] Those numbers differ because “the Rāmāyaṇa” is not one untouched manuscript. Northern and southern manuscript traditions preserve significant variants, additions and rearrangements.',
        'Tradition names Vālmīki as the poet and places him inside the story itself: Sītā later takes refuge in his hermitage, and Lava and Kuśa learn and sing the poem. Modern textual scholarship does not require the reader to choose between respecting that traditional authorship and recognizing a long textual history. The Baroda Critical Edition, produced between 1951 and 1975, exists precisely because the surviving manuscripts do not all give the same text. [[2]]'
      ],
      sections:[
        {title:'The story',paras:[
          'Ayodhyākāṇḍa gives the epic its decisive human crisis. Daśaratha intends to crown Rāma, but Kaikeyī demands the two boons the king once promised her: Bharata is to receive the throne and Rāma is to live in the forest for fourteen years. Rāma accepts exile rather than make his father violate his word. Sītā insists on accompanying him, and Lakṣmaṇa goes with them. Pollock calls this book the most human of the seven sections because the catastrophe develops not from a cosmic battle but from family obligation, royal succession and conflicting promises. [[4]]',
          'The forest narrative gradually moves from renunciation to war. Rāma, Sītā and Lakṣmaṇa visit hermitages and encounter rākṣasas; Śūrpaṇakhā’s humiliation leads to conflict with Khara and then to Rāvaṇa’s decision to abduct Sītā. Mārīca takes the form of the golden deer, drawing Rāma away; Lakṣmaṇa leaves after Sītā presses him to follow; Rāvaṇa carries her to Laṅkā. Pollock’s introduction to Araṇyakāṇḍa calls the abduction the narrative center of the epic. [[5]]',
          'Kiṣkindhākāṇḍa changes the world of the story. Rāma meets Hanumān and forms an alliance with Sugrīva, helping him regain the vānaras’ kingship from Vālin. In return, Sugrīva sends search parties in every direction. Sundarakāṇḍa follows Hanumān across the ocean into Laṅkā, where he finds Sītā in the Aśoka grove, gives her Rāma’s token, surveys Rāvaṇa’s capital and returns with proof that she is alive.',
          'Yuddhakāṇḍa narrates the crossing to Laṅkā and the war. Vibhīṣaṇa deserts Rāvaṇa and joins Rāma; Kumbhakarṇa and Indrajit are killed; Rāma finally kills Rāvaṇa. The end of the war, however, is morally more difficult than the victory itself. Sītā must answer public suspicion about her captivity, and the fire ordeal becomes one of the poem’s most debated scenes.',
          'Uttarakāṇḍa extends the story into Rāma’s reign and also looks backward, supplying long histories of Rāvaṇa and other figures. Public gossip about Sītā leads Rāma to send the pregnant queen away; she lives at Vālmīki’s hermitage, where Lava and Kuśa are born and learn the Rāmāyaṇa. The ending therefore turns the poem back on itself: Rāma becomes a listener to his own history.'
        ]},
        {title:'The seven kāṇḍas',paras:[
          'Bālakāṇḍa introduces Vālmīki, Nārada and the story’s poetic origin; it narrates Rāma’s birth, Viśvāmitra’s request for his help, the protection of the sacrifice, Ahalyā’s restoration and the marriage to Sītā. Text-critical scholarship has long regarded much of this opening book as later than the central narrative, which is one reason modern introductions treat its composition separately. [[3]]',
          'Ayodhyā and Araṇya form the movement from court to exile and then from exile to abduction. Kiṣkindhā and Sundara shift the focus toward the vānaras and Hanumān. Yuddha is the war and recovery of Sītā. Uttara narrates later rule, Sītā’s exile, Lava and Kuśa, and the conclusion of the earthly story. The seven-book arrangement is the form represented by the Baroda Critical Edition. [[2]]',
          'The books are not equally old, equally long or equally secure textually. “Seven kāṇḍas” describes the received architecture; it should not be mistaken for evidence that all seven were written at one sitting. Brockington’s work, along with earlier and later philology, has repeatedly argued for older poetic strata in Books 2–6 and substantial later development in Books 1 and 7. [[8]]'
        ]},
        {title:'Rāma: prince, ideal king and deity',paras:[
          'One of the most important changes within the Rāmāyaṇa tradition is the relation between Rāma’s humanity and divinity. In large parts of the central epic he acts as an exemplary kṣatriya prince who suffers, reasons, grieves and must decide what dharma requires. Other passages explicitly identify him as Viṣṇu incarnate. Brockington describes this movement as part of the larger religious development of the Sanskrit epics, in which heroic protagonists become understood as divine descents. [[1]]',
          'This is why the poem can be read simultaneously as royal ethics, tragic family narrative and Vaiṣṇava scripture. The tension is not a defect to be “solved” by reducing one side to the other. Pollock’s study of Araṇyakāṇḍa explicitly calls attention to the paradox of the hero as both human and divine. [[5]] Later commentators and vernacular Rāmāyaṇas often intensify one aspect more strongly than another.'
        ]},
        {title:'Manuscripts and the Baroda Critical Edition',paras:[
          'The modern Critical Edition was prepared at the Oriental Institute of the Maharaja Sayajirao University of Baroda. The university records that the project ran from 1951 to 1975, involved more than twenty-five assistants and produced seven large volumes, one for each kāṇḍa, along with a separate bare text and indexes. [[2]]',
          'The reason for such a project is simple: surviving Rāmāyaṇa manuscripts disagree. They can be grouped into major northern and southern traditions and further regional families. A critical editor therefore has to ask whether a reading is old because it occurs across otherwise independent branches, or whether it is a later expansion restricted to one line of transmission. Pollock devotes a separate chapter of the Princeton edition to explaining this problem and the principles of the Baroda text. [[6]]',
          'A Critical Edition is not “the one true Rāmāyaṇa” replacing every living recension. It is a scholarly attempt to reconstruct an earlier recoverable textual level from the manuscripts available to the editors. Regional versions and passages excluded from the constituted text remain historically real and can be religiously important. The apparatus exists so that those differences are not erased.',
          'This distinction also explains why a citation should identify the edition. A sarga number in a popular Gītā Press text, a southern recension and the Baroda Critical Edition may not point to precisely the same wording. For a serious encyclopedia article, “Rāmāyaṇa says…” is often not enough; the book, chapter and textual basis should be given when the passage matters.'
        ]},
        {title:'Later Rāmāyaṇas and cultural life',paras:[
          'The Vālmīki Rāmāyaṇa is only one part of the Rāma tradition. Sanskrit works such as the Adhyātma Rāmāyaṇa and Yoga Vāsiṣṭha, Tamil Kampaṉ’s Irāmāvatāram, Tulsīdās’s Rāmcaritmānas, Kṛttivāsa’s Bengali Rāmāyaṇa and many Southeast Asian versions retell the story with different theological, literary and political priorities. None is simply a careless copy of Vālmīki.',
          'This enormous afterlife is why traditional resources such as Hindupedia emphasize how thoroughly the Rāma story entered pilgrimage, festival, theatre, sculpture, song and local geography. [[9]] A scholarly page should preserve that living Hindu reception while distinguishing it from historical claims that require manuscript, inscriptional or philological evidence.',
          'The Princeton translation project led by Robert Goldman is useful for precisely this reason: it translates the Critical Edition while continually consulting the medieval Sanskrit commentarial tradition. [[3]][[4]][[5]] The result is not a choice between “traditional” and “academic” reading, but a model in which the history of the text and the history of its interpretation can be seen together.'
        ]}
      ]
    }
  };

  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let shade=null, reader=null, sourceCard=null;

  function richText(text){
    const safe=esc(text);
    return safe.replace(/\[\[(\d+)\]\]/g,(_,n)=>`<sup class="human-cite"><button type="button" data-source-note="${n}" aria-label="Show source ${n}">${n}</button></sup>`);
  }
  function close(){ shade?.remove(); reader?.remove(); shade=reader=sourceCard=null; document.documentElement.classList.remove('kena-article-open'); }
  function infoBox(name,a){
    const rows=[['Sanskrit',a.sanskrit],['Traditional author',a.author],['Language',a.language],['Form',a.extent],['Date',a.date]];
    return `<aside class="kena-infobox human-infobox"><div class="kena-infobox-title">${esc(name)}</div>${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }
  function noteList(a){
    return `<section class="kena-section human-notes" id="human-notes"><h2>Sources and notes</h2><ol>${a.notes.map((n,i)=>`<li id="human-note-${i+1}"><b>${i+1}. ${esc(n.title)}</b> ${esc(n.detail)}${n.url?` <a href="${esc(n.url)}" target="_blank" rel="noopener">Open source</a>`:''}</li>`).join('')}</ol></section>`;
  }
  function article(name,a){
    const sectionHtml=a.sections.map((s,i)=>`<section class="kena-section human-section" id="human-section-${i+1}"><h2>${esc(s.title)}</h2>${s.paras.map(p=>`<p>${richText(p)}</p>`).join('')}</section>`).join('');
    const toc=a.sections.map((s,i)=>`<li><a href="#human-section-${i+1}">${esc(s.title)}</a></li>`).join('')+`<li><a href="#human-notes">Sources and notes</a></li>`;
    return `<article class="scripture-wiki-article human-wiki-article">${infoBox(name,a)}<div class="kena-lead">${a.lead.map(p=>`<p>${richText(p)}</p>`).join('')}</div><nav class="kena-toc human-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>${sectionHtml}${noteList(a)}</article>`;
  }
  function showSource(a,n,button){
    const note=a.notes[n-1]; if(!note) return;
    if(!sourceCard){ sourceCard=document.createElement('aside'); sourceCard.className='human-source-card'; reader.appendChild(sourceCard); }
    sourceCard.innerHTML=`<button type="button" class="human-source-close" aria-label="Close source">×</button><div class="human-source-number">${n}</div><strong>${esc(note.title)}</strong><p>${esc(note.detail)}</p>${note.url?`<a href="${esc(note.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;
    sourceCard.hidden=false;
    reader.querySelectorAll('.human-cite button.is-open').forEach(b=>b.classList.remove('is-open')); button.classList.add('is-open');
  }
  function openHuman(button,name,a){
    close();
    shade=document.createElement('div'); shade.className='kena-article-backdrop scripture-wiki-backdrop';
    reader=document.createElement('section'); reader.className='kena-article-reader scripture-wiki-reader human-wiki-reader'; reader.setAttribute('role','dialog'); reader.setAttribute('aria-modal','true');
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Viveka Dṛṣṭi encyclopedia</span><h1>${esc(name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${article(name,a)}</div>`;
    document.body.append(shade,reader); document.documentElement.classList.add('kena-article-open');
    reader.addEventListener('click',e=>{
      const cite=e.target.closest('[data-source-note]'); if(cite){e.preventDefault();showSource(a,Number(cite.dataset.sourceNote),cite);return;}
      if(e.target.closest('.human-source-close')){sourceCard.hidden=true;reader.querySelectorAll('.human-cite button.is-open').forEach(b=>b.classList.remove('is-open'));}
      if(e.target.closest('.kena-article-close')) close();
    });
    shade.addEventListener('click',close);
    return true;
  }

  window.openScriptureEncyclopedia = function(button){
    const name=button?.dataset?.name || button?.querySelector?.('span')?.textContent?.trim();
    const kind=button?.dataset?.kind || '';
    if(kind==='Itihāsa' && ARTICLES[name]) return openHuman(button,name,ARTICLES[name]);
    return typeof fallbackOpen==='function' ? fallbackOpen(button) : false;
  };
})();