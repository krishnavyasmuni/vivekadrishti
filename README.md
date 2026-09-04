# Viveka Dṛṣṭi

Viveka Dṛṣṭi is a static reference library for Hindu scripture, traditional commentary, philosophy, translation, Purāṇa studies, and Indological research.

**Live site:** https://krishnavyasmuni.github.io/vivekadrishti/

## Published sections

- Introduction to Hinduism
- Indology
- Varṇa and Dharma
  - A Śāstric Lens of Varṇa — Part One
  - Varṇa-vicāra
- Purāṇa Library
- Bhagavad Gītā — Śrīdhara Bhāṣya
- Śrīmad Bhāgavatam — Śrīdhara Bhāṣya
- Bhaviṣya Purāṇa — Brāhmaparvan

## Repository map

| Path | Purpose |
| --- | --- |
| `articles/` | Published articles and scripture readers |
| `pages/` | Published section and index pages |
| `assets/css/` | Site styles |
| `assets/js/` | Browser-side site and reader code |
| `assets/data/` | Data required by published readers |
| `assets/media/` | Images and other published media |
| `index.html` | Site homepage |
| `sitemap.xml` | Search-engine sitemap |

## Main-branch policy

`main` is production-only. Do not commit test pages, local scratch files, generated experiments, credentials, private documents, or machine-specific configuration to it. Experiments should stay on temporary branches and be merged only when they are intended to become part of the public site.

Secrets belong in local environment variables or GitHub's secret storage, never in committed files. The `.gitignore` excludes common local/private files such as `.env`, key files, editor folders, virtual environments, caches, temporary work directories, and local scripts.
