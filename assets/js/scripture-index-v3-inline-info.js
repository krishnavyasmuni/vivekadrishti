(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  if (!stage) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const splitWitnesses = value => String(value || '').split(' · ').map(v => v.trim()).filter(Boolean);

  function unwrapOtherStacks(currentButton) {
    stage.querySelectorAll('.shastra-card-stack').forEach(stack => {
      if (stack.contains(currentButton)) return;
      const oldButton = stack.querySelector('.shastra-name');
      if (oldButton) stack.replaceWith(oldButton);
      else stack.remove();
    });
  }

  function ensureStack(button) {
    let stack = button.closest('.shastra-card-stack');
    if (stack) return stack;
    stack = document.createElement('div');
    stack.className = 'shastra-card-stack';
    button.parentNode.insertBefore(stack, button);
    stack.appendChild(button);
    return stack;
  }

  function detailRow(label, value) {
    if (!value) return '';
    return `<div class="inline-detail-row"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;
  }

  function witnessBlock(label, values) {
    if (!values.length) return '';
    return `<div class="inline-witness-block"><div class="inline-witness-label">${esc(label)}</div>${values.map(value => `<div class="inline-witness">${esc(value)}</div>`).join('')}</div>`;
  }

  function buildDetails(button) {
    const d = button.dataset;
    const kind = d.kind || '';
    const name = d.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim();
    const isPurana = ['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind);
    let placement = '';

    if (isPurana) placement = `Purāṇas → ${kind}${d.sect ? ` → ${d.sect}` : ''}`;
    else if (kind === 'Upaniṣad') placement = `108 Upaniṣads${d.type ? ` → ${d.type}` : ''}`;
    else if (kind === 'Smṛti') placement = `Smṛti${d.group ? ` → ${d.group}` : ''}`;
    else if (d.veda && kind) placement = `${d.veda} → ${kind}`;
    else placement = kind;

    let html = `<div class="inline-info-head"><div><strong>${esc(name)}</strong>${placement ? `<small>${esc(placement)}</small>` : ''}</div><button type="button" class="inline-info-close" aria-label="Close details">×</button></div>`;
    html += '<div class="inline-info-body">';

    if (isPurana) {
      html += detailRow('Status', kind);
      html += detailRow('Sect', d.sect);
      html += witnessBlock('Mahāpurāṇa attestation', splitWitnesses(d.maha));
      html += witnessBlock('Upapurāṇa attestation', splitWitnesses(d.upa));
    } else if (kind === 'Upaniṣad') {
      html += detailRow('Category', 'Upaniṣad');
      html += detailRow('Traditional group', d.type);
      html += detailRow('Veda association', d.veda);
    } else if (kind === 'Smṛti') {
      html += detailRow('Category', 'Smṛti');
      html += detailRow('Class', d.group);
      html += witnessBlock('Scriptural source', splitWitnesses(d.source));
    } else {
      html += detailRow('Text layer / category', kind);
      html += detailRow('Veda', d.veda);
      html += detailRow('Śākhā / recension', d.branch);
      html += witnessBlock('Scriptural source', splitWitnesses(d.source));
    }

    html += '</div>';
    return html;
  }

  root.addEventListener('click', event => {
    const close = event.target.closest('.inline-info-close');
    if (close && stage.contains(close)) {
      const stack = close.closest('.shastra-card-stack');
      const button = stack?.querySelector('.shastra-name');
      if (button) {
        button.classList.remove('is-active');
        button.setAttribute('aria-pressed', 'false');
        stack.replaceWith(button);
      }
      return;
    }

    const button = event.target.closest('.shastra-name');
    if (!button || !stage.contains(button)) return;

    requestAnimationFrame(() => {
      unwrapOtherStacks(button);
      const panel = stage.querySelector('.shastra-info');
      if (!panel) return;
      const stack = ensureStack(button);
      panel.classList.add('shastra-info-inline');
      panel.innerHTML = buildDetails(button);
      stack.appendChild(panel);
    });
  });
})();