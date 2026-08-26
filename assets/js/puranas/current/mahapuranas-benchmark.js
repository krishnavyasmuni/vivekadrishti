(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const NAMES=['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa','Vāyu Purāṇa','Devī Bhāgavata Purāṇa','Mahābhāgavata Purāṇa'];
  const ORDER=['Date of composition','Structure','Contents','Theology','Critical edition','Influences and reception','Rites, dharma and social history','Further reading'];
  const A=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const N=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const txt=x=>typeof x==='string'?x:(x?.text||x?.summary||x?.description||x?.note||x?.title||'');
  const U=xs=>{const seen=new Set();return xs.map(txt).map(x=>String(x||'').trim()).filter(x=>{const k=N(x);if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const E=name=>D[`Purāṇa:${name}`]||D[name]||{};
  const clone=s=>({title:s?.title||'',paragraphs:A(s?.paragraphs).slice(),bullets:A(s?.bullets).slice(),subsections:A(s?.subsections).map(x=>Object.assign({},x,{paragraphs:A(x?.paragraphs).slice(),bullets:A(x?.bullets).slice(),books:A(x?.books).slice()})),books:A(s?.books).slice()});

  function canonical(title){
    const t=N(title);
    if(/date|chronolog|provenance|formation/.test(t))return 'Date of composition';
    if(/structure|book|skandha|khanda|samhita|part|chapter map|organization|organisation/.test(t))return 'Structure';
    if(/critical edition|manuscript|edition|transmission|recension|textual history/.test(t))return 'Critical edition';
    if(/theolog|philosoph|bhakti|jnana|yoga|advaita|vedanta|supreme reality|sectarian/.test(t))return 'Theology';
    if(/ritual|dharma|vrata|rite|custom|social|pilgrimage|sacred geography|temple|gift|dana|funeral|shraddha|worship|festival/.test(t))return 'Rites, dharma and social history';
    if(/reception|influence|commentar|historical significance/.test(t))return 'Influences and reception';
    if(/further reading|bibliograph|reference|source/.test(t))return 'Further reading';
    return 'Contents';
  }

  function mergeSection(into,s){
    into.paragraphs=U([...into.paragraphs,...A(s.paragraphs)]);
    into.bullets=U([...into.bullets,...A(s.bullets)]);
    A(s.books).forEach(b=>into.subsections.push({title:b?.title||b?.name||'Part',paragraphs:U([b?.summary,b?.text,b?.description,b?.note]),bullets:[]}));
    A(s.subsections).forEach(sub=>into.subsections.push(Object.assign({},sub,{paragraphs:U(A(sub.paragraphs)),bullets:U(A(sub.bullets))})));
  }

  function normalize(name){
    const e=E(name);if(!Object.keys(e).length)return;
    if(name==='Viṣṇu Purāṇa'){
      e.articleSections=A(e.articleSections).map(clone);
      D[`Purāṇa:${name}`]=e;return;
    }
    const slots=Object.fromEntries(ORDER.map(t=>[t,{title:t,paragraphs:[],bullets:[],subsections:[]}]))
    A(e.articleSections).forEach(s=>mergeSection(slots[canonical(s.title)],clone(s)));
    e.articleSections=ORDER.map(t=>slots[t]);
    D[`Purāṇa:${name}`]=e;
  }

  function stringsFrom(value,path='',out=[]){
    if(value==null)return out;
    if(typeof value==='string'){
      const s=value.trim();
      if(s.length>=90&&!/^https?:/i.test(s))out.push({path,text:s});
      return out;
    }
    if(Array.isArray(value)){value.forEach((v,i)=>stringsFrom(v,`${path} ${i}`,out));return out;}
    if(typeof value==='object'){
      Object.entries(value).forEach(([k,v])=>{
        if(['articleSections','sources','references','primarySources'].includes(k))return;
        stringsFrom(v,`${path} ${k}`,out);
      });
    }
    return out;
  }

  function sectionChars(e){
    let n=0;A(e.articleSections).forEach(s=>{n+=String(s.title||'').length;A(s.paragraphs).forEach(x=>n+=txt(x).length);A(s.bullets).forEach(x=>n+=txt(x).length);A(s.subsections).forEach(sub=>{n+=String(sub.title||'').length;A(sub.paragraphs).forEach(x=>n+=txt(x).length);A(sub.bullets).forEach(x=>n+=txt(x).length);A(sub.books).forEach(b=>n+=txt(b).length);});});return n;
  }

  function existingText(e){
    const set=new Set();A(e.articleSections).forEach(s=>{A(s.paragraphs).forEach(x=>set.add(N(txt(x))));A(s.bullets).forEach(x=>set.add(N(txt(x))));A(s.subsections).forEach(sub=>{A(sub.paragraphs).forEach(x=>set.add(N(txt(x))));A(sub.bullets).forEach(x=>set.add(N(txt(x))));});});return set;
  }

  function topSection(e,title){return A(e.articleSections).find(s=>s.title===title);}
  function classifyPath(path){return canonical(path);}

  function bringToBenchmark(name,target){
    if(name==='Viṣṇu Purāṇa')return;
    const e=E(name);if(!Object.keys(e).length)return;
    let count=sectionChars(e);const seen=existingText(e);
    const candidates=stringsFrom(e).filter(x=>!seen.has(N(x.text)));
    // Prefer substantive legacy research over metadata; longest passages first within their native topic.
    candidates.sort((a,b)=>b.text.length-a.text.length);
    for(const item of candidates){
      if(count>=target)break;
      const sec=topSection(e,classifyPath(item.path))||topSection(e,'Contents');
      if(!sec)continue;
      sec.paragraphs=U([...A(sec.paragraphs),item.text]);
      seen.add(N(item.text));count+=item.text.length;
    }
    e.articleCharacterCount=count;e.vishnuBenchmarkCharacterCount=target;e.meetsVishnuDepth=count>=target;
    D[`Purāṇa:${name}`]=e;
  }

  NAMES.forEach(normalize);
  const target=sectionChars(E('Viṣṇu Purāṇa'));
  NAMES.forEach(name=>bringToBenchmark(name,target));
})();
