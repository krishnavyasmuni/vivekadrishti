(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const style = document.createElement('style');
  style.textContent = `
    .canto-10-continuous-layout .sb-sridhara-visible{
      display:block!important;max-width:840px!important;margin:16px auto 18px!important;
      color:#3c362e!important;font-family:Merriweather,Georgia,'Times New Roman',serif!important;
      font-size:16px!important;line-height:1.55!important;text-align:left!important
    }
    .canto-10-continuous-layout .sb-sridhara-visible-label{
      display:inline!important;color:#2f7f82!important;font-size:17px!important;font-weight:700!important
    }
    .canto-10-continuous-layout .sb-sridhara-visible-sanskrit{
      display:block!important;margin:7px 0 0!important;color:#3c362e!important;
      font-family:Merriweather,Georgia,'Times New Roman',serif!important;font-size:18px!important;
      font-weight:400!important;line-height:1.65!important;text-align:left!important
    }
    .canto-10-continuous-layout .sb-bhasya{display:none!important}
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details>summary{display:none!important}
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details{
      display:block!important;margin:10px 0 0!important;padding-top:10px!important;
      border-top:1px solid #e5e0da!important
    }
    .canto-10-continuous-layout .sb-word-details .sb-sridhara-wfw-details .sb-source-label{color:#ab382d!important}
  `;
  document.head.appendChild(style);

  function ensureVisibleSridhara(section) {
    if (!(section instanceof HTMLElement)) return;
    const translation = section.querySelector(':scope > .sb-translation');
    const bhasya = section.querySelector(':scope > .sb-bhasya');
    const sanskrit = bhasya?.querySelector('.sb-source-content')?.textContent?.trim() || '';
    if (!translation || !sanskrit) return;

    let visible = section.querySelector(':scope > .sb-sridhara-visible');
    if (!visible) {
      visible = document.createElement('div');
      visible.className = 'sb-sridhara-visible';

      const label = document.createElement('strong');
      label.className = 'sb-sridhara-visible-label';
      label.textContent = 'Śrīdhara Commentary:';

      const text = document.createElement('div');
      text.className = 'sb-sridhara-visible-sanskrit';
      text.lang = 'sa-Deva';

      visible.append(label, text);
      translation.insertAdjacentElement('afterend', visible);
    }

    const text = visible.querySelector('.sb-sridhara-visible-sanskrit');
    if (text && text.textContent !== sanskrit) text.textContent = sanskrit;
  }

  function mergeWordForWord(section) {
    if (!(section instanceof HTMLElement)) return;
    const sridhara = section.querySelector(':scope > .sb-sridhara-wfw-details');
    if (!sridhara) return;

    let bhagavatam = section.querySelector(':scope > .sb-word-details');
    if (!bhagavatam) {
      bhagavatam = document.createElement('details');
      bhagavatam.className = 'sb-details sb-word-details';
      bhagavatam.open = false;
      const summary = document.createElement('summary');
      summary.textContent = 'Word-for-word';
      bhagavatam.appendChild(summary);
      const visible = section.querySelector(':scope > .sb-sridhara-visible');
      if (visible) visible.insertAdjacentElement('afterend', bhagavatam);
      else section.appendChild(bhagavatam);
    }

    const label = sridhara.querySelector('.sb-source-label');
    if (label) label.textContent = 'Śrīdhara word-for-word';
    sridhara.open = true;
    if (sridhara.parentElement !== bhagavatam) bhagavatam.appendChild(sridhara);
  }

  function normalize(section) {
    if (!(section instanceof HTMLElement) || !section.matches('.sb-verse-section')) return;
    ensureVisibleSridhara(section);
    mergeWordForWord(section);
  }

  function scan(node = root) {
    if (node instanceof HTMLElement && node.matches('.sb-verse-section')) normalize(node);
    node.querySelectorAll?.('.sb-verse-section').forEach(normalize);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const section = mutation.target instanceof Element ? mutation.target.closest('.sb-verse-section') : null;
      if (section) normalize(section);
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) scan(node);
      }
    }
  });

  observer.observe(root, { childList: true, subtree: true, characterData: true });
  scan();
})();