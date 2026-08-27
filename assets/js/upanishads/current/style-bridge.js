(() => {
  const roman = s => String(s ?? '')
    .replace(/Ś/g,'Sh').replace(/ś/g,'sh').replace(/Ṣ/g,'Sh').replace(/ṣ/g,'sh')
    .replace(/Ṛ/g,'Ri').replace(/ṛ/g,'ri').replace(/Ṝ/g,'Ri').replace(/ṝ/g,'ri')
    .replace(/Ṅ/g,'Ng').replace(/ṅ/g,'ng').replace(/Ñ/g,'Ny').replace(/ñ/g,'ny')
    .replace(/Ṃ|Ṁ/g,'M').replace(/ṃ|ṁ/g,'m').replace(/Ḥ/g,'H').replace(/ḥ/g,'h')
    .replace(/Ṭ/g,'T').replace(/ṭ/g,'t').replace(/Ḍ/g,'D').replace(/ḍ/g,'d').replace(/Ṇ/g,'N').replace(/ṇ/g,'n')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');

  function styleKena(reader){
    if(!reader || reader.classList.contains('universal-wiki-reader') || reader.classList.contains('itihasa-v5-reader')) return;
    const article=reader.querySelector('.kena-article');
    if(!article || article.dataset.universalKena==='1') return;
    article.dataset.universalKena='1';reader.classList.add('kena-universal-reader');
    const h1=reader.querySelector('.kena-article-head h1');
    if(h1){h1.textContent='Kena Upanishad';if(!reader.querySelector('.kena-universal-dev')){const d=document.createElement('div');d.className='kena-universal-dev';d.textContent='केनोपनिषद्';h1.insertAdjacentElement('afterend',d);}}
    const walker=document.createTreeWalker(reader,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{const p=node.parentElement;if(!p||p.closest('[lang="sa"],[lang="sa-Deva"],.kena-references,.itihasa-source-card,.kena-universal-dev'))return;node.nodeValue=roman(node.nodeValue);});
  }

  const EXACT_UPANISHAD_TEMPLATE=[
    'Date of composition',
    'Structure',
    'Contents',
    'Theology',
    'Critical edition',
    'Influences and reception',
    'Rites, dharma and social history',
    'Further reading',
    'References'
  ];

  function setExactText(node,value){
    if(node && node.textContent!==value) node.textContent=value;
  }

  function setPuranaSectionOpen(section,open){
    if(!section)return;
    const body=section.querySelector(':scope > .mahapurana-collapse-body');
    const h2=section.querySelector(':scope > h2');
    if(!body||!h2)return;
    section.classList.toggle('is-open',open);
    body.hidden=!open;
    h2.setAttribute('aria-expanded',open?'true':'false');
  }

  function enforceExactUpanishadTemplate(reader){
    if(!reader || !reader.classList.contains('up-research-reader')) return;
    setExactText(reader.querySelector('.up-research-toc > summary'),'Contents');
    setExactText(reader.querySelector('.up-research-toc > .kena-toc-title'),'Contents');

    const oldLabels=[...reader.querySelectorAll('.up-research-section > summary > span:first-child')];
    const puranaLabels=[...reader.querySelectorAll('.mahapurana-collapse-section > h2')];
    const labels=puranaLabels.length?puranaLabels:oldLabels;
    EXACT_UPANISHAD_TEMPLATE.forEach((label,i)=>setExactText(labels[i],label));

    const tocLinks=[...reader.querySelectorAll('.up-research-toc > ol > li > a')];
    EXACT_UPANISHAD_TEMPLATE.forEach((label,i)=>setExactText(tocLinks[i],label));
    reader.dataset.exactUpanishadTemplate='1';
  }

  function applyMahapuranaTemplate(reader){
    if(!reader || !reader.classList.contains('up-research-reader'))return;
    if(reader.dataset.mahapuranaTemplate==='1'){enforceExactUpanishadTemplate(reader);return;}

    reader.classList.add('kena-article-reader','purana-full-reader','mahapurana-wiki-reader');
    document.documentElement.classList.add('kena-article-open');

    const backdrop=document.querySelector('.up-research-backdrop');
    backdrop?.classList.add('kena-article-backdrop','scripture-wiki-backdrop','purana-full-backdrop');

    const head=reader.querySelector('.up-research-head');
    head?.classList.add('kena-article-head');
    const eyebrow=head?.querySelector('.up-research-eyebrow');
    if(eyebrow){eyebrow.classList.add('eyebrow');eyebrow.textContent='Upaniṣad · encyclopedia article';}
    head?.querySelector('.up-research-close')?.classList.add('kena-article-close');
    reader.querySelector('.up-research-scroll')?.classList.add('kena-article-scroll');

    const article=reader.querySelector('.upanishad-research-article');
    if(!article)return;
    article.classList.add('purana-full-article','universal-wiki-article','mahapurana-wiki-article');

    if(!article.querySelector(':scope > .mahapurana-main-title')){
      const main=document.createElement('div');
      main.className='mahapurana-main-title';
      main.textContent=head?.querySelector('h1')?.textContent?.trim()||'Upaniṣad';
      article.prepend(main);
      const sourceDev=head?.querySelector('.up-research-dev');
      if(sourceDev?.textContent?.trim()){
        const dev=document.createElement('div');dev.className='mahapurana-devanagari';dev.lang='sa-Deva';dev.textContent=sourceDev.textContent.trim();main.insertAdjacentElement('afterend',dev);
      }
    }

    const infobox=article.querySelector('.up-research-infobox');
    if(infobox){
      infobox.classList.add('kena-infobox','universal-infobox','purana-full-infobox');
      infobox.querySelector('.up-research-infobox-title')?.classList.add('kena-infobox-title');
      infobox.querySelector('figure')?.classList.add('universal-infobox-image');
      infobox.querySelectorAll('.up-research-info-row').forEach(row=>row.classList.add('kena-info-row'));
    }
    article.querySelector('.up-research-lead')?.classList.add('kena-lead');
    article.querySelector('.up-research-method-note')?.remove();

    const oldToc=article.querySelector('details.up-research-toc');
    if(oldToc){
      const nav=document.createElement('nav');
      nav.className='kena-toc up-research-toc';nav.setAttribute('aria-label','Contents');
      const title=document.createElement('div');title.className='kena-toc-title';title.textContent='Contents';nav.append(title);
      const ol=oldToc.querySelector(':scope > ol');if(ol)nav.append(ol);
      oldToc.replaceWith(nav);
    }

    const oldSections=[...article.querySelectorAll('details.up-research-section')];
    oldSections.forEach((old,i)=>{
      const section=document.createElement('section');
      section.id=old.id;section.className='kena-section purana-full-section mahapurana-collapse-section up-research-section';
      if(i===EXACT_UPANISHAD_TEMPLATE.length-1||old.classList.contains('up-research-references'))section.classList.add('universal-references','up-research-references');
      const h2=document.createElement('h2');h2.setAttribute('role','button');h2.setAttribute('tabindex','0');h2.setAttribute('aria-expanded','false');h2.textContent=EXACT_UPANISHAD_TEMPLATE[i]||old.querySelector('summary span')?.textContent||'Section';
      const body=document.createElement('div');body.className='mahapurana-collapse-body';body.hidden=true;
      const oldBody=old.querySelector(':scope > .up-research-section-body');
      if(oldBody)while(oldBody.firstChild)body.append(oldBody.firstChild);
      section.append(h2,body);old.replaceWith(section);
    });

    reader.dataset.mahapuranaTemplate='1';
    enforceExactUpanishadTemplate(reader);
  }

  function syncReaders(){
    document.querySelectorAll('.kena-article-reader:not(.up-research-reader)').forEach(styleKena);
    const research=[...document.querySelectorAll('.up-research-reader')];
    research.forEach(applyMahapuranaTemplate);
    if(!research.length)document.documentElement.classList.remove('kena-article-open');
  }

  const obs=new MutationObserver(syncReaders);
  obs.observe(document.body,{childList:true,subtree:true});
  syncReaders();

  window.addEventListener('click',e=>{
    const button=e.target.closest?.('#scripture-browser .shastra-name[data-kind="Upaniṣad"]');
    if(!button)return;
    const open=window.openScriptureEncyclopedia;
    if(typeof open!=='function')return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open(button);
  },true);

  document.addEventListener('click',e=>{
    const tocLink=e.target.closest?.('.up-research-reader.mahapurana-wiki-reader .kena-toc a[data-up-open]');
    if(tocLink){
      e.preventDefault();e.stopImmediatePropagation();
      const section=document.getElementById(tocLink.dataset.upOpen||'');
      if(section?.classList.contains('mahapurana-collapse-section'))setPuranaSectionOpen(section,true);
      const anchor=document.getElementById((tocLink.getAttribute('href')||'').replace(/^#/,''))||section;
      anchor?.scrollIntoView({behavior:'smooth',block:'start'});return;
    }
    const h2=e.target.closest?.('.up-research-reader.mahapurana-wiki-reader .mahapurana-collapse-section > h2');
    if(h2){e.preventDefault();const section=h2.parentElement;setPuranaSectionOpen(section,!section.classList.contains('is-open'));return;}

    const a=e.target.closest?.('.kena-universal-reader .kena-cite a');if(!a)return;
    const m=(a.getAttribute('href')||'').match(/#kena-ref-(\d+)/);if(!m)return;
    e.preventDefault();e.stopImmediatePropagation();
    const n=Number(m[1]);const li=document.getElementById(`kena-ref-${n}`);if(!li)return;
    document.querySelector('.kena-universal-source-card')?.remove();
    const card=document.createElement('aside');card.className='itihasa-source-card kena-universal-source-card';
    const link=li.querySelector('a[href]');const copy=li.cloneNode(true);copy.querySelectorAll('a').forEach(x=>x.remove());
    card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><p>${copy.innerHTML}</p>${link?`<a href="${link.href}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;
    document.body.append(card);card.querySelector('.itihasa-source-close')?.addEventListener('click',()=>card.remove());
  },true);

  document.addEventListener('keydown',e=>{
    const h2=e.target.closest?.('.up-research-reader.mahapurana-wiki-reader .mahapurana-collapse-section > h2');
    if(!h2||(e.key!=='Enter'&&e.key!==' '))return;
    e.preventDefault();const section=h2.parentElement;setPuranaSectionOpen(section,!section.classList.contains('is-open'));
  },true);

  if(!document.getElementById('kena-universal-v11-style')){
    const s=document.createElement('style');s.id='kena-universal-v11-style';s.textContent=`
      .kena-universal-reader{max-width:1160px!important;background:#f7f4ee!important}
      .kena-universal-reader .kena-article-head{background:#fbfaf7!important;border-bottom:1px solid rgba(74,66,56,.16)!important;padding-bottom:17px!important}
      .kena-universal-reader .kena-article-head h1{margin:0 0 2px!important;color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:40px!important;font-weight:400!important;line-height:1.08!important}
      .kena-universal-dev{color:#746b61;font-family:'Noto Serif Devanagari','Nirmala UI',serif;font-size:17px;line-height:1.3;margin:1px 0 4px}
      .kena-universal-reader .kena-article-scroll{background:#fbfaf7!important}.kena-universal-reader .kena-article{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important}
      .kena-universal-reader .kena-article p,.kena-universal-reader .kena-article li,.kena-universal-reader .kena-article td,.kena-universal-reader .kena-article th{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:16.1px!important;line-height:1.66!important}
      .kena-universal-reader .kena-lead p{font-size:16.5px!important;line-height:1.68!important}.kena-universal-reader .kena-section h2{margin:30px 0 15px!important;padding:0 0 6px!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:28px!important;font-weight:400!important;line-height:1.18!important;border-bottom:1px solid rgba(0,120,122,.32)!important}.kena-universal-reader .kena-section h3{color:#4a433b!important;font-family:Vollkorn,Georgia,serif!important;font-size:21px!important;font-weight:500!important}
      .kena-universal-reader a,.kena-universal-reader .kena-cite a{color:#5b3ec4!important}.kena-universal-reader .kena-infobox{background:#f4f1eb!important;color:#3c362e!important;border-color:rgba(92,82,70,.30)!important;font-family:Merriweather,Georgia,serif!important}.kena-universal-reader .kena-infobox-title{background:rgba(0,111,113,.075)!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:22px!important}.kena-universal-reader .kena-info-row,.kena-universal-reader .kena-info-row b,.kena-universal-reader .kena-info-row span{font-family:Merriweather,Georgia,serif!important;color:#3c362e!important}
      .kena-universal-reader .kena-toc{background:#f5f1ea!important;border-color:rgba(92,82,70,.24)!important}.kena-universal-reader .kena-toc-title{color:#006f71!important;font-family:Vollkorn,Georgia,serif!important}.kena-universal-source-card{font-family:Merriweather,Georgia,serif!important;color:#3c362e!important}.kena-universal-source-card a{color:#5b3ec4!important}
      @media(max-width:760px){.kena-universal-reader .kena-infobox{width:100%!important;float:none!important;margin:0 0 18px!important}.kena-universal-reader .kena-article-head h1{font-size:34px!important}.kena-universal-reader .kena-article p,.kena-universal-reader .kena-article li{font-size:15.8px!important}.kena-universal-reader .kena-section h2{font-size:26px!important}}
    `;document.head.append(s);
  }
})();