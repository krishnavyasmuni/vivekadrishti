(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  let shade = null;
  let reader = null;

  const C = (...nums) => `<sup class="kena-cite">${nums.map(n => `<a href="#kena-ref-${n}">[${n}]</a>`).join('')}</sup>`;
  const P = html => `<p>${html}</p>`;
  const H3 = t => `<h3>${esc(t)}</h3>`;

  const refs = [
    'Patrick Olivelle, The Early Upaniṣads: Annotated Text and Translation (New York: Oxford University Press, 1998), introduction pp. xxxvi–xxxvii; Kena Upaniṣad, pp. 363–371.',
    'Hanns Oertel, “The Jāiminīya or Talavakāra Upaniṣad Brāhmaṇa: Text, Translation, and Notes,” Journal of the American Oriental Society 16 (1896): 79–260.',
    'F. Max Müller, trans., The Upanishads, Part I, Sacred Books of the East 1 (Oxford: Clarendon Press, 1879), introduction pp. lxxxix–xci; Talavakāra/Kena translation pp. 147–153.',
    'A. C. Burnell, letter from Tanjore, 8 December 1878, reporting his Talavakāra-Brāhmaṇa manuscript; printed by Müller in Sacred Books of the East 1, pp. lxxxix–xci.',
    'Paul Deussen, Sechzig Upanishad’s des Veda (Leipzig: F. A. Brockhaus, 1897), introduction to the Kena-Upaniṣad and his periodisation of the principal Upaniṣads.',
    'Masato Fujii, “On the Formation and Transmission of the Earliest Upaniṣadic Literature: An Introduction to the Study of the Jaiminīya-Upaniṣad-Brāhmaṇa,” Machikaneyama Ronso, Philosophy 23 (1989): 13–25, esp. p. 18 on the independent transmission of the Kena portion.',
    'Masato Fujii, “Ritual Chant and Thought: How Was the First Upaniṣad Born?”, Jinbun Gakuhō 115 (2020): 51–91; discussion of JUB 4.10.1–4 (= 4.18–21) and the Jaiminīya textual setting.',
    'S. Sitarama Sastri, trans., Kena Upanishad with Sri Sankara’s Commentary (Madras, early twentieth-century editions), together with Sanskrit editions of the Padabhāṣya.',
    'Sengaku Mayeda, “On Śaṅkara’s Authorship of the Kenopaniṣadbhāṣya,” Indo-Iranian Journal 10, no. 1 (1967): 33–55.',
    'Śrīśa Chandra Vasu, trans., The Kena Upanishad with the Commentary of Sri Madhvacharya (Allahabad, 1909).',
    'David Kinsley, Hindu Goddesses: Visions of the Divine Feminine in the Hindu Religious Tradition (Berkeley: University of California Press, 1986), p. 36.',
    'Bāla Śāstrī Āgaśe, ed., Kenopaniṣad with the Padabhāṣya and Vākyabhāṣya of Śaṅkara and later glosses, Ānandāśrama Sanskrit Series 6 (Poona, 1896; later editions).',
    'R. D. Ranade, A Constructive Survey of Upanishadic Philosophy (Poona, 1926), chronological grouping of the principal Upaniṣads.',
    'Stephen H. Phillips, Yoga, Karma, and Rebirth: A Brief History and Philosophy (New York: Columbia University Press, 2009), ch. 1, on relative chronology of the early Upaniṣads.',
    'Moriz Winternitz, A History of Indian Literature, vol. 1, discussion of the principal Upaniṣads and their relative antiquity.',
    'Eduard Roer, ed./trans., Bibliotheca Indica editions of the principal Upaniṣads, including Kena, nineteenth century; useful for the history of printed transmission before the full Jaiminīya context was recovered.'
  ];

  function close() {
    shade?.remove(); reader?.remove(); shade = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b => {
      b.classList.remove('is-active'); b.setAttribute('aria-pressed','false');
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
          <div class="kena-info-row"><b>Textual location</b><span>JUB 4.10.1–4 = modern 4.18–21</span></div>
          <div class="kena-info-row"><b>Burnell MS</b><span>Khaṇḍas 135–145; tenth anuvāka</span></div>
          <div class="kena-info-row"><b>Form</b><span>Four khaṇḍas; verse + prose</span></div>
          <div class="kena-info-row"><b>Date</b><span>No secure absolute date; relative chronology disputed</span></div>
          <div class="kena-info-row"><b>Canonical status</b><span>Mukhya; no. 2 in Muktikā</span></div>
        </aside>

        <div class="kena-lead">
          ${P(`The <i>Kena Upaniṣad</i> is a short Sāmavedic Upaniṣad preserved by the Jaiminīya or Talavakāra school. In its oldest recoverable scholastic setting it was not an isolated booklet: it formed the concluding Kena portion of the <i>Jaiminīya Upaniṣad-Brāhmaṇa</i> (JUB), conventionally cited today as 4.18–21, or in Fujii’s alternative internal numbering as 4.10.1–4.${C(1,2,6,7)}`)}
          ${P(`Its history is unusually visible for so small a text. The work moved from a school-bound Sāmavedic setting into an independent Vedāntic career; its old title <i>Talavakāra Upaniṣad</i> gave way to <i>Kena</i>, from its opening word “by whom?”. The surviving text also contains a conspicuous literary seam: two predominantly metrical khaṇḍas are followed by two prose khaṇḍas. That seam has generated competing chronological models since the nineteenth century.${C(1,5)}`)}
        </div>

        <section class="kena-section">
          <h2>Textual transmission and manuscript history</h2>
          ${H3('The Jaiminīya/Talavakāra setting')}
          ${P(`The decisive fact for the textual history of Kena is its affiliation with the Jaiminīya, also called Talavakāra, branch of the Sāmaveda. Olivelle edits the text as JUB 4.18–21. Fujii likewise treats it as JUB 4.10.1–4 (= 4.18–21), stressing that this portion acquired an independent status not shared, in later Vedāntic canon formation, by the whole JUB.${C(1,6,7)}`)}
          ${P(`This school-context matters chronologically. The JUB is itself a late-Vedic Sāmavedic prose text in which speculation grows out of chant, ritual, sacred sound, prāṇa and eschatological reflection. Kena therefore did not originate in the same literary environment as much later free-standing sectarian Upaniṣads; it belongs to a Vedic śākhā tradition and only subsequently acquired an independent pan-Vedāntic identity.${C(2,7)}`)}

          ${H3('Śaṅkara’s inherited text and the ninth-adhyāya problem')}
          ${P(`Before the wider Talavakāra text became available to European editors, Śaṅkara’s commentary was one of the chief witnesses to Kena’s original location. Śaṅkara presents the Upaniṣad as beginning the ninth adhyāya after earlier material on sacrifice, prāṇa-upāsanā, fivefold and sevenfold Sāmans, the Gāyatra-sāman and a vaṃśa or teacher genealogy. Ānandagiri also associated the work with the Talavakāra śākhā.${C(3,8)}`)}
          ${P(`That description proved substantially right about the contents but not identical with the divisions of the manuscript later reported by Burnell. This is an important warning: “where Kena begins” depends partly on the inherited division-system of a particular recensional or commentarial line, not merely on the wording of the text.${C(3,4)}`)}

          ${H3('Burnell’s 1878 manuscript report')}
          ${P(`On 8 December 1878, A. C. Burnell wrote to Max Müller from Tanjore describing a manuscript of the Talavakāra-Brāhmaṇa. Burnell reported that its penultimate book was called the Upaniṣad-Brāhmaṇa and comprised 145 khaṇḍas. In that manuscript, the Kena occupied khaṇḍas 135–145, constituting the tenth anuvāka; the 134th khaṇḍa was a vaṃśa. Burnell explicitly remarked that the manuscript agreed closely with Śaṅkara’s description in contents but not in its formal divisions, and that the beginning and end of “the Upaniṣad” were not specially marked in the manuscript.${C(3,4)}`)}
          ${P(`This is more than a curiosity about numbering. It shows that the independent Kena known to Vedānta was carved out of a continuous Sāmavedic textual transmission whose own manuscripts did not necessarily mark the work as an autonomous book. The later canonical unit and the older śākhā unit were overlapping but not identical ways of organizing the same material.${C(3,4)}`)}

          ${H3('Müller, Oertel and the recovery of the wider text')}
          ${P(`Müller published Burnell’s report in 1879, making the Talavakāra setting part of modern Upaniṣad scholarship. Hanns Oertel’s 1896 edition and translation of the <i>Jaiminīya or Talavakāra Upaniṣad-Brāhmaṇa</i> then transformed the situation: Kena could now be compared with its surrounding Jaiminīya prose rather than reconstructed solely from Kena manuscripts and Vedāntic commentaries.${C(2,3)}`)}
          ${P(`Modern references such as “JUB 4.18–21” belong to this critical-editorial history. Burnell’s “135–145 / tenth anuvāka,” Śaṅkara’s “ninth adhyāya,” and modern JUB numbering are not three different Kenas; they are different systems for segmenting and citing the transmitted material.${C(1,2,3,4)}`)}

          ${H3('Independent transmission and Atharvavedic collections')}
          ${P(`Deussen observed that once the text had detached from the literary property of its Sāmavedic school and acquired wider authority, it entered general collections of Upaniṣads, including collections transmitted as Atharvavedic Upaniṣads. This secondary collection-history does not change Kena’s original Sāmavedic affiliation. It documents a later stage in which “Upaniṣad” functioned as a cross-school canonical category rather than only as a component of one Vedic śākhā.${C(5)}`)}
          ${P(`The distinction is useful when comparing manuscripts. A Kena copied inside a later multi-Upaniṣad anthology is evidence for the independent canonical text; it is not automatically evidence for the older arrangement of the Jaiminīya school-text from which Kena emerged.${C(1,5)}`)}

          ${H3('Oral survival after loss of the larger JUB')}
          ${P(`Fujii’s fieldwork adds an unusually valuable modern datum. Writing in 1989, he reported that Jaiminīya Brahmins in Tamil Nadu no longer maintained complete oral recitation of the JUB, yet still recited the Kena portion independently. That situation is a living illustration of the historical process inferred from the manuscripts: a small section of a larger school-text could survive because Vedāntic canonization gave it a second, independent line of transmission.${C(6)}`)}

          <div class="kena-structure">
            <div class="kena-structure-row"><b>School stage</b><span>Kena forms part of Jaiminīya/Talavakāra Upaniṣad-Brāhmaṇa.</span></div>
            <div class="kena-structure-row"><b>Vedāntic stage</b><span>The section circulates independently as Talavakāra/Kena Upaniṣad and attracts commentaries.</span></div>
            <div class="kena-structure-row"><b>1878</b><span>Burnell reports the Tanjore Talavakāra manuscript: khaṇḍas 135–145, tenth anuvāka.</span></div>
            <div class="kena-structure-row"><b>1879</b><span>Müller publishes Burnell’s manuscript evidence and English translation.</span></div>
            <div class="kena-structure-row"><b>1896</b><span>Oertel publishes the wider Jaiminīya/Talavakāra Upaniṣad-Brāhmaṇa.</span></div>
            <div class="kena-structure-row"><b>1897</b><span>Deussen analyses Kena as a bridge between prose and metrical Upaniṣadic phases.</span></div>
            <div class="kena-structure-row"><b>1989</b><span>Fujii reports independent Kena recitation among Tamil Jaiminīya Brahmins after loss of full JUB oral recitation.</span></div>
            <div class="kena-structure-row"><b>1998</b><span>Olivelle edits/translates Kena in the JUB 4.18–21 setting and places it at the beginning of the verse-Upaniṣad phase.</span></div>
          </div>
        </section>

        <section class="kena-section">
          <h2>Dating and relative chronology</h2>
          ${H3('Why there is no secure absolute date')}
          ${P(`No colophon gives a historical author or regnal year; no early manuscript is contemporary with composition; and no inscription independently fixes the text to a particular century. Dating is therefore relative. Scholars compare language, metre, prose style, the text’s relation to Brāhmaṇa literature, the development of Upaniṣadic concepts, and possible dependence between texts. A date such as “sixth century BCE” or “fourth century BCE” is consequently a model, not a directly witnessed fact.${C(1,5,13,14,15)}`)}

          ${H3('The internal seam: verse and prose')}
          ${P(`The most obvious chronological problem is internal. Khaṇḍas 1–2 are predominantly verse, apart from a short prose gloss at the beginning of the second khaṇḍa; khaṇḍas 3–4 are prose. The shift is not merely stylistic. The verse section states the problem of Brahman’s inexpressibility and non-objectifiability abstractly, while the prose section dramatizes divine dependence on Brahman through the yakṣa narrative.${C(1,3,5)}`)}
          ${P(`A simple “prose is earlier, verse is later” rule cannot by itself settle the history. Verse occurs inside old prose texts, prose can be imitated archaically, and a compiler can combine older and younger materials. The literary seam is evidence for stratification or compilation, but the direction and size of the chronological gap require further argument.${C(1,5)}`)}

          ${H3('Deussen’s model')}
          ${P(`Deussen placed Kena on the boundary between what he called the ancient prose Upaniṣads and the metrical Upaniṣads. In his analysis, the prose narrative represents the older, Brāhmaṇa-like stratum, while the opening metrical section already belongs to the succeeding literary phase. He separated verses 1–13, prose 14–28, and a prose epilogue 29–34. This model explains the hybrid form as the result of textual growth across a transition in Upaniṣadic literary style.${C(5)}`)}

          ${H3('Olivelle’s model')}
          ${P(`Olivelle is more cautious about converting stylistic sequence into exact centuries. In his relative chronology, Kena is the oldest of the verse Upaniṣads, followed by works such as Kaṭha and Īśā, and belongs after the great early prose Upaniṣads. His broader warning is important: dating early Indian texts more closely than a few centuries is precarious because the surviving evidence supports relative ordering more securely than absolute chronology.${C(1)}`)}

          ${H3('Other relative chronologies')}
          ${P(`Ranade and later survey histories also place Kena among the early principal Upaniṣads, though their exact ordering differs. Phillips places it after Bṛhadāraṇyaka, Chāndogya, Īśā, Taittirīya and Aitareya but before Kaṭha, Muṇḍaka, Praśna, Māṇḍūkya, Śvetāśvatara and Maitrī. Winternitz treated it as pre-Buddhist/pre-Jaina literature. These schemes are useful chiefly as demonstrations of scholarly disagreement: the same linguistic and doctrinal evidence does not compel one universally accepted sequence.${C(13,14,15)}`)}

          ${H3('A conservative historical conclusion')}
          ${P(`The most defensible formulation is therefore not a single date but a chronological profile. Kena belongs to the older stratum of principal Upaniṣadic literature and to an actual Sāmavedic school tradition; its received form is composite in literary mode; and its first two khaṇḍas represent an early verse-Upaniṣad idiom. Whether the prose yakṣa narrative is materially older than the verses, as Deussen argued, remains a hypothesis rather than a manuscript-demonstrated fact.${C(1,5)}`)}
          <div class="kena-note"><b>Dating note.</b> The infobox deliberately says “no secure absolute date.” A scholarly article should distinguish the date of the recoverable Jaiminīya textual layer, the relative age of Kena’s prose and verse portions, and the much later date of the manuscripts and printed editions that preserve them.</div>
        </section>

        <section class="kena-section">
          <h2>Structure and contents</h2>
          <div class="kena-structure">
            <div class="kena-structure-row"><b>Khaṇḍa 1</b><span>“By whom?” — inquiry into the power behind mind, speech, breath, sight and hearing; Brahman as the condition of cognition.</span></div>
            <div class="kena-structure-row"><b>Khaṇḍa 2</b><span>Paradox of knowing Brahman; ordinary object-knowledge is inadequate to the reality that makes knowing possible.</span></div>
            <div class="kena-structure-row"><b>Khaṇḍa 3</b><span>The gods’ victory, the appearance of the yakṣa, and the failure of Agni and Vāyu before it.</span></div>
            <div class="kena-structure-row"><b>Khaṇḍa 4</b><span>Indra meets Umā Haimavatī; Brahman is disclosed as the source of the gods’ victory; Tadvana and concluding discipline.</span></div>
          </div>
          ${H3('Khaṇḍas 1–2: epistemology of Brahman')}
          ${P(`The opening asks what impels mind, breath, speech, sight and hearing. The answer — “ear of the ear,” “mind of the mind,” “speech of speech,” “breath of breath,” “eye of the eye” — shifts the inquiry from an unseen object behind the faculties to the condition by which the faculties operate. Khaṇḍa 2 then radicalizes the point: one who thinks Brahman is simply “well known” has objectified it and therefore misunderstood it.${C(1,3,8)}`)}
          ${P(`The expression <i>pratibodhaviditam</i> in 2.4 became especially important in Advaita interpretation. Śaṅkara reads it in terms of Brahman/Ātman being manifest through every cognition rather than standing as another cognized thing beside them.${C(8,12)}`)}

          ${H3('Khaṇḍas 3–4: the yakṣa narrative')}
          ${P(`After a divine victory the gods become proud. Brahman appears as an unidentified yakṣa. Agni claims the power to burn everything but cannot burn a straw placed before him; Vāyu claims the power to carry everything away but cannot move it. Indra approaches, the yakṣa disappears, and Umā Haimavatī reveals that it was Brahman and that the victory belonged to Brahman.${C(1,3)}`)}
          ${P(`The prose story performs the philosophical claim of the verse section in mythic form: powers that appear autonomous are shown to depend on a ground they cannot master. The final khaṇḍa then gives rapid analogies — including lightning and the movement of mind — and closes with tapas, restraint, action, Veda and truth as the footing of the teaching.${C(1,3)}`)}
        </section>

        <section class="kena-section">
          <h2>Philological and recensional problems</h2>
          ${H3('Section divisions are secondary witnesses')}
          ${P(`The discrepancy between Śaṅkara’s ninth-adhyāya description and Burnell’s tenth-anuvāka manuscript is one of the clearest examples of the danger of treating modern chapter numbers as if they were original authorial architecture. Even where wording is substantially stable, units can be grouped and named differently by recensions and teaching lineages.${C(3,4)}`)}
          ${H3('Verse 2.1 and the join between halves')}
          ${P(`Nineteenth-century editors already noticed that the transition between the metrical philosophical half and the prose divine narrative is textually awkward. Müller drew attention to wording in the second khaṇḍa that appears to prepare for the discussion of Brahman among the gods and argued that comparison of Sāmavedic and anthology witnesses showed signs of editorial handling. This is not enough to reconstruct a lost “original Kena,” but it is evidence that the received text has a redactional history.${C(3)}`)}
          ${H3('The title itself records canonization')}
          ${P(`The name <i>Kena</i> is a title from the opening word, like <i>Īśā</i>. Deussen noted that the older school-name was Talavakāra Upaniṣad and that “Kena” became normal after the text had separated from its school corpus and entered broader collections. The change of title is therefore itself a small piece of reception history.${C(1,5)}`)}
        </section>

        <section class="kena-section">
          <h2>History of interpretation</h2>
          ${H3('Śaṅkara')}
          ${P(`Kena is exceptional in the Śaṅkara corpus because two commentaries are transmitted under his name, conventionally called the Padabhāṣya and Vākyabhāṣya. Modern scholarship has therefore had to ask not only what “Śaṅkara says” but which commentary is authentic and how the two are related. Mayeda’s study is a major contribution to this authorship problem.${C(8,9,12)}`)}
          ${H3('Madhva and later Vedānta')}
          ${P(`Madhva’s commentary reads the Upaniṣad through a dualist Vaiṣṇava metaphysics rather than Śaṅkara’s nondual account. Later Vedāntic commentarial traditions likewise demonstrate that Kena’s compact paradoxes could support sharply different ontological readings while retaining the same transmitted base text.${C(10)}`)}
          ${H3('Umā Haimavatī')}
          ${P(`The prose story names the revealer simply as Umā Haimavatī. Later Śaiva and Śākta traditions identify her readily with Pārvatī, but historians of religion distinguish the wording of the early text from the fully developed later mythology. Kinsley treats the Kena passage as important early Goddess material while cautioning against reading the complete later Pārvatī identity back into it without qualification.${C(11)}`)}
        </section>

        <section class="kena-section kena-references" id="kena-references">
          <h2>References</h2>
          <ol>${refs.map((r,i) => `<li id="kena-ref-${i+1}">${esc(r)}</li>`).join('')}</ol>
        </section>
      </div>`;
  }

  function open(button) {
    close();
    button.classList.add('is-active'); button.setAttribute('aria-pressed','true');
    shade = document.createElement('div'); shade.className='kena-article-backdrop';
    reader = document.createElement('article'); reader.className='kena-article-reader'; reader.setAttribute('role','dialog'); reader.setAttribute('aria-modal','true');
    reader.innerHTML = `<header class="kena-article-head"><div><span class="eyebrow">Encyclopedia article · textual history first</span><h1>Kena Upaniṣad</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${articleHtml()}</div>`;
    document.body.append(shade, reader); document.documentElement.classList.add('kena-article-open'); reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }

  root.addEventListener('click', e => {
    const b=e.target.closest('.shastra-name');
    if(!b || !root.contains(b)) return;
    const name=b.dataset.name || b.querySelector('span')?.textContent?.trim() || b.textContent.trim();
    const kind=b.dataset.kind || '';
    if(name!=='Kena' || kind!=='Upaniṣad') return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); open(b);
  }, true);
  document.addEventListener('click', e => { if(e.target===shade || e.target.closest('.kena-article-close')) close(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape' && reader) close(); });
})();