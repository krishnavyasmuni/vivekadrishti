(() => {
  // Legacy compatibility shim.
  // Older cached Canto 10 HTML referenced this file. Never restore the old
  // 90-chapter queue here: it could freeze the browser by fetching/rendering
  // the entire canto at once.
  if (window.__canto10ChapterLoaderRequested) return;
  window.__canto10ChapterLoaderRequested = true;

  const root = document.querySelector('[data-canto10-source-root]');
  const host = root?.querySelector('[data-canto10-all-host]');
  const status = document.querySelector('[data-canto10-status]');

  // Immediately remove any legacy chapter shells left in the DOM before this
  // compatibility version was fetched/revalidated.
  if (host) host.replaceChildren();
  if (status) status.textContent = 'Preparing selected chapter…';

  const script = document.createElement('script');
  script.src = '/vivekadrishti/assets/js/canto10-chapter-loader.js?v=3';
  script.async = false;
  document.head.appendChild(script);
})();