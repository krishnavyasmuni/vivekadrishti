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
    {
      source: 'Śrīmad Bhāgavata 12.7.23–24',
      items: ['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa']
    },
    {
      source: 'Padma Purāṇa V.115.89–93a',
      items: ['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Bhāgavata Purāṇa','Bhaviṣya Purāṇa','Nāradīya Purāṇa','Mārkaṇḍeya Purāṇa','Agni Purāṇa','Brahmavaivarta Purāṇa','Liṅga Purāṇa','Vāmana Purāṇa','Skanda Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Varāha Purāṇa','Garuḍa Purāṇa','Brahmāṇḍa Purāṇa']
    },
    {
      source: 'Bṛhaddharma Purāṇa I.25.20–22 (Dacca mss.)',
      items: ['Brahma Purāṇa','Padma Purāṇa','Brahmāṇḍa Purāṇa','Viṣṇu Purāṇa','Brahmavaivarta Purāṇa','Mahābhāgavata Purāṇa','Bhaviṣya Purāṇa','Garuḍa Purāṇa','Liṅga Purāṇa','Śiva Purāṇa','Varāha Purāṇa','Mārkaṇḍeya Purāṇa','Skanda Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Agni Purāṇa','Vāyu Purāṇa','Bhāgavata Purāṇa']
    },
    {
      source: 'Devī Bhāgavata colophons',
      items: ['Devī Bhāgavata Purāṇa']
    }
  ];

  const upaWitnesses = [
    {
      source: 'Devī Bhāgavata 1.3.13–16',
      items: ['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nāradīya Purāṇa','Śiva Purāṇa','Daurvāsasa Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Sāmba Purāṇa','Nandikṛta Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Āditya Purāṇa','Māheśvara Purāṇa','Bhāgavata Purāṇa','Vāsiṣṭha Purāṇa']
    },
    {
      source: 'Kūrma Purāṇa I.1.17–20',
      items: ['Ādya (Sanatkumāra) Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Vāmana Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa']
    },
    {
      source: 'Padma Purāṇa V.115.93b–97',
      items: ['Ādya (Sanatkumāra) Purāṇa','Nṛsiṃha Purāṇa','Āṇḍa / Māṇḍa Purāṇa','Daurvāsasa Purāṇa','Another Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Another Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśa Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Kaumāra Purāṇa']
    },
    {
      source: 'Bṛhaddharma Purāṇa I.25.23–26',
      items: ['Ādi Purāṇa','Āditya Purāṇa','Bṛhannāradīya Purāṇa','Nārada Purāṇa','Nandikeśvara Purāṇa','Bṛhannandikeśvara Purāṇa','Sāmba Purāṇa','Kriyāyogasāra Purāṇa','Kālikā Purāṇa','Dharma Purāṇa','Viṣṇudharmottara Purāṇa','Śivadharma Purāṇa','Viṣṇudharma Purāṇa','Vāmana Purāṇa','Varuṇa Purāṇa','Nṛsiṃha Purāṇa','Bhārgava Purāṇa','Bṛhaddharma Purāṇa']
    },
    {
      source: 'Skanda Purāṇa, Revā-khaṇḍa 1.45b–53',
      items: ['Sanatkumāra (Saura) Purāṇa','Nṛsiṃha Purāṇa','Nanda / Śaukeya Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nārada Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Bhāgavata Purāṇa','Kūrma Purāṇa']
    },
    {
      source: 'Mahābhāgavata chapter colophons',
      items: ['Mahābhāgavata Purāṇa']
    }
  ];

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function buildMap(witnesses) {
    const map = new Map();
    witnesses.forEach(({source,items}) => {
      items.forEach(name => {
        if (!map.has(name)) map.set(name, []);
        if (!map.get(name).includes(source)) map.get(name).push(source);
      });
    });
    return map;
  }

  const maha = buildMap(mahaWitnesses);
  const upa = buildMap(upaWitnesses);
  const all = [...new Set([...maha.keys(), ...upa.keys()])].sort((a,b) => a.localeCompare(b, 'en'));
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
    stage.innerHTML = `<h2 class="shastra-title">Purāṇas</h2><div class="subnav shastra-subnav">${tabs.map(tab => `<button type="button" class="shastra-tab${tab === chosen ? ' is-active' : ''}" data-group="puranas" data-view="${esc(tab)}">${esc(tab)}</button>`).join('')}</div><div class="shastra-holder"><div class="shastra-grid purana-grid">${lists[chosen].map(name => `<button type="button" class="shastra-name purana-name${gunaClass(name)}${chosen === 'Both' ? ' purana-both' : ''}"><span>${esc(name)}</span><small>${esc(sources(name, chosen))}</small></button>`).join('')}</div></div>`;
  }

  root.addEventListener('click', event => {
    const corpus = event.target.closest('.corpus-button');
    if (corpus && corpus.dataset.corpus === 'puranas') {
      if (!stage.hidden) renderVerified('Mahāpurāṇa');
      return;
    }

    const tab = event.target.closest('.shastra-tab');
    if (tab && ['Mahāpurāṇa','Upapurāṇa','Both'].includes(tab.dataset.view)) {
      const heading = stage.querySelector('.shastra-title');
      if (heading && heading.textContent === 'Purāṇas') renderVerified(tab.dataset.view);
    }
  });
})();