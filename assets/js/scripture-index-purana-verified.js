(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  if (!stage) return;

  const guna = {
    sattvika: ['Viṣṇu Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Garuḍa Purāṇa','Padma Purāṇa','Varāha Purāṇa'],
    rajasa: ['Brahmāṇḍa Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Bhaviṣya Purāṇa','Vāmana Purāṇa','Brahma Purāṇa'],
    tamasa: ['Matsya Purāṇa','Kūrma Purāṇa','Liṅga Purāṇa','Śiva Purāṇa','Skanda Purāṇa','Agni Purāṇa']
  };

  const mahaWitnesses = [
    { source:'Śrīmad Bhāgavata 12.7.23–24', items:['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa'] },
    { source:'Matsya Purāṇa 53.11–56', items:['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Vāyu Purāṇa','Bhāgavata Purāṇa','Nāradīya Purāṇa','Mārkaṇḍeya Purāṇa','Agni Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Liṅga Purāṇa','Varāha Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Garuḍa Purāṇa','Brahmāṇḍa Purāṇa'] },
    { source:'Agni Purāṇa 272.1–23', items:['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Vāyu Purāṇa','Bhāgavata Purāṇa','Nāradīya Purāṇa','Mārkaṇḍeya Purāṇa','Agni Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Liṅga Purāṇa','Varāha Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Garuḍa Purāṇa','Brahmāṇḍa Purāṇa'] },
    { source:'Nārada Purāṇa I.92.26–28', items:['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Vāyu Purāṇa','Bhāgavata Purāṇa','Nāradīya Purāṇa','Mārkaṇḍeya Purāṇa','Agni Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Liṅga Purāṇa','Varāha Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Garuḍa Purāṇa','Brahmāṇḍa Purāṇa'] },
    { source:'Devī Bhāgavata I.3.21', items:['Matsya Purāṇa','Mārkaṇḍeya Purāṇa','Bhāgavata Purāṇa','Bhaviṣya Purāṇa','Brahma Purāṇa','Brahmavaivarta Purāṇa','Brahmāṇḍa Purāṇa','Vāmana Purāṇa','Viṣṇu Purāṇa','Vāyu Purāṇa','Varāha Purāṇa','Agni Purāṇa','Nāradīya Purāṇa','Padma Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Kūrma Purāṇa','Skanda Purāṇa'] },
    { source:'Varāha Purāṇa 112.69ff.', items:['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Bhāgavata Purāṇa','Nāradīya Purāṇa','Mārkaṇḍeya Purāṇa','Agni Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Liṅga Purāṇa','Varāha Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Vāyu Purāṇa','Nṛsiṃha Purāṇa'] },
    { source:'Vāyu Purāṇa 104.2–10', items:['Matsya Purāṇa','Bhaviṣya Purāṇa','Mārkaṇḍeya Purāṇa','Brahmavaivarta Purāṇa','Brahmāṇḍa Purāṇa','Bhāgavata Purāṇa','Brahma Purāṇa','Vāmana Purāṇa','Ādika Purāṇa','Vāyu Purāṇa','Nāradīya Purāṇa','Garuḍa Purāṇa','Padma Purāṇa','Kūrma Purāṇa','Varāha Purāṇa','Skanda Purāṇa'] },
    { source:'Ekāmra Purāṇa 1.18–20a', items:['Nṛsiṃha Purāṇa'] },
    { source:'Bṛhaddharma Purāṇa I.25.20–22 (Dacca mss.)', items:['Brahma Purāṇa','Padma Purāṇa','Brahmāṇḍa Purāṇa','Viṣṇu Purāṇa','Brahmavaivarta Purāṇa','Mahābhāgavata Purāṇa','Bhaviṣya Purāṇa','Garuḍa Purāṇa','Liṅga Purāṇa','Śiva Purāṇa','Varāha Purāṇa','Mārkaṇḍeya Purāṇa','Skanda Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Agni Purāṇa','Vāyu Purāṇa','Bhāgavata Purāṇa'] },
    { source:'Devī Bhāgavata chapter colophons', items:['Devī Bhāgavata Purāṇa'] }
  ];

  const upaWitnesses = [
    { source:'Matsya Purāṇa 53.59–62', items:['Nṛsiṃha Purāṇa','Nandi Purāṇa','Sāmba Purāṇa','Āditya Purāṇa'] },
    { source:'Kūrma Purāṇa I.1.17–20', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Vāmana Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'] },
    { source:'Skanda Purāṇa, Saura-saṃhitā', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālī Purāṇa','Vāsiṣṭha-Liṅga / Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'] },
    { source:'Skanda Purāṇa, Revā-khaṇḍa 1.46–52', items:['Sanatkumāra / Saura Purāṇa','Nṛsiṃha Purāṇa','Śaukeya Purāṇa','Bārhaspatya Purāṇa','Daurvāsasa Purāṇa','Nārada-prokta Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Bhāgavata Purāṇa','Kūrma Purāṇa'] },
    { source:'Skanda Purāṇa, Prabhāsa-khaṇḍa I.2.11–15', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nārada-prokta Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Another Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'] },
    { source:'Skanda Purāṇa, Sūta-saṃhitā, Śiva-māhātmya 1.13b–18', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālī Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'] },
    { source:'Garuḍa Purāṇa I.223.17–20', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nārada-prokta Purāṇa','Kapila Purāṇa','Vāmana Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'] },
    { source:'Padma Purāṇa, Pātāla-khaṇḍa 111.94b–98', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Āṇḍa Purāṇa','Daurvāsasa Purāṇa','Another Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Another Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśa Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Kaumāra Purāṇa'] },
    { source:'Devī Bhāgavata I.3.13–16', items:['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nāradīya Purāṇa','Śiva Purāṇa','Daurvāsasa Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Sāmba Purāṇa','Nandi-kṛta Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Āditya Purāṇa','Māheśvara Purāṇa','Bhāgavata Purāṇa','Vāsiṣṭha Purāṇa'] },
    { source:'Bṛhaddharma Purāṇa I.25.23–26', items:['Ādi Purāṇa','Āditya Purāṇa','Bṛhannāradīya Purāṇa','Nāradīya Purāṇa','Nandikeśvara Purāṇa','Bṛhannandikeśvara Purāṇa','Sāmba Purāṇa','Kriyāyogasāra Purāṇa','Kālikā Purāṇa','Dharma Purāṇa','Viṣṇudharmottara Purāṇa','Śivadharma Purāṇa','Viṣṇudharma Purāṇa','Vāmana Purāṇa','Varuṇa Purāṇa','Nṛsiṃha Purāṇa','Bhārgava Purāṇa','Bṛhaddharma Purāṇa'] },
    { source:'Parāśara Upapurāṇa 1.28–31', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālī Purāṇa','Vāsiṣṭha-Liṅga / Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'] },
    { source:'Ekāmra Purāṇa 1.20b–23', items:['Bṛhannṛsiṃha Purāṇa','Bṛhadvaiṣṇava Purāṇa','Garuḍa Purāṇa','Bṛhannāradīya Purāṇa','Nāradīya Purāṇa','Prabhāsaka Purāṇa','Līlāvatī Purāṇa','Devī Purāṇa','Kālikā Purāṇa','Ākheṭaka Purāṇa','Bṛhannandī Purāṇa','Nandikeśvara Purāṇa','Ekāmra Purāṇa','Ekapāda Purāṇa','Laghu-Bhāgavata Purāṇa','Mṛtyuñjaya Purāṇa','Āṅgīrasaka Purāṇa','Sāmba Purāṇa'] },
    { source:'Varuṇa Upapurāṇa 1', items:['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nāradīyaka Purāṇa','Vāsiṣṭha-Liṅga Purāṇa','Mārīca Purāṇa','Nanda Purāṇa','Bhārgava Purāṇa','Māheśvara Purāṇa','Auśanasa Purāṇa','Āditya Purāṇa','Gāṇeśaka Purāṇa','Kālīya Purāṇa','Kapila Purāṇa','Daurvāsasa Purāṇa','Śivadharma Purāṇa','Parāśara Purāṇa','Sāmba Purāṇa','Varuṇa Purāṇa'] },
    { source:'Saura Purāṇa 9.12b–13', items:['Saura Purāṇa'] },
    { source:'Mahābhāgavata chapter colophons', items:['Mahābhāgavata Purāṇa'] }
  ];

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function buildMap(witnesses) {
    const map = new Map();
    witnesses.forEach(({source,items}) => items.forEach(name => {
      if (!map.has(name)) map.set(name, []);
      if (!map.get(name).includes(source)) map.get(name).push(source);
    }));
    return map;
  }

  const maha = buildMap(mahaWitnesses);
  const upa = buildMap(upaWitnesses);
  const all = [...new Set([...maha.keys(), ...upa.keys()])].sort((a,b) => a.localeCompare(b,'en'));
  const lists = {
    'Mahāpurāṇa': all.filter(name => maha.has(name) && !upa.has(name)),
    'Upapurāṇa': all.filter(name => upa.has(name) && !maha.has(name)),
    'Both': all.filter(name => maha.has(name) && upa.has(name))
  };

  function gunaClass(name) {
    if (guna.sattvika.includes(name)) return ' guna-sattvika';
    if (guna.rajasa.includes(name)) return ' guna-rajasa';
    if (guna.tamasa.includes(name)) return ' guna-tamasa';
    return '';
  }

  function sources(name, kind) {
    const rows = [];
    if (kind !== 'Upapurāṇa' && maha.has(name)) rows.push(`Mahā: ${maha.get(name).join(' · ')}`);
    if (kind !== 'Mahāpurāṇa' && upa.has(name)) rows.push(`Upa: ${upa.get(name).join(' · ')}`);
    return rows.join(' | ');
  }

  function renderVerified(view) {
    if (stage.hidden) return;
    const tabs = ['Mahāpurāṇa','Upapurāṇa','Both'];
    const chosen = tabs.includes(view) ? view : 'Mahāpurāṇa';
    stage.innerHTML = `<h2 class="shastra-title">Purāṇas</h2><div class="subnav shastra-subnav">${tabs.map(tab => `<button type="button" class="shastra-tab${tab === chosen ? ' is-active' : ''}" data-group="puranas" data-view="${esc(tab)}">${esc(tab)}</button>`).join('')}</div><div class="shastra-holder"><div class="shastra-grid purana-grid">${lists[chosen].map(name => `<button type="button" class="shastra-name purana-name${gunaClass(name)}${chosen === 'Both' ? ' purana-both' : ''}"><span>${esc(name)}</span><small>${esc(sources(name,chosen))}</small></button>`).join('')}</div></div>`;
  }

  root.addEventListener('click', event => {
    const corpus = event.target.closest('.corpus-button');
    if (corpus && corpus.dataset.corpus === 'puranas') {
      if (!stage.hidden) renderVerified('Mahāpurāṇa');
      return;
    }
    const tab = event.target.closest('.shastra-tab');
    if (tab && tab.dataset.group === 'puranas' && ['Mahāpurāṇa','Upapurāṇa','Both'].includes(tab.dataset.view)) renderVerified(tab.dataset.view);
  });
})();