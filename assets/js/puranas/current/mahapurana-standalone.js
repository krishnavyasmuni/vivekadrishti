(()=>{
  const root=document.getElementById('mahapurana-standalone');
  if(!root)return;
  const name=root.dataset.purana||'';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||x?.summary||'');
  const slug=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Failed to load '+src));document.head.appendChild(s)});
  const wanted=src=>{
    if(src.includes('/assets/js/puranas/current/')) return !/(?:reader|polish|ui|images)\.js(?:\?|$)/.test(src);
    return ['scripture-index-v3-details-puranas','scripture-index-v3-deep-purana-history','scripture-index-v3-deep-final-fixes','scripture-index-v3-details-overrides','scripture-index-v3-scholarly-puranas','scripture-index-v3-wiki-rich-puranas-major','scripture-index-v3-deep-purana-v10','scripture-index-v3-deep-purana-specials','scripture-index-v3-research-puranas-hazra','scripture-index-v3-research-purana-extra'].some(x=>src.includes(x));
  };
  const books=xs=>{const a=arr(xs);return a.length?'<div class="mahapurana-book-list">'+a.map((b,i)=>typeof b==='string'?'<div class="mahapurana-book"><b>'+(i+1)+'</b><div>'+esc(b)+'</div></div>':'<div class="mahapurana-book"><b>'+esc(b.number??i+1)+'</b><div>'+(b.title||b.name?'<strong>'+esc(b.title||b.name)+'</strong>':'')+(plain(b.summary||b.text)?'<p>'+esc(plain(b.summary||b.text))+'</p>':'')+'</div></div>').join('')+'</div>':''};
  const renderSection=(s,i)=>{let body='';arr(s.paragraphs||s.text).forEach(p=>body+='<p>'+esc(plain(p))+'</p>');if(s.books)body+=books(s.books);if(arr(s.bullets).length)body+='<ul>'+arr(s.bullets).map(x=>'<li>'+esc(plain(x))+'</li>').join('')+'</ul>';if(s.note)body+='<aside class="research-note">'+esc(plain(s.note))+'</aside>';arr(s.subsections).forEach(sub=>{body+='<h3>'+esc(sub.title||'')+'</h3>';arr(sub.paragraphs||sub.text).forEach(p=>body+='<p>'+esc(plain(p))+'</p>');if(sub.books)body+=books(sub.books);if(arr(sub.bullets).length)body+='<ul>'+arr(sub.bullets).map(x=>'<li>'+esc(plain(x))+'</li>').join('')+'</ul>'});const id=slug(s.title)||('section-'+(i+1));return{id,title:s.title||('Section '+(i+1)),html:'<section class="mahapurana-section" id="'+id+'"><h2>'+esc(s.title||('Section '+(i+1)))+'</h2>'+body+'</section>'}};

  function setOpen(sec,open){
    const button=sec.querySelector(':scope > h2 .mahapurana-section-toggle');
    const body=sec.querySelector(':scope > .mahapurana-collapse-body');
    if(!button||!body)return;
    sec.classList.toggle('is-open',open);
    button.setAttribute('aria-expanded',open?'true':'false');
    body.hidden=!open;
  }

  function makeCollapsible(sec){
    const h2=sec.querySelector(':scope > h2');
    if(!h2||sec.classList.contains('mahapurana-collapse-section'))return;
    const title=h2.textContent.trim();
    const body=document.createElement('div');
    body.className='mahapurana-collapse-body';
    [...sec.childNodes].forEach(node=>{if(node!==h2)body.append(node)});
    const button=document.createElement('button');
    button.type='button';
    button.className='mahapurana-section-toggle';
    button.setAttribute('aria-expanded','false');
    button.innerHTML='<span>'+esc(title)+'</span><span class="mahapurana-section-chevron" aria-hidden="true">›</span>';
    h2.replaceChildren(button);
    sec.append(body);
    sec.classList.add('mahapurana-collapse-section');
    button.addEventListener('click',()=>setOpen(sec,!sec.classList.contains('is-open')));
    setOpen(sec,false);
  }

  function bindToc(){
    root.addEventListener('click',event=>{
      const link=event.target instanceof Element?event.target.closest('.article-toc a[href^="#"]'):null;
      if(!link)return;
      const id=decodeURIComponent((link.getAttribute('href')||'').slice(1));
      const target=document.getElementById(id);
      if(target&&root.contains(target)&&target.classList.contains('mahapurana-collapse-section'))setOpen(target,true);
    });
  }

  async function run(){
    try{
      const response=await fetch('/vivekadrishti/articles/scripture/',{cache:'no-cache'});
      if(!response.ok)throw new Error('Could not read Scripture Index loader manifest');
      const doc=new DOMParser().parseFromString(await response.text(),'text/html');
      const sources=[...doc.querySelectorAll('script[src]')].map(s=>s.getAttribute('src')).filter(Boolean).filter(wanted);
      const seen=new Set();
      for(const src of sources){if(seen.has(src))continue;seen.add(src);await load(src)}
      const D=window.SCRIPTURE_DETAIL_DATA||{};
      const e=Object.assign({},D[name]||{},D['Purāṇa:'+name]||{});
      if(!e.articleSections)throw new Error('No article data found for '+name);
      const secs=arr(e.articleSections).map(renderSection);
      const refs=[...new Set([...arr(e.sources),...arr(e.bibliography)].map(plain).filter(Boolean))];
      const info=[['Sanskrit',e.sanskritTitle],['Traditional attribution',e.traditionalAuthor],['Language',e.language],['Date / textual formation',e.period],['Structure',e.booksCount||e.structure],['Extent',e.extent],['Verse count',e.verseCount]].filter(x=>x[1]);
      root.innerHTML=(info.length?'<aside class="mahapurana-infobox"><div class="infobox-title">'+esc(name)+'</div>'+info.map(([k,v])=>'<div class="info-row"><b>'+esc(k)+'</b><span>'+esc(plain(v))+'</span></div>').join('')+'</aside>':'')+'<div class="article-lead">'+arr(e.leadParagraphs).map(p=>'<p>'+esc(plain(p))+'</p>').join('')+'</div><details class="article-toc" open><summary>Contents</summary><ol>'+secs.map(s=>'<li><a href="#'+s.id+'">'+esc(s.title)+'</a></li>').join('')+'<li><a href="#references">References</a></li></ol></details>'+secs.map(s=>s.html).join('')+'<section class="mahapurana-section references" id="references"><h2>References</h2><ol>'+refs.map(r=>'<li>'+esc(r)+'</li>').join('')+'</ol></section>';
      root.querySelectorAll(':scope > .mahapurana-section').forEach(makeCollapsible);
      bindToc();
      root.classList.add('is-loaded');
      if(location.hash){
        const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if(target&&root.contains(target)&&target.classList.contains('mahapurana-collapse-section')){
          setOpen(target,true);
          requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
        }
      }
    }catch(err){console.error(err);root.innerHTML='<p class="article-error">The full article could not be loaded. <a href="/vivekadrishti/articles/scripture/">Return to the Scripture Index</a>.</p>'}
  }
  run();
})();
