(() => {
  const root=document.getElementById('scripture-browser');
  const DATA=window.SCRIPTURE_PRINCIPAL_RICH||{};
  if(!root||!Object.keys(DATA).length)return;

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let shade=null,reader=null,current=null;

  const close=()=>{
    shade?.remove();
    reader?.remove();
    document.querySelector('.principal-rich-source-card')?.remove();
    shade=reader=current=null;
    document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b=>{
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed','false');
    });
  };

  const cite=nums=>(nums||[]).map(n=>`<sup class="kena-cite principal-cite"><button type="button" data-pr-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const p=x=>{
    const text=Array.isArray(x)?x[0]:x;
    const refs=Array.isArray(x)?x[1]:[];
    return `<p>${esc(text)}${cite(refs)}</p>`;
  };

  const section=(s,idx)=>{
    let body=(s.ps||[]).map(p).join('');
    (s.subs||[]).forEach(sub=>{
      body+=`<h3>${esc(sub.h)}</h3>${(sub.ps||[]).map(p).join('')}`;
    });
    return `<section class="kena-section ch-section" id="pr-sec-${idx}"><h2>${esc(s.t)}</h2>${body}</section>`;
  };

  const infobox=d=>{
    const rows=[
      ['Date',d.date],
      ['Type',d.type],
      ['Veda',d.veda],
      ['School',d.school],
      ['Textual setting',d.setting],
      ['Structure',d.structure],
      ['Muktika',d.muktika],
      ['Major commentators',d.commentators],
      ['Famous teaching',d.famous]
    ].filter(x=>x[1]);

    return `<aside class="kena-infobox ch-infobox principal-rich-infobox">
      <div class="kena-infobox-title">${esc(d.title)}</div>
      ${d.deva?`<div class="ch-dev principal-rich-dev">${esc(d.deva)}</div>`:''}
      ${d.image?`<figure class="wiki-infobox-image principal-rich-main-image">
        <a href="${esc(d.image.href)}" target="_blank" rel="noopener"><img src="${esc(d.image.src)}" loading="lazy" alt="${esc(d.title)} manuscript"></a>
        <figcaption>${esc(d.image.cap||'')}</figcaption>
      </figure>`:''}
      ${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}
    </aside>`;
  };

  const refs=d=>`<section class="kena-section kena-references principal-rich-references" id="pr-references">
    <h2>References</h2>
    <ol>${(d.refs||[]).map((r,i)=>`<li id="pr-ref-${i+1}"><b>${i+1}.</b> ${esc(r.t)}${r.d?` — ${esc(r.d)}`:''}${r.u?` <a href="${esc(r.u)}" target="_blank" rel="noopener">online</a>`:''}</li>`).join('')}</ol>
  </section>`;

  const showSource=n=>{
    const s=current?.refs?.[n-1];
    if(!s)return;
    document.querySelector('.principal-rich-source-card')?.remove();
    const card=document.createElement('aside');
    card.className='itihasa-source-card principal-rich-source-card';
    card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button>
      <div class="itihasa-source-num">Source ${n}</div>
      <strong>${esc(s.t)}</strong>
      ${s.d?`<p>${esc(s.d)}</p>`:''}
      ${s.u?`<a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;
    document.body.append(card);
    card.querySelector('.itihasa-source-close')?.addEventListener('click',()=>card.remove());
  };

  function open(button,d){
    close();
    current=d;
    button.classList.add('is-active');
    button.setAttribute('aria-pressed','true');

    const toc=[
      ...(d.sections||[]).map((s,i)=>`<li><a href="#pr-sec-${i}">${esc(s.t)}</a></li>`),
      `<li><a href="#pr-references">References</a></li>`
    ].join('');

    shade=document.createElement('div');
    shade.className='kena-article-backdrop principal-rich-backdrop';

    reader=document.createElement('section');
    reader.className='kena-article-reader principal-rich-reader';
    reader.setAttribute('role','dialog');
    reader.setAttribute('aria-modal','true');
    reader.setAttribute('aria-label',`${d.title} encyclopedia article`);

    reader.innerHTML=`<header class="kena-article-head">
        <div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(d.title)}</h1>${d.deva?`<div class="principal-rich-head-dev">${esc(d.deva)}</div>`:''}</div>
        <button class="kena-article-close" type="button" aria-label="Close">×</button>
      </header>
      <div class="kena-article-scroll">
        <article class="kena-article principal-rich-article">
          ${infobox(d)}
          <div class="kena-lead ch-lead principal-rich-lead">${(d.lead||[]).map(p).join('')}</div>
          <nav class="kena-toc kena-wiki-toc principal-rich-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc}</ol></nav>
          ${(d.sections||[]).map(section).join('')}
          ${refs(d)}
        </article>
      </div>`;

    document.body.append(shade,reader);
    document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.shastra-name');
    if(!b)return;
    const name=b.dataset.name||b.querySelector('span')?.textContent?.trim()||b.textContent.trim();
    const d=DATA[name];
    if(!d)return; // Kena and Chandogya are deliberately untouched.
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    open(b,d);
  },true);

  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.principal-cite button');
    if(!b)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    showSource(Number(b.dataset.prNote));
  },true);

  document.addEventListener('click',e=>{
    if(e.target===shade||e.target.closest?.('.principal-rich-reader .kena-article-close'))close();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  // Only the pieces Chandogya defines locally are repeated here. Everything else
  // deliberately inherits the exact Kena/Chandogya article CSS already on the page.
  if(!document.getElementById('principal-rich-v14-style')){
    const s=document.createElement('style');
    s.id='principal-rich-v14-style';
    s.textContent=`
      .principal-rich-reader{max-width:none!important;background:#fff!important}
      .principal-rich-reader .kena-article-scroll{background:#fff!important}
      .principal-rich-article{max-width:1120px!important;margin:0 auto!important;color:#202122!important;font-family:Merriweather,Georgia,serif!important;font-size:16px!important;line-height:1.72!important}
      .principal-rich-head-dev{margin:4px 0 0;color:#54595d;font-family:'Noto Serif Devanagari','Nirmala UI',Georgia,serif;font-size:16px;line-height:1.35}
      .principal-rich-dev{padding:5px 10px 8px;text-align:center;color:#54595d;font-family:'Noto Serif Devanagari','Nirmala UI',Georgia,serif;font-size:16px;line-height:1.35}
      .principal-rich-main-image{margin:0!important;padding:0!important;background:#fff!important;border-top:1px solid #c8ccd1;border-bottom:1px solid #c8ccd1}
      .principal-rich-main-image a{display:block}
      .principal-rich-main-image img{display:block;width:100%!important;height:auto!important;max-height:300px!important;object-fit:contain!important;background:#fff!important}
      .principal-rich-main-image figcaption{padding:7px 6px!important;color:#54595d!important;background:#fff!important;font:11.5px/1.45 Arial,sans-serif!important}
      .principal-rich-toc{margin-top:20px!important;margin-bottom:31px!important}
      .principal-cite button{margin:0 0 0 2px;padding:0;border:0;background:transparent;color:#36c;font:inherit;cursor:pointer;vertical-align:baseline}
      .principal-rich-references a,.principal-rich-article a{color:#36c!important}
      .principal-rich-source-card{font-family:Merriweather,Georgia,serif;color:#202122}
      .principal-rich-source-card a{color:#36c}
      @media(max-width:850px){
        .principal-rich-main-image img{max-height:none!important}
        .principal-rich-head-dev{font-size:15px}
      }
    `;
    document.head.append(s);
  }

  window.SCRIPTURE_PRINCIPAL_RICH_V14=true;
})();
