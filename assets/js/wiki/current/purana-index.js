/* Wikipedia-style Purāṇa directory: Mahāpurāṇas + the 39 distinct Upapurāṇa witness-labels. */
(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const stage=root.querySelector('.browser-stage');
  if(!stage)return;
  const BUILD='20260827-upapurana39-v5';
  const MAHA=[["Brahma Purāṇa", "brahma-purana"], ["Padma Purāṇa", "padma-purana"], ["Viṣṇu Purāṇa", "vishnu-purana"], ["Śiva Purāṇa", "shiva-purana"], ["Liṅga Purāṇa", "linga-purana"], ["Garuḍa Purāṇa", "garuda-purana"], ["Nāradīya Purāṇa", "naradiya-purana"], ["Bhāgavata Purāṇa", "bhagavata-purana"], ["Agni Purāṇa", "agni-purana"], ["Skanda Purāṇa", "skanda-purana"], ["Bhaviṣya Purāṇa", "bhavishya-purana"], ["Brahmavaivarta Purāṇa", "brahmavaivarta-purana"], ["Mārkaṇḍeya Purāṇa", "markandeya-purana"], ["Vāmana Purāṇa", "vamana-purana"], ["Varāha Purāṇa", "varaha-purana"], ["Matsya Purāṇa", "matsya-purana"], ["Kūrma Purāṇa", "kurma-purana"], ["Brahmāṇḍa Purāṇa", "brahmanda-purana"]];
  const OTHER=[["Vāyu Purāṇa", "vayu-purana"], ["Devī Bhāgavata Purāṇa", "devi-bhagavata-purana"], ["Mahābhāgavata Purāṇa", "mahabhagavata-purana"]];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const loadOne=src=>new Promise(resolve=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=resolve;document.head.append(s);});
  const loadResearch=async()=>{
    if(window.UPAPURANA_RESEARCH)return;
    if(window.__UPAPURANA_LOADING__){await window.__UPAPURANA_LOADING__;return;}
    window.__UPAPURANA_LOADING__=(async()=>{
      await loadOne(`/vivekadrishti/assets/js/puranas/current/upapurana-research.js?build=${BUILD}`);
      if(window.UPAPURANA_READY) await window.UPAPURANA_READY;
    })();
    await window.__UPAPURANA_LOADING__;
  };
  const statusClass=status=>{
    const s=String(status||'').toLowerCase();
    if(s.includes('extant')&&!s.includes('lost'))return'extant';
    if(s.includes('lost')||s.includes('fragment'))return'lost';
    return'uncertain';
  };
  function style(){
    if(document.getElementById('purana-wiki-directory-v2-style'))return;
    const s=document.createElement('style');s.id='purana-wiki-directory-v2-style';s.textContent=`
      .purana-wiki-research-intro{margin:0 0 18px;padding:12px 14px;border:1px solid #a2a9b1;background:#f8f9fa;color:#202122;font:14px/1.55 Arial,Helvetica,sans-serif}
      .purana-wiki-research-intro p{margin:0 0 8px!important;color:#202122!important;font:inherit!important}.purana-wiki-research-intro p:last-child{margin-bottom:0!important}
      .purana-wiki-directory-v2{border-top:1px solid #a2a9b1;background:#fff}
      .purana-wiki-corpus{margin:0;border-bottom:1px solid #a2a9b1;background:#fff}
      .purana-wiki-corpus>summary{list-style:none;position:relative;display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:13px 38px 13px 4px;cursor:pointer;color:#202122;font:400 23px/1.25 Georgia,'Times New Roman',serif}
      .purana-wiki-corpus>summary::-webkit-details-marker{display:none}.purana-wiki-corpus>summary::after{content:'›';position:absolute;right:8px;top:50%;transform:translateY(-50%) rotate(90deg);color:#54595d;font:22px/1 Arial,sans-serif}.purana-wiki-corpus[open]>summary::after{transform:translateY(-50%) rotate(-90deg)}
      .purana-wiki-corpus>summary small{color:#54595d;font:12px/1.35 Arial,Helvetica,sans-serif}
      .purana-wiki-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid #eaecf0}
      .purana-wiki-entry{display:block;padding:10px 12px;border-bottom:1px solid #eaecf0;background:#fff;text-decoration:none!important}.purana-wiki-entry:nth-child(odd){border-right:1px solid #eaecf0}.purana-wiki-entry:hover{background:#f8f9fa}
      .purana-wiki-title{display:block;color:#36c;font:15px/1.35 Arial,Helvetica,sans-serif}.purana-wiki-entry:hover .purana-wiki-title{text-decoration:underline}
      .purana-wiki-meta{display:block;margin-top:3px;color:#54595d;font:11px/1.4 Arial,Helvetica,sans-serif;text-decoration:none!important}
      .purana-status{display:inline-block;margin-right:5px;padding:1px 5px;border:1px solid #a2a9b1;background:#f8f9fa;color:#54595d;font:10px/1.4 Arial,sans-serif}
      .purana-status.extant{border-color:#7ba77b}.purana-status.lost{border-color:#b78a8a}.purana-status.uncertain{border-color:#b6a56d}
      .purana-upa-note{padding:11px 12px;border-top:1px solid #eaecf0;background:#f8f9fa;color:#54595d;font:12px/1.5 Arial,Helvetica,sans-serif}
      @media(max-width:700px){.purana-wiki-corpus>summary{font-size:21px}.purana-wiki-list{grid-template-columns:1fr}.purana-wiki-entry:nth-child(odd){border-right:0}}
    `;document.head.append(s);
  }
  const mahaEntry=([name,slug])=>`<a class="purana-wiki-entry" href="/vivekadrishti/articles/scripture/${slug}/"><span class="purana-wiki-title">${esc(name)}</span><span class="purana-wiki-meta">Mahāpurāṇa research article</span></a>`;
  const upaEntry=p=>{
    const ws=(p.witnesses||[]);
    const sc=statusClass(p.status);
    return `<a class="purana-wiki-entry" href="/vivekadrishti/articles/scripture/upapuranas/${esc(p.slug)}/"><span class="purana-wiki-title">${esc(p.name)}</span><span class="purana-wiki-meta"><span class="purana-status ${sc}">${sc==='extant'?'extant / transmitted':sc==='lost'?'lost / fragmentary':'identity / status disputed'}</span>${esc(p.orientation||'')} · ${ws.length} of 4 list witnesses</span></a>`;
  };
  async function render(){
    if(stage.hidden)return;
    const title=stage.querySelector('.shastra-title');
    if(!title||title.textContent.trim()!=='Purāṇas')return;
    if(stage.dataset.puranaWikiV2==='1')return;
    await loadResearch();
    if(stage.hidden)return;
    const data=Object.values(window.UPAPURANA_RESEARCH||{}).sort((a,b)=>a.name.localeCompare(b.name,'en'));
    style();
    stage.innerHTML=`
      <h2 class="shastra-title">Purāṇas</h2>
      <div class="purana-wiki-research-intro">
        <p><b>Research directory.</b> Mahāpurāṇa and Upapurāṇa are historical classification traditions, not simple measures of textual size or age.</p>
        <p>The Upapurāṇa directory contains <b>${data.length} distinct witness-labels</b> produced by the union of four traditional eighteen-title lists represented in this index. Because those lists disagree, a list attestation is reported separately from the date, survival and identity of the work.</p>
      </div>
      <div class="purana-wiki-directory-v2">
        <details class="purana-wiki-corpus" open><summary><span>Mahāpurāṇas</span><small>${MAHA.length} principal entries</small></summary><div class="purana-wiki-list">${MAHA.map(mahaEntry).join('')}</div></details>
        <details class="purana-wiki-corpus"><summary><span>Upapurāṇas</span><small>${data.length} witness-labels · 4 traditional lists</small></summary>
          <div class="purana-upa-note">Each article distinguishes list attestation, composition/redaction, manuscript survival, printed editions and genuinely critical editions. Lost or homonymous titles are treated as evidence dossiers rather than reconstructed with invented chapter summaries.</div>
          <div class="purana-wiki-list">${data.map(upaEntry).join('')}</div>
        </details>
        <details class="purana-wiki-corpus"><summary><span>Other Mahāpurāṇa attestations</span><small>${OTHER.length} titles</small></summary><div class="purana-wiki-list">${OTHER.map(mahaEntry).join('')}</div></details>
      </div>`;
    stage.dataset.puranaWikiV2='1';
  }
  const observer=new MutationObserver(()=>requestAnimationFrame(render));
  observer.observe(stage,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  root.addEventListener('click',e=>{if(e.target.closest('.corpus-button[data-corpus="puranas"]'))requestAnimationFrame(()=>requestAnimationFrame(render));});
  render();
})();
