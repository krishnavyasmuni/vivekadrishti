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

  const path = location.pathname;
  const isCanto2 = /srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(path);
  const rebuildRoot = document.querySelector('.empyrean-bhagavatam-rebuild, .empyrean-bhagavatam-rebuild-part');
  if (!rebuildRoot) return;

  document.body.classList.add('bhagavatam-rebuild-page');
  if (isCanto2) document.body.classList.add('canto-2-verse-layout');

  if (isCanto2 && !document.querySelector('link[data-canto2-layout]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/vivekadrishti/assets/css/bhagavatam-canto2-verse-layout-v7.css?v=7';
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
  const directDetails = (section) => children(section).filter((node) => node.tagName === 'DETAILS');
  const detailByLabel = (section, pattern) => directDetails(section).find((details) => pattern.test(summaryText(details)));

  function wrapLegacyVerse(heading) {
    const parent = heading.parentElement;
    if (!parent) return null;
    const previous = heading.previousElementSibling;
    const start = previous?.matches('hr.sb-rule') ? previous : heading;
    const section = document.createElement('section');
    section.className = 'sb-verse-section';
    section.setAttribute('aria-labelledby', heading.id);
    parent.insertBefore(section, start);

    let node = start;
    while (node) {
      const next = node.nextElementSibling;
      if (node !== start && node.matches('h2[id^="chapter-"]')) break;
      if (node !== start && node.matches('hr.sb-rule') && next?.matches('h3[id^="sb-"]')) break;
      section.appendChild(node);
      node = next;
    }
    return section;
  }

  function makeDetails(label, className, contentNode) {
    const details = document.createElement('details');
    details.className = `sb-details ${className}`;
    const summary = document.createElement('summary');
    summary.textContent = label;
    details.appendChild(summary);
    if (contentNode) details.appendChild(contentNode);
    details.open = false;
    return details;
  }

  function findCommentary(section, translationNode) {
    let commentary = children(section).find((node) =>
      node.tagName === 'P' && /śrīdhara['’]s commentary/i.test(node.textContent || '')
    );
    if (!commentary) {
      commentary = children(section).slice().reverse().find((node) =>
        node.tagName === 'P' && node !== translationNode && !node.closest('details')
      );
    }
    if (commentary && commentary !== translationNode) commentary.classList.add('sb-commentary');
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
    let rule = direct.find((node) => node.tagName === 'HR');
    if (!rule) rule = document.createElement('hr');
    rule.classList.add('sb-rule');

    direct = children(section);
    const devanagari = direct.find((node) =>
      node.matches('.sb-devanagari,.sb-dev,[lang="sa-Deva"]') ||
      (node.matches('[lang="sa"]') && !node.closest('details'))
    );
    if (devanagari) devanagari.classList.add('sb-devanagari');

    let transliteration = direct.find((node) =>
      node.matches('.sb-transliteration,.sb-iast,[lang="sa-Latn"]') && !node.closest('details')
    );
    const oldTransliterationDetails = detailByLabel(section, /^transliteration$/i);
    if (!transliteration && oldTransliterationDetails) {
      const source = oldTransliterationDetails.querySelector(':scope > div, :scope > p');
      if (source) {
        transliteration = document.createElement('div');
        transliteration.className = 'sb-transliteration';
        transliteration.innerHTML = source.innerHTML;
      }
    }
    if (transliteration) transliteration.classList.add('sb-transliteration');
    if (oldTransliterationDetails) oldTransliterationDetails.remove();

    let translation = direct.find((node) => node.matches('.sb-translation'));
    let translationDetails = detailByLabel(section, /^translation$/i);
    if (!translation && translationDetails) {
      translation = translationDetails.querySelector(':scope > div, :scope > p');
    }
    if (translation) translation.classList.add('sb-translation-content');
    if (!translationDetails && translation) {
      translationDetails = makeDetails('Translation', 'sb-translation-details', translation);
    } else if (translationDetails) {
      translationDetails.classList.add('sb-details', 'sb-translation-details');
      const summary = translationDetails.querySelector(':scope > summary');
      if (summary) summary.textContent = 'Translation';
      translationDetails.open = false;
    }

    let wordDetails = detailByLabel(section, /word[- ]?for[- ]?word/i);
    if (wordDetails) {
      wordDetails.classList.add('sb-details', 'sb-word-details');
      const summary = wordDetails.querySelector(':scope > summary');
      if (summary) summary.textContent = 'Word-for-word';
      wordDetails.open = false;
    }

    let sridharaDetails = detailByLabel(section, /śrīdhara sanskrit|sridhara sanskrit/i);
    if (sridharaDetails) {
      sridharaDetails.classList.add('sb-details', 'sb-bhasya');
      const summary = sridharaDetails.querySelector(':scope > summary');
      if (summary) summary.textContent = 'Śrīdhara Sanskrit';
      sridharaDetails.open = false;
    }

    directDetails(section).forEach((details) => {
      details.classList.add('sb-details');
      details.open = false;
    });

    const commentary = findCommentary(section, translation);

    heading.after(rule);
    let anchor = rule;
    [devanagari, transliteration, wordDetails, translationDetails, sridharaDetails, commentary].forEach((node) => {
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
    let details = detailByLabel(section, /^translation$/i);
    if (!details) {
      const p = document.createElement('p');
      p.className = 'sb-translation-content';
      details = makeDetails('Translation', 'sb-translation-details', p);
      const word = detailByLabel(section, /word[- ]?for[- ]?word/i);
      (word || section.querySelector(':scope > .sb-transliteration') || section.querySelector(':scope > .sb-devanagari'))?.after(details);
    }
    let content = details.querySelector(':scope > .sb-translation-content, :scope > .sb-translation, :scope > div, :scope > p');
    if (!content) {
      content = document.createElement('p');
      details.appendChild(content);
    }
    content.classList.add('sb-translation-content');
    if ((content.textContent || '').replace(/\s+/g, ' ').trim() !== text) content.textContent = text;
    details.open = false;
    section.dataset.prabhupadaTranslationSource = 'vishvasa-github';
  }

  function setExactTransliteration(section, lines) {
    if (!section || !lines.length) return;
    let transliteration = section.querySelector(':scope > .sb-transliteration, :scope > .sb-iast');
    if (!transliteration) {
      transliteration = document.createElement('div');
      transliteration.className = 'sb-transliteration';
      section.querySelector(':scope > .sb-devanagari')?.after(transliteration);
    }
    const em = document.createElement('em');
    lines.forEach((line, index) => {
      if (index) em.appendChild(document.createElement('br'));
      em.appendChild(document.createTextNode(line));
    });
    transliteration.replaceChildren(em);
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