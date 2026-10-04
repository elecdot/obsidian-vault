# Metadata Contract

This document owns the accepted metadata meanings and types for content
notes. It implements the meanings agreed through Q65 and the Q66 operational
baseline. The marked registry below is consumed by the implemented creators
and audits. Runtime evidence and remaining integration limits live in
[Verification](verification.md).

Model vocabulary lives in [CONTEXT.md](../CONTEXT.md); workflow rationale
lives in [the design](design.md). Templates, imports, agent writers, views,
and checks should use the same meanings.

## Document Role

`kind` is a Text property recording a content note's primary responsibility:

| Value | Primary responsibility |
| --- | --- |
| `note` | Preserve an explanation, thought, working record, or other ordinary writing |
| `source` | Describe a Source and hold relevant source material or annotations |
| `activity` | Describe an Activity and organize its entry points and useful progress information |
| `domain` | Describe a Domain and organize its questions, concepts, and entry points |

A developed explanation and a thought still being worked on both use
`kind: note`. A Journal also uses this role; its writing form is represented
separately. A Guide's organizing function does not introduce another kind.

The creator or creation flow sets the role from the intended purpose.
Moving a note or revising its explanation does not itself change that role.

### Creation Baseline

Standard template and agent creation flows supply `kind` automatically
from the intended purpose. They can carry known context and provenance into
optional relationships without requiring a sequence of classification prompts.

A direct manual Capture may temporarily omit frontmatter in `inbox/`.
General entry points and triage checks must still expose it. Establish its
role when organizing it as a standard content note.

Missing optional associations do not create tasks. Creators omit unused
optional fields; readers tolerate omitted, null, or empty optional values.
Populated values must have their registered type. Empty required fields are
reported rather than silently given a lifecycle meaning.

Activity and Domain entries require `status`; ordinary Notes do not receive
a universal maturity state. Content scope is declared in the registry.
Repository documents, templates, examples, and other support files do not
require content-note metadata. Unexpected Markdown locations are surfaced
for a scope decision.

### Context at Creation

Global quick capture does not infer relationships solely from the file
currently open. A contextual creation action supplies its explicitly chosen
Activity, Source, or Domain without another round of classification. It
does not automatically copy all associations from the surrounding Note.
Agent creation uses the same deliberate context from the request.

A Capture may carry known relationships while it remains in `inbox/` for
later disposition. Being related to an Activity does not mean that the
material is already understood, organized, or selected for its authored Guide.
When a relationship is uncertain, omit the structural value and preserve
useful context in the writing instead of guessing.

## Writing Forms

`format` is an optional Text property for ordinary `kind: note` content.
Its initial formal values are:

| Value | Meaning | Intended use |
| --- | --- | --- |
| `journal` | A date- or period-centered personal record | Journal creation, reopening, and chronological discovery |
| `review` | Deliberate reflection over a period of learning or work | Weekly learning and monthly direction or organization reviews |
| `guide` | An independent authored route through questions and related material | Finding explanatory entry points across contexts |

The relevant creation flow supplies the value. Most explanations, reading
records, and experiment Notes can omit `format`; the author need not choose
a formal subtype before writing.

The organizing purpose of a Domain or Activity entry is already expressed
by its `kind`; it does not need `format: guide` as a second label. A Note
may use headings, lists, or a recurring writing pattern without registering
that pattern as a format. Templates and fragments need not correspond
one-to-one with formal values.

### Admission Rule for New Formats

Q56 accepted the following admission rule. A new formal value must satisfy
all of these conditions:

1. **A named use.** Identify a recurring user action and its concrete
   consumer: a retrieval view, creation flow, review step, or maintenance
   operation. State what the author will do with the result. Merely wanting
   a list of a newly invented category is not enough. An established need
   or a concrete first-use scenario can supply the evidence; no arbitrary
   note-count threshold is required.
2. **A necessary distinction.** Explain why existing roles, relationships,
   scoped queries, or a body heading do not serve that action adequately.
   A different template layout alone does not require a format. The value
   must describe a writing form, not a topic, context, maturity judgment,
   or commitment to future work.
3. **A usable boundary.** Give a short definition, an example, a near-miss
   that does not qualify, and a rule for mixed Notes. The author and agent
   should be able to assign it without guessing at the author's mastery.
   When purposes cannot be distinguished usefully, retain the ordinary Note
   rather than forcing a choice or splitting it merely for classification.
4. **An owned contract.** Define who or which creation flow assigns it,
   when its meaning needs review, and which writers, readers, and checks
   depend on it. Record this beside the formal definition before making
   shared tooling depend on the value.

For example, `experiment` would not qualify simply because several Notes
contain commands or results. It could qualify if the author repeatedly needs
to locate experiment records for comparison or reruns across Activities,
existing associations cannot identify that set adequately, and the meaning
and maintenance of an experiment record can be stated clearly.

Try a writing pattern in the body, a fragment, or a scoped workflow first
when its value is uncertain. Provisional-field support does not silently
expand the formal `format` enum.

If a format's consuming workflow disappears, reconsider the value. Retire
it from new creation when appropriate, document treatment of existing uses,
and update consumers and checks together. Retirement is a maintenance
decision; it does not automatically delete properties or rewrite old Notes.

### Registration Follow-up

The author supports registration of formal contracts and dependent entry
points in principle, subject to a design that limits maintenance cost and
drift. This document currently owns field and format contracts.

Q60's narrowed boundaries are accepted in principle: rules stay visible and
editable, daily writing remains independent, and tool writes are controlled.
This document is the current registration home for adopted fields and formats.
The [tooling guidance](tooling.md) retains registration and automation as
intended capabilities, with a scope tied to useful writing and maintenance.

Where creation and audit need the same mechanical facts, share a small
readable definition. The [marked registry](#executable-field-registry) is now
read by the core shared between the command-line and Obsidian adapters.
Native property settings and Base scope/lifecycle coverage are checked for
agreement. Semantics remain in this document; no generator overwrites it.

## Relationships

The following properties are optional Lists:

| Property | Meaning | Main use |
| --- | --- | --- |
| `domains` | Domains to which the note contributes | Domain entry points and cross-domain discovery |
| `activities` | Learning or work Activities associated with the note | Activity organization and later return |
| `sources` | Materials the note uses or cites | Provenance and continued reading |

Each may contain more than one reference. Use a list even when there is
only one value. A relationship can be omitted while it is unknown or
irrelevant; the note must remain discoverable through general entry points.

These relationships are independent and can coexist on the same Note.
A Note may explicitly belong to an Activity context and contribute directly
to one or more Domains, while also citing Sources. Its `domains` need not
copy or match the Domains of its Activities.

For example, with both target entries already present:

```yaml
kind: note
activities:
  - "[[activities/kernel-paper-reproduction/introduction]]"
domains:
  - "[[domains/ai-systems]]"
```

The Note appears in both direct relationship views. Omitting `domains`
leaves it outside a Domain's direct association view; the Activity route,
authored Guide links, and ordinary backlinks can still provide access.
An Activity's Domain association alone does not supply the Note's direct
Domain membership.

Domain and Activity references identify their respective entries. A `sources`
reference may point to a Source record, an existing personal Note used as
direct input or evidence, or a direct source location. A cited Note keeps its
primary `kind`; it does not need to become `kind: source` or gain a duplicate
Source wrapper merely because another Note draws on it.

Keep merely related material in body links. A source relationship preserves
the basis of the writing; it does not establish that a cited claim is correct
or understood. A bibliography or Source-record view should filter `kind: source`
explicitly rather than assume every internal `sources` target has that role.
Structural validation must allow the accepted personal-Note targets while
preserving the existing-target requirement.

Initial external locators use HTTP(S) or Zotero URLs. Offline checks resolve
explicit paths and unambiguous short links conservatively; ambiguous targets
need qualification or native resolution. The Obsidian adapter uses the app's
resolver. Organizational entries must be in content scope; examples cannot
become live context accidentally. The [audit boundary](#audit-and-field-evolution)
governs validation.

Body links continue to express the local meaning of a passage. Relationship
properties record the main associations needed for organization; they do
not need to repeat every body link.

### Incoming Discovery and Authored Guides

Maintain a relationship on the referring Note, including a Capture when
the relationship is known. The target entry can discover it through incoming
links or a derived view; creation does not need to append a member link to
the entry's authored body.

Passive discovery describes this direction of maintenance. It does not
change the meaning of the relationship or introduce a weaker relationship
type. A broad backlink may be only a mention; a view for Activity association
must inspect `activities`, and equivalent views use their respective fields.

Guides remain selective authored routes. Their prose and chosen links change
when doing actual organizing work, rather than whenever a related Capture
is created. The complete derived view must still expose relevant Captures
outside that selection. Its presentation remains to be implemented.

### Existing Targets and Exploratory Links

Internal references in `domains`, `activities`, and `sources` point to
existing notes. An entry can be short and still developing; its existence
provides a stable destination for navigation.

Omit a structural relationship while its target or meaning is not ready.
Do not create a refinement task solely because such a field is absent.
Direct external Source references do not require a local Source note.

Body links may name concepts whose notes have not been created. They can
preserve a possible semantic connection without making it a structural
dependency or a commitment to create the target.

An unresolved internal structural reference violates this contract and is
an audit error. Exploratory body links do not have the same requirement.
Concrete detection and reference-repair procedures remain to be implemented.

### Assignment and Ownership

- The author leads Domain associations; agents can propose or help maintain
  them in the context of the requested work.
- A known creation context can supply an Activity association. Additional
  associations should reflect actual use.
- Imports and explicit citations can supply Source references. Preserve
  provenance when copying or extracting material.

### Obsidian Representation

Use the same type for a property name throughout the vault. Internal links
in YAML lists must be quoted, for example `- "[[ai-systems]]"`.
Keep the core contract flat so it can be edited through Obsidian Properties.
See [Properties](https://obsidian.md/help/properties).

## Generated Source Files

A Zotero-generated Source file is owned by the import process as a whole,
including its frontmatter. Every value written there must be reproducible
from its source data and the controlled import template or configuration.

Maintain personal classification, interpretations, and reading content in
authored Notes or Guides. Those notes can refer to the imported Source and
bring it into their Domain or Activity context.

Generated aliases or bibliographic properties may come from source data;
local manual additions must not be relied on as durable state in a
regenerated file. This ownership rule applies to Zotero-generated files,
not to every manually maintained note with `kind: source`.

A Source context can also contain authored reading Notes. Sharing a folder
does not make those Notes importer-owned. Import and audit tools must
identify the designated generated files and assets rather than treating
the entire `sources/` tree as generated or exempt from authored-note checks.
See [Source contexts](design.md#source-contexts).

The snapshot profile writes `managed-by: zotero`, `source-id` (the canonical
synced, library-scoped item URI), and `zotero-uri` (the desktop selection
location). The stable path derives from the same identity. Audit reports moved
managed Sources, and import refuses unowned or mismatched destinations.
Local-only identities need a separately verified profile.

Optional reproducible metadata includes `authors`, `year`, `citation-key`,
`url`, and `zotero-tags`. The year is Text; imported tags are not automatically
copied to native `tags`. This profile does not imply live selection transport
has passed; see [the recorded limit](verification.md#source-integration).

## Lifecycle Semantics

`status` is a Text property with values determined by `kind`:

| Applicable kind | Value | Meaning |
| --- | --- | --- |
| `activity` | `planned` | Chosen for future learning or work, but not yet started |
| `activity` | `active` | Part of the work the author is pursuing |
| `activity` | `paused` | Intentionally suspended, with possible resumption |
| `activity` | `completed` | Its intended completion condition has been met |
| `activity` | `abandoned` | The author has decided to stop pursuing it |
| `domain` | `active` | Retained as an accepted organizing entry |
| `domain` | `retired` | Explicitly withdrawn or replaced as an organizing entry |

A planned Activity can have an entry and receive contextual Captures before
joining the current-work view. Mark it `active` when the author explicitly
starts pursuing it. Merely creating the entry, editing its metadata, or adding
related material does not automatically start the Activity. A possibility
the author has not chosen to undertake can remain a Capture.

Creation for a chosen future Activity uses `planned`; an explicit request
to start or record work already underway can use `active`. Keep `paused`
for suspended work rather than using it to mean not yet started.

A Domain remains `active` regardless of how recently it received attention.
Retirement is a deliberate decision. Ordinary `note` content does not
receive a universal maturity or completion status.

These decisions affect entry points and views while retaining file
locations. Changes to an Activity or Domain do not automatically change the
meaning or validity of its associated Notes.

Preserve existing references to a retired Domain. Prefer active Domains
when making new structural associations. Reorganization may change those
associations after their meaning has been reviewed; retirement alone does
not rewrite them.

Creation exposes the planned/active choice for an Activity; missing required
state is a structural finding. Retirement reasons and successor routes remain
authored prose without another mandatory field set.

## Dates and Periods

`date` is the first day of the represented period, stored as a real
`YYYY-MM-DD` Date. `period` is Text with values `day`, `week`, or `month`.
Journal and review formats require both. If either is used on another ordinary
Note, supply both consistently; a writing cadence is not enforced.

Creators use calendar months and Monday-based ISO weeks, with the ISO week-year
in weekly filenames. They use the registry's author timezone for today's
default and accept an explicit represented date. These are not file creation
timestamps and do not impose universal created/updated properties.

## Native Properties

Preserve Obsidian's native meanings and plural names:

| Property | YAML shape | Native purpose |
| --- | --- | --- |
| `tags` | List | Native tags, with the Tags property type in Obsidian |
| `aliases` | List | Alternative names used in discovery and link completion |
| `cssclasses` | List | Presentation classes |

These properties remain available where useful. Their inclusion in a
particular creation flow depends on its purpose.

Use `tags` for optional topical keywords. Domain relationships and tags
do not need to mirror one another. Review, refinement, and task intentions
will use a separately designed workflow convention.

Keep topical keywords useful and intentional. The snapshot importer preserves
Zotero tags in `zotero-tags` rather than automatically mixing them into native
`tags`; any future mapping needs an explicit purpose and maintained rule.

Tags can occur in frontmatter or in the body. A view intended to include
all native tags should use `file.tags` or `file.hasTag(...)`; `note.tags`
represents only the frontmatter property. See
[Tags](https://obsidian.md/help/tags) and
[Bases file properties](https://obsidian.md/help/bases/syntax#File%20properties).

Aliases supplement an actual link target and retain meaningful readable
names and variants for discovery. `cssclasses` affects presentation and
carries no content-role or relationship meaning.

A custom `title` property does not acquire automatic synchronization with
the filename or body H1. It is not part of the default naming contract.

## Names and Headings

Create ordinary authored notes from one readable English name. Derive the
initial filename according to its scope and use the name as the initial
H1. Add the readable name and meaningful variants to `aliases` when useful
for discovery and natural-language linking.

Later changes to heading wording do not automatically rename the file.
A deliberate rename follows the reference-maintenance procedure.
Aliases serve name compatibility; the contract does not require permanent
equality between the H1 and the first alias.

Date-based Journals use the period convention in [Operations](operations.md).
Generated Source records use library-scoped identity rather than mutable
titles or citation keys.

### Quick-capture Names

Quick capture accepts an optional meaningful English name. When none is
supplied, use a provisional English-prefixed timestamp filename, such as
`capture-2026-10-04-213045.md`. This is an accepted exception to requiring a
readable subject name before creating an ordinary Note.

The example is a naming pattern, not an event record. Creation must handle
collisions without overwriting files. Mixed-language writing can be retained
immediately; naming does not need to precede capturing the thought.

When organizing a Capture selected for long-term retention, give it a useful
English name and maintain its references during the rename. The provisional
filename does not introduce a separate immutable identifier, title property,
or permanent synchronization between filename and heading.

## Audit and Field Evolution

Default audits are read-only. They report violations of established
structural contracts as errors: for example, malformed frontmatter, a wrong
type for a governed field, an invalid role-specific state, or an unresolved
internal structural reference. The exact check inventory still needs to be
implemented and verified.

Semantic quality concerns and proposed conventions are review suggestions.
An audit does not infer that the author understands a claim or that a Note
must be refined. Missing optional relationships, permitted unclassified
Captures in `inbox/`, and exploratory body links are not structural errors.

The author may try a new property before giving it a formal contract.
Preserve provisional fields and surface their undefined meaning or
maintenance responsibility as review suggestions. They cannot silently
redefine an established property or conflict with its vault-wide type.

Define a field before incorporating it into a shared template, making a
view or script depend on it, or adopting it for long-term use. Its contract
records meaning, type, applicability, accepted values or empty states,
maintenance responsibility, and validation behavior. Add the definition to
this contract and update the relevant writers, readers, and checks together.

An audit finding does not authorize an edit or removal. Repairs belong to
the requested editing or maintenance work; uncertainty about meaning stays
visible for discussion. Provisional properties do not create automatic Tasks.

## Executable Field Registry

This authored block is the mechanical source read by creators and audits.
The surrounding prose owns meaning and judgment. Change the relevant meaning
and this definition together; no generator overwrites this document.
Dates describe the selected period, and optional empty values are tolerated.

<!-- vault-contract:start -->
```json
{
  "version": 1,
  "timezone": "Asia/Shanghai",
  "contentRoots": [
    "inbox",
    "knowledge",
    "activities",
    "domains",
    "sources",
    "journals"
  ],
  "contentFiles": [
    "home.md",
    "maintenance.md"
  ],
  "supportRoots": [
    "docs",
    "templates",
    "bases",
    "scripts",
    "tests",
    "examples",
    ".agents",
    ".obsidian",
    "node_modules",
    ".git",
    ".trash"
  ],
  "supportFiles": [
    "README.md",
    "AGENTS.md",
    "CONTEXT.md"
  ],
  "properties": {
    "kind": {
      "type": "text",
      "values": [
        "note",
        "source",
        "activity",
        "domain"
      ],
      "required": true
    },
    "format": {
      "type": "text",
      "values": [
        "journal",
        "review",
        "guide"
      ],
      "kinds": [
        "note"
      ]
    },
    "status": {
      "type": "text",
      "byKind": {
        "activity": [
          "planned",
          "active",
          "paused",
          "completed",
          "abandoned"
        ],
        "domain": [
          "active",
          "retired"
        ]
      },
      "requiredKinds": [
        "activity",
        "domain"
      ]
    },
    "domains": {
      "type": "list",
      "reference": "domain"
    },
    "activities": {
      "type": "list",
      "reference": "activity"
    },
    "sources": {
      "type": "list",
      "reference": "source"
    },
    "aliases": {
      "type": "list"
    },
    "tags": {
      "type": "list"
    },
    "cssclasses": {
      "type": "list"
    },
    "date": {
      "type": "date",
      "kinds": [
        "note"
      ],
      "requiredFormats": [
        "journal",
        "review"
      ]
    },
    "period": {
      "type": "text",
      "values": [
        "day",
        "week",
        "month"
      ],
      "kinds": [
        "note"
      ],
      "requiredFormats": [
        "journal",
        "review"
      ]
    },
    "managed-by": {
      "type": "text",
      "values": [
        "zotero"
      ],
      "kinds": [
        "source"
      ]
    },
    "source-id": {
      "type": "text",
      "kinds": [
        "source"
      ]
    },
    "zotero-uri": {
      "type": "text",
      "kinds": [
        "source"
      ]
    },
    "url": {
      "type": "text",
      "kinds": [
        "source"
      ]
    },
    "authors": {
      "type": "list",
      "kinds": [
        "source"
      ]
    },
    "year": {
      "type": "text",
      "kinds": [
        "source"
      ]
    },
    "citation-key": {
      "type": "text",
      "kinds": [
        "source"
      ]
    },
    "zotero-tags": {
      "type": "list",
      "kinds": [
        "source"
      ]
    }
  },
  "creators": {
    "capture": {
      "kind": "note",
      "root": "inbox",
      "optionalName": true
    },
    "note": {
      "kind": "note",
      "root": "knowledge",
      "cue": true
    },
    "guide": {
      "kind": "note",
      "format": "guide",
      "root": "knowledge",
      "cue": true
    },
    "domain": {
      "kind": "domain",
      "root": "domains",
      "status": "active",
      "related": true
    },
    "activity": {
      "kind": "activity",
      "root": "activities",
      "entry": "introduction",
      "status": "planned",
      "related": true
    },
    "source": {
      "kind": "source",
      "root": "sources",
      "entry": "source",
      "related": true
    }
  }
}
```
<!-- vault-contract:end -->

## Implementation Follow-up

Core scope, empty values, period fields, lifecycle requirements, and creation
rules are implemented. Remaining integration work is recorded in
[Verification](verification.md), including the stopped live Zotero selection
investigation. Future locator/profile extensions need a defined consumer and
checks; their absence does not make ordinary writing invalid.
