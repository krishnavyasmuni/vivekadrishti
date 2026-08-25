(() => {
  const previousOpen=window.openScriptureEncyclopedia;
  if(typeof previousOpen!=='function')return;
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const plain=x=>typeof x==='string'?x:(x?.claim||x?.text||x?.full||x?.short||x?.title||'');
  const uniq=xs=>[...new Set(xs.map(plain).map(x=>String(x||'').trim()).filter(Boolean))];

  function info(button){const d=button.dataset;return{name:d.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim(),kind:d.kind||'',veda:d.veda||'',branch:d.branch||'',type:d.type||'',sect:d.sect||'',source:d.source||'',group:d.group||'',maha:String(d.maha||'').split(' · ').filter(Boolean),upa:String(d.upa||'').split(' · ').filter(Boolean)};}
  function key(i){if(i.kind==='Upaniṣad')return`Upaniṣad:${i.name}`;if(i.kind==='Smṛti')return`Smṛti:${i.name}`;if(i.kind==='Vedāṅga')return`Vedāṅga:${i.name}`;if(i.kind==='Veda'||['Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind))return`Vedic:${i.name}`;if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind))return`Purāṇa:${i.name}`;return`${i.kind}:${i.name}`;}
  function entry(i){return Object.assign({},D[i.name]||{},D[key(i)]||{});}
  function store(i,e){const k=key(i);D[k]=Object.assign({},D[i.name]||{},D[k]||{},e);}
  function sentence(s){s=String(s||'').trim();if(!s)return'';return/[.!?]$/.test(s)?s:s+'.';}
  function joinSentences(xs){return uniq(xs).map(sentence).join(' ');}
  function titleBody(item){const s=plain(item).trim();const m=s.match(/^([^:]{2,85}):\s*(.+)$/);return m?{title:m[1].trim(),body:m[2].trim()}:{title:'',body:s};}
  function sourceNames(e){return uniq([...arr(e.sources),...arr(e.bibliography),...arr(e.primarySources)]).slice(0,8);}

  const TYPE_CONTEXT={
    'Veda':'A Veda is not a single modern book but a textual tradition made up of school-specific layers. Its Saṃhitās preserve mantras, its Brāhmaṇas explain sacrificial performance, its Āraṇyakas develop symbolic and contemplative interpretation, and its Upaniṣadic materials move further into inquiry about self, reality and liberation. The boundaries between these layers are historical and recensional rather than perfectly uniform.',
    'Saṃhitā':'A Vedic Saṃhitā is the mantra collection of a particular school or recension. Its organization must therefore be read together with the ritual system and oral recitation tradition that preserved it. Printed page order is only one visible surface of a tradition transmitted through accent, memorized sequence and school-specific recitational rules.',
    'Brāhmaṇa':'A Brāhmaṇa is ritual-explanatory Vedic prose. It does not merely list ceremonies: it explains why actions, formulas, priests, metres, implements and myths belong together. Much of its intellectual importance lies in those explanations, because they show how Vedic ritual specialists turned inherited mantra into a connected account of sacrifice, cosmos and human action.',
    'Āraṇyaka':'An Āraṇyaka stands within the Vedic school tradition but often shifts the centre of attention from public performance to symbolic interpretation, meditation and the internal meaning of ritual. It should not be treated as a clean modern genre sitting between Brāhmaṇa and Upaniṣad; in several recensions the boundaries overlap.',
    'Upaniṣad':'An Upaniṣad is transmitted as śruti, but the 108 texts do not all belong to one historical period. Some are early Vedic prose or verse works; others are later Vedāntic, renunciatory, yogic or sectarian compositions. A useful article therefore has to keep two questions apart: what the text teaches, and when the particular Upaniṣad entered the transmitted corpus.',
    'Mahāpurāṇa':'A Purāṇa is a large, layered sacred text rather than a single-topic mythology book. Cosmology, genealogy, pilgrimage, vows, ritual, theology, law, sacred geography and narrative can coexist in the same work. Different manuscript families may preserve different chapter totals and even large blocks of material.',
    'Upapurāṇa':'An Upapurāṇa belongs to the wider Purāṇic world and may be substantial in its own right. The label does not mean “minor in importance”; it reflects traditional catalogue systems that differ from text to text. For some titles a complete work survives, while others are known chiefly through lists, quotations or uncertain manuscript identifications.',
    'Both':'This title is classified differently by different Purāṇic witnesses. That disagreement is itself part of the textual history: the categories Mahāpurāṇa and Upapurāṇa were not fixed by one universally accepted list.',
    'Smṛti':'A Smṛti or Dharma authority belongs to the remembered tradition of dharma. Some names correspond to complete surviving Dharmaśāstras or Dharmasūtras; others survive only through quotations, later compilations or recensional texts. The article must therefore distinguish the authority of the sage-name from the recoverability of one original book.',
    'Vedāṅga':'A Vedāṅga is one of the six technical disciplines attached to Vedic study. Each discipline is represented by a body of texts and school traditions rather than by one universal canonical volume, so its history is the history of a field of learning as well as particular treatises.'
  };

  function lead(i,e){
    const existing=arr(e.leadParagraphs);
    const out=[...existing];
    if(!out.length&&e.overview)out.push(e.overview);
    if(e.significance&&!out.some(x=>plain(x)===e.significance))out.push(e.significance);
    const ctx=TYPE_CONTEXT[i.kind];if(ctx&&!out.some(x=>plain(x)===ctx))out.push(ctx);
    if(i.veda&&['Saṃhitā','Brāhmaṇa','Āraṇyaka','Upaniṣad'].includes(i.kind))out.push(`${i.name} is transmitted in connection with the ${i.veda}${i.branch?`, specifically the ${i.branch} school or recension`:''}. That affiliation matters because Vedic texts were preserved through distinct śākhās with their own ordering, readings, ritual usages and ancillary literature.`);
    return uniq(out).slice(0,4);
  }

  function composition(i,e){
    const ps=[];
    if(e.period)ps.push(e.period);
    if(e.history)ps.push(e.history);
    if(e.milieu)ps.push(e.milieu);
    if(e.datingBasis)ps.push(e.datingBasis);
    if(!ps.length)ps.push(`The surviving evidence does not permit a secure single composition date for ${i.name}. The text has to be placed by language, citation history, manuscript evidence and its relationship to other works in the same tradition.`);
    if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind))ps.push(`Purāṇic dating normally applies to layers rather than to every chapter at once. A passage may preserve older material, yet the received form of the work may include later pilgrimage, ritual or sectarian additions. For that reason an exact range for the extant recension is more useful than pretending that every verse was composed in one year.`);
    if(i.kind==='Smṛti')ps.push(`For Dharma literature, chronology is established by comparison with earlier Dharmasūtras and Smṛtis, legal institutions assumed by the text, vocabulary, citation by later jurists and the history of commentaries. A sage-name by itself is not a modern chronological datum.`);
    if(i.kind==='Upaniṣad')ps.push(`The Veda-association preserved by the Muktikā list is a canonical classification, not by itself a date. Early linguistic form, relation to Brāhmaṇa or Āraṇyaka material, philosophical vocabulary and later sectarian or yogic terminology all have to be weighed separately.`);
    return {title:'Date and composition',paragraphs:uniq(ps)};
  }

  function transmission(i,e){
    const ps=[];
    if(e.manuscripts)ps.push(e.manuscripts);
    if(e.primaryRecensions)ps.push(`The principal recensions or transmitted forms identified for this article are ${arr(e.primaryRecensions).join('; ')}.`);
    if(i.branch)ps.push(`The ${i.branch} designation is not ornamental. It identifies the school or recension through which this form of the text was preserved, and it can affect wording, order, ritual placement and the ancillary works with which the text is studied.`);
    if(e.status)ps.push(e.status);
    arr(e.dependencies).forEach(x=>ps.push(x));
    if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind)){
      if(i.maha.length)ps.push(`As a Mahāpurāṇa, the title is attested in ${i.maha.join('; ')}.`);
      if(i.upa.length)ps.push(`As an Upapurāṇa, the title is attested in ${i.upa.join('; ')}.`);
      if(i.source)ps.push(`The catalogue evidence attached to this index includes ${i.source}.`);
      ps.push(`Purāṇic manuscripts often differ not only in spelling but in chapter order, embedded māhātmyas, supplementary sections and the boundaries of khaṇḍas or saṃhitās. A responsible article therefore identifies which recension or printed edition a chapter number belongs to whenever the evidence is available.`);
    }
    if(i.kind==='Upaniṣad')ps.push(`Later Upaniṣads often survive in relatively late manuscript witnesses even when their doctrinal vocabulary is older. Printed collections also normalize titles and Veda affiliations, so manuscript catalogues, commentarial citations and independent quotations remain important evidence for the history of the individual text.`);
    if(i.kind==='Smṛti'&&/lost|fragment|reconstruct|quotation/i.test(joinSentences([e.status,e.history,e.overview])))ps.push(`Because the work is not preserved as one secure continuous manuscript, modern reconstruction depends on quotations in commentaries and legal digests. Those citations can preserve genuine old material, but they do not always recover the original chapter order or prove that every verse attributed to the sage came from one edition.`);
    if(['Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind))ps.push(`For Vedic literature the oral recension is primary historical evidence. Manuscripts are important, but they are comparatively late witnesses to traditions in which accent, word division, recitation pattern and sequence were stabilized through memorization long before the surviving codices were copied.`);
    return {title:'Manuscripts, recensions and transmission',paragraphs:uniq(ps)};
  }

  function structure(i,e){
    const intro=[];
    if(e.structure)intro.push(e.structure);
    const items=uniq([...arr(e.chapterMap),...arr(e.contents),...arr(e.keyContents)]);
    if(!items.length&&e.booksCount)intro.push(`The received work is divided into ${e.booksCount}. The significance of those divisions depends on the recension and on whether later editors preserve the same boundaries.`);
    const subsections=items.map((x,n)=>{
      const tb=titleBody(x);let t=tb.title||`Part ${n+1}`;let body=tb.body;
      const extra=[];
      if(i.kind==='Upaniṣad')extra.push(`This unit belongs to the teaching sequence of ${i.name}; it should be read in relation to the argument before and after it rather than as an isolated quotation.`);
      else if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind))extra.push(`In the Purāṇic setting this material is part of a larger narrative and ritual architecture, where stories frequently introduce theological, genealogical, pilgrimage or observance material rather than functioning as self-contained tales.`);
      else if(i.kind==='Smṛti')extra.push(`The placement of this material shows how the work organizes dharma: ritual and social rules are commonly linked to procedure, expiation, kingship or stages of life rather than presented as unrelated maxims.`);
      else if(i.kind==='Brāhmaṇa')extra.push(`The passage is significant because Brāhmaṇa prose normally links ritual procedure to explanation: an action is embedded in a theory of correspondences, myth, speech and sacrificial power.`);
      else if(i.kind==='Āraṇyaka')extra.push(`Here the received Vedic ritual world is increasingly interpreted through inward correspondences, meditation or speculative teaching.`);
      else if(i.kind==='Saṃhitā')extra.push(`Its position in the Saṃhitā reflects liturgical or recitational organization rather than the chapter logic of a modern prose book.`);
      return {title:t,paragraphs:[sentence(body),...extra].filter(Boolean)};
    });
    return {title:'Structure and contents',paragraphs:uniq(intro),subsections};
  }

  function doctrines(i,e){
    const ps=[];
    if(e.profile)ps.push(e.profile);
    const themes=uniq(arr(e.themes));
    if(themes.length){
      const usable=themes.filter(x=>x.length>3);
      if(usable.length)ps.push(`The recurring subjects of the text include ${usable.join(', ')}. These are not merely labels: they indicate the problems around which the work repeatedly organizes narrative, ritual instruction or philosophical argument.`);
    }
    if(e.ritualHistory)ps.push(e.ritualHistory);
    if(i.kind==='Upaniṣad')ps.push(`Interpretation of ${i.name} depends on the exact wording of its key passages. Later Vedānta schools may agree that the text is śruti while disagreeing over whether a statement teaches identity, dependence, qualification, devotion, meditation or a graded relation between the individual self and Brahman.`);
    if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind))ps.push(`The theology of a Purāṇa should be reconstructed from sustained passages and narrative patterns, not merely from the deity named in its title. Many Purāṇas preserve mixed material, and a Vaiṣṇava, Śaiva, Śākta, Saura or Brahmā-oriented section can coexist with material that emerged in another devotional or regional environment.`);
    if(i.kind==='Smṛti')ps.push(`Dharmaśāstra is prescriptive literature. Its rules are arguments about right order, ritual competence, family, kingship, property, penance and social duty; they are not a transparent census of how every Hindu community actually behaved in every period.`);
    if(['Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind))ps.push(`The religious world of this text is inseparable from performance. Deities, metres, formulas, priests, offerings and ritual sequences are not background decoration; they are the grammar through which the text explains relations between human action and cosmic order.`);
    if(i.kind==='Vedāṅga')ps.push(`${i.name} became important because Vedic tradition required technical precision. The discipline therefore links theory to practice: its rules exist to make recitation, ritual, grammatical analysis, semantic interpretation, metre or calendrical timing work reliably.`);
    return {title:i.kind==='Smṛti'?'Dharma, law and religious practice':i.kind==='Vedāṅga'?'Method and technical purpose':'Teaching, theology and religious practice',paragraphs:uniq(ps)};
  }

  function reception(i,e){
    const ps=[];
    if(e.reception)ps.push(e.reception);
    if(e.significance)ps.push(e.significance);
    arr(e.scholarlyPositions).forEach(x=>ps.push(x));
    arr(e.scholarlyDebates).forEach(x=>ps.push(x));
    if(e.hazraNotes)ps.push(e.hazraNotes);
    if(i.kind==='Upaniṣad')ps.push(`The history of an Upaniṣad is also the history of how it was read. Sanskrit bhāṣyas, sectarian citations, later anthologies and vernacular teaching traditions can elevate a short text far beyond what its manuscript size might suggest. Where a named traditional commentary is known, it should be treated as evidence for reception rather than folded into the wording of the Upaniṣad itself.`);
    if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind))ps.push(`Purāṇic reception often takes place outside full-book reading. Individual māhātmyas, vrata chapters, deity narratives, genealogies and ritual sections circulate independently in recitation, pilgrimage handbooks, temple traditions and later compilations. A famous episode may therefore have a reception history larger than the recension in which modern editors print it.`);
    if(i.kind==='Smṛti')ps.push(`Later nibandhas and commentaries often determine how a Smṛti was actually used. A rule that is brief in the root text may acquire extensive interpretation through jurists who reconcile it with Manu, Yājñavalkya, Nārada, Purāṇic passages, regional practice and earlier commentators.`);
    if(['Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind))ps.push(`Later ritual manuals, Mīmāṃsā discussions and Vedāntic interpretation preserve the afterlife of Vedic passages. Their authority did not depend on becoming popular narrative literature; it continued through recitation, śrauta practice, commentary and citation.`);
    if(i.kind==='Vedāṅga')ps.push(`The later history of the discipline extends beyond the earliest Vedāṅga texts. Grammar develops through Pāṇini, Kātyāyana and Patañjali; prosody through Piṅgala and later chandas literature; ritual through large sūtra traditions; and jyotiṣa through increasingly mathematical astronomy and astrology. The early Vedāṅga is therefore the beginning of a technical lineage, not its final form.`);
    return {title:'Commentary, reception and scholarship',paragraphs:uniq(ps)};
  }

  function editions(i,e){
    const refs=sourceNames(e);const ps=[];
    if(refs.length)ps.push(`Important works used for the study of this entry include ${refs.join('; ')}.`);
    if(['Veda','Saṃhitā','Brāhmaṇa','Āraṇyaka'].includes(i.kind))ps.push(`A serious edition of a Vedic text has to record accent, recensional readings and the relation between saṃhitā-pāṭha and analytical or school-specific recitations where these survive. Translation alone cannot substitute for the underlying Sanskrit textual tradition.`);
    if(i.kind==='Upaniṣad')ps.push(`For the principal Upaniṣads, editions and translations can be checked against traditional commentaries and critical modern work. For many minor Upaniṣads, the first task is more basic: identifying the Sanskrit text, its manuscript family, its title variants and its relation to the Muktikā canon.`);
    if(['Mahāpurāṇa','Upapurāṇa','Both'].includes(i.kind))ps.push(`Purāṇic scholarship is unusually dependent on edition-awareness. Chapter numbers from one printed recension may not match another, and a translation can silently follow a regional or expanded text. Citations on this site should therefore retain the edition or recension whenever that information is known.`);
    if(i.kind==='Smṛti')ps.push(`For surviving Dharma texts, critical editions and early commentaries are indispensable because later legal interpretation can preserve variant readings. For fragmentary Smṛtis, the basic scholarly work is reconstruction from quotations and comparison among the digests that cite them.`);
    if(i.kind==='Vedāṅga')ps.push(`The relevant primary literature is broader than the six category names. Each discipline has its own root texts, commentarial traditions and later technical literature, so the bibliography should point readers toward the actual works through which the discipline was transmitted.`);
    return {title:'Editions and sources',paragraphs:uniq(ps)};
  }

  function enrich(button){
    const i=info(button);if(i.kind==='Itihāsa'||(i.kind==='Upaniṣad'&&i.name==='Kena'))return;
    const e=entry(i);if(!e||e.__depthV6)return;
    const old=arr(e.articleSections);
    const preserve=old.filter(s=>s&&s.title&&/skandha|aṃśa|amsa|khaṇḍa|kanda|book|chapter|contents|theology|reception|manuscript|textual history|date|composition/i.test(String(s.title)));
    const generated=[composition(i,e),transmission(i,e),structure(i,e),doctrines(i,e),reception(i,e),editions(i,e)];
    const seen=new Set();const merged=[];
    [...preserve,...generated].forEach(s=>{if(!s||!s.title)return;const k=s.title.toLowerCase();if(seen.has(k))return;seen.add(k);merged.push(s);});
    e.leadParagraphs=lead(i,e);
    e.articleSections=merged;
    e.__depthV6=true;
    store(i,e);
  }

  window.openScriptureEncyclopedia=function(button){enrich(button);return previousOpen(button);};
  window.SCRIPTURE_DEPTH_ENGINE_V6=true;
})();