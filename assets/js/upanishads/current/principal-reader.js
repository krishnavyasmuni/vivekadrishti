(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const previousOpen=window.openScriptureEncyclopedia;
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const D=window.SCRIPTURE_DETAIL_DATA||{};
  const TARGET=new Set(['Aitareya','Kauṣītaki','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya']);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const uniq=xs=>{const seen=new Set();return xs.filter(x=>{const k=norm(typeof x==='string'?x:(x?.title||x?.t||JSON.stringify(x)));if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const entry=name=>Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});
  const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
  const commonsPage=file=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;

  const TEXTUAL={
    Aitareya:{
      ps:[
        'The Aitareya Upanishad is embedded in Aitareya Aranyaka 2.4–2.6 of the Shakala Rigvedic tradition. Modern standalone editions often renumber these three chapters independently, so a precise citation should say whether it is using the independent Upanishad or the larger Aranyaka numbering.',
        'The manuscript used in the infobox is a Devanagari copy dated 1865. Its nineteenth-century copying date is the date of that surviving witness, not the date of composition of the Upanishad. It is useful because it shows the received Rigvedic text as actually transmitted in manuscript culture.'
      ]
    },
    Kauṣītaki:{
      image:{src:'https://commons.wikimedia.org/w/thumb.php?f=Kaushitaki_Brahmana_Upanishad_%28IA_dli.bengal.10689.10032%29.pdf&page=1&width=640',href:'https://commons.wikimedia.org/wiki/File:Kaushitaki_Brahmana_Upanishad_(IA_dli.bengal.10689.10032).pdf',cap:'E. B. Cowell’s 1861 Kaushitaki-Brahmana-Upanishad, including Sankarananda’s Sanskrit commentary and an English translation. Public-domain scan, Wikimedia Commons.'},
      ps:[
        'The four-chapter Kaushitaki Upanishad belongs to the Kaushitaki or Shankhayana Rigvedic Aranyaka tradition, but its chapter placement is not numbered identically in every manuscript and edition. The independent four-chapter text is stable enough to identify, while its position inside larger Aranyaka witnesses varies. That difference should be shown rather than flattened into one modern numbering scheme.',
        'The infobox image is the public-domain 1861 Bibliotheca Indica edition prepared by E. B. Cowell. It prints the Sanskrit Upanishad together with Sankarananda’s commentary and an English translation. It is an edition rather than an ancient palm-leaf manuscript, but it is a genuine textual witness to the premodern commentary tradition and to the form used by nineteenth-century scholarship.',
        'Older catalogues and editors therefore need to be read carefully: a reference to a different Kaushitaki Aranyaka chapter number can still point to the same Upanishadic teaching. For exact work, the four Upanishad chapters and the enclosing Aranyaka numbering should both be recorded.'
      ],
      table:[['Independent Upanishad','4 chapters'],['Larger textual home','Kaushitaki / Shankhayana Aranyaka'],['Manuscript issue','Aranyaka chapter numbering varies across witnesses and editions'],['Cowell 1861','Sanskrit text with Sankarananda commentary and English translation']]
    },
    Maitrāyaṇī:{
      ps:[
        'The Maitri or Maitrayaniya Upanishad is transmitted in a visibly layered form. The familiar seven-prapathaka recension is the practical reference text, but the later prapathakas contain supplements, repetitions and material whose vocabulary differs from the older Brihadratha–Shakayanya core.',
        'Modern textual study therefore distinguishes the history of the received seven-part scripture from hypotheses about older layers. The point is not to discard the later material: the layered form is itself part of the manuscript history of the Upanishad.'
      ],
      figure:{src:commons('1860s manuscript copy of ancient Maitrayaniya Upanishad, sample ii, Krishna Yajurveda, Pune Maharashtra, Sanskrit, Devanagari.jpg'),href:commonsPage('1860s manuscript copy of ancient Maitrayaniya Upanishad, sample ii, Krishna Yajurveda, Pune Maharashtra, Sanskrit, Devanagari.jpg'),cap:'A second folio from a nineteenth-century Devanagari manuscript of the Maitrayaniya Upanishad, Pune tradition. Wikimedia Commons.'}
    },
    Kaṭha:{
      ps:[
        'The received Katha Upanishad is arranged in two adhyayas, each divided into three vallis. Verse counts can differ slightly with editorial decisions, so the safest scholarly citation gives adhyaya, valli and verse rather than only a page number.',
        'The Grantha-script palm-leaf manuscript used in the infobox belongs to the C. M. Whish collection and was acquired in 1836. It is important evidence for the southern transmission of a Krishna-Yajurvedic Upanishad whose textual school is the Katha tradition.',
        'Close verbal parallels with the Bhagavad Gita and other early Sanskrit texts are important for relative chronology, but parallel verses should not be silently substituted for the Katha reading. The Upanishad has its own six-valli architecture and its own transmitted wording.'
      ]
    },
    Taittirīya:{
      ps:[
        'The Taittiriya Upanishad is not an originally free-standing booklet: it is transmitted as prapathakas 7–9 of the Taittiriya Aranyaka of the Krishna Yajurveda. Those three units are conventionally called Shiksha-valli, Ananda or Brahmananda-valli, and Bhrigu-valli.',
        'Its manuscript tradition includes the root text and a large commentarial literature. Shankara’s bhashya and Sureshvara’s Taittiriyavarttika became central to Advaita, while Madhva and Sri Vaishnava traditions read the same passages within different accounts of Brahman and the individual self.',
        'The embedded Aranyaka setting explains why phonetics, recitation and student discipline stand beside the five-fold analysis of the person and the inquiry into bliss. Those are not accidental leftovers from a different book.'
      ],
      figure:{src:commons('1836 CE July purchase, Taittiriya Upanishad bhasya, Adi Shankara, Whish manuscript collection, Kahle-Austin Foundation, Sanskrit, Grantha script.jpg'),href:commonsPage('1836 CE July purchase, Taittiriya Upanishad bhasya, Adi Shankara, Whish manuscript collection, Kahle-Austin Foundation, Sanskrit, Grantha script.jpg'),cap:'Grantha-script palm-leaf manuscript of a Taittiriya Upanishad bhashya, Whish collection, acquired in 1836. Wikimedia Commons.'}
    },
    Śvetāśvatara:{
      ps:[
        'Shvetashvatara is transmitted as a six-chapter metrical Upanishad of the Krishna Yajurveda. Many individual verses closely parallel older Vedic material, so its textual history includes both inherited Vedic language and the new theological arrangement created by the received six-chapter work.',
        'A commentary is transmitted under Shankara’s name, but modern scholars have debated its authorship. The historical question of authorship should therefore be separated from the unquestioned importance of that commentary in the later reception of the text.'
      ]
    },
    Īśāvāsya:{
      structure:'17 mantras in the Madhyandina recension; 18 in the Kanva recension',
      ps:[
        'Isha is unusual because it is transmitted directly as chapter 40 of the Vajasaneyi Samhita of the Shukla Yajurveda. Its textual history is therefore simultaneously the history of an Upanishad and a Samhita recension.',
        'The Kanva and Madhyandina recensions agree closely at the beginning but differ in the order and presence of later mantras. The Kanva recension has eighteen verses; the Madhyandina recension has seventeen. This matters especially in the vidya/avidya and sambhuti/asambhuti sequence, where quoting only a verse number without naming the recension can be misleading.',
        'The manuscript image in the infobox is a real Isha witness from the Wellcome collection. The article therefore treats recension, verse order and manuscript witness as part of the text itself rather than as a small note after the philosophy.'
      ],
      table:[['Feature','Madhyandina','Kanva'],['Vedic location','Vajasaneyi Samhita 40','Vajasaneyi Samhita 40'],['Verse count','17','18'],['Later verses','Different sequence; one Kanva verse absent','Different sequence; 18-verse form']]
    },
    Bṛhadāraṇyaka:{
      ps:[
        'Brihadaranyaka survives principally in the Madhyandina and Kanva recensions of the Shukla Yajurveda. Both transmit six adhyayas, but they differ in wording, ordering and smaller divisions. A philological citation should identify the recension when the exact reading matters.',
        'The Upanishad is also part of the larger Shatapatha Brahmana tradition. Standalone editions make the six chapters look like an independent modern book, while the Vedic witnesses preserve them inside a much larger ritual and speculative corpus.',
        'The conventional grouping into Madhu, Yajnavalkya or Muni, and Khila sections reflects the composite architecture of the text. Repeated versions of teachings such as the Maitreyi dialogue are evidence of long school transmission rather than simple duplication.'
      ],
      table:[['Recension','Larger Vedic setting','Upanishad'],['Madhyandina','Final portion of the Madhyandina Shatapatha Brahmana','6 adhyayas'],['Kanva','Corresponding final Upanishadic portion of the Kanva Shatapatha','6 adhyayas with recensional differences']]
    },
    Praśna:{
      ps:[
        'Prashna belongs to the Pippalada Atharvaveda tradition and is built around six named questions. That six-question architecture is stable enough to function as the text’s own table of contents, even where editors subdivide the individual answers differently.',
        'The six students named in the frame are Kabandhin Katyayana, Bhargava Vaidarbhi, Kausalya Ashvalayana, Sauryayani Gargya, Satyakama Shaibya and Sukesha Bharadvaja. Preserving those names matters because the literary form is a sequence of real pedagogical encounters, not six anonymous doctrinal headings.',
        'Shankara, Madhva and Rangaramanuja traditions all use the text in discussions of prana, Om, dream, deep sleep and the sixteen-part Purusha, giving the six short questions a large commentarial afterlife.'
      ]
    },
    Muṇḍaka:{
      ps:[
        'Mundaka is transmitted as an Atharvavedic verse Upanishad in three mundakas, each divided into two khandas. Its compact metrical form allowed it to circulate independently, but the received Atharvavedic affiliation remains part of its canonical identity.',
        'The text has to be distinguished from later quotation traditions. Images such as the two birds, the bow of Om and rivers entering the sea were cited across Vedanta, but the article follows their place in the six-section Mundaka sequence before discussing later interpretations.'
      ]
    },
    Māṇḍūkya:{
      ps:[
        'The Mandukya Upanishad itself contains only twelve mantras. It must be distinguished from Gaudapada’s later Mandukya Karika, which is commonly printed immediately after or around the Upanishad and can make the received book look much larger than the shruti text actually is.',
        'The manuscript image in the infobox contains the opening mantras. Later Advaita transmission reads those twelve mantras together with the four chapters of Gaudapada’s Karika and Shankara’s commentary, but a historical article should keep Upanishad, karika and bhashya visibly separate.'
      ]
    }
  };

  let shade=null,reader=null,currentSources=[];
  const sourceObj=x=>{if(!x)return null;if(typeof x==='string')return{t:x,d:'',u:''};return{t:x.t||x.title||x.citation||'Source',d:x.d||x.detail||x.note||'',u:x.u||x.url||x.href||''};};
  const sourcesFor=(name,d,e)=>{
    const xs=[...(d.refs||[]),...(Array.isArray(e.sources)?e.sources:[]),...(Array.isArray(e.bibliography)?e.bibliography:[])].map(sourceObj).filter(Boolean);
    const tx=TEXTUAL[name]||{};const im=tx.image||d.image;if(im?.href)xs.push({t:'Manuscript / edition image',d:im.cap||'',u:im.href});if(tx.figure?.href)xs.push({t:'Additional manuscript image',d:tx.figure.cap||'',u:tx.figure.href});
    const seen=new Set();return xs.filter(s=>{const k=(s.t+'|'+s.u).toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  };
  const C=nums=>(nums||[]).filter(n=>n>0&&n<=currentSources.length).map(n=>`<sup class="ch-cite"><button type="button" data-pr17-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const defaultRefs=()=>Array.from({length:Math.min(3,currentSources.length)},(_,i)=>i+1);
  const P=(text,refs)=>`<p>${esc(text)}${C(refs?.length?refs:defaultRefs())}</p>`;

  const fromRich=s=>({title:s.t,paragraphs:(s.ps||[]).map(x=>Array.isArray(x)?{text:x[0],refs:x[1]}:{text:x,refs:defaultRefs()}),subs:(s.subs||[]).map(sub=>({title:sub.h,paragraphs:(sub.ps||[]).map(x=>Array.isArray(x)?{text:x[0],refs:x[1]}:{text:x,refs:defaultRefs()})}))});
  const fromDeep=s=>({title:s.title,paragraphs:(s.paragraphs||[]).map(x=>({text:x,refs:defaultRefs()})),subs:(s.books||[]).map(b=>({title:`${b.number?b.number+' — ':''}${b.title||'Section'}`,paragraphs:[{text:b.summary||'',refs:defaultRefs()}]}))});
  const sectionsFor=(name,d,e)=>{
    const out=[],seen=new Set();
    const add=s=>{if(!s?.title)return;const k=norm(s.title).replace(/^(the )/,'');if(seen.has(k))return;seen.add(k);out.push(s);};
    (d.sections||[]).map(fromRich).forEach(add);
    (Array.isArray(e.articleSections)?e.articleSections:[]).map(fromDeep).forEach(add);
    const tx=TEXTUAL[name];
    if(tx?.ps?.length){
      const manuscript={title:'Manuscripts, recensions and editions',paragraphs:tx.ps.map(x=>({text:x,refs:defaultRefs()})),subs:[],table:tx.table,figure:tx.figure};
      const idx=Math.max(0,out.findIndex(s=>/date|textual|composition/i.test(s.title))+1);out.splice(idx,0,manuscript);
    }
    return out;
  };

  const tableHTML=rows=>{if(!rows?.length)return'';return `<div class="pr17-table-wrap"><table class="pr17-table"><tbody>${rows.map((r,i)=>`<tr>${r.map(c=>i===0?`<th>${esc(c)}</th>`:`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;};
  const figureHTML=f=>!f?'':`<figure class="ch-thumb"><a href="${esc(f.href)}" target="_blank" rel="noopener"><img src="${esc(f.src)}" loading="lazy" alt=""></a><figcaption>${esc(f.cap||'')}</figcaption></figure>`;
  const sectionHTML=(s,i)=>`<section class="kena-section ch-section" id="pr17-sec-${i}"><h2>${esc(s.title)}</h2>${s.figure?figureHTML(s.figure):''}${(s.paragraphs||[]).map(p=>P(p.text,p.refs)).join('')}${s.table?tableHTML(s.table):''}${(s.subs||[]).map((sub,j)=>`<h3 id="pr17-sec-${i}-${j}">${esc(sub.title)}</h3>${(sub.paragraphs||[]).map(p=>P(p.text,p.refs)).join('')}`).join('')}</section>`;
  const tocHTML=secs=>secs.map((s,i)=>`<li><a href="#pr17-sec-${i}">${esc(s.title)}</a>${s.subs?.length?`<ol>${s.subs.map((sub,j)=>`<li><a href="#pr17-sec-${i}-${j}">${esc(sub.title)}</a></li>`).join('')}</ol>`:''}</li>`).join('');

  const leadHTML=(d,e)=>{
    const rich=(d.lead||[]).map(x=>Array.isArray(x)?{text:x[0],refs:x[1]}:{text:x,refs:defaultRefs()});
    const deep=(Array.isArray(e.leadParagraphs)?e.leadParagraphs:[]).map(x=>({text:x,refs:defaultRefs()}));
    const seen=new Set();return [...rich,...deep].filter(p=>{const k=norm(p.text).slice(0,90);if(!k||seen.has(k))return false;seen.add(k);return true;}).slice(0,4).map(p=>P(p.text,p.refs)).join('');
  };
  const infobox=(name,d,e)=>{
    const tx=TEXTUAL[name]||{},im=tx.image||d.image;
    const rows=[['Date',d.date||e.period],['Type',d.type||'Mukhya Upanishad'],['Veda',d.veda],['School',d.school||e.traditionalAuthor],['Textual setting',d.setting||e.extent],['Structure',tx.structure||d.structure||e.extent],['Muktika',d.muktika],['Major commentators',d.commentators],['Famous teaching',d.famous]].filter(x=>x[1]);
    return `<aside class="kena-infobox ch-infobox"><div class="kena-infobox-title">${esc(d.title||name+' Upanishad')}</div>${(d.deva||e.sanskritTitle)?`<div class="ch-dev">${esc(d.deva||String(e.sanskritTitle).split('/')[0])}</div>`:''}${im?`<figure class="wiki-infobox-image"><a href="${esc(im.href)}" target="_blank" rel="noopener"><img src="${esc(im.src)}" loading="lazy" alt="${esc(d.title||name)} textual witness"></a><figcaption>${esc(im.cap||'')}</figcaption></figure>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  };
  const refsHTML=()=>`<section class="kena-section ch-section" id="pr17-references"><h2>References</h2><ol class="ch-reference-list">${currentSources.map((s,i)=>`<li><b>${i+1}.</b> ${esc(s.t)}${s.d?` — ${esc(s.d)}`:''}${s.u?` <a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;

  const close=()=>{shade?.remove();reader?.remove();document.querySelector('.pr17-source-card')?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});};
  const showSource=n=>{const s=currentSources[n-1];if(!s)return;document.querySelector('.pr17-source-card')?.remove();const card=document.createElement('aside');card.className='itihasa-source-card ch-source-card pr17-source-card';card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.t)}</strong>${s.d?`<p>${esc(s.d)}</p>`:''}${s.u?`<a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(card);card.querySelector('button')?.addEventListener('click',()=>card.remove());};

  function openDeep(button,name){
    const d=R[name];if(!d)return false;const e=entry(name);currentSources=sourcesFor(name,d,e);const secs=sectionsFor(name,d,e);close();button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up-wiki-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up-wiki-reader ch-wiki-reader pr17-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${d.title||name+' Upanishad'} article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(d.title||name+' Upanishad')}</h1>${(d.deva||e.sanskritTitle)?`<div class="up-title-dev">${esc(d.deva||String(e.sanskritTitle).split('/')[0])}</div>`:''}</div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article up-wiki-article ch-wiki-article pr17-article">${infobox(name,d,e)}<div class="kena-lead ch-lead">${leadHTML(d,e)}</div><nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${tocHTML(secs)}<li><a href="#pr17-references">References</a></li></ol></nav>${secs.map(sectionHTML).join('')}${refsHTML()}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }

  window.openScriptureEncyclopedia=function(button){const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';const kind=button?.dataset?.kind||'';if(kind==='Upaniṣad'&&TARGET.has(name)&&R[name])return openDeep(button,name);return typeof previousOpen==='function'?previousOpen(button):false;};

  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-pr17-note]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.pr17Note));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.pr17-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});
  if(!document.getElementById('pr17-style')){const st=document.createElement('style');st.id='pr17-style';st.textContent=`.pr17-article .ch-lead{min-height:360px}.pr17-article .ch-section h3{margin-top:25px!important}.pr17-article .ch-section p{margin-bottom:15px!important}.pr17-article .ch-toc{max-width:690px!important}.pr17-table-wrap{clear:both;margin:14px 0 22px;overflow-x:auto}.pr17-table{width:100%;border-collapse:collapse;background:#fff;font:13px/1.45 Merriweather,Georgia,serif}.pr17-table th,.pr17-table td{border:1px solid #a2a9b1;padding:8px 10px;text-align:left;vertical-align:top}.pr17-table th{background:#eaecf0;font-weight:700}@media(max-width:760px){.pr17-article .ch-lead{min-height:0}.pr17-table{font-size:12.5px}}`;document.head.append(st);}
  window.SCRIPTURE_PRINCIPAL_ROUTER_V17=true;
})();
