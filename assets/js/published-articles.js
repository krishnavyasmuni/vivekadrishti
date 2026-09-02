(() => {
  const mount = document.querySelector('#published-article-categories');
  if (!mount) return;

  const sitePrefix = document.querySelector('meta[name="site-prefix"]')?.content ||
    (location.pathname.startsWith('/vivekadrishti/') ? '/vivekadrishti' : '');
  const registryPath = 'assets/data/articles.json';
  const publicUrl = (path) => sitePrefix + '/' + String(path || '').replace(/^\/+/, '');

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const normalise = (data) => {
    const values = Array.isArray(data) ? data : data?.articles;
    if (!Array.isArray(values)) return [];
    return values.filter((article) => article && article.title && article.path);
  };

  const render = (articles) => {
    mount.replaceChildren();
    if (!articles.length) {
      mount.hidden = true;
      return;
    }

    const groups = new Map();
    articles
      .slice()
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
      .forEach((article) => {
        const key = article.categorySlug || String(article.category || 'uncategorised').toLowerCase();
        if (!groups.has(key)) {
          groups.set(key, {
            title: article.category || 'Uncategorised',
            articles: []
          });
        }
        groups.get(key).articles.push(article);
      });

    let newPanelCount = 0;
    groups.forEach((group, key) => {
      const existingPanel = Array.from(document.querySelectorAll('.hp-panel'))
        .find((panel) => panel.querySelector('.hp-section-title')?.textContent.trim().toLocaleLowerCase() === group.title.trim().toLocaleLowerCase());
      const panel = existingPanel || make('section', 'hp-panel published-category');
      const list = existingPanel?.querySelector('.hp-link-list') || make('ul', 'hp-link-list');

      group.articles.forEach((article) => {
        const item = make('li');
        const link = make('a', '', article.title);
        link.href = publicUrl(article.path);
        item.appendChild(link);
        if (article.description) {
          item.appendChild(make('p', 'hp-note', article.description));
        }
        list.appendChild(item);
      });

      if (!existingPanel) {
        panel.id = 'category-' + key.replace(/[^a-z0-9-]/gi, '-');
        panel.appendChild(make('h2', 'hp-section-title', group.title));
        panel.appendChild(list);
        mount.appendChild(panel);
        newPanelCount += 1;
      }
    });

    mount.hidden = newPanelCount === 0;
  };

  fetch(publicUrl(registryPath) + '?v=' + Date.now(), {cache: 'no-store'})
    .then((response) => {
      if (!response.ok) throw new Error('Article catalogue unavailable');
      return response.json();
    })
    .then((data) => render(normalise(data)))
    .catch(() => {
      mount.hidden = true;
    });
})();
