# Agent Instructions

Help the author develop and use personal understanding through this vault.
Preserve the purpose of the current writing or maintenance task.

## Scope

Treat this directory as a separate vault root. Resolve vault-relative paths
here and use its local documents for terminology, content placement,
metadata, and workflows. These local contracts take precedence over the
content conventions of an enclosing vault.

Use relative Markdown links in repository documentation. Content-note links
follow this vault's identity and reference conventions.

The enclosing repository's old skills, including its Obsidian skill series,
are obsolete and were never used. Do not load or follow them. Use the
primary references in [References](docs/references.md) and this vault's
current contracts. New local skills must follow current authoritative specs.

## Route the Work

- For vault entry points and layout, see [README.md](README.md).
- To look up or change model terminology, consult [CONTEXT.md](CONTEXT.md).
- Before changing content conventions, metadata, workflows, or automation,
  read the relevant sections of [Design](docs/design.md) and
  [Maintenance notes](docs/maintenance-notes.md).
- For fields, relationships, and content scope, consult the relevant section
  of the [metadata contract](docs/metadata.md).
- For command usage, consult [Operations](docs/operations.md). For verified
  behavior and runtime limits, consult [Verification](docs/verification.md).
- For paired writing use [vault-write](.agents/skills/vault-write/SKILL.md).
  For organization use [vault-organize](.agents/skills/vault-organize/SKILL.md).
  For audits, vault diagnosis, or shared tool and convention changes use
  [vault-maintain](.agents/skills/vault-maintain/SKILL.md).
- Before editing a note, inspect its purpose, the author's draft, and the
  directly relevant sources and surrounding notes.
- For English editing of settled ideas, use the available
  `write-better-english` skill. Resolve material uncertainty about meaning
  in the writing discussion.

## Design and Maintenance

This is an independent Git repository. Commit completed, verified phases
using the [commit convention](docs/operations.md#commit-messages), preserving
concurrent author changes.

During the discussion, record confirmed decisions that will guide future use
or maintenance in their owning document. When choosing where a change belongs,
consult the [documentation guide](docs/README.md).

Label proposals and unverified assumptions where they appear. Update the
maintenance record as evidence or dependencies change, following the
[maintenance workflow](docs/design.md#vault-maintenance).
Use the [document roles](docs/metadata.md#document-role) when reasoning about
`kind`. Keep proposed conventions and practice suggestions distinct from
adopted rules; a discussion of a possible improvement is not its adoption.

Work within the user's current request. Continue authorized documentation
work while implementation choices remain under discussion.

When adding conventions or tooling, apply the
[design scale](docs/design.md#design-scale): identify the writing or
maintenance action it improves and design proportionate support for it.
Preserve useful capabilities and rationale when simplifying. Use concrete
note scenarios to distinguish design friction from developing writing and
maintenance practices. Deferred possibilities are not an implementation backlog.

## Preserve Authorship and Purpose

Use the author's outline, reasoning, and stated intent as the basis for
collaborative writing. When an ambiguity changes a claim, relationship, or
degree of certainty, surface it for discussion.

Keep excerpts, imported annotations, agent proposals, and the author's
explanations attributable. Preserve source context when extracting material.
Treat an agent suggestion as optional until the user's request or response
adopts it.

Use the existing request and evidence to guide organization. Bring unresolved
changes to intended meaning or important domain relationships back into the
discussion.

## Maintain the Repository

Keep each definition or rule in its owning document and link to it elsewhere.
Use README files for human-facing orientation and local maintenance guidance.
Keep agent instructions focused on routing and behavior.

Update documentation with changes to the behavior it describes. Once
contracts and tools exist, update and verify the affected writers, readers,
and checks together.

For documentation changes, check links, terminology, decision status, and
consistency with the accepted design. Report the checks performed and
material implementation gaps.
