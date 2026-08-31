(() => {
  const root = document.querySelector('[data-gita-chapter]');
  if (!root) return;
  const chapter = Number(root.dataset.gitaChapter);
  const counts = [47,72,43,42,29,47,30,28,34,42,55,20,34,27,20,24,28,78];
  const names = ["Arjuna’s Despondency","The Yoga of Knowledge","The Yoga of Action","Knowledge and Renunciation of Action","The Yoga of Renunciation","The Yoga of Meditation","Knowledge and Realization","The Imperishable Brahman","Royal Knowledge and Royal Secret","Divine Glories","The Vision of the Universal Form","Devotion","The Field and the Knower of the Field","The Three Guṇas","The Supreme Person","Divine and Demonic Qualities","The Threefold Faith","Liberation through Renunciation"];
  const esc = (value) => String(value || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lines = (value) => esc(value).replace(/\n/g, '<br>');
  const verseUrl = (n) => 'https://raw.githubusercontent.com/vedicscriptures/bhagavad-gita/main/slok/bhagavadgita_chapter_' + chapter + '_slok_' + n + '.json';
  const makeVerse = (d, meanings) => {
    const n = d.verse;
    const rootText = String(d.slok || '').replace(/\|/g, '').replace(/\\n/g, '\n').replace(/\|\|[^|]+\|\|/g, '');
    const rootLines = rootText.split('\n').map((x) => x.trim()).filter(Boolean).join('<br>');
    const english = d.gambir && d.gambir.et ? lines(d.gambir.et) : 'English translation unavailable in the source record.';
    const key = chapter + '.' + n;
    const wordMeaning = meanings[key] || 'Word-for-word meaning unavailable in the source record.';
    const commentary = d.srid && d.srid.sc ? lines(d.srid.sc) : 'No separate Sanskrit commentary is recorded for this verse in the source data.';
    return '<article class="gita-verse" id="gita-' + chapter + '-' + n + '">' +
      '<h2><span>Bhagavad Gītā</span> ' + chapter + '.' + n + '</h2>' +
      '<div class="gita-sanskrit" lang="sa-Deva">' + rootLines + '</div>' +
      '<p class="gita-translation">' + english + '</p>' +
      '<div class="gita-controls">' +
      '<details class="gita-details"><summary>Word-for-word</summary><div class="gita-reveal"><p>' + lines(wordMeaning) + '</p></div></details>' +
      '<details class="gita-details"><summary>Transliteration</summary><div class="gita-reveal"><p><em>' + lines(d.transliteration) + '</em></p></div></details>' +
      '<details class="gita-details"><summary>Śrīdhara Sanskrit</summary><div class="gita-reveal"><p lang="sa">' + commentary + '</p></div></details>' +
      '</div><section class="gita-commentary"><h3>Śrīdhara’s English translation</h3><p>' + (d.srid && d.srid.et ? lines(d.srid.et) : 'The source repository supplies Śrīdhara Svāmī’s commentary in Sanskrit; no English translation field is supplied there.') + '</p></section></article>';
  };
  const load = async () => {
    root.innerHTML = '<p class="gita-loading">Loading chapter text…</p>';
    const [data, meanings] = await Promise.all([
      Promise.all(Array.from({length: counts[chapter - 1]}, (_, i) => fetch(verseUrl(i + 1)).then((r) => r.json()))),
      fetch('/vivekadrishti/assets/data/bhagavad-gita-word-meanings.json').then((r) => r.json())
    ]);
    root.innerHTML = '<header class="gita-hero"><p class="eyebrow">Śrīmad Bhagavad Gītā</p><h1>Chapter ' + chapter + '</h1><p class="subtitle">' + names[chapter - 1] + '</p><div class="gita-rule" aria-hidden="true"></div></header>' +
      '<nav class="gita-chapter-nav" aria-label="Chapter navigation"><a href="/vivekadrishti/pages/bhagavad-gita/">All chapters</a>' + (chapter > 1 ? '<a href="/vivekadrishti/articles/bhagavad-gita-chapter-' + (chapter - 1) + '/">Previous</a>' : '') + (chapter < 18 ? '<a href="/vivekadrishti/articles/bhagavad-gita-chapter-' + (chapter + 1) + '/">Next</a>' : '') + '</nav>' +
      '<div class="gita-contents"><h2>Contents</h2><ol>' + data.map((d) => '<li><a href="#gita-' + chapter + '-' + d.verse + '">Verse ' + d.verse + '</a></li>').join('') + '</ol></div>' +
      data.map((d) => makeVerse(d, meanings)).join('') +
      '<div class="gita-source-note"><strong>Textual basis</strong><p>Sanskrit, transliteration, Śrīdhara Svāmī’s Sanskrit commentary, and the Gambirananda English verse translation are loaded from the <a href="https://github.com/vedicscriptures/bhagavad-gita" target="_blank" rel="noopener">Bhagavad Gītā data repository</a>, whose source lineage is the <a href="https://www.gitasupersite.iitk.ac.in/" target="_blank" rel="noopener">Gītā Supersite</a>. Word-for-word meanings are from the public-domain <a href="https://github.com/gita/gita" target="_blank" rel="noopener">Gītā JSON dataset</a>.</p></div>';
  };
  load().catch(() => { root.innerHTML = '<p class="gita-no-source">This chapter could not be loaded. Please refresh and try again.</p>'; });
})();