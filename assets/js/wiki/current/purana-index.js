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
  const witnesses = {
    'Devī Bhāgavata 1.3.13–16':['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nāradīya Purāṇa','Śiva Purāṇa','Daurvāsasa Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Sāmba Purāṇa','Nandikṛta Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Āditya Purāṇa','Māheśvara Purāṇa','Bhāgavata Purāṇa','Vāsiṣṭha Purāṇa'],
    'Kūrma Purāṇa 1.1.17–20':['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Vāmana Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'],
    'Padma Purāṇa, Pātāla-khaṇḍa 111.94b–98':['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Āṇḍa Purāṇa','Daurvāsasa Purāṇa','Another Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Another Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśa Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Kaumāra Purāṇa'],
    'Bṛhaddharma Purāṇa 1.25.23–26':['Ādi Purāṇa','Āditya Purāṇa','Bṛhannāradīya Purāṇa','Nāradīya Purāṇa','Nandīśvara Purāṇa','Bṛhannandīśvara Purāṇa','Sāmba Purāṇa','Kriyāyogasāra Purāṇa','Kālikā Purāṇa','Dharma Purāṇa','Viṣṇudharmottara Purāṇa','Śivadharma Purāṇa','Viṣṇudharma Purāṇa','Vāmana Purāṇa','Varuṇa Purāṇa','Nṛsiṃha Purāṇa','Bhārgava Purāṇa','Bṛhaddharma Purāṇa']
  };
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug = value => String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\bpurana\b/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const mahaItem = name => `<li><button type="button" class="shastra-name purana-wiki-link" data-name="${esc(name)}" data-kind="Mahāpurāṇa"><span>${esc(name)}</span></button></li>`;
  const upaItem = name => `<li><a class="purana-wiki-link upapurana-page-link" href="/vivekadrishti/articles/scripture/upapuranas/${slug(name)}/"><span>${esc(name)}</span></a></li>`;
  const witnessBox = () => `<div class="upapurana-index-note"><p><b>Comparative Upapurāṇa witness corpus: 39 distinct labels.</b> This is not one canonical list of thirty-nine. Four traditional sources each transmit an “eighteen” list, but the titles disagree substantially. Some entries are extant texts; others are lost, fragmentary or identity-disputed; names overlapping Mahāpurāṇas are not assumed to denote the same work.</p><details><summary>Traditional list witnesses</summary>${Object.entries(witnesses).map(([source,names])=>`<section><h4>${esc(source)}</h4><p>${names.map(esc).join(' · ')}</p></section>`).join('')}</details></div>`;

  function renderPureWiki() {
    if (stage.hidden) return;
    const title = stage.querySelector('.shastra-title');
    if (!title || title.textContent.trim() !== 'Purāṇas') return;
    if (stage.querySelector('.purana-wiki-directory')) return;
    stage.innerHTML = `<h2 class="shastra-title">Purāṇas</h2><div class="shastra-holder purana-wiki-directory"><section class="purana-wiki-column"><h3>Mahāpurāṇas</h3><ul class="purana-wiki-list">${maha.map(mahaItem).join('')}</ul><h3 class="purana-wiki-secondary-heading">Other Mahāpurāṇa attestations</h3><ul class="purana-wiki-list purana-wiki-short-list">${otherMaha.map(mahaItem).join('')}</ul></section><section class="purana-wiki-column"><h3>Upapurāṇas</h3>${witnessBox()}<ul class="purana-wiki-list">${upa.map(upaItem).join('')}</ul></section></div>`;
  }
  if(!document.getElementById('upapurana-index-note-style')){const s=document.createElement('style');s.id='upapurana-index-note-style';s.textContent=`.upapurana-page-link{display:inline!important;color:#36c!important;text-decoration:none!important}.upapurana-page-link:hover{text-decoration:underline!important}.upapurana-index-note{margin:8px 0 14px;padding:10px 12px;border:1px solid #a2a9b1;background:#f8f9fa;color:#202122;font:13px/1.5 Arial,Helvetica,sans-serif}.upapurana-index-note p{margin:0 0 8px!important;color:inherit!important;font:inherit!important}.upapurana-index-note summary{cursor:pointer;color:#36c}.upapurana-index-note section{margin:10px 0 0;padding-top:8px;border-top:1px solid #eaecf0}.upapurana-index-note h4{margin:0 0 4px!important;font:700 13px/1.4 Arial,Helvetica,sans-serif!important}.upapurana-index-note section p{font-size:12px!important;line-height:1.5!important}`;document.head.appendChild(s)}
  const observer = new MutationObserver(() => requestAnimationFrame(renderPureWiki));
  observer.observe(stage, {childList:true, attributes:true, attributeFilter:['hidden']});
  root.addEventListener('click', event => {if (event.target.closest('.corpus-button[data-corpus="puranas"]')) requestAnimationFrame(() => requestAnimationFrame(renderPureWiki));});
  renderPureWiki();
})();