(() => {
  const root = document.getElementById('mahapurana-standalone');
  if (!root) return;

  const ROUTES = {
    'brahma-purana':'Brahma Purāṇa','padma-purana':'Padma Purāṇa','vishnu-purana':'Viṣṇu Purāṇa',
    'vayu-purana':'Vāyu Purāṇa','shiva-purana':'Śiva Purāṇa','bhagavata-purana':'Bhāgavata Purāṇa',
    'devi-bhagavata-purana':'Devī Bhāgavata Purāṇa','naradiya-purana':'Nāradīya Purāṇa',
    'markandeya-purana':'Mārkaṇḍeya Purāṇa','agni-purana':'Agni Purāṇa','bhavishya-purana':'Bhaviṣya Purāṇa',
    'brahmavaivarta-purana':'Brahmavaivarta Purāṇa','varaha-purana':'Varāha Purāṇa','linga-purana':'Liṅga Purāṇa',
    'skanda-purana':'Skanda Purāṇa','vamana-purana':'Vāmana Purāṇa','kurma-purana':'Kūrma Purāṇa',
    'matsya-purana':'Matsya Purāṇa','garuda-purana':'Garuḍa Purāṇa','brahmanda-purana':'Brahmāṇḍa Purāṇa'
  };
  const slug = location.pathname.split('/').filter(Boolean).pop() || '';
  const name = ROUTES[slug];
  if (!name) return;

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const plain = x => typeof x === 'string' ? x : (x?.text || x?.summary || x?.description || x?.note || x?.title || '');
  const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

  const getSection = title => [...root.querySelectorAll('.mahapurana-article-section')]
    .find(s => norm(s.querySelector(':scope > h2')?.textContent) === norm(title));

  const sourceToLi = source => {
    const title = source.title || source.citation || source.name || plain(source) || 'Source';
    const detail = source.detail || source.description || source.note || '';
    const url = /^https?:\/\//i.test(String(source.url || source.href || '')) ? String(source.url || source.href) : '';
    return `<li>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer"><b>${esc(title)}</b></a>` : `<b>${esc(title)}</b>`}${detail ? ` — ${esc(detail)}` : ''}</li>`;
  };

  function applyResearch(){
    const D = window.SCRIPTURE_DETAIL_DATA || {};
    const e = Object.assign({}, D[name] || {}, D['Purāṇa:' + name] || {});
    if (!e.professionalWiki) return;

    const date = getSection('Date and textual history');
    if (date && !date.querySelector('.purana-evidence-box')) {
      const evidence = [...arr(e.datingBasis), ...arr(e.hazraNotes)].map(plain).filter(Boolean);
      if (evidence.length) {
        const box = document.createElement('aside');
        box.className = 'purana-evidence-box';
        box.innerHTML = `<h3>Textual chronology and external evidence</h3>${evidence.map(p => `<p>${esc(p)}</p>`).join('')}`;
        date.querySelector('.mahapurana-collapse-body')?.appendChild(box);
      }
    }

    const contentData = arr(e.articleSections).filter(s => norm(s?.title) === 'contents').slice(-1)[0];
    const contents = getSection('Contents');
    if (contents && contentData && arr(contentData.subsections || contentData.subs).length) {
      const body = contents.querySelector('.mahapurana-collapse-body');
      if (body && !body.dataset.professionalMap) {
        const intro = arr(contentData.paragraphs || contentData.text || contentData.summary).map(plain).filter(Boolean);
        const subs = arr(contentData.subsections || contentData.subs);
        body.innerHTML = `${intro.map(p => `<p class="purana-map-note">${esc(p)}</p>`).join('')}${subs.map(sub => {
          const paras = arr(sub.paragraphs || sub.text || sub.summary || sub.note).map(plain).filter(Boolean);
          const bullets = arr(sub.bullets).map(plain).filter(Boolean);
          return `<h3>${esc(sub.title || sub.name || 'Textual block')}</h3>${paras.map(p => `<p>${esc(p)}</p>`).join('')}${bullets.length ? `<ul>${bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}`;
        }).join('')}`;
        body.dataset.professionalMap = 'true';
      }
    }

    const refs = getSection('References');
    if (refs) {
      const list = refs.querySelector('ol');
      const existing = norm(list?.textContent || '');
      if (list) arr(e.sources).forEach(source => {
        const title = source?.title || source?.citation || source?.name || plain(source);
        if (title && !existing.includes(norm(title).slice(0,36))) list.insertAdjacentHTML('beforeend', sourceToLi(source));
      });
    }

    const toc = root.querySelector('.kena-toc');
    if (toc && !toc.querySelector('.purana-method-note')) {
      const note = document.createElement('div');
      note.className = 'purana-method-note';
      note.textContent = 'Contents follow the stated recension; chapter ranges are not silently transferred between incompatible manuscript or printed traditions.';
      toc.appendChild(note);
    }
  }

  function loadResearch(){
    if (window.__PURANA_PROFESSIONAL_RESEARCH_LOADING__) return;
    window.__PURANA_PROFESSIONAL_RESEARCH_LOADING__ = true;
    const s = document.createElement('script');
    s.src = '/vivekadrishti/assets/js/puranas/current/purana-research-20260906.js?build=20260906-v1';
    s.onload = applyResearch;
    s.onerror = () => console.warn('Professional Purana research layer could not be loaded.');
    document.head.appendChild(s);
  }

  if (root.classList.contains('is-loaded')) loadResearch();
  else {
    const observer = new MutationObserver(() => {
      if (!root.classList.contains('is-loaded')) return;
      observer.disconnect();
      loadResearch();
    });
    observer.observe(root,{attributes:true,attributeFilter:['class'],childList:true,subtree:false});
  }
})();
