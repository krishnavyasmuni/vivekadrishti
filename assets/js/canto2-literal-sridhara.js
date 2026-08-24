(() => {
  if (!/srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(location.pathname)) return;

  const root = document.querySelector('.article-body');
  if (!root) return;

  function literalText(section) {
    const layer = section.querySelector(':scope > .sb-combined-word-details > .sb-sridhara-layer');
    if (!layer || layer.querySelector('.sb-sridhara-wfw-missing')) return '';
    const clone = layer.cloneNode(true);
    clone.querySelector(':scope > .sb-layer-heading')?.remove();
    return (clone.textContent || '')
      .replace(/^\s*Śrīdhara\s+word-for-word\.?\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function ensureCommentary(section) {
    const literal = literalText(section);
    if (!literal) return;

    let commentary = section.querySelector(':scope > .sb-commentary');
    if (!commentary) {
      commentary = document.createElement('p');
      commentary.className = 'sb-commentary';
    }

    const current = commentary.querySelector(':scope > .sb-commentary-text')?.textContent || '';
    if (current !== literal || !commentary.querySelector(':scope > strong:first-child')) {
      const label = document.createElement('strong');
      label.textContent = 'Śrīdhara’s Commentary. ';
      const text = document.createElement('span');
      text.className = 'sb-commentary-text';
      text.textContent = literal;
      commentary.replaceChildren(label, text);
    }

    const sanskrit = section.querySelector(':scope > .sb-bhasya');
    const transliteration = section.querySelector(':scope > .sb-combined-transliteration-details');
    const word = section.querySelector(':scope > .sb-combined-word-details');
    const anchor = sanskrit || transliteration || word || section.querySelector(':scope > .sb-translation');
    if (anchor && anchor.nextElementSibling !== commentary) anchor.insertAdjacentElement('afterend', commentary);
  }

  function normalize(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    ensureCommentary(section);
  }

  function scan(node = root) {
    if (node instanceof HTMLElement && node.matches('.sb-verse-section')) normalize(node);
    node.querySelectorAll?.('.sb-verse-section').forEach(normalize);
  }

  let scheduled = false;
  const scheduleScan = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      scan();
    });
  };

  const observer = new MutationObserver(scheduleScan);
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  scan();
})();