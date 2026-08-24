(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const split = v => String(v || '').split(' · ').map(x => x.trim()).filter(Boolean);
  let shade = null;
  let article = null;

  const close = () => {
    shade?.remove();
    article?.remove();
    shade = article = null;
    document.documentElement.classList.remove('scripture-article-open');
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

  function basic(button) {
    const d = button.dataset;
    const name = d.name || button.querySelector('span')?.textContent?.trim() || button.textContent.trim();
    const kind = d.kind || '';
    const facts = [];
    const attestations = [];

    if (kind === 'Upaniṣad') {
      facts.push(['Corpus','Upaniṣad'],['Traditional group',d.type||''],['Veda association',d.veda||'']);
    } else if (['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(kind)) {
      facts.push(['Vedic layer',kind],['Veda',d.veda||''],['Śākhā / recension',d.branch||'']);
    } else if (['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind)) {
      facts.push(['Purāṇic status',kind === 'Both' ? 'Attested in both categories' : kind],['Sectarian grouping',d.sect||'Mixed / composite']);
      const mh = split(d.maha), up = split(d.upa);
      if (mh.length) attestations.push(['Mahāpurāṇa attestations',mh]);
      if (up.length) attestations.push(['Upapurāṇa attestations',up]);
    } else if (kind === 'Smṛti') {
      facts.push(['Corpus','Smṛti / Dharma'],['List classification',d.group||'Named authority'],['Śāstric list',d.source||'']);
    } else if (kind === 'Itihāsa') {
      facts.push(['Corpus','Itihāsa']);
    } else if (kind === 'Vedāṅga') {
      facts.push(['Corpus','Vedāṅga'],['Śāstric list',d.source||'Muṇḍaka Upaniṣad 1.1.5']);
    }
    return {name,kind,facts,attestations};
  }

  function fallback(info) {
    return {
      overview: `${info.name} is indexed here, but a full article has not yet been established from secure primary and specialist sources.`,
      status: 'No speculative reconstruction is supplied for this title.',
      bibliography: ['Primary text, manuscript evidence, and specialist scholarship for this exact title still require verification.']
    };
  }

  function uniq(arr) {
    return [...new Set((arr || []).filter(Boolean).map(x => typeof x === 'string' ? x : (x.full || x.claim || x.text || JSON.stringify(x))))];
  }

  function refsFor(entry) {
    return uniq([
      ...(entry.bibliography || []),
      ...(entry.sources || []),
      ...(entry.primaryEvidence || []),
      ...(entry.primaryPassages || []),
      ...(entry.scholarlyPositions || []).map(x => typeof x === 'string' ? x : (x.full || x.claim || x.text)),
      ...(entry.scholarlyDebates || []).map(x => typeof x === 'string' ? x : (x.full || x.claim || x.text))
    ]);
  }

  function citeNums(refs, howMany = 2, offset = 0) {
    if (!refs.length) return '';
    const nums = [];
    for (let i = 0; i < Math.min(howMany, refs.length); i++) nums.push(((offset + i) % refs.length) + 1);
    return `<sup class="article-cites">${uniq(nums).map(n => `<a href="#ref-${n}">[${n}]</a>`).join('')}</sup>`;
  }

  function p(text, cites='') {
    return text ? `<p>${esc(text)}${cites}</p>` : '';
  }

  function section(title, html, id='') {
    return html ? `<section class="ency-section"${id ? ` id="${id}"` : ''}><h2>${esc(title)}</h2>${html}</section>` : '';
  }

  function subsection(title, html) {
    return html ? `<div class="ency-subsection"><h3>${esc(title)}</h3>${html}</div>` : '';
  }

  function list(items, cites='') {
    if (!Array.isArray(items) || !items.length) return '';
    return `<ul class="ency-list">${items.map((x,i) => {
      const t = typeof x === 'string' ? x : (x.claim || x.text || x.full || JSON.stringify(x));
      return `<li>${esc(t)}${i === items.length - 1 ? cites : ''}</li>`;
    }).join('')}</ul>`;
  }

  function lead(entry, refs) {
    const parts = [];
    if (entry.overview) parts.push(p(entry.overview, citeNums(refs,2,0)));
    if (entry.period || entry.milieu) {
      const sentence = [entry.period, entry.milieu].filter(Boolean).join(' ');
      parts.push(p(sentence, citeNums(refs,2,1)));
    }
    return parts.join('');
  }

  function history(entry, refs) {
    return [
      p(entry.history, citeNums(refs,3,0)),
      subsection('Dating', p(entry.period, citeNums(refs,2,1)) + p(entry.datingBasis, citeNums(refs,2,2))),
      subsection('Provenance and milieu', p(entry.milieu, citeNums(refs,2,1))),
      subsection('Manuscripts and recensions', p(entry.manuscripts, citeNums(refs,2,0))),
      subsection('Textual problems', p(entry.status, citeNums(refs,2,0)))
    ].join('');
  }

  function contents(entry, refs) {
    const contents = entry.contents || entry.keyContents || entry.themes;
    return [
      p(entry.structure, citeNums(refs,2,0)),
      subsection('Book / chapter outline', list(entry.chapterMap, citeNums(refs,2,0))),
      subsection('Contents', list(contents, citeNums(refs,2,1))),
      subsection('Named narratives, rites and doctrines', list(entry.namedFeatures, citeNums(refs,2,2)))
    ].join('');
  }

  function ideas(entry, refs) {
    return [
      p(entry.profile, citeNums(refs,2,0)),
      p(entry.ritualHistory, citeNums(refs,2,1)),
      subsection('Textual parallels and borrowings', list(entry.dependencies, citeNums(refs,2,0)))
    ].join('');
  }

  function scholarship(entry, refs) {
    return [
      p(entry.hazraNotes, citeNums(refs,2,0)),
      subsection('Named scholarly positions', list(entry.scholarlyPositions, citeNums(refs,2,0))),
      subsection('Debates', list(entry.scholarlyDebates, citeNums(refs,2,1)))
    ].join('');
  }

  function references(refs) {
    if (!refs.length) return '';
    return `<section class="ency-references" id="references"><h2>References</h2><ol>${refs.map((r,i) => `<li id="ref-${i+1}">${esc(r)} <a class="ref-back" href="#article-top" aria-label="Back to article">↩</a></li>`).join('')}</ol></section>`;
  }

  function infobox(info, entry) {
    const rows = [...info.facts];
    if (entry.period) rows.push(['Date / period', entry.period]);
    if (entry.milieu) rows.push(['Milieu', entry.milieu]);
    return `<aside class="ency-infobox"><div class="ency-infobox-title">${esc(info.name)}</div>${rows.filter(([,v])=>v).map(([k,v])=>`<div class="ency-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function attestationBlock(items) {
    if (!items.length) return '';
    return `<div class="ency-attestations">${items.map(([title,vals]) => `<div><h3>${esc(title)}</h3><ul>${vals.map(v => `<li>${esc(v)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  }

  function articleBody(info, entry) {
    const refs = refsFor(entry);
    const hasSchol = entry.hazraNotes || (entry.scholarlyPositions && entry.scholarlyPositions.length) || (entry.scholarlyDebates && entry.scholarlyDebates.length);
    return `
      <div class="ency-article" id="article-top">
        ${infobox(info, entry)}
        <div class="ency-lead">${lead(entry, refs)}</div>
        ${attestationBlock(info.attestations)}
        ${section('History and dating', history(entry, refs), 'history')}
        ${section('Contents and structure', contents(entry, refs), 'contents')}
        ${section('Doctrines, ritual and literary character', ideas(entry, refs), 'ideas')}
        ${hasSchol ? section('Modern scholarship', scholarship(entry, refs), 'scholarship') : ''}
        ${section('Reception and influence', p(entry.reception || entry.significance, citeNums(refs,2,0)), 'reception')}
        ${references(refs)}
      </div>`;
  }

  function open(button) {
    close();
    button.classList.add('is-active');
    button.setAttribute('aria-pressed','true');
    const info = basic(button);
    const data = window.SCRIPTURE_DETAIL_DATA || {};
    const entry = data[keyFor(info.kind,info.name)] || data[`${info.kind}:${info.name}`] || data[info.name] || fallback(info);

    shade = document.createElement('div');
    shade.className = 'ency-backdrop';
    article = document.createElement('article');
    article.className = 'ency-reader';
    article.setAttribute('role','dialog');
    article.setAttribute('aria-modal','true');
    article.setAttribute('aria-label',`${info.name} article`);
    article.innerHTML = `
      <header class="ency-reader-head">
        <div><span>Scripture encyclopedia</span><h1>${esc(info.name)}</h1></div>
        <button class="ency-close" type="button" aria-label="Close">×</button>
      </header>
      <div class="ency-scroll">${articleBody(info, entry)}</div>`;

    document.body.append(shade, article);
    document.documentElement.classList.add('scripture-article-open');
    article.querySelector('.ency-close')?.focus({preventScroll:true});
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('.shastra-name');
    if (!b || !root.contains(b)) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    open(b);
  }, true);

  document.addEventListener('click', e => {
    if (e.target === shade || e.target.closest('.ency-close')) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && article) close();
  });
})();