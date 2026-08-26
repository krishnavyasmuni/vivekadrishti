(() => {
  if (!document.querySelector('link[data-hindupedia-site]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = '/vivekadrishti/assets/css/hindupedia-site.css?build=20260826-2145';
    theme.dataset.hindupediaSite = 'true';
    document.head.appendChild(theme);
  }

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

  const isScriptureIndex = /\/articles\/an-index-of-hindu-scripture\/?$/.test(location.pathname);
  if (isScriptureIndex && !document.querySelector('link[data-scripture-index-clean]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/vivekadrishti/assets/css/scripture-index-clean.css?v=1';
    css.dataset.scriptureIndexClean = 'true';
    document.head.appendChild(css);
  }

  const isCanto2 = /srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(location.pathname);
  const rebuildRoot = document.querySelector('.empyrean-bhagavatam-rebuild, .empyrean-bhagavatam-rebuild-part');
  if (!rebuildRoot) return;

  document.body.classList.add('bhagavatam-rebuild-page');

  if (isCanto2) {
    document.body.classList.add('canto-2-verse-layout');

    // Some of the hand-built Chapter 2 sections predate the shared renderer and
    // stored the English translation as an unclassed div immediately after the
    // Devanagari. Mark it before the renderer runs so it is moved and styled in
    // exactly the same position as every other verse instead of falling below
    // Śrīdhara's commentary as a giant duplicate block.
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