(()=>{
  const root=document.getElementById('mahapurana-standalone');
  if(!root)return;
  const name=root.dataset.purana||'';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||x?.summary||x?.title||x?.citation||x?.name||x?.description||x?.note||'');
  const slug=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Failed to load '+src));document.head.appendChild(s)});
  const wanted=src=>{
    if(src.includes('/assets/js/puranas/current/')) return !/(?:reader|polish|ui|images)\.js(?:\?|$)/.test(src);
    return ['scripture-index-v3-details-puranas','scripture-index-v3-deep-purana-history','scripture-index-v3-deep-final-fixes','scripture-index-v3-details-overrides','scripture-index-v3-scholarly-puranas','scripture-index-v3-wiki-rich-puranas-major','scripture-index-v3-deep-purana-v10','scripture-index-v3-deep-purana-specials','scripture-index-v3-research-puranas-hazra','scripture-index-v3-research-purana-extra'].some(x=>src.includes(x));
  };
  const books=xs=>{const a=arr(xs);return a.length?'<div class="mahapurana-book-list">'+a.map((b,i)=>typeof b==='string'?'<div class="mahapurana-book"><b>'+(i+1)+'</b><div>'+esc(b)+'</div></div>':'<div class="mahapurana-book"><b>'+esc(b.number??i+1)+'</b><div>'+(b.title||b.name?'<strong>'+esc(b.title||b.name)+'</strong>':'')+(plain(b.summary||b.text)?'<p>'+esc(plain(b.summary||b.text))+'</p>':'')+'</div></div>').join('')+'</div>':''};
  const renderSection=(s,i)=>{let body='';arr(s.paragraphs||s.text).forEach(p=>body+='<p>'+esc(plain(p))+'</p>');if(s.books)body+=books(s.books);if(arr(s.bullets).length)body+='<ul>'+arr(s.bullets).map(x=>'<li>'+esc(plain(x))+'</li>').join('')+'</ul>';if(s.note)body+='<aside class="research-note">'+esc(plain(s.note))+'</aside>';arr(s.subsections).forEach(sub=>{body+='<h3>'+esc(sub.title||'')+'</h3>';arr(sub.paragraphs||sub.text).forEach(p=>body+='<p>'+esc(plain(p))+'</p>');if(sub.books)body+=books(sub.books);if(arr(sub.bullets).length)body+='<ul>'+arr(sub.bullets).map(x=>'<li>'+esc(plain(x))+'</li>').join('')+'</ul>'});const id=slug(s.title)||('section-'+(i+1));return{id,title:s.title||('Section '+(i+1)),html:'<section class="mahapurana-section" id="'+id+'"><h2>'+esc(s.title||('Section '+(i+1)))+'</h2>'+body+'</section>'}};
  const sourceObj=s=>{
    if(!s)return null;
    if(typeof s==='string')return{title:s,detail:'',url:''};
    return{
      title:s.title||s.citation||s.name||plain(s)||'Source',
      detail:s.detail||s.description||s.note||'',
      url:/^https?:\/\//i.test(String(s.url||s.href||''))?String(s.url||s.href):''
    };
  };
  const sourceKey=s=>String((s?.title||'')+' '+(s?.url||'')).toLowerCase().replace(/\s+/g,' ').trim();
  const collectRefs=e=>{
    const refs=[],seen=new Set();
    [...arr(e.sources),...arr(e.refs),...arr(e.primarySources),...arr(e.bibliography)].map(sourceObj).filter(Boolean).forEach(s=>{const k=sourceKey(s);if(!k||seen.has(k))return;seen.add(k);refs.push(s)});
    return refs;
  };
  const renderRef=s=>{
    const title=s.url?'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+'</a>':esc(s.title);
    return '<li>'+title+(s.detail?' — '+esc(s.detail):'')+'</li>';
  };
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
      const refs=collectRefs(e);
      const info=[['Sanskrit',e.sanskritTitle],['Traditional attribution',e.traditionalAuthor],['Language',e.language],['Date / textual formation',e.period],['Structure',e.booksCount||e.structure],['Extent',e.extent],['Verse count',e.verseCount]].filter(x=>x[1]);
      root.innerHTML=(info.length?'<aside class="mahapurana-infobox"><div class="infobox-title">'+esc(name)+'</div>'+info.map(([k,v])=>'<div class="info-row"><b>'+esc(k)+'</b><span>'+esc(plain(v))+'</span></div>').join('')+'</aside>':'')+'<div class="article-lead">'+arr(e.leadParagraphs).map(p=>'<p>'+esc(plain(p))+'</p>').join('')+'</div><nav class="article-toc" aria-label="Contents"><strong>Contents</strong><ol>'+secs.map(s=>'<li><a href="#'+s.id+'">'+esc(s.title)+'</a></li>').join('')+'<li><a href="#references">References</a></li></ol></nav>'+secs.map(s=>s.html).join('')+'<section class="mahapurana-section references" id="references"><h2>References</h2><ol>'+refs.map(renderRef).join('')+'</ol></section>';
      root.classList.add('is-loaded');
    }catch(err){console.error(err);root.innerHTML='<p class="article-error">The full article could not be loaded. <a href="/vivekadrishti/articles/scripture/">Return to the Scripture Index</a>.</p>'}
  }
  run();
})();