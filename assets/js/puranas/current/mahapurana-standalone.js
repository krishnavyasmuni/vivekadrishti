(() => {
  const root = document.getElementById('mahapurana-standalone');
  if (!root) return;

  const ROUTES = {
    'brahma-purana':'Brahma Purāṇa',
    'padma-purana':'Padma Purāṇa',
    'vishnu-purana':'Viṣṇu Purāṇa',
    'vayu-purana':'Vāyu Purāṇa',
    'shiva-purana':'Śiva Purāṇa',
    'bhagavata-purana':'Bhāgavata Purāṇa',
    'devi-bhagavata-purana':'Devī Bhāgavata Purāṇa',
    'naradiya-purana':'Nāradīya Purāṇa',
    'markandeya-purana':'Mārkaṇḍeya Purāṇa',
    'agni-purana':'Agni Purāṇa',
    'bhavishya-purana':'Bhaviṣya Purāṇa',
    'brahmavaivarta-purana':'Brahmavaivarta Purāṇa',
    'varaha-purana':'Varāha Purāṇa',
    'linga-purana':'Liṅga Purāṇa',
    'skanda-purana':'Skanda Purāṇa',
    'vamana-purana':'Vāmana Purāṇa',
    'kurma-purana':'Kūrma Purāṇa',
    'matsya-purana':'Matsya Purāṇa',
    'garuda-purana':'Garuḍa Purāṇa',
    'brahmanda-purana':'Brahmāṇḍa Purāṇa',
    'mahabhagavata-purana':'Mahābhāgavata Purāṇa'
  };

  const routeSlug = location.pathname.split('/').filter(Boolean).pop() || '';
  const name = root.dataset.purana || ROUTES[routeSlug] || '';
  if (!name) {
    root.innerHTML = '<div class="mahapurana-static-error"><h2>Purana not found</h2><p><a href="/vivekadrishti/articles/scripture/">Return to the Scripture Index</a>.</p></div>';
    return;
  }

  document.body.classList.add('mahapurana-unified-page');

  const TITLES = ['Date','Structure','Contents','Theology','Influence','Rites','Critical edition','Further reading'];
  const KEYS = ['date','structure','contents','theology','reception','social','critical','further'];

  const englishize = value => String(value || '')
    .replace(/[ŚśṢṣ]/g, c => c === c.toUpperCase() ? 'Sh' : 'sh')
    .replace(/[ṚṛṜṝ]/g, c => c === c.toUpperCase() ? 'Ri' : 'ri')
    .replace(/[Ṅṅ]/g, c => c === c.toUpperCase() ? 'Ng' : 'ng')
    .replace(/[Ññ]/g, c => c === c.toUpperCase() ? 'Ny' : 'ny')
    .replace(/[ṂṃṀṁ]/g, c => c === c.toUpperCase() ? 'M' : 'm')
    .replace(/[Ḥḥ]/g, c => c === c.toUpperCase() ? 'H' : 'h')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const plain = x => typeof x === 'string' ? x :
    (x?.claim || x?.text || x?.full || x?.short || x?.summary || x?.description ||
     x?.note || x?.title || x?.citation || x?.name || '');

  const norm = s => englishize(String(s || '')).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

  const uniq = xs => {
    const seen = new Set();
    return xs.flatMap(arr).map(plain).map(x => String(x || '').trim()).filter(x => {
      const k = norm(x);
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  const load = src => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load ' + src));
    document.head.appendChild(s);
  });

  const wanted = src => {
    if (src.includes('/assets/js/puranas/current/')) {
      return !/(?:reader|polish|ui|images|standalone|page)\.js(?:\?|$)/.test(src);
    }
    return [
      'scripture-index-v3-details-puranas',
      'scripture-index-v3-deep-purana-history',
      'scripture-index-v3-deep-final-fixes',
      'scripture-index-v3-details-overrides',
      'scripture-index-v3-scholarly-puranas',
      'scripture-index-v3-wiki-rich-puranas-major',
      'scripture-index-v3-deep-purana-v10',
      'scripture-index-v3-deep-purana-specials',
      'scripture-index-v3-research-puranas-hazra',
      'scripture-index-v3-research-purana-extra'
    ].some(x => src.includes(x));
  };

  const classify = title => {
    const t = norm(title);
    if (/date|chronolog|formation|provenance|composition/.test(t)) return 'date';
    if (/structure|book|skandha|khanda|samhita|chapter|division|organization/.test(t)) return 'structure';
    if (/manuscript|critical|edition|recension|textual|transmission|variant/.test(t)) return 'critical';
    if (/theolog|philosoph|bhakti|jnana|yoga|vedanta|doctrine|supreme/.test(t)) return 'theology';
    if (/influence|reception|commentar|legacy|scholar|later use/.test(t)) return 'reception';
    if (/rite|ritual|dharma|social|custom|pilgrim|tirtha|vrata|temple|gift|funeral|shraddha|worship|festival/.test(t)) return 'social';
    if (/further|reading|bibliograph/.test(t)) return 'further';
    return 'contents';
  };

  const sourceObj = s => {
    if (!s) return null;
    if (typeof s === 'string') return {title:s,detail:'',url:''};
    return {
      title:s.title || s.citation || s.name || plain(s) || 'Source',
      detail:s.detail || s.description || s.note || '',
      url:/^https?:\/\//i.test(String(s.url || s.href || '')) ? String(s.url || s.href) : ''
    };
  };

  const sourcesFor = e => {
    const out = [], seen = new Set();
    [...arr(e.sources),...arr(e.references),...arr(e.refs),...arr(e.primarySources),...arr(e.bibliography)]
      .map(sourceObj).filter(Boolean).forEach(s => {
        const k = norm((s.title || '') + ' ' + (s.url || ''));
        if (!k || seen.has(k)) return;
        seen.add(k);
        out.push(s);
      });

    [
      {
        title:'Ludo Rocher, The Puranas (1986)',
        detail:'Standard survey of Puranic textual history, recensions, chronology and bibliography.',
        url:'https://books.google.com/books?id=n0-4RJh5FgoC'
      },
      {
        title:'R. C. Hazra, Studies in the Puranic Records on Hindu Rites and Customs',
        detail:'Historical study of Puranic strata, rites, customs and Dharmashastra relations.',
        url:'https://books.google.com/books?id=Jar4V3piCeQC'
      }
    ].forEach(s => {
      const k = norm(s.title);
      if (!seen.has(k)) {
        seen.add(k);
        out.push(s);
      }
    });
    return out;
  };

  const sectionParts = s => {
    const paragraphs = uniq([s?.paragraphs,s?.text,s?.summary,s?.note]);
    const bullets = uniq([s?.bullets]);
    const subs = [];

    arr(s?.books).forEach((b,i) => {
      if (typeof b === 'string') bullets.push(b);
      else {
        subs.push({
          title:String(b?.title || b?.name || b?.number || `Part ${i+1}`),
          paragraphs:uniq([b?.summary,b?.text,b?.description,b?.note,b?.paragraphs]),
          bullets:uniq([b?.bullets])
        });
      }
    });

    arr(s?.subsections || s?.subs).forEach((sub,i) => subs.push({
      title:String(sub?.title || sub?.name || `Subsection ${i+1}`),
      paragraphs:uniq([sub?.paragraphs,sub?.text,sub?.summary,sub?.note]),
      bullets:uniq([sub?.bullets])
    }));

    return {paragraphs,bullets,subs};
  };

  function buildSections(e, sources) {
    const buckets = Object.fromEntries(KEYS.map(k => [k,{paragraphs:[],bullets:[],subs:[]} ]));

    arr(e.articleSections).forEach(s => {
      const key = classify(s?.title);
      const p = sectionParts(s);
      buckets[key].paragraphs.push(...p.paragraphs);
      buckets[key].bullets.push(...p.bullets);
      buckets[key].subs.push(...p.subs);
    });

    buckets.date.paragraphs.push(...uniq([e.period,e.date,e.dating,e.history,e.datingBasis,e.hazraNotes,e.milieu,e.textualSetting]));
    buckets.structure.paragraphs.push(...uniq([e.structure,e.extent,e.booksCount,e.verseCount]));
    buckets.structure.bullets.push(...uniq([e.primaryRecensions,e.chapterMap]));
    buckets.contents.paragraphs.push(...uniq([e.overview,e.summary]));
    buckets.contents.bullets.push(...uniq([e.contents,e.keyContents,e.namedFeatures,e.primaryPassages]));
    buckets.theology.paragraphs.push(...uniq([e.profile,e.theology,e.philosophy,e.themes,e.teachings]));
    buckets.reception.paragraphs.push(...uniq([e.reception,e.significance]));
    buckets.reception.bullets.push(...uniq([e.dependencies,e.scholarlyPositions,e.scholarlyDebates,e.commentaries]));
    buckets.social.paragraphs.push(...uniq([e.ritualHistory,e.socialHistory,e.dharma]));
    buckets.social.bullets.push(...uniq([e.rituals,e.vratas,e.sacredGeography,e.pilgrimage]));
    buckets.critical.paragraphs.push(...uniq([e.manuscripts,e.criticalEdition,e.edition,e.textualHistory]));
    buckets.critical.bullets.push(...uniq([e.primaryEvidence,e.primaryRecensions]));
    buckets.further.bullets.push(...uniq([sources.map(s => s.title),e.bibliography]));

    const generic = {
      date:[`The ${englishize(name)} is a composite Puranic textual tradition rather than a work that can safely be assigned to one author and one year. Dates here therefore distinguish proposed strata from surviving manuscripts, quotations and printed editions.`],
      structure:[`The structure of the ${englishize(name)} must be reported recension by recension. Chapter, khanda, samhita or skandha counts in one printed edition are not automatically the architecture of every manuscript witness.`],
      contents:[`The contents below describe the received text while preserving major differences between recensions and independently circulating sections.`],
      theology:[`The theological profile of the ${englishize(name)} is described from its individual strata and narrative settings rather than being reduced to one later sectarian label.`],
      reception:[`Reception is traced through quotation, commentary, later literature, ritual use, regional transmission and modern scholarship.`],
      social:[`Puranic prescriptions concerning ritual, pilgrimage, gift, social order, kingship and temple practice are normative sources and are not treated as direct demographic descriptions without corroborating evidence.`],
      critical:[`A printed Sanskrit edition is not automatically a critical edition. This section distinguishes manuscript witnesses, recensions, editorial collation and genuinely critical editions.`],
      further:[`For textual history and bibliography, consult the specialist works in References alongside the Sanskrit edition or critical edition identified for this Purana.`]
    };

    KEYS.forEach(k => {
      buckets[k].paragraphs = uniq(buckets[k].paragraphs);
      buckets[k].bullets = uniq(buckets[k].bullets);
      if (!buckets[k].paragraphs.length && !buckets[k].bullets.length && !buckets[k].subs.length) {
        buckets[k].paragraphs = generic[k];
      }
    });

    return buckets;
  }

  const renderText = value => esc(englishize(value));

  const renderBody = part => {
    let h = part.paragraphs.map(p => `<p>${renderText(p)}</p>`).join('');
    if (part.bullets.length) {
      h += `<ul>${part.bullets.map(x => `<li>${renderText(x)}</li>`).join('')}</ul>`;
    }
    part.subs.forEach(sub => {
      h += `<h3>${renderText(sub.title)}</h3>`;
      h += sub.paragraphs.map(p => `<p>${renderText(p)}</p>`).join('');
      if (sub.bullets.length) h += `<ul>${sub.bullets.map(x => `<li>${renderText(x)}</li>`).join('')}</ul>`;
    });
    return h;
  };

  const renderRef = (s,i) => {
    const title = renderText(s.title);
    const detail = s.detail ? ` — ${renderText(s.detail)}` : '';
    return `<li id="ref-${i+1}">${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><b>${title}</b></a>` : `<b>${title}</b>`}${detail}</li>`;
  };

  const compact = (v, max = 150) => {
    let t = englishize(plain(v)).replace(/\s+/g,' ').trim();
    if (!t) return '';
    const sentences = t.match(/[^.!?]+[.!?]?/g) || [t];
    let out = sentences[0].trim();
    if (out.length < 58 && sentences[1]) out += ' ' + sentences[1].trim();
    if (out.length > max) out = out.slice(0,max).replace(/\s+\S*$/,'') + '…';
    return out;
  };

  const authorSummary = v => {
    const t = englishize(plain(v)).replace(/\s+/g,' ').trim();
    if (!t) return '';
    return t.split(';')[0].trim().replace(/\.$/,'');
  };

  const chapterInfo = e => {
    const raw = englishize(plain(e.booksCount || e.extent || e.structure)).replace(/\s+/g,' ').trim();
    if (!raw) return null;
    const m = raw.match(/\b(\d{1,4})\s+(?:numbered\s+)?(?:chapters?|adhyayas?)\b/i);
    if (m) return ['Chapters', m[1]];
    return ['Structure', compact(raw,120)];
  };

  const verseSummary = e => compact(e.verseCount,150);

  const addNavigation = () => {
    if (!document.querySelector('.purana-page-nav')) {
      const nav = document.createElement('nav');
      nav.className = 'purana-page-nav';
      nav.setAttribute('aria-label','Purana navigation');
      nav.innerHTML = '<a class="purana-back-button" href="/vivekadrishti/articles/scripture/">← Back to Scripture Index</a><a class="purana-home-link" href="/vivekadrishti/">Home</a>';
      document.body.insertBefore(nav, document.body.firstChild);
    }
    if (!document.querySelector('.purana-return-nav')) {
      const nav = document.createElement('nav');
      nav.className = 'purana-return-nav';
      nav.setAttribute('aria-label','Return to Scripture Index');
      nav.innerHTML = '<a href="/vivekadrishti/articles/scripture/">← Back to Scripture Index</a>';
      document.body.appendChild(nav);
    }
  };

  const highlightKeyTerms = () => {
    const terms = [
      englishize(name),'Mahapurana','Vyasa','Brahma','Vishnu','Shiva','Krishna','Narayana',
      'Devi','Shakti','Jagannatha','Surya','Yoga','Samkhya','moksha','dharma','bhakti'
    ].filter(Boolean).sort((a,b) => b.length - a.length);

    const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    const termRe = new RegExp(`\\b(${escaped.join('|')})\\b`,'gi');
    const factRes = [
      /\b\d{1,2}(?:st|nd|rd|th)\s+century(?:\s+CE|\s+BCE)?\b/gi,
      /\b\d{1,3}(?:,\d{3})?\s+(?:chapters?|verses?)\b/gi,
      /\bchapters?\s+\d+[–-]\d+\b/gi
    ];

    root.querySelectorAll('.kena-lead p,.mahapurana-collapse-body p,.mahapurana-collapse-body li').forEach(el => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        const n = walker.currentNode;
        const p = n.parentElement;
        if (!p || p.closest('a,strong')) continue;
        nodes.push(n);
      }

      nodes.forEach(node => {
        const text = node.nodeValue;
        if (!text || !text.trim()) return;
        const matches = [];
        termRe.lastIndex = 0;
        let m;
        while ((m = termRe.exec(text))) matches.push({start:m.index,end:m.index+m[0].length});
        factRes.forEach(re => {
          re.lastIndex = 0;
          let fm;
          while ((fm = re.exec(text))) matches.push({start:fm.index,end:fm.index+fm[0].length});
        });
        if (!matches.length) return;

        matches.sort((a,b) => a.start-b.start || (b.end-b.start)-(a.end-a.start));
        const filtered = [];
        let end = -1;
        matches.forEach(x => {
          if (x.start >= end) {
            filtered.push(x);
            end = x.end;
          }
        });

        const frag = document.createDocumentFragment();
        let pos = 0;
        filtered.forEach(x => {
          if (x.start > pos) frag.appendChild(document.createTextNode(text.slice(pos,x.start)));
          const strong = document.createElement('strong');
          strong.textContent = text.slice(x.start,x.end);
          frag.appendChild(strong);
          pos = x.end;
        });
        if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
        node.replaceWith(frag);
      });
    });
  };

  async function run() {
    addNavigation();

    try {
      const response = await fetch('/vivekadrishti/articles/scripture/?manifest=mahapurana-unified-v1',{cache:'no-store'});
      if (!response.ok) throw new Error('Could not read Scripture Index loader manifest');

      const doc = new DOMParser().parseFromString(await response.text(),'text/html');
      const sources = [...doc.querySelectorAll('script[src]')]
        .map(s => s.getAttribute('src'))
        .filter(Boolean)
        .filter(wanted);

      const seen = new Set();
      for (const src of sources) {
        if (seen.has(src)) continue;
        seen.add(src);
        try { await load(src); }
        catch (err) { console.warn(err.message); }
      }

      const D = window.SCRIPTURE_DETAIL_DATA || {};
      const e = Object.assign({}, D[name] || {}, D['Purāṇa:' + name] || {});
      if (!Object.keys(e).length) throw new Error('No article data found for ' + englishize(name));

      const displayName = englishize(name);
      document.title = `${displayName} — Viveka Drishti`;

      const refs = sourcesFor(e);
      const sections = buildSections(e, refs);
      const lead = uniq([e.leadParagraphs,e.overview,e.summary]).slice(0,2);

      const info = [
        ['Religion','Hinduism'],
        ['Classification','Mahapurana'],
        ['Traditional author',authorSummary(e.traditionalAuthor) || 'Vyasa'],
        ['Language',compact(e.language || 'Sanskrit',60)],
        ['Period',compact(e.period || e.date,170)]
      ];

      const chapter = chapterInfo(e);
      if (chapter) info.push(chapter);

      const verses = verseSummary(e);
      if (verses) info.push(['Verses',verses]);

      const sanskrit = e.sanskritTitle ? `<span class="purana-devanagari-title" lang="sa-Deva">${esc(e.sanskritTitle)}</span>` : '';

      const infobox = `<aside class="kena-infobox universal-infobox purana-full-infobox">
        <div class="kena-infobox-title">${esc(displayName)}</div>
        ${e.sanskritTitle ? `<div class="universal-devanagari" lang="sa-Deva">${esc(e.sanskritTitle)}</div>` : ''}
        ${info.filter(x => x[1]).map(([k,v]) => `<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}
      </aside>`;

      const toc = `<nav class="kena-toc" aria-label="Contents">
        <div class="kena-toc-title">Contents</div>
        <ol>
          ${TITLES.map((t,i) => `<li><a href="#section-${i+1}">${esc(t)}</a></li>`).join('')}
          <li><a href="#section-9">References</a></li>
        </ol>
      </nav>`;

      const sectionHtml = KEYS.map((k,i) => `
        <section class="kena-section purana-full-section mahapurana-article-section" id="section-${i+1}">
          <h2>${esc(TITLES[i])}</h2>
          <div class="mahapurana-collapse-body">${renderBody(sections[k])}</div>
        </section>`).join('');

      const references = `
        <section class="kena-section purana-full-section mahapurana-article-section universal-references" id="section-9">
          <h2>References</h2>
          <div class="mahapurana-collapse-body">
            <ol>${refs.map(renderRef).join('')}</ol>
            <p><b>Editorial method:</b> dates of composition, manuscript witnesses, printed editions and critical editions are treated as different kinds of evidence. Composite or disputed strata are identified rather than harmonized into one fictive authorial moment.</p>
          </div>
        </section>`;

      root.innerHTML = `
        <section class="mahapurana-wiki-reader mahapurana-static-reader">
          <header class="kena-article-head">
            <span class="eyebrow">Purana · encyclopedia article</span>
            <h1>${esc(displayName)} ${sanskrit}</h1>
          </header>
          <div class="kena-article-scroll">
            <article class="purana-full-article universal-wiki-article mahapurana-wiki-article">
              ${infobox}
              <div class="kena-lead">${lead.map(p => `<p>${renderText(p)}</p>`).join('')}</div>
              ${toc}
              ${sectionHtml}
              ${references}
            </article>
          </div>
        </section>`;

      root.classList.add('is-loaded');
      highlightKeyTerms();

      root.querySelectorAll('img,picture,figure,.purana-wiki-image').forEach(el => el.remove());

      root.addEventListener('click', ev => {
        const a = ev.target.closest('.kena-toc a[href^="#section-"]');
        if (!a) return;
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        ev.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',a.getAttribute('href'));
      });

      if (location.hash) {
        requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'start'}));
      }
    } catch (err) {
      console.error(err);
      root.innerHTML = `<div class="mahapurana-static-error"><h2>Article data could not be loaded</h2><p>${esc(err.message || err)}</p><p><a href="/vivekadrishti/articles/scripture/">Return to the Scripture Index</a>.</p></div>`;
    }
  }

  run();
})();