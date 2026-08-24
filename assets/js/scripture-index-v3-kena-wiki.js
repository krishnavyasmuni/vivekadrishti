(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const C = (...nums) => `<sup class="kena-cite">${nums.map(n => `<a href="#kena-ref-${n}">[${n}]</a>`).join('')}</sup>`;
  const P = html => `<p>${html}</p>`;
  const V = (ref, sa, en) => `<blockquote class="kena-quote kena-text-quote"><span class="kena-quote-ref">${ref}</span><span class="kena-quote-sa" lang="sa">${sa}</span><span class="kena-quote-en">${en}</span></blockquote>`;

  const refs = [
    ['Patrick Olivelle', '<i>The Early Upaniṣads: Annotated Text and Translation</i> (Oxford University Press, 1998), Kena Upaniṣad, pp. 363–371 and textual notes.', 'https://academic.oup.com/book/50014/chapter-abstract/422709268'],
    ['Hanns Oertel', '“The Jāiminīya or Talavakāra Upaniṣad Brāhmaṇa: Text, Translation, and Notes,” <i>Journal of the American Oriental Society</i> 16 (1896), 79–260.', 'https://books.google.com/books?id=83u7DjpBtmsC'],
    ['The Sanskrit Library', '<i>Jaiminīya-Upaniṣad-Brāhmaṇa</i>, electronic text; the Kena corresponds to JUB 4.18–21 in the standard modern citation.', 'https://sanskritlibrary.org/catalogsText/titus/vedic/jub.html'],
    ['F. Max Müller', '<i>The Upanishads, Part I</i>, Sacred Books of the East 1 (Oxford, 1879), introduction to the Talavakāra/Kena and translation.', 'https://sacred-texts.com/hin/sbe01/sbe01018.htm'],
    ['Paul Deussen', '<i>Sechzig Upanishad’s des Veda</i> (1897) and <i>The Philosophy of the Upanishads</i>, trans. A. S. Geden (1906), on chronology and literary strata.', 'https://books.google.com/books?id=jPoyAQAAMAAJ'],
    ['S. Sitarama Sastri', '<i>Kena Upanishad with Sri Sankara’s Commentary</i> (Madras, 1905 and later printings), public-domain English rendering of Śaṅkara’s bhāṣya.', 'https://shlokam.org/text/kenopanishad.htm'],
    ['Sengaku Mayeda', '“On Śaṅkara’s Authorship of the Kenopaniṣadbhāṣya,” <i>Indo-Iranian Journal</i> 10.1 (1967), 33–55.', 'https://doi.org/10.1007/s11407-020-09279-z'],
    ['Śrīśa Chandra Vasu', '<i>The Kena Upanishad with the Commentary of Sri Madhvacharya</i> (Allahabad, 1909).', 'https://www.wisdomlib.org/hinduism/book/kena-upanishad-madhva-commentary'],
    ['David Kinsley', '<i>Hindu Goddesses: Visions of the Divine Feminine in the Hindu Religious Tradition</i> (University of California Press, 1986), discussion of Umā Haimavatī.', ''],
    ['Vedic Heritage Portal', 'Jaiminīyopaniṣad Brāhmaṇa: description of the Jaiminīya/Talavakāra Sāmaveda tradition and the four-adhyāya text.', 'https://vedicheritage.gov.in/brahmanas/jaiminiya-upanishad-brahmana/'],
    ['Bāla Śāstrī Āgaśe, ed.', '<i>Kenopaniṣad</i> with the Padabhāṣya and Vākyabhāṣya attributed to Śaṅkara and later glosses, Ānandāśrama Sanskrit Series 6 (1896; later eds.).', ''],
    ['K. C. Varadachari and D. T. Tatacharya, eds.', '<i>Kenopanishad-Bhashya by Sri Rangaramanuja</i>, Sri Venkatesvara Oriental Series 8 (Tirupati, 1945), critically edited with English translation and textual notes.', 'https://sa.wikisource.org/wiki/%E0%A4%95%E0%A5%87%E0%A4%A8%E0%A5%8B%E0%A4%AA%E0%A4%A8%E0%A4%BF%E0%A4%B7%E0%A4%A6%E0%A5%8D%E0%A4%AD%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%AF%E0%A4%AE%E0%A5%8D_(%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%B0%E0%A4%99%E0%A5%8D%E0%A4%97%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A5%81%E0%A4%9C%E0%A4%AE%E0%A5%81%E0%A4%A8%E0%A4%BF%E0%A4%B5%E0%A4%BF%E0%A4%B0%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A4%AE%E0%A5%8D)'],
    ['R. D. Ranade', '<i>A Constructive Survey of Upanishadic Philosophy</i> (Poona, 1926), comparative chronology and philosophical classification.', 'https://en.wikisource.org/wiki/Index:A_Constructive_Survey_of_Upanishadic_Philosophy.pdf'],
    ['Moriz Winternitz', '<i>A History of Indian Literature</i>, vol. 1, discussion of the older Upaniṣads and their relative chronology.', ''],
    ['Robert Ernest Hume', '<i>The Thirteen Principal Upanishads</i> (Oxford University Press, 1921), Kena Upaniṣad.', 'https://openlibrary.org/books/OL6639499M/The_thirteen_principal_Upanishads'],
    ['S. Radhakrishnan', '<i>The Principal Upanishads</i> (1953), Kena Upaniṣad and notes.', ''],
    ['Sri Aurobindo', '<i>Kena and Other Upanishads</i>, Complete Works of Sri Aurobindo, vol. 18; translation and extended interpretation of Kena.', 'https://sri-aurobindo.co.in/workings/sa/12/kena_18_e.pdf'],
    ['Rammohun Roy', '<i>Translation of the Céna Upanishad</i> (Calcutta: Hindoostanee Press, 1816), with appeal to Śaṅkara’s gloss.', 'https://books.google.com/books?id=9ygwAAAAYAAJ&output=html_text'],
    ['SanskritDocuments', 'Kenopaniṣat: electronic Sanskrit text, with Devanāgarī and transliteration resources.', 'https://sanskritdocuments.org/doc_upanishhat/kena.html'],
    ['Masato Fujii', 'Studies of the Jaiminīya Upaniṣad Brāhmaṇa and the Jaiminīya tradition; see especially discussion of JUB/Kena transmission and Sāmavedic context.', 'https://repository.kulib.kyoto-u.ac.jp/dspace/bitstream/2433/139387/1/42_1.pdf']
  ];

  function referencesHtml() {
    return `<section class="kena-section kena-references" id="kena-references"><h2>References</h2><ol>${refs.map((r, i) => {
      const link = r[2] ? ` <a href="${r[2]}" target="_blank" rel="noopener">online</a>` : '';
      return `<li id="kena-ref-${i + 1}"><b>${r[0]}.</b> ${r[1]}${link}</li>`;
    }).join('')}</ol></section>`;
  }

  function articleBodyHtml() {
    return `
      <section class="kena-section" id="kena-etymology">
        <h2>Etymology and titles</h2>
        ${P(`The familiar name <i>Kena</i> comes from the opening word <i>kena</i> (केन), the instrumental singular of the interrogative pronoun <i>kim</i>. In context it asks “by whom?”, “by what?” or “through what agency?”. The title therefore does not preserve an author’s name or a doctrinal label: like the title <i>Īśā</i>, it is an incipit-name taken from the first word of the received text.${C(1,4,19)}`)}
        ${V('Kena 1.1', 'केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः ।<br>केनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति ॥', '“By whom impelled does the mind go forth? By whom yoked does the foremost breath move? By whom directed is speech uttered—and what deity joins sight and hearing to their work?”')}
        ${P(`Its older school-title, <i>Talavakāra Upaniṣad</i>, is historically more revealing. The text belongs to the Jaiminīya or Talavakāra branch of the Sāmaveda and is embedded in the <i>Jaiminīya Upaniṣad-Brāhmaṇa</i>. In the modern citation system based on Oertel’s edition, the Kena occupies JUB 4.18–21. The title “Kenopaniṣad” simply compounds <i>Kena</i> and <i>Upaniṣad</i>; “Talavakāra” remembers the Vedic school from which the text emerged.${C(2,3,10,20)}`)}
        ${P(`This school setting matters because the Upaniṣad is not an isolated philosophical pamphlet. The surrounding JUB belongs to a Sāmavedic environment deeply concerned with <i>sāman</i> chants, sacred sound, ritual correspondences, prāṇa and speculative identifications. Kena’s language of the hidden power behind speech, breath and hearing is therefore at once philosophical and continuous with a much older Vedic habit of asking what unseen principle makes ritual and cosmic powers effective.${C(2,3,10,20)}`)}
      </section>

      <section class="kena-section" id="kena-history">
        <h2>Chronology and textual history</h2>
        ${P(`No manuscript colophon, named historical author or external inscription gives Kena a secure absolute date. Modern dates are therefore reconstructed from relative evidence: language, metre, prose style, comparison with other Upaniṣads, and assumptions about the development of Vedic speculation. For that reason, apparently precise dates should be read as scholarly models rather than as fixed facts.${C(1,5,13,14)}`)}
        ${P(`Paul Deussen treated Kena as a border-text between the oldest prose Upaniṣads and the later metrical Upaniṣads. He regarded the prose myth of the yakṣa as older than the metrical first half, an influential proposal because the last two khaṇḍas are stylistically close to Brāhmaṇa prose while the first two condense their argument into verse. R. D. Ranade and Moriz Winternitz likewise placed Kena among the early Upaniṣads, though their internal orderings differ. Patrick Olivelle uses a different relative chronology: he treats Kena as the earliest of the verse Upaniṣads and places the verse group broadly in the last few centuries BCE. These schemes agree more on Kena’s antiquity than on an exact year or on which half came first.${C(1,5,13,14)}`)}
        <div class="kena-wiki-table-wrap"><table class="kena-wiki-table"><thead><tr><th>Scholar</th><th>Relative placement</th><th>What the dating rests on</th></tr></thead><tbody>
          <tr><td>Deussen</td><td>Border between ancient prose and later verse Upaniṣads</td><td>Literary form and a proposed prose-before-verse stratification</td></tr>
          <tr><td>Ranade</td><td>Early principal Upaniṣadic group</td><td>Comparative development of philosophical ideas</td></tr>
          <tr><td>Winternitz</td><td>Pre-Buddhist / pre-Jaina stratum</td><td>Literary-historical comparison</td></tr>
          <tr><td>Olivelle</td><td>Earliest member of the early verse-Upaniṣad group in his sequence</td><td>Language, textual form and comparative chronology</td></tr>
        </tbody></table></div>
        ${P(`The modern history of the text is unusually instructive. Śaṅkara’s introduction describes Kena as belonging to a Talavakāra Brāhmaṇa and places it at the beginning of a ninth <i>adhyāya</i>. Nineteenth-century scholars did not initially possess a complete printed Talavakāra text and sometimes doubted the accuracy of that notice. A. C. Burnell’s South Indian manuscript report, communicated to Max Müller in 1878–79, confirmed that a closely corresponding Sāmavedic Brāhmaṇa did exist, although its local division did not match Śaṅkara’s chapter numbering exactly. Müller highlighted this discovery in his 1879 translation.${C(4)}`)}
        ${P(`Hanns Oertel’s 1896 edition and translation of the Jaiminīya/Talavakāra Upaniṣad-Brāhmaṇa was a major step because it made it possible to study Kena in its wider textual environment. Modern JUB scholarship, especially the work of Masato Fujii, has further emphasized that the whole JUB continued to have a distinct life in the Jaiminīya Sāmavedic tradition even though Vedānta selected only JUB 4.18–21 as the canonical Kena Upaniṣad. The history of Kena is thus also a history of extraction: a small unit of a larger school text came to circulate independently and became one of the principal Upaniṣads.${C(2,3,20)}`)}
      </section>

      <section class="kena-section" id="kena-structure-wiki">
        <h2>Structure and manuscript form</h2>
        ${P(`The received text has four <i>khaṇḍas</i>. In the numbering familiar from many modern editions, the first contains eight metrical verses and the second five, for thirteen metrical verses in total. The third and fourth khaṇḍas are predominantly prose. The third narrates the gods’ encounter with the yakṣa; the fourth concludes the narrative with Umā’s disclosure and then adds brief teachings on Brahman, meditation, discipline and the fruit of knowledge.${C(1,4,15)}`)}
        <div class="kena-structure kena-wiki-structure">
          <div class="kena-structure-row"><b>1st khaṇḍa</b><span>8 metrical verses: the power behind mind, speech, breath, sight and hearing.</span></div>
          <div class="kena-structure-row"><b>2nd khaṇḍa</b><span>5 metrical verses in common numbering: knowing and not-knowing Brahman; <i>pratibodhaviditam</i>; immortality.</span></div>
          <div class="kena-structure-row"><b>3rd khaṇḍa</b><span>Prose narrative: victory of the gods, appearance of the yakṣa, and the failure of Agni and Vāyu.</span></div>
          <div class="kena-structure-row"><b>4th khaṇḍa</b><span>Prose conclusion: Indra, Umā Haimavatī, lightning and mind analogies, <i>Tadvana</i>, and the epilogue.</span></div>
        </div>
        ${P(`The apparent simplicity of this scheme hides real editorial problems. Verse and prose units are not segmented identically in every printed edition. Olivelle’s notes record variant readings and punctuation inherited from Oertel, JUB manuscripts and later Vedāntic editions. The critical edition of Raṅgarāmānuja’s Kena bhāṣya likewise lists differences such as <i>dahram/dabhram/daharam</i> in 2.1 and divergent readings in the prose khaṇḍas. It also notes that some editions combine units which others print separately. Consequently, “the Kena has X verses” can mean either thirteen metrical verses or a larger count in which prose paragraphs are numbered as mantras.${C(1,12)}`)}
        ${P(`The relationship between the two halves is itself a textual question. The first two khaṇḍas present Brahman in abstract, paradoxical language; the last two dramatize dependence upon Brahman through a mythic episode. Deussen interpreted the contrast diachronically, as evidence of different strata. Other readers emphasize literary complementarity: the prose story can be read as a narrative demonstration of the same principle taught in the verses—namely, that speech, mind, senses and even gods possess no autonomous power.${C(1,5,17)}`)}
        ${P(`The safest scholarly citation practice is therefore to identify the khaṇḍa and local verse or prose unit, and, when textual criticism matters, to name the edition. A reference such as “Kena 2.1” may still conceal a variant reading; a reference such as “JUB 4.19” places the same material inside the larger Sāmavedic book. Both systems are useful, but they answer different historical questions.${C(1,2,12)}`)}
      </section>

      <section class="kena-section" id="kena-contents">
        <h2>Contents</h2>
        <h3 id="kena-khanda-1">First khaṇḍa — the power behind cognition</h3>
        ${P(`The opening khaṇḍa is structured around a reversal. A pupil asks for the agent behind the familiar agents: who sends the mind toward its objects, who sets the breath in motion, who enables speech, and what deity joins eye and ear to their functions? The teacher refuses to answer by naming one more finite power. Instead Brahman is described as “the ear of the ear,” “the mind of the mind,” “the speech of speech,” “the breath of breath,” and “the eye of the eye.” The expression shifts the inquiry from the objects known by consciousness to the condition that makes knowing possible.${C(1,4,6,15)}`)}
        ${V('Kena 1.2', 'श्रोत्रस्य श्रोत्रं मनसो मनो यद् वाचो ह वाचं स उ प्राणस्य प्राणः ।<br>चक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥', '“The hearing of hearing, the mind of mind, the speech of speech, the breath of breath, and the sight of sight”—the wise, released from identification with the finite faculties, become immortal.')}
        ${P(`Verses 1.3–1.8 repeatedly deny that Brahman can be reduced to what is seen, heard, spoken, thought or breathed. Yet the denial is not simple agnosticism: the same verses immediately affirm that sight, hearing, speech, mind and breath operate <i>through</i> Brahman. This double movement—Brahman is not an ordinary object, yet every act of cognition depends upon it—is the conceptual engine of the Upaniṣad.${C(1,6,16)}`)}

        <h3 id="kena-khanda-2">Second khaṇḍa — what it means to know Brahman</h3>
        ${P(`The second khaṇḍa turns the first section’s teaching into an explicit problem of knowledge. The teacher warns that one who thinks “I know Brahman well” has grasped only a limited form. The response that follows is intentionally paradoxical: “I do not think I know it well; yet I do not think I do not know it.” Olivelle notes that the syntax and speaker divisions of this section are difficult enough that translators disagree over whether it is a dialogue or a continuous discourse. That philological uncertainty is important because it shows that the famous paradox is not merely a later philosophical slogan; it is embedded in an unusually compressed and difficult piece of early Sanskrit.${C(1)}`)}
        ${V('Kena 2.3', 'यस्यामतं तस्य मतं मतं यस्य न वेद सः ।<br>अविज्ञातं विजानतां विज्ञातमविजानताम् ॥', '“For the one to whom it is not an object of thought, it is understood; the one who thinks it an object of thought does not know it.”')}
        ${P(`The pivotal expression <i>pratibodhaviditam</i> in 2.4 became central to later interpretation. Śaṅkara glosses it as Brahman known in relation to every cognition: the inner Self is not another object perceived by a mental state but the consciousness by which mental states themselves are disclosed. The verse then links this recognition with <i>amṛtatva</i>, immortality. The final verse of the khaṇḍa gives the teaching existential force: realization is to occur “here”; otherwise, the loss is great.${C(6,7,11)}`)}

        <h3 id="kena-khanda-3">Third khaṇḍa — Agni, Vāyu and the yakṣa</h3>
        ${P(`The prose narrative begins with victory. Brahman has secured victory for the gods, but the gods attribute the triumph to themselves. Brahman appears before them as an unidentified <i>yakṣa</i>, a numinous or mysterious being. Agni is sent to investigate and identifies himself by his cosmic power: he can burn everything on earth. The yakṣa places a straw before him, and Agni cannot burn it. Vāyu then boasts that he can carry away everything, yet cannot move the same straw.${C(1,2,4,6)}`)}
        ${P(`The story is not merely a moral fable about pride. It makes the first khaṇḍa concrete. Fire’s burning and wind’s movement are no more self-grounding than human speech or hearing. The gods possess real functions, but those functions are dependent. In Śaṅkara’s reading, Brahman appears out of grace in order to remove the gods’ false self-conceit; in Aurobindo’s later symbolic reading, Agni and Vāyu represent material and vital powers confronting a reality beyond their ordinary range.${C(6,17)}`)}

        <h3 id="kena-khanda-4">Fourth khaṇḍa — Umā and the epilogue</h3>
        ${P(`Indra approaches next. The yakṣa vanishes, and in the same space Indra encounters a radiant woman, Umā Haimavatī. He asks her who the mysterious being was. She answers that it was Brahman, and that the victory of which the gods were proud belonged to Brahman. The narrative thus makes instruction—not force—the decisive path to knowledge. Agni and Vāyu test themselves against the mystery and fail; Indra remains, asks, and is taught.${C(1,4,6,9)}`)}
        ${P(`Śaṅkara explicitly interprets Umā as knowledge appearing in the form of a woman, while also allowing the identification “daughter of Himavat.” Later Śaiva and Śākta traditions naturally read her as Pārvatī/Umā. Modern historians such as Kinsley are more cautious: the Kena passage itself names Umā Haimavatī and gives her the role of revealer, but it does not yet narrate the later Purāṇic biography of Śiva’s wife. Historically, the safest statement is therefore that Kena preserves an early Umā Haimavatī whose defining function in the text is possession and communication of Brahman-knowledge.${C(6,9)}`)}
        ${P(`The remaining prose gives two compressed analogies for Brahman’s manifestation—lightning on the divine level and the rapid movement or recollection of mind on the individual level. It introduces the name <i>Tadvana</i>, interpreted differently in the commentarial traditions, and closes with an important corrective to the notion that Kena rejects Vedic discipline: <i>tapas</i>, <i>dama</i> and <i>karma</i> are called its supports, the Vedas its limbs, and truth its abode.${C(4,6,8,12)}`)}
        ${V('Kena 4.8', 'तस्यै तपो दमः कर्मेति प्रतिष्ठा वेदाः सर्वाङ्गानि सत्यमायतनम् ॥', '“Austerity, restraint and action are its supports; the Vedas are all its limbs; truth is its abode.”')}
      </section>

      <section class="kena-section" id="kena-philosophy">
        <h2>Philosophical themes</h2>
        ${P(`<b>Brahman is not another object.</b> The Kena’s most characteristic philosophical move is to ask what makes cognition possible and then deny that this principle can itself be grasped in the same way as a finite thing. Speech cannot express Brahman as an object, yet speech functions through Brahman; mind cannot “think” it in the ordinary subject-object sense, yet thinking is possible through it. This is why the text can sound simultaneously apophatic and affirmative. It denies objectification while affirming dependence.${C(1,6,16)}`)}
        ${P(`<b>The known and the unknown are both inadequate categories.</b> Kena 1.3 and 2.1–3 refuse a simple equation of Brahman with either the familiar known world or sheer unknowability. “Different from the known” prevents Brahman from becoming an ordinary object; “beyond the unknown” prevents the text from reducing Brahman to a blank absence. The paradox of 2.3 sharpens the same point: the error is not knowing too little but assuming that the highest reality can be possessed as a concept.${C(1,15,16)}`)}
        ${P(`<b>Consciousness and <i>pratibodha</i>.</b> Śaṅkara’s interpretation of 2.4 became especially important in Advaita. If Brahman/Ātman is “known through every cognition,” then the Self is not inferred as an invisible entity behind the mind; it is the luminous condition in whose presence every thought, perception and memory is manifest. This reading became one of the classic Advaitic ways of explaining self-revealing consciousness. Other Vedānta schools accept the dependence of cognition upon Brahman but reject Śaṅkara’s identification of the individual self with nondual Brahman.${C(6,7,8,12)}`)}
        ${P(`<b>Power is derivative.</b> The yakṣa narrative is the theological equivalent of the epistemology. Agni burns, Vāyu moves, Indra rules, but none possesses power absolutely. The gods’ pride consists in treating dependent activity as self-originating. Madhva makes this dependence strongly personal and theistic: the real impeller is Viṣṇu, who grants the faculties their powers. Śaṅkara instead emphasizes Brahman as the indwelling Self and ground of all activity. The same story can therefore sustain sharply different ontologies while preserving its central anti-autonomy claim.${C(6,8)}`)}
        ${P(`<b>Knowledge is embedded in discipline.</b> The final prose is often overlooked when the Upaniṣad is presented only as an abstract philosophy of consciousness. Kena itself ends by naming austerity, self-restraint, action, Veda and truth. Whatever the metaphysical interpretation, the text does not present realization as a merely intellectual victory. Its closing frame belongs to a world in which Brahman-knowledge is inseparable from a transformed way of life.${C(4,6,12)}`)}
      </section>

      <section class="kena-section" id="kena-textual">
        <h2>Textual and philological issues</h2>
        ${P(`The Kena is unusually rewarding for textual criticism because several kinds of evidence overlap: the independent Vedāntic Upaniṣad, its location in JUB 4.18–21, Śaṅkara’s transmitted text, Madhva’s text, Raṅgarāmānuja’s text, nineteenth-century editions and modern Jaiminīya manuscript work. These witnesses are close enough to represent the same Upaniṣad yet different enough to show that the text did not circulate in a perfectly frozen form.${C(1,2,3,12)}`)}
        ${P(`Olivelle’s apparatus notes, for example, variant readings in Kena 2.1 and differing punctuation of the difficult opening of the second khaṇḍa. His note on 2.5 records that Oertel prints a unit as prose where other editions present verse. The 1945 critical edition of Raṅgarāmānuja gives a compact list of further divergences: JUB versus later Vedāntic readings in the third and fourth khaṇḍas, alternate spellings and verbal forms, and different ways of dividing the early mantras. These are usually small variants, but they matter when a philosophical argument depends on a single word.${C(1,12)}`)}
        ${P(`The Raṅgarāmānuja editors also make a historically important bibliographical point: not every printed “Prakāśikā” attributed to Raṅgarāmānuja is authentic. They distinguish the commentary established from trustworthy Grantha and Telugu witnesses from a spurious Viśiṣṭādvaita commentary that had been printed under his name in some earlier editions. This is a reminder that commentarial attribution, like the text of the Upaniṣad itself, must be established rather than assumed from a modern title page.${C(12)}`)}
        ${P(`The broader Jaiminīya context complicates the category “Upaniṣad” itself. Fujii notes that the whole JUB continued to be respected as an Upaniṣadic text in the living Jaiminīya tradition, particularly in South India, whereas mainstream Vedānta canonized only the Kena portion. The familiar modern object “the Kena Upaniṣad” is therefore both ancient and historically constructed: ancient in its language and school setting, but also the product of a later process that selected four JUB sections for independent circulation and commentary.${C(20)}`)}
      </section>

      <section class="kena-section" id="kena-reception">
        <h2>Commentarial reception</h2>
        ${P(`<b>Śaṅkara.</b> Kena occupies a distinctive place in the Śaṅkara corpus because two commentaries are transmitted, conventionally called a <i>Padabhāṣya</i> and a <i>Vākyabhāṣya</i>. Their relationship and authenticity became a modern scholarly problem. Sengaku Mayeda’s 1967 study applied textual criteria to the question and argued for Śaṅkara’s authorship of both, although discussion of how the two commentaries arose remains open. Philosophically, Śaṅkara makes Kena central to the claim that Brahman cannot be objectified: the Self is self-revealing consciousness and is “known” through every cognition rather than perceived as a separate thing.${C(6,7,11)}`)}
        ${P(`Śaṅkara’s treatment of the yakṣa story closely links the prose to the philosophical verses. The gods mistake Brahman’s victory for their own, so Brahman appears to destroy their pride. Umā appears as knowledge in female form; Indra learns because he remains near the place where Brahman vanished and seeks instruction. In this reading the narrative is neither a detachable myth nor a primitive relic: it is a pedagogical dramatization of dependence, humility and the need for knowledge.${C(6)}`)}
        ${P(`<b>Madhva.</b> Madhva’s Kena bhāṣya takes a markedly different route. In the 1909 Vasu translation, the opening dialogue is framed as Śiva questioning Brahmā, and the supreme impeller is identified with Viṣṇu. Madhva repeatedly emphasizes Brahman as <i>sarva-preraka</i>, the controller who gives mind, breath and the senses their powers. Much of the commentary is presented as citation from a text called <i>Brahma-Sāra</i>, whose independent manuscript history is uncertain. The Kena’s “by whom?” thus becomes, in Dvaita, a question about the supreme personal regulator rather than a route to identity between individual consciousness and nondual Brahman.${C(8)}`)}
        ${P(`<b>Raṅgarāmānuja.</b> Raṅgarāmānuja’s commentary is an important Śrīvaiṣṇava witness because Rāmānuja himself did not write a continuous bhāṣya on Kena. The critical Tirupati edition of 1945 establishes Raṅgarāmānuja’s text from multiple witnesses, provides an English translation, and explicitly distinguishes authentic material from a spurious Prakāśikā printed in some older collections. His reading interprets Kena within a Viśiṣṭādvaita ontology in which Brahman is the supreme personal reality on whom finite selves and powers depend, without accepting Advaita’s final identity of jīva and Brahman.${C(12)}`)}
        ${P(`The existence of these three sophisticated but incompatible readings is itself historically significant. Kena’s brevity does not make it doctrinally simple. Phrases such as “ear of the ear,” “different from the known,” <i>pratibodhaviditam</i> and <i>Tadvana</i> are compact enough to support rival accounts of consciousness, divine agency, the status of the gods and the relation between the finite self and Brahman. The commentarial history therefore belongs to the meaning-history of the text, not merely to its afterlife.${C(6,8,12)}`)}
      </section>

      <section class="kena-section" id="kena-modern-reception">
        <h2>Translations and modern reception</h2>
        ${P(`Kena entered modern print culture very early. Rammohun Roy published an English <i>Translation of the Céna Upanishad</i> at Calcutta in 1816, using Śaṅkara’s gloss and incorporating the text into his broader argument for the unity and supremacy of the divine. His version belongs to the first generation of English Upaniṣad translation by an Indian intellectual and shows that Kena was already being redeployed in modern Hindu theological debate before the great European philological editions.${C(18)}`)}
        ${P(`Max Müller’s 1879 translation in the <i>Sacred Books of the East</i> made Kena widely accessible to anglophone readers and, unusually, embedded the translation in a live manuscript-historical discussion because Burnell had just reported the Talavakāra manuscript. Oertel’s 1896 edition then transformed the study of the text by printing and translating the larger Jaiminīya Upaniṣad-Brāhmaṇa. Hume, Deussen, Radhakrishnan and Olivelle represent successive stages of the modern academic tradition, differing over chronology, segmentation and the philosophical implications of difficult passages.${C(1,2,4,5,15,16)}`)}
        ${P(`Sri Aurobindo’s extended commentary is an important modern Hindu interpretation rather than a historical-critical edition. He reads Agni, Vāyu and Indra symbolically as powers operating on material, vital and mental planes, and Umā as the higher knowledge or supreme Nature through which those powers learn the truth of Brahman. Whether or not one accepts that symbolic psychology as the historical meaning of the Vedic prose, it demonstrates Kena’s extraordinary adaptability: the same short myth has functioned as Brāhmaṇa narrative, Vedāntic proof-text, Goddess theology and modern spiritual psychology.${C(17)}`)}
        ${P(`Digital resources have broadened the textual base available to nonspecialists. SanskritDocuments provides a convenient Sanskrit text; public-domain translations of Müller and older bhāṣyas circulate online; Wisdomlib gives access to Vasu’s Madhva translation; the Sanskrit Library presents the JUB context; and the Raṅgarāmānuja critical edition is available through Sanskrit Wikisource. These resources are useful, but they should not be treated as interchangeable: some reproduce a received Vedāntic text, others a Sāmavedic school text, and others a particular commentator’s recension.${C(3,8,12,19)}`)}
      </section>

      <section class="kena-section" id="kena-significance">
        <h2>Significance</h2>
        ${P(`Kena’s importance lies partly in its compression. In a text of only four short khaṇḍas, it moves from epistemology to theology, from abstract verse to mythic prose, from the human senses to the Vedic gods, and from speculative paradox to ethical discipline. The opening question “by whom?” can therefore be read at several levels at once: what makes perception possible, what grounds agency, what gives the gods their powers, and what kind of knowledge is appropriate to a reality that cannot be turned into an object.${C(1,4,5)}`)}
        ${P(`It is also a valuable witness to the transition from Vedic school literature to the later pan-Hindu Upaniṣadic canon. Historically, Kena is embedded in a particular Sāmavedic tradition; canonically, it became one of the “principal” Upaniṣads read across sectarian boundaries. The gap between those two identities explains why manuscript history, JUB context and Vedānta commentary all matter. To study only the philosophy is to miss the school text; to study only the JUB is to miss the enormous later life of the extracted Upaniṣad.${C(2,3,10,20)}`)}
        ${P(`The text is equally important for the history of Hindu theology. Its prose does not abolish Agni, Vāyu or Indra, but relativizes their autonomy by placing Brahman behind their powers. Its appearance of Umā Haimavatī gave later Śaiva and Śākta traditions a striking śruti scene in which a goddess possesses the knowledge that the gods seek. Its closing appeal to tapas, restraint, action, Veda and truth prevents the Upaniṣad from being reduced to a doctrine of inward cognition alone.${C(6,9,17)}`)}
        ${P(`Finally, Kena became a test case for the major Vedānta schools because its language is precise enough to demand interpretation but open enough to resist a single later system. Advaita, Dvaita and Viśiṣṭādvaita all claim the text, yet they disagree over the identity of the knower, the nature of Brahman, and the relation between divine dependence and selfhood. That continuing disagreement is not a defect in the Upaniṣad’s reception; it is evidence of why the text remained philosophically productive for more than two millennia.${C(6,8,12)}`)}
      </section>
      ${referencesHtml()}
    `;
  }

  function enhance(article) {
    if (!article || article.dataset.deepWiki === '1') return;
    article.dataset.deepWiki = '1';

    const infobox = article.querySelector('.kena-infobox');
    if (infobox && ![...infobox.querySelectorAll('.kena-info-row b')].some(b => b.textContent.trim() === 'Verse count')) {
      const form = [...infobox.querySelectorAll('.kena-info-row')].find(r => r.querySelector('b')?.textContent.trim() === 'Form');
      form?.insertAdjacentHTML('afterend', `<div class="kena-info-row"><b>Verse count</b><span>13 metrical verses, followed by prose narrative and epilogue in common modern numbering</span></div><div class="kena-info-row"><b>Major commentators</b><span>Śaṅkara, Madhva, Raṅgarāmānuja; later Advaita glossators</span></div>`);
    }

    const lead = article.querySelector('.kena-lead');
    if (lead && !article.querySelector('.kena-wiki-toc')) {
      lead.insertAdjacentHTML('afterend', `
        <nav class="kena-toc kena-wiki-toc" aria-label="Contents">
          <div class="kena-toc-title">Contents</div>
          <ol>
            <li><a href="#kena-etymology">Etymology and titles</a></li>
            <li><a href="#kena-history">Chronology and textual history</a></li>
            <li><a href="#kena-structure-wiki">Structure and manuscript form</a></li>
            <li><a href="#kena-contents">Contents</a>
              <ol>
                <li><a href="#kena-khanda-1">First khaṇḍa — the power behind cognition</a></li>
                <li><a href="#kena-khanda-2">Second khaṇḍa — what it means to know Brahman</a></li>
                <li><a href="#kena-khanda-3">Third khaṇḍa — Agni, Vāyu and the yakṣa</a></li>
                <li><a href="#kena-khanda-4">Fourth khaṇḍa — Umā and the epilogue</a></li>
              </ol>
            </li>
            <li><a href="#kena-philosophy">Philosophical themes</a></li>
            <li><a href="#kena-textual">Textual and philological issues</a></li>
            <li><a href="#kena-reception">Commentarial reception</a></li>
            <li><a href="#kena-modern-reception">Translations and modern reception</a></li>
            <li><a href="#kena-significance">Significance</a></li>
            <li><a href="#kena-references">References</a></li>
          </ol>
        </nav>`);
    }

    article.querySelectorAll('.kena-section').forEach(section => section.remove());
    const toc = article.querySelector('.kena-wiki-toc');
    toc?.insertAdjacentHTML('afterend', articleBodyHtml());
  }

  const observer = new MutationObserver(() => {
    const article = document.querySelector('.kena-article');
    if (article) enhance(article);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();