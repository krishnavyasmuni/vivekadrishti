(() => {
  'use strict';

  const ALLOWED = new Set([
    'Veda', 'Saṃhitā', 'Brāhmaṇa', 'Āraṇyaka', 'Upaniṣad',
    'Mahāpurāṇa', 'Upapurāṇa', 'Both', 'Itihāsa', 'Smṛti', 'Vedāṅga'
  ]);

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
  const arr = value => Array.isArray(value) ? value.filter(Boolean) : (value ? [value] : []);
  const plain = value => typeof value === 'string' ? value : (value?.claim || value?.text || value?.full || value?.short || '');
  const uniq = values => [...new Set(values.map(plain).map(x => String(x || '').trim()).filter(Boolean))];
  const splitWitnesses = value => String(value || '').split(' · ').map(x => x.trim()).filter(Boolean);
  const para = html => html ? `<p>${html}</p>` : '';

  let backdrop = null;
  let reader = null;
  let activeButton = null;

  function infoFor(button) {
    const d = button.dataset || {};
    return {
      name: d.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim(),
      kind: d.kind || '',
      veda: d.veda || '',
      branch: d.branch || '',
      type: d.type || '',
      sect: d.sect || '',
      group: d.group || '',
      source: d.source || '',
      maha: splitWitnesses(d.maha),
      upa: splitWitnesses(d.upa)
    };
  }

  function exactKey(info) {
    if (info.kind === 'Upaniṣad') return `Upaniṣad:${info.name}`;
    if (info.kind === 'Smṛti') return `Smṛti:${info.name}`;
    if (info.kind === 'Itihāsa') return `Itihāsa:${info.name}`;
    if (info.kind === 'Vedāṅga') return `Vedāṅga:${info.name}`;
    if (info.kind === 'Veda' || ['Saṃhitā', 'Brāhmaṇa', 'Āraṇyaka'].includes(info.kind)) return `Vedic:${info.name}`;
    if (['Mahāpurāṇa', 'Upapurāṇa', 'Both'].includes(info.kind)) return `Purāṇa:${info.name}`;
    return `${info.kind}:${info.name}`;
  }

  function entryFor(info) {
    const data = window.SCRIPTURE_DETAIL_DATA || {};
    return Object.assign({}, data[info.name] || {}, data[exactKey(info)] || {});
  }

  function contextualOverview(info) {
    const name = `<b>${esc(info.name)}</b>`;
    if (info.kind === 'Veda') {
      return `${name} is one of the major Vedic textual traditions represented in this index. A Veda is not a single modern-style book: each tradition can include one or more Saṃhitā recensions, ritual Brāhmaṇas, Āraṇyakas, and texts later treated as Upaniṣads. This page gives the family-level overview, while the individual works beneath it have their own entries.`;
    }
    if (info.kind === 'Saṃhitā') {
      return `${name} is a Vedic Saṃhitā, meaning a received collection of mantras or liturgical material transmitted by a particular Vedic school.${info.veda ? ` It belongs to the ${esc(info.veda)}.` : ''}${info.branch ? ` The recension or school shown here is ${esc(info.branch)}.` : ''} Its history has to be studied as the history of that particular transmitted text, not as though every Veda survives in one uniform version.`;
    }
    if (info.kind === 'Brāhmaṇa') {
      return `${name} is a Brāhmaṇa text${info.veda ? ` belonging to the ${esc(info.veda)}` : ''}. Brāhmaṇas explain sacrificial actions, priestly roles, formulae, myths and the symbolic reasoning that makes a rite meaningful. They are essential evidence for the development of Vedic ritual and for the intellectual world out of which the early Upaniṣads emerged.`;
    }
    if (info.kind === 'Āraṇyaka') {
      return `${name} is an Āraṇyaka${info.veda ? ` associated with the ${esc(info.veda)}` : ''}. The label is conventionally translated “forest text,” but these works are better understood as late-Vedic textual layers in which ritual interpretation becomes increasingly symbolic, contemplative and speculative. The boundary between an Āraṇyaka and an Upaniṣad is often not sharp.`;
    }
    if (info.kind === 'Upaniṣad') {
      return `${name} is one of the Upaniṣads included in the received 108-text canon.${info.veda ? ` That later classification associates it with the ${esc(info.veda)}.` : ''}${info.type ? ` It is grouped there as ${esc(info.type)}.` : ''} The 108 texts are not all the same age or literary type, so each entry must be read on its own historical evidence rather than assuming that every Upaniṣad belongs to the earliest Vedic period.`;
    }
    if (['Mahāpurāṇa', 'Upapurāṇa', 'Both'].includes(info.kind)) {
      const catalogue = info.kind === 'Both' ? 'appears under more than one traditional catalogue label' : `is listed here as a ${esc(info.kind)}`;
      return `${name} is a Purāṇic work that ${catalogue}. Purāṇas are composite Sanskrit textual traditions that may combine cosmology, myth, genealogy, pilgrimage, ritual, law, sacred geography and sectarian theology. Their titles, contents and classification can change across manuscripts and traditional lists, so this page preserves the evidence rather than forcing every work into one fixed modern canon.`;
    }
    if (info.kind === 'Smṛti') {
      return `${name} is named as a Dharma authority in one or more of the Smṛti lists represented in this index.${info.source ? ` The card you opened is attested in ${esc(info.source)}.` : ''} Some such authorities survive as substantial independent texts; others are known mainly through quotations, later compilations or works transmitted under an ancient sage-name. The page therefore distinguishes the authority-name from whatever textual corpus actually survives.`;
    }
    if (info.kind === 'Itihāsa') {
      return `${name} is one of the two great Sanskrit Itihāsa traditions. “Itihāsa” is the traditional category of the epics, but these works are much more than narrative: they preserve theology, ethics, law, political reflection, pilgrimage, ritual teaching and philosophical debate through long histories of oral and written transmission.`;
    }
    if (info.kind === 'Vedāṅga') {
      return `${name} is one of the six Vedāṅgas, the technical “limbs of the Veda” used to preserve, perform and interpret Vedic tradition. The six disciplines are phonetics, ritual procedure, grammar, etymology, metre and astral/calendrical calculation; each developed its own technical literature rather than being a single chapter attached to one Veda.`;
    }
    return `${name} is an indexed Hindu textual tradition.`;
  }

  function historyFallback(info) {
    if (info.kind === 'Smṛti') return `The date of a Smṛti authority cannot be inferred from the antiquity of the sage-name alone. When a securely transmitted work survives, dating depends on language, legal institutions, quotations, manuscript history and comparison with other Dharma texts. When only attributed fragments survive, the responsible description is the history of those quotations rather than an invented date for a lost book.`;
    if (['Mahāpurāṇa', 'Upapurāṇa', 'Both'].includes(info.kind)) return `Purāṇic works are normally layered. A title may contain material from different centuries, and the date of the oldest recoverable layer can be very different from the date of the surviving redaction. A single “composition date” is therefore often misleading.`;
    if (['Veda', 'Saṃhitā', 'Brāhmaṇa', 'Āraṇyaka'].includes(info.kind)) return `Vedic chronology is relative rather than exact. Scholars compare language, ritual development, relationships between schools and internal cross-references. The surviving manuscript is much later than the period in which the text was first shaped, because Vedic transmission was primarily oral for many centuries.`;
    if (info.kind === 'Vedāṅga') return `Vedāṅga disciplines developed over long periods. The earliest material may belong to late-Vedic school traditions, while the best-known surviving manuals can be considerably later. Individual texts therefore need individual dates.`;
    return `The work's chronology is reconstructed from language, literary relationships, quotations, manuscript evidence and the historical institutions reflected in the text. Where the evidence does not justify a precise date, this page leaves the uncertainty visible.`;
  }

  function transmissionFallback(info) {
    const parts = [];
    if (info.branch) parts.push(`This entry belongs to the ${esc(info.branch)} transmitted school or recension.`);
    if (info.veda && !info.branch) parts.push(`The index associates this work with the ${esc(info.veda)}.`);
    if (info.maha.length) parts.push(`Traditional sources calling it a Mahāpurāṇa: ${esc(info.maha.join('; '))}.`);
    if (info.upa.length) parts.push(`Traditional sources calling it an Upapurāṇa: ${esc(info.upa.join('; '))}.`);
    if (info.source && info.kind === 'Smṛti') parts.push(`The present list-attestation is ${esc(info.source)}.`);
    if (!parts.length) parts.push(`The transmission history of this particular entry still has to be reconstructed from editions, manuscripts, quotations and traditional catalogues.`);
    return parts.join(' ');
  }

  function listHtml(values) {
    const items = uniq(arr(values));
    return items.length ? `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : '';
  }

  function section(id, title, body) {
    return `<section class="kena-section" id="${id}"><h2>${esc(title)}</h2>${body}</section>`;
  }

  function referencesFor(entry, info) {
    return uniq([
      ...arr(entry.bibliography), ...arr(entry.sources), info.source,
      ...info.maha, ...info.upa
    ]);
  }

  function buildArticle(info, entry) {
    const refs = referencesFor(entry, info);
    const overview = entry.overview || entry.summary || contextualOverview(info);

    const historyParts = [];
    if (entry.period) historyParts.push(`<h3>Date</h3>${para(esc(entry.period))}`);
    if (entry.milieu) historyParts.push(`<h3>Historical setting</h3>${para(esc(entry.milieu))}`);
    if (entry.history) historyParts.push(`<h3>How the text took shape</h3>${para(esc(entry.history))}`);
    if (entry.datingBasis) historyParts.push(`<h3>Why scholars date it this way</h3>${para(esc(entry.datingBasis))}`);
    if (!historyParts.length) historyParts.push(para(historyFallback(info)));

    const structureItems = uniq([
      ...arr(entry.chapterMap), ...arr(entry.contents), ...arr(entry.keyContents)
    ]);
    const featureItems = uniq([
      ...arr(entry.namedFeatures), ...arr(entry.primaryEvidence), ...arr(entry.primaryPassages)
    ]);
    const structureParts = [];
    if (entry.structure) structureParts.push(para(esc(entry.structure)));
    if (structureItems.length) structureParts.push(`<h3>Arrangement and contents</h3>${listHtml(structureItems)}`);
    if (featureItems.length) structureParts.push(`<h3>Important passages, episodes or rites</h3>${listHtml(featureItems)}`);
    if (!structureParts.length) structureParts.push(para(`A reliable chapter-by-chapter synopsis for ${esc(info.name)} has not yet been established in the index data. The entry is still a real article: the missing structural map is stated plainly instead of being filled with invented chapter titles.`));

    const transmissionParts = [];
    if (entry.manuscripts) transmissionParts.push(`<h3>Manuscripts and recensions</h3>${para(esc(entry.manuscripts))}`);
    if (arr(entry.dependencies).length) transmissionParts.push(`<h3>Parallels and related texts</h3>${listHtml(entry.dependencies)}`);
    if (entry.status) transmissionParts.push(`<h3>What remains uncertain</h3><div class="kena-note">${esc(entry.status)}</div>`);
    transmissionParts.push(para(transmissionFallback(info)));

    const ideaParts = [];
    if (entry.profile) ideaParts.push(`<h3>Religious or philosophical profile</h3>${para(esc(entry.profile))}`);
    if (arr(entry.themes).length) ideaParts.push(`<h3>Main themes</h3>${listHtml(entry.themes)}`);
    if (entry.ritualHistory) ideaParts.push(`<h3>Ritual and social evidence</h3>${para(esc(entry.ritualHistory))}`);
    if (!ideaParts.length) ideaParts.push(para(`The main ideas of ${esc(info.name)} need to be described from the text itself rather than inferred from its category-name. This page therefore does not substitute a generic doctrine for text-specific evidence.`));

    const receptionParts = [];
    if (entry.reception) receptionParts.push(`<h3>Later reception</h3>${para(esc(entry.reception))}`);
    if (entry.significance) receptionParts.push(`<h3>Why it matters</h3>${para(esc(entry.significance))}`);
    if (arr(entry.scholarlyPositions).length) receptionParts.push(`<h3>Named scholarly positions</h3>${listHtml(entry.scholarlyPositions)}`);
    if (arr(entry.scholarlyDebates).length) receptionParts.push(`<h3>Where scholars disagree</h3>${listHtml(entry.scholarlyDebates)}`);
    if (entry.hazraNotes) receptionParts.push(`<h3>Specialist textual analysis</h3>${para(esc(entry.hazraNotes))}`);
    if (!receptionParts.length) receptionParts.push(para(`Reception for ${esc(info.name)} varies with the kind of text it is: some works generated major commentarial traditions, while others survive mainly through citation, ritual use or catalogue memory. This section will only make stronger claims when the underlying entry contains evidence for them.`));

    const refBody = refs.length
      ? `<ol>${refs.map((ref, i) => `<li id="scripture-ref-${i + 1}">${esc(ref)}</li>`).join('')}</ol>`
      : para(`No bibliography has yet been attached to this individual entry. The article remains available rather than disappearing, but the absence of references is made explicit.`);

    const rows = [['Type', info.kind]];
    if (info.veda) rows.push(['Veda', info.veda]);
    if (info.branch) rows.push(['School / recension', info.branch]);
    if (info.type) rows.push(['Traditional group', info.type]);
    if (info.sect) rows.push(['Sectarian grouping', info.sect]);
    if (info.group) rows.push(['List classification', info.group]);
    if (entry.period) rows.push(['Date', String(entry.period)]);
    if (refs.length) rows.push(['References', String(refs.length)]);

    const sections = [
      ['scripture-history', 'History and date', historyParts.join('')],
      ['scripture-structure', 'Structure and contents', structureParts.join('')],
      ['scripture-transmission', 'Text and transmission', transmissionParts.join('')],
      ['scripture-ideas', 'Ideas, ritual and theology', ideaParts.join('')],
      ['scripture-reception', 'Reception and scholarship', receptionParts.join('')],
      ['scripture-references', 'References', refBody]
    ];

    const toc = sections.map(([id, title]) => `<li><a href="#${id}">${esc(title)}</a></li>`).join('');
    const infobox = `<aside class="kena-infobox"><div class="kena-infobox-title">${esc(info.name)}</div>${rows.map(([k, v]) => `<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;

    return `<article class="scripture-wiki-article">${infobox}<div class="kena-lead">${para(esc(overview))}${entry.overview || entry.summary ? para(contextualOverview(info)) : ''}</div><nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>${sections.map(([id, title, body]) => section(id, title, body)).join('')}</article>`;
  }

  function closeReader() {
    backdrop?.remove();
    reader?.remove();
    backdrop = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    if (activeButton) {
      activeButton.classList.remove('is-active');
      activeButton.setAttribute('aria-pressed', 'false');
      activeButton = null;
    }
  }

  function openReader(button) {
    const info = infoFor(button);
    if (!ALLOWED.has(info.kind)) return false;
    if (info.kind === 'Upaniṣad' && info.name === 'Kena') return false;

    closeReader();
    activeButton = button;
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');

    const entry = entryFor(info);
    backdrop = document.createElement('div');
    backdrop.className = 'kena-article-backdrop scripture-wiki-backdrop';
    reader = document.createElement('section');
    reader.className = 'kena-article-reader scripture-wiki-reader';
    reader.setAttribute('role', 'dialog');
    reader.setAttribute('aria-modal', 'true');
    reader.setAttribute('aria-label', `${info.name} encyclopedia article`);
    reader.innerHTML = `<header class="kena-article-head"><div><span class="eyebrow">Scripture encyclopedia</span><h1>${esc(info.name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${buildArticle(info, entry)}</div>`;
    document.body.append(backdrop, reader);
    document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.focus({ preventScroll: true });
    return true;
  }

  window.openScriptureEncyclopedia = openReader;
  window.SCRIPTURE_ENCYCLOPEDIA_SCOPE = [...ALLOWED];

  window.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest('#scripture-browser .shastra-name');
    if (!button) return;
    const info = infoFor(button);
    if (!ALLOWED.has(info.kind)) return;
    if (info.kind === 'Upaniṣad' && info.name === 'Kena') return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openReader(button);
  }, true);

  document.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target === backdrop || target.closest('.scripture-wiki-reader .kena-article-close')) closeReader();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && reader) closeReader();
  });
})();
