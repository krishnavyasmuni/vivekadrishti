(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const style = document.createElement('style');
  style.textContent = `
    /* Canto 10 uses the same visible order as Canto 2:
       Word-for-word, Transliteration, Śrīdhara Sanskrit, commentary. */
    .canto-10-continuous-layout .sb-sridhara-visible{
      display:block!important;max-width:840px!important;margin:14px auto 0!important;
      color:#3c362e!important;font-family:Merriweather,Georgia,'Times New Roman',serif!important;
      font-size:16px!important;font-style:normal!important;font-weight:400!important;
      line-height:1.45!important;text-align:left!important
    }
    .canto-10-continuous-layout .sb-sridhara-visible>strong:first-child{
      color:#2f7f82!important;font-size:17px!important;font-weight:700!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details{
      display:block!important;width:100%!important;max-width:100%!important;
      margin:10px 0 0!important;padding:10px 0 0!important;
      border-top:1px solid #e5e0da!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details>summary{
      display:none!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details>.sb-source-block{
      display:block!important;margin:0!important;padding:0!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details .sb-source-label{
      color:#ab382d!important
    }
    /* A late/stale top-level Śrīdhara WFW must never become a fourth button. */
    .canto-10-continuous-layout .sb-verse-section>.sb-sridhara-wfw-details{
      display:none!important
    }
  `;
  document.head.appendChild(style);

  function hasSridharaSanskrit(section) {
    return Boolean(section.querySelector(':scope > .sb-bhasya .sb-source-content')?.textContent?.trim());
  }

  function ensureWordForWord(section) {
    let details = section.querySelector(':scope > .sb-word-details');
    if (details) return details;

    details = document.createElement('details');
    details.className = 'sb-details sb-word-details';
    details.open = false;
    const summary = document.createElement('summary');
    summary.textContent = 'Word-for-word';
    details.appendChild(summary);
    section.appendChild(details);
    return details;
  }

  function ensureCommentary(section) {
    if (!hasSridharaSanskrit(section)) return null;

    let paragraph = section.querySelector(':scope > .sb-sridhara-visible');
    if (paragraph) return paragraph;

    paragraph = document.createElement('p');
    paragraph.className = 'sb-commentary sb-sridhara-visible';
    paragraph.hidden = true;

    const label = document.createElement('strong');
    label.textContent = 'Śrīdhara’s Commentary. ';

    const english = document.createElement('span');
    english.className = 'sb-sridhara-visible-english';
    paragraph.append(label, english);
    section.appendChild(paragraph);
    return paragraph;
  }

  function englishFromGloss(gloss) {
    const value = String(gloss || '').trim().replace(/\.\s*$/u, '');
    if (!value) return '';

    const pieces = value.split(/;\s+(?=[^;]+?\s+—\s+)/u);
    return pieces.map((piece) => {
      const divider = piece.indexOf(' — ');
      return (divider >= 0 ? piece.slice(divider + 3) : piece).trim();
    }).filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function syncCommentary(section, sourceContent) {
    if (!sourceContent) return;
    const paragraph = ensureCommentary(section);
    if (!paragraph) return;
    const target = paragraph.querySelector('.sb-sridhara-visible-english');

    const sync = () => {
      const english = englishFromGloss(sourceContent.textContent);
      target.textContent = english;
      paragraph.hidden = !english;
    };
    sync();

    if (sourceContent.dataset.canto2CommentarySync === 'true') return;
    sourceContent.dataset.canto2CommentarySync = 'true';
    new MutationObserver(sync).observe(sourceContent, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function mergeSridharaWordForWord(section) {
    const outer = ensureWordForWord(section);
    const sridharaBlocks = Array.from(section.querySelectorAll('.sb-sridhara-wfw-details'));

    sridharaBlocks.forEach((sridhara) => {
      const sourceLabel = sridhara.querySelector('.sb-source-label');
      if (sourceLabel) sourceLabel.textContent = 'Śrīdhara word-for-word';

      const sourceContent = sridhara.querySelector('.sb-sridhara-word-for-word, .sb-source-content');
      syncCommentary(section, sourceContent);

      sridhara.open = true;
      if (sridhara.parentElement !== outer) outer.appendChild(sridhara);
    });
  }

  function enforceCanto2Order(section) {
    const translation = section.querySelector(':scope > .sb-translation');
    if (!translation) return;

    const word = section.querySelector(':scope > .sb-word-details');
    const transliteration = section.querySelector(':scope > .sb-transliteration-details');
    const sanskrit = section.querySelector(':scope > .sb-bhasya');
    const commentary = section.querySelector(':scope > .sb-sridhara-visible');

    const wordSummary = word?.querySelector(':scope > summary');
    if (wordSummary) wordSummary.textContent = 'Word-for-word';
    const transliterationSummary = transliteration?.querySelector(':scope > summary');
    if (transliterationSummary) transliterationSummary.textContent = 'Transliteration';
    const sanskritSummary = sanskrit?.querySelector(':scope > summary');
    if (sanskritSummary) sanskritSummary.textContent = 'Śrīdhara Sanskrit';

    let cursor = translation;
    [word, transliteration, sanskrit, commentary].filter(Boolean).forEach((node) => {
      if (cursor.nextElementSibling !== node) cursor.insertAdjacentElement('afterend', node);
      cursor = node;
    });
  }

  function normalize(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    if (hasSridharaSanskrit(section)) ensureCommentary(section);
    mergeSridharaWordForWord(section);
    enforceCanto2Order(section);
  }

  function scan(node = root) {
    if (node instanceof HTMLElement && node.matches('.sb-verse-section')) normalize(node);
    node.querySelectorAll?.('.sb-verse-section').forEach(normalize);
  }

  let scheduled = false;
  function scheduleScan() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      scan();
    });
  }

  const observer = new MutationObserver(scheduleScan);
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  scan();
})();