# Maintaining the vault Bases skill

Adapted from [obsidianmd/obsidian-skills at `b110b2f8`](https://github.com/obsidianmd/obsidian-skills/tree/b110b2f8e9eb1f287892f937050dfd40af862cbb/plugins/obsidian/skills/obsidian-bases).
The upstream directory is `plugins/obsidian/skills/obsidian-bases/` at
`b110b2f8e9eb1f287892f937050dfd40af862cbb`. The upstream root MIT license is included
as `LICENSE`. The [function reference](references/FUNCTIONS_REFERENCE.md)
comes from the same revision.

## Local changes

The [entry point](SKILL.md) has a vault-specific name, trigger and workflow.
It uses the vault's content scope and association model, points to desktop-saved
examples, and adjusts upstream quoting advice to match the desktop writer.
The generic examples remain available as syntax references. Native checks
cover both the rows in the host Note and the bytes written on save.

## Updating

Review upstream when a task needs a fix or a desktop change affects verified
behavior. Diff the pinned upstream directory and root license against the
candidate commit. Reconcile changes with the local workflow and quoting advice,
and check the bundled reference and license against the candidate. Run the skill
validator and [repository checks](../../../docs/tooling.md#checks-and-their-limits).
When output guidance changes, repeat the native check in the entry point.
Update the recorded SHA and permalink in the same verified commit.
