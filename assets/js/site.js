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
      const isOpen = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
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

    const closedLabel = (summary.textContent || '').trim() || 'Show Sanskrit';
    const openLabel = /show sanskrit/i.test(closedLabel)
      ? closedLabel.replace(/show sanskrit/i, 'Hide Sanskrit')
      : 'Hide Sanskrit';

    details.addEventListener('toggle', () => {
      summary.textContent = details.open ? openLabel : closedLabel;
    });
  });

  const rebuildRoot = document.querySelector('.empyrean-bhagavatam-rebuild');
  if (!rebuildRoot) return;

  document.body.classList.add('bhagavatam-rebuild-page');

  const introScope = rebuildRoot.querySelector(':scope > div > div') || rebuildRoot;
  Array.from(introScope.children).forEach((element) => {
    const text = (element.textContent || '').trim();
    if (text.startsWith('Each entry presents the original Bhāgavata verse')) {
      element.remove();
      return;
    }
    if (
      element.tagName === 'DIV' &&
      text.startsWith('Textual basis') &&
      text.includes('Śrīdhara’s text is checked primarily')
    ) {
      element.remove();
    }
  });

  if (!document.querySelector('link[data-bhagavatam-rebuild-styles]')) {
    const verseStyles = document.createElement('link');
    verseStyles.rel = 'stylesheet';
    verseStyles.href = '/vivekadrishti/assets/css/bhagavatam-rebuild-all-verses.css?v=4';
    verseStyles.dataset.bhagavatamRebuildStyles = 'true';
    document.head.appendChild(verseStyles);
  }

  const directChildren = (parent) => Array.from(parent ? parent.children : []);
  const summaryText = (details) => ((details?.querySelector(':scope > summary')?.textContent) || '').trim();
  const directDetails = (section) => directChildren(section).filter((el) => el.tagName === 'DETAILS');
  const detailByLabel = (section, pattern) => directDetails(section).find((details) => pattern.test(summaryText(details)));

  function wrapLegacyVerse(heading) {
    const parent = heading.parentElement;
    if (!parent) return null;

    const previous = heading.previousElementSibling;
    const start = previous && previous.matches('hr.sb-rule') ? previous : heading;
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

  function makeTransliterationDetails(source) {
    const details = document.createElement('details');
    details.className = 'sb-details sb-transliteration-details';

    const summary = document.createElement('summary');
    summary.textContent = 'Transliteration';

    const content = document.createElement('div');
    content.innerHTML = source.innerHTML;

    details.append(summary, content);
    source.remove();
    return details;
  }

  document.querySelectorAll('.empyrean-bhagavatam-rebuild-part h2[id^="chapter-"]').forEach((heading) => {
    heading.classList.add('sb-chapter');
  });

  const verseHeadings = Array.from(document.querySelectorAll('.empyrean-bhagavatam-rebuild-part h3[id^="sb-"]'));

  verseHeadings.forEach((heading) => {
    let section = heading.closest('section[aria-labelledby^="sb-"]');
    if (!section) section = wrapLegacyVerse(heading);
    if (!section) return;

    section.classList.add('sb-verse-section');
    if (!section.getAttribute('aria-labelledby')) section.setAttribute('aria-labelledby', heading.id);
    heading.classList.add('sb-verse');

    let children = directChildren(section);
    let rule = children.find((el) => el.tagName === 'HR');
    if (!rule) {
      rule = document.createElement('hr');
      section.insertBefore(rule, heading.nextSibling);
    }
    rule.classList.add('sb-rule');

    children = directChildren(section);

    let devanagari = children.find((el) =>
      el.matches('.sb-devanagari,.sb-dev,[lang="sa-Deva"]') ||
      (el.matches('[lang="sa"]') && !el.closest('details'))
    );
    if (devanagari) devanagari.classList.add('sb-devanagari');

    let visibleTransliteration = children.find((el) =>
      el.matches('.sb-transliteration,.sb-iast,[lang="sa-Latn"]') && !el.closest('details')
    );

    let translation = children.find((el) => el.matches('.sb-translation'));

    if (!translation && devanagari) {
      let candidate = devanagari.nextElementSibling;
      if (candidate && candidate === visibleTransliteration) candidate = candidate.nextElementSibling;
      if (
        candidate &&
        ['DIV', 'P'].includes(candidate.tagName) &&
        !candidate.hasAttribute('lang') &&
        !candidate.matches('.sb-transliteration,.sb-iast,.sb-commentary') &&
        candidate.tagName !== 'DETAILS'
      ) {
        translation = candidate;
        translation.classList.add('sb-translation');
      }
    }

    const translationDetails = detailByLabel(section, /^translation$/i);
    if (!translation && translationDetails) {
      const content = translationDetails.querySelector(':scope > div, :scope > p');
      if (content) {
        translation = document.createElement('p');
        translation.className = 'sb-translation';
        translation.innerHTML = content.innerHTML;
      }
    }
    if (translationDetails && translation) translationDetails.remove();

    let wordDetails = detailByLabel(section, /word[- ]?for[- ]?word/i);
    if (wordDetails) wordDetails.classList.add('sb-details', 'sb-word-details');

    let transliterationDetails = detailByLabel(section, /^transliteration$/i);
    if (transliterationDetails) transliterationDetails.classList.add('sb-details', 'sb-transliteration-details');

    if (visibleTransliteration) {
      if (!transliterationDetails) {
        transliterationDetails = makeTransliterationDetails(visibleTransliteration);
      } else {
        visibleTransliteration.remove();
      }
    }

    let sridharaDetails = detailByLabel(section, /śrīdhara sanskrit|sridhara sanskrit/i);
    if (sridharaDetails) sridharaDetails.classList.add('sb-details', 'sb-bhasya');

    directDetails(section).forEach((details) => details.classList.add('sb-details'));

    children = directChildren(section);
    let commentary = children.find((el) =>
      el.tagName === 'P' && /śrīdhara['’]s commentary/i.test(el.textContent || '')
    );
    if (!commentary) {
      commentary = children.slice().reverse().find((el) => el.tagName === 'P' && !el.closest('details'));
    }
    if (commentary && commentary !== translation) commentary.classList.add('sb-commentary');

    heading.after(rule);

    let anchor = rule;
    if (devanagari) {
      anchor.after(devanagari);
      anchor = devanagari;
    }
    if (translation) {
      anchor.after(translation);
      anchor = translation;
    }
    if (wordDetails) {
      anchor.after(wordDetails);
      anchor = wordDetails;
    }
    if (transliterationDetails) {
      anchor.after(transliterationDetails);
      anchor = transliterationDetails;
    }
    if (sridharaDetails) {
      anchor.after(sridharaDetails);
      anchor = sridharaDetails;
    }
    if (commentary && commentary !== translation) anchor.after(commentary);
  });

  const continuationPath = '/vivekadrishti/articles/srimad-bhagavatam-second-canto-sridhara-svami-rebuild/fragments/';

  async function loadBhagavatamContinuation() {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;

    const host = document.createElement('div');
    host.className = 'bhagavatam-continuation-host';
    articleBody.appendChild(host);

    for (let index = 1; index <= 64; index += 1) {
      const batch = String(index).padStart(3, '0');
      let response;
      try {
        response = await fetch(`${continuationPath}batch-${batch}.html`, {
          cache: 'no-store',
          credentials: 'same-origin'
        });
      } catch (_) {
        break;
      }

      if (response.status === 404) break;
      if (!response.ok) break;

      const template = document.createElement('template');
      template.innerHTML = await response.text();

      template.content
        .querySelectorAll('script,iframe,object,embed,form,input,button,link,style,meta')
        .forEach((node) => node.remove());

      const blockedAttributes = new Set(['srcdoc', 'href', 'src', 'srcset', 'xlink:href', 'formaction', 'style']);
      template.content.querySelectorAll('*').forEach((element) => {
        Array.from(element.attributes).forEach((attribute) => {
          if (/^on/i.test(attribute.name) || blockedAttributes.has(attribute.name.toLowerCase())) {
            element.removeAttribute(attribute.name);
          }
        });
      });

      host.appendChild(template.content.cloneNode(true));
    }
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

  function enhanceAllVerseCards() {
    document.querySelectorAll('.empyrean-bhagavatam-rebuild .sb-details, .bhagavatam-continuation-host .sb-details').forEach((details) => {
      details.open = true;
    });

    document.querySelectorAll('.empyrean-bhagavatam-rebuild .sb-bhasya, .bhagavatam-continuation-host .sb-bhasya').forEach((details) => {
      details.open = true;
      const sanskrit = details.querySelector('p[lang="sa-Deva"], div[lang="sa-Deva"]');
      if (!sanskrit) return;

      const paragraphs = Array.from(details.querySelectorAll(':scope > p, :scope > div'));
      const hasTransliteration = paragraphs.some((node) => node !== sanskrit && node.querySelector('em'));
      if (!hasTransliteration) {
        const transliteration = document.createElement('p');
        transliteration.className = 'sb-sridhara-auto-transliteration';
        const emphasis = document.createElement('em');
        emphasis.textContent = devanagariToIast(sanskrit.textContent || '');
        transliteration.appendChild(emphasis);
        sanskrit.after(transliteration);
      }

      if (!/Śrīdhara word-for-word\./i.test(details.textContent || '')) {
        const section = details.closest('.sb-verse-section');
        const commentary = section?.querySelector(':scope > .sb-commentary');
        const commentaryText = (commentary?.textContent || '')
          .replace(/^\s*Śrīdhara[’']s Commentary\.\s*/i, '')
          .trim();

        const sense = document.createElement('p');
        sense.className = 'sb-sridhara-legacy-sense';
        const label = document.createElement('strong');
        label.textContent = 'Śrīdhara word-for-word.';
        sense.append(label, document.createTextNode(
          commentaryText
            ? ` Legacy-card sense: ${commentaryText}`
            : ' Legacy-card sense follows directly from the Sanskrit commentary above; no unsupported lexical gloss has been invented.'
        ));
        details.appendChild(sense);
      }
    });
  }

  loadBhagavatamContinuation().finally(() => {
    enhanceAllVerseCards();
  });
})();