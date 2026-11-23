# Verification

Use this page when taking over a task to see which vault operations have
been exercised, where they ran, and how far the checks went. Update a
finding in place when new evidence changes what the next person can rely
on. A change of phase is a good time to prune findings that no longer
affect writing or maintenance. Git retains earlier results.

[Maintenance notes](maintenance-notes.md) tracks observations that need
follow-up, open decisions, and conditions for reopening an investigation.
[Tooling](tooling.md#checks-and-their-limits) describes the checks and where
to record routine results.

## Obsidian

### Current desktop vault

These checks used temporary Notes in `P:\vault` on Windows with Obsidian
1.15.1. Writing about a real research question, finding that writing again,
and continuing it remain to be tested in the [first-use assessment](first-use.md#agreed-use-and-first-assessment).

- **Command palette (2026-11-22).** After a plugin reload, Templater 2.27.0
  registered the Capture, Vault Menu, and Inspect Insert commands. Each
  opened its dialog in Source mode. Cancelling preserved the Note's text
  and created no additional Notes.
- **Related Base (2026-11-22).** In a Domain embed, the direct-notes view
  showed the Note linked to the Domain and excluded the Note linked only
  to its Activity. Opening the embed left the Base file intact. Saving a
  view rename in the standalone Base changed only the view name. Restoring
  the name reproduced the original bytes. See the [native save procedure](tooling.md#native-base-saves).
- **Move and backlinks (2026-11-23).** With automatic link updates enabled,
  the desktop CLI moved and renamed a Note from `inbox/` to `knowledge/`.
  Its text stayed intact and Obsidian updated the referring Note's aliased
  link on disk.
  The CLI listed the referring Note in the backlinks before and after the move.

### Earlier desktop coverage

On 2026-10-04, checks in `P:\new-vault` used Obsidian 1.13.7 and
Templater 2.25.1. Contextual creation preserved the Activity association
without copying its Domains. Existing periods reopened with their text
intact, name collisions blocked creation, and cancelling Capture with
Escape preserved the selected text. A native rename also preserved the
resolved target of a `sources` property link.

Checks in that copy also covered audit and refinement locations, Activity
and recent-writing views, period embeds, Source aliases, Daily Notes
metadata, and duplicate YAML key rejection. The [desktop probe](../tests/obsidian-runtime.cjs)
runs separately from the offline suite.

## Offline

The mise tasks ran in WSL/Linux and on native Windows x64 with the pinned
Node and bundled npm. The Windows run covered setup, behavioral and
structural checks, audit, and inventory in a path containing spaces. It
also confirmed argument forwarding with spaces, dry runs that preserved
files, failure exit codes, and rejection of directory junctions. See
[confirmed tool defects](maintenance-notes.md#confirmed-tool-defects)
for cases outside the passing suite's coverage.

## Source Integration

**Zotero snapshots.** Offline and synthetic desktop tests exercised
explicit snapshot import and Source ownership checks. Re-import preserved
the author's separate reading Note.

**Live Zotero selection.** On 2026-10-04, with Zotero 9.0.6 and Better
BibTeX 9.0.68, the adapter stopped at citation-key selection with
`Selected-item identity has an unsupported shape`. The failure preceded
item export, annotation retrieval, and Source writing. The raw selection
mapping is unavailable, so the cause remains unknown. The menu accepts
[explicit snapshots](operations.md#source-import) as its Zotero input.
[Maintenance notes](maintenance-notes.md#deferred-extensions)
records when to revisit live selection.
