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

- For orientation, read [README.md](README.md).
- When using or changing model terminology, read [CONTEXT.md](CONTEXT.md).
- Before changing content conventions, metadata, workflows, or automation,
  read [the design](docs/design.md) and the relevant
  [open questions](docs/design-questions.md).
- For metadata, creation, import, view, or audit work, read the
  [metadata contract](docs/metadata.md).
- Before editing a note, inspect its purpose, the author's draft, and the
  directly relevant sources and surrounding notes.
- For English editing of settled ideas, use the available
  `write-better-english` skill. Resolve material uncertainty about meaning
  in the writing discussion.

## Implementation and Design Maintenance

Q66 is approved: implement the initial setup and its verification. This is
an independent Git repository. Commit completed, verified phases using
Conventional Commits, preserving any concurrent author changes.

Record newly confirmed decisions in their owning document during the
discussion. Keep definitions in CONTEXT.md, workflow decisions in
docs/design.md, field contracts in docs/metadata.md, and unresolved choices
and factual checks in docs/design-questions.md.

Label proposals and unverified assumptions where they appear. Update the
question record when a decision is resolved or its dependencies change.
Use the accepted [document roles](docs/metadata.md#document-role) when reasoning
about `kind`. Consult the open questions before extending the metadata contract
or treating a proposed folder layout as an established convention.

Work within the user's current request. Continue authorized documentation
work while implementation choices remain under discussion.

When adding conventions or tooling, apply the
[design scale](docs/design.md#design-scale): identify the writing or
maintenance action it improves and design proportionate support for it.
Preserve needed capabilities, rationale, and unresolved trade-offs when
simplifying. Distinguish implementation alternatives from deferred expansion;
use concrete note scenarios to resolve remaining choices.

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
