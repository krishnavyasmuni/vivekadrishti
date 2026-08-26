(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const key = 'Purāṇa:Viṣṇu Purāṇa';

  // Keep the visible metadata plain-English and traditional-first. Detailed
  // philology remains in the article itself, not in the infobox.
  if (D[key]) {
    Object.assign(D[key], {
      traditionalAuthor: 'Vyasa; narrated by Parashara to Maitreya',
      period: 'c. 300–500 CE',
      status: 'Extant Mahapurana',
      booksCount: '6 books · 126 chapters',
      verseCount: '23,000 verses traditionally; c. 6,000–7,000 extant'
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
        value.textContent = 'Vyasa; Parashara → Maitreya';
      } else if (t === 'date / textual formation') {
        label.textContent = 'Date';
        value.textContent = 'c. 300–500 CE';
      } else if (t === 'textual status') {
        label.textContent = 'Status';
        value.textContent = 'Extant Mahapurana';
      } else if (t === 'major divisions') {
        label.textContent = 'Structure';
        value.textContent = '6 books · 126 chapters';
      } else if (t === 'verse count') {
        value.textContent = '23,000 traditionally; c. 6,000–7,000 extant';
      } else if (t === 'extent' || t === 'recensions') {
        row.remove();
      }
    });
  }

  const plainMap = [
    [/Viṣṇu/g,'Vishnu'],[/viṣṇu/g,'vishnu'],
    [/Kṛṣṇa/g,'Krishna'],[/kṛṣṇa/g,'krishna'],
    [/Śrī/g,'Shri'],[/śrī/g,'shri'],
    [/Śiva/g,'Shiva'],[/śiva/g,'shiva'],
    [/Vaiṣṇava/g,'Vaishnava'],[/vaiṣṇava/g,'vaishnava'],
    [/Bhāgavata/g,'Bhagavata'],[/bhāgavata/g,'bhagavata'],
    [/Rāmānuja/g,'Ramanuja'],[/rāmānuja/g,'ramanuja'],
    [/Parāśara/g,'Parashara'],[/parāśara/g,'parashara'],
    [/Vyāsa/g,'Vyasa'],[/vyāsa/g,'vyasa'],
    [/Purāṇa/g,'Purana'],[/purāṇa/g,'purana'],
    [/Mahāpurāṇa/g,'Mahapurana'],[/mahāpurāṇa/g,'mahapurana'],
    [/Smṛti/g,'Smriti'],[/smṛti/g,'smriti'],
    [/Śrāddha/g,'Shraddha'],[/śrāddha/g,'shraddha'],
    [/Dharmaśāstra/g,'Dharmashastra'],[/dharmaśāstra/g,'dharmashastra'],
    [/śāstra/g,'shastra'],[/Śāstra/g,'Shastra'],
    [/aṃśas/g,'books'],[/aṃśa/g,'book'],[/Aṃśas/g,'Books'],[/Aṃśa/g,'Book'],
    [/adhyāyas/g,'chapters'],[/adhyāya/g,'chapter'],
    [/ślokas/g,'verses'],[/śloka/g,'verse']
  ];

  function plainEnglish(text) {
    let out = String(text || '');
    plainMap.forEach(([re, value]) => { out = out.replace(re, value); });
    const chars = {
      'ā':'a','ī':'i','ū':'u','ṛ':'ri','ṝ':'ri','ḷ':'l','ḹ':'l','ṅ':'n','ñ':'n','ṇ':'n','ṭ':'t','ḍ':'d','ś':'sh','ṣ':'sh','ḥ':'h','ṃ':'m','ṁ':'m',
      'Ā':'A','Ī':'I','Ū':'U','Ṛ':'Ri','Ṝ':'Ri','Ḷ':'L','Ṅ':'N','Ñ':'N','Ṇ':'N','Ṭ':'T','Ḍ':'D','Ś':'Sh','Ṣ':'Sh','Ḥ':'H','Ṃ':'M'
    };
    out = out.replace(/[āīūṛṝḷḹṅñṇṭḍśṣḥṃṁĀĪŪṚṜḶṄÑṆṬḌŚṢḤṂ]/g, c => chars[c] || c);
    return out.normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');
  }

  function deaccentVisibleRomanText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('[lang^="sa"], .universal-devanagari, .vishnu-devanagari, script, style')) return NodeFilter.FILTER_REJECT;
        return /[ĀĪŪṚṜḶṄÑṆṬḌŚṢḤṂāīūṛṝḷḹṅñṇṭḍśṣḥṃṁ]|aṃś|ślok|adhyāy|Viṣṇu|Kṛṣṇa|Purāṇa/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = plainEnglish(node.nodeValue); });
  }

  function addDevanagariTitle(root) {
    if (root.querySelector(':scope > .vishnu-devanagari')) return;
    const dev = document.createElement('div');
    dev.className = 'vishnu-devanagari';
    dev.lang = 'sa-Deva';
    dev.textContent = 'विष्णुपुराणम्';
    root.prepend(dev);
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

  function collapseArticleSections(root) {
    const sections = [...root.querySelectorAll(':scope > section')].filter(sec => sec.querySelector(':scope > h2'));
    sections.forEach(makeCollapsible);

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
    const readerTitle = reader?.querySelector('.kena-article-head h1');
    if (readerTitle) readerTitle.textContent = 'Vishnu Purana';
    simplifyInfobox(root);
    deaccentVisibleRomanText(root);
    addDevanagariTitle(root);
    collapseArticleSections(root);
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
