(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const nav = root.querySelector('.corpus-nav');
  const stage = root.querySelector('.browser-stage');
  if (!nav || !stage) return;

  const vedas = ['Ṛgveda','Yajurveda','Sāmaveda','Atharvaveda'];
  const vedangas = ['Śikṣā','Kalpa','Vyākaraṇa','Nirukta','Chandas','Jyotiṣa'];
  const itihasa = ['Rāmāyaṇa','Mahābhārata'];

  const upanishads = {
    'Mukhya': [
      ['Aitareya','Ṛgveda'],['Kauṣītaki','Ṛgveda'],['Kena','Sāmaveda'],['Chāndogya','Sāmaveda'],['Maitrāyaṇī','Sāmaveda'],
      ['Kaṭha','Kṛṣṇa Yajurveda'],['Taittirīya','Kṛṣṇa Yajurveda'],['Śvetāśvatara','Kṛṣṇa Yajurveda'],['Īśāvāsya','Śukla Yajurveda'],['Bṛhadāraṇyaka','Śukla Yajurveda'],
      ['Praśna','Atharvaveda'],['Muṇḍaka','Atharvaveda'],['Māṇḍūkya','Atharvaveda']
    ],
    'Sāmānya Vedānta': [
      ['Ātmabodha','Ṛgveda'],['Mudgala','Ṛgveda'],['Vajrasūcī','Sāmaveda'],['Mahā','Sāmaveda'],['Sāvitrī','Sāmaveda'],
      ['Garbha','Kṛṣṇa Yajurveda'],['Sarvasāra','Kṛṣṇa Yajurveda'],['Śukarahasya','Kṛṣṇa Yajurveda'],['Skanda','Kṛṣṇa Yajurveda'],['Śārīraka','Kṛṣṇa Yajurveda'],['Ekākṣara','Kṛṣṇa Yajurveda'],['Akṣi','Kṛṣṇa Yajurveda'],['Prāṇāgnihotra','Kṛṣṇa Yajurveda'],
      ['Subāla','Śukla Yajurveda'],['Mantrikā','Śukla Yajurveda'],['Nirālamba','Śukla Yajurveda'],['Paiṅgala','Śukla Yajurveda'],['Adhyātma','Śukla Yajurveda'],['Muktikā','Śukla Yajurveda'],
      ['Annapūrṇā','Atharvaveda'],['Sūrya','Atharvaveda'],['Ātma','Atharvaveda']
    ],
    'Sannyāsa': [
      ['Nirvāṇa','Ṛgveda'],['Āruṇi','Sāmaveda'],['Maitreya','Sāmaveda'],['Sannyāsa','Sāmaveda'],['Kuṇḍikā','Sāmaveda'],
      ['Brahma','Kṛṣṇa Yajurveda'],['Avadhūta','Kṛṣṇa Yajurveda'],['Kaṭharudra','Kṛṣṇa Yajurveda'],
      ['Jābāla','Śukla Yajurveda'],['Paramahaṃsa','Śukla Yajurveda'],['Bhikṣuka','Śukla Yajurveda'],['Turīyātītāvadhūta','Śukla Yajurveda'],['Yājñavalkya','Śukla Yajurveda'],['Śāṭyāyanīya','Śukla Yajurveda'],
      ['Nārada-Parivrājaka','Atharvaveda'],['Paramahaṃsa-Parivrājaka','Atharvaveda'],['Parabrahma','Atharvaveda']
    ],
    'Yoga': [
      ['Nādabindu','Ṛgveda'],['Yogacūḍāmaṇi','Sāmaveda'],['Jābāladarśana','Sāmaveda'],
      ['Amṛtabindu','Kṛṣṇa Yajurveda'],['Amṛtanāda','Kṛṣṇa Yajurveda'],['Kṣurikā','Kṛṣṇa Yajurveda'],['Tejobindu','Kṛṣṇa Yajurveda'],['Dhyānabindu','Kṛṣṇa Yajurveda'],['Brahmavidyā','Kṛṣṇa Yajurveda'],['Yogatattva','Kṛṣṇa Yajurveda'],['Yogaśikhā','Kṛṣṇa Yajurveda'],['Yogakuṇḍalinī','Kṛṣṇa Yajurveda'],['Varāha','Kṛṣṇa Yajurveda'],
      ['Haṃsa','Śukla Yajurveda'],['Triśikhi-Brāhmaṇa','Śukla Yajurveda'],['Maṇḍala-Brāhmaṇa','Śukla Yajurveda'],['Advayatāraka','Śukla Yajurveda'],
      ['Śāṇḍilya','Atharvaveda'],['Pāśupatabrahma','Atharvaveda'],['Mahāvākya','Atharvaveda']
    ],
    'Vaiṣṇava': [
      ['Vāsudeva','Sāmaveda'],['Avyakta','Sāmaveda'],['Nārāyaṇa','Kṛṣṇa Yajurveda'],['Kali-Saṇṭāraṇa','Kṛṣṇa Yajurveda'],['Tārasāra','Śukla Yajurveda'],
      ['Nṛsiṃhatāpanī','Atharvaveda'],['Tripādvibhūti-Mahānārāyaṇa','Atharvaveda'],['Rāmarahasya','Atharvaveda'],['Rāmatāpanī','Atharvaveda'],['Gopālatāpanī','Atharvaveda'],['Kṛṣṇa','Atharvaveda'],['Hayagrīva','Atharvaveda'],['Dattātreya','Atharvaveda'],['Garuḍa','Atharvaveda']
    ],
    'Śaiva': [
      ['Akṣamālikā','Ṛgveda'],['Rudrākṣajābāla','Sāmaveda'],['Jābāli','Sāmaveda'],
      ['Kaivalya','Kṛṣṇa Yajurveda'],['Kālāgnirudra','Kṛṣṇa Yajurveda'],['Dakṣiṇāmūrti','Kṛṣṇa Yajurveda'],['Rudrahṛdaya','Kṛṣṇa Yajurveda'],['Pañcabrahma','Kṛṣṇa Yajurveda'],
      ['Atharvaśiras','Atharvaveda'],['Atharvaśikhā','Atharvaveda'],['Bṛhajjābāla','Atharvaveda'],['Śarabha','Atharvaveda'],['Bhasmajābāla','Atharvaveda'],['Gaṇapati','Atharvaveda']
    ],
    'Śākta': [
      ['Tripurā','Ṛgveda'],['Saubhāgyalakṣmī','Ṛgveda'],['Bahvṛca','Ṛgveda'],['Sarasvatī-rahasya','Kṛṣṇa Yajurveda'],
      ['Sītā','Atharvaveda'],['Tripurātāpinī','Atharvaveda'],['Devī','Atharvaveda'],['Bhāvanā','Atharvaveda']
    ]
  };

  const smriti = {
    'Yājñavalkya Smṛti': ['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha'],
    'Parāśara Smṛti': ['Manu','Vasiṣṭha','Kāśyapa','Garga','Gautama','Uśanas','Atri','Viṣṇu','Saṃvarta','Dakṣa','Aṅgiras','Śātātapa','Hārīta','Yājñavalkya','Āpastamba','Śaṅkha','Likhita','Kātyāyana','Pracetas'],
    'Padma Purāṇa': {
      'Sāttvika': ['Vasiṣṭha','Hārīta','Vyāsa','Parāśara','Bharadvāja','Kāśyapa'],
      'Rājasa': ['Yājñavalkya','Atri','Tittiri','Dakṣa','Kātyāyana','Viṣṇu'],
      'Tāmasa': ['Gautama','Bṛhaspati','Saṃvarta','Yama','Śaṅkha','Uśanas']
    }
  };

  const corpusButtons = [
    ['vedas','Vedas'],['upanishads','108 Upaniṣads'],['itihasa','Itihāsa'],['puranas','Purāṇas'],['smriti','Smṛti'],['vedanga','Vedāṅga']
  ];

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function plainNames(items) {
    return `<div class="shastra-grid">${items.map(name => `<button type="button" class="shastra-name"><span>${esc(name)}</span></button>`).join('')}</div>`;
  }

  function upanishadNames(items) {
    return `<div class="shastra-grid">${items.map(([name,veda]) => `<button type="button" class="shastra-name upanishad-name"><span>${esc(name)}</span><small>${esc(veda)}</small></button>`).join('')}</div>`;
  }

  function tabs(items, active, group) {
    return `<div class="subnav shastra-subnav">${items.map(label => `<button type="button" class="shastra-tab${label === active ? ' is-active' : ''}" data-group="${esc(group)}" data-view="${esc(label)}">${esc(label)}</button>`).join('')}</div>`;
  }

  const state = { corpus:null, view:null };

  function render() {
    nav.innerHTML = corpusButtons.map(([key,label]) => `<button class="corpus-button${state.corpus === key ? ' is-active' : ''}" type="button" data-corpus="${key}" aria-expanded="${state.corpus === key ? 'true' : 'false'}">${label}</button>`).join('');

    if (!state.corpus) {
      stage.hidden = true;
      stage.innerHTML = '';
      return;
    }

    stage.hidden = false;

    if (state.corpus === 'vedas') {
      stage.innerHTML = `<h2 class="shastra-title">Vedas</h2>${plainNames(vedas)}`;
    } else if (state.corpus === 'itihasa') {
      stage.innerHTML = `<h2 class="shastra-title">Itihāsa</h2>${plainNames(itihasa)}`;
    } else if (state.corpus === 'vedanga') {
      stage.innerHTML = `<h2 class="shastra-title">Vedāṅga</h2>${plainNames(vedangas)}`;
    } else if (state.corpus === 'upanishads') {
      const types = Object.keys(upanishads);
      if (!types.includes(state.view)) state.view = types[0];
      stage.innerHTML = `<h2 class="shastra-title">108 Upaniṣads</h2>${tabs(types,state.view,'upanishads')}<div class="shastra-holder">${upanishadNames(upanishads[state.view])}</div>`;
    } else if (state.corpus === 'puranas') {
      stage.innerHTML = `<h2 class="shastra-title">Purāṇas</h2>`;
    } else if (state.corpus === 'smriti') {
      const types = Object.keys(smriti);
      if (!types.includes(state.view)) state.view = types[0];
      let body = '';
      if (state.view !== 'Padma Purāṇa') {
        body = plainNames(smriti[state.view]);
      } else {
        body = Object.entries(smriti[state.view]).map(([group,items]) => {
          const cls = group === 'Sāttvika' ? 'guna-sattvika' : group === 'Rājasa' ? 'guna-rajasa' : 'guna-tamasa';
          return `<section class="guna-group ${cls}"><h3>${esc(group)}</h3><div class="shastra-grid">${items.map(name => `<button type="button" class="shastra-name ${cls}"><span>${esc(name)}</span></button>`).join('')}</div></section>`;
        }).join('');
      }
      stage.innerHTML = `<h2 class="shastra-title">Smṛti</h2>${tabs(types,state.view,'smriti')}<div class="shastra-holder">${body}</div>`;
    }
  }

  root.addEventListener('click', event => {
    const corpus = event.target.closest('.corpus-button');
    if (corpus && nav.contains(corpus)) {
      const key = corpus.dataset.corpus;
      if (state.corpus === key) {
        state.corpus = null;
        state.view = null;
      } else {
        state.corpus = key;
        state.view = null;
      }
      render();
      return;
    }

    const tab = event.target.closest('.shastra-tab');
    if (tab && stage.contains(tab)) {
      if (tab.dataset.group === 'puranas') return;
      state.view = tab.dataset.view;
      render();
      return;
    }

    const name = event.target.closest('.shastra-name');
    if (name && stage.contains(name)) name.classList.toggle('is-active');
  });

  render();
})();