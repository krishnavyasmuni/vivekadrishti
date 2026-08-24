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

  if (isCanto2) {
    document.body.classList.add('canto-2-verse-layout');
    if (!document.querySelector('link[data-canto2-layout]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = '/vivekadrishti/assets/css/bhagavatam-canto2-verse-layout-v7.css?v=11';
      css.dataset.canto2Layout = 'true';
      document.head.appendChild(css);
    }
    if (!document.querySelector('script[data-canto2-renderer]')) {
      const script = document.createElement('script');
      script.src = '/vivekadrishti/assets/js/bhagavatam-canto2.js?v=2';
      script.async = false;
      script.dataset.canto2Renderer = 'true';
      document.head.appendChild(script);
    }
    if (!document.querySelector('script[data-canto2-literal-sridhara]')) {
      const script = document.createElement('script');
      script.src = '/vivekadrishti/assets/js/canto2-literal-sridhara.js?v=1';
      script.async = false;
      script.dataset.canto2LiteralSridhara = 'true';
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