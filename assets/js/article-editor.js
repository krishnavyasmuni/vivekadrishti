(() => {
  'use strict';

  const metaSitePrefix = document.querySelector('meta[name="site-prefix"]')?.content || '';
  const CONFIG = {
    owner: 'krishnavyasmuni',
    repository: 'vivekadrishti',
    branch: 'main',
    sitePrefix: metaSitePrefix.replace(/\/+$/, ''),
    registryPath: 'assets/data/articles.json',
    tokenKey: 'viveka-editor-github-token-v1',
    draftKey: 'viveka-editor-draft-v1'
  };

  const $ = (id) => document.getElementById(id);
  const form = $('article-form');
  if (!form) return;

  const fields = {
    title: $('article-title'),
    category: $('article-category'),
    date: $('article-date'),
    slug: $('article-slug'),
    summary: $('article-summary'),
    heroImage: $('article-hero-image'),
    body: $('article-body'),
    token: $('github-token')
  };

  const ui = {
    formModeTitle: $('form-mode-title'),
    previewButton: $('preview-button'),
    previewFrame: $('preview-frame'),
    previewLabel: $('preview-label'),
    saveDraft: $('save-draft'),
    clearForm: $('clear-form'),
    publishButton: $('publish-button'),
    status: $('editor-status'),
    publishedList: $('published-list'),
    refreshArticles: $('refresh-articles'),
    categoryOptions: $('category-options'),
    clearToken: $('clear-token'),
    tokenStatus: $('token-status')
  };

  const state = {
    articles: [],
    editing: null,
    slugTouched: false
  };

  const defaultCategories = [
    'Introduction to Hinduism',
    'Indology',
    'Varṇa and Dharma',
    'Purāṇas',
    'Bhagavad Gītā — Śrīdhara Bhāṣya',
    'Śrīmad Bhāgavatam',
    'Bhaviṣya Purāṇa'
  ];

  const today = () => new Date().toISOString().slice(0, 10);

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));

  const escapeAttr = escapeHtml;

  const slugify = (value) => {
    const source = String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    const slug = source
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
    return slug || ('article-' + Date.now());
  };

  const safeUrl = (value, image = false) => {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (raw.startsWith('//')) return '';
    if (/^(#|\/|\.\/|\.\.\/)/.test(raw)) return raw;
    try {
      const parsed = new URL(raw, location.href);
      if (!/^https?:$/.test(parsed.protocol)) return '';
      if (image && !/^https?:$/.test(parsed.protocol)) return '';
      return raw;
    } catch {
      return '';
    }
  };

  const publicUrl = (path) => CONFIG.sitePrefix + '/' + String(path || '').replace(/^\/+/, '');

  const siteLink = (path) => escapeAttr(publicUrl(path));

  const formatDate = (value) => {
    if (!value) return '';
    const parsed = new Date(String(value) + 'T00:00:00');
    if (Number.isNaN(parsed.getTime())) return String(value);
    return parsed.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderInlineText = (value) => {
    let result = escapeHtml(value);
    result = result.replace(/\x60([^\x60]+)\x60/g, '<code>$1</code>');
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return result.replace(/\n/g, '<br>');
  };

  const renderInline = (value) => {
    const links = [];
    const withTokens = String(value || '').replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, url) => {
      const index = links.push(
        '<a href="' + escapeAttr(safeUrl(url) || '#') + '">' + renderInlineText(label) + '</a>'
      ) - 1;
      return '__EDITOR_LINK_' + index + '__';
    });
    return renderInlineText(withTokens).replace(/__EDITOR_LINK_(\d+)__/g, (match, index) => links[Number(index)] || '');
  };

  const isFenceStart = (line) => /^:::(sanskrit|translation|source|quote)\s*$/i.test(line.trim());

  const isBlockStart = (line) => {
    const value = line.trim();
    return /^#{1,4}\s+/.test(value) ||
      value === '---' ||
      /^>\s?/.test(value) ||
      /^[-*]\s+/.test(value) ||
      /^\d+\.\s+/.test(value) ||
      isFenceStart(value) ||
      /^!\[[^\]]*\]\([^)]+\)$/.test(value);
  };

  const makeSectionId = (title, usedIds) => {
    const base = slugify(title).replace(/-\d{10,}$/, '') || 'section';
    let id = base;
    let counter = 2;
    while (usedIds.has(id)) {
      id = base + '-' + counter;
      counter += 1;
    }
    usedIds.add(id);
    return id;
  };

  const parseDocument = (source) => {
    const lines = String(source || '').replace(/\r/g, '').split('\n');
    const blocks = [];
    const headings = [];
    const usedIds = new Set();
    let index = 0;

    while (index < lines.length) {
      const trimmed = lines[index].trim();
      if (!trimmed) {
        index += 1;
        continue;
      }

      const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        const level = Math.min(4, Math.max(2, headingMatch[1].length + 1));
        const title = headingMatch[2].trim();
        const id = makeSectionId(title, usedIds);
        headings.push({level, title, id});
        blocks.push({type: 'heading', level, title, id});
        index += 1;
        continue;
      }

      if (trimmed === '---') {
        blocks.push({type: 'divider'});
        index += 1;
        continue;
      }

      const fenceMatch = trimmed.match(/^:::(sanskrit|translation|source|quote)\s*$/i);
      if (fenceMatch) {
        const type = fenceMatch[1].toLowerCase();
        const content = [];
        index += 1;
        while (index < lines.length && lines[index].trim() !== ':::') {
          content.push(lines[index]);
          index += 1;
        }
        if (index < lines.length && lines[index].trim() === ':::') index += 1;
        blocks.push({type, text: content.join('\n').trim()});
        continue;
      }

      if (/^>\s?/.test(trimmed)) {
        const content = [];
        while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
          content.push(lines[index].trim().replace(/^>\s?/, ''));
          index += 1;
        }
        blocks.push({type: 'quote', text: content.join('\n').trim()});
        continue;
      }

      if (/^[-*]\s+/.test(trimmed)) {
        const items = [];
        while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
          items.push(lines[index].trim().replace(/^[-*]\s+/, ''));
          index += 1;
        }
        blocks.push({type: 'list', ordered: false, items});
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const items = [];
        while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
          items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
          index += 1;
        }
        blocks.push({type: 'list', ordered: true, items});
        continue;
      }

      const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        blocks.push({
          type: 'image',
          alt: imageMatch[1].trim(),
          url: imageMatch[2].trim()
        });
        index += 1;
        continue;
      }

      const paragraph = [trimmed];
      index += 1;
      while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
        paragraph.push(lines[index].trim());
        index += 1;
      }
      blocks.push({type: 'paragraph', text: paragraph.join(' ')});
    }

    return {blocks, headings};
  };

  const renderBlock = (block) => {
    if (block.type === 'heading') {
      return '<h' + block.level + ' id="' + escapeAttr(block.id) + '">' + renderInline(block.title) + '</h' + block.level + '>';
    }
    if (block.type === 'divider') {
      return '<hr class="editor-divider-block">';
    }
    if (block.type === 'paragraph') {
      return '<p>' + renderInline(block.text) + '</p>';
    }
    if (block.type === 'list') {
      const tag = block.ordered ? 'ol' : 'ul';
      return '<' + tag + '>' + block.items.map((item) => '<li>' + renderInline(item) + '</li>').join('') + '</' + tag + '>';
    }
    if (block.type === 'quote') {
      return '<blockquote class="wp-block-quote"><p>' + renderInline(block.text) + '</p></blockquote>';
    }
    if (block.type === 'sanskrit') {
      return '<details class="sanskrit-reveal"><summary>Show Sanskrit</summary><p lang="sa-Deva">' +
        renderInline(block.text) + '</p></details>';
    }
    if (block.type === 'translation') {
      return '<p class="scripture-translation">' + renderInline(block.text) + '</p>';
    }
    if (block.type === 'source') {
      return '<p class="scripture-source">' + renderInline(block.text) + '</p>';
    }
    if (block.type === 'image') {
      const url = safeUrl(block.url, true);
      if (!url) return '<p>' + renderInline('[' + block.alt + ']') + '</p>';
      return '<figure class="article-inline-image"><img src="' + escapeAttr(url) + '" alt="' +
        escapeAttr(block.alt) + '"><figcaption>' + escapeHtml(block.alt) + '</figcaption></figure>';
    }
    return '';
  };

  const renderContents = (headings) => {
    if (!headings.length) return '';
    return '<section class="editor-toc"><h2>Contents</h2>' +
      '<hr class="editor-divider-block">' +
      '<ol class="editor-toc-list">' +
      headings.map((heading) => '<li class="toc-level-' + heading.level + '"><a href="#' +
        escapeAttr(heading.id) + '">' + renderInline(heading.title) + '</a></li>').join('') +
      '</ol></section>';
  };

  const renderArticleHtml = (article) => {
    const parsed = parseDocument(article.body);
    const summary = article.summary ? '<p class="editor-article-summary">' + renderInline(article.summary) + '</p>' : '';
    const heroUrl = safeUrl(article.heroImage, true);
    const hero = heroUrl
      ? '<figure class="article-hero"><img src="' + escapeAttr(heroUrl) + '" alt="' +
        escapeAttr(article.title) + '"><figcaption>' + escapeHtml(article.title) + '</figcaption></figure>'
      : '';
    const date = article.date
      ? '<p class="editor-article-date">Published ' + escapeHtml(formatDate(article.date)) + '</p>'
      : '';
    const description = escapeAttr(article.summary || article.title);
    const nav = [
      '<a href="' + siteLink('') + '">Home</a>',
      '<a href="' + siteLink('introduction-to-hinduism/') + '">Introduction to Hinduism</a>',
      '<a href="' + siteLink('indology/') + '">Indology</a>',
      '<a href="' + siteLink('purana-library/') + '">Purāṇa Library</a>',
      '<a href="' + siteLink('pages/bhagavad-gita/') + '">Bhagavad Gītā</a>',
      '<a href="' + siteLink('editor/') + '">Article editor</a>'
    ].join('\n        ');

    return [
      '<!doctype html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="utf-8">',
      '  <meta name="viewport" content="width=device-width,initial-scale=1">',
      '  <meta name="description" content="' + description + '">',
      '  <meta name="color-scheme" content="light">',
      '  <title>' + escapeHtml(article.title) + ' — Viveka Dṛṣṭi</title>',
      '  <link rel="preconnect" href="https://fonts.googleapis.com">',
      '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      '  <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Vollkorn:wght@400;500&display=swap" rel="stylesheet">',
      '  <link rel="stylesheet" href="' + siteLink('assets/css/site.css') + '">',
      '  <link rel="stylesheet" href="' + siteLink('assets/css/article-template.css?v=1') + '">',
      '</head>',
      '<body class="post-page">',
      '  <header class="site-header">',
      '    <div class="nav-wrap">',
      '      <a class="brand" href="' + siteLink('') + '">Viveka Dṛṣṭi</a>',
      '      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>',
      '      <nav id="site-nav" class="site-nav" aria-label="Primary navigation">',
      '        ' + nav,
      '      </nav>',
      '    </div>',
      '  </header>',
      '  <main class="site-main"><article class="article-shell"><div class="article-body">',
      '    <div class="wp-block-group varna-style-hook"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow"></div></div>',
      '    <div class="empyrean-final-article empyrean-final-varna editor-generated-article" data-editor-generated="true">',
      '      <div class="editor-varna-inner">',
      '        <div class="editor-title-block">',
      '          <h1 class="editor-article-title">' + escapeHtml(article.title) + '</h1>',
      '          <hr class="editor-divider">',
      date,
      '        </div>',
      hero,
      summary,
      '        <div class="empyrean-varna-content">',
      renderContents(parsed.headings),
      parsed.blocks.map(renderBlock).join('\n'),
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div></article></main>',
      '  <footer class="site-footer"><p>Viveka Dṛṣṭi</p></footer>',
      '  <script src="' + siteLink('assets/js/site.js') + '"></script>',
      '</body>',
      '</html>',
      ''
    ].join('\n');
  };

  const readForm = (forPublishing) => {
    const title = fields.title.value.trim();
    const category = fields.category.value.trim();
    const body = fields.body.value.trim();
    const enteredSlug = fields.slug.value.trim();
    const slug = enteredSlug || slugify(title || 'article-preview');

    if (forPublishing) {
      if (!title) throw new Error('Please enter a title.');
      if (!category) throw new Error('Please enter a category.');
      if (!body) throw new Error('Please enter the article text.');
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error('The URL slug may contain only lowercase letters, numbers and hyphens.');
      }
      if (state.editing && slug !== state.editing.slug) {
        throw new Error('The slug is locked while editing so the existing article URL is preserved.');
      }
    }

    return {
      title: title || 'Your article title',
      category: category || 'Preview',
      categorySlug: slugify(category || 'Preview'),
      slug,
      summary: fields.summary.value.trim(),
      date: fields.date.value || today(),
      heroImage: fields.heroImage.value.trim(),
      body: body || 'Your article text will appear here.'
    };
  };

  const setStatus = (message, stateName) => {
    ui.status.textContent = message || '';
    if (stateName) ui.status.dataset.state = stateName;
    else delete ui.status.dataset.state;
  };

  const setFormMode = () => {
    const editing = Boolean(state.editing);
    ui.formModeTitle.textContent = editing ? 'Edit article' : 'New article';
    ui.publishButton.textContent = editing ? 'Update on GitHub' : 'Publish to GitHub';
    fields.slug.disabled = editing;
    ui.previewLabel.textContent = editing ? 'Editing' : 'Unsaved';
  };

  const renderPreview = () => {
    try {
      const article = readForm(false);
      ui.previewFrame.srcdoc = renderArticleHtml(article);
      setFormMode();
    } catch (error) {
      setStatus(error.message, 'error');
    }
  };

  const normaliseArticle = (value) => {
    const article = value || {};
    const slug = String(article.slug || '').trim();
    if (!slug || !article.title || !article.path) return null;
    return {
      slug,
      title: String(article.title),
      category: String(article.category || 'Uncategorised'),
      categorySlug: String(article.categorySlug || slugify(article.category || 'Uncategorised')),
      description: String(article.description || article.summary || ''),
      date: String(article.date || ''),
      path: String(article.path).replace(/^\/+/, ''),
      sourcePath: article.sourcePath ? String(article.sourcePath).replace(/^\/+/, '') : ''
    };
  };

  const normaliseRegistry = (value) => {
    const values = Array.isArray(value) ? value : value?.articles;
    if (!Array.isArray(values)) return [];
    return values.map(normaliseArticle).filter(Boolean);
  };

  const updateCategoryOptions = () => {
    const categories = new Set(defaultCategories);
    state.articles.forEach((article) => categories.add(article.category));
    ui.categoryOptions.replaceChildren();
    Array.from(categories).sort((a, b) => a.localeCompare(b)).forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      ui.categoryOptions.appendChild(option);
    });
  };

  const renderPublishedList = () => {
    ui.publishedList.replaceChildren();
    if (!state.articles.length) {
      const empty = document.createElement('p');
      empty.className = 'editor-muted';
      empty.textContent = 'No articles have been published through this editor yet.';
      ui.publishedList.appendChild(empty);
      return;
    }

    state.articles
      .slice()
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .forEach((article) => {
        const row = document.createElement('div');
        row.className = 'published-item';

        const main = document.createElement('div');
        main.className = 'published-item-main';
        const title = document.createElement('a');
        title.className = 'published-item-title';
        title.href = publicUrl(article.path);
        title.target = '_blank';
        title.rel = 'noopener';
        title.textContent = article.title;
        const details = document.createElement('p');
        details.className = 'published-item-meta';
        details.textContent = article.category + (article.date ? ' · ' + formatDate(article.date) : '');
        main.append(title, details);

        const actions = document.createElement('div');
        actions.className = 'published-item-actions';
        const edit = document.createElement('button');
        edit.type = 'button';
        edit.className = 'editor-button editor-button-quiet';
        edit.textContent = article.sourcePath ? 'Edit' : 'Source unavailable';
        edit.disabled = !article.sourcePath;
        edit.addEventListener('click', () => loadArticle(article));
        const view = document.createElement('a');
        view.className = 'editor-button editor-button-secondary';
        view.href = publicUrl(article.path);
        view.target = '_blank';
        view.rel = 'noopener';
        view.textContent = 'View';
        actions.append(edit, view);

        row.append(main, actions);
        ui.publishedList.appendChild(row);
      });
  };

  const fetchPublicRegistry = async () => {
    const response = await fetch(publicUrl(CONFIG.registryPath) + '?v=' + Date.now(), {cache: 'no-store'});
    if (response.status === 404) return [];
    if (!response.ok) throw new Error('The public article catalogue could not be loaded.');
    return normaliseRegistry(await response.json());
  };

  const loadArticles = async () => {
    try {
      state.articles = await fetchPublicRegistry();
      updateCategoryOptions();
      renderPublishedList();
    } catch (error) {
      state.articles = [];
      updateCategoryOptions();
      ui.publishedList.replaceChildren();
      const message = document.createElement('p');
      message.className = 'editor-muted';
      message.textContent = error.message;
      ui.publishedList.appendChild(message);
    }
  };

  const loadArticle = async (article) => {
    if (!article.sourcePath) return;
    setStatus('Loading ' + article.title + '…');
    try {
      const response = await fetch(publicUrl(article.sourcePath) + '?v=' + Date.now(), {cache: 'no-store'});
      if (!response.ok) throw new Error('The source file could not be loaded.');
      const source = await response.json();
      state.editing = article;
      state.slugTouched = true;
      fields.title.value = source.title || article.title;
      fields.category.value = source.category || article.category;
      fields.date.value = source.date || article.date || today();
      fields.slug.value = source.slug || article.slug;
      fields.summary.value = source.summary || article.description || '';
      fields.heroImage.value = source.heroImage || '';
      fields.body.value = source.body || '';
      setFormMode();
      renderPreview();
      setStatus('Loaded for editing. Publish when you are ready.', 'success');
      window.scrollTo({top: 0, behavior: 'smooth'});
    } catch (error) {
      setStatus(error.message, 'error');
    }
  };

  const readToken = () => {
    const current = fields.token.value.trim();
    if (current) return current;
    try {
      return sessionStorage.getItem(CONFIG.tokenKey) || '';
    } catch {
      return '';
    }
  };

  const updateTokenStatus = () => {
    ui.tokenStatus.textContent = readToken() ? 'Key stored for this session' : 'No key stored';
  };

  const saveToken = () => {
    const token = fields.token.value.trim();
    try {
      if (token) sessionStorage.setItem(CONFIG.tokenKey, token);
      else sessionStorage.removeItem(CONFIG.tokenKey);
    } catch {
      // Private browsing may disallow sessionStorage; the input still works for this page.
    }
    updateTokenStatus();
  };

  const clearToken = () => {
    fields.token.value = '';
    try {
      sessionStorage.removeItem(CONFIG.tokenKey);
    } catch {
      // Ignore storage restrictions.
    }
    updateTokenStatus();
    setStatus('The GitHub key was cleared from this session.', 'success');
  };

  const apiHeaders = () => {
    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
    const token = readToken();
    if (token) headers.Authorization = 'Bearer ' + token;
    return headers;
  };

  const apiUrlForPath = (path) => {
    const encodedPath = String(path).split('/').map(encodeURIComponent).join('/');
    return 'https://api.github.com/repos/' + CONFIG.owner + '/' + CONFIG.repository +
      '/contents/' + encodedPath + '?ref=' + encodeURIComponent(CONFIG.branch);
  };

  const getGithubFile = async (path) => {
    const response = await fetch(apiUrlForPath(path), {headers: apiHeaders()});
    const payload = await response.json().catch(() => ({}));
    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(payload.message || 'GitHub could not read ' + path + '.');
    }
    return payload;
  };

  const toBase64 = (value) => {
    const bytes = new TextEncoder().encode(String(value));
    let binary = '';
    for (let index = 0; index < bytes.length; index += 1) {
      binary += String.fromCharCode(bytes[index]);
    }
    return btoa(binary);
  };

  const fromBase64 = (value) => {
    const binary = atob(String(value || '').replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  const putGithubFile = async (path, content, message, knownFile) => {
    const current = knownFile === undefined ? await getGithubFile(path) : knownFile;
    const body = {
      message,
      content: toBase64(content),
      branch: CONFIG.branch
    };
    if (current?.sha) body.sha = current.sha;

    const response = await fetch(apiUrlForPath(path).split('?')[0], {
      method: 'PUT',
      headers: {...apiHeaders(), 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.message || 'GitHub could not write ' + path + '.');
    }
    return payload;
  };

  const pathsForArticle = (article) => {
    if (state.editing) {
      const articleDirectory = String(state.editing.path || '').replace(/\/+$/, '');
      return {
        htmlPath: (articleDirectory || ('articles/' + article.slug)) + '/index.html',
        sourcePath: state.editing.sourcePath || (articleDirectory || ('articles/' + article.slug)) + '/article.json'
      };
    }
    const articleDirectory = 'articles/' + article.slug;
    return {
      htmlPath: articleDirectory + '/index.html',
      sourcePath: articleDirectory + '/article.json'
    };
  };

  const buildRegistryRecord = (article, paths) => ({
    slug: article.slug,
    title: article.title,
    category: article.category,
    categorySlug: article.categorySlug,
    description: article.summary,
    date: article.date,
    path: paths.htmlPath.replace(/\/index\.html$/, '/'),
    sourcePath: paths.sourcePath
  });

  const publish = async () => {
    if (!form.reportValidity()) return;

    let article;
    try {
      article = readForm(true);
    } catch (error) {
      setStatus(error.message, 'error');
      return;
    }

    const token = readToken();
    if (!token) {
      setStatus('Paste a GitHub access key below before publishing.', 'error');
      fields.token.focus();
      return;
    }

    ui.publishButton.disabled = true;
    setStatus('Preparing the article and checking GitHub…');

    const paths = pathsForArticle(article);
    const source = JSON.stringify({
      version: 1,
      slug: article.slug,
      title: article.title,
      category: article.category,
      categorySlug: article.categorySlug,
      summary: article.summary,
      date: article.date,
      heroImage: article.heroImage,
      body: article.body,
      updatedAt: new Date().toISOString()
    }, null, 2) + '\n';
    const html = renderArticleHtml(article);

    let completed = [];
    try {
      const registryFile = await getGithubFile(CONFIG.registryPath);
      let currentArticles = [];
      if (registryFile?.content) {
        try {
          currentArticles = normaliseRegistry(JSON.parse(fromBase64(registryFile.content)));
        } catch {
          throw new Error('The existing article catalogue is not valid JSON, so publishing was stopped.');
        }
      }

      const record = buildRegistryRecord(article, paths);
      const nextArticles = currentArticles.filter((item) => item.slug !== record.slug);
      nextArticles.push(record);
      nextArticles.sort((a, b) => String(b.date).localeCompare(String(a.date)));

      if (!state.editing) {
        const existingPage = await getGithubFile(paths.htmlPath);
        if (existingPage) {
          throw new Error('That URL already exists in the repository. Choose a different slug.');
        }
      }

      setStatus('Writing the source file…');
      await putGithubFile(paths.sourcePath, source, 'Save article source: ' + article.title);
      completed.push(paths.sourcePath);

      setStatus('Writing the finished article page…');
      await putGithubFile(paths.htmlPath, html, 'Publish article page: ' + article.title);
      completed.push(paths.htmlPath);

      setStatus('Adding the article to the homepage catalogue…');
      await putGithubFile(
        CONFIG.registryPath,
        JSON.stringify({version: 1, articles: nextArticles}, null, 2) + '\n',
        'Update article catalogue: ' + article.title,
        registryFile
      );
      completed.push(CONFIG.registryPath);

      state.editing = record;
      state.slugTouched = true;
      fields.slug.value = record.slug;
      setFormMode();
      state.articles = nextArticles;
      updateCategoryOptions();
      renderPublishedList();
      try {
        localStorage.removeItem(CONFIG.draftKey);
      } catch {
        // Ignore storage restrictions.
      }
      setStatus('Published successfully. GitHub Pages may take a short while to rebuild the homepage.', 'success');
      ui.previewLabel.textContent = 'Published';
    } catch (error) {
      const partial = completed.length ? ' Already written: ' + completed.join(', ') + '.' : '';
      setStatus('Publishing stopped: ' + error.message + partial, 'error');
    } finally {
      ui.publishButton.disabled = false;
    }
  };

  const saveDraft = () => {
    try {
      const draft = readForm(false);
      draft.editingSlug = state.editing?.slug || '';
      localStorage.setItem(CONFIG.draftKey, JSON.stringify(draft));
      setStatus('Draft saved in this browser. It is not public.', 'success');
    } catch (error) {
      setStatus(error.message, 'error');
    }
  };

  const restoreDraft = (draft) => {
    if (!draft || (!draft.title && !draft.body)) return;
    const matchingArticle = draft.editingSlug
      ? state.articles.find((article) => article.slug === draft.editingSlug)
      : null;
    state.editing = matchingArticle || null;
    state.slugTouched = Boolean(matchingArticle);
    fields.title.value = draft.title || '';
    fields.category.value = draft.category || '';
    fields.date.value = draft.date || today();
    fields.slug.value = draft.slug || '';
    fields.summary.value = draft.summary || '';
    fields.heroImage.value = draft.heroImage || '';
    fields.body.value = draft.body || '';
    setFormMode();
    renderPreview();
    setStatus('Restored your last local draft.', 'success');
  };

  const clearForm = () => {
    const hasText = fields.title.value.trim() || fields.body.value.trim();
    if (hasText && !window.confirm('Start a fresh article and clear the current text?')) return;
    state.editing = null;
    state.slugTouched = false;
    fields.title.value = '';
    fields.category.value = '';
    fields.date.value = today();
    fields.slug.value = '';
    fields.slug.disabled = false;
    fields.summary.value = '';
    fields.heroImage.value = '';
    fields.body.value = '';
    try {
      localStorage.removeItem(CONFIG.draftKey);
    } catch {
      // Ignore storage restrictions.
    }
    setFormMode();
    renderPreview();
    setStatus('Ready for a new article.', 'success');
  };

  fields.title.addEventListener('input', () => {
    if (!state.slugTouched && !state.editing) fields.slug.value = slugify(fields.title.value);
    renderPreview();
  });
  fields.slug.addEventListener('input', () => {
    state.slugTouched = true;
    renderPreview();
  });
  [fields.category, fields.date, fields.summary, fields.heroImage, fields.body].forEach((field) => {
    field.addEventListener('input', renderPreview);
    field.addEventListener('change', renderPreview);
  });
  fields.token.addEventListener('input', saveToken);
  ui.previewButton.addEventListener('click', renderPreview);
  ui.saveDraft.addEventListener('click', saveDraft);
  ui.clearForm.addEventListener('click', clearForm);
  ui.clearToken.addEventListener('click', clearToken);
  ui.refreshArticles.addEventListener('click', () => {
    setStatus('Refreshing the article catalogue…');
    loadArticles().then(() => setStatus('Article catalogue refreshed.', 'success'));
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    publish();
  });

  fields.date.value = today();
  fields.token.value = readToken();
  updateTokenStatus();
  setFormMode();
  renderPreview();

  (async () => {
    let draft = null;
    try {
      draft = JSON.parse(localStorage.getItem(CONFIG.draftKey) || 'null');
    } catch {
      draft = null;
    }
    await loadArticles();
    if (draft && !fields.title.value.trim() && !fields.body.value.trim()) restoreDraft(draft);
  })();
})();
