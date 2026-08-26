# Viveka Dṛṣṭi — Repository Guide

This repository is a static website. Keep the live site simple: update authoritative files in place rather than creating new numbered copies whenever possible.

## Where things live

- `index.html` — site homepage.
- `pages/` — section / landing pages.
- `articles/` — published long-form articles and readers.
- `assets/css/` — shared styles.
- `assets/js/` — shared JavaScript.
- `assets/data/` — source / generated data used by the Bhāgavatam readers.
- `tools/` and `scripts/` — build, extraction and audit utilities; not browser pages.
- `.github/workflows/` — automation used by build / audit jobs.

## Scripture Index: source of truth

The live index entry point is:

`articles/scripture-index-version-3/index.html`

A legacy-looking numbered file is **not obsolete just because its filename contains v1, v5, v10, etc.** Some of those modules are cumulative layers and are intentionally loaded together.

Before deleting an index asset, verify all three:

1. it is not loaded by `articles/scripture-index-version-3/index.html`;
2. it is not loaded indirectly by another live module (especially `assets/js/scripture-index-v3-live-depth-manifest.js`);
3. its filename has no remaining repository references.

## Authoritative current scripture modules

Prefer these folders for ongoing work:

- `assets/js/puranas/current/` — current Purāṇa reader/data modules.
- `assets/css/puranas/current/` — current Purāṇa styles.
- `assets/js/upanishads/current/` — current Upaniṣad reader/data modules.
- `assets/js/wiki/current/` — current wiki integrity/support modules.

Do not replace these with older date-stamped or experimental branch files unless the change has been deliberately reviewed.

## Purāṇa work currently protected

The live loader currently includes dedicated modules for Viṣṇu, Brahma, Padma, Śiva, Liṅga and Garuḍa Purāṇas, together with the shared Mahāpurāṇa reader/audit/UI modules. Treat the files under `assets/js/puranas/current/` as authoritative unless a later live loader says otherwise.

## Branch policy

Target state: `main` is the only long-lived branch.

Before deleting a temporary branch, either:

- confirm it was merged; or
- confirm all unique work has been superseded elsewhere.

Never delete an unmerged branch solely to reduce the branch count if it still contains unique work.

## Cleanup policy

For a static-site cleanup, prefer deleting genuinely unreferenced experiments over renaming/moving live assets. Moving live assets creates needless link risk. Git history itself remains recoverable from prior commits unless history is intentionally rewritten.
