# Maintaining Vault Tools

Use the [design scale](design.md#design-scale) to choose support work and
[Operations](operations.md) to use existing actions. The tools serve concrete
writing, retrieval, and maintenance needs; ordinary Markdown remains editable
when a helper is unavailable.

## Maintained Components

| Component | Maintained source and responsibility |
| --- | --- |
| Maintenance tool version and command entry points | [mise.toml](../mise.toml); npm scripts in [package.json](../package.json) remain the underlying commands |
| Field meanings and mechanical registry | [Metadata](metadata.md); the marked JSON block is consumed directly |
| Validation, names, periods, and creation plans | `scripts/core.cjs` |
| Disk access, inventory, and CLI dispatch | `scripts/io.cjs`, `scripts/vault.cjs` |
| Native Obsidian adapter and launcher | `scripts/obsidian.cjs`, `scripts/templater/vault.js`, `templates/commands/` |
| Initial writing and periodic templates | `templates/`, including the shared writing cue |
| Discovery and maintenance views | `bases/`; native Obsidian properties and view filters |
| Snapshot import and live transport candidate | `scripts/zotero.cjs`, `scripts/zotero-transport.cjs` |
| Native settings and command configuration | `.obsidian/`; see [Git coverage](operations.md#git-and-file-coverage) |
| Behavioral checks and desktop probe | `tests/run.cjs`, `tests/obsidian-runtime.cjs`, `scripts/check.cjs` |
| Task-specific agent support | `.agents/skills/vault-write/`, `vault-organize/`, and `vault-maintain/` |
| Teaching examples | `examples/`, outside live content scope |

`npm run vault -- inventory` reports implemented actions and files. It is
an operating index, not an exhaustive dependency graph for scripts or prose.
Application behavior is grounded in [primary references](references.md) and
separately checked in the runtime.

Use `mise tasks` to discover maintenance commands and `mise run verify` to
run the behavioral tests and structural checks. `setup` explicitly runs
`npm ci`; checks do not reinstall project dependencies. Tasks use portable
npm commands and the project's Node version without requiring shell
activation. Keep platform-dependent logic in JavaScript rather than adding
a Bash requirement. [Operations](operations.md#tool-setup-and-upgrades)
describes installation, upgrades, and the Windows-native setup.

## Shared Definitions

The CLI and Obsidian adapter share the registry reader and validator.
Native property types and Base scope/lifecycle coverage are checked for
agreement. Preserve the `docs/metadata.md` path and registry markers unless
changing and verifying the consumers together.

Semantic meaning stays in the contract. Where an adapter cannot share a
mechanical definition, maintain its small explicit representation and check
the relevant behavior. A universal runtime is not required. Current tools
have no infrastructure generator or background content migration.

## Exact Write Boundary

| Operation or material | Ownership and behavior |
| --- | --- |
| Personal Notes, entries, Guides, and reading Notes | Author-owned Markdown; no regeneration or template synchronization |
| Rules, registry, templates, views, scripts, and skills | Directly maintained source files |
| Requested creation | Fills a new Note once; ordinary-name collisions fail without replacing existing content |
| Journal or period reopening | Returns the existing file and preserves writing |
| Default audit and inventory | Read-only reports |
| Explicit Source import | Writes designated importer-owned files with matching identity; preserves nearby authored Notes |
| Native Base table edits | Can change underlying properties; displaying a view does not rewrite an authored Guide |

Writers validate their target and required definitions before writes.
Cancellation and conflicts are covered by the [recorded checks](verification.md).
Changing a writing cue affects future creations. Import ownership is
file-specific; it does not extend to a whole Source folder.

## Change a Convention

1. Identify the user action improved and update its owning meaning in
   [Design](design.md), [CONTEXT](../CONTEXT.md), or [Metadata](metadata.md).
   A new formal format follows the [admission rule](metadata.md#admission-rule-for-new-formats).
2. Update the registry where affected and trace the actual writers, readers,
   settings, views, and adapters that consume the rule. Ordinary Notes do
   not need a new format merely because their prose has a recurring pattern.
3. Run `npm test` and `npm run check` for shared support changes. Exercise
   affected Obsidian behavior in the application; parsing a Base does not
   establish its results, and a snapshot test does not verify live Zotero.
4. Update operating guidance, report remaining limits, and commit the
   verified phase using Conventional Commits. A contract change does not
   itself authorize bulk migration of the author's existing writing.

Ordinary prose editing does not require this convention-change workflow.
Keep each rule at one home and link to it from the other documents.

## Checks and Their Limits

- `npm test` exercises creation, context and references, periods, collisions,
  inspection, and Source identity/ownership using temporary vaults.
- `npm run check` checks the consumed contract, support links and headings,
  native types, Base scope/lifecycle coverage, YAML assets, and content errors.
- `npm run audit` reports malformed or nonconforming metadata, missing
  structural targets, unexpected scope, and provisional fields. It preserves
  legal raw Captures and optional omissions.
- `candidates` and `tasks` inspect standalone callouts and checkboxes in
  authored bodies, excluding code, comments, nested quotations, and managed
  Sources. Native Search is a broader discovery surface.

These checks establish structural behavior, not understanding, useful
classification, or the validity of every claim and external link. Inspect
the relevant passage when interpreting a result. Repair belongs to requested
maintenance, not to the fact that an audit found something.

[Verification](verification.md) records current coverage, relevant runtime
evidence, and environment limits. Record routine check results with the
verified change in Git; do not append a run log to maintained documentation.
Use [Maintenance notes](maintenance-notes.md) for observations and investigations
under the [maintenance workflow](design.md#vault-maintenance).
