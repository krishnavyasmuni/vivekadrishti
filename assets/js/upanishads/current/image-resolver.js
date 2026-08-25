(() => {
  const ROOT = '.current-up-reader';
  const PALM_IMG = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/1836%20CE%20July%20purchase%2C%20Chandogya%20Upanishad%20vivarana%2C%20Whish%20manuscript%20collection%2C%20Kahle-Austin%20Foundation%2C%20Sanskrit%2C%20Grantha%20script.jpg';
  const PALM_PAGE = 'https://commons.wikimedia.org/wiki/File:1836_CE_July_purchase,_Chandogya_Upanishad_vivarana,_Whish_manuscript_collection,_Kahle-Austin_Foundation,_Sanskrit,_Grantha_script.jpg';
  const PAPER_IMG = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chandogya%20Upanishad%20verses%201.1.1-1.1.9%2C%20Samaveda%2C%20Sanskrit%2C%20Devanagari%20script%2C%201849%20CE%20manuscript.jpg';
  const PAPER_PAGE = 'https://commons.wikimedia.org/wiki/File:Chandogya_Upanishad_verses_1.1.1-1.1.9,_Samaveda,_Sanskrit,_Devanagari_script,_1849_CE_manuscript.jpg';

  const titleFor = reader => reader.querySelector('.kena-infobox-title')?.textContent?.trim() || 'this Upanishad';
  const fallbackCaption = reader => `Representative Sanskrit palm-leaf manuscript used as a display image for ${titleFor(reader)}. It is not claimed to be a manuscript of this specific Upanishad.`;

  function reliable(src) {
    if (!src) return false;
    if (src.startsWith('/vivekadrishti/')) return true;
    if (/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\//i.test(src) && /\.(?:jpe?g|png|webp)(?:[?#]|$)/i.test(src)) return true;
    return false;
  }

  function setCaption(reader, text) {
    const cap = reader.querySelector('.current-upanishad-infobox figure figcaption, .kena-infobox figure figcaption');
    if (cap) cap.textContent = text;
  }

  function forceFallback(img, reader, usePaper = false) {
    if (!img || img.dataset.upHardFallback === '1') return;
    img.dataset.upHardFallback = '1';
    img.removeAttribute('onerror');
    img.referrerPolicy = 'no-referrer';
    img.decoding = 'async';
    const figure = img.closest('figure');
    const anchor = img.closest('a');
    if (anchor) anchor.href = usePaper ? PAPER_PAGE : PALM_PAGE;
    if (figure) figure.classList.add('current-up-generic-witness');
    setCaption(reader, fallbackCaption(reader));
    img.onerror = () => {
      if (img.dataset.upPaperFallback === '1') return;
      img.dataset.upPaperFallback = '1';
      if (anchor) anchor.href = PAPER_PAGE;
      img.src = PAPER_IMG;
      setCaption(reader, `Representative Sanskrit manuscript used as a display image for ${titleFor(reader)}. It is not claimed to be a manuscript of this specific Upanishad.`);
    };
    img.src = usePaper ? PAPER_IMG : PALM_IMG;
  }

  function ensureImage(reader) {
    const box = reader.querySelector('.current-upanishad-infobox, .kena-infobox');
    if (!box) return;
    let figure = box.querySelector('figure');
    let img = figure?.querySelector('img');

    if (!figure || !img) {
      figure = document.createElement('figure');
      figure.className = 'wiki-infobox-image current-up-generic-witness';
      figure.innerHTML = `<a href="${PALM_PAGE}" target="_blank" rel="noopener"><img src="${PALM_IMG}" loading="eager" alt="Representative Sanskrit palm-leaf manuscript"></a><figcaption>${fallbackCaption(reader)}</figcaption>`;
      const dev = box.querySelector('.ch-dev');
      const title = box.querySelector('.kena-infobox-title');
      (dev || title)?.insertAdjacentElement('afterend', figure);
      img = figure.querySelector('img');
    }

    img.removeAttribute('onerror');
    img.referrerPolicy = 'no-referrer';
    const raw = img.getAttribute('src') || '';
    if (!reliable(raw)) {
      forceFallback(img, reader);
      return;
    }

    img.onerror = () => forceFallback(img, reader);
    const timer = setTimeout(() => {
      if (!img.complete || img.naturalWidth < 40) forceFallback(img, reader);
    }, 2200);
    img.addEventListener('load', () => clearTimeout(timer), { once: true });
    if (img.complete && img.naturalWidth === 0) forceFallback(img, reader);
  }

  function repairCitations(reader) {
    const refs = [...reader.querySelectorAll('.ch-reference-list > li')];
    refs.forEach((li, i) => { if (!li.id) li.id = `cup-ref-${i + 1}`; });

    reader.querySelectorAll('.ch-cite button[data-current-up-note]').forEach(button => {
      const n = Number(button.dataset.currentUpNote || 0);
      if (!n || button.dataset.upCitationFixed === '1') return;
      const li = refs[n - 1];
      const sourceLink = li?.querySelector('a[href]');
      const a = document.createElement('a');
      a.className = 'current-up-cite-link';
      a.textContent = `[${n}]`;
      a.setAttribute('aria-label', `Source ${n}`);
      a.title = li?.textContent?.trim() || `Source ${n}`;
      if (sourceLink) {
        a.href = sourceLink.href;
        a.target = '_blank';
        a.rel = 'noopener';
      } else {
        a.href = `#cup-ref-${n}`;
      }
      button.dataset.upCitationFixed = '1';
      button.replaceWith(a);
    });
  }

  function repair(reader) {
    if (!(reader instanceof Element) || !reader.matches(ROOT)) return;
    ensureImage(reader);
    repairCitations(reader);
  }

  const previousOpen = window.openScriptureEncyclopedia;
  if (typeof previousOpen === 'function' && !window.SCRIPTURE_UPANISHAD_HARD_FIX_WRAPPED) {
    window.openScriptureEncyclopedia = function(button) {
      const result = previousOpen(button);
      const reader = document.querySelector(ROOT);
      if (reader) {
        repair(reader);
        queueMicrotask(() => repair(reader));
        setTimeout(() => repair(reader), 50);
      }
      return result;
    };
    window.SCRIPTURE_UPANISHAD_HARD_FIX_WRAPPED = true;
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches?.(ROOT)) repair(node);
        node.querySelectorAll?.(ROOT).forEach(repair);
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.querySelectorAll(ROOT).forEach(repair);

  if (!document.getElementById('current-up-hard-fix-style')) {
    const style = document.createElement('style');
    style.id = 'current-up-hard-fix-style';
    style.textContent = `
      .current-up-cite-link{color:#36c!important;text-decoration:none!important;font:12px/1 Arial,sans-serif!important;margin-left:2px!important;white-space:nowrap!important}
      .current-up-cite-link:hover{text-decoration:underline!important}
      .current-up-generic-witness{min-height:0!important;height:auto!important;background:#fff!important}
      .current-up-generic-witness img{display:block!important;width:100%!important;height:auto!important;max-height:420px!important;object-fit:contain!important;background:#fff!important}
    `;
    document.head.append(style);
  }

  window.SCRIPTURE_UPANISHAD_IMAGE_RESOLVER = 'hard-fallback-v2';
})();