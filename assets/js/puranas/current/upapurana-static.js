/* Static Wikipedia-style Upapurāṇa research reader. */
(() => {
  const mount = document.getElementById('upapurana-standalone');
  if (!mount) return;

  const TITLES = [
    'Date of composition','Structure','Contents','Theology','Critical edition',
    'Influences and reception','Rites, dharma and social history','Further reading','References'
  ];
  const KEYS = ['date','structure','contents','theology','critical','reception','social','further'];

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const slug = location.pathname.split('/').filter(Boolean).pop() || '';
  async function run(){
  if(window.UPAPURANA_READY) await window.UPAPURANA_READY;
  const DATA = window.UPAPURANA_BY_SLUG || {};
  const SOURCES = window.UPAPURANA_SOURCES || {};
  const profile = DATA[slug];

  if (!profile) {
    mount.innerHTML = '<p class="article-error">This Upapurāṇa research route could not be resolved. <a href="/vivekadrishti/articles/scripture/">Return to the Scripture Index</a>.</p>';
    return;
  }

  document.title = `${profile.name} — Upapurāṇa Research | Viveka Dṛṣṭi`;

  const refs = profile.sourceIds.map(id => ({id, ...(SOURCES[id] || {})})).filter(x => x.title);
  const refNum = Object.fromEntries(refs.map((r,i) => [r.id, i+1]));
  const citeCluster = () => {
    const nums = profile.sourceIds.map(id => refNum[id]).filter(Boolean);
    return nums.length ? `<span class="upapurana-source-cluster" aria-label="Research sources">${nums.map(n => `<a href="#ref-${n}">[${n}]</a>`).join(' ')}</span>` : '';
  };

  const renderParagraphs = (items, sectionIndex) => {
    if (sectionIndex === 7) {
      return `<ul class="upapurana-reading-list">${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${citeCluster()}`;
    }
    return items.map((p,i) => `<p>${esc(p)}${i === items.length-1 ? ' '+citeCluster() : ''}</p>`).join('');
  };

  const sectionHtml = KEYS.map((key,i) => `
    <section class="kena-section purana-full-section mahapurana-collapse-section" id="section-${i+1}">
      <h2 role="button" tabindex="0" aria-expanded="false">${TITLES[i]}</h2>
      <div class="mahapurana-collapse-body" hidden>${renderParagraphs(profile.sections[key] || [], i)}</div>
    </section>`).join('');

  const references = `
    <section class="kena-section purana-full-section mahapurana-collapse-section universal-references" id="section-9">
      <h2 role="button" tabindex="0" aria-expanded="false">References</h2>
      <div class="mahapurana-collapse-body" hidden>
        <ol>${refs.map((r,i) => `<li id="ref-${i+1}"><b>${esc(r.title)}</b>${r.detail ? ` — ${esc(r.detail)}` : ''}${r.url ? ` <a href="${esc(r.url)}" target="_blank" rel="noopener">Open source ↗</a>` : ''}</li>`).join('')}</ol>
        <p class="upapurana-editorial-note"><b>Editorial rule:</b> a traditional list attestation, manuscript date, printed edition, and stemmatic critical edition are reported as different kinds of evidence. Where the underlying work is lost or its identity is disputed, this page gives a fragment/testimonia dossier rather than inventing a complete book.</p>
      </div>
    </section>`;

  const toc = `<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${
    TITLES.map((t,i) => `<li><a href="#section-${i+1}" data-section="section-${i+1}">${esc(t)}</a></li>`).join('')
  }</ol></nav>`;

  const witnesses = profile.witnesses || [];
  const witnessRows = witnesses.map(x => `<li>${esc(x)}</li>`).join('');
  const infobox = `<aside class="kena-infobox universal-infobox purana-full-infobox">
    <div class="kena-infobox-title">${esc(profile.name)}</div>
    <div class="kena-info-row"><b>Corpus</b><span>Upapurāṇa witness corpus</span></div>
    <div class="kena-info-row"><b>Preservation</b><span>${esc(profile.status)}</span></div>
    <div class="kena-info-row"><b>Orientation</b><span>${esc(profile.orientation)}</span></div>
    <div class="kena-info-row"><b>Attestation</b><span>${witnesses.length} of 4 index lists</span></div>
    <div class="upapurana-witness-box"><b>Traditional witnesses</b><ul>${witnessRows}</ul></div>
  </aside>`;

  mount.innerHTML = `<section class="kena-article-reader purana-full-reader mahapurana-wiki-reader upapurana-static-reader">
    <header class="kena-article-head"><div><span class="eyebrow">Upapurāṇa · encyclopedia article</span><h1>${esc(profile.name)}</h1></div></header>
    <div class="kena-article-scroll">
      <article class="purana-full-article universal-wiki-article mahapurana-wiki-article">
        <div class="mahapurana-main-title">${esc(profile.name)}</div>
        ${infobox}
        <div class="kena-lead">
          <p>This research article treats <b>${esc(profile.name)}</b> as one of the ${Object.keys(DATA).length} distinct Upapurāṇa witness-labels represented by the four traditional lists compared in the Viveka Dṛṣṭi Scripture Index. Those lists disagree with one another, and they sometimes preserve homonymous, lost or textually disputed titles.</p>
          <p>${esc(profile.status)}. The article therefore distinguishes composition, redaction, manuscript transmission, printed recension, critical edition and later reception instead of treating “Upapurāṇa” as a fixed eighteen-book canon.</p>
        </div>
        ${toc}
        ${sectionHtml}
        ${references}
      </article>
    </div>
  </section>`;

  const setOpen = (section, open) => {
    if (!section) return;
    const body = section.querySelector(':scope > .mahapurana-collapse-body');
    const h = section.querySelector(':scope > h2');
    if (!body || !h) return;
    section.classList.toggle('is-open', open);
    body.hidden = !open;
    h.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  mount.addEventListener('click', e => {
    const tocLink = e.target.closest('.kena-toc a[data-section]');
    if (tocLink) {
      e.preventDefault();
      const section = document.getElementById(tocLink.dataset.section);
      setOpen(section, true);
      section?.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState(null,'',`#${tocLink.dataset.section}`);
      return;
    }
    const h = e.target.closest('.mahapurana-collapse-section > h2');
    if (h) {
      const section = h.parentElement;
      setOpen(section, !section.classList.contains('is-open'));
    }
  });

  mount.addEventListener('keydown', e => {
    const h = e.target.closest('.mahapurana-collapse-section > h2');
    if (!h || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    const section = h.parentElement;
    setOpen(section, !section.classList.contains('is-open'));
  });

  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.classList.contains('mahapurana-collapse-section')) {
      setOpen(target, true);
      requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
    }
  }

  mount.classList.add('is-loaded');
  }
  run().catch(err=>{console.error(err);mount.innerHTML='<p class="article-error">The Upapurāṇa research article could not be loaded. <a href="/vivekadrishti/articles/scripture/">Return to the Scripture Index</a>.</p>'});
})();
