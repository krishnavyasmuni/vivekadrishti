(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  if (!stage) return;

  const sects = [
    ['Vaiṣṇava', 'var(--sect-vaisnava)', 'Blue'],
    ['Śaiva', 'var(--sect-saiva)', 'Purple'],
    ['Śākta', 'var(--sect-sakta)', 'Rose'],
    ['Saura', 'var(--sect-saura)', 'Gold'],
    ['Brahmā', 'var(--sect-brahma)', 'Brown'],
    ['Mixed / composite', 'var(--sect-mixed)', 'Grey-green']
  ];

  function ensureLegend() {
    const title = stage.querySelector('.shastra-title');
    const isPurana = title && title.textContent.trim() === 'Purāṇas';
    const old = stage.querySelector('.purana-sect-legend');

    if (!isPurana) {
      if (old) old.remove();
      return;
    }
    if (old) return;

    const tabs = stage.querySelector('.shastra-subnav');
    if (!tabs) return;

    const legend = document.createElement('div');
    legend.className = 'purana-sect-legend';
    legend.setAttribute('aria-label', 'Purāṇa sectarian colour key');
    legend.style.cssText = 'display:flex;flex-wrap:wrap;gap:7px 12px;margin:-7px 0 18px;padding:10px 12px;border:1px solid #d9d0c4;border-radius:4px;background:rgba(255,255,255,.5);';

    legend.innerHTML = sects.map(([label, colour, colourName]) =>
      `<span title="${colourName} = ${label}" style="display:inline-flex;align-items:center;gap:6px;color:#5f574f;font-family:Merriweather,Georgia,serif;font-size:9px;line-height:1.2;white-space:nowrap"><i aria-hidden="true" style="display:inline-block;width:11px;height:11px;border-radius:3px;background:${colour};box-shadow:0 0 0 1px rgba(0,0,0,.09) inset"></i><strong style="font-weight:700">${label}</strong><em style="font-style:normal;color:#8a8075">${colourName}</em></span>`
    ).join('');

    tabs.insertAdjacentElement('afterend', legend);
  }

  const observer = new MutationObserver(ensureLegend);
  observer.observe(stage, { childList: true, subtree: true });
  root.addEventListener('click', () => requestAnimationFrame(ensureLegend));
  ensureLegend();
})();