(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const key = 'Purāṇa:Viṣṇu Purāṇa';

  // Keep the infobox concise: traditional identification first, then a simple
  // working historical range. The long discussion belongs in the article body.
  if (D[key]) {
    Object.assign(D[key], {
      traditionalAuthor: 'Vyāsa; narrated by Parāśara to Maitreya',
      period: 'c. 300–500 CE (received form)',
      status: 'Extant Mahāpurāṇa',
      booksCount: '6 aṃśas · 126 chapters',
      verseCount: 'Traditionally 23,000 ślokas; extant text c. 6,000–7,000'
    });
  }

  const previousOpen = window.openScriptureEncyclopedia;
  if (typeof previousOpen !== 'function') return;

  const norm = s => String(s || '').trim().toLowerCase();

  function currentName(button) {
    return button?.dataset?.name || button?.querySelector?.('span')?.textContent?.trim() || '';
  }

  function article() {
    return document.querySelector('.purana-full-article, .universal-wiki-article');
  }

  function simplifyInfobox(root) {
    const rows = [...root.querySelectorAll('.kena-info-row')];
    rows.forEach(row => {
      const label = row.querySelector('b');
      const value = row.querySelector('span');
      if (!label || !value) return;
      const t = norm(label.textContent);
      if (t === 'traditional attribution') {
        label.textContent = 'Traditional attribution';
        value.textContent = 'Vyāsa; Parāśara → Maitreya';
      } else if (t === 'date / textual formation') {
        label.textContent = 'Date';
        value.textContent = 'c. 300–500 CE';
      } else if (t === 'textual status') {
        label.textContent = 'Status';
        value.textContent = 'Extant Mahāpurāṇa';
      } else if (t === 'major divisions') {
        label.textContent = 'Structure';
        value.textContent = '6 aṃśas · 126 chapters';
      } else if (t === 'verse count') {
        value.textContent = '23,000 traditionally; c. 6,000–7,000 extant';
      } else if (t === 'extent') {
        row.remove();
      } else if (t === 'recensions') {
        row.remove();
      }
    });
  }

  function setOpen(section, open) {
    const body = section.querySelector(':scope > .vishnu-collapse-body');
    const heading = section.querySelector(':scope > h2');
    if (!body || !heading) return;
    section.classList.toggle('is-open', open);
    body.hidden = !open;
    heading.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function makeCollapsible(section) {
    if (section.classList.contains('vishnu-collapse-section')) return;
    const h2 = section.querySelector(':scope > h2');
    if (!h2) return;

    const body = document.createElement('div');
    body.className = 'vishnu-collapse-body';
    [...section.childNodes].forEach(node => {
      if (node !== h2) body.append(node);
    });
    section.append(body);
    section.classList.add('vishnu-collapse-section');
    h2.setAttribute('role', 'button');
    h2.setAttribute('tabindex', '0');
    h2.setAttribute('aria-expanded', 'false');

    const toggle = () => setOpen(section, !section.classList.contains('is-open'));
    h2.addEventListener('click', toggle);
    h2.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
    setOpen(section, false);
  }

  function collapseBelowContents(root) {
    const sections = [...root.querySelectorAll(':scope > section')].filter(sec => sec.querySelector(':scope > h2'));
    const contentsIndex = sections.findIndex(sec => norm(sec.querySelector(':scope > h2')?.textContent) === 'contents');
    if (contentsIndex < 0) return;
    sections.slice(contentsIndex + 1).forEach(makeCollapsible);

    root.querySelectorAll('.kena-toc a[href^="#"]').forEach(link => {
      if (link.dataset.vishnuCollapseBound === '1') return;
      link.dataset.vishnuCollapseBound = '1';
      link.addEventListener('click', () => {
        const id = decodeURIComponent((link.getAttribute('href') || '').slice(1));
        const target = document.getElementById(id);
        if (target?.classList.contains('vishnu-collapse-section')) setOpen(target, true);
      });
    });
  }

  function apply(button) {
    if (currentName(button) !== 'Viṣṇu Purāṇa') return;
    const root = article();
    if (!root) return;
    const reader = root.closest('.purana-full-reader, .universal-wiki-reader, .kena-article-reader');
    reader?.classList.add('vishnu-purana-reader');
    root.classList.add('vishnu-purana-scholarly');
    simplifyInfobox(root);
    collapseBelowContents(root);
  }

  window.openScriptureEncyclopedia = function(button) {
    const result = previousOpen(button);
    if (currentName(button) === 'Viṣṇu Purāṇa') {
      queueMicrotask(() => apply(button));
      setTimeout(() => apply(button), 220);
      setTimeout(() => apply(button), 950);
    }
    return result;
  };
})();
