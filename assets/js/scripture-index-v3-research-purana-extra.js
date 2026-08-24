(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const H='R. C. Hazra, Studies in the Upapurāṇas';
  const patch=(name,extra)=>{const b=D[`Purāṇa:${name}`]||D[name]||{};D[`Purāṇa:${name}`]=Object.assign({},b,extra,{sources:[...new Set([...(b.sources||[]),...(extra.sources||[])])]});};

  patch('Ādya / Sanatkumāra Purāṇa',{
    overview:'This is the first title of the Padma/Kūrma-type Upapurāṇa catalogue tradition: an “Ādya” Purāṇa said to have been spoken by Sanatkumāra. The slash in this index is not the title of a modern printed book; it preserves the source tradition connecting Ādya with Sanatkumāra.',
    history:'Kūrma Purāṇa I.1.17 explicitly says the first Upapurāṇa, Ādya, was spoken by Sanatkumāra. Other lists simplify the same slot to Sanatkumārīya/Sanatkumāra. Because this is a catalogue identity problem, it should not be silently replaced by an unrelated extant Sanatkumāra text.',
    chapterMap:['Secure evidence: the title and attribution in Upapurāṇa catalogues.','Unsecure evidence: a complete chapter-sequence of one extant recension that can unquestionably be identified with this exact catalogue-title.'],
    manuscripts:'Multiple Sanatkumāra-attributed religious texts circulate; identity with the catalogue’s Ādya requires manuscript/quotation proof.',
    primaryEvidence:['Kūrma Purāṇa I.1.17: ādyam sanatkumāroktam','Padma Purāṇa Upapurāṇa list'],
    hazraNotes:'Hazra uses the variants of the eighteen-title lists to show how Upapurāṇa names shifted between title and attributed speaker. Ādya/Sanatkumāra is a good example of why catalogue philology matters.',
    status:'Catalogue-title securely attested; exact continuous surviving recension uncertain.',
    sources:[H,'Kūrma Purāṇa I.1.17–20','Padma Purāṇa Pātāla-khaṇḍa Upapurāṇa list']
  });

  patch('Saura Purāṇa',{
    overview:'Despite its name, the extant Saura Purāṇa is not primarily a Sun-worship manual. Sūrya is the narrator, but the received work is predominantly Śaiva/Pāśupata: it glorifies Śiva and Pārvatī and combines Śaiva theology with Dharma, tīrtha, vrata and philosophical material.',
    period:'Hazra dates the present Saura Purāṇa roughly 950–1200 CE, with some material added later; a modern analytical study notes portions of chs. 38–40 cannot predate the 14th–15th centuries.',
    milieu:'Hazra proposed northwestern/northern India, based on its sacred geography and normative praise of the Gaṅgā–Yamunā/Madhyadeśa zone, while the text also knows important central and Deccan tīrthas.',
    history:'The present 69-chapter text must be distinguished from earlier Saura-named works. Hazra also argues that the chapter order in the printed Ānandāśrama edition is disturbed and reconstructs a different sequence.',
    datingBasis:'Citation history, Pāśupata/Śaiva institutions, geographic attitudes and identifiable late additions provide a layered chronology rather than one author-date.',
    chapterMap:['69 chapters in the extant recension.','Hazra reconstructs the sequence approximately as 1–10, 14–16, 43, 11–13, 17–37, 41–42, 44–66, 67 and 69 rather than accepting printed order uncritically.','Chs. 38–40 contain especially late material in the received form.','Throughout: Śiva/Pārvatī theology, tīrthas, vrata/Dharma and Pāśupata practice despite Sūrya’s narrative role.'],
    contents:['Śiva and Pārvatī mythology and supremacy.','Pāśupata/Smārta Śaiva religious practice.','Sacred geography including Vārāṇasī, Prayāga, Badarī, Ujjayinī, Oṃkāreśvara, Narmadā and Godāvarī.','Varṇāśrama/sadācāra and strong judgments about sacred/social geography.','Purāṇic five-characteristic theory stated in the text itself.'],
    namedFeatures:['Sūrya as narrator rather than principal deity','Śaiva/Pāśupata orientation','Saura Purāṇa 9.4–5 on the pañcalakṣaṇa','Disturbed/reconstructed chapter order'],
    manuscripts:'The surviving Purāṇa has a distinct manuscript/printed history; chapter arrangement itself is part of the textual problem.',
    hazraNotes:'This is a strong example of why sect cannot be inferred from title: Hazra’s study treats the received Saura as a Śaiva/Pāśupata Upapurāṇa. He dates the main work c. 950–1200 CE and separates later material.',
    primaryEvidence:['Saura Purāṇa 9.4–5: Purāṇa/Upapurāṇa characteristics','Saura Purāṇa ch. 17 geographic/social passages','Hazra, discussion of date/order, pp. 110–23 in his Purāṇic studies'],
    sources:[H,'R. C. Hazra, Studies in the Purāṇic Records on Hindu Rites and Customs','Priyanku Chakraborty, analytical study of the Saura Purāṇa','Wilhelm Jahn, Das Saurapurāṇam']
  });

  patch('Nandīśvara Purāṇa',{
    overview:'Nandīśvara/Nandikeśvara is a lost or largely non-continuous Śākta-Śaiva Upapurāṇa known especially through ritual quotations. Its historical importance is the Durgā-pūjā material used by Bengal’s later Dharma/ritual writers.',
    period:'Hazra argues for roughly 850–950 CE: later than older Devī/Liṅga Durgā-pūjā material but early enough to be cited widely by medieval ritual digests.',
    milieu:'Eastern India, especially Bengal. Hazra connects its Durgā ritual sequence with customs that later Bengali authors themselves recognized as regional ācāra.',
    history:'The original continuous Purāṇa is not securely extant. Verses are preserved because works such as Varṣa-kaumudī, Nirṇaya-sindhu, Ācāra-mayūkha, Vīramitrodaya and Raghunandana’s ritual tattvas quote it.',
    contents:['Durgā-pūjā timing around Ṣaṣṭhī/Saptamī.','Adhivāsa of the Goddess in a bilva tree before patrikā-praveśa.','Regional ritual calendar and injunctions later absorbed into Bengali Durgotsava practice.'],
    dependencies:['Some verses attributed to Nandikeśvara are elsewhere attributed to Devī Purāṇa, Liṅga Purāṇa, Vyāsa or Satya—evidence of quotation migration and textual reuse.'],
    manuscripts:'An early manuscript of a Śiva-stotra associated with Nandikeśvara is noted in catalogue literature, but the whole Purāṇa is reconstructed chiefly from quotations rather than one complete codex.',
    hazraNotes:'Hazra explicitly distinguishes Nandikeśvara from Nandi Purāṇa, Bṛhannandikeśvara, Śivadharma and Śivadharmottara. Similar names are not interchangeable.',
    primaryEvidence:['Raghunandana Durgā-pūjā-tattva quotations','Varṣa-kaumudī quotations','Hazra, Nandikeśvara Purāṇa study'],
    sources:[H,'Bengal ritual nibandhas cited by Hazra']
  });

  patch('Bṛhannandīśvara Purāṇa',{
    overview:'Bṛhannandīśvara is a separate lost Śākta ritual Upapurāṇa, not merely another name for Nandīśvara. What survives most clearly is a cluster of verses prescribing the Bengali autumnal Durgā-pūjā.',
    period:'Hazra places it after about 850 but before 1000 CE, and associates it with Bengal.',
    milieu:'Eastern Indian/Bengali Durgā ritual culture.',
    history:'The continuous book is lost. Its contents are reconstructed principally from quotations in Raghunandana, Śūlapāṇi and other ritual writers, plus priestly paddhatis claiming to follow Bṛhannandikeśvara.',
    chapterMap:['Recoverable ritual cluster: autumnal Durgā worship from Saptamī through Navamī and Daśamī.','Saptamī: constitution and worship of the nava-patrikā.','Aṣṭamī: mahāsnāna using pañcagavya, sacred waters, herbs/gems/flowers, accompanied by music and dance; offerings, homa and animal bali in the quoted prescription.','Navamī/Daśamī sequence: continued worship, immersion and regional festival rites.'],
    contents:['Earthen image of Devī worshipped over the major autumn festival days.','Nava-patrikā on Saptamī.','Mahāsnāna with multiple consecrated waters on Aṣṭamī.','Music, instruments and dance during the rite.','Homa and bali prescriptions.','Immersion and regional Durgotsava pattern.'],
    manuscripts:'All known manuscripts of a priestly manual titled Bṛhannandikeśvara-purāṇokta-durgā-pūjā-paddhati noted by Hazra are Bengali, reinforcing the regional transmission.',
    hazraNotes:'Hazra says we know almost nothing of the full book, but the surviving Durgā-pūjā quotations are unusually rich. That makes the lost text historically informative even without pretending to reconstruct unrelated chapters.',
    primaryEvidence:['Raghunandana, Durgā-pūjā-tattva, quoted Bṛhannandikeśvara verses','Śūlapāṇi, Durgotsava-viveka','Hazra, Bṛhannandikeśvara Purāṇa study'],
    sources:[H,'Raghunandana Durgā-pūjā-tattva','Śūlapāṇi Durgotsava-viveka']
  });

  patch('Śivadharma Purāṇa',{
    overview:'Śivadharma names an early and influential Śaiva Dharma corpus rather than a simple deity-story Purāṇa. The Śivadharma/Śivadharmottara tradition teaches specifically Śaiva conduct, worship, gifts, vrata, mantra and the religious obligations of Śiva devotees.',
    period:'An early Śaiva Dharma tradition existed by the first millennium CE; individual works and recensions in the Śivadharma corpus have different dates and should not be collapsed into one composition date.',
    milieu:'Institutional Śaivism adapting Dharmaśāstra categories to devotees of Śiva.',
    history:'Hazra warns that the Śivadharma, Śivadharmottara, Nandi and Nandikeśvara works are distinct despite overlapping Nandi/Śiva attributions. Modern Śivadharma manuscript projects likewise treat this as a textual corpus with multiple works and recensions.',
    contents:['Śiva-bhakti and marks/duties of devotees.','Liṅga/Śiva worship, mantra and religious gifts.','Vratas, Dharma conduct and merit.','Śaiva recasting of broader Brahmanical Dharma categories.'],
    manuscripts:'The Śivadharma corpus survives widely in manuscripts, including important Nepalese witnesses; modern critical work distinguishes constituent texts and recensions.',
    scholarlyDebates:['Exact relationship of Śivadharmaśāstra, Śivadharmottara and later texts in the corpus.','Which catalogue reference “Śivadharma Purāṇa” points to which surviving constituent work.'],
    primaryEvidence:['Kūrma Purāṇa I.1.18: Śivadharma named and attributed to Nandīśa','Śivadharma corpus manuscripts'],
    sources:[H,'Śivadharma Project / critical manuscript studies','Śivadharma Sanskrit editions']
  });
})();