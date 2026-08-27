/* Preserve rich [paragraph, citation-list] principal-Upaniṣad data in the 108 research layer. */
(() => {
  const OUT=window.UPANISHAD_RESEARCH_108||{};
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const norm=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const pairText=v=>Array.isArray(v)?(typeof v[0]==='string'?v[0]:''):typeof v==='string'?v:(v?.text||v?.claim||v?.summary||v?.full||v?.short||v?.description||v?.note||v?.title||v?.t||v?.d||'');
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const add=(target,values)=>{
    if(!Array.isArray(target))return;
    const seen=new Set(target.map(norm));
    values.flatMap(v=>Array.isArray(v)&&typeof v[0]!=='string'?v:[v]).map(pairText).map(v=>String(v||'').trim()).filter(Boolean).forEach(v=>{const k=norm(v);if(k&&!seen.has(k)){seen.add(k);target.push(v);}});
  };
  const sectionPairs=s=>[
    ...arr(s?.ps),...arr(s?.paragraphs),...arr(s?.bullets),s?.summary,s?.text,s?.note,
    ...arr(s?.subs||s?.books).flatMap(sub=>[...arr(sub?.ps),...arr(sub?.paragraphs),sub?.summary,sub?.text,sub?.note])
  ];
  Object.entries(OUT).forEach(([name,research])=>{
    const rich=R[name];if(!rich||!research?.sections)return;
    const lead=arr(rich.lead).map(pairText).filter(Boolean);
    if(lead.length&&!rich.overview)rich.overview=lead.join(' ');
    add(research.sections.contents,lead);
    arr(rich.sections||rich.articleSections).forEach(sec=>{
      if(!sec||typeof sec!=='object')return;
      const title=String(sec.title||sec.t||'');
      const paragraphs=sectionPairs(sec);
      if(/date|chronolog|textual setting|identity|formation|history/i.test(title))add(research.sections.date,paragraphs);
      if(/manuscript|recension|edition|transmission|textual history|variant|critical/i.test(title))add(research.sections.critical,paragraphs);
      if(/commentar|reception|influence|legacy|scholar/i.test(title))add(research.sections.reception,paragraphs);
      if(/ritual|dharma|social|yoga|renunc|practice|conduct|initiation|mantra/i.test(title))add(research.sections.social,paragraphs);
      if(/theolog|philosoph|doctrine|brahman|ātman|atman|conscious|self|prāṇa|prana|liberation|bhakti/i.test(title))add(research.sections.theology,paragraphs);
      if(/structure|division|chapter|book|section|khaṇḍa|khanda|valli|prapath/i.test(title))add(research.sections.structure,[title]);
      if(!/date|chronolog|manuscript|recension|edition|transmission|commentar|reception|influence|legacy|scholar/i.test(title))add(research.sections.contents,[title,...paragraphs]);
    });
    add(research.sections.theology,[rich.famous,rich.characteristic,rich.profile,rich.philosophy,rich.theology]);
    if(research.audit){
      Object.assign(research.audit,{
        date:research.sections.date.length,structure:research.sections.structure.length,contents:research.sections.contents.length,theology:research.sections.theology.length,
        critical:research.sections.critical.length,reception:research.sections.reception.length,social:research.sections.social.length,further:research.sections.further.length,references:(research.references||[]).length
      });
    }
  });
  if(window.UPANISHAD_RESEARCH_108_AUDIT){
    window.UPANISHAD_RESEARCH_108_AUDIT.failures=Object.values(OUT).filter(x=>x.audit&&(x.audit.date<3||x.audit.structure<3||x.audit.contents<4||x.audit.theology<3||x.audit.critical<3||x.audit.reception<3||x.audit.social<3)).map(x=>({name:x.name,audit:x.audit}));
    window.UPANISHAD_RESEARCH_108_AUDIT.richPrincipalPairs=true;
  }
})();