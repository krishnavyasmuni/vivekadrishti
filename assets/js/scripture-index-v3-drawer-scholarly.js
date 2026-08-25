(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const ELIGIBLE = new Set([
    'Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka','Upaniṣad',
    'Mahāpurāṇa','Upapurāṇa','Both','Itihāsa','Smṛti','Vedāṅga'
  ]);

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const split = v => String(v || '').split(' · ').map(x => x.trim()).filter(Boolean);
  const plain = x => typeof x === 'string' ? x : (x?.claim || x?.text || x?.full || x?.short || '');
  const uniq = xs => [...new Set(xs.map(plain).filter(Boolean))];
  const p = html => html ? `<p>${html}</p>` : '';
  const short = (v, n = 160) => {
    const s = String(v || '').trim();
    return s.length > n ? `${s.slice(0, n - 1).trim()}…` : s;
  };

  let backdrop = null;
  let reader = null;

  function infoFor(button) {
    const d = button.dataset;
    return {
      name: d.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim(),
      kind: d.kind || '', veda: d.veda || '', type: d.type || '', branch: d.branch || '',
      sect: d.sect || '', source: d.source || '', group: d.group || '',
      maha: split(d.maha), upa: split(d.upa)
    };
  }

  function keyFor(info) {
    if (info.kind === 'Upaniṣad') return `Upaniṣad:${info.name}`;
    if (info.kind === 'Smṛti') return `Smṛti:${info.name}`;
    if (info.kind === 'Itihāsa') return `Itihāsa:${info.name}`;
    if (info.kind === 'Vedāṅga') return `Vedāṅga:${info.name}`;
    if (info.kind === 'Veda' || ['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(info.kind)) return `Vedic:${info.name}`;
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(info.kind)) return `Purāṇa:${info.name}`;
    return `${info.kind}:${info.name}`;
  }

  function entryFor(info) {
    const D = window.SCRIPTURE_DETAIL_DATA || {};
    return Object.assign({}, D[info.name] || {}, D[keyFor(info)] || {});
  }

  function refsFor(entry, info) {
    return uniq([...arr(entry.bibliography), ...arr(entry.sources), info.source, ...info.maha, ...info.upa]);
  }

  function categoryText(info) {
    if (info.kind === 'Veda') return `This is the overview page for the ${esc(info.name)} textual tradition. Its individual Saṃhitā recensions, Brāhmaṇas and Āraṇyakas have separate entries in the index.`;
    if (info.kind === 'Saṃhitā') return `A <i>Saṃhitā</i> is the collected mantra or liturgical layer of a Vedic school.${info.veda ? ` This text belongs to the ${esc(info.veda)}.` : ''}${info.branch ? ` The recension shown here is ${esc(info.branch)}.` : ''}`;
    if (info.kind === 'Brāhmaṇa') return `A <i>Brāhmaṇa</i> is primarily ritual-explanatory Vedic prose, preserving detailed sacrificial procedure, myth and theological interpretation.${info.veda ? ` This work belongs to the ${esc(info.veda)}.` : ''}`;
    if (info.kind === 'Āraṇyaka') return `An <i>Āraṇyaka</i> is a Vedic textual layer in which ritual exposition often develops into symbolic, contemplative and speculative interpretation.${info.veda ? ` This work belongs to the ${esc(info.veda)}.` : ''}`;
    if (info.kind === 'Upaniṣad') return `An <i>Upaniṣad</i> is transmitted as Vedic revelation and may treat self, Brahman, meditation, renunciation, ritual or sectarian theology.${info.veda ? ` The received 108-Upaniṣad list associates this text with the ${esc(info.veda)}.` : ''}`;
    if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(info.kind)) return `A <i>Purāṇa</i> can combine cosmology, genealogy, mythology, pilgrimage, ritual, law and theology. Traditional lists do not always agree about which titles are Mahāpurāṇas or Upapurāṇas.`;
    if (info.kind === 'Itihāsa') return `The Sanskrit epics are layered narrative traditions combining story, theology, ethics, law, pilgrimage, political reflection and philosophical teaching.`;
    if (info.kind === 'Smṛti') return `<i>Smṛti</i> means “remembered tradition.” Here the term refers to Dharma authorities preserved in traditional lists, which vary from source to source.`;
    if (info.kind === 'Vedāṅga') return `The <i>Vedāṅgas</i>, “limbs of the Veda,” are the technical disciplines used to preserve, perform and interpret Vedic tradition. ${esc(info.name)} is one of the six classical Vedāṅgas.`;
    return '';
  }

  function listHtml(items) {
    const xs = uniq(arr(items));
    return xs.length ? `<ul>${xs.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
  }

  function infobox(info, entry, refs) {
    const rows = [['Type', info.kind]];
    if (info.veda) rows.push(['Veda', info.veda]);
    if (info.branch) rows.push(['School / recension', info.branch]);
    if (info.type) rows.push(['Traditional group', info.type]);
    if (info.sect) rows.push(['Sectarian grouping', info.sect]);
    if (info.group) rows.push(['List classification', info.group]);
    if (entry.period) rows.push(['Date', short(entry.period)]);
    if (info.maha.length) rows.push(['Mahāpurāṇa witnesses', String(info.maha.length)]);
    if (info.upa.length) rows.push(['Upapurāṇa witnesses', String(info.upa.length)]);
    if (refs.length) rows.push(['References', String(refs.length)]);
    return `<aside class="kena-infobox"><div class="kena-infobox-title">${esc(info.name)}</div>${rows.map(([k,v]) => `<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function section(id, title, body) {
    return body ? `<section class="kena-section" id="${id}"><h2>${esc(title)}</h2>${body}</section>` : '';
  }

  function articleHtml(info, entry) {
    const refs = refsFor(entry, info);
    const lead = entry.overview || entry.summary || `${info.name} is an indexed ${info.kind} text. This article gathers the text-specific information presently available in the index and separates secure evidence from uncertain reconstruction.`;

    let history = '';
    if (entry.period) history += `<h3>Date</h3>${p(esc(entry.period))}`;
    if (entry.milieu) history += `<h3>Historical setting</h3>${p(esc(entry.milieu))}`;
    if (entry.history) history += `<h3>Textual development</h3>${p(esc(entry.history))}`;
    if (entry.datingBasis) history += `<h3>Basis for dating</h3>${p(esc(entry.datingBasis))}`;

    const structureBits = uniq([...arr(entry.chapterMap), ...arr(entry.contents), ...arr(entry.keyContents)]);
    let structure = '';
    if (entry.structure) structure += p(esc(entry.structure));
    if (structureBits.length) structure += `<h3>Arrangement and contents</h3>${listHtml(structureBits)}`;
    const features = uniq([...arr(entry.namedFeatures), ...arr(entry.primaryEvidence), ...arr(entry.primaryPassages)]);
    if (features.length) structure += `<h3>Important passages, episodes or rites</h3>${listHtml(features)}`;

    let transmission = '';
    if (info.branch) transmission += p(`The label <b>${esc(info.branch)}</b> identifies the school or recension represented by this entry.`);
    if (entry.manuscripts) transmission += `<h3>Manuscripts and recensions</h3>${p(esc(entry.manuscripts))}`;
    if (arr(entry.dependencies).length) transmission += `<h3>Parallels and related texts</h3>${listHtml(entry.dependencies)}`;
    if (entry.status) transmission += `<h3>Uncertainties</h3><div class="kena-note">${esc(entry.status)}</div>`;
    if (info.maha.length || info.upa.length) {
      transmission += `<h3>Traditional catalogue evidence</h3>`;
      if (info.maha.length) transmission += p(`Mahāpurāṇa witnesses: ${esc(info.maha.join('; '))}.`);
      if (info.upa.length) transmission += p(`Upapurāṇa witnesses: ${esc(info.upa.join('; '))}.`);
    }

    let ideas = '';
    if (entry.profile) ideas += `<h3>Religious or philosophical profile</h3>${p(esc(entry.profile))}`;
    if (arr(entry.themes).length) ideas += `<h3>Main themes</h3>${listHtml(entry.themes)}`;
    if (entry.ritualHistory) ideas += `<h3>Ritual and social evidence</h3>${p(esc(entry.ritualHistory))}`;

    let reception = '';
    if (entry.reception) reception += `<h3>Later reception</h3>${p(esc(entry.reception))}`;
    if (entry.significance) reception += `<h3>Significance</h3>${p(esc(entry.significance))}`;
    if (arr(entry.scholarlyPositions).length) reception += `<h3>Named scholarly positions</h3>${listHtml(entry.scholarlyPositions)}`;
    if (arr(entry.scholarlyDebates).length) reception += `<h3>Scholarly debates</h3>${listHtml(entry.scholarlyDebates)}`;
    if (entry.hazraNotes) reception += `<h3>Specialist textual analysis</h3>${p(esc(entry.hazraNotes))}`;

    const refsBody = refs.length ? `<ol>${refs.map((r,i) => `<li id="scripture-ref-${i+1}">${esc(r)}</li>`).join('')}</ol>` : '';
    const sections = [
      section('scripture-history','History and date',history),
      section('scripture-structure','Structure and contents',structure),
      section('scripture-transmission','Text and transmission',transmission),
      section('scripture-ideas','Ideas, ritual and theology',ideas),
      section('scripture-reception','Reception and scholarship',reception),
      section('scripture-references','References',refsBody)
    ].filter(Boolean);

    const toc = sections.map(s => {
      const id = s.match(/id="([^"]+)"/)?.[1];
      const title = s.match(/<h2>([^<]+)<\/h2>/)?.[1];
      return id && title ? `<li><a href="#${id}">${esc(title)}</a></li>` : '';
    }).join('');

    return `<article class="scripture-wiki-article">${infobox(info,entry,refs)}<div class="kena-lead">${p(esc(lead))}${p(categoryText(info))}</div>${toc ? `<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>` : ''}${sections.join('')}</article>`;
  }

  function close() {
    backdrop?.remove(); reader?.remove(); backdrop = reader = null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b => {
      b.classList.remove('is-active'); b.setAttribute('aria-pressed','false');
    });
  }

  function open(button) {
    const info = infoFor(button);
    if (!ELIGIBLE.has(info.kind)) return false;
    if (info.kind === 'Upaniṣad' && info.name === 'Kena') return false;
    close();
    button.classList.add('is-active'); button.setAttribute('aria-pressed','true');
    const entry = entryFor(info);
    backdrop = document.createElement('div');
    backdrop.className = 'kena-article-backdrop scripture-wiki-backdrop';
    reader = document.createElement('section');
    reader.className = 'kena-article-reader scripture-wiki-reader';
    reader.setAttribute('role','dialog'); reader.setAttribute('aria-modal','true');
    reader.setAttribute('aria-label', `${info.name} encyclopedia article`);
    reader.innerHTML = `<header class="kena-article-head"><div><span class="eyebrow">Scripture encyclopedia</span><h1>${esc(info.name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${articleHtml(info,entry)}</div>`;
    document.body.append(backdrop,reader);
    document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
    return true;
  }

  window.openScriptureEncyclopedia = open;
  window.SCRIPTURE_ENCYCLOPEDIA_SCOPE = [...ELIGIBLE];

  document.addEventListener('click', event => {
    const button = event.target.closest?.('#scripture-browser .shastra-name');
    if (!button) return;
    const info = infoFor(button);
    if (!ELIGIBLE.has(info.kind)) return;
    if (info.kind === 'Upaniṣad' && info.name === 'Kena') return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    open(button);
  }, true);

  document.addEventListener('click', event => {
    if (event.target === backdrop || event.target.closest?.('.scripture-wiki-reader .kena-article-close')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && reader) close();
  });
})();