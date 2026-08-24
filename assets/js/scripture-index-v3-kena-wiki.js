(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const C = (...nums) => `<sup class="kena-cite">${nums.map(n => `<a href="#kena-ref-${n}">[${n}]</a>`).join('')}</sup>`;
  const P = html => `<p>${html}</p>`;
  const V = (ref, sa, en) => `<blockquote class="kena-quote kena-text-quote"><span class="kena-quote-ref">${ref}</span><span class="kena-quote-sa" lang="sa">${sa}</span><span class="kena-quote-en">${en}</span></blockquote>`;

  const refs = [
    ['Patrick Olivelle', '<i>The Early Upaniṣads: Annotated Text and Translation</i> (Oxford University Press, 1998), Kena Upaniṣad, pp. 363–371.', 'https://academic.oup.com/book/50014/chapter-abstract/422709268'],
    ['Hanns Oertel', '“The Jāiminīya or Talavakāra Upaniṣad Brāhmaṇa: Text, Translation, and Notes,” <i>Journal of the American Oriental Society</i> 16 (1896), 79–260.', 'https://books.google.com/books?id=83u7DjpBtmsC'],
    ['The Sanskrit Library', '<i>Jaiminīya-Upaniṣad-Brāhmaṇa</i>, electronic text.', 'https://sanskritlibrary.org/catalogsText/titus/vedic/jub.html'],
    ['F. Max Müller', '<i>The Upanishads, Part I</i>, Sacred Books of the East 1 (Oxford, 1879), introduction and Kena translation.', 'https://sacred-texts.com/hin/sbe01/sbe01018.htm'],
    ['Paul Deussen', '<i>Sechzig Upanishad’s des Veda</i> (1897) and <i>The Philosophy of the Upanishads</i>, trans. A. S. Geden (1906).', 'https://books.google.com/books?id=jPoyAQAAMAAJ'],
    ['S. Sitarama Sastri', '<i>Kena Upanishad with Sri Sankara’s Commentary</i> (Madras, 1905 and later printings).', 'https://shlokam.org/text/kenopanishad.htm'],
    ['Sengaku Mayeda', '“On Śaṅkara’s Authorship of the Kenopaniṣadbhāṣya,” <i>Indo-Iranian Journal</i> 10.1 (1967), 33–55.', ''],
    ['Śrīśa Chandra Vasu', '<i>The Kena Upanishad with the Commentary of Sri Madhvacharya</i> (Allahabad, 1909).', 'https://www.wisdomlib.org/hinduism/book/kena-upanishad-madhva-commentary'],
    ['David Kinsley', '<i>Hindu Goddesses: Visions of the Divine Feminine in the Hindu Religious Tradition</i> (University of California Press, 1986), discussion of Umā Haimavatī.', ''],
    ['Vedic Heritage Portal', 'Jaiminīyopaniṣad Brāhmaṇa: overview of the Jaiminīya branch of the Sāmaveda and its text.', 'https://vedicheritage.gov.in/brahmanas/jaiminiya-upanishad-brahmana/'],
    ['Bāla Śāstrī Āgaśe, ed.', '<i>Kenopaniṣad</i> with the Padabhāṣya and Vākyabhāṣya attributed to Śaṅkara, Ānandāśrama Sanskrit Series 6.', ''],
    ['K. C. Varadachari and D. T. Tatacharya, eds.', '<i>Kenopanishad-Bhashya by Sri Rangaramanuja</i>, Sri Venkatesvara Oriental Series 8 (Tirupati, 1945).', 'https://sa.wikisource.org/wiki/%E0%A4%95%E0%A5%87%E0%A4%A8%E0%A5%8B%E0%A4%AA%E0%A4%A8%E0%A4%BF%E0%A4%B7%E0%A4%A6%E0%A5%8D%E0%A4%AD%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%AF%E0%A4%AE%E0%A5%8D'],
    ['R. D. Ranade', '<i>A Constructive Survey of Upanishadic Philosophy</i> (Poona, 1926).', 'https://en.wikisource.org/wiki/Index:A_Constructive_Survey_of_Upanishadic_Philosophy.pdf'],
    ['Moriz Winternitz', '<i>A History of Indian Literature</i>, vol. 1, discussion of the older Upaniṣads.', ''],
    ['Robert Ernest Hume', '<i>The Thirteen Principal Upanishads</i> (Oxford University Press, 1921), Kena Upaniṣad.', 'https://openlibrary.org/books/OL6639499M/The_thirteen_principal_Upanishads'],
    ['S. Radhakrishnan', '<i>The Principal Upanishads</i> (1953), Kena Upaniṣad and notes.', ''],
    ['Sri Aurobindo', '<i>Kena and Other Upanishads</i>, Complete Works of Sri Aurobindo, vol. 18.', 'https://sri-aurobindo.co.in/workings/sa/12/kena_18_e.pdf'],
    ['Rammohun Roy', '<i>Translation of the Céna Upanishad</i> (Calcutta, 1816).', 'https://books.google.com/books?id=9ygwAAAAYAAJ&output=html_text'],
    ['SanskritDocuments', 'Kenopaniṣat: Sanskrit text and transliteration resources.', 'https://sanskritdocuments.org/doc_upanishhat/kena.html'],
    ['Masato Fujii', 'Studies of the Jaiminīya Upaniṣad-Brāhmaṇa and the Jaiminīya Sāmaveda tradition.', 'https://repository.kulib.kyoto-u.ac.jp/dspace/bitstream/2433/139387/1/42_1.pdf']
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
        ${P(`The name <i>Kena</i> comes from the first word of the Upaniṣad: <i>kena</i> (केन), “by whom?” or “by what?”. The opening verse asks a simple but unsettling question: who, or what, makes the mind think, the breath move, speech speak, the eye see and the ear hear? The title is therefore not the name of an author. It is simply the first word by which the text came to be known.${C(1,4,19)}`)}
        ${V('Kena 1.1', 'केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः ।<br>केनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति ॥', '“By whom impelled does the mind go forth? By whom does the foremost breath move? By whom is speech spoken? What power joins the eye and the ear to their work?”')}
        ${P(`The older title <i>Talavakāra Upaniṣad</i> tells us something more important: where the text came from. It belongs to a branch of the Sāmaveda known as the Jaiminīya or Talavakāra school. In that school, the Kena was not originally floating by itself as a separate little book. It appears inside a much larger Sāmavedic work called the <i>Jaiminīya Upaniṣad-Brāhmaṇa</i>. Modern scholars usually locate the Kena there as chapter 4, sections 18–21.${C(1,2,3,10,20)}`)}
        ${P(`You will sometimes see that location shortened to “Jaiminīya Upaniṣad-Brāhmaṇa 4.18–21.” It means nothing more mysterious than “chapter 4, sections 18 to 21 of the larger work.” By contrast, a label such as “Kena 2.1” numbers the same material as part of the Kena treated as an independent Upaniṣad. The two systems exist because the text has had two lives: first as part of a Sāmavedic school book, and later as a famous Upaniṣad copied and studied on its own.${C(1,2,3)}`)}
        ${P(`That background helps explain why the Kena feels both philosophical and deeply Vedic. The larger Jaiminīya work is interested in chants, breath, speech, ritual power and the hidden correspondences that make visible actions effective. Kena takes that old Vedic question—what power lies behind the power we can see?—and turns it directly toward consciousness itself.${C(2,10,20)}`)}
      </section>

      <section class="kena-section" id="kena-history">
        <h2>Chronology and textual history</h2>
        ${P(`No ancient author left a date on the Kena, and no inscription tells us when it was composed. When modern scholars date it, they are comparing its language, metre, prose style and ideas with other Vedic and Upaniṣadic texts. That is why books can give different dates without one of them necessarily being careless: the evidence is indirect.${C(1,5,13,14)}`)}
        ${P(`There is, however, broad agreement that the Kena is old. Paul Deussen saw it as standing between the oldest prose Upaniṣads and the later verse Upaniṣads. He thought the prose story of the gods and the mysterious <i>yakṣa</i> was older than the philosophical verses at the beginning. R. D. Ranade and Moriz Winternitz also placed the Kena among the early Upaniṣads, though they arranged the texts differently. Patrick Olivelle, working with another relative chronology, calls Kena the earliest of the early verse Upaniṣads and places that verse group broadly in the last few centuries BCE.${C(1,5,13,14)}`)}
        ${P(`The disagreement matters because the Kena changes style halfway through. The first two sections are mainly compact philosophical verse. The last two are a prose story about Agni, Vāyu, Indra, a mysterious being and Umā Haimavatī. One possibility is that an older story was later joined to, or reworked by, a verse teaching. Another is that the contrast is deliberate: the text first states its teaching abstractly and then retells the same point as a story. The evidence does not force one simple answer.${C(1,5)}`)}
        <div class="kena-wiki-table-wrap"><table class="kena-wiki-table"><thead><tr><th>Scholar</th><th>How Kena is placed</th><th>What the judgment is based on</th></tr></thead><tbody>
          <tr><td>Deussen</td><td>A bridge between older prose and later verse Upaniṣads</td><td>The sharp difference between the prose story and the opening verses</td></tr>
          <tr><td>Ranade</td><td>Among the early principal Upaniṣads</td><td>Comparison of philosophical ideas across texts</td></tr>
          <tr><td>Winternitz</td><td>Early, pre-Buddhist / pre-Jaina literature</td><td>Literary history and relative chronology</td></tr>
          <tr><td>Olivelle</td><td>The earliest of the early verse Upaniṣads in his sequence</td><td>Language, form and comparison with other Upaniṣads</td></tr>
        </tbody></table></div>
        ${P(`The modern recovery of the Kena’s Sāmavedic setting is also a story worth knowing. Śaṅkara’s commentary says that the text belonged to a Talavakāra Brāhmaṇa. For a long time, European scholars knew the Kena mainly as an independent Upaniṣad and through its commentaries. In the late nineteenth century, A. C. Burnell reported a South Indian manuscript of the larger Talavakāra material. Max Müller discussed the discovery in 1879, and Hanns Oertel later published the larger Jaiminīya/Talavakāra text with translation and notes. That changed the question from “where did this little Upaniṣad come from?” to “how does it fit inside the literature of its own Vedic school?”${C(2,4)}`)}
        ${P(`Later work on the Jaiminīya tradition, including Masato Fujii’s studies, makes the point even clearer: the larger Sāmavedic book had a life of its own. Vedānta eventually singled out four of its sections as the Kena Upaniṣad, but the surrounding work did not disappear just because later readers preferred the famous extract.${C(20)}`)}
      </section>

      <section class="kena-section" id="kena-structure-wiki">
        <h2>Structure and manuscript form</h2>
        ${P(`The Kena is divided into four <i>khaṇḍas</i>, meaning four sections. In the numbering used by many modern editions, the first section has eight metrical verses and the second has five, making thirteen verses in the poetic half. The third and fourth sections are mainly prose. Some editions number each prose unit like a verse; others call them paragraphs. This is the main reason different books can appear to give different totals for the same text.${C(1,4,15)}`)}
        <div class="kena-structure kena-wiki-structure">
          <div class="kena-structure-row"><b>1st khaṇḍa</b><span>Eight verses asking what power lies behind mind, speech, breath, sight and hearing.</span></div>
          <div class="kena-structure-row"><b>2nd khaṇḍa</b><span>Five verses on what it means—and does not mean—to “know” Brahman.</span></div>
          <div class="kena-structure-row"><b>3rd khaṇḍa</b><span>A prose story in which the gods meet a mysterious being and discover that their powers are not self-sufficient.</span></div>
          <div class="kena-structure-row"><b>4th khaṇḍa</b><span>Umā Haimavatī identifies the mysterious being as Brahman; the text then closes with a short teaching on meditation, discipline and truth.</span></div>
        </div>
        ${P(`A second source of confusion is that the Kena can be cited in two ways. A commentator may say “Kena 2.1,” treating the Upaniṣad as a book in its own right. A scholar studying the larger Sāmavedic work may instead point to the place where that same passage sits inside the <i>Jaiminīya Upaniṣad-Brāhmaṇa</i>. The second reference is useful when comparing Kena with the material around it; the first is much easier for ordinary reading and is the system used throughout this page.${C(1,2,3)}`)}
        ${P(`There are also smaller textual differences between editions. A line may be divided differently, punctuation may change, or a prose unit may be attached to the end of one section rather than the beginning of the next. These are real philological questions, but they do not usually produce a radically different Kena. For a reader, the important point is simply that “the text” comes to us through manuscripts and editions, not through one perfectly uniform printed page handed down unchanged.${C(4,11,12)}`)}
      </section>

      <section class="kena-section" id="kena-contents">
        <h2>Contents</h2>
        <h3 id="kena-khanda-1">First khaṇḍa — the power behind cognition</h3>
        ${P(`The opening section asks us to look behind the faculties we normally take for granted. We can hear, think, speak, breathe and see—but what makes those powers possible? The answer is deliberately strange: Brahman is “the ear of the ear,” “the mind of the mind,” “the speech of speech,” “the breath of breath” and “the eye of the eye.” The point is not that there is a second, invisible ear hiding behind the visible one. The language pushes the reader away from thinking of Brahman as one more object in the world.${C(1,4,6,15)}`)}
        ${V('Kena 1.2', 'श्रोत्रस्य श्रोत्रं मनसो मनो यद् वाचो ह वाचं स उ प्राणस्य प्राणः ।<br>चक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥', '“The hearing of hearing, the mind of mind, the speech of speech, the breath of breath, the sight of sight…” The verse points behind each faculty to the power by which that faculty works.')}
        ${P(`The remaining verses repeat the same movement. Speech cannot capture Brahman, yet speech is possible because of it. The mind cannot turn Brahman into an ordinary thought-object, yet thinking itself depends on it. Sight cannot see it as a visible thing, yet sight depends on it. This is why the Kena is often read as one of the clearest early Upaniṣadic statements that the ultimate knower cannot simply be placed in front of itself and examined like an ordinary object.${C(6,15,16)}`)}

        <h3 id="kena-khanda-2">Second khaṇḍa — what it means to know Brahman</h3>
        ${P(`The second section begins with a warning. If the student thinks, “I know Brahman perfectly,” the teacher says that what has been grasped is still only a limited form. This can sound like deliberate obscurity until the problem is stated plainly: if Brahman is the reality that makes knowing possible, then “knowing Brahman” cannot mean possessing it as one more fact inside the mind.${C(1,6,15)}`)}
        ${V('Kena 2.3', 'यस्यामतं तस्य मतं मतं यस्य न वेद सः ।<br>अविज्ञातं विजानतां विज्ञातमविजानताम् ॥', '“For the one to whom it is not merely an object of thought, it is understood; the one who thinks it is simply an object of thought has not understood.”')}
        ${P(`A famous phrase in the next verse is <i>pratibodhaviditam</i>. Literally, it connects knowledge of Brahman with every act of awareness or cognition. Śaṅkara makes a great deal of this wording: consciousness is not discovered as a hidden object behind thoughts; it is present in the very fact that thoughts are known. Other Vedānta schools accept the importance of the passage but reject Śaṅkara’s conclusion that the individual self and Brahman are ultimately non-different.${C(6,7,8,12)}`)}
        ${P(`The section ends by tying this insight to immortality. The Kena is not describing clever intellectual doubt for its own sake. It is trying to transform what the reader takes the self to be. “Knowing” here has consequences for freedom, strength and the overcoming of mortality.${C(1,6)}`)}

        <h3 id="kena-khanda-3">Third khaṇḍa — Agni, Vāyu and the mysterious being</h3>
        ${P(`The text now changes genre completely. The gods have won a victory, but they become proud and think the victory belongs to them. Brahman appears before them as a mysterious <i>yakṣa</i>—a strange, numinous being whose identity they do not recognise. Agni approaches first. Asked what power he possesses, he says he can burn everything on earth. The being places a blade or straw before him. Agni cannot burn it.${C(1,2,4)}`)}
        ${P(`Vāyu then approaches and boasts that he can sweep away everything on earth. He too is tested with the same trivial object, and he cannot move it. The humour of the scene matters: immense cosmic powers are defeated by something absurdly small. The story turns the abstract teaching of the opening verses into drama. Agni and Vāyu really do have power, but they mistake dependent power for independent power.${C(5,17)}`)}
        ${P(`Indra goes next, but the mysterious being disappears before he can question it. This is the turning point. Fire cannot burn its way to the answer; wind cannot seize it; even Indra cannot simply confront Brahman as an object standing in front of him. Knowledge arrives through instruction.${C(1,4)}`)}

        <h3 id="kena-khanda-4">Fourth khaṇḍa — Umā Haimavatī and the epilogue</h3>
        ${P(`After the mysterious being vanishes, Indra sees a radiant woman: Umā Haimavatī. He asks her who the being was. She answers that it was Brahman, and that the gods’ victory was really Brahman’s victory. The lesson is therefore not merely “the gods are weak.” It is that their powers are real but derivative. What they possess is possible because of a reality deeper than any one deity’s function.${C(1,4,9)}`)}
        ${P(`Later Hindu tradition naturally identified Umā Haimavatī with Umā-Pārvatī, and Śaiva and Śākta readers gave the scene enormous theological significance. Historically, however, the Kena itself says less than later mythology says. It names a luminous Umā Haimavatī and makes her the one who reveals Brahman to Indra; it does not narrate the later Purāṇic story of Pārvatī and Śiva. David Kinsley therefore urges caution about treating the full later Goddess mythology as though it were already explicit in this early passage.${C(9)}`)}
        ${P(`The Upaniṣad then gives two brief comparisons. Brahman’s manifestation is likened to the suddenness of lightning, and on the inner level to the quick movement of the mind. It introduces the meditative name <i>Tadvana</i>, a difficult word interpreted in different ways by commentators. Finally, the teacher names austerity, self-restraint and action as supports of the teaching; the Vedas are called its limbs and truth its dwelling place. The ending matters because it prevents Kena from becoming a slogan about “pure consciousness” detached from discipline, ethical restraint and the Vedic world in which the text was transmitted.${C(4,6,8,12)}`)}
        ${V('Kena 4.8', 'तस्यै तपो दमः कर्मेति प्रतिष्ठा वेदाः सर्वाङ्गानि सत्यमायतनम् ॥', '“Austerity, restraint and action are its supports; the Vedas are all its limbs; truth is its abode.”')}
      </section>

      <section class="kena-section" id="kena-philosophy">
        <h2>Philosophical themes</h2>
        ${P(`The Kena’s central move is easy to miss if it is reduced to the formula “Brahman is beyond the senses.” The text is not merely saying that Brahman is very distant or invisible. It asks a more radical question: what if the deepest reality is not one of the things known, but that because of which knowing happens at all? That is why the Upaniṣad keeps turning ordinary language inside out—“ear of the ear,” “mind of the mind”—and why the second section becomes suspicious of anyone who says “I know Brahman” too quickly.${C(1,6,15,16)}`)}
        ${P(`This creates a tension between knowledge and objectification. Ordinary knowledge normally puts something before us: a colour, a sound, a thought, a proposition. Kena insists that Brahman cannot be contained in that relationship. Yet it does not conclude that Brahman is simply unknowable. The paradoxical verses of the second section try to describe another kind of recognition: a reality known through, or in, the very event of awareness rather than as an item placed inside awareness.${C(6,7,15)}`)}
        ${P(`The story of the gods repeats the same philosophy in another register. Agni represents a real power, Vāyu a real power, Indra a real power—but none can explain itself. Their failure before the <i>yakṣa</i> is a story about dependence. What the senses are to the human being, the gods are to the cosmos: impressive powers whose operation still points beyond itself.${C(1,5,17)}`)}
        ${P(`The ending adds a further correction. Knowledge of Brahman is not presented as a license to despise ritual, discipline or truth. The final lines retain <i>tapas</i> (austerity or disciplined effort), <i>dama</i> (self-restraint), <i>karma</i> (action, with ritual overtones), the Vedas and truth. Whatever later schools make of the metaphysics, the received Kena still understands liberating knowledge as something that belongs within a disciplined way of life.${C(4,6,8,12)}`)}
      </section>

      <section class="kena-section" id="kena-textual">
        <h2>Text, manuscripts and editions</h2>
        ${P(`A modern printed Upaniṣad can make the text look more uniform than its history really is. The Kena has been copied both as an independent Upaniṣad and as part of larger Sāmavedic material. Commentarial editions sometimes divide the text differently from editions made for Vedic philology. Even the familiar count of thirteen metrical verses belongs to a particular way of segmenting the opening half.${C(1,2,4,11,12)}`)}
        ${P(`For ordinary reading, none of this means that every line is uncertain. Most of the text is stable enough that the same four-part work is recognisable across standard editions. The textual questions matter most when a commentator builds an argument on a particular word, when a prose unit is attached to one section rather than another, or when scholars are trying to reconstruct how the Kena sat inside the larger Sāmavedic book.${C(1,2,12)}`)}
        ${P(`The nineteenth century was especially important for modern scholarship. Müller translated the Kena for the <i>Sacred Books of the East</i> in 1879 and discussed Burnell’s manuscript discovery. Oertel’s 1896 work then supplied the larger Jaiminīya/Talavakāra text. Later Sanskrit editions printed the Kena together with Śaṅkara’s commentaries and later glosses, while modern critical translations such as Olivelle’s compare the text across the broader early Upaniṣadic corpus.${C(1,2,4,11)}`)}
      </section>

      <section class="kena-section" id="kena-reception">
        <h2>Commentarial reception</h2>
        ${P(`The Kena became one of the texts on which the major Vedānta schools tested their larger philosophies. This is not because the Upaniṣad contains a neat summary of Advaita, Dvaita or Viśiṣṭādvaita. It does not. The later schools agree that Kena speaks about the highest reality, but they disagree sharply over what the text implies about the individual self, Brahman and divine agency.${C(6,8,12)}`)}
        <h3>Śaṅkara</h3>
        ${P(`Two commentaries on the Kena are transmitted under Śaṅkara’s name. One is arranged closely around individual words and is usually called the <i>Padabhāṣya</i>—literally, a “word commentary.” The other explains larger sentences and arguments and is called the <i>Vākyabhāṣya</i>—a “sentence commentary.” Those Sanskrit titles are useful only once the distinction is clear: they are two different ways of commenting on the same Upaniṣad.${C(6,7,11)}`)}
        ${P(`Modern scholars have asked whether both really come from Śaṅkara. Sengaku Mayeda studied the question using linguistic and doctrinal criteria and argued that both are genuine. In the Advaita reading, passages such as “the mind of the mind” and <i>pratibodhaviditam</i> point to the Self as self-revealing consciousness. Brahman cannot be known as an object because the knower’s deepest reality is not separate from Brahman.${C(6,7)}`)}
        <h3>Madhva</h3>
        ${P(`Madhva reads the same text very differently. The repeated question “by whom?” is genuinely about a supreme ruler who directs beings and powers. The individual soul does not become identical with that supreme reality. In Vasu’s English edition of Madhva’s commentary, the Kena is consistently read inside a hierarchy of dependent gods and souls under the supreme Lord, identified with Viṣṇu. The <i>yakṣa</i> story therefore becomes evidence of divine dependence rather than a lesson in non-dual identity.${C(8)}`)}
        <h3>Raṅgarāmānuja and the Śrīvaiṣṇava tradition</h3>
        ${P(`Raṅgarāmānuja, a major Śrīvaiṣṇava commentator on the Upaniṣads, also treats Brahman as the supreme reality on whom finite selves and their powers depend. His reading is neither Śaṅkara’s identity doctrine nor Madhva’s strict dualism. A twentieth-century critical edition published at Tirupati is particularly valuable because it prints the Sanskrit commentary with textual notes and helps separate Raṅgarāmānuja’s own work from later material that had sometimes circulated with it.${C(12)}`)}
        ${P(`Putting the three traditions side by side shows why the Kena remained so productive. All three take the same questions seriously—who empowers the mind, what “knowing” Brahman means, why the gods depend on a higher power—but their answers expose the fault lines of Vedānta itself.${C(6,8,12)}`)}
      </section>

      <section class="kena-section" id="kena-modern-reception">
        <h2>Translations and modern reception</h2>
        ${P(`The Kena entered modern intellectual life through several different routes. Rammohun Roy printed an English translation in Calcutta in 1816 and read the text through Śaṅkara while using it in his own argument for the unity and supremacy of the divine. Müller’s nineteenth-century translation brought the Upaniṣad to a much wider European readership, and Hume, Deussen and Radhakrishnan helped make it a standard item in collections of the “principal” Upaniṣads.${C(4,5,15,16,18)}`)}
        ${P(`Modern Hindu interpreters have also read the text creatively rather than only historically. Sri Aurobindo, for example, treats Agni, Vāyu and Indra as cosmic and psychological powers and Umā as a higher knowledge through which mind learns the truth of Brahman. That is a modern spiritual interpretation, not the only historical meaning of the early prose, but it shows how the Kena’s compact myth has continued to generate new readings.${C(17)}`)}
        ${P(`Today readers can move between several kinds of online source: SanskritDocuments for a convenient Sanskrit text, the Sanskrit Library for the larger Jaiminīya setting, public-domain translations of Müller and older commentaries, Vasu’s translation of Madhva, and the Raṅgarāmānuja edition on Sanskrit Wikisource. They are not interchangeable. One is a reading text, another preserves the surrounding Vedic work, another represents a particular Vedānta school. Knowing what kind of source you are looking at is part of reading the Kena responsibly.${C(3,8,12,19)}`)}
      </section>

      <section class="kena-section" id="kena-significance">
        <h2>Significance</h2>
        ${P(`The Kena is only a few pages long, but it manages to connect several major strands of Hindu thought. It asks a question about consciousness, turns that question into a story about divine pride, gives a goddess the decisive act of revelation, and ends by returning to discipline, Veda and truth. That combination is one reason later Vedānta schools could disagree so strongly over it while still treating it as authoritative.${C(1,6,8,9,12)}`)}
        ${P(`Historically, it is also a useful reminder that an “Upaniṣad” was not always a free-standing book in the modern sense. The Kena grew out of a particular Sāmavedic school and only later acquired the independent life by which most readers know it. Philosophically, its most durable challenge remains the opening one: before asking what we know, ask what makes knowing possible.${C(1,2,3,20)}`)}
      </section>
      ${referencesHtml()}
    `;
  }

  function enhance(article) {
    if (!article || article.dataset.readerFriendly === '1') return;
    article.dataset.readerFriendly = '1';

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
            <li><a href="#kena-textual">Text, manuscripts and editions</a></li>
            <li><a href="#kena-reception">Commentarial reception</a></li>
            <li><a href="#kena-modern-reception">Translations and modern reception</a></li>
            <li><a href="#kena-significance">Significance</a></li>
            <li><a href="#kena-references">References</a></li>
          </ol>
        </nav>`);
    }

    article.querySelectorAll('.kena-section').forEach(section => section.remove());
    article.querySelector('.kena-wiki-toc')?.insertAdjacentHTML('afterend', articleBodyHtml());
  }

  const observer = new MutationObserver(() => {
    const article = document.querySelector('.kena-article');
    if (article) enhance(article);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();