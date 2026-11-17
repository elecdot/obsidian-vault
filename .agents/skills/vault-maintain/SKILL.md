---
name: vault-maintain
description: Audit this vault or maintain its model, conventions, metadata registry, creators, Bases, import adapter, and supporting agent guidance. Use for maintenance observations, design investigations, structural findings, or tool changes; personal knowledge writing belongs to paired writing.
---

Use the [maintenance workflow](../../../docs/design.md#vault-maintenance)
for diagnosis and decision scope. Read [tooling](../../../docs/tooling.md),
[the contract](../../../docs/metadata.md), and [operations](../../../docs/operations.md)
for the component involved.
The enclosing repository's old skills are obsolete. Consult the current
[primary references](../../../docs/references.md) for application behavior.

For audits or tool work, start with the requested scope and relevant commands.
`npm run audit` is read-only; `npm run vault -- inventory` exposes implemented
actions and files.
Distinguish structural errors, provisional-field suggestions, valid raw
Captures, and semantic review. Include file locations and, for structural
errors, the violated rule.
Findings alone do not authorize bulk repairs or deletion.

For changes, follow [tool and convention maintenance](../../../docs/tooling.md#change-tools-or-conventions)
to update and verify the affected parts. Preserve useful design rationale
and label unresolved implementation choices.

Keep writes explicit and bounded. Creation preserves existing content; Source
re-import checks ownership and identity; audits and inventories remain read-only.
Report what passed, what remains unverified, and the commands used. Follow
the user's staged Conventional Commit requirement for implementation work.
