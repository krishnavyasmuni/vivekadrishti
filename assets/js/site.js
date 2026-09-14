(() => {
  const path = location.pathname;

  // Keep the encyclopedia treatment on directory pages only. Actual articles
  // now share the Varṇa-vicāra reader shell, typography and contents rail.
  const articleDirectoryPaths = [
    /^\/vivekadrishti\/articles\/?$/,
    /^\/vivekadrishti\/articles\/scripture\/?$/,
    /^\/vivekadrishti\/articles\/scripture-index-version-3\/?$/,
    /^\/vivekadrishti\/articles\/an-index-of-hindu-scripture\/?$/
  ];
  const isArticleDirectory = articleDirectoryPaths.some((pattern) => pattern.test(path));
  const isActualArticle = document.body.classList.contains('post-page') ||
    (/^\/vivekadrishti\/articles\//.test(path) && !isArticleDirectory);
  const useVicaraReader = /^\/vivekadrishti\/articles\//.test(path) && !isArticleDirectory;
  const isCitationReader = /\/articles\/compilation-of-peer-reviewed-citations-against-aryan-migration-theory\/?$/.test(path);
  const isMeatReader = /\/articles\/meat-eating-in-hinduism-through-the-lens-of-shastra\/?$/.test(path);
  const isScriptureReader = /\/articles\/(?:bhagavad-gita-chapter-\d+|srimad-bhagavatam-(?:second|tenth)-canto-sridhara-svami-rebuild|mimamsa-sutras-sabara-bhasya-chapter-1)\/?$/.test(path);

  if (isActualArticle) {
    document.querySelectorAll('link[href*="/assets/css/hindupedia-site.css"]').forEach((link) => link.remove());
  } else if (!document.querySelector('link[data-hindupedia-site]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = '/vivekadrishti/assets/css/hindupedia-site.css?build=20260826-2145';
    theme.dataset.hindupediaSite = 'true';
    document.head.appendChild(theme);
  }

  if (useVicaraReader) {
    document.body.classList.add('vicara-reader-page');
    if (isCitationReader) document.body.classList.add('citation-reader-page');
    if (isMeatReader) document.body.classList.add('meat-reader-page');
    if (isScriptureReader) document.body.classList.add('scripture-reader-page');

    if (!document.querySelector('link[data-article-reader]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = '/vivekadrishti/assets/css/article-reader.css?v=20260913-1';
      css.dataset.articleReader = 'true';
      document.head.appendChild(css);
    }
    if (!document.querySelector('link[data-article-polish]')) {
      const polish = document.createElement('link');
      polish.rel = 'stylesheet';
      polish.href = '/vivekadrishti/assets/css/article-polish.css?v=20260913-2';
      polish.dataset.articlePolish = 'true';
      document.head.appendChild(polish);
    }
    if (isMeatReader && !document.querySelector('link[data-meat-reader-fix]')) {
      const meat = document.createElement('link');
      meat.rel = 'stylesheet';
      meat.href = '/vivekadrishti/assets/css/meat-reader-fix.css?v=20260914-1';
      meat.dataset.meatReaderFix = 'true';
      document.head.appendChild(meat);
    }
    if (!document.querySelector('script[data-article-reader]')) {
      const reader = document.createElement('script');
      reader.src = '/vivekadrishti/assets/js/article-reader.js?v=20260913-1';
      reader.async = false;
      reader.dataset.articleReader = 'true';
      document.body.appendChild(reader);
    }
  }

  const sectionPaths = new Map([
    ['/vivekadrishti/introduction-to-hinduism/', '/vivekadrishti/pages/introduction-to-hinduism/'],
    ['/vivekadrishti/indology/', '/vivekadrishti/pages/indology/'],
    ['/vivekadrishti/purana-library/', '/vivekadrishti/pages/purana-library/'],
    ['/vivekadrishti/bhagavatam-with-sridhara-bhasya/', '/vivekadrishti/pages/bhagavatam-with-sridhara-bhasya/'],
    ['/vivekadrishti/bhavishya-purana-brahmaparvan/', '/vivekadrishti/pages/bhavishya-purana-brahmaparvan/'],
    ['/vivekadrishti/bhagavad-gita/', '/vivekadrishti/pages/bhagavad-gita/']
  ]);

  document.querySelectorAll('a[href]').forEach((link) => {
    const replacement = sectionPaths.get(link.getAttribute('href'));
    if (replacement) link.setAttribute('href', replacement);
  });

  document.querySelectorAll('.site-nav').forEach((nav) => {
    if (nav.querySelector('a[href="/vivekadrishti/bhagavad-gita/"], a[href="/vivekadrishti/pages/bhagavad-gita/"]')) return;
    const link = document.createElement('a');
    link.href = '/vivekadrishti/pages/bhagavad-gita/';
    link.textContent = 'Bhagavad Gītā — Śrīdhara Bhāṣya';
    link.dataset.bhagavadGitaNav = 'true';
    nav.appendChild(link);
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

  const isScriptureIndex = /\/articles\/an-index-of-hindu-scripture\/?$/.test(location.pathname);
  if (isScriptureIndex && !document.querySelector('link[data-scripture-index-clean]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/vivekadrishti/assets/css/scripture-index-clean.css?v=1';
    css.dataset.scriptureIndexClean = 'true';
    document.head.appendChild(css);
  }

  // Bhagavad Gītā Chapter 1 has a hand-reviewed helper. Chapters 2–18 use the
  // generated Śrīdhara data helper. Loading it here means every existing chapter
  // page receives the same dual word-for-word/transliteration treatment without
  // duplicating script tags across seventeen HTML files.
  const gitaRoot = document.querySelector('[data-gita-chapter]');
  if (gitaRoot) {
    const gitaChapter = Number(gitaRoot.dataset.gitaChapter);
    if (gitaChapter >= 2 && gitaChapter <= 18 && !document.querySelector('script[data-gita-sridhara-all]')) {
      const helper = document.createElement('script');
      helper.src = '/vivekadrishti/assets/js/bhagavad-gita-sridhara-all.js?v=20260831-all3';
      helper.async = false;
      helper.dataset.gitaSridharaAll = 'true';
      document.head.appendChild(helper);
    }
  }

  const isCanto2 = /srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(location.pathname);
  const rebuildRoot = document.querySelector('.empyrean-bhagavatam-rebuild, .empyrean-bhagavatam-rebuild-part');
  if (!rebuildRoot) return;

  document.body.classList.add('bhagavatam-rebuild-page');

  if (isCanto2) {
    document.body.classList.add('canto-2-verse-layout');

    document.querySelectorAll('section[aria-labelledby^="sb-2-"]').forEach((section) => {
      if (section.querySelector(':scope > .sb-translation, :scope > .sb-translation-content')) return;
      const devanagari = section.querySelector(':scope > [lang="sa-Deva"], :scope > .sb-devanagari, :scope > .sb-dev');
      const candidate = devanagari?.nextElementSibling;
      if (!candidate || candidate.matches('details, hr, h1, h2, h3')) return;
      if (/Śrīdhara['’]s Commentary/i.test(candidate.textContent || '')) return;
      candidate.classList.add('sb-translation');
    });

    if (!document.querySelector('link[data-canto2-layout]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = '/vivekadrishti/assets/css/bhagavatam-canto2-verse-layout-v7.css?v=11';
      css.dataset.canto2Layout = 'true';
      document.head.appendChild(css);
    }
    if (!document.querySelector('script[data-canto2-renderer]')) {
      const script = document.createElement('script');
      script.src = '/vivekadrishti/assets/js/bhagavatam-canto2.js?v=3';
      script.async = false;
      script.dataset.canto2Renderer = 'true';
      document.head.appendChild(script);
    }
    return;
  }

  if (!document.querySelector('link[data-bhagavatam-rebuild-styles]') && !document.body.classList.contains('canto-2-verse-layout')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/vivekadrishti/assets/css/bhagavatam-rebuild-all-verses.css?v=6';
    css.dataset.bhagavatamRebuildStyles = 'true';
    document.head.appendChild(css);
  }
})();