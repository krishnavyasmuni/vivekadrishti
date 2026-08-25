(() => {
  const previousOpen=window.openScriptureEncyclopedia;
  if(typeof previousOpen!=='function')return;
  const K=new Set(['Mahāpurāṇa','Upapurāṇa','Both']);
  const FALLBACK='https://commons.wikimedia.org/wiki/Special:Redirect/file/A_monk_meditates_under_a_tree.jpg';
  const ascii=s=>String(s||'').replace(/Ś/g,'Sh').replace(/ś/g,'sh').replace(/Ṣ/g,'Sh').replace(/ṣ/g,'sh').replace(/Ṛ/g,'Ri').replace(/ṛ/g,'ri').replace(/Ṅ/g,'Ng').replace(/ṅ/g,'ng').replace(/Ñ/g,'Ny').replace(/ñ/g,'ny').replace(/Ṭ/g,'T').replace(/ṭ/g,'t').replace(/Ḍ/g,'D').replace(/ḍ/g,'d').replace(/Ṇ/g,'N').replace(/ṇ/g,'n').replace(/Ā/g,'A').replace(/ā/g,'a').replace(/Ī/g,'I').replace(/ī/g,'i').replace(/Ū/g,'U').replace(/ū/g,'u').replace(/ṃ|ṁ/g,'m').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/Purāṇa/g,'Purana');
  async function apply(name){
    const fig=document.querySelector('.purana-full-article .purana-wiki-image');if(!fig)return;
    const img=fig.querySelector('img');const cap=fig.querySelector('figcaption');if(!img)return;
    const q=ascii(name).replace(/\s+/g,' ').trim();
    try{
      const api=`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${encodeURIComponent(q)}&prop=pageimages|info&inprop=url&pithumbsize=800`;
      const r=await fetch(api,{mode:'cors'});if(!r.ok)throw new Error('wiki');const j=await r.json();
      const pages=Object.values(j?.query?.pages||{}).sort((a,b)=>(a.index||999)-(b.index||999));
      const p=pages.find(x=>x.thumbnail?.source&&/purana/i.test(x.title||''))||pages.find(x=>x.thumbnail?.source);
      if(p?.thumbnail?.source){img.src=p.thumbnail.source;if(cap){cap.textContent='';cap.remove();}return;}
    }catch(_){ }
    img.src=FALLBACK;if(cap)cap.remove();
    img.onerror=()=>{img.onerror=null;img.src=FALLBACK;};
  }
  window.openScriptureEncyclopedia=function(button){const result=previousOpen(button);if(K.has(button?.dataset?.kind||'')){const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';queueMicrotask(()=>apply(name));setTimeout(()=>apply(name),120);}return result;};
})();
