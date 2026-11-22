# Maintaining the vault Bases skill

Adapted from [obsidianmd/obsidian-skills at `b110b2f8`](https://github.com/obsidianmd/obsidian-skills/tree/b110b2f8e9eb1f287892f937050dfd40af862cbb/plugins/obsidian/skills/obsidian-bases).
The upstream directory is `plugins/obsidian/skills/obsidian-bases/` at
`b110b2f8e9eb1f287892f937050dfd40af862cbb`. The upstream root MIT license is included
as `LICENSE`. The [function reference](references/FUNCTIONS_REFERENCE.md)
comes from the same revision.

## Local changes

The [entry point](SKILL.md) scopes invocation to Base work and routes diagnosis,
edits and native rewrites. The upstream `SKILL.md` supplies the topic references
for [queries](references/queries.md), [views](references/views.md) and
[worked examples](references/examples.md). The vault's
[native save guidance](../../../docs/tooling.md#native-base-saves) owns
quoting conventions and the desktop check.

## Updating

When a task needs an upstream fix or desktop behavior changes, compare the
pinned upstream directory and root license with the candidate commit.
Apply each relevant `SKILL.md` change to its owning topic. Reconcile quoting
changes with the desktop evidence. Check the bundled function reference and
license against the candidate. Run the packaging validator and
[repository checks](../../../docs/tooling.md#checks-and-their-limits).
Repeat the native save check when output guidance changes. Advance the SHA
and permalink in the same verified commit.
