---
name: vault-obsidian-cli
description: Use the Obsidian desktop CLI to open a Note, inspect live vault state or backlinks, move or rename with link updates, or verify a native action in this vault.
---

# Obsidian desktop CLI

These commands target the running Windows desktop app through the
`obsidian` command supplied by its installer.

**Target the vault.** Follow the [path check](../../../docs/operations.md#maintenance-and-rename)
before acting. Pass the registered `vault=<name>` first, before the command.
Use the exact vault-relative `path=` when a specific file is requested.
If the task refers to the active Note, check which Note is active in that vault.

**Choose the native action.** For example, `obsidian vault=vault backlinks path=domains/ai-systems.md`
inspects incoming links. Use `open` when the user wants the Note on screen.
For moves and renames, use `move` or `rename` and follow the
[ownership and link-update guidance](../../../docs/operations.md#maintenance-and-rename).
For ordinary Note creation, use the [vault creators](../../../docs/operations.md#command-line-operations).
Use `obsidian help <command>` for the installed version's arguments.

**Verify the outcome.** Read the command output even when the exit status is zero.
After a move, check the destination and whether affected references now resolve
there. For a desktop save, check what reached disk. If the CLI cannot reach
the app, distinguish a closed app or disabled CLI from a sandbox connection
failure, and report any native action that remains unverified.
