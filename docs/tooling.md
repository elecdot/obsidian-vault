# Tooling and Registration

Q60's narrowed boundaries are accepted in principle. The author emphasized
that this is a personal knowledge vault whose design will also evolve through
use. Their subsequent clarification retains well-designed tools, registration,
and automation as explicit goals. Avoiding excessive engineering does not
authorize dropping those capabilities or their supporting design rationale.
The initial creators, shared registry reader, audit runner, Obsidian adapter,
views, and local skills are implemented. There is no infrastructure generator.
See [Operations](operations.md) and [Verification](verification.md) for the
actual interfaces, evidence, and the stopped live Zotero selection work.

## Working Scale

Use the [design scale](design.md#design-scale) to decide what to build.
A tool should make a concrete writing, retrieval, or maintenance action easier
and remain understandable to its maintainer. Consider the combined cost of
using and maintaining it, rather than minimizing files, code, or documentation.
Stable foreseeable needs can justify deliberate design before repeated use.

Documents, templates, scripts, and skills are things the author will maintain
as part of using the vault. Keep their purpose and editing location easy to
find. Use coherent shared support where it prevents duplication or drift;
choose small local helpers where sharing would add little value.

## Initial Capabilities

These capabilities remain part of the intended starting vault. Their exact
interfaces should be designed against the first writing scenarios.

| Capability | Purpose |
| --- | --- |
| Contextual creation and periodic-note entry points | Reduce repeated naming and metadata work while preserving explicit context and authored content |
| Formal metadata registration | Make meanings, types, applicability, ownership, and adopted values visible and consistently usable by tools |
| Human Guides and derived discovery | Provide both meaningful routes and coverage of related material, including Captures and refinement candidates |
| Structural audit and scoped maintenance | Detect defined problems, locate their source, and support requested repairs with clear write behavior |
| Source import support | Make selected imports and re-import ownership predictable while keeping personal reading independent |
| Agent skills and operating guidance | Support drafting, organization, audit, and tool maintenance using the same model |

The examples determine the initial breadth of these capabilities. They do
not replace them with permanent manual work or postpone basic support
indefinitely. Unresolved implementation alternatives remain labeled below.

## Rules and Registration

[Metadata](metadata.md) currently registers the formal fields and formats:
their meaning, applicability, and maintenance responsibility. Adding an
adopted convention updates that owning definition; it does not require an
extra catalog entry for every Note, Domain, Activity, or keyword.

The registration design should preserve these responsibilities:

| Information | Authority and use |
| --- | --- |
| Meaning, admission rationale, examples, and judgment boundaries | The owning contract document; skills and tool guidance refer to it |
| Computable types, applicability, adopted values, and defaults | One readable definition shared by compatible creators and validators |
| Supported creation and audit actions | The actual declarations or implementation entry points used to execute them |
| Templates, Base definitions, and import adapters | Their maintained source files, linked from relevant operating guidance |

The marked JSON block in the Markdown contract now supplies the mechanical
definitions to `scripts/core.cjs`. The CLI and Obsidian adapter share that
reader and validator. Native settings and static view coverage are checked
against it. Registering a convention changes its consumed definition and
semantic explanation, not a disconnected record.

Provide a navigable account of the supported actions, their scope, and where
to maintain them. An inventory can read actual declarations or managed files;
a simple operating index may be enough for some entry points. Check its links
and references. The inventory must not imply an exhaustive dependency graph
for arbitrary scripts or free prose.

Skills should refer to the shared conventions and describe concrete assistance
such as drafting, organizing, or auditing. Their packaging follows those tasks.

## Shared Consumers and Adapters

Creation and structural audit should use the same mechanical field definitions
where their runtimes permit it. This prevents separate allowed-value or type
lists from drifting. The implementation must show that the consumers actually
read the definition, rather than merely documenting that they should agree.

Templater, Bases, and Zotero import have different interfaces. An adapter that
cannot read a definition directly may keep a small explicit implementation,
checked against representative data and the accepted contract. A universal
runtime is not required to make these consumers consistent.

Follow the real affected consumers when a convention changes. Refer to their
source locations and exercise their behavior; a second hand-maintained
field-by-tool matrix is not necessary. Native Obsidian capabilities should
be used where they satisfy the workflow, with scripts and skills filling
identified gaps.

## Exact Write Boundary

The initial design has no infrastructure-file generator. The accepted
boundaries are:

| Material or operation | Write behavior |
| --- | --- |
| Personal Notes, Captures, Journals, Activity and Domain entries, authored Guides, and reading Notes | Ordinary author-owned Markdown; no regeneration or synchronization from templates |
| Rules, registration definitions, templates, writing cue, Base definitions, and import templates | Directly maintained source files |
| A requested note-creation action | Fills the chosen new Note once; subsequent writing belongs to the author |
| Opening an existing Journal or period review | Opens the existing file and preserves its writing |
| Default audit or inventory | Reports findings without editing files |
| Explicit Zotero import or re-import | Writes only designated importer-owned Source files and assets |

Changing the writing cue affects later creations. Passive views provide access
without rewriting an entry's authored body. Zotero's file ownership does not
extend to personal reading Notes or manually maintained Source records.

Existing content stays usable when a custom helper is unavailable. Reading,
writing, linking, and manual capture require no custom build or clean audit.
Native Obsidian features retain their own normal dependencies.

An invoked writer has an explicit target. Invalid required definitions or a
conflicting target produce an error before its writes; periodic creation
reopens existing entries. Custom tooling does not rewrite files in the
background or automatically migrate content when conventions change.
These boundaries have behavioral and native-app coverage described in
[Verification](verification.md); live Zotero selection remains separately pending.

## Maintenance and Checks

Changing a convention includes maintaining its consumers. For example,
adopting a new formal format such as `experiment` involves:

1. Record its admitted purpose, boundary, and maintenance responsibility
   under the [format admission rule](metadata.md#admission-rule-for-new-formats).
2. Change the authoritative mechanical definition once. Implement or adjust
   the creation, retrieval, or review behavior that justifies the value;
   a new format does not necessarily require another template.
3. Check the relevant creator, view, import adapter, and audit behavior where
   affected. Confirm that allowed omissions and exceptions still work.
4. Explain any changed operating behavior and treatment of earlier content.
   Changes to definitions do not automatically migrate the author's Notes.

Ordinary note editing does not trigger this maintenance process. Default
checks remain read-only; repair work belongs to an explicit maintenance task.

Initial checks should address concrete failures: malformed properties,
violations of accepted field types or values, broken structural references,
and creation or import output that violates its contract. Respect the existing
exceptions for provisional Captures and optional associations. Semantic review
remains distinct from structural errors.

Verify Obsidian-dependent behavior in Obsidian, including relevant views,
link resolution, and import ownership. Check actual note output and retrieval,
not only whether a schema or Base file parses. Invalid definitions and
conflicting targets must respect the write boundaries above. A disabled
helper should leave existing authored Notes usable.

Use representative writing and retrieval examples to judge the first version.
Keep the checks proportionate to the action changed. Structural checks can
detect invalid data and broken references; they cannot establish the author's
understanding or whether a classification still serves its purpose.

## Implementation Options and Deferred Expansion

Shared definitions, creator registration, inventory, and cross-interface checks
now support the initial workflows. Extend them when a concrete workflow needs
more coverage, preserving their existing meanings and write boundaries.

The initial design still has no infrastructure generator, as established in
Q60. Limited generation remains a future candidate if a concrete repeated
artifact warrants it: specify authoritative inputs, exact output files,
deterministic behavior, a preview, and ownership before adopting it. Preserve
the independence of authored Notes. This candidate is not an existing tool
or a blanket authorization to regenerate content.

A generic plugin framework and an exhaustive dependency-discovery engine
remain deferred because current workflows do not establish their benefit.
Simplifying the implementation should preserve required behavior and useful
rationale; keep consequential unresolved choices visible instead of deleting
them merely to shorten the design.
