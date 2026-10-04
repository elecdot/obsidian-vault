# Personal Knowledge Vault

A workspace for developing personal understanding, organizing an evolving
knowledge graph, and retaining useful thinking from learning and work.

Obsidian is the primary daily interface. Editors and agents are also important
interfaces for writing and maintenance. The author's explanations and judgments
lead the work; agents support their development, organization, and upkeep.

## Start Here

Open [home.md](home.md) in Obsidian. Use **Templater: Insert vault-menu**
(Ctrl/Cmd+Shift+N), **Insert capture** (Ctrl/Cmd+Shift+C), or **Insert inspect**.
The [operations guide](docs/operations.md) covers setup, command-line use,
reading, periods, references, and maintenance.

For CLI support, run `npm ci`, then `npm test`, `npm run check`, and
`npm run audit`. The shared registry is an authored block in
[metadata.md](docs/metadata.md#executable-field-registry), consumed by the
creators and validators rather than copied into each tool.

This directory was started on 2026-10-03. The current documentation checkpoint,
2026-10-04, covers Q65 and retains the author's correction of scale:
establish a useful personal knowledge vault whose model and support can
evolve through use. Well-designed tools,
registration, automation, and agent skills remain explicit goals. Initial
scenarios guide their scope and validation; avoiding excessive engineering
preserves needed capabilities and design rationale. Initial tools, views,
settings, examples, and three local skills are now implemented. Old enclosing
repository skills were retired and primary references were rechecked.

The [first-use walkthroughs](docs/first-use.md) now incorporate Q61–Q63:
independent Activity and Domain associations, a reading-entry default that
leaves writing organization to the author, and optional names for quick
capture. Actual examples live under [examples/](examples/README.md) and remain
outside live knowledge views. The author-selected [AI Systems entry](domains/ai-systems.md)
provides an initial content route.

The [initial setup](docs/initial-setup.md) records the approved Q66 baseline.
Native Obsidian behavior and offline tests are recorded in
[verification.md](docs/verification.md). Controlled JSON snapshot import is
available. Live selected-item Zotero import stopped before writing when its
selection response did not match the candidate adapter; it is not a working
menu action and will not be retried without an explicitly resumed task.

## Read the Design

| Document | Purpose |
| --- | --- |
| [Domain language](CONTEXT.md) | Definitions of the model's established terms |
| [Design](docs/design.md) | Accepted goals, relationships, ownership, workflows, and launch requirements |
| [Metadata contract](docs/metadata.md) | Accepted field meanings and types, plus remaining contract decisions |
| [Refinement workflow](docs/refinement.md) | In-place candidates, discovery, and review behavior |
| [Tooling](docs/tooling.md) | Practical support, registration, and accepted write boundaries |
| [First-use walkthroughs](docs/first-use.md) | Illustrative writing paths and the current experience-level choices |
| [Initial setup](docs/initial-setup.md) | Approved operational baseline and implementation scope |
| [Operations](docs/operations.md) | Daily actions, commands, and maintenance |
| [Verification](docs/verification.md) | Observed tests and explicit integration limits |
| [Design questions](docs/design-questions.md) | Open choices, dependencies, factual investigations, and interview coverage |
| [Agent instructions](AGENTS.md) | Work routing and instructions for agents contributing here |

For a broad understanding, read the design. For an unfamiliar term, consult
the domain language. Continue unresolved design work from the questions
document and update the owning document as decisions are made.

## Intended Use

The vault supports personal explanations, source-based learning, ordinary
project notes, domain guides, journals, and lightweight daily plans.
Specialized workspaces can retain their own knowledge and workflows; the vault
provides connections and a home for thinking that needs one.

AI Systems is the first long-term domain for evaluating the design.
Book or course study and paper reproduction provide contrasting activity
scenarios. The author has not yet selected a single representative activity.

English is the intended working language, including filenames. Drafts may
use mixed language when that preserves accurate understanding.

## Initial Completion Standard

Regular use requires a clear content model, documented metadata semantics and
ownership, and instructions that let agents contribute consistently.
A small set of usable creation flows, dependable entry points, basic audits,
and representative examples should support the initial release.

See the [launch requirements](docs/design.md#launch-requirements) for the
agreed priorities. Legacy-vault access and migration are deferred independently
of the new design.
