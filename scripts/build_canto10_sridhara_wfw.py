#!/usr/bin/env python3
"""Build literal Śrīdhara Svāmī word-for-word gloss data for Bhāgavatam Canto 10.

Sources:
- Śrīdhara Sanskrit: vishvAsa/purANam_vaiShNavam, branch content
- Verse-context synonyms: Prabhupāda text in the same Vishvasa repository
- Lexical fallback: Monier-Williams Sanskrit-English Dictionary (Cologne CSL)

The output is deliberately lexical, not prose commentary.  Every item is emitted
as "Sanskrit unit — English equivalent".  Unresolved units are recorded in the
audit instead of being silently invented.
"""
from __future__ import annotations

import html
import json
import os
import re
import sys
import time
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "data" / "canto10-sridhara-word-for-word"
CACHE = ROOT / ".cache" / "canto10-wfw"
OUT.mkdir(parents=True, exist_ok=True)
CACHE.mkdir(parents=True, exist_ok=True)

VISHVASA = "https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam"
SRIDHARA_BASE = f"{VISHVASA}/gauDIya-prastutiH/10"
PRABHUPADA_BASE = f"{VISHVASA}/gauDIyo_abhaya-charaNaH/10"
MW_URL = "https://raw.githubusercontent.com/sanskrit-lexicon/csl-orig/main/v02/mw/mw.txt"
MW_CACHE = CACHE / "mw.txt"

DEV_DIGITS = str.maketrans("०१२३४५६७८९", "0123456789")
TOKEN_RE = re.compile(r"[A-Za-zĀāĪīŪūṚṛṜṝḶḷḸḹṀṁṂṃḤḥṄṅÑñṬṭḌḍṆṇŚśṢṣ’'\-]+")
MARKER_RE = re.compile(r"॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*॥")
SRIDHARA_LABEL_RE = re.compile(r"\*\*(?:श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)|श्रीधर-स्वामी|श्रीधरः)\s*:\*\*")
STOP_RE = re.compile(
    r"\n(?:_{4,}|\*\*(?:वंशीधरः|वीरराघव|विजयध्वज|श्रीनाथ|सनातन|जीव-?गोस्वामी|विश्वनाथ|बलदेव|शुकदेवाचार्य|गिरिधर|राधारमण)[^\n]*:\*\*)"
)

# Frequent commentarial function words and forms.  Meanings are intentionally
# short and literal; dictionary/morphology supplies the rest.
COMMON = {
    "a": "not", "an": "not", "na": "not", "mā": "do not", "ca": "and",
    "tu": "but", "api": "also", "eva": "only; indeed", "hi": "indeed; because",
    "vai": "indeed", "uta": "and; also", "atha": "now; then", "vā": "or",
    "khalu": "indeed", "nūnam": "certainly", "kila": "indeed; it is said",
    "sma": "indeed; formerly", "aho": "oh", "hanta": "alas; indeed", "bata": "alas; indeed",
    "iti": "thus", "ity": "thus", "ityādi": "and so on", "ity-ādi": "and so on",
    "ityarthaḥ": "this is the meaning", "ity-arthaḥ": "this is the meaning",
    "ityāha": "thus he says", "ity-āha": "thus he says", "ityuktam": "thus stated",
    "atra": "here", "tatra": "there; in that", "yatra": "where", "sarvatra": "everywhere",
    "anyatra": "elsewhere", "antar": "within", "antaḥ": "within", "bahiḥ": "outside",
    "agre": "before; in front", "paścāt": "afterwards", "puraḥ": "before; in front",
    "upari": "above; upon", "adhaḥ": "below", "madhye": "in the middle; among",
    "adya": "today; now", "idānīm": "now", "tadā": "then", "kadā": "when",
    "sadā": "always", "nityam": "always; eternally", "punaḥ": "again", "bhūyaḥ": "again; further",
    "yataḥ": "because; from which", "ataḥ": "therefore; from this", "tataḥ": "then; from that",
    "yasmāt": "because; from which", "tasmāt": "therefore; from that", "yathā": "as; just as",
    "tathā": "so; in that way", "yadā": "when", "yadi": "if", "cet": "if", "tarhi": "then",
    "kintu": "but", "kiṁtu": "but", "tathāpi": "nevertheless", "evaṁ": "thus; in this way",
    "evam": "thus; in this way", "kim": "what", "kiṁ": "what", "kaḥ": "who",
    "kā": "who; which", "ke": "who; which", "kasya": "whose; of whom", "katham": "how",
    "kutaḥ": "from where; why", "nanu": "but surely; an objection", "nanv": "but surely; an objection",
    "yaḥ": "who; which", "yā": "who; which", "yat": "which; that which", "ye": "those who",
    "yasya": "whose; of which", "yasmin": "in whom; in which", "yena": "by whom; by which",
    "yam": "whom; which", "yān": "whom; which", "yeṣām": "of whom; of which",
    "saḥ": "he; that", "sā": "she; that", "tat": "that", "te": "they; those",
    "tasya": "of him; of that", "tasmin": "in him; in that", "tena": "by him; by that",
    "tam": "him; that", "tān": "them; those", "tayā": "by her; by that", "teṣām": "of them",
    "ayam": "this; he", "iyam": "this; she", "idam": "this", "ime": "these",
    "asya": "of this; of him", "asmin": "in this", "anena": "by this", "imam": "this",
    "etad": "this", "etat": "this", "eṣaḥ": "this; he", "eṣā": "this; she", "ete": "these",
    "aham": "I", "ahaṁ": "I", "mama": "my; of me", "mayā": "by me", "mām": "me",
    "vayam": "we", "asmākam": "our; of us", "naḥ": "us; our", "tvam": "you", "tvaṁ": "you",
    "tava": "your; of you", "tvayā": "by you", "tvām": "you", "sva": "own; self", "svayam": "himself; oneself",
    "anya": "other", "anyat": "other", "apara": "other; later", "ubha": "both", "ubhaya": "both",
    "eka": "one", "dvi": "two", "tri": "three", "catur": "four", "pañca": "five", "ṣaṭ": "six",
    "sapta": "seven", "aṣṭa": "eight", "nava": "nine", "daśa": "ten", "sarva": "all",
    "viśva": "all; universe", "akhila": "all; entire", "sakala": "all; complete", "samasta": "all; entire",
    "bahu": "many; much", "alpa": "little; small", "mahā": "great", "mahat": "great",
    "parama": "supreme", "para": "higher; other", "uttama": "highest; excellent", "adhama": "lowest",
    "mukhya": "principal", "gauṇa": "secondary", "pūrva": "previous; eastern", "uttara": "later; answer",
    "prathama": "first", "dvitīya": "second", "tṛtīya": "third", "caturtha": "fourth", "śeṣa": "remaining",
    "artha": "meaning; object; purpose", "arthaḥ": "meaning; object; purpose", "artham": "meaning; for the purpose",
    "bhāva": "sense; purport; state", "bhāvaḥ": "sense; purport; state", "abhiprāya": "intention; intended sense",
    "abhiprāyeṇa": "with the intended sense", "tātparya": "purport; intention", "lakṣaṇa": "characteristic; definition",
    "viśeṣa": "specific distinction", "sāmānya": "general", "bheda": "difference; division", "saṁjñā": "designation; name",
    "nāma": "name", "pada": "word; term; position", "vākya": "sentence; statement", "śabda": "word; sound",
    "vacana": "statement; grammatical number", "samāsa": "compound", "dhātu": "verbal root", "pratyaya": "suffix; cognition",
    "anvaya": "connection; syntactic connection", "vyākhyā": "explanation; commentary", "vyākhyānam": "explanation",
    "vyākhyātam": "explained", "avyākhyātam": "unexplained", "śruti": "scripture; hearing", "smṛti": "remembered scripture; remembrance",
    "purāṇa": "Purāṇa", "śāstra": "scripture", "śloka": "verse", "ślokaḥ": "verse", "sūtra": "aphorism",
    "uktam": "stated", "ukta": "stated", "uktaḥ": "stated", "uktā": "stated", "uktāni": "stated things",
    "proktam": "declared", "kathitam": "narrated", "nirūpitam": "established; described", "varṇitam": "described",
    "jñeyam": "to be known", "draṣṭavyam": "to be seen", "śrotavyam": "to be heard", "mantavyam": "to be considered",
    "āha": "says", "āhuḥ": "they say", "uvāca": "said", "ūcuḥ": "they said", "abravīt": "said",
    "brūte": "says", "brūhi": "tell", "vakti": "says", "vadati": "says", "vada": "tell; speak", "vadasva": "tell; speak",
    "ucyate": "is said", "kathyate": "is narrated", "varṇyate": "is described", "nirūpyate": "is established; described",
    "manyate": "considers", "manye": "I consider", "paśyati": "sees", "dṛśyate": "is seen", "śṛṇoti": "hears",
    "śṛṇu": "hear", "śrutvā": "having heard", "jānāti": "knows", "viduḥ": "they know", "vetti": "knows",
    "vidvān": "learned person", "buddhvā": "having understood", "pṛcchati": "asks", "pṛṣṭaḥ": "asked",
    "asti": "is", "santi": "are", "āsīt": "was", "bhavati": "is; becomes", "bhavanti": "are; become",
    "bhavet": "may be; becomes", "syāt": "may be", "sambhavati": "arises; is possible", "ghaṭate": "is possible; occurs",
    "vartate": "exists; remains", "vidyate": "exists", "nāsti": "does not exist", "karoti": "does; makes",
    "kurute": "does; makes", "kuru": "do; make", "kṛtvā": "having done; having made", "kṛta": "done; made",
    "dadāti": "gives", "dattam": "given", "dattvā": "having given", "prayacchati": "bestows", "gṛhṇāti": "takes",
    "gṛhītvā": "having taken", "dhṛta": "held; bearing", "tyajati": "abandons", "tyaktvā": "having abandoned",
    "rakṣati": "protects", "arakṣat": "protected", "rakṣita": "protected", "jagopa": "protected", "hanti": "kills",
    "hatvā": "having killed", "hata": "killed", "vadha": "killing", "jayati": "conquers", "tarati": "crosses",
    "gacchati": "goes", "gatvā": "having gone", "gata": "gone", "āgata": "come; arrived", "praviśati": "enters",
    "praviṣṭa": "entered", "labhate": "obtains", "prāpnoti": "attains", "jāyate": "is born", "jāta": "born",
    "janma": "birth", "mriyate": "dies", "mṛtyu": "death", "jīvati": "lives", "jīva": "living being",
    "bhagavān": "the Supreme Lord", "bhagavat": "the Supreme Lord", "bhagavataḥ": "of the Supreme Lord",
    "īśvara": "Lord; controller", "īśa": "Lord", "paramātmā": "Supersoul", "ātman": "self", "ātmā": "self",
    "brahman": "Brahman; Absolute", "brahma": "Brahman; Brahmā", "hari": "Hari", "hareḥ": "of Hari",
    "kṛṣṇa": "Kṛṣṇa", "kṛṣṇaḥ": "Kṛṣṇa", "kṛṣṇasya": "of Kṛṣṇa", "rāma": "Rāma", "viṣṇu": "Viṣṇu",
    "nārāyaṇa": "Nārāyaṇa", "vāsudeva": "Vāsudeva", "govinda": "Govinda", "baladeva": "Baladeva",
    "śrī": "Śrī; sacred; glorious", "deva": "deity; god", "devī": "goddess", "sura": "god; demigod", "asura": "demon",
    "ṛṣi": "sage", "muni": "sage", "rājā": "king", "nṛpa": "king", "brāhmaṇa": "brāhmaṇa", "vaiṣṇava": "Vaiṣṇava",
    "bhakta": "devotee", "bhakti": "devotion", "jñāna": "knowledge", "vijñāna": "realized knowledge", "yoga": "yoga; connection",
    "dharma": "dharma; duty", "adharma": "unrighteousness", "karma": "action; karma", "mokṣa": "liberation", "mukti": "liberation",
    "saṁsāra": "worldly existence", "bhava": "worldly existence; becoming", "māyā": "māyā; power", "śakti": "power",
    "kāla": "time", "puruṣa": "person; Puruṣa", "prakṛti": "nature; material nature", "guṇa": "quality; mode",
    "līlā": "pastime", "carita": "deed; history", "kathā": "narration; account", "vīrya": "heroic deed; potency",
    "rūpa": "form", "svarūpa": "own form; essential nature", "aṁśa": "part; portion", "avatāra": "descent; incarnation",
    "deha": "body", "śarīra": "body", "aṅga": "limb; body", "manas": "mind", "manaḥ": "mind", "buddhi": "intelligence",
    "citta": "mind; consciousness", "hṛdaya": "heart", "indriya": "sense", "prāṇa": "life-air; living being", "loka": "world",
    "jagat": "world; universe", "sarga": "creation", "sṛṣṭi": "creation", "saṁhāra": "destruction", "pralaya": "dissolution",
    "kula": "family", "vaṁśa": "dynasty", "putra": "son", "suta": "son", "tanaya": "son", "pitṛ": "father; ancestor",
    "mātṛ": "mother", "mātā": "mother", "bhāryā": "wife", "pati": "husband; lord", "sakhā": "friend", "jana": "person; people",
    "satya": "true; truth", "satyam": "true", "śubha": "auspicious", "aśubha": "inauspicious", "sukha": "happiness",
    "duḥkha": "suffering", "ānanda": "bliss", "paramānanda": "supreme bliss", "prema": "love", "kāma": "desire",
    "krodha": "anger", "lobha": "greed", "moha": "delusion", "bhaya": "fear", "śoka": "sorrow", "tṛṣṇā": "thirst; craving",
    "dayā": "compassion", "kṛpā": "mercy", "prasāda": "grace; favor", "yaśas": "glory", "tejas": "splendor; power",
    "bala": "strength", "aiśvarya": "lordship; opulence", "mādhurya": "sweetness", "doṣa": "fault", "kāraṇa": "cause",
    "hetu": "cause; reason", "phala": "fruit; result", "upāya": "means", "sādhana": "means; practice", "sādhya": "goal",
    "viṣaya": "object; subject", "āśraya": "shelter", "nimitta": "cause; occasion", "prayojana": "purpose", "sambandha": "relation",
    "bīja": "seed", "nidāna": "source; cause", "anta": "end", "ādi": "beginning; and so on", "madhya": "middle",
    "krama": "order; sequence", "prakāra": "manner; kind", "rasa": "rasa; relish", "amṛta": "nectar; immortality",
    "saha": "with", "vinā": "without", "ṛte": "without; except", "prati": "toward; regarding", "anu": "after; according to",
    "adhika": "more; greater", "nyūna": "less; deficient", "tulya": "equal; like", "iva": "like; as if", "vat": "like; possessing",
    "mātra": "only; measure", "kevala": "only; exclusive", "sarvathā": "in every way", "viśeṣataḥ": "especially",
    "prāyaḥ": "generally; mostly", "vastutaḥ": "in reality", "sākṣāt": "directly", "svataḥ": "by itself; intrinsically",
    "krameṇa": "gradually; in order", "saṅkṣepeṇa": "briefly", "vistareṇa": "in detail", "samyak": "properly; completely",
    "ati": "very; exceedingly", "atyanta": "extreme; complete", "nitarām": "greatly", "sarvadā": "always",
    "śravaṇa": "hearing", "kīrtana": "glorification", "smaraṇa": "remembrance", "darśana": "seeing; vision", "sevā": "service",
    "pūjā": "worship", "stuti": "praise", "praṇāma": "obeisance", "namas": "obeisance", "namaḥ": "obeisance",
    "śaraṇa": "shelter", "caraṇa": "foot", "pāda": "foot; quarter", "padma": "lotus", "mukha": "face; mouth",
    "netra": "eye", "cakṣuḥ": "eye", "karṇa": "ear", "śrotra": "ear; hearing", "hasta": "hand", "kara": "hand; doer",
    "kukṣi": "womb; belly", "garbha": "womb; embryo", "mukta": "liberated", "mumukṣu": "seeker of liberation",
    "viṣayin": "material enjoyer", "dṛṣṭi": "vision", "antaryāmin": "Inner Controller", "samudra": "ocean", "sāgara": "ocean",
    "nadī": "river", "jala": "water", "vāri": "water", "agni": "fire", "sūrya": "sun", "soma": "moon", "candra": "moon",
    "pṛthivī": "earth", "bhūmi": "earth", "ākāśa": "ether; sky", "vāyu": "air", "vana": "forest", "giri": "mountain",
    "parvata": "mountain", "nagara": "city", "pura": "city", "gṛha": "house", "grāma": "village", "ratha": "chariot",
    "cakra": "disc; wheel", "gadā": "mace", "astra": "weapon", "śastra": "weapon", "yuddha": "battle", "samara": "battle",
    "sainya": "army", "śatru": "enemy", "mitra": "friend", "plava": "boat", "timiṅgila": "timiṅgila sea-monster",
    "vatsa": "calf", "mūla": "root; basis", "siddha": "established; perfected", "siddham": "established",
    "prasiddha": "well known", "saṁśaya": "doubt", "praśna": "question", "uttaram": "answer", "siddhānta": "conclusion; doctrine"
}

# Surface-ending candidates.  The template is applied only when the stem is
# successfully resolved, so a guessed ending never creates an invented gloss.
CASE_RULES = [
    (re.compile(r"ebhyaḥ$"), "a", "from/for {x}s"),
    (re.compile(r"ānām$"), "a", "of {x}s"),
    (re.compile(r"ayoḥ$"), "a", "of the two {x}s"),
    (re.compile(r"eṣu$"), "a", "in/among {x}s"),
    (re.compile(r"aiḥ$"), "a", "by/with {x}s"),
    (re.compile(r"asya$"), "a", "of {x}"),
    (re.compile(r"āya$"), "a", "to/for {x}"),
    (re.compile(r"ena$"), "a", "by/with {x}"),
    (re.compile(r"āt$"), "a", "from {x}"),
    (re.compile(r"e$"), "a", "in/on {x}"),
    (re.compile(r"am$"), "a", "{x}"),
    (re.compile(r"aḥ$"), "a", "{x}"),
    (re.compile(r"āḥ$"), "a", "{x}s"),
    (re.compile(r"ān$"), "a", "{x}s"),
    (re.compile(r"yāḥ$"), "ī", "of {x}"),
    (re.compile(r"yām$"), "ī", "in {x}"),
    (re.compile(r"yā$"), "ī", "by {x}"),
    (re.compile(r"īnām$"), "ī", "of {x}s"),
    (re.compile(r"inaḥ$"), "in", "of {x}"),
    (re.compile(r"inā$"), "in", "by {x}"),
    (re.compile(r"ini$"), "in", "in {x}"),
]


def fetch(url: str, cache_name: str) -> str:
    target = CACHE / cache_name
    if target.exists() and target.stat().st_size:
        return target.read_text(encoding="utf-8")
    req = urllib.request.Request(url, headers={"User-Agent": "vivekadrishti-canto10-wfw-builder/1.0"})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                data = response.read().decode("utf-8")
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(data, encoding="utf-8")
            return data
        except Exception:
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)
    raise RuntimeError(url)


def sridhara_path(chapter: int) -> str:
    if chapter <= 11: return f"01-11/{chapter:02d}.md"
    if chapter <= 17: return f"12-17/{chapter:02d}.md"
    if chapter <= 28: return f"18-28/{chapter:02d}.md"
    if chapter == 29: return "29-33_rasa-panchAdhyAya/29.md"
    if chapter == 30: return "29-33_rasa-panchAdhyAya/30_atha-triMshodhyAyaH_unnumbered.md"
    if chapter == 31: return "29-33_rasa-panchAdhyAya/31_athaikatriMshodhyAyaH_unnumbered.md"
    if chapter == 32: return "29-33_rasa-panchAdhyAya/32_atha-dvAtriMshodhyAyaH_unnumbered.md"
    if chapter == 33: return "29-33_rasa-panchAdhyAya/33_atha-trayastriMshodhyAyaH_unnumbered.md"
    if chapter <= 49: return f"34-49/{chapter:02d}.md"
    if chapter <= 59: return f"50-59/{chapter:02d}.md"
    if chapter <= 69: return f"60-69/{chapter:02d}.md"
    if chapter <= 79: return f"70-79/{chapter:02d}.md"
    if 80 <= chapter <= 84: return "80-86/70_athAshItitamo-dhyayaH.md"
    if chapter == 85: return "80-86/72_bhagavatA_devakI-prArthanayA_tadIya-mRta-putrAN.md"
    if chapter == 86: return "80-86/74_10_86_1.md"
    if chapter == 87: return "87.md"
    if chapter == 88: return "88-90/70.md"
    if chapter == 89: return "88-90/71.md"
    if chapter == 90: return "88-90/72.md"
    raise ValueError(chapter)


def strip_markdown(text: str) -> str:
    text = re.sub(r"\[\^[^\]]+\]", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[*_]{1,3}", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"^\s*>\s?", "", text, flags=re.M)
    text = text.replace("\\[", "[").replace("\\]", "]")
    text = re.sub(r"\\([\\`*_{}\[\]()#+\-.!])", r"\1", text)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def parse_sridhara(markdown: str, chapter: int):
    markers = list(MARKER_RE.finditer(markdown))
    rows = []
    for i, marker in enumerate(markers):
        canto = int(marker.group(1).translate(DEV_DIGITS))
        ch = int(marker.group(2).translate(DEV_DIGITS))
        if canto != 10 or ch != chapter:
            continue
        start = int(marker.group(3).translate(DEV_DIGITS))
        end = int((marker.group(4) or marker.group(3)).translate(DEV_DIGITS))
        segment_end = markers[i + 1].start() if i + 1 < len(markers) else len(markdown)
        segment = markdown[marker.end():segment_end]
        label = SRIDHARA_LABEL_RE.search(segment)
        if not label:
            continue
        commentary = segment[label.end():]
        stop = STOP_RE.search(commentary)
        if stop:
            commentary = commentary[:stop.start()]
        commentary = strip_markdown(commentary)
        if commentary:
            rows.append({"start": start, "end": end, "sanskrit": commentary})
    return rows


def section_block(body: str, heading: str) -> str:
    match = re.search(rf"###\s+{re.escape(heading)}\s*\n+([\s\S]*?)(?=\n###\s+|\n##\s+|\Z)", body, flags=re.I)
    return strip_markdown(match.group(1)) if match else ""


def parse_synonyms(markdown: str):
    heading_re = re.compile(r"^##\s+Texts?\s+(\d+)(?:\s*[-–—]\s*(\d+))?\s*$", re.M | re.I)
    headings = list(heading_re.finditer(markdown))
    out = {}
    for i, match in enumerate(headings):
        start = int(match.group(1)); end = int(match.group(2) or match.group(1))
        body_end = headings[i + 1].start() if i + 1 < len(headings) else len(markdown)
        body = markdown[match.end():body_end]
        synonyms = section_block(body, "Synonyms")
        context = {}
        for piece in re.split(r"\s*;\s*|\n+", synonyms):
            piece = piece.strip()
            if not piece:
                continue
            m = re.match(r"^\s*(.+?)\s+(?:—|–|--|-)\s+(.+?)\s*$", piece)
            if not m:
                continue
            left = normalize_iast(m.group(1))
            right = clean_english(m.group(2)).rstrip(".;")
            if left and right and len(right) <= 220:
                context[left] = right
        for verse in range(start, end + 1):
            out[verse] = context
    return out


def normalize_iast(text: str) -> str:
    text = str(text or "").lower().replace("’", "'").replace("‘", "'").strip()
    text = re.sub(r"^[^a-zāīūṛṝḷḹṃṁḥṅñṭḍṇśṣ'\-]+|[^a-zāīūṛṝḷḹṃṁḥṅñṭḍṇśṣ'\-]+$", "", text)
    return text.strip("'-")


def commentary_iast(text: str) -> str:
    value = transliterate(text, sanscript.DEVANAGARI, sanscript.IAST)
    value = value.replace("\u200c", "").replace("\u200d", "")
    value = re.sub(r"\[[^\]]*\]", " ", value)
    value = re.sub(r"\|+", " ", value)
    value = re.sub(r"\b\d+(?:\.\d+)*\b", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def tokens(text: str):
    return [normalize_iast(x) for x in TOKEN_RE.findall(text) if normalize_iast(x)]


def simple_candidates(unit: str):
    unit = normalize_iast(unit)
    values = [unit]
    for pattern, replacement, _template in CASE_RULES:
        if pattern.search(unit):
            values.append(pattern.sub(replacement, unit))
    for pattern, replacement in [
        (r"ḥ$", ""), (r"ṃ$", ""), (r"ṁ$", ""), (r"am$", "a"), (r"ena$", "a"),
        (r"asya$", "a"), (r"āya$", "a"), (r"āt$", "a"), (r"ānām$", "a"), (r"aiḥ$", "a"),
        (r"ebhyaḥ$", "a"), (r"yaḥ$", "ī"), (r"yām$", "ī"), (r"yā$", "ī"),
        (r"inaḥ$", "in"), (r"inā$", "in"), (r"ini$", "in"),
    ]:
        if re.search(pattern, unit):
            values.append(re.sub(pattern, replacement, unit))
    return list(dict.fromkeys(v for v in values if len(v) > 1))


def to_slp1(text: str) -> str:
    try:
        return transliterate(text, sanscript.IAST, sanscript.SLP1)
    except Exception:
        return text


def to_iast(text: str) -> str:
    try:
        return transliterate(text, sanscript.SLP1, sanscript.IAST)
    except Exception:
        return text


def setup_analyzer():
    try:
        from sanskrit_parser.parser.sandhi_analyzer import LexicalSandhiAnalyzer
        from sanskrit_parser.base.sanskrit_base import SanskritObject
        return LexicalSandhiAnalyzer(), SanskritObject
    except Exception as exc:
        print(f"Morphology disabled: {exc}")
        return None, None


def analyze_units(unique_units):
    analyzer, SanskritObject = setup_analyzer()
    roots = defaultdict(list)
    splits = defaultdict(list)
    if analyzer is None:
        return roots, splits
    total = len(unique_units)
    for n, unit in enumerate(sorted(unique_units), 1):
        if n % 1000 == 0:
            print(f"Morphology {n}/{total}")
        slp = to_slp1(unit)
        analyzer_slp = slp[:-1] + "s" if slp.endswith("H") else slp
        try:
            obj = SanskritObject(analyzer_slp, encoding=sanscript.SLP1, replace_ending_visarga=None)
            tags = analyzer.getMorphologicalTags(obj) or []
            for tag in tags[:8]:
                lemma = to_iast(str(tag[0]))
                if lemma and lemma not in roots[unit]:
                    roots[unit].append(lemma)
        except Exception:
            pass
        if roots[unit] or "-" in unit or len(unit) < 6:
            continue
        try:
            obj = SanskritObject(analyzer_slp, encoding=sanscript.SLP1, replace_ending_visarga=None)
            graph = analyzer.getSandhiSplits(obj)
            if graph is None:
                continue
            paths = graph.find_all_paths(max_paths=8, sort=True) or []
            for path in paths[:8]:
                parts = [to_iast(str(p)) for p in path]
                if 1 < len(parts) <= 6 and parts not in splits[unit]:
                    splits[unit].append(parts)
        except Exception:
            pass
    return roots, splits


def download_mw():
    if MW_CACHE.exists() and MW_CACHE.stat().st_size > 1_000_000:
        return
    print("Downloading Monier-Williams dictionary…")
    req = urllib.request.Request(MW_URL, headers={"User-Agent": "vivekadrishti-canto10-wfw-builder/1.0"})
    with urllib.request.urlopen(req, timeout=180) as response, MW_CACHE.open("wb") as out:
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            out.write(chunk)


def clean_english(text: str) -> str:
    text = html.unescape(str(text or ""))
    text = re.sub(r"<ls>.*?</ls>", " ", text, flags=re.S)
    text = re.sub(r"<s>.*?</s>", " ", text, flags=re.S)
    text = re.sub(r"<s1>.*?</s1>", " ", text, flags=re.S)
    text = re.sub(r"\{#.*?#\}", " ", text, flags=re.S)
    text = re.sub(r"\{%([^%]*)%\}", r"\1", text)
    text = re.sub(r"<ab[^>]*>(.*?)</ab>", r"\1", text, flags=re.S)
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.replace("¦", " ")
    text = re.sub(r"\s+", " ", text).strip(" ,;:-")
    return text


def mw_definition(body: str) -> str:
    # Definitions follow the headword separator.  Remove source citations and
    # Sanskrit-only spans, then keep the first compact lexical sense.
    if "¦" in body:
        body = body.split("¦", 1)[1]
    text = clean_english(body)
    text = re.sub(r"^(?:mfn\.|mf\.|mn\.|m\.|f\.|n\.|ind\.|adv\.|adj\.|pron\.|cl\.\s*\d+\.?|P\.|Ā\.)\s*", "", text, flags=re.I)
    text = re.sub(r"^(?:and|or)\s+", "", text, flags=re.I)
    # Drop leading bare SLP/IAST headword repeats when followed by real prose.
    words = text.split()
    if len(words) > 3 and not re.search(r"[āīūṛṝḷṃḥṅñṭḍṇśṣ]", words[0], re.I):
        pass
    # Prefer the first sense boundary; retain enough words to be meaningful.
    parts = re.split(r"\s*[;]\s*|\s{2,}", text)
    text = next((p.strip() for p in parts if p.strip()), text)
    text = re.sub(r"\s+", " ", text).strip(" ,;:-")
    if len(text) > 180:
        text = text[:177].rsplit(" ", 1)[0] + "…"
    return text


def load_mw(candidate_iast):
    download_mw()
    wanted = {to_slp1(x): x for x in candidate_iast if x}
    result = {}
    current_key = None
    current_lines = []

    def flush():
        nonlocal current_key, current_lines
        if current_key and current_key in wanted:
            meaning = mw_definition(" ".join(current_lines))
            if meaning and current_key not in result:
                result[current_key] = meaning
        current_key = None
        current_lines = []

    header_re = re.compile(r"<k1>([^<\s]+)")
    with MW_CACHE.open("r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            if line.startswith("<L>"):
                flush()
                m = header_re.search(line)
                current_key = m.group(1) if m else None
                continue
            if line.startswith("<LEND>"):
                flush()
                continue
            if current_key in wanted:
                current_lines.append(line.strip())
    flush()
    print(f"MW matched {len(result):,}/{len(wanted):,} candidate headwords")
    return result


def lookup_raw(unit: str, context, roots, dictionary):
    key = normalize_iast(unit)
    if not key:
        return "", None
    if key in context:
        return context[key], key
    if key in COMMON:
        return COMMON[key], key

    for candidate in simple_candidates(key):
        if candidate in context:
            base = context[candidate]
            return apply_case(key, candidate, base), candidate
        if candidate in COMMON:
            base = COMMON[candidate]
            return apply_case(key, candidate, base), candidate
        slp = to_slp1(candidate)
        if slp in dictionary:
            return apply_case(key, candidate, dictionary[slp]), candidate

    for lemma in roots.get(key, []):
        lemma = normalize_iast(lemma)
        if lemma in COMMON:
            return COMMON[lemma], lemma
        slp = to_slp1(lemma)
        if slp in dictionary:
            return dictionary[slp], lemma
    return "", None


def apply_case(surface: str, lemma: str, meaning: str) -> str:
    if surface == lemma:
        return meaning
    for pattern, replacement, template in CASE_RULES:
        if pattern.search(surface) and pattern.sub(replacement, surface) == lemma:
            return template.format(x=meaning)
    return meaning


def choose_units(token: str, context, roots, split_paths, dictionary):
    # Keep a resolvable whole form intact; otherwise expose explicit hyphenated
    # members or a Sanskrit-parser sandhi split whose members resolve best.
    meaning, _ = lookup_raw(token, context, roots, dictionary)
    if meaning:
        return [token]
    if "-" in token:
        parts = [p for p in token.split("-") if p]
        if len(parts) > 1:
            return parts
    paths = split_paths.get(token, [])
    best = None
    best_score = -1
    for path in paths:
        score = sum(bool(lookup_raw(p, context, roots, dictionary)[0]) for p in path)
        if score > best_score:
            best_score = score; best = path
    if best and best_score >= max(1, len(best) - 1):
        return best
    return [token]


def gloss(text: str, context, roots, split_paths, dictionary):
    units = []
    for token in tokens(text):
        units.extend(choose_units(token, context, roots, split_paths, dictionary))
    pairs = []
    unresolved = []
    for unit in units:
        meaning, _lemma = lookup_raw(unit, context, roots, dictionary)
        if not meaning:
            unresolved.append(unit)
            meaning = unit
        pairs.append(f"{unit} — {meaning}")
    return "; ".join(pairs) + ("." if pairs else ""), unresolved


def existing_manual(chapter: int):
    path = OUT / f"{chapter:02d}.json"
    if not path.exists():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {}
    manual = {}
    for key, value in data.items():
        if isinstance(value, str):
            manual[key] = value.strip()
        elif isinstance(value, dict) and value.get("word_for_word"):
            # Preserve hand-written/previously reviewed chapter data.  Auto files
            # produced by this script are marked generated=true and are rebuilt.
            if not value.get("generated"):
                manual[key] = str(value["word_for_word"]).strip()
    return manual


def main():
    all_rows = {}
    all_contexts = {}
    unique_units = set()

    print("Fetching Vishvasa Canto 10 sources…")
    sridhara_source_cache = {}
    for chapter in range(1, 91):
        spath = sridhara_path(chapter)
        if spath not in sridhara_source_cache:
            sridhara_source_cache[spath] = fetch(f"{SRIDHARA_BASE}/{spath}", f"sridhara/{spath.replace('/', '__')}")
        rows = parse_sridhara(sridhara_source_cache[spath], chapter)
        all_rows[chapter] = rows
        ptext = fetch(f"{PRABHUPADA_BASE}/{chapter:02d}.md", f"prabhupada/{chapter:02d}.md")
        all_contexts[chapter] = parse_synonyms(ptext)
        for row in rows:
            row["iast"] = commentary_iast(row["sanskrit"])
            for tok in tokens(row["iast"]):
                unique_units.add(tok)
                unique_units.update(p for p in tok.split("-") if p)

    print(f"Parsed {sum(len(v) for v in all_rows.values()):,} Śrīdhara commentary blocks; {len(unique_units):,} unique lexical surfaces")

    roots, split_paths = analyze_units(unique_units)
    candidate_iast = set(COMMON)
    for unit in unique_units:
        candidate_iast.update(simple_candidates(unit))
        for part in unit.split("-"):
            candidate_iast.update(simple_candidates(part))
        for lemma in roots.get(unit, []):
            candidate_iast.update(simple_candidates(lemma))
        for path in split_paths.get(unit, []):
            for part in path:
                candidate_iast.update(simple_candidates(part))
    dictionary = load_mw(candidate_iast)

    audit = {
        "chapters": {},
        "summary": {},
        "unresolved": {},
        "source": {
            "sridhara": "vishvAsa/purANam_vaiShNavam content: bhAgavatam/gauDIya-prastutiH/10",
            "lexicon": "Monier-Williams Sanskrit-English Dictionary, Cologne Sanskrit Lexicon",
        },
    }
    global_unresolved = Counter()
    total_entries = 0
    total_units = 0
    unresolved_units = 0

    for chapter in range(1, 91):
        manual = existing_manual(chapter)
        data = {}
        ch_unresolved = Counter()
        rows = all_rows[chapter]
        for row in rows:
            key = str(row["start"]) if row["start"] == row["end"] else f"{row['start']}-{row['end']}"
            if key in manual:
                value = {"word_for_word": manual[key]}
                unresolved = []
            else:
                context = {}
                for verse in range(row["start"], row["end"] + 1):
                    context.update(all_contexts[chapter].get(verse, {}))
                text, unresolved = gloss(row["iast"], context, roots, split_paths, dictionary)
                value = {"word_for_word": text, "generated": True}
                if unresolved:
                    value["unresolved"] = sorted(set(unresolved))
            data[key] = value
            # Also make ranged commentary available to individually rendered verse cards.
            if row["end"] > row["start"]:
                for verse in range(row["start"], row["end"] + 1):
                    data.setdefault(str(verse), value)
            pair_count = value["word_for_word"].count(" — ")
            total_units += pair_count
            unresolved_units += len(unresolved)
            ch_unresolved.update(unresolved)
            global_unresolved.update(unresolved)
            total_entries += 1

        (OUT / f"{chapter:02d}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2, sort_keys=lambda x: (int(x.split('-')[0]) if x.split('-')[0].isdigit() else 9999, x)) + "\n",
            encoding="utf-8",
        )
        audit["chapters"][str(chapter)] = {
            "commentary_blocks": len(rows),
            "output_keys": len(data),
            "unresolved_occurrences": sum(ch_unresolved.values()),
            "unresolved_unique": len(ch_unresolved),
        }
        if ch_unresolved:
            audit["unresolved"][str(chapter)] = dict(ch_unresolved.most_common())
        print(f"Chapter {chapter:02d}: {len(rows)} blocks, {sum(ch_unresolved.values())} unresolved occurrences")

    audit["summary"] = {
        "chapters": 90,
        "commentary_blocks": total_entries,
        "gloss_units": total_units,
        "unresolved_occurrences": unresolved_units,
        "unresolved_unique": len(global_unresolved),
        "coverage_percent": round(100.0 * (total_units - unresolved_units) / total_units, 3) if total_units else 0,
    }
    audit["unresolved_top"] = dict(global_unresolved.most_common(250))
    (OUT / "audit.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(audit["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
