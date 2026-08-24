(() => {
  const C = (...nums) => `<sup class="kena-cite">${nums.map(n => `<a href="#kena-ref-${n}">[${n}]</a>`).join('')}</sup>`;
  const P = html => `<p>${html}</p>`;

  function enhance(article) {
    if (!article || article.dataset.wikiEnhanced === '1') return;
    article.dataset.wikiEnhanced = '1';

    const infobox = article.querySelector('.kena-infobox');
    if (infobox) {
      const form = [...infobox.querySelectorAll('.kena-info-row')].find(r => r.querySelector('b')?.textContent.trim() === 'Form');
      form?.insertAdjacentHTML('afterend', `
        <div class="kena-info-row"><b>Verse count</b><span>13 metrical verses, followed by prose narrative and epilogue in common modern numbering</span></div>
        <div class="kena-info-row"><b>Major commentators</b><span>Śaṅkara, Madhva, Raṅgarāmānuja; later Advaita glossators</span></div>`);
    }

    const lead = article.querySelector('.kena-lead');
    lead?.insertAdjacentHTML('afterend', `
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

    const history = article.querySelector('#kena-history');
    if (history) {
      history.querySelector('h2').textContent = 'Chronology and textual history';
      history.insertAdjacentHTML('beforebegin', `
        <section class="kena-section" id="kena-etymology">
          <h2>Etymology and titles</h2>
          ${P(`The title <i>Kena</i> comes from the opening interrogative <i>kena</i> (केन), “by whom?” or “by what agency?”. The text begins by asking who impels the mind, breath, speech, sight and hearing. Like several Upaniṣads whose later titles are taken from their opening words, <i>Kena</i> describes the incipit rather than naming an author.${C(4)}`)}
          <blockquote class="kena-quote kena-text-quote"><span class="kena-quote-ref">Kena 1.1</span><span class="kena-quote-sa" lang="sa">केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः ।<br>केनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति ॥</span><span class="kena-quote-en">“By whom impelled does the mind go forth? By whom yoked does the foremost breath move? By whom directed is speech uttered—and what deity joins sight and hearing to their work?”</span></blockquote>
          ${P(`The alternative title <i>Talavakāra Upaniṣad</i> preserves its school affiliation. Śaṅkara and later witnesses associate the work with a Talavakāra Brāhmaṇa of the Sāmaveda; modern study connects this material with the Jaiminīya or Talavakāra textual tradition. The form <i>Kenopaniṣad</i> simply compounds <i>Kena</i> with <i>Upaniṣad</i>.${C(2,4)}`)}
        </section>`);

      const division = [...history.querySelectorAll('h3')].find(h => h.textContent.trim() === 'Division and numbering');
      if (division) {
        const following = division.nextElementSibling;
        division.remove();
        if (following?.tagName === 'P') following.remove();
      }

      history.insertAdjacentHTML('afterend', `
        <section class="kena-section" id="kena-structure-wiki">
          <h2>Structure and manuscript form</h2>
          ${P(`The received Sāmavedic text is divided into four <i>khaṇḍas</i>. In a common modern scheme, the first khaṇḍa contains eight metrical verses and the second five, giving thirteen metrical verses in all. The third and fourth khaṇḍas are predominantly prose: the third carries the yakṣa narrative, while the fourth completes that narrative and adds the meditative and disciplinary epilogue.${C(4,5,11)}`)}
          <div class="kena-structure kena-wiki-structure">
            <div class="kena-structure-row"><b>1st khaṇḍa</b><span>8 metrical verses. Inquiry into the power behind mind, speech, breath, sight and hearing.</span></div>
            <div class="kena-structure-row"><b>2nd khaṇḍa</b><span>5 metrical verses in common numbering, with edition-dependent segmentation around the transition into the second section.</span></div>
            <div class="kena-structure-row"><b>3rd khaṇḍa</b><span>Prose narrative: Brahman appears as a yakṣa; Agni and Vāyu fail to demonstrate independent power.</span></div>
            <div class="kena-structure-row"><b>4th khaṇḍa</b><span>Umā identifies the yakṣa as Brahman; lightning and mind analogies, <i>Tadvana</i>, and the closing teaching on tapas, dama, karma, Veda and truth.</span></div>
          </div>
          ${P(`Verse and paragraph totals vary between editors because the transmitted prose can be segmented differently and because some editions divide or combine individual metrical units differently. Wikipedia’s commonly cited scheme describes 13 metrical verses, followed by 15 prose paragraphs of main narrative and 6 prose paragraphs of epilogue; older and critical editions should therefore be cited by khaṇḍa and local verse/paragraph number rather than by a bare total alone.${C(4,5)}`)}
          ${P(`The location of the Upaniṣad inside the surrounding Sāmavedic literature is also described differently by witnesses. Śaṅkara speaks of it as the beginning of the ninth <i>adhyāya</i> of a Brāhmaṇa. Müller’s 1879 introduction discusses Burnell’s newly reported South Indian manuscript, which brought a closely corresponding Sāmavedic Brāhmaṇa back into scholarly view. Oertel’s later publication of the Jaiminīya/Talavakāra Upaniṣad-Brāhmaṇa made comparison with the broader school text possible.${C(2,4)}`)}
          <div class="kena-note"><b>Reading references.</b> If two books give different total “verse” counts for Kena, that does not necessarily mean they contain substantially different Upaniṣads. Much of the discrepancy comes from whether prose units are counted as numbered mantras/paragraphs and how the verse–prose transition is segmented.</div>
        </section>`);
    }

    const contents = article.querySelector('#kena-contents');
    if (contents) {
      const headings = [...contents.querySelectorAll('h3')];
      headings.forEach(h => {
        if (h.textContent.startsWith('Khaṇḍa 1')) h.id = 'kena-khanda-1';
        if (h.textContent.startsWith('Khaṇḍa 2')) h.id = 'kena-khanda-2';
        if (h.textContent.startsWith('Khaṇḍa 3')) h.id = 'kena-khanda-3';
        if (h.textContent.startsWith('Khaṇḍa 4')) h.id = 'kena-khanda-4';
      });

      const k1 = contents.querySelector('#kena-khanda-1');
      const k1p2 = k1?.nextElementSibling?.nextElementSibling;
      k1p2?.insertAdjacentHTML('afterend', `<blockquote class="kena-quote kena-text-quote"><span class="kena-quote-ref">Kena 1.2</span><span class="kena-quote-sa" lang="sa">श्रोत्रस्य श्रोत्रं मनसो मनो यद् वाचो ह वाचं स उ प्राणस्य प्राणः ।<br>चक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥</span><span class="kena-quote-en">“The hearing of hearing, the mind of mind, the speech of speech, the breath of breath, the sight of sight”—the formula that gives the first khaṇḍa its characteristic reversal of ordinary knowing.</span></blockquote>`);

      const k2 = contents.querySelector('#kena-khanda-2');
      const k2p2 = k2?.nextElementSibling?.nextElementSibling;
      k2p2?.insertAdjacentHTML('afterend', `<blockquote class="kena-quote kena-text-quote"><span class="kena-quote-ref">Kena 2.3</span><span class="kena-quote-sa" lang="sa">यस्यामतं तस्य मतं मतं यस्य न वेद सः ।<br>अविज्ञातं विजानतां विज्ञातमविजानताम् ॥</span><span class="kena-quote-en">The verse deliberately overturns the normal language of possession: one who thinks Brahman is simply “known” has not yet understood what kind of reality is being discussed.</span></blockquote>`);

      const k4 = contents.querySelector('#kena-khanda-4');
      let cursor = k4;
      while (cursor?.nextElementSibling && cursor.nextElementSibling.tagName !== 'H3') cursor = cursor.nextElementSibling;
      cursor?.insertAdjacentHTML('afterend', `<blockquote class="kena-quote kena-text-quote"><span class="kena-quote-ref">Kena 4.8</span><span class="kena-quote-sa" lang="sa">तस्यै तपो दमः कर्मेति प्रतिष्ठा वेदाः सर्वाङ्गानि सत्यमायतनम् ॥</span><span class="kena-quote-en">“Austerity, restraint and action are its supports; the Vedas are all its limbs; truth is its abode.” The close of the text places Brahman-knowledge inside a disciplined Vedic and ethical life.</span></blockquote>`);
    }

    const reception = article.querySelector('#kena-reception');
    if (reception) {
      reception.insertAdjacentHTML('beforeend', `
        <h3>At a glance: three Vedāntic readings</h3>
        <div class="kena-wiki-table-wrap"><table class="kena-wiki-table"><thead><tr><th>Tradition</th><th>Characteristic reading of Kena</th></tr></thead><tbody>
          <tr><td><b>Advaita — Śaṅkara</b></td><td>Brahman is not an object of cognition; the Self is the self-revealing consciousness through which cognitions are known.${C(6,7)}</td></tr>
          <tr><td><b>Dvaita — Madhva</b></td><td>The text’s “impeller” language is read theistically: finite selves and gods depend upon the supreme Lord rather than being identical with Him.${C(8)}</td></tr>
          <tr><td><b>Viśiṣṭādvaita reception — Raṅgarāmānuja</b></td><td>Brahman is the supreme personal reality on whom selves and their powers depend; the text is interpreted within a qualified-nondual Śrīvaiṣṇava ontology.${C(12)}</td></tr>
        </tbody></table></div>`);
    }

    const significance = article.querySelector('#kena-significance');
    significance?.insertAdjacentHTML('beforebegin', `
      <section class="kena-section" id="kena-modern-reception">
        <h2>Translations and modern reception</h2>
        <h3>Persian and European transmission</h3>
        ${P(`The Kena participated in the larger early-modern transmission of the Upaniṣads beyond Sanskrit. The Persian Upaniṣad collection associated with Dārā Shikōh became the basis for Anquetil-Duperron’s Latin <i>Oupnek’hat</i> (1801–1802), through which several Upaniṣads entered European philosophical discussion before the rise of modern Sanskrit philology.${C(13)}`)}
        <h3>Rammohun Roy and the first English printings</h3>
        ${P(`Rammohun Roy printed an English <i>Translation of the Céna Upanishad</i> at Calcutta in 1816, explicitly presenting it through Śaṅkara’s gloss and using the Upaniṣad in his argument for the unity and supremacy of the divine. The work is one of the earliest English-language printed translations of an Upaniṣad by an Indian intellectual.${C(14)}`)}
        <h3>Nineteenth- and twentieth-century scholarship</h3>
        ${P(`Müller’s 1879 Sacred Books of the East translation placed Kena before a large anglophone readership, while Oertel’s 1896 work restored the Jaiminīya/Talavakāra school context to philological study. Later translations by Hume, Deussen, Sitarama Sastri and modern scholars such as Olivelle differ in chronology and interpretation but helped establish Kena as one of the most frequently studied short Upaniṣads.${C(1,2,4,5,6,15)}`)}
      </section>`);

    const refs = article.querySelector('#kena-references ol');
    if (refs && !article.querySelector('#kena-ref-13')) {
      refs.insertAdjacentHTML('beforeend', `
        <li id="kena-ref-13">Abraham Hyacinthe Anquetil-Duperron, <i>Oupnek’hat</i>, 2 vols. (Strasbourg, 1801–1802), Latin rendering based on the Persian Upaniṣad collection associated with Dārā Shikōh. <a class="kena-refback" href="#kena-top" aria-label="Back to top">↩</a></li>
        <li id="kena-ref-14">Rammohun Roy, <i>Translation of the Céna Upanishad: One of the Chapters of the Sáma Véda</i> (Calcutta: Hindoostanee Press, 1816). <a class="kena-refback" href="#kena-top" aria-label="Back to top">↩</a></li>
        <li id="kena-ref-15">Robert Ernest Hume, <i>The Thirteen Principal Upanishads</i> (Oxford University Press, 1921), Kena Upanishad. <a class="kena-refback" href="#kena-top" aria-label="Back to top">↩</a></li>`);
    }
  }

  const observer = new MutationObserver(() => {
    const article = document.querySelector('.kena-article');
    if (article) enhance(article);
  });
  observer.observe(document.body, {childList:true, subtree:true});
})();