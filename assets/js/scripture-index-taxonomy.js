(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const stage = root.querySelector('.browser-stage');
  const puranaButton = root.querySelector('[data-corpus="puranas"]');
  const smritiButton = root.querySelector('[data-corpus="smriti"]');
  if (!stage || !puranaButton || !smritiButton) return;

  const tones = {
    vaisnava: 'Vaiṣṇava',
    saiva: 'Śaiva',
    sakta: 'Śākta',
    saura: 'Saura',
    ganapatya: 'Gāṇapatya',
    brahma: 'Brahmā / cosmological',
    mixed: 'Mixed / encyclopaedic'
  };

  const puranaAbout = {
    'Brahma Purāṇa':'A Purāṇic compilation on creation, sacred geography, pilgrimage and religious observance.',
    'Padma Purāṇa':'A vast Purāṇa with cosmology, pilgrimage, dharma and extensive Vaiṣṇava devotional material.',
    'Viṣṇu Purāṇa':'A major Vaiṣṇava Purāṇa on cosmology, dynasties, avatāras and Viṣṇu as the supreme reality.',
    'Vāyu Purāṇa':'An early Purāṇa rich in cosmology and genealogy; some traditions connect the Vāyavīya and Śaiva Purāṇa designations.',
    'Śiva Purāṇa':'A Śaiva Purāṇa devoted to Śiva, his forms, myths, worship and theology.',
    'Bhāgavata Purāṇa':'A foundational Vaiṣṇava bhakti Purāṇa, especially famous for Kṛṣṇa theology, avatāras and loving devotion.',
    'Devī Bhāgavata Purāṇa':'A major Śākta scripture presenting Devī as the supreme reality; Śākta traditions defend its status as the Bhāgavata Mahāpurāṇa.',
    'Kālikā Purāṇa':'A Śākta Purāṇa especially associated with the Goddess, Kāmākhyā, ritual and sacred geography.',
    'Nṛsiṃha Purāṇa':'A Vaiṣṇava Purāṇa centred on Nṛsiṃha and other Vaiṣṇava mythic and devotional material.',
    'Nāradīya Purāṇa':'A devotional Purāṇa associated with Nārada, with extensive Vaiṣṇava worship, pilgrimage and religious practice.',
    'Mārkaṇḍeya Purāṇa':'A diverse Purāṇa whose celebrated Devī Māhātmya became one of the central scriptures of Goddess worship.',
    'Agni Purāṇa':'An encyclopaedic Purāṇa ranging across ritual, theology, polity, architecture, grammar, medicine and the arts.',
    'Bhaviṣya Purāṇa':'A composite Purāṇa with ritual, social, dynastic and future-oriented material accumulated over a long history.',
    'Brahmavaivarta Purāṇa':'A later Vaiṣṇava Purāṇa strongly associated with Kṛṣṇa and Rādhā, creation theology and devotional mythology.',
    'Liṅga Purāṇa':'A Śaiva Purāṇa centred on the liṅga, Śiva, cosmology, sacred time and worship.',
    'Varāha Purāṇa':'A Vaiṣṇava Purāṇa framed around Varāha, with substantial pilgrimage and sacred-geography material.',
    'Skanda Purāṇa':'The largest Purāṇa, especially rich in regional sacred geography, pilgrimage traditions and Śaiva material.',
    'Vāmana Purāṇa':'Named for Vāmana but textually mixed, with substantial Śaiva, cosmological and geographical material.',
    'Kūrma Purāṇa':'A mixed Purāṇa framed through Kūrma, combining Vaiṣṇava, Śaiva and yogic teaching.',
    'Matsya Purāṇa':'Known for the flood narrative and extensive material on kingship, temple construction, iconography and genealogies.',
    'Garuḍa Purāṇa':'A Vaiṣṇava Purāṇa famous for ritual and afterlife material, alongside medicine, ethics and religious observance.',
    'Brahmāṇḍa Purāṇa':'A cosmological Purāṇa containing large-scale accounts of the universe and important material connected with the Lalitā tradition.'
  };

  const mahaPuranas = [
    ['Brahma Purāṇa','brahma','common lists'],
    ['Padma Purāṇa','vaisnava','common lists'],
    ['Viṣṇu Purāṇa','vaisnava','common lists'],
    ['Vāyu Purāṇa','saiva','many lists; often where Śiva is absent'],
    ['Śiva Purāṇa','saiva','many lists; often where Vāyu is absent'],
    ['Bhāgavata Purāṇa','vaisnava','common lists'],
    ['Devī Bhāgavata Purāṇa','sakta','Śākta Mahāpurāṇa claim'],
    ['Kālikā Purāṇa','sakta','Bhāgavata-slot variant in some accounts'],
    ['Nṛsiṃha Purāṇa','vaisnava','appears in the Varāha Purāṇa list'],
    ['Nāradīya Purāṇa','vaisnava','common lists'],
    ['Mārkaṇḍeya Purāṇa','mixed','common lists; contains Devī Māhātmya'],
    ['Agni Purāṇa','mixed','common lists'],
    ['Bhaviṣya Purāṇa','mixed','common lists'],
    ['Brahmavaivarta Purāṇa','vaisnava','common lists'],
    ['Liṅga Purāṇa','saiva','common lists'],
    ['Varāha Purāṇa','vaisnava','common lists'],
    ['Skanda Purāṇa','saiva','common lists'],
    ['Vāmana Purāṇa','mixed','common lists'],
    ['Kūrma Purāṇa','mixed','common lists'],
    ['Matsya Purāṇa','mixed','common lists'],
    ['Garuḍa Purāṇa','vaisnava','common lists'],
    ['Brahmāṇḍa Purāṇa','mixed','common lists']
  ];

  const upaPuranas = [
    ['Sanatkumāra Purāṇa','mixed'],['Nṛsiṃha Purāṇa','vaisnava'],['Bṛhannāradīya Purāṇa','vaisnava'],
    ['Śivarahasya Purāṇa','saiva'],['Durvāsas Purāṇa','saiva'],['Kapila Purāṇa','mixed'],
    ['Vāmana Upapurāṇa','vaisnava'],['Bhārgava Purāṇa','mixed'],['Vāruṇa Purāṇa','saiva'],
    ['Kālikā Purāṇa','sakta'],['Sāmba Purāṇa','saura'],['Nandi / Nanda Purāṇa','saiva'],
    ['Sūrya Purāṇa','saura'],['Parāśara Purāṇa','saiva'],['Vāsiṣṭha Purāṇa','mixed'],
    ['Gaṇeśa Purāṇa','ganapatya'],['Mudgala Purāṇa','ganapatya'],['Haṃsa Purāṇa','mixed'],
    ['Viṣṇudharma Purāṇa','vaisnava'],['Viṣṇudharmottara Purāṇa','vaisnava'],['Śivadharma Purāṇa','saiva'],
    ['Māheśvara Purāṇa','saiva'],['Ekāmra Purāṇa','saiva'],['Devī Bhāgavata Purāṇa','sakta'],
    ['Devī Purāṇa','sakta'],['Mahābhāgavata Purāṇa','sakta'],['Bhagavatī Purāṇa','sakta'],
    ['Caṇḍī / Caṇḍikā Purāṇa','sakta'],['Devīrahasya','sakta'],['Saura Purāṇa','saiva'],
    ['Ādi Purāṇa','mixed'],['Kalki Purāṇa','vaisnava'],['Puruṣottama Purāṇa','vaisnava'],
    ['Kriyāyogasāra','vaisnava'],['Bhaviṣyottara Purāṇa','mixed'],['Bṛhaddharma Purāṇa','mixed'],
    ['Mānava Purāṇa','mixed'],['Auśanasa Purāṇa','mixed']
  ];

  const yajnavalkya = ['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha'];
  const parasaraVariants = ['Kāśyapa','Gārgya','Pracetas'];
  const otherSmritikaras = ['Vasiṣṭha','Nārada','Sumantu','Pitāmaha','Babhru','Kārṣṇājini','Satyavrata','Gārgya','Devala','Jamadagni','Bharadvāja','Pulastya','Pulaha','Kratu','Ātreya','Marīci','Vatsa','Pāraskara','Ṛṣyaśṛṅga','Vaijavāpa'];
  const upasmritis = ['Jābāli','Nāciketa','Skanda','Lāṅgākṣi','Kāśyapa','Vyāsa','Sanatkumāra','Sumantu','Pitāmaha','Vyāghra','Kārṣṇājini','Jātūkarṇa','Kapiñjala','Baudhāyana','Kāṇāda','Viśvāmitra','Paiṭhīnasi','Gobhila'];

  const smritiGroups = [
    {key:'yaj',label:'Yājñavalkya · 20',tone:'yaj',items:yajnavalkya,note:'Yājñavalkya names twenty promulgators of Dharmaśāstra. The Mitākṣarā explicitly treats this as illustrative, not exhaustive.'},
    {key:'par',label:'Parāśara variants',tone:'par',items:parasaraVariants,note:'Parāśara’s list is a different traditional enumeration. These are the distinctive names that replace Bṛhaspati, Yama and Vyāsa in comparison with Yājñavalkya.'},
    {key:'other',label:'Other Smṛtikāras',tone:'other',items:otherSmritikaras,note:'Commentarial tradition preserves further Smṛti authorities beyond the headline lists; several works are fragmentary or survive mainly through quotation.'},
    {key:'upa',label:'Upasmṛtis · 18',tone:'upa',items:upasmritis,note:'A separate traditional set of eighteen Upasmṛti authorities, again demonstrating that “the 18 Smṛtis” is not a closed bibliography.'}
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function info(title, meta, about) {
    return `<div class="text-info taxonomy-info" aria-live="polite"><div class="text-info-head"><strong>${esc(title)}</strong>${meta ? `<span>${esc(meta)}</span>` : ''}</div><p>${esc(about)}</p></div>`;
  }

  function taxonomyButton(name, tone, meta, about, tag='') {
    return `<button class="text-button taxonomy-button tone-${esc(tone)}" type="button" data-title="${esc(name)}" data-meta="${esc(meta)}" data-about="${esc(about)}"><span>${esc(name)}</span>${tag ? `<small>${esc(tag)}</small>` : ''}</button>`;
  }

  function wire(scope) {
    scope.querySelectorAll('.taxonomy-button').forEach(button => {
      button.addEventListener('click', () => {
        scope.querySelectorAll('.taxonomy-button.is-active').forEach(b => b.classList.remove('is-active'));
        button.classList.add('is-active');
        let target = scope.querySelector('.taxonomy-info');
        if (!target) {
          target = document.createElement('div');
          target.className = 'text-info taxonomy-info';
          scope.appendChild(target);
        }
        target.outerHTML = info(button.dataset.title, button.dataset.meta, button.dataset.about);
      });
    });
  }

  function legend() {
    return `<div class="taxonomy-legend" aria-label="Purāṇa orientation colours">${Object.entries(tones).map(([tone,label]) => `<span class="legend-item tone-${tone}">${esc(label)}</span>`).join('')}</div>`;
  }

  function renderPuranaList(items, mode) {
    const holder = stage.querySelector('.taxonomy-area');
    const intro = mode === 'maha'
      ? 'The traditional number is eighteen, but the membership is not fixed. This view shows the larger union of titles that occur in Mahāpurāṇa lists or make a traditional Mahāpurāṇa claim. Colour indicates broad dominant orientation, not an exclusive sectarian boundary.'
      : 'Upapurāṇa lists vary even more widely. The colours below indicate the broad sectarian orientation of the surviving or traditionally described text; many are composite.';
    holder.innerHTML = `<p class="taxonomy-note">${esc(intro)}</p>${legend()}<div class="text-grid taxonomy-grid">${items.map(([name,tone,claim]) => {
      const about = puranaAbout[name] || `A Purāṇic work transmitted in a ${mode === 'maha' ? 'Mahāpurāṇa-list or Mahāpurāṇa-claim' : 'secondary or Upapurāṇa'} context. Purāṇic classifications vary across texts and regions.`;
      return taxonomyButton(name,tone,`${tones[tone]} · ${claim || 'Upapurāṇa tradition'}`,about,tones[tone]);
    }).join('')}</div>`;
    wire(holder);
  }

  function renderPuranas() {
    stage.innerHTML = `<div class="panel-intro"><h2>Purāṇas</h2><p>Colour-coded by broad sectarian orientation. Click any title for a short description.</p></div><div class="subnav taxonomy-tabs"><button type="button" data-purana-view="maha">Mahāpurāṇa claims · 22</button><button type="button" data-purana-view="upa">Upapurāṇas</button></div><div class="taxonomy-area"></div>`;
    const tabs = [...stage.querySelectorAll('[data-purana-view]')];
    function show(which) {
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.puranaView === which));
      renderPuranaList(which === 'maha' ? mahaPuranas : upaPuranas, which);
    }
    tabs.forEach(b => b.addEventListener('click', () => show(b.dataset.puranaView)));
    show('maha');
  }

  function renderSmritiGroup(group) {
    const holder = stage.querySelector('.taxonomy-area');
    holder.innerHTML = `<p class="taxonomy-note">${esc(group.note)}</p><div class="text-grid taxonomy-grid">${group.items.map(name => taxonomyButton(name,group.tone,group.label,`${name} is named in this traditional Dharmaśāstra/Smṛti enumeration or commentarial grouping as an authority on dharma. Many attributed Smṛtis survive only partly or through quotation.`,group.label)).join('')}</div>`;
    wire(holder);
  }

  function renderSmritis() {
    stage.innerHTML = `<div class="panel-intro"><h2>Smṛti & Dharmaśāstra</h2><p>There is no single closed set of eighteen. Browse the different traditional enumerations; each source-list has its own colour.</p></div><div class="smriti-legend"><span class="legend-item tone-yaj">Yājñavalkya</span><span class="legend-item tone-par">Parāśara variants</span><span class="legend-item tone-other">Other Smṛtikāras</span><span class="legend-item tone-upa">Upasmṛtis</span></div><div class="subnav taxonomy-tabs"></div><div class="taxonomy-area"></div>`;
    const nav = stage.querySelector('.taxonomy-tabs');
    smritiGroups.forEach((group,index) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `tone-${group.tone}`;
      b.dataset.smritiGroup = group.key;
      b.textContent = group.label;
      b.addEventListener('click', () => {
        nav.querySelectorAll('button').forEach(x => x.classList.toggle('is-active', x === b));
        renderSmritiGroup(group);
      });
      nav.appendChild(b);
      if (index === 0) setTimeout(() => b.click(),0);
    });
  }

  puranaButton.addEventListener('click', () => {
    if (!puranaButton.classList.contains('is-active')) return;
    renderPuranas();
  });

  smritiButton.addEventListener('click', () => {
    if (!smritiButton.classList.contains('is-active')) return;
    renderSmritis();
  });
})();