(() => {
  const previousOpen = window.openScriptureEncyclopedia;
  if (typeof previousOpen !== 'function') return;

  const sourceLead = /^(?:According to\s+)?(?:Patrick\s+Olivelle|Olivelle|Ludo\s+Rocher|Rocher|R\.\s*C\.\s*Hazra|Hazra|Michael\s+Witzel|Witzel|A\.\s*B\.\s*Keith|Keith|W\.\s*Caland|Caland|Paul\s+Deussen|Deussen|P\.\s*V\.\s*Kane|Kane|Wikipedia|Hindupedia|Grokipedia)\s+(?:argues|argued|notes|noted|states|stated|says|said|describes|described|summarizes|summarized|lists|listed|emphasizes|emphasized|observes|observed|remarks|remarked|records|recorded|suggests|suggested|places|placed|dates|dated)\s+(?:that\s+)?/i;
  const articleLead = /^(?:The\s+)?(?:main\s+|separate\s+)?(?:Wikipedia|Hindupedia|Grokipedia)\s+(?:article|entry|page)\s+(?:argues|notes|states|says|describes|summarizes|lists|emphasizes|observes|records|suggests|places|dates)\s+(?:that\s+)?/i;

  function polishSentence(text) {
    let s = String(text || '').trim();
    s = s.replace(sourceLead,'').replace(articleLead,'');
    s = s.replace(/\bAccording to (?:Wikipedia|Hindupedia|Grokipedia|Hazra|Rocher|Olivelle|Witzel|Keith|Kane),?\s*/gi,'');
    s = s.replace(/\bWikipedia(?:’s|'s) infobox gives\b/gi,'The usual scholarly chronology gives');
    s = s.replace(/\bWikipedia summarizes\b/gi,'The received description gives');
    s = s.replace(/\bHindupedia gives\b/gi,'One received count gives');
    s = s.replace(/\bHindupedia names\b/gi,'The received lists name');
    s = s.replace(/\bOlivelle(?:’s|'s) current chronology\b/gi,'recent Dharmaśāstra chronology');
    s = s.replace(/\bin Patrick Olivelle(?:’s|'s) recent chronology\b/gi,'in a recent Dharmaśāstra chronology');
    s = s.replace(/\bRocher emphasizes that\s*/gi,'');
    s = s.replace(/\bHazra emphasizes that\s*/gi,'');
    return s;
  }

  function polishArticle() {
    const article = document.querySelector('.universal-wiki-article');
    if (!article || article.dataset.editorialV2 === '1') return;
    article.dataset.editorialV2 = '1';

    article.querySelectorAll('p').forEach(p => {
      const clone = p.cloneNode(true);
      clone.querySelectorAll('sup').forEach(x=>x.remove());
      const originalText = clone.textContent.trim();
      const cleaned = polishSentence(originalText);
      if (cleaned !== originalText && cleaned) {
        const cites = [...p.querySelectorAll('sup')].map(x=>x.outerHTML).join('');
        p.innerHTML = cleaned + cites;
      }
    });

    const teaching = article.querySelector('#universal-teaching');
    if (teaching) {
      teaching.querySelectorAll('p').forEach(p => {
        const t = p.textContent.replace(/\d+$/,'').trim();
        if (t.length < 72 && !/[.!?]$/.test(t)) p.remove();
      });
      const meaningful = [...teaching.children].some(el => el.matches('p,h3') && el.textContent.trim().length > 24);
      if (!meaningful) teaching.remove();
    }

    article.querySelectorAll('.kena-section').forEach(sec => {
      const h2 = sec.querySelector(':scope > h2');
      if (!h2) return;
      const hasBody = [...sec.children].some(el => el !== h2 && el.textContent.trim().length > 0);
      if (!hasBody) sec.remove();
    });

    const toc = article.querySelector('.kena-toc');
    if (toc) {
      toc.querySelectorAll('a').forEach(a => {
        const id = a.getAttribute('href')?.slice(1);
        if (id && !article.querySelector(`#${CSS.escape(id)}`)) a.closest('li')?.remove();
      });
    }
  }

  window.openScriptureEncyclopedia = function(button) {
    const result = previousOpen(button);
    if (result) polishArticle();
    return result;
  };
})();