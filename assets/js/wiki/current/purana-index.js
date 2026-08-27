/* Final Wikipedia-style Purāṇa directory. Runs after the legacy index and does not depend on accented stage-title text or research-data downloads. */
(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const stage=root.querySelector('.browser-stage');
  if(!stage)return;

  const MAHA=['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa'];
  const OTHER=['Vāyu Purāṇa','Devī Bhāgavata Purāṇa','Mahābhāgavata Purāṇa'];
  const UPA=['Ādi Purāṇa','Āditya Purāṇa','Ādya / Sanatkumāra Purāṇa','Āṇḍa Purāṇa','Another Brahmāṇḍa Purāṇa','Another Nāradīya Purāṇa','Auśanasa Purāṇa','Bhāgavata Purāṇa','Bhārgava Purāṇa','Brahmāṇḍa Purāṇa','Bṛhaddharma Purāṇa','Bṛhannandīśvara Purāṇa','Bṛhannāradīya Purāṇa','Daurvāsasa Purāṇa','Dharma Purāṇa','Kālikā Purāṇa','Kapila Purāṇa','Kaumāra Purāṇa','Kriyāyogasāra Purāṇa','Māheśa Purāṇa','Māheśvara Purāṇa','Mānava Purāṇa','Mārīca Purāṇa','Nandikṛta Purāṇa','Nandīśvara Purāṇa','Nāradīya Purāṇa','Nṛsiṃha Purāṇa','Parāśara Purāṇa','Sāmba Purāṇa','Sanatkumāra Purāṇa','Saura Purāṇa','Śiva Purāṇa','Śivadharma Purāṇa','Skanda Purāṇa','Vāmana Purāṇa','Varuṇa Purāṇa','Vāsiṣṭha Purāṇa','Viṣṇudharma Purāṇa','Viṣṇudharmottara Purāṇa'];
  const W={
    'Devī Bhāgavata 1.3.13–16':['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Nāradīya Purāṇa','Śiva Purāṇa','Daurvāsasa Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Sāmba Purāṇa','Nandikṛta Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Āditya Purāṇa','Māheśvara Purāṇa','Bhāgavata Purāṇa','Vāsiṣṭha Purāṇa'],
    'Kūrma Purāṇa 1.1.17–20':['Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Skanda Purāṇa','Śivadharma Purāṇa','Daurvāsasa Purāṇa','Nāradīya Purāṇa','Kapila Purāṇa','Vāmana Purāṇa','Auśanasa Purāṇa','Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśvara Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa'],
    'Padma Purāṇa, Pātāla-khaṇḍa 111.94b–98':['Ādya / Sanatkumāra Purāṇa','Nṛsiṃha Purāṇa','Āṇḍa Purāṇa','Daurvāsasa Purāṇa','Another Nāradīya Purāṇa','Kapila Purāṇa','Mānava Purāṇa','Auśanasa Purāṇa','Another Brahmāṇḍa Purāṇa','Varuṇa Purāṇa','Kālikā Purāṇa','Māheśa Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Parāśara Purāṇa','Mārīca Purāṇa','Bhārgava Purāṇa','Kaumāra Purāṇa'],
    'Bṛhaddharma Purāṇa 1.25.23–26':['Ādi Purāṇa','Āditya Purāṇa','Bṛhannāradīya Purāṇa','Nāradīya Purāṇa','Nandīśvara Purāṇa','Bṛhannandīśvara Purāṇa','Sāmba Purāṇa','Kriyāyogasāra Purāṇa','Kālikā Purāṇa','Dharma Purāṇa','Viṣṇudharmottara Purāṇa','Śivadharma Purāṇa','Viṣṇudharma Purāṇa','Vāmana Purāṇa','Varuṇa Purāṇa','Nṛsiṃha Purāṇa','Bhārgava Purāṇa','Bṛhaddharma Purāṇa']
  };
  const EXTANT=new Set(['Ādi Purāṇa','Bṛhaddharma Purāṇa','Bṛhannāradīya Purāṇa','Kālikā Purāṇa','Kapila Purāṇa','Kriyāyogasāra Purāṇa','Nṛsiṃha Purāṇa','Sāmba Purāṇa','Saura Purāṇa','Śivadharma Purāṇa','Viṣṇudharma Purāṇa','Viṣṇudharmottara Purāṇa']);
  const LOST=new Set(['Āditya Purāṇa','Āṇḍa Purāṇa','Another Brahmāṇḍa Purāṇa','Another Nāradīya Purāṇa','Auśanasa Purāṇa','Daurvāsasa Purāṇa','Mārīca Purāṇa','Nandikṛta Purāṇa','Nandīśvara Purāṇa']);

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const count=name=>Object.values(W).filter(xs=>xs.includes(name)).length;
  const normal=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'');
  const puranaActive=()=>{
    const active=root.querySelector('.corpus-button[data-corpus="puranas"].is-active,.corpus-button[data-corpus="puranas"][aria-pressed="true"],.corpus-button[data-corpus="puranas"][aria-current="true"]');
    if(active)return true;
    return normal(stage.querySelector('.shastra-title')?.textContent)==='puranas';
  };

  function installStyle(){
    if(document.getElementById('purana-wiki-directory-v3-style'))return;
    const s=document.createElement('style');s.id='purana-wiki-directory-v3-style';s.textContent=`
      .purana-wiki-v3{background:#fff;color:#202122;font-family:Arial,Helvetica,sans-serif}.purana-wiki-v3 .purana-intro{margin:0 0 16px;padding:12px 14px;border:1px solid #a2a9b1;background:#f8f9fa;font-size:14px;line-height:1.55}.purana-wiki-v3 .purana-intro p{margin:0 0 7px!important;color:#202122!important;font:inherit!important}.purana-wiki-v3 .purana-intro p:last-child{margin-bottom:0!important}
      .purana-wiki-v3 details{margin:0;border-top:1px solid #a2a9b1;background:#fff}.purana-wiki-v3 details:last-child{border-bottom:1px solid #a2a9b1}.purana-wiki-v3 summary{list-style:none;position:relative;padding:13px 40px 13px 4px;cursor:pointer;color:#202122;font:400 23px/1.25 Georgia,'Times New Roman',serif}.purana-wiki-v3 summary::-webkit-details-marker{display:none}.purana-wiki-v3 summary::after{content:'›';position:absolute;right:10px;top:50%;transform:translateY(-50%) rotate(90deg);color:#54595d}.purana-wiki-v3 details[open]>summary::after{transform:translateY(-50%) rotate(-90deg)}.purana-wiki-v3 summary small{float:right;margin-top:7px;color:#72777d;font:11px/1.3 Arial,Helvetica,sans-serif}
      .purana-wiki-v3 .purana-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid #eaecf0}.purana-wiki-v3 .purana-entry{display:block;padding:10px 12px;border-bottom:1px solid #eaecf0;text-decoration:none!important;background:#fff}.purana-wiki-v3 .purana-entry:nth-child(odd){border-right:1px solid #eaecf0}.purana-wiki-v3 .purana-entry:hover{background:#f8f9fa}.purana-wiki-v3 .purana-name{display:block;color:#36c;font-size:15px;line-height:1.35}.purana-wiki-v3 .purana-entry:hover .purana-name{text-decoration:underline}.purana-wiki-v3 .purana-meta{display:block;margin-top:3px;color:#54595d;font-size:11px;line-height:1.4}.purana-wiki-v3 .purana-status{display:inline-block;margin-right:5px;padding:1px 5px;border:1px solid #a2a9b1;background:#f8f9fa;font-size:10px}.purana-wiki-v3 .purana-note{padding:10px 12px;border-top:1px solid #eaecf0;background:#f8f9fa;color:#54595d;font-size:12px;line-height:1.5}
      @media(max-width:700px){.purana-wiki-v3 summary{font-size:21px}.purana-wiki-v3 .purana-list{grid-template-columns:1fr}.purana-wiki-v3 .purana-entry:nth-child(odd){border-right:0}}
    `;document.head.append(s);
  }
  const mahaEntry=name=>`<a class="purana-entry" href="/vivekadrishti/articles/scripture/${slug(name)}/"><span class="purana-name">${esc(name)}</span><span class="purana-meta">Mahāpurāṇa encyclopedia article</span></a>`;
  const upaEntry=name=>{
    const status=EXTANT.has(name)?'extant / transmitted':LOST.has(name)?'lost / fragmentary':'identity / preservation disputed';
    return `<a class="purana-entry" href="/vivekadrishti/articles/scripture/upapuranas/${slug(name)}/"><span class="purana-name">${esc(name)}</span><span class="purana-meta"><span class="purana-status">${status}</span>${count(name)} of 4 traditional list witnesses</span></a>`;
  };
  function markup(){return `
    <h2 class="shastra-title">Purāṇas</h2>
    <div class="purana-wiki-v3">
      <div class="purana-intro"><p><b>Purāṇa research directory.</b> This index separates Mahāpurāṇa and Upapurāṇa classification from questions of date, textual identity and manuscript survival.</p><p>The Upapurāṇa section contains <b>39 distinct witness-labels</b>, the union of four traditional eighteen-title lists. Because those lists disagree, each article treats list attestation separately from composition, recensions and survival.</p></div>
      <details open><summary>Mahāpurāṇas <small>18 principal entries</small></summary><div class="purana-list">${MAHA.map(mahaEntry).join('')}</div></details>
      <details><summary>Upapurāṇas <small>39 witness-labels · 4 lists</small></summary><div class="purana-note">Wikipedia-style research articles with the same nine-section template as the Mahāpurāṇas. Lost and homonymous titles are presented as textual-history dossiers rather than given invented contents.</div><div class="purana-list">${UPA.map(upaEntry).join('')}</div></details>
      <details><summary>Other Mahāpurāṇa attestations <small>${OTHER.length} titles</small></summary><div class="purana-list">${OTHER.map(mahaEntry).join('')}</div></details>
    </div>`;}
  let rendering=false;
  function render(force=false){
    if(rendering||stage.hidden)return;
    if(!force&&!puranaActive())return;
    if(stage.querySelector('.purana-wiki-v3'))return;
    rendering=true;installStyle();stage.innerHTML=markup();rendering=false;
  }
  function schedule(force=false){requestAnimationFrame(()=>requestAnimationFrame(()=>render(force)));setTimeout(()=>render(force),0);setTimeout(()=>render(force),80);}
  const obs=new MutationObserver(()=>{if(!rendering&&puranaActive()&&!stage.querySelector('.purana-wiki-v3'))schedule(false);});
  obs.observe(stage,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  root.addEventListener('click',e=>{if(e.target.closest('.corpus-button[data-corpus="puranas"]'))schedule(true);});
  document.addEventListener('click',e=>{if(e.target.closest('#scripture-browser .corpus-button[data-corpus="puranas"]'))schedule(true);},true);
  render(false);
})();
