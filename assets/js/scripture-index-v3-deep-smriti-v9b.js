(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Smṛti:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const KANE='P. V. Kane, History of Dharmasastra';
  const SANG='Dharmashastra-Sangraha and Smritinam Samuccaya Sanskrit collections';
  const LISTS='Yajnavalkya Smriti 1.4–5; Parashara Smriti 1.12–15; Padma Purana Uttarakhanda 263.86–90, as applicable to the individual authority';

  put('Bṛhaspati',{
    sanskritTitle:'बृहस्पतिस्मृतिः',traditionalAuthor:'Brihaspati',language:'Sanskrit verse and reconstructed prose/verse material',period:'Usually placed in the mature classical Dharma-juristic period, broadly c. 4th–6th centuries CE for major recoverable material.',status:'Lost as a complete continuous manuscript; roughly two thousand or more verses have been gathered from citations, with modern reconstructions differing in scope.',
    leadParagraphs:[
      'The Brihaspati Smriti is one of the great lost works of Hindu jurisprudence. Medieval jurists quote it so often—and on such technically detailed questions—that a substantial part of the work can be reconstructed even though no complete independent manuscript survives.',
      'Its strongest surviving profile is Vyavahara: constitution of courts, plaint and reply, evidence, documents, debt, contracts, partnership, property, inheritance, ordeals, punishment and the reasoning judges should use when written rules do not mechanically resolve a case.',
      'This is a case where “lost” must not be confused with “unknown.” Brihaspati’s chapter order is partly reconstructive, but the surviving quotations are extensive enough to reveal a mature legal thinker whose authority stood beside Narada, Katyayana, Manu and Yajnavalkya.'
    ],articleSections:[
      {title:'How a lost Smriti can be reconstructed',paragraphs:[
        'Medieval commentaries and legal digests quote earlier authorities by name. When dozens of independent works cite “Brihaspati” on the same legal topics, editors can collect those verses, compare wording and sometimes recover the order in which later jurists knew them.',
        'Julius Jolly and K. V. Rangaswami Aiyangar were among the scholars who assembled the surviving Brihaspati material. Modern estimates often speak of roughly 2,400 recovered verses, but not every attributed verse has equal textual security.',
        'Reconstruction does not recreate an autograph. A digest can abbreviate, conflate or quote from a secondary recension. The honest scholarly object is therefore a critically arranged corpus of Brihaspati citations.'
      ]},
      {title:'Courts and stages of a lawsuit',paragraphs:[
        'Brihaspati gives one of the most developed classical accounts of Vyavahara. Judicial business begins with a complaint and answer, proceeds through proof, and ends in decision and enforcement. The competence of judges and the constitution of the court receive sustained attention.',
        'The surviving material distinguishes types of disputes and modes of proof. Documents, witnesses and possession are weighed differently depending on the claim, and procedural failure can affect the validity of a case.',
        'This juristic focus marks a different literary profile from Manu’s encyclopedic dharma. Brihaspati assumes that the reader wants to know how a court actually decides a contested transaction.'
      ]},
      {title:'Debt, contracts and commercial law',paragraphs:[
        'Recovered verses discuss loans, interest, surety, repayment, deposits, sale without ownership, partnership and other transactions. Their detail reflects an economy in which merchants, creditors and property-holders required rules beyond household ritual.',
        'Commercial rules sit inside dharma rather than outside it. A valid transaction has formal requirements, but fraudulent intention, coercion and inequitable application can also matter.'
      ]},
      {title:'Documents and evidence',paragraphs:[
        'Brihaspati belongs to the mature documentary phase of Dharma law. Written instruments can be classified by authorship, witnessing and circumstances of execution; a document is evidence, not automatically an unquestionable truth.',
        'The jurist therefore compares documents with possession, witness testimony and surrounding facts. This is one reason Brihaspati is central to the history of Indian procedural law.'
      ]},
      {title:'Reasoning and equity',paragraphs:[
        'Later legal literature attributes to Brihaspati a strong warning against deciding exclusively from the literal wording of a Dharmashastra when such a reading defeats justice. Yukti—reasoned application—has a place in adjudication.',
        'That principle should not be turned into a modern slogan detached from the text, but it accurately reflects a juristic tradition concerned with how general norms operate in difficult cases.'
      ]},
      {title:'Relation to Narada and Katyayana',paragraphs:[
        'Brihaspati, Narada and Katyayana form a specialized classical juristic cluster. Narada survives substantially as an independent legal Smriti, while Brihaspati and Katyayana are largely reconstructed from quotation.',
        'They often share categories and are cited together by medieval digests. Differences among their rules reveal active legal debate rather than a single frozen “Hindu code.”'
      ]},
      {title:'Medieval reception',paragraphs:[
        'Mitakshara, Apararka, Smritichandrika, Viramitrodaya and other legal works preserve Brihaspati because he remained authoritative long after the root manuscript disappeared.',
        'The paradox is historically useful: the loss of the independent book did not end its legal life. Its verses survived embedded in the jurisprudence that continued to cite and interpret them.'
      ]}
    ],sources:merge(D['Smṛti:Bṛhaspati']?.sources,[{title:'Wikipedia — Brihaspati',detail:'Reconstruction of the lost Brihaspati Smriti from later quotations.',url:'https://en.wikipedia.org/wiki/Brihaspati'},'Julius Jolly, fragments/translation of Brihaspati Smriti','K. V. Rangaswami Aiyangar, reconstructed Brihaspati Smriti',KANE,SANG])
  });
  D['Smṛti:Bārhaspatya']=D['Smṛti:Bṛhaspati'];

  put('Kātyāyana',{
    sanskritTitle:'कात्यायनस्मृतिः',traditionalAuthor:'Katyayana',language:'Sanskrit verse',period:'Classical Dharma jurisprudence, commonly placed in the early-to-mid first millennium CE.',status:'No complete original Smriti survives; roughly one thousand Vyavahara verses were collected and critically reconstituted by P. V. Kane, with further fragments known.',
    leadParagraphs:[
      'The Katyayana Smriti is another major legal authority whose original continuous book is lost but whose jurisprudence survives in extensive medieval quotation. Katyayana is particularly strong on documents, evidence, property, partition, inheritance, women’s property and the detailed procedure of civil litigation.',
      'P. V. Kane’s reconstitution of the Vyavahara material gathered about a thousand verses from commentaries and digests. That is enough to reveal a coherent juristic tradition, but not enough to pretend that modern editors possess Katyayana’s original chapter sequence in every detail.'
    ],articleSections:[
      {title:'Reconstructing Katyayana',paragraphs:[
        'The method resembles work on Brihaspati: editors search later Dharma commentaries and nibandhas for verses explicitly attributed to Katyayana, collate variant quotations and group them by legal subject.',
        'Kane’s 1933 Katyayana-smriti-saroddhara became a major scholarly reconstruction of the Vyavahara portion. Additional attributed verses have been collected elsewhere, but their authenticity and placement must be judged individually.'
      ]},
      {title:'Written documents',paragraphs:[
        'Katyayana is one of the principal classical authorities on documentary evidence. Surviving verses distinguish kinds of deeds and documents, discuss signatures and witnesses, and address suspicious, altered or invalid instruments.',
        'A written document can carry great probative force, yet it is evaluated in context. The juristic tradition recognizes that writing can be forged or obtained improperly, so documentary form must be joined to rules of authenticity.'
      ]},
      {title:'Property and partition',paragraphs:[
        'The recovered material treats division of family property, succession across generations, shares of relatives and the effect of previous partition. Later digests repeatedly quote Katyayana when resolving difficult inheritance cases.',
        'The verses show a legal system trying to distinguish joint family interests from separately acquired property and to determine which descendants stand in the place of a deceased heir.'
      ]},
      {title:'Women’s property and inheritance',paragraphs:[
        'Katyayana is important in the history of stridhana and women’s property. Later jurists use his verses when defining forms of women’s wealth, powers of disposal and the order of succession.',
        'Because these rules survive mostly through quotation, a historical account has to distinguish Katyayana’s recoverable wording from the much later legal doctrines built around it by regional schools.'
      ]},
      {title:'Courts and procedure',paragraphs:[
        'Plaint, reply, evidence, burden of proof and judicial decision are treated with the technical precision characteristic of mature Vyavahara literature. Katyayana stands closer to Brihaspati and Narada in this respect than to a general conduct-oriented Smriti.',
        'The king and judges are expected to apply Dharma through an orderly procedure rather than arbitrary command.'
      ]},
      {title:'Temples and endowed property',paragraphs:[
        'Later legal literature also preserves Katyayana in discussions of religious endowments and protected property. These citations became important in modern litigation because medieval rules were sometimes invoked to explain the status of temple assets.',
        'Such modern use should not be confused with the ancient text itself, but it demonstrates the long afterlife of the reconstructed verses.'
      ]},
      {title:'Reception through digests',paragraphs:[
        'Katyayana’s authority is visible in how often later jurists quote him even after the root work disappeared. Mitakshara, Viramitrodaya and other digests preserve his voice as part of the working library of Hindu jurisprudence.',
        'For the encyclopedia, this citation network is the manuscript history: the “witnesses” to Katyayana are often medieval books that embedded pieces of his lost Smriti.'
      ]}
    ],sources:merge(D['Smṛti:Kātyāyana']?.sources,['P. V. Kane, Katyayana-smriti-saroddhara (Vyavahara, reconstructed text and translation, 1933)',KANE,SANG,'K. V. Rangaswami Aiyangar, additional Katyayana fragments'])
  });

  const fragments={
    'Atri':{
      dev:'अत्रिस्मृतिः',lists:'Atri is named by Yajnavalkya and Parashara; the Padma Purana also preserves the related form Atreya in its Rajasa group.',
      survive:'Several Atri-smriti recensions and compilations circulate, but they do not establish one unchanged ancient text behind every verse attributed to Atri.',
      subjects:'Surviving Atri material is especially concerned with achara, purity, gifts, household discipline and prayashchitta. Later nibandhas quote Atri as an authority when comparing rules of conduct and expiation.',
      caution:'The sage Atri is far older than the extant Smriti manuscripts bearing his name. The name establishes traditional authority; manuscript criticism is needed to decide the age of any particular verse.'
    },
    'Hārīta':{
      dev:'हारीतस्मृतिः',lists:'Harita appears in both Yajnavalkya and Parashara and is placed by the Padma Purana among its Sattvika Smritis.',
      survive:'Texts called Harita or Harita-smriti survive in differing forms, while a much larger body of Harita verses is known from quotations in Dharma digests.',
      subjects:'Quoted material covers samskaras, household conduct, purity, food, ashrama duties, penance and religious observance. Some passages became important in later debates over initiation and social-religious eligibility.',
      caution:'“Harita says” in a medieval digest does not guarantee that the verse occurs in every extant Harita manuscript; multiple textual strata stand behind the attribution.'
    },
    'Uśanas':{
      dev:'उशनःस्मृतिः / औशनसस्मृतिः',lists:'Ushanas is named in the Yajnavalkya and Parashara lists; the Padma Purana preserves the adjectival form Aushanas.',
      survive:'No single critically secure complete ancient Ushanas Smriti represents all attributed material. Collections under the names Ushanas and Shukra coexist with quotations in Dharma literature.',
      subjects:'The surviving Dharma verses concern conduct, penance, royal and social rules, while the name Ushanas/Shukra is also attached to separate traditions of polity. Those corpora must not be automatically merged.',
      caution:'The shared sage-name creates a bibliographic trap: Shukraniti, Aushanasa Dharma material and verses cited as Ushanas can belong to different textual histories.'
    },
    'Aṅgiras':{
      dev:'अङ्गिरःस्मृतिः',lists:'Angiras is named by both Yajnavalkya and Parashara as a promulgator of Dharma.',
      survive:'Material attributed to Angiras is preserved mainly through Smriti collections and later quotations rather than one securely reconstructable continuous root text.',
      subjects:'Quoted verses frequently address impurity, expiation, gifts, religious conduct and consequences of offences. Angiras is often cited when later jurists assemble several authorities on one prayashchitta question.',
      caution:'The ancient Vedic identity of the Angiras lineage should not be used to date every Angiras-smriti verse to the Vedic period.'
    },
    'Yama':{
      dev:'यमस्मृतिः',lists:'Yama is included in Yajnavalkya’s list and in the Padma Purana’s Tamasa classification.',
      survive:'A complete early Yama Smriti is not securely extant. Verses attributed to Yama survive in Dharma collections and in the quotations of commentators and nibandhakaras.',
      subjects:'The material naturally gravitates toward justice, sin, impurity, death and expiation, but it also includes ordinary achara. Later authors invoke Yama as a Dharma authority rather than only as the deity who judges the dead.',
      caution:'Mythological statements about Yama and juristic verses labelled Yama-smriti belong to overlapping but not identical bodies of tradition.'
    },
    'Saṃvarta':{
      dev:'संवर्तस्मृतिः',lists:'Samvarta occurs in both Yajnavalkya and Parashara and in the Padma Purana’s Tamasa group under the related form Samvarta.',
      survive:'Short Samvarta-smriti recensions and attributed verses survive, but the relation among them is not sufficient to reconstruct one ancient archetype with certainty.',
      subjects:'Later Dharma authors cite Samvarta especially for penance, purification, ascetic conduct and difficult cases of religious restoration.',
      caution:'The authority is real in the citation tradition even where the original book-history is opaque; the correct object of study is the recensional and quotation network.'
    },
    'Vyāsa':{
      dev:'व्यासस्मृतिः',lists:'Vyasa is named by Yajnavalkya and placed among the Padma Purana’s Sattvika Smritis.',
      survive:'Several Dharma texts and verse collections circulate under Vyasa’s name, including materials sometimes labelled Vyasa Smriti or Vriddha Vyasa; no one printed collection can automatically represent every medieval citation.',
      subjects:'Attributed verses range through purity, shraddha, pilgrimage, conduct, penance and Vyavahara. A separate reconstructed Vyavahara chapter has also been studied from legal citations.',
      caution:'Vyasa is the supreme compiler-sage across many Hindu textual traditions; that breadth makes bibliographic discrimination especially important rather than less important.'
    },
    'Śaṅkha':{
      dev:'शङ्खस्मृतिः',lists:'Shankha is named separately by Yajnavalkya and Parashara and is also famous in the compound Shankha-Likhita tradition.',
      survive:'Shankha, Likhita and Shankha-Likhita materials survive through recensions, collections and extensive quotations. Their boundaries vary across manuscripts and digests.',
      subjects:'The surviving Dharma material includes achara, impurity, food, gifts, penance and legal-social rules. The pair Shankha-Likhita became a standard authority cited by later jurists.',
      caution:'A verse attributed jointly to Shankha-Likhita should not be silently assigned to the independent Shankha recension, and vice versa.'
    },
    'Likhita':{
      dev:'लिखितस्मृतिः',lists:'Likhita is named individually in both Yajnavalkya and Parashara, while later tradition frequently joins him with Shankha.',
      survive:'Independent and joint Shankha-Likhita attributions coexist. The textual tradition is therefore recoverable in pieces rather than as one uncontested Likhita codex.',
      subjects:'Later citations concern conduct, punishment, penance, property and ritual purity. The celebrated Shankha-Likhita story about theft and punishment also made the pair emblematic of strict submission to Dharma.',
      caution:'Narratives about the sages illustrate their authority but are not a substitute for establishing the wording and provenance of a quoted Smriti verse.'
    },
    'Dakṣa':{
      dev:'दक्षस्मृतिः',lists:'Daksha occurs in both Yajnavalkya and Parashara and in the Padma Purana’s Rajasa group.',
      survive:'Daksha-smriti texts and verses circulate in Dharma collections, but the extant forms are later compilatory witnesses rather than a securely dated single ancient composition.',
      subjects:'The work is frequently associated with householder conduct, daily duties, ashrama order, purity, food, gifts and penance.',
      caution:'The Prajapati Daksha of Vedic and Purana narrative provides the traditional authority-name; the date of a Dharma verse must be established from the Smriti transmission itself.'
    },
    'Śātātapa':{
      dev:'शातातपस्मृतिः',lists:'Shatatapa is named by both Yajnavalkya and Parashara.',
      survive:'Texts called Shatatapa and Vriddha-Shatatapa survive in manuscript and printed collections, while many verses are also known from later quotation.',
      subjects:'The authority is particularly prominent in prayashchitta, impurity, purification, gifts and ritual observance. Later digests often invoke Shatatapa where rules of expiation differ among Smritis.',
      caution:'The prefix Vriddha (“elder/expanded”) marks a separate textual form; it should not be collapsed without evidence into every verse ascribed simply to Shatatapa.'
    },
    'Kāśyapa':{
      dev:'काश्यपस्मृतिः',lists:'Kashyapa appears in Parashara and in the Padma Purana’s Sattvika group.',
      survive:'A single complete ancient Kashyapa Dharmashastra is not securely recoverable. Dharma verses under the name survive among broader Kashyapa textual traditions and later citation.',
      subjects:'The recoverable Dharma material includes conduct, purity, ritual and penance, while the name Kashyapa also belongs to important medical, architectural and other technical traditions.',
      caution:'Shared authorship-name is not shared textual identity; Kashyapa Dharma material must be separated from unrelated Kashyapa works.'
    },
    'Garga':{
      dev:'गर्गस्मृतिः',lists:'Garga is named by Parashara among the authorities on Dharma.',
      survive:'No complete early Garga Smriti corresponding neatly to that list-entry is securely preserved. Quotations coexist with much larger Garga traditions in astrology and ritual.',
      subjects:'Dharma citations concern conduct and religious rules, but Garga is far better attested in Jyotisha literature. The list-entry therefore proves Dharma authority without licensing the astrological corpus to stand in for a lost Smriti.',
      caution:'This page must keep Garga the Dharmashastra authority distinct from Gargiya astrological texts unless a manuscript or citation explicitly connects them.'
    },
    'Pracetas':{
      dev:'प्रचेतःस्मृतिः',lists:'Pracetas appears at the close of the Parashara Smriti list of Dharma authorities.',
      survive:'The independent root Smriti is not securely extant; the authority is known through attribution and scattered quotation.',
      subjects:'Later references associate Pracetas with general Dharma, conduct and legal-religious rules, but the surviving corpus is too thin for a responsible reconstructed chapter table.',
      caution:'The catalogue attestation is itself important evidence and should be presented as such rather than inflated into an imaginary complete work.'
    },
    'Bhāradvāja':{
      dev:'भारद्वाजस्मृतिः',lists:'Bharadvaja is placed by the Padma Purana among its Sattvika Smritis.',
      survive:'The sage-name belongs to major Vedic, ritual and technical traditions, but one complete ancient Bharadvaja Smriti matching the Padma list is not securely available.',
      subjects:'Dharma quotations and later collections preserve rules under Bharadvaja’s name, while unrelated Bharadvaja works concern ritual and other shastras.',
      caution:'The page therefore treats the Padma Purana classification as a secure traditional witness and the surviving attributed verses as a separate textual question.'
    },
    'Taittira':{
      dev:'तैत्तिरस्मृतिः',lists:'The Padma Purana’s Rajasa list preserves a Taittira/Taittiriya-type Smriti authority in the reading used by this index.',
      survive:'This is one of the most textually difficult names in the list. It is not securely represented by a famous independent Dharma book under exactly the same title.',
      subjects:'The name may point toward a Taittiriya-associated Dharma authority or a textual form known to the Purana’s compiler, but the evidence does not justify replacing it silently with Apastamba, Baudhayana or another better-known Taittiriya jurist.',
      caution:'Preserving the difficult transmitted name is more scholarly than emending it merely to produce a convenient modern identification.'
    }
  };

  Object.entries(fragments).forEach(([name,x])=>{
    const cur=D[`Smṛti:${name}`]||D[name]||{};
    put(name,{
      sanskritTitle:x.dev,language:'Sanskrit',status:cur.status||'The original textual history is fragmentary, compilatory or uncertain.',
      leadParagraphs:[x.lists,x.survive,x.subjects],
      articleSections:[
        {title:'Traditional attestation',paragraphs:[x.lists,`The appearance of ${name} in a scriptural list is evidence that the name functioned as an acknowledged source of Dharma for the compiler of that witness. The different lists do not agree completely, which is why this index preserves each witness rather than forcing a modern canon of exactly eighteen Smritis.`]},
        {title:'What survives',paragraphs:[x.survive,`Survival through quotation is normal in Dharma literature. Medieval commentators often preserve a verse from a root work whose independent manuscripts later disappeared; conversely, a late compilation can gather genuinely old verses beside newer material.`]},
        {title:'Subjects of the surviving material',paragraphs:[x.subjects,`The surviving profile is therefore reconstructed from the distribution of citations and extant recensions. Where the evidence does not establish a continuous sequence, this page does not invent chapter numbers.`]},
        {title:'Textual problems',paragraphs:[x.caution,`The central scholarly problem is attribution: whether two verses carrying the same sage-name come from one recension, related recensions, a later compilation, or independent remembered traditions. Manuscript catalogues and the citation habits of nibandhas are as important here as printed Smriti collections.`]},
        {title:'How later jurists used the authority',paragraphs:[`Later Dharma writers rarely read ${name} in isolation. They place the attributed rule beside Manu, Yajnavalkya, Vishnu, Narada, Brihaspati, Katyayana and other authorities, then reconcile differences by topic, yuga, circumstance, custom or interpretive principle.`,`That comparative use explains how a partly lost Smriti could remain legally and religiously authoritative for centuries after its root manuscript tradition became obscure.`]},
        {title:'Editions and evidence',paragraphs:[`The principal modern evidence consists of Sanskrit Smriti collections, quotations gathered by P. V. Kane and other Dharma historians, manuscript catalogues, and the primary traditional list-passages that name ${name}. Any future identification of a fuller manuscript should be evaluated against this citation record rather than assumed from the title alone.`]}
      ],sources:merge(cur.sources,[LISTS,KANE,SANG,'Manuscript catalogues and medieval Dharma-nibandha citations'])
    });
  });

  D['Smṛti:Ātreya']=D['Smṛti:Atri'];
  D['Smṛti:Auśanasa']=D['Smṛti:Uśanas'];
  D['Smṛti:Sāṃvarta']=D['Smṛti:Saṃvarta'];
})();