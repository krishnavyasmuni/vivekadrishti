(() => {
  const path = location.pathname;
  const articleBody = document.querySelector('.article-body');
  if (!articleBody) return;

  const isVarna = /\/articles\/a-shashtric-lens-of-varna-part-one\/?$/.test(path);
  const isVishnu = /\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(path);
  const isMeat = /\/articles\/meat-eating-in-hinduism-through-the-lens-of-shastra\/?$/.test(path);
  if (!isVarna && !isVishnu && !isMeat) return;

  const imageBase = '/vivekadrishti/assets/images/source-documents/';
  const style = document.createElement('style');
  style.dataset.sourceDocumentImages = 'true';
  style.textContent = `
    .source-document-figure{
      width:100%!important;
      max-width:652px!important;
      margin:0 auto 58px!important;
      padding:0!important;
      text-align:center!important;
      background:transparent!important;
      border:0!important;
    }
    .source-document-figure img{
      display:block!important;
      width:auto!important;
      height:auto!important;
      max-width:100%!important;
      margin:0 auto!important;
      padding:0!important;
      border:0!important;
      border-radius:0!important;
      box-shadow:none!important;
      background:transparent!important;
    }
    .source-document-figure--varna img{max-width:min(100%,460px)!important}
    .source-document-figure--vishnu img{max-width:min(100%,470px)!important}
    .source-document-figure--meat img{max-width:min(72vw,300px)!important}
    .source-document-figure--diagram{margin:34px auto 50px!important}
    .source-document-figure--diagram img{width:100%!important;max-width:620px!important}
    .source-document-figure--closing{margin:72px auto 10px!important}
    .source-document-figure--closing img{max-width:min(55vw,235px)!important}
    .source-document-figure--closing.source-document-figure--vishnu-emblem img{max-width:min(60vw,260px)!important}
    @media(max-width:620px){
      .source-document-figure{margin-bottom:44px!important}
      .source-document-figure--varna img{max-width:92%!important}
      .source-document-figure--vishnu img{max-width:90%!important}
      .source-document-figure--diagram{margin:28px auto 42px!important}
      .source-document-figure--closing{margin-top:52px!important}
    }
  `;
  document.head.appendChild(style);

  const makeFigure = (file, alt, classes = '') => {
    const figure = document.createElement('figure');
    figure.className = `source-document-figure ${classes}`.trim();
    const img = document.createElement('img');
    img.src = imageBase + file;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    figure.appendChild(img);
    return figure;
  };

  const insertAfterTitle = (root, figure) => {
    const paper = root?.firstElementChild;
    const titleWrap = paper?.firstElementChild;
    if (!paper || !titleWrap) return false;
    titleWrap.insertAdjacentElement('afterend', figure);
    return true;
  };

  const appendClosing = (figure) => {
    articleBody.appendChild(figure);
  };

  if (isVarna) {
    const root = articleBody.querySelector('.empyrean-final-varna');
    insertAfterTitle(
      root,
      makeFigure(
        'varna-cover-art.webp',
        'Four-panel illustration reproduced from the original Varṇa source document.',
        'source-document-figure--varna'
      )
    );
    appendClosing(
      makeFigure(
        'varna-om.webp',
        'Oṃ symbol reproduced from the closing page of the original Varṇa source document.',
        'source-document-figure--closing'
      )
    );
  }

  if (isVishnu) {
    const root = articleBody.querySelector('.empyrean-final-236, .empyrean-final-article');
    insertAfterTitle(
      root,
      makeFigure(
        'vishnu-cover-art.webp',
        'Line illustration reproduced from the cover of the original Viṣṇu supremacy paper.',
        'source-document-figure--vishnu'
      )
    );

    const firstTable = root?.querySelector('table') || articleBody.querySelector('table');
    const tableWrap = firstTable?.parentElement;
    if (tableWrap) {
      tableWrap.insertAdjacentElement(
        'afterend',
        makeFigure(
          'vishnu-veda-diagram.webp',
          'Diagram of the Vedic divisions reproduced from the original source paper.',
          'source-document-figure--diagram'
        )
      );
    }

    appendClosing(
      makeFigure(
        'vishnu-closing-emblem.webp',
        'Closing emblem reproduced from the original Viṣṇu supremacy paper.',
        'source-document-figure--closing source-document-figure--vishnu-emblem'
      )
    );
  }

  if (isMeat) {
    const root = articleBody.querySelector('.empyrean-final-meat');
    insertAfterTitle(
      root,
      makeFigure(
        'meat-om.webp',
        'Oṃ symbol reproduced from the cover of the original meat-eating source document.',
        'source-document-figure--meat'
      )
    );
  }
})();
