(() => {
  const root=document.getElementById('scripture-browser');
  const DATA=window.SCRIPTURE_PRINCIPAL_RICH||{};
  if(!root||!Object.keys(DATA).length)return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let shade=null,reader=null,current=null;
  const close=()=>{shade?.remove();reader?.remove();document.querySelector('.principal-rich-source-card')?.remove();shade=reader=current=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});};
  const cite=nums=>(nums||[]).map(n=>`<sup class="principal-cite"><button type="button" data-pr-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const p=x=>{const text=Array.isArray(x)?x[0]:x;const refs=Array.isArray(x)?x[1]:[];return `<p>${esc(text)}${cite(refs)}</p>`;};
  const section=(s,idx)=>{
    let body=(s.ps||[]).map(p).join('');
    (s.subs||[]).forEach(sub=>{body+=`<h3>${esc(sub.h)}</h3>${(sub.ps||[]).map(p).join('')}`;});
    return `<section class="kena-section principal-rich-section" id="pr-sec-${idx}"><h2>${esc(s.t)}</h2>${body}</section>`;
  };
  const infobox=d=>{
    const rows=[['Date',d.date],['Type',d.type],['Veda',d.veda],['School',d.school],['Textual setting',d.setting],['Structure',d.structure],['Muktika',d.muktika],['Major commentators',d.commentators],['Famous teaching',d.famous]].filter(x=>x[1]);
    return `<aside class="kena-infobox principal-rich-infobox"><div class="kena-infobox-title">${esc(d.title)}</div><div class="principal-rich-dev">${esc(d.deva||'')}</div>${d.image?`<figure class="wiki-infobox-image principal-rich-main-image"><a href="${esc(d.image.href)}" target="_blank" rel="noopener"><img src="${esc(d.image.src)}" loading="lazy" alt="${esc(d.title)} manuscript"></a><figcaption>${esc(d.image.cap||'')}</figcaption></figure>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  };
  const refs=d=>`<section class="kena-section kena-references principal-rich-references" id="pr-references"><h2>References</h2><ol>${(d.refs||[]).map((r,i)=>`<li id="pr-ref-${i+1}"><b>${i+1}.</b> ${esc(r.t)}${r.d?` — ${esc(r.d)}`:''}${r.u?` <a href="${esc(r.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;
  const showSource=n=>{const s=current?.refs?.[n-1];if(!s)return;document.querySelector('.principal-rich-source-card')?.remove();const card=document.createElement('aside');card.className='itihasa-source-card principal-rich-source-card';card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.t)}</strong>${s.d?`<p>${esc(s.d)}</p>`:''}${s.u?`<a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(card);card.querySelector('.itihasa-source-close')?.addEventListener('click',()=>card.remove());};
  function open(button,d){
    close();current=d;button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    const toc=[...(d.sections||[]).map((s,i)=>`<li><a href="#pr-sec-${i}">${esc(s.t)}</a></li>`),`<li><a href="#pr-references">References</a></li>`].join('');
    shade=document.createElement('div');shade.className='kena-article-backdrop principal-rich-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader principal-rich-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${d.title} encyclopedia article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(d.title)}</h1><div class="principal-rich-head-dev">${esc(d.deva||'')}</div></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article principal-rich-article">${infobox(d)}<div class="kena-lead principal-rich-lead">${(d.lead||[]).map(p).join('')}</div><nav class="kena-toc principal-rich-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>${(d.sections||[]).map(section).join('')}${refs(d)}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.shastra-name');if(!b)return;
    const name=b.dataset.name||b.querySelector('span')?.textContent?.trim()||b.textContent.trim();
    const d=DATA[name];if(!d)return; // Kena and Chandogya deliberately have no entry here.
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open(b,d);
  },true);
  document.addEventListener('click',e=>{const b=e.target.closest?.('.principal-cite button');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.prNote));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.principal-rich-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});
  if(!document.getElementById('principal-rich-v14-style')){
    const s=document.createElement('style');s.id='principal-rich-v14-style';s.textContent=`
      .principal-rich-reader{max-width:1160px!important;background:#f7f4ee!important}
      .principal-rich-reader .kena-article-head{background:#fbfaf7!important;border-bottom:1px solid rgba(74,66,56,.16)!important;padding-bottom:17px!important}
      .principal-rich-reader .kena-article-head h1{margin:0 0 2px!important;color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:40px!important;font-weight:400!important;line-height:1.08!important}
      .principal-rich-head-dev,.principal-rich-dev{color:#746b61;font-family:'Noto Serif Devanagari','Nirmala UI',serif;font-size:17px;line-height:1.35;margin:1px 0 5px}
      .principal-rich-reader .kena-article-scroll{background:#fbfaf7!important}
      .principal-rich-article{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;padding-bottom:32px!important}
      .principal-rich-article p,.principal-rich-article li,.principal-rich-article td,.principal-rich-article th{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:16.1px!important;line-height:1.68!important}
      .principal-rich-lead p{font-size:16.5px!important;line-height:1.7!important;margin:0 0 17px!important}
      .principal-rich-section{clear:both;margin-top:30px!important}
      .principal-rich-section h2,.principal-rich-references h2{margin:31px 0 15px!important;padding:0 0 6px!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:28px!important;font-weight:400!important;line-height:1.18!important;border-bottom:1px solid rgba(0,120,122,.32)!important}
      .principal-rich-section h3{margin:23px 0 9px!important;color:#4a433b!important;font-family:Vollkorn,Georgia,serif!important;font-size:21px!important;font-weight:500!important;line-height:1.24!important}
      .principal-rich-section p{margin:0 0 17px!important}
      .principal-rich-article a,.principal-rich-toc a,.principal-rich-source-card a{color:#5b3ec4!important;text-decoration:none!important}.principal-rich-article a:hover{text-decoration:underline!important}
      .principal-rich-infobox{width:330px!important;float:right!important;margin:0 0 22px 28px!important;background:#f4f1eb!important;color:#3c362e!important;border:1px solid rgba(92,82,70,.30)!important;font-family:Merriweather,Georgia,serif!important}
      .principal-rich-infobox .kena-infobox-title{background:rgba(0,111,113,.075)!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:22px!important;font-weight:500!important;padding:10px!important;text-align:center!important}
      .principal-rich-infobox .principal-rich-dev{text-align:center;padding:0 8px 7px!important}
      .principal-rich-infobox .kena-info-row,.principal-rich-infobox .kena-info-row b,.principal-rich-infobox .kena-info-row span{font-family:Merriweather,Georgia,serif!important;color:#3c362e!important;font-size:12.5px!important;line-height:1.42!important}
      .principal-rich-main-image{margin:0!important;padding:3px!important;background:#fbfaf7!important;border-top:1px solid rgba(92,82,70,.20)!important;border-bottom:1px solid rgba(92,82,70,.20)!important}
      .principal-rich-main-image img{display:block;width:100%!important;height:auto!important;max-height:285px!important;object-fit:contain!important;background:#f7f2e9!important}
      .principal-rich-main-image figcaption{padding:6px 5px!important;color:#746b61!important;font:11.5px/1.42 Merriweather,Georgia,serif!important}
      .principal-rich-toc{display:inline-block;min-width:500px;max-width:620px;background:#f5f1ea!important;border:1px solid rgba(92,82,70,.24)!important;padding:16px 20px!important;margin:18px 0 10px!important}
      .principal-rich-toc .kena-toc-title{font-family:Vollkorn,Georgia,serif!important;color:#006f71!important;font-size:20px!important;margin-bottom:7px!important}
      .principal-rich-toc ol{margin:0 0 0 22px!important;padding:0!important}.principal-rich-toc li{margin:3px 0!important;font-size:14.6px!important;line-height:1.45!important}
      .principal-cite{vertical-align:super}.principal-cite button{border:0;background:transparent;color:#5b3ec4;padding:0 1px;font:600 10px/1 Merriweather,Georgia,serif;cursor:pointer}
      .principal-rich-references{clear:both!important}.principal-rich-references li{font-size:14px!important;line-height:1.56!important;margin:0 0 10px!important}.principal-rich-source-card{font-family:Merriweather,Georgia,serif!important;color:#3c362e!important}
      @media(max-width:760px){.principal-rich-infobox{width:100%!important;float:none!important;margin:0 0 18px!important}.principal-rich-reader .kena-article-head h1{font-size:34px!important}.principal-rich-article p,.principal-rich-article li{font-size:15.8px!important}.principal-rich-section h2,.principal-rich-references h2{font-size:26px!important}.principal-rich-section h3{font-size:20px!important}.principal-rich-toc{display:block;min-width:0!important;width:100%!important;max-width:none!important}.principal-rich-main-image img{max-height:330px!important}}
    `;document.head.append(s);
  }
  window.SCRIPTURE_PRINCIPAL_RICH_V14=true;
})();