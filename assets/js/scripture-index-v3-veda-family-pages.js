(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const put = (name, data) => { D[`Vedic:${name}`] = Object.assign({}, D[`Vedic:${name}`] || D[name] || {}, data); };

  put('Ṛgveda', {
    overview:'The Ṛgveda is the oldest surviving Vedic collection of Sanskrit religious poetry. In its principal Śākala recension it contains 1,028 hymns arranged in ten maṇḍalas, addressed to deities such as Agni, Indra, Soma, Uṣas, the Aśvins and Varuṇa. It is not one book written at one moment: the collection preserves several poetic generations and was later fixed and transmitted with exceptional oral precision.',
    period:'The poetry belongs broadly to the late second millennium BCE, with important internal chronological differences. The family books, maṇḍalas 2–7, are usually treated as an older and more homogeneous core than much of maṇḍalas 1 and 10.',
    milieu:'Early Indo-Aryan sacrificial and praise-poetry in northwestern South Asia, before the mature ritual systems described in the Brāhmaṇas.',
    history:'The Ṛgveda once circulated through more than one Vedic school. Śākala is the principal complete surviving recension; the Bāṣkala tradition is known through textual evidence, variants and supplementary material but is not preserved as a comparably complete continuous text. Later padapāṭha and recitational traditions helped stabilize the wording and accentuation.',
    datingBasis:'Historical linguistics, relative chronology within the ten maṇḍalas, geography, comparison with early Iranian language and religion, and the development of Vedic ritual culture.',
    chapterMap:['Maṇḍalas 2–7: the so-called family books, each associated with a major poet-priest lineage.','Maṇḍala 8: a distinctive poetic collection with strong Kāṇva associations.','Maṇḍala 9: hymns to Soma Pavamāna arranged around the pressed and purified Soma.','Maṇḍalas 1 and 10: heterogeneous collections containing both old material and important later hymns.'],
    namedFeatures:['Nāsadīya Sūkta, 10.129','Puruṣa Sūkta, 10.90','Nadī-stuti, 10.75','Dialogue hymns and funeral hymns in maṇḍala 10'],
    bibliography:['Stephanie W. Jamison and Joel P. Brereton, The Rigveda: The Earliest Religious Poetry of India (Oxford University Press, 2014)','Michael Witzel, studies on Vedic texts, schools and chronology','Hermann Oldenberg, Prolegomena on Ṛgvedic textual history']
  });

  put('Sāmaveda', {
    overview:'The Sāmaveda is the Veda of liturgical chant. Most of the verses in its surviving Saṃhitās are drawn from the Ṛgveda, but their purpose is different: they are reorganized for performance by the Udgātṛ priests in the Soma sacrifice and are connected to specialized melodic traditions called sāmans. The printed verse collection therefore represents only part of what the living Sāmavedic tradition preserves.',
    period:'Its received liturgical organization belongs largely to the early first millennium BCE, while most of the verses themselves are inherited from older Ṛgvedic poetry.',
    milieu:'The highly specialized musical and ritual culture of the Soma sacrifice, with independent schools preserving different textual and melodic traditions.',
    history:'Three important Sāmavedic recensions survive or are substantially known: Kauthuma, Rāṇāyanīya and Jaiminīya/Talavakāra. They share a common liturgical inheritance but differ in readings, arrangement, phonetics and chant traditions. The Sāmaveda also generated an unusually rich Brāhmaṇa literature, including the Pañcaviṃśa and Jaiminīya traditions and the textual environment from which the Kena Upaniṣad emerged.',
    datingBasis:'Comparison with the Ṛgvedic source verses, development of the Soma liturgy, recensional relationships and the chronology of Sāmavedic Brāhmaṇa prose.',
    chapterMap:['Pūrvārcika: the basic verse collection used as a foundation for chant.','Uttarārcika: verses arranged for particular ritual sequences.','Gāna collections: separate performance traditions that preserve the melodic elaboration of the verses.'],
    bibliography:['W. Caland, editions and studies of Sāmavedic ritual and Brāhmaṇa literature','Michael Witzel, studies on Vedic schools and chronology','Wayne Howard, studies of Sāmavedic chant and oral performance']
  });

  put('Śukla Yajurveda', {
    overview:'The Śukla, or “White,” Yajurveda is the Vājasaneyi tradition of sacrificial formulas. Unlike the Kṛṣṇa Yajurveda schools, it transmits the ritual mantras in a comparatively separate Saṃhitā while placing much of the explanatory prose in the Śatapatha Brāhmaṇa. Its two principal surviving recensions are the Mādhyandina and Kāṇva.',
    period:'The received Saṃhitā and early Śatapatha strata belong broadly to the early first millennium BCE, with the Śatapatha itself developing through multiple layers into the middle of that millennium.',
    milieu:'North Indian śrauta ritual culture concerned with large public sacrifices, fire ritual, royal rites and increasingly elaborate ritual symbolism.',
    history:'The Vājasaneyi Saṃhitā survives in Mādhyandina and Kāṇva recensions, each accompanied by a corresponding Śatapatha Brāhmaṇa tradition. The final ritual and speculative books lead directly into the Bṛhadāraṇyaka Upaniṣad, making the Śukla Yajurveda one of the clearest examples of Upaniṣadic philosophy developing inside an older ritual corpus.',
    datingBasis:'Relative language, comparison of the Mādhyandina and Kāṇva recensions, the development of śrauta ritual and the internal chronology of the Śatapatha Brāhmaṇa.',
    chapterMap:['Vājasaneyi Saṃhitā: sacrificial formulas and verses.','Śatapatha Brāhmaṇa: extensive ritual explanation, myth and speculation.','Late Śatapatha / Bṛhadāraṇyaka material: movement from ritual interpretation toward sustained inquiry into self and Brahman.'],
    bibliography:['Julius Eggeling, The Satapatha-Brahmana, Sacred Books of the East','Michael Witzel, studies on Vedic texts and chronology','Patrick Olivelle, The Early Upaniṣads (Oxford University Press, 1998)']
  });

  put('Kṛṣṇa Yajurveda', {
    overview:'The Kṛṣṇa, or “Black,” Yajurveda is not one single recension but a family of related Vedic schools in which sacrificial formulas and explanatory prose are interwoven within the Saṃhitā itself. Important surviving traditions include Taittirīya, Maitrāyaṇī, Kāṭhaka and the fragmentary Kapiṣṭhala-Kaṭha.',
    period:'The major Saṃhitā traditions belong broadly to the early first millennium BCE, although the schools preserve different chronological layers and cannot be assigned one precise date.',
    milieu:'Yajurvedic priestly schools responsible for the spoken formulas and physical performance of elaborate śrauta sacrifice.',
    history:'Comparison among the Taittirīya, Maitrāyaṇī, Kāṭhaka and Kapiṣṭhala traditions is crucial because parallel ritual passages often survive in different forms. The Taittirīya branch became especially influential and preserves its own Brāhmaṇa and Āraṇyaka, including the Taittirīya Upaniṣad. Other schools preserve independent wording and ritual organization rather than merely “corrupt” forms of the same book.',
    datingBasis:'Historical linguistics, comparison among parallel Yajurvedic schools, ritual development and relative chronology against the Śukla Yajurveda and Brāhmaṇa literature.',
    chapterMap:['Saṃhitās: ritual formulas mixed with explanatory prose.','School-specific Brāhmaṇa and ancillary traditions.','Āraṇyaka and Upaniṣadic developments, especially in the Taittirīya and Maitrāyaṇī worlds.'],
    bibliography:['A. B. Keith, studies and translations of the Taittirīya and Yajurvedic texts','Michael Witzel, studies on Vedic schools and chronology','Critical and recensional studies of the Maitrāyaṇī, Kāṭhaka and Kapiṣṭhala traditions']
  });

  put('Atharvaveda', {
    overview:'The Atharvaveda preserves a strikingly different range of Vedic material from the three liturgical Vedas. Alongside hymns and speculative poetry it contains healing rites, protective formulas, domestic concerns, royal ritual, curses, reconciliation rites and reflections on cosmic principles. Two major recensions are important for modern study: Śaunaka and Paippalāda.',
    period:'The collection contains old material but its received organization is generally later than the oldest Ṛgvedic poetry; different hymns and books belong to different periods of the late Vedic age.',
    milieu:'Domestic, healing, royal and speculative ritual environments that overlap with but are not limited to the solemn Soma-sacrifice system of the other Vedas.',
    history:'The Śaunaka recension long dominated printed editions, while recovery and study of Paippalāda manuscripts—especially from Kashmir and Odisha—greatly expanded knowledge of Atharvavedic textual history. The Gopatha Brāhmaṇa is the surviving Brāhmaṇa associated with the Atharvaveda.',
    datingBasis:'Linguistic stratification, comparison of Śaunaka and Paippalāda, relationships with Ṛgvedic and later Vedic material, and manuscript history.',
    chapterMap:['Hymns and rites for healing and protection.','Domestic and social rites.','Royal and political ritual.','Speculative hymns on Skambha, breath, time and cosmic principles.','Large later books and recensional material whose arrangement differs between Śaunaka and Paippalāda.'],
    namedFeatures:['Skambha hymns','Bhūmi Sūkta / hymn to Earth','Healing and medicinal plant hymns','Royal consecration and protective rites'],
    bibliography:['William Dwight Whitney and Charles Rockwell Lanman, Atharva-Veda Saṃhitā','Maurice Bloomfield, Hymns of the Atharva-Veda','Dipak Bhattacharya and later scholarship on the Paippalāda recension']
  });

  function upgradeVedaHeadings() {
    document.querySelectorAll('#scripture-browser .veda-family').forEach(section => {
      const h = section.querySelector(':scope > h3');
      if (!h || h.dataset.encyclopediaReady === '1') return;
      const name = h.textContent.trim();
      if (!['Ṛgveda','Sāmaveda','Śukla Yajurveda','Kṛṣṇa Yajurveda','Atharvaveda'].includes(name)) return;
      h.dataset.encyclopediaReady = '1';
      h.innerHTML = `<button type="button" class="shastra-name veda-family-name" data-kind="Veda" data-name="${name.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}"><span>${name}</span></button>`;
    });
  }

  const observer = new MutationObserver(upgradeVedaHeadings);
  observer.observe(document.getElementById('scripture-browser') || document.body, {childList:true, subtree:true});
  upgradeVedaHeadings();
})();
