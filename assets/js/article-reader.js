(() => {
  const path = location.pathname;
  const directoryPages = [
    /^\/vivekadrishti\/articles\/?$/,
    /^\/vivekadrishti\/articles\/scripture\/?$/,
    /^\/vivekadrishti\/articles\/scripture-index-version-3\/?$/,
    /^\/vivekadrishti\/articles\/an-index-of-hindu-scripture\/?$/
  ];
  if (!/^\/vivekadrishti\/articles\//.test(path) || directoryPages.some((re) => re.test(path))) return;

  const body = document.body;
  const articleBody = document.querySelector('.article-body');
  if (!articleBody) return;
  body.classList.add('vicara-reader-page');

  const cleanText = (node) => (node?.textContent || '').replace(/\s+/g, ' ').trim();
  const isContentsHeading = (node) => /^contents$/i.test(cleanText(node));
  const slug = (value) => value
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';

  const uniqueId = (base, used) => {
    let id = base || 'section';
    let n = 2;
    while (document.getElementById(id) || used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return id;
  };

  const normalizeTocClone = (list) => {
    const clone = list.cloneNode(true);
    clone.classList.add('vicara-toc');
    clone.removeAttribute('style');
    clone.querySelectorAll('*').forEach((node) => {
      node.removeAttribute('style');
      node.removeAttribute('class');
    });
    clone.classList.add('vicara-toc');
    return clone;
  };

  const findManualContents = () => {
    const gita = articleBody.querySelector('.gita-contents ol, .gita-contents ul');
    if (gita) return {list:gita, heading:articleBody.querySelector('.gita-contents h2, .gita-contents h3'), container:articleBody.querySelector('.gita-contents')};

    const headings = [...articleBody.querySelectorAll('h2,h3')].filter(isContentsHeading);
    for (const heading of headings) {
      let node = heading.nextElementSibling;
      const between = [];
      while (node && !/^H[23]$/.test(node.tagName)) {
        between.push(node);
        if (node.matches('ol,ul')) return {list:node, heading, between};
        node = node.nextElementSibling;
      }
    }
    return null;
  };

  const hideManualContents = (manual) => {
    if (!manual) return;
    if (manual.container) {
      manual.container.classList.add('vicara-original-contents');
      return;
    }
    manual.heading?.classList.add('vicara-original-contents');
    (manual.between || []).forEach((node) => node.classList.add('vicara-original-contents'));
  };

  const wrapRemarks = () => {
    const labels = [...articleBody.querySelectorAll('h4.remark-label, h4')].filter((label) => {
      if (label.closest('details.remark-section')) return false;
      return /^remark\s+\d+[.:]?$/i.test(cleanText(label));
    });
    labels.forEach((label) => {
      const details = document.createElement('details');
      details.className = 'remark-section';
      if (label.id) details.id = label.id;
      const summary = document.createElement('summary');
      summary.className = 'remark-label';
      const name = cleanText(label).replace(/[.:]$/, '');
      summary.dataset.remarkName = name;
      summary.textContent = `Show ${name}`;

      const nodes = [];
      let node = label.nextSibling;
      while (node) {
        if (node.nodeType === 1 && /^(H2|H3|H4)$/.test(node.tagName)) break;
        nodes.push(node);
        node = node.nextSibling;
      }
      label.replaceWith(details);
      details.appendChild(summary);
      nodes.forEach((item) => details.appendChild(item));
      details.open = false;
    });

    articleBody.querySelectorAll('details.remark-section').forEach((details) => {
      details.open = false;
      const summary = details.querySelector(':scope > summary.remark-label');
      if (!summary || summary.dataset.vicaraBound === 'true') return;
      const base = summary.dataset.remarkName || cleanText(summary).replace(/^(Show|Hide)\s+/i, '').replace(/[.:]$/, '');
      summary.dataset.remarkName = base;
      const sync = () => { summary.textContent = `${details.open ? 'Hide' : 'Show'} ${base}`; };
      summary.dataset.vicaraBound = 'true';
      details.addEventListener('toggle', sync);
      sync();
    });
  };

  const addIds = () => {
    const used = new Set();
    articleBody.querySelectorAll('[id]').forEach((el) => used.add(el.id));
    let i = 0;
    articleBody.querySelectorAll('h2,h3').forEach((heading) => {
      if (isContentsHeading(heading) || heading.closest('.vicara-side-toc,.vicara-mobile-toc')) return;
      if (!heading.id) heading.id = uniqueId(slug(cleanText(heading)) || `section-${++i}`, used);
    });
  };

  const generateToc = () => {
    addIds();
    const headings = [...articleBody.querySelectorAll('h2,h3')].filter((heading) => {
      return !isContentsHeading(heading) && !heading.closest('.vicara-side-toc,.vicara-mobile-toc') && heading.id;
    });
    if (!headings.length) return null;

    const list = document.createElement('ol');
    list.className = 'vicara-toc';
    let currentParent = list;
    let lastTop = null;
    headings.forEach((heading) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.textContent = cleanText(heading).replace(/^\d+(?:\.\d+)*\.?\s*/, '');
      li.appendChild(a);
      if (heading.tagName === 'H2') {
        list.appendChild(li);
        lastTop = li;
        currentParent = list;
      } else if (lastTop) {
        let sub = lastTop.querySelector(':scope > ol');
        if (!sub) {
          sub = document.createElement('ol');
          lastTop.appendChild(sub);
        }
        sub.appendChild(li);
        currentParent = sub;
      } else {
        currentParent.appendChild(li);
      }
    });
    return list;
  };

  let activeObserver = null;
  const bindActive = (aside) => {
    if (activeObserver) activeObserver.disconnect();
    const links = [...aside.querySelectorAll('a[href^="#"]')];
    const targets = links.map((link) => {
      const id = link.getAttribute('href').slice(1);
      return document.getElementById(id);
    }).filter(Boolean);
    if (!links.length || !targets.length || !('IntersectionObserver' in window)) return;
    const map = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));
    const setActive = (id) => {
      links.forEach((link) => link.classList.remove('is-active'));
      map.get(id)?.classList.add('is-active');
    };
    activeObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, {rootMargin:'-15% 0px -72% 0px', threshold:[0,1]});
    targets.forEach((target) => activeObserver.observe(target));
  };

  const bindTocClicks = (scope) => {
    scope.querySelectorAll('a[href^="#"]').forEach((link) => {
      if (link.dataset.vicaraBound === 'true') return;
      link.dataset.vicaraBound = 'true';
      link.addEventListener('click', () => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        const remark = target.matches('details.remark-section') ? target : target.closest('details.remark-section');
        if (remark) remark.open = true;
      });
    });
  };

  let built = false;
  const build = () => {
    wrapRemarks();
    const manual = findManualContents();
    let toc = manual?.list ? normalizeTocClone(manual.list) : generateToc();
    if (!toc || !toc.querySelector('a[href^="#"]')) return false;
    hideManualContents(manual);

    let aside = articleBody.querySelector(':scope > .vicara-side-toc');
    let mobile = articleBody.querySelector(':scope > .vicara-mobile-toc');
    if (!aside) {
      aside = document.createElement('aside');
      aside.className = 'vicara-side-toc';
      aside.setAttribute('aria-label','Table of contents');
      articleBody.insertBefore(aside, articleBody.firstChild);
    }
    aside.innerHTML = '';
    const title = document.createElement('h2');
    title.className = 'vicara-side-title';
    title.textContent = 'Contents';
    aside.append(title, toc);

    if (!mobile) {
      mobile = document.createElement('details');
      mobile.className = 'vicara-mobile-toc';
      const summary = document.createElement('summary');
      summary.textContent = 'Contents';
      mobile.appendChild(summary);
      aside.insertAdjacentElement('afterend', mobile);
    }
    mobile.querySelectorAll(':scope > .vicara-toc').forEach((node) => node.remove());
    mobile.appendChild(normalizeTocClone(toc));

    bindTocClicks(aside);
    bindTocClicks(mobile);
    bindActive(aside);
    built = true;
    return true;
  };

  const markPlainSanskritButtons = () => {
    articleBody.querySelectorAll('details > summary').forEach((summary) => {
      if (/show sanskrit|hide sanskrit/i.test(cleanText(summary))) summary.classList.add('vicara-sanskrit-summary');
    });
  };

  markPlainSanskritButtons();
  build();

  // Gītā chapters and a few generated articles populate their contents after site.js runs.
  // Rebuild once the real article DOM appears, then stop observing once a usable TOC exists.
  let timer = null;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      markPlainSanskritButtons();
      const ready = build();
      if (ready && articleBody.querySelector('.gita-contents ol, .gita-contents ul')) observer.disconnect();
    }, 60);
  });
  observer.observe(articleBody, {childList:true, subtree:true});

  // Do not leave the observer alive forever on fully static pages.
  if (built && !articleBody.querySelector('[data-gita-chapter]')) setTimeout(() => observer.disconnect(), 500);
})();
