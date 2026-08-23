(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const style = document.createElement('style');
  style.textContent = `
    .canto-10-continuous-layout .sb-sridhara-commentary-visible{
      display:block!important;max-width:840px!important;margin:14px auto 15px!important;
      color:#3c362e!important;font-family:Merriweather,Georgia,'Times New Roman',serif!important;
      font-size:16px!important;font-style:normal!important;font-weight:400!important;
      line-height:1.45!important;text-align:left!important
    }
    .canto-10-continuous-layout .sb-sridhara-commentary-visible>strong{
      color:#2f7f82!important;font-size:17px!important;font-weight:700!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-merged{
      display:block!important;margin:10px 0 0!important;padding-top:10px!important;
      border-top:1px solid #e5e0da!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-merged>summary{display:none!important}
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-merged>.sb-source-block{
      display:block!important;margin:0!important;padding:0!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-merged .sb-source-label{
      color:#ab382d!important
    }
    .canto-10-continuous-layout .sb-bhasya>.sb-source-block>.sb-source-label{color:#ab382d!important}
  `;
  document.head.appendChild(style);

  function verseRef(section) {
    const heading = section.querySelector(':scope > h3[id^="sb-10-"]');
    return heading?.textContent?.replace(/^ŚB\s*/i, '') || 'this verse';
  }

  function makeMissingBhasya(section) {
    const details = document.createElement('details');
    details.className = 'sb-details sb-bhasya';
    details.open = false;

    const summary = document.createElement('summary');
    summary.textContent = 'Śrīdhara';

    const wrapper = document.createElement('div');
    wrapper.className = 'sb-source-block';
    const label = document.createElement('strong');
    label.className = 'sb-source-label';
    label.textContent = 'Bhāvārtha-dīpikā — Sanskrit';
    const content = document.createElement('div');
    content.className = 'sb-source-content sb-sridhara-source-missing';
    content.textContent = `No Śrīdhara Bhāvārtha-dīpikā text was extracted for ${verseRef(section)} from the current source.`;
    wrapper.append(label, content);
    details.append(summary, wrapper);
    return details;
  }

  function ensureBhasya(section) {
    let bhasya = section.querySelector(':scope > .sb-bhasya');
    if (!bhasya) {
      bhasya = makeMissingBhasya(section);
      section.appendChild(bhasya);
    }

    const summary = bhasya.querySelector(':scope > summary');
    if (summary) summary.textContent = 'Śrīdhara';

    const firstBlock = bhasya.querySelector(':scope > .sb-source-block');
    const firstLabel = firstBlock?.querySelector(':scope > .sb-source-label');
    if (firstLabel && !firstBlock.querySelector('.sb-sridhara-source-missing')) {
      firstLabel.textContent = 'Bhāvārtha-dīpikā — Sanskrit';
    }
    bhasya.dataset.sridharaBhasya = 'true';
    return bhasya;
  }

  function ensurePrimaryWordForWord(section) {
    let details = section.querySelector(':scope > .sb-word-details');
    if (details) return details;

    details = document.createElement('details');
    details.className = 'sb-details sb-word-details';
    details.open = false;
    const summary = document.createElement('summary');
    summary.textContent = 'Word-for-word';
    details.appendChild(summary);

    const translation = section.querySelector(':scope > .sb-translation');
    const commentary = section.querySelector(':scope > .sb-sridhara-commentary-visible');
    if (commentary) commentary.insertAdjacentElement('afterend', details);
    else if (translation) translation.insertAdjacentElement('afterend', details);
    else section.appendChild(details);
    return details;
  }

  function commentaryParagraph(section) {
    let paragraph = section.querySelector(':scope > .sb-sridhara-commentary-visible');
    if (paragraph) return paragraph;

    paragraph = document.createElement('p');
    paragraph.className = 'sb-commentary sb-sridhara-commentary-visible';
    const label = document.createElement('strong');
    label.textContent = 'Śrīdhara Commentary: ';
    const text = document.createElement('span');
    text.className = 'sb-sridhara-commentary-text';
    paragraph.append(label, text);

    const translation = section.querySelector(':scope > .sb-translation');
    if (translation) translation.insertAdjacentElement('afterend', paragraph);
    else section.appendChild(paragraph);
    return paragraph;
  }

  function syncCommentary(section, sourceContent) {
    if (!sourceContent) return;
    const paragraph = commentaryParagraph(section);
    const target = paragraph.querySelector('.sb-sridhara-commentary-text');
    const sync = () => {
      const value = sourceContent.textContent?.trim() || '';
      target.textContent = value;
      paragraph.hidden = !value;
    };
    sync();
    if (sourceContent.dataset.visibleCommentarySync === 'true') return;
    sourceContent.dataset.visibleCommentarySync = 'true';
    new MutationObserver(sync).observe(sourceContent, { childList: true, subtree: true, characterData: true });
  }

  function mergeWordForWord(section) {
    const sridharaWfw = section.querySelector('.sb-sridhara-wfw-details');
    if (!sridharaWfw) return;

    const primary = ensurePrimaryWordForWord(section);
    const sourceContent = sridharaWfw.querySelector('.sb-sridhara-word-for-word, .sb-source-content');
    const sourceLabel = sridharaWfw.querySelector('.sb-source-label');
    if (sourceLabel) sourceLabel.textContent = 'Śrīdhara word-for-word';

    syncCommentary(section, sourceContent);

    if (sridharaWfw.parentElement !== primary) {
      sridharaWfw.classList.add('sb-sridhara-wfw-merged');
      primary.appendChild(sridharaWfw);
    }

    // Keep this internal details node open so its existing lazy dictionary resolver
    // can finish the literal gloss; its own summary is hidden, so the user sees
    // only the single outer Word-for-word control.
    if (!sridharaWfw.open) sridharaWfw.open = true;
  }

  function normalizeTransliteration(section) {
    const transliteration = section.querySelector(':scope > .sb-transliteration-details');
    if (!transliteration) return;
    const summary = transliteration.querySelector(':scope > summary');
    if (summary) summary.textContent = 'Transliteration';
    transliteration.querySelectorAll(':scope > .sb-source-block').forEach((block) => {
      const label = block.querySelector(':scope > .sb-source-label');
      if (/Śrīdhara/i.test(label?.textContent || '')) label.textContent = 'Śrīdhara transliteration';
    });
  }

  function normalizeSection(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    ensureBhasya(section);
    normalizeTransliteration(section);
    mergeWordForWord(section);
  }

  function scan(node = root) {
    if (node instanceof HTMLElement && node.matches('.sb-verse-section')) normalizeSection(node);
    node.querySelectorAll?.('.sb-verse-section').forEach(normalizeSection);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const section = mutation.target instanceof Element ? mutation.target.closest('.sb-verse-section') : null;
      if (section) normalizeSection(section);
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) scan(node);
      });
    });
  });

  observer.observe(root, { childList: true, subtree: true });
  scan();
})();