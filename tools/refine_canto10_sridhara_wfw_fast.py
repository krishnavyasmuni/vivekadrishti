#!/usr/bin/env python3
"""Fast deterministic refinement of Sridhara Svami Canto 10 lexical glosses.

No prose translation is generated.  Every output unit has the form
`Sanskrit — short English equivalent`.  Existing reviewed chapter files 1-7
are not touched.  If a lexical unit cannot be resolved safely, its Sanskrit
surface form is preserved instead of guessing an English meaning.
"""
from __future__ import annotations

import json
import re
from functools import lru_cache
from pathlib import Path

import generate_canto10_sridhara_wfw as base

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "data" / "canto10-sridhara-word-for-word"

# Contextual values override misleading first senses in historical dictionaries.
C = {
    **{k.replace("ṁ", "ṃ"): v for k, v in base.COMMON.items()},
    "aṣṭama":"eighth","aṣṭame":"in the eighth","navama":"ninth","navame":"in the ninth","daśama":"tenth","daśame":"in the tenth",
    "adhyāya":"chapter","adhyāye":"in the chapter","adhyāyasya":"of the chapter","śloka":"verse","ślokaḥ":"verse","śloke":"in the verse","ślokena":"by the verse","ślokasya":"of the verse",
    "vaṃśa":"dynasty; lineage","vaṃśasya":"of the dynasty; lineage","vaṃśe":"in the dynasty","yadu":"Yadu","yadava":"descendant of Yadu","yādava":"descendant of Yadu",
    "līlā":"pastime","līlām":"pastime","līlāyāḥ":"of the pastime","līlāyām":"in the pastime","krīḍā":"play; pastime","krīḍāyām":"in play; pastime",
    "bhagavān":"the Supreme Lord","bhagavat":"the Supreme Lord","bhagavataḥ":"of the Supreme Lord","bhagavatā":"by the Supreme Lord","bhagavati":"in the Supreme Lord",
    "kṛṣṇa":"Kṛṣṇa","kṛṣṇaḥ":"Kṛṣṇa","kṛṣṇam":"Kṛṣṇa","kṛṣṇasya":"of Kṛṣṇa","kṛṣṇena":"by Kṛṣṇa","śrīkṛṣṇa":"Śrī Kṛṣṇa","śrī-kṛṣṇa":"Śrī Kṛṣṇa",
    "hari":"Hari","hariḥ":"Hari","harim":"Hari","hareḥ":"of Hari","hariṇā":"by Hari","viṣṇu":"Viṣṇu","nārāyaṇa":"Nārāyaṇa",
    "rāma":"Rāma","balarāma":"Balarāma","saṅkarṣaṇa":"Saṅkarṣaṇa","kaṃsa":"Kaṃsa","nanda":"Nanda","yaśodā":"Yaśodā","devakī":"Devakī","vasudeva":"Vasudeva","rohīṇī":"Rohiṇī",
    "vraja":"Vraja","vraje":"in Vraja","gokula":"Gokula","gokule":"in Gokula","mathurā":"Mathurā","mathurāyām":"in Mathurā","dvāravatī":"Dvāravatī","dvārakā":"Dvārakā",
    "gopa":"cowherd","gopāḥ":"cowherds","gopī":"gopī; cowherd woman","gopyaḥ":"gopīs","gopānām":"of the cowherds","gopīnām":"of the gopīs",
    "artha":"meaning; purpose","arthaḥ":"meaning; purpose","artham":"meaning; for the purpose","ityarthaḥ":"this is the meaning","ity-arthaḥ":"this is the meaning","ity-arthaṃ":"this is the meaning",
    "bhāva":"sense; purport","bhāvaḥ":"sense; purport","iti-bhāvaḥ":"thus is the sense","ity-bhāvaḥ":"thus is the sense","abhiprāya":"intended sense","abhiprāyaḥ":"intended sense","tātparya":"purport; intention","tātparyam":"purport; intention",
    "āha":"says","ityāha":"thus he says","ity-āha":"thus he says","ucyate":"is said","uktam":"stated","uktaḥ":"stated","uktā":"stated","proktam":"stated","proktaḥ":"stated",
    "nirūpyate":"is described; established","nirūpitam":"described; established","varṇyate":"is described","varṇitam":"described","kathyate":"is narrated","kathitam":"narrated",
    "vyākhyā":"explanation; commentary","vyākhyātam":"explained","avyākhyātam":"unexplained","na-vyākhyātam":"not explained","vyākhyānam":"explanation",
    "śruti":"scripture; hearing","śrutiḥ":"scripture; hearing","śāstra":"scripture","śāstram":"scripture","purāṇa":"Purāṇa","bhāgavata":"Bhāgavata",
    "bhakti":"devotion","bhaktiḥ":"devotion","bhaktyā":"by devotion","bhakta":"devotee","bhaktaḥ":"devotee","bhaktāḥ":"devotees","mukti":"liberation","muktiḥ":"liberation","mokṣa":"liberation","mokṣaḥ":"liberation",
    "saṃsāra":"worldly existence","saṃsāraḥ":"worldly existence","saṃsāram":"worldly existence","jagat":"world; universe","jagataḥ":"of the world","loka":"world","lokaḥ":"world",
    "dharma":"dharma; duty","dharmaḥ":"dharma; duty","adharma":"unrighteousness","karma":"action; karma","karman":"action; karma","jñāna":"knowledge","jñānam":"knowledge","vijñāna":"realized knowledge",
    "rūpa":"form","rūpam":"form","rūpaṃ":"form","svarūpa":"own form; essential nature","svarūpam":"own form; essential nature","guṇa":"quality","guṇaḥ":"quality","guṇāḥ":"qualities","guṇānām":"of the qualities",
    "kathā":"narration","kathām":"narration","carita":"deed; account","caritam":"deed; account","vīrya":"heroic deed; potency","vīryam":"heroic deed; potency","vīryāṇi":"heroic deeds; potencies",
    "janma":"birth","janman":"birth","deha":"body","dehaḥ":"body","deham":"body","śarīra":"body","śarīram":"body","aṅga":"limb; body",
    "putra":"son","putraḥ":"son","putram":"son","putrāḥ":"sons","suta":"son","sutaḥ":"son","tanaya":"son","tanayaḥ":"son","mātā":"mother","pitā":"father","pituḥ":"of the father","mātuḥ":"of the mother","guroḥ":"of the teacher",
    "garbha":"womb; embryo","garbhaḥ":"womb; embryo","garbham":"womb; embryo","kukṣi":"womb; belly","bīja":"seed","santāna":"lineage; offspring",
    "sarva":"all","sarvam":"all; everything","sarve":"all","sarveṣām":"of all","sarvaiḥ":"by all","akhila":"all; entire","sakala":"all; complete","samasta":"all; entire",
    "eka":"one","ekaḥ":"one","ekam":"one","dvau":"two","dvi":"two","tri":"three","trayaḥ":"three","catur":"four","catvāraḥ":"four","pañca":"five","ṣaṭ":"six","sapta":"seven","aṣṭa":"eight","nava":"nine","daśa":"ten",
    "ataḥ":"therefore; from this","tataḥ":"then; from that","yataḥ":"because; from which","yasmāt":"because; from which","tasmāt":"therefore; from that","yathā":"as; just as","tathā":"so; in that way",
    "eva":"only; indeed","ca":"and","api":"also","tu":"but","hi":"indeed; because","vai":"indeed","vā":"or","iva":"like; as if","iti":"thus","ity":"thus","atha":"now; then","punaḥ":"again",
    "ādi":"beginning; and so on","ityādi":"and so on","ity-ādi":"and so on","ādika":"and so on","ādiḥ":"beginning","ante":"at the end","ādau":"at the beginning",
    "nāma":"name; namely","karman":"act; action","bāla":"child; young","bālasya":"of the child","kutūhala":"curiosity; eagerness","mṛd":"clay; earth","bhakṣaṇa":"eating","abhiyoga":"charge; accusation","viśva":"universe; all","viśvarūpa":"universal form","pitṛ":"father","nija":"own","tattva":"truth; reality","tattvam":"truth; reality",
    "praveśa":"entrance","sañcāra":"transfer; movement","virodha":"hostility; opposition","prapañcayati":"expands; elaborates","stuta":"praised","sāntvita":"comforted","ghāta":"killing","ghātāya":"for killing",
}

# Common nominal/adjectival inflections.  Each rule proposes a lemma and a
# compact English case wrapper if the lemma exists in the lexicon.
ENDING_RULES = [
    (r"ebhyaḥ$", "a", "from/for {x}s"),(r"ānām$", "a", "of {x}s"),(r"ayoḥ$", "a", "of the two {x}s"),(r"eṣu$", "a", "in/among {x}s"),(r"aiḥ$", "a", "by/with {x}s"),(r"ābhyām$", "a", "by/from/for the two {x}s"),
    (r"asya$", "a", "of {x}"),(r"āya$", "a", "to/for {x}"),(r"ena$", "a", "by/with {x}"),(r"āt$", "a", "from {x}"),(r"e$", "a", "in/on {x}"),(r"am$", "a", "{x}"),(r"aḥ$", "a", "{x}"),(r"āḥ$", "a", "{x}s"),(r"ān$", "a", "{x}s"),(r"au$", "a", "the two {x}s"),
    (r"āyāḥ$", "ā", "of {x}"),(r"āyām$", "ā", "in/on {x}"),(r"ayā$", "ā", "by/with {x}"),(r"āyai$", "ā", "to/for {x}"),(r"ābhiḥ$", "ā", "by/with {x}s"),(r"ābhyaḥ$", "ā", "from/for {x}s"),(r"āsu$", "ā", "in/among {x}s"),
    (r"īnāṃ$", "ī", "of {x}s"),(r"īnām$", "ī", "of {x}s"),(r"īṣu$", "ī", "in/among {x}s"),(r"yāḥ$", "ī", "of {x}"),(r"yām$", "ī", "in/on {x}"),(r"yā$", "ī", "by/with {x}"),
    (r"inaḥ$", "in", "of {x}"),(r"inā$", "in", "by/with {x}"),(r"ini$", "in", "in/on {x}"),(r"inaṃ$", "in", "{x}"),
    (r"oḥ$", "u", "of {x}"),(r"unā$", "u", "by/with {x}"),(r"ave$", "u", "to/for {x}"),(r"au$", "u", "in/on {x}"),(r"ūn$", "u", "{x}s"),
    (r"eḥ$", "i", "of {x}"),(r"inā$", "i", "by/with {x}"),(r"aye$", "i", "to/for {x}"),(r"au$", "i", "in/on {x}"),(r"īn$", "i", "{x}s"),
    (r"taḥ$", "t", "of/from {x}"),(r"tā$", "t", "by/with {x}"),(r"ti$", "t", "in/on {x}"),(r"tām$", "t", "of {x}s"),
    (r"bhiḥ$", "", "by/with {x}s"),(r"bhyaḥ$", "", "from/for {x}s"),(r"nām$", "", "of {x}s"),
]
ENDING_RULES = [(re.compile(p), repl, template) for p, repl, template in ENDING_RULES]

# Safe surface→lemma transforms for common verbal/participial endings.  We only
# accept a transform when its proposed lemma exists in the dictionary/context.
VERB_RULES = [
    (re.compile(r"yante$"), "", "are being {x}"),(re.compile(r"yate$"), "", "is being {x}"),
    (re.compile(r"anti$"), "", "they {x}"),(re.compile(r"ati$"), "", "{x}s"),(re.compile(r"nti$"), "", "they {x}"),
    (re.compile(r"ate$"), "", "{x}s"),(re.compile(r"te$"), "", "{x}s"),
    (re.compile(r"tvā$"), "", "having {x}"),(re.compile(r"itvā$"), "", "having {x}"),
    (re.compile(r"tavyam$"), "", "to be {x}"),(re.compile(r"tavyaḥ$"), "", "to be {x}"),(re.compile(r"anīyam$"), "", "to be {x}"),
]

# Short overrides for roots where MW's historical first sense is not useful.
ROOTS = {
    "vad":"speak; say","vac":"speak; say","brū":"speak; tell","kath":"narrate; tell","varṇ":"describe","nirūp":"describe; establish","vyākhyā":"explain",
    "kṛ":"do; make","bhū":"be; become","as":"be","gam":"go","yā":"go","i":"go; come","dā":"give","dhā":"place; hold","grah":"take; grasp","labh":"obtain","āp":"attain",
    "jan":"be born; produce","mṛ":"die","han":"kill","rakṣ":"protect","pā":"protect","ji":"conquer","tar":"cross","śru":"hear","dṛś":"see","jñā":"know","man":"think; consider","smṛ":"remember","prach":"ask","icch":"desire","stu":"praise","nam":"bow","sev":"serve",
}

BAD_START = re.compile(r"^(?:see\b|cf\b|gen\.?\s+of\b|nom\.?\s+of\b|acc\.?\s+of\b|dat\.?\s+of\b|loc\.?\s+of\b|instr\.?\s+of\b)", re.I)


def n(s: str) -> str:
    return base.normalize_iast(s).replace("ṁ", "ṃ")


def clean_def(value: str, token: str = "") -> str:
    s = str(value or "").replace("&c.", "").replace("q.v.", "").replace("˚", " ")
    # Remove nested parenthetical dictionary apparatus repeatedly.
    old = None
    while old != s:
        old = s
        s = re.sub(r"\([^()]{0,240}\)", " ", s)
    s = re.sub(r"\b(?:mfn|mf|fn|mn|m|f|n|adj|adv|ind|pron|part)\.?\s*", " ", s, flags=re.I)
    s = re.sub(r"\b(?:See below|See above|See p\.[^,;.]*)", " ", s, flags=re.I)
    s = re.sub(r"^\s*\d+\.\s*", "", s)
    s = re.sub(r"\s+", " ", s).strip(" ,;:-.")
    if not s or BAD_START.search(s): return ""
    if re.match(r"^N\.\s+of\b", s, re.I):
        return token[:1].upper() + token[1:] if token else "proper name"
    s = re.sub(r"^N\.\s+", "name; ", s, flags=re.I)
    # MW frequently begins an entry with etymological notes.  Prefer the first
    # compact semantic phrase containing an ordinary English word.
    chunks = [x.strip(" ,;:-.") for x in re.split(r"\s*[;,]\s*", s) if x.strip()]
    for chunk in chunks:
        if BAD_START.search(chunk): continue
        if re.search(r"[A-Za-z]{3,}", chunk):
            s = chunk
            break
    s = re.sub(r"\s+", " ", s).strip(" ,;:-.")
    if len(s) > 80: s = s[:80].rsplit(" ", 1)[0] + "…"
    return s


def prepare_mw(raw: dict[str, str]) -> dict[str, str]:
    out = {}
    for key, value in raw.items():
        c = clean_def(value)
        if c: out[key] = c
    return out


def direct(token: str, mw: dict[str, str]) -> str:
    t = n(token)
    if not t: return ""
    if t in C: return C[t]
    if t in ROOTS: return ROOTS[t]
    val = mw.get(base.iast_to_slp1(t))
    return clean_def(val, t) if val else ""


@lru_cache(maxsize=120000)
def candidate_forms(token: str):
    t = n(token)
    out = []
    for pat, repl, template in ENDING_RULES:
        if pat.search(t):
            stem = pat.sub(repl, t)
            if stem and stem != t: out.append((stem, template))
    # Common visarga / anusvara surface normalisations.
    if t.endswith("ḥ"): out.append((t[:-1], "{x}"))
    if t.endswith(("ṃ", "m")): out.append((t[:-1], "{x}"))
    # Participial adjective inflection, e.g. -itasya -> -ita.
    for ending, lemma_ending, template in [
        ("itasya","ita","of {x}"),("itena","ita","by/with {x}"),("ite","ita","in/on {x}"),("itaṃ","ita","{x}"),("itaḥ","ita","{x}"),
        ("tasya","ta","of {x}"),("tena","ta","by/with {x}"),("te","ta","in/on {x}"),("taṃ","ta","{x}"),("tāḥ","ta","{x}s"),
    ]:
        if t.endswith(ending) and len(t) > len(ending) + 1:
            out.append((t[:-len(ending)] + lemma_ending, template))
    seen = set(); result = []
    for item in out:
        if item[0] not in seen:
            seen.add(item[0]); result.append(item)
    return tuple(result)


def lookup_simple(token: str, mw: dict[str, str]) -> str:
    t = n(token)
    hit = direct(t, mw)
    if hit: return hit
    for stem, template in candidate_forms(t):
        hit = direct(stem, mw)
        if hit: return template.format(x=hit)
    for pat, repl, template in VERB_RULES:
        if not pat.search(t): continue
        stem = pat.sub(repl, t)
        # Try raw root and an a-ending present stem reduction.
        for candidate in (stem, stem[:-1] if stem.endswith("a") else stem):
            hit = direct(candidate, mw)
            if hit: return template.format(x=hit)
    return ""

# Particles/words that often occur after external vowel sandhi.
SANDHI_RIGHT = {
    "asya":"of this; of him","atra":"here","api":"also","eva":"only; indeed","iti":"thus","āha":"says","ādi":"beginning; and so on",
    "artham":"for the purpose","arthaḥ":"meaning","abhiyoga":"charge; accusation","āśaṅkin":"suspecting; apprehensive","āśaṅkinaḥ":"of one who suspects",
    "ātman":"self","ātmā":"self","īśvara":"Lord; controller","uttama":"highest","upāya":"means","amṛta":"nectar; immortality",
}


def sandhi_splits(token: str):
    """Yield conservative two-part external-sandhi candidates."""
    t = n(token)
    # ā can represent a+a, a+ā, ā+a, or ā+ā.
    for i, ch in enumerate(t):
        if ch != "ā" or i < 2 or i > len(t)-2: continue
        left0, rest = t[:i], t[i+1:]
        for left in (left0 + "a", left0 + "ā", left0):
            for right in ("a" + rest, "ā" + rest):
                yield left, right
    # e/o external sandhi (a+i/ī -> e; a+u/ū -> o), used only when both
    # resulting units independently resolve.
    for i, ch in enumerate(t):
        if i < 2 or i > len(t)-2: continue
        left0, rest = t[:i], t[i+1:]
        if ch == "e":
            for right in ("i"+rest, "ī"+rest): yield left0+"a", right
        elif ch == "o":
            for right in ("u"+rest, "ū"+rest): yield left0+"a", right
    # Explicit high-frequency right members without changing the boundary.
    for right in SANDHI_RIGHT:
        if t.endswith(right) and len(t) > len(right)+1:
            yield t[:-len(right)], right


def split_compound(token: str, mw: dict[str, str], depth: int = 0):
    t = n(token)
    if depth > 2 or len(t) < 5: return None
    # Hyphenated editorial compounds are safest to split first.
    if "-" in t:
        parts = [p for p in t.split("-") if p]
        if len(parts) > 1:
            return parts
    for left, right in sandhi_splits(t):
        lm = lookup_simple(left, mw)
        rm = lookup_simple(right, mw) or SANDHI_RIGHT.get(right, "")
        if lm and rm: return [left, right]
        # One more conservative recursive split on the longer half.
        if lm and len(right) >= 7:
            sub = split_compound(right, mw, depth+1)
            if sub and all(lookup_simple(x, mw) or SANDHI_RIGHT.get(x, "") for x in sub): return [left] + sub
        if rm and len(left) >= 7:
            sub = split_compound(left, mw, depth+1)
            if sub and all(lookup_simple(x, mw) for x in sub): return sub + [right]
    return None


def units_for(token: str, mw: dict[str, str]):
    t = n(token)
    if not t: return []
    if lookup_simple(t, mw): return [t]
    split = split_compound(t, mw)
    return split or [t]


def make_gloss(text: str, mw: dict[str, str]):
    iast = base.devanagari_to_iast(text)
    raw = re.sub(r"\[[^\]]*\]|\|+|\b\d+(?:\.\d+)*\b", " ", iast)
    tokens = [n(x) for x in raw.split()]
    units = []
    for token in filter(None, tokens): units.extend(units_for(token, mw))
    parts = []
    unresolved = 0
    for unit in units:
        meaning = lookup_simple(unit, mw) or SANDHI_RIGHT.get(unit, "")
        if not meaning:
            unresolved += 1
            meaning = unit
        parts.append(f"{unit} — {meaning}")
    return "; ".join(parts) + ("." if parts else ""), unresolved, len(units)


def main():
    mw = prepare_mw(base.build_mw())
    source_cache = {}
    total_units = total_unresolved = total_blocks = 0
    stats = {}
    for chapter in range(8, 91):
        path = base.chapter_path(chapter)
        if path not in source_cache:
            print(f"Fetching source {path}", flush=True)
            source_cache[path] = base.fetch(base.SRIDHARA_BASE + path).decode("utf-8", errors="replace")
        entries = base.parse_sridhara(source_cache[path], chapter)
        data = {}; ch_units = ch_unresolved = 0
        for start, end, text in entries:
            gloss, unresolved, count = make_gloss(text, mw)
            key = str(start) if start == end else f"{start}-{end}"
            data[key] = {"word_for_word": gloss}
            ch_units += count; ch_unresolved += unresolved; total_blocks += 1
        (OUT / f"{chapter:02d}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
        total_units += ch_units; total_unresolved += ch_unresolved
        pct = 100 * (ch_units-ch_unresolved) / ch_units if ch_units else 100.0
        stats[str(chapter)] = {"blocks":len(data),"units":ch_units,"resolved":ch_units-ch_unresolved,"unresolved":ch_unresolved,"resolved_percent":round(pct,2)}
        print(f"Chapter {chapter:02d}: {len(data)} blocks; {ch_units} units; {pct:.1f}% resolved", flush=True)
    manifest = {
        "scope":"Sridhara Svami Bhavartha-dipika, Srimad Bhagavatam Canto 10",
        "format":"literal lexical word-for-word only; no prose translation",
        "chapters":list(range(1,91)),
        "reviewed_chapter_files_preserved":list(range(1,8)),
        "fast_refined_chapters":list(range(8,91)),
        "sridhara_blocks_8_90":total_blocks,
        "lexical_units_8_90":total_units,
        "resolved_units_8_90":total_units-total_unresolved,
        "unresolved_units_8_90":total_unresolved,
        "resolved_percent_8_90":round(100*(total_units-total_unresolved)/total_units,2) if total_units else 100.0,
        "chapter_stats":stats,
        "source":"vishvAsa/purANam_vaiShNavam content branch",
        "dictionary":"Monier-Williams Sanskrit-English Dictionary, Cologne Digital Sanskrit Lexicon",
        "rule":"unresolved forms are preserved as Sanskrit; no guessed prose is inserted"
    }
    (OUT/"manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    print(json.dumps({k:v for k,v in manifest.items() if k!='chapter_stats'}, ensure_ascii=False, indent=2), flush=True)

if __name__ == '__main__':
    main()
