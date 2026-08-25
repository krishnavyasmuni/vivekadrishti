(() => {
  const root=document.getElementById('scripture-browser');
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const D=window.SCRIPTURE_DETAIL_DATA||{};
  if(!root)return;

  const PRINCIPAL=new Set(['Aitareya','Kauṣītaki','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya']);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const uniq=xs=>{const seen=new Set();return xs.filter(x=>{const k=norm(Array.isArray(x)?x[0]:x);if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
  const commonsPage=file=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
  const extraFor=name=>Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});

  const RESEARCH={
    Aitareya:{
      sources:[
        {t:'Vedic Heritage Portal — Aitareya Aranyaka',d:'Places the Upanishad in Aitareya Aranyaka II.4–6 and identifies the Shakala Rigvedic setting.',u:'https://vedicheritage.gov.in/aranyakas/aitareyaranyaka/'},
        {t:'Vedic Heritage Portal — Aitareyopanishad',d:'Three chapters, thirty-three passages and summary of creation, birth and consciousness.',u:'https://vedicheritage.gov.in/upanishads/aitareyopanishad/'},
        {t:'Wikimedia Commons — Aitareya manuscript, 1865',d:'Devanagari manuscript from the Lalchand Research Library collection, copied in 1865.',u:'https://commons.wikimedia.org/wiki/File:Aitareya_Upanishad,_Sanskrit,_Rigveda,_Devanagari_script,_1865_CE_manuscript.jpg'}
      ],
      manuscript:[
        'The Aitareya Upanishad is not merely associated with the Rigveda in a later list: it is embedded in the second Aitareya Aranyaka, where the fourth, fifth and sixth chapters form the received Upanishad. The larger Aranyaka belongs to the Shakala recension of the Rigveda, so the textual home of Aitareya can be stated much more precisely than “Rigvedic.”',
        'The manuscript shown in the infobox is a Devanagari copy dated 1865 and preserved through the Lalchand Research Library / DAV College manuscript digitisation project. Its late copying date is normal for an ancient Indian text: the date of a surviving paper manuscript is not the date of composition of the Upanishad it transmits.',
        'Printed editions often extract the three Upanishadic chapters from the Aranyaka and number them independently. A scholarly citation should therefore say whether it is using independent Upanishad numbering or the embedded Aitareya Aranyaka location.'
      ]
    },
    Kauṣītaki:{
      image:{src:'https://commons.wikimedia.org/w/thumb.php?f=Kaushitaki_Brahmana_Upanishad_%28IA_dli.bengal.10689.10032%29.pdf&page=1&width=640',href:'https://commons.wikimedia.org/wiki/File:Kaushitaki_Brahmana_Upanishad_(IA_dli.bengal.10689.10032).pdf',cap:'Title page of E. B. Cowell’s 1861 Kaushitaki-Brahmana-Upanishad, with Sankarananda’s Sanskrit commentary and English translation. Public-domain scan, Wikimedia Commons.'},
      sources:[
        {t:'Wikimedia Commons — Cowell 1861 Kaushitaki edition',d:'Public-domain 204-page edition including Sankarananda commentary and English translation.',u:'https://commons.wikimedia.org/wiki/File:Kaushitaki_Brahmana_Upanishad_(IA_dli.bengal.10689.10032).pdf'},
        {t:'Vedic Heritage Portal — Kaushitaki / Shankhayana tradition',d:'Rigvedic school context for the Kaushitaki-Shankhayana Brahmana and Aranyaka.',u:'https://vedicheritage.gov.in/hi/brahmanas/kausitaki-shankhyayana-brahmana/'}
      ],
      manuscript:[
        'Kaushitaki is one of the clearest cases where “chapter number” depends on the manuscript or edition being cited. The four-chapter Upanishadic unit is stable, but its position inside the Kaushitaki/Shankhayana Aranyaka is not represented identically in all witnesses. Older catalogues and editions therefore cite the same material under different Aranyaka chapter numbers.',
        'The nineteenth-century Cowell edition is itself an important witness to the history of scholarship: it prints the Sanskrit text with Sankarananda’s commentary and an English translation. It should not be confused with an ancient manuscript, but it gives readers direct access to a major premodern commentary tradition and to the form of the text used by early modern editors.',
        'For exact quotation the article therefore distinguishes the four independent Upanishad chapters from their varying placement in larger Aranyaka witnesses instead of presenting one modern chapter numbering as universally original.'
      ],
      table:{heads:['Witness / convention','Placement of the four-chapter Upanishad'],rows:[['Independent Upanishad editions','Chapters 1–4'],['Common Aranyaka arrangement in several editions','A four-chapter block within the Kaushitaki / Shankhayana Aranyaka'],['Other manuscript catalogues','Different Aranyaka chapter numbering; the four teaching units remain recognisable'],['Cowell 1861 edition','Independent Kaushitaki-Brahmana-Upanishad with Sankarananda commentary']]}
    },
    Maitrāyaṇī:{
      sources:[{t:'J. A. B. van Buitenen — The Maitrayaniya Upanishad',d:'Major modern study of the text’s recensions, layers and philosophical vocabulary.'}],
      manuscript:[
        'Maitri is a visibly layered Upanishad and survives with recensional variation. The familiar seven-prapathaka form is useful for reference, but its later prapathakas contain supplementary and repeated material that should not automatically be assigned the same date as the older Brihadratha–Shakayanya dialogue.',
        'Modern textual study therefore separates the history of the received seven-part scripture from hypotheses about an older core. The article keeps both levels visible: the traditional seven-prapathaka reading remains the main contents structure, while a separate transmission section explains why scholars discuss additions and recensional growth.',
        'The nineteenth-century Devanagari manuscripts used as images on this site are witnesses to the received Sanskrit tradition; they are not evidence that the work was composed in the nineteenth century.'
      ],
      figure:{src:commons('1860s manuscript copy of ancient Maitrayaniya Upanishad, sample ii, Krishna Yajurveda, Pune Maharashtra, Sanskrit, Devanagari.jpg'),href:commonsPage('1860s manuscript copy of ancient Maitrayaniya Upanishad, sample ii, Krishna Yajurveda, Pune Maharashtra, Sanskrit, Devanagari.jpg'),cap:'A second folio from a nineteenth-century Devanagari manuscript of the Maitrayaniya Upanishad, Pune tradition. Wikimedia Commons.'}
    },
    Kaṭha:{
      sources:[{t:'Wikimedia Commons — Katha Grantha manuscript',d:'Palm-leaf Grantha-script Katha Upanishad manuscript in the C. M. Whish collection, acquired in 1836.',u:'https://commons.wikimedia.org/wiki/File:Katha_Upanishad,_Sanskrit,_Grantha_script,_Whish_Manuscript_Collection_acquired_1836_CE.jpg'}],
      manuscript:[
        'The received Katha has two adhyayas, each divided into three vallis. Modern editions normally count 119 verses, but verse numbering can vary slightly with editorial treatment of repeated or parallel material. Citations should therefore specify valli and verse rather than relying only on page numbers.',
        'The Grantha-script palm-leaf manuscript shown in the infobox belongs to the C. M. Whish collection and was acquired in 1836. Its script and material are valuable evidence for the southern manuscript transmission of a text whose Vedic school is the Katha branch of the Krishna Yajurveda.',
        'The Katha text must also be distinguished from later works that quote it. Close verbal parallels with the Bhagavad Gita and other early Sanskrit texts are important for relative chronology, but they do not justify silently replacing Katha’s wording or verse order with that of a later parallel.'
      ]
    },
    Taittirīya:{
      sources:[
        {t:'Vedic Heritage Portal — Taittiriya Upanishad',d:'Places the three vallis in Taittiriya Aranyaka 7–9.',u:'https://vedicheritage.gov.in/upanishads/taittiriyopanishad/'},
        {t:'Wikimedia Commons — Taittiriya Upanishad Bhashya, Whish collection',d:'Grantha palm-leaf manuscript of commentary on the Taittiriya Upanishad, acquired by C. M. Whish in 1836.',u:'https://commons.wikimedia.org/wiki/File:1836_CE_July_purchase,_Taittiriya_Upanishad_bhasya,_Adi_Shankara,_Whish_manuscript_collection,_Kahle-Austin_Foundation,_Sanskrit,_Grantha_script.jpg'}
      ],
      manuscript:[
        'The Taittiriya Upanishad is transmitted as prapathakas 7–9 of the Taittiriya Aranyaka. These are conventionally called the Shiksha Valli, Ananda or Brahmananda Valli, and Bhrigu Valli. The embedded Aranyaka location is essential for understanding why phonetics, recitation and educational discipline stand beside metaphysics.',
        'The manuscript tradition includes not only copies of the root text but extensive commentarial witnesses. A Grantha-script palm-leaf manuscript in the Whish collection transmits a Taittiriya Upanishad bhashya and was acquired in 1836; the underlying copy is older than the acquisition date.',
        'Shankara’s bhashya and Sureshvara’s Taittiriyavarttika made the Upanishad a major Advaita text, while Madhva and Sri Vaishnava commentators read the same definitions of Brahman and the layered person differently.'
      ],
      figure:{src:commons('1836 CE July purchase, Taittiriya Upanishad bhasya, Adi Shankara, Whish manuscript collection, Kahle-Austin Foundation, Sanskrit, Grantha script.jpg'),href:commonsPage('1836 CE July purchase, Taittiriya Upanishad bhasya, Adi Shankara, Whish manuscript collection, Kahle-Austin Foundation, Sanskrit, Grantha script.jpg'),cap:'Grantha-script palm-leaf manuscript of a Taittiriya Upanishad bhashya, Whish collection, acquired 1836. Wikimedia Commons.'}
    },
    Śvetāśvatara:{
      manuscript:[
        'Shvetashvatara is transmitted as a six-chapter metrical Upanishad of the Krishna Yajurveda. Its textual history is especially interesting because many individual verses are close to older Vedic passages: the received work often creates new theological force by arranging inherited Rudra, Savitar and Purusha language into a sustained argument.',
        'The bhashya transmitted under Shankara’s name is important to the history of interpretation, although modern scholars have debated its authorship. The article therefore distinguishes the existence and influence of the transmitted commentary from the separate historical question of whether every part can securely be assigned to Shankara.',
        'The manuscript image in the infobox contains the opening of the Upanishad with commentary, making the relation between root text and scholastic transmission visible rather than treating later exegesis as an invisible appendix.'
      ]
    },
    Īśāvāsya:{
      structure:'17 mantras in the Madhyandina recension; 18 in the Kanva recension',
      sources:[{t:'Ishavasya with Shankara Bhashya — Kanva recension',d:'Public-domain edition transmitting the eighteen-verse Kanva order.',u:'https://www.wisdomlib.org/hinduism/book/ishavasya-bhashya-by-sitarama'}],
      manuscript:[
        'Isha is unusual among principal Upanishads because it is transmitted directly as the final chapter of the Vajasaneyi Samhita of the Shukla Yajurveda. Its textual identity is therefore also a Samhita-recension problem, not merely an independent Upanishad-manuscript problem.',
        'The Kanva and Madhyandina recensions agree closely in the opening portion but differ in the arrangement of later mantras and in the usual total count. The Kanva form commonly printed in older English editions has eighteen mantras; the Madhyandina arrangement is commonly counted as seventeen.',
        'Because the disputed middle sequence on vidya/avidya and sambhuti/asambhuti is precisely where ordering matters, serious interpretation should identify the recension being translated instead of quoting “Isha verse 12” as though every witness necessarily places the same wording there.'
      ],
      table:{heads:['Feature','Madhyandina','Kanva'],rows:[['Vedic location','Vajasaneyi Samhita 40','Vajasaneyi Samhita 40'],['Usual verse count','17','18'],['Opening verses','Closely parallel to Kanva','Closely parallel to Madhyandina'],['Later sequence','Different ordering in part of the poem','Different ordering in part of the poem']]},
      figure:{src:commons('A page of a (late) manuscript of the Isa Upanishad.gif'),href:commonsPage('A page of a (late) manuscript of the Isa Upanishad.gif'),cap:'A later manuscript page of the Isha Upanishad. Wikimedia Commons.'}
    },
    Bṛhadāraṇyaka:{
      manuscript:[
        'Brihadaranyaka survives in two major recensions, Madhyandina and Kanva. Both transmit six adhyayas, but wording, ordering and smaller divisions differ. The text therefore has to be cited recensionally when a passage is being compared at philological level.',
        'Its Vedic location also differs with the recension of the Shatapatha Brahmana: the Madhyandina Brihadaranyaka belongs to the fourteenth kanda, while the Kanva tradition places the corresponding Upanishadic material at the end of its longer Shatapatha arrangement. Modern standalone editions conceal that larger Brahmana architecture unless it is stated explicitly.',
        'The six chapters are conventionally grouped into three pairs—Madhu, Yajnavalkya/Muni and Khila. Repeated versions of teachings such as the Maitreyi dialogue and differences between recensions are evidence of a long school transmission, not simply editorial “mistakes.”'
      ],
      table:{heads:['Recension','Larger Vedic setting','Upanishad structure'],rows:[['Madhyandina','Shatapatha Brahmana, final (14th) kanda','6 adhyayas'],['Kanva','Kanva Shatapatha, corresponding final Upanishadic books','6 adhyayas with recensional differences'],['Conventional internal grouping','Madhu / Yajnavalkya (Muni) / Khila','2 + 2 + 2 adhyayas']]}
    },
    Praśna:{
      manuscript:[
        'Prashna belongs to the Pippalada Atharvaveda tradition and is built around six named questions. The six-question architecture is stable enough to function as the text’s own table of contents, although some manuscript and editorial traditions further group the material into larger adhyayas or kandikas.',
        'The questioners are not anonymous literary placeholders: the opening names Kabandhin Katyayana, Bhargava Vaidarbhi, Kausalya Ashvalayana, Sauryayani Gargya, Satyakama Shaibya and Sukesha Bharadvaja. Preserving those names helps the article retain the actual pedagogical form of the text.',
        'Commentarial transmission is extensive enough to make the text a shared Vedantic source. Shankara, Madhva and Rangaramanuja traditions all use it when discussing prana, Om, sleep and the sixteen-part Purusha.'
      ]
    },
    Muṇḍaka:{
      manuscript:[
        'The received Mundaka is arranged into three mundakas, each containing two khandas, for six sections in all. Common editions count sixty-four verses. The section totals—9, 13, 10, 11, 10 and 11—make the architecture much more precise than a generic statement that it has “three books.”',
        'Manuscripts and printed editions show ordinary small variants and occasional differences of segmentation, but the three-by-two macrostructure is stable. The manuscript image in the infobox shows the final portion of the third mundaka rather than a decorative unrelated Vedic leaf.',
        'The title should also be kept separate from later renunciatory interpretation of the word mundaka. Etymological explanations about “shaving” ignorance are traditional or interpretive claims, not substitutes for the transmitted textual structure.'
      ],
      table:{heads:['Section','Common verse count'],rows:[['Mundaka 1.1','9'],['Mundaka 1.2','13'],['Mundaka 2.1','10'],['Mundaka 2.2','11'],['Mundaka 3.1','10'],['Mundaka 3.2','11'],['Total','64']]}
    },
    Māṇḍūkya:{
      manuscript:[
        'The Mandukya Upanishad proper consists of twelve mantras. Many traditional and modern books print it together with Gaudapada’s Mandukya Karika, but the four-prakarana Karika is a later philosophical work and must not be silently counted as additional Upanishad verses.',
        'This distinction matters for both dating and doctrine. Claims about non-origination, the detailed analysis of dream analogies and some of the strongest formulations of ajativada belong to Gaudapada’s Karika, even though the Karika became inseparable from the Upanishad in the Advaita study tradition.',
        'The opening-mantra manuscript image in the infobox is therefore labelled as a witness to the twelve-mantra shruti text, while the reception section separately explains the enormous later influence of Gaudapada and Shankara.'
      ],
      table:{heads:['Text','Extent','Status'],rows:[['Mandukya Upanishad','12 mantras','Atharvavedic shruti'],['Gaudapada Karika','4 prakaranas','Later philosophical karika on the Upanishad'],['Shankara commentary','Commentarial prose','Advaita exegesis of Upanishad and Karika']]}
    }
  };

  let shade=null,reader=null,currentSources=[];
  const sourceObj=x=>{if(!x)return null;if(typeof x==='string')return{t:x,d:'',u:''};return{t:x.t||x.title||x.citation||x.text||'Source',d:x.d||x.detail||x.note||'',u:x.u||x.url||x.href||''};};
  const sourcesFor=(name,d,e)=>{
    const out=[];
    [...(d.refs||[]),...(Array.isArray(e.sources)?e.sources:[]),...(Array.isArray(e.bibliography)?e.bibliography:[]),...(Array.isArray(e.primarySources)?e.primarySources:[]),...(RESEARCH[name]?.sources||[])].map(sourceObj).filter(Boolean).forEach(s=>out.push(s));
    const image=RESEARCH[name]?.image||d.image;
    if(image?.href)out.push({t:'Image witness',d:image.cap||`${d.title} textual witness.`,u:image.href});
    if(RESEARCH[name]?.figure?.href)out.push({t:'Additional manuscript / commentary image',d:RESEARCH[name].figure.cap,u:RESEARCH[name].figure.href});
    const seen=new Set();return out.filter(s=>{const k=(s.t+'|'+s.u).toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  };
  const defaultRefs=()=>Array.from({length:Math.min(3,currentSources.length)},(_,i)=>i+1);
  const cite=nums=>(nums||[]).filter(n=>n>0&&n<=currentSources.length).map(n=>`<sup class="ch-cite"><button type="button" data-pr16-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const P=x=>{const text=Array.isArray(x)?x[0]:x;let refs=Array.isArray(x)?x[1]:defaultRefs();if(!refs?.length)refs=defaultRefs();return `<p>${esc(text)}${cite(refs)}</p>`;};
  const sourceNums=(needles)=>needles.map(q=>currentSources.findIndex(s=>(s.t+' '+s.d).toLowerCase().includes(q.toLowerCase()))+1).filter(n=>n>0);
  const researchP=(text,keys=[])=>[text,sourceNums(keys).length?sourceNums(keys):defaultRefs()];

  const deepSections=(e)=>Array.isArray(e.articleSections)?e.articleSections.map(s=>({
    t:s.title||'Untitled section',
    ps:(s.paragraphs||[]).map(x=>[x,defaultRefs()]),
    subs:(s.books||[]).map(b=>({h:`${b.number?`${b.number}. `:''}${b.title||'Section'}`,ps:[[b.summary||'',defaultRefs()]]}))
  })):[];
  const richSections=d=>(d.sections||[]).map(s=>({t:s.t,ps:(s.ps||[]).map(x=>Array.isArray(x)?x:[x,defaultRefs()]),subs:(s.subs||[]).map(sub=>({h:sub.h,ps:(sub.ps||[]).map(x=>Array.isArray(x)?x:[x,defaultRefs()])}))}));

  const mergeSections=(name,d,e)=>{
    const deep=deepSections(e),rich=richSections(d),out=[];
    const seen=new Set();
    const add=s=>{const k=norm(s.t);if(!k||seen.has(k))return;seen.add(k);out.push(s);};
    deep.forEach(add);rich.forEach(add);
    const r=RESEARCH[name]||{};
    if(r.manuscript?.length){
      const ms={t:'Manuscripts, recensions and editions',ps:r.manuscript.map((x,i)=>researchP(x,i===0?['Vedic Heritage','Wikipedia']:['manuscript','edition'])),table:r.table,figure:r.figure};
      const dateIndex=out.findIndex(s=>/date|composition|textual setting/i.test(s.t));
      const insertAt=dateIndex>=0?dateIndex+1:1;
      out.splice(insertAt,0,ms);
    }
    if(Array.isArray(e.scholarlyDebates)&&e.scholarlyDebates.length&&!out.some(s=>/scholarly|dating debate|interpretive/i.test(s.t))){
      out.push({t:'Scholarly questions',ps:e.scholarlyDebates.map(x=>[typeof x==='string'?x:(x.claim||x.text||JSON.stringify(x)),defaultRefs()])});
    }
    return out;
  };

  const tableHTML=t=>!t?'':`<div class="pr16-table-wrap"><table class="pr16-table"><thead><tr>${t.heads.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const figureHTML=f=>!f?'':`<figure class="ch-thumb pr16-thumb"><a href="${esc(f.href)}" target="_blank" rel="noopener"><img src="${esc(f.src)}" loading="lazy" alt=""></a><figcaption>${esc(f.cap||'')}</figcaption></figure>`;
  const sectionHTML=(s,i)=>{
    let body='';
    if(s.figure)body+=figureHTML(s.figure);
    body+=(s.ps||[]).map(P).join('');
    if(s.table)body+=tableHTML(s.table);
    (s.subs||[]).forEach((sub,j)=>{body+=`<h3 id="pr16-sec-${i}-sub-${j}">${esc(sub.h)}</h3>${(sub.ps||[]).map(P).join('')}`;});
    return `<section class="kena-section ch-section" id="pr16-sec-${i}"><h2>${esc(s.t)}</h2>${body}</section>`;
  };
  const tocHTML=secs=>secs.map((s,i)=>`<li><a href="#pr16-sec-${i}">${esc(s.t)}</a>${s.subs?.length?`<ol>${s.subs.map((sub,j)=>`<li><a href="#pr16-sec-${i}-sub-${j}">${esc(sub.h)}</a></li>`).join('')}</ol>`:''}</li>`).join('');

  const leadFor=(d,e)=>{
    const deep=Array.isArray(e.leadParagraphs)?e.leadParagraphs:[];
    const rich=(d.lead||[]).map(x=>Array.isArray(x)?x[0]:x);
    return uniq([...deep,...rich]).slice(0,4).map(x=>P([x,defaultRefs()])).join('');
  };
  const infobox=(name,d,e)=>{
    const research=RESEARCH[name]||{};const image=research.image||d.image;
    const rows=[
      ['Date',e.period||d.date],['Type',d.type||'Mukhya Upanishad'],['Veda',d.veda],['School',d.school||e.traditionalAuthor],['Textual setting',d.setting||e.extent],['Structure',research.structure||d.structure||e.extent],['Muktika',d.muktika],['Major commentators',d.commentators],['Famous teaching',d.famous]
    ].filter(x=>x[1]);
    return `<aside class="kena-infobox ch-infobox"><div class="kena-infobox-title">${esc(d.title)}</div>${(d.deva||e.sanskritTitle)?`<div class="ch-dev">${esc(d.deva||e.sanskritTitle)}</div>`:''}${image?`<figure class="wiki-infobox-image"><a href="${esc(image.href)}" target="_blank" rel="noopener"><img src="${esc(image.src)}" loading="lazy" alt="${esc(d.title)} textual witness"></a><figcaption>${esc(image.cap||'')}</figcaption></figure>`:''}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  };
  const references=()=>`<section class="kena-section ch-section" id="pr16-references"><h2>References</h2><ol class="ch-reference-list">${currentSources.map((s,i)=>`<li id="pr16-ref-${i+1}"><b>${i+1}.</b> ${esc(s.t)}${s.d?` — ${esc(s.d)}`:''}${s.u?` <a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;

  const close=()=>{shade?.remove();reader?.remove();document.querySelector('.pr16-source-card')?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});};
  const showSource=n=>{const s=currentSources[n-1];if(!s)return;document.querySelector('.pr16-source-card')?.remove();const card=document.createElement('aside');card.className='itihasa-source-card ch-source-card pr16-source-card';card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.t)}</strong>${s.d?`<p>${esc(s.d)}</p>`:''}${s.u?`<a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(card);card.querySelector('button')?.addEventListener('click',()=>card.remove());};

  function open(button,name,d){
    close();const e=extraFor(name);currentSources=sourcesFor(name,d,e);const secs=mergeSections(name,d,e);
    button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up-wiki-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up-wiki-reader ch-wiki-reader pr16-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${d.title} article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(d.title)}</h1>${(d.deva||e.sanskritTitle)?`<div class="up-title-dev">${esc(d.deva||e.sanskritTitle)}</div>`:''}</div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article up-wiki-article ch-wiki-article pr16-article">${infobox(name,d,e)}<div class="kena-lead ch-lead">${leadFor(d,e)}</div><nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${tocHTML(secs)}<li><a href="#pr16-references">References</a></li></ol></nav>${secs.map(sectionHTML).join('')}${references()}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
  }

  document.addEventListener('click',e=>{const b=e.target.closest?.('.shastra-name');if(!b)return;const name=b.dataset.name||b.querySelector('span')?.textContent?.trim()||b.textContent.trim();if(!PRINCIPAL.has(name)||!R[name])return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open(b,name,R[name]);},true);
  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-pr16-note]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.pr16Note));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.pr16-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('pr16-style')){const st=document.createElement('style');st.id='pr16-style';st.textContent=`
    .pr16-article .ch-lead{min-height:390px}.pr16-article .ch-section h3{margin-top:25px!important}.pr16-article .ch-section p{margin-bottom:15px!important}.pr16-article .ch-toc{max-width:680px!important}.pr16-article .ch-toc>ol>li>ol{margin-top:3px!important;margin-bottom:5px!important}.pr16-table-wrap{clear:both;margin:15px 0 22px;overflow-x:auto}.pr16-table{width:100%;border-collapse:collapse;background:#fff;font:13px/1.45 Merriweather,Georgia,serif}.pr16-table th,.pr16-table td{border:1px solid #a2a9b1;padding:8px 10px;text-align:left;vertical-align:top}.pr16-table th{background:#eaecf0;font-weight:700}.pr16-thumb{max-width:300px}.pr16-source-card{font-family:Merriweather,Georgia,serif!important}@media(max-width:760px){.pr16-article .ch-lead{min-height:0}.pr16-table{font-size:12.5px}.pr16-thumb{max-width:none;width:100%}}
  `;document.head.append(st);}
  window.SCRIPTURE_PRINCIPAL_ENCYCLOPEDIA_V16=true;
})();
