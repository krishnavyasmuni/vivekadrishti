(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  const puranaButton = root.querySelector('[data-corpus="puranas"]');
  const smritiButton = root.querySelector('[data-corpus="smriti"]');
  if (!stage || !puranaButton || !smritiButton) return;

  const SOURCE = {
    padmaPuranas: {
      label: 'Padma Purāṇa VI.236.18–21',
      url: 'https://www.wisdomlib.org/hinduism/book/the-padma-purana/d/doc364118.html'
    },
    mahapuranaVariants: {
      label: 'Traditional Mahāpurāṇa lists and substitutions',
      url: 'https://www.wisdomlib.org/hinduism/book/the-padma-purana/d/doc364118.html'
    },
    kurmaUpa: {
      label: 'Kūrma Purāṇa I.1.17–20 (as collated in Studies in the Upapurāṇas)',
      url: 'https://www.wisdomlib.org/hinduism/book/studies-in-the-upapuranas/d/doc1471554.html'
    },
    padmaUpa: {
      label: 'Padma Purāṇa, Pātāla-khaṇḍa 111.94b–98 (collated list)',
      url: 'https://www.wisdomlib.org/hinduism/book/studies-in-the-upapuranas/d/doc1471554.html'
    },
    deviUpa: {
      label: 'Devī Bhāgavata I.3.13–16 (collated list)',
      url: 'https://www.wisdomlib.org/hinduism/book/studies-in-the-upapuranas/d/doc1471554.html'
    },
    yaj: {
      label: 'Yājñavalkya Smṛti 1.4–5',
      url: 'https://www.wisdomlib.org/hinduism/book/yajnavalkya-smriti-with-mitakshara-and-viramitrodaya/d/doc1875969.html'
    },
    parasara: {
      label: 'Parāśara Smṛti, Ācāra 12–15',
      url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc145579.html'
    },
    padmaSmriti: {
      label: 'Padma Purāṇa, Uttarakhāṇḍa 263.86–90 (Ānandāśrama ed.; numbering varies by edition)',
      url: 'https://www.wisdomlib.org/hinduism/essay/devala-smriti-critical-study/d/doc1458518.html'
    },
    madhava: {
      label: 'Mādhava on Parāśara Smṛti 1.20 (additional Smṛtikāras)',
      url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc145579.html'
    },
    upasmriti: {
      label: 'Viramitrodaya, Paribhāṣā-prakāśa p.18 — Upasmṛti list',
      url: 'https://www.wisdomlib.org/hinduism/essay/devala-smriti-critical-study/d/doc1458518.html'
    }
  };

  const gunaLabels = {
    sattvika: 'Sāttvika',
    rajasa: 'Rājasa',
    tamasa: 'Tāmasa'
  };

  const sectLabels = {
    vaisnava: 'Vaiṣṇava',
    saiva: 'Śaiva',
    sakta: 'Śākta',
    saura: 'Saura',
    ganapatya: 'Gāṇapatya',
    brahma: 'Brahmā / cosmological',
    mixed: 'Mixed / composite'
  };

  const puranaAbout = {
    'Brahma Purāṇa':'A Purāṇic compilation on creation, sacred geography, pilgrimage and religious observance.',
    'Padma Purāṇa':'A vast Purāṇa with cosmology, pilgrimage, dharma and extensive Vaiṣṇava devotional material.',
    'Viṣṇu Purāṇa':'A major Vaiṣṇava Purāṇa on cosmology, dynasties, avatāras and Viṣṇu as the supreme reality.',
    'Vāyu Purāṇa':'An early Purāṇa rich in cosmology, genealogy and old Purāṇic material; it occupies the slot taken by Śiva Purāṇa in some other lists.',
    'Śiva Purāṇa':'A Śaiva Purāṇa devoted to Śiva, his forms, myths, worship and theology.',
    'Bhāgavata Purāṇa':'A foundational Vaiṣṇava bhakti Purāṇa, especially famous for Kṛṣṇa theology, avatāras and loving devotion.',
    'Devī Bhāgavata Purāṇa':'A major Śākta scripture presenting Devī as the supreme reality; Śākta tradition defends its Mahāpurāṇa status.',
    'Kālikā Purāṇa':'A Śākta Purāṇa especially associated with the Goddess, Kāmākhyā, ritual and sacred geography.',
    'Nāradīya Purāṇa':'A devotional Purāṇa associated with Nārada, containing substantial Vaiṣṇava worship, pilgrimage and practice.',
    'Mārkaṇḍeya Purāṇa':'A diverse Purāṇa whose celebrated Devī Māhātmya became one of the central scriptures of Goddess worship.',
    'Agni Purāṇa':'An encyclopaedic Purāṇa ranging across ritual, theology, polity, architecture, grammar, medicine and the arts.',
    'Bhaviṣya Purāṇa':'A composite Purāṇa with ritual, social, dynastic and future-oriented material accumulated over a long history.',
    'Brahmavaivarta Purāṇa':'A later Vaiṣṇava Purāṇa strongly associated with Kṛṣṇa and Rādhā, creation theology and devotional mythology.',
    'Liṅga Purāṇa':'A Śaiva Purāṇa centred on the liṅga, Śiva, cosmology, sacred time and worship.',
    'Varāha Purāṇa':'A Vaiṣṇava Purāṇa framed around Varāha, with substantial pilgrimage and sacred-geography material.',
    'Skanda Purāṇa':'The largest Purāṇa, especially rich in regional sacred geography, pilgrimage traditions and Śaiva material.',
    'Vāmana Purāṇa':'Named for Vāmana but textually mixed, with substantial Śaiva, cosmological and geographical material.',
    'Kūrma Purāṇa':'A composite Purāṇa framed through Kūrma, combining Vaiṣṇava, Śaiva and yogic teaching.',
    'Matsya Purāṇa':'Known for the flood narrative and extensive material on kingship, temple construction, iconography and genealogies.',
    'Garuḍa Purāṇa':'A Vaiṣṇava Purāṇa famous for ritual and afterlife material, alongside medicine, ethics and religious observance.',
    'Brahmāṇḍa Purāṇa':'A cosmological Purāṇa containing large-scale accounts of the universe and important material connected with the Lalitā tradition.'
  };

  const padmaGunaPuranas = {
    sattvika: [
      ['Viṣṇu Purāṇa','vaisnava'],['Nāradīya Purāṇa','vaisnava'],['Bhāgavata Purāṇa','vaisnava'],
      ['Garuḍa Purāṇa','vaisnava'],['Padma Purāṇa','vaisnava'],['Varāha Purāṇa','vaisnava']
    ],
    rajasa: [
      ['Brahmāṇḍa Purāṇa','mixed'],['Brahmavaivarta Purāṇa','vaisnava'],['Mārkaṇḍeya Purāṇa','mixed'],
      ['Brahma Purāṇa','brahma'],['Vāmana Purāṇa','mixed'],['Bhaviṣya Purāṇa','mixed']
    ],
    tamasa: [
      ['Matsya Purāṇa','mixed'],['Kūrma Purāṇa','mixed'],['Liṅga Purāṇa','saiva'],
      ['Śiva Purāṇa','saiva'],['Agni Purāṇa','mixed'],['Skanda Purāṇa','saiva']
    ]
  };

  const mahaVariantUnion = [
    ['Brahma Purāṇa','brahma','standard lists'],['Padma Purāṇa','vaisnava','standard lists'],['Viṣṇu Purāṇa','vaisnava','standard lists'],
    ['Śiva Purāṇa','saiva','Padma guṇa list / replaces Vāyu in some enumerations'],['Vāyu Purāṇa','mixed','widely transmitted standard list / replaces Śiva in other enumerations'],
    ['Bhāgavata Purāṇa','vaisnava','standard lists'],['Devī Bhāgavata Purāṇa','sakta','Śākta claim to the Bhāgavata Mahāpurāṇa slot'],['Kālikā Purāṇa','sakta','another reported Bhāgavata-slot substitution'],
    ['Nāradīya Purāṇa','vaisnava','standard lists'],['Mārkaṇḍeya Purāṇa','mixed','standard lists'],['Agni Purāṇa','mixed','standard lists'],
    ['Bhaviṣya Purāṇa','mixed','standard lists'],['Brahmavaivarta Purāṇa','vaisnava','standard lists'],['Liṅga Purāṇa','saiva','standard lists'],
    ['Varāha Purāṇa','vaisnava','standard lists'],['Skanda Purāṇa','saiva','standard lists'],['Vāmana Purāṇa','mixed','standard lists'],
    ['Kūrma Purāṇa','mixed','standard lists'],['Matsya Purāṇa','mixed','standard lists'],['Garuḍa Purāṇa','vaisnava','standard lists'],['Brahmāṇḍa Purāṇa','mixed','standard lists']
  ];

  const upaSect = {
    'Sanatkumāra Purāṇa':'mixed','Ādya / Sanatkumāra':'mixed','Nṛsiṃha Purāṇa':'vaisnava','Skanda / Āṇḍa':'saiva','Kaumāra':'saiva',
    'Śivadharma Purāṇa':'saiva','Śiva Purāṇa':'saiva','Durvāsas Purāṇa':'mixed','Daurvāsasa':'mixed','Nāradīya Purāṇa':'vaisnava','Another Nāradīya':'vaisnava',
    'Kapila Purāṇa':'mixed','Vāmana Upapurāṇa':'vaisnava','Mānava Purāṇa':'mixed','Auśanasa Purāṇa':'mixed','Uśanas Purāṇa':'mixed',
    'Brahmāṇḍa Upapurāṇa':'mixed','Another Brahmāṇḍa':'mixed','Varuṇa Purāṇa':'mixed','Kālikā Purāṇa':'sakta','Mahesa / Māheśvara':'saiva','Māheśvara Purāṇa':'saiva',
    'Sāmba Purāṇa':'saura','Saura Purāṇa':'saura','Parāśara Purāṇa':'mixed','Mārīca Purāṇa':'mixed','Bhārgava Purāṇa':'mixed',
    'Nandi / Nanda Purāṇa':'saiva','Āditya Purāṇa':'saura','Bhāgavata Upapurāṇa':'vaisnava','Vāsiṣṭha Purāṇa':'mixed'
  };

  const upaLists = {
    kurma: {
      source: SOURCE.kurmaUpa,
      note: 'One Kūrma-Purāṇa enumeration of eighteen. Read the colours as broad orientation, not exclusive ownership.',
      items: ['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda / Āṇḍa','Śivadharma Purāṇa','Durvāsas Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Vāmana Upapurāṇa','Uśanas Purāṇa','Brahmāṇḍa Upapurāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa']
    },
    padma: {
      source: SOURCE.padmaUpa,
      note: 'The Padma list differs in several slots and even preserves uncertain or variant readings in modern collations.',
      items: ['Ādya / Sanatkumāra','Nṛsiṃha Purāṇa','Skanda / Āṇḍa','Durvāsas Purāṇa','Another Nāradīya','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Another Brahmāṇḍa','Varuṇa Purāṇa','Kālikā Purāṇa','Mahesa / Māheśvara','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Kaumāra']
    },
    devi: {
      source: SOURCE.deviUpa,
      note: 'The Devī Bhāgavata gives yet another eighteen-name Upapurāṇa set.',
      items: ['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nāradīya Purāṇa','Śiva Purāṇa','Daurvāsasa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Sāmba Purāṇa','Nandi / Nanda Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Āditya Purāṇa','Māheśvara Purāṇa','Bhāgavata Upapurāṇa','Vāsiṣṭha Purāṇa']
    }
  };

  const yajnavalkya = ['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha'];
  const parasara = ['Manu','Vasiṣṭha','Kāśyapa','Garga','Gautama','Uśanas','Atri','Viṣṇu','Saṃvarta','Dakṣa','Aṅgiras','Śātātapa','Hārīta','Yājñavalkya','Āpastamba','Śaṅkha','Likhita','Kātyāyana','Pracetas'];
  const madhavaAdditional = ['Vyāsa','Yama','Parāśara','Bhṛgu','Nārada','Baudhāyana','Pitāmaha','Sumantu','Kāśyapa','Babhru','Paiṭhīnasi','Vyāghra','Satyavrata','Bharadvāja','Kārṣṇājini','Jābāli','Jamadagni','Lokākṣi'];
  const upasmriti18 = ['Jābāli','Nāciketa','Skanda','Laugākṣi','Kāśyapa','Vyāsa','Sanatkumāra','Śantanu','Janaka','Vyāghra','Kātyāyana','Jātūkarṇa','Kapiñjala','Baudhāyana','Kāṇāda','Viśvāmitra','Paiṭhīnasi','Gobhila'];
  const padmaGunaSmritis = {
    sattvika: ['Vasiṣṭha','Hārīta','Vyāsa','Parāśara','Bharadvāja','Kāśyapa'],
    rajasa: ['Yājñavalkya','Atri','Tittiri','Dakṣa','Kātyāyana','Viṣṇu'],
    tamasa: ['Gautama','Bṛhaspati','Saṃvarta','Yama','Śaṅkha','Uśanas']
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function sourceLine(source) {
    return `<div class="source-line"><span>Source</span><a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(source.label)}</a></div>`;
  }

  function info(title, meta, about) {
    return `<div class="text-info taxonomy-info" aria-live="polite"><div class="text-info-head"><strong>${esc(title)}</strong>${meta ? `<span>${esc(meta)}</span>` : ''}</div><p>${esc(about)}</p></div>`;
  }

  function itemButton(name, options = {}) {
    const tone = options.tone || 'neutral';
    const meta = options.meta || '';
    const about = options.about || '';
    const tag = options.tag || '';
    const guna = options.guna || '';
    const classes = ['text-button','taxonomy-button',`tone-${tone}`];
    if (guna) classes.push(`guna-${guna}`);
    return `<button class="${classes.join(' ')}" type="button" data-title="${esc(name)}" data-meta="${esc(meta)}" data-about="${esc(about)}"><span>${esc(name)}</span>${tag ? `<small>${esc(tag)}</small>` : ''}</button>`;
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
    const used = ['vaisnava','saiva','sakta','saura','ganapatya','brahma','mixed'];
    return `<div class="taxonomy-legend sect-legend">${used.map(key => `<span class="legend-item sect-${key}">${esc(sectLabels[key])}</span>`).join('')}</div>`;
  }

  function gunaLegend() {
    return `<div class="taxonomy-legend guna-legend"><span class="legend-item guna-sattvika">Sāttvika</span><span class="legend-item guna-rajasa">Rājasa</span><span class="legend-item guna-tamasa">Tāmasa</span></div>`;
  }

  function renderPadmaPuranaGunas(holder) {
    const rows = Object.entries(padmaGunaPuranas).flatMap(([guna,items]) => items.map(([name,sect]) => itemButton(name, {
      tone: sect,
      guna,
      tag: `${gunaLabels[guna]} · ${sectLabels[sect]}`,
      meta: `${gunaLabels[guna]} · ${sectLabels[sect]} · ${SOURCE.padmaPuranas.label}`,
      about: puranaAbout[name] || `A Purāṇa placed in the ${gunaLabels[guna]} group by this Padma-Purāṇa classification.`
    })));
    holder.innerHTML = `<p class="taxonomy-note"><strong>Guṇa is the primary colour here.</strong> The small label gives a broad sectarian orientation. The Padma scheme is itself a traditional Vaiṣṇava classification, and other Purāṇas preserve slightly different schemes.</p>${sourceLine(SOURCE.padmaPuranas)}${gunaLegend()}${sectLegend()}<div class="text-grid taxonomy-grid">${rows.join('')}</div>`;
    wire(holder);
  }

  function renderMahapuranaVariants(holder) {
    holder.innerHTML = `<p class="taxonomy-note">The number <strong>18</strong> is traditional, but the membership varies. This comparison uses the union of the ordinary list plus the best-known substitutions: Vāyu/Śiva and the Śākta Bhāgavata-slot claims. Colour here means broad sectarian orientation, not guṇa.</p>${sourceLine(SOURCE.mahapuranaVariants)}${sectLegend()}<div class="text-grid taxonomy-grid">${mahaVariantUnion.map(([name,sect,claim]) => itemButton(name, {
      tone: sect,
      tag: sectLabels[sect],
      meta: `${sectLabels[sect]} · ${claim}`,
      about: puranaAbout[name] || 'A title occurring in the wider history of Mahāpurāṇa enumeration.'
    })).join('')}</div>`;
    wire(holder);
  }

  function renderUpapuranaSource(holder, key) {
    const set = upaLists[key];
    holder.innerHTML = `<p class="taxonomy-note">${esc(set.note)}</p>${sourceLine(set.source)}${sectLegend()}<div class="text-grid taxonomy-grid">${set.items.map(name => {
      const sect = upaSect[name] || 'mixed';
      return itemButton(name, {
        tone: sect,
        tag: sectLabels[sect],
        meta: `${sectLabels[sect]} · ${set.source.label}`,
        about: `A title appearing in this traditional Upapurāṇa enumeration. Upapurāṇa lists vary substantially across sources, and some identifications or surviving texts are uncertain.`
      });
    }).join('')}</div>`;
    wire(holder);
  }

  function renderPuranas() {
    stage.innerHTML = `<div class="panel-intro taxonomy-title"><h2>Purāṇas</h2><p>Compare the traditional guṇa scheme, wider Mahāpurāṇa membership, and source-specific Upapurāṇa lists.</p></div><div class="subnav taxonomy-tabs"><button type="button" data-pview="guna">Padma guṇa scheme · 18</button><button type="button" data-pview="maha">Mahāpurāṇa variants · 21</button><button type="button" data-pview="kurma">Upapurāṇas · Kūrma</button><button type="button" data-pview="padma">Upapurāṇas · Padma</button><button type="button" data-pview="devi">Upapurāṇas · Devī Bhāgavata</button></div><div class="taxonomy-area"></div>`;
    const holder = stage.querySelector('.taxonomy-area');
    const tabs = [...stage.querySelectorAll('[data-pview]')];
    function show(key) {
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.pview === key));
      if (key === 'guna') renderPadmaPuranaGunas(holder);
      else if (key === 'maha') renderMahapuranaVariants(holder);
      else renderUpapuranaSource(holder,key);
    }
    tabs.forEach(b => b.addEventListener('click', () => show(b.dataset.pview)));
    show('guna');
  }

  const smritiSets = {
    yaj: {
      source: SOURCE.yaj,
      tone: 'source-yaj',
      note: 'Yājñavalkya directly names twenty “promulgators of Dharmaśāstra”. The Mitākṣarā immediately says this is illustrative rather than exhaustive.',
      items: yajnavalkya
    },
    par: {
      source: SOURCE.parasara,
      tone: 'source-par',
      note: 'Parāśara gives a nineteen-name list. It overlaps heavily with Yājñavalkya but adds Kāśyapa, Garga and Pracetas and omits several Yājñavalkya names.',
      items: parasara
    },
    madhava: {
      source: SOURCE.madhava,
      tone: 'source-madhava',
      note: 'Mādhava, commenting on Parāśara 1.20, supplies eighteen additional names. This is one reason a single closed “18 Smṛtis” list is misleading.',
      items: madhavaAdditional
    },
    upa: {
      source: SOURCE.upasmriti,
      tone: 'source-upa',
      note: 'A distinct traditional list of eighteen Upasmṛti authors. Read it as a named source-list rather than a universal canon.',
      items: upasmriti18
    }
  };

  function renderPlainSmriti(holder, key) {
    const set = smritiSets[key];
    holder.innerHTML = `<p class="taxonomy-note">${esc(set.note)}</p>${sourceLine(set.source)}<div class="text-grid taxonomy-grid source-grid ${set.tone}">${set.items.map(name => itemButton(name, {
      tone: set.tone,
      tag: set.source.label.replace(/\s*\(.+$/, ''),
      meta: set.source.label,
      about: `${name} is named as a Dharmaśāstra/Smṛti authority in this particular source-list. The survival and extent of the attributed work varies greatly from author to author.`
    })).join('')}</div>`;
    wire(holder);
  }

  function renderPadmaSmritiGunas(holder) {
    const rows = Object.entries(padmaGunaSmritis).flatMap(([guna,names]) => names.map(name => itemButton(name, {
      tone: `source-padma`,
      guna,
      tag: gunaLabels[guna],
      meta: `${gunaLabels[guna]} · ${SOURCE.padmaSmriti.label}`,
      about: `${name} is placed in the ${gunaLabels[guna]} Smṛti group by this Padma-Purāṇa classification. The scheme is selective rather than exhaustive, and textual editions preserve variant readings.`
    })));
    holder.innerHTML = `<p class="taxonomy-note"><strong>This is a traditional guṇa classification of Smṛtis as well.</strong> It contains six Sāttvika, six Rājasa and six Tāmasa names, but omits major authorities such as Manu and Nārada; it should not be mistaken for a complete Smṛti canon.</p>${sourceLine(SOURCE.padmaSmriti)}${gunaLegend()}<div class="text-grid taxonomy-grid">${rows.join('')}</div>`;
    wire(holder);
  }

  function renderSmritis() {
    stage.innerHTML = `<div class="panel-intro taxonomy-title"><h2>Smṛti & Dharmaśāstra</h2><p>Each list is now tied to the text or commentator that actually gives it.</p></div><div class="subnav taxonomy-tabs smriti-tabs"><button type="button" data-sview="yaj">Yājñavalkya · 20</button><button type="button" data-sview="par">Parāśara · 19</button><button type="button" data-sview="guna">Padma guṇa scheme · 18</button><button type="button" data-sview="madhava">Mādhava · +18</button><button type="button" data-sview="upa">Viramitrodaya Upasmṛtis · 18</button></div><div class="taxonomy-area"></div>`;
    const holder = stage.querySelector('.taxonomy-area');
    const tabs = [...stage.querySelectorAll('[data-sview]')];
    function show(key) {
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.sview === key));
      if (key === 'guna') renderPadmaSmritiGunas(holder);
      else renderPlainSmriti(holder,key);
    }
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