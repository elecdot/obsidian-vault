# Vault Design

This document records the accepted direction for the new personal knowledge
vault. Detailed contracts and implementation choices remain in
[Design Questions](design-questions.md). Established terms are defined in
[CONTEXT.md](../CONTEXT.md).

## Purpose and Priorities

The vault should make the author's explanations reusable and help build a
clear account of a Domain's questions, concepts, and relationships.
This organization supports the ability to recognize and solve problems.
Dependable entry points are a baseline capability, including when the
author has forgotten the original terminology or context.

The main reported failure is that useful understanding becomes buried in
captures, working notes, and surrounding material. Additional friction comes
from repeated writing, uncertainty about how to shape a note, mismatched
templates, and conventions whose purpose is unclear.

The previous vault was used largely during a period of limited time and
energy. The author now intends to make knowledge maintenance a regular,
potentially frequent part of learning. Deliberate comparison, organization,
and synthesis are valuable learning work; routine structural upkeep should
be supported by agents and tools.

## Design Scale

The first version should give the author a healthy, usable model for a
personal knowledge vault. The design itself will be maintained through use,
including documents, registrations, native Obsidian features, templates,
scripts, and agent skills.

Choose support work by the learning or maintenance action it improves.
Provide clear content placement, usable writing and retrieval, and enough
checks to catch known structural problems. A small concrete workflow is a
better starting point than specifying every future automation interface.

Well-designed tools, registration, automation, and agent support remain
explicit goals. Evaluate their benefit against the combined cost of use and
maintenance. Stable foreseeable needs justify design before repeated use;
the author need not first accumulate avoidable maintenance problems.

Treat documents and skills as everyday maintenance aids. Keep rules at clear
homes and revise them when actual use reveals friction. Regular refinement
and thoughtful organization remain intentional learning work; reducing tool
complexity does not reduce their importance.

Simplification should preserve useful capabilities, their rationale, and
consequential unresolved choices. Distinguish needed support, implementation
alternatives, and deferred expansion rather than deleting design content
because the total looks too technical or lengthy.

Detailed tooling architecture and comprehensive registration coverage should
not delay the first useful writing scenarios. The remaining discussion
should resolve choices that affect the author's use, while implementation
details are worked out against those scenarios and existing conventions.

## Scope and Workspace Boundaries

Obsidian is the primary daily interface. Editors and agents are important
writing and maintenance interfaces. Mobile convenience and other access
modes are improvements rather than current launch requirements.

The vault must provide a low-friction home for thinking and learning related
to ordinary projects and other activities. It may provide project entry
points and coordination when those are useful. It can retain designs,
experiments, discussions, and other records when the original Workspace
does not provide a suitable home.

Specialized repositories, such as the algorithm knowledge repository, can
retain their own knowledge, objects, and workflows. Connections and
cross-context understanding can live in the vault.

When an Activity ends, pauses, or loses relevance, its existing Notes may
remain as historical records and continue to be useful in a Domain.
Refinement is selective and may occur later when value becomes apparent.
Activity closure does not require every Note to be rewritten or extracted.

## Model Relationships

A Note can reference Sources, belong to the context of an Activity, and
contribute to one or more Domains. These relationships support different
questions about the same writing.

A Source can be useful without a dedicated study Activity. An Activity can
have a useful entry point without becoming a fully managed project.
Its goals, progress, and scheduling should reflect actual coordination needs.

A Domain can grow through incidental learning or deliberate study.
An initial reference framework is useful when the author intentionally
enters a field; ordinary capture and incidental learning can proceed while
the Domain's structure is still emerging.

The model's objects are semantic distinctions. Document roles and the three
optional relationship lists are defined in the [metadata contract](metadata.md).
The remaining field details, additional storage locations, and view definitions
are still under design.

## Document Roles

The `kind` property records a content note's primary responsibility.
Its values and meanings are owned by the
[document-role contract](metadata.md#document-role).

A developed explanation and a thought still being worked on can both remain
`kind: note`. Refinement does not by itself change this identity.

A Journal uses `kind: note`; its writing form is represented separately.
A Guide describes an organizing function rather than introducing another
`kind`. Relationships to Domains, Activities, and Sources are also expressed
separately from this primary responsibility.

Dedicated Source, Activity, or Domain notes are created when they are useful.
Ordinary Notes may use the initial `journal`, `review`, and `guide` values
from the [writing-form contract](metadata.md#writing-forms). Most other
writing can omit `format`. Additional values follow the accepted
[admission rule](metadata.md#admission-rule-for-new-formats). Consolidated
registration, further required properties, and treatment of system documents
remain open.

## Identity and Naming

Ordinary content filenames use readable lowercase English words separated
by hyphens. A note is referenced through its filename and an unambiguous
link target. The initial model does not require a separate immutable ID
for every note.

Meaningful aliases provide alternative names. Vault-internal content links
use wikilinks with an unambiguous intended target; display wording can differ from
that target. Existing external identifiers, such as a Zotero item identifier,
retain their source-specific purpose.

Use descriptive names for independently reusable notes. Activity-local
entries or chapters can use concise names such as `introduction.md`, even
when another Activity has a file with that name. Their references include
enough path context to identify the intended target.

For example, a reference can be
`[[activities/cs61a/introduction|CS61A introduction]]`. This keeps local
filenames readable while making the link's target explicit. A blanket
requirement for globally unique basenames would add unnecessary naming
work to these contexts.

Automated writers should construct unambiguous targets from known paths.
Obsidian completion may supply shorter unique targets; handwritten
abbreviated path suffixes require verification before becoming a convention.

Renaming or moving a note includes maintaining and checking its references.
The operation must account for the editing interface used. Ordinary authored
notes start from one readable English name, with the filename, initial H1,
and useful aliases supplied through the
[naming contract](metadata.md#names-and-headings).

Heading wording can subsequently develop without automatic file renaming.
Quick capture may defer a meaningful English name under the
[provisional naming contract](metadata.md#quick-capture-names). The concrete
cross-tool rename procedure remains to be implemented and verified.

## Storage Responsibilities

The following locations have been accepted for ordinary `kind: note`
content:

| Location | Responsibility |
| --- | --- |
| `inbox/` | Hold material whose use, organization, or longer-term retention is still being considered |
| `activities/<activity>/` | Retain writing that belongs to a learning or working context, including developed explanations |
| `sources/<source>/` | Retain authored reading Notes in the context of a Source, alongside separately owned source material |
| `knowledge/` | Hold notes worth maintaining independently for continued reuse, including explanations still being developed |

These locations express purpose and maintenance context. A Note in
`knowledge/` can continue to evolve and contain unresolved questions.
Useful writing can remain in its original Activity or Journal location.
Independent reuse can justify extraction or movement when it becomes useful.

Domain discovery and Guides must be able to reach relevant material across
these locations. Domain entry notes use the placement described below.
The [Source-context boundary](#source-contexts) distinguishes authored
reading from generated material within one folder. Exact source identifiers
and paths, Journal locations, attachments, and support files remain open.

## Domain Entry Points

Keep Domain entry notes directly under `domains/`, for example
`domains/ai-systems.md`, `domains/compilation.md`, and
`domains/gpu-kernels.md`. Their `kind` is `domain`.

An entry combines the author's account of scope, important questions,
relationships, and selected routes with automatically assembled access to
associated material. Reusable explanations and Activity notes retain their
useful locations and can participate in more than one Domain.

Start with a flat collection of entry notes. Add more specific entries when
they provide a useful route into the material. Incidental learning does not
require a complete framework in advance.

The existing-target rule for structural relationships supports dependable
entry points. The author selected this approach to avoid accumulating
unresolved organizational links that would create extra audit work.

## Lifecycle and Archive

Archival behavior initially uses explicit states and views while keeping
files in place. A separate physical archive tree is not part of the initial
design. The author primarily finds notes by searching their names and also
uses the file tree for occasional browsing and overviews; both forms of
discovery should remain understandable.

Activity lifecycle distinguishes chosen but unstarted work, ongoing work,
a pause, completion, and abandonment. A planned Activity can provide a home
for preparation and incoming Captures before it appears in current work.
Starting is an explicit change of state. These states determine future,
current, resumable, and historical views without changing the purpose of
associated Notes.

Domain exit is an explicit governance decision. The author associates it
with replacing an unsuitable organization, addressing obsolete explanations,
or making a firm decision not to invest further. Temporary lack of attention
is not an exit criterion, and elapsed time alone does not trigger retirement.

Retiring an organizing entry and revising the explanations it connects are
separate actions. Make outdated claims and their corrections understandable
in the affected writing. Associated Notes retain their own usefulness and
cross-domain relationships.

The [status contract](metadata.md#lifecycle-semantics) defines the state
values by kind.

Retain a retired Domain's entry and explain the reason for its retirement.
Point to successor entries when there are replacements. Preserve existing
references and prefer current Domains for new structural associations.

During reorganization, an agent can identify affected Notes and propose
association changes. Apply changes according to the established organizing
intent; uncertain interpretations remain part of the discussion.
Retirement does not automatically migrate all members or revise their claims.

## Authorship and Collaborative Writing

The default writing workflow starts with the author's framework and key
content. Agents help inspect the draft, identify candidate conclusions,
ask about uncertainty, and support learning when the reasoning needs work.

Agents may also extract candidates from an existing discussion or use
questions to help articulate understanding. These modes supplement the
default author-led draft.

A clear explanation produced by an agent can be retained as a Capture,
reference material, or an attributed learning quotation while the author
is still learning it. It becomes part of the author's accepted explanation
through understanding, review, and revision.

The author also leads important Domain relationships and organizing
judgments. An agent-proposed framework can serve as a reference or learning
direction before it becomes the author's adopted organization.

## Capture and Refinement

Standard creation flows provide the metadata baseline from the
[creation contract](metadata.md#creation-baseline). Direct manual capture
remains possible in `inbox/`, with general entry points exposing material
that has not yet been organized.

Creation receives context deliberately: global quick capture and contextual
creation are distinct actions. A Capture can retain known relationships on
its own file while waiting for later processing, without adding itself to
an Activity's authored entry. The
[creation-context contract](metadata.md#context-at-creation) applies to
Obsidian and agent-created output alike.

Capturing material and developing an explanation are separable activities.
A reference record can be complete for its purpose when its source and
retrieval context are sufficient. Further explanation or practical use
depends on an actual need.

At capture time, preserve personal context that is easy to lose: the
question, why the material matters, a current judgment, or a concrete point
of uncertainty. Rough or mixed-language wording can preserve these ideas
before further writing.

Useful thinking may remain in its original Journal or Activity Note.
Independent referencing, continued development, or use in another context
can justify extraction into a separate Note. A longer Note centered on a
coherent question is also a valid form.

A stable concept that needs independent reuse should have its own Concept
Note. Preserve useful connections to its originating context and related
understanding. Its explanation can continue to evolve; its ordinary
`kind: note` identity remains unchanged.

Working records can span several days or attempts around a useful question,
experiment, or other return point. Split them when a part needs independent
development or reuse, or when distinct concerns make returning to the work
difficult. Length is a reason to inspect the boundary rather than an
automatic split threshold.

The need to keep friction low must be balanced with the risk that valuable
thinking remains hidden in large captures. Capturing a short personal
judgment and retaining its source context can precede full refinement.
Author-selected Refinement Candidates stay near the relevant passage with
a short reason. A reliable entry point and review process collect them
without requiring another manually maintained list.

The author can identify Refinement Candidates. Agents can supplement them
with evidence-based suggestions and their source locations. Suggestions
remain optional until adopted; silence does not create a task.

The [refinement workflow](refinement.md) defines the initial marker,
collection strategy, and review behavior. Unadopted agent proposals stay
in review output rather than becoming markers or tasks in authored notes.

A Note can be sufficient for its present purpose when it answers a specific
question with appropriate support and makes uncertainty visible.
For a Domain the author intends to study deeply, useful Notes should
progressively gain a meaningful place in its organization.

### Capture Disposition

When the author explicitly decides a Capture has no remaining retention
value, it may be discarded. A permanent archive for rejected Captures is
not required. Age, backlog size, and an unanswered agent suggestion do not
by themselves decide that a Capture should be deleted.

Material retained for reference can leave `inbox/` as an appropriate Source
record or Note without compulsory refinement. Leaving the inbox reflects a
decision about purpose and retention; it does not certify understanding.
Concrete deletion and recovery procedures must account for existing
references as part of maintenance.

## Writing Scaffolds

The author delegated the presentation trade-off after accepting a minimal
general Note scaffold. Use one short, initially collapsed writing cue by
default, rather than several empty required sections.

The [shared writing cue](../templates/fragments/writing-cue.md) is the
canonical creation asset. Ordinary Note creators should copy it at creation
time; the resulting note remains self-contained and does not acquire a
standing link to a helper document.

The cue is disposable writing assistance. The author can keep, replace, or
remove it. Editing the shared cue changes future creations and does not
justify a bulk rewrite of existing notes.

Maintain one version of this text for the creation flows that use it.
It does not create a second near-identical Concept Note template or a
separate maintenance path. Activity, Domain, and time-based entries retain
the short structures justified by their own purposes.

## Organization and Discovery

Domain organization should develop an account of important questions and
conceptual relationships. Learning routes and coherent syntheses can grow
from this work as needed.

Everyday discovery combines automatically assembled coverage with authored
Guides. Material should remain discoverable before it has been integrated
into a Guide. A Guide helps the reader enter context and understand why
selected material and relationships matter.

Known relationships written in a Capture support passive incoming discovery.
The [incoming-discovery contract](metadata.md#incoming-discovery-and-authored-guides)
keeps that complete coverage distinct from selection in an authored Guide.
Derived views or the backlink interface provide access without repeatedly
editing the entry's narrative or maintaining a second member list.

Entry points should support growth without requiring the author to retain
the entire structure in memory. The accepted relationship fields provide
associations for these entry points. Navigation views and treatment of
unorganized material remain open.

The initial Domain entry presents directly associated Notes and related
Activity entries. A Note can carry both `domains` and `activities`; the
[relationship contract](metadata.md#relationships) defines their independent
scopes. Without its own Domain association, an Activity Note remains reachable
through the Activity rather than automatically entering the Domain's direct
Note list. A separate flattened contextual view remains a possible extension,
with its refresh behavior to be verified before use.

The vault home can contain a short authored list of links to useful current
entry points, with brief explanations where helpful. The author expects
ongoing attention often to make a separate focus mechanism unnecessary;
this list is a lightweight way to scan and choose where to enter.

It is optional navigation, not an exhaustive record of attention or an
additional state to keep synchronized. Do not introduce a parallel `focus`
property for it. Domain and Activity lifecycle remain independent. Complete
discovery views and direct search serve material outside the selected list;
the home does not need to become the mandatory opening screen.

## Sources and Zotero

Zotero remains the authority for bibliographic information, original
documents, and original annotations. The vault develops interpretations,
comparisons, and synthesis across Sources.

An earlier personal Note can also be a Source for later writing when it is
used as direct input or evidence. Its primary document role stays unchanged;
the [relationship contract](metadata.md#relationships) distinguishes citation
from a generic related link and keeps Source-record views explicit.

Personal comments written in Zotero may already contain valuable thinking.
Their provenance should survive import and later refinement.

Selected passages may be brought into the vault without creating a complete
literature note for every Source. The design should preserve a route back
to the original material.

The default reading workflow keeps imported material and the author's
reading or thinking in separate files. Personal Notes can link to or embed
the imported material and develop in their own working context.

This boundary prioritizes predictable ownership and maintenance. The author
prefers it over relying on protected personal sections inside a regenerated
file. A mixed-file workflow could be reconsidered for a concrete need, but
it is not the initial default.

Zotero-generated Source files are reproducible as whole files, including
frontmatter. Personal relationships and interpretation are maintained in
authored Notes and Guides, which link the imported material into the
knowledge structure. The [ownership contract](metadata.md#generated-source-files)
defines this boundary.

Source-record identity, stable import paths, ownership detection, and the
exact re-import behavior still need implementation contracts and verification.
Zotero import templates and ordinary creation flows must follow the same
metadata meanings, even when they use different template engines.

### Source Contexts

Reading can have a useful home without an Activity. When personal reading
Notes need sustained context, keep them under `sources/<source>/`, alongside
a separately maintained Source record. For example:

```text
sources/<source>/
  source.md          # Source record; importer-owned when generated
  reading-notes.md   # Authored understanding, questions, and derivations
```

The folder expresses a context, not a single document role or owner.
The Source record uses `kind: source`; personal reading Notes use
`kind: note` and refer to the material through `sources`. Imported output
is limited to designated files and assets. It must preserve authored Notes
in the same context. Manually maintained Source records retain their own
ownership; the folder does not imply that Zotero is involved.

Create this context as needed. Citing or retaining a Source does not
require an empty reading Note or a full folder scaffold. Reading records
can follow a book, paper, or chapter; explanations that need independent
reuse can be developed in `knowledge/` while preserving provenance.

If incidental reading later becomes a deliberate Activity, retain existing
Source-focused Notes in place and link them from the Activity entry. Newly
Activity-specific plans, exercises, experiments, and working records belong
in that Activity's context. Creating the Activity does not itself require
moving or copying earlier writing. A later change in a Note's primary use
can justify a deliberate move with reference maintenance.

Source contexts must participate in general discovery and refinement views.
Exclude designated generated material where appropriate, while retaining
authored reading Notes in their scope. Concrete ownership detection and
stable folder naming still need implementation contracts.

### Reading Entry Defaults and Writing Freedom

The default reading entry should help return to an existing personal reading
Note, creating one when needed. It should not automatically create another
file for every reading session. If several relevant Notes exist, make the
available return points understandable rather than imposing a single Note
per Source.

This is a creation and navigation default, not a new domain-model constraint.
The author remains free to organize by question, chapter, or session, and to
create or split Notes as coherence, independent use, and return needs suggest.
Agent assistance should respect those choices. No new kind, format, required
progress field, or structural-audit rule follows from the default.

## Journals and Lightweight Planning

Daily Journals primarily support personal experience and reflection,
emerging thoughts, and lightweight links to activities and material.
They can also support daily plans and tasks, initially with a lightweight
workflow.

A Journal may exist without an Activity or Domain association.

The first version supports daily Journals, weekly learning reviews, and
monthly direction or organization reviews. Weekly reviews connect changes
in understanding, selected Refinement Candidates, and next steps. Monthly
reviews reconsider Domains, Activities, organization, and maintenance effort.

Create a date or period's note when it is used. Reopen an existing note
rather than regenerate its writing. Missing periods do not require
automatic backfilling or pre-created empty notes.

Regular reflection and refinement are intentional parts of learning.
These entry types do not establish an automatic schedule or fixed time
commitment.

Journal writing can retain its value in place. It need not produce an
independent knowledge Note each day.

Each Task has one maintained checkbox. Activity-related work stays with
its Activity or associated working Note; daily-only tasks can live in a
Journal. A daily plan can reference an existing task or its surrounding
section without duplicating its completion state.

Carry-forward is selective. Review which unfinished actions remain useful;
do not automatically copy every open task into the next day.

A Task is sized around an outcome whose completion can be judged.
The task entry states the action and useful completion criteria; detailed
reasoning, run history, and supporting material belong in linked working
Notes when needed. There is no fixed word-count or duration limit.

For example, reproducing a paper can be an Activity, while running a
baseline under a specified configuration and recording the result can be
a Task. The author judges the completion of understanding-oriented tasks.

Practical review and maintenance steps remain to be defined within this
lightweight scope.

## English Writing

English writing is an explicit learning goal, and an all-English vault is
the intended direction. Filenames should remain English.

The author may draft in mixed language when that is necessary for accurate
understanding. The available `write-better-english` skill can turn settled
ideas into natural English while preserving meaning, voice, attribution,
and certainty.

Questions about a claim or its reasoning return to collaborative thinking
and learning. Wording work preserves the ideas being expressed.

## Agents and Maintenance

Agents are important participants in capture, paired editing, organization,
auditing, and the construction and maintenance of supporting tools.

Vault-specific skills should be based on the final model and cover those
workflows with clear outcomes. Their exact number, boundaries, and packaging
will follow the actual task patterns.

Model definitions and metadata contracts need authoritative homes.
Skills, templates, views, and scripts should consult or implement those
contracts consistently. Changing a convention must account for its writers,
readers, and checks.

The author accepts Q60's narrowed tooling boundaries in principle and
emphasizes a scale appropriate to a personal knowledge vault. Rules remain
visible and maintainable, everyday writing stays independent, and tools have
explicit write boundaries. The [tooling guidance](tooling.md) starts without
an infrastructure generator. Shared definitions, registration, consistent
consumers, maintenance procedures, and validation remain intended support,
with their detailed interfaces still to be implemented. These capabilities
should be designed coherently, including across Obsidian and agent entry
points, without requiring a general framework for every future extension.

The [audit and field-evolution contract](metadata.md#audit-and-field-evolution)
allows provisional properties while distinguishing structural violations
from semantic suggestions. Default audits report findings without editing
the vault; adopting a field into shared tooling requires a defined contract.

Documents have distinct responsibilities:

| Document | Responsibility |
| --- | --- |
| README files | Human-facing orientation, entry points, and local operating guidance where needed |
| CONTEXT.md | Canonical domain vocabulary |
| Design documentation | Goals, relationships, ownership, workflow decisions, and rationale |
| [Metadata contract](metadata.md) | Field meanings, types, applicability, ownership, and validation rules |
| AGENTS.md | Agent routing and essential behavioral instructions |
| Skills | Task-specific execution guidance that uses the shared model and contracts |

## Launch Requirements

### Required Before Regular Use

- A clear content model and document responsibilities that explain common cases.
- Defined metadata semantics, applicability, and maintenance ownership.
- Instructions that let agents understand the conventions and assist with
  writing, organization, and checks.

### Initial Support Expected

- A small set of easy-to-select creation flows in Obsidian.
- Dependable entry points and basic audits that establish maintainable patterns.
- Representative examples for AI Systems and book, course, or reproduction
  work, with priority given to making those examples useful.

These should support a complete first-use path: retain material, draft a
personal explanation, find it through an entry point, and obtain useful
agent assistance or checks.

The initial release should include the support needed to make that path
reliable and maintainable. Registration and automation are not postponed
merely because a manual workaround exists; scope them to clear benefits and
defined maintenance responsibilities.

Use that path to judge readiness. A complete tool inventory, general registry
framework, universal shared runtime, or exhaustive automation coverage is
not required to begin regular use. Resolve remaining details through a
small number of concrete writing scenarios and their actual support needs.

### Develop Through Use

Broader coverage of note patterns, richer automation, and mature maintenance
routines should be developed through actual use.

### Deferred Independently

Access to and migration from the old vault are deferred. Legacy structure
and compatibility constraints should not determine the new model.

## Evaluation Scenarios

AI Systems is the first long-term Domain. Compilation and kernels are
examples of overlapping areas the author may explore.

Potential Activity scenarios include reading *Linear Algebra Done Right*,
taking a course such as CS61A, reproducing a paper, and developing a small
software project. No single representative Activity has been selected.

These scenarios should test both deliberate domain-building and ordinary
notes produced by active learning. Concrete examples and real use will be
needed to evaluate the proposed contracts.

The [first-use walkthroughs](first-use.md) illustrate contextual capture in
AI Systems and personal reading around a Source. Their hypothetical Notes
exercise the accepted model and the decisions clarified in Q61–Q63.
The reading default concerns entry behavior, not a restriction on prose
organization. The examples do not assert the author's understanding
or establish a particular paper or book as an active commitment.
