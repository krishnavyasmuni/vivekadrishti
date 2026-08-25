(() => {
  const files=[
    '/vivekadrishti/assets/js/scripture-index-v3-deep-vedic-v7b.js?v=1',
    '/vivekadrishti/assets/js/scripture-index-v3-deep-vedanga-v8.js?v=1',
    '/vivekadrishti/assets/js/scripture-index-v3-deep-smriti-v9a.js?v=1',
    '/vivekadrishti/assets/js/scripture-index-v3-deep-smriti-v9b.js?v=1',
    '/vivekadrishti/assets/js/scripture-index-v3-handdeep-protect-v10.js?v=1'
  ];
  files.forEach(src=>{
    if(document.querySelector(`script[src="${src}"]`))return;
    const s=document.createElement('script');s.src=src;s.async=false;document.head.appendChild(s);
  });
})();