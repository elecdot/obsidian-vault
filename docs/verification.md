# Verification

Record observations with their date and environment. Documentation and
configuration alone are not evidence of successful runtime behavior.
[Tooling](tooling.md#checks-and-their-limits) describes the checks and their scope.

## Offline

On 2026-11-10 in `/home/elecdot/new-vault`, all 19 behavioral tests passed;
`npm run check` and `npm run audit` reported no errors or suggestions, and
`npm run vault -- inventory` completed. The same baseline passed on 2026-10-04.
Tests use temporary vaults outside personal content and remove their fixtures.

On 2026-11-17, the documentation refactor preserved the executable registry
byte for byte. All 19 tests passed and the content audit reported zero errors
or suggestions. Support links and contracts were checked with `npm run check`;
the desktop runtime was not exercised by this documentation change.

At that checkpoint, live content consisted of Home, Maintenance, and the
AI Systems entry. These checks do not establish real research usability;
the [first-use assessment](first-use.md) remains to be performed.

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

On 2026-10-04, the attempted item was *SALS: Sparse attention in latent space
for KV cache compression*. Zotero 9.0.6 was reachable; Better BibTeX 9.0.68
responded after the author's restart. Earlier probes had reported an empty
response and then HTTP 404 for JSON-RPC; the readiness recheck returned 200.

The selected-item attempt failed with `Selected-item identity has an
unsupported shape` while interpreting citation-key selection data, before
item export, annotation retrieval, or Source writing. SALS was not imported.
The raw selection mapping was not retained, so its shape and the cause cannot
be inferred from that error alone.

The author stopped repeated attempts. Resume only when explicitly requested,
using the actual selection mapping and exporter sample. The candidate remains
in `scripts/zotero-transport.cjs`; the [Better BibTeX API](https://retorque.re/zotero-better-bibtex/exporting/json-rpc/)
is a reference, not proof the candidate works. Snapshot input remains available.
