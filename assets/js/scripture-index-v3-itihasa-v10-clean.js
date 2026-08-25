(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;
  const previousOpen = window.openScriptureEncyclopedia;

  const commonRoman = s => String(s ?? '')
    .replace(/Ś/g,'Sh').replace(/ś/g,'sh')
    .replace(/Ṣ/g,'Sh').replace(/ṣ/g,'sh')
    .replace(/Ṛ/g,'Ri').replace(/ṛ/g,'ri')
    .replace(/Ṝ/g,'Ri').replace(/ṝ/g,'ri')
    .replace(/Ṅ/g,'Ng').replace(/ṅ/g,'ng')
    .replace(/Ñ/g,'Ny').replace(/ñ/g,'ny')
    .replace(/Ṃ|Ṁ/g,'M').replace(/ṃ|ṁ/g,'m')
    .replace(/Ḥ/g,'H').replace(/ḥ/g,'h')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');

  const exactReplacements = [
    [
      'The compact scholarly range used by Wikipedia places the oldest material of the <i>Mahābhārata</i> broadly between <b>c. 8th and 3rd centuries BCE</b>, while the principal compilation of the enormous received work falls between the <b>3rd century BCE and the 4th century CE</b>.',
      'The oldest recoverable layers of the <i>Mahābhārata</i> are generally placed between <b>c. 8th and 3rd centuries BCE</b>; the principal compilation of the received epic belongs broadly to the <b>3rd century BCE–4th century CE</b>.'
    ],
    [
      'The compact range used by Wikipedia places the <b>primary composition of the Vālmīki Rāmāyaṇa around 750–500 BCE</b>, with later stages of textual growth continuing <b>up to about the 3rd century CE</b>.',
      'The <b>primary composition of the Vālmīki Rāmāyaṇa is commonly placed around 750–500 BCE</b>, with later stages of textual growth continuing <b>up to about the 3rd century CE</b>.'
    ],
    [
      'The differences are described on Wikipedia as <b>profound verbal differences</b>, produced by long independent oral transmission before the regional texts were fixed in writing.',
      'The recensions differ substantially in wording, verse order, expansions and omissions, reflecting long periods of partly independent transmission before the surviving regional manuscript families were fixed in writing.'
    ],
    [
      'Hindupedia names three received <i>pāṭhas</i>—<b>Dākṣiṇātya</b> (southern), <b>Gauḍīya</b> (eastern/Bengal) and <b>Vāyavya</b> (north-western).',
      'Three major received <i>pāṭhas</i> are commonly distinguished: <b>Dākṣiṇātya</b> (southern), <b>Gauḍīya</b> (eastern/Bengal) and <b>Vāyavya</b> (north-western).'
    ],
    [
      'Modern textual criticism often describes the same manuscript landscape at a broader level as two great regional recensions, <b>Northern (N)</b> and <b>Southern (S)</b>, because the eastern and north-western streams share enough history to be studied together while still retaining strong local differences.',
      'At a broader level, the manuscript evidence is often grouped into <b>Northern (N)</b> and <b>Southern (S)</b> recensions. The northern grouping includes eastern and north-western families that remain distinguishable from one another; the southern grouping likewise contains several manuscript lines rather than a single uniform text.'
    ],
    [
      'The Sanskrit Mahābhārata was transmitted for centuries before the medieval manuscript record from which modern editions are constructed. Its own bardic and recitational frames fit that history: a large inherited narrative could be expanded by genealogies, pilgrimage catalogues, exemplary tales, theological dialogues and instructions without ceasing to be the Mahābhārata. Modern scholarship therefore treats the received epic as a layered textual tradition whose major compilation belongs broadly between the third century BCE and fourth century CE, while Wikipedia’s infobox gives the older material a wider range of approximately the eighth to third centuries BCE.',
      'The Sanskrit Mahābhārata was transmitted for centuries before the medieval manuscript record from which modern editions are constructed. Its bardic and recitational frames accord with that history: an inherited Kuru narrative accumulated genealogies, pilgrimage catalogues, exemplary tales, theological dialogues and instruction while remaining recognizably the Mahābhārata. Its oldest recoverable layers are usually placed between roughly the eighth and third centuries BCE, while the principal compilation of the received work extends from about the third century BCE to the fourth century CE.'
    ],
    [
      'The familiar received text has seven kāṇḍas and about twenty-four thousand ślokas. Wikipedia summarizes the work as roughly five hundred sargas, while Hindupedia gives a received count of 24,253 verses in 647 sargas, a useful reminder that chapter and verse totals vary with recension and edition.',
      'The familiar received text has seven kāṇḍas and about twenty-four thousand ślokas. Chapter totals vary by recension and edition; one common received count gives 24,253 verses in 647 sargas, while other editions divide substantially the same narrative material differently.'
    ],
    [
      'The date range in the infobox follows the compact chronology used by Wikipedia: primary composition approximately 750–500 BCE, with later additions extending to the third century CE.',
      'The primary composition is commonly placed around 750–500 BCE, with later additions extending to about the third century CE.'
    ],
    [
      'The Sanskrit Rāmāyaṇa survives in several major textual streams. Hindupedia names three pāṭhas: Dākṣiṇātya, the southern recension; Gauḍīya, associated with Bengal; and Vāyavya, the north-western recension. The main Wikipedia article groups the evidence more broadly into northern and southern traditions and stresses that they descend from a common oral source while differing substantially in wording and passage content.',
      'The Sanskrit Rāmāyaṇa survives in several major textual streams. Three received pāṭhas are commonly distinguished: Dākṣiṇātya in the south, Gauḍīya in the east, and Vāyavya in the north-west. For stemmatic and comparative purposes these witnesses are also frequently grouped into broader Northern and Southern recensions. The two classifications operate at different levels: the broader families describe large lines of transmission, while the named pāṭhas preserve more specific regional histories.'
    ],
    [
      'The Rāmāyaṇa possesses a large Sanskrit commentary literature. Hindupedia lists Nāgoji Bhaṭṭa’s <i>Tilaka</i> or <i>Rāmābhirāmī</i>, Śivasahāya’s <i>Śiromaṇi</i>, Govindarāja’s <i>Bhūṣaṇa</i>, Maheśvara Tīrtha’s <i>Tattvadīpa</i>, the <i>Rāmānujīyavyākhyā</i> associated with Kandāla Rāmānuja, Varadarāja’s <i>Vivekatilaka</i>, Tryambakarāja’s <i>Dharmakūṭavyākhyā</i> and Rāmānanda Tīrtha’s <i>Rāmāyaṇa-kūṭa-vyākhyā</i>. Wikipedia’s commentary survey likewise notes a corpus of roughly thirty-three commentaries and identifies the <i>Tilaka</i>, <i>Bhūṣaṇa</i> and <i>Śiromaṇi</i> as the especially prominent <i>ṭīkātraya</i>.',
      'The Rāmāyaṇa possesses a large Sanskrit commentary literature. Important works include Nāgoji Bhaṭṭa’s <i>Tilaka</i> or <i>Rāmābhirāmī</i>, Śivasahāya’s <i>Śiromaṇi</i>, Govindarāja’s <i>Bhūṣaṇa</i>, Maheśvara Tīrtha’s <i>Tattvadīpa</i>, the <i>Rāmānujīyavyākhyā</i> associated with Kandāla Rāmānuja, Varadarāja’s <i>Vivekatilaka</i>, Tryambakarāja’s <i>Dharmakūṭavyākhyā</i> and Rāmānanda Tīrtha’s <i>Rāmāyaṇa-kūṭa-vyākhyā</i>. The <i>Tilaka</i>, <i>Bhūṣaṇa</i> and <i>Śiromaṇi</i> are often treated together as the prominent <i>ṭīkātraya</i>.'
    ],
    [
      'The Sanskrit poem has a continuing life in ceremonial and devotional recitation. Hindupedia notes especially Rāmanavamī and Navarātri recitations, while Sundara Kāṇḍa has developed a particularly strong independent practice of reading or chanting.',
      'The Sanskrit poem has a continuing life in ceremonial and devotional recitation. Rāmanavamī and Navarātri are important occasions for recitation, while Sundara Kāṇḍa has developed an especially strong independent practice of reading and chanting.'
    ],
    [
      'The point is not a neat list of “themes” but the architecture of the war itself. Each violation becomes precedent for the next, and Kṛṣṇa\'s arguments repeatedly invoke earlier breaches when ordinary rules are appealed to selectively.',
      'The sequence of violations gives the war much of its moral structure. Each breach becomes a precedent for the next, and Kṛṣṇa repeatedly invokes earlier violations when the rules of combat are later appealed to selectively.'
    ],
    [
      'This is not merely “popular culture” attached after the text: performance and recitation have been major means by which the Rāmāyaṇa has been learned, interpreted and remembered.',
      'Performance and recitation have long been primary means through which the Rāmāyaṇa has been learned, interpreted and remembered.'
    ]
  ];

  function rewriteProse(article) {
    article.querySelectorAll('p').forEach(p => {
      let html = p.innerHTML;
      for (const [from,to] of exactReplacements) html = html.replace(from,to);
      html = html
        .replace(/According to Wikipedia,?\s*/gi,'')
        .replace(/According to Hindupedia,?\s*/gi,'')
        .replace(/Wikipedia (?:says|states|notes|describes|summarizes)\s+/gi,'')
        .replace(/Hindupedia (?:says|states|notes|describes|summarizes|lists)\s+/gi,'')
        .replace(/Wikipedia’s infobox gives/gi,'The usual scholarly chronology gives')
        .replace(/The main Wikipedia article groups/gi,'Textual criticism groups');
      if (html !== p.innerHTML) p.innerHTML = html;
    });
  }

  function normalizeVisibleNames(container) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script,style,[lang="sa-Deva"],.itihasa-source-card')) continue;
      node.nodeValue = commonRoman(node.nodeValue);
    }
  }

  function addDevanagariTitle(reader, name) {
    const h1 = reader.querySelector('.kena-article-head h1');
    if (!h1) return;
    h1.textContent = name === 'Mahābhārata' ? 'Mahabharata' : 'Ramayana';
    let sub = reader.querySelector('.itihasa-devanagari-title');
    if (!sub) {
      sub = document.createElement('div');
      sub.className = 'itihasa-devanagari-title';
      h1.insertAdjacentElement('afterend', sub);
    }
    sub.textContent = name === 'Mahābhārata' ? 'महाभारतम्' : 'रामायणम्';
  }

  function polish(name) {
    const reader = document.querySelector('.itihasa-v5-reader');
    const article = reader?.querySelector('.itihasa-human-article');
    if (!reader || !article || article.dataset.cleanV10 === '1') return;
    article.dataset.cleanV10 = '1';
    rewriteProse(article);
    normalizeVisibleNames(reader);
    addDevanagariTitle(reader, name);
  }

  if (!document.getElementById('itihasa-clean-v10-style')) {
    const s = document.createElement('style');
    s.id = 'itihasa-clean-v10-style';
    s.textContent = `
      .itihasa-v5-reader{max-width:1160px!important;background:#f7f4ee!important}
      .itihasa-v5-reader .kena-article-head{background:#fbfaf7!important;border-bottom:1px solid rgba(74,66,56,.16)!important;padding-bottom:17px!important}
      .itihasa-v5-reader .kena-article-head h1{margin-bottom:2px!important;color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:40px!important;font-weight:400!important;line-height:1.08!important}
      .itihasa-devanagari-title{color:#746b61;font-family:'Noto Serif Devanagari','Nirmala UI',serif;font-size:18px;line-height:1.3;margin:1px 0 4px}
      .itihasa-v5-reader .kena-article-head .eyebrow{color:#7a7168!important;font-family:Merriweather,Georgia,serif!important;font-size:11px!important;letter-spacing:.08em!important}
      .itihasa-v5-reader .kena-article-scroll{background:#fbfaf7!important}
      .itihasa-human-article{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important}
      .itihasa-human-article p,.itihasa-human-article li,.itihasa-human-article dd,.itihasa-human-article dt,.itihasa-human-article .itihasa-internal p{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:16.1px!important;line-height:1.66!important;font-weight:400!important}
      .itihasa-human-article p{margin:0 0 17px!important}
      .itihasa-human-article .kena-lead p{font-size:16.5px!important;line-height:1.68!important}
      .itihasa-human-article .kena-section{margin-top:28px!important}
      .itihasa-human-article .kena-section h2{margin:30px 0 15px!important;padding:0 0 6px!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:28px!important;font-weight:400!important;line-height:1.18!important;border-bottom:1px solid rgba(0,120,122,.32)!important}
      .itihasa-human-article .kena-section h3{margin:22px 0 9px!important;color:#4a433b!important;font-family:Vollkorn,Georgia,serif!important;font-size:21px!important;font-weight:500!important;line-height:1.24!important}
      .itihasa-human-article a,.itihasa-human-article .kena-toc a,.itihasa-human-article .wiki-thumb a,.itihasa-human-article .wiki-infobox-image a{color:#5b3ec4!important;text-decoration:none!important}
      .itihasa-human-article a:hover{text-decoration:underline!important}
      .itihasa-human-article .itihasa-cite button,.itihasa-human-article .itihasa-v8-cite button,.itihasa-human-article .itihasa-note-link{color:#5b3ec4!important;font-family:Merriweather,Georgia,serif!important}
      .itihasa-human-article .kena-toc{background:#f3f0ea!important;border:1px solid rgba(86,76,64,.24)!important;color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;box-shadow:none!important}
      .itihasa-human-article .kena-toc-title{color:#006f71!important;font-family:Vollkorn,Georgia,serif!important;font-size:19px!important;font-weight:500!important}
      .itihasa-human-article .kena-infobox{width:310px!important;background:#f3f0ea!important;border:1px solid rgba(86,76,64,.28)!important;color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;box-shadow:none!important}
      .itihasa-human-article .kena-infobox-title{background:rgba(0,120,122,.07)!important;color:#3c362e!important;font-family:Vollkorn,Georgia,serif!important;font-size:21px!important;font-weight:500!important}
      .itihasa-human-article .kena-info-row,.itihasa-human-article .kena-info-row b,.itihasa-human-article .kena-info-row span{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;font-size:12.3px!important}
      .itihasa-human-article .wiki-thumb,.itihasa-human-article .wiki-infobox-image{background:#f3f0ea!important;border-color:rgba(86,76,64,.25)!important}
      .itihasa-human-article .wiki-thumb figcaption,.itihasa-human-article .wiki-infobox-image figcaption{color:#6c635a!important;font-family:Merriweather,Georgia,serif!important;font-size:11.8px!important;line-height:1.42!important}
      .itihasa-human-article b,.itihasa-human-article strong{color:#302b26!important;font-family:Merriweather,Georgia,serif!important;font-weight:700!important}
      .itihasa-source-card{color:#3c362e!important;font-family:Merriweather,Georgia,serif!important;background:#fbfaf7!important}
      .itihasa-source-card a{color:#5b3ec4!important}
      @media(max-width:760px){
        .itihasa-v5-reader .kena-article-head h1{font-size:34px!important}
        .itihasa-devanagari-title{font-size:16px}
        .itihasa-human-article p,.itihasa-human-article li,.itihasa-human-article .itihasa-internal p{font-size:15.6px!important;line-height:1.64!important}
        .itihasa-human-article .kena-section h2{font-size:25px!important}
        .itihasa-human-article .kena-section h3{font-size:19.5px!important}
      }
    `;
    document.head.appendChild(s);
  }

  window.openScriptureEncyclopedia = function(button) {
    const name = button?.dataset?.name || button?.querySelector?.('span')?.textContent?.trim();
    const kind = button?.dataset?.kind || '';
    const result = typeof previousOpen === 'function' ? previousOpen(button) : false;
    if (result && kind === 'Itihāsa' && (name === 'Mahābhārata' || name === 'Rāmāyaṇa')) polish(name);
    return result;
  };
})();