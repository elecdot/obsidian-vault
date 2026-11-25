---
name: vault-maintain
description: Audit this vault or maintain its model, conventions, metadata registry, creators, Bases, import adapter, and supporting agent guidance. Use for maintenance observations, design investigations, structural findings, or tool changes; personal knowledge writing belongs to paired writing.
---

Use the [maintenance workflow](../../../docs/design.md#vault-maintenance)
for decision scope.

**Diagnose a tool finding.** Start from the reported file, diagnostic code,
or command. Search [Maintenance notes](../../../docs/maintenance-notes.md)
when the source of the symptom is unclear or you suspect a known issue.
Confirm any match against the current input and behavior.

Trace what produced the result and identify the governing rule. Use the
[documentation guide](../../../docs/README.md) when the rule's owner is unclear.
Report the rule, what produced the observed behavior, whether it follows the
rule, and any missing evidence. If the behavior follows the rule and still
impedes the intended use, assess the convention using the maintenance workflow.

For audit or check scope, see
[Checks and Their Limits](../../../docs/tooling.md#checks-and-their-limits).

When creating, editing, or diagnosing a Base, use [vault-bases](../vault-bases/SKILL.md).
For checks that need the running desktop app from the terminal, use
[vault-obsidian-cli](../vault-obsidian-cli/SKILL.md).
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
