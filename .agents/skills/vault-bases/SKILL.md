---
name: vault-bases
description: Create, edit, or diagnose an Obsidian Base (.base file) in this vault, including a view embedded in a host Note.
---

# Obsidian Bases in this vault

**Diagnose missing or unexpected rows.** Trace an actual Note through the Base filter
and the selected view's filter. In an embed, `this` is the host Note. Check the
[relationship on the candidate Note](../../../docs/metadata.md#relationships)
and explain which condition includes or excludes it.

**Create or edit a view.** Start with a similar desktop-saved Base, such as
[Related](../../../bases/related.base) for host relationships or
[Content](../../../bases/content.base) for sorting. Keep the vault's
[content scope](../../../docs/metadata.md#executable-field-registry).
When renaming a view, update embeds that select it by name.
Run the [repository checks](../../../docs/tooling.md#checks-and-their-limits)
after editing. Verify the changed behavior where the view is used. For a changed
filter, check one expected row and one excluded row. For a changed sort, check row order.

**Investigate a native rewrite.** For YAML quoting, older checkout formatting, or
a change to serialization guidance, use [native Base saves](../../../docs/tooling.md#native-base-saves).
It covers the desktop convention and the save-and-restore test.

## Syntax lookup

Read the section for the feature in use.

- [Filters](references/queries.md#filter-syntax), [properties](references/queries.md#properties), or [formula expressions](references/queries.md#formula-syntax). For a method signature, look up the method or its type in the [function reference](references/FUNCTIONS_REFERENCE.md).
- [View schema](references/views.md#schema), [layouts](references/views.md#view-types), [sorting](references/views.md#sorting), [summaries](references/views.md#default-summary-formulas), or [embedding](references/views.md#embedding-bases).
- For a complete worked example, choose the [task tracker](references/examples.md#task-tracker-base), [reading list](references/examples.md#reading-list-base), or [daily index](references/examples.md#daily-notes-index).
