/* Convert all 108 Upanishad cards into real static-page links. */
(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const slug=value=>String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function convert(){
    root.querySelectorAll('.upanishad-name[data-name]').forEach(button=>{
      const name=button.dataset.name||button.querySelector('span')?.textContent?.trim();if(!name)return;
      const groupClass=[...button.classList].find(c=>/^up-(?:mukhya|samanya|sannyasa|yoga|vaisnava|saiva|sakta)$/.test(c))||'up-mukhya';
      const veda=button.dataset.veda||button.querySelector('small')?.textContent?.trim()||'';
      const link=document.createElement('a');
      link.href=`/vivekadrishti/articles/scripture/upanishads/${slug(name)}/`;
      link.className=`upanishad-page-link ${groupClass}`;
      link.setAttribute('aria-label',`${name} Upaniṣad article`);
      link.innerHTML=`<span>${name}</span>${veda?`<small>${veda}</small>`:''}`;
      button.replaceWith(link);
    });
  }
  if(!document.getElementById('upanishad-page-link-style')){
    const style=document.createElement('style');style.id='upanishad-page-link-style';style.textContent=`
      .upanishad-page-link{appearance:none;position:relative;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:100%;min-height:54px;padding:10px 12px;border:1px solid #d3cabd;border-left:7px solid var(--up-color);border-radius:4px;background:linear-gradient(90deg,var(--up-wash),rgba(251,249,245,.9) 62%);color:#49433d!important;font-family:Merriweather,Georgia,serif;font-size:11px;line-height:1.35;text-align:left;text-decoration:none!important;cursor:pointer;transition:background .15s ease,border-color .15s ease,transform .15s ease,box-shadow .15s ease}
      .upanishad-page-link>span{display:block;width:100%;font-weight:400}.upanishad-page-link>small{display:block;width:100%;margin-top:5px;color:#82776c;font-family:Merriweather,Georgia,serif;font-size:8px;font-weight:400;line-height:1.45;letter-spacing:0}.upanishad-page-link:hover{transform:translateY(-1px);filter:saturate(1.05);text-decoration:none!important}.upanishad-page-link:focus-visible{outline:2px solid #36c;outline-offset:2px}
    `;document.head.append(style);
  }
  convert();
  const observer=new MutationObserver(convert);observer.observe(root,{childList:true,subtree:true});
  window.UPANISHAD_STATIC_PAGE_LINKS=true;
})();
