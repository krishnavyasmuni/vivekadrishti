#!/usr/bin/env python3
"""Refine Canto 10 Sridhara word-for-word files with Sanskrit morphology.

Chapters 1-7 are intentionally left untouched because they already contain
reviewed lexical glosses.  Chapters 8-90 are regenerated from the exact
Vishvasa Sridhara text.  Surface inflections are analysed to dictionary lemmas;
compounds are split when the parser can do so confidently.  Output remains
lexical only: Sanskrit unit — short English equivalent.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from functools import lru_cache

import generate_canto10_sridhara_wfw as base

try:
    from indic_transliteration import sanscript
    from sanskrit_parser import Parser
    from sanskrit_parser.base.sanskrit_base import SanskritObject
except Exception as exc:
    raise SystemExit(f"Sanskrit morphology dependencies unavailable: {exc}")

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "data" / "canto10-sridhara-word-for-word"

parser = Parser(
    input_encoding=sanscript.IAST,
    output_encoding=sanscript.SLP1,
    lexical_lookup="combined",
    score=False,
    replace_ending_visarga="s",
)

# High-frequency scholastic and Bhagavata vocabulary where the first historical
# dictionary sense is not the intended literal lexical value.
CONTEXT = {
    **{k.replace("ṁ", "ṃ"): v for k, v in base.COMMON.items()},
    "vaṃśa":"dynasty; lineage","vaṃśasya":"of the dynasty; of the lineage","vaṃśe":"in the dynasty",
    "līlā":"pastime","līlāṃ":"pastime","līlāyāḥ":"of the pastime","līlāyām":"in the pastime",
    "bhagavān":"the Supreme Lord","bhagavataḥ":"of the Supreme Lord","bhagavatā":"by the Supreme Lord",
    "śrī-kṛṣṇa":"Śrī Kṛṣṇa","kṛṣṇa":"Kṛṣṇa","kṛṣṇasya":"of Kṛṣṇa","kṛṣṇam":"Kṛṣṇa","kṛṣṇena":"by Kṛṣṇa",
    "hariḥ":"Hari","hareḥ":"of Hari","hariṃ":"Hari","hariṇā":"by Hari",
    "yadu":"Yadu","yadoḥ":"of Yadu","yadūnām":"of the Yadus","yādava":"Yādava; descendant of Yadu",
    "gopa":"cowherd","gopāḥ":"cowherds","gopī":"cowherd woman; gopī","gopyaḥ":"gopīs",
    "vraja":"Vraja","vraje":"in Vraja","gokula":"Gokula","gokule":"in Gokula","mathurā":"Mathurā","dvāravatī":"Dvāravatī",
    "śrī":"Śrī; glorious","deva":"deity; god","devāḥ":"gods","devānām":"of the gods","devakī":"Devakī","vasudeva":"Vasudeva",
    "rāma":"Rāma","balarāma":"Balarāma","saṅkarṣaṇa":"Saṅkarṣaṇa","kaṃsa":"Kaṃsa","nanda":"Nanda","yaśodā":"Yaśodā",
    "arthaḥ":"meaning","artham":"meaning; for the purpose","ity-arthaḥ":"this is the meaning","ityarthaḥ":"this is the meaning",
    "bhāvaḥ":"sense; purport","iti-bhāvaḥ":"thus is the sense","abhiprāyaḥ":"intended sense","tātparyam":"purport; intention",
    "āha":"says","ity-āha":"thus he says","ityāha":"thus he says","ucyate":"is said","uktam":"stated","proktam":"stated",
    "nirūpyate":"is described; is established","nirūpitam":"described; established","varṇyate":"is described","varṇitam":"described",
    "vyākhyātam":"explained","na-vyākhyātam":"not explained","avyākhyātam":"unexplained",
    "ślokaḥ":"verse","ślokena":"by the verse","ślokasya":"of the verse","śrutiḥ":"scripture; revelation","śāstram":"scripture",
    "bhaktiḥ":"devotion","bhaktyā":"by devotion","bhaktaḥ":"devotee","bhaktāḥ":"devotees","muktiḥ":"liberation","mokṣaḥ":"liberation",
    "saṃsāraḥ":"worldly existence","saṃsāram":"worldly existence","jagat":"world; universe","jagataḥ":"of the world",
    "dharmaḥ":"dharma; duty","adharmaḥ":"unrighteousness","karma":"action; karma","jñānam":"knowledge","vijñānam":"realized knowledge",
    "rūpam":"form","rūpaṃ":"form","svarūpam":"own form; essential nature","guṇaḥ":"quality","guṇāḥ":"qualities","guṇānām":"of the qualities",
    "kathā":"narration","kathām":"narration","caritam":"deed; account","vīryam":"heroic deed; potency","vīryāṇi":"heroic deeds; potencies",
    "janma":"birth","janmaḥ":"birth","janmani":"at birth; in birth","dehaḥ":"body","deham":"body","śarīram":"body",
    "putraḥ":"son","putram":"son","putrāḥ":"sons","sutaḥ":"son","tanayaḥ":"son","mātā":"mother","pitā":"father",
    "pituḥ":"of the father","mātuḥ":"of the mother","bhrātuḥ":"of the brother","guroḥ":"of the teacher",
    "sarva":"all","sarvam":"all; everything","sarve":"all","sarveṣām":"of all","sarvaiḥ":"by all",
    "ekaḥ":"one","ekam":"one","dvau":"two","trayaḥ":"three","catvāraḥ":"four",
    "ataḥ":"therefore; from this","tataḥ":"then; from that","yataḥ":"because; from which","yasmāt":"because; from which","tasmāt":"therefore; from that",
    "eva":"only; indeed","ca":"and","api":"also","tu":"but","hi":"indeed; because","vai":"indeed","vā":"or","iva":"like; as if","iti":"thus",
}

CASE_TAGS = {
    "zazWIviBaktiH": "of {x}",
    "saptamIviBaktiH": "in/on {x}",
    "tftIyAviBaktiH": "by/with {x}",
    "caturTIviBaktiH": "to/for {x}",
    "paYcamIviBaktiH": "from {x}",
    "dvitIyAviBaktiH": "{x}",
    "praTamAviBaktiH": "{x}",
}

BAD_DEF = re.compile(
    r"^(?:see\b|cf\b|gen\.?\s+of\b|nom\.?\s+of\b|acc\.?\s+of\b|dat\.?\s+of\b|loc\.?\s+of\b|instr\.?\s+of\b)",
    re.I,
)


def norm(s: str) -> str:
    return base.normalize_iast(s).replace("ṁ", "ṃ")


def clean_definition(value: str, token: str = "") -> str:
    s = str(value or "")
    s = s.replace("&c.", "").replace("q.v.", "").replace("˚", "")
    # Parenthetical etymologies, source notes, and grammatical cross-references
    # are not lexical meanings.
    previous = None
    while previous != s:
        previous = s
        s = re.sub(r"\([^()]{0,220}\)", " ", s)
    s = re.sub(r"\b(?:mfn|mf|fn|mn|m|f|n|adj|adv|ind|pron|part)\.?\s*", " ", s, flags=re.I)
    s = re.sub(r"\b(?:See below|See above|See p\.[^,;.]*)", " ", s, flags=re.I)
    s = re.sub(r"\s+", " ", s).strip(" ,;:-.")
    if not s or BAD_DEF.search(s): return ""
    if re.match(r"^N\.\s+of\b", s, re.I):
        return token[:1].upper() + token[1:] if token else "proper name"
    s = re.sub(r"^N\.\s+", "name; ", s, flags=re.I)
    # Keep only the first compact English equivalent.  This intentionally drops
    # MW's long citation history and secondary senses.
    s = re.split(r"\s*[;,]\s*", s, maxsplit=1)[0]
    s = re.sub(r"\s+", " ", s).strip(" ,;:-.")
    if len(s) > 72:
        s = s[:72].rsplit(" ", 1)[0] + "…"
    return s


def prepare_mw(raw: dict[str, str]) -> dict[str, str]:
    out = {}
    for key, value in raw.items():
        cleaned = clean_definition(value)
        if cleaned: out[key] = cleaned
    return out


def slp_root_text(root) -> str:
    try:
        s = root.canonical()
    except Exception:
        s = str(root)
    return re.sub(r"#\d+$", "", s)


def tag_names(tags) -> set[str]:
    result = set()
    for tag in tags or []:
        try: result.add(tag.canonical())
        except Exception: result.add(str(tag))
    return result


@lru_cache(maxsize=30000)
def morphology(token: str):
    token = norm(token)
    if not token: return tuple()
    try:
        obj = SanskritObject(token, encoding=sanscript.IAST, strict_io=False, replace_ending_visarga="s")
        analyses = parser.sandhi_analyzer.getMorphologicalTags(obj) or []
    except Exception:
        return tuple()
    result = []
    for root, tags in analyses[:16]:
        r = slp_root_text(root)
        if r:
            result.append((r, tuple(sorted(tag_names(tags)))))
    return tuple(result)


@lru_cache(maxsize=30000)
def split_token(token: str):
    token = norm(token)
    if not token or len(token) < 7 or len(token) > 42 or "-" in token:
        return tuple()
    try:
        splits = parser.split(token, limit=1)
        if not splits: return tuple()
        pieces = [norm(x.transcoded(sanscript.IAST, strict_io=False)) for x in splits[0].split]
        pieces = [x for x in pieces if x]
        if len(pieces) <= 1 or pieces == [token]: return tuple()
        return tuple(pieces)
    except Exception:
        return tuple()


def case_wrap(meaning: str, tags: set[str]) -> str:
    for tag, template in CASE_TAGS.items():
        if tag in tags:
            return template.format(x=meaning)
    return meaning


def lookup(token: str, mw: dict[str, str]) -> str:
    t = norm(token)
    if not t: return ""
    if t in CONTEXT: return CONTEXT[t]

    for cand, template in base.candidates(t):
        c = norm(cand)
        if c in CONTEXT:
            val = CONTEXT[c]
            return template.format(x=val) if template else val
        val = mw.get(base.iast_to_slp1(c))
        if val:
            val = clean_definition(val, c)
            if val: return template.format(x=val) if template else val

    # Use morphological analysis to get the actual lemma/root before consulting
    # the dictionary.  This resolves ordinary case endings and finite verbs.
    for root_slp, tags_tuple in morphology(t):
        val = mw.get(root_slp)
        if not val: continue
        val = clean_definition(val, t)
        if not val: continue
        return case_wrap(val, set(tags_tuple))
    return ""


def best_units(token: str, mw: dict[str, str]) -> list[str]:
    t = norm(token)
    if not t: return []
    if lookup(t, mw): return [t]
    if "-" in t:
        pieces = [norm(x) for x in t.split("-") if norm(x)]
        if pieces: return pieces
    pieces = list(split_token(t))
    if pieces and all(lookup(x, mw) for x in pieces):
        return pieces
    return [t]


def make_gloss(text: str, mw: dict[str, str]) -> tuple[str, int, int]:
    iast = base.devanagari_to_iast(text)
    raw = re.sub(r"\[[^\]]*\]|\|+|\b\d+(?:\.\d+)*\b", " ", iast)
    tokens = [norm(x) for x in raw.split()]
    units = []
    for token in filter(None, tokens):
        units.extend(best_units(token, mw))

    parts = []
    unresolved = 0
    for unit in units:
        meaning = lookup(unit, mw)
        if not meaning:
            unresolved += 1
            # Preserve the exact form rather than fabricating a translation.
            meaning = unit
        parts.append(f"{unit} — {meaning}")
    return "; ".join(parts) + ("." if parts else ""), unresolved, len(units)


def main() -> None:
    mw = prepare_mw(base.build_mw())
    source_cache = {}
    total_units = total_unresolved = total_entries = 0
    chapter_stats = {}

    for chapter in range(8, 91):
        path = base.chapter_path(chapter)
        if path not in source_cache:
            print(f"Fetching source {path}", flush=True)
            source_cache[path] = base.fetch(base.SRIDHARA_BASE + path).decode("utf-8", errors="replace")
        entries = base.parse_sridhara(source_cache[path], chapter)
        data = {}
        ch_units = ch_unresolved = 0
        for start, end, text in entries:
            gloss, unresolved, units = make_gloss(text, mw)
            key = str(start) if start == end else f"{start}-{end}"
            data[key] = {"word_for_word": gloss}
            ch_units += units
            ch_unresolved += unresolved
            total_entries += 1
        (OUT / f"{chapter:02d}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        total_units += ch_units
        total_unresolved += ch_unresolved
        rate = 100.0 * (ch_units - ch_unresolved) / ch_units if ch_units else 100.0
        chapter_stats[str(chapter)] = {
            "sridhara_blocks": len(data),
            "lexical_units": ch_units,
            "resolved_units": ch_units - ch_unresolved,
            "unresolved_units": ch_unresolved,
            "resolved_percent": round(rate, 2),
        }
        print(f"Chapter {chapter:02d}: {len(data)} blocks; {ch_units} units; {rate:.1f}% resolved", flush=True)

    manifest = {
        "scope": "Sridhara Svami Bhavartha-dipika, Srimad Bhagavatam Canto 10",
        "format": "literal lexical word-for-word only; no prose translation",
        "chapters": list(range(1, 91)),
        "reviewed_chapter_files_preserved": list(range(1, 8)),
        "morphology_refined_chapters": list(range(8, 91)),
        "generated_sridhara_blocks_8_90": total_entries,
        "generated_lexical_units_8_90": total_units,
        "generated_resolved_units_8_90": total_units - total_unresolved,
        "generated_unresolved_units_8_90": total_unresolved,
        "generated_resolved_percent_8_90": round(100.0 * (total_units - total_unresolved) / total_units, 2) if total_units else 100.0,
        "chapter_stats": chapter_stats,
        "source": "vishvAsa/purANam_vaiShNavam content branch",
        "dictionary": "Monier-Williams Sanskrit-English Dictionary, Cologne Digital Sanskrit Lexicon",
        "morphology": "sanskrit_parser combined lexical lookup",
        "rule": "unresolved forms are preserved as Sanskrit; no guessed prose is inserted",
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: v for k, v in manifest.items() if k != "chapter_stats"}, ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
