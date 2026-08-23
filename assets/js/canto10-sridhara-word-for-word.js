(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const BASE = '/vivekadrishti/assets/data/canto10-sridhara-word-for-word/';
  const cache = new Map();

  async function chapterGlosses(chapter) {
    if (!cache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      cache.set(chapter, fetch(`${BASE}${file}.json`, { cache: 'no-cache' })
        .then((response) => {
          if (response.status === 404) return {};
          if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
          return response.json();
        })
        .catch(() => ({})));
    }
    return cache.get(chapter);
  }

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

  function glossForRange(glosses, start, end) {
    const rangeKey = start === end ? String(start) : `${start}-${end}`;
    if (glosses[rangeKey]) return glosses[rangeKey];
    if (start === end) return '';
    return Array.from({ length: end - start + 1 }, (_, index) => glosses[String(start + index)] || '')
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  async function enhance(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section') || section.dataset.sridharaWfwChecked === 'true') return;
    section.dataset.sridharaWfwChecked = 'true';
    const identity = verseIdentity(section);
    if (!identity) return;

    const glosses = await chapterGlosses(identity.chapter);
    const gloss = glossForRange(glosses, identity.start, identity.end);
    if (!gloss || !section.isConnected || section.querySelector(':scope > .sb-sridhara-word-for-word')) return;

    const paragraph = document.createElement('p');
    paragraph.className = 'sb-commentary sb-sridhara-word-for-word';
    const label = document.createElement('strong');
    label.textContent = 'Śrīdhara word-for-word. ';
    paragraph.append(label, document.createTextNode(gloss));
    section.appendChild(paragraph);
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