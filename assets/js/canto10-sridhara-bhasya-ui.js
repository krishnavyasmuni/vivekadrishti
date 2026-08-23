(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const style = document.createElement('style');
  style.textContent = `
    .canto-10-continuous-layout .sb-bhasya .sb-sridhara-wfw-nested{margin:10px 0 0!important}
    .canto-10-continuous-layout .sb-bhasya .sb-sridhara-wfw-nested>summary{display:none!important}
    .canto-10-continuous-layout .sb-bhasya .sb-source-block+.sb-source-block,
    .canto-10-continuous-layout .sb-bhasya .sb-sridhara-wfw-nested{padding-top:10px!important;border-top:1px solid #e5e0da!important}
    .canto-10-continuous-layout .sb-bhasya>.sb-source-block>.sb-source-label,
    .canto-10-continuous-layout .sb-bhasya .sb-sridhara-wfw-nested .sb-source-label{color:#ab382d!important}
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
    label.textContent = 'Śrīdhara Svāmī — Bhāvārtha-dīpikā';
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

  function moveSridharaTransliteration(section, bhasya) {
    const transliteration = section.querySelector(':scope > .sb-transliteration-details');
    if (!transliteration) return;
    const blocks = Array.from(transliteration.querySelectorAll(':scope > .sb-source-block'));
    blocks.forEach((block) => {
      const label = block.querySelector(':scope > .sb-source-label');
      if (!/Śrīdhara/i.test(label?.textContent || '')) return;
      label.textContent = 'Bhāvārtha-dīpikā — transliteration';
      bhasya.appendChild(block);
    });
    if (!transliteration.querySelector(':scope > .sb-source-block')) transliteration.remove();
  }

  function moveWordForWord(section, bhasya) {
    const wfw = section.querySelector(':scope > .sb-sridhara-wfw-details');
    if (!wfw || wfw.parentElement === bhasya) return;
    const label = wfw.querySelector('.sb-source-label');
    if (label) label.textContent = 'Bhāvārtha-dīpikā — word-for-word';
    wfw.classList.add('sb-sridhara-wfw-nested');
    wfw.open = true;
    bhasya.appendChild(wfw);
  }

  function normalizeSection(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    const bhasya = ensureBhasya(section);
    moveSridharaTransliteration(section, bhasya);
    moveWordForWord(section, bhasya);
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