(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  if (!stage) return;

  const maha = [
    'Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa',
    'Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa',
    'Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa',
    'Kūrma Purāṇa','Brahmāṇḍa Purāṇa'
  ];

  const otherMaha = ['Vāyu Purāṇa','Devī Bhāgavata Purāṇa','Mahābhāgavata Purāṇa'];

  const upa = [
    'Ādi Purāṇa','Āditya Purāṇa','Ādya / Sanatkumāra Purāṇa','Āṇḍa Purāṇa','Another Brahmāṇḍa Purāṇa',
    'Another Nāradīya Purāṇa','Auśanasa Purāṇa','Bhāgavata Purāṇa','Bhārgava Purāṇa','Brahmāṇḍa Purāṇa',
    'Bṛhaddharma Purāṇa','Bṛhannandīśvara Purāṇa','Bṛhannāradīya Purāṇa','Daurvāsasa Purāṇa','Dharma Purāṇa',
    'Kālikā Purāṇa','Kapila Purāṇa','Kaumāra Purāṇa','Kriyāyogasāra Purāṇa','Māheśa Purāṇa',
    'Māheśvara Purāṇa','Mānava Purāṇa','Mārīca Purāṇa','Nandikṛta Purāṇa','Nandīśvara Purāṇa',
    'Nāradīya Purāṇa','Nṛsiṃha Purāṇa','Parāśara Purāṇa','Sāmba Purāṇa','Sanatkumāra Purāṇa',
    'Saura Purāṇa','Śiva Purāṇa','Śivadharma Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Varuṇa Purāṇa',
    'Vāsiṣṭha Purāṇa','Viṣṇudharma Purāṇa','Viṣṇudharmottara Purāṇa'
  ];

  const esc = value => String(value).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const item = (name, kind) => `<li><button type="button" class="shastra-name purana-wiki-link" data-name="${esc(name)}" data-kind="${esc(kind)}"><span>${esc(name)}</span></button></li>`;

  const group = ({id, title, note, items, kind, open = false}) => `
    <details class="purana-index-group" id="${esc(id)}"${open ? ' open' : ''}>
      <summary>
        <span class="purana-index-group-title">${esc(title)}</span>
        <span class="purana-index-group-meta">${esc(note)}</span>
      </summary>
      <div class="purana-index-group-body">
        <ul class="purana-wiki-list">${items.map(name => item(name, kind)).join('')}</ul>
      </div>
    </details>`;

  function renderPureWiki() {
    if (stage.hidden) return;
    const title = stage.querySelector('.shastra-title');
    if (!title || !/^Purā?nas$/i.test(title.textContent.trim().replace('ā','a'))) return;
    if (stage.querySelector('.purana-wiki-directory')) return;

    stage.innerHTML = `
      <article class="purana-index-article" aria-labelledby="purana-index-title">
        <header class="purana-index-heading">
          <h2 class="shastra-title" id="purana-index-title">Purāṇas</h2>
        </header>
        <div class="purana-index-lead">
          <p>The <i>Purāṇas</i> are a large and textually stratified body of Sanskrit and vernacular religious literature. The traditional category of eighteen Mahāpurāṇas coexists with alternative enumerations, regional recensions, extensive accretion, and a much larger body of Upapurāṇas. Select a title below to open its research article.</p>
          <p>Dates in the individual articles distinguish proposed textual strata, the formation of a received recension, and the dates of surviving manuscripts or printed editions; these are not treated as interchangeable evidence.</p>
        </div>
        <nav class="purana-index-toc" aria-label="Contents">
          <div class="purana-index-toc-title">Contents</div>
          <ol>
            <li><a href="#mahapuranas">Mahāpurāṇas</a></li>
            <li><a href="#other-mahapurana-attestations">Other Mahāpurāṇa attestations</a></li>
            <li><a href="#upapuranas">Upapurāṇas</a></li>
          </ol>
        </nav>
        <div class="shastra-holder purana-wiki-directory">
          ${group({id:'mahapuranas', title:'Mahāpurāṇas', note:'18-text traditional enumeration', items:maha, kind:'Mahāpurāṇa', open:true})}
          ${group({id:'other-mahapurana-attestations', title:'Other Mahāpurāṇa attestations', note:'alternative and sectarian enumerations', items:otherMaha, kind:'Mahāpurāṇa'})}
          ${group({id:'upapuranas', title:'Upapurāṇas', note:'secondary Purāṇic corpus', items:upa, kind:'Upapurāṇa'})}
        </div>
      </article>`;
  }

  root.addEventListener('click', event => {
    const tocLink = event.target.closest('.purana-index-toc a[href^="#"]');
    if (tocLink) {
      const target = stage.querySelector(tocLink.getAttribute('href'));
      if (target instanceof HTMLDetailsElement) target.open = true;
    }
    if (event.target.closest('.corpus-button[data-corpus="puranas"]')) {
      requestAnimationFrame(() => requestAnimationFrame(renderPureWiki));
    }
  });

  const observer = new MutationObserver(() => requestAnimationFrame(renderPureWiki));
  observer.observe(stage, {childList:true, attributes:true, attributeFilter:['hidden']});
  renderPureWiki();
})();
