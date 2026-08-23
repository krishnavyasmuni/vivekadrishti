(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const style = document.createElement('style');
  style.textContent = `
    .canto-10-continuous-layout .sb-sridhara-visible{
      display:block!important;max-width:840px!important;margin:16px auto 18px!important;
      color:#3c362e!important;font-family:Merriweather,Georgia,'Times New Roman',serif!important;
      font-size:16px!important;line-height:1.55!important;text-align:left!important
    }
    .canto-10-continuous-layout .sb-sridhara-visible-label{
      color:#2f7f82!important;font-size:17px!important;font-weight:700!important
    }
    .canto-10-continuous-layout .sb-sridhara-visible-english{
      color:#3c362e!important;font-size:16px!important;font-weight:400!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details>summary{display:none!important}
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details{
      display:block!important;margin:10px 0 0!important;padding-top:10px!important;
      border-top:1px solid #e5e0da!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details .sb-source-label{color:#ab382d!important}
  `;
  document.head.appendChild(style);

  function hasSridharaSanskrit(section) {
    return Boolean(section.querySelector(':scope > .sb-bhasya .sb-source-content')?.textContent?.trim());
  }

  function ensureVisibleCommentary(section) {
    if (!(section instanceof HTMLElement) || !hasSridharaSanskrit(section)) return null;
    let paragraph = section.querySelector(':scope > .sb-sridhara-visible');
    if (paragraph) return paragraph;

    paragraph = document.createElement('p');
    paragraph.className = 'sb-commentary sb-sridhara-visible';
    paragraph.hidden = true;

    const label = document.createElement('strong');
    label.className = 'sb-sridhara-visible-label';
    label.textContent = 'Śrīdhara Commentary: ';

    const english = document.createElement('span');
    english.className = 'sb-sridhara-visible-english';
    paragraph.append(label, english);

    const translation = section.querySelector(':scope > .sb-translation');
    if (translation) translation.insertAdjacentElement('afterend', paragraph);
    else section.appendChild(paragraph);
    return paragraph;
  }

  function englishFromGloss(gloss) {
    const value = String(gloss || '').trim().replace(/\.\s*$/u, '');
    if (!value) return '';

    // The Śrīdhara gloss is stored as "Sanskrit unit — English; Sanskrit unit — English".
    // Keep only the English sides, in Śrīdhara's original word order, so the visible
    // commentary is English-only and remains deliberately literal rather than paraphrased.
    const pieces = value.split(/;\s+(?=[^;]+?\s+—\s+)/u);
    return pieces.map((piece) => {
      const divider = piece.indexOf(' — ');
      return (divider >= 0 ? piece.slice(divider + 3) : piece).trim();
    }).filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function syncEnglishCommentary(section, sourceContent) {
    if (!sourceContent) return;
    const paragraph = ensureVisibleCommentary(section);
    if (!paragraph) return;
    const target = paragraph.querySelector('.sb-sridhara-visible-english');

    const sync = () => {
      const english = englishFromGloss(sourceContent.textContent);
      target.textContent = english;
      paragraph.hidden = !english;
    };
    sync();

    if (sourceContent.dataset.visibleEnglishSync === 'true') return;
    sourceContent.dataset.visibleEnglishSync = 'true';
    new MutationObserver(sync).observe(sourceContent, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function mergeWordForWord(section) {
    if (!(section instanceof HTMLElement)) return;
    const sridhara = section.querySelector(':scope > .sb-sridhara-wfw-details');
    if (!sridhara) return;

    let bhagavatam = section.querySelector(':scope > .sb-word-details');
    if (!bhagavatam) {
      bhagavatam = document.createElement('details');
      bhagavatam.className = 'sb-details sb-word-details';
      bhagavatam.open = false;
      const summary = document.createElement('summary');
      summary.textContent = 'Word-for-word';
      bhagavatam.appendChild(summary);

      const commentary = section.querySelector(':scope > .sb-sridhara-visible');
      const translation = section.querySelector(':scope > .sb-translation');
      if (commentary) commentary.insertAdjacentElement('afterend', bhagavatam);
      else if (translation) translation.insertAdjacentElement('afterend', bhagavatam);
      else section.appendChild(bhagavatam);
    }

    const label = sridhara.querySelector('.sb-source-label');
    if (label) label.textContent = 'Śrīdhara word-for-word';

    const sourceContent = sridhara.querySelector('.sb-sridhara-word-for-word, .sb-source-content');
    syncEnglishCommentary(section, sourceContent);

    // Keep the inner Śrīdhara details open so its lazy lexical resolver can run,
    // but hide its own summary. The user sees only the single Word-for-word button.
    sridhara.open = true;
    if (sridhara.parentElement !== bhagavatam) bhagavatam.appendChild(sridhara);
  }

  function enforceOrder(section) {
    if (!(section instanceof HTMLElement)) return;
    const translation = section.querySelector(':scope > .sb-translation');
    const commentary = section.querySelector(':scope > .sb-sridhara-visible');
    const word = section.querySelector(':scope > .sb-word-details');
    const transliteration = section.querySelector(':scope > .sb-transliteration-details');
    const sanskrit = section.querySelector(':scope > .sb-bhasya');
    if (!translation) return;

    let cursor = translation;
    [commentary, word, transliteration, sanskrit].filter(Boolean).forEach((node) => {
      if (cursor.nextElementSibling !== node) cursor.insertAdjacentElement('afterend', node);
      cursor = node;
    });

    const sanskritSummary = sanskrit?.querySelector(':scope > summary');
    if (sanskritSummary) sanskritSummary.textContent = 'Śrīdhara Sanskrit';
    const transliterationSummary = transliteration?.querySelector(':scope > summary');
    if (transliterationSummary) transliterationSummary.textContent = 'Transliteration';
    const wordSummary = word?.querySelector(':scope > summary');
    if (wordSummary) wordSummary.textContent = 'Word-for-word';
  }

  function normalize(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    ensureVisibleCommentary(section);
    mergeWordForWord(section);
    enforceOrder(section);
  }

  function scan(node = root) {
    if (node instanceof HTMLElement && node.matches('.sb-verse-section')) normalize(node);
    node.querySelectorAll?.('.sb-verse-section').forEach(normalize);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const section = mutation.target instanceof Element ? mutation.target.closest('.sb-verse-section') : null;
      if (section) normalize(section);
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) scan(node);
      }
    }
  });

  observer.observe(root, { childList: true, subtree: true, characterData: true });
  scan();
})();