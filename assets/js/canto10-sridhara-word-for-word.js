(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const BASE_DATA = '/vivekadrishti/assets/data/canto10-sridhara-word-for-word/';
  const DIRECT_DATA = '/vivekadrishti/assets/data/canto10-sridhara-direct/';
  const chapterCache = new Map();

  function verseIdentity(section) {
    const id = section.querySelector(':scope > .sb-verse')?.id || section.getAttribute('aria-labelledby') || '';
    const match = id.match(/^sb-10-(\d+)-(\d+)(?:-(\d+))?$/i);
    if (!match) return null;
    return { chapter: Number(match[1]), start: Number(match[2]), end: Number(match[3] || match[2]) };
  }

  function sridharaSourceText(section) {
    return (section.querySelector(':scope > .sb-bhasya .sb-source-content, :scope > .sb-bhasya [lang="sa-Deva"], :scope > .sb-bhasya [lang="sa"]')?.textContent || '')
      .replace(/\s+/g, ' ').trim();
  }

  function hasActualCommentary(section) {
    const text = sridharaSourceText(section);
    if (!text) return false;
    return !/^\s*न\s+व्याख्यातम्[।.]?\s*$/u.test(text) && !/^\s*na\s+vyākhyātam[.]?\s*$/iu.test(text);
  }

  async function jsonOrEmpty(url) {
    try {
      const response = await fetch(url, { cache: 'force-cache' });
      return response.ok ? response.json() : {};
    } catch (_) { return {}; }
  }

  async function chapterData(chapter) {
    if (!chapterCache.has(chapter)) {
      const file = String(chapter).padStart(2, '0');
      chapterCache.set(chapter, Promise.all([
        jsonOrEmpty(`${BASE_DATA}${file}.json?v=13`),
        jsonOrEmpty(`${DIRECT_DATA}${file}.json?v=1`)
      ]).then(([base, direct]) => ({ base, direct })));
    }
    return chapterCache.get(chapter);
  }

  // The automated Google Sanskrit pass is deliberately NOT accepted here.
  // Base data is displayable only when it was explicitly reviewed (or is one
  // of the old manually curated Canto 10.1–7 records). Every other entry must
  // come from the separate direct-audit layer.
  function normalizeBase(value, chapter) {
    if (!value) return null;
    if (typeof value === 'string') {
      return chapter <= 7 ? { reviewed: true, direct: false, word_for_word: value.trim(), translation: '' } : null;
    }
    if (typeof value !== 'object' || Array.isArray(value)) return null;
    const reviewed = value.reviewed === true || (chapter <= 7 && value.generated !== true && value.source_aligned !== true);
    if (!reviewed) return null;
    return {
      reviewed: true,
      direct: false,
      word_for_word: String(value.word_for_word || value.wordForWord || '').trim(),
      translation: String(value.translation || value.direct_translation || '').trim()
    };
  }

  function normalizeDirect(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || value.direct !== true) return null;
    return {
      reviewed: false,
      direct: true,
      word_for_word: String(value.word_for_word || value.wordForWord || '').trim(),
      translation: String(value.translation || value.direct_translation || '').trim()
    };
  }

  function exactRecord(data, key, chapter) {
    return normalizeDirect(data.direct?.[key]) || normalizeBase(data.base?.[key], chapter);
  }

  function recordForRange(data, identity) {
    const key = identity.start === identity.end ? String(identity.start) : `${identity.start}-${identity.end}`;
    const direct = exactRecord(data, key, identity.chapter);
    if (direct) return direct;
    if (identity.start === identity.end) return null;
    const records = [];
    for (let verse = identity.start; verse <= identity.end; verse += 1) {
      const record = exactRecord(data, String(verse), identity.chapter);
      if (!record) return null;
      records.push(record);
    }
    return {
      reviewed: records.every((record) => record.reviewed),
      direct: records.some((record) => record.direct),
      word_for_word: records.map((record) => record.word_for_word).filter(Boolean).join(' ').trim(),
      translation: records.map((record) => record.translation).filter(Boolean).join(' ').trim()
    };
  }

  const independentVowels = new Map(Object.entries({'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'}));
  const vowelMarks = new Map(Object.entries({'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au'}));
  const consonants = new Map(Object.entries({'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'}));
  const digits = new Map(Object.entries({'०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'}));
  function devanagariToIast(input) {
    const chars = Array.from((input || '').normalize('NFC'));
    let output = '';
    for (let i = 0; i < chars.length; i += 1) {
      const ch = chars[i];
      if (consonants.has(ch)) {
        const next = chars[i + 1];
        output += consonants.get(ch);
        if (next === '्') i += 1;
        else if (vowelMarks.has(next)) { output += vowelMarks.get(next); i += 1; }
        else output += 'a';
        continue;
      }
      if (independentVowels.has(ch)) { output += independentVowels.get(ch); continue; }
      if (vowelMarks.has(ch)) { output += vowelMarks.get(ch); continue; }
      if (digits.has(ch)) { output += digits.get(ch); continue; }
      if (ch === 'ं') { output += 'ṃ'; continue; }
      if (ch === 'ः') { output += 'ḥ'; continue; }
      if (ch === 'ँ') { output += 'm̐'; continue; }
      if (ch === 'ऽ') { output += '’'; continue; }
      if (ch === '।') { output += '|'; continue; }
      if (ch === '॥') { output += '||'; continue; }
      if (ch === '़' || ch === '्') continue;
      output += ch;
    }
    return output.trim();
  }

  function normalizeWordForWordDisplay(text) {
    return String(text || '').split(';').map((item) => {
      const part = item.trim();
      const divider = part.indexOf(' — ');
      if (divider < 0) return /[\u0900-\u097f]/u.test(part) ? devanagariToIast(part) : part;
      const left = part.slice(0, divider).trim();
      const right = part.slice(divider + 3).trim();
      return `${/[\u0900-\u097f]/u.test(left) ? devanagariToIast(left) : left} — ${right}`;
    }).filter(Boolean).join('; ');
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
    content.textContent = normalizeWordForWordDisplay(text);
    wrapper.append(label, content);
    details.append(summary, wrapper);
    return details;
  }

  function setDirectTranslation(section, translation) {
    let commentary = section.querySelector(':scope > .sb-commentary');
    if (!translation) { commentary?.remove(); return; }
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
      section.dataset.sridharaEnglishStatus = 'no-commentary';
      return;
    }
    const identity = verseIdentity(section);
    if (!identity) return;
    const data = await chapterData(identity.chapter);
    if (!section.isConnected) return;
    const record = recordForRange(data, identity);
    if (!record) {
      section.dataset.sridharaEnglishStatus = 'awaiting-direct-audit';
      section.querySelector(':scope > .sb-commentary')?.remove();
      return;
    }
    if (record.word_for_word) section.appendChild(makeWordForWordDetails(record.word_for_word));
    setDirectTranslation(section, record.translation);
    section.dataset.sridharaEnglishStatus = record.reviewed ? 'reviewed' : 'direct-audit';
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