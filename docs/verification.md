# Verification

This file records observed behavior and remaining runtime work. Documentation
references alone are not counted as runtime verification.

## Offline

Run `npm ci`, `npm test`, `npm run check`, and `npm run audit` at the repository
root. Behavioral tests use temporary vaults outside personal content and
remove their own fixtures. They exercise shared-contract use, creation and
reference rules, period boundaries, collision protection, read-only inspection,
and Source identity and re-import ownership.

## Obsidian

The selected runtime vault is `P:\new-vault`, a copy opened by the author.
The implementation repository remains `/home/elecdot/vault/new-vault`.
Runtime workspace state and its Git directory are not overwritten by source
deployment. Obsidian reports application 1.13.7, installer 1.12.4; CLI calls
work in the current session. Templater 2.25.1 was installed in the new vault
from the community directory; the old repository's skills were not used.

The three template entry commands were observed in the new vault's command
registry. Through the installed Templater's actual `tp` object and Obsidian
Vault/FileManager APIs, the runtime probe passed:

- Contextual creation without copying the Activity's Domains.
- Period reopening with personal content preserved.
- Refusal of meaningful-name collisions and cancellation before creation.
- Synthetic Source re-import preserving a personal reading Note.
- Native rename updating an ordinary Note's `sources` property link.
- Native audit and refinement-source locations.

The first rename assertion expected the original fully qualified spelling;
Obsidian correctly rewrote it to the shortest resolving link. The test was
corrected to check the resolved target, and rerun successfully.

Native Base queries returned the planned Activity in the future view. The
embedded Domain view showed exactly the directly linked explanation, not the
Activity-only Capture. The recent-writing view returned results in descending
modification order. These observations go beyond YAML parsing.

The runtime test lives in `tests/obsidian-runtime.cjs`. It creates explicit
Verification fixtures and supports cleanup after checking their content.
Its desktop checks are separate from the normal offline test command.

## Source Integration

The controlled snapshot importer and ownership behavior passed offline and
synthetic native-app checks. Live selection is **not verified or exposed as a
working menu action**. Preserve this distinction when describing readiness.

Observed on 2026-10-04, against the author's selected title
*SALS: Sparse attention in latent space for KV cache compression*:

1. The app's request interface initially reported `ERR_EMPTY_RESPONSE`.
   A direct local HTTP request identified Zotero 9.0.6 at `/connector/ping`.
   Better BibTeX's JSON-RPC path initially returned HTTP 404.
2. The installed profile listed Better BibTeX 9.0.68 as active. After the
   author restarted Zotero, the single readiness recheck returned HTTP 200
   with Zotero 9.0.6 and Better BibTeX 9.0.68.
3. The authorized selected-item attempt then stopped with
   `Selected-item identity has an unsupported shape` while interpreting the
   citation-key selection mapping. The raw mapping was not retained; do not
   infer its exact shape or diagnose the cause from this message alone.
4. The failure preceded item export, annotation fetching, and Source writing.
   SALS was not imported. The author requested stopping repeated attempts;
   no further live Zotero requests are part of this implementation session.

`scripts/zotero-transport.cjs` retains the candidate adapter against the
[documented Better BibTeX API](https://retorque.re/zotero-better-bibtex/exporting/json-rpc/).
A later explicitly requested integration investigation needs the actual
selection mapping and exporter sample before changing assumptions. The JSON
snapshot input remains available; it does not claim live-library verification.
