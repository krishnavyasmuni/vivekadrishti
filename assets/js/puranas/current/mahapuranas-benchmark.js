(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const NAMES=['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa','Vāyu Purāṇa','Devī Bhāgavata Purāṇa','Mahābhāgavata Purāṇa'];
  const ORDER=['Date of composition','Structure','Contents','Theology','Critical edition','Influences and reception','Rites, dharma and social history','Further reading'];
  const A=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const N=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const T=x=>typeof x==='string'?x:(x?.text||x?.summary||x?.description||x?.note||x?.title||'');
  const U=xs=>{const seen=new Set();return xs.filter(Boolean).filter(x=>{const k=N(T(x));if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const E=name=>D[`Purāṇa:${name}`]||D[name]||{};
  const SNAP=window.__MAHAPURANA_EXPANDED_SNAPSHOT__||{};
  const EXACT=xs=>{const seen=new Set();return xs.filter(Boolean).filter(x=>{let k;try{k=JSON.stringify(x);}catch(_){k=String(x);}if(seen.has(k))return false;seen.add(k);return true;});};
  const SOURCEKEY=s=>N((typeof s==='string'?s:(s?.title||''))+' '+(typeof s==='string'?'':(s?.url||'')));
  const SOURCES=xs=>{const seen=new Set();return xs.filter(Boolean).filter(s=>{const k=SOURCEKEY(s);if(!k||seen.has(k))return false;seen.add(k);return true;});};

  // The older deep Purana scripts contain much richer dossiers. mahapuranas-final.js
  // snapshots those dossiers before the dedicated article files load. Restore their
  // arrays here so the dedicated corrections enrich rather than erase the older depth.
  function restoreExpanded(name){
    const snap=SNAP[name]; if(!snap)return;
    const e=E(name); if(!Object.keys(e).length)return;
    e.articleSections=EXACT([...A(snap.articleSections),...A(e.articleSections)]);
    e.leadParagraphs=U([...A(snap.leadParagraphs),...A(e.leadParagraphs)]);
    ['chapterMap','rituals','vratas','sacredGeography','pilgrimage','dharma','dependencies','scholarlyPositions','scholarlyDebates','primaryEvidence','bibliography'].forEach(field=>{
      e[field]=U([...A(snap[field]),...A(e[field])]);
    });
    e.sources=SOURCES([...A(snap.sources),...A(e.sources)]);
    D[`Purāṇa:${name}`]=e;
  }

  function canon(title){const t=N(title);if(/date|chronolog|provenance|formation/.test(t))return 'Date of composition';if(/structure|book|skandha|khanda|samhita|part|chapter|organization|organisation/.test(t))return 'Structure';if(/critical|manuscript|edition|transmission|recension|textual history/.test(t))return 'Critical edition';if(/theolog|philosoph|bhakti|jnana|yoga|advaita|vedanta|supreme|sectarian/.test(t))return 'Theology';if(/ritual|dharma|vrata|rite|custom|social|pilgrimage|sacred geography|temple|gift|dana|funeral|shraddha|worship|festival/.test(t))return 'Rites, dharma and social history';if(/reception|influence|commentar|historical significance/.test(t))return 'Influences and reception';if(/further reading|bibliograph|reference|source/.test(t))return 'Further reading';return 'Contents';}
  function merge(dst,s){dst.paragraphs=U([...A(dst.paragraphs),...A(s.paragraphs)]);dst.bullets=U([...A(dst.bullets),...A(s.bullets)]);dst.subsections=EXACT([...A(dst.subsections),...A(s.subsections)]);A(s.books).forEach((b,i)=>dst.subsections.push({title:b?.title||b?.name||`Part ${i+1}`,paragraphs:U([b?.summary,b?.text,b?.description,b?.note]),bullets:[]}));dst.subsections=EXACT(dst.subsections);}
  function normalize(name){const e=E(name);if(!Object.keys(e).length)return;if(name==='Viṣṇu Purāṇa'){window.__MAHAPURANA_BENCHMARK_READY__=true;return;}const slots=Object.fromEntries(ORDER.map(t=>[t,{title:t,paragraphs:[],bullets:[],subsections:[]}])) ;A(e.articleSections).forEach(s=>merge(slots[canon(s.title)],s));e.articleSections=ORDER.map(t=>slots[t]);D[`Purāṇa:${name}`]=e;}
  NAMES.forEach(restoreExpanded);
  NAMES.forEach(normalize);
  delete window.__MAHAPURANA_EXPANDED_SNAPSHOT__;
  window.__MAHAPURANA_BENCHMARK_READY__=true;
})();
