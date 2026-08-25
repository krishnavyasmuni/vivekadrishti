(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Vedic:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const WIKI_YV={title:'Wikipedia — Yajurveda',detail:'White/Black Yajurveda recensions, Samhita structures, ritual contents and attached texts.',url:'https://en.wikipedia.org/wiki/Yajurveda'};
  const WIKI_SB={title:'Wikipedia — Shatapatha Brahmana',detail:'Madhyandina and Kanva recensions, 14/17 books, 100/104 chapters and major ritual contents.',url:'https://en.wikipedia.org/wiki/Shatapatha_Brahmana'};
  const WIKI_TS={title:'Wikipedia — Taittiriya Shakha',detail:'Seven-kanda Taittiriya Samhita, Taittiriya Brahmana and ten-prapathaka Aranyaka.',url:'https://en.wikipedia.org/wiki/Taittiriya_Shakha'};
  const WIKI_TB={title:'Wikipedia — Taittiriya Brahmana',detail:'Three ashtakas, 28 prapathakas and ritual distribution.',url:'https://en.wikipedia.org/wiki/Taittir%C4%ABya_Br%C4%81hma%E1%B9%87a'};
  const WIKI_AV={title:'Wikipedia — Atharvaveda',detail:'Twenty books, Shaunaka and Paippalada recensions, organization and subject range.',url:'https://en.wikipedia.org/wiki/Atharvaveda'};
  const WIKI_GB={title:'Wikipedia — Gopatha Brahmana',detail:'Atharvavedic Brahmana, Purva/Uttara divisions and dating debate.',url:'https://en.wikipedia.org/wiki/Gopatha_Brahmana'};
  const EGG='Julius Eggeling, The Satapatha-Brahmana, Sacred Books of the East';
  const KEITH='A. B. Keith, The Veda of the Black Yajus School: Taittiriya Samhita';
  const WIT='Michael Witzel, studies of Vedic schools, chronology and Black Yajurveda traditions';
  const GONDA='Jan Gonda, Vedic Literature: Samhitas and Brahmanas';
  const WHIT='William Dwight Whitney, Atharva-Veda Samhita';
  const BLOOM='Maurice Bloomfield, Atharvavedic studies';

  put('Śukla Yajurveda',{
    sanskritTitle:'शुक्लयजुर्वेदः',language:'Vedic Sanskrit',period:'Received Samhita broadly c. 1200–800 BCE; Brahmana and Aranyaka layers extend later into the first millennium BCE.',primaryRecensions:['Madhyandina','Kanva'],
    leadParagraphs:[
      'The Shukla or White Yajurveda is the Yajurvedic tradition in which sacrificial formulas are collected in the Vajasaneyi Samhita and their extended explanations are transmitted separately in the Shatapatha Brahmana. This separation is the most visible contrast with the Krishna or Black Yajurveda, whose Samhitas interweave mantra and explanatory prose.',
      'Two complete recensional lines dominate the surviving White Yajurveda: Madhyandina and Kanva. Both preserve a forty-chapter Vajasaneyi Samhita and a corresponding Shatapatha Brahmana, but the Brahmana recensions differ substantially in book order, chapter totals, wording and the arrangement of the final Aranyaka-Upanishad material.'
    ],articleSections:[
      {title:'Vajasaneyi Samhita and ritual sequence',paragraphs:['The forty chapters of the Vajasaneyi Samhita follow the great architecture of Yajurvedic ritual, from new- and full-moon offerings to Agnihotra, Soma, royal consecration, fire-altar construction, Sautramani, Ashvamedha, funeral formulas and the final Isha Upanishad.'],books:[
        {number:'1–2',title:'New and full moon sacrifices',summary:'Formulas for Darshapurnamasa, one of the basic recurring solemn rites.'},
        {number:3,title:'Agnihotra and seasonal rites',summary:'Daily milk oblation and Caturmasya seasonal sacrifice.'},
        {number:'4–8',title:'Soma sacrifice',summary:'Consecration, Soma acquisition, pressings, offerings and associated formulas.'},
        {number:'9–10',title:'Vajapeya and Rajasuya',summary:'Royal and prestige rites, including consecration and the famous chariot-race element of Vajapeya.'},
        {number:'11–18',title:'Agnicayana',summary:'Formulas for construction of the layered fire altar, including the bird-shaped altar and elaborate cosmological correspondences.'},
        {number:'19–21',title:'Sautramani',summary:'A restorative rite associated with Indra, Soma and recovery from excess or disorder.'},
        {number:'22–25',title:'Ashvamedha',summary:'Royal horse-sacrifice formulas and its complex multi-day performance.'},
        {number:'26–29',title:'Supplementary formulas',summary:'Additional mantras related to preceding rites and extensions of the ritual repertoire.'},
        {number:'30–31',title:'Purushamedha and cosmic person',summary:'Symbolic human-victim lists and the celebrated Purusha material linking social/cosmic totality with sacrifice.'},
        {number:'32–34',title:'Sarvamedha and universal offering',summary:'Universalizing sacrificial material, including highly speculative prayers and formulas.'},
        {number:35,title:'Funerary rite',summary:'Pitriyajna and cremation-related mantras for ancestors.'},
        {number:'36–39',title:'Pravargya',summary:'Formulas associated with the heated milk offering and the highly distinctive Pravargya rite.'},
        {number:40,title:'Isha Upanishad',summary:'A compact Upanishadic poem on the Lord, Self, action, knowledge and seeing the Self in all beings.'}
      ]},
      {title:'Madhyandina and Kanva',paragraphs:['The Madhyandina Samhita has forty chapters and 303 anuvakas in a common count; the Kanva recension also has forty chapters but a different subdivision and somewhat different verse total. The differences are not merely orthographic: recensional order and local readings matter for ritual and Upanishadic citation.','Their corresponding Shatapatha Brahmanas diverge even more visibly. Madhyandina has fourteen kandas and exactly one hundred adhyayas; Kanva has seventeen kandas and 104 adhyayas, with several ritual books ordered differently.']},
      {title:'Why “White” Yajurveda',paragraphs:['The old contrast between White and Black refers to textual organization. In the White tradition the mantra collection stands apart from the main explanatory Brahmana; in the Black traditions mantra and Brahmana-like prose are mixed inside the Samhita.','This difference shaped the architecture of each school’s canon and is one reason Shatapatha can be read as an enormous separate commentary on the Vajasaneyi ritual sequence.']},
      {title:'Aranyaka and Upanishad',paragraphs:['The final Shatapatha books move from ritual exposition into Pravargya, symbolic speculation and the Brihadaranyaka Upanishad. The Isha Upanishad, by contrast, already appears as chapter 40 of the Samhita itself.','The White Yajurveda therefore contains two of the most influential Upanishads in very different textual locations: Isha at the end of the mantra collection and Brihadaranyaka at the end of the great Brahmana-Aranyaka tradition.']}
    ],sources:merge([], [WIKI_YV,WIKI_SB,EGG,WIT,GONDA])
  });

  ['Vājasaneyi Saṃhitā (Mādhyandina)','Vājasaneyi Saṃhitā (Kāṇva)'].forEach((name,idx)=>{
    const rec=idx===0?'Madhyandina':'Kanva'; const count=idx===0?'303 anuvakas and about 1,975 mantras in a common count':'328 anuvakas and about 2,086 mantras in a common count';
    put(name,{sanskritTitle:idx===0?'वाजसनेयिमाध्यन्दिनसंहिता':'वाजसनेयिकाण्वसंहिता',language:'Vedic Sanskrit',period:'Broadly c. 1200–800 BCE for the received Yajurvedic mantra compilation.',extent:`40 adhyayas; ${count}`,primaryRecensions:[rec],leadParagraphs:[
      `${name} is the ${rec} recension of the White Yajurveda mantra collection. Its forty chapters supply the formulas used across the great Shrauta ritual system, from recurring domestic-solemn offerings to Soma, royal consecration, Agnicayana, Ashvamedha and the final Isha Upanishad.`,
      `The recension is paired with the ${rec} Shatapatha Brahmana, which supplies the detailed ritual explanation transmitted separately from the Samhita.`
    ],articleSections:[
      {title:'Forty chapters and the ritual year',paragraphs:['The sequence is strongly ritual rather than literary. Chapters 1–2 treat new- and full-moon rites; chapter 3 Agnihotra and seasonal ceremonies; 4–8 Soma; 9–10 Vajapeya and Rajasuya; 11–18 Agnicayana; 19–21 Sautramani; 22–25 Ashvamedha; 26–29 supplements; 30–31 Purushamedha; 32–34 Sarvamedha; 35 funerary formulas; 36–39 Pravargya; and 40 the Isha Upanishad.','The organization allows the Shatapatha Brahmana to comment on ritual sequences with close correspondence between mantra and explanatory prose.']},
      {title:'Recensional differences',paragraphs:[`The ${rec} text shares the broad forty-chapter architecture with the other surviving Vajasaneyi recension but differs in anuvaka division, individual readings and details of arrangement.`,idx===0?'Madhyandina became especially influential in North Indian transmission and supplies the one-hundred-chapter Shatapatha recension familiar from Eggeling’s translation.':'Kanva has a major southern and western transmission and is paired with a seventeen-book Shatapatha whose arrangement differs significantly from Madhyandina.']},
      {title:'Isha as chapter 40',paragraphs:['The final chapter is the Isha or Ishavasya Upanishad. Its presence inside the Samhita makes it textually different from Upanishads that belong to a later Aranyaka layer.','The two Vajasaneyi recensions differ slightly in verse count and ordering within Isha, which is why some editions print seventeen verses and others eighteen.']},
      {title:'Ritual and textual use',paragraphs:['Yajurvedic formulas accompany action: placing, offering, building, consecrating, reciting and moving through the sacrifice. Their meaning is therefore inseparable from the procedure explained in Shatapatha and the attached Srautasutras.','Modern citation by chapter and mantra should retain the recension where a reading is not identical across Madhyandina and Kanva.']}
    ],sources:merge(D[`Vedic:${name}`]?.sources,[WIKI_YV,EGG,WIT,'Ralph T. H. Griffith, The Texts of the White Yajurveda'])});
  });

  ['Śatapatha Brāhmaṇa (Mādhyandina)','Śatapatha Brāhmaṇa (Kāṇva)'].forEach((name,idx)=>{
    const rec=idx===0?'Madhyandina':'Kanva';
    put(name,{sanskritTitle:'शतपथब्राह्मणम्',language:'Vedic Sanskrit',traditionalAuthor:idx===0?'Yajnavalkya Vajasaneya':'Kanva-school tradition',period:'Layered c. 900–600 BCE for major strata; late books approach the early Upanishadic period.',extent:idx===0?'14 kandas, 100 adhyayas':'17 kandas, 104 adhyayas',primaryRecensions:[rec],leadParagraphs:[
      `The ${rec} Shatapatha Brahmana is one of the largest and most intellectually ambitious Vedic prose works. It explains White-Yajurveda sacrifice in extraordinary detail and repeatedly turns ritual procedure into mythology, cosmology, etymology and reflection on speech, time, person and creation.`,
      `Its received ${idx===0?'fourteen':'seventeen'}-book arrangement includes Agnihotra, new/full-moon rites, Soma, royal sacrifices, Agnicayana, Ashvamedha, Pravargya and the final Brihadaranyaka layer. The two recensions share a large common tradition but differ in sequence, wording and subdivision.`
    ],articleSections:[
      {title:'Recensional architecture',paragraphs:[idx===0?'Madhyandina contains fourteen kandas and exactly one hundred adhyayas. The first nine books closely explain the first eighteen chapters of the Vajasaneyi Samhita; the remaining five move into newer ritual and speculative material, ending in the Brihadaranyaka Upanishad.':'Kanva contains seventeen kandas and 104 adhyayas. It preserves many of the same ritual complexes as Madhyandina but rearranges them: separate books for Vajapeya, Rajasuya, an additional Agniciti division, Pravargya and Brihadaranyaka make its macrostructure visibly different.','The title “Shatapatha,” often understood as “of a hundred paths/lessons,” applies to both recensions even though Kanva has more than one hundred adhyayas.']},
      {title:'Sacrifice as cosmology',paragraphs:['The text does not treat ritual as a sequence of unexplained commands. Every brick, chant, animal, vessel, number and direction can become the object of an explanatory correspondence. The sacrificer is linked to Prajapati; the altar to the year and cosmos; ritual reconstruction to the restoration of a dismembered cosmic totality.','This symbolic method reaches extraordinary complexity in the Agnicayana books, where the layered fire altar is constructed through thousands of bricks and mapped onto time, body and universe.']},
      {title:'Major narratives',paragraphs:['Shatapatha preserves versions of narratives that later become central to Hindu sacred literature: Manu and the flood, the boar raising the earth, the dwarf Vishnu and the winning of the worlds, Pururavas and Urvashi, and many stories about Prajapati, Indra and ritual origins.','These narratives are embedded in ritual argument. Their later Purana-like appearance should not erase the earlier function they have here as explanations of sacrificial power and cosmic precedent.']},
      {title:'Kingship and great rites',paragraphs:['Rajasuya and Vajapeya construct royal authority through sacrificial action; Ashvamedha universalizes sovereignty on an even larger scale. Shatapatha is therefore a major source for Vedic political theology as well as priestly ritual.','The king is not merely blessed by priests: the rite creates a sacred status through consecration, Soma, symbolic conquest and carefully staged relationships with the social order.']},
      {title:'From Pravargya to Brihadaranyaka',paragraphs:['The final ritual strata include the dangerous and highly sacralized Pravargya. Beyond that lies the Brihadaranyaka material, where ritual symbolism opens into some of the oldest sustained Upanishadic debates on Self, Brahman, death, knowledge and liberation.','The transition is historically important because it shows that the Brihadaranyaka does not arise outside Vedic ritual culture; it is transmitted at the end of the largest surviving Brahmana of the White Yajurveda.']},
      {title:'Textual criticism and translation',paragraphs:[`The ${rec} recension must be cited as a recension, not as if every Shatapatha manuscript had the same chapter order.`,idx===0?'Eggeling’s Sacred Books of the East translation follows Madhyandina and made that recension especially familiar in English-language scholarship.':'Kanva editions provide an indispensable control on Madhyandina, revealing different orderings and readings in the same White-Yajurveda ritual tradition.','Comparing the two helps distinguish old shared prose from recensional reorganization and later school-specific development.']}
    ],sources:merge(D[`Vedic:${name}`]?.sources,[WIKI_SB,WIKI_YV,EGG,WIT,GONDA])});
  });

  ['Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Mādhyandina)','Śatapatha Āraṇyaka / Bṛhadāraṇyaka layer (Kāṇva)'].forEach((name,idx)=>{
    const rec=idx===0?'Madhyandina':'Kanva';
    put(name,{sanskritTitle:'बृहदारण्यकस्तरः',language:'Vedic Sanskrit',period:'Late Shatapatha and early Upanishadic horizon, broadly c. 700–500 BCE for major philosophical strata.',primaryRecensions:[rec],leadParagraphs:[
      `The ${rec} Shatapatha Aranyaka/Brihadaranyaka layer is the final forest and speculative portion of the White-Yajurveda Brahmana tradition. It links late ritual exposition—especially Pravargya and Ashvamedha—to the Brihadaranyaka Upanishad.`,
      'The slash in the modern label is deliberate. There is no universal boundary where every manuscript cleanly ends “Brahmana,” begins “Aranyaka,” and then starts “Upanishad.” The received school tradition moves through those layers continuously.'
    ],articleSections:[
      {title:'Place at the end of Shatapatha',paragraphs:[idx===0?'In Madhyandina the Aranyaka material belongs to the fourteenth kanda, whose later adhyayas constitute the Brihadaranyaka Upanishad.':'In Kanva the corresponding final material appears in the seventeenth kanda, with a different arrangement and readings from Madhyandina.','The position makes the text a direct continuation of White-Yajurveda sacrificial speculation rather than an independent philosophical anthology added from outside.']},
      {title:'Pravargya and symbolic ritual',paragraphs:['Pravargya is one of the most esoteric solemn rites, centred on a heated vessel and milk offering. Late Shatapatha material interprets it through cosmic and bodily symbolism, exactly the kind of reasoning conventionally associated with an Aranyaka layer.']},
      {title:'Brihadaranyaka transition',paragraphs:['The Upanishadic chapters contain creation accounts, the horse-sacrifice meditation, Yajnavalkya’s debates, Maitreyi, Gargi, the Inner Controller, “neti neti,” karma, rebirth and the analysis of consciousness.','The philosophical range is immense, but the textual setting matters: the arguments reuse ritual language and often transform sacrificial categories into knowledge of Self and Brahman.']},
      {title:'Recensional differences',paragraphs:[`The ${rec} form should be compared with the other White-Yajurveda recension because order and readings differ. Modern critical study of the Brihadaranyaka regularly prints or discusses both traditions rather than assuming one is simply a copy of the other.`]}
    ],sources:merge(D[`Vedic:${name}`]?.sources,[WIKI_SB,{title:'Wikipedia — Brihadaranyaka Upanishad',url:'https://en.wikipedia.org/wiki/Brihadaranyaka_Upanishad',detail:'Structure, Yajnavalkya dialogues and recensional context.'},EGG,'Patrick Olivelle, The Early Upanishads'])});
  });

  put('Kṛṣṇa Yajurveda',{
    sanskritTitle:'कृष्णयजुर्वेदः',language:'Vedic Sanskrit',period:'Major surviving Samhitas broadly c. 1200–900 BCE with different internal relative chronologies.',primaryRecensions:['Taittiriya','Maitrayani','Kathaka','Kapisthala-Katha'],
    leadParagraphs:[
      'The Krishna or Black Yajurveda preserves Yajurvedic schools in which sacrificial formulas and explanatory Brahmana prose are interwoven within the Samhita itself. Four major Samhita recensions survive wholly or in substantial part: Taittiriya, Maitrayani, Kathaka and Kapisthala-Katha.',
      'The name “Black” describes this mixed textual organization, not theological darkness. These recensions are among the richest sources for reconstructing the development of Vedic ritual because parallel passages can be compared across independent schools.'
    ],articleSections:[
      {title:'Four surviving recensions',paragraphs:['Taittiriya has seven kandas and became the most widely preserved Black-Yajurveda school. Maitrayani has four kandas and preserves archaic arrangements. Kathaka has five kandas and a distinctive Caraka school history. Kapisthala-Katha survives fragmentarily and is closely related to Kathaka.','Ancient literature remembers many more Yajurvedic schools, so the surviving four represent only part of a once much wider recensional landscape.']},
      {title:'Mixed mantra and Brahmana prose',paragraphs:['A Black-Yajurveda Samhita can move from a formula to prose explanation without leaving the Samhita. This allows modern scholars to compare layers of ritual interpretation that the White Yajurveda transmits in a separate Brahmana.','The mixed form is one reason internal stratification matters: not every prose explanation is necessarily the same age as the mantra beside it.']},
      {title:'Ritual range',paragraphs:['The surviving Samhitas cover new/full-moon rites, animal offerings, Soma, Rajasuya, Agnicayana, long sessions, optional sacrifices and numerous specialized rituals. Their parallels often preserve different mythic rationales or procedural sequences.']},
      {title:'Associated Brahmanas, Aranyakas and Upanishads',paragraphs:['Taittiriya has a large separate Brahmana and Aranyaka in addition to the mixed Samhita. Kathaka preserves an Aranyaka and the Katha Upanishad; Maitrayani leads into the Maitri/Maitrayaniya Upanishad; Vadhula material preserves another Black-Yajurveda school outside the dominant Taittiriya line.']}
    ],sources:merge([], [WIKI_YV,WIKI_TS,KEITH,WIT,GONDA])
  });

  put('Taittirīya Saṃhitā',{
    sanskritTitle:'तैत्तिरीयसंहिता',language:'Vedic Sanskrit',period:'Broadly c. 1100–900 BCE for the received compilation, with internal layers.',extent:'7 kandas, 42 prapathakas',primaryRecensions:['Taittiriya'],
    leadParagraphs:[
      'The Taittiriya Samhita is the most widely preserved Black-Yajurveda Samhita. Its seven kandas mix sacrificial formulas with explanatory prose and range from new/full-moon rites and Soma to Rajasuya, Agnicayana and long sacrificial sessions.',
      'The fourth kanda is especially famous in later Hindu practice because it contains the Shri Rudram/Namakam and Chamakam in the midst of Agnicayana material. The text also preserves early forms of myths and ritual ideas that later reappear in Brahmana and Purana literature.'
    ],articleSections:[
      {title:'Seven kandas',paragraphs:['The received arrangement is broad enough to show the full Black-Yajurveda ritual system.'],books:[
        {number:1,title:'Kanda 1',summary:'New/full-moon sacrifice, Soma preliminaries, Agni-Soma victim, Soma cups, rekindling of fire and Rajasuya material.'},
        {number:2,title:'Kanda 2',summary:'Special animal and optional sacrifices, with further exposition of new/full-moon rites.'},
        {number:3,title:'Kanda 3',summary:'Supplements to Soma sacrifice and optional/occasional offerings.'},
        {number:4,title:'Kanda 4',summary:'Agnicayana construction, preparation of the fire-pan and altar, brick layers, the Shri Rudram in 4.5 and Chamakam in 4.7, and related fire theology.'},
        {number:5,title:'Kanda 5',summary:'Continuation of the fire-altar construction and placement of bricks and ritual powers.'},
        {number:6,title:'Kanda 6',summary:'Extended exposition of Soma sacrifice, gifts and associated offerings.'},
        {number:7,title:'Kanda 7',summary:'Ekaha, Ahina and Sattra rites, culminating in the long Gavam Ayana session.'}
      ]},
      {title:'Shri Rudram and Agnicayana',paragraphs:['Taittiriya Samhita 4.5 contains the Namakam, a litany of salutations to Rudra across terrifying, protective, pastoral, natural and social forms. Chapter 4.7 contains the Chamakam, a rhythmic series of requests for the powers and goods required for a complete life and sacrifice.','Their location inside Agnicayana is historically significant. Later Shaiva devotion gave these passages an enormous independent liturgical life, but in the Samhita they belong to a Black-Yajurveda ritual sequence.']},
      {title:'Black-Yajurveda style',paragraphs:['The text alternates formula and explanation. A mantra can be followed by prose explaining why it is used, what myth establishes it or what symbolic result it achieves.','Comparison with Maitrayani and Kathaka often reveals older or alternative versions of the same ritual complex and is central to reconstructing Yajurvedic textual history.']},
      {title:'Commentary and editions',paragraphs:['A. B. Keith translated the Samhita in the Harvard Oriental Series. Traditional Sanskrit transmission includes the commentaries of Bhatta Bhaskara and Sayana-associated scholastic traditions.','Because the Taittiriya school remains ritually active, the text continues to be encountered both through critical study and living recitation.']}
    ],sources:merge(D['Vedic:Taittirīya Saṃhitā']?.sources,[WIKI_TS,WIKI_YV,KEITH,WIT])
  });

  const black=[
    ['Maitrāyaṇī Saṃhitā','मैत्रायणीसंहिता','4 kandas; 54 prapathakas in a common count','Maitrayani','The Maitrayani Samhita is one of the oldest surviving Black-Yajurveda recensions and often preserves fuller or differently ordered ritual prose than the younger Taittiriya redaction.','Its four-kanda architecture includes new/full-moon, Soma, royal and fire rituals in a form especially valuable for comparison with Kathaka and Taittiriya.'],
    ['Kāṭhaka Saṃhitā','काठकसंहिता','5 kandas; 40 prapathakas; about 3,093 mantras in a common count','Kathaka/Caraka','The Kathaka Samhita is the Black-Yajurveda text of the Katha or Caraka-Katha school, traditionally connected with Katha, a disciple of Vaishampayana.','It preserves extensive ritual explanation and often gives fuller versions of passages that Taittiriya abbreviates. Its school was once widespread across northern India and Kashmir.'],
    ['Kapiṣṭhala-Kaṭha Saṃhitā','कपिष्ठलकठसंहिता','Fragmentary; traditional organization associated with 5 kandas and 6 major divisions','Kapisthala-Katha','The Kapisthala-Katha Samhita is a closely related sister recension of Kathaka, but survives only in substantial fragments rather than as a complete continuous text.','Its fragments are indispensable because they preserve a fifth Black-Yajurveda witness and reveal readings outside both Taittiriya and the main Kathaka transmission.']
  ];
  black.forEach(([name,dev,extent,rec,l1,l2],idx)=>put(name,{sanskritTitle:dev,language:'Vedic Sanskrit',period:'Early Black-Yajurveda period, broadly early first millennium BCE; relative chronology differs by recension.',extent,primaryRecensions:[rec],leadParagraphs:[l1,l2],articleSections:[
    {title:'Recensional structure',paragraphs:[extent+'.',idx===0?'Maitrayani is transmitted in several sub-recensional forms and is especially important for preserving archaic Black-Yajurveda material.':idx===1?'The Kathaka tradition is associated with the Carakas in ancient sources and preserves a large northern ritual corpus.':'The incomplete state means modern editors reconstruct sequence from surviving manuscript blocks and comparison with Kathaka.']},
    {title:'Ritual contents',paragraphs:['The Samhita covers the standard Yajurvedic world of new/full-moon offerings, animal sacrifice, Soma, royal rites, fire ritual and optional ceremonies, but the arrangement and explanatory detail differ from other Black-Yajurveda schools.','Those differences are the reason the text matters: a parallel ritual can preserve an older myth, a longer instruction or a different sequence that clarifies how the shared Yajurvedic tradition developed.']},
    {title:'Comparison with other Black Yajurvedas',paragraphs:[idx===2?'Kapisthala is particularly close to Kathaka, but it is not simply a scribal copy. Its independent readings help identify where the Katha tradition itself had recensional depth.':'Comparison with Taittiriya, Kathaka, Kapisthala and Maitrayani lets scholars separate school-specific redaction from ritual material inherited before the recensions diverged.']},
    {title:'Transmission and survival',paragraphs:[idx===2?'The recension is extinct as a complete living textual tradition and survives in fragments, some without full accentual notation. The gaps must be left as gaps rather than silently supplied from Kathaka.':idx===1?'The school’s historical geography includes Kashmir and northern/eastern India, and the surviving text reflects a major ritual tradition that later became much less widespread than Taittiriya.':'The text survives as a complete major recension but is less widely represented in modern ritual life than Taittiriya. Its manuscripts and editions remain central to comparative Yajurveda philology.']}
  ],sources:merge(D[`Vedic:${name}`]?.sources,[WIKI_YV,WIT,GONDA,'L. von Schroeder, Black-Yajurveda editions'])}));

  put('Taittirīya Brāhmaṇa',{
    sanskritTitle:'तैत्तिरीयब्राह्मणम्',language:'Vedic Sanskrit',traditionalAuthor:'Tittiri/Taittiriya school tradition',period:'First millennium BCE; includes material both comparable in age to later Samhita strata and later Brahmana development.',extent:'3 ashtakas, 28 prapathakas',
    leadParagraphs:[
      'The Taittiriya Brahmana supplements the already mixed mantra-prose Taittiriya Samhita with three additional ashtakas of ritual exposition. It contains both mantras and prose, covering fire ritual, Agnihotra, Vajapeya, Soma, nakshatra rites, Sautramani, expiation, Ashvamedha and specialized fire constructions.',
      'Because the Taittiriya Samhita itself already contains Brahmana-like explanation, this separate Brahmana is not simply “the commentary that comes after the Samhita.” It preserves ritual material not incorporated into the Samhita and includes strata of differing age.'
    ],articleSections:[
      {title:'Three ashtakas',paragraphs:['The common structure has three major books and twenty-eight prapathakas.'],books:[
        {number:1,title:'Ashtaka 1 — Parakshudra',summary:'Establishment of Agni, calendrical/solar material, Vajapeya, Soma, nakshatras and a range of specialized rites.'},
        {number:2,title:'Ashtaka 2 — Agnihotra',summary:'Agnihotra, Dasahotra, subsidiary offerings, Kaukila Sautramani, savas and desire-motivated sacrifices.'},
        {number:3,title:'Ashtaka 3 — diverse major rites',summary:'Nakshatra offerings, new/full-moon rites, Purushamedha material, Ishtis, animal ritual, expiation, Ashvamedha, Savitra and Naciketa fire constructions, and Caturhotra/Vaishvasrij rites.'}
      ]},
      {title:'Nakshatras and ritual time',paragraphs:['The Brahmana contains important material on lunar mansions and the ritual calendar. Nakshatras are not treated as later horoscope signs but as markers within sacrificial timing and deity association.','This material helps trace the development from Vedic calendrical practice into later Jyotisha without collapsing the two into one system.']},
      {title:'Naciketa and later Upanishadic resonance',paragraphs:['The Naciketa fire appears in the Brahmana as a ritual construction. The later Katha Upanishad transforms Naciketas into the famous boy who questions Yama about death and immortality.','The shared name does not make the Brahmana passage identical with the Upanishadic story, but it shows how ritual names and motifs could acquire new philosophical life.']},
      {title:'Textual transmission',paragraphs:['Different modern counts of anuvakas occur because editions divide long prose units differently. The stable macrostructure is the three ashtakas and twenty-eight prapathakas.','Traditional commentaries by Bhatta Bhaskara and Sayana-associated traditions are important for ritual interpretation, while modern editions compare the Brahmana with the Taittiriya Samhita and Srautasutras.']}
    ],sources:merge(D['Vedic:Taittirīya Brāhmaṇa']?.sources,[WIKI_TB,WIKI_TS,KEITH,GONDA])
  });

  put('Vādhūla Brāhmaṇa / Anvākhyāna',{
    sanskritTitle:'वाधूलब्राह्मणम् / अन्वाख्यानम्',language:'Vedic Sanskrit',status:'Fragmentarily preserved within the Vadhula ritual tradition; not available as a single complete Brahmana comparable to Shatapatha.',period:'Black-Yajurveda Brahmana period; individual strata vary.',
    leadParagraphs:[
      'The Vadhula Brahmana or Anvakhyana preserves ritual-exegetical material from the Vadhula school of the Black Yajurveda. It is especially valuable because it represents a school outside the dominant Taittiriya line.',
      'The text is fragmentary and closely tied to Vadhula Srautasutra transmission. Its surviving passages therefore have to be studied as school fragments and parallel ritual explanations rather than expanded into a fictitious complete table of contents.'
    ],articleSections:[
      {title:'Vadhula school context',paragraphs:['The Vadhulas belonged to the Black-Yajurveda ritual world and preserved their own procedures, explanations and readings. Later survival was much thinner than Taittiriya, so every securely identified passage adds evidence for recensional diversity.']},
      {title:'Anvakhyana material',paragraphs:['“Anvakhyana” indicates supplementary explanation or exposition. The surviving Vadhula material is embedded around the ritual sutra tradition and preserves Brahmana-style prose explaining actions, myths and ritual effects.','Its textual boundaries are therefore less like a modern independent volume and more like a partially preserved layer of school teaching.']},
      {title:'Why fragments matter',paragraphs:['A fragment can preserve a ritual sequence or mythic explanation older than a later full recension. Comparison with Taittiriya, Maitrayani and Kathaka helps locate shared Black-Yajurveda inheritance and Vadhula innovation.','The correct scholarly treatment is to state what survives, where it survives and what parallel texts illuminate it—not to fill missing chapters from another school.']}
    ],sources:merge(D['Vedic:Vādhūla Brāhmaṇa / Anvākhyāna']?.sources,[WIKI_YV,WIT,'Studies of Vadhula ritual literature'])
  });

  put('Taittirīya Āraṇyaka',{
    sanskritTitle:'तैत्तिरीयारण्यकम्',language:'Vedic Sanskrit',period:'Late Vedic period; layered from ritual Aranyaka material into classical early Upanishadic strata.',extent:'10 prapathakas',
    leadParagraphs:[
      'The Taittiriya Aranyaka is one of the largest and best-preserved forest texts. Its ten prapathakas move from altar and solar ritual through study, Chaturhotra, Pravargya and funeral rites into the Taittiriya Upanishad and the Mahanarayana tradition.',
      'The work makes the fluid boundary between Aranyaka and Upanishad impossible to miss. Prapathakas 7–9 are the Taittiriya Upanishad, while the tenth is transmitted as the Mahanarayana Upanishad in a major recension.'
    ],articleSections:[
      {title:'Ten prapathakas',paragraphs:['The received macrostructure is unusually clear.'],books:[
        {number:1,title:'Eastern altar / solar material',summary:'Ritual and theological material connected with the Uttara Vedi and calendrical/cosmic symbolism.'},
        {number:2,title:'Vedic study',summary:'Rules and reflections on personal recitation, discipline and the sacred work of svadhyaya.'},
        {number:3,title:'Chaturhotra mantras',summary:'Formula collections and ritual material associated with the four Hotr system.'},
        {number:4,title:'Pravargya mantras',summary:'Mantras for the heated-vessel Pravargya rite.'},
        {number:5,title:'Pravargya Brahmana',summary:'Detailed prose explanation of Pravargya procedure and symbolism.'},
        {number:6,title:'Pitrimedha',summary:'Funeral and ancestor rites, showing the Aranyaka’s connection with death and post-mortem ritual.'},
        {number:7,title:'Shikshavalli',summary:'Phonetics, discipline, invocations and convocation ethics; first part of the Taittiriya Upanishad.'},
        {number:8,title:'Brahmanandavalli',summary:'Brahman as truth, knowledge and infinity; five sheaths and the graduated analysis of bliss.'},
        {number:9,title:'Bhriguvalli',summary:'Bhrigu’s successive inquiry through food, breath, mind, knowledge and bliss.'},
        {number:10,title:'Mahanarayana',summary:'A large collection of mantras and meditations oriented toward Narayana, Rudra, Surya and many Vedic deities, varying significantly by recension.'}
      ]},
      {title:'Pravargya',paragraphs:['Prapathakas 4–5 preserve one of the most esoteric solemn rites. The heated mahavira vessel, milk offering and dangerous ritual heat are interpreted through myth and cosmic symbolism.','The Pravargya Brahmana demonstrates why an Aranyaka cannot be reduced to quiet forest philosophy: highly technical ritual remains at its core even as its meaning becomes increasingly symbolic.']},
      {title:'Taittiriya Upanishad inside the Aranyaka',paragraphs:['Prapathakas 7–9 are the three vallis of the Taittiriya Upanishad. Their famous teachings on phonetics, teacher-student discipline, five sheaths, Brahman and bliss remain textually embedded in the larger Aranyaka.','The connection explains why the Upanishad can begin with recitational training and social ethics before moving into metaphysical inquiry.']},
      {title:'Recensional tenth prapathaka',paragraphs:['The Mahanarayana material varies significantly across South Indian recensions. Verse order and total count differ, so chapter/anuvaka citations should identify the edition used.','Its liturgical life became enormous because many mantras are used independently in later Vedic and temple practice.']}
    ],sources:merge(D['Vedic:Taittirīya Āraṇyaka']?.sources,[WIKI_TS,{title:'Wikipedia — Aranyaka',url:'https://en.wikipedia.org/wiki/Aranyaka',detail:'Taittiriya Aranyaka structure and embedded Upanishads.'},'Jan E. M. Houben, The Pravargya Brahmana of the Taittiriya Aranyaka',GONDA])
  });

  put('Maitrāyaṇīya Āraṇyaka',{
    sanskritTitle:'मैत्रायणीयारण्यकम्',language:'Vedic Sanskrit',period:'Late Vedic to early classical Upanishadic transition; textual boundaries overlap the Maitri/Maitrayaniya Upanishad tradition.',
    leadParagraphs:[
      'The Maitrayaniya Aranyaka is the forest/speculative layer of the Maitrayani Black-Yajurveda school. Its surviving identity is closely bound to the Maitri or Maitrayaniya Upanishad and to late school material rather than to a universally standardized independent Aranyaka volume.',
      'The text belongs to a ritual school whose Samhita already interweaves mantra and explanation. Its Aranyaka-level speculation develops questions of Self, mind, time, breath and meditation that become much more explicit in the Maitri Upanishad.'
    ],articleSections:[
      {title:'School setting',paragraphs:['The Maitrayani school is one of the four surviving Black-Yajurveda recensions. Its forest literature therefore has to be read against the Maitrayani Samhita’s own ritual and prose traditions rather than reconstructed from Taittiriya.']},
      {title:'Relation to Maitri Upanishad',paragraphs:['The Maitri/Maitrayaniya Upanishad is the best-known philosophical text of the school and displays layered composition, sixfold yoga, analysis of mind, time and gunas, and increasingly systematized terminology.','The Aranyaka label marks the school environment from which this speculative corpus emerges; editions differ in how they name and separate the units.']},
      {title:'Textual caution',paragraphs:['Because titles such as Maitrayaniya Aranyaka and Maitri Upanishad overlap in catalogues, a responsible article should give the actual manuscript or edition boundary rather than invent a fixed ten- or fifteen-chapter structure by analogy with other Aranyakas.']},
      {title:'Historical significance',paragraphs:['The school is important for tracing the movement from older Yajurvedic ritual speculation into a later intellectual world shared with emerging Samkhya and Yoga vocabulary. That development can be seen without treating the Aranyaka as a post-Vedic break from ritual tradition.']}
    ],sources:merge(D['Vedic:Maitrāyaṇīya Āraṇyaka']?.sources,[WIKI_YV,WIT,'Paul Deussen, Sixty Upanishads of the Veda','Patrick Olivelle, The Early Upanishads'])
  });

  put('Atharvaveda',{
    sanskritTitle:'अथर्ववेदः',language:'Vedic Sanskrit',period:'Received Samhita broadly c. 1200–900 BCE, with older and later internal layers.',extent:'20 books; about 730 hymns and roughly 6,000 mantras in the Shaunaka recension',primaryRecensions:['Shaunaka','Paippalada'],
    leadParagraphs:[
      'The Atharvaveda is the fourth Veda and preserves a religious world broader than the public Soma sacrifice: healing, protection, reconciliation, curses, royal power, household concerns, love, long life, funerary ritual and speculative hymns all appear beside material shared with the Rigveda.',
      'Two recensions survive: Shaunaka and Paippalada. Paippalada was long known only imperfectly until manuscript discoveries in Odisha and evidence of continuing recitation transformed its study in the twentieth century. The two recensions differ substantially in ordering and content.'
    ],articleSections:[
      {title:'Twenty-book Shaunaka organization',paragraphs:['The common Shaunaka text has twenty kandas. The first eighteen form the older organized core; Book 19 is supplementary; Book 20 consists largely of Rigvedic material used in a different ritual setting.'],books:[
        {number:'1–7',title:'Shorter practical hymns',summary:'Healing, protection, prosperity, hostile magic, reconciliation, domestic concerns and many other immediate aims.'},
        {number:'8–12',title:'Longer and speculative hymns',summary:'More expansive compositions, including major cosmological and philosophical material such as Skambha and reflections on breath and cosmic order.'},
        {number:'13–18',title:'Thematic books',summary:'Solar material, marriage, vratya, royal/ritual themes and extensive funerary and life-cycle collections.'},
        {number:19,title:'Supplement',summary:'A later supplementary collection with prayers, charms and liturgical material.'},
        {number:20,title:'Rigvedic anthology',summary:'Predominantly Rigvedic verses, especially Indra hymns, adapted to Atharvavedic use.'}
      ]},
      {title:'Healing, protection and everyday life',paragraphs:['Atharvavedic hymns address fever, wounds, poison, rivalry, household harmony, childbirth, love, cattle, royal success and enemies. Calling all of this “magic” hides the variety of ritual and theological assumptions in the text.','Plants, spoken formulas, amulets, water and ritual actions are treated as bearers of sacred efficacy. The social world is therefore more immediate and domestic than the specialized Soma liturgy of the other Vedas.']},
      {title:'Speculative hymns',paragraphs:['The Atharvaveda also contains some of the most ambitious speculative poetry of the later Vedic period. Skambha is imagined as the cosmic support in which gods and worlds are established; other hymns meditate on breath, time, the Vratya and the unity underlying diverse powers.','These passages helped make the Atharvaveda important to later Upanishadic developments and undermine the old stereotype of the text as merely a charm collection.']},
      {title:'Shaunaka and Paippalada',paragraphs:['The two surviving recensions differ significantly in order and content. Paippalada is not a derivative copy of Shaunaka and often preserves older or fuller forms of hymns.','Twentieth-century work on Odisha manuscripts and living Paippalada transmission dramatically expanded the textual basis for Atharvaveda scholarship.']},
      {title:'Recognition as the fourth Veda',paragraphs:['Early Vedic formulations sometimes speak of the “threefold knowledge” of Rig, Yajus and Saman. Atharvan tradition nevertheless developed its own priestly and ritual identity and eventually occupies the fully recognized fourth place in the canonical four Vedas.','The Gopatha Brahmana is devoted in part to articulating that Atharvavedic place within the larger sacrificial system.']}
    ],sources:merge([], [WIKI_AV,WIKI_GB,WHIT,BLOOM,GONDA,WIT])
  });

  put('Śaunaka Saṃhitā',{
    sanskritTitle:'शौनकसंहिता',language:'Vedic Sanskrit',period:'Late second to early first millennium BCE in received form, with older and later layers.',extent:'20 kandas; about 730 hymns and roughly 6,000 mantras',primaryRecensions:['Shaunaka'],
    leadParagraphs:[
      'The Shaunaka Samhita is the best-known recension of the Atharvaveda and the basis of most older printed editions and translations. Its twenty books are arranged partly by hymn length and partly by later thematic grouping rather than by rishi families like the Rigveda.',
      'The collection moves from short practical charms and prayers to long speculative hymns, marriage, Vratya, royal and funerary material, then closes with supplementary and heavily Rigvedic books.'
    ],articleSections:[
      {title:'Organization',paragraphs:['Books 1–7 tend to contain shorter hymns, while 8–12 contain longer compositions. Books 13–18 are more thematic; 19 is supplementary; 20 is largely borrowed from the Rigveda.','The structure suggests stages of collection and editorial organization rather than a single author arranging twenty equal books.']},
      {title:'Ritual applications',paragraphs:['Healing fever, stopping poison, restoring harmony, securing love, defeating rivals, protecting cattle and supporting kings are all part of the Samhita’s religious world.','The rites frequently combine spoken mantra with plant, water, amulet or physical action. This gives the text an unusually vivid record of embodied Vedic ritual practice.']},
      {title:'Funerary and life-cycle material',paragraphs:['Later books include important marriage and funeral hymns. These are not marginal to Atharvaveda identity: they show the recension functioning within household and life-cycle religion alongside its protective rites.']},
      {title:'Relation to Paippalada',paragraphs:['Shaunaka and Paippalada are independent recensional witnesses. Where they share a hymn, differences in wording or arrangement can illuminate an older Atharvan tradition; where one preserves unique material, the boundaries of the historical corpus become visible.']}
    ],sources:merge(D['Vedic:Śaunaka Saṃhitā']?.sources,[WIKI_AV,WHIT,BLOOM])
  });

  put('Paippalāda Saṃhitā',{
    sanskritTitle:'पैप्पलादसंहिता',language:'Vedic Sanskrit',period:'Ancient Atharvavedic recension with old strata; received manuscript forms preserve their own later transmission history.',extent:'20 kandas in the received recension, with content and ordering differing from Shaunaka',primaryRecensions:['Paippalada'],
    leadParagraphs:[
      'The Paippalada Samhita is the second surviving Atharvaveda recension and one of the most important Vedic textual recoveries of modern times. For generations it was known imperfectly from a damaged Kashmiri manuscript, until extensive Odisha manuscripts and evidence of living Paippalada recitation were identified and edited.',
      'Paippalada often preserves forms of hymns not available in Shaunaka and sometimes gives longer or differently organized speculative material. It therefore changes the Atharvaveda from a one-recension text into a genuinely comparative textual tradition.'
    ],articleSections:[
      {title:'Rediscovery and manuscripts',paragraphs:['Durga Mohan Bhattacharyya’s search in Odisha and south-west Bengal located a living Paippalada tradition and numerous palm-leaf manuscripts. The discovery was transformative because it provided far better witnesses than the previously known Kashmiri manuscript alone.','Subsequent editorial work, including by Dipak Bhattacharya and others, has continued to establish the Sanskrit text book by book.']},
      {title:'Difference from Shaunaka',paragraphs:['The recension differs in order, wording and content. Parallel hymns may be fuller, differently placed or textually older in some details, while entire passages can be unique to one recension.','This means a statement such as “Atharvaveda Book 10” is incomplete unless the recension is known. Paippalada and Shaunaka numbering do not simply mirror each other.']},
      {title:'Speculative importance',paragraphs:['Paippalada preserves important speculative and theological material, including passages on unity, Brahman and cosmic principles. Its recovery therefore affected not only ritual history but the study of late Vedic thought.']},
      {title:'Living transmission and critical edition',paragraphs:['The Paippalada case is a reminder that Vedic history is not only manuscript archaeology. Oral lineages survived where modern scholarship had assumed the school was effectively lost.','Current critical work must coordinate palm-leaf witnesses, regional scripts, oral readings and comparison with Shaunaka.']}
    ],sources:merge(D['Vedic:Paippalāda Saṃhitā']?.sources,[WIKI_AV,{title:'Wikipedia — Durga Mohan Bhattacharyya',detail:'Discovery of living Paippalada transmission and Odisha manuscripts.',url:'https://en.wikipedia.org/wiki/Durga_Mohan_Bhattacharyya'},'Dipak Bhattacharya, editions of the Paippalada Samhita',GONDA])
  });

  put('Gopatha Brāhmaṇa',{
    sanskritTitle:'गोपथब्राह्मणम्',language:'Vedic Sanskrit',period:'Late Brahmana period; substantial debate over relation to Vaitana Sutra and Paippalada tradition.',extent:'Purva Brahmana in 5 prapathakas; Uttara Brahmana in 6',
    leadParagraphs:[
      'The Gopatha Brahmana is the only surviving Brahmana of the Atharvaveda. Its two large divisions, Purva and Uttara, defend the Atharvan’s place within the Vedic sacrificial world, reinterpret rituals known from other Vedas and preserve distinctive Atharvavedic theology and prose.',
      'Its date has been debated intensely. Older scholarship sometimes treated it as very late and dependent on the Vaitana Sutra; Caland and later researchers argued that important passages are earlier and tied especially to Paippalada transmission. The received work is likely layered.'
    ],articleSections:[
      {title:'Purva and Uttara',paragraphs:['The Purva Brahmana has five prapathakas and contains some of the work’s most distinctive Atharvavedic material, including glorification of Atharvan priests, cosmogony and the attempt to define a fourth-Veda ritual identity.','The Uttara Brahmana has six prapathakas and draws more heavily on ritual material parallel to other Brahmanas, adapting it to Atharvavedic priesthood and procedure.']},
      {title:'Making the Atharvaveda part of Shrauta ritual',paragraphs:['One of the text’s central projects is canonical. The three older liturgical Vedas already had clearly defined priestly roles; Gopatha repeatedly explains how Atharvavedic knowledge and the Brahman priest belong to the complete sacrifice.','This is why some apparently repetitive passages matter: they are not merely borrowing older Brahmana material, but re-situating it inside an Atharvan account of total Vedic authority.']},
      {title:'Dating debate',paragraphs:['Bloomfield argued for dependence on the Vaitana Sutra and a comparatively late date. Caland reversed the relationship in several passages and connected the Brahmana more closely with Paippalada readings. Later scholarship has continued to distinguish older and later strata rather than assigning the whole work to one moment.','The dispute is a good example of Vedic chronology based on textual dependence: which wording is earlier, which text explains the other, and which recension preserves the more difficult reading.']},
      {title:'Myth and speculation',paragraphs:['The Gopatha contains cosmogonic material, discussions of sacred syllables, priestly classification and ritual symbolism that approach an Upanishadic horizon. Its purpose is not only procedural; it articulates what makes Atharvavedic knowledge cosmically necessary.']},
      {title:'Editions and study',paragraphs:['Modern study depends on comparison with both Shaunaka and Paippalada Atharvaveda, the Vaitana Sutra and parallel Brahmana passages. Because the text is the sole surviving Atharvavedic Brahmana, recensional arguments carry unusual weight.']}
    ],sources:merge(D['Vedic:Gopatha Brāhmaṇa']?.sources,[WIKI_GB,WIKI_AV,BLOOM,'W. Caland, studies of the Gopatha Brahmana','Taraknath Adhikari, studies of Gopatha chronology'])
  });
})();