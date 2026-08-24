(() => {
  if (!/srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(location.pathname)) return;

  const root = document.querySelector('.article-body');
  if (!root) return;

  const DATA_BASE = '/vivekadrishti/assets/data/canto2-sridhara-reviewed/';
  const chapterCache = new Map();

  function verseIdentity(section) {
    const id = section.querySelector(':scope > .sb-verse')?.id || section.getAttribute('aria-labelledby') || '';
    const match = id.match(/^sb-2-(\d+)-(\d+)(?:-(\d+))?$/i);
    if (!match) return null;
    return {
      chapter: Number(match[1]),
      start: Number(match[2]),
      end: Number(match[3] || match[2])
    };
  }

  function sridharaSourceText(section) {
    const details = section.querySelector(':scope > .sb-bhasya');
    if (!details) return '';
    const candidates = Array.from(details.querySelectorAll(':scope > [lang="sa-Deva"], :scope > [lang="sa"], :scope > p'));
    const source = candidates.find((node) => /[\u0900-\u097f]/u.test(node.textContent || ''));
    return (source?.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function explicitlyUncommented(section) {
    const text = sridharaSourceText(section);
    return /^\s*न\s+व्याख्यातम्[।.]?\s*$/u.test(text) || /^\s*na\s+vyākhyātam[.]?\s*$/iu.test(text);
  }

  async function chapterData(chapter) {
    if (!chapterCache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      chapterCache.set(chapter, fetch(`${DATA_BASE}${file}.json?v=1`, { cache: 'force-cache' })
        .then((response) => response.ok ? response.json() : {})
        .catch(() => ({})));
    }
    return chapterCache.get(chapter);
  }

  function normalizeRecord(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || value.reviewed !== true) return null;
    return {
      word_for_word: String(value.word_for_word || value.wordForWord || '').trim(),
      translation: String(value.translation || value.direct_translation || '').trim()
    };
  }

  function recordForRange(data, identity) {
    const key = identity.start === identity.end ? String(identity.start) : `${identity.start}-${identity.end}`;
    const direct = normalizeRecord(data[key]);
    if (direct) return direct;
    if (identity.start === identity.end) return null;

    const records = [];
    for (let verse = identity.start; verse <= identity.end; verse += 1) {
      const record = normalizeRecord(data[String(verse)]);
      if (!record) return null;
      records.push(record);
    }
    return {
      word_for_word: records.map((record) => record.word_for_word).filter(Boolean).join(' ').trim(),
      translation: records.map((record) => record.translation).filter(Boolean).join(' ').trim()
    };
  }

  function sridharaLayer(section) {
    return section.querySelector(':scope > .sb-combined-word-details > .sb-sridhara-layer');
  }

  function setLayerText(section, text) {
    const layer = sridharaLayer(section);
    if (!layer) return;
    const heading = layer.querySelector(':scope > .sb-layer-heading');
    const p = document.createElement('p');
    p.className = text ? 'sb-sridhara-reviewed-word-for-word' : 'sb-sridhara-wfw-missing';
    p.textContent = text || 'A reviewed Śrīdhara word-for-word translation has not yet been added for this verse.';
    layer.replaceChildren(...(heading ? [heading, p] : [p]));
  }

  function setCommentary(section, translation) {
    let commentary = section.querySelector(':scope > .sb-commentary');
    if (!translation) {
      commentary?.remove();
      return;
    }
    if (!commentary) {
      commentary = document.createElement('p');
      commentary.className = 'sb-commentary';
      const anchor = section.querySelector(':scope > .sb-bhasya') || section.querySelector(':scope > .sb-combined-transliteration-details') || section.querySelector(':scope > .sb-combined-word-details') || section.querySelector(':scope > .sb-translation');
      if (anchor) anchor.insertAdjacentElement('afterend', commentary);
      else section.appendChild(commentary);
    }
    const label = document.createElement('strong');
    label.textContent = 'Śrīdhara’s Commentary. ';
    const text = document.createElement('span');
    text.className = 'sb-commentary-text';
    text.textContent = translation;
    commentary.replaceChildren(label, text);
  }

  async function enhance(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    const identity = verseIdentity(section);
    if (!identity) return;

    if (explicitlyUncommented(section)) {
      setLayerText(section, 'Śrīdhara does not comment on this verse.');
      setCommentary(section, '');
      section.dataset.sridharaEnglishStatus = 'no-commentary';
      return;
    }

    const data = await chapterData(identity.chapter);
    if (!section.isConnected) return;
    const record = recordForRange(data, identity);
    if (!record) {
      setLayerText(section, '');
      setCommentary(section, '');
      section.dataset.sridharaEnglishStatus = 'awaiting-reviewed-translation';
      return;
    }

    setLayerText(section, record.word_for_word);
    setCommentary(section, record.translation);
    section.dataset.sridharaEnglishStatus = 'reviewed';
  }

  function scan(node = root) {
    if (node instanceof HTMLElement && node.matches('.sb-verse-section')) enhance(node);
    node.querySelectorAll?.('.sb-verse-section').forEach(enhance);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) scan(node);
    }));
  });
  observer.observe(root, { childList: true, subtree: true });

  // The Canto 2 renderer runs dynamically; wait one frame so its merged controls
  // exist, then scan. The observer handles any remaining sections it creates.
  requestAnimationFrame(() => scan());
})();