(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const DATA_BASE = '/vivekadrishti/assets/data/canto10-sridhara-word-for-word/';
  const cache = new Map();

  function verseIdentity(section) {
    const heading = section.querySelector(':scope > h3[id^="sb-10-"]');
    const match = heading?.id.match(/^sb-10-(\d+)-(\d+)(?:-(\d+))?$/);
    if (!match) return null;
    return {
      chapter: Number(match[1]),
      start: Number(match[2]),
      end: Number(match[3] || match[2])
    };
  }

  function hasSridhara(section) {
    return Boolean(section.querySelector(':scope > .sb-bhasya .sb-source-content')?.textContent?.trim());
  }

  async function chapterData(chapter) {
    if (!cache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      cache.set(chapter, fetch(`${DATA_BASE}${file}.json`, { cache: 'force-cache' })
        .then((response) => response.ok ? response.json() : {})
        .catch(() => ({})));
    }
    return cache.get(chapter);
  }

  function glossForRange(data, start, end) {
    const key = start === end ? String(start) : `${start}-${end}`;
    if (data[key]) return data[key];
    if (start === end) return '';
    return Array.from({ length: end - start + 1 }, (_, index) => data[String(start + index)] || '')
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  function makeDetails(gloss, verified) {
    const details = document.createElement('details');
    details.className = 'sb-details sb-sridhara-wfw-details';
    details.open = false;
    details.dataset.verified = verified ? 'true' : 'false';

    const summary = document.createElement('summary');
    summary.textContent = 'Śrīdhara word-for-word';

    const wrapper = document.createElement('div');
    wrapper.className = 'sb-source-block';
    const label = document.createElement('strong');
    label.className = 'sb-source-label';
    label.textContent = 'Śrīdhara word-for-word';
    const content = document.createElement('div');
    content.className = 'sb-source-content sb-sridhara-word-for-word';
    content.textContent = verified
      ? gloss
      : 'A verified English word-for-word gloss has not yet been added for this verse.';

    wrapper.append(label, content);
    details.append(summary, wrapper);
    return details;
  }

  async function enhance(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    if (section.dataset.sridharaVerifiedWfwChecked === 'true') return;
    section.dataset.sridharaVerifiedWfwChecked = 'true';
    if (!hasSridhara(section)) return;

    const identity = verseIdentity(section);
    if (!identity) return;
    const data = await chapterData(identity.chapter);
    if (!section.isConnected) return;
    const gloss = glossForRange(data, identity.start, identity.end);
    section.appendChild(makeDetails(gloss, Boolean(gloss)));
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