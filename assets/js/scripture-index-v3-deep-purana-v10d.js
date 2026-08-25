(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{
    const k='Purāṇa:'+name;
    const base=Object.assign({},D[name]||{},D[k]||{});
    const prior=Array.isArray(base.articleSections)?base.articleSections:[];
    const incoming=Array.isArray(data.articleSections)?data.articleSections:[];
    D[k]=Object.assign({},base,data);
    if(prior.length||incoming.length){
      const byTitle=new Map();
      [...prior,...incoming].forEach((section,i)=>byTitle.set(String(section?.title||('section-'+i)),section));
      D[k].articleSections=[...byTitle.values()];
    }
  };
  const H='R. C. Hazra, Studies in the Upapuranas';
  const R='Ludo Rocher, The Puranas';
  const C='Purana catalogue passages used in this index: Devi Bhagavata 1.3, Kurma Purana 1.1, Padma Purana Patala-khanda 111, and Brihaddharma Purana 1.25';

  const entries={
    'Sanatkumāra Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Kurma Purana 1.1'],
      problem:'Several independent texts and teaching cycles use the name Sanatkumara. A catalogue entry therefore cannot be identified with every Sanatkumara dialogue or with the Sanatkumara material embedded in the Skanda Purana.',
      note:'The repeated Upapurana attestation makes the title secure even though a universally accepted complete recension matching the catalogue item is not.'
    },
    'Daurvāsasa Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Kurma Purana 1.1','Padma Purana Upapurana list'],
      problem:'Durvasas is associated with many ritual, Shakta and tantric traditions. Works attributed to the sage cannot automatically be treated as fragments of one Daurvasasa Purana.',
      note:'The title is strongly attested by multiple catalogues, but the contents of the original listed work remain uncertain.'
    },
    'Mānava Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Padma Purana Upapurana list'],
      problem:'The adjective Manava can refer broadly to Manu-related traditions. It is not safe to equate the catalogue title with Manusmriti, Manava Dharmashastra or any single Manu narrative in another Purana.',
      note:'The Upapurana title must be kept distinct from Dharma literature carrying the name of Manu.'
    },
    'Auśanasa Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Kurma Purana 1.1','Padma Purana Upapurana list'],
      problem:'Ushanas/Shukra is also the authority of polity and Dharma traditions. Quotations labelled Ausanasa may therefore belong to more than one genre and cannot automatically reconstruct the Purana.',
      note:'Three catalogue witnesses make the title secure while leaving the surviving textual body unresolved.'
    },
    'Varuṇa Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Kurma Purana 1.1','Padma Purana Upapurana list','Brihaddharma Purana 1.25'],
      problem:'No single complete Varuna Purana matching all four catalogue attestations is securely identified. The divine name Varuna also occurs in many independent ritual and mythological texts.',
      note:'Its fourfold attestation makes Varuna one of the strongest examples of a canonically remembered but textually elusive Upapurana.'
    },
    'Nandikṛta Purāṇa':{
      witnesses:['Devi Bhagavata 1.3'],
      problem:'The name means a Purana connected with or made by Nandi. Other lists preserve Nandishvara and Brihannandishvara, but title similarity alone does not establish that they are the same book.',
      note:'The index keeps Nandikrita separate so that later harmonization does not erase the exact Devi Bhagavata reading.'
    },
    'Āditya Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Brihaddharma Purana 1.25'],
      problem:'Solar Purana literature also includes Samba and Saura texts. Aditya should not be merged into either one merely because all concern the Sun.',
      note:'The repeated title may point to a distinct Saura scripture whose independent recension is no longer securely available.'
    },
    'Māheśvara Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Kurma Purana 1.1'],
      problem:'Maheshvara is a generic Shaiva divine title as well as a book-name. The catalogue item cannot automatically be identified with the Shiva Purana, Saura Purana or the separate Mahesha reading in the Padma list.',
      note:'The exact title is preserved because traditional catalogues distinguish more Shaiva Purana names than modern lists usually admit.'
    },
    'Vāsiṣṭha Purāṇa':{
      witnesses:['Devi Bhagavata 1.3'],
      problem:'Vasishtha is attached to Vedic, Dharma, Yoga and Purana traditions. A text attributed to Vasishtha in another genre is not by itself evidence for this Upapurana.',
      note:'The catalogue title is secure; the original contents are not reconstructable from the sage-name alone.'
    },
    'Parāśara Purāṇa':{
      witnesses:['Devi Bhagavata 1.3','Kurma Purana 1.1','Padma Purana Upapurana list'],
      problem:'Parashara is the speaker of the Vishnu Purana and the authority of a Smriti, astrology and other traditions. Those works should not be conflated with the separate Parashara Upapurana named in these catalogues.',
      note:'Multiple list attestations strongly support an independent title even though a critical complete text is not securely standardized.'
    },
    'Mārīca Purāṇa':{
      witnesses:['Kurma Purana 1.1','Padma Purana Upapurana list'],
      problem:'Marica is a common sage-name in Sanskrit tradition. Catalogue attestation does not identify which later manuscript, if any, preserves the same Purana.',
      note:'The two independent list witnesses justify keeping the title visible rather than silently dropping it from an eighteen-name reconstruction.'
    },
    'Bhārgava Purāṇa':{
      witnesses:['Kurma Purana 1.1','Padma Purana Upapurana list','Brihaddharma Purana 1.25'],
      problem:'Bhargava can refer to the Bhrigu lineage and to numerous works associated with Bhargava sages. No complete surviving text can be accepted as the catalogue Purana merely on that basis.',
      note:'Three attestations make the title important for the history of Purana classification even in the absence of a secure recension.'
    },
    'Ādya / Sanatkumāra Purāṇa':{
      witnesses:['Padma Purana Upapurana list'],
      problem:'The first item in the Padma list has a reading represented in this index as Adya/Sanatkumara. Editions and manuscript readings make it unsafe to choose one normalization and pretend the uncertainty does not exist.',
      note:'The slash is deliberate textual criticism: it records a catalogue problem rather than manufacturing a new scripture called “Adya-Sanatkumara.”'
    },
    'Āṇḍa Purāṇa':{
      witnesses:['Padma Purana Upapurana list'],
      problem:'The Padma list contains a difficult reading represented here as Anda. It has sometimes been normalized by editors toward a more familiar Purana name, but that move requires manuscript evidence.',
      note:'The index keeps the transmitted problem visible instead of silently rewriting it as Skanda or Brahmanda.'
    },
    'Another Nāradīya Purāṇa':{
      witnesses:['Padma Purana Upapurana list'],
      problem:'The Padma passage explicitly marks this as another Naradiya, which prevents automatic identification with the Naradiya Mahapurana. Brihannaradiya is yet another Narada-related title.',
      note:'This is a bibliographic distinction made by the Sanskrit source itself, not a modern invention.'
    },
    'Another Brahmāṇḍa Purāṇa':{
      witnesses:['Padma Purana Upapurana list'],
      problem:'The source explicitly distinguishes another Brahmanda from the famous Brahmanda Mahapurana. The lost Upapurana therefore cannot simply inherit the Mahapurana’s Lalitopakhyana, cosmology or chapter structure.',
      note:'The page exists to prevent a false merge created by identical-looking titles.'
    },
    'Māheśa Purāṇa':{
      witnesses:['Padma Purana Upapurana list'],
      problem:'Mahesha is close in meaning to Maheshvara, but the Padma witness preserves a distinct form. Without manuscript evidence it should not be equated with Maheshvara Purana or Shiva Purana.',
      note:'The exact reading matters because the Upapurana lists themselves are part of the textual evidence being indexed.'
    },
    'Kaumāra Purāṇa':{
      witnesses:['Padma Purana Upapurana list'],
      problem:'Kaumara suggests Kumara/Skanda affiliation, but that does not make the title identical with the Skanda Mahapurana or every Kaumara ritual text.',
      note:'The catalogue remembers a distinct Kaumara title whose independent extent remains uncertain.'
    },
    'Ādi Purāṇa':{
      witnesses:['Brihaddharma Purana 1.25'],
      problem:'Adi Purana is a highly ambiguous title used in more than one Sanskrit and Jain context. The Brihaddharma Upapurana entry must therefore be identified from its own catalogue setting, not from title recognition alone.',
      note:'Hazra discusses the difficulty of reconstructing Adi-purana traditions; the index avoids assigning foreign contents to this witness.'
    },
    'Nandīśvara Purāṇa':{
      witnesses:['Brihaddharma Purana 1.25'],
      problem:'Nandishvara resembles Nandikrita and Brihannandishvara, all associated with Nandi/Shiva. The catalogue treats them as separate names, so the index does the same.',
      note:'A complete independent recension corresponding exactly to this item is not securely established.'
    },
    'Bṛhannandīśvara Purāṇa':{
      witnesses:['Brihaddharma Purana 1.25'],
      problem:'The prefix Brihat marks an enlarged or distinct Nandishvara title. It should not automatically receive the contents of any shorter Nandishvara work.',
      note:'The separate catalogue item is evidence for a more complicated Shaiva Upapurana bibliography than standardized lists suggest.'
    },
    'Dharma Purāṇa':{
      witnesses:['Brihaddharma Purana 1.25'],
      problem:'Dharma is both a generic subject and a title. Manuscripts labelled Dharma, Dharmapurana or sections dealing with dharma cannot be assumed to preserve this exact catalogue work.',
      note:'The source securely attests a title while leaving identification of a complete independent recension unresolved.'
    }
  };

  function dossier(name,e){
    const base=D[`Purāṇa:${name}`]||D[name]||{};
    const witnessText=e.witnesses.join('; ');
    put(name,{
      language:'Sanskrit',
      status:'Catalogue-attested Upapurana; no single complete recension can presently be identified with sufficient confidence to reconstruct a full table of contents.',
      period:'Date cannot be fixed independently because the complete listed work is lost, fragmentary or textually unidentified; the catalogue witnesses provide termini for the title’s circulation.',
      leadParagraphs:[
        `${name} is a real Purana title because Sanskrit scriptures themselves list it; its uncertainty concerns the surviving book, not the existence of the name in the tradition. It is attested in ${witnessText}.`,
        `The correct scholarly response to a lost Purana is not to invent a contents page from its title. The article instead follows the evidence through catalogue verses, variant readings, later quotations, manuscript catalogues and attempts at identification. ${e.note}`
      ],
      articleSections:[
        {title:'Traditional attestations',paragraphs:[
          `The title is explicitly named in ${witnessText}. These are primary Sanskrit witnesses to an Upapurana classification, and their disagreement with other eighteen-name lists is part of the history of the canon.`,
          'A Purana list proves that a title was recognized by the compiler of that passage. It does not by itself prove that the complete book survived unchanged into modern manuscript collections.'
        ]},
        {title:'Title and identification problem',paragraphs:[
          e.problem,
          'Purana titles frequently travel across recensions, abridgements, mahatmyas and sectarian rewritings. A responsible identification therefore requires more than a matching deity or sage-name: chapter colophons, opening verses, closing verses, manuscript sequence and quotations must also agree.'
        ]},
        {title:'What can be reconstructed',paragraphs:[
          'The secure reconstruction begins with the title, its exact spelling or variant reading, the catalogue position and the date of the witness that lists it. Later manuscript catalogues or quotations can then be compared cautiously.',
          'Unless a quotation explicitly names the work and can be distinguished from another text of the same author/deity, it should not be used to manufacture a continuous lost Purana.'
        ]},
        {title:'What cannot be claimed',paragraphs:[
          'No chapter count, verse total, sectarian theology or narrative sequence should be assigned merely from the title. Even a strongly Shaiva, Vaishnava or Saura-looking name does not establish the contents of the lost recension.',
          'Likewise, a modern book with a similar title is not automatically the text meant by a medieval catalogue. The burden is on textual evidence, not resemblance.'
        ]},
        {title:'Place in the Upapurana canon',paragraphs:[
          `${e.note} Keeping this entry separate preserves the evidence that Hindu scripture transmitted several competing Upapurana catalogues rather than one universally fixed list.`,
          'The index therefore treats canon history as a set of witnessed classifications. A lost title can be historically important even when its stories can no longer be recovered.'
        ]},
        {title:'Sources and future research',paragraphs:[
          'R. C. Hazra’s Upapurana studies remain the principal starting point for matching catalogue names with manuscripts and quotations. Modern manuscript catalogues and new digitization can change an identification, so uncertain pages should remain explicitly revisable.',
          'If a securely identified manuscript becomes available, its incipit, colophon, chapter structure and contents can be added without rewriting the earlier catalogue evidence.'
        ]}
      ],
      sources:[...new Set([...(base.sources||[]),H,R,C,...e.witnesses])]
    });
  }
  Object.entries(entries).forEach(([n,e])=>dossier(n,e));
})();