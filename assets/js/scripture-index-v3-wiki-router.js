(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const ALLOWED = new Set([
    'Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka','Upaniṣad',
    'Mahāpurāṇa','Upapurāṇa','Both','Itihāsa','Smṛti','Vedāṅga'
  ]);

  function scriptureButtonFromEvent(event) {
    const target = event.target;
    if (!(target instanceof Element)) return null;
    const button = target.closest('.shastra-name');
    return button && root.contains(button) ? button : null;
  }

  function info(button) {
    return {
      name: button.dataset.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim(),
      kind: button.dataset.kind || ''
    };
  }

  window.SCRIPTURE_WIKI_ROUTER_ACTIVE = true;

  // Capture on window, before the old index's bubble listener and before the
  // document-level compatibility listener. This makes the article reader the
  // one canonical click path for every scripture card.
  window.addEventListener('click', event => {
    const button = scriptureButtonFromEvent(event);
    if (!button) return;

    const {name, kind} = info(button);
    if (!ALLOWED.has(kind)) return;

    // Kena has its own bespoke reader and should continue through to it.
    if (kind === 'Upaniṣad' && name === 'Kena') return;

    const open = window.openScriptureEncyclopedia;
    if (typeof open !== 'function') return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    open(button);
  }, true);
})();
