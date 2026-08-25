(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  if (!stage) return;

  function enhance() {
    stage.querySelectorAll('.veda-family > h3').forEach(h3 => {
      const name = h3.textContent.trim();
      if (!name) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'shastra-name veda-family-name';
      button.dataset.name = name;
      button.dataset.kind = 'Veda';
      button.innerHTML = `<span>${name}</span><small>Veda overview</small>`;
      h3.replaceWith(button);
    });
  }

  enhance();
  new MutationObserver(enhance).observe(stage, {childList:true, subtree:true});
})();