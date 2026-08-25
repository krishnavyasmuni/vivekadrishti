(() => {
  const previousOpen=window.openScriptureEncyclopedia;
  if(typeof previousOpen!=='function')return;

  const rankTitle=t=>{
    const s=String(t||'');
    if(/wikipedia/i.test(s))return 0;
    if(/grokipedia/i.test(s))return 1;
    if(/hindupedia/i.test(s))return 2;
    if(/hazra/i.test(s))return 3;
    return 10;
  };

  function refs(article){
    return [...article.querySelectorAll('#universal-references li')].map((li,n)=>({n:n+1,text:li.textContent.trim(),rank:rankTitle(li.textContent)}));
  }
  function uniq(xs){return [...new Set(xs)];}
  function ordered(list,filter){return list.filter(filter).sort((a,b)=>a.rank-b.rank||a.n-b.n).map(x=>x.n);}
  function makeCite(n){const sup=document.createElement('sup');sup.className='universal-cite';const b=document.createElement('button');b.type='button';b.dataset.universalNote=String(n);b.setAttribute('aria-label',`Source ${n}`);b.textContent=String(n);sup.append(b);return sup;}

  function choose(list,section,ptext){
    const preferred=ordered(list,x=>x.rank<10);
    const primary=ordered(list,x=>/sanskrit|critical edition|edition|translation|text\b|upani[sṣ]ad|sm[rṛ]ti|pur[aā]n|veda|br[aā]hma[nṇ]a|dharmas[uū]tra|sa[mṃ]hit[aā]/i.test(x.text) && x.rank>=10);
    const academic=ordered(list,x=>x.rank>=10 && !primary.includes(x.n));
    const catalogue=ordered(list,x=>/muktik|y[aā]j[nñ]avalkya|par[aā][sś]ara|padma|k[uū]rma|dev[iī] bh[aā]gavata|bh[aā]gavata 12\.7|catalog|colophon|list/i.test(x.text));
    let pool=[];
    if(/catalogue|witness|listed as|muktika|traditional list/i.test(ptext)) pool=[...catalogue,...preferred,...academic,...primary];
    else if(/contents|structure|skandha|kanda|parva|chapter/i.test(section)) pool=[...preferred,...primary,...academic];
    else if(/date|composition|history|manuscript|transmission|recension/i.test(section)) pool=[...preferred,...academic,...primary];
    else pool=[...preferred,...primary,...academic];
    pool=uniq(pool);
    return pool.slice(0,Math.min(2,pool.length));
  }

  function apply(){
    const article=document.querySelector('.universal-wiki-article');
    if(!article||article.dataset.citationsV4==='1')return;
    article.dataset.citationsV4='1';const list=refs(article);if(!list.length)return;
    article.querySelectorAll('.kena-section p,.kena-lead p').forEach(p=>{
      const section=p.closest('.kena-section');const sectionName=section?.querySelector(':scope > h2')?.textContent||'lead';
      const text=p.textContent.trim();const chosen=choose(list,sectionName,text);if(!chosen.length)return;
      p.querySelectorAll(':scope > .universal-cite').forEach(x=>x.remove());
      chosen.forEach(n=>p.append(makeCite(n)));
    });
  }

  window.openScriptureEncyclopedia=function(button){const result=previousOpen(button);if(result)apply();return result;};
})();