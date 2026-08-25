(() => {
  const polish=s=>String(s??'')
    .replace(/ngkh/gi,m=>m[0]===m[0].toUpperCase()?'Nkh':'nkh')
    .replace(/ngk/gi,m=>m[0]===m[0].toUpperCase()?'Nk':'nk')
    .replace(/nyc/gi,m=>m[0]===m[0].toUpperCase()?'Nch':'nch')
    .replace(/nyj/gi,m=>m[0]===m[0].toUpperCase()?'Nj':'nj')
    .replace(/jny/gi,m=>m[0]===m[0].toUpperCase()?'Jn':'jn')
    .replace(/mny/gi,m=>m[0]===m[0].toUpperCase()?'Nny':'nny');
  function apply(scope=document){
    const targets=[];
    if(scope.nodeType===Node.TEXT_NODE)targets.push(scope);
    else{
      const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);while(walker.nextNode())targets.push(walker.currentNode);
    }
    targets.forEach(node=>{
      const p=node.parentElement;if(!p)return;
      if(!p.closest('#scripture-browser,.kena-article-reader'))return;
      if(p.closest('[lang="sa"],[lang="sa-Deva"],.itihasa-source-card,.universal-source-card,.kena-universal-source-card'))return;
      const n=polish(node.nodeValue);if(n!==node.nodeValue)node.nodeValue=n;
    });
  }
  apply(document);
  new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>apply(n)))).observe(document.body,{childList:true,subtree:true});
})();