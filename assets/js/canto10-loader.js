(() => {
  const root = document.querySelector('.empyrean-bhagavatam-rebuild-part .sb-inner');
  if (!root) return;

  const publishedThroughVerse = 10;
  const prabhupadaSource = 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIyo_abhaya-charaNaH/10/01.md';
  const sridharaSource = 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIya-prastutiH/10/01-11/01.md';

  const cleanInline = (text) => (text || '')
    .replace(/\\([\\_*\[\]])/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();

  const cleanBlock = (text) => cleanInline(text)
    .replace(/[ \t]{2,}\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  function parsePrabhupada(markdown) {
    const entries = new Map();
    const headings = Array.from(markdown.matchAll(/^##\s+Text\s+(\d+)\s*$/gmi));
    headings.forEach((match, index) => {
      const verse = Number(match[1]);
      const bodyStart = match.index + match[0].length;
      const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
      const body = markdown.slice(bodyStart, bodyEnd);
      const section = (label) => {
        const re = new RegExp(`###\\s+${label}\\s*\\n+([\\s\\S]*?)(?=\\n###\\s+|$)`, 'i');
        return body.match(re)?.[1] || '';
      };
      entries.set(verse, {
        devanagari: cleanBlock(section('Devanagari')),
        transliteration: cleanBlock(section('Verse text')),
        synonyms: cleanBlock(section('Synonyms')).replace(/\s+/g, ' '),
        translation: cleanBlock(section('Translation')).replace(/\s+/g, ' ')
      });
    });
    return entries;
  }

  function parseSridhara(markdown) {
    const entries = new Map();
    const markers = Array.from(markdown.matchAll(/^॥\s*१०\.१\.(\d+)\s*॥\s*$/gmi));
    markers.forEach((match, index) => {
      const verse = Number(match[1]);
      const bodyStart = match.index + match[0].length;
      const bodyEnd = index + 1 < markers.length ? markers[index + 1].index : markdown.length;
      const body = markdown.slice(bodyStart, bodyEnd);
      const label = '**श्रीधर-स्वामी (भावार्थ-दीपिका) :**';
      const start = body.indexOf(label);
      if (start < 0) return;
      let block = body.slice(start + label.length);
      const separator = block.search(/^_{4,}\s*$/m);
      if (separator >= 0) block = block.slice(0, separator);
      block = cleanBlock(block)
        .replace(/^श्री-गणेशाय नमः\s*[।.]?\s*/u, '')
        .trim();
      if (block) entries.set(verse, block);
    });
    return entries;
  }

  const independentVowels = new Map(Object.entries({
    'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'
  }));
  const vowelMarks = new Map(Object.entries({
    'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au'
  }));
  const consonants = new Map(Object.entries({
    'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ',
    'ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n',
    'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'
  }));
  const digits = new Map(Object.entries({'०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'}));

  function devanagariToIast(input) {
    const chars = Array.from((input || '').normalize('NFC'));
    let output = '';
    for (let i = 0; i < chars.length; i += 1) {
      const ch = chars[i];
      if (consonants.has(ch)) {
        const next = chars[i + 1];
        output += consonants.get(ch);
        if (next === '्') i += 1;
        else if (vowelMarks.has(next)) { output += vowelMarks.get(next); i += 1; }
        else output += 'a';
        continue;
      }
      if (independentVowels.has(ch)) { output += independentVowels.get(ch); continue; }
      if (vowelMarks.has(ch)) { output += vowelMarks.get(ch); continue; }
      if (digits.has(ch)) { output += digits.get(ch); continue; }
      if (ch === 'ं') { output += 'ṃ'; continue; }
      if (ch === 'ः') { output += 'ḥ'; continue; }
      if (ch === 'ँ') { output += 'm̐'; continue; }
      if (ch === 'ऽ') { output += '’'; continue; }
      if (ch === '।') { output += '|'; continue; }
      if (ch === '॥') { output += '||'; continue; }
      if (ch === '़' || ch === '्') continue;
      output += ch;
    }
    return output.trim();
  }

  function appendLines(parent, text, italic = false) {
    const target = italic ? document.createElement('em') : parent;
    String(text || '').split(/\n/).filter((line) => line.trim()).forEach((line, index) => {
      if (index) target.appendChild(document.createElement('br'));
      target.appendChild(document.createTextNode(line.trim()));
    });
    if (italic) parent.appendChild(target);
  }

  function detailsCard(className, label, contentBuilder) {
    const details = document.createElement('details');
    details.className = `sb-details ${className}`;
    details.open = !window.matchMedia('(max-width: 780px)').matches;
    const summary = document.createElement('summary');
    summary.textContent = label;
    details.appendChild(summary);
    contentBuilder(details);
    return details;
  }

  function createVerse(verse, text, sridhara) {
    const section = document.createElement('section');
    section.className = 'sb-verse-section';
    section.setAttribute('aria-labelledby', `sb-10-1-${verse}`);

    const heading = document.createElement('h3');
    heading.id = `sb-10-1-${verse}`;
    heading.className = 'sb-verse';
    heading.textContent = `ŚB 10.1.${verse}`;
    section.appendChild(heading);

    const rule = document.createElement('hr');
    rule.className = 'sb-rule';
    section.appendChild(rule);

    const dev = document.createElement('div');
    dev.lang = 'sa-Deva';
    dev.className = 'sb-devanagari';
    appendLines(dev, text.devanagari);
    section.appendChild(dev);

    const translation = document.createElement('p');
    translation.className = 'sb-translation';
    translation.textContent = text.translation;
    section.appendChild(translation);

    section.appendChild(detailsCard('sb-word-details', 'Word-for-word', (details) => {
      const p = document.createElement('p');
      p.textContent = text.synonyms;
      details.appendChild(p);
    }));

    section.appendChild(detailsCard('sb-transliteration-details', 'Transliteration', (details) => {
      const div = document.createElement('div');
      appendLines(div, text.transliteration, true);
      details.appendChild(div);
    }));

    if (sridhara) {
      section.appendChild(detailsCard('sb-bhasya', 'Śrīdhara Sanskrit', (details) => {
        const sanskrit = document.createElement('p');
        sanskrit.lang = 'sa-Deva';
        appendLines(sanskrit, sridhara);
        details.appendChild(sanskrit);

        const transliteration = document.createElement('p');
        transliteration.className = 'sb-sridhara-auto-transliteration';
        appendLines(transliteration, devanagariToIast(sridhara), true);
        details.appendChild(transliteration);
      }));
    }

    return section;
  }

  async function publish() {
    let responses;
    try {
      responses = await Promise.all([
        fetch(prabhupadaSource, { mode: 'cors', cache: 'no-store' }),
        fetch(sridharaSource, { mode: 'cors', cache: 'no-store' })
      ]);
    } catch (_) {
      return;
    }
    if (!responses.every((response) => response.ok)) return;

    const [prabhupada, sridhara] = await Promise.all(responses.map((response) => response.text()));
    const verses = parsePrabhupada(prabhupada);
    const bhasya = parseSridhara(sridhara);

    for (let verse = 3; verse <= publishedThroughVerse; verse += 1) {
      if (document.getElementById(`sb-10-1-${verse}`)) continue;
      const text = verses.get(verse);
      if (!text?.devanagari || !text?.translation) continue;
      root.appendChild(createVerse(verse, text, bhasya.get(verse) || ''));
    }

    if (window.matchMedia('(max-width: 780px)').matches) {
      root.querySelectorAll('.sb-details').forEach((details) => { details.open = false; });
    }
  }

  publish();
})();