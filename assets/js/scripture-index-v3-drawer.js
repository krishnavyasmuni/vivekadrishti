(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const splitWitnesses = value => String(value || '').split(' · ').map(s => s.trim()).filter(Boolean);

  let backdrop = null;
  let drawer = null;

  function closeDrawer() {
    if (backdrop) backdrop.remove();
    if (drawer) drawer.remove();
    backdrop = null;
    drawer = null;
    root.querySelectorAll('.shastra-name.is-active').forEach(el => {
      el.classList.remove('is-active');
      el.setAttribute('aria-pressed', 'false');
    });
    document.documentElement.classList.remove('scripture-drawer-open');
  }

  function row(label, value) {
    if (!value) return '';
    return `<div class="scripture-drawer-row"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
  }

  function witnessBlock(label, values) {
    if (!values.length) return '';
    return `<section class="scripture-drawer-witness"><h4>${esc(label)}</h4><ul>${values.map(v => `<li>${esc(v)}</li>`).join('')}</ul></section>`;
  }

  function proseSection(label, value, extraClass = '') {
    if (!value) return '';
    return `<section class="scripture-drawer-section ${extraClass}"><h4>${esc(label)}</h4><p>${esc(value)}</p></section>`;
  }

  function listSection(label, values, extraClass = '') {
    if (!Array.isArray(values) || !values.length) return '';
    return `<section class="scripture-drawer-section ${extraClass}"><h4>${esc(label)}</h4><ul>${values.map(v => `<li>${esc(v)}</li>`).join('')}</ul></section>`;
  }

  function fallbackReference(name, kind, d) {
    if (kind === 'Upaniṣad') return {
      overview: `${name} is one of the Upaniṣads included in the 108-text Muktikā enumeration. On this page it is placed in the traditional ${d.type || 'minor'} group and associated with ${d.veda || 'its transmitted Veda'}; the Muktikā supplies the name/Veda association, while thematic grouping belongs to the later received organization of the minor Upaniṣads.`,
      themes: [d.type || 'Upaniṣadic teaching', 'Ātman, brahman and liberation', 'Later Upaniṣadic tradition'],
      status: 'A complete individualized research note has not yet been securely established beyond the transmitted text and catalogue evidence.',
      significance: 'Its presence documents the breadth of the later Upaniṣadic corpus beyond the earliest principal texts.',
      sources: ['Muktikā Upaniṣad — 108-name/Veda list', 'Minor Upaniṣad editions and manuscript catalogues']
    };
    if (kind === 'Mahāpurāṇa' || kind === 'Upapurāṇa' || kind === 'Both') return {
      overview: `${name} is a Purāṇic title attested by the scriptural witness or witnesses shown above. Where the surviving textual identity is uncertain, this entry intentionally does not infer contents merely from the title.`,
      themes: ['Purāṇic catalogue and textual transmission'],
      status: 'Further content description requires a securely identified recension of this exact title.',
      significance: 'The direct śāstric attestation is itself important evidence for the history of Purāṇic classification.',
      sources: ['Purāṇic catalogue passage(s) shown above', 'R. C. Hazra, Studies in the Upapurāṇas', 'Purāṇa manuscript catalogues']
    };
    if (kind === 'Smṛti') return {
      overview: `${name} is named in the scriptural Dharma/Smṛti enumeration shown above. Many ancient Smṛti authorities survive only incompletely or through later quotation, so the name of an authority does not always correspond to one securely preserved continuous book.`,
      themes: ['Dharma authority', 'Conduct, ritual and/or law'],
      status: 'Textual survival varies by authority and recension.',
      significance: 'The entry records a Dharma authority named by śāstra itself.',
      sources: ['Scriptural Smṛti source shown above', 'P. V. Kane, History of Dharmaśāstra', 'Dharmaśāstra textual studies']
    };
    return null;
  }

  function detailsFor(button) {
    const d = button.dataset;
    const name = d.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim();
    const kind = d.kind || '';
    const rows = [];
    const blocks = [];

    if (kind === 'Upaniṣad') {
      rows.push(['Text class', 'Upaniṣad']);
      rows.push(['Traditional group', d.type || '']);
      rows.push(['Veda association', d.veda || '']);
      rows.push(['List basis', 'Muktikā Upaniṣad — 108-name/Veda association']);
    } else if (kind === 'Saṃhitā' || kind === 'Brāhmaṇa' || kind === 'Āraṇyaka') {
      rows.push(['Vedic layer', kind]);
      rows.push(['Veda', d.veda || '']);
      rows.push(['Śākhā / recension', d.branch || '']);
    } else if (kind === 'Mahāpurāṇa' || kind === 'Upapurāṇa' || kind === 'Both') {
      rows.push(['Purāṇa status', kind === 'Both' ? 'Attested as both Mahāpurāṇa and Upapurāṇa' : kind]);
      rows.push(['Sectarian grouping', d.sect || 'Mixed / composite']);
      const maha = splitWitnesses(d.maha);
      const upa = splitWitnesses(d.upa);
      if (maha.length) blocks.push(['Mahāpurāṇa attestations', maha]);
      if (upa.length) blocks.push(['Upapurāṇa attestations', upa]);
    } else if (kind === 'Smṛti') {
      rows.push(['Text class', 'Smṛti / Dharma authority']);
      rows.push(['Classification', d.group || 'Named Smṛti authority']);
      rows.push(['Scriptural source', d.source || '']);
    } else if (kind === 'Itihāsa') {
      rows.push(['Text class', 'Itihāsa']);
    } else if (kind === 'Vedāṅga') {
      rows.push(['Text class', 'Vedāṅga']);
      rows.push(['Scriptural source', d.source || 'Muṇḍaka Upaniṣad 1.1.5']);
    } else {
      if (kind) rows.push(['Text class', kind]);
      if (d.source) rows.push(['Scriptural source', d.source]);
    }

    const researched = window.SCRIPTURE_DETAIL_DATA?.[name] || fallbackReference(name, kind, d);
    return { name, rows, blocks, researched };
  }

  function renderResearch(entry) {
    if (!entry) return '';
    return [
      proseSection('Overview', entry.overview),
      listSection('Contents & themes', entry.themes),
      proseSection('Structure', entry.structure),
      proseSection('Textual status', entry.status, 'is-status'),
      proseSection('Why it matters', entry.significance),
      listSection('Sources consulted', entry.sources, 'scripture-drawer-sources')
    ].join('');
  }

  function openDrawer(button) {
    closeDrawer();

    root.querySelectorAll('.shastra-name.is-active').forEach(el => {
      el.classList.remove('is-active');
      el.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');

    const info = detailsFor(button);
    backdrop = document.createElement('div');
    backdrop.className = 'scripture-drawer-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    drawer = document.createElement('aside');
    drawer.className = 'scripture-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', `Details for ${info.name}`);
    drawer.innerHTML = `
      <div class="scripture-drawer-head">
        <div>
          <span class="scripture-drawer-kicker">Scripture index</span>
          <h3>${esc(info.name)}</h3>
        </div>
        <button type="button" class="scripture-drawer-close" aria-label="Close details">×</button>
      </div>
      <div class="scripture-drawer-body">
        ${info.rows.length ? `<dl class="scripture-drawer-meta">${info.rows.map(([k,v]) => row(k,v)).join('')}</dl>` : ''}
        ${info.blocks.map(([label,values]) => witnessBlock(label,values)).join('')}
        ${renderResearch(info.researched)}
      </div>`;

    document.body.append(backdrop, drawer);
    document.documentElement.classList.add('scripture-drawer-open');
    drawer.querySelector('.scripture-drawer-close')?.focus({ preventScroll: true });
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('.shastra-name');
    if (!button || !root.contains(button)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openDrawer(button);
  }, true);

  document.addEventListener('click', event => {
    if (event.target === backdrop || event.target.closest('.scripture-drawer-close')) closeDrawer();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer) closeDrawer();
  });
})();
