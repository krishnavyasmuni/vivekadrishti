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

  if (document.querySelector('.empyrean-bhagavatam-rebuild')) {
    document.body.classList.add('bhagavatam-rebuild-page');
    const verseStyles = document.createElement('link');
    verseStyles.rel = 'stylesheet';
    verseStyles.href = '/vivekadrishti/assets/css/bhagavatam-rebuild-all-verses.css';
    document.head.appendChild(verseStyles);
  }
})();
