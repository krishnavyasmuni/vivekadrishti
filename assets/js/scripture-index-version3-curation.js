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
    'Brahma Purāṇa':'A Purāṇic compilation on creation, sacred geography, pilgrimage and religious observance.',
    'Padma Purāṇa':'A vast Purāṇa with cosmology, pilgrimage, dharma and extensive Vaiṣṇava devotional material.',
    'Viṣṇu Purāṇa':'A major Vaiṣṇava Purāṇa on cosmology, dynasties, avatāras and Viṣṇu as the supreme reality.',
    'Vāyu Purāṇa':'An early Purāṇa rich in cosmology and genealogy; it occupies the place taken by Śiva Purāṇa in several other principal lists.',
    'Śiva Purāṇa':'A Śaiva Purāṇa devoted to Śiva, his forms, myths, worship and theology.',
    'Bhāgavata Purāṇa':'The Śrīmad Bhāgavata, a foundational Vaiṣṇava bhakti Purāṇa especially famous for Kṛṣṇa theology and devotion.',
    'Devī Bhāgavata Purāṇa':'A major Śākta scripture that presents Devī as supreme and is transmitted with a Mahāpurāṇa claim in the Śākta tradition.',
    'Mahābhāgavata Purāṇa':'A Śākta Purāṇa that calls itself a Mahāpurāṇa and is included among the “Mahat Purāṇas” by the Bṛhaddharma Purāṇa.',
    'Nāradīya Purāṇa':'A devotional Purāṇa associated with Nārada, containing substantial Vaiṣṇava worship, pilgrimage and practice.',
    'Mārkaṇḍeya Purāṇa':'A diverse Purāṇa whose celebrated Devī Māhātmya became a central scripture of Goddess worship.',
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
    'Brahmāṇḍa Purāṇa':'A cosmological Purāṇa containing large-scale accounts of the universe and important material connected with the Lalitā tradition.',
    'Nṛsiṃha Purāṇa':'A Vaiṣṇava Purāṇa centred on Nṛsiṃha; it is cross-classified in the tradition, appearing as an Upapurāṇa in many catalogues and as a principal Purāṇa in some variant enumerations.',
    'Kālikā Purāṇa':'A Śākta Purāṇa associated especially with Kāmākhyā, Goddess theology, ritual and sacred geography; a Kālikā-list tradition places it among the principal Purāṇas.',
    'Saura Purāṇa':'A Purāṇa bearing a solar title; a Kālikā-list tradition places a Saura among the principal Purāṇas, while other catalogues class a Saura as an Upapurāṇa.',
    'Vahni (Vahnija/Agneya) Purāṇa':'A text named Vahnija or Vahni in a Kālikā-list tradition among the principal Purāṇas; this attestation is treated separately from the extant Agni Purāṇa.'
  };

  // Union rule requested for this index: if a title has any verified principal/Mahāpurāṇa
  // attestation used here, it belongs only in this bucket, even when another source calls it an Upapurāṇa.
  const mahaPuranas = [
    ['Brahma Purāṇa','brahma','common principal lists'],
    ['Padma Purāṇa','vaisnava','common principal lists'],
    ['Viṣṇu Purāṇa','vaisnava','common principal lists'],
    ['Śiva Purāṇa','saiva','principal lists using Śiva rather than Vāyu'],
    ['Vāyu Purāṇa','mixed','principal lists using Vāyu rather than Śiva'],
    ['Bhāgavata Purāṇa','vaisnava','common principal lists'],
    ['Devī Bhāgavata Purāṇa','sakta','Śākta Mahāpurāṇa claim / Bhāgavata identity'],
    ['Mahābhāgavata Purāṇa','sakta','Bṛhaddharma “Mahat Purāṇa” list + self-claim'],
    ['Nāradīya Purāṇa','vaisnava','common principal lists'],
    ['Mārkaṇḍeya Purāṇa','mixed','common principal lists'],
    ['Agni Purāṇa','mixed','common principal lists'],
    ['Bhaviṣya Purāṇa','mixed','common principal lists'],
    ['Brahmavaivarta Purāṇa','vaisnava','common principal lists'],
    ['Liṅga Purāṇa','saiva','common principal lists'],
    ['Varāha Purāṇa','vaisnava','common principal lists'],
    ['Skanda Purāṇa','saiva','common principal lists'],
    ['Vāmana Purāṇa','mixed','common principal lists'],
    ['Kūrma Purāṇa','mixed','common principal lists'],
    ['Matsya Purāṇa','mixed','common principal lists'],
    ['Garuḍa Purāṇa','vaisnava','common principal lists'],
    ['Brahmāṇḍa Purāṇa','mixed','common principal lists'],
    ['Nṛsiṃha Purāṇa','vaisnava','principal-list variant; otherwise often Upapurāṇa'],
    ['Kālikā Purāṇa','sakta','Kālikā-list principal-Purāṇa attestation'],
    ['Saura Purāṇa','saura','Kālikā-list principal-Purāṇa attestation'],
    ['Vahni (Vahnija/Agneya) Purāṇa','mixed','Kālikā-list principal-Purāṇa attestation']
  ];

  // Union of titles found in the scriptural Upapurāṇa catalogues used for this page,
  // after removing every title promoted to the Mahāpurāṇa union above.
  const upaPuranas = [
    ['Sanatkumāra / Ādya Purāṇa','mixed','Kūrma · Padma · Devī Bhāgavata and other lists'],
    ['Śivadharma Purāṇa','saiva','Kūrma · Garuḍa · Bṛhaddharma and other lists'],
    ['Durvāsas / Daurvāsasa Purāṇa','mixed','Kūrma · Padma · Devī Bhāgavata and other lists'],
    ['Kapila Purāṇa','mixed','Kūrma · Padma · Devī Bhāgavata and other lists'],
    ['Mānava Purāṇa','mixed','Padma · Devī Bhāgavata · Skanda traditions'],
    ['Auśanasa / Uśanas Purāṇa','mixed','Kūrma · Padma · Devī Bhāgavata and other lists'],
    ['Varuṇa Purāṇa','mixed','Kūrma · Padma · Devī Bhāgavata and other lists'],
    ['Māheśvara Purāṇa','saiva','Kūrma · Padma · Devī Bhāgavata and other lists'],
    ['Sāmba Purāṇa','saura','Kūrma · Padma · Devī Bhāgavata · Bṛhaddharma'],
    ['Parāśara Purāṇa','mixed','Kūrma · Padma · Devī Bhāgavata and other lists'],
    ['Mārīca Purāṇa','mixed','Kūrma · Padma · Garuḍa and other lists'],
    ['Bhārgava Purāṇa','mixed','Kūrma · Padma · Bṛhaddharma and other lists'],
    ['Nanda / Nandikeśvara Purāṇa','saiva','Skanda · Devī Bhāgavata · Bṛhaddharma traditions'],
    ['Kaumāra Purāṇa','saiva','Padma Purāṇa Upapurāṇa list'],
    ['Āditya Purāṇa','saura','Devī Bhāgavata · Bṛhaddharma lists'],
    ['Vāsiṣṭha Purāṇa','mixed','Devī Bhāgavata and related lists'],
    ['Ādi Purāṇa','mixed','Bṛhaddharma Purāṇa list'],
    ['Bṛhannāradīya Purāṇa','vaisnava','Bṛhaddharma Purāṇa list'],
    ['Bṛhannandīśvara Purāṇa','saiva','Bṛhaddharma Purāṇa list'],
    ['Kriyāyogasāra Purāṇa','vaisnava','Bṛhaddharma Purāṇa list'],
    ['Dharma Purāṇa','mixed','Bṛhaddharma Purāṇa list'],
    ['Viṣṇudharmottara Purāṇa','vaisnava','Bṛhaddharma Purāṇa list'],
    ['Viṣṇudharma Purāṇa','vaisnava','Bṛhaddharma Purāṇa list'],
    ['Bṛhaddharma Purāṇa','mixed','Bṛhaddharma Purāṇa self-catalogue']
  ];

  const yajnavalkya = ['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha'];
  const parasara = ['Manu','Vasiṣṭha','Kāśyapa','Garga','Gautama','Uśanas','Atri','Viṣṇu','Saṃvarta','Dakṣa','Aṅgiras','Śātātapa','Hārīta','Yājñavalkya','Āpastamba','Śaṅkha','Likhita','Kātyāyana','Pracetas'];
  const padmaAdditional = ['Marīci','Pulastya','Pracetas','Bhṛgu','Nārada','Kāśyapa','Viśvāmitra','Devala','Ṛṣyaśṛṅga','Gārgya','Baudhāyana','Paiṭhīnasi','Jābāli','Sumantu','Pāraskara','Lokākṣi','Kuthumi'];
  const padma36 = [...yajnavalkya.filter(name => name !== 'Atri'), ...padmaAdditional];
  const visnudharma = ['Manu','Vasiṣṭha','Parāśara','Ātreya','Gārgya','Śaṅkha','Likhita','Yama','Jābāli','Dvaipāyana (Vyāsa)','Umā-Maheśvara','Kāśyapa','Bahvāyana','Śākuli','Agastya','Mudgala','Śāṇḍilya','Bhṛgu','Aṅgiras','Uddālaka','Sumantu','Paulastya','Vaiśampāyana','Piśaṅgama','Indra','Varuṇa','Kubera','Āpastamba','Gopālaka','Sūrya','Hārīta','Yājñavalkya','Saptarṣis'];

  const smritiSets = {
    yaj: {
      label:'Yājñavalkya Smṛti · 20',
      source:'Yājñavalkya Smṛti 1.4–5',
      note:'Twenty promulgators of Dharmaśāstra are named directly in Yājñavalkya Smṛti 1.4–5.',
      items:yajnavalkya
    },
    par: {
      label:'Parāśara Smṛti · 19 named',
      source:'Parāśara Smṛti, Ācāra 1.12–15',
      note:'Vyāsa names the Smṛtis he has studied before asking Parāśara for the dharma appropriate to the Kali age. Nineteen names are stated in the verses.',
      items:parasara
    },
    padma: {
      label:'Padma Purāṇa · 36',
      source:'Padma Purāṇa — traditional enumeration of 36 Dharmaśāstra sages',
      note:'A Purāṇic enumeration expands the Dharmaśāstra authorities to thirty-six. This view keeps the names attributed to the Padma Purāṇa itself, rather than later commentator additions.',
      items:padma36
    },
    visnudharma: {
      label:'Viṣṇudharma Purāṇa',
      source:'Viṣṇudharma Purāṇa — Dharma-saṃhitā authors (chapter 45 manuscript tradition)',
      note:'The Viṣṇudharma Purāṇa itself names a broad group of Dharma-saṃhitā authorities. Duplicate Kāśyapa readings have been normalized here.',
      items:visnudharma
    }
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function info(title, meta, about) {
    return `<div class="text-info taxonomy-info" aria-live="polite"><div class="text-info-head"><strong>${esc(title)}</strong>${meta ? `<span>${esc(meta)}</span>` : ''}</div><p>${esc(about)}</p></div>`;
  }

  function itemButton(name, tone, tag, meta, about) {
    return `<button class="text-button taxonomy-button tone-${esc(tone)}" type="button" data-title="${esc(name)}" data-meta="${esc(meta)}" data-about="${esc(about)}"><span>${esc(name)}</span>${tag ? `<small>${esc(tag)}</small>` : ''}</button>`;
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

  function sourceStrip(text) {
    return `<div class="source-line"><span>Source in śāstra</span><strong>${esc(text)}</strong></div>`;
  }

  function renderPuranaList(holder, type) {
    const isMaha = type === 'maha';
    const items = isMaha ? mahaPuranas : upaPuranas;
    const note = isMaha
      ? 'This is a union, not a single eighteen-title list. A title is placed here if it has a principal/Mahāpurāṇa attestation used in this index. Because classifications conflict, Mahāpurāṇa takes precedence: a cross-listed title is not repeated under Upapurāṇa.'
      : 'This is the union of the verified scriptural Upapurāṇa catalogues used for this index after removing every title that has a Mahāpurāṇa/principal-Purāṇa attestation. Variant spellings and obvious title-equivalents are normalized.';
    holder.innerHTML = `<p class="taxonomy-note">${esc(note)}</p>${sectLegend()}<div class="text-grid taxonomy-grid">${items.map(([name,sect,attestation]) => {
      const guna = isMaha ? padmaGuna[name] : '';
      const tag = guna ? `${sectLabels[sect]} · ${guna}` : sectLabels[sect];
      const about = isMaha
        ? `${puranaAbout[name] || 'A Purāṇic work attested in the principal-Purāṇa tradition.'} Classification note: ${attestation}.`
        : `An Upapurāṇa title surviving in or attested by the scriptural catalogues used here. Attestation: ${attestation}. It is shown only here because this normalized title has no Mahāpurāṇa attestation in the union above.`;
      return itemButton(name,sect,tag,`${isMaha ? 'Mahāpurāṇa union' : 'Upapurāṇa union'} · ${attestation}`,about);
    }).join('')}</div>`;
    wire(holder);
  }

  function renderPuranas() {
    stage.innerHTML = `<div class="panel-intro taxonomy-title"><h2>Purāṇas</h2><p>One Mahāpurāṇa union and one Upapurāṇa union. Cross-listed titles appear only once.</p></div><div class="subnav taxonomy-tabs"><button type="button" data-pview="maha">Mahāpurāṇas · ${mahaPuranas.length}</button><button type="button" data-pview="upa">Upapurāṇas · ${upaPuranas.length}</button></div><div class="taxonomy-area"></div>`;
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
    holder.innerHTML = `<p class="taxonomy-note">${esc(set.note)}</p>${sourceStrip(set.source)}<div class="text-grid taxonomy-grid source-grid tone-source-yaj">${set.items.map(name => itemButton(name,'source-yaj','',set.source,`${name} is named as a Dharmaśāstra / Dharma-saṃhitā authority in this scriptural enumeration.`)).join('')}</div>`;
    wire(holder);
  }

  function renderSmritis() {
    stage.innerHTML = `<div class="panel-intro taxonomy-title"><h2>Smṛti & Dharmaśāstra</h2><p>Only lists stated inside śāstra are shown here. Later ācārya, commentator and nibandha lists have been removed.</p></div><div class="subnav taxonomy-tabs smriti-tabs">${Object.entries(smritiSets).map(([key,set]) => `<button type="button" data-sview="${esc(key)}">${esc(set.label)}</button>`).join('')}</div><div class="taxonomy-area"></div>`;
    const holder = stage.querySelector('.taxonomy-area');
    const tabs = [...stage.querySelectorAll('[data-sview]')];
    const show = key => {
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.sview === key));
      renderSmritiSet(holder,key);
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