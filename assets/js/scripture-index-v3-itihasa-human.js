(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const fallbackOpen = window.openScriptureEncyclopedia;

  const ARTICLES = {
    'Mahābhārata': {
      title: 'Mahābhārata',
      sanskrit: 'महाभारतम्',
      author: 'Traditionally Vyāsa',
      language: 'Sanskrit',
      extent: '18 parvans; traditionally about 100,000 ślokas; Harivaṃśa transmitted as a supplement',
      date: 'Layered composition; most modern summaries place major compilation between the last centuries BCE and early centuries CE',
      notes: [
        {title:'Wikipedia — Mahabharata', detail:'Main article. Used for the overview, extent, traditional authorship, compositional history, story frame, 18-parvan organization, synopsis, reception and the Harivaṃśa supplement.', url:'https://en.wikipedia.org/wiki/Mahabharata'},
        {title:'Wikipedia — Mahabharata, “Textual history and structure”', detail:'Used for the nested recitation frame, accretion/redaction discussion, the Bhārata/Mahābhārata growth tradition, and the warning that the text was fluid before manuscript stabilization.', url:'https://en.wikipedia.org/wiki/Mahabharata#Textual_history_and_structure'},
        {title:'Wikipedia — Mahabharata, “The 18 parvas or books”', detail:'Used for the order and basic contents of the eighteen major books and the Harivaṃśa supplement.', url:'https://en.wikipedia.org/wiki/Mahabharata#The_18_parvas_or_books'},
        {title:'Wikipedia — Mahabharata, “Synopsis”', detail:'Used for the continuous narrative from the Kuru succession dispute through exile, Kurukṣetra, the destruction of the Yādavas and the final ascent.', url:'https://en.wikipedia.org/wiki/Mahabharata#Synopsis'},
        {title:'Wikipedia — Bhishma Parva', detail:'Used for the opening of the war and the placement of the Bhagavad Gītā inside Bhīṣma Parvan.', url:'https://en.wikipedia.org/wiki/Bhishma_Parva'},
        {title:'Wikipedia — Anushasana Parva', detail:'Used for Bhīṣma’s postwar instruction and the placement of the Viṣṇu Sahasranāma in Anuśāsana Parvan.', url:'https://en.wikipedia.org/wiki/Anushasana_Parva'},
        {title:'Wikipedia — Svargarohana Parva', detail:'Used for the epic’s final heaven-and-hell test of Yudhiṣṭhira.', url:'https://en.wikipedia.org/wiki/Svargarohana_Parva'},
        {title:'Hindupedia — Mahabharata', detail:'Hindupedia’s Mahābhārata entry is brief; it is used here only as a traditional Hindu encyclopedia witness for the epic’s identity as the story of the Pāṇḍavas, Kauravas and Kurukṣetra.', url:'https://www.hindupedia.com/en/Mahabharata'},
        {title:'R. C. Hazra — Studies in the Purāṇic Records on Hindu Rites and Customs', detail:'Hazra’s book is primarily about Purāṇic literature rather than the text of the Mahābhārata. It is used only in the discussion of the older Itihāsa–Purāṇa relationship and the later Purāṇic expansion of ritual and narrative material.', url:'https://www.griet.ac.in/images/rare/Studies%20in%20the%20Puranic%20Records%20on%20Hindu%20Rites%20and%20Customs.pdf'},
        {title:'Wikipedia — Harivaṃśa', detail:'Used for the status of the Harivaṃśa as a khila/supplement to the Mahābhārata and its Kṛṣṇa/genealogical material.', url:'https://en.wikipedia.org/wiki/Harivamsa'}
      ],
      body: article => {
        const C = (...nums) => nums.map(n => `<sup class="itihasa-cite"><button type="button" data-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
        return `
          <div class="kena-lead itihasa-lead">
            <p>The <i>Mahābhārata</i> is one of Hinduism’s two great Sanskrit <i>Itihāsas</i>. Calling it merely “the story of the Pāṇḍavas and Kauravas” badly understates what the received work is. The dynastic war at Kurukṣetra supplies the spine of the narrative, but around it the text has accumulated royal genealogy, pilgrimage, legends, law, ethics, statecraft, ritual, theology, yoga, renunciation and long arguments about what <i>dharma</i> demands when every available choice is compromised.${C(1,8)}</p>
            <p>Its scale is part of the point. The traditional figure is about 100,000 <i>ślokas</i>, and the work is organized into eighteen major books, or <i>parvans</i>, with the <i>Harivaṃśa</i> commonly transmitted as a supplement. The Bhagavad Gītā, Nala and Damayantī, Sāvitrī, Śakuntalā, the Yakṣa questions, the Nārāyaṇīya and the enormous Mokṣadharma are all parts of this larger textual world, not independent additions that happen to sit beside the “real” war story.${C(1,3,10)}</p>
            <p>The traditional author is Vyāsa, who is himself a character inside the epic and the ancestor of the principal Kuru lines. Modern textual history does not treat the present Mahābhārata as the product of one sitting: the epic was transmitted orally, expanded and reorganized over centuries before the surviving manuscript traditions took shape.${C(1,2)}</p>
          </div>

          <nav class="kena-toc itihasa-toc" aria-label="Contents">
            <div class="kena-toc-title">Contents</div>
            <ol>
              <li><a href="#mbh-name">Name, authorship and frame</a></li>
              <li><a href="#mbh-story">The story</a></li>
              <li><a href="#mbh-war">The Kurukṣetra war and its aftermath</a></li>
              <li><a href="#mbh-parvans">The eighteen parvans</a></li>
              <li><a href="#mbh-within">The books inside the book</a></li>
              <li><a href="#mbh-text">Textual growth and versions</a></li>
              <li><a href="#mbh-dharma">Dharma, religion and political thought</a></li>
              <li><a href="#mbh-reception">Reception and continuing life</a></li>
              <li><a href="#itihasa-notes">Sources</a></li>
            </ol>
          </nav>

          <section class="kena-section" id="mbh-name">
            <h2>Name, authorship and narrative frame</h2>
            <p><i>Mahābhārata</i> means the “Great Bhārata,” that is, the great tale of the descendants of Bharata. The text identifies itself as <i>itihāsa</i> and is traditionally attributed to Vyāsa. Yet it does not present itself as a modern author speaking directly to a reader. It is built out of recitations inside recitations.${C(1,2)}</p>
            <p>At one level, Vyāsa’s disciple Vaiśampāyana recites the Bhārata to King Janamejaya during the king’s snake sacrifice. At another, Ugraśravas Sauti retells that recitation to sages gathered in the Naimiṣa forest. This framing matters because the epic is constantly about memory: descendants listen to the history of their own ancestors, and listeners are asked to judge actions whose consequences are already known.${C(2)}</p>
            <p>The familiar story that Gaṇeśa wrote the epic down while Vyāsa dictated it appears in the received tradition, but Wikipedia’s textual-history summary notes that scholars regard that episode as later and that it is absent from the Critical Edition. The page therefore distinguishes traditional self-presentation from what manuscript criticism says about the growth of the text.${C(2)}</p>
          </section>

          <section class="kena-section" id="mbh-story">
            <h2>The story</h2>
            <h3>The Kuru succession problem</h3>
            <p>The war is the end of a succession crisis that begins generations earlier. King Śāntanu’s marriage to Gaṅgā produces Bhīṣma; Bhīṣma’s terrible vow of celibacy secures another marriage for his father but removes the most qualified prince from succession. Through Vyāsa the royal line continues with Dhṛtarāṣṭra, Pāṇḍu and Vidura. Dhṛtarāṣṭra is older but blind; Pāṇḍu becomes king, then withdraws to the forest under a curse. Their sons are raised together at Hastināpura, and the question of who has the stronger claim never truly disappears.${C(4)}</p>
            <p>The five Pāṇḍavas—Yudhiṣṭhira, Bhīma, Arjuna, Nakula and Sahadeva—grow up beside Dhṛtarāṣṭra’s sons, headed by Duryodhana. Their teachers are shared; so are their relatives, allies and obligations. This is why the eventual war is never a clean struggle between strangers. Every major warrior is bound to the other side by kinship, education, friendship, gratitude or oath.${C(4)}</p>
            <h3>The lac house, Draupadī and Indraprastha</h3>
            <p>After an attempt to burn the Pāṇḍavas in a lacquer house, the brothers survive in disguise. Arjuna wins Draupadī at her <i>svayaṃvara</i>, and she becomes the wife of all five brothers. A political settlement eventually gives the Pāṇḍavas territory from which they establish Indraprastha. Their power grows until Yudhiṣṭhira performs the <i>rājasūya</i>, a royal consecration that publicly marks his imperial ambition.${C(3,4)}</p>
            <p>Duryodhana’s resentment is sharpened by the splendor of the Pāṇḍava court. The conflict then moves from military threat to gambling. Yudhiṣṭhira accepts the dice invitation, loses his wealth and kingdom, then his brothers, himself and finally Draupadī. The scene in the assembly is one of the epic’s most important arguments about law and authority because Draupadī asks whether Yudhiṣṭhira, after losing himself, still possessed the legal capacity to wager her. The elders do not produce a clean answer.${C(4)}</p>
            <h3>Exile and the failure of peace</h3>
            <p>The Pāṇḍavas are sent into twelve years of forest exile followed by a thirteenth year incognito. The forest books greatly enlarge the epic: instead of simply waiting out a sentence, the characters hear older legends, visit tīrthas, debate kingship and suffering, and encounter stories such as Nala–Damayantī and Sāvitrī. In Virāṭa’s kingdom they complete the incognito year; afterward both sides prepare for war.${C(3,4)}</p>
            <p>The <i>Udyoga Parvan</i> is not battle but diplomacy. Envoys travel, alliances harden, and Kṛṣṇa himself attempts a final settlement. The tragedy is that everyone can see the scale of the coming destruction while the political dispute still cannot be resolved.${C(3)}</p>
          </section>

          <section class="kena-section" id="mbh-war">
            <h2>The Kurukṣetra war and its aftermath</h2>
            <p>The war lasts eighteen days, but the epic spends much more than eighteen days’ worth of narrative attention on it. Command passes from Bhīṣma to Droṇa, then Karṇa and finally Śalya. The Bhagavad Gītā occurs before the fighting properly begins, when Arjuna looks across the battlefield and sees teachers, cousins and elders among the people he is expected to kill. Kṛṣṇa’s response places action, knowledge, yoga, devotion and divine sovereignty inside the immediate moral crisis of civil war.${C(5)}</p>
            <p>The fighting then dismantles the older rules that warriors repeatedly claim to honor. Bhīṣma is brought down through Śikhaṇḍin’s presence; Abhimanyu is trapped and killed; Droṇa is broken by the half-truth concerning Aśvatthāman; Karṇa dies after his chariot wheel becomes stuck; Bhīma strikes Duryodhana below the waist. The epic does not hide these acts. Victory is inseparable from rule-breaking, grief and the knowledge that every surviving side has paid for it.${C(3,4)}</p>
            <p>Nor does the war end when Duryodhana falls. Aśvatthāman attacks the sleeping camp and kills Draupadī’s sons. The <i>Strī Parvan</i> then turns the story toward the women who must identify and mourn the dead. Yudhiṣṭhira, who has technically gained the kingdom, wishes to renounce it. Bhīṣma’s long instructions in the <i>Śānti</i> and <i>Anuśāsana</i> books occupy a huge part of the postwar epic and range from kingship and emergency ethics to gifts, vows, social duties and liberation. The Viṣṇu Sahasranāma occurs in <i>Anuśāsana Parvan</i>.${C(6)}</p>
            <p>The final books refuse to give the dynasty a simple happy ending. Dhṛtarāṣṭra, Gāndhārī and Kuntī retire and die; the Yādavas destroy one another; Kṛṣṇa dies; the Pāṇḍavas relinquish the throne and walk north. In the final <i>Svargārohaṇa Parvan</i>, Yudhiṣṭhira is subjected to a last moral test involving heaven and hell before the epic resolves the destinies of its principal figures.${C(7)}</p>
          </section>

          <section class="kena-section" id="mbh-parvans">
            <h2>The eighteen parvans</h2>
            <p>The eighteen books are not equal-sized “chapters.” Some are enormous libraries in their own right and others are brief endings. <i>Ādi</i> establishes the narrative frames, genealogies and childhood of the Kuru princes; <i>Sabhā</i> brings the Pāṇḍavas to imperial power and then ruins them through the dice game; <i>Vana</i> turns exile into a vast collection of stories, pilgrimages and arguments; <i>Virāṭa</i> covers the year in disguise; and <i>Udyoga</i> is the long preparation and diplomatic failure before war.${C(3)}</p>
            <p>The central battle occupies <i>Bhīṣma</i>, <i>Droṇa</i>, <i>Karṇa</i> and <i>Śalya</i>. <i>Sauptika</i> describes the night massacre after the formal battle, while <i>Strī</i> gives the grief of the bereaved. The enormous <i>Śānti</i> and <i>Anuśāsana</i> books shift from battlefield narrative to instruction, especially Bhīṣma’s teaching of Yudhiṣṭhira.${C(3,6)}</p>
            <p><i>Āśvamedhika</i> follows Yudhiṣṭhira’s horse sacrifice and the postwar restoration of kingship. <i>Āśramavāsika</i> follows the retirement of the older generation; <i>Mausala</i> narrates the destruction of the Yādavas; <i>Mahāprasthānika</i> sends the Pāṇḍavas on their last journey; and <i>Svargārohaṇa</i> gives Yudhiṣṭhira’s final test. The <i>Harivaṃśa</i>, devoted to genealogy, Kṛṣṇa and cosmological material, is traditionally transmitted as a <i>khila</i> or supplement rather than one of the eighteen parvans.${C(3,10)}</p>
          </section>

          <section class="kena-section" id="mbh-within">
            <h2>The books inside the book</h2>
            <p>One reason a short “themes” box feels absurd for the Mahābhārata is that the epic repeatedly contains works that later readers treat almost as books of their own. The Bhagavad Gītā is the most famous example, but it is only one. The Nala–Damayantī story explores loss, gambling and recovery; Sāvitrī’s confrontation with Yama turns marital fidelity into a contest of intelligence and resolve; the Yakṣa questions stage Yudhiṣṭhira’s moral intelligence; and the epic even contains a condensed Rāma story.${C(1,4)}</p>
            <p>The didactic scale becomes largest after the war. <i>Śānti Parvan</i> contains extensive discussions of government, ethics, crisis conduct, renunciation and liberation. The Mokṣadharma materials move far beyond the immediate Kuru plot, while the Nārāyaṇīya gives major Vaiṣṇava theology. The result is not a neat philosophy textbook but a conversation among different ideals preserved inside one textual tradition.${C(1,6)}</p>
          </section>

          <section class="kena-section" id="mbh-text">
            <h2>Textual growth and versions</h2>
            <p>Wikipedia’s textual-history summary describes the Mahābhārata as a work that grew through oral performance and repeated redaction. The text itself distinguishes a 24,000-verse <i>Bhārata</i> from additional material, while later tradition speaks of stages called <i>Jaya</i>, <i>Bhārata</i> and <i>Mahābhārata</i>. That tidy three-stage model is itself debated, so it should be presented as a traditional or scholarly reconstruction rather than as a securely documented publication history.${C(2)}</p>
            <p>The manuscript tradition is vast and regionally varied. The important point for an ordinary reader is simple: “the Mahābhārata” does not mean that every manuscript has exactly the same verse at exactly the same number. Northern and southern textual traditions preserve differences, and critical editors try to reconstruct an older recoverable form by comparing witnesses rather than choosing one late manuscript as the original.${C(2)}</p>
            <p>The epic’s relation to Purāṇic literature is also close. Hazra’s scholarship is mainly about the Purāṇas, not about establishing the Mahābhārata text, but it is useful for the broader history in which Itihāsa and Purāṇa overlap as repositories of genealogy, myth, rites and traditional memory. That is the limited reason Hazra belongs in this page’s source stack.${C(9)}</p>
          </section>

          <section class="kena-section" id="mbh-dharma">
            <h2>Dharma, religion and political thought</h2>
            <p>The Mahābhārata is often most human when nobody can simply point to a rulebook. Bhīṣma’s vow is admirable and catastrophic; Yudhiṣṭhira’s commitment to truth does not prevent the dice disaster; Karṇa’s loyalty to Duryodhana is noble at the level of friendship and disastrous at the level of justice; Arjuna’s refusal to fight looks compassionate and yet abandons obligations he has already accepted. The epic makes <i>dharma</i> difficult by forcing legitimate duties to collide.${C(1,4)}</p>
            <p>Its religious language is equally broad. Kṛṣṇa is central, especially in the Bhagavad Gītā and later Vaiṣṇava material, but the work also preserves Vedic sacrifice, ascetic ideals, stories of Śiva and other deities, yoga, renunciation, gifts, pilgrimage and many local traditions. A single label such as “a Vaiṣṇava book” or “a law book” cannot describe the whole received epic.${C(1)}</p>
          </section>

          <section class="kena-section" id="mbh-reception">
            <h2>Reception and continuing life</h2>
            <p>The epic has never belonged only to Sanskrit manuscript culture. Stories from it were turned into plays, retellings and regional-language epics; Wikipedia notes early and medieval Tamil adaptations as well as Sanskrit dramatic works based on episodes such as Duryodhana’s fall and Śakuntalā’s story. Its characters also became subjects of painting, temple narrative, performance, television and modern literature.${C(1)}</p>
            <p>Hindupedia’s own Mahābhārata entry is much shorter than Wikipedia’s, but its very placement of the text inside a Hindu encyclopedia reflects another fact about the work’s life: it remains read not just as ancient literature but as a living source of religious memory, moral reflection and family narrative.${C(8)}</p>
          </section>`;
      }
    },

    'Rāmāyaṇa': {
      title: 'Rāmāyaṇa',
      sanskrit: 'रामायणम्',
      author: 'Traditionally Vālmīki',
      language: 'Sanskrit',
      extent: 'About 24,000 ślokas, roughly 500 sargas, 7 kāṇḍas in the received text',
      date: 'Layered composition; Wikipedia summarizes scholarly estimates from the mid-first millennium BCE with later additions into the early centuries CE',
      notes: [
        {title:'Wikipedia — Ramayana', detail:'Main article. Used for the overview, 24,000-verse scale, seven-kāṇḍa structure, dating, recensions, synopsis and later influence.', url:'https://en.wikipedia.org/wiki/Ramayana'},
        {title:'Wikipedia — Ramayana, “Dating”', detail:'Used for the broad dating discussion and the view that books 2–6 form the older core while Bāla and Uttara are later.', url:'https://en.wikipedia.org/wiki/Ramayana#Dating'},
        {title:'Wikipedia — Ramayana, “Recensions”', detail:'Used for the northern and southern recensions and the discussion of Bāla and Uttara Kāṇḍas.', url:'https://en.wikipedia.org/wiki/Ramayana#Recensions'},
        {title:'Wikipedia — Ramayana, “Synopsis”', detail:'Used for the continuous narrative of the seven kāṇḍas.', url:'https://en.wikipedia.org/wiki/Ramayana#Synopsis'},
        {title:'Wikipedia — Versions of the Ramayana', detail:'Used for the enormous later life of the Rāma story across South and Southeast Asian languages and religious traditions.', url:'https://en.wikipedia.org/wiki/Versions_of_the_Ramayana'},
        {title:'Hindupedia — Ramayana', detail:'Used for the traditional Hindu presentation of Vālmīki’s epic, the six-book core plus Uttara discussion, and the devotional framing of Rāma as an exemplary human being.', url:'https://www.hindupedia.com/en/ramayana'},
        {title:'Hindupedia — Valmiki Ramayanam, Part I', detail:'Long Hindupedia-hosted translation and introduction. Used as a traditional narrative witness for Bāla, Ayodhyā and Araṇya material.', url:'https://www.hindupedia.com/images/e/e2/Vamiki_Ramayanam_I.pdf'},
        {title:'Hindupedia — Sundara Kanda', detail:'Used for the traditional importance of Sundara Kāṇḍa, its focus on Hanumān’s crossing to Laṅkā, discovery of Sītā and burning of Laṅkā, and its independent recitation culture.', url:'https://hindupedia.com/en/Sundara_Kanda'},
        {title:'R. C. Hazra — Studies in the Purāṇic Records on Hindu Rites and Customs', detail:'Hazra is used only for the broader Itihāsa–Purāṇa relationship. His specialist work is Purāṇic; it is not used here to override the Rāmāyaṇa’s own textual history.', url:'https://www.griet.ac.in/images/rare/Studies%20in%20the%20Puranic%20Records%20on%20Hindu%20Rites%20and%20Customs.pdf'}
      ],
      body: article => {
        const C = (...nums) => nums.map(n => `<sup class="itihasa-cite"><button type="button" data-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
        return `
          <div class="kena-lead itihasa-lead">
            <p>The <i>Rāmāyaṇa</i>, traditionally attributed to Vālmīki, is the other great Sanskrit <i>Itihāsa</i>. Its received text contains about 24,000 couplet-verses divided into seven <i>kāṇḍas</i> and roughly five hundred <i>sargas</i>. The central story is easy to state—Rāma loses the throne, goes into exile, Sītā is abducted by Rāvaṇa, Hanumān finds her, Laṅkā is invaded and Rāma returns—but the epic spends thousands of verses turning that outline into a meditation on kingship, marriage, loyalty, grief, violence, exile and the difficulty of living up to an ideal.${C(1)}</p>
            <p>Hindupedia calls the work the <i>Ādi Kāvya</i>, the “first poem,” and presents Rāma as an exemplary human being whose life becomes a model of conduct.${C(6)} Wikipedia’s presentation is more historical-critical: it treats the text as layered, notes strong differences between regional recensions and summarizes a widespread scholarly view that books two through six are older than the Bāla and Uttara books.${C(2,3)}</p>
            <p>Those two perspectives are not mutually exclusive. The traditional question is what Rāma’s life means; the textual-historical question is how the Sanskrit epic reached the form in which readers now encounter it. A useful encyclopedia page should let the reader see both without pretending they are the same question.</p>
          </div>

          <nav class="kena-toc itihasa-toc" aria-label="Contents">
            <div class="kena-toc-title">Contents</div>
            <ol>
              <li><a href="#ram-name">Name, poet and shape of the text</a></li>
              <li><a href="#ram-bala">Bāla Kāṇḍa</a></li>
              <li><a href="#ram-ayodhya">Ayodhyā Kāṇḍa</a></li>
              <li><a href="#ram-aranya">Araṇya Kāṇḍa</a></li>
              <li><a href="#ram-kishkindha">Kiṣkindhā Kāṇḍa</a></li>
              <li><a href="#ram-sundara">Sundara Kāṇḍa</a></li>
              <li><a href="#ram-yuddha">Yuddha Kāṇḍa</a></li>
              <li><a href="#ram-uttara">Uttara Kāṇḍa</a></li>
              <li><a href="#ram-text">Date, recensions and textual growth</a></li>
              <li><a href="#ram-meaning">Rāma, dharma and the human drama</a></li>
              <li><a href="#ram-afterlife">Versions and later life</a></li>
              <li><a href="#itihasa-notes">Sources</a></li>
            </ol>
          </nav>

          <section class="kena-section" id="ram-name">
            <h2>Name, poet and shape of the text</h2>
            <p>The title <i>Rāmāyaṇa</i> is conventionally understood as “Rāma’s journey.” The poem itself makes Vālmīki part of its own story. At the beginning he asks Nārada whether there is a man who combines virtue, courage, truth, self-command and compassion; Nārada answers with Rāma. Vālmīki later teaches the poem to Lava and Kuśa, who eventually sing it before Rāma himself.${C(1,4)}</p>
            <p>In the received form there are seven kāṇḍas: Bāla, Ayodhyā, Araṇya, Kiṣkindhā, Sundara, Yuddha and Uttara. A <i>kāṇḍa</i> here is simply a major book of the epic, and each contains many smaller chapters called <i>sargas</i>. Wikipedia gives the overall scale as about 24,000 ślokas and about five hundred sargas.${C(1)}</p>
          </section>

          <section class="kena-section" id="ram-bala">
            <h2>Bāla Kāṇḍa</h2>
            <p>The opening book gives the poem’s own origin story and then the births and youth of Rāma and his brothers. Daśaratha, king of Ayodhyā, has no heir and performs a sacrifice for sons. Rāma is born to Kausalyā, Bharata to Kaikeyī, and Lakṣmaṇa and Śatrughna to Sumitrā. The divine plot is already present: the gods seek relief from Rāvaṇa, and Viṣṇu is born in human form as Rāma.${C(4)}</p>
            <p>When the sage Viśvāmitra asks Daśaratha for help protecting sacrifice from hostile beings, the young Rāma leaves the protected court and enters a wider sacred geography. He receives weapons and instruction, kills Tāṭakā, and travels to Mithilā. There King Janaka possesses the great bow associated with Śiva; Rāma strings and breaks it, thereby winning Sītā. The marriages of the four brothers follow.${C(4,7)}</p>
            <p>This book also contains large amounts of genealogy, myth and sacred geography. That abundance is one reason textual historians often distinguish Bāla from the narrative core that follows, although it remains inseparable from the received Rāmāyaṇa known to most readers.${C(2,3)}</p>
          </section>

          <section class="kena-section" id="ram-ayodhya">
            <h2>Ayodhyā Kāṇḍa</h2>
            <p>The second book turns a coronation into a catastrophe. Daśaratha decides to install Rāma as heir. Kaikeyī initially welcomes the news, but Mantharā persuades her to claim two old boons: Bharata must receive the kingdom and Rāma must go into the forest for fourteen years. Daśaratha is devastated, but Rāma accepts the command rather than force his father to break his word.${C(4,6)}</p>
            <p>Sītā refuses to remain behind; Lakṣmaṇa joins them. Their departure is one of the epic’s great scenes of public grief. Daśaratha dies after Rāma leaves. Bharata, returning to learn what has happened, rejects the fruit of his mother’s demand and goes to the forest to bring Rāma back. Rāma refuses to violate the exile, so Bharata takes Rāma’s sandals and governs as regent until his brother’s return.${C(4,6,7)}</p>
            <p>The book is therefore not just “Rāma obeys his father.” Nearly every major figure is caught between obligations: Daśaratha between promise and love, Bharata between inheritance and justice, Sītā between palace safety and marriage, and Rāma between personal loss and fidelity to a public standard of truth.</p>
          </section>

          <section class="kena-section" id="ram-aranya">
            <h2>Araṇya Kāṇḍa</h2>
            <p>The forest book darkens the story. Rāma, Sītā and Lakṣmaṇa move through hermitages and wilderness, meeting sages and dangerous beings. They eventually settle at Pañcavaṭī. There Śūrpaṇakhā approaches Rāma and then Lakṣmaṇa; the encounter ends with her mutilation and leads to the battle in which Rāma kills Khara, Dūṣaṇa and their forces.${C(4,6)}</p>
            <p>Rāvaṇa is drawn into the conflict through Śūrpaṇakhā and Mārīca. Mārīca takes the form of a golden deer, luring Rāma away. The deception separates the three exiles long enough for Rāvaṇa to seize Sītā. Jatāyu attempts to stop him and is mortally wounded. The rest of the book follows Rāma and Lakṣmaṇa’s desperate search and their movement toward the allies who will make the Laṅkā campaign possible.${C(4,7)}</p>
          </section>

          <section class="kena-section" id="ram-kishkindha">
            <h2>Kiṣkindhā Kāṇḍa</h2>
            <p>The search for Sītā brings Rāma into the political conflict of the vānaras. Hanumān first approaches Rāma and Lakṣmaṇa and becomes the indispensable mediator between them and Sugrīva. Sugrīva has been driven from power by his brother Vāli; Rāma agrees to restore him in exchange for help finding Sītā.${C(4,6)}</p>
            <p>Rāma kills Vāli from concealment, one of the epic’s most debated acts. Vāli challenges the justice of Rāma’s intervention, forcing the poem itself to argue about royal jurisdiction, punishment and the obligations of allies. Sugrīva is restored, and search parties are sent in all directions. The southern party eventually learns that Sītā is in Laṅkā, setting up Hanumān’s leap across the sea.${C(4)}</p>
          </section>

          <section class="kena-section" id="ram-sundara">
            <h2>Sundara Kāṇḍa</h2>
            <p>Sundara Kāṇḍa shifts the center of action to Hanumān. He crosses the ocean, enters Laṅkā, searches through the city and finally finds Sītā in the Aśoka grove. He identifies himself through Rāma’s ring, gives Sītā hope and receives a token to carry back. The emotional force of the book comes from the fact that this is the first reliable contact between Sītā and Rāma’s side since the abduction.${C(4,8)}</p>
            <p>Hanumān then deliberately turns reconnaissance into disruption. He destroys parts of the grove, fights Rāvaṇa’s forces, allows himself to be captured, confronts Rāvaṇa and escapes after his tail is set on fire, burning much of Laṅkā before returning across the sea. Hindupedia treats Sundara Kāṇḍa as a text with its own recitation culture and notes its special devotional importance for Hanumān worship.${C(8)}</p>
          </section>

          <section class="kena-section" id="ram-yuddha">
            <h2>Yuddha Kāṇḍa</h2>
            <p>The sixth book is the war for Laṅkā. Vibhīṣaṇa leaves Rāvaṇa and seeks refuge with Rāma. The vānaras cross the sea by means of the bridge to Laṅkā, and a long series of duels kills many of the major rākṣasa and vānara warriors. Kumbhakarṇa falls; Indrajit uses deception and extraordinary weapons before he too is killed; finally Rāma and Rāvaṇa confront one another.${C(4)}</p>
            <p>Rāvaṇa’s death does not immediately solve the story’s moral tension. Sītā must face public suspicion concerning her captivity, and the fire ordeal becomes part of the received narrative of reunion. Rāma, Sītā and their allies then return to Ayodhyā, where Bharata restores the kingdom and Rāma is crowned.${C(4)}</p>
          </section>

          <section class="kena-section" id="ram-uttara">
            <h2>Uttara Kāṇḍa</h2>
            <p>Uttara Kāṇḍa functions as both prehistory and aftermath. It supplies long accounts of Rāvaṇa and his lineage, explains earlier events and then continues beyond the coronation. Public gossip concerning Sītā leads Rāma to send her away while she is pregnant. She finds refuge in Vālmīki’s hermitage and gives birth to Lava and Kuśa, who later recite the Rāmāyaṇa before Rāma.${C(4)}</p>
            <p>This is also the book whose textual status is most debated. Wikipedia’s summary states that many scholars regard Uttara as later than books two through six; its recensional section also notes the long-running argument over whether Bāla and especially Uttara belong to the oldest recoverable form of the poem.${C(2,3)} Hindupedia goes further and presents Uttara as outside Vālmīki’s original six-book epic.${C(6)} The page should show that disagreement rather than quietly treating one modern position as undisputed fact.</p>
          </section>

          <section class="kena-section" id="ram-text">
            <h2>Date, recensions and textual growth</h2>
            <p>No secure single composition date exists. Wikipedia summarizes scholarly estimates for the primary stage across the middle of the first millennium BCE and notes later growth continuing into the early centuries CE. It also says that books two through six are generally regarded as the older portion of the poem, with Bāla and Uttara later.${C(2)}</p>
            <p>The manuscript tradition divides most importantly into northern and southern recensions, each with further subtraditions. Wikipedia describes them as deriving from a common older oral source but developing substantial verbal differences before being fixed in writing. That means a reader comparing Sanskrit editions can encounter differences in wording, passage order and presence or absence of material without either edition necessarily being “fake.”${C(3)}</p>
            <p>Hazra is not being used here as a substitute Rāmāyaṇa editor. His value is narrower: his Purāṇic work helps explain the literary world in which Itihāsa and Purāṇa repeatedly borrow, retell and expand shared stories, rituals and genealogies. Later Rāma narratives inside Purāṇas belong to that afterlife, not automatically to the oldest Vālmīki text.${C(9)}</p>
          </section>

          <section class="kena-section" id="ram-meaning">
            <h2>Rāma, dharma and the human drama</h2>
            <p>Hindupedia’s traditional presentation repeatedly emphasizes Rāma as the ideal human being, and that is one of the strongest ways the text has been read within Hindu culture.${C(6)} Yet the epic is compelling precisely because the ideal is costly. Rāma’s obedience destroys Daśaratha; Bharata’s righteousness requires him to rule a kingdom he does not want; Sītā repeatedly has to insist on her own understanding of marital duty; Lakṣmaṇa’s loyalty demands exile and war; and Hanumān’s devotion becomes practical intelligence rather than passive reverence.</p>
            <p>The poem also allows its heroes to be questioned. Vāli challenges Rāma’s manner of killing him. Sītā rebukes Rāma at crucial moments. The later exile of Sītā has generated centuries of discomfort, defense and reinterpretation. Treating the Rāmāyaṇa as nothing but a list of “ideal characters” misses the dramatic force created when those ideals come into conflict.</p>
          </section>

          <section class="kena-section" id="ram-afterlife">
            <h2>Versions and later life</h2>
            <p>The Sanskrit Rāmāyaṇa became the starting point for an enormous family of retellings rather than a single frozen global script. Wikipedia’s “Versions of the Ramayana” page notes traditions across South Asia and Southeast Asia, including Hindu, Buddhist and Jain adaptations. Different works alter theology, character emphasis, episodes and even endings while still presenting themselves as tellings of the Rāma story.${C(5)}</p>
            <p>This is why “the Rāmāyaṇa says…” often needs a second question: which Rāmāyaṇa? Vālmīki’s Sanskrit epic, Tulsīdās’s <i>Rāmcaritmānas</i>, Kampaṉ’s Tamil <i>Irāmāvatāram</i>, an Adhyātma version, a Jain retelling or a Southeast Asian court epic may share the main story while differing profoundly in detail and theology.${C(5)}</p>
            <p>Hindupedia’s material also shows how individual books acquired their own devotional lives. Sundara Kāṇḍa, for example, is widely read independently and is especially associated with Hanumān. The afterlife of the epic therefore exists not only in complete retellings but in selective recitation of particular episodes.${C(8)}</p>
          </section>`;
      }
    }
  };

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let shade = null;
  let reader = null;
  let sourceCard = null;

  function close() {
    sourceCard?.remove(); sourceCard = null;
    shade?.remove(); reader?.remove(); shade = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed','false'); });
  }

  function showSource(article, n) {
    const note = article.notes[n - 1];
    if (!note) return;
    sourceCard?.remove();
    sourceCard = document.createElement('aside');
    sourceCard.className = 'itihasa-source-card';
    sourceCard.innerHTML = `<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(note.title)}</strong><p>${esc(note.detail)}</p>${note.url ? `<a href="${esc(note.url)}" target="_blank" rel="noopener">Open source</a>` : ''}`;
    document.body.appendChild(sourceCard);
    sourceCard.querySelector('.itihasa-source-close')?.addEventListener('click', () => { sourceCard?.remove(); sourceCard = null; });
  }

  function notesHtml(article) {
    return `<section class="kena-section kena-references" id="itihasa-notes"><h2>Sources</h2><ol>${article.notes.map((n,i) => `<li><button class="itihasa-note-link" type="button" data-note="${i+1}">${i+1}</button> <b>${esc(n.title)}</b> — ${esc(n.detail)}</li>`).join('')}</ol></section>`;
  }

  function openHuman(button, name, article) {
    close();
    button.classList.add('is-active');
    button.setAttribute('aria-pressed','true');
    shade = document.createElement('div');
    shade.className = 'kena-article-backdrop scripture-wiki-backdrop';
    reader = document.createElement('section');
    reader.className = 'kena-article-reader scripture-wiki-reader itihasa-human-reader';
    reader.setAttribute('role','dialog');
    reader.setAttribute('aria-modal','true');
    reader.setAttribute('aria-label',`${name} article`);
    reader.innerHTML = `<header class="kena-article-head"><div><span class="eyebrow">Itihāsa encyclopedia</span><h1>${esc(article.title)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article itihasa-human-article"><aside class="kena-infobox"><div class="kena-infobox-title">${esc(article.title)}</div><div class="kena-info-row"><b>Sanskrit</b><span>${esc(article.sanskrit)}</span></div><div class="kena-info-row"><b>Traditional author</b><span>${esc(article.author)}</span></div><div class="kena-info-row"><b>Language</b><span>${esc(article.language)}</span></div><div class="kena-info-row"><b>Extent</b><span>${esc(article.extent)}</span></div><div class="kena-info-row"><b>Date</b><span>${esc(article.date)}</span></div></aside>${article.body(article)}${notesHtml(article)}</article></div>`;
    document.body.append(shade, reader);
    document.documentElement.classList.add('kena-article-open');

    reader.addEventListener('click', e => {
      const cite = e.target.closest('.itihasa-cite button, .itihasa-note-link');
      if (cite) { e.preventDefault(); e.stopPropagation(); showSource(article, Number(cite.dataset.note)); return; }
      if (e.target.closest('.kena-article-close')) close();
    });
    shade.addEventListener('click', close);
    return true;
  }

  function injectStyle() {
    if (document.getElementById('itihasa-human-v2-style')) return;
    const style = document.createElement('style');
    style.id = 'itihasa-human-v2-style';
    style.textContent = `
      .itihasa-human-article .kena-section p{max-width:900px;font-size:16px;line-height:1.76}.itihasa-human-article .kena-section h3{margin-top:28px!important}.itihasa-human-article .kena-lead p{max-width:780px}.itihasa-cite{font:inherit;vertical-align:super;margin-left:1px}.itihasa-cite button,.itihasa-note-link{border:0;background:transparent;color:#36c;padding:0 1px;font:600 11px/1 Arial,sans-serif;cursor:pointer}.itihasa-cite button:hover,.itihasa-note-link:hover{text-decoration:underline}.itihasa-source-card{position:fixed;z-index:13050;right:22px;bottom:22px;width:min(430px,calc(100vw - 32px));padding:17px 18px 16px;border:1px solid #a2a9b1;border-radius:4px;background:#fff;box-shadow:0 12px 38px rgba(0,0,0,.24);color:#202122;font-family:Arial,sans-serif}.itihasa-source-card strong{display:block;padding-right:30px;font-size:15px;line-height:1.35}.itihasa-source-card p{margin:8px 0 10px;font-size:13.5px;line-height:1.55}.itihasa-source-card a{color:#36c;font-size:13px}.itihasa-source-num{margin-bottom:5px;color:#54595d;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}.itihasa-source-close{position:absolute;right:8px;top:7px;border:0;background:transparent;font-size:23px;cursor:pointer;color:#54595d}.itihasa-human-article .kena-references li{margin-bottom:12px}.itihasa-human-article .kena-references .itihasa-note-link{font-size:12px}@media(max-width:700px){.itihasa-source-card{right:12px;bottom:12px;width:calc(100vw - 24px)}.itihasa-human-article .kena-section p{font-size:15.8px;line-height:1.72}}
    `;
    document.head.appendChild(style);
  }

  injectStyle();
  window.openScriptureEncyclopedia = function(button) {
    const name = button?.dataset?.name || button?.querySelector?.('span')?.textContent?.trim();
    const kind = button?.dataset?.kind || '';
    if (kind === 'Itihāsa' && ARTICLES[name]) return openHuman(button, name, ARTICLES[name]);
    return typeof fallbackOpen === 'function' ? fallbackOpen(button) : false;
  };
})();
