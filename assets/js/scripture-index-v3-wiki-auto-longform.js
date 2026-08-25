(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||'');
  const uniq=xs=>[...new Set(xs.map(plain).filter(Boolean))];

  function firstConcrete(e){
    return uniq([...arr(e.chapterMap),...arr(e.contents),...arr(e.keyContents),...arr(e.namedFeatures)]).slice(0,4);
  }
  function makeLead(e){
    if(arr(e.leadParagraphs).length) return;
    const lead=[];
    if(e.overview||e.summary) lead.push(e.overview||e.summary);
    const concrete=firstConcrete(e);
    if(concrete.length){lead.push(`In concrete terms, the surviving material includes ${concrete.join('; ')}.`);}
    if(e.status) lead.push(`Textually, an important caution is that ${e.status.charAt(0).toLowerCase()}${e.status.slice(1)}`);
    if(lead.length) e.leadParagraphs=lead;
  }
  function makeSections(e){
    if(arr(e.articleSections).length) return;
    const sections=[];
    const structureText=[];
    if(e.structure) structureText.push(e.structure);
    const map=uniq([...arr(e.chapterMap),...arr(e.contents),...arr(e.keyContents)]);
    const features=uniq([...arr(e.namedFeatures),...arr(e.primaryEvidence),...arr(e.primaryPassages)]);
    if(structureText.length||map.length||features.length){
      sections.push({title:'Structure and contents',paragraphs:structureText,bullets:[...map,...features]});
    }

    const hist=[];
    if(e.period) hist.push(`Date: ${e.period}`);
    if(e.milieu) hist.push(`Historical setting: ${e.milieu}`);
    if(e.history) hist.push(e.history);
    if(e.datingBasis) hist.push(`The dating is argued from the following evidence: ${e.datingBasis}`);
    if(hist.length) sections.push({title:'Textual history and date',paragraphs:hist});

    const transmission=[];
    if(e.manuscripts) transmission.push(e.manuscripts);
    if(e.status) transmission.push(e.status);
    const deps=uniq(arr(e.dependencies));
    if(transmission.length||deps.length) sections.push({title:'Text and transmission',paragraphs:transmission,bullets:deps});

    const religion=[];
    if(e.profile) religion.push(e.profile);
    if(e.ritualHistory) religion.push(e.ritualHistory);
    const themes=uniq(arr(e.themes));
    if(religion.length||themes.length) sections.push({title:'Ideas, religion and practice',paragraphs:religion,bullets:themes});

    const rec=[];
    if(e.reception) rec.push(e.reception);
    if(e.significance) rec.push(e.significance);
    if(e.hazraNotes) rec.push(e.hazraNotes);
    const debates=uniq([...arr(e.scholarlyPositions),...arr(e.scholarlyDebates)]);
    if(rec.length||debates.length) sections.push({title:'Reception and scholarship',paragraphs:rec,bullets:debates});
    if(sections.length) e.articleSections=sections;
  }

  Object.keys(D).forEach(k=>{
    const e=D[k];
    if(!e||typeof e!=='object') return;
    makeLead(e);
    makeSections(e);
  });
  window.SCRIPTURE_AUTO_LONGFORM_READY=true;
})();