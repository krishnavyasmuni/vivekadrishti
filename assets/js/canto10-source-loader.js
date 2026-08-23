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

  const independentVowels = new Map(Object.entries({
    'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'
  }));
  const vowelMarks = new Map(Object.entries({
    'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au'
  }));
  const consonants = new Map(Object.entries({
    'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ',
    'ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n',
    'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'
  }));

  function devanagariToIast(input) {
    const chars = Array.from((input || '').normalize('NFC'));
    let output = '';

    for (let i = 0; i < chars.length; i += 1) {
      const ch = chars[i];
      if (consonants.has(ch)) {
        const next = chars[i + 1];
        output += consonants.get(ch);
        if (next === '्') {
          i += 1;
        } else if (vowelMarks.has(next)) {
          output += vowelMarks.get(next);
          i += 1;
        } else {
          output += 'a';
        }
        continue;
      }
      if (independentVowels.has(ch)) { output += independentVowels.get(ch); continue; }
      if (vowelMarks.has(ch)) { output += vowelMarks.get(ch); continue; }
      if (devaDigits.has(ch)) { output += devaDigits.get(ch); continue; }
      if (ch === 'ं') { output += 'ṃ'; continue; }
      if (ch === 'ः') { output += 'ḥ'; continue; }
      if (ch === 'ँ') { output += 'm̐'; continue; }
      if (ch === 'ऽ') { output += '’'; continue; }
      if (ch === '।') { output += '|'; continue; }
      if (ch === '॥') { output += '||'; continue; }
      if (ch === '़' || ch === '्') continue;
      output += ch;
    }

    return output
      .replace(/\s+\|\|/g, ' ||')
      .replace(/\s+\|/g, ' |')
      .replace(/[ \t]+\n/g, '\n')
      .trim();
  }

  const stripInlineMarkdown = (text) => (text || '')
    .replace(/\[\^[^\]]+\]/g, '')
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
    const entries = [];
    const markerPattern = /॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*॥/g;
    const markers = Array.from(markdown.matchAll(markerPattern));

    markers.forEach((marker, index) => {
      const canto = Number(toAsciiDigits(marker[1]));
      const ch = Number(toAsciiDigits(marker[2]));
      const start = Number(toAsciiDigits(marker[3]));
      const end = Number(toAsciiDigits(marker[4] || marker[3]));
      if (canto !== 10 || ch !== chapter) return;

      const segmentStart = marker.index + marker[0].length;
      const segmentEnd = index + 1 < markers.length ? markers[index + 1].index : markdown.length;
      const segment = markdown.slice(segmentStart, segmentEnd);
      const label = segment.search(/\*\*श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)\s*:\*\*/);
      if (label < 0) return;

      let commentary = segment.slice(label).replace(/^\*\*श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)\s*:\*\*\s*/, '');
      const stops = [
        commentary.search(/\n_{4,}/),
        commentary.search(/\n\*\*वंशीधरः/),
        commentary.search(/\n\*\*वीरराघव/),
        commentary.search(/\n\*\*विजयध्वज/),
        commentary.search(/\n\*\*जीव-?गोस्वामी/),
        commentary.search(/\n\*\*विश्वनाथ/)
      ].filter((value) => value >= 0);
      if (stops.length) commentary = commentary.slice(0, Math.min(...stops));

      commentary = cleanBlock(commentary);
      if (commentary) entries.push({ start, end, text: commentary });
    });

    return entries;
  }

  function sridharaForRange(sridharaEntries, start, end, chapter) {
    return sridharaEntries
      .filter((entry) => entry.end >= start && entry.start <= end)
      .map((entry) => {
        const label = entry.start === entry.end
          ? `10.${chapter}.${entry.start}`
          : `10.${chapter}.${entry.start}–${entry.end}`;
        return start === end && entry.start === entry.end
          ? entry.text
          : `${label}\n${entry.text}`;
      })
      .join('\n\n')
      .trim();
  }

  function appendMultiline(target, text) {
    const lines = String(text || '').split(/\n/);
    lines.forEach((line, index) => {
      if (index) target.appendChild(document.createElement('br'));
      target.appendChild(document.createTextNode(line));
    });
  }

  function makeSourceDetails(label, blocks, className = '') {
    const details = document.createElement('details');
    details.className = `sb-details ${className}`.trim();

    const summary = document.createElement('summary');
    summary.textContent = label;
    details.appendChild(summary);

    blocks.filter((block) => block && block.text).forEach((block) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'sb-source-block';

      const sourceLabel = document.createElement('strong');
      sourceLabel.className = 'sb-source-label';
      sourceLabel.textContent = block.label;
      wrapper.appendChild(sourceLabel);

      const content = document.createElement('div');
      content.className = 'sb-source-content';
      if (block.lang) content.lang = block.lang;
      if (block.italic) {
        const em = document.createElement('em');
        appendMultiline(em, block.text);
        content.appendChild(em);
      } else {
        appendMultiline(content, block.text);
      }

      wrapper.appendChild(content);
      details.appendChild(wrapper);
    });

    return details;
  }

  function renderEntry(chapter, entry, sridharaEntries) {
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
    entry.devanagari.forEach((line, index) => {
      if (index) devanagari.appendChild(document.createElement('br'));
      devanagari.appendChild(document.createTextNode(line));
    });

    const translation = document.createElement('p');
    translation.className = 'sb-translation';
    translation.textContent = entry.translation;

    const sridharaSanskrit = sridharaForRange(sridharaEntries, entry.start, entry.end, chapter);
    const sridharaTransliteration = sridharaSanskrit ? devanagariToIast(sridharaSanskrit) : '';
    const bhagavatamSanskrit = entry.devanagari.join('\n');
    const bhagavatamTransliteration = entry.transliteration.join('\n');

    section.append(heading, rule, devanagari, translation);

    if (entry.synonyms) {
      section.append(makeSourceDetails('Word-for-word', [
        { label: 'Bhāgavatam word-for-word', text: entry.synonyms }
      ], 'sb-word-details'));
    }

    if (bhagavatamTransliteration || sridharaTransliteration) {
      section.append(makeSourceDetails('Transliteration', [
        { label: 'Bhāgavatam transliteration', text: bhagavatamTransliteration, lang: 'sa-Latn', italic: true },
        { label: 'Śrīdhara transliteration', text: sridharaTransliteration, lang: 'sa-Latn', italic: true }
      ], 'sb-transliteration-details'));
    }

    if (bhagavatamSanskrit || sridharaSanskrit) {
      section.append(makeSourceDetails('Śrīdhara Sanskrit', [
        { label: 'Bhāgavatam Sanskrit', text: bhagavatamSanskrit, lang: 'sa-Deva' },
        { label: 'Śrīdhara Sanskrit', text: sridharaSanskrit, lang: 'sa-Deva' }
      ], 'sb-bhasya'));
    }

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

  function renderBatch(chapter, batch, sridharaEntries, batchNumber) {
    const wrapper = document.createElement('div');
    wrapper.className = 'canto10-verse-batch';
    wrapper.dataset.batch = String(batchNumber);
    batch.forEach((entry) => wrapper.appendChild(renderEntry(chapter, entry, sridharaEntries)));
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
      const sridharaEntries = parseSridhara(sridharaMarkdown, chapter);
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
        renderBatch(chapter, batches[shown], sridharaEntries, shown + 1);
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