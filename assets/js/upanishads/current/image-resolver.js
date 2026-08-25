(() => {
  const ROOT = '.current-up-reader';

  // Stable Commons JPG witnesses used only when a text-specific image cannot render.
  // Captions explicitly identify these as representative display images.
  const FALLBACKS = {
    paper: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Aitareya_Upanishad%2C_Sanskrit%2C_Rigveda%2C_Devanagari_script%2C_1865_CE_manuscript.jpg',
    grantha: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Katha_Upanishad%2C_Sanskrit%2C_Grantha_script%2C_Whish_Manuscript_Collection_acquired_1836_CE.jpg',
    gitaPalm: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bhagavad_Gita_Grantha_script_Sanskrit.jpg',
    bhagavataPalm: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bhagavata_Purana%2C_Sanskrit%2C_Malayalam_script%2C_Whish_manuscript_collection%2C_acquired_1836_CE.jpg'
  };

  const decode = s => { try { return decodeURIComponent(s); } catch { return s; } };
  const fileFromCommons = src => {
    const a = src.match(/commons\.wikimedia\.org\/wiki\/File:(.+?)(?:[?#]|$)/i);
    if (a) return decode(a[1]).replace(/ /g, '_');
    const b = src.match(/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\/(.+?)(?:[?#]|$)/i);
    if (b) return decode(b[1]).replace(/ /g, '_');
    return '';
  };

  function commonsRenderable(file) {
    if (!file) return '';
    if (/\.pdf$/i.test(file)) {
      return `https://commons.wikimedia.org/w/thumb.php?f=${encodeURIComponent(file)}&page=1&width=720`;
    }
    return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
  }

  function normalize(raw) {
    if (!raw) return '';
    const src = String(raw).trim();
    const cf = fileFromCommons(src);
    if (cf) return commonsRenderable(cf);

    if (/^https:\/\/archive\.org\/details\//i.test(src)) {
      const id = src.split('/details/')[1].split(/[?#/]/)[0];
      return id ? `https://archive.org/services/img/${id}` : src;
    }
    if (/^https:\/\/archive\.org\/download\//i.test(src) && /\.pdf(?:[?#]|$)/i.test(src)) {
      const id = src.split('/download/')[1].split('/')[0];
      return id ? `https://archive.org/services/img/${id}` : src;
    }
    if (/^https:\/\/upload\.wikimedia\.org\//i.test(src) && /\.pdf(?:[?#]|$)/i.test(src)) {
      const last = decode(src.split('/').pop().split(/[?#]/)[0]);
      return commonsRenderable(last);
    }
    return src;
  }

  function titleFor(img) {
    return img.closest(ROOT)?.querySelector('.kena-infobox-title')?.textContent?.trim() || 'this Upanishad';
  }

  function typeFor(img) {
    const rows = [...(img.closest(ROOT)?.querySelectorAll('.kena-info-row') || [])];
    const row = rows.find(r => r.querySelector('b')?.textContent?.trim() === 'Type');
    return row?.querySelector('span')?.textContent?.trim() || '';
  }

  function categoryFallbacks(img) {
    const type = typeFor(img);
    if (/Yoga|Sannyāsa/i.test(type)) return [FALLBACKS.grantha, FALLBACKS.gitaPalm, FALLBACKS.paper];
    if (/Vaiṣṇava/i.test(type)) return [FALLBACKS.bhagavataPalm, FALLBACKS.grantha, FALLBACKS.paper];
    if (/Śaiva|Saiva|Śākta|Sakta/i.test(type)) return [FALLBACKS.gitaPalm, FALLBACKS.grantha, FALLBACKS.paper];
    return [FALLBACKS.paper, FALLBACKS.grantha, FALLBACKS.gitaPalm];
  }

  function fallbackList(img) {
    const own = normalize(img.getAttribute('src'));
    return [...new Set([own, ...categoryFallbacks(img)].filter(Boolean))];
  }

  function setFallbackCaption(img) {
    const cap = img.closest('figure')?.querySelector('figcaption');
    if (!cap) return;
    cap.textContent = `Representative Sanskrit manuscript image used as a display placeholder for ${titleFor(img)}; text-specific manuscript and edition evidence is given in the article and references.`;
  }

  function loadChoice(img, index) {
    const list = JSON.parse(img.dataset.upImageChoices || '[]');
    if (index >= list.length) return false;
    img.dataset.upImageChoice = String(index);
    if (index > 0) setFallbackCaption(img);
    img.src = list[index];
    return true;
  }

  function advance(img) {
    if (!img.isConnected) return;
    const next = Number(img.dataset.upImageChoice || 0) + 1;
    if (!loadChoice(img, next)) {
      // The last three choices are known Commons JPGs. If every remote request somehow
      // fails, keep the figure collapsed rather than leaving a large empty grey box.
      const figure = img.closest('figure');
      if (figure) figure.style.display = 'none';
    }
  }

  function prepare(img) {
    if (!(img instanceof HTMLImageElement) || !img.closest(ROOT)) return;
    if (img.dataset.upImagePrepared === '1') return;
    img.dataset.upImagePrepared = '1';
    img.referrerPolicy = 'no-referrer';
    img.decoding = 'async';

    // The old reader removed figures immediately on first error. Disable that so the
    // fallback chain always gets a chance to run.
    img.removeAttribute('onerror');
    img.onerror = null;

    const choices = fallbackList(img);
    img.dataset.upImageChoices = JSON.stringify(choices);
    img.dataset.upImageChoice = '0';

    img.addEventListener('load', () => {
      if (img.naturalWidth < 40 || img.naturalHeight < 20) advance(img);
    });
    img.addEventListener('error', () => advance(img));

    const normalized = choices[0];
    if (normalized && img.src !== normalized) img.src = normalized;

    // Some remote hosts hang instead of firing error. Never allow a blank infobox.
    setTimeout(() => {
      if (!img.isConnected) return;
      if (!img.complete || img.naturalWidth < 40 || img.naturalHeight < 20) advance(img);
    }, 3200);
  }

  function scan(node = document) {
    if (node instanceof HTMLImageElement) prepare(node);
    node.querySelectorAll?.(`${ROOT} img`).forEach(prepare);
  }

  const observer = new MutationObserver(muts => {
    for (const m of muts) for (const n of m.addedNodes) if (n.nodeType === 1) scan(n);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scan();
  window.SCRIPTURE_UPANISHAD_IMAGE_RESOLVER = true;
})();