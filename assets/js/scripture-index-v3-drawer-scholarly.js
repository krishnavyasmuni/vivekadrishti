(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  // Exact scope requested for the encyclopedia reader. Kena keeps its bespoke page.
  const ELIGIBLE = new Set([
    'Veda', 'Saṃhitā', 'Brāhmaṇa', 'Āraṇyaka',
    'Upaniṣad',
    'Mahāpurāṇa', 'Upapurāṇa', 'Both',
    'Itihāsa', 'Smṛti'
  ]);

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const split = v => String(v || '').split(' · ').map(x => x.trim()).filter(Boolean);
  const plain = x => typeof x === 'string' ? x : (x?.claim || x?.text || x?.full || x?.short || '');
  const uniq = xs => [...new Set(xs.map(plain).filter(Boolean))];
  const p = html => html ? `<p>${html}</p>` : '';
  const short = (v, n = 155) => {
    const s = String(v || '').trim();
    return s.length > n ? `${s.slice(0, n - 1).trim()}…` : s;
  };

  let backdrop = null;
  let reader = null;

  function keyFor(kind, name) {
    if (kind === 'Upaniṣad') return `Upaniṣad:${name}`;
    if (kind === 'Smṛti') return `Smṛti:${name}`;
    if (kind === 'Itihāsa') return `Itihāsa:${name}`;
    if (kind === 'Veda') return `Vedic:${name}`;
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind)) return `Purāṇa:${name}`;
    if (['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(kind)) return `Vedic:${name}`;
    return `${kind}:${name}`;
  }

  function infoFor(button) {
    const d = button.dataset;
    return {
      name: d.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim(),
      kind: d.kind || '',
      veda: d.veda || '',
      type: d.type || '',
      branch: d.branch || '',
      sect: d.sect || '',
      source: d.source || '',
      group: d.group || '',
      maha: split(d.maha),
      upa: split(d.upa)
    };
  }

  function resolveEntry(info) {
    const D = window.SCRIPTURE_DETAIL_DATA || {};
    const base = D[info.name] || {};
    const exact = D[keyFor(info.kind, info.name)] || {};
    return Object.assign({}, base, exact);
  }

  function close() {
    backdrop?.remove();
    reader?.remove();
    backdrop = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
  }

  function sourceList(entry, info) {
    return uniq([
      ...arr(entry.bibliography),
      ...arr(entry.sources),
      info.source,
      ...info.maha,
      ...info.upa
    ]);
  }

  function categorySentence(info) {
    if (info.kind === 'Veda') {
      return `This page is the overview for the <b>${esc(info.name)}</b> textual tradition. The individual Saṃhitā recensions, Brāhmaṇas and Āraṇyakas belonging to it have their own entries below in the index.`;
    }
    if (info.kind === 'Saṃhitā') {
      return `This is a <i>Saṃhitā</i>: the collected mantra or liturgical text of a Vedic school.${info.veda ? ` It belongs to the ${esc(info.veda)}.` : ''}${info.branch ? ` The version represented here is the ${esc(info.branch)} tradition.` : ''}`;
    }
    if (info.kind === 'Brāhmaṇa') {
      return `This is a <i>Brāhmaṇa</i>, a Vedic prose work that explains sacrifice, priestly procedure and the meanings attached to ritual acts.${info.veda ? ` It belongs to the ${esc(info.veda)}.` : ''}${info.branch ? ` Its school is ${esc(info.branch)}.` : ''}`;
    }
    if (info.kind === 'Āraṇyaka') {
      return `This is an <i>Āraṇyaka</i>, conventionally called a “forest text”: a Vedic layer in which ritual explanation often gives way to symbolic and contemplative interpretation.${info.veda ? ` It belongs to the ${esc(info.veda)}.` : ''}`;
    }
    if (info.kind === 'Upaniṣad') {
      const parts = [`This is an <i>Upaniṣad</i>, a work transmitted as Vedic revelation.`];
      if (info.veda) parts.push(`The received 108-Upaniṣad canon associates it with the ${esc(info.veda)}.`);
      if (info.type) parts.push(`That same later canon groups it under ${esc(info.type)}.`);
      return parts.join(' ');
    }
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(info.kind)) {
      const status = info.kind === 'Both'
        ? 'Traditional catalogues place this title in more than one category.'
        : `The index records it here as a ${esc(info.kind)}.`;
      return `A <i>Purāṇa</i> can combine mythology, genealogy, ritual, pilgrimage, theology, cosmology and social teaching; it is not simply a book of stories. ${status}`;
    }
    if (info.kind === 'Itihāsa') {
      return `The traditional category <i>Itihāsa</i> refers here to the Sanskrit epics. These are layered works whose narrative, theology, ethics and political reflection developed through long textual histories.`;
    }
    if (info.kind === 'Smṛti') {
      return `<i>Smṛti</i> means “remembered tradition.” Here it refers to Dharma authorities represented in traditional lists; those lists differ, so the index does not pretend there was one universally fixed list.`;
    }
    return '';
  }

  function list(items, ordered = false) {
    const xs = uniq(arr(items));
    if (!xs.length) return '';
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag}>${xs.map(x => `<li>${esc(x)}</li>`).join('')}</${tag}>`;
  }

  function infoBox(info, entry, refs) {
    const rows = [];
    rows.push(['Type', info.kind]);
    if (info.veda) rows.push(['Veda', info.veda]);
    if (info.branch) rows.push(['School / recension', info.branch]);
    if (info.type) rows.push(['Traditional group', info.type]);
    if (info.sect) rows.push(['Sectarian grouping', info.sect]);
    if (info.group) rows.push(['List classification', info.group]);
    if (entry.period) rows.push(['Date', short(entry.period)]);
    if (info.maha.length) rows.push(['Mahāpurāṇa lists', `${info.maha.length} indexed witness${info.maha.length === 1 ? '' : 'es'}`]);
    if (info.upa.length) rows.push(['Upapurāṇa lists', `${info.upa.length} indexed witness${info.upa.length === 1 ? '' : 'es'}`]);
    if (refs.length) rows.push(['Sources', `${refs.length} listed below`]);
    return `<aside class="kena-infobox"><div class="kena-infobox-title">${esc(info.name)}</div>${rows.map(([k,v]) => `<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function historySection(entry) {
    let body = '';
    if (entry.period) body += `<h3>When was it composed?</h3>${p(esc(entry.period))}`;
    if (entry.milieu) body += `<h3>Historical setting</h3>${p(esc(entry.milieu))}`;
    if (entry.history) body += `<h3>How the text took shape</h3>${p(esc(entry.history))}`;
    if (entry.datingBasis) body += `<h3>Why scholars date it this way</h3>${p(esc(entry.datingBasis))}`;
    return body ? `<section class="kena-section" id="scripture-history"><h2>History and date</h2>${body}</section>` : '';
  }

  function structureSection(info, entry) {
    const map = uniq(arr(entry.chapterMap));
    const contents = uniq([...arr(entry.contents), ...arr(entry.keyContents)]);
    const features = uniq(arr(entry.namedFeatures));
    const primary = uniq([...arr(entry.primaryEvidence), ...arr(entry.primaryPassages)]);
    let body = entry.structure ? p(esc(entry.structure)) : '';

    if (info.kind === 'Upaniṣad') body += `<div class="kena-note"><b>Numbering.</b> Words such as <i>khaṇḍa</i>, <i>vallī</i> and <i>adhyāya</i> are traditional names for sections or chapters. The exact system differs from one Upaniṣad to another.</div>`;
    if (['Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(info.kind)) body += `<div class="kena-note"><b>Numbering.</b> Vedic books use different names for their divisions—such as <i>maṇḍala</i>, <i>kāṇḍa</i>, <i>prapāṭhaka</i> and <i>adhyāya</i>. They are traditional units, roughly comparable to books, parts, lessons or chapters depending on the work.</div>`;
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(info.kind)) body += `<div class="kena-note"><b>Numbering.</b> A Purāṇa may call a major division a <i>skandha</i>, <i>aṃśa</i> or <i>khaṇḍa</i>. In plain English these are books or sections; the terminology varies by text.</div>`;

    if (map.length) body += `<h3>How it is arranged</h3><div class="kena-structure">${map.map((x,i) => `<div class="kena-structure-row"><b>Part ${i + 1}</b><span>${esc(x)}</span></div>`).join('')}</div>`;
    if (contents.length) body += `<h3>What is actually in the text</h3>${list(contents)}`;
    if (features.length) body += `<h3>Important episodes, doctrines or rites</h3>${list(features)}`;
    if (primary.length) body += `<h3>Primary passages worth checking</h3>${list(primary)}`;
    return body ? `<section class="kena-section" id="scripture-structure"><h2>Structure and contents</h2>${body}</section>` : '';
  }

  function transmissionSection(info, entry) {
    const deps = uniq(arr(entry.dependencies));
    let body = '';
    if (info.branch) body += p(`The label <b>${esc(info.branch)}</b> identifies the transmitted school or version represented by this entry. A “recension” is simply a traditional form of a text preserved by a particular school or line of transmission.`);
    if (entry.manuscripts) body += `<h3>Manuscripts and recensions</h3>${p(esc(entry.manuscripts))}`;
    if (deps.length) body += `<h3>Parallels, borrowings and related texts</h3>${list(deps)}`;
    if (entry.status) body += `<h3>What is uncertain</h3><div class="kena-note">${esc(entry.status)}</div>`;
    if (info.maha.length || info.upa.length) {
      body += `<h3>Why the Purāṇa classification is not simple</h3>`;
      if (info.maha.length) body += p(`The following traditional sources call this a Mahāpurāṇa: ${esc(info.maha.join('; '))}.`);
      if (info.upa.length) body += p(`The following traditional sources call it an Upapurāṇa: ${esc(info.upa.join('; '))}.`);
      if (info.maha.length && info.upa.length) body += p(`That overlap is why this index preserves both attestations instead of forcing the title into one modern category.`);
    }
    return body ? `<section class="kena-section" id="scripture-transmission"><h2>Text and transmission</h2>${body}</section>` : '';
  }

  function ideasSection(entry) {
    const themes = uniq(arr(entry.themes));
    let body = '';
    if (entry.profile) body += `<h3>Religious or philosophical profile</h3>${p(esc(entry.profile))}`;
    if (themes.length) body += `<h3>Main ideas and concerns</h3>${list(themes)}`;
    if (entry.ritualHistory) body += `<h3>Ritual and social evidence</h3>${p(esc(entry.ritualHistory))}`;
    return body ? `<section class="kena-section" id="scripture-ideas"><h2>Ideas, ritual and theology</h2>${body}</section>` : '';
  }

  function receptionSection(entry) {
    const positions = uniq(arr(entry.scholarlyPositions));
    const debates = uniq(arr(entry.scholarlyDebates));
    let body = '';
    if (entry.reception) body += `<h3>Later reception</h3>${p(esc(entry.reception))}`;
    if (entry.significance) body += `<h3>Why it matters</h3>${p(esc(entry.significance))}`;
    if (positions.length) body += `<h3>What named scholars argue</h3>${list(positions)}`;
    if (debates.length) body += `<h3>Where scholars disagree</h3>${list(debates)}`;
    if (entry.hazraNotes) body += `<h3>Specialist textual analysis</h3>${p(esc(entry.hazraNotes))}`;
    return body ? `<section class="kena-section" id="scripture-reception"><h2>Reception and scholarship</h2>${body}</section>` : '';
  }

  function referencesSection(refs) {
    return refs.length ? `<section class="kena-section kena-references" id="scripture-references"><h2>References</h2><ol>${refs.map((r,i) => `<li id="scripture-ref-${i + 1}">${esc(r)}</li>`).join('')}</ol></section>` : '';
  }

  function article(info, entry) {
    const refs = sourceList(entry, info);
    const intro = entry.overview || entry.summary || '';
    const sections = [
      historySection(entry),
      structureSection(info, entry),
      transmissionSection(info, entry),
      ideasSection(entry),
      receptionSection(entry),
      referencesSection(refs)
    ].filter(Boolean);
    const toc = sections.map(section => {
      const id = section.match(/id="([^"]+)"/)?.[1] || '';
      const h = section.match(/<h2>([^<]+)<\/h2>/)?.[1] || '';
      return id && h ? [id,h] : null;
    }).filter(Boolean);

    return `<div class="kena-article" id="scripture-top">${infoBox(info, entry, refs)}<div class="kena-lead">${intro ? p(esc(intro)) : p(`<b>${esc(info.name)}</b> has an indexed entry, but its individual research description still needs to be completed.`)}${p(categorySentence(info))}</div>${toc.length ? `<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc.map(([id,label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('')}</ol></nav>` : ''}${sections.join('')}</div>`;
  }

  function open(button) {
    const info = infoFor(button);
    if (!ELIGIBLE.has(info.kind)) return;
    if (info.kind === 'Upaniṣad' && info.name === 'Kena') return;
    close();
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
    const entry = resolveEntry(info);
    backdrop = document.createElement('div');
    backdrop.className = 'kena-article-backdrop';
    reader = document.createElement('section');
    reader.className = 'kena-article-reader';
    reader.setAttribute('role', 'dialog');
    reader.setAttribute('aria-modal', 'true');
    reader.setAttribute('aria-label', `${info.name} encyclopedia article`);
    reader.innerHTML = `<header class="kena-article-head"><div><span class="eyebrow">Scripture encyclopedia</span><h1>${esc(info.name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${article(info, entry)}</div>`;
    document.body.append(backdrop, reader);
    document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('.shastra-name');
    if (!button || !root.contains(button)) return;
    const info = infoFor(button);
    if (!ELIGIBLE.has(info.kind)) return;
    if (info.kind === 'Upaniṣad' && info.name === 'Kena') return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    open(button);
  }, true);

  document.addEventListener('click', event => {
    if (event.target === backdrop || event.target.closest('.kena-article-close')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && reader) close();
  });

  window.SCRIPTURE_ENCYCLOPEDIA_SCOPE = [...ELIGIBLE];
})();
