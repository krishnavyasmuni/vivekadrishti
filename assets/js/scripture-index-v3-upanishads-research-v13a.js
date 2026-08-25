(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const merge = (name, extra) => D[name] = Object.assign({}, D[name] || {}, extra);
  const S = {
    olivelle:{title:'Patrick Olivelle — The Early Upanishads',detail:'Critical Sanskrit text, translation, textual notes and relative chronology of the early Upanishads.',url:'https://global.oup.com/academic/product/the-early-upanisads-9780195124354'},
    hume:{title:'Robert Ernest Hume — The Thirteen Principal Upanishads',detail:'English translation with introductions and notes on the principal Upanishads.',url:'https://archive.org/details/thirteenprincipa028442mbp'},
    deussen:{title:'Paul Deussen — Sixty Upanishads of the Veda',detail:'Translation and comparative philosophical discussion of major and minor Upanishads.',url:'https://archive.org/details/SixtyUpanishadsOfTheVedaVolume1'},
    radha:{title:'S. Radhakrishnan — The Principal Upanishads',detail:'Translation and philosophical notes on the principal Upanishads.',url:'https://archive.org/details/principalupanisa0000radh'},
    muktika:{title:'Muktika Upanishad — traditional list of 108 Upanishads',detail:'Traditional 108-name sequence and Vedic associations used by the index.',url:'https://sanskritdocuments.org/doc_upanishhat/muktika.html'},
    sanskrit:{title:'SanskritDocuments — Upanishad texts',detail:'Sanskrit e-texts used to check titles, divisions and mantra numbering.',url:'https://sanskritdocuments.org/doc_upanishhat/'},
    vedic:{title:'Vedic Heritage Portal — Upanishads',detail:'Government of India Vedic Heritage Portal: Vedic affiliation, text structure and recensional information.',url:'https://vedicheritage.gov.in/upanishads/'},
    hindupedia:{title:'Hindupedia — Upanishads',detail:'Traditional Hindu encyclopedia material on Upanishads, teachings and commentarial reception.',url:'https://www.hindupedia.com/en/Upani%E1%B9%A3ad'}
  };
  const src = (wiki, extra=[]) => [{title:'Wikipedia — article and bibliography',detail:'Used as a navigational survey for chronology, structure, editions and further bibliography.',url:wiki},S.hindupedia,S.vedic,S.olivelle,S.hume,S.deussen,S.radha,S.sanskrit,S.muktika,...extra];

  merge('Aitareya',{
    period:'Early first millennium BCE; generally grouped with the oldest prose Upanishadic material, though exact absolute dating remains debated.',
    history:'The Aitareya Upanishad is embedded in the Aitareya Aranyaka of the Rigveda, conventionally occupying chapters 4–6 of the second book. Its received three-chapter form develops creation from Atman, embodiment and the three births before culminating in consciousness as Brahman.',
    manuscripts:'It survives through the Rigvedic Aitareya textual tradition and in independent Upanishad manuscripts. The relation to the surrounding Aranyaka is essential: the Upanishad was not originally a detached book but a late Vedic textual unit within that larger corpus.',
    reception:'Shankara wrote an influential bhashya on the text. Later Vedanta traditions repeatedly cite its culminating mahavakya prajnanam brahma, while modern scholarship studies it alongside the early prose Upanishads and the Aitareya Aranyaka.',
    scholarlyDebates:['Dating is relative rather than fixed: scholars compare prose style, ritual background and doctrinal development with Brihadaranyaka, Chandogya and other early texts.','Traditional attribution associates the Aitareya literature with Mahidasa Aitareya; historical composition of the transmitted text is treated more cautiously in modern scholarship.'],
    sources:src('https://en.wikipedia.org/wiki/Aitareya_Upanishad',[{title:'Vedic Heritage Portal — Aitareyopanishad',detail:'Three chapters, thirty-three verses, Rigvedic setting and summary of teachings.',url:'https://vedicheritage.gov.in/upanishads/aitareyopanishad/'},{title:'Hindupedia — Aitareya',detail:'Traditional account of Mahidasa Aitareya and the Aitareya textual tradition.',url:'https://hindupedia.com/en/Aitareya'}])
  });

  merge('Kauṣītaki',{
    period:'Early Upanishadic prose, usually placed in the first millennium BCE and commonly treated as broadly comparable in age to the older prose Upanishadic stratum.',
    history:'The Kausitaki or Kausitaki Brahmana Upanishad belongs to the Rigvedic Kausitaki/Shankhayana tradition. It forms four prose chapters and preserves teachings on the paths after death, prana, consciousness, royal instruction and the identity of the knowing self.',
    manuscripts:'The Upanishad is transmitted in association with the Kausitaki Aranyaka, where it is commonly identified with chapters 3–6. Editions differ in smaller readings and segmentation, so citations should identify the edition when exact sentence numbering matters.',
    reception:'The Brahma Sutras discuss Kausitaki passages, and the work was read by Vedanta commentators despite not always being included in popular modern lists of ten principal Upanishads. Its prana and consciousness teachings provide an independent Rigvedic comparison to Chandogya and Brihadaranyaka.',
    sources:src('https://en.wikipedia.org/wiki/Kaushitaki_Upanishad',[{title:'Hindupedia — Kausitaki Brahmana Upanishad',detail:'Four chapters, location in the Kausitaki Aranyaka and traditional summary of contents.',url:'https://hindupedia.com/en/Kau%E1%B9%A3itaki_Br%C4%81hma%E1%B9%87a_Upani%E1%B9%A3ad'}])
  });

  merge('Kaṭha',{
    period:'Usually placed after the oldest prose Upanishads, with modern estimates commonly ranging from about the 5th to the 1st century BCE; the chronology remains contested.',
    history:'The Katha Upanishad belongs to the Katha school of the Krishna Yajurveda. Its six vallis are arranged in two adhyayas and frame philosophical instruction as the encounter between Nachiketas and Yama, lord of death.',
    manuscripts:'The work has a stable six-valli architecture but survives in manuscript and printed traditions with ordinary verbal variants. Sanskrit editions should be distinguished from later translations and from quotations detached from their narrative setting.',
    reception:'Katha became one of the most frequently translated Upanishads. Shankara, Madhva and Rangaramanuja commentarial traditions read its hierarchy of senses, mind, intellect, self and Purusha differently. Its chariot image and contrast between shreyas and preyas became especially influential.',
    sources:src('https://en.wikipedia.org/wiki/Katha_Upanishad',[{title:'SanskritDocuments — Katha Upanishad',detail:'Sanskrit text with the two adhyayas and six vallis.',url:'https://sanskritdocuments.org/doc_upanishhat/katha.html'}])
  });

  merge('Taittirīya',{
    period:'Early prose Upanishad, usually assigned to the middle or earlier part of the first millennium BCE, though its three vallis need not be exactly contemporary.',
    history:'The Taittiriya Upanishad belongs to the Taittiriya Aranyaka of the Krishna Yajurveda. Its three vallis move from phonetics, recitation and student ethics to Brahman as truth-knowledge-infinite, the layered person, bliss and Bhrigu’s ascending inquiry.',
    manuscripts:'It is transmitted as part of the Taittiriya Vedic corpus as well as independently. The Shiksha, Brahmananda/Ananda and Bhrigu vallis preserve different literary textures, which is one reason scholars discuss internal layering.',
    reception:'Shankara’s commentary and Sureshvara’s Taittiriyavarttika made the text central to Advaita. Other Vedanta schools likewise use its passages on Brahman, the sheaths and bliss, often disagreeing sharply over whether the layers of the person are identities, bodies, modes or pedagogical superimpositions.',
    sources:src('https://en.wikipedia.org/wiki/Taittiriya_Upanishad',[{title:'Hindupedia — Sambandhavarttika',detail:'Traditional notice of Sureshvara’s varttika on Shankara’s Taittiriya commentary.',url:'https://hindupedia.com/en/Sambandhav%C4%81rttika'}])
  });

  merge('Śvetāśvatara',{
    period:'Generally regarded as later than the oldest prose Upanishads and often placed in the last few centuries BCE.',
    history:'The Shvetashvatara Upanishad is a six-chapter Krishna Yajurvedic verse text that reorganizes older Vedic language around questions of ultimate cause, Rudra, Purusha, maya, prakriti, yoga, grace and devotion.',
    manuscripts:'The received six-chapter text contains numerous verses with close Vedic parallels. Its textual history therefore includes both inherited verses and their new arrangement inside a deliberately theological Upanishadic work.',
    reception:'The text is foundational in Shaiva appeals to shruti because of its exaltation of Rudra, while Vedanta traditions interpret its Lord, maya, prakriti and individual selves according to different metaphysical systems. The final verse linking devotion to God and guru became especially influential.',
    scholarlyDebates:['The work is often described as theistic or Shaiva, but historians debate how directly it should be mapped onto later sectarian Shaivism.','Its yoga instructions are important evidence for pre-classical yogic discipline, though they should not be read as a verbatim presentation of the later Yoga Sutra system.'],
    sources:src('https://en.wikipedia.org/wiki/Shvetashvatara_Upanishad')
  });

  merge('Īśāvāsya',{
    period:'An early-to-middle Upanishadic verse text whose absolute date is uncertain; it is ancient enough to be transmitted directly as the final chapter of the Vajasaneyi Samhita.',
    history:'The Isha or Ishavasya Upanishad is the fortieth chapter of the Shukla Yajurveda Vajasaneyi Samhita. In only eighteen mantras in the common Madhyandina text, it juxtaposes divine indwelling, action, renunciation, vidya and avidya, becoming and non-becoming.',
    manuscripts:'Madhyandina and Kanva recensions differ in readings and arrangement. Because the work is embedded in a Samhita rather than an Aranyaka, it occupies a distinctive textual position among the principal Upanishads.',
    reception:'Its compact paradoxes generated very different Vedantic readings. Shankara stresses knowledge and renunciation; other traditions give a stronger role to disciplined action and devotion. The opening ishavasyam idam sarvam is among the most cited Upanishadic statements.',
    sources:src('https://en.wikipedia.org/wiki/Isha_Upanishad')
  });

  merge('Bṛhadāraṇyaka',{
    period:'One of the oldest surviving Upanishads, commonly dated around the 7th–6th centuries BCE in its principal early layers, with internal stratification and later editorial development.',
    history:'The Brihadaranyaka Upanishad belongs to the Shatapatha Brahmana of the Shukla Yajurveda. Six chapters preserve ritual reinterpretation, cosmogony, Yajnavalkya’s debates, the inner controller, neti neti, karma, rebirth and extended inquiry into consciousness and the Self.',
    manuscripts:'Two major recensions survive, Madhyandina and Kanva. They share the broad work but differ in readings, ordering and details. The first two chapters are often called the Madhu section, chapters 3–4 the Yajnavalkya or Muni section, and chapters 5–6 the Khila or supplementary section.',
    reception:'Few Upanishads have had comparable influence. Shankara’s bhashya and Sureshvara’s enormous varttika are major Advaita works; Madhva and Rangaramanuja traditions also comment on the text. Aham brahmasmi, neti neti and the antaryamin passages became central Vedantic proof-texts.',
    sources:src('https://en.wikipedia.org/wiki/Brihadaranyaka_Upanishad',[{title:'Vedic Heritage Portal — Brihadaranyakopanishad',detail:'Madhyandina and Kanva recensions, six adhyayas and Shatapatha Brahmana setting.',url:'https://vedicheritage.gov.in/upanishads/brihadaranyakopanishad/'},{title:'Hindupedia — Antaryami Brahmana',detail:'Traditional account of the inner-controller section and the two recensions.',url:'https://hindupedia.com/en/Antary%C4%81mi_Br%C4%81hma%E1%B9%87a'}])
  });

  merge('Praśna',{
    period:'A later principal Upanishad of the first millennium BCE, generally younger than the oldest prose Upanishads and earlier than much of the sectarian minor-Upanishad corpus.',
    history:'The Prashna Upanishad belongs to the Atharvaveda and is structured around six students who approach Pippalada. Their six questions move through creation, prana, the distribution of vital functions, dream and sleep, meditation on Om and the Purusha with sixteen parts.',
    manuscripts:'The six-question architecture is stable and functions as the organizing principle of the text. Variants occur in wording and verse/prose segmentation across editions, but the pedagogical sequence remains clear.',
    reception:'Its question-and-answer format made it a natural teaching text. Vedanta commentators use it especially in disputes about prana, the individual self, Om meditation and the distinction between finite post-mortem attainments and final liberation.',
    sources:src('https://en.wikipedia.org/wiki/Prashna_Upanishad')
  });

  merge('Muṇḍaka',{
    period:'A verse Upanishad of the Atharvaveda, usually placed in the later part of the first millennium BCE and after the oldest prose Upanishads.',
    history:'The Mundaka Upanishad consists of three mundakas, each divided into two khandas. It distinguishes lower knowledge from the higher knowledge of the imperishable, criticizes treating finite ritual results as ultimate, and uses the images of sparks, two birds, rivers and Om as a bow.',
    manuscripts:'The sixty-four-verse text is transmitted as an Atharvavedic Upanishad. Its compact metrical organization made it easy to copy, quote and teach independently of a larger Brahmana or Aranyaka context.',
    reception:'The two-birds image and Om-as-bow passage became standard Vedantic imagery. The explicit listing of Vedas and Vedangas as lower knowledge is frequently cited in discussions of the hierarchy of sacred learning.',
    sources:src('https://en.wikipedia.org/wiki/Mundaka_Upanishad')
  });

  merge('Māṇḍūkya',{
    period:'A compact Atharvavedic Upanishad often placed around the final centuries BCE or early centuries CE; absolute dating is uncertain.',
    history:'The Mandukya Upanishad contains only twelve mantras. It identifies Om with the totality of time and analyzes the Self through waking, dream, deep sleep and turiya, then maps those four quarters onto A, U, M and the soundless completion.',
    manuscripts:'The twelve-mantra Upanishad must be distinguished from Gaudapada’s later Mandukya Karika, which is often printed with it. Their close association in Advaita transmission should not erase the textual distinction between Upanishad and karika.',
    reception:'Gaudapada’s Karika and Shankara’s commentary transformed this tiny text into a foundational Advaita scripture. Other Vedanta traditions accept the Upanishad while interpreting turiya, the individual self and Brahman differently.',
    sources:src('https://en.wikipedia.org/wiki/Mandukya_Upanishad',[{title:'Hindupedia — Prajna',detail:'Traditional Vedantic explanation of the deep-sleep prajna discussed in Mandukya 9–11.',url:'https://www.hindupedia.com/en/Pr%C4%81j%C3%B1a'}])
  });

  merge('Maitrāyaṇī',{
    period:'One of the later principal Upanishads, with layers commonly placed in the final centuries BCE and perhaps extending into the early centuries CE.',
    history:'The Maitrayaniya, Maitri or Maitrayani Upanishad belongs to the Maitrayaniya school of the Krishna Yajurveda. Its layered prapathakas combine older self-knowledge with increasingly systematic discussion of mind, gunas, time, solar meditation and a six-limbed yoga.',
    manuscripts:'The work survives in recensionally variable forms. The common seven-prapathaka text contains an older core and supplementary material, so chapter counts and the status of later sections should always be tied to a particular edition.',
    reception:'Although less central to medieval Vedanta commentary than Brihadaranyaka or Chandogya, Maitri is indispensable for histories of early Yoga and the interaction between Upanishadic, Samkhya-like and yogic vocabularies.',
    scholarlyDebates:['The seven-prapathaka form is layered; scholars disagree over the relative age and boundaries of its supplements.','Its sixfold yoga should be compared with, not simply identified as, the later eight-limbed system of Patanjali.'],
    sources:src('https://en.wikipedia.org/wiki/Maitrayaniya_Upanishad')
  });

  // Kena and Chandogya retain their hand-built encyclopedia articles; add only research sources here.
  merge('Kena',{sources:src('https://en.wikipedia.org/wiki/Kena_Upanishad')});
  merge('Chāndogya',{sources:src('https://en.wikipedia.org/wiki/Chandogya_Upanishad')});

  window.SCRIPTURE_UPANISHAD_RESEARCH_V13A = true;
})();
