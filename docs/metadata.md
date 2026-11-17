# Metadata Contract

This document owns content-note field meanings, types, applicability, and
ownership. The [marked registry](#executable-field-registry) is read by the
creators and audits. Change meaning and mechanical definitions together.
[CONTEXT](../CONTEXT.md) defines terms, [Design](design.md) owns workflows,
and [Tooling](tooling.md) describes consumers and checks.

## Document Role

`kind` is Text and records a content Note's primary responsibility:

| Value | Responsibility |
| --- | --- |
| `note` | An explanation, thought, working record, or other ordinary writing |
| `source` | A record describing a Source and holding material or annotations |
| `activity` | An Activity entry organizing relevant work and useful progress information |
| `domain` | A Domain entry organizing questions, concepts, and routes |

An ordinary Note keeps its role as its explanation develops or its location
changes. Journals use `kind: note`. A Guide is an organizing function, not a
separate kind. A Note cited as a Source keeps its primary role.

### Creation Baseline

Standard creators supply `kind` and required values, omitting unused optional
fields. Readers tolerate omitted, null, or empty optional values; populated
values must have their registered types. Empty required values are findings.
Activity and Domain entries require `status`; ordinary Notes have no universal
maturity state.

Direct manual capture may temporarily omit frontmatter in `inbox/`. Keep it
visible through general discovery and establish its role when organizing it
as a standard content Note. Missing optional associations do not create tasks.

The registry declares content and support scope. Home and Maintenance are
content; repository documents, templates, examples, configuration, and scripts
need no content-note metadata. Markdown in `attachments/` is excluded from
content classification. Unexpected Markdown locations are reported for a
scope decision, not silently classified or ignored.

### Context at Creation

Context comes from the chosen action or explicit agent request. A contextual
creator carries its selected Activity, Source, or Domain association; it does
not copy all relationships from that entry or infer context from an unrelated
open tab. A Capture may carry known associations while remaining in `inbox`.
Omit uncertain structural values and preserve useful context in the writing.
[Design](design.md#capture-and-refinement) owns the default choice of context.

## Writing Forms

`format` is optional Text on `kind: note`:

| Value | Meaning and consumer |
| --- | --- |
| `journal` | A date- or period-centered personal record; creation and chronological discovery |
| `review` | Deliberate reflection over a learning/work period; review entry and retrieval |
| `guide` | An independent authored route through questions and material; explanatory navigation |

Most writing omits `format`. Activity and Domain entries already express their
organizing role through `kind` and do not add `format: guide`. A prose pattern
or template does not automatically require a registered form.

### Admission Rule for New Formats

A new formal value needs all four:

1. **A named use:** a user action and concrete retrieval, creation, review,
   or maintenance consumer. An established need or a first-use scenario can
   supply evidence; no arbitrary note count or new category alone justifies it.
2. **A necessary distinction:** existing roles, associations, scoped queries,
   or headings do not adequately serve that action. The value describes a
   writing form, not a topic, context, maturity judgment, or future commitment.
3. **A usable boundary:** definition, example, near-miss, and treatment of
   mixed Notes. Assignment must not require guessing the author's mastery.
   Keep ordinary Notes when the distinction does not help; do not split for
   classification alone.
4. **An owned contract:** who assigns it, when its meaning needs review,
   and which writers, readers, and checks depend on it.

For example, commands and results alone do not justify `experiment`. A
recurring need to find comparable experiment records across Activities might,
if existing associations are insufficient and the boundary is clear.
Try a body pattern or fragment when the value is uncertain. Provisional-field
support does not expand the formal `format` values. If a consumer disappears,
reconsider new creation and existing uses together; retirement does not
automatically delete properties or rewrite Notes.

## Relationships

The following optional properties are Lists, including for a single value:

| Property | Meaning |
| --- | --- |
| `domains` | Domains to which the Note contributes |
| `activities` | Learning or work Activities associated with the Note |
| `sources` | Materials the Note uses or cites |

They are independent and may coexist. A Note's Domain associations need not
copy or match those of its Activities. For example, with existing targets:

```yaml
kind: note
activities:
  - "[[activities/kernel-study/introduction]]"
domains:
  - "[[domains/ai-systems]]"
```

This Note appears in both direct association views. Without its own `domains`
it remains reachable through the Activity rather than the Domain's direct
Note list. A field may be omitted while unknown or irrelevant.

Domain and Activity targets identify their respective entries in live content
scope. A `sources` target may be a Source record, an existing personal Note
used as direct input or evidence, or an external locator. A cited personal
Note needs no duplicate Source wrapper. Source-record views filter `kind: source`;
they do not treat every cited Note as a Source-record file.

Supported external locators are HTTP(S) and Zotero URLs. A local external
workspace path can be recorded in the body; it is not a supported `sources`
property value. The offline resolver accepts explicit paths and unambiguous
short targets, reporting ambiguous ones for review; Obsidian uses its native
resolver. A source link preserves provenance without proving its claim.

Keep merely related material and the local meaning of a citation in body
links. Relationship properties need not repeat every body link.

### Incoming Discovery and Authored Guides

Maintain associations on the referring Note. Derived views provide access
without appending every new member to an entry's authored Guide. Typed views
inspect their specific relationship field; a broad backlink may be only a
mention. Guides select and explain routes rather than duplicate membership.
Displaying a Base does not rewrite a Guide, though its table can edit metadata.

### Existing Targets and Exploratory Links

Internal structural references point to existing Notes. Omit a relationship
while its target or meaning is not ready; that absence creates no task.
Direct external Source locators need no local Source record. Exploratory body
links may point to unwritten concepts without committing to create them.
Missing internal structural targets are audit errors; exploratory body links
have a different purpose. [Operations](operations.md#maintenance-and-rename)
describes reference-aware moves and renames.

### Assignment and Ownership

The author leads Domain associations; agents can propose or maintain them
within the requested work. Chosen creation context can supply an Activity
association. Imports and explicit citations can supply Source references.
Preserve provenance when copying or extracting material.

### Obsidian Representation

Keep properties flat, with one configured type per name. Quote wikilinks in
YAML Lists, as in the example above. This supports native Properties editing;
see [Properties](https://obsidian.md/help/properties).

## Generated Source Files

Zotero-generated Source files are importer-owned as whole files, including
frontmatter. Every generated value must be reproducible from source data and
controlled import configuration. Keep personal classification, interpretation,
and reading in authored Notes that link or embed the material. Local changes
to generated properties or prose are not durable across re-import.

Ownership is file-specific, including in [Source contexts](design.md#source-contexts).
It does not extend to manually maintained Source records or nearby personal
reading. Importers and audits distinguish designated managed files and assets.

The snapshot profile uses `managed-by: zotero`, a canonical synced,
library-scoped item URI in `source-id`, and a desktop locator in `zotero-uri`.
Its stable path derives from library scope and item key, not title or citation
key. Audit reports moved managed Sources; import refuses unowned or mismatched
destinations. Local-only identity needs a separately verified profile.

Optional reproducible fields are `authors`, `year`, `citation-key`, `url`,
and `zotero-tags`. `authors` and `zotero-tags` are Lists; the others are Text,
including `year`. Zotero tags are not automatically copied into native `tags`.
The profile does not establish [live-transport success](verification.md#source-integration).

## Lifecycle Semantics

`status` is required Text on Activity and Domain entries, with values by kind:

| Kind | Value | Meaning |
| --- | --- | --- |
| `activity` | `planned` | Chosen work that has not started |
| `activity` | `active` | Work the author is pursuing |
| `activity` | `paused` | Intentionally suspended, with possible resumption |
| `activity` | `completed` | Its intended completion condition has been met |
| `activity` | `abandoned` | The author has decided to stop pursuing it |
| `domain` | `active` | Retained as an accepted organizing entry |
| `domain` | `retired` | Explicitly withdrawn or replaced as an organizing entry |

Activity creation defaults to `planned`; an explicit start or work already
underway can use `active`. Creating an entry, adding material, or editing
metadata does not itself start the Activity. An unchosen possibility can
remain a Capture. `paused` does not mean unstarted.

A Domain remains active regardless of recent attention. Preserve retired
entries and existing references; prefer active Domains for new associations.
Reasons and successors are authored prose, not extra required fields.
Lifecycle changes affect views while keeping paths and associated Notes'
independent meanings. Ordinary Notes do not receive these lifecycle values.

## Dates and Periods

`date` is a real `YYYY-MM-DD` Date for the first day of the represented period.
`period` is Text: `day`, `week`, or `month`. Journal and review formats require
both. If either is used on another ordinary Note, supply both consistently.
They describe the represented period, not file creation or modification time.

Creators use calendar months, Monday-based ISO weeks, the ISO week-year for
weekly paths, and the registry's author timezone for today's default. Explicit
represented dates are allowed. [Period examples](operations.md#periods) show
paths and defaults; they do not restrict other valid form/period combinations
or impose a writing cadence.

## Native Properties

| Property | Type | Purpose |
| --- | --- | --- |
| `tags` | List | Optional topical keywords with Obsidian's native Tags type |
| `aliases` | List | Readable alternative names and variants for discovery |
| `cssclasses` | List | Presentation classes |

Tags and Domain associations need not mirror each other. Refinement and task
intent use [their own operations](operations.md#refinement). Imported
`zotero-tags` stay separate unless an explicit maintained mapping is adopted.
Use `file.tags` or `file.hasTag(...)` for both body and frontmatter tags;
`note.tags` covers only frontmatter. See [Tags](https://obsidian.md/help/tags)
and [Bases properties](https://obsidian.md/help/bases/syntax#File%20properties).

Aliases do not change identity; `cssclasses` carries no semantic role.
A custom `title` is ordinary metadata without filename or H1 synchronization
and is not part of the default contract.

## Names and Headings

Ordinary content filenames use readable lowercase English words separated
by hyphens. Derive the initial filename and H1 from one readable name; add
useful aliases. Independently reusable Notes get descriptive names; local
entries may use names such as `introduction.md` with path-qualified references.
No universal immutable ID or globally unique basename is required.

Use unambiguous wikilink targets for internal content links, with display text
as needed. Generated links use known paths; native completion may supply a
shorter resolving target. Handwritten path abbreviations need verification.
Later H1 edits do not rename files or require matching the first alias.
Intentional moves include [reference maintenance](operations.md#maintenance-and-rename).
Dated names follow period rules; managed Source names follow external identity.

### Quick-capture Names

Capture names are optional. Without a name, creators use a provisional
English-prefixed timestamp such as `capture-2026-10-04-213045.md`, avoiding
collisions without overwriting. This illustrative pattern permits immediate
mixed-language capture. When organizing a retained Capture, give it a useful
English name and maintain its references; the provisional name introduces no
new ID field or permanent title synchronization.

## Audit and Field Evolution

Default audits report without editing. Structural errors include malformed
metadata, invalid governed types/values, missing required values, and missing
internal structural targets. [Tooling](tooling.md#checks-and-their-limits)
describes the implemented check scope and its limits.

Semantic quality and proposed conventions are review suggestions. Valid raw
Captures, optional omissions, and exploratory body links are not errors.
A new provisional property may be tried before it has a formal contract;
preserve it and surface undefined meaning or ownership for review. It cannot
silently redefine a governed field or conflict with its vault-wide type.

Before shared tooling or long-term conventions depend on a field, define
meaning, type, applicability, values and empty states, ownership, and checks.
Update its consumers with the contract. Findings do not authorize repairs,
deletions, or tasks; those follow the requested work and adopted intent.

## Executable Field Registry

This authored block supplies mechanical definitions to creators and audits.
The surrounding prose owns their meaning. Its path and markers are part of
the current reader interface; there is no generator overwriting this file.

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
