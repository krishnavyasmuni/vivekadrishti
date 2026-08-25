#!/usr/bin/env python3
"""Extract only Śrīdhara Svāmī's Bhāvārtha-dīpikā blocks for Canto 10.

This does not translate anything. It creates compact chapter JSON files from the
Vishvasa Sanskrit source so the English translation pass can be done against
Śrīdhara's text without carrying all of the other commentaries.
"""

from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

BASE = "https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIya-prastutiH/10/"
OUT = Path("assets/data/canto10-sridhara-source")

DEVA_DIGITS = str.maketrans("०१२३४५६७८९", "0123456789")
MARKER = re.compile(r"॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*॥")
LABEL = re.compile(r"\*\*(?:श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)|श्रीधर-स्वामी|श्रीधरः)\s*:\*\*")
STOP = re.compile(
    r"\n(?:_{4,}|\*\*(?:वंशीधरः|वीरराघव|विजयध्वज|श्रीनाथ|सनातन|जीव-?गोस्वामी|विश्वनाथ|बलदेव))"
)

# Corrections established by comparison with Ramtej Pandey's 1949 printed
# Bhāvārtha-dīpikā.  Keeping them here makes re-extraction deterministic.
CORRECTIONS: dict[tuple[int, str], str] = {
    (8, "10"): "द्विजाति-संस्कारं द्विजातीनाम् अवश्यं कर्तव्यं संस्कार-मात्रं केवलं स्वस्ति-वाचन-पूर्वकं कुर्विति ॥१०-११॥",
    (8, "12"): "यदूनाम् अपृथग्-भावात् कुतश्चिद् हेतोर् विप्रतिपद्यमानानां यदूनाम् अपृथग्-भावाद् भावो भावनं तस्मात् । अन्योन्य-शिक्षया सर्वैक-मत्य-करणाद् इत्य् अर्थः । सम्यक् कर्षत्य् एकीकरोतीति सङ्कर्षणम् अप्य् उशन्ति मन्यन्ते वक्ष्यन्तीत्य् अर्थः । गर्भ-सङ्कर्षणं तु न प्रकाशयति ॥१२॥",
    (8, "20"): "इतीति । इत्य् आत्मानं प्रति समादिश्य । आत्मानं कृष्णं च । गर्गे गते सति, आशिषाम् आशीर्भिः नन्दः पूर्णं विष्णुं मेने अमंस्त ॥२०॥",
    (12, "34"): "स्व-कृतः स्व-कार्य-कर्तुः श्री-कृष्णस्यार्हणं पुष्पैर् अकृत अकुर्वन् । व्यत्ययेनैक-वचनम् । सुगाः सुष्ठु गायन्तीति गन्धर्वादयः ॥३४॥",
    (12, "35"): "किं च, तेषां गन्धर्वादीनाम् अद्भुतानि स्तोत्राणि सुवाद्यानि वाद्यादीन् गीतिका गीतानि च, जय-शब्दादिर् येषां तान् अनेकान् उत्सवान् मङ्गलाशासन-ध्वनींश् च स्व-धाम्नोऽन्ति समीपे श्रुत्वाजो ब्रह्माचिराद् आगत ईशस्य श्री-कृष्णस्य मही-महिमानं दृष्ट्वा विस्मयं जगाम ॥३५॥",
    (13, "16"): "उभौ अपि वत्सान् वत्सपांश् चेत्य् अर्थः । विचिकाय अन्वीक्षितवान् ॥१६॥",
    (13, "19"): "तद् एव दर्शयति---यावद् इति । वत्सपानां वत्सकानां च अल्पकं वपुः यत्-प्रमाणकं प्रमाणम् अनतिक्रम्येत्य् अर्थः । एवम् उपर्य् अपि योज्यम् । तत्र दलं पर्ण-रूपो वाद्य-विशेषः । यद् वा, अत्र वेणु-दलं वेणु-खण्डम् । शिक् शिक्यम् । यद् वा, यावद् वत्सपादि-वपुः, तावत् सर्व-स्वरूप-अजः कृष्णो बभौ इत्य् अर्थः । उत्तरत्राप्य् एवम् । कथम् ? सर्वं विष्णु-मयं जगत् [वि।पु। ५.१.२०] इत्य् अत्र, प्रसिद्धा या गीः, तस्या अङ्गवत् सा गीर् एव अर्थ । स्वरूपेण प्रत्यक्षा यथा, तथा बभौ इत्य् अर्थः ॥१९॥",
    (13, "30"): "तदैव स गो-व्रजो गवां कलापस् तत्-स्नेह-वशस् तेषां वत्सानां स्नेहेनाकृष्टोऽत एव न स्मृत आत्मा देहो येन स जवेनोपव्रजम् अगात् । कथं-भूतः । अत्यात्म-प-दुर्ग-मार्गः अतिक्रान्त आत्म-पान् गोपालान् यः सोऽत्यात्म-पः, तथा दुर्गो दुर्गमो मार्गो यस्य सः स च स च । तथा परस्पर-युक्ताभ्यां पद्भ्यां धावन् द्वि-पाद् इव प्रतीयमानः । ककुद्य् आकुञ्चिता ग्रीवा यस्य सः । उदास्य-पुच्छः उन्नमितान्यास्यानि पुच्छानि च येन सः । आस्रु-पयाः सर्वतः स्रवन्ति पयांसि यस्य सः । \"आस्नु-पयाः\" इत्य् अपि पाठे स एवार्थः । गो-व्रज इत्य् अनेन वृषभादयोऽप्य् अगुर् इत्य् उक्तम् ॥३०॥",
}


def chapter_file(ch: int) -> str:
    return f"{ch:02d}"


def source_path(ch: int) -> str:
    if ch <= 11:
        return f"01-11/{chapter_file(ch)}.md"
    if ch <= 17:
        return f"12-17/{chapter_file(ch)}.md"
    if ch <= 28:
        return f"18-28/{chapter_file(ch)}.md"
    if ch == 29:
        return "29-33_rasa-panchAdhyAya/29.md"
    if ch == 30:
        return "29-33_rasa-panchAdhyAya/30_atha-triMshodhyAyaH_unnumbered.md"
    if ch == 31:
        return "29-33_rasa-panchAdhyAya/31_athaikatriMshodhyAyaH_unnumbered.md"
    if ch == 32:
        return "29-33_rasa-panchAdhyAya/32_atha-dvAtriMshodhyAyaH_unnumbered.md"
    if ch == 33:
        return "29-33_rasa-panchAdhyAya/33_atha-trayastriMshodhyAyaH_unnumbered.md"
    if ch <= 49:
        return f"34-49/{chapter_file(ch)}.md"
    if ch <= 59:
        return f"50-59/{chapter_file(ch)}.md"
    if ch <= 69:
        return f"60-69/{chapter_file(ch)}.md"
    if ch <= 79:
        return f"70-79/{chapter_file(ch)}.md"
    if 80 <= ch <= 84:
        return "80-86/70_athAshItitamo-dhyayaH.md"
    if ch == 85:
        return "80-86/72_bhagavatA_devakI-prArthanayA_tadIya-mRta-putrAN.md"
    if ch == 86:
        return "80-86/74_10_86_1.md"
    if ch == 87:
        return "87.md"
    if ch == 88:
        return "88-90/70.md"
    if ch == 89:
        return "88-90/71.md"
    if ch == 90:
        return "88-90/72.md"
    raise ValueError(ch)


def fetch(path: str) -> str:
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "vivekadrishti-source-extractor"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read().decode("utf-8")


def clean_inline(text: str) -> str:
    text = re.sub(r"\[\^[^\]]+\]", "", text)
    text = re.sub(r"\\([\\`*_{}\[\]()#+\-.!])", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"__([^_]+)__", r"\1", text)
    text = re.sub(r"\*([^*\n]+)\*", r"\1", text)
    text = re.sub(r"_([^_\n]+)_", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = text.replace(">", "")
    text = re.sub(r"(?m)^\s*-{3,}\**\s*$", "", text)
    text = text.replace("\\", "")
    text = text.replace("*", "")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def is_placeholder(text: str) -> bool:
    compact = re.sub(r"\s+", "", text)
    return (
        not compact
        or compact.startswith("[+++]")
        or compact in {"+++", "[+++]{।मर्क्}", "[+++]{.mark}"}
    )


def parse(markdown: str, chapter: int) -> dict[str, dict[str, object]]:
    markers = list(MARKER.finditer(markdown))
    out: dict[str, dict[str, object]] = {}
    for i, marker in enumerate(markers):
        canto = int(marker.group(1).translate(DEVA_DIGITS))
        ch = int(marker.group(2).translate(DEVA_DIGITS))
        if canto != 10 or ch != chapter:
            continue
        start = int(marker.group(3).translate(DEVA_DIGITS))
        end = int((marker.group(4) or marker.group(3)).translate(DEVA_DIGITS))
        segment_end = markers[i + 1].start() if i + 1 < len(markers) else len(markdown)
        segment = markdown[marker.end():segment_end]
        label = LABEL.search(segment)
        if not label:
            continue
        commentary = segment[label.end():]
        stop = STOP.search(commentary)
        if stop:
            commentary = commentary[:stop.start()]
        commentary = clean_inline(commentary)
        key = str(start) if start == end else f"{start}-{end}"
        out[key] = {
            "start": start,
            "end": end,
            "sanskrit": "" if is_placeholder(commentary) else commentary,
            "source_available": not is_placeholder(commentary),
        }
        if (chapter, key) in CORRECTIONS:
            out[key]["sanskrit"] = CORRECTIONS[(chapter, key)]
            out[key]["source_available"] = True
    return out


def main() -> None:
    # Keep this extractor deterministic: it is temporary build tooling, not a translator.
    OUT.mkdir(parents=True, exist_ok=True)
    cache: dict[str, str] = {}
    for chapter in range(1, 91):
        path = source_path(chapter)
        if path not in cache:
            print(f"fetch {path}")
            cache[path] = fetch(path)
        data = {
            "chapter": chapter,
            "source_path": path,
            "entries": parse(cache[path], chapter),
        }
        (OUT / f"{chapter:02d}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"chapter {chapter}: {len(data['entries'])} Śrīdhara blocks")


if __name__ == "__main__":
    main()
