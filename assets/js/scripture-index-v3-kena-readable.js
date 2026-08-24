(() => {
  const PHRASES = [
    ['Jaiminīya Upaniṣad-Brāhmaṇa','kena-key'],
    ['Jaiminīya/Talavakāra','kena-key'],
    ['Jaiminīya','kena-key'],
    ['Talavakāra','kena-key'],
    ['Sāmaveda','kena-key'],
    ['A. C. Burnell','kena-person'],
    ['Max Müller','kena-person'],
    ['Hanns Oertel','kena-person'],
    ['Patrick Olivelle','kena-person'],
    ['Paul Deussen','kena-person'],
    ['Masato Fujii','kena-person'],
    ['Śaṅkara','kena-person'],
    ['8 December 1878','kena-datefact'],
    ['1878','kena-datefact'],
    ['1879','kena-datefact'],
    ['1896','kena-datefact'],
    ['1897','kena-datefact'],
    ['1989','kena-datefact'],
    ['1998','kena-datefact'],
    ['JUB 4.18–21','kena-msfact'],
    ['JUB 4.10.1–4','kena-msfact'],
    ['khaṇḍas 135–145','kena-msfact'],
    ['tenth anuvāka','kena-msfact'],
    ['ninth adhyāya','kena-msfact'],
    ['Atharvavedic','kena-key']
  ];

  function emphasize(root) {
    if (!root || root.dataset.readabilityPolished === '1') return;
    root.dataset.readabilityPolished = '1';

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (p.closest('a, sup, script, style, strong, b, em, i, .kena-references, .kena-infobox')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      let parts = [{text: node.nodeValue, cls: null}];
      for (const [phrase, cls] of PHRASES) {
        const next = [];
        for (const part of parts) {
          if (part.cls || !part.text.includes(phrase)) { next.push(part); continue; }
          const bits = part.text.split(phrase);
          bits.forEach((bit, i) => {
            if (bit) next.push({text: bit, cls: null});
            if (i < bits.length - 1) next.push({text: phrase, cls});
          });
        }
        parts = next;
      }
      if (!parts.some(p => p.cls)) continue;
      const frag = document.createDocumentFragment();
      for (const part of parts) {
        if (!part.cls) frag.append(document.createTextNode(part.text));
        else {
          const span = document.createElement('span');
          span.className = part.cls;
          span.textContent = part.text;
          frag.append(span);
        }
      }
      node.replaceWith(frag);
    }

    root.querySelectorAll('.kena-cite').forEach(sup => {
      const links = [...sup.querySelectorAll('a')];
      if (!links.length) return;
      links.forEach(a => { a.textContent = (a.textContent.match(/\d+/) || [''])[0]; });
      sup.replaceChildren(...links.flatMap((a,i) => i ? [document.createTextNode(', '), a] : [a]));
      sup.classList.add('is-compact');
    });
  }

  const obs = new MutationObserver(() => {
    document.querySelectorAll('.kena-article').forEach(emphasize);
  });
  obs.observe(document.body, {childList:true, subtree:true});
  document.querySelectorAll('.kena-article').forEach(emphasize);
})();
