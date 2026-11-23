# Personal Knowledge Vault

A workspace for developing personal understanding and retaining useful
thinking across learning and work. Obsidian is the primary daily interface;
editors and agents support writing and maintenance.

## Start Here

Open [Home](home.md), search for an existing Note, or use the command palette
from an open Markdown Note:

- **Templater: Insert capture** — keep a thought in `inbox`; a name is optional.
- **Templater: Insert vault-menu** — contextual writing, reading, periods,
  creation, and maintenance.
- **Templater: Insert inspect** — read-only structural findings, refinement
  candidates, and tasks.

When the writing context is clear, continue there. Otherwise, capture first.
The [operations guide](docs/operations.md) covers setup and the actual commands.
A clean audit is not required to write.

For command-line maintenance, follow
[tool setup](docs/operations.md#tool-setup-and-upgrades), then use `mise tasks`
to discover commands and `mise run verify` to check changes.

## Vault Layout

| Folder | What you'll find |
| --- | --- |
| `inbox/` | Captures whose use or home is still open. |
| `activities/` | Writing and progress records for a particular course of learning or work. |
| `domains/` | Entry Notes for enduring areas of inquiry, starting with [AI Systems](domains/ai-systems.md). |
| `sources/` | Source records and the author's reading Notes alongside them. |
| `knowledge/` | Explanations and other Notes maintained independently for reuse. |
| `journals/` | Daily, weekly, and monthly writing. |
| `docs/` | How the vault works and how to maintain it. Start with the [documentation guide](docs/README.md). |
| `examples/` | [Illustrative Notes](examples/README.md) excluded from live views. |
| `templates/`, `bases/` | Starting text and commands for writing, and views for finding Notes. |
| `scripts/`, `tests/` | Vault tools and their behavioral checks. |
| `.obsidian/`, `.agents/skills/` | Obsidian settings and task-specific agent guidance. |

The [first-use task](docs/first-use.md) follows the MoE expert load balancing
project. English writing is a long-term direction, with room for temporary
or meaningful Chinese. [Agent instructions](AGENTS.md) route contribution
and maintenance.
