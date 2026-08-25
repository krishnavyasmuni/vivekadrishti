(() => {
  const previousOpen=window.openScriptureEncyclopedia;
  if(typeof previousOpen!=='function')return;
  const MINORS=new Set(['Ātmabodha','Mudgala','Vajrasūcī','Mahā','Sāvitrī','Garbha','Sarvasāra','Śukarahasya','Skanda','Śārīraka','Ekākṣara','Akṣi','Prāṇāgnihotra','Subāla','Mantrikā','Nirālamba','Paiṅgala','Adhyātma','Muktikā','Annapūrṇā','Sūrya','Ātma','Nirvāṇa','Āruṇi','Maitreya','Sannyāsa','Kuṇḍikā','Brahma','Avadhūta','Kaṭharudra','Jābāla','Paramahaṃsa','Bhikṣuka','Turīyātītāvadhūta','Yājñavalkya','Śāṭyāyanīya','Nārada-Parivrājaka','Paramahaṃsa-Parivrājaka','Parabrahma','Nādabindu','Yogacūḍāmaṇi','Jābāladarśana','Amṛtabindu','Amṛtanāda','Kṣurikā','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Yogaśikhā','Yogakuṇḍalinī','Varāha','Haṃsa','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advayatāraka','Śāṇḍilya','Pāśupatabrahma','Mahāvākya','Vāsudeva','Avyakta','Nārāyaṇa','Kali-Saṇṭāraṇa','Tārasāra','Nṛsiṃhatāpanī','Tripādvibhūti-Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Garuḍa','Akṣamālikā','Rudrākṣajābāla','Jābāli','Kaivalya','Kālāgnirudra','Dakṣiṇāmūrti','Rudrahṛdaya','Pañcabrahma','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Śarabha','Bhasmajābāla','Gaṇapati','Tripurā','Saubhāgyalakṣmī','Bahvṛca','Sarasvatī-rahasya','Sītā','Tripurātāpinī','Devī','Bhāvanā']);
  const CONS={'kh':'ख','gh':'घ','ch':'छ','jh':'झ','ṭh':'ठ','ḍh':'ढ','th':'थ','dh':'ध','ph':'फ','bh':'भ','k':'क','g':'ग','ṅ':'ङ','c':'च','j':'ज','ñ':'ञ','ṭ':'ट','ḍ':'ड','ṇ':'ण','t':'त','d':'द','n':'न','p':'प','b':'ब','m':'म','y':'य','r':'र','l':'ल','v':'व','ś':'श','ṣ':'ष','s':'स','h':'ह'};
  const IV={'a':'अ','ā':'आ','i':'इ','ī':'ई','u':'उ','ū':'ऊ','ṛ':'ऋ','ṝ':'ॠ','ḷ':'ऌ','e':'ए','ai':'ऐ','o':'ओ','au':'औ'};
  const MV={'a':'','ā':'ा','i':'ि','ī':'ी','u':'ु','ū':'ू','ṛ':'ृ','ṝ':'ॄ','ḷ':'ॢ','e':'े','ai':'ै','o':'ो','au':'ौ'};
  const TOK=['kh','gh','ch','jh','ṭh','ḍh','th','dh','ph','bh','ai','au','ā','ī','ū','ṛ','ṝ','ḷ','ṅ','ñ','ṭ','ḍ','ṇ','ś','ṣ','ṃ','ḥ','a','i','u','e','o','k','g','c','j','t','d','n','p','b','m','y','r','l','v','s','h'];
  function word(input){const s=String(input||'').toLowerCase();let out='',i=0;while(i<s.length){if(/[\s\-–—/]/.test(s[i])){out+=s[i++];continue;}const tok=TOK.find(t=>s.startsWith(t,i));if(!tok){out+=s[i++];continue;}if(CONS[tok]){out+=CONS[tok];i+=tok.length;const v=TOK.filter(t=>Object.prototype.hasOwnProperty.call(IV,t)).find(t=>s.startsWith(t,i));if(v){out+=MV[v];i+=v.length;}else if(i<s.length&&!/[\s\-–—/,.)]/.test(s[i])&&s[i]!=='ṃ'&&s[i]!=='ḥ')out+='्';continue;}if(Object.prototype.hasOwnProperty.call(IV,tok)){out+=IV[tok];i+=tok.length;continue;}if(tok==='ṃ'){out+='ं';i+=tok.length;continue;}if(tok==='ḥ'){out+='ः';i+=tok.length;continue;}i+=tok.length;}return out;}
  const SPECIAL={
    'Sannyāsa':'संन्यास उपनिषद्','Nṛsiṃhatāpanī':'नृसिंहतापनी उपनिषद्','Gopālatāpanī':'गोपालतापनी उपनिषद्','Rāmatāpanī':'रामतापनी उपनिषद्','Tripurātāpinī':'त्रिपुरातापिनी उपनिषद्','Bṛhajjābāla':'बृहज्जाबाल उपनिषद्','Rudrākṣajābāla':'रुद्राक्षजाबाल उपनिषद्','Bhasmajābāla':'भस्मजाबाल उपनिषद्','Nārada-Parivrājaka':'नारद-परिव्राजक उपनिषद्','Paramahaṃsa-Parivrājaka':'परमहंस-परिव्राजक उपनिषद्','Triśikhi-Brāhmaṇa':'त्रिशिखि-ब्राह्मण उपनिषद्','Maṇḍala-Brāhmaṇa':'मण्डल-ब्राह्मण उपनिषद्','Tripādvibhūti-Mahānārāyaṇa':'त्रिपाद्विभूति-महानारायण उपनिषद्','Kali-Saṇṭāraṇa':'कलि-सन्तरण उपनिषद्','Sarasvatī-rahasya':'सरस्वती-रहस्य उपनिषद्','Śukarahasya':'शुकरहस्य उपनिषद्','Pāśupatabrahma':'पाशुपतब्रह्म उपनिषद्','Rudrahṛdaya':'रुद्रहृदय उपनिषद्','Pañcabrahma':'पञ्चब्रह्म उपनिषद्','Prāṇāgnihotra':'प्राणाग्निहोत्र उपनिषद्','Yogakuṇḍalinī':'योगकुण्डलिनी उपनिषद्','Yogacūḍāmaṇi':'योगचूडामणि उपनिषद्','Jābāladarśana':'जाबालदर्शन उपनिषद्','Saubhāgyalakṣmī':'सौभाग्यलक्ष्मी उपनिषद्','Dakṣiṇāmūrti':'दक्षिणामूर्ति उपनिषद्','Turīyātītāvadhūta':'तुरीयातीतावधूत उपनिषद्','Akṣamālikā':'अक्षमालिका उपनिषद्','Advayatāraka':'अद्वयतारक उपनिषद्','Kālāgnirudra':'कालाग्निरुद्र उपनिषद्'
  };
  window.openScriptureEncyclopedia=function(button){
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';
    const result=previousOpen(button);
    if(MINORS.has(name)){
      const title=SPECIAL[name]||`${word(name)} उपनिषद्`;
      document.querySelectorAll('.up20-reader .up-title-dev,.up20-reader .ch-dev').forEach(el=>el.textContent=title);
      const fig=document.querySelector('.up20-reader .wiki-infobox-image');
      const img=fig?.querySelector('img');
      const cap=fig?.querySelector('figcaption');
      if(img&&img.src.includes('Thirty_minor_Upanishads')){
        img.src='https://archive.org/services/img/thirtyminorupani00naraiala';
        if(cap)cap.textContent=`K. Narayanasvami Aiyar’s 1914 public-domain Thirty Minor Upanishads, an early printed edition containing the ${name} Upanishad. Internet Archive.`;
      }
    }
    if(name==='Kauṣītaki'){
      const img=document.querySelector('.pr17-reader .wiki-infobox-image img,.up18-reader .wiki-infobox-image img');
      if(img)img.src='https://archive.org/services/img/dli.bengal.10689.10032';
    }
    return result;
  };
  window.SCRIPTURE_UPANISHAD_POLISH_V21=true;
})();
