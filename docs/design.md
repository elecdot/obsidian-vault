# Vault Design

This document owns the vault's purposes, workflow decisions, and their
rationale. [CONTEXT](../CONTEXT.md) defines terms; [Metadata](metadata.md)
defines fields; [Operations](operations.md) describes how to use the vault.
Unresolved choices live in [Open questions](design-questions.md).

## Purpose and Priorities

Develop explanations that remain useful across learning and work. Help the
author understand a Domain's questions, concepts, and relationships and
return to useful thinking after its original context has faded.

Useful understanding can become buried in captures and working records.
Writing, comparison, organization, and synthesis are part of learning;
structural upkeep should receive proportionate tool and agent support.
A reference, Journal, or working record can be complete for its own purpose
without becoming an independent explanation.

## Design Scale

Start with a clear model and a working path that is easy to maintain.
Evaluate additions by the concrete writing, retrieval, or maintenance action
they improve and the combined cost of use and upkeep. Stable foreseeable
needs can justify support before repeated failures occur.

Tools, registration, automation, and agent support remain useful capabilities.
Their scope should follow actual needs, with rules kept visible and ownership
clear. Preserve useful behavior and rationale when simplifying. General
frameworks and exhaustive coverage are not prerequisites for regular use.

Personal note-taking practices also evolve through use. Better defaults and
navigation can support judgment about reuse, correction, and organization;
that judgment does not automatically require another field or workflow.
Specific practice suggestions remain optional until adopted. The current
[observations](design-questions.md#practice-and-design-observations) guide
further discussion without creating a mandatory review schedule.

The author prefers command-palette access. Keep the current actions while
observing actual use; the number of menu entries alone does not establish
friction or justify redesign.

## Scope and Workspace Boundaries

Obsidian is the primary reader and daily interface, including its native
search, links, and Bases. Editors and agents are important writing and
maintenance interfaces. The plain files remain readable elsewhere; matching
Obsidian's full navigation in every reader is not a requirement. Mobile
convenience is an improvement rather than an initial launch condition.

Windows desktop Obsidian is the primary environment. Windows remains a
first-class target for vault tooling; technical maintenance may also run in
WSL/Linux. Intended platform support is distinct from the
[verified runtime coverage](verification.md).

Maintenance tools need repository-level version management, initially for
the JavaScript toolchain and extendable to other tools the vault requires.
The tool manager, task entry points, and version policy are
[under discussion](design-questions.md#maintenance-tool-environment).

Specialized repositories can retain their own records and workflows. The
vault provides connections, personal understanding, and a home for thinking
that needs one. It can hold project records when no suitable Workspace does.

For the first MoE research use case, the research repository owns the
protocol, code, results, and execution state. The vault holds the research
entry, reading questions, comparisons, and personal explanations. Link to
maintained project records rather than duplicate execution state.

The intended preservation approach is Git history for notes and core
configuration, with a remote copy on GitHub. Coverage and implementation
status are explicit in [Operations](operations.md#git-and-file-coverage).
Separate restore exercises are not an initial readiness condition.

## Model Relationships

A Note may draw on Sources, belong to one or more Activities, and contribute
to one or more Domains. These are independent relationships. A Source can
support reading without an Activity; an Activity can provide a useful entry
without becoming a full project-management system.

Domains can grow through incidental learning or deliberate study. Create
entries when they offer useful routes; a complete subject taxonomy is not
required before writing. The [document roles](metadata.md#document-role)
and [relationship contract](metadata.md#relationships) govern representation.

## Storage Responsibilities

| Location | Purpose |
| --- | --- |
| `inbox/` | Material whose use, placement, or retention is still being considered |
| `activities/<activity>/` | Writing belonging to a learning or work context |
| `sources/<source>/` | Source records and separately owned personal reading Notes |
| `knowledge/` | Notes worth maintaining independently for continued reuse |
| `domains/` | Domain entry Notes connecting questions and material across locations |
| `journals/` | Date- and period-centered writing |

Location describes maintenance context, not maturity. Useful explanations
may stay in an Activity or Journal; `knowledge/` can contain developing ideas.
Independent use can justify extraction or a move with reference maintenance.

Keep Domain entries in a flat collection until more structure offers a useful
route. An entry combines an authored account of scope and relationships with
derived views. Overlapping Domains need not duplicate member Notes.

Attachments use an `attachments/` subfolder of the containing content folder.
They are excluded from Markdown content classification. Support locations
and content scope are declared in the [registry](metadata.md#executable-field-registry);
[Tooling](tooling.md#maintained-components) identifies their maintenance roles.

## Lifecycle and Archive

Use explicit Activity and Domain states with files kept in place; the
[lifecycle contract](metadata.md#lifecycle-semantics) owns their values.
An Activity may be chosen but unstarted, underway, paused, completed, or
abandoned. Its closure does not require extracting or rewriting every Note.

Domain retirement is an explicit organizing decision. Temporary lack of
attention does not retire a Domain or invalidate its Notes. Keep a retired
entry, explain why it was retired, and link successors when relevant.
Preserve existing references and prefer current Domains for new associations.

Retiring an entry and revising an explanation are different actions. Explain
outdated claims and corrections in the affected writing. Reorganization may
change associations after reviewing their meaning; it does not silently
migrate all members or rewrite their claims.

## Authorship and Collaborative Writing

Start from the author's outline, reasoning, and intent. Agents can help
inspect drafts, expose uncertainty, extract candidates from discussions,
and support learning. An agent's clear explanation may be retained as
attributed reference material while the author is still learning it.
Understanding, review, and revision establish its place in the author's
accepted explanation.

The author leads important Domain relationships and organizing judgments.
Agent proposals remain optional until adopted. Preserve provenance, source
context, and uncertainty when editing or extracting material.

## Capture and Refinement

When the writing context is clear, continue in the relevant Note or create
within that chosen context. Reading normally has a Source or Activity
context. When placement or context is undecided, use a Capture in `inbox`.
An explicitly intended independent explanation can still start in `knowledge`.
This is a writing default, not a requirement to classify every thought.

Capture the question, why it matters, or a useful point of uncertainty while
it is available. Names and associations may wait. Contextual Captures can
carry known relationships while remaining in the inbox; merely opening an
unrelated tab does not supply creation context.

A working record can span days or attempts around a coherent question.
Split it when a part needs independent development or reuse, or when distinct
concerns make returning difficult. Length prompts a boundary review rather
than an automatic split. A stable concept needing independent reuse should
have its own Concept Note, connected to its originating context.

Refinement is selective. Keep author-selected candidates near their passages
with a reason; use the [refinement operations](operations.md#refinement) to
find and revisit them. A candidate is not a task or a demand to empty a queue.
When a Capture is explicitly judged to have no retention value, it may be
discarded after considering its references. Retained reference material can
leave the inbox without compulsory rewriting or a claim of understanding.

## Writing Scaffolds

Ordinary Note creators copy the [shared writing cue](../templates/fragments/writing-cue.md)
once. It is short, initially collapsed, and freely removable. It does not
add required empty sections or synchronize existing writing with a template.
Entries and dated forms use the structures their purposes justify.

## Organization and Discovery

Derived views provide coverage; authored Guides explain useful routes and
relationships. A newly associated Note need not be inserted into an entry's
narrative. Search, filenames, aliases, and file browsing remain useful paths.

A Domain initially shows directly associated Notes and related Activity
entries. Activity-only Notes remain reachable through their Activity.
A Note can also carry a deliberate direct Domain association; relationships
are not automatically inherited. A flattened contextual list is an optional
extension with [unverified refresh behavior](design-questions.md#deferred-extensions).

Home may contain a small authored list of useful routes alongside its views.
It is optional navigation, not an exhaustive attention record or a separate
focus state. Guides need not manually repeat the complete membership list.

## Sources and Zotero

Zotero remains authoritative for bibliography, original documents, and
original annotations. The vault develops interpretations and comparisons;
selected passages can be retained without a complete literature Note for
every Source. Preserve routes to originals and attribution of Zotero comments.

Imported Source files are owned as whole files, including frontmatter.
Personal classification and interpretation live in authored Notes that cite
or embed them. This predictable ownership is preferred to protected personal
regions inside regenerated files. The [ownership contract](metadata.md#generated-source-files)
also permits manually maintained Source records. Live integration status is
separate from the content model and recorded in [Verification](verification.md#source-integration).

### Source Contexts

Use `sources/<source>/source.md` for a Source record and nearby authored
reading Notes when that context is useful. Sharing a folder does not share
ownership. A citation does not require an empty reading Note or full scaffold.

If reading becomes an Activity, link existing Source-focused Notes in place;
put new Activity-specific plans, exercises, and experiments in the Activity.
Move earlier writing only when its purpose warrants it, maintaining references.
Authored Notes within `sources/` participate in discovery and refinement.

### Reading Entry Defaults and Writing Freedom

The reading action returns to relevant existing writing, creating a Note
when needed and offering a choice when several exist. The author can create
another Note and organize by question, chapter, or session. This default
adds no one-Note-per-Source rule, formal reading subtype, or progress field.

## Journals and Lightweight Planning

Journals hold experience, reflection, emerging ideas, and lightweight plans.
They need no Activity or Domain association. Daily, weekly, and monthly
entries are created on use and reopened without replacing their writing;
missing periods are not backfilled. [Operations](operations.md#periods)
describes the defaults. These entries impose no fixed review schedule.

Each Task has one maintained completion checkbox. Keep Activity-related
work with its Activity or working Note and daily-only work in the Journal.
Other plans reference that task or its section. Carry unfinished actions
forward selectively rather than copying every open checkbox.

Size a Task around an outcome with understandable completion criteria.
Detailed reasoning and run history can live in linked working Notes. The
author judges completion of understanding-oriented work.

## English Writing

English writing is a long-term direction for knowledge accumulation.
Filenames remain English. Temporary Chinese and Chinese serving a meaningful
purpose are allowed; useful Chinese writing does not automatically become a
translation task. English-only content is not a readiness condition.
Use `write-better-english` for settled ideas; resolve meaning in the writing
discussion before changing its expression.

## Launch Requirements

The pre-use review focuses on definite design and text problems and unfinished
setup prose. Uncertain design changes wait for evidence from actual use.

Start regular use with a clear model, maintainable field contracts, usable
creation and retrieval, and agent guidance that respects authorship.
The [first-use task](first-use.md) tests one actual research question:
retain its sources, write a personal explanation, find it through an Activity
or Domain, and reopen it to continue. Check the relevant operations in the
intended Obsidian vault.

One successful cycle establishes initial usability. Subsequent use develops
writing and maintenance practices and reveals which support needs improvement.
Broader automation, exhaustive example coverage, and old-vault migration
are not prerequisites for this first assessment.
