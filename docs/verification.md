# Verification

This document records verification coverage and the limits of available
runtime evidence. Documentation and configuration alone do not establish
successful use. [Tooling](tooling.md#checks-and-their-limits) describes the
checks and where to record routine results.

## Offline

Use `mise run verify`, `mise run audit`, and
`mise run vault -- inventory` for the [documented checks](tooling.md#checks-and-their-limits).
The underlying `npm test` and `npm run check` scripts remain available;
[tool setup](operations.md#tool-setup-and-upgrades) selects their environment.
Behavioral tests use temporary vaults outside personal content and remove
their fixtures. A passing suite covers its tested cases; it does not rule
out the [confirmed tool defects](maintenance-notes.md#confirmed-tool-defects).

Offline checks establish structural behavior. They do not establish useful
research writing or successful operation in the intended desktop vault.
The [first-use assessment](first-use.md) exercises that real path.

## Maintenance Tool Environment

The mise entry points have been exercised in WSL/Linux and native Windows
x64 with the pinned Node and bundled npm. The Windows run used Scoop's
mise 2026.11.9 in an isolated Windows-native directory with spaces in its
path. Coverage includes tool installation, task validation, locked npm
dependency installation, both verification tasks, audit, inventory, argument
forwarding with spaces, dry-run preservation, and failure exit propagation.

The directory-link rejection test uses a junction on Windows and passed
natively, as did Source replacement and ownership tests. These CLI checks
are distinct from the [desktop Obsidian checks](#obsidian).

## Obsidian

On **2026-11-23**, the Windows [desktop CLI](../.agents/skills/vault-obsidian-cli/SKILL.md)
resolved the registered name `vault` to `P:\vault` in Obsidian 1.15.1
(installer 1.12.4). With automatic link updates enabled, `move` moved and
renamed a temporary Note from `inbox/` to `knowledge/`. The old path
disappeared, the destination retained the original text, and the referring
Note's aliased body link changed on disk. `backlinks` listed the referring
Note at the original target before the move and at the new target afterward.
Both temporary Notes were removed.

On **2026-11-22**, Templater 2.27.0 ran Capture, Vault Menu, and Inspect via
their registered Insert commands in `P:\vault`. The plugin needed a reload
to register the recovered commands. Each command opened its dialog from a
temporary note in Source mode. Dismissing the dialogs preserved the note text
and created no additional notes. The temporary note was removed. The
[first real writing and retrieval cycle](first-use.md) has separate criteria.

On **2026-11-22**, the [Bases workflow](../.agents/skills/vault-bases/SKILL.md)
was exercised in `P:\vault` with Obsidian 1.15.1 (installer 1.12.4).
A temporary Domain embedded an edited copy of [Related](../bases/related.base).
Its direct-notes view returned exactly the Note linked to the Domain and
excluded the Note linked only to its Activity. Opening the embed preserved
the initial file hash. In the standalone Base, renaming the view and pressing
Enter wrote exactly the intended name change to disk. Restoring the name
and pressing Enter reproduced the original SHA-256. The five fixtures were
removed. This trial covers the tested table and native save on this version.

Earlier checks ran on **2026-10-04** in the author's copy at
`P:\new-vault`; the source repository was then `/home/elecdot/vault/new-vault`.
Observed versions: Obsidian application 1.13.7, installer 1.12.4, Templater 2.25.1.
Native CLI calls and the three Templater command entries were available.

Through installed Templater and native Vault/FileManager APIs, checks passed for:

- Contextual creation without copying the Activity's Domain relationships.
- Existing-period reopening, collision refusal, and cancellation before creation.
- Synthetic Source re-import preserving personal reading, and native rename
  preserving the resolved `sources` target even when link spelling changed.
- Native audit and refinement locations; planned Activities in the appropriate
  view; direct Domain Notes separated from Activity-only Captures.
- Related Activity entry points, descending recent-writing order, period embeds,
  and Source aliases displayed while stable paths remained intact.
- The real capture command preserving selected text after Escape cancellation.
- Core Daily Notes creating the expected date and metadata, and native YAML
  rejecting duplicate keys.

`tests/obsidian-runtime.cjs` supplies the desktop probe and explicit fixture
cleanup. Its checks are separate from `npm test`; historical fixtures were
removed. The three local skills also passed the skill packaging validator,
which does not establish every future assistant judgment.

## Source Integration

Controlled snapshot import and its ownership checks passed offline and
synthetic native-app tests. **Live selected-item import is not verified and
is not exposed as a working menu action.**

The attempted item was *SALS: Sparse attention in latent space for KV cache
compression*, using Zotero 9.0.6 and Better BibTeX 9.0.68. Selection failed with
`Selected-item identity has an unsupported shape` while interpreting
citation-key selection data, before item export, annotation retrieval, or
Source writing. SALS was not imported. The raw selection mapping was not
retained, so its shape and the cause cannot be inferred from that error alone.

The candidate transport is in [zotero-transport.cjs](../scripts/zotero-transport.cjs).
The [Better BibTeX API](https://retorque.re/zotero-better-bibtex/exporting/json-rpc/)
documents the export interface.
