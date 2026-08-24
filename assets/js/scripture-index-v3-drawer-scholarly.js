(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const split = v => String(v || '').split(' · ').map(x => x.trim()).filter(Boolean);
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const uniq = xs => [...new Set(xs.filter(Boolean).map(x => typeof x === 'string' ? x : (x.claim || x.text || x.full || x.short || JSON.stringify(x))))];
  const short = (v, n = 170) => { const s = String(v || '').trim(); return s.length > n ? `${s.slice(0, n - 1).trim()}…` : s; };
  const P = html => html ? `<p>${html}</p>` : '';
  const cite = nums => nums.length ? `<sup class="kena-cite">${nums.map(n => `<a href="#scripture-ref-${n}">[${n}]</a>`).join('')}</sup>` : '';
  let shade = null;
  let reader = null;

  const close = () => {
    shade?.remove(); reader?.remove(); shade = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
  };

  function keyFor(kind, name) {
    if (kind === 'Upaniṣad') return `Upaniṣad:${name}`;
    if (kind === 'Smṛti') return `Smṛti:${name}`;
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind)) return `Purāṇa:${name}`;
    if (['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(kind)) return `Vedic:${name}`;
    return `${kind}:${name}`;
  }

  function infoFor(button) {
    const d = button.dataset;
    return {
      d,
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

  function corpusExplanation(info) {
    if (info.kind === 'Upaniṣad') {
      const assoc = info.veda ? ` It is traditionally associated with the ${esc(info.veda)}.` : '';
      const cls = info.type ? ` In the later 108-Upaniṣad arrangement it is grouped as ${esc(info.type)}.` : '';
      return `An <i>Upaniṣad</i> is a text transmitted as Vedic revelation and concerned, in very different ways, with knowledge, the self, ultimate reality, meditation, renunciation, ritual or sectarian theology.${assoc}${cls} A later Veda-association tells us how the text was classified in the received canon; by itself it does not prove that every such Upaniṣad is as old as the early Vedic texts.`;
    }
    if (['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(info.kind)) {
      const defs = {
        'Saṃhitā': 'A <i>Saṃhitā</i> is the collected mantra or liturgical layer of a Vedic school.',
        'Brāhmaṇa': 'A <i>Brāhmaṇa</i> is mainly ritual-explanatory prose: it tells priests how rites work, why particular acts are performed, and often preserves myths used to explain them.',
        'Āraṇyaka': 'An <i>Āraṇyaka</i>, conventionally called a “forest text,” stands between detailed ritual exposition and more inward or speculative teaching; the boundary with an Upaniṣad is often not sharp.'
      };
      const school = info.branch ? ` Here the relevant textual school or version is ${esc(info.branch)}.` : '';
      return `${defs[info.kind] || ''}${school}`;
    }
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(info.kind)) {
      const status = info.kind === 'Both' ? 'appears in surviving lists under both labels' : `is listed here as a ${esc(info.kind)}`;
      return `A <i>Purāṇa</i> is not simply a “myth book.” Purāṇic works can contain creation stories, genealogies, pilgrimage guides, ritual rules, theology, law, cosmology and local sacred history. ${esc(info.name)} ${status}. The labels “Mahāpurāṇa” and “Upapurāṇa” come from traditional catalogues, and those catalogues do not always agree with one another.`;
    }
    if (info.kind === 'Smṛti') {
      return `<i>Smṛti</i> literally means “remembered tradition.” In this index the term is being used for Dharma authorities and related normative texts cited in traditional lists. Those lists vary, so inclusion here is evidence of reception and authority, not proof of one fixed, universal canon of eighteen texts.`;
    }
    if (info.kind === 'Itihāsa') {
      return `<i>Itihāsa</i> is the traditional category of the Sanskrit epics. These works are large, layered compositions: narrative, theology, ethics, political reflection, pilgrimage, ritual and philosophical teaching accumulated together over a long history of recitation and redaction.`;
    }
    if (info.kind === 'Vedāṅga') {
      return `The <i>Vedāṅgas</i>, the “limbs of the Veda,” are six technical disciplines needed to preserve, interpret and perform Vedic tradition: phonetics, ritual procedure, grammar, etymology, metre and astral/calendrical calculation.`;
    }
    return `${esc(info.name)} is one of the texts or textual traditions represented in this scripture index.`;
  }

  function fallback(info) {
    return {
      overview: `${info.name} is included here because it belongs to the ${info.kind || 'scriptural'} material represented in this index. The page records what can be said safely from its classification and the evidence attached to this entry rather than inventing a precise history where the sources do not support one.`,
      status: 'A fuller text-specific chronology or manuscript study has not yet been established in the underlying data. Where the evidence is uncertain, this page says so rather than filling the gap with a traditional date presented as historical fact.',
      bibliography: [info.source].filter(Boolean)
    };
  }

  function references(entry, info) {
    const extra = [];
    if (info.source) extra.push(info.source);
    extra.push(...info.maha, ...info.upa);
    return uniq([...arr(entry.bibliography), ...arr(entry.sources), ...extra]);
  }

  function refsForSection(refs, section) {
    if (!refs.length) return [];
    if (section === 'lead') return refs.slice(0, Math.min(2, refs.length)).map((_, i) => i + 1);
    if (section === 'history') return refs.slice(0, Math.min(4, refs.length)).map((_, i) => i + 1);
    if (section === 'reception') return refs.slice(Math.max(0, refs.length - 4)).map((_, i) => refs.length - Math.min(4, refs.length) + i + 1);
    return refs.slice(0, Math.min(3, refs.length)).map((_, i) => i + 1);
  }

  function plainItem(x) {
    if (typeof x === 'string') return x;
    return x?.claim || x?.text || x?.full || x?.short || JSON.stringify(x);
  }

  function listHtml(items, ordered = false) {
    const xs = arr(items).map(plainItem).filter(Boolean);
    if (!xs.length) return '';
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag}>${xs.map(x => `<li>${esc(x)}</li>`).join('')}</${tag}>`;
  }

  function structureHtml(entry, info) {
    const map = arr(entry.chapterMap).map(plainItem).filter(Boolean);
    const contents = uniq([...arr(entry.contents), ...arr(entry.keyContents)]);
    const features = uniq(arr(entry.namedFeatures));
    const evidence = uniq([...arr(entry.primaryEvidence), ...arr(entry.primaryPassages)]);
    const terms = [];
    if (info.kind === 'Upaniṣad') terms.push('A <i>khaṇḍa</i> is simply a section; an <i>adhyāya</i> is a chapter. Different Upaniṣads use different names for their internal divisions.');
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(info.kind)) terms.push('Purāṇas use several words for large divisions—such as <i>skandha</i>, <i>aṃśa</i> and <i>khaṇḍa</i>. In ordinary English these can all be read as book, part or section; the list below follows the terminology of the individual text where it is known.');
    if (['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(info.kind)) terms.push('Vedic works do not all divide themselves like modern books. Terms such as <i>maṇḍala</i>, <i>kāṇḍa</i>, <i>prapāṭhaka</i> and <i>adhyāya</i> are simply different traditional units—roughly “book,” “part,” “lesson” or “chapter,” depending on the text.');
    let html = '';
    if (entry.structure) html += P(esc(entry.structure));
    if (terms.length) html += `<div class="kena-note">${terms.join(' ')}</div>`;
    if (map.length) {
      html += `<h3>How the text is arranged</h3><div class="kena-structure">${map.map((x, i) => `<div class="kena-structure-row"><b>Part ${i + 1}</b><span>${esc(x)}</span></div>`).join('')}</div>`;
    }
    if (contents.length) html += `<h3>What is actually in it</h3>${listHtml(contents)}`;
    if (features.length) html += `<h3>Named episodes, doctrines or rites</h3>${listHtml(features)}`;
    if (evidence.length) html += `<h3>Passages worth checking in the primary text</h3>${listHtml(evidence)}`;
    if (!html) html = P('The surviving data for this entry do not yet give a reliable chapter-by-chapter map. That is better left explicit than replaced with a guessed structure.');
    return html;
  }

  function historyHtml(entry, refs) {
    let html = `<div class="kena-note"><b>How to read dates on this page.</b> Ancient and medieval Sanskrit works were often transmitted for centuries, and many were expanded or rearranged. When scholars speak of a “layer” or “stratum,” they simply mean a part of the present text that may come from a different period than another part. A date below is therefore usually an estimate for a textual layer or received form, not the birthday of one author.</div>`;
    if (entry.period) html += `<h3>Approximate date</h3>${P(`${esc(entry.period)}${cite(refsForSection(refs, 'history'))}`)}`;
    if (entry.milieu) html += `<h3>Where this kind of text belongs</h3>${P(esc(entry.milieu))}`;
    if (entry.history) html += `<h3>How the text took shape</h3>${P(esc(entry.history))}`;
    if (entry.datingBasis) html += `<h3>Why scholars date it that way</h3>${P(esc(entry.datingBasis))}`;
    if (!entry.period && !entry.milieu && !entry.history && !entry.datingBasis) html += P('There is not yet enough text-specific evidence in the index data to give this work a responsible historical date.');
    return html;
  }

  function transmissionHtml(entry, info) {
    const deps = uniq(arr(entry.dependencies));
    let html = `<div class="kena-note"><b>A word about “versions.”</b> Sanskrit texts often survive in more than one traditional form. Scholars call a school-specific or regionally transmitted form a <i>recension</i>. A different reading in one manuscript does not automatically mean that one copy is “wrong”; it may preserve a different branch of the text’s history.</div>`;
    if (info.branch) html += P(`This entry belongs to the <b>${esc(info.branch)}</b> textual school or recension. That label tells you which transmitted Vedic tradition the text is attached to.`);
    if (entry.manuscripts) html += `<h3>Manuscripts and recensions</h3>${P(esc(entry.manuscripts))}`;
    if (deps.length) html += `<h3>Parallels and borrowed material</h3>${listHtml(deps)}`;
    if (entry.status) html += `<h3>What remains uncertain</h3><div class="kena-note">${esc(entry.status)}</div>`;
    if (info.maha.length || info.upa.length) {
      html += '<h3>Traditional catalogue evidence</h3>';
      if (info.maha.length) html += P(`This title is called a Mahāpurāṇa in the following indexed witness${info.maha.length === 1 ? '' : 'es'}: ${esc(info.maha.join('; '))}.`);
      if (info.upa.length) html += P(`It is called an Upapurāṇa in the following indexed witness${info.upa.length === 1 ? '' : 'es'}: ${esc(info.upa.join('; '))}. This is why the index does not force every Purāṇa into a single modern list.`);
    }
    return html;
  }

  function ideasHtml(entry, info) {
    const themes = uniq(arr(entry.themes));
    let html = '';
    if (entry.profile) html += `<h3>Theological or philosophical profile</h3>${P(esc(entry.profile))}`;
    if (themes.length) html += `<h3>Main ideas</h3>${listHtml(themes)}`;
    if (entry.ritualHistory) html += `<h3>Ritual and social evidence</h3>${P(esc(entry.ritualHistory))}`;
    if (!html) html = P(`The main interpretive content for this ${esc(info.kind || 'text')} is still being expanded. The historical and structural sections above record the evidence that is currently secure.`);
    return html;
  }

  function receptionHtml(entry, refs) {
    const positions = uniq(arr(entry.scholarlyPositions));
    const debates = uniq(arr(entry.scholarlyDebates));
    let html = `<div class="kena-note"><b>Commentary versus the original text.</b> A <i>bhāṣya</i> is a detailed commentary. Later Hindu commentators can be indispensable for understanding how a scripture was read, but their interpretation is not automatically identical with the oldest recoverable meaning of the passage. This section keeps reception and historical reconstruction distinct.</div>`;
    if (entry.reception || entry.significance) html += `<h3>Why the text mattered later</h3>${P(`${esc(entry.reception || entry.significance)}${cite(refsForSection(refs, 'reception'))}`)}`;
    if (positions.length) html += `<h3>Named scholarly positions</h3>${listHtml(positions)}`;
    if (debates.length) html += `<h3>Where scholars disagree</h3>${listHtml(debates)}`;
    if (entry.hazraNotes) html += `<h3>Specialist textual analysis</h3>${P(esc(entry.hazraNotes))}`;
    if (!entry.reception && !entry.significance && !positions.length && !debates.length && !entry.hazraNotes) html += P('The index does not yet contain a strong text-specific reception history for this title.');
    return html;
  }

  function infoboxHtml(info, entry, refs) {
    const rows = [];
    rows.push(['Type', info.kind || 'Scriptural text']);
    if (info.veda) rows.push(['Veda', info.veda]);
    if (info.type) rows.push(['Traditional group', info.type]);
    if (info.branch) rows.push(['Vedic school', info.branch]);
    if (info.sect) rows.push(['Sectarian grouping', info.sect]);
    if (info.group) rows.push(['List class', info.group]);
    if (info.source) rows.push(['Indexed from', info.source]);
    if (info.maha.length) rows.push(['Mahāpurāṇa lists', `${info.maha.length} indexed witness${info.maha.length === 1 ? '' : 'es'}`]);
    if (info.upa.length) rows.push(['Upapurāṇa lists', `${info.upa.length} indexed witness${info.upa.length === 1 ? '' : 'es'}`]);
    if (entry.period) rows.push(['Date', short(entry.period, 145)]);
    if (refs.length) rows.push(['References', `${refs.length} sources in this dossier`]);
    return `<aside class="kena-infobox"><div class="kena-infobox-title">${esc(info.name)}</div>${rows.map(([k,v]) => `<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function articleHtml(info, entry) {
    const refs = references(entry, info);
    const leadCite = cite(refsForSection(refs, 'lead'));
    const intro = entry.overview ? `${esc(entry.overview)}${leadCite}` : `${esc(fallback(info).overview)}${leadCite}`;
    const significance = entry.significance ? P(esc(short(entry.significance, 520))) : '';
    const toc = [
      ['scripture-history','History and date'],
      ['scripture-structure','Structure and contents'],
      ['scripture-transmission','Text and transmission'],
      ['scripture-ideas','Ideas, ritual and theology'],
      ['scripture-reception','Reception and scholarly debates'],
      ['scripture-references','References']
    ];
    return `<div class="kena-article" id="scripture-top">
      ${infoboxHtml(info, entry, refs)}
      <div class="kena-lead">
        ${P(intro)}
        ${P(corpusExplanation(info))}
        ${significance}
      </div>
      <nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc.map(([id,t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ol></nav>
      <section class="kena-section" id="scripture-history"><h2>History and date</h2>${historyHtml(entry, refs)}</section>
      <section class="kena-section" id="scripture-structure"><h2>Structure and contents</h2>${structureHtml(entry, info)}</section>
      <section class="kena-section" id="scripture-transmission"><h2>Text and transmission</h2>${transmissionHtml(entry, info)}</section>
      <section class="kena-section" id="scripture-ideas"><h2>Ideas, ritual and theology</h2>${ideasHtml(entry, info)}</section>
      <section class="kena-section" id="scripture-reception"><h2>Reception and scholarly debates</h2>${receptionHtml(entry, refs)}</section>
      <section class="kena-section kena-references" id="scripture-references"><h2>References</h2>${refs.length ? `<ol>${refs.map((r,i) => `<li id="scripture-ref-${i + 1}">${esc(r)}</li>`).join('')}</ol>` : P('No bibliography has yet been attached to this exact entry.')}</section>
    </div>`;
  }

  function open(button) {
    close();
    const info = infoFor(button);
    if (info.name === 'Kena' && info.kind === 'Upaniṣad') return;
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
    const data = window.SCRIPTURE_DETAIL_DATA || {};
    const entry = data[keyFor(info.kind, info.name)] || data[`${info.kind}:${info.name}`] || data[info.name] || fallback(info);

    shade = document.createElement('div');
    shade.className = 'kena-article-backdrop';
    reader = document.createElement('article');
    reader.className = 'kena-article-reader';
    reader.setAttribute('role', 'dialog');
    reader.setAttribute('aria-modal', 'true');
    reader.setAttribute('aria-label', `${info.name} encyclopedia article`);
    reader.innerHTML = `<header class="kena-article-head"><div><span class="eyebrow">Scripture encyclopedia</span><h1>${esc(info.name)}</h1></div><button type="button" class="kena-article-close" aria-label="Close">×</button></header><div class="kena-article-scroll">${articleHtml(info, entry)}</div>`;
    document.body.append(shade, reader);
    document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('.shastra-name');
    if (!b || !root.contains(b)) return;
    const info = infoFor(b);
    if (info.name === 'Kena' && info.kind === 'Upaniṣad') return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    open(b);
  }, true);

  document.addEventListener('click', e => {
    if (e.target === shade || e.target.closest('.kena-article-close')) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && reader) close();
  });
})();
