#!/usr/bin/env python3
"""Generate stored literal lexical gloss files for Sridhara Svami, Bhagavatam Canto 10.

The output is deliberately not a prose translation.  Each Sanskrit lexical unit is
kept on the left and a short English lexical equivalent is placed on the right.
Existing hand-reviewed chapter data is never overwritten.
"""
from __future__ import annotations

import html
import json
import os
import re
import tempfile
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "data" / "canto10-sridhara-word-for-word"
OUT.mkdir(parents=True, exist_ok=True)

SRIDHARA_BASE = "https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIya-prastutiH/10/"
MW_ZIP = "https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/downloads/mwtxt.zip"
UA = "vivekadrishti-canto10-word-gloss/1.0"

DEVA_DIGITS = str.maketrans("०१२३४५६७८९", "0123456789")

INDEPENDENT = {
    "अ":"a","आ":"ā","इ":"i","ई":"ī","उ":"u","ऊ":"ū","ऋ":"ṛ","ॠ":"ṝ","ऌ":"ḷ","ए":"e","ऐ":"ai","ओ":"o","औ":"au",
}
MARKS = {"ा":"ā","ि":"i","ी":"ī","ु":"u","ू":"ū","ृ":"ṛ","ॄ":"ṝ","ॢ":"ḷ","े":"e","ै":"ai","ो":"o","ौ":"au"}
CONS = {
    "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ṅ","च":"c","छ":"ch","ज":"j","झ":"jh","ञ":"ñ",
    "ट":"ṭ","ठ":"ṭh","ड":"ḍ","ढ":"ḍh","ण":"ṇ","त":"t","थ":"th","द":"d","ध":"dh","न":"n",
    "प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"ś","ष":"ṣ","स":"s","ह":"h","ळ":"ḷ",
}

COMMON = {
    "a":"not","an":"not","na":"not","mā":"do not","ca":"and","tu":"but","api":"also","eva":"only; indeed","hi":"indeed; because","vai":"indeed","uta":"and; also","atha":"now; then","vā":"or","khalu":"indeed","nūnam":"certainly","sma":"indeed; formerly",
    "iti":"thus","ity":"thus","ityādi":"and so on","ity-ādi":"and so on","ityarthaḥ":"this is the meaning","ity-arthaḥ":"this is the meaning","iti-arthaḥ":"this is the meaning","ityāha":"thus he says","ity-āha":"thus he says","ityuktam":"thus stated","ity-uktam":"thus stated",
    "atra":"here","tatra":"there; in that","yatra":"where","sarvatra":"everywhere","anyatra":"elsewhere","antar":"within","antaḥ":"within","bahiḥ":"outside","agre":"before; in front","paścāt":"afterwards","madhye":"in the middle; among","samīpe":"near","dūre":"far",
    "adya":"today; now","idānīm":"now","tadā":"then","kadā":"when","sadā":"always","nityam":"always; eternally","punaḥ":"again","bhūyaḥ":"again; further","sakṛt":"once","kramāt":"in order","ciram":"for a long time",
    "yataḥ":"because; from which","ataḥ":"therefore; from this","tataḥ":"then; from that","yasmāt":"because; from which","tasmāt":"therefore; from that","yathā":"as; just as","tathā":"so; in that way","yadā":"when","yadi":"if","cet":"if","tarhi":"then","kintu":"but","kiṁtu":"but","tathāpi":"nevertheless",
    "kim":"what","kiṁ":"what","kaḥ":"who","kā":"who; which","ke":"who; which","kasya":"whose; of whom","kasmai":"to whom","kasmāt":"from whom; why","katham":"how","kutaḥ":"from where; why","kati":"how many","nanu":"but surely; indeed","nanv":"but surely",
    "yaḥ":"who; which","yā":"who; which","yat":"which; that which","ye":"those who","yasya":"whose; of which","yasmin":"in whom; in which","yena":"by whom; by which","yam":"whom; which","yeṣām":"of whom; of which","saḥ":"he; that","sā":"she; that","tat":"that","te":"they; those","tasya":"of him; of that","tasmin":"in him; in that","tena":"by him; by that","tam":"him; that","tān":"them; those","teṣām":"of them","ayam":"this; he","iyam":"this; she","idam":"this","ime":"these","asya":"of this; of him","asmin":"in this","anena":"by this","imam":"this","etad":"this","etat":"this","eṣaḥ":"this; he","eṣā":"this; she","ete":"these",
    "aham":"I","ahaṁ":"I","mama":"my; of me","mayā":"by me","mahyaṁ":"to me","mām":"me","vayam":"we","asmākam":"our; of us","naḥ":"us; our","tvam":"you","tvaṁ":"you","tava":"your; of you","tvayā":"by you","tubhyaṁ":"to you","tvām":"you","sva":"own; self","svayam":"himself; oneself",
    "anya":"other","anyat":"other","apara":"other; later","ubha":"both","ubhaya":"both","eka":"one","dvi":"two","tri":"three","catur":"four","pañca":"five","ṣaṭ":"six","sapta":"seven","aṣṭa":"eight","nava":"nine","daśa":"ten","sarva":"all","viśva":"all; universe","akhila":"all; entire","sakala":"all; complete","samasta":"all; entire","bahu":"many; much","alpa":"little; small","mahā":"great","mahat":"great","parama":"supreme","para":"higher; other","uttama":"highest; excellent","mukhya":"principal","pūrva":"previous","uttara":"later; answer","prathama":"first","dvitīya":"second","tṛtīya":"third","caturtha":"fourth","śeṣa":"remaining; remainder",
    "artha":"meaning; object; purpose","arthaḥ":"meaning; object; purpose","artham":"for the purpose; meaning","bhāva":"sense; purport; state","bhāvaḥ":"sense; purport; state","abhiprāya":"intention; intended sense","abhiprāyeṇa":"with the intended sense","tātparya":"purport; intention","lakṣaṇa":"characteristic; definition","viśeṣa":"specific distinction","sāmānya":"general","bheda":"difference; division","saṁjñā":"designation; name","nāma":"name","pada":"word; term; position","vākya":"sentence; statement","śabda":"word; sound","vacana":"statement; grammatical number","samāsa":"compound","dhātu":"verbal root","pratyaya":"suffix; cognition","anvaya":"syntactic connection","vyākhyā":"explanation; commentary","vyākhyānam":"explanation","vyākhyāta":"explained","vyākhyātam":"explained","avyākhyātam":"unexplained","śruti":"scripture; hearing","smṛti":"remembered scripture; remembrance","purāṇa":"Purāṇa","śāstra":"scripture","śloka":"verse","ślokaḥ":"verse","śloke":"in the verse","sūtra":"aphorism","uktam":"stated","ukta":"stated","uktaḥ":"stated","uktā":"stated","uktāni":"stated things","proktam":"declared","prokta":"declared","kathitam":"narrated","kathita":"narrated","nirūpitam":"established; described","nirūpita":"established; described","varṇitam":"described","varṇita":"described","jñeyam":"to be known","draṣṭavyam":"to be seen","śrotavyam":"to be heard","mantavyam":"to be considered",
    "āha":"says","āhuḥ":"they say","uvāca":"said","ūcuḥ":"they said","abravīt":"said","brūte":"says","brūhi":"tell","vakti":"says","vadati":"says","vada":"speak; tell","vadasva":"speak; tell","kathyate":"is narrated","ucyate":"is said","manyate":"considers","manye":"I consider","paśyati":"sees","dṛśyate":"is seen","śṛṇoti":"hears","śṛṇu":"hear","śrutvā":"having heard","śrutam":"heard","jānāti":"knows","viduḥ":"they know","vetti":"knows","vidvān":"learned person","smarati":"remembers","pṛcchati":"asks",
    "asti":"is","santi":"are","āsīt":"was","bhavati":"is; becomes","bhavanti":"are; become","bhavet":"may be; becomes","syāt":"may be","sambhavati":"arises; is possible","ghaṭate":"is possible; occurs","vartate":"exists; remains","tiṣṭhati":"stands; remains","vidyate":"exists","nāsti":"does not exist","abhāva":"absence",
    "karoti":"does; makes","kurute":"does; makes","kuru":"do; make","kṛtvā":"having done; having made","kṛta":"done; made","kṛtam":"done; made","dadāti":"gives","dattam":"given","dattvā":"having given","prayacchati":"bestows","gṛhṇāti":"takes","gṛhītvā":"having taken","dhṛta":"held; bearing","tyajati":"abandons","tyaktvā":"having abandoned","rakṣati":"protects","arakṣat":"protected","jagopa":"protected","hanti":"kills","hatvā":"having killed","hata":"killed","vadha":"killing","jayati":"conquers","jita":"conquered","tarati":"crosses","gacchati":"goes","agāt":"went","gata":"gone","gataḥ":"gone","gatvā":"having gone","āgata":"come; arrived","āgatya":"having come","praviśati":"enters","praviṣṭa":"entered","eti":"goes; comes","yāti":"goes","nayati":"leads","ānayati":"brings","labhate":"obtains","labdha":"obtained","prāpnoti":"attains","prāpta":"attained","jāyate":"is born","jāta":"born","janma":"birth","mriyate":"dies","mṛtyu":"death","jīvati":"lives","jīva":"living being","cakāra":"did; made","akarot":"did; made","abhavat":"became; was","babhūva":"became; was","jagāma":"went","yayau":"went","dadarśa":"saw","śuśrāva":"heard","mene":"considered","jajñe":"was born","lebhe":"obtained","dadau":"gave",
    "bhagavat":"the Supreme Lord","bhagavān":"the Supreme Lord","bhagavataḥ":"of the Supreme Lord","bhagavati":"in the Supreme Lord","bhagavatā":"by the Supreme Lord","īśvara":"Lord; controller","īśa":"Lord","paramātmā":"Supersoul","ātman":"self","ātmā":"self","brahman":"Brahman; Absolute","brahma":"Brahman; Absolute","hari":"Hari","hareḥ":"of Hari","kṛṣṇa":"Kṛṣṇa","kṛṣṇaḥ":"Kṛṣṇa","kṛṣṇasya":"of Kṛṣṇa","rāma":"Rāma","viṣṇu":"Viṣṇu","nārāyaṇa":"Nārāyaṇa","vāsudeva":"Vāsudeva","govinda":"Govinda","gopāla":"Gopāla","baladeva":"Baladeva","śrī":"Śrī; sacred; glorious","deva":"deity; god","devī":"goddess","sura":"god; demigod","asura":"demon","ṛṣi":"sage","muni":"sage","rājā":"king","nṛpa":"king","brāhmaṇa":"brāhmaṇa","vaiṣṇava":"Vaiṣṇava","bhakta":"devotee","bhakti":"devotion","jñāna":"knowledge","yoga":"yoga; connection","dharma":"dharma; duty","adharma":"unrighteousness","karma":"action; karma","mokṣa":"liberation","mukti":"liberation","saṁsāra":"worldly existence","bhava":"worldly existence; becoming","māyā":"māyā; illusory power","śakti":"power","kāla":"time","puruṣa":"person; Puruṣa","prakṛti":"nature; material nature","guṇa":"quality; mode","līlā":"pastime","carita":"deed; history","kathā":"narration; account","vīrya":"heroic deed; potency","rūpa":"form","svarūpa":"own form; essential nature","aṁśa":"part; portion","avatāra":"descent; incarnation","avatīrṇa":"descended","deha":"body","śarīra":"body","aṅga":"limb; body","manas":"mind","manaḥ":"mind","buddhi":"intelligence","citta":"mind; consciousness","hṛdaya":"heart","indriya":"sense","prāṇa":"life-air; living being","loka":"world","jagat":"world; universe","sarga":"creation","sṛṣṭi":"creation","saṁhāra":"destruction","pralaya":"dissolution","kula":"family","vaṁśa":"dynasty","putra":"son","suta":"son","tanaya":"son","pitṛ":"father; ancestor","mātṛ":"mother","mātā":"mother","bhāryā":"wife","pati":"husband; lord","sakhā":"friend","jana":"person; people","prāṇin":"living being","paśu":"animal","go":"cow; earth; speech","vraja":"Vraja","gokula":"Gokula","mathurā":"Mathurā","dvārakā":"Dvārakā","vṛndāvana":"Vṛndāvana",
    "satya":"true; truth","satyam":"true","śubha":"auspicious","aśubha":"inauspicious","sukha":"happiness","duḥkha":"suffering","ānanda":"bliss","paramānanda":"supreme bliss","prema":"love","kāma":"desire","krodha":"anger","lobha":"greed","moha":"delusion","bhaya":"fear","śoka":"sorrow","tṛṣṇā":"thirst; craving","tarṣa":"thirst; craving","icchā":"desire","dayā":"compassion","kṛpā":"mercy","prasāda":"grace; favor","yaśas":"glory","tejas":"splendor; power","bala":"strength","śaurya":"heroism","aiśvarya":"lordship; opulence","mādhurya":"sweetness","doṣa":"fault","kāraṇa":"cause","hetu":"cause; reason","phala":"fruit; result","upāya":"means","sādhana":"means; practice","sādhya":"goal","viṣaya":"object; subject","āśraya":"shelter","nimitta":"cause; occasion","prayojana":"purpose","sambandha":"relation","bīja":"seed","nidāna":"source; cause","anta":"end","ādi":"beginning; and so on","madhya":"middle","krama":"order; sequence","prakāra":"manner; kind","rasa":"rasa; relish","amṛta":"nectar; immortality","amṛtam":"nectar; immortality",
    "sahita":"together with","saha":"with","vinā":"without","ṛte":"without; except","prati":"toward; regarding","anu":"after; according to","adhika":"more; greater","nyūna":"less; deficient","tulya":"equal; like","iva":"like; as if","vat":"like; possessing","mātra":"only; measure","kevala":"only; exclusive","evaṁ":"thus; in this way","evam":"thus; in this way","sarvathā":"in every way","viśeṣataḥ":"especially","prāyaḥ":"generally; mostly","vastutaḥ":"in reality","sākṣāt":"directly","svataḥ":"by itself; intrinsically","krameṇa":"gradually; in order","saṅkṣepeṇa":"briefly","vistareṇa":"in detail","spaṣṭam":"clearly","samyak":"properly; completely","ati":"very; exceedingly","atyanta":"extreme; complete","nitarām":"greatly","sarvadā":"always",
    "śravaṇa":"hearing","kīrtana":"glorification","smaraṇa":"remembrance","darśana":"seeing; vision","sevā":"service","pūjā":"worship","stuti":"praise","praṇāma":"obeisance","namas":"obeisance","namaḥ":"obeisance","śaraṇa":"shelter","śaraṇam":"shelter","caraṇa":"foot","pāda":"foot; quarter","padma":"lotus","kamala":"lotus","mukha":"face; mouth","netra":"eye","cakṣuḥ":"eye","karṇa":"ear","śrotra":"ear; hearing","hasta":"hand","kara":"hand; doer","kukṣi":"womb; belly","garbha":"womb; embryo","mukta":"liberated","mumukṣu":"seeker of liberation","viṣayin":"material enjoyer","dṛṣṭi":"vision","antaryāmin":"Inner Controller",
    "samudra":"ocean","sāgara":"ocean","nadī":"river","jala":"water","vāri":"water","agni":"fire","vahni":"fire","sūrya":"sun","soma":"moon","candra":"moon","pṛthivī":"earth","bhūmi":"earth","ākāśa":"ether; sky","vāyu":"air","vana":"forest","giri":"mountain","parvata":"mountain","nagara":"city","pura":"city","gṛha":"house","grāma":"village","ratha":"chariot","cakra":"disc; wheel","gadā":"mace","astra":"weapon","śastra":"weapon","yuddha":"battle","samara":"battle","sainya":"army","śatru":"enemy","mitra":"friend","plava":"boat",
}

CASE_RULES = [
    (re.compile(r"ebhyaḥ$"), "a", "from/for {x}s"), (re.compile(r"ānām$"), "a", "of {x}s"), (re.compile(r"ayoḥ$"), "a", "of the two {x}s"),
    (re.compile(r"eṣu$"), "a", "in/among {x}s"), (re.compile(r"aiḥ$"), "a", "by/with {x}s"), (re.compile(r"asya$"), "a", "of {x}"),
    (re.compile(r"āya$"), "a", "to/for {x}"), (re.compile(r"ena$"), "a", "by/with {x}"), (re.compile(r"āt$"), "a", "from {x}"),
    (re.compile(r"e$"), "a", "in/on {x}"), (re.compile(r"am$"), "a", "{x}"), (re.compile(r"aḥ$"), "a", "{x}"),
    (re.compile(r"āḥ$"), "a", "{x}s"), (re.compile(r"ān$"), "a", "{x}s"), (re.compile(r"au$"), "a", "the two {x}s"),
    (re.compile(r"yāḥ$"), "ī", "of {x}"), (re.compile(r"yām$"), "ī", "in {x}"), (re.compile(r"yā$"), "ī", "by {x}"),
    (re.compile(r"īnām$"), "ī", "of {x}s"), (re.compile(r"īṣu$"), "ī", "in {x}s"),
    (re.compile(r"inaḥ$"), "in", "of {x}"), (re.compile(r"inā$"), "in", "by {x}"), (re.compile(r"ini$"), "in", "in {x}"),
]

SLP_PAIRS = [
    ("kh","K"),("gh","G"),("ch","C"),("jh","J"),("ṭh","W"),("ḍh","Q"),("th","T"),("dh","D"),("ph","P"),("bh","B"),
    ("ai","E"),("au","O"),("ā","A"),("ī","I"),("ū","U"),("ṛ","f"),("ṝ","F"),("ḷ","x"),("ṅ","N"),("ñ","Y"),("ṭ","w"),("ḍ","q"),("ṇ","R"),("ś","S"),("ṣ","z"),("ṃ","M"),("ṁ","M"),("ḥ","H"),
]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()


def devanagari_to_iast(text: str) -> str:
    chars = list(text)
    out = []
    i = 0
    while i < len(chars):
        ch = chars[i]
        if ch in CONS:
            out.append(CONS[ch])
            nxt = chars[i + 1] if i + 1 < len(chars) else ""
            if nxt == "्":
                i += 2
                continue
            if nxt in MARKS:
                out.append(MARKS[nxt]); i += 2; continue
            out.append("a"); i += 1; continue
        if ch in INDEPENDENT: out.append(INDEPENDENT[ch])
        elif ch in MARKS: out.append(MARKS[ch])
        elif ch == "ं": out.append("ṃ")
        elif ch == "ः": out.append("ḥ")
        elif ch == "ँ": out.append("m̐")
        elif ch == "ऽ": out.append("’")
        elif ch == "।": out.append(" | ")
        elif ch == "॥": out.append(" || ")
        elif ch == "़" or ch == "्": pass
        elif ch in "०१२३४५६७८९": out.append(ch.translate(DEVA_DIGITS))
        else: out.append(ch)
        i += 1
    return re.sub(r"\s+", " ", "".join(out)).strip()


def normalize_iast(s: str) -> str:
    s = s.lower().replace("’", "'").replace("‘", "'").replace("`", "'")
    s = re.sub(r"^[^a-zāīūṛṝḷṃṁḥṅñṭḍṇśṣ'\-]+|[^a-zāīūṛṝḷṃṁḥṅñṭḍṇśṣ'\-]+$", "", s)
    return s.strip("'-")


def iast_to_slp1(s: str) -> str:
    s = normalize_iast(s)
    for a, b in SLP_PAIRS:
        s = s.replace(a, b)
    return s


def clean_markdown(s: str) -> str:
    s = re.sub(r"\[\^[^\]]+\]", "", s)
    s = re.sub(r"\\([\\`*_{}\[\]()#+\-.!])", r"\1", s)
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)
    s = re.sub(r"__([^_]+)__", r"\1", s)
    s = re.sub(r"\*([^*\n]+)\*", r"\1", s)
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\s+", " ", s).strip()


def chapter_path(ch: int) -> str:
    f = f"{ch:02d}"
    if ch <= 11: return f"01-11/{f}.md"
    if ch <= 17: return f"12-17/{f}.md"
    if ch <= 28: return f"18-28/{f}.md"
    if ch == 29: return "29-33_rasa-panchAdhyAya/29.md"
    if ch == 30: return "29-33_rasa-panchAdhyAya/30_atha-triMshodhyAyaH_unnumbered.md"
    if ch == 31: return "29-33_rasa-panchAdhyAya/31_athaikatriMshodhyAyaH_unnumbered.md"
    if ch == 32: return "29-33_rasa-panchAdhyAya/32_atha-dvAtriMshodhyAyaH_unnumbered.md"
    if ch == 33: return "29-33_rasa-panchAdhyAya/33_atha-trayastriMshodhyAyaH_unnumbered.md"
    if ch <= 49: return f"34-49/{f}.md"
    if ch <= 59: return f"50-59/{f}.md"
    if ch <= 69: return f"60-69/{f}.md"
    if ch <= 79: return f"70-79/{f}.md"
    if 80 <= ch <= 84: return "80-86/70_athAshItitamo-dhyayaH.md"
    if ch == 85: return "80-86/72_bhagavatA_devakI-prArthanayA_tadIya-mRta-putrAN.md"
    if ch == 86: return "80-86/74_10_86_1.md"
    if ch == 87: return "87.md"
    return {88:"88-90/70.md",89:"88-90/71.md",90:"88-90/72.md"}[ch]


def parse_sridhara(md: str, chapter: int) -> list[tuple[int, int, str]]:
    marker = re.compile(r"॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*॥")
    marks = list(marker.finditer(md))
    label = re.compile(r"\*\*(?:श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)|श्रीधर-स्वामी|श्रीधरः)\s*:\*\*")
    stops = re.compile(r"\n(?:_{4,}|\*\*(?:वंशीधरः|वीरराघव|विजयध्वज|श्रीनाथ|सनातन|जीव-?गोस्वामी|विश्वनाथ))")
    out = []
    for i, m in enumerate(marks):
        canto = int(m.group(1).translate(DEVA_DIGITS)); ch = int(m.group(2).translate(DEVA_DIGITS))
        if canto != 10 or ch != chapter: continue
        start = int(m.group(3).translate(DEVA_DIGITS)); end = int((m.group(4) or m.group(3)).translate(DEVA_DIGITS))
        a = m.end(); b = marks[i+1].start() if i + 1 < len(marks) else len(md)
        seg = md[a:b]
        lm = label.search(seg)
        if not lm: continue
        text = seg[lm.end():]
        sm = stops.search(text)
        if sm: text = text[:sm.start()]
        text = clean_markdown(text)
        if text: out.append((start, end, text))
    return out


def build_mw() -> dict[str, str]:
    print("Downloading Monier-Williams dictionary…", flush=True)
    raw = fetch(MW_ZIP)
    with zipfile.ZipFile(__import__('io').BytesIO(raw)) as z:
        name = next(n for n in z.namelist() if n.endswith("mw.txt"))
        text = z.read(name).decode("utf-8", errors="replace")
    print(f"Dictionary bytes decoded: {len(text):,}", flush=True)
    lex: dict[str, str] = {}
    entry_re = re.compile(r"^<L>[^\n]*?<k1>([^<]+)<k2>[^\n]*\n(.*?)^<LEND>$", re.M | re.S)
    for m in entry_re.finditer(text):
        key = m.group(1).strip()
        if key in lex: continue
        body = m.group(2)
        # Sanskrit examples and bibliographic references are not English glosses.
        body = re.sub(r"<s>.*?</s>", " ", body, flags=re.S)
        body = re.sub(r"<s1\b.*?</s1>", " ", body, flags=re.S)
        body = re.sub(r"<ls>.*?</ls>", " ", body, flags=re.S)
        body = re.sub(r"<etym>.*?</etym>", " ", body, flags=re.S)
        body = re.sub(r"<[^>]+>", " ", body)
        body = html.unescape(body).replace("¦", " ")
        body = re.sub(r"\[[^\]]*\]", " ", body)
        body = re.sub(r"\s+", " ", body).strip(" ,;:-")
        body = re.sub(r"^(?:m|f|n|mf|mfn|ind|adj|adv|pron|part)\.?\s*", "", body, flags=re.I)
        if not body: continue
        # Take a short literal dictionary equivalent, not the historical citations.
        meaning = re.split(r"\s*[;।]\s*|\s{2,}", body, maxsplit=1)[0].strip(" ,;:-")
        if len(meaning) > 150:
            meaning = meaning[:147].rsplit(" ", 1)[0] + "…"
        if meaning: lex[key] = meaning
    print(f"Dictionary headwords indexed: {len(lex):,}", flush=True)
    return lex


def candidates(token: str) -> list[tuple[str, str | None]]:
    t = normalize_iast(token)
    out: list[tuple[str, str | None]] = [(t, None)]
    for pat, repl, template in CASE_RULES:
        if pat.search(t): out.append((pat.sub(repl, t), template))
    if t.endswith("ḥ"): out.append((t[:-1], None))
    if t.endswith(("m", "ṃ")): out.append((t[:-1], None))
    if t.endswith("am"): out.append((t[:-2] + "a", None))
    seen = set(); result = []
    for x in out:
        if x[0] and x[0] not in seen:
            seen.add(x[0]); result.append(x)
    return result


def lookup(unit: str, mw: dict[str, str]) -> str:
    t = normalize_iast(unit)
    if not t: return ""
    if t in COMMON: return COMMON[t]
    for cand, template in candidates(t):
        key = iast_to_slp1(cand)
        if key in mw:
            val = mw[key]
            return template.format(x=val) if template else val
    return ""


def token_units(iast: str, mw: dict[str, str]) -> list[str]:
    raw = re.sub(r"\[[^\]]*\]|\|+|\b\d+(?:\.\d+)*\b", " ", iast)
    tokens = [normalize_iast(x) for x in raw.split()]
    result = []
    for token in filter(None, tokens):
        if lookup(token, mw) or "-" not in token:
            result.append(token)
        else:
            result.extend([p for p in (normalize_iast(x) for x in token.split("-")) if p])
    return result


def make_gloss(text: str, mw: dict[str, str]) -> tuple[str, int, int]:
    iast = devanagari_to_iast(text)
    units = token_units(iast, mw)
    parts = []
    unresolved = 0
    for u in units:
        meaning = lookup(u, mw)
        if not meaning:
            unresolved += 1
            meaning = u  # Preserve the exact lexical form rather than inventing an English meaning.
        parts.append(f"{u} — {meaning}")
    return "; ".join(parts) + ("." if parts else ""), unresolved, len(units)


def main() -> None:
    mw = build_mw()
    source_cache: dict[str, str] = {}
    total_units = total_unresolved = total_entries = 0

    for chapter in range(2, 91):
        path = chapter_path(chapter)
        if path not in source_cache:
            print(f"Fetching source {path}", flush=True)
            source_cache[path] = fetch(SRIDHARA_BASE + path).decode("utf-8", errors="replace")
        entries = parse_sridhara(source_cache[path], chapter)
        data = {}
        ch_units = ch_unresolved = 0
        for start, end, text in entries:
            gloss, unresolved, units = make_gloss(text, mw)
            key = str(start) if start == end else f"{start}-{end}"
            data[key] = {"word_for_word": gloss}
            ch_units += units; ch_unresolved += unresolved; total_entries += 1
        out_path = OUT / f"{chapter:02d}.json"
        out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        total_units += ch_units; total_unresolved += ch_unresolved
        rate = 100.0 * (ch_units - ch_unresolved) / ch_units if ch_units else 100.0
        print(f"Chapter {chapter:02d}: {len(data)} Sridhara blocks; {ch_units} units; {rate:.1f}% lexical matches", flush=True)

    manifest = {
        "scope": "Sridhara Svami Bhavartha-dipika, Srimad Bhagavatam Canto 10",
        "format": "literal lexical word-for-word only; no prose translation",
        "chapters": list(range(1, 91)),
        "generated_chapters": list(range(2, 91)),
        "hand_reviewed_chapter_data_preserved": [1],
        "sridhara_blocks_generated": total_entries,
        "lexical_units": total_units,
        "dictionary_matched_units": total_units - total_unresolved,
        "unresolved_units_preserved_as_sanskrit": total_unresolved,
        "source": "vishvAsa/purANam_vaiShNavam content branch",
        "dictionary": "Monier-Williams Sanskrit-English Dictionary (Cologne Digital Sanskrit Lexicon)",
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
