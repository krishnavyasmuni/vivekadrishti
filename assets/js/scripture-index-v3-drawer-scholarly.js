(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const split=v=>String(v||'').split(' · ').map(x=>x.trim()).filter(Boolean);
  let shade,panel;
  const close=()=>{shade?.remove();panel?.remove();shade=panel=null;document.documentElement.classList.remove('scholarly-drawer-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});};
  const prose=(title,text,cls='')=>text?`<section class="scholar-sec ${cls}"><h4>${esc(title)}</h4><p>${esc(text)}</p></section>`:'';
  const list=(title,items,cls='')=>Array.isArray(items)&&items.length?`<section class="scholar-sec ${cls}"><h4>${esc(title)}</h4><ul>${items.map(x=>`<li>${esc(typeof x==='string'?x:(x.claim||x.text||x.full||x.short||JSON.stringify(x)))}</li>`).join('')}</ul></section>`:'';
  const meta=(k,v)=>v?`<div class="scholar-meta-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`:'';
  const witnesses=(title,items)=>items.length?`<section class="scholar-witness"><h4>${esc(title)}</h4><ol>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section>`:'';
  function keyFor(kind,name){if(kind==='Upaniṣad')return`Upaniṣad:${name}`;if(kind==='Smṛti')return`Smṛti:${name}`;if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind))return`Purāṇa:${name}`;if(['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(kind))return`Vedic:${name}`;return`${kind}:${name}`;}
  function basic(button){const d=button.dataset;const name=d.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim();const kind=d.kind||'';const m=[];const w=[];
    if(kind==='Upaniṣad'){m.push(['Corpus','Upaniṣad'],['Traditional group',d.type||''],['Veda association',d.veda||'']);}
    else if(['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(kind)){m.push(['Vedic layer',kind],['Veda',d.veda||''],['Śākhā / recension',d.branch||'']);}
    else if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind)){m.push(['Purāṇic status',kind==='Both'?'Attested in both categories':kind],['Sectarian grouping',d.sect||'Mixed / composite']);const mh=split(d.maha),up=split(d.upa);if(mh.length)w.push(['Mahāpurāṇa attestations',mh]);if(up.length)w.push(['Upapurāṇa attestations',up]);}
    else if(kind==='Smṛti'){m.push(['Corpus','Smṛti / Dharma'],['List classification',d.group||'Named authority'],['Śāstric list',d.source||'']);}
    else if(kind==='Itihāsa')m.push(['Corpus','Itihāsa']);
    else if(kind==='Vedāṅga')m.push(['Corpus','Vedāṅga'],['Śāstric list',d.source||'Muṇḍaka Upaniṣad 1.1.5']);
    return{name,kind,m,w,d};}
  function fallback(info){return{overview:`${info.name} is present in the index, but a text-specific scholarly dossier has not yet been established to the same evidentiary standard as the completed entries.`,status:'No speculative history is shown here. This card should be expanded only from identifiable editions, manuscripts, primary passages and specialist scholarship.',bibliography:['Primary text/manuscript evidence still to be established for this exact indexed title.']};}
  function body(entry){const contents=entry.contents||entry.keyContents||entry.themes;const bibliography=[...(entry.bibliography||[]),...(entry.sources||[])].filter((v,i,a)=>v&&a.indexOf(v)===i);return[
    prose('What this text actually is',entry.overview,'lead'),
    prose('Date / chronological horizon',entry.period,'date'),
    prose('Provenance / intellectual milieu',entry.milieu),
    prose('Composition and textual history',entry.history),
    prose('Evidence used for dating',entry.datingBasis),
    list('Internal structure / chapter map',entry.chapterMap,'map'),
    list('What is actually in the text',contents,'contents'),
    list('Named episodes, rites, doctrines or sections',entry.namedFeatures),
    prose('Ritual and social-historical evidence',entry.ritualHistory),
    list('Textual dependencies / parallels / borrowings',entry.dependencies),
    prose('Manuscripts and recensions',entry.manuscripts),
    prose('Doctrinal / sectarian profile',entry.profile),
    list('Primary passages to inspect',entry.primaryEvidence||entry.primaryPassages),
    prose('Hazra / specialist textual analysis',entry.hazraNotes,'hazra'),
    list('Named scholarly positions',entry.scholarlyPositions,'positions'),
    list('Major scholarly disputes',entry.scholarlyDebates,'positions'),
    prose('Text-critical cautions',entry.status,'caution'),
    prose('Reception and historical influence',entry.reception||entry.significance),
    list('Bibliography used for this dossier',bibliography,'bibliography')
  ].join('');}
  function open(button){close();button.classList.add('is-active');button.setAttribute('aria-pressed','true');const info=basic(button);const data=window.SCRIPTURE_DETAIL_DATA||{};const entry=data[keyFor(info.kind,info.name)]||data[`${info.kind}:${info.name}`]||data[info.name]||fallback(info);
    shade=document.createElement('div');shade.className='scholar-backdrop';
    panel=document.createElement('aside');panel.className='scholar-drawer';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label',`Scholarly dossier for ${info.name}`);
    panel.innerHTML=`<header class="scholar-head"><div><span>Critical text dossier</span><h3>${esc(info.name)}</h3></div><button class="scholar-close" type="button" aria-label="Close">×</button></header><div class="scholar-scroll"><dl class="scholar-meta">${info.m.map(([k,v])=>meta(k,v)).join('')}</dl>${info.w.map(([t,x])=>witnesses(t,x)).join('')}${body(entry)}</div>`;
    document.body.append(shade,panel);document.documentElement.classList.add('scholarly-drawer-open');panel.querySelector('.scholar-close')?.focus({preventScroll:true});}
  root.addEventListener('click',e=>{const b=e.target.closest('.shastra-name');if(!b||!root.contains(b))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open(b);},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest('.scholar-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel)close();});
})();