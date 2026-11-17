# Verification

This document records verification coverage and the limits of available
runtime evidence. Documentation and configuration alone do not establish
successful use. [Tooling](tooling.md#checks-and-their-limits) describes the
checks and where to record routine results.

## Offline

Use `npm test`, `npm run check`, `npm run audit`, and
`npm run vault -- inventory` for the [documented checks](tooling.md#checks-and-their-limits).
Behavioral tests use temporary vaults outside personal content and remove
their fixtures. A passing suite covers its tested cases; it does not rule
out the [confirmed tool defects](maintenance-notes.md#confirmed-tool-defects).

Offline checks establish structural behavior. They do not establish useful
research writing or successful operation in the intended desktop vault.
The [first-use assessment](first-use.md) exercises that real path.

## Obsidian

These are historical observations from **2026-10-04**, not verification of
the currently intended desktop vault. The runtime was the author's copy at
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

The author stopped repeated attempts. Resume only when explicitly requested,
using the actual selection mapping and exporter sample. The candidate remains
in `scripts/zotero-transport.cjs`; the [Better BibTeX API](https://retorque.re/zotero-better-bibtex/exporting/json-rpc/)
is a reference, not proof the candidate works. Snapshot input remains available.
