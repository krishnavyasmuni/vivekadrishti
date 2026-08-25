(() => {
  if (document.getElementById('itihasa-varna-v9-style')) return;
  const s = document.createElement('style');
  s.id = 'itihasa-varna-v9-style';
  s.textContent = `
    .itihasa-v5-reader .kena-article-head h1{
      color:#00787a!important;
      font-family:Vollkorn,Georgia,serif!important;
      font-weight:400!important;
      letter-spacing:normal!important;
    }
    .itihasa-v5-reader .kena-article-head .eyebrow{
      color:#6e665d!important;
      font-family:Merriweather,Georgia,serif!important;
    }
    .itihasa-human-article{
      color:#3c362e!important;
      font-family:Merriweather,Georgia,serif!important;
    }
    .itihasa-human-article p,
    .itihasa-human-article li,
    .itihasa-human-article dd,
    .itihasa-human-article dt,
    .itihasa-human-article .itihasa-internal p{
      color:#3c362e!important;
      font-family:Merriweather,Georgia,serif!important;
      font-weight:400!important;
      font-size:16.8px!important;
      line-height:1.72!important;
    }
    .itihasa-human-article .kena-lead p{
      color:#3c362e!important;
      font-family:Merriweather,Georgia,serif!important;
      font-size:17.2px!important;
      line-height:1.72!important;
    }
    .itihasa-human-article .kena-section h2{
      color:#00787a!important;
      font-family:Vollkorn,Georgia,serif!important;
      font-size:32px!important;
      line-height:1.16!important;
      font-weight:400!important;
      border-bottom:1px solid rgba(119,119,119,.16)!important;
      padding-bottom:8px!important;
    }
    .itihasa-human-article .kena-section h3{
      color:#00787a!important;
      font-family:Vollkorn,Georgia,serif!important;
      font-size:23px!important;
      line-height:1.24!important;
      font-weight:400!important;
    }
    .itihasa-human-article a,
    .itihasa-human-article .kena-toc a,
    .itihasa-human-article .wiki-thumb a,
    .itihasa-human-article .wiki-infobox-image a{
      color:#6731fb!important;
    }
    .itihasa-human-article .itihasa-cite button,
    .itihasa-human-article .itihasa-v8-cite button,
    .itihasa-human-article .itihasa-note-link{
      color:#6731fb!important;
      font-family:Merriweather,Georgia,serif!important;
    }
    .itihasa-human-article .kena-toc{
      background:#f4f4f4!important;
      color:#3c362e!important;
      border-color:rgba(119,119,119,.28)!important;
      font-family:Merriweather,Georgia,serif!important;
    }
    .itihasa-human-article .kena-toc-title{
      color:#00787a!important;
      font-family:Vollkorn,Georgia,serif!important;
      font-weight:400!important;
      font-size:20px!important;
    }
    .itihasa-human-article .kena-infobox{
      background:#f4f4f4!important;
      color:#3c362e!important;
      border-color:rgba(119,119,119,.35)!important;
      font-family:Merriweather,Georgia,serif!important;
    }
    .itihasa-human-article .kena-infobox-title{
      background:rgba(119,119,119,.08)!important;
      color:#00787a!important;
      font-family:Vollkorn,Georgia,serif!important;
      font-weight:400!important;
      font-size:22px!important;
    }
    .itihasa-human-article .kena-info-row,
    .itihasa-human-article .kena-info-row b,
    .itihasa-human-article .kena-info-row span{
      color:#3c362e!important;
      font-family:Merriweather,Georgia,serif!important;
    }
    .itihasa-human-article .wiki-thumb,
    .itihasa-human-article .wiki-infobox-image{
      background:#f4f4f4!important;
      border-color:rgba(119,119,119,.30)!important;
    }
    .itihasa-human-article .wiki-thumb figcaption,
    .itihasa-human-article .wiki-infobox-image figcaption{
      color:#6e665d!important;
      font-family:Merriweather,Georgia,serif!important;
      font-size:12.5px!important;
      line-height:1.45!important;
    }
    .itihasa-human-article b,
    .itihasa-human-article strong{
      color:#332e28!important;
      font-family:Merriweather,Georgia,serif!important;
      font-weight:700!important;
    }
    .itihasa-v5-reader .kena-article-scroll{
      background:#fbfaf8!important;
    }
    .itihasa-source-card{
      color:#3c362e!important;
      font-family:Merriweather,Georgia,serif!important;
    }
    .itihasa-source-card a{color:#6731fb!important;}
    @media(max-width:760px){
      .itihasa-human-article p,
      .itihasa-human-article li,
      .itihasa-human-article .itihasa-internal p{font-size:16px!important;line-height:1.68!important;}
      .itihasa-human-article .kena-lead p{font-size:16.4px!important;}
      .itihasa-human-article .kena-section h2{font-size:28px!important;}
      .itihasa-human-article .kena-section h3{font-size:21px!important;}
    }
  `;
  document.head.appendChild(s);
})();