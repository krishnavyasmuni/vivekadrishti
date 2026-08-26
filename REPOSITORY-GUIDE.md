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

## Branch policy and archived work

`main` is the repository's only branch.

Two unfinished bodies of work that were not safe to throw away were preserved as archival tags before their temporary branches were removed:

- `archive/sridhara-canto2-canto10-complete-2026-08-24` → `0a1c114701b2d936072fad454f329dae7e31a807`
- `archive/purana-rebuild-2026-08-26` → `651b344cc5ef713a353116137e3dd4e81bf8c39f`

These tags are recovery points, not active website branches.

## Privacy / credential audit — 26 August 2026

A one-run full-history audit fetched every branch and tag that existed at audit time and scanned all reachable Git history.

- 9 refs scanned.
- 4,415 reachable object entries enumerated.
- 1,318 text blobs scanned.
- 692 commit metadata records checked.
- 0 large blobs skipped.
- 0 non-GitHub-noreply commit identities found.
- No GitHub PAT, GitHub token, AWS access key, Google API key, OpenAI-style key, private-key PEM, Slack token or Stripe live-key pattern was found.
- Apparent UK-phone-number matches were traced to SHA-256 hash data (`source_sha256`) / translation-cache hash material, not contact details.
- Apparent macOS-user-path matches were either the audit regex matching itself or the generic historical path `/Users/macbook/...`; no personal local username was identified.

Normal public GitHub attribution still exists in Git metadata (repository owner/account, public commit display name, and GitHub noreply email). Searches of the current website source did not find the commit display name, repository username, or GitHub noreply address embedded as site content.

This was a technical privacy/credential audit, not a legal opinion or a copyright/defamation review of every article.

## Cleanup policy

For a static-site cleanup, prefer deleting genuinely unreferenced experiments over renaming/moving live assets. Moving live assets creates needless link risk. Git history itself remains recoverable from prior commits unless history is intentionally rewritten.

The 26 August 2026 cleanup removed 26 verified orphan scripture-index JS/CSS files from the current tree. The live index loader and the authoritative `current/` scripture folders were left unchanged.

Do not rewrite repository history solely to reduce the GitHub size number without first removing any old-commit-pinned asset URLs from the live site and confirming that no recovery tag is still needed.
