(() => {
  const files=[
    '/vivekadrishti/assets/js/scripture-index-v3-deep-vedic-v7b.js?v=1'
  ];
  files.forEach(src=>{
    if(document.querySelector(`script[src="${src}"]`))return;
    const s=document.createElement('script');s.src=src;s.async=false;document.head.appendChild(s);
  });
})();