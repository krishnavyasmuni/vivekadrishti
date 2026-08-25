(() => {
  const previousOpen=window.openScriptureEncyclopedia;
  if(typeof previousOpen!=='function')return;
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  function info(button){const d=button.dataset;return{name:d.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim(),kind:d.kind||''};}
  function key(i){if(i.kind==='Upaniṣad')return`Upaniṣad:${i.name}`;if(i.kind==='Smṛti')return`Smṛti:${i.name}`;if(i.kind==='Vedāṅga')return`Vedāṅga:${i.name}`;if(i.kind==='Veda'||['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind))return`Vedic:${i.name}`;if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind))return`Purāṇa:${i.name}`;return`${i.kind}:${i.name}`;}
  window.openScriptureEncyclopedia=function(button){
    const i=info(button),k=key(i),e=Object.assign({},D[i.name]||{},D[k]||{});
    if(Array.isArray(e.articleSections)&&e.articleSections.length>=3){
      if(D[i.name])D[i.name].__depthV6=true;
      if(D[k])D[k].__depthV6=true;
    }
    return previousOpen(button);
  };
})();