(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const DATA_BASE = '/vivekadrishti/assets/data/canto10-sridhara-word-for-word/';
  const OVERRIDE_BASE = '/vivekadrishti/assets/data/canto10-sridhara-literal-overrides/';
  const chapterCache = new Map();
  const overrideCache = new Map();

  function verseIdentity(section) {
    const id = section.querySelector(':scope > .sb-verse')?.id || section.getAttribute('aria-labelledby') || '';
    const match = id.match(/^sb-10-(\d+)-(\d+)(?:-(\d+))?$/i);
    if (!match) return null;
    return {
      chapter: Number(match[1]),
      start: Number(match[2]),
      end: Number(match[3] || match[2])
    };
  }

  function sridharaSourceText(section) {
    return (section.querySelector(':scope > .sb-bhasya .sb-source-content, :scope > .sb-bhasya [lang="sa-Deva"], :scope > .sb-bhasya [lang="sa"]')?.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function hasActualCommentary(section) {
    const text = sridharaSourceText(section);
    if (!text) return false;
    return !/^\s*न\s+व्याख्यातम्[।.]?\s*$/u.test(text) && !/^\s*na\s+vyākhyātam[.]?\s*$/iu.test(text);
  }

  async function chapterData(chapter) {
    if (!chapterCache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      chapterCache.set(chapter, fetch(`${DATA_BASE}${file}.json?v=11`, { cache: 'force-cache' })
        .then((response) => response.ok ? response.json() : {})
        .catch(() => ({})));
    }
    return chapterCache.get(chapter);
  }

  async function literalOverrides(chapter) {
    if (!overrideCache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      overrideCache.set(chapter, fetch(`${OVERRIDE_BASE}${file}.json?v=1`, { cache: 'force-cache' })
        .then((response) => response.ok ? response.json() : {})
        .catch(() => ({})));
    }
    return overrideCache.get(chapter);
  }

  function normalizeRecord(value, chapter) {
    if (!value) return null;
    if (typeof value === 'string') {
      return chapter <= 7 ? { reviewed: true, word_for_word: value.trim(), translation: '' } : null;
    }
    if (typeof value !== 'object' || Array.isArray(value)) return null;

    const reviewed = value.reviewed === true || (chapter <= 7 && value.generated !== true);
    if (!reviewed) return null;
    return {
      reviewed: true,
      word_for_word: String(value.word_for_word || value.wordForWord || '').trim(),
      translation: String(value.translation || value.direct_translation || '').trim()
    };
  }

  function recordForRange(data, identity) {
    const directKey = identity.start === identity.end ? String(identity.start) : `${identity.start}-${identity.end}`;
    const direct = normalizeRecord(data[directKey], identity.chapter);
    if (direct) return direct;
    if (identity.start === identity.end) return null;

    const records = [];
    for (let verse = identity.start; verse <= identity.end; verse += 1) {
      const record = normalizeRecord(data[String(verse)], identity.chapter);
      if (!record) return null;
      records.push(record);
    }
    return {
      reviewed: true,
      word_for_word: records.map((record) => record.word_for_word).filter(Boolean).join(' ').trim(),
      translation: records.map((record) => record.translation).filter(Boolean).join(' ').trim()
    };
  }

  function overrideForRange(data, identity) {
    const directKey = identity.start === identity.end ? String(identity.start) : `${identity.start}-${identity.end}`;
    const direct = data?.[directKey];
    if (direct && typeof direct === 'object' && !Array.isArray(direct)) return direct;
    if (identity.start === identity.end) return null;

    const records = [];
    for (let verse = identity.start; verse <= identity.end; verse += 1) {
      const record = data?.[String(verse)];
      if (!record || typeof record !== 'object' || Array.isArray(record)) return null;
      records.push(record);
    }
    return {
      reviewed: true,
      word_for_word: records.map((record) => String(record.word_for_word || '').trim()).filter(Boolean).join(' ').trim(),
      translation: records.map((record) => String(record.translation || '').trim()).filter(Boolean).join(' ').trim()
    };
  }

  function mergeReviewedRecord(base, override) {
    if (!base && !override) return null;
    if (!override) return base;
    return {
      reviewed: true,
      word_for_word: String(override.word_for_word || base?.word_for_word || '').trim(),
      translation: String(override.translation || base?.translation || '').trim()
    };
  }

  function makeWordForWordDetails(text) {
    const details = document.createElement('details');
    details.className = 'sb-details sb-sridhara-wfw-details';
    details.hidden = true;
    details.open = false;

    const summary = document.createElement('summary');
    summary.textContent = 'Śrīdhara word-for-word';
    const wrapper = document.createElement('div');
    wrapper.className = 'sb-source-block';
    const label = document.createElement('strong');
    label.className = 'sb-source-label';
    label.textContent = 'Śrīdhara word-for-word';
    const content = document.createElement('div');
    content.className = 'sb-source-content sb-sridhara-word-for-word';
    content.textContent = text;
    wrapper.append(label, content);
    details.append(summary, wrapper);
    return details;
  }

  function setDirectTranslation(section, translation) {
    let commentary = section.querySelector(':scope > .sb-commentary');
    if (!translation) {
      commentary?.remove();
      return;
    }
    if (!commentary) {
      commentary = document.createElement('p');
      commentary.className = 'sb-commentary';
      section.appendChild(commentary);
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
    if (section.dataset.sridharaReviewedChecked === 'true') return;
    section.dataset.sridharaReviewedChecked = 'true';

    section.querySelectorAll(':scope > .sb-sridhara-wfw-details').forEach((node) => node.remove());
    if (!hasActualCommentary(section)) {
      section.querySelector(':scope > .sb-commentary')?.remove();
      return;
    }

    const identity = verseIdentity(section);
    if (!identity) return;
    const [data, overrides] = await Promise.all([chapterData(identity.chapter), literalOverrides(identity.chapter)]);
    if (!section.isConnected) return;
    const record = mergeReviewedRecord(recordForRange(data, identity), overrideForRange(overrides, identity));
    if (!record) {
      section.dataset.sridharaEnglishStatus = 'awaiting-reviewed-translation';
      section.querySelector(':scope > .sb-commentary')?.remove();
      return;
    }

    if (record.word_for_word) section.appendChild(makeWordForWordDetails(record.word_for_word));
    setDirectTranslation(section, record.translation);
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
  scan();
})();