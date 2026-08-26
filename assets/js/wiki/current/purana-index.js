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

  function renderPureWiki() {
    if (stage.hidden) return;
    const title = stage.querySelector('.shastra-title');
    if (!title || title.textContent.trim() !== 'Purāṇas') return;
    if (stage.querySelector('.purana-wiki-directory')) return;

    stage.innerHTML = `
      <h2 class="shastra-title">Purāṇas</h2>
      <div class="shastra-holder purana-wiki-directory">
        <section class="purana-wiki-column">
          <h3>Mahāpurāṇas</h3>
          <ul class="purana-wiki-list">${maha.map(name => item(name, 'Mahāpurāṇa')).join('')}</ul>
          <h3 class="purana-wiki-secondary-heading">Other Mahāpurāṇa attestations</h3>
          <ul class="purana-wiki-list purana-wiki-short-list">${otherMaha.map(name => item(name, 'Mahāpurāṇa')).join('')}</ul>
        </section>
        <section class="purana-wiki-column">
          <h3>Upapurāṇas</h3>
          <ul class="purana-wiki-list">${upa.map(name => item(name, 'Upapurāṇa')).join('')}</ul>
        </section>
      </div>`;
  }

  const observer = new MutationObserver(() => requestAnimationFrame(renderPureWiki));
  observer.observe(stage, {childList:true, attributes:true, attributeFilter:['hidden']});

  root.addEventListener('click', event => {
    if (event.target.closest('.corpus-button[data-corpus="puranas"]')) {
      requestAnimationFrame(() => requestAnimationFrame(renderPureWiki));
    }
  });

  renderPureWiki();
})();
