(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const roman=s=>String(s??'')
    .replace(/Ś/g,'Sh').replace(/ś/g,'sh').replace(/Ṣ/g,'Sh').replace(/ṣ/g,'sh')
    .replace(/Ṛ/g,'Ri').replace(/ṛ/g,'ri').replace(/Ṝ/g,'Ri').replace(/ṝ/g,'ri')
    .replace(/Ṅ/g,'Ng').replace(/ṅ/g,'ng').replace(/Ñ/g,'Ny').replace(/ñ/g,'ny')
    .replace(/Ṃ|Ṁ/g,'M').replace(/ṃ|ṁ/g,'m').replace(/Ḥ/g,'H').replace(/ḥ/g,'h')
    .replace(/Ṭ/g,'T').replace(/ṭ/g,'t').replace(/Ḍ/g,'D').replace(/ḍ/g,'d').replace(/Ṇ/g,'N').replace(/ṇ/g,'n')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');
  function apply(){
    root.querySelectorAll('.shastra-name > span,.shastra-title,.veda-family > h3,.veda-family > h3 .veda-family-name,.upanishad-group > h3,.purana-sect-group > h3,.guna-group > h3,.corpus-button,.shastra-tab').forEach(el=>{
      if(el.dataset.plainDisplay==='1')return;
      const text=el.textContent;
      const clean=roman(text);
      if(clean!==text)el.textContent=clean;
      el.dataset.plainDisplay='1';
    });
  }
  apply();
  new MutationObserver(apply).observe(root,{childList:true,subtree:true});
})();