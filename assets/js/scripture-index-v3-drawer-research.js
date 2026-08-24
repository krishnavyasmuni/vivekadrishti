(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const splitWitnesses = value => String(value || '').split(' · ').map(s => s.trim()).filter(Boolean);
  let backdrop = null;
  let drawer = null;

  const closeDrawer = () => {
    backdrop?.remove(); drawer?.remove(); backdrop = drawer = null;
    root.querySelectorAll('.shastra-name.is-active').forEach(el => { el.classList.remove('is-active'); el.setAttribute('aria-pressed','false'); });
    document.documentElement.classList.remove('scripture-drawer-open');
  };
  const row = (label,value) => value ? `<div class="scripture-drawer-row"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>` : '';
  const prose = (label,value,cls='') => value ? `<section class="scripture-drawer-section ${cls}"><h4>${esc(label)}</h4><p>${esc(value)}</p></section>` : '';
  const list = (label,values,cls='') => Array.isArray(values)&&values.length ? `<section class="scripture-drawer-section ${cls}"><h4>${esc(label)}</h4><ul>${values.map(v=>`<li>${esc(v)}</li>`).join('')}</ul></section>` : '';
  const witness = (label,values) => values.length ? `<section class="scripture-drawer-witness"><h4>${esc(label)}</h4><ul>${values.map(v=>`<li>${esc(v)}</li>`).join('')}</ul></section>` : '';

  function fallback(name,kind,d){
    if(kind==='Upaniṣad') return {overview:`${name} belongs to the 108-text Muktikā enumeration.`, status:'A fully individualized research dossier has not yet been securely established for this title.', sources:['Muktikā Upaniṣad — 108-name/Veda list','Critical/minor-Upaniṣad editions']};
    if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind)) return {overview:`${name} is a Purāṇic title attested by the scriptural witness shown above.`, status:'The exact surviving textual identity must be established before assigning detailed contents.', sources:['The Purāṇic catalogue passage shown above','R. C. Hazra, Studies in the Upapurāṇas','Ludo Rocher, The Purāṇas']};
    if(kind==='Smṛti') return {overview:`${name} is named as a Dharma authority by the śāstric list shown above.`, status:'Survival of the original work varies; some authorities are known principally through quotations.', sources:['The śāstric Smṛti list shown above','P. V. Kane, History of Dharmaśāstra']};
    return null;
  }

  function canonicalKey(kind,name){
    if(kind==='Upaniṣad') return `Upaniṣad:${name}`;
    if(kind==='Smṛti') return `Smṛti:${name}`;
    if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind)) return `Purāṇa:${name}`;
    if(['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(kind)) return `Vedic:${name}`;
    return `${kind}:${name}`;
  }

  function detailsFor(button){
    const d=button.dataset; const name=d.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim(); const kind=d.kind||'';
    const rows=[]; const blocks=[];
    if(kind==='Upaniṣad'){rows.push(['Text class','Upaniṣad'],['Traditional group',d.type||''],['Veda association',d.veda||'']);}
    else if(['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(kind)){rows.push(['Vedic layer',kind],['Veda',d.veda||''],['Śākhā / recension',d.branch||'']);}
    else if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(kind)){
      rows.push(['Purāṇa status',kind==='Both'?'Attested in both categories':kind],['Sectarian grouping',d.sect||'Mixed / composite']);
      const maha=splitWitnesses(d.maha), upa=splitWitnesses(d.upa); if(maha.length)blocks.push(['Mahāpurāṇa attestations',maha]); if(upa.length)blocks.push(['Upapurāṇa attestations',upa]);
    } else if(kind==='Smṛti'){rows.push(['Text class','Smṛti / Dharma authority'],['Classification',d.group||'Named Smṛti authority'],['Scriptural list',d.source||'']);}
    else if(kind==='Itihāsa') rows.push(['Text class','Itihāsa']);
    else if(kind==='Vedāṅga') rows.push(['Text class','Vedāṅga'],['Scriptural list',d.source||'Muṇḍaka Upaniṣad 1.1.5']);
    const data=window.SCRIPTURE_DETAIL_DATA||{}; const key=canonicalKey(kind,name);
    const researched=data[key]||data[`${kind}:${name}`]||data[name]||fallback(name,kind,d);
    return {name,kind,rows,blocks,researched};
  }

  function renderResearch(e){
    if(!e) return '';
    const contents=e.contents||e.keyContents||e.themes;
    return [
      prose('What the text is',e.overview,'is-overview'),
      prose('Date / period',e.period,'is-period'),
      prose('Provenance / textual milieu',e.milieu),
      prose('Composition & transmission history',e.history),
      prose('Why scholars date it this way',e.datingBasis),
      list('Chapter / section map',e.chapterMap,'is-chapter-map'),
      list('What is actually in the text',contents,'is-contents'),
      list('Named stories, rites, doctrines & practices',e.namedFeatures),
      prose('Ritual & social history',e.ritualHistory),
      list('Borrowings, parallels & textual dependencies',e.dependencies),
      prose('Manuscripts & recensions',e.manuscripts),
      prose('Doctrinal / sectarian profile',e.profile),
      list('Primary passages worth checking',e.primaryEvidence),
      prose('Hazra / specialist research notes',e.hazraNotes,'is-scholarship'),
      list('Major scholarly debates',e.scholarlyDebates,'is-scholarship'),
      prose('Transmission problems / cautions',e.status,'is-status'),
      prose('Later reception & influence',e.reception||e.significance),
      list('Sources used for this entry',e.sources,'scripture-drawer-sources')
    ].join('');
  }

  function openDrawer(button){
    closeDrawer(); button.classList.add('is-active'); button.setAttribute('aria-pressed','true');
    const info=detailsFor(button);
    backdrop=document.createElement('div'); backdrop.className='scripture-drawer-backdrop'; backdrop.setAttribute('aria-hidden','true');
    drawer=document.createElement('aside'); drawer.className='scripture-drawer scripture-research-drawer'; drawer.setAttribute('role','dialog'); drawer.setAttribute('aria-modal','true'); drawer.setAttribute('aria-label',`Research notes for ${info.name}`);
    drawer.innerHTML=`<div class="scripture-drawer-head"><div><span class="scripture-drawer-kicker">Text dossier</span><h3>${esc(info.name)}</h3></div><button type="button" class="scripture-drawer-close" aria-label="Close details">×</button></div><div class="scripture-drawer-body">${info.rows.length?`<dl class="scripture-drawer-meta">${info.rows.map(([k,v])=>row(k,v)).join('')}</dl>`:''}${info.blocks.map(([l,v])=>witness(l,v)).join('')}${renderResearch(info.researched)}</div>`;
    document.body.append(backdrop,drawer); document.documentElement.classList.add('scripture-drawer-open'); drawer.querySelector('.scripture-drawer-close')?.focus({preventScroll:true});
  }

  root.addEventListener('click',event=>{const button=event.target.closest('.shastra-name'); if(!button||!root.contains(button))return; event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); openDrawer(button);},true);
  document.addEventListener('click',event=>{if(event.target===backdrop||event.target.closest('.scripture-drawer-close'))closeDrawer();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&drawer)closeDrawer();});
})();