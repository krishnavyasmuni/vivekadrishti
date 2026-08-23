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

  function mergeSridharaEnglish(section, details) {
    const source = section.querySelector(':scope > .sb-sridhara-wfw-details');
    if (!source) return;
    const verifiedGloss = source.dataset.verifiedGloss === 'true';
    const verifiedTranslation = source.dataset.verifiedTranslation === 'true';
    const translation = source.dataset.translation || '';
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
    layer.dataset.verifiedGloss = verifiedGloss ? 'true' : 'false';
    layer.dataset.verifiedTranslation = verifiedTranslation ? 'true' : 'false';
    if (verifiedTranslation && translation) layer.dataset.translation = translation;
    else delete layer.dataset.translation;
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

  function commentaryText(section, wordDetails) {
    const sanskrit = section.querySelector(':scope > .sb-bhasya .sb-source-content')?.textContent?.trim() || '';
    if (/न\s*व्याख्यातम्|na\s+vyākhyātam/i.test(sanskrit)) return { text: 'Not explained.', verified: true };
    const layer = wordDetails?.querySelector(':scope > .sb-sridhara-layer[data-verified-translation="true"]');
    const translation = layer?.dataset.translation?.trim() || '';
    return translation ? { text: translation, verified: true } : { text: 'A close English translation from Śrīdhara’s Sanskrit has not yet been completed for this passage.', verified: false };
  }

  function ensureCommentary(section, wordDetails) {
    const hasSridhara = Boolean(section.querySelector(':scope > .sb-bhasya .sb-source-content')?.textContent?.trim());
    if (!hasSridhara) return null;
    let commentary = section.querySelector(':scope > .sb-commentary');
    if (!commentary) {
      commentary = document.createElement('p');
      commentary.className = 'sb-commentary';
      const label = document.createElement('strong');
      label.className = 'sb-commentary-label';
      label.textContent = 'Śrīdhara’s Commentary. ';
      const text = document.createElement('span');
      text.className = 'sb-commentary-text';
      commentary.append(label, text);
      section.appendChild(commentary);
    }
    setText(commentary.querySelector(':scope > strong:first-child'), 'Śrīdhara’s Commentary. ');
    let text = commentary.querySelector(':scope > .sb-commentary-text');
    if (!text) {
      text = document.createElement('span');
      text.className = 'sb-commentary-text';
      commentary.appendChild(text);
    }
    const result = commentaryText(section, wordDetails);
    setText(text, result.text);
    commentary.dataset.verified = result.verified ? 'true' : 'false';
    return commentary;
  }

  function enforceOrder(section) {
    const translation = section.querySelector(':scope > .sb-translation');
    if (!translation) return;
    const word = ensureBhagavatamWordLayer(section);
    mergeSridharaEnglish(section, word);
    const transliteration = normalizeTransliteration(section);
    const sanskrit = normalizeSanskrit(section);
    const commentary = ensureCommentary(section, word);

    let anchor = translation;
    [word, transliteration, sanskrit, commentary].filter(Boolean).forEach((node) => {
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