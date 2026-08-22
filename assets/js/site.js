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

  loadBhagavatamContinuation();
})();