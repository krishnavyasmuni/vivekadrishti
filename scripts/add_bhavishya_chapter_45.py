from pathlib import Path
from bs4 import BeautifulSoup
import html


ROOT = Path(__file__).resolve().parents[1]
CHAPTER = 45
TITLE = "The Account of Kārttikeya"
SOURCE = "https://sa.wikisource.org/wiki/भविष्यपुराणम्_/पर्व_१_(ब्राह्मपर्व)/अध्यायः_०४५"
WISDOMLIB = "https://www.wisdomlib.org/hinduism/book/bhavishya-purana-sanskrit/d/doc1257222.html"

VERSES = [
    {
        "dev": ["ब्रह्मोवाच", "इदं श्रुणु मयाख्यातं तर्कपूर्वमिदं वचः ।", "युष्माकं संशये जाते कृते वै जातिकर्मणोः ॥ १ ॥"],
        "iast": ["brahmovāca", "idaṃ śruṇu mayākhyātaṃ tarkapūrvamidaṃ vacaḥ |", "yuṣmākaṃ saṃśaye jāte kṛte vai jātikarmaṇoḥ || 1 ||"],
        "translation": "Brahmā said: Hear this reasoned statement as explained by me, since doubt has arisen among you concerning birth and action.",
        "wfw": "ब्रह्मा उवाच (brahmā uvāca) — Brahmā said; इदम् शृणु (idam śṛṇu) — hear this; मया आख्यातम् (mayā ākhyātam) — explained by me; तर्कपूर्वम् वचः (tarka-pūrvam vacaḥ) — a reasoned statement; युष्माकम् संशये जाते (yuṣmākam saṃśaye jāte) — when doubt has arisen among you; जातिकर्मणोः (jāti-karmaṇoḥ) — concerning birth and action",
    },
    {
        "dev": ["पुनर्वच्मि निबोधध्वं समासान्न तु विस्तरात् ।", "संसिद्धिं यान्ति मनुजा जातिकर्मसमुच्चयात् ॥ २ ॥"],
        "iast": ["punarvacmi nibodhadhvaṃ samāsānna tu vistarāt |", "saṃsiddhiṃ yānti manujā jātikarmasamuccayāt || 2 ||"],
        "translation": "I shall state it again; understand it in summary rather than at length. Human beings attain complete success through the conjunction of birth and action.",
        "wfw": "पुनः वच्मि (punaḥ vacmi) — I state again; निबोधध्वम् (nibodhadhvam) — understand; समासात् (samāsāt) — in summary; न तु विस्तरात् (na tu vistarāt) — not at length; संसिद्धिम् यान्ति (saṃsiddhim yānti) — attain complete success; मनुजाः (manujāḥ) — human beings; जातिकर्मसमुच्चयात् (jāti-karma-samuccayāt) — through the conjunction of birth and action",
    },
    {
        "dev": ["सिद्धिं गच्छेद्यथा कार्यं दैवकर्मसमुच्चयात् ।", "एवं संसिद्धिमायाति पुरुषो जातिकर्मणोः ॥ ३ ॥"],
        "iast": ["siddhiṃ gacchedyathā kāryaṃ daivakarmasamuccayāt |", "evaṃ saṃsiddhimāyāti puruṣo jātikarmaṇoḥ || 3 ||"],
        "translation": "Just as an undertaking reaches fulfilment through the conjunction of destiny and action, so a person attains complete success through birth and action.",
        "wfw": "सिद्धिम् गच्छेत् (siddhim gacchet) — should reach fulfilment; यथा कार्यम् (yathā kāryam) — just as an undertaking; दैवकर्मसमुच्चयात् (daiva-karma-samuccayāt) — through the conjunction of destiny and action; एवम् (evam) — so; संसिद्धिम् आयाति (saṃsiddhim āyāti) — attains complete success; पुरुषः (puruṣaḥ) — a person; जातिकर्मणोः (jāti-karmaṇoḥ) — through birth and action",
    },
    {
        "dev": ["इत्येवमुक्तवान्पूर्वं शिष्याणां बोधने पुरा ।", "योगीश्वरो महातेजाः समासान्न तु विस्तरात् ॥ ४ ॥"],
        "iast": ["ityevamuktavānpūrvaṃ śiṣyāṇāṃ bodhane purā |", "yogīśvaro mahātejāḥ samāsānna tu vistarāt || 4 ||"],
        "translation": "Thus, long ago, the greatly radiant lord of yogins spoke in this way when instructing his disciples—briefly and not at length.",
        "wfw": "इति एवम् उक्तवान् (iti evam uktavān) — thus spoke in this way; पूर्वम् पुरा (pūrvam purā) — formerly, long ago; शिष्याणाम् बोधने (śiṣyāṇām bodhane) — in instructing the disciples; योगीश्वरः (yogīśvaraḥ) — lord of yogins; महातेजाः (mahātejāḥ) — greatly radiant; समासात् (samāsāt) — briefly; न तु विस्तरात् (na tu vistarāt) — not at length",
    },
    {
        "dev": ["सुमन्तुरुवाच", "इति पृष्टः पुरा ब्रह्मा ऋषीन्प्रोवाच भारत ।", "सवितर्कमिदं वाक्यं विप्रर्षे जातिकर्मणोः ॥ ५ ॥"],
        "iast": ["sumanturuvāca", "iti pṛṣṭaḥ purā brahmā ṛṣīnprovāca bhārata |", "savitarkamidaṃ vākyaṃ viprarṣe jātikarmaṇoḥ || 5 ||"],
        "translation": "Sumantu said: Questioned in this way long ago, Brahmā spoke this reasoned statement about birth and action to the sages, O descendant of Bharata, O brahmin seer.",
        "wfw": "सुमन्तुः उवाच (sumantuḥ uvāca) — Sumantu said; इति पृष्टः (iti pṛṣṭaḥ) — questioned in this way; पुरा (purā) — long ago; ब्रह्मा ऋषीन् प्रोवाच (brahmā ṛṣīn provāca) — Brahmā spoke to the sages; भारत (bhārata) — O descendant of Bharata; सवितर्कम् इदम् वाक्यम् (sa-vitarkam idam vākyam) — this reasoned statement; विप्रर्षे (viprarṣe) — O brahmin seer; जातिकर्मणोः (jāti-karmaṇoḥ) — concerning birth and action",
    },
    {
        "dev": ["तस्मात्त्वया महाबाहो न कार्यो विस्मयो नृप ।", "कार्तिकेयं प्रति सदा देवानां दुर्विदा गतिः ॥ ६ ॥"],
        "iast": ["tasmāttvayā mahābāho na kāryo vismayo nṛpa |", "kārtikeyaṃ prati sadā devānāṃ durvidā gatiḥ || 6 ||"],
        "translation": "Therefore, mighty-armed king, you should not be astonished. The course of the gods concerning Kārttikeya is always difficult to comprehend.",
        "wfw": "तस्मात् त्वया (tasmāt tvayā) — therefore by you; महाबाहो (mahābāho) — O mighty-armed one; न कार्यः विस्मयः (na kāryaḥ vismayaḥ) — astonishment should not be entertained; नृप (nṛpa) — O king; कार्तिकेयम् प्रति (kārtikeyam prati) — concerning Kārttikeya; सदा (sadā) — always; देवानाम् गतिः (devānām gatiḥ) — the course of the gods; दुर्विदा (durvidā) — difficult to comprehend",
    },
]


def section(number, verse):
    dev = "<br>".join(html.escape(line) for line in verse["dev"])
    iast = "<br>".join(html.escape(line) for line in verse["iast"])
    return f'''<section style="margin:0 0 26px;padding:0"><h3 id="bp-1-{CHAPTER}-{number}" style="margin:0;text-align:center;color:#2f7f82;font-family:Vollkorn,Georgia,serif;font-size:26px;line-height:1.1;font-weight:600;letter-spacing:.01em">BP 1.{CHAPTER}.{number}</h3><hr style="border:0;border-top:1px solid #dedbd6;width:56%;max-width:520px;margin:13px auto 16px"><div lang="sa" style="max-width:840px;margin:0 auto 14px;text-align:center;color:#3c362e;font-size:21px;line-height:1.48;font-weight:400">{dev}</div><p style="max-width:840px;margin:0 auto 14px;text-align:center;color:#3c362e;font-size:16px;line-height:1.45;font-weight:400">{html.escape(verse['translation'])}</p><details style="max-width:840px;margin:0 auto 8px;padding:0"><summary style="display:block;width:max-content;cursor:pointer;border:1px solid #9bc5c7;border-radius:999px;padding:5px 13px;color:#2f7f82;background:transparent;font-size:14px;line-height:1.15;font-weight:600">Word-for-word</summary><div style="margin:8px 0 12px;color:#3c362e;font-size:13px;line-height:1.55">{html.escape(verse['wfw'])}</div></details><details style="max-width:840px;margin:0 auto 12px;padding:0"><summary style="display:block;width:max-content;cursor:pointer;border:1px solid #9bc5c7;border-radius:999px;padding:5px 13px;color:#2f7f82;background:transparent;font-size:14px;line-height:1.15;font-weight:600">Transliteration</summary><div style="margin:8px 0 12px;color:#3c362e;font-size:14px;line-height:1.55"><em>{iast}</em></div></details></section>'''


def build_body():
    sections = "".join(section(number, verse) for number, verse in enumerate(VERSES, 1))
    return f'''<div style="width:100%;margin:0;padding:8px 0 20px;background:#f7f6f4;color:#3c362e;font-family:Merriweather,Georgia,'Times New Roman',serif"><div style="width:100%;max-width:920px;margin:0 auto;padding:0 24px"><hr style="border:0;border-top:1px solid #dedbd6;width:70%;max-width:650px;margin:6px auto 18px"><div style="max-width:760px;margin:0 auto 28px"><p style="margin:0 0 8px;color:#2f7f82;font-size:18px;line-height:1.3;font-weight:700">Contents</p><ul style="margin:0;padding-left:28px;font-size:16px;line-height:1.4"><li><a href="#chapter-{CHAPTER}" style="color:#5d39f4;text-decoration:none">Chapter {CHAPTER} — {TITLE}</a></li></ul></div><hr style="border:0;border-top:1px solid #dedbd6;width:70%;max-width:650px;margin:0 auto 24px"><div id="chapter-{CHAPTER}">{sections}</div><p style="max-width:840px;margin:34px auto 0;padding-top:16px;border-top:1px solid #dedbd6;font-size:13px;line-height:1.5"><strong>Primary Sanskrit source:</strong> <a href="{html.escape(SOURCE)}" style="color:#5d39f4">Sanskrit Wikisource — Bhaviṣya Purāṇa, Brāhmaparvan, Chapter {CHAPTER}</a>. Cross-checked against the <a href="{WISDOMLIB}" style="color:#5d39f4">Wisdomlib Sanskrit edition</a>.</p></div></div>'''


def add_article():
    template_path = ROOT / "articles/bhavishya-purana-brahmaparvan-chapter-38/index.html"
    soup = BeautifulSoup(template_path.read_text(), "html.parser")
    page_title = f"Bhaviṣya Purāṇa — Brāhmaparvan — Chapter {CHAPTER}"
    soup.title.string = f"{page_title} — Viveka Dṛṣṭi"
    soup.find("meta", attrs={"name": "description"})["content"] = f"{page_title}: Sanskrit text, English translation, word-for-word analysis, and transliteration."
    soup.select_one(".article-heading h1").string = page_title
    soup.select_one(".article-date").string = "22 August 2026"
    body = soup.select_one(".article-body")
    body.clear()
    body.append(BeautifulSoup(build_body(), "html.parser"))
    target = ROOT / f"articles/bhavishya-purana-brahmaparvan-chapter-{CHAPTER}/index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(str(soup))


def update_index():
    path = ROOT / "pages/bhavishya-purana-brahmaparvan/index.html"
    soup = BeautifulSoup(path.read_text(), "html.parser")
    ul = soup.select_one(".empyrean-introduction-content ul")
    href = f"/vivekadrishti/articles/bhavishya-purana-brahmaparvan-chapter-{CHAPTER}/"
    if not ul.select_one(f'a[href="{href}"]'):
        link = BeautifulSoup(f'<li><a href="{href}" style="font-size:20px;font-weight:400;line-height:1.5;text-decoration:none;color:#6731fb;font-family:Merriweather,serif">Chapter {CHAPTER} — {TITLE}</a></li>', "html.parser").li
        ul.append(link)
    path.write_text(str(soup))


if __name__ == "__main__":
    add_article()
    update_index()
