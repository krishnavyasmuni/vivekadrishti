(() => {
  const ROOT = '.current-up-reader';
  const FALLBACK_ANTHOLOGY = 'https://commons.wikimedia.org/w/thumb.php?f=Thirty_minor_Upanishads_%28IA_thirtyminorupani00naraiala%29.pdf&page=1&width=640';
  const FALLBACK_MANUSCRIPT = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Aitareya_Upanishad%2C_Sanskrit%2C_Rigveda%2C_Devanagari_script%2C_1865_CE_manuscript.jpg';
  const FALLBACK_GRANTHA = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Katha_Upanishad%2C_Sanskrit%2C_Grantha_script%2C_Whish_Manuscript_Collection_acquired_1836_CE.jpg';

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
      const parts = src.split('/download/')[1].split('/');
      const id = parts[0];
      return id ? `https://archive.org/services/img/${id}` : src;
    }

    if (/^https:\/\/upload\.wikimedia\.org\//i.test(src) && /\.pdf(?:[?#]|$)/i.test(src)) {
      const last = decode(src.split('/').pop().split(/[?#]/)[0]);
      return commonsRenderable(last);
    }
    return src;
  }

  function titleFor(img) {
    return img.closest('.current-up-reader')?.querySelector('.kena-infobox-title')?.textContent?.trim() || 'this Upanishad';
  }

  function fallbackList(img) {
    const own = normalize(img.getAttribute('src'));
    const list = [own];
    if (!own.includes('Thirty_minor_Upanishads')) list.push(FALLBACK_ANTHOLOGY);
    if (!own.includes('Aitareya_Upanishad')) list.push(FALLBACK_MANUSCRIPT);
    if (!own.includes('Katha_Upanishad')) list.push(FALLBACK_GRANTHA);
    return [...new Set(list.filter(Boolean))];
  }

  function setCaption(img, fallbackIndex) {
    if (fallbackIndex < 1) return;
    const cap = img.closest('figure')?.querySelector('figcaption');
    if (!cap) return;
    const title = titleFor(img);
    if (fallbackIndex === 1) {
      cap.textContent = `Public-domain Upanishad anthology witness used as a display fallback for ${title}; see the references below for text-specific manuscript and edition sources.`;
    } else {
      cap.textContent = `Vedic manuscript witness used as a display fallback for ${title}; the article references identify the text-specific witnesses where available.`;
    }
  }

  function prepare(img) {
    if (!(img instanceof HTMLImageElement) || !img.closest(ROOT)) return;
    if (img.dataset.upImagePrepared === '1') return;
    img.dataset.upImagePrepared = '1';
    img.referrerPolicy = 'no-referrer';
    img.decoding = 'async';

    // The reader used to delete the figure immediately on the first failed request.
    // Remove that legacy handler so the resolver gets a chance to repair/retry it.
    img.removeAttribute('onerror');
    img.onerror = null;

    const choices = fallbackList(img);
    img.dataset.upImageChoices = JSON.stringify(choices);
    img.dataset.upImageChoice = '0';

    img.addEventListener('error', () => {
      const list = JSON.parse(img.dataset.upImageChoices || '[]');
      const i = Number(img.dataset.upImageChoice || 0) + 1;
      if (i < list.length) {
        img.dataset.upImageChoice = String(i);
        setCaption(img, i);
        img.src = list[i];
        return;
      }
      const figure = img.closest('figure');
      if (figure) figure.remove();
    });

    const normalized = choices[0];
    if (normalized && img.src !== normalized) img.src = normalized;
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