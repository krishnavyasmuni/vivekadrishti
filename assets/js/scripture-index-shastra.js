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
    'Ṛgveda': ['Aitareya','Kauṣītaki','Nādabindu','Ātmabodha','Nirvāṇa','Mudgala','Akṣamālikā','Tripurā','Saubhāgya','Bahvṛca'],
    'Śukla Yajurveda': ['Īśa','Bṛhadāraṇyaka','Jābāla','Haṃsa','Paramahaṃsa','Subāla','Mantrikā','Nirālamba','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advaya-Tāraka','Paiṅgala','Bhikṣu','Turīyātīta','Adhyātma','Tārasāra','Yājñavalkya','Śātyāyanī','Muktikā'],
    'Kṛṣṇa Yajurveda': ['Kaṭha','Taittirīya','Brahma','Kaivalya','Śvetāśvatara','Garbha','Nārāyaṇa','Amṛtabindu','Amṛtanāda','Kālāgnirudra','Kṣurikā','Sarvasāra','Śukarahasya','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Dakṣiṇāmūrti','Skanda','Śārīraka','Yogaśikhā','Ekākṣara','Akṣi','Avadhūta','Kaṭharudra','Rudrahṛdaya','Yogakuṇḍalinī','Pañcabrahma','Prāṇāgnihotra','Varāha','Kali-Santaraṇa','Sarasvatīrahasya'],
    'Sāmaveda': ['Kena','Chāndogya','Āruṇeya','Maitrāyaṇī','Maitreyī','Vajrasūcikā','Yogacūḍāmaṇi','Vāsudeva','Mahat','Sannyāsa','Avyakta','Kuṇḍikā','Sāvitrī','Rudrākṣa','Darśana','Jābāla'],
    'Atharvaveda': ['Praśna','Muṇḍaka','Māṇḍūkya','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Nṛsiṃhatāpanī','Nārada-Parivrājaka','Sītā','Śarabha','Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Śāṇḍilya','Paramahaṃsa-Parivrājaka','Annapūrṇā','Sūrya','Ātma','Pāśupata','Parabrahma','Tripurātāpinī','Devī','Bhāvanā','Bhasmajābāla','Gaṇapati','Mahāvākya','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Gāruḍa']
  };

  const mahaPuranas = [
    'Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Bhāgavata Purāṇa','Nāradīya Purāṇa','Mārkaṇḍeya Purāṇa','Agni Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Liṅga Purāṇa','Varāha Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Kūrma Purāṇa','Matsya Purāṇa','Garuḍa Purāṇa','Brahmāṇḍa Purāṇa','Vāyu Purāṇa','Devī Bhāgavata Purāṇa','Nṛsiṃha Purāṇa','Mahābhāgavata Purāṇa'
  ];

  const upaPuranas = [
    'Ādya / Sanatkumāra Purāṇa','Śivadharma Purāṇa','Durvāsas Purāṇa','Kapila Purāṇa','Auśanasa / Uśanas Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Mānava Purāṇa','Nandikeśvara Purāṇa','Āditya Purāṇa','Vāsiṣṭha Purāṇa','Ādi Purāṇa','Bṛhannāradīya Purāṇa','Bṛhannandikeśvara Purāṇa','Kriyāyogasāra','Dharma Purāṇa','Viṣṇudharmottara Purāṇa','Viṣṇudharma Purāṇa','Bṛhaddharma Purāṇa','Kaumāra Purāṇa'
  ];

  const puranaGuna = {
    sattvika: ['Viṣṇu Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Garuḍa Purāṇa','Padma Purāṇa','Varāha Purāṇa'],
    rajasa: ['Brahmāṇḍa Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Bhaviṣya Purāṇa','Vāmana Purāṇa','Brahma Purāṇa'],
    tamasa: ['Matsya Purāṇa','Kūrma Purāṇa','Liṅga Purāṇa','Śiva Purāṇa','Skanda Purāṇa','Agni Purāṇa']
  };

  const smriti = {
    'Yājñavalkya Smṛti': ['Manu','Atri','Viṣṇu','Hārīta','Yājñavalkya','Uśanas','Aṅgiras','Yama','Āpastamba','Saṃvarta','Kātyāyana','Bṛhaspati','Parāśara','Vyāsa','Śaṅkha','Likhita','Dakṣa','Gautama','Śātātapa','Vasiṣṭha'],
    'Parāśara Smṛti': ['Manu','Vasiṣṭha','Kāśyapa','Garga','Gautama','Uśanas','Atri','Viṣṇu','Saṃvarta','Dakṣa','Aṅgiras','Śātātapa','Hārīta','Yājñavalkya','Kātyāyana','Pracetas','Āpastamba','Śaṅkha','Likhita'],
    'Padma Purāṇa': {
      'Sāttvika': ['Vāsiṣṭha','Hārīta','Vyāsa','Pārāśara','Bhāradvāja','Kāśyapa'],
      'Rājasa': ['Yājñavalkya','Ātreya','Taittira','Dākṣa','Kātyāyana','Vaiṣṇava'],
      'Tāmasa': ['Gautama','Bārhaspatya','Sāṃvarta','Yama','Sākhya','Auśanasa']
    }
  };

  const corpusButtons = [
    ['vedas','Vedas'],
    ['upanishads','108 Upaniṣads'],
    ['itihasa','Itihāsa'],
    ['puranas','Purāṇas'],
    ['smriti','Smṛti'],
    ['vedanga','Vedāṅga']
  ];

  nav.innerHTML = corpusButtons.map(([key,label]) => `<button class="corpus-button" type="button" data-corpus="${key}" aria-expanded="false">${label}</button>`).join('');

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function gunaClass(name) {
    if (puranaGuna.sattvika.includes(name)) return ' guna-sattvika';
    if (puranaGuna.rajasa.includes(name)) return ' guna-rajasa';
    if (puranaGuna.tamasa.includes(name)) return ' guna-tamasa';
    return '';
  }

  function names(items, classFor = () => '') {
    return `<div class="shastra-grid">${items.map(item => `<button type="button" class="shastra-name${classFor(item)}">${esc(item)}</button>`).join('')}</div>`;
  }

  function wireNames(scope = stage) {
    scope.querySelectorAll('.shastra-name').forEach(button => {
      button.addEventListener('click', () => button.classList.toggle('is-active'));
    });
  }

  function subnav(labels, active, handler) {
    const box = document.createElement('div');
    box.className = 'subnav shastra-subnav';
    box.innerHTML = labels.map(label => `<button type="button" data-view="${esc(label)}" class="${label === active ? 'is-active' : ''}">${esc(label)}</button>`).join('');
    box.querySelectorAll('button').forEach(button => button.addEventListener('click', () => handler(button.dataset.view)));
    return box;
  }

  function title(text) {
    const h = document.createElement('h2');
    h.className = 'shastra-title';
    h.textContent = text;
    return h;
  }

  function renderSimple(titleText, items) {
    stage.replaceChildren(title(titleText));
    stage.insertAdjacentHTML('beforeend', names(items));
    wireNames();
  }

  function renderUpanishads() {
    const keys = Object.keys(upanishads);
    const heading = title('108 Upaniṣads');
    const holder = document.createElement('div');
    holder.className = 'shastra-holder';
    const show = key => {
      stage.querySelectorAll('.shastra-subnav button').forEach(b => b.classList.toggle('is-active', b.dataset.view === key));
      holder.innerHTML = names(upanishads[key]);
      wireNames(holder);
    };
    stage.replaceChildren(heading, subnav(keys, keys[0], show), holder);
    show(keys[0]);
  }

  function renderPuranas() {
    const heading = title('Purāṇas');
    const holder = document.createElement('div');
    holder.className = 'shastra-holder';
    const tabs = ['Mahāpurāṇa','Upapurāṇa'];
    const show = key => {
      stage.querySelectorAll('.shastra-subnav button').forEach(b => b.classList.toggle('is-active', b.dataset.view === key));
      holder.innerHTML = key === 'Mahāpurāṇa' ? names(mahaPuranas, gunaClass) : names(upaPuranas);
      wireNames(holder);
    };
    stage.replaceChildren(heading, subnav(tabs, tabs[0], show), holder);
    show(tabs[0]);
  }

  function renderSmriti() {
    const heading = title('Smṛti');
    const holder = document.createElement('div');
    holder.className = 'shastra-holder';
    const tabs = Object.keys(smriti);
    const show = key => {
      stage.querySelectorAll('.shastra-subnav button').forEach(b => b.classList.toggle('is-active', b.dataset.view === key));
      if (key !== 'Padma Purāṇa') {
        holder.innerHTML = names(smriti[key]);
      } else {
        const groups = smriti[key];
        holder.innerHTML = Object.entries(groups).map(([group,items]) => {
          const cls = group === 'Sāttvika' ? 'guna-sattvika' : group === 'Rājasa' ? 'guna-rajasa' : 'guna-tamasa';
          return `<section class="guna-group ${cls}"><h3>${esc(group)}</h3>${names(items, () => ` ${cls}`)}</section>`;
        }).join('');
      }
      wireNames(holder);
    };
    stage.replaceChildren(heading, subnav(tabs, tabs[0], show), holder);
    show(tabs[0]);
  }

  function renderCorpus(key) {
    if (key === 'vedas') renderSimple('Vedas', vedas);
    else if (key === 'upanishads') renderUpanishads();
    else if (key === 'itihasa') renderSimple('Itihāsa', itihasa);
    else if (key === 'puranas') renderPuranas();
    else if (key === 'smriti') renderSmriti();
    else if (key === 'vedanga') renderSimple('Vedāṅga', vedangas);
  }

  nav.querySelectorAll('.corpus-button').forEach(button => {
    button.addEventListener('click', () => {
      const already = button.classList.contains('is-active');
      nav.querySelectorAll('.corpus-button').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-expanded','false');
      });
      if (already) {
        stage.hidden = true;
        stage.replaceChildren();
        return;
      }
      button.classList.add('is-active');
      button.setAttribute('aria-expanded','true');
      stage.hidden = false;
      renderCorpus(button.dataset.corpus);
    });
  });
})();