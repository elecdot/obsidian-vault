# Maintaining the vault Obsidian CLI skill

Use `$vault-obsidian-cli` directly for a desktop action or from an existing
vault workflow. The [entry point](SKILL.md) covers the Windows desktop vault.

## WSL

The author will evaluate the options **from WSL** and choose a route there.
Candidates are calling the Windows desktop app through `Obsidian.com`,
running a Linux desktop Obsidian in WSL, or using [Obsidian Headless](https://obsidian.md/help/headless)
for Sync or Publish. Desktop actions such as opening a Note or inspecting
a rendered view require a desktop instance. The WSL choice is open and untested.

## Upstream

Adapted from [obsidianmd/obsidian-skills at `b110b2f8`](https://github.com/obsidianmd/obsidian-skills/blob/b110b2f8e9eb1f287892f937050dfd40af862cbb/plugins/obsidian/skills/obsidian-cli/SKILL.md).
The root MIT license is included as `LICENSE`. When an installed version
changes relevant command behavior, compare the pinned skill with upstream,
check the affected action in the target vault, then update the pin.
