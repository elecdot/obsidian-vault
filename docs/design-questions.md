# Design Questions

This document tracks unresolved decisions and factual work during the design
interview. Accepted product decisions live in [Design](design.md), field
contracts in [Metadata](metadata.md), and resolved terms in
[CONTEXT.md](../CONTEXT.md).

The current checkpoint is 2026-10-04, after Q66 approval and initial
implementation. Planned Activities and citing personal Notes as Sources
remain part of the accepted model.
Establish a useful personal knowledge model with deliberately designed
support. The author clarified that avoiding excessive engineering retains
necessary tools, registration, automation, and their design rationale.
Implementation and staged Conventional Commits are authorized. The author
retired the enclosing repository's old skills; [primary references](references.md)
now ground application behavior. Current implementation results and remaining
limits are recorded in [Verification](verification.md).

## Current Readiness Discussion

On 2026-11-10, the author requested a concise set of documents that support
ongoing vault use and maintenance. Earlier discussion summaries and user
preferences may be challenged where they no longer fit. The author selected
the existing MoE expert load balancing research project as the
[first real use case](first-use.md), replacing the hypothetical walkthroughs.

The current discussion needs to settle the vault's responsibilities beside
the research repository, concrete readiness criteria, and whether the earlier
English-writing goal should constrain this use. Documentation cleanup should
separate current rules and useful rationale from construction history and
superseded implementation questions. The sections below retain the earlier
record pending that cleanup; their lists are not a new release checklist.

## Decision Surface

The rows track remaining work, not a list of questions that must all be put
to the author before writing can begin. Some are practical conventions or
runtime facts to resolve while working through initial scenarios. Ask the
author about choices that materially change their use or maintenance burden.
Each such question should identify the affected model, metadata, entry
behavior, or automation. Ordinary choices about organizing prose do not
need a separate formal rule without such a consequence.
Keep proposals distinct from accepted contracts. Scope support by expected
benefit and maintenance cost, including stable foreseeable needs; preserve
the rationale for necessary capabilities and deferred alternatives.

| Area | Decision to resolve | Main dependency |
| --- | --- | --- |
| Metadata contract | Review proposed date/period fields, empty states, system-document scope, imported tags, and concrete locator handling | Accepted roles, writing forms, creation baseline, relationships, and Q65 Source target semantics |
| Registration | Authoritative definitions, how creators and audits consume them, maintainable entry-point discovery, and change procedures | Registration remains an explicit goal; visible rules, independent daily writing, and bounded tool behavior |
| Reference conventions | Capture-name collision handling, date-based and generated names, and the concrete rename procedure | Accepted ordinary naming and optional quick-capture names |
| Physical organization | Stable Source paths, Journal locations, attachments, and support files | Accepted context transitions, Source contexts, file-level ownership, and other content contexts |
| Lifecycle and archive | Concrete creation interactions, missing states, and practical transitions | Accepted states including `planned`, retained retirement entries, and state-based views |
| Navigation | Direct association views, related Activity entry implementation, concrete home layout, and exposure of unorganized material | Accepted independent relationships and Q61 scope, passive discovery, optional home list, and lifecycle meanings |
| Creation | Initial creation flows, prompt boundaries, defaults, cancellation behavior, and equivalent agent-created output | Metadata contract and initial note patterns |
| Journals and tasks | Practical review and carry-forward steps, and date and period conventions | Outcome-bounded Tasks, working-record boundaries, and selective carry-forward |
| Refinement | Concrete query scope, reliable source navigation, and precise recognition of markers versus quoted examples | In-place markers and shared, read-only collection |
| Zotero import | Source identity, stable import paths, ownership detection, selected imports, and actual file formats | Whole-file importer ownership and separate authored reading Notes |
| Audit and automation | Concrete check inventory, provisional-field reporting, repair procedures, and consistent behavior across Obsidian and agent tooling | Accepted read-only audit boundary and metadata and reference contracts |
| Agent skills | Workflow boundaries, triggers, shared references, tool use, and representative validation | Final model and available commands |
| Examples and first use | Concrete AI Systems and study/reproduction examples, followed by an end-to-end use check | Initial contracts and creation flows |

## Dependency Order

The semantic model, initial `kind` values, filename-based identity, optional
relationships, ordinary-note locations, and Domain entries are established.
Tags carry topics; workflow intentions will be represented separately.
Structural internal references point to existing notes, while exploratory
body links may remain unresolved.

Standard creation flows supply `kind`; direct manual Captures can remain
temporarily unclassified in `inbox/`. Tasks have one maintained completion
record, and carry-forward is selective. Imported material and personal
reading content use separate files by default.

Tasks are bounded by an outcome, and working records split according to
independent development, reuse, and return needs. Stable concepts that need
independent reuse have their own Notes. Zotero-generated files, including
frontmatter, are owned by the importer.

Activity and Domain states use the accepted `status` contract. Retired
Domains retain their entries and references, while new associations prefer
current Domains. Ordinary authored notes start from one readable English
name, without a universal title property or automatic renaming after
heading edits.

The first version supports daily, weekly, and monthly entries, created on
use. Author-selected candidates remain near their context and are collected
for review. The author delegated the lightweight scaffold presentation;
the chosen default is one collapsed paragraph maintained in a shared asset.

Default audits are read-only. Violations of established structural contracts
are errors; provisional fields and semantic concerns are review suggestions.
Fields need a contract before shared tooling relies on them or they are
adopted for long-term use.

Source-focused authored Notes can share `sources/<source>/` with separately
owned Source records. The context is created as needed; a source citation
does not require a full scaffold. Ownership is file-specific, so discovery
and audit cannot treat the whole Source tree as generated material.

Establishing an Activity does not move or copy earlier Source-focused
reading Notes. The Activity links them and provides a home for new plans,
exercises, experiments, and other Activity-specific writing.

The initial optional `format` values for ordinary Notes are `journal`,
`review`, and `guide`. Most writing can omit the property. New values require
a named use, a necessary distinction, a usable boundary, and an owned
contract under the [accepted admission rule](metadata.md#admission-rule-for-new-formats).
The author supports registration of formal contracts and dependent entry
points in principle. The current metadata document provides the starting
home. The [tooling guidance](tooling.md) ties any further machine-readable
definition or inventory to actual creation and maintenance needs.

A short authored link list on the home is accepted as a low-cost way to
scan and choose an entry point. It need not track ongoing attention, be
exhaustive, or replace direct search. It does not introduce a focus property.

Context comes from the creation action or explicit agent request, not solely
from the file currently open. A Capture can hold known relationships while
remaining in `inbox/`; an entry discovers incoming associations without
having each Capture appended to its authored body. Broad backlinks and
typed relationship views serve distinct discovery purposes.

The author may discard a Capture explicitly judged no longer worth retaining.
An archive for rejected Captures is not required, and retained reference
material need not be refined merely to leave the inbox.

Q60's narrowed boundaries are accepted in principle: no infrastructure
generator for the first version, directly maintainable rules, independent
authored Notes, read-only default audits, and controlled creation and import.
Zotero retains its previously accepted file-ownership boundary.

The author also corrected the scale of the work. Documents, registrations,
native features, scripts, and skills will be maintained as part of the
personal knowledge vault. A mature tooling architecture is not a launch
condition. Exact representations and interfaces should follow the initial
writing scenarios, not expand into an independent engineering project.

The author further clarified that this does not call for deleting substantial
tooling design. Shared definitions, registration mechanisms, consistent
consumers and adapters, convention-change steps, and useful checks remain
active design work. The [tooling document](tooling.md) restores that rationale
and separates intended capabilities from optional or deferred machinery.

Document roles inform the metadata contract. Together, those choices inform
physical organization, navigation, and creation flows. Journals, refinement,
and Zotero import need concrete contracts within that structure. Tools and
skills then need to implement and check the same conventions.

Independent user preferences can be discussed together. A question whose
answer depends on an unresolved prerequisite belongs in a later round.

Q61 confirms that `activities` and `domains` can coexist independently.
Domain entries initially show directly associated Notes and related Activity
entries. Indirect association through an Activity is a return path, not an
implicit direct Domain association on the Note.

Q62 concerns the reading entry's default, not a new model constraint.
Help continue existing relevant writing; allow multiple reading Notes per
Source and author-chosen session, chapter, or question boundaries.
Q63 permits an omitted name during quick capture, with a provisional filename
and useful English naming when retained material is organized.

## Implementation Status

Q64 and Q65 are resolved. Their meanings live in the
[lifecycle](metadata.md#lifecycle-semantics) and
[relationship](metadata.md#relationships) contracts and the glossary.
Creation for chosen future Activities uses `planned`; personal Notes can be
Source inputs without being reclassified. The existing-target rule remains.

Q66 approved the remaining operational defaults and the move into implementation. Its
[review scope](initial-setup.md#review-scope-for-q66) covers optional values,
lifecycle-state requirements, date and period conventions, content/support
locations, creation and discovery, registration, audits, and agent support.
The initial tools, views, configuration, and skills now implement that baseline.
Actual checks and the known live-source limitation are recorded separately.

Creation, direct-scope queries, reference updates, and synthetic snapshot
re-import have actual runtime evidence. The registry has a concrete shared
reader. Real Zotero selection stopped before any Source write after a response
shape mismatch, at the author's requested boundary. Retain that finding for a
later explicitly resumed integration task rather than silently retrying it.

## Evidence Record

The following observations were collected during design and implementation.
Earlier statements that a behavior was unverified describe that investigation
stage. Use [Verification](verification.md) for the current observed results;
the evidence and rationale are retained rather than silently discarded.

### Follow-up Work

Facts are the agent's responsibility. Investigate them when they could
change a pending decision.

- Check property types and concrete Bases formulas in the intended
  environment before selecting representations. Official link and alias
  behavior has been investigated below; runtime behavior still needs
  verification where the implementation depends on it.
- Verify the intended Zotero import workflow with actual settings and a
  representative material format. Confirm exposed identity fields, stable
  output paths, and regeneration behavior before implementing it.
- Inspect available template and command interfaces before choosing shared
  helpers or validation architecture. This determines how writers and
  readers can follow one contract.
- Continue exercising concrete writing and retrieval flows during use. Initial
  checks have passed; new needs may expose further choices.
- Live Zotero selection work is stopped at the author's request. Retain the
  observed mismatch and resume only in a later explicitly requested task.

### Initial Environment Evidence

A read-only inspection while preparing the initial setup draft found only
design documents and the writing cue in the new vault. It had no `.obsidian/`
configuration, creator scripts, actual Bases, or audit runner. `node`,
`python3`, and `obsidian.exe` were found on PATH; the application and CLI were
not executed, so availability of the command is not a runtime check.

The original vault's `.obsidian/core-plugins.json` enables Daily Notes and
Bases. Its Daily Notes configuration uses `daily/`, `templates/daily`,
`YYYY-MM-DD`, and no autorun. Its enabled community-plugin manifests identify
Templater 2.18.1 and Zotero Integration 3.2.1. Neither plugin had a `data.json`
at the inspected path. These are observations about the original vault,
not configuration or compatibility requirements for the new one.

### Registration Reference Evidence

A read-only check of `/home/elecdot/dev/labs/algorithm` after Q58 found a
useful example of registration through actual shared definitions:

- `topics/catalog.yaml` owns Topic records. `topics/README.md:9` and `:31`
  describe editing that definition and running validation as the registration
  workflow; a dedicated registration command is deferred until useful.
- Creation and lookup share Catalog loading and resolution in
  `scripts/algorithm_repo/entries.py:239` and `:60`. Repository validation
  loads the same Catalog in `scripts/algorithm_repo/validation.py:685`.
- `scripts/algorithm_repo/audit.py:132` derives Topic usage from content.
  It is not a general dependency graph for arbitrary scripts and templates.
- The documentation explicitly excludes some free Markdown references from
  structural audit (`topics/README.md:78` and `:114`). Basic enums also
  remain in Python constants (`scripts/algorithm_repo/model.py:10`) and
  human documentation. This is not evidence of complete automatic document
  synchronization or semantic validation.
- Full dashboard generation is outside its initial workflow
  (`docs/CONVENTIONS.md:151`); its existing dynamic lookup and audit should
  not be described as a general document-generation system.

No reference-repository checks were executed. The new vault inspection found
design documents and the shared writing cue, with no registry, creator,
Base, or audit runner yet. The proposed tooling remains a design, not an
existing safeguard or a dependency on the reference repository.

### Organization and Archive Evidence

- Tiago Forte defines PARA Archives as inactive material from Projects,
  Areas, or Resources that is still worth retaining for future reference.
  His examples include completed and paused projects. This supplies an
  actionability criterion, not a claim that archived knowledge is false.
  See [PARA](https://fortelabs.com/blog/para/).
- Zettelkasten.de treats atomicity as shaping independently useful knowledge
  units. Its guide also allows initial writing and later refinement, with
  usefulness governing the effort spent on splitting.
  See [Atomic Note-Taking](https://zettelkasten.de/atomicity/guide/).
- Its Structure Notes describe notes and their relationships, providing
  thematic entry points and sequences of reasoning. This supports the
  purpose of authored Guides in the current model.
  See [Structure Notes](https://zettelkasten.de/introduction/#structure-notes).

For this design, distinguish Activity lifecycle, Domain attention, and
revision of explanations before choosing an archive mechanism. This is a
design inference, not a prescribed folder layout from either method.

### Obsidian Reference Evidence

- The shortest-link option uses the shortest unique path. Name-based links
  therefore need an unambiguous target; a path can qualify duplicate names.
  See [link settings](https://obsidian.md/help/settings#New%20link%20format).
- Alias completion inserts a link such as
  `[[Artificial Intelligence|AI]]`: the file remains the target and the
  alias supplies display text. See
  [Aliases](https://obsidian.md/help/aliases).
- The automatic internal-link update setting controls rename behavior.
  Obsidian's `FileManager.renameFile` API handles moving and renaming with
  reference updates according to that setting. External filesystem renames
  have not been established as equivalent. See
  [settings](https://obsidian.md/help/settings#Automatically%20update%20internal%20links)
  and the [official API definitions](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).
- Bases rows represent existing files. `file.links` includes internal links
  from the body and frontmatter, so an audit can associate unresolved targets
  with their referring notes. See [Bases](https://obsidian.md/help/bases)
  and [file properties](https://obsidian.md/help/bases/syntax#File%20properties).
- Link values can refer to missing targets. The precise missing-target
  behavior of `asFile()` and the resulting audit formula still need a check
  in the actual runtime. See [files and links](https://obsidian.md/help/bases/syntax#Files%20and%20links)
  and [functions](https://obsidian.md/help/bases/functions).

### Native Property Evidence

- Obsidian gives `tags`, `aliases`, and `cssclasses` native behavior and uses
  YAML lists for them. The same property name has one configured type across
  the vault. Lists support quoted wikilinks; the Properties editor does not
  support nested properties. See [Properties](https://obsidian.md/help/properties).
- Native tags can appear in frontmatter or the body. `file.tags` includes
  both, while `note.tags` contains the frontmatter property.
  See [Tags](https://obsidian.md/help/tags) and
  [Bases syntax](https://obsidian.md/help/bases/syntax#File%20properties).
- A `title` property is ordinary metadata. The inline-title setting uses
  the filename and does not add a body heading. No synchronization among
  a custom title, filename, and H1 should be assumed.
  See [Properties](https://obsidian.md/help/properties#Text) and
  [settings](https://obsidian.md/help/settings#Show%20inline%20title).
- Official documentation establishes unique-path links but does not
  directly establish the proposed abbreviated target
  `[[cs61a/introduction]]` for
  `activities/cs61a/introduction.md`. Use a known unambiguous target in
  generated examples and test suffix resolution before relying on it.
  See [Internal links](https://obsidian.md/help/links).

### Incoming Relationship Evidence

- Properties supports quoted internal links in Lists. Bases includes links
  from frontmatter in `file.links`; the Backlinks documentation describes
  linked mentions as Notes containing internal links to the current Note.
  Together these support passive incoming discovery from a Capture's
  properties. The precise Backlinks panel presentation remains untested in
  the intended runtime.
  See [Properties](https://obsidian.md/help/properties#List),
  [file properties](https://obsidian.md/help/bases/syntax#File%20properties),
  and [Backlinks](https://obsidian.md/help/plugins/backlinks).
- In an embedded Base, `this` refers to the host Note. Official examples
  use `file.hasLink(this.file)` for broad incoming links and
  `authors.contains(this)` for a particular relationship List. Adapting
  the latter to `activities`, `domains`, or `sources` can provide typed
  discovery. A broad backlink alone does not establish which relationship
  the author intended. Adapted filters have not yet been run.
  See [host properties](https://obsidian.md/help/bases/syntax#Access%20properties%20with%20%60this%60)
  and [files and links](https://obsidian.md/help/bases/syntax#Files%20and%20links).
- Bases can be embedded or used in the sidebar. A derived member view does
  not require writing each referring Note into the entry's body. This is
  not a guarantee of read-only UI: Bases also supports editing underlying
  properties. Official documentation cautions that `file.backlinks` is
  costly and does not update automatically with vault changes, so it is
  not the default aggregation mechanism to assume.
  See [embedding a Base](https://obsidian.md/help/bases/create-base#Embed%20a%20base),
  [Bases](https://obsidian.md/help/bases), and
  [file properties](https://obsidian.md/help/bases/syntax#File%20properties).

Implementation checks should cover absent and empty relationship Lists,
qualified duplicate filenames, embedded versus sidebar host context, and
refresh after relation edits, moves, and renames.

### Domain Context Query Evidence

Official Bases documentation exposes the pieces for a one-hop relationship
query: a Link can become a local File through `asFile()`, `file.properties`
exposes that file's properties, and List filtering can test its Domain links.
The `this` object supplies the host when a Base is embedded. Combining these
features to find Notes through an Activity's Domain association is a design
inference, not a tested view in this vault.
See [functions](https://obsidian.md/help/bases/functions) and
[host context](https://obsidian.md/help/bases/syntax#Access%20properties%20with%20this).

The documentation explicitly states that `file.properties` does not
automatically refresh results when files change. An Activity's updated
Domain relationships must therefore not be assumed immediately visible in
such a view. Verify reload behavior, missing Lists, unresolved links, host
context, and actual performance before relying on it.
See [file properties](https://obsidian.md/help/bases/syntax#File%20properties).

Listing Activity entries by their own `domains` and opening their associated
Notes offers a two-hop route without this particular cross-file property
lookup. It preserves the distinction between direct Domain contribution and
material present through an Activity context. Q61 accepted this initial
presentation; a flattened contextual view remains an optional extension.

### Periodic Note Evidence

- Daily Notes supports date formats containing subfolders and opens an
  existing daily note or creates one when needed. Its template is applied
  on creation. See [Daily Notes](https://obsidian.md/help/plugins/daily-notes).
- Templater provides date calculations, file existence checks, and file
  creation. These can support on-demand weekly or monthly review creation;
  the combined flow still needs runtime validation.
  See [date functions](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/date-module.html)
  and [file functions](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html).
- Date properties store full dates such as `YYYY-MM-DD`. A week or month
  label used in a filename needs a distinct representation from a Date
  value. See [Date properties](https://obsidian.md/help/properties#Date).

The setup draft's ISO convention has also been checked against the date
interfaces. Templater exposes Moment, whose official documentation defines
`GGGG` as the ISO week-year, `WW` as the padded ISO week, and `[W]` as literal
text. `startOf("isoWeek")` starts on Monday; locale-based weekday helpers
should not be assumed equivalent. The operation mutates its Moment object,
so preserve an input date with a clone when needed.
See [Templater dates](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/date-module.html),
[Moment formatting](https://momentjs.com/docs/#/displaying/format/),
[ISO week-year](https://momentjs.com/docs/#/get-set/iso-week-year/), and
[start of time](https://momentjs.com/docs/#/manipulating/start-of/).

A local Python standard-library calculation confirmed that 2027-01-01 is
Friday of ISO 2026-W53, whose Monday is 2026-12-28. This validates the calendar
example in the draft, not the unimplemented weekly-note flow. The native
Daily Notes date format supports folder separators; complete weekly/monthly
creation and reopening still require a combined helper and runtime checks.

### Zotero Evidence Already Collected

The project documentation describes metadata, note, and PDF annotation
imports, template-driven re-import, persistent regions for local text, and
examples that append new annotations. Its import templates use Nunjucks.
See the project's [template documentation](https://github.com/community-archive/obsidian-zotero-integration/blob/main/docs/Templating.md)
and [FAQ](https://github.com/community-archive/obsidian-zotero-integration/blob/main/docs/FAQ.md).

The inspected old-vault manifest identified Zotero Integration 3.2.1, but no
plugin data.json was present. Its configured import behavior was not verified.
This observation is evidence about the old installation, not a compatibility
requirement for the new vault. Support for the author's actual book and
paper formats still needs a concrete check.

### Import Identity and Replacement Evidence

A further read-only check examined upstream implementation and identity
documentation. These findings still need confirmation against the installed
version and its Data Explorer output.

- The Integration receives Better BibTeX item data and adds values including
  `desktopURI` and citation-key aliases. Upstream item types expose
  `itemKey`, `itemID`, `libraryID`, and `uri`.
  See [item data](https://github.com/community-archive/obsidian-zotero-integration/blob/2043211d87ff2ca5db31bf587b5024eac9f49171/src/bbt/jsonRPC.ts#L292)
  and [template preparation](https://github.com/community-archive/obsidian-zotero-integration/blob/2043211d87ff2ca5db31bf587b5024eac9f49171/src/bbt/export.ts#L251).
- A local numeric item ID is not a cross-device identity. Zotero's API
  identifies an item within a user or group library by its item key.
  Citation keys can change. These distinctions matter when choosing a
  reproducible output path.
  See [Zotero identity](https://forums.zotero.org/discussion/106183/zotero-item-id-numbers),
  [API resources](https://www.zotero.org/support/dev/web_api/v3/basics#resources),
  and [Better BibTeX citation keys](https://retorque.re/zotero-better-bibtex/citing/).
- The examined exporter renders the output path from current item data and
  looks for a file at that path. It does not search existing files by item
  identity. Consequently, a changed title or citation key used in the path
  can produce a different file rather than preserve the previous location.
  This consequence is inferred from the
  [path-resolution implementation](https://github.com/community-archive/obsidian-zotero-integration/blob/2043211d87ff2ca5db31bf587b5024eac9f49171/src/bbt/export.ts#L600).
- The write replaces the rendered file as a whole, including frontmatter;
  it does not independently merge local property edits. Manually maintained
  associations therefore need an explicit ownership strategy.
  See the [write implementation](https://github.com/community-archive/obsidian-zotero-integration/blob/2043211d87ff2ca5db31bf587b5024eac9f49171/src/bbt/export.ts#L748).

## Interview Coverage

This index points to the current decisions rather than repeating them.
Question numbers refer to the design conversation.

| Discussion | Current authoritative section |
| --- | --- |
| Q1, Q5, Q7, Q9, Q11: failures and desired value | [Purpose and priorities](design.md#purpose-and-priorities) |
| Q2, Q3, Q15, Q17, Q19: reference repository, interfaces, and scope | [Scope and Workspace boundaries](design.md#scope-and-workspace-boundaries) and [evaluation scenarios](design.md#evaluation-scenarios) |
| Q4, Q12, Q18: authorship and agent participation | [Authorship and collaborative writing](design.md#authorship-and-collaborative-writing) |
| Q6, Q8, Q13, Q20, Q26: capture and refinement | [Capture and refinement](design.md#capture-and-refinement) |
| Q10, Q23: contracts and launch conditions | [Agents and maintenance](design.md#agents-and-maintenance) and [launch requirements](design.md#launch-requirements) |
| Q14, Q27: regular maintenance, journals, and light planning | [Journals and lightweight planning](design.md#journals-and-lightweight-planning) |
| Q16, Q21: Domain organization and entry points | [Organization and discovery](design.md#organization-and-discovery) |
| Q22: English writing | [English writing](design.md#english-writing) |
| Q24: semantic objects | [Model relationships](design.md#model-relationships) and [domain language](../CONTEXT.md) |
| Q25: source ownership | [Sources and Zotero](design.md#sources-and-zotero) |
| Q28: document roles and a proposed folder distinction | [Document roles](metadata.md#document-role) and [storage responsibilities](design.md#storage-responsibilities) |
| Q29: filename identity and naming convention | [Identity and naming](design.md#identity-and-naming) |
| Q30: ordinary-note locations and the Domain-entry question | [Storage responsibilities](design.md#storage-responsibilities) and [Domain entry points](design.md#domain-entry-points) |
| Q31: context-qualified names and delegated naming trade-off | [Identity and naming](design.md#identity-and-naming) |
| Q32: relationship lists and native-property support | [Relationships](metadata.md#relationships) and [native properties](metadata.md#native-properties) |
| Q33: Domain entry placement | [Domain entry points](design.md#domain-entry-points) |
| Q34: topical tags and separate workflow intent | [Native properties](metadata.md#native-properties) |
| Q35: existing structural targets and exploratory body links | [Reference boundary](metadata.md#existing-targets-and-exploratory-links) |
| Q36: standard creation and direct manual capture | [Creation baseline](metadata.md#creation-baseline) |
| Q37: task ownership and selective carry-forward | [Journals and lightweight planning](design.md#journals-and-lightweight-planning) |
| Q38: separate imported material and personal reading | [Sources and Zotero](design.md#sources-and-zotero) |
| Q39: task size and completion | [Journals and lightweight planning](design.md#journals-and-lightweight-planning) |
| Q40: working-record boundaries and independent Concept Notes | [Capture and refinement](design.md#capture-and-refinement) and [domain language](../CONTEXT.md) |
| Q41: whole-file ownership of generated Sources | [Generated Source files](metadata.md#generated-source-files) |
| Q42: distinct Activity lifecycle meanings | [Lifecycle and archive](design.md#lifecycle-and-archive) |
| Q43: explicit Domain exit and rejection of attention-based retirement | [Lifecycle and archive](design.md#lifecycle-and-archive) and [domain language](../CONTEXT.md) |
| Q44: state-based views and stable file locations | [Lifecycle and archive](design.md#lifecycle-and-archive) |
| Q45: role-specific status values | [Lifecycle semantics](metadata.md#lifecycle-semantics) |
| Q46: retained retirement entries and association maintenance | [Lifecycle and archive](design.md#lifecycle-and-archive) |
| Q47: readable names, filenames, headings, and aliases | [Names and headings](metadata.md#names-and-headings) |
| Q48: daily, weekly, and monthly entries | [Journals and lightweight planning](design.md#journals-and-lightweight-planning) |
| Q49: low-friction in-place candidates with reliable collection | [Refinement workflow](refinement.md) |
| Q50: a lightweight writing aid with delegated presentation | [Writing scaffolds](design.md#writing-scaffolds) and [shared cue](../templates/fragments/writing-cue.md) |
| Q51: read-only audits and provisional fields | [Audit and field evolution](metadata.md#audit-and-field-evolution) |
| Q52: authored reading without an Activity | [Source contexts](design.md#source-contexts) |
| Q53: reading becoming an Activity without compulsory relocation | [Source contexts](design.md#source-contexts) |
| Q54: initial optional formats and a requested admission rule | [Writing forms](metadata.md#writing-forms) |
| Q55: lightweight home navigation without attention tracking | [Organization and discovery](design.md#organization-and-discovery) |
| Q56: accepted format admission and a request to consider registration | [Admission rule](metadata.md#admission-rule-for-new-formats) and [registration follow-up](metadata.md#registration-follow-up) |
| Q57: deliberate creation context and passive incoming relationships | [Context at creation](metadata.md#context-at-creation) and [incoming discovery](metadata.md#incoming-discovery-and-authored-guides) |
| Q58: registration scope supported in principle, with drift as a design concern | [Registration follow-up](metadata.md#registration-follow-up) and [tooling](tooling.md) |
| Q59: discarding Captures without remaining retention value | [Capture disposition](design.md#capture-disposition) |
| Q60 and follow-ups: accepted write boundaries and personal-vault scale; necessary designed tooling remains a goal | [Tooling boundaries](tooling.md#exact-write-boundary), [initial capabilities](tooling.md#initial-capabilities), and [design scale](design.md#design-scale) |
| Q61: independent concurrent relationships and explicit direct-view scope | [Relationships](metadata.md#relationships) and [organization and discovery](design.md#organization-and-discovery) |
| Q62: reading-entry default without regulating ordinary writing habits | [Reading entry defaults](design.md#reading-entry-defaults-and-writing-freedom) |
| Q63: optional name and provisional filename for quick capture | [Quick-capture names](metadata.md#quick-capture-names) |
| Q64: chosen but unstarted Activities | [Lifecycle semantics](metadata.md#lifecycle-semantics) |
| Q65: personal Notes as direct Source inputs | [Relationships](metadata.md#relationships) and [domain language](../CONTEXT.md) |
| Q66: approved initial defaults and implementation; obsolete old skills retired | [Initial setup](initial-setup.md), [primary references](references.md), and [verification](verification.md) |

## Deferred Work

- [ ] Revisit old-vault access and selective migration independently of the
  new design. This is not a prerequisite for resolving the decisions above.
