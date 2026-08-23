(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const DATA_BASE = '/vivekadrishti/assets/data/canto10-sridhara-word-for-word/';
  const cache = new Map();

  function verseIdentity(section) {
    const heading = section.querySelector(':scope > h3[id^="sb-10-"]');
    const match = heading?.id.match(/^sb-10-(\d+)-(\d+)(?:-(\d+))?$/);
    if (!match) return null;
    return { chapter: Number(match[1]), start: Number(match[2]), end: Number(match[3] || match[2]) };
  }

  function hasSridhara(section) {
    return Boolean(section.querySelector(':scope > .sb-bhasya .sb-source-content')?.textContent?.trim());
  }

  async function chapterData(chapter) {
    if (!cache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      cache.set(chapter, fetch(`${DATA_BASE}${file}.json?v=2`, { cache: 'force-cache' })
        .then((response) => response.ok ? response.json() : {})
        .catch(() => ({})));
    }
    return cache.get(chapter);
  }

  function normalizeEntry(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const wordForWord = String(value.word_for_word || '').trim();
    const translation = String(value.translation || '').trim();
    if (!wordForWord && !translation) return null;
    return { wordForWord, translation };
  }

  function entryForRange(data, start, end) {
    const directKey = start === end ? String(start) : `${start}-${end}`;
    const direct = normalizeEntry(data[directKey]);
    if (direct) return direct;
    if (start === end) return null;

    const parts = [];
    for (let verse = start; verse <= end; verse += 1) {
      const entry = normalizeEntry(data[String(verse)]);
      if (entry) parts.push(entry);
    }
    if (!parts.length) return null;
    return {
      wordForWord: parts.map((entry) => entry.wordForWord).filter(Boolean).join(' '),
      translation: parts.map((entry) => entry.translation).filter(Boolean).join(' ')
    };
  }

  function makeDetails(entry) {
    const verifiedGloss = Boolean(entry?.wordForWord);
    const verifiedTranslation = Boolean(entry?.translation);
    const details = document.createElement('details');
    details.className = 'sb-details sb-sridhara-wfw-details';
    details.open = false;
    details.dataset.verifiedGloss = verifiedGloss ? 'true' : 'false';
    details.dataset.verifiedTranslation = verifiedTranslation ? 'true' : 'false';
    if (verifiedTranslation) details.dataset.translation = entry.translation;

    const summary = document.createElement('summary');
    summary.textContent = 'Śrīdhara word-for-word';

    const wrapper = document.createElement('div');
    wrapper.className = 'sb-source-block';
    const label = document.createElement('strong');
    label.className = 'sb-source-label';
    label.textContent = 'Śrīdhara word-for-word';
    const content = document.createElement('div');
    content.className = 'sb-source-content sb-sridhara-word-for-word';
    content.textContent = verifiedGloss
      ? entry.wordForWord
      : 'A verse-by-verse English gloss from Śrīdhara’s Sanskrit has not yet been completed for this passage.';

    wrapper.append(label, content);
    details.append(summary, wrapper);
    return details;
  }

  async function enhance(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    if (section.dataset.sridharaEnglishChecked === 'true') return;
    section.dataset.sridharaEnglishChecked = 'true';
    if (!hasSridhara(section)) return;

    const identity = verseIdentity(section);
    if (!identity) return;
    const data = await chapterData(identity.chapter);
    if (!section.isConnected) return;
    section.appendChild(makeDetails(entryForRange(data, identity.start, identity.end)));
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
  scan();
})();