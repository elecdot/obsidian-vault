---
name: vault-maintain
description: Audit this vault or maintain its model, conventions, metadata registry, creators, Bases, import adapter, and supporting agent guidance. Use for maintenance observations, design investigations, structural findings, or tool changes; personal knowledge writing belongs to paired writing.
---

Read [tooling](../../../docs/tooling.md), [the contract](../../../docs/metadata.md),
and [operations](../../../docs/operations.md) for the component involved.
The enclosing repository's old skills are obsolete. Consult the current
[primary references](../../../docs/references.md) for application behavior.

For audits or tool work, start with the requested scope and relevant commands.
`npm run audit` is read-only; `npm run vault -- inventory` exposes implemented
actions and files.
Distinguish structural errors, provisional-field suggestions, valid raw
Captures, and semantic review. Include file locations and the violated rule.
Findings alone do not authorize bulk repairs or deletion.

For an authorized tool or rule change, update the owning semantic definition
and its consumed registry, then the actual affected creators, readers, views,
or adapters. Use the [admission rule](../../../docs/metadata.md#admission-rule-for-new-formats)
for a new formal format. Preserve useful design rationale and label unresolved
implementation choices; avoid duplicating rules into skills.

Run `npm test` and `npm run check` when changing shared support, with focused
behavioral cases for new risks. Verify Obsidian-dependent behavior in the
application. YAML validity is not evidence that a Base selects the right
Notes, and a snapshot import test is not proof of a live Zotero connection.

Keep writes explicit and bounded. Creation preserves existing content; Source
re-import checks ownership and identity; audits and inventories remain read-only.
Report what passed, what remains unverified, and the commands used. Follow
the user's staged Conventional Commit requirement for implementation work.
