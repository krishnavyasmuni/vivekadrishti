(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const setText = (node, text) => {
    if (node && node.textContent !== text) node.textContent = text;
  };

  function makeLayer(label, className, nodes = []) {
    const layer = document.createElement('div');
    layer.className = `sb-combined-layer ${className}`;
    const heading = document.createElement('div');
    heading.className = 'sb-layer-heading';
    heading.textContent = label;
    layer.appendChild(heading);
    nodes.filter(Boolean).forEach((node) => layer.appendChild(node));
    return layer;
  }

  function ensureBhagavatamWordLayer(section) {
    let details = section.querySelector(':scope > .sb-word-details, :scope > .sb-combined-word-details');
    if (!details) {
      details = document.createElement('details');
      details.className = 'sb-details sb-word-details sb-combined-word-details';
      const summary = document.createElement('summary');
      summary.textContent = 'Word-for-word';
      details.appendChild(summary);
      section.appendChild(details);
    }
    details.classList.add('sb-details', 'sb-word-details', 'sb-combined-word-details');
    if (details.open) details.open = false;
    setText(details.querySelector(':scope > summary'), 'Word-for-word');

    if (!details.querySelector(':scope > .sb-bhagavatam-layer')) {
      const blocks = Array.from(details.querySelectorAll(':scope > .sb-source-block'));
      const nodes = [];
      blocks.forEach((block) => {
        const content = block.querySelector(':scope > .sb-source-content');
        if (content) nodes.push(content);
        block.remove();
      });
      if (!nodes.length) {
        const note = document.createElement('p');
        note.textContent = 'No Bhāgavatam word-for-word gloss is stored for this verse.';
        nodes.push(note);
      }
      details.appendChild(makeLayer('Bhāgavatam', 'sb-bhagavatam-layer', nodes));
    }
    return details;
  }

  function mergeSridharaWordForWord(section, details) {
    const source = section.querySelector(':scope > .sb-sridhara-wfw-details');
    if (!source) return;
    const content = source.querySelector('.sb-sridhara-word-for-word, .sb-source-content');

    let layer = details.querySelector(':scope > .sb-sridhara-layer');
    if (!layer) {
      const node = document.createElement('p');
      node.className = 'sb-sridhara-word-for-word-content';
      layer = makeLayer('Śrīdhara', 'sb-sridhara-layer', [node]);
      details.appendChild(layer);
    }
    const target = layer.querySelector('.sb-sridhara-word-for-word-content');
    if (target && content) setText(target, content.textContent.trim());
    source.remove();
  }

  function normalizeTransliteration(section) {
    const details = section.querySelector(':scope > .sb-transliteration-details, :scope > .sb-combined-transliteration-details');
    if (!details) return null;
    details.classList.add('sb-details', 'sb-transliteration-details', 'sb-combined-transliteration-details');
    if (details.open) details.open = false;
    setText(details.querySelector(':scope > summary'), 'Transliteration');
    if (details.querySelector(':scope > .sb-bhagavatam-layer, :scope > .sb-sridhara-layer')) return details;

    const blocks = Array.from(details.querySelectorAll(':scope > .sb-source-block'));
    blocks.forEach((block) => {
      const sourceLabel = block.querySelector(':scope > .sb-source-label')?.textContent || '';
      const content = block.querySelector(':scope > .sb-source-content');
      if (!content) { block.remove(); return; }
      const isSridhara = /Śrīdhara/i.test(sourceLabel);
      content.classList.add(isSridhara ? 'sb-sridhara-auto-transliteration' : 'sb-bhagavatam-transliteration-content');
      details.appendChild(makeLayer(isSridhara ? 'Śrīdhara' : 'Bhāgavatam', isSridhara ? 'sb-sridhara-layer' : 'sb-bhagavatam-layer', [content]));
      block.remove();
    });
    return details;
  }

  function normalizeSanskrit(section) {
    const details = section.querySelector(':scope > .sb-bhasya');
    if (!details) return null;
    details.classList.add('sb-details', 'sb-bhasya');
    if (details.open) details.open = false;
    setText(details.querySelector(':scope > summary'), 'Śrīdhara Sanskrit');
    setText(details.querySelector(':scope > .sb-source-block > .sb-source-label'), 'Bhāvārtha-dīpikā');
    return details;
  }

  function removeProseCommentary(section) {
    section.querySelectorAll(':scope > .sb-commentary').forEach((node) => node.remove());
  }

  function enforceOrder(section) {
    const translation = section.querySelector(':scope > .sb-translation');
    if (!translation) return;
    const word = ensureBhagavatamWordLayer(section);
    mergeSridharaWordForWord(section, word);
    const transliteration = normalizeTransliteration(section);
    const sanskrit = normalizeSanskrit(section);
    removeProseCommentary(section);

    let anchor = translation;
    [word, transliteration, sanskrit].filter(Boolean).forEach((node) => {
      if (anchor.nextElementSibling !== node) anchor.insertAdjacentElement('afterend', node);
      anchor = node;
    });
  }

  function normalize(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    enforceOrder(section);
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