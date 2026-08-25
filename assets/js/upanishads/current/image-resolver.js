(() => {
  const ROOT = '.current-up-reader';
  const GENERIC_IMG = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Meditation_in_deep_forest_in_Nepal.jpg';
  const GENERIC_PAGE = 'https://commons.wikimedia.org/wiki/File:Meditation_in_deep_forest_in_Nepal.jpg';

  const SPECIAL_TITLES = {
    'Āruṇi':'Aruneya Upanishad',
    'Sannyāsa':'Brihat-Sannyasa Upanishad',
    'Turīyātītāvadhūta':'Turiyatitavadhuta Upanishad',
    'Nārada-Parivrājaka':'Naradaparivrajaka Upanishad',
    'Paramahaṃsa-Parivrājaka':'Paramahamsa Parivrajaka Upanishad',
    'Nṛsiṃhatāpanī':'Nrisimha Tapaniya Upanishad',
    'Tripurātāpinī':'Tripuratapini Upanishad',
    'Gopālatāpanī':'Gopala Tapani Upanishad',
    'Rāmatāpanī':'Rama Tapaniya Upanishad',
    'Kali-Saṇṭāraṇa':'Kali-Santarana Upanishad',
    'Rudrākṣajābāla':'Rudrakshajabala Upanishad',
    'Kālāgnirudra':'Kalagni Rudra Upanishad',
    'Bṛhajjābāla':'Brihajjabala Upanishad',
    'Bhasmajābāla':'Bhasmajabala Upanishad',
    'Saubhāgyalakṣmī':'Saubhagyalakshmi Upanishad',
    'Sarasvatī-rahasya':'Sarasvati-rahasya Upanishad',
    'Maitrāyaṇī':'Maitrayaniya Upanishad',
    'Kauṣītaki':'Kaushitaki Upanishad',
    'Śvetāśvatara':'Shvetashvatara Upanishad',
    'Īśāvāsya':'Isha Upanishad',
    'Bṛhadāraṇyaka':'Brihadaranyaka Upanishad',
    'Māṇḍūkya':'Mandukya Upanishad',
    'Muṇḍaka':'Mundaka Upanishad',
    'Praśna':'Prashna Upanishad',
    'Kaṭha':'Katha Upanishad',
    'Taittirīya':'Taittiriya Upanishad',
    'Aitareya':'Aitareya Upanishad'
  };

  const strip = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[ṣś]/gi,'s').replace(/[ṛṝ]/gi,'r').replace(/[ṇñṅ]/gi,'n').replace(/[ṭ]/gi,'t').replace(/[ḍ]/gi,'d').replace(/[ā]/gi,'a').replace(/[ī]/gi,'i').replace(/[ū]/gi,'u').replace(/[ṃṁ]/gi,'m');
  const titleFor = reader => reader.querySelector('.kena-infobox-title')?.textContent?.trim() || 'Upanishad';
  const nameFor = reader => titleFor(reader).replace(/\s+Upanishad$/i,'').trim();

  function ensureFigure(reader) {
    const box = reader.querySelector('.current-upanishad-infobox, .kena-infobox');
    if (!box) return null;
    let figure = box.querySelector('figure');
    if (!figure) {
      figure = document.createElement('figure');
      figure.className = 'wiki-infobox-image current-up-art';
      const dev = box.querySelector('.ch-dev');
      const title = box.querySelector('.kena-infobox-title');
      (dev || title)?.insertAdjacentElement('afterend', figure);
    }
    let anchor = figure.querySelector('a');
    if (!anchor) {
      anchor = document.createElement('a');
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      figure.prepend(anchor);
    }
    let img = anchor.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.loading = 'eager';
      img.alt = '';
      anchor.append(img);
    }
    let cap = figure.querySelector('figcaption');
    if (!cap) {
      cap = document.createElement('figcaption');
      figure.append(cap);
    }
    figure.style.display = '';
    return {figure,anchor,img,cap};
  }

  function setGeneric(reader) {
    const f = ensureFigure(reader); if (!f) return;
    f.anchor.href = GENERIC_PAGE;
    f.img.removeAttribute('onerror');
    f.img.referrerPolicy = 'no-referrer';
    f.img.alt = 'Meditative forest scene';
    f.img.onerror = null;
    f.img.src = GENERIC_IMG;
    f.cap.textContent = '';
    f.cap.style.display = 'none';
    f.figure.classList.add('current-up-generic-art');
  }

  function setWiki(reader, page) {
    const src = page?.thumbnail?.source;
    if (!src) return false;
    const f = ensureFigure(reader); if (!f) return false;
    f.figure.classList.remove('current-up-generic-art');
    f.anchor.href = page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g,'_'))}`;
    f.img.removeAttribute('onerror');
    f.img.referrerPolicy = 'no-referrer';
    f.img.alt = page.title || titleFor(reader);
    f.img.onerror = () => setGeneric(reader);
    f.img.src = src;
    f.cap.style.display = '';
    f.cap.textContent = `${page.title} — Wikipedia.`;
    return true;
  }

  function scorePage(page, wanted) {
    const t = strip(page?.title || '').toLowerCase();
    const w = strip(wanted).toLowerCase();
    let score = 0;
    if (t === w) score += 100;
    if (t.includes('upanishad')) score += 30;
    const stem = w.replace(/\s+upanishad$/,'').trim();
    if (stem && t.includes(stem)) score += 50;
    if (page?.thumbnail?.source) score += 20;
    return score;
  }

  async function wikipediaImage(reader) {
    const name = nameFor(reader);
    const preferred = SPECIAL_TITLES[name] || `${strip(name)} Upanishad`;
    const exact = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages%7Cinfo&piprop=thumbnail&pithumbsize=900&inprop=url&titles=${encodeURIComponent(preferred)}`;
    try {
      let response = await fetch(exact, {mode:'cors', credentials:'omit'});
      let data = await response.json();
      let pages = Object.values(data?.query?.pages || {});
      let page = pages.find(p => p.thumbnail?.source && !p.missing);
      if (page) return page;

      const query = `${strip(name)} Upanishad`;
      const search = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit=6&gsrsearch=${encodeURIComponent(query)}&prop=pageimages%7Cinfo&piprop=thumbnail&pithumbsize=900&inprop=url`;
      response = await fetch(search, {mode:'cors', credentials:'omit'});
      data = await response.json();
      pages = Object.values(data?.query?.pages || {}).filter(p => p.thumbnail?.source);
      pages.sort((a,b) => scorePage(b, preferred) - scorePage(a, preferred));
      return pages[0] || null;
    } catch (_) {
      return null;
    }
  }

  async function repairImage(reader) {
    if (reader.dataset.upWikiImageStarted === '1') return;
    reader.dataset.upWikiImageStarted = '1';
    setGeneric(reader);
    const page = await wikipediaImage(reader);
    if (page && reader.isConnected) setWiki(reader, page);
  }

  function repairCitations(reader) {
    const refs = [...reader.querySelectorAll('.ch-reference-list > li')];
    refs.forEach((li, i) => { if (!li.id) li.id = `cup-ref-${i + 1}`; });
    reader.querySelectorAll('.ch-cite button[data-current-up-note]').forEach(button => {
      const n = Number(button.dataset.currentUpNote || 0);
      if (!n) return;
      const li = refs[n - 1];
      const sourceLink = li?.querySelector('a[href]');
      const a = document.createElement('a');
      a.className = 'current-up-cite-link';
      a.textContent = `[${n}]`;
      a.setAttribute('aria-label', `Source ${n}`);
      a.title = li?.textContent?.trim() || `Source ${n}`;
      if (sourceLink) { a.href = sourceLink.href; a.target = '_blank'; a.rel = 'noopener'; }
      else a.href = `#cup-ref-${n}`;
      button.replaceWith(a);
    });
  }

  function repair(reader) {
    if (!(reader instanceof Element) || !reader.matches(ROOT)) return;
    repairCitations(reader);
    repairImage(reader);
  }

  const previousOpen = window.openScriptureEncyclopedia;
  if (typeof previousOpen === 'function' && !window.SCRIPTURE_UPANISHAD_WIKI_ART_WRAPPED) {
    window.openScriptureEncyclopedia = function(button) {
      const result = previousOpen(button);
      const reader = document.querySelector(ROOT);
      if (reader) { repair(reader); queueMicrotask(() => repair(reader)); }
      return result;
    };
    window.SCRIPTURE_UPANISHAD_WIKI_ART_WRAPPED = true;
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) for (const node of mutation.addedNodes) {
      if (!(node instanceof Element)) continue;
      if (node.matches?.(ROOT)) repair(node);
      node.querySelectorAll?.(ROOT).forEach(repair);
    }
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
  document.querySelectorAll(ROOT).forEach(repair);

  if (!document.getElementById('current-up-wiki-art-style')) {
    const style = document.createElement('style');
    style.id = 'current-up-wiki-art-style';
    style.textContent = `
      .current-up-cite-link{color:#36c!important;text-decoration:none!important;font:12px/1 Arial,sans-serif!important;margin-left:2px!important;white-space:nowrap!important}
      .current-up-cite-link:hover{text-decoration:underline!important}
      .current-up-art,.current-up-generic-art{min-height:0!important;height:auto!important;background:#fff!important}
      .current-up-art img,.current-up-generic-art img{display:block!important;width:100%!important;height:auto!important;max-height:430px!important;object-fit:cover!important;background:#fff!important}
      .current-up-generic-art img{aspect-ratio:3/2!important;object-fit:cover!important}
      .current-up-generic-art figcaption{display:none!important}
    `;
    document.head.append(style);
  }
  window.SCRIPTURE_UPANISHAD_IMAGE_RESOLVER = 'wikipedia-with-meditation-fallback';
})();