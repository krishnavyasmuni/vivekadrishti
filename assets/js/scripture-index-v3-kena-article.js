(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let shade = null;
  let reader = null;

  const C = (...nums) => `<sup class="kena-cite">${nums.map(n => `<a href="#kena-ref-${n}">[${n}]</a>`).join('')}</sup>`;
  const P = (html) => `<p>${html}</p>`;
  const H3 = (t) => `<h3>${esc(t)}</h3>`;
  const LI = (items) => `<ul>${items.map(x => `<li>${x}</li>`).join('')}</ul>`;

  const refs = [
    'Patrick Olivelle, The Early Upaniṣads: Annotated Text and Translation (New York: Oxford University Press, 1998), introduction pp. xxxvi–xxxvii and “Kena Upaniṣad,” pp. 363–371.',
    'Hanns Oertel, “The Jāiminīya or Talavakāra Upaniṣad Brāhmaṇa: Text, Translation, and Notes,” Journal of the American Oriental Society 16 (1896): 79–260.',
    'The Sanskrit Library, digital edition of the Jaiminīya-Upaniṣad-Brāhmaṇa, based on the Oertel/TITUS text; Kena corresponds to JUB 4.18–21 in modern numbering.',
    'F. Max Müller, trans., The Upanishads, Part I, Sacred Books of the East 1 (Oxford, 1879), introduction pp. lxxxix–xci and Talavakāra/Kena translation, pp. 147–153.',
    'Paul Deussen, Sechzig Upanishad’s des Veda (Leipzig: F. A. Brockhaus, 1897), introduction to the Kena-Upaniṣad; see especially his analysis of the verse and prose strata.',
    'S. Sitarama Sastri, trans., Kena Upanishad with Sri Sankara’s Commentary (Madras, early 20th century editions); Sanskrit Padabhāṣya also available in traditional editions of the Kenopaniṣad.',
    'Sengaku Mayeda, study of the authenticity of Śaṅkara’s Kena Padabhāṣya and Vākyabhāṣya, Indo-Iranian Journal 10 (1967): 33–55; compare later surveys of Śaṅkara-authorship criteria.',
    'Śrīśa Chandra Vasu, trans., The Kena Upanishad with the Commentary of Sri Madhvacharya (Allahabad, 1909).',
    'David Kinsley, Hindu Goddesses: Visions of the Divine Feminine in the Hindu Religious Tradition (Berkeley: University of California Press, 1986), p. 36, on Umā Haimavatī and the caution against simply identifying the Kena figure with the fully developed later Pārvatī.',
    'Vedic Heritage Portal, “Jaiminīyopaniṣad Brāhmaṇa,” on the Jaiminīya/Talavakāra Sāmaveda school and the character of the Upaniṣad-Brāhmaṇa.',
    'Bāla Śāstrī Āgaśe, ed., Kenopaniṣad with the Padabhāṣya and Vākyabhāṣya of Śaṅkara and later glosses, Ānandāśrama Sanskrit Series 6 (Poona, 1896; later editions).',
    'Raṅgarāmānuja, Kenopaniṣadbhāṣya / Prakāśikā, printed in early 20th-century South Indian editions; important for the later Viśiṣṭādvaita reception of the text.'
  ];

  function close() {
    shade?.remove();
    reader?.remove();
    shade = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed','false');
    });
  }

  function articleHtml() {
    return `
      <div class="kena-article" id="kena-top">
        <aside class="kena-infobox">
          <div class="kena-infobox-title">Kena Upaniṣad</div>
          <div class="kena-info-row"><b>Sanskrit</b><span>केनोपनिषद्</span></div>
          <div class="kena-info-row"><b>Older title</b><span>Talavakāra Upaniṣad</span></div>
          <div class="kena-info-row"><b>Veda</b><span>Sāmaveda</span></div>
          <div class="kena-info-row"><b>School</b><span>Jaiminīya / Talavakāra</span></div>
          <div class="kena-info-row"><b>Textual location</b><span>Jaiminīya Upaniṣad-Brāhmaṇa 4.18–21</span></div>
          <div class="kena-info-row"><b>Form</b><span>4 khaṇḍas; verse followed by prose</span></div>
          <div class="kena-info-row"><b>Traditional class</b><span>Mukhya Upaniṣad; no. 2 in the Muktikā list</span></div>
          <div class="kena-info-row"><b>Date</b><span>Disputed; layered late-Vedic / late first-millennium BCE text</span></div>
        </aside>

        <div class="kena-lead">
          ${P(`The <i>Kena Upaniṣad</i>, also known by its older school-title <i>Talavakāra Upaniṣad</i>, is a short but unusually sophisticated Sāmavedic Upaniṣad belonging to the Jaiminīya or Talavakāra branch of the Sāmaveda. In the surviving Jaiminīya textual tradition it is not originally a free-standing book: it occupies Jaiminīya Upaniṣad-Brāhmaṇa 4.18–21. Its later name comes from its opening word <i>kena</i>, “by whom?” — the first word of a question asking what power impels mind, breath, speech, sight and hearing.${C(1,2,3)}`)}
          ${P(`The text is built from two sharply different literary halves. Khaṇḍas 1–2 are predominantly metrical and formulate an epistemology of Brahman through paradox: Brahman is not an object grasped by mind or senses, but the enabling reality through which mind and senses function. Khaṇḍas 3–4 retell the same claim as a prose myth. The gods win a victory, become proud, and are humbled by a mysterious <i>yakṣa</i>; Agni and Vāyu discover that their powers fail before it, and Indra learns from the radiant woman Umā Haimavatī that the unknown being was Brahman.${C(1,4)}`)}
        </div>

        <section class="kena-section" id="kena-history">
          <h2>Textual history and date</h2>
          ${H3('Place in the Sāmaveda')}
          ${P(`Olivelle identifies the Kena as part of the Jaiminīya Upaniṣad-Brāhmaṇa, at 4.18–21, and notes that only later did it circulate as an independent Upaniṣad under a title derived from its first word. This matters because the work belongs to a living Sāmavedic school context: the surrounding Jaiminīya Upaniṣad-Brāhmaṇa is a late-Vedic prose work concerned with Sāman speculation, ritual symbolism, sacred sound and myth, not a miscellaneous anthology to which Kena was casually appended.${C(1,3,10)}`)}
          ${P(`Older printed scholarship had to reconstruct this setting from commentarial testimony. Śaṅkara described the Upaniṣad as belonging to the Talavakāra Brāhmaṇa. In 1878 A. C. Burnell reported a South Indian manuscript that substantially confirmed the existence of the expected Sāmavedic text. Max Müller discussed Burnell’s discovery in the introduction to his 1879 translation. Hanns Oertel then published the Jaiminīya/Talavakāra Upaniṣad-Brāhmaṇa with text, translation and notes in 1896, allowing Kena to be studied in its wider textual environment rather than as an isolated philosophical fragment.${C(2,4)}`)}

          ${H3('Chronology')}
          ${P(`There is no single securely datable “composition year.” The mixed verse-prose form has long encouraged theories of stratification. Paul Deussen treated the prose mythic material as older and the metrical philosophical section as a later layer, seeing Kena as a bridge between the oldest prose Upaniṣads and the later metrical Upaniṣads. Patrick Olivelle, using a different relative chronology, calls Kena the oldest of the verse Upaniṣads and places the verse-Upaniṣad group broadly in the last few centuries BCE. These are relative literary chronologies, not dates established by inscription or manuscript colophon.${C(1,5)}`)}
          ${P(`The safest scholarly description is therefore that the received Kena is layered: it preserves a prose narrative continuous with late-Vedic Brāhmaṇa/Upaniṣad storytelling and a compact metrical teaching that belongs to the developing verse-Upaniṣad idiom. The direction and precise dates of the layers remain debated. Any date printed as a single century should be read as an approximation to a textual stratum, not the lifetime of a historical author.${C(1,5)}`)}

          ${H3('Division and numbering')}
          ${P(`All standard recensions divide the Upaniṣad into four khaṇḍas, but editions do not always segment and number every sentence or mantra identically. That is why modern books can give slightly different totals for the “number of verses.” The stable textual fact is the four-part architecture: two predominantly metrical khaṇḍas followed by two prose khaṇḍas.${C(1,4,11)}`)}
        </section>

        <section class="kena-section" id="kena-contents">
          <h2>Contents</h2>
          <div class="kena-structure">
            <div class="kena-structure-row"><b>Khaṇḍa 1</b><span>Inquiry into the power behind mind, speech, breath, sight and hearing; Brahman described as the condition of cognition rather than an object of cognition.</span></div>
            <div class="kena-structure-row"><b>Khaṇḍa 2</b><span>Paradox of knowing Brahman; the person who thinks Brahman is simply an object “known well” has misunderstood it.</span></div>
            <div class="kena-structure-row"><b>Khaṇḍa 3</b><span>The gods’ victory, the appearance of the yakṣa, and the failure of Agni and Vāyu to demonstrate their powers before it.</span></div>
            <div class="kena-structure-row"><b>Khaṇḍa 4</b><span>Umā reveals the yakṣa as Brahman; divine and psychological analogies, the name <i>Tadvana</i>, and the concluding discipline of tapas, restraint, ritual action, Veda and truth.</span></div>
          </div>

          ${H3('Khaṇḍa 1: “By whom?”')}
          ${P(`The opening does not begin by defining Brahman. It begins by questioning agency. The pupil asks: by whose impulse does the mind move toward its objects, by whose command does the first breath function, by whose will is speech uttered, and what deity directs eye and ear? The teacher answers with a deliberately second-order formula: Brahman is the “ear of the ear,” “mind of the mind,” “speech of speech,” “breath of breath” and “eye of the eye.” The point is not that Brahman is another hidden sense-organ. It is the condition that makes the ordinary faculties possible while not itself becoming one more object within their field.${C(1,4)}`)}
          ${P(`The remainder of the khaṇḍa repeats this structure faculty by faculty. Speech does not express Brahman; rather, speech is possible through it. Mind does not think Brahman as an ordinary object; rather, thinking itself depends upon it. The same pattern is applied to sight, hearing and breath. This produces the text’s characteristic apophatic style: Brahman is approached by denying that it can be contained within the normal subject-object structure of cognition.${C(1,6)}`)}

          ${H3('Khaṇḍa 2: knowledge that is not possession')}
          ${P(`The second khaṇḍa turns the first section into an explicit problem of knowledge. A teacher warns the pupil that if he thinks he “knows Brahman well,” he knows only a limited appearance of it. The pupil answers with the famous paradox that he does not think he knows it in the ordinary sense, but neither does he simply not know it. The following statement radicalizes the point: the person for whom Brahman is merely an object of thought has missed it, while genuine knowledge requires recognizing a reality that cannot be placed opposite the knower like an ordinary thing.${C(1,4,6)}`)}
          ${P(`A key expression is <i>pratibodhaviditam</i> in 2.4. The phrase has generated substantial Vedāntic interpretation because it can be read along the lines of “known in/through every act of cognition.” Śaṅkara uses it to argue that Brahman is the self-revealing consciousness present through cognitions rather than a separately perceived object. The verse immediately joins this insight to <i>amṛtatva</i>, immortality: strength comes through the self, and immortality through knowledge.${C(6,11)}`)}

          ${H3('Khaṇḍa 3: the yakṣa and the humiliation of the gods')}
          ${P(`The prose half begins with a narrative reversal. Brahman wins a victory for the gods, but the gods attribute the triumph to themselves. Brahman appears before them as an unidentified <i>yakṣa</i>, a strange or numinous being. Agni is sent first. Asked to identify himself and his power, he boasts that he can burn everything on earth. The yakṣa places a straw before him; Agni cannot burn it. Vāyu then boasts that he can carry away everything on earth, but cannot move the same straw. Neither god can identify the being whose presence has rendered his characteristic cosmic power ineffective.${C(1,2,4)}`)}
          ${P(`Indra approaches next. Unlike Agni and Vāyu, he does not receive a contest. The yakṣa vanishes. In the same space Indra encounters a radiant woman named Umā Haimavatī and asks her what the mysterious being was. The narrative thus changes the route to knowledge: raw divine power fails, and the answer arrives through instruction.${C(1,4)}`)}

          ${H3('Khaṇḍa 4: Umā’s disclosure and the epilogue')}
          ${P(`Umā tells Indra that the being was Brahman and that the gods’ victory was Brahman’s victory. Because Agni, Vāyu and Indra came nearest to Brahman, the text ranks them above the other gods; Indra is highest among the three because he was the first to know. The narrative does not abolish the gods. It reorders their status by making their powers derivative from a reality they initially fail to recognize.${C(1,4)}`)}
          ${P(`The text then gives two compressed “teachings” or analogies concerning Brahman. On the divine level it is compared to the sudden flash of lightning; on the level of the person it is connected with the rapid movement or recollective activity of mind. Brahman is given the meditative name <i>Tadvana</i> (“that which is desired/loved,” though the etymology and translation are interpreted differently), and the disciple is told to meditate upon it under that name.${C(1,4)}`)}
          ${P(`The final prose is especially important because it prevents a simplistic reading of Kena as a rejection of the Vedic discipline around it. When the pupil asks for the Upaniṣad, the teacher replies that it has been taught, then names <i>tapas</i> (austerity), <i>dama</i> (self-restraint) and <i>karma</i> (ritual/action) as its supports; the Vedas are its limbs and truth its abode. Knowledge is therefore embedded in an ethical and Vedic discipline even though Brahman itself cannot be reduced to ritual or conceptual mastery.${C(1,4)}`)}
        </section>

        <section class="kena-section" id="kena-philosophy">
          <h2>Philosophical themes</h2>
          ${H3('Brahman as the condition of knowing')}
          ${P(`Kena’s most distinctive philosophical move is to turn attention from what consciousness knows to what makes knowing possible. Eye, ear, speech and mind are all objects of reflection; Brahman is described as that through which these faculties operate. This is why the text repeatedly refuses to place Brahman inside the ordinary contrast between a knowing subject and a known object. Its negative language is therefore epistemological as much as theological.${C(1,6)}`)}

          ${H3('Knowledge and ignorance')}
          ${P(`The paradoxes of khaṇḍa 2 are not a celebration of ignorance. They distinguish two senses of “knowing.” To know Brahman as one knows a visible object is precisely to misconstrue it; to recognize Brahman as the ground of cognition is a different kind of knowledge. Later Vedānta traditions disagree about the metaphysical implications of this distinction, but all major commentators take the passage seriously as a warning against treating the highest reality as an ordinary finite object.${C(6,8,12)}`)}

          ${H3('Brahman and the gods')}
          ${P(`The yakṣa story gives theological form to the same epistemology. Agni and Vāyu are not denied their cosmic functions; rather, their inability to burn or move a straw demonstrates that their powers are not self-grounding. The gods’ mistake is appropriation: they treat a victory dependent upon Brahman as their own autonomous achievement. The narrative therefore joins metaphysics to a critique of divine pride.${C(1,2)}`)}

          ${H3('Umā Haimavatī')}
          ${P(`Umā Haimavatī is one of the most discussed figures in the text. She appears only at the decisive moment and functions as the one who knows what the gods do not: she identifies the vanished yakṣa as Brahman. Later Hindu tradition readily identifies her with Pārvatī/Umā, and Śaṅkara’s commentary interprets her in connection with <i>vidyā</i>, knowledge personified. Modern historians are more cautious. David Kinsley notes that directly equating the Kena figure with the fully developed later Satī-Pārvatī is conjectural; the passage itself names “Umā Haimavatī” but does not narrate a relation to Śiva.${C(6,9)}`)}
          <div class="kena-note">The safest historical formulation is therefore: Kena contains an early named Umā Haimavatī who acts as revealer of Brahman. Later Śaiva and Śākta traditions identify her with the Goddess/Pārvatī, but that fuller identity should not simply be read backward into the oldest layer without qualification.</div>
        </section>

        <section class="kena-section" id="kena-textual">
          <h2>Textual and philological issues</h2>
          ${H3('A composite literary form')}
          ${P(`The abrupt movement from terse metrical instruction to Brāhmaṇa-style prose narrative is not accidental. It is one of the principal pieces of evidence used in arguments about the work’s formation. Deussen took the prose portion to preserve an older layer and the verses to represent a later philosophical restatement. Olivelle is more cautious about reconstructing such a simple sequence, but still treats the text’s two halves as formally distinct. The present form should therefore be studied both as a literary unity and as a text with internal strata.${C(1,5)}`)}

          ${H3('Relation to the Jaiminīya Upaniṣad-Brāhmaṇa')}
          ${P(`The independent “Kena Upaniṣad” is only one phase of the text’s history. In the Jaiminīya school it belongs to a larger Upaniṣad-Brāhmaṇa. Oertel’s edition and modern electronic editions make it possible to compare the Kena passages with the surrounding Jaiminīya prose. This wider setting is essential for philology because vocabulary, prose style and Sāmavedic theological concerns can be compared within the same school corpus.${C(2,3)}`)}

          ${H3('Modern rediscovery and editions')}
          ${P(`The nineteenth-century history of the text is unusually instructive. European translators initially knew the Kena largely as an independently transmitted Upaniṣad and through the commentarial tradition. Burnell’s South Indian manuscript brought the Talavakāra/Jaiminīya textual setting back into view; Müller publicized the discovery; Oertel’s 1896 publication then supplied a large-scale scholarly edition and translation of the Jaiminīya Upaniṣad-Brāhmaṇa. Later Sanskrit editions, including Ānandāśrama publications, transmitted the Kena together with Śaṅkara-attributed commentaries and glosses.${C(2,4,11)}`)}
        </section>

        <section class="kena-section" id="kena-reception">
          <h2>Commentarial reception</h2>
          ${H3('Śaṅkara and Advaita')}
          ${P(`The Kena has an unusual place in the Śaṅkara corpus because tradition transmits two commentaries attributed to Śaṅkara: a <i>Padabhāṣya</i> and a <i>Vākyabhāṣya</i>. Modern scholars have debated the authenticity of the Vākyabhāṣya, but Sengaku Mayeda’s application of textual criteria argued in favor of the authenticity of both. The commentaries make Kena central to Advaita reflection on self-luminous consciousness, the impossibility of objectifying Brahman, and the relation of Brahman to Īśvara.${C(6,7,11)}`)}
          ${P(`For Advaita, the expression <i>pratibodhaviditam</i> is especially important: Brahman/Ātman is not inferred as a hidden entity behind mental states but is present as the consciousness because of which every cognition is disclosed. The yakṣa story is correspondingly read as demonstrating that all finite powers — even divine ones — depend upon Brahman.${C(6)}`)}

          ${H3('Madhva and later Vedānta')}
          ${P(`Madhva also wrote a full commentary on the Kena. His Dvaita reading preserves the text’s strongly theistic dimension and interprets the supreme directing reality in a personal theistic framework rather than as an identity of individual self and nondual Brahman. Later Vedānta traditions likewise commented on the text; Raṅgarāmānuja’s commentary is an important Śrīvaiṣṇava/Viśiṣṭādvaita witness. The existence of these mutually incompatible but textually serious readings is evidence for how compact Kena’s formulations are: the same few verses became a testing ground for rival Vedānta ontologies.${C(8,12)}`)}

          ${H3('Umā in later religious history')}
          ${P(`The appearance of Umā Haimavatī was also absorbed into later Goddess traditions. Śaiva and Śākta readings identify her as the divine Goddess who alone can disclose Brahman to Indra. Historically, however, scholars distinguish the role she plays in Kena from the much fuller mythology of Pārvatī as Śiva’s wife that develops in epic and Purāṇic literature.${C(9)}`)}
        </section>

        <section class="kena-section" id="kena-significance">
          <h2>Significance</h2>
          ${P(`Kena is important not because it presents a large doctrinal system but because it condenses several major transitions in early Indian religious thought into a very small text. It belongs to a Vedic school yet questions whether ultimate reality can be reached through the same faculties by which ordinary objects are known. It retains the gods yet subordinates their powers to Brahman. It uses both speculative verse and mythic prose. It ends not by discarding Vedic discipline but by integrating knowledge with austerity, restraint, action, Veda and truth.${C(1,2,4)}`)}
          ${P(`Its central question — what is the power by which thought thinks and hearing hears? — made the Upaniṣad especially fertile for Vedānta. Advaita could read it as an analysis of self-luminous consciousness; theistic Vedānta could emphasize the supreme agent directing finite powers; Goddess traditions could focus on Umā as revealer of the absolute. The text’s historical importance lies precisely in this combination of brevity, ambiguity and structural sophistication.${C(6,8,9,12)}`)}
        </section>

        <section class="kena-section kena-references" id="kena-references">
          <h2>References</h2>
          <ol>${refs.map((r,i) => `<li id="kena-ref-${i+1}">${esc(r)} <a class="kena-refback" href="#kena-top" aria-label="Back to top">↩</a></li>`).join('')}</ol>
        </section>
      </div>`;
  }

  function open(button) {
    close();
    button.classList.add('is-active');
    button.setAttribute('aria-pressed','true');
    shade = document.createElement('div');
    shade.className = 'kena-article-backdrop';
    reader = document.createElement('article');
    reader.className = 'kena-article-reader';
    reader.setAttribute('role','dialog');
    reader.setAttribute('aria-modal','true');
    reader.setAttribute('aria-label','Kena Upaniṣad encyclopedia article');
    reader.innerHTML = `<header class="kena-article-head"><div><span class="eyebrow">Scripture encyclopedia</span><h1>Kena Upaniṣad</h1></div><button type="button" class="kena-article-close" aria-label="Close">×</button></header><div class="kena-article-scroll">${articleHtml()}</div>`;
    document.body.append(shade, reader);
    document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('.shastra-name');
    if (!b || !root.contains(b)) return;
    const name = b.dataset.name || b.querySelector('span')?.textContent?.trim() || b.textContent.trim();
    if (name !== 'Kena') return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    open(b);
  }, true);

  document.addEventListener('click', e => {
    if (e.target === shade || e.target.closest('.kena-article-close')) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && reader) close();
  });
})();