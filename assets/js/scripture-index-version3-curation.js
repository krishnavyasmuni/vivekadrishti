(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  const puranaButton = root.querySelector('[data-corpus="puranas"]');
  const smritiButton = root.querySelector('[data-corpus="smriti"]');
  if (!stage || !puranaButton || !smritiButton) return;

  const sectLabels = {
    vaisnava: 'Vaiṣṇava',
    saiva: 'Śaiva',
    sakta: 'Śākta',
    saura: 'Saura',
    ganapatya: 'Gāṇapatya',
    brahma: 'Brahmā / cosmological',
    mixed: 'Mixed / composite'
  };

  const padmaGuna = {
    'Viṣṇu Purāṇa':'Sāttvika','Nāradīya Purāṇa':'Sāttvika','Bhāgavata Purāṇa':'Sāttvika','Garuḍa Purāṇa':'Sāttvika','Padma Purāṇa':'Sāttvika','Varāha Purāṇa':'Sāttvika',
    'Brahmāṇḍa Purāṇa':'Rājasa','Brahmavaivarta Purāṇa':'Rājasa','Mārkaṇḍeya Purāṇa':'Rājasa','Brahma Purāṇa':'Rājasa','Vāmana Purāṇa':'Rājasa','Bhaviṣya Purāṇa':'Rājasa',
    'Matsya Purāṇa':'Tāmasa','Kūrma Purāṇa':'Tāmasa','Liṅga Purāṇa':'Tāmasa','Śiva Purāṇa':'Tāmasa','Agni Purāṇa':'Tāmasa','Skanda Purāṇa':'Tāmasa'
  };

  const puranaAbout = {
    'Brahma Purāṇa':'Creation, sacred geography, pilgrimage and religious observance.',
    'Padma Purāṇa':'Cosmology, pilgrimage, dharma and extensive Vaiṣṇava devotional material.',
    'Viṣṇu Purāṇa':'Cosmology, dynasties, avatāras and Vaiṣṇava theology.',
    'Vāyu Purāṇa':'Cosmology, genealogy and early Purāṇic material.',
    'Śiva Purāṇa':'Śiva, his forms, myths, worship and theology.',
    'Bhāgavata Purāṇa':'Kṛṣṇa, avatāra theology and bhakti.',
    'Devī Bhāgavata Purāṇa':'Devī theology, cosmology and Śākta devotion.',
    'Mahābhāgavata Purāṇa':'Śākta mythology and Goddess-centred theology.',
    'Nāradīya Purāṇa':'Vaiṣṇava worship, pilgrimage and religious practice.',
    'Mārkaṇḍeya Purāṇa':'A diverse Purāṇic work containing the Devī Māhātmya.',
    'Agni Purāṇa':'Ritual, theology, polity, architecture, grammar, medicine and the arts.',
    'Bhaviṣya Purāṇa':'Ritual, social, dynastic and future-oriented material.',
    'Brahmavaivarta Purāṇa':'Kṛṣṇa and Rādhā, creation theology and devotional mythology.',
    'Liṅga Purāṇa':'The liṅga, Śiva, cosmology, sacred time and worship.',
    'Varāha Purāṇa':'Varāha, pilgrimage and sacred geography.',
    'Skanda Purāṇa':'Sacred geography, pilgrimage and extensive Śaiva material.',
    'Vāmana Purāṇa':'Cosmology, geography and substantial Śaiva material.',
    'Kūrma Purāṇa':'Vaiṣṇava, Śaiva and yogic teaching in a Kūrma frame.',
    'Matsya Purāṇa':'The flood narrative, kingship, temple construction, iconography and genealogies.',
    'Garuḍa Purāṇa':'Ritual, afterlife teaching, medicine, ethics and religious observance.',
    'Brahmāṇḍa Purāṇa':'Cosmology and material associated with the Lalitā tradition.',
    'Nṛsiṃha Purāṇa':'Nṛsiṃha and Vaiṣṇava mythic and devotional material.',
    'Kālikā Purāṇa':'The Goddess, Kāmākhyā, ritual and sacred geography.',
    'Saura Purāṇa':'Purāṇic material transmitted under the Saura title.',
    'Vahni (Vahnija/Agneya) Purāṇa':'A Purāṇic title transmitted under Vahni/Vahnija/Agneya naming.'
  };

  const mahaPuranas = [
    ['Brahma Purāṇa','brahma'],['Padma Purāṇa','vaisnava'],['Viṣṇu Purāṇa','vaisnava'],
    ['Śiva Purāṇa','saiva'],['Vāyu Purāṇa','mixed'],['Bhāgavata Purāṇa','vaisnava'],
    ['Devī Bhāgavata Purāṇa','sakta'],['Mahābhāgavata Purāṇa','sakta'],['Nāradīya Purāṇa','vaisnava'],
    ['Mārkaṇḍeya Purāṇa','mixed'],['Agni Purāṇa','mixed'],['Bhaviṣya Purāṇa','mixed'],
    ['Brahmavaivarta Purāṇa','vaisnava'],['Liṅga Purāṇa','saiva'],['Varāha Purāṇa','vaisnava'],
    ['Skanda Purāṇa','saiva'],['Vāmana Purāṇa','mixed'],['Kūrma Purāṇa','mixed'],
    ['Matsya Purāṇa','mixed'],['Garuḍa Purāṇa','vaisnava'],['Brahmāṇḍa Purāṇa','mixed'],
    ['Nṛsiṃha Purāṇa','vaisnava'],['Kālikā Purāṇa','sakta'],['Saura Purāṇa','saura'],
    ['Vahni (Vahnija/Agneya) Purāṇa','mixed']
  ];

  const upaPuranas = [
    ['Sanatkumāra / Ādya Purāṇa','mixed'],['Śivadharma Purāṇa','saiva'],['Durvāsas / Daurvāsasa Purāṇa','mixed'],
    ['Kapila Purāṇa','mixed'],['Mānava Purāṇa','mixed'],['Auśanasa / Uśanas Purāṇa','mixed'],
    ['Varuṇa Purāṇa','mixed'],['Māheśvara Purāṇa','saiva'],['Sāmba Purāṇa','saura'],
    ['Parāśara Purāṇa','mixed'],['Mārīca Purāṇa','mixed'],['Bhārgava Purāṇa','mixed'],
    ['Nanda / Nandikeśvara Purāṇa','saiva'],['Kaumāra Purāṇa','saiva'],['Āditya Purāṇa','saura'],
    ['Vāsiṣṭha Purāṇa','mixed'],['Ādi Purāṇa','mixed'],['Bṛhannāradīya Purāṇa','vaisnava'],
    ['Bṛhannandīśvara Purāṇa','saiva'],['Kriyāyogasāra Purāṇa','vaisnava'],['Dharma Purāṇa','mixed'],
    ['Viṣṇudharmottara Purāṇa','vaisnava'],['Viṣṇudharma Purāṇa','vaisnava'],['Bṛhaddharma Purāṇa','mixed']
  ];

  const yajnavalkya = ['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha'];
  const parasara = ['Manu','Vasiṣṭha','Kāśyapa','Garga','Gautama','Uśanas','Atri','Viṣṇu','Saṃvarta','Dakṣa','Aṅgiras','Śātātapa','Hārīta','Yājñavalkya','Āpastamba','Śaṅkha','Likhita','Kātyāyana','Pracetas'];
  const padmaSmritiGuna = {
    sattvika:['Vasiṣṭha','Hārīta','Vyāsa','Parāśara','Bharadvāja','Kāśyapa'],
    rajasa:['Yājñavalkya','Atri','Tittiri','Dakṣa','Kātyāyana','Viṣṇu'],
    tamasa:['Gautama','Bṛhaspati','Saṃvarta','Yama','Śaṅkha','Uśanas']
  };

  const smritiSets = {
    yaj:{label:'Yājñavalkya Smṛti · 20',source:'Yājñavalkya Smṛti 1.4–5',items:yajnavalkya,tone:'source-yaj'},
    par:{label:'Parāśara Smṛti · 19',source:'Parāśara Smṛti, Ācāra 1.12–15',items:parasara,tone:'source-par'}
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function info(title, meta, about) {
    return `<div class="text-info taxonomy-info" aria-live="polite"><div class="text-info-head"><strong>${esc(title)}</strong>${meta ? `<span>${esc(meta)}</span>` : ''}</div>${about ? `<p>${esc(about)}</p>` : ''}</div>`;
  }

  function itemButton(name, tone, tag, meta, about, extraClass='') {
    return `<button class="text-button taxonomy-button tone-${esc(tone)} ${esc(extraClass)}" type="button" data-title="${esc(name)}" data-meta="${esc(meta)}" data-about="${esc(about || '')}"><span>${esc(name)}</span>${tag ? `<small>${esc(tag)}</small>` : ''}</button>`;
  }

  function wire(scope) {
    scope.querySelectorAll('.taxonomy-button').forEach(button => {
      button.addEventListener('click', () => {
        scope.querySelectorAll('.taxonomy-button.is-active').forEach(b => b.classList.remove('is-active'));
        button.classList.add('is-active');
        const old = scope.querySelector('.taxonomy-info');
        if (old) old.remove();
        scope.insertAdjacentHTML('beforeend', info(button.dataset.title, button.dataset.meta, button.dataset.about));
      });
    });
  }

  function sectLegend() {
    return `<div class="taxonomy-legend sect-legend">${Object.entries(sectLabels).map(([key,label]) => `<span class="legend-item tone-${key}">${esc(label)}</span>`).join('')}</div>`;
  }

  function gunaLegend() {
    return `<div class="taxonomy-legend guna-legend"><span class="legend-item guna-sattvika">Sāttvika</span><span class="legend-item guna-rajasa">Rājasa</span><span class="legend-item guna-tamasa">Tāmasa</span></div>`;
  }

  function sourceStrip(text) {
    return `<div class="source-line"><span>Source</span><strong>${esc(text)}</strong></div>`;
  }

  function renderPuranaList(holder, type) {
    const isMaha = type === 'maha';
    const items = isMaha ? mahaPuranas : upaPuranas;
    holder.innerHTML = `${sectLegend()}<div class="text-grid taxonomy-grid">${items.map(([name,sect]) => {
      const guna = isMaha ? padmaGuna[name] : '';
      const tag = guna ? `${sectLabels[sect]} · ${guna}` : sectLabels[sect];
      return itemButton(name,sect,tag,`${isMaha ? 'Mahāpurāṇa' : 'Upapurāṇa'} · ${sectLabels[sect]}${guna ? ` · ${guna}` : ''}`,puranaAbout[name] || '');
    }).join('')}</div>`;
    wire(holder);
  }

  function renderPuranas() {
    stage.innerHTML = `<div class="panel-intro taxonomy-title"><h2>Purāṇas</h2></div><div class="subnav taxonomy-tabs"><button type="button" data-pview="maha">Mahāpurāṇas · ${mahaPuranas.length}</button><button type="button" data-pview="upa">Upapurāṇas · ${upaPuranas.length}</button></div><div class="taxonomy-area"></div>`;
    const holder = stage.querySelector('.taxonomy-area');
    const tabs = [...stage.querySelectorAll('[data-pview]')];
    const show = key => {
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.pview === key));
      renderPuranaList(holder,key);
    };
    tabs.forEach(b => b.addEventListener('click', () => show(b.dataset.pview)));
    show('maha');
  }

  function renderSmritiSet(holder, key) {
    const set = smritiSets[key];
    holder.innerHTML = `${sourceStrip(set.source)}<div class="text-grid taxonomy-grid source-grid">${set.items.map(name => itemButton(name,set.tone,'',set.source,'')).join('')}</div>`;
    wire(holder);
  }

  function renderPadmaSmriti(holder) {
    const gunaLabels = {sattvika:'Sāttvika',rajasa:'Rājasa',tamasa:'Tāmasa'};
    const rows = Object.entries(padmaSmritiGuna).flatMap(([guna,names]) => names.map(name => itemButton(
      name,'source-padma',gunaLabels[guna],`Padma Purāṇa · ${gunaLabels[guna]}`,'',`guna-${guna}`
    )));
    holder.innerHTML = `${sourceStrip('Padma Purāṇa, Uttarakhāṇḍa 263.86–90 (Ānandāśrama ed.; 236.22–26 in the Calcutta ed.)')}${gunaLegend()}<div class="text-grid taxonomy-grid">${rows.join('')}</div>`;
    wire(holder);
  }

  function renderSmritis() {
    stage.innerHTML = `<div class="panel-intro taxonomy-title"><h2>Smṛti & Dharmaśāstra</h2></div><div class="subnav taxonomy-tabs smriti-tabs"><button type="button" data-sview="yaj">Yājñavalkya · 20</button><button type="button" data-sview="par">Parāśara · 19</button><button type="button" data-sview="padma">Padma guṇa list · 18</button></div><div class="taxonomy-area"></div>`;
    const holder = stage.querySelector('.taxonomy-area');
    const tabs = [...stage.querySelectorAll('[data-sview]')];
    const show = key => {
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.sview === key));
      if (key === 'padma') renderPadmaSmriti(holder);
      else renderSmritiSet(holder,key);
    };
    tabs.forEach(b => b.addEventListener('click', () => show(b.dataset.sview)));
    show('yaj');
  }

  puranaButton.addEventListener('click', () => {
    if (!puranaButton.classList.contains('is-active') || stage.hidden) return;
    renderPuranas();
  });

  smritiButton.addEventListener('click', () => {
    if (!smritiButton.classList.contains('is-active') || stage.hidden) return;
    renderSmritis();
  });
})();