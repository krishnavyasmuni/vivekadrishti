(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  if (!root) return;

  const queued = new WeakSet();

  function resolveDetails(details) {
    if (!(details instanceof HTMLDetailsElement) || queued.has(details)) return;
    if (!details.classList.contains('sb-sridhara-wfw-details')) return;
    queued.add(details);

    // The main word-for-word renderer performs its dictionary resolution on
    // the first toggle. Trigger that once as soon as the verse is rendered,
    // then return the control to its normal collapsed state.
    const wasOpen = details.open;
    if (!wasOpen) details.open = true;
    requestAnimationFrame(() => {
      if (!wasOpen && details.isConnected) details.open = false;
    });
  }

  function scan(node = root) {
    if (node instanceof HTMLDetailsElement) resolveDetails(node);
    node.querySelectorAll?.('details.sb-sridhara-wfw-details').forEach(resolveDetails);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) scan(node);
    }));
  });

  observer.observe(root, { childList: true, subtree: true });
  scan();
})();