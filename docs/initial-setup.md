# Initial Setup Draft

Status: integration draft after Q65. Accepted meanings remain in
[Metadata](metadata.md), workflows in [Design](design.md), and tool ownership
in [Tooling](tooling.md). The operational defaults below are proposals for
review, not already installed configuration. Q64 and Q65 are now accepted
and recorded in their owning contracts. Q66 reviews the remaining operational
defaults as a group and the scope of the first implementation.

This document brings the first-use pieces together. Once a proposed rule is
adopted, its owning contract should hold it and this draft should point there
rather than become another independently maintained rule set.

## Review Scope for Q66

The semantic decisions through Q65 are already accepted. The review concerns
these operational defaults and proceeding with the implementation sequence
in this document:

| Area | Proposed starting choice |
| --- | --- |
| Metadata | Omit unused optional fields on creation; tolerate empty optional values when reading; require lifecycle state on Activity and Domain entries |
| Date-based writing | `date` records the represented period's first day; `period` is day/week/month; use calendar months and Monday-based ISO weeks |
| Locations and audit scope | Add the proposed home and Journal locations; distinguish content from support files and report unexpected locations |
| Creation and discovery | Provide the supported capture, contextual writing, reading-return, entry, and period actions with the initial views |
| Registration and agent support | Share consumed field definitions and supply the initial audit and task-specific skills, without an infrastructure generator |
| Sources | Keep import ownership explicit and native tags intentional; finish stable identity and destinations from real exporter evidence |

The Source identity scheme, exact registry encoding, and plugin-dependent
behavior remain technical implementation work. The accepted write boundary
and authorship rules constrain that work. An unexpected change to user-facing
semantics is a new design issue, not a silent interpretation of this review.

## Files and Scope

Keep the accepted content locations and add these proposed operational homes:

| Location | Responsibility |
| --- | --- |
| `home.md` | Authored navigation, using `kind: note` and `format: guide`; includes the optional selected-entry list |
| `inbox/`, `knowledge/`, `activities/`, `domains/`, `sources/` | The accepted content contexts, including personal reading Notes inside Source contexts |
| `journals/daily/`, `journals/weekly/`, `journals/monthly/` | Date- or period-based authored Notes |
| `bases/` | Maintained Base definitions for discovery and structured review |
| `templates/` | Creation templates and reusable writing fragments |
| `scripts/` | Shared helpers and agent-accessible operations, where the workflow needs them |
| `docs/`, `.agents/skills/` | Human contracts and operating guidance, plus task-specific agent guidance |
| `examples/` | Clearly illustrative material, outside ordinary knowledge views and content audits |

The content audit includes `home.md` and the content roots above. Known
repository documents such as the root README, AGENTS, and CONTEXT, plus
documentation, templates, examples, configuration, and support scripts, do
not need content-note frontmatter. Unexpected Markdown outside the declared
content and support locations should be reported as needing a scope decision,
not silently omitted or automatically rewritten as a content Note. This
scope does not hide files from ordinary access and search.

Attachments should have predictable local homes, provisionally an
`attachments/` subfolder of the containing content folder. Exclude those
folders from Markdown content classification. Zotero-owned assets have their
own explicit import destination. Verify the Obsidian settings and collisions
before relying on this layout; importing a file does not give the importer
ownership of its entire surrounding Source context.

## Metadata Writers and Readers

Creators supply required values and known chosen context. They omit unused
optional fields instead of inserting a sheet of blank properties.

Readers tolerate absent, null, or empty optional values as unfilled. Populated
values must have the registered type. An empty required value remains missing.
Manual empty fields do not trigger unsolicited rewrites; structural audit
reports malformed or incompatible populated values.

| Note purpose | Proposed creation baseline |
| --- | --- |
| Ordinary or contextual writing | `kind: note`; chosen relationships and useful aliases only |
| Quick capture | `kind: note`; optional name, with the accepted provisional fallback; only explicit context is carried |
| Independent Guide | `kind: note`, `format: guide` |
| Domain entry | `kind: domain`, `status: active`; the author can explicitly create or retain a retired entry when appropriate |
| Activity entry | `kind: activity`, with `planned` for chosen future work or `active` when explicitly starting or recording ongoing work |
| Manually maintained Source record | `kind: source`; enough source location or description to make retrieval useful |
| Imported Source record | `kind: source` and reproducible import metadata under the import ownership contract |
| Daily Journal | `kind: note`, `format: journal`, plus the proposed date and period fields below |
| Weekly or monthly review | `kind: note`, `format: review`, plus date and period fields |

All standard content Notes need `kind`; the accepted unclassified manual
Capture exception in `inbox/` remains. Propose requiring `status` for Domain
and Activity entries so missing lifecycle data is exposed rather than silently
treated as active. This does not introduce a general Note maturity status.

`domains` targets existing Domain entries, and `activities` targets existing
Activity entries. These relationships can coexist independently. As accepted
in Q65, internal `sources` targets can also be existing personal Notes used
as direct input or evidence. External HTTP(S) source
locations and Zotero links are useful initial formats; other locator forms
need explicit handling rather than guessing. Structural checks do not fetch
all external references or claim to verify their content.

Keep native `tags` optional and topical. Do not automatically map every
imported Zotero tag into the vault's native tag vocabulary. Preserve useful
source tagging in the imported material or registered source metadata, with
an explicit mapping if native-tag use is later wanted. Imported bibliographic
fields need definitions for the fields the chosen template actually writes.

## Q64: Activities That Have Not Started

Q64 accepted `planned` for an Activity chosen for future work but not yet
started. It can have an entry and receive related Captures without appearing
in the current-work view. Explicitly starting it changes its state to `active`;
unchosen possibilities can remain ordinary Captures. The
[lifecycle contract](metadata.md#lifecycle-semantics) owns the accepted values
and meanings, including the distinction from paused work.

Creation for future work uses `planned`; an explicit request to begin or
record ongoing work can use `active`. Command labels should make that intent
clear without requiring a classification form. Missing-state handling remains
an operational proposal above, not a fallback that guesses whether work began.

## Q65: What Can Be a Source Reference?

Q65 accepted citing an existing personal Note as direct input or evidence
through `sources`, alongside Source records or direct source locations.
The cited Note retains its primary kind. General related links remain in the
body. The [relationship contract](metadata.md#relationships) owns this rule.

Validators must not reject such a target solely because it is an ordinary
Note. Source-record or bibliography views should filter `kind: source`
explicitly, while provenance views can expose the other cited Notes as well.
This preserves both the primary file role and the actual basis of the writing.

## Journals and Period Reviews

Propose two fields only for these dated forms:

| Field | Type | Meaning and responsibility |
| --- | --- | --- |
| `date` | Date | First day of the represented period; the creator derives it from the selected period, and the author changes it only when correcting that period |
| `period` | Text: `day`, `week`, `month` | Granularity used by creation, reopening, and review views |

The represented period is independent of file creation or modification time.
Backdated writing retains the intended period. These fields do not add
universal `created` or `updated` properties to other Notes.

Use calendar months and ISO weeks starting Monday. Proposed paths and data:

| Entry | Path example | Frontmatter values beyond `kind: note` |
| --- | --- | --- |
| Daily | `journals/daily/2027/2027-01-01.md` | `format: journal`, `period: day`, `date: 2027-01-01` |
| Weekly | `journals/weekly/2026/2026-W53.md` | `format: review`, `period: week`, `date: 2026-12-28` |
| Monthly | `journals/monthly/2027/2027-01.md` | `format: review`, `period: month`, `date: 2027-01-01` |

These are calendar examples, not actual Journals. Weekly folders use the ISO
week-year, which can differ from the calendar year. The current user timezone
is Asia/Shanghai; date-based entry points should agree on the author's local
date and permit an explicitly selected period rather than use a server's UTC
date unintentionally.

The table describes supplied entry defaults, not a prohibition on other
useful combinations of Journal/review form and period. A check should validate
the represented period, not enforce a writing cadence on the author.

Provide clearly named today/this-week/this-month actions and selection of a
different period when needed. Open an existing target; otherwise create once.
Do not backfill missing periods or duplicate Tasks automatically. Prefer native
Daily Notes where it fits, with a small Templater/helper flow for period reviews.
The date interfaces have documentation support; the combined flows are untested.

## Creation and Return Actions

Organize entry points around a few recognizable actions, with the underlying
files and commands documented for both Obsidian and agent use:

| Action | Behavior |
| --- | --- |
| Capture | Save in `inbox/` with optional naming; no relationship inference from whichever ordinary Note is open |
| Capture in this context | Save in `inbox/` and carry the explicitly selected Domain, Activity, or Source relationship |
| Write in this context | Create an Activity-local Note, a Source-context Note, or an independent knowledge Note linked to the chosen Domain |
| Write an independent Note | Create a named Note in `knowledge/`; optional associations remain optional |
| Continue reading | Open the relevant existing authored Note, or offer clear choices when several exist; creating another remains available |
| Open a date or period | Open the matching Journal/review, creating it only if absent |
| Create an entry | Create the requested Domain, Activity, or manual Source entry using its registered role |

This table defines behavior, not seven mandatory top-level buttons. A small
menu, context actions, and shortcuts can expose the same supported operations.
Agent commands carry the same explicit inputs and follow the same conventions.

Preview or state the target when it is not obvious. Resolve names and required
inputs before writing; cancellation should not leave an unintended created
Note. A collision must not overwrite existing writing. Copy the shared writing
cue once where it applies; there is no continuing link to a template engine.

Rename and move support must preserve references. Prefer a verified native
Obsidian operation when available. An agent operating only on disk should not
claim equivalent handling of ambiguous, aliased, or shortened links without
the required resolution and checks.

## Discovery and Maintenance

The proposed initial navigation provides:

- A readable home with selected entry links and access to the complete views.
- Domain and Activity overviews by their explicit lifecycle states.
- Directly associated Notes at each entry, plus related Activity routes at
  Domains. No automatic inheritance of `domains` from Activities.
- Source access that distinguishes authored reading from imported material.
- Provenance access that can include cited personal Notes, while Source-record
  views deliberately filter their document role.
- A chronological Journal/review entry and a general recent-content view.
- Maintenance access to unprocessed Captures, in-place refinement candidates,
  and structural findings. Unprocessed or unassociated content is visible
  without automatically becoming a Task or an error.

Bases serves structured properties. Refinement markers and body Tasks need
appropriate search or scripted inspection; do not promise Base queries over
arbitrary body content. Begin with the scope and authoring boundaries in
[Refinement](refinement.md), including authored Notes inside `sources/`.

The initial structural audit should cover YAML, populated field types and
values, required properties in their actual scope, and existing structural
targets with the agreed role checks. Reports locate findings and explain the
violated rule. Missing optional fields, exploratory red links, unsupported
new personal conventions, and semantic concerns retain their accepted distinct
treatment; audit does not silently repair or delete them.

## Registration, Imports, and Agent Support

Implement registration and shared validation for the initial field set and
creation actions. Keep the definition readable from the human contract and
make creators and audits actually use it. Choose the exact machine block or
file representation with those consumers; no infrastructure generator is
part of this draft.

For imported Sources, propose a reproducible ownership property such as
`managed-by: zotero`. It is a design candidate, not an installed convention.
Stable external source identity and import paths still require a real exporter
sample: do not use mutable title or citation key alone, and do not infer
whole-folder ownership. A marker identifies ownership; the importer still
needs an explicit operation and a verified per-source destination before
writing. Existing re-import evidence remains in
[Design Questions](design-questions.md#import-identity-and-replacement-evidence).

Initial agent guidance should cover three concrete jobs: paired writing
grounded in the author's draft; organizing and tracing retained material; and
auditing or maintaining the supporting tools. Reuse the English-writing skill
for settled ideas and reference the same contracts rather than copy them into
each skill. Final skill names and packaging follow the implemented actions.

## Proposed Implementation Sequence

1. Finalize the accepted field definitions and reviewed defaults in their
   owning documents. Implement readable registration, shared structural
   validation, and the initial creation actions using those definitions.
2. Add the home, contextual discovery, maintenance entry points, and the
   required templates and helpers. Keep illustrative examples separate from
   personal knowledge and configure only the new vault.
3. Add task-specific agent guidance and exercise the capture, writing,
   reading, and review paths with representative examples. Verify relevant
   behavior in Obsidian rather than relying only on offline checks.
4. Complete the selected Source import profile using actual exporter data
   and verify stable identity, repeated imports, and authored-file preservation.
   An unverified integration remains visibly pending rather than being
   declared complete from a template-only test.

These stages preserve necessary tooling and its rationale. Actual runtime
findings may require implementation adjustments; changes to the accepted
meaning or write ownership should return to the design discussion.

## Verification and Remaining Boundaries

The new vault currently contains documents and the writing cue only. The
original vault's installed plugins and available `obsidian.exe` command do
not establish that the new vault is configured or that its UI works.

Before considering the initial setup usable, exercise the two
[first-use walkthroughs](first-use.md), period creation across a year boundary,
capture naming and cancellation, typed and missing relationships, opening
existing writing, and the chosen import/re-import ownership behavior. Include
an example of changing a registered value and checking its actual consumers.
Keep example content clearly separate from the author's knowledge.

Q64 and Q65 are settled. Q66 is the review of this proposed operational
baseline and implementation scope. Import identity, final machine-data layout,
and runtime behavior still require concrete technical work; approval of the
baseline is not evidence that those checks have passed. No configuration,
plugin installation, or content migration has been performed by writing
this draft.
