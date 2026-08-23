(() => {
  const sectionPaths = new Map([
    ['/vivekadrishti/introduction-to-hinduism/', '/vivekadrishti/pages/introduction-to-hinduism/'],
    ['/vivekadrishti/indology/', '/vivekadrishti/pages/indology/'],
    ['/vivekadrishti/purana-library/', '/vivekadrishti/pages/purana-library/'],
    ['/vivekadrishti/bhagavatam-with-sridhara-bhasya/', '/vivekadrishti/pages/bhagavatam-with-sridhara-bhasya/'],
    ['/vivekadrishti/bhavishya-purana-brahmaparvan/', '/vivekadrishti/pages/bhavishya-purana-brahmaparvan/']
  ]);

  document.querySelectorAll('a[href]').forEach((link) => {
    const replacement = sectionPaths.get(link.getAttribute('href'));
    if (replacement) link.setAttribute('href', replacement);
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    navigation.addEventListener('click', (event) => {
      if (!event.target.matches('a')) return;
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('details.sanskrit-reveal').forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    const closed = (summary.textContent || '').trim() || 'Show Sanskrit';
    const opened = /show sanskrit/i.test(closed) ? closed.replace(/show sanskrit/i, 'Hide Sanskrit') : 'Hide Sanskrit';
    details.addEventListener('toggle', () => { summary.textContent = details.open ? opened : closed; });
  });

  const isCanto2 = /srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(location.pathname);
  const rebuildRoot = document.querySelector('.empyrean-bhagavatam-rebuild, .empyrean-bhagavatam-rebuild-part');
  if (!rebuildRoot) return;

  document.body.classList.add('bhagavatam-rebuild-page');
  if (isCanto2) document.body.classList.add('canto-2-verse-layout');

  if (isCanto2 && !document.querySelector('link[data-canto2-layout]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/vivekadrishti/assets/css/bhagavatam-canto2-verse-layout-v7.css?v=8';
    css.dataset.canto2Layout = 'true';
    document.head.appendChild(css);
  } else if (!isCanto2 && !document.querySelector('link[data-bhagavatam-rebuild-styles]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/vivekadrishti/assets/css/bhagavatam-rebuild-all-verses.css?v=6';
    css.dataset.bhagavatamRebuildStyles = 'true';
    document.head.appendChild(css);
  }

  const children = (node) => Array.from(node ? node.children : []);
  const summaryText = (details) => (details?.querySelector(':scope > summary')?.textContent || '').trim();
  const verseDetails = (section) => Array.from(section.querySelectorAll(':scope > details, :scope > div > details'))
    .filter((details) => details.closest('.sb-verse-section') === section || !details.closest('.sb-verse-section'));
  const detailsByLabel = (section, pattern) => verseDetails(section).find((details) => pattern.test(summaryText(details)));

  function wrapLegacyVerse(heading) {
    const parent = heading.parentElement;
    if (!parent) return null;
    const previous = heading.previousElementSibling;
    const start = previous?.matches('hr.sb-rule, div.sb-rule') ? previous : heading;
    const section = document.createElement('section');
    section.className = 'sb-verse-section';
    section.setAttribute('aria-labelledby', heading.id);
    parent.insertBefore(section, start);

    let node = start;
    while (node) {
      const next = node.nextElementSibling;
      if (node !== start && node.matches('h2[id^="chapter-"]')) break;
      if (node !== start && node.matches('hr.sb-rule, div.sb-rule') && next?.matches('h3[id^="sb-"]')) break;
      section.appendChild(node);
      node = next;
    }
    return section;
  }

  function makeDetails(label, className, nodes = []) {
    const details = document.createElement('details');
    details.className = `sb-details ${className}`;
    const summary = document.createElement('summary');
    summary.textContent = label;
    details.appendChild(summary);
    nodes.filter(Boolean).forEach((node) => details.appendChild(node));
    details.open = false;
    return details;
  }

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
  const devanagariDigits = new Map(Object.entries({'०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'}));

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
      if (devanagariDigits.has(ch)) { output += devanagariDigits.get(ch); continue; }
      if (ch === 'ं') { output += 'ṃ'; continue; }
      if (ch === 'ः') { output += 'ḥ'; continue; }
      if (ch === 'ँ') { output += 'm̐'; continue; }
      if (ch === 'ऽ') { output += '’'; continue; }
      if (ch === '।') { output += '|'; continue; }
      if (ch === '॥') { output += '||'; continue; }
      if (ch === '़' || ch === '्') continue;
      output += ch;
    }
    return output.replace(/\s+\|\|/g, ' ||').replace(/\s+\|/g, ' |').trim();
  }

  function findCommentary(section, translation) {
    let commentary = children(section).find((node) =>
      node.tagName === 'P' && /śrīdhara['’]s commentary/i.test(node.textContent || '')
    );
    if (!commentary) {
      commentary = Array.from(section.querySelectorAll(':scope > div > p')).find((node) =>
        /śrīdhara['’]s commentary/i.test(node.textContent || '')
      );
    }
    if (!commentary) {
      commentary = children(section).slice().reverse().find((node) =>
        node.tagName === 'P' && node !== translation && !node.closest('details')
      );
    }
    if (commentary && commentary !== translation) commentary.classList.add('sb-commentary');
    return commentary;
  }

  function normalizeCanto2Verse(heading) {
    let section = heading.closest('section[aria-labelledby^="sb-"]');
    if (!section) section = wrapLegacyVerse(heading);
    if (!section) return;

    section.classList.add('sb-verse-section');
    section.setAttribute('aria-labelledby', heading.id);
    heading.classList.add('sb-verse');

    let direct = children(section);
    let rule = direct.find((node) => node.matches('hr.sb-rule, div.sb-rule'));
    if (!rule) rule = document.createElement('hr');
    rule.classList.add('sb-rule');

    direct = children(section);
    const devanagari = direct.find((node) =>
      node.matches('.sb-devanagari,.sb-dev,[lang="sa-Deva"]') ||
      (node.matches('[lang="sa"]') && !node.closest('details'))
    );
    if (devanagari) devanagari.classList.add('sb-devanagari');

    let translation = direct.find((node) => node.matches('.sb-translation, .sb-translation-content'));
    const oldTranslationDetails = detailsByLabel(section, /^translation$/i);
    if (!translation && oldTranslationDetails) {
      translation = oldTranslationDetails.querySelector(':scope > .sb-translation, :scope > .sb-translation-content, :scope > div, :scope > p');
    }
    if (translation) {
      translation.classList.remove('sb-translation-content');
      translation.classList.add('sb-translation');
    }
    if (oldTranslationDetails) oldTranslationDetails.remove();

    let bhagavatamTranslitDetails = detailsByLabel(section, /^(?:bhāgavatam\s+)?transliteration$/i);
    let transliteration = direct.find((node) =>
      node.matches('.sb-transliteration,.sb-iast,[lang="sa-Latn"]') && !node.closest('details')
    );
    if (!transliteration && bhagavatamTranslitDetails) {
      transliteration = bhagavatamTranslitDetails.querySelector(':scope > .sb-transliteration, :scope > .sb-iast, :scope > div, :scope > p');
    }
    if (transliteration) transliteration.classList.add('sb-transliteration');
    if (!bhagavatamTranslitDetails && transliteration) {
      bhagavatamTranslitDetails = makeDetails('Bhāgavatam Transliteration', 'sb-bhagavatam-transliteration-details', [transliteration]);
    } else if (bhagavatamTranslitDetails) {
      bhagavatamTranslitDetails.classList.add('sb-details', 'sb-bhagavatam-transliteration-details');
      const summary = bhagavatamTranslitDetails.querySelector(':scope > summary');
      if (summary) summary.textContent = 'Bhāgavatam Transliteration';
      if (transliteration && transliteration.parentElement !== bhagavatamTranslitDetails) bhagavatamTranslitDetails.appendChild(transliteration);
      bhagavatamTranslitDetails.open = false;
    }

    let bhagavatamWordDetails = verseDetails(section).find((details) =>
      /word[- ]?for[- ]?word/i.test(summaryText(details)) && !/śrīdhara|sridhara/i.test(summaryText(details))
    );
    if (bhagavatamWordDetails) {
      bhagavatamWordDetails.classList.add('sb-details', 'sb-word-details');
      const summary = bhagavatamWordDetails.querySelector(':scope > summary');
      if (summary) summary.textContent = 'Bhāgavatam Word-for-word';
      bhagavatamWordDetails.open = false;
    }

    let sridharaSanskrit = detailsByLabel(section, /^śrīdhara sanskrit$|^sridhara sanskrit$/i)
      || section.querySelector(':scope > .sb-bhasya, :scope > div > .sb-bhasya');
    let sridharaTranslit = detailsByLabel(section, /^śrīdhara transliteration$|^sridhara transliteration$/i);
    let sridharaWord = detailsByLabel(section, /^śrīdhara word[- ]?for[- ]?word$|^sridhara word[- ]?for[- ]?word$/i);

    if (sridharaSanskrit) {
      sridharaSanskrit.classList.add('sb-details', 'sb-bhasya');
      const summary = sridharaSanskrit.querySelector(':scope > summary');
      if (summary) summary.textContent = 'Śrīdhara Sanskrit';

      const contentNodes = children(sridharaSanskrit).filter((node) => node.tagName !== 'SUMMARY');
      const wordNodes = contentNodes.filter((node) => /Śrīdhara word-for-word\./i.test(node.textContent || ''));
      const translitNodes = contentNodes.filter((node) =>
        !wordNodes.includes(node) && (
          node.matches('[lang="sa-Latn"], .sb-sridhara-auto-transliteration') ||
          (!!node.querySelector('em') && !node.matches('[lang="sa-Deva"], [lang="sa"], .sb-bhasya-text'))
        )
      );
      const sanskritNodes = contentNodes.filter((node) => !wordNodes.includes(node) && !translitNodes.includes(node));

      if (!sridharaTranslit) {
        let nodes = translitNodes;
        if (!nodes.length && sanskritNodes.length) {
          const source = sanskritNodes.find((node) => /[\u0900-\u097F]/.test(node.textContent || ''));
          if (source) {
            const p = document.createElement('p');
            p.className = 'sb-sridhara-auto-transliteration';
            const em = document.createElement('em');
            em.textContent = devanagariToIast(source.textContent || '');
            p.appendChild(em);
            nodes = [p];
          }
        }
        sridharaTranslit = makeDetails('Śrīdhara Transliteration', 'sb-sridhara-transliteration-details', nodes);
      } else {
        sridharaTranslit.classList.add('sb-details', 'sb-sridhara-transliteration-details');
        const translitSummary = sridharaTranslit.querySelector(':scope > summary');
        if (translitSummary) translitSummary.textContent = 'Śrīdhara Transliteration';
        translitNodes.forEach((node) => sridharaTranslit.appendChild(node));
      }

      if (!sridharaWord) {
        let nodes = wordNodes;
        if (!nodes.length) {
          const note = document.createElement('p');
          note.className = 'sb-sridhara-wfw-missing';
          note.textContent = 'A separate sourced Śrīdhara word-for-word gloss has not yet been added for this verse.';
          nodes = [note];
        }
        sridharaWord = makeDetails('Śrīdhara Word-for-word', 'sb-sridhara-word-details', nodes);
      } else {
        sridharaWord.classList.add('sb-details', 'sb-sridhara-word-details');
        const wordSummary = sridharaWord.querySelector(':scope > summary');
        if (wordSummary) wordSummary.textContent = 'Śrīdhara Word-for-word';
        wordNodes.forEach((node) => sridharaWord.appendChild(node));
      }

      sridharaSanskrit.open = false;
      sridharaTranslit.open = false;
      sridharaWord.open = false;
    }

    verseDetails(section).forEach((details) => {
      details.classList.add('sb-details');
      details.open = false;
    });

    const commentary = findCommentary(section, translation);

    heading.after(rule);
    let anchor = rule;
    [
      devanagari,
      translation,
      bhagavatamWordDetails,
      bhagavatamTranslitDetails,
      sridharaSanskrit,
      sridharaTranslit,
      sridharaWord,
      commentary
    ].forEach((node) => {
      if (!node) return;
      anchor.after(node);
      anchor = node;
    });
  }

  function normalizeCanto2Scope(scope = document) {
    scope.querySelectorAll('h2[id^="chapter-"]').forEach((heading) => heading.classList.add('sb-chapter'));
    scope.querySelectorAll('h3[id^="sb-2-"]').forEach(normalizeCanto2Verse);
  }

  const continuationPath = '/vivekadrishti/articles/srimad-bhagavatam-second-canto-sridhara-svami-rebuild/fragments/';
  const continuationBatchCount = 32;

  async function loadCanto2Continuation() {
    if (!isCanto2) return null;
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return null;
    articleBody.querySelector(':scope > .bhagavatam-continuation-host')?.remove();

    const host = document.createElement('div');
    host.className = 'bhagavatam-continuation-host';
    articleBody.appendChild(host);

    for (let index = 1; index <= continuationBatchCount; index += 1) {
      const batch = String(index).padStart(3, '0');
      let response;
      try {
        response = await fetch(`${continuationPath}batch-${batch}.html`, { cache: 'no-store', credentials: 'same-origin' });
      } catch (_) {
        break;
      }
      if (!response.ok) break;

      const template = document.createElement('template');
      template.innerHTML = await response.text();
      template.content.querySelectorAll('script,iframe,object,embed,form,input,button,link,style,meta').forEach((node) => node.remove());
      const blocked = new Set(['srcdoc', 'src', 'srcset', 'xlink:href', 'formaction', 'style']);
      template.content.querySelectorAll('*').forEach((element) => {
        Array.from(element.attributes).forEach((attribute) => {
          const name = attribute.name.toLowerCase();
          if (/^on/i.test(attribute.name) || blocked.has(name)) element.removeAttribute(attribute.name);
          if (name === 'href' && /^\s*javascript:/i.test(attribute.value || '')) element.removeAttribute(attribute.name);
        });
      });
      host.appendChild(template.content.cloneNode(true));
    }
    normalizeCanto2Scope(host);
    return host;
  }

  function cleanMarkdownInline(text) {
    return (text || '')
      .replace(/\\([\[\]_*])/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/(^|[\s(])\*([^*\n]+)\*(?=$|[\s).,;:!?])/g, '$1$2')
      .replace(/(^|[\s(])_([^_\n]+)_(?=$|[\s).,;:!?])/g, '$1$2');
  }

  function markdownPlainText(block) {
    return cleanMarkdownInline(block).replace(/[ \t]{2,}\n/g, '\n').replace(/\s+/g, ' ').trim().replace(/^\*\*/, '').replace(/\*\*$/, '');
  }

  function markdownVerseLines(block) {
    return (block || '').trim().replace(/^\*+/, '').replace(/\*+$/, '').split(/\n/)
      .map((line) => cleanMarkdownInline(line.replace(/[ \t]+$/g, '')).replace(/^\*+|\*+$/g, '').trim())
      .filter(Boolean);
  }

  function parseVishvasaChapter(markdown) {
    const entries = [];
    const pattern = /^##\s+Texts?\s+(\d+)(?:\s*[-–—]\s*(\d+))?\s*$/gmi;
    const headings = Array.from(markdown.matchAll(pattern));
    headings.forEach((match, index) => {
      const start = Number(match[1]);
      const end = Number(match[2] || match[1]);
      const bodyStart = match.index + match[0].length;
      const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
      const body = markdown.slice(bodyStart, bodyEnd);
      const verse = body.match(/###\s+Verse text\s*\n+([\s\S]*?)(?=\n###\s+|\n##\s+|$)/i);
      const translation = body.match(/###\s+Translation\s*\n+([\s\S]*?)(?=\n###\s+|\n##\s+|$)/i);
      entries.push({
        start,
        end,
        verseLines: verse ? markdownVerseLines(verse[1]) : [],
        translation: translation ? markdownPlainText(translation[1]) : ''
      });
    });
    return entries;
  }

  function canto2Section(chapter, verse) {
    return document.getElementById(`sb-2-${chapter}-${verse}`)?.closest('.sb-verse-section') || null;
  }

  function canto2Sections(chapter, start, end) {
    const combined = start !== end
      ? document.getElementById(`sb-2-${chapter}-${start}-${end}`)?.closest('.sb-verse-section')
      : null;
    if (combined) return [combined];
    const result = [];
    for (let verse = start; verse <= end; verse += 1) {
      const section = canto2Section(chapter, verse);
      if (section) result.push(section);
    }
    return result;
  }

  function setExactTranslation(section, text) {
    if (!section || !text) return;
    let translation = section.querySelector(':scope > .sb-translation');
    if (!translation) {
      const oldDetails = detailsByLabel(section, /^translation$/i);
      translation = oldDetails?.querySelector(':scope > div, :scope > p') || document.createElement('p');
      oldDetails?.remove();
      translation.className = 'sb-translation';
      section.querySelector(':scope > .sb-devanagari, :scope > .sb-dev')?.after(translation);
    }
    if ((translation.textContent || '').replace(/\s+/g, ' ').trim() !== text) translation.textContent = text;
    section.dataset.prabhupadaTranslationSource = 'vishvasa-github';
  }

  function setExactTransliteration(section, lines) {
    if (!section || !lines.length) return;
    let details = detailsByLabel(section, /^bhāgavatam transliteration$|^transliteration$/i);
    if (!details) {
      const content = document.createElement('div');
      content.className = 'sb-transliteration';
      details = makeDetails('Bhāgavatam Transliteration', 'sb-bhagavatam-transliteration-details', [content]);
      const word = detailsByLabel(section, /^bhāgavatam word[- ]?for[- ]?word$|^word[- ]?for[- ]?word$/i);
      (word || section.querySelector(':scope > .sb-translation') || section.querySelector(':scope > .sb-devanagari'))?.after(details);
    }
    let content = details.querySelector(':scope > .sb-transliteration, :scope > .sb-iast, :scope > div, :scope > p');
    if (!content) {
      content = document.createElement('div');
      content.className = 'sb-transliteration';
      details.appendChild(content);
    }
    content.classList.add('sb-transliteration');
    const em = document.createElement('em');
    lines.forEach((line, index) => {
      if (index) em.appendChild(document.createElement('br'));
      em.appendChild(document.createTextNode(line));
    });
    content.replaceChildren(em);
    details.open = false;
    section.dataset.prabhupadaTransliterationSource = 'vishvasa-github';
  }

  async function syncCanto2FromVishvasa() {
    if (!isCanto2) return;
    const base = 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIyo_abhaya-charaNaH/02/';
    for (let chapter = 1; chapter <= 10; chapter += 1) {
      let response;
      try {
        response = await fetch(`${base}${String(chapter).padStart(2, '0')}.md`, { mode: 'cors', cache: 'force-cache' });
      } catch (_) {
        continue;
      }
      if (!response.ok) continue;
      parseVishvasaChapter(await response.text()).forEach((entry) => {
        const sections = canto2Sections(chapter, entry.start, entry.end);
        if (!sections.length) return;
        if (entry.translation) sections.forEach((section) => setExactTranslation(section, entry.translation));
        if (entry.verseLines.length && (entry.start === entry.end || sections.length === 1)) {
          setExactTransliteration(sections[0], entry.verseLines);
        }
      });
    }
  }

  function scrollToHash() {
    if (!location.hash || location.hash === '#') return false;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { id = location.hash.slice(1); }
    const target = document.getElementById(id);
    if (!target) return false;
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    return true;
  }

  if (isCanto2) normalizeCanto2Scope(document);
  const continuationPromise = loadCanto2Continuation();

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#chapter-"], a[href^="#sb-"]');
    if (!link || !isCanto2) return;
    const href = link.getAttribute('href');
    if (!href) return;
    let id;
    try { id = decodeURIComponent(href.slice(1)); } catch (_) { id = href.slice(1); }
    if (document.getElementById(id)) return;
    event.preventDefault();
    history.pushState(null, '', href);
    continuationPromise.finally(scrollToHash);
  });

  window.addEventListener('hashchange', () => continuationPromise.finally(scrollToHash));

  continuationPromise.finally(async () => {
    if (isCanto2) {
      normalizeCanto2Scope(document);
      await syncCanto2FromVishvasa();
      normalizeCanto2Scope(document);
    }
    scrollToHash();
  });
})();