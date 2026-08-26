# Vivekadrishti repository guide

This repository contains the live Vivekadrishti site plus research/data used by scripture readers.

## Start here

- `index.html` — site homepage.
- `articles/` — published long-form articles and the scripture index page.
- `pages/` — section landing pages.
- `assets/js/puranas/current/` — **current Purāṇa reader/content modules**. Treat this folder as authoritative for Purāṇa work.
- `assets/css/puranas/current/` — current Purāṇa-specific styling.
- `assets/js/upanishads/current/` — current Upaniṣad reader/content modules.
- `assets/js/wiki/current/` — current wiki integrity/support code.
- `assets/data/` — source and generated data for larger textual projects.
- `scripts/`, `tools/`, `.github/workflows/` — build, extraction, audit and workflow utilities.

## Scripture Index

The live scripture index is:

`articles/scripture-index-version-3/index.html`

That HTML file is the source of truth for which legacy `scripture-index-v3-*` assets are still loaded. A filename containing `v4`, `v5`, `v10`, etc. does **not** automatically mean it is obsolete: several numbered modules are cumulative layers and are intentionally loaded together.

When cleaning old scripture-index assets, delete a file only when all of the following are true:

1. It is not referenced by the live scripture-index HTML.
2. A clear successor exists and is active.
3. It is not part of research/source data that may still be useful.
4. The change is made on a cleanup branch and reviewed before merging.

## Protected current Purāṇa files

Current Purāṇa work includes at least:

- `vishnu-purana.js`
- `brahma-purana.js`
- `padma-purana.js`
- `shiva-purana.js`
- `linga-purana.js`
- `garuda-purana.js`
- `mahapuranas-final.js`
- `mahapuranas-audit.js`
- `mahapuranas-benchmark.js`
- `reader.js`
- `polish.js`
- `mahapuranas-ui.js`
- `vishnu-ui.js`

Do not remove or replace these merely because older scripture-index Purāṇa modules also exist elsewhere.

## Cleanup rule

Prefer **one obvious current location** for new work. Do not create a new numbered variant unless it is genuinely necessary. If replacing an old module, update the live loader and remove the superseded file in the same reviewed cleanup change whenever safe.

Git history already preserves previous revisions, so obsolete duplicate source files do not need to remain in the working tree solely as backups.
