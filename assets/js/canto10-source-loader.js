(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const PRABHUPADA_BASE = 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIyo_abhaya-charaNaH/10/';
  const SRIDHARA_BASE = 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIya-prastutiH/10/';
  const BATCH_SIZE = 10;

  const chapterNav = root.querySelector('[data-canto10-chapters]');
  const chapterHost = root.querySelector('[data-canto10-chapter-host]');
  const status = root.querySelector('[data-canto10-status]');

  const sridharaGroup = (chapter) => {
    if (chapter <= 11) return '01-11';
    if (chapter <= 17) return '12-17';
    if (chapter <= 28) return '18-28';
    if (chapter <= 33) return '29-33_rasa-panchAdhyAya';
    if (chapter <= 49) return '34-49';
    if (chapter <= 59) return '50-59';
    if (chapter <= 69) return '60-69';
    if (chapter <= 79) return '70-79';
    if (chapter <= 86) return '80-86';
    if (chapter === 87) return null;
    return '88-90';
  };

  const chapterFile = (chapter) => String(chapter).padStart(2, '0');
  const prabhupadaUrl = (chapter) => `${PRABHUPADA_BASE}${chapterFile(chapter)}.md`;
  const sridharaUrl = (chapter) => {
    const group = sridharaGroup(chapter);
    return group
      ? `${SRIDHARA_BASE}${group}/${chapterFile(chapter)}.md`
      : `${SRIDHARA_BASE}87.md`;
  };

  const devaDigits = new Map(Object.entries({'०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'}));
  const toAsciiDigits = (text) => Array.from(text || '').map((ch) => devaDigits.get(ch) || ch).join('');

  const stripInlineMarkdown = (text) => (text || '')
    .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/_([^_\n]+)_/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();

  const cleanBlock = (block) => stripInlineMarkdown(block)
    .replace(/[ \t]{2,}\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const cleanVerseLines = (block) => (block || '')
    .split(/\n/)
    .map((line) => stripInlineMarkdown(line.replace(/[ \t]+$/g, '')).trim())
    .filter(Boolean);

  function sectionBlock(body, heading) {
    const pattern = new RegExp(`###\\s+${heading}\\s*\\n+([\\s\\S]*?)(?=\\n###\\s+|\\n##\\s+|$)`, 'i');
    const match = body.match(pattern);
    return match ? match[1].trim() : '';
  }

  function parsePrabhupada(markdown) {
    const entries = [];
    const headingPattern = /^##\s+Texts?\s+(\d+)(?:\s*[-–—]\s*(\d+))?\s*$/gmi;
    const headings = Array.from(markdown.matchAll(headingPattern));

    headings.forEach((match, index) => {
      const start = Number(match[1]);
      const end = Number(match[2] || match[1]);
      const bodyStart = match.index + match[0].length;
      const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
      const body = markdown.slice(bodyStart, bodyEnd);

      entries.push({
        start,
        end,
        devanagari: cleanVerseLines(sectionBlock(body, 'Devanagari')),
        transliteration: cleanVerseLines(sectionBlock(body, 'Verse text')),
        synonyms: cleanBlock(sectionBlock(body, 'Synonyms')),
        translation: cleanBlock(sectionBlock(body, 'Translation'))
      });
    });

    return entries;
  }

  function parseSridhara(markdown, chapter) {
    const map = new Map();
    const markerPattern = /॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)\s*॥/g;
    const markers = Array.from(markdown.matchAll(markerPattern));

    markers.forEach((marker, index) => {
      const canto = Number(toAsciiDigits(marker[1]));
      const ch = Number(toAsciiDigits(marker[2]));
      const verse = Number(toAsciiDigits(marker[3]));
      if (canto !== 10 || ch !== chapter) return;

      const segmentStart = marker.index + marker[0].length;
      const segmentEnd = index + 1 < markers.length ? markers[index + 1].index : markdown.length;
      const segment = markdown.slice(segmentStart, segmentEnd);
      const label = segment.search(/\*\*श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)\s*:\*\*/);
      if (label < 0) return;

      let commentary = segment.slice(label).replace(/^\*\*श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)\s*:\*\*\s*/,'');
      const stops = [
        commentary.search(/\n_{4,}/),
        commentary.search(/\n\*\*वंशीधरः/),
        commentary.search(/\n\*\*वीरराघव/),
        commentary.search(/\n\*\*विजयध्वज/),
        commentary.search(/\n\*\*जीवगोस्वाम/),
        commentary.search(/\n\*\*विश्वनाथ/)
      ].filter((value) => value >= 0);
      if (stops.length) commentary = commentary.slice(0, Math.min(...stops));

      commentary = cleanBlock(commentary);
      if (commentary) map.set(verse, commentary);
    });

    return map;
  }

  function makeDetails(label, body, className = '') {
    const details = document.createElement('details');
    details.className = `sb-details ${className}`.trim();
    const summary = document.createElement('summary');
    summary.textContent = label;
    const content = document.createElement('div');
    content.textContent = body;
    details.append(summary, content);
    return details;
  }

  function renderEntry(chapter, entry, sridharaMap) {
    const section = document.createElement('section');
    section.className = 'sb-verse-section';
    const rangeLabel = entry.start === entry.end ? `${entry.start}` : `${entry.start}–${entry.end}`;
    const id = `sb-10-${chapter}-${entry.start}${entry.end !== entry.start ? `-${entry.end}` : ''}`;
    section.setAttribute('aria-labelledby', id);

    const heading = document.createElement('h3');
    heading.id = id;
    heading.className = 'sb-verse';
    heading.textContent = `ŚB 10.${chapter}.${rangeLabel}`;

    const rule = document.createElement('hr');
    rule.className = 'sb-rule';

    const devanagari = document.createElement('div');
    devanagari.className = 'sb-devanagari';
    devanagari.lang = 'sa-Deva';
    devanagari.innerHTML = entry.devanagari.map((line) => {
      const span = document.createElement('span');
      span.textContent = line;
      return span.outerHTML;
    }).join('<br>');

    const translation = document.createElement('p');
    translation.className = 'sb-translation';
    translation.textContent = entry.translation;

    section.append(heading, rule, devanagari, translation);
    if (entry.synonyms) section.append(makeDetails('Word-for-word', entry.synonyms, 'sb-word-details'));
    if (entry.transliteration.length) section.append(makeDetails('Transliteration', entry.transliteration.join('\n'), 'sb-transliteration-details'));

    const sridharaParts = [];
    for (let verse = entry.start; verse <= entry.end; verse += 1) {
      const text = sridharaMap.get(verse);
      if (text) sridharaParts.push(entry.start === entry.end ? text : `10.${chapter}.${verse}\n${text}`);
    }
    if (sridharaParts.length) section.append(makeDetails('Śrīdhara Sanskrit', sridharaParts.join('\n\n'), 'sb-bhasya'));

    return section;
  }

  function batchEntries(entries) {
    const batches = [];
    let current = [];
    let verseCount = 0;

    entries.forEach((entry) => {
      const size = entry.end - entry.start + 1;
      if (current.length && verseCount + size > BATCH_SIZE) {
        batches.push(current);
        current = [];
        verseCount = 0;
      }
      current.push(entry);
      verseCount += size;
      if (verseCount >= BATCH_SIZE) {
        batches.push(current);
        current = [];
        verseCount = 0;
      }
    });
    if (current.length) batches.push(current);
    return batches;
  }

  function renderBatch(chapter, batch, sridharaMap, batchNumber) {
    const wrapper = document.createElement('div');
    wrapper.className = 'canto10-verse-batch';
    wrapper.dataset.batch = String(batchNumber);
    batch.forEach((entry) => wrapper.appendChild(renderEntry(chapter, entry, sridharaMap)));
    chapterHost.appendChild(wrapper);
  }

  async function loadChapter(chapter) {
    chapterHost.replaceChildren();
    status.textContent = `Loading Canto 10, Chapter ${chapter}…`;

    try {
      const [prabhupadaResponse, sridharaResponse] = await Promise.all([
        fetch(prabhupadaUrl(chapter), { mode: 'cors', cache: 'force-cache' }),
        fetch(sridharaUrl(chapter), { mode: 'cors', cache: 'force-cache' })
      ]);

      if (!prabhupadaResponse.ok) throw new Error(`Prabhupāda source ${prabhupadaResponse.status}`);
      if (!sridharaResponse.ok) throw new Error(`Śrīdhara source ${sridharaResponse.status}`);

      const [prabhupadaMarkdown, sridharaMarkdown] = await Promise.all([
        prabhupadaResponse.text(),
        sridharaResponse.text()
      ]);

      const entries = parsePrabhupada(prabhupadaMarkdown);
      const sridharaMap = parseSridhara(sridharaMarkdown, chapter);
      if (!entries.length) throw new Error('No verse entries found');

      const chapterHeading = document.createElement('h2');
      chapterHeading.id = `chapter-${chapter}`;
      chapterHeading.className = 'sb-chapter';
      chapterHeading.textContent = `Canto 10 — Chapter ${chapter}`;
      chapterHost.appendChild(chapterHeading);

      const batches = batchEntries(entries);
      let shown = 0;
      const loadMore = document.createElement('button');
      loadMore.type = 'button';
      loadMore.className = 'btn canto10-load-more';

      const showNext = () => {
        if (shown >= batches.length) return;
        renderBatch(chapter, batches[shown], sridharaMap, shown + 1);
        shown += 1;
        const remaining = batches.length - shown;
        if (remaining > 0) {
          loadMore.textContent = `Load next 10 verses (${remaining} batch${remaining === 1 ? '' : 'es'} left)`;
          chapterHost.appendChild(loadMore);
        } else {
          loadMore.remove();
          status.textContent = `Chapter ${chapter} complete — ${entries[entries.length - 1].end} verses loaded.`;
        }
      };

      loadMore.addEventListener('click', () => {
        loadMore.remove();
        showNext();
      });

      status.textContent = `Chapter ${chapter} source loaded. Showing the first 10 verses.`;
      showNext();
      history.replaceState(null, '', `#chapter-${chapter}`);
      chapterHeading.scrollIntoView({ block: 'start' });
    } catch (error) {
      status.textContent = `Could not load Chapter ${chapter}: ${error.message}`;
    }
  }

  for (let chapter = 1; chapter <= 90; chapter += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn canto10-chapter-button';
    button.textContent = `Chapter ${chapter}`;
    button.dataset.chapter = String(chapter);
    button.addEventListener('click', () => loadChapter(chapter));
    chapterNav.appendChild(button);
  }

  const hashMatch = location.hash.match(/^#chapter-(\d+)$/);
  const initialChapter = hashMatch ? Math.min(90, Math.max(1, Number(hashMatch[1]))) : 1;
  loadChapter(initialChapter);
})();