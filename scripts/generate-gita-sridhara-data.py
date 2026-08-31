#!/usr/bin/env python3
"""Generate candidate English data for Śrīdhara Svāmī's Bhagavad Gītā commentary.

The Sanskrit source is the open vedicscriptures/bhagavad-gita dataset already used
by the site. Candidate English is generated from that Sanskrit with AI4Bharat's
official MIT-licensed IndicTrans2 Indic-to-English model. Generated files remain
unreviewed and the live site refuses to display them until they are explicitly
reviewed and marked as such.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Iterable

import torch
from IndicTransToolkit.processor import IndicProcessor
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

COUNTS = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78]
MODEL_NAME = "ai4bharat/indictrans2-indic-en-dist-200M"
SRC_LANG = "san_Deva"
TGT_LANG = "eng_Latn"


def clean_commentary(text: str) -> str:
    text = (text or "").replace("\u00a0", " ").strip()
    text = re.sub(r"^\s*[।॥]{1,2}\s*\d+\s*[.]\s*\d+\s*[।॥]{0,2}\s*", "", text)
    text = re.sub(r"^\s*[।॥]{1,2}\s*\d+\s*[।॥]{0,2}\s*", "", text)
    return re.sub(r"\s+", " ", text).strip()


def no_commentary(text: str) -> bool:
    return not text or bool(re.fullmatch(r"no commentary\.?", text, flags=re.I))


def split_sentences(text: str, max_words: int = 42) -> list[str]:
    """Split prose at Sanskrit punctuation, then cap very long pieces."""
    text = re.sub(r"([।॥])", r"\1\n", text)
    raw = [x.strip() for x in re.split(r"[\n]+", text) if x.strip()]
    result: list[str] = []
    for sentence in raw:
        words = sentence.split()
        if len(words) <= max_words:
            result.append(sentence)
            continue
        for i in range(0, len(words), max_words):
            result.append(" ".join(words[i : i + max_words]))
    return result or ([text] if text else [])


def split_phrases(text: str, target_words: int = 5) -> list[str]:
    """Create compact phrase units for the site's word-for-word presentation."""
    phrases: list[str] = []
    for sentence in split_sentences(text, max_words=32):
        sentence = sentence.strip(" ।॥")
        if not sentence:
            continue
        pieces = [p.strip() for p in re.split(r"[,;:—–]+", sentence) if p.strip()]
        for piece in pieces:
            words = piece.split()
            if len(words) <= target_words + 2:
                phrases.append(piece)
                continue
            for i in range(0, len(words), target_words):
                chunk = " ".join(words[i : i + target_words]).strip()
                if chunk:
                    phrases.append(chunk)
    return phrases


def deva_to_iast(text: str) -> str:
    try:
        return transliterate(text, sanscript.DEVANAGARI, sanscript.IAST).strip()
    except Exception:
        return text.strip()


class Translator:
    def __init__(self, model_name: str = MODEL_NAME) -> None:
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name, trust_remote_code=True).to(self.device).eval()
        self.processor = IndicProcessor(inference=True)
        print(f"translation device: {self.device}", flush=True)

    def batch(self, sentences: Iterable[str], batch_size: int = 16) -> list[str]:
        items = [s.strip() for s in sentences if s and s.strip()]
        if not items:
            return []
        out_all: list[str] = []
        for start in range(0, len(items), batch_size):
            batch = items[start : start + batch_size]
            prepared = self.processor.preprocess_batch(batch, src_lang=SRC_LANG, tgt_lang=TGT_LANG)
            encoded = self.tokenizer(
                prepared,
                truncation=True,
                padding=True,
                max_length=256,
                return_tensors="pt",
            )
            encoded = {k: v.to(self.device) for k, v in encoded.items()}
            with torch.inference_mode():
                generated = self.model.generate(
                    **encoded,
                    num_beams=1,
                    do_sample=False,
                    max_length=256,
                    no_repeat_ngram_size=3,
                )
            decoded = self.tokenizer.batch_decode(generated, skip_special_tokens=True)
            decoded = self.processor.postprocess_batch(decoded, lang=TGT_LANG)
            out_all.extend(re.sub(r"\s+", " ", x).strip() for x in decoded)
            print(f"translated {min(start + len(batch), len(items))}/{len(items)} units", flush=True)
        return out_all


def smooth_join(parts: list[str]) -> str:
    cleaned: list[str] = []
    for part in parts:
        part = re.sub(r"\s+", " ", part).strip()
        if not part:
            continue
        if part[-1] not in ".?!:;”’\"":
            part += "."
        cleaned.append(part)
    return " ".join(cleaned)


def read_source(source: Path, chapter: int, verse: int) -> str:
    path = source / "slok" / f"bhagavadgita_chapter_{chapter}_slok_{verse}.json"
    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    return clean_commentary(((data.get("srid") or {}).get("sc") or ""))


def generate_chapter(translator: Translator, source: Path, chapter: int) -> dict:
    records: dict[int, dict] = {}
    all_sentences: list[str] = []
    all_phrases: list[str] = []

    for verse in range(1, COUNTS[chapter - 1] + 1):
        sanskrit = read_source(source, chapter, verse)
        if no_commentary(sanskrit):
            records[verse] = {"no_commentary": True}
            continue

        sentence_units = split_sentences(sanskrit)
        phrase_units = split_phrases(sanskrit)
        records[verse] = {
            "no_commentary": False,
            "sentence_start": len(all_sentences),
            "sentence_count": len(sentence_units),
            "phrase_start": len(all_phrases),
            "phrase_count": len(phrase_units),
            "phrase_units": phrase_units,
        }
        all_sentences.extend(sentence_units)
        all_phrases.extend(phrase_units)

    print(f"chapter {chapter}: {len(all_sentences)} sentence units, {len(all_phrases)} phrase units", flush=True)
    sentence_english = translator.batch(all_sentences, batch_size=16)
    phrase_english = translator.batch(all_phrases, batch_size=24)

    verses: dict[str, dict] = {}
    for verse in range(1, COUNTS[chapter - 1] + 1):
        record = records[verse]
        if record["no_commentary"]:
            verses[str(verse)] = {
                "translation": "No commentary.",
                "word_for_word": [],
            }
            print(f"{chapter}.{verse}: no commentary", flush=True)
            continue

        sentence_start = record["sentence_start"]
        sentence_end = sentence_start + record["sentence_count"]
        translation = smooth_join(sentence_english[sentence_start:sentence_end])

        phrase_start = record["phrase_start"]
        phrase_end = phrase_start + record["phrase_count"]
        phrase_glosses = phrase_english[phrase_start:phrase_end]
        pairs = []
        for src, gloss in zip(record["phrase_units"], phrase_glosses):
            gloss = re.sub(r"\s+", " ", gloss).strip().rstrip(".")
            if not gloss:
                continue
            pairs.append([deva_to_iast(src).strip(" |।॥"), gloss])

        verses[str(verse)] = {
            "translation": translation,
            "word_for_word": pairs,
        }
        print(f"{chapter}.{verse}: {record['sentence_count']} sentence units, {len(pairs)} phrase glosses", flush=True)

    return {
        "_meta": {
            "chapter": chapter,
            "source": "vedicscriptures/bhagavad-gita",
            "source_field": "srid.sc",
            "translation_model": MODEL_NAME,
            "reviewed": False,
            "method": "candidate machine-assisted literal rendering from public-domain Sanskrit; blocked from live display until reviewed",
        },
        "verses": verses,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, type=Path, help="Path to a clone of vedicscriptures/bhagavad-gita")
    parser.add_argument("--output", type=Path, default=Path("assets/data/bhagavad-gita-sridhara"))
    parser.add_argument("--chapters", nargs="*", type=int, default=list(range(2, 19)))
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    translator = Translator()

    for chapter in args.chapters:
        if chapter < 2 or chapter > 18:
            raise SystemExit(f"Unsupported chapter: {chapter}")
        payload = generate_chapter(translator, args.source, chapter)
        target = args.output / f"chapter-{chapter}.json"
        target.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {target}", flush=True)


if __name__ == "__main__":
    main()