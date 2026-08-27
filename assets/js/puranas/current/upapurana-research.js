/* Async loader for the complete compressed 39-title Upapurāṇa research corpus. */
(() => {
  if (window.UPAPURANA_READY) return;
  window.UPAPURANA_READY = (async () => {
    const base='/vivekadrishti/assets/data/upapuranas/';
    const parts=[];
    for(let i=0;i<14;i++){
      const r=await fetch(`${base}research-${String(i).padStart(2,'0')}.b64?build=20260827-upapurana39-v3`,{cache:'force-cache'});
      if(!r.ok) throw new Error(`Upapurāṇa data chunk ${i} failed: ${r.status}`);
      parts.push((await r.text()).trim());
    }
    const binary=atob(parts.join(''));
    const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
    if(typeof DecompressionStream!=='function') throw new Error('This browser does not support the compressed Upapurāṇa research corpus.');
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const payload=JSON.parse(await new Response(stream).text());
    window.UPAPURANA_RESEARCH=payload.research||{};
    window.UPAPURANA_SOURCES=payload.sources||{};
    window.UPAPURANA_AUDIT=payload.audit||{};
    window.UPAPURANA_BY_SLUG=Object.fromEntries(Object.values(window.UPAPURANA_RESEARCH).map(x=>[x.slug,x]));
    return window.UPAPURANA_RESEARCH;
  })();
})();
