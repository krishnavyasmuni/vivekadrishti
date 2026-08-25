(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const previousOpen=window.openScriptureEncyclopedia;

  const SOURCES={
    Mahābhārata:[
      {title:'Wikipedia — Mahābhārata',detail:'Dating, composition, textual growth, early witnesses, northern and southern manuscript traditions, Critical Edition and the received scale of the epic.',url:'https://en.wikipedia.org/wiki/Mahabharata'},
      {title:'Wikipedia — Mahābhārata, Textual history and structure',detail:'Oral transmission, Bhārata/Mahābhārata growth, Pāṇini and Āśvalāyana evidence, the Spitzer manuscript, and Sukthankar’s description of what a critical edition can reconstruct.',url:'https://en.wikipedia.org/wiki/Mahabharata#Textual_history_and_structure'},
      {title:'Wikipedia — Bhandarkar Oriental Research Institute',detail:'The Mahābhārata Critical Edition project began in 1919 and was completed in 1966; the edition was issued in nineteen volumes, with related Harivaṃśa and index volumes.',url:'https://en.wikipedia.org/wiki/Bhandarkar_Oriental_Research_Institute'},
      {title:'Hindupedia — Oriental Research Institutes of India',detail:'Hindupedia’s account of BORI and its Critical Edition of the Mahābhārata, begun in 1919 and completed in 1966.',url:'https://hindupedia.com/en/Oriental_Research_Institutes_of_India'},
      {title:'Wikimedia Commons — Kurukshetra manuscript illustration',detail:'Public-domain manuscript illustration of the Kurukṣetra War, probably eighteenth century.',url:'https://commons.wikimedia.org/wiki/File:Kurukshetra.jpg'},
      {title:'Wikimedia Commons — The Battle of Kurukshetra',detail:'Public-domain Kashmir painting of the Battle of Kurukṣetra, c. 1820.',url:'https://commons.wikimedia.org/wiki/File:The_Battle_of_Kurukshetra.jpg'}
    ],
    Rāmāyaṇa:[
      {title:'Wikipedia — Rāmāyaṇa',detail:'Composition ranges, seven-kāṇḍa structure, northern and southern recensions, manuscript variation, Baroda Critical Edition, commentaries and reception.',url:'https://en.wikipedia.org/wiki/Ramayana'},
      {title:'Wikipedia — Rāmāyaṇa, Recensions',detail:'The two broad northern and southern regional recensions, their long separate oral transmission and the conservative character of the southern tradition.',url:'https://en.wikipedia.org/wiki/Ramayana#Recensions'},
      {title:'Wikipedia — Rāmāyaṇa, Critical edition',detail:'The Baroda Critical Edition compiled in the 1960s and 1970s from dozens of manuscripts collected across India and surrounding regions.',url:'https://en.wikipedia.org/wiki/Ramayana#Critical_edition'},
      {title:'Hindupedia — Rāmāyaṇa',detail:'The received 24,253-verse / 647-sarga count, the Dākṣiṇātya, Gauḍīya and Vāyavya pāṭhas, Sanskrit commentaries, recitation and later Rāmāyaṇa literature.',url:'https://www.hindupedia.com/en/ramayana'},
      {title:'Wikimedia Commons — Battle at Laṅkā',detail:'Sahib Din, Battle at Laṅkā, Mewar Rāmāyaṇa, Udaipur, 1649–1653. Public domain.',url:'https://commons.wikimedia.org/wiki/File:Battle_at_Lanka,_Ramayana,_Udaipur,_1649-53.jpg'},
      {title:'Wikimedia Commons — Rāma returns to Ayodhyā',detail:'Sahib Din, seventeenth-century illustration of Rāma’s return to Ayodhyā. Public domain.',url:'https://commons.wikimedia.org/wiki/File:Rama_returns_to_Ayodhya.jpg'}
    ]
  };

  const C=(work,n)=>`<sup class="itihasa-v8-cite"><button type="button" data-v8-work="${work}" data-v8-note="${n}" aria-label="Source ${n}">${n}</button></sup>`;
  const figure=(src,href,caption,cls='wiki-thumb')=>`<figure class="${cls}"><a href="${href}" target="_blank" rel="noopener"><img src="${src}" loading="lazy" alt="${caption.replace(/<[^>]+>/g,'')}"></a><figcaption>${caption}</figcaption></figure>`;

  const MB_IMG='https://upload.wikimedia.org/wikipedia/commons/8/81/Kurukshetra.jpg';
  const MB_IMG2='https://upload.wikimedia.org/wikipedia/commons/4/4b/The_Battle_of_Kurukshetra.jpg';
  const RAM_IMG='https://upload.wikimedia.org/wikipedia/commons/a/a7/Battle_at_Lanka%2C_Ramayana%2C_Udaipur%2C_1649-53.jpg';
  const RAM_IMG2='https://upload.wikimedia.org/wikipedia/commons/d/d9/Rama_returns_to_Ayodhya.jpg';

  function addInfoboxArt(article,name){
    const box=article.querySelector('.kena-infobox');
    if(!box||box.querySelector('.wiki-infobox-image'))return;
    const title=box.querySelector('.kena-infobox-title');
    const html=name==='Mahābhārata'
      ? figure(MB_IMG,'https://commons.wikimedia.org/wiki/File:Kurukshetra.jpg','Manuscript illustration of the Kurukṣetra War, probably 18th century. <a href="https://commons.wikimedia.org/wiki/File:Kurukshetra.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.','wiki-infobox-image')
      : figure(RAM_IMG,'https://commons.wikimedia.org/wiki/File:Battle_at_Lanka,_Ramayana,_Udaipur,_1649-53.jpg','<i>Battle at Laṅkā</i>, Sahib Din, Mewar Rāmāyaṇa, 1649–1653. <a href="https://commons.wikimedia.org/wiki/File:Battle_at_Lanka,_Ramayana,_Udaipur,_1649-53.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.','wiki-infobox-image');
    title?.insertAdjacentHTML('afterend',html);
  }

  function mbh(article){
    const text=article.querySelector('#mbh-text');
    const witnesses=article.querySelector('#mbh-witnesses');
    const critical=article.querySelector('#mbh-critical');
    const name=article.querySelector('#mbh-name');
    const parvans=article.querySelector('#mbh-parvans');
    if(!text||!critical)return;

    text.id='mbh-composition';
    text.innerHTML=`<h2>Date and composition</h2>
      ${figure(MB_IMG2,'https://commons.wikimedia.org/wiki/File:The_Battle_of_Kurukshetra.jpg','The Battle of Kurukṣetra, Kashmir, c. 1820. Public-domain painting on Wikimedia Commons.')}
      <p>The compact scholarly range used by Wikipedia places the oldest material of the <i>Mahābhārata</i> broadly between <b>c. 8th and 3rd centuries BCE</b>, while the principal compilation of the enormous received work falls between the <b>3rd century BCE and the 4th century CE</b>.${C('Mahābhārata',1)} These are dates for the formation of the surviving Sanskrit text, not a date assigned here to the Kurukṣetra war itself.</p>
      <p>The distinction matters because the Mahābhārata did not begin as a bound book of one hundred thousand verses. Its own opening distinguishes a <i>Bhārata</i> of about 24,000 verses from the larger Mahābhārata with its many subsidiary narratives, and later tradition also speaks of <i>Jaya</i>, <i>Bhārata</i> and <i>Mahābhārata</i>. Modern scholars do not all accept a literal three-stage reconstruction of 8,800, 24,000 and 100,000 verses, but the internal tradition correctly points to growth: the Kuru story became the frame for a much larger body of dharma, myth, pilgrimage, theology and instruction.${C('Mahābhārata',1)}${C('Mahābhārata',2)}</p>
      <p>External evidence helps set limits on that growth. Pāṇini, usually placed in the fourth century BCE, knows the compound <i>mahābhārata</i> and names figures belonging to the epic world, although the word by itself cannot prove that the complete present text already existed. The Āśvalāyana Gṛhyasūtra also distinguishes Bhārata material. By about 200 CE, the Spitzer manuscript provides physical evidence for a large epic tradition, while a sixth-century inscription describes the Mahābhārata as a <i>śata-sāhasrī saṃhitā</i>—a collection of one hundred thousand verses. By then the conception of the work on roughly its received gigantic scale was established.${C('Mahābhārata',2)}</p>
      <p>Composition and transmission are therefore different questions. A passage can preserve old narrative material yet be attested only in much later manuscripts; a celebrated passage can also belong to a regional branch that entered the written record after major manuscript families had separated. That is why the history of the epic cannot be reconstructed merely by choosing the oldest-looking palm leaf or by treating the longest printed edition as the earliest text.${C('Mahābhārata',2)}</p>`;
    witnesses?.remove();

    critical.innerHTML=`<h2>Manuscripts, recensions and the Critical Edition</h2>
      <p>The manuscript history is not a footnote to the Mahābhārata: it explains why two readers can open reputable Sanskrit editions and find different chapter numbers, different verse totals, or passages that are present in one edition and absent from another. The surviving witnesses fall broadly into <b>Northern</b> and <b>Southern</b> recensions, but each of those names hides several regional textual families rather than one uniform manuscript.${C('Mahābhārata',1)}${C('Mahābhārata',2)}</p>
      <h3>The Northern recension</h3>
      <p>The northern manuscript world includes a north-western Kashmiri or Śāradā stream and other northern and eastern witnesses transmitted in regions such as Nepal, Mithilā and Bengal, as well as numerous Devanāgarī copies. These families often agree against the southern witnesses but also disagree among themselves. The familiar early printed Calcutta and Bombay texts belong to this wider northern history, while the enormously influential text associated with Nīlakaṇṭha is an early-modern learned vulgate rather than a neutral photograph of one ancient archetype.${C('Mahābhārata',1)}${C('Mahābhārata',2)}</p>
      <h3>The Southern recension</h3>
      <p>The southern manuscript world is represented especially by Telugu, Grantha and Malayalam transmission. It is often longer and more expansive than the northern forms, but it is not simply “the long version.” Different southern families show different degrees of contact with northern material, and scribes working in multilingual regions could produce mixed texts. The practical result is a network of related versions, not two sealed boxes marked North and South.${C('Mahābhārata',2)}</p>
      <h3>What actually differs</h3>
      <p>The variation is much larger than spelling. Manuscripts can differ in the presence or absence of whole passages, the order of episodes, the size of sub-parvans and even the way the epic is divided. Famous material can therefore be ancient in reception yet secondary in the reconstructed common text. The Gaṇeśa-writing episode at the beginning is the standard easy example: it is immensely famous, but the Critical Edition does not place it in its constituted text because the manuscript evidence does not support it at the earliest recoverable level.${C('Mahābhārata',1)}${C('Mahābhārata',2)}</p>
      <h3>How the Pune edition was made</h3>
      <p>The Bhandarkar Oriental Research Institute began the Critical Edition in <b>1919</b> and completed the eighteen parvans in <b>1966</b>. The project compared manuscripts from India and abroad over forty-seven years and produced a text running to roughly thirteen thousand pages in nineteen volumes, followed by critical work on the Harivaṃśa and indexes.${C('Mahābhārata',3)}${C('Mahābhārata',4)}</p>
      <p>The editors were not trying to discover “Vyāsa’s autograph,” nor did they simply count manuscripts and print whichever reading had the most votes. Their more limited goal was to reconstruct the <b>oldest form recoverable from the surviving manuscript evidence</b>. Agreements between independent textual families were weighed heavily; relationships among witnesses had to be assessed; obviously conflated or heavily contaminated copies could not be treated like independent votes. Material excluded from the constituted text was not destroyed: it was recorded in the critical apparatus and appendices so that the history of regional and later readings remained visible.${C('Mahābhārata',2)}${C('Mahābhārata',3)}</p>
      <p>This is why a Critical Edition chapter count and a traditional or vulgate count can both be worth recording. They answer different questions. The Critical Edition is a reconstruction for textual history; the longer regional and commentarial texts are indispensable witnesses to the Mahābhārata actually copied, taught, interpreted and loved in different Hindu communities.</p>`;

    const lead=article.querySelector('.itihasa-lead');
    const toc=article.querySelector('.itihasa-toc');
    const anchor=toc?.nextElementSibling || lead?.nextElementSibling;
    if(anchor){anchor.before(text);text.after(critical);if(name)critical.after(name);if(parvans&&name)name.after(parvans);}
    if(toc) toc.innerHTML=`<div class="kena-toc-title">Contents</div><ol><li><a href="#mbh-composition">Date and composition</a></li><li><a href="#mbh-critical">Manuscripts, recensions and Critical Edition</a></li><li><a href="#mbh-name">Name and recitation</a></li><li><a href="#mbh-parvans">The eighteen parvans</a></li><li><a href="#mbh-harivamsa">Harivaṃśa</a></li><li><a href="#mbh-commentaries">Sanskrit commentaries</a></li><li><a href="#mbh-transmission">Regional Mahābhāratas</a></li><li><a href="#mbh-reception">Reception</a></li></ol>`;
  }

  function ram(article){
    const form=article.querySelector('#ram-form');
    const rec=article.querySelector('#ram-recensions');
    const kandas=article.querySelector('#ram-kandas');
    const criticalLater=article.querySelector('#ram-critical-translations');
    if(!form||!rec)return;

    let comp=article.querySelector('#ram-composition-v8');
    if(!comp){comp=document.createElement('section');comp.className='kena-section';comp.id='ram-composition-v8';}
    comp.innerHTML=`<h2>Date and composition</h2>
      ${figure(RAM_IMG2,'https://commons.wikimedia.org/wiki/File:Rama_returns_to_Ayodhya.jpg','Rāma returns to Ayodhyā, Sahib Din, 17th century. Public-domain painting on Wikimedia Commons.')}
      <p>The compact range used by Wikipedia places the <b>primary composition of the Vālmīki Rāmāyaṇa around 750–500 BCE</b>, with later stages of textual growth continuing <b>up to about the 3rd century CE</b>.${C('Rāmāyaṇa',1)} These dates concern the formation of the surviving Sanskrit poem. They are not presented as the chronology of Bhagavān Rāma’s life in Hindu sacred history.</p>
      <p>The poem is much more unified in narrative design than the Mahābhārata, but “Vālmīki Rāmāyaṇa” still names a text transmitted for centuries through recitation and manuscripts. The central movement from Ayodhyā through exile, Sītā’s abduction, the alliance with Sugrīva and Hanumān, Laṅkā and the return to Ayodhyā belongs to a coherent epic architecture; at the same time, the surviving witnesses preserve substantial verbal and episodic variation.${C('Rāmāyaṇa',1)}${C('Rāmāyaṇa',2)}</p>
      <p>The received work is seven kāṇḍas and about twenty-four thousand ślokas. Hindupedia gives the fuller received count of <b>24,253 verses in 647 sargas</b>, while Wikipedia summarizes the poem as more than 24,000 verses and roughly 500 sargas because chapter totals depend on recension and edition.${C('Rāmāyaṇa',1)}${C('Rāmāyaṇa',4)}</p>`;

    form.querySelector('h2').textContent='Form and structure';
    form.querySelectorAll('p').forEach(p=>{if(/date range|750|500 BCE|third century/i.test(p.textContent))p.remove();});

    rec.innerHTML=`<h2>Manuscripts, recensions and the Critical Edition</h2>
      <p>“Three recensions” is only the beginning of the story. Hindupedia names three received <i>pāṭhas</i>—<b>Dākṣiṇātya</b> (southern), <b>Gauḍīya</b> (eastern/Bengal) and <b>Vāyavya</b> (north-western).${C('Rāmāyaṇa',4)} Modern textual criticism often describes the same manuscript landscape at a broader level as two great regional recensions, <b>Northern (N)</b> and <b>Southern (S)</b>, because the eastern and north-western streams share enough history to be studied together while still retaining strong local differences.${C('Rāmāyaṇa',2)}</p>
      <h3>Dākṣiṇātya: the southern textual stream</h3>
      <p>The southern tradition is comparatively uniform and conservative. It preserves an archaic textual shape important to modern critical editing, but “southern” still covers manuscripts copied in different regions and scripts rather than one master copy. Its relative conservatism is one reason the Baroda editors repeatedly treated southern evidence as especially important when reconstructing readings shared across the tradition.${C('Rāmāyaṇa',2)}${C('Rāmāyaṇa',3)}</p>
      <h3>Gauḍīya: the eastern/Bengal stream</h3>
      <p>The Gauḍīya pāṭha represents the eastern transmission associated especially with Bengal and neighbouring eastern manuscript culture. It shares the basic Vālmīkian narrative but can differ from southern witnesses in wording, verse order, expansions and omissions. “A recension” therefore means a historically related family of readings, not a different Rāmāyaṇa with a different plot.${C('Rāmāyaṇa',4)}</p>
      <h3>Vāyavya: the north-western stream</h3>
      <p>The Vāyavya pāṭha represents north-western transmission. In modern critical descriptions, north-western and north-eastern/northern witnesses are often discussed inside the broader Northern recension, but their local manuscript histories remain visible. This is why a simple list of three names is misleading: each name points to centuries of copying, regional reading and cross-contact between textual families.${C('Rāmāyaṇa',2)}${C('Rāmāyaṇa',4)}</p>
      <h3>How different are the recensions?</h3>
      <p>The differences are described on Wikipedia as <b>profound verbal differences</b>, produced by long independent oral transmission before the regional texts were fixed in writing.${C('Rāmāyaṇa',2)} They include ordinary substitutions and rearrangements, but also longer expansions, omissions and differences in what material is present at all. A sixth-century West Bengal manuscript famously lacks two kāṇḍas, showing that even the seven-book shape cannot simply be projected backward onto every surviving witness.${C('Rāmāyaṇa',1)}</p>
      <p>This variation is also why the question of Bāla and Uttara cannot be reduced to “real versus fake.” Modern scholars have long discussed whether substantial portions of the first and seventh books belong to later compositional stages, while the received seven-kāṇḍa Vālmīki Rāmāyaṇa is the text that Sanskrit commentators, reciters and later Hindu literature inherited. Historical layering and received scriptural authority are different questions.</p>
      <h3>The Baroda Critical Edition</h3>
      <p>The Oriental Institute of Maharaja Sayajirao University of Baroda produced the major Critical Edition in the <b>1960s and 1970s</b>, using dozens of manuscripts collected from across India and surrounding regions.${C('Rāmāyaṇa',3)} The purpose was not to reproduce whichever manuscript happened to be oldest or most complete. The editors compared witnesses across independent regional families and constituted a research text from readings judged recoverable at their common textual level, while recording important variants separately.</p>
      <p>That method produces a text useful for the history of transmission, but it does not make every reading absent from the constituted text religiously or historically irrelevant. A passage can be secondary to the recoverable common ancestor and still have centuries of commentarial, ritual and devotional authority. For a Hindu encyclopedia, both facts belong on the same page.</p>`;
    criticalLater?.remove();

    const toc=article.querySelector('.itihasa-toc');
    const first=toc?.nextElementSibling;
    if(first){first.before(comp);comp.after(rec);rec.after(form);if(kandas)form.after(kandas);}
    if(toc) toc.innerHTML=`<div class="kena-toc-title">Contents</div><ol><li><a href="#ram-composition-v8">Date and composition</a></li><li><a href="#ram-recensions">Manuscripts, recensions and Critical Edition</a></li><li><a href="#ram-form">Form and structure</a></li><li><a href="#ram-kandas">The seven kāṇḍas</a></li><li><a href="#ram-commentaries">Sanskrit commentaries</a></li><li><a href="#ram-versions">Indian and Asian Rāmāyaṇas</a></li><li><a href="#ram-influence">Festivals, performance and cultural life</a></li><li><a href="#ram-reception">Recitation and reception</a></li></ol>`;
  }

  function enhance(name){
    const article=document.querySelector('.itihasa-human-article');
    if(!article||article.dataset.wikiV8==='1')return;
    article.dataset.wikiV8='1';
    addInfoboxArt(article,name);
    if(name==='Mahābhārata')mbh(article);else if(name==='Rāmāyaṇa')ram(article);
  }

  function showV8Source(work,n){
    const s=SOURCES[work]?.[n-1];if(!s)return;
    document.querySelector('.itihasa-v8-source-card')?.remove();
    const card=document.createElement('aside');card.className='itihasa-source-card itihasa-v8-source-card';
    card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${s.title}</strong><p>${s.detail}</p><a href="${s.url}" target="_blank" rel="noopener">Open source ↗</a>`;
    document.body.append(card);card.querySelector('.itihasa-source-close')?.addEventListener('click',()=>card.remove());
  }
  document.addEventListener('click',e=>{const b=e.target.closest('.itihasa-v8-cite button');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showV8Source(b.dataset.v8Work,Number(b.dataset.v8Note));},true);

  if(!document.getElementById('itihasa-wiki-v8-style')){
    const s=document.createElement('style');s.id='itihasa-wiki-v8-style';s.textContent=`
      .itihasa-v5-reader{max-width:1180px!important}.itihasa-human-article{color:#202122}.itihasa-human-article .kena-section h2{font-family:Georgia,'Times New Roman',serif!important;font-size:1.55rem!important;font-weight:400!important;border-bottom:1px solid #a2a9b1!important;padding-bottom:4px!important;margin-top:34px!important}.itihasa-human-article .kena-section h3{font-family:Arial,sans-serif!important;font-size:1.05rem!important;font-weight:700!important}.itihasa-human-article p{font-family:Arial,sans-serif!important;font-size:15.5px!important;line-height:1.68!important}.itihasa-human-article .kena-lead p{font-size:16px!important;line-height:1.68!important}.itihasa-human-article .kena-infobox{width:320px!important;background:#f8f9fa!important;border:1px solid #a2a9b1!important;padding:3px!important;font-family:Arial,sans-serif!important}.itihasa-human-article .kena-infobox-title{background:#eaecf0!important;font-family:Georgia,'Times New Roman',serif!important;font-size:20px!important}.wiki-infobox-image{margin:4px 0 6px;padding:0;background:#fff}.wiki-infobox-image img{display:block;width:100%;height:auto}.wiki-infobox-image figcaption{padding:5px 6px 6px;font:12px/1.35 Arial,sans-serif;color:#54595d}.wiki-infobox-image a,.wiki-thumb a{color:#36c}.wiki-thumb{float:right;clear:right;width:min(310px,38%);margin:4px 0 18px 24px;padding:3px;border:1px solid #c8ccd1;background:#f8f9fa}.wiki-thumb img{display:block;width:100%;height:auto}.wiki-thumb figcaption{padding:6px 5px 4px;font:12px/1.4 Arial,sans-serif;color:#54595d}.itihasa-human-article .kena-toc{background:#f8f9fa!important;border:1px solid #a2a9b1!important;font-family:Arial,sans-serif!important}.itihasa-v8-cite{vertical-align:super}.itihasa-v8-cite button{border:0;background:transparent;color:#36c;padding:0 1px;font:600 10px/1 Arial,sans-serif;cursor:pointer}.itihasa-human-article .kena-info-row{font-size:12.5px!important}.itihasa-human-article .kena-info-row b{font-family:Arial,sans-serif!important}.itihasa-human-article .kena-section:after{content:'';display:block;clear:both}@media(max-width:760px){.wiki-thumb{float:none;width:100%;max-width:520px;margin:12px auto 18px}.itihasa-human-article .kena-infobox{width:100%!important;float:none!important;margin:0 0 18px!important}.itihasa-human-article p{font-size:15px!important}.itihasa-human-article .kena-section h2{font-size:1.4rem!important}}
    `;document.head.append(s);
  }

  window.openScriptureEncyclopedia=function(button){
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim();
    const kind=button?.dataset?.kind||'';
    const result=typeof previousOpen==='function'?previousOpen(button):false;
    if(result&&kind==='Itihāsa'&&(name==='Mahābhārata'||name==='Rāmāyaṇa')) enhance(name);
    return result;
  };
})();