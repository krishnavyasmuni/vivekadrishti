/* Wikipedia-style 108-Upaniṣad index with real standalone article links. */
(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const MUK={
    'Īśāvāsya':1,'Kena':2,'Kaṭha':3,'Praśna':4,'Muṇḍaka':5,'Māṇḍūkya':6,'Taittirīya':7,'Aitareya':8,'Chāndogya':9,'Bṛhadāraṇyaka':10,
    'Brahma':11,'Kaivalya':12,'Jābāla':13,'Śvetāśvatara':14,'Haṃsa':15,'Āruṇi':16,'Garbha':17,'Nārāyaṇa':18,'Paramahaṃsa':19,'Amṛtabindu':20,
    'Amṛtanāda':21,'Atharvaśiras':22,'Atharvaśikhā':23,'Maitrāyaṇī':24,'Kauṣītaki':25,'Bṛhajjābāla':26,'Nṛsiṃhatāpanī':27,'Kālāgnirudra':28,'Maitreya':29,'Subāla':30,
    'Kṣurikā':31,'Mantrikā':32,'Sarvasāra':33,'Nirālamba':34,'Śukarahasya':35,'Vajrasūcī':36,'Tejobindu':37,'Nādabindu':38,'Dhyānabindu':39,'Brahmavidyā':40,
    'Yogatattva':41,'Ātmabodha':42,'Nārada-Parivrājaka':43,'Triśikhi-Brāhmaṇa':44,'Sītā':45,'Yogacūḍāmaṇi':46,'Nirvāṇa':47,'Maṇḍala-Brāhmaṇa':48,'Dakṣiṇāmūrti':49,'Śarabha':50,
    'Skanda':51,'Tripādvibhūti-Mahānārāyaṇa':52,'Advayatāraka':53,'Rāmarahasya':54,'Rāmatāpanī':55,'Vāsudeva':56,'Mudgala':57,'Śāṇḍilya':58,'Paiṅgala':59,'Bhikṣuka':60,
    'Mahā':61,'Śārīraka':62,'Yogaśikhā':63,'Turīyātītāvadhūta':64,'Sannyāsa':65,'Paramahaṃsa-Parivrājaka':66,'Akṣamālikā':67,'Avyakta':68,'Ekākṣara':69,'Annapūrṇā':70,
    'Sūrya':71,'Akṣi':72,'Adhyātma':73,'Kuṇḍikā':74,'Sāvitrī':75,'Ātma':76,'Pāśupatabrahma':77,'Parabrahma':78,'Avadhūta':79,'Tripurātāpinī':80,
    'Devī':81,'Tripurā':82,'Kaṭharudra':83,'Bhāvanā':84,'Rudrahṛdaya':85,'Yogakuṇḍalinī':86,'Bhasmajābāla':87,'Rudrākṣajābāla':88,'Gaṇapati':89,'Jābāladarśana':90,
    'Tārasāra':91,'Mahāvākya':92,'Pañcabrahma':93,'Prāṇāgnihotra':94,'Gopālatāpanī':95,'Kṛṣṇa':96,'Yājñavalkya':97,'Varāha':98,'Śāṭyāyanīya':99,'Hayagrīva':100,
    'Dattātreya':101,'Garuḍa':102,'Kali-Saṇṭāraṇa':103,'Jābāli':104,'Saubhāgyalakṣmī':105,'Sarasvatī-rahasya':106,'Bahvṛca':107,'Muktikā':108
  };
  const slug=value=>String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const esc=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));

  function rebuild(){
    const holder=root.querySelector('.upanishad-holder');
    if(!holder || holder.dataset.wikipedia108==='1')return;
    const groups=[...holder.querySelectorAll(':scope > .upanishad-group')];
    if(!groups.length)return;

    const intro=document.createElement('div');intro.className='up-wiki-intro';intro.innerHTML=`<p><b>108 Upaniṣads</b> in the received Muktikā corpus. The seven groups below are a research/navigation classification. Muktikā number and received Vedic affiliation are shown as transmission metadata; individual articles treat historical date, textual setting and recension separately.</p>`;
    holder.before(intro);

    const replacement=document.createElement('div');replacement.className='up-wiki-index';replacement.dataset.wikipedia108='1';
    groups.forEach((groupEl,index)=>{
      const label=groupEl.querySelector(':scope > h3')?.textContent?.trim()||'Upaniṣads';
      const buttons=[...groupEl.querySelectorAll('.upanishad-name[data-name]')];
      const details=document.createElement('details');details.className='up-wiki-group';if(index===0)details.open=true;
      const summary=document.createElement('summary');summary.innerHTML=`<span>${esc(label)}</span><small>${buttons.length} texts</small>`;details.append(summary);
      const list=document.createElement('div');list.className='up-wiki-list';
      buttons.sort((a,b)=>(MUK[a.dataset.name]||999)-(MUK[b.dataset.name]||999)).forEach(button=>{
        const name=button.dataset.name||button.querySelector('span')?.textContent?.trim()||'';
        const veda=button.dataset.veda||button.querySelector('small')?.textContent?.trim()||'';
        const a=document.createElement('a');a.className='up-wiki-link';a.href=`/vivekadrishti/articles/scripture/upanishads/${slug(name)}/`;
        a.innerHTML=`<span class="up-wiki-link-title">${esc(name)}</span><span class="up-wiki-link-meta">Muktikā ${MUK[name]||'—'}${veda?` · ${esc(veda)}`:''}</span>`;
        list.append(a);
      });
      details.append(list);replacement.append(details);
    });
    holder.replaceWith(replacement);
    root.dataset.upanishadWikipediaIndex='1';
  }

  if(!document.getElementById('upanishad-wikipedia-index-style')){
    const style=document.createElement('style');style.id='upanishad-wikipedia-index-style';style.textContent=`
      .up-wiki-intro{margin:0 0 18px;padding:12px 14px;border:1px solid #a2a9b1;background:#f8f9fa;color:#202122;font:14px/1.55 Arial,Helvetica,sans-serif}.up-wiki-intro p{margin:0!important;color:#202122!important;font:inherit!important}
      .up-wiki-index{border-top:1px solid #a2a9b1;background:#fff}.up-wiki-group{margin:0;border-bottom:1px solid #a2a9b1;background:#fff}.up-wiki-group>summary{list-style:none;position:relative;display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:13px 36px 13px 4px;cursor:pointer;color:#202122;font:400 23px/1.25 Georgia,'Times New Roman',serif}.up-wiki-group>summary::-webkit-details-marker{display:none}.up-wiki-group>summary::after{content:'›';position:absolute;right:8px;top:50%;transform:translateY(-50%) rotate(90deg);color:#54595d;font:22px/1 Arial,sans-serif}.up-wiki-group[open]>summary::after{transform:translateY(-50%) rotate(-90deg)}.up-wiki-group>summary small{color:#54595d;font:12px/1.3 Arial,Helvetica,sans-serif}
      .up-wiki-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;border-top:1px solid #eaecf0}.up-wiki-link{display:flex;flex-direction:column;gap:3px;padding:10px 12px;border-bottom:1px solid #eaecf0;color:#36c!important;text-decoration:none!important;background:#fff}.up-wiki-link:nth-child(odd){border-right:1px solid #eaecf0}.up-wiki-link:hover{background:#f8f9fa;text-decoration:underline!important}.up-wiki-link-title{font:15px/1.35 Arial,Helvetica,sans-serif}.up-wiki-link-meta{color:#54595d;font:11px/1.35 Arial,Helvetica,sans-serif;text-decoration:none!important}
      @media(max-width:700px){.up-wiki-group>summary{font-size:21px}.up-wiki-list{grid-template-columns:1fr}.up-wiki-link:nth-child(odd){border-right:0}}
    `;document.head.append(style);
  }
  rebuild();
  const observer=new MutationObserver(rebuild);observer.observe(root,{childList:true,subtree:true});
  window.UPANISHAD_STATIC_PAGE_LINKS=true;
  window.UPANISHAD_WIKIPEDIA_INDEX=true;
})();