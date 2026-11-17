# Vault Maintenance Notes

Use this working record for day-to-day observations and investigations about
the vault itself. The [maintenance workflow](design.md#vault-maintenance)
defines its scope and when items leave. Accepted workflows live in
[Design](design.md) and field definitions in [Metadata](metadata.md).
[Verification](verification.md) records coverage and runtime limits.

## First-use Checks

The selected [MoE research task](first-use.md) has an agreed Workspace
boundary and one-cycle readiness criterion. English-only content is not a
stage gate. The [pre-use review](design.md#launch-requirements) addresses
definite problems; actual writing and retrieval will inform further changes.

| Open item | Evidence or decision needed | Scope |
| --- | --- | --- |
| First real use | A real question, the author's writing, successful return, and continuation in the intended desktop vault | Initial usability; does not prove long-term effectiveness |
| Current desktop environment | Identify the intended runtime vault and verify plugin installation before relying on the historical `P:\new-vault` checks | This checkout contains Templater configuration but no plugin runtime files; another copy's installation is unverified. |
| GitHub copy | When implementing the backup arrangement, identify the remote and which content is committed and pushed | This checkout has no configured remote. Git is the intended approach; remote setup is not an added first-use gate. |

## Maintenance Tool Environment

Within the [agreed environment requirements](design.md#scope-and-workspace-boundaries),
mise is selected for tool versions and simple command entry points, with
exact versions as the default. Repository configuration and tasks have not
yet been implemented.

| Open item | Evidence or decision needed | Scope |
| --- | --- | --- |
| Task implementation | Provide clear mise entry points over the existing maintenance commands | Simplicity and discoverability justify tasks; this does not require rewriting the npm scripts. |
| LTS upgrade policy | Resolve how supported LTS releases are selected and adopted while keeping exact project pins, and whether npm needs an independent version | Obsidian runs its adapter internally using its own YAML parser; the external CLI uses Node and the npm YAML dependency. |
| Windows setup and verification | Choose the future Windows-native vault location and verify native tool selection and checks there | The author uses neither previously registered new-vault location; WSL directories are isolated. Historical Obsidian checks do not verify the future Windows setup. |

## Confirmed Tool Defects

- **Empty frontmatter is rejected.** The shared [parser](../scripts/core.cjs)
  rejects `---\n---\nCapture body\n` as `Unclosed frontmatter`; an additional
  blank line between the delimiters makes it parse. Empty properties are
  valid for a [raw Capture](metadata.md#creation-baseline). The audit reports
  `yaml.invalid` and skips body inspection, hiding its refinement markers and
  tasks. The parser needs to accept zero property lines while retaining its
  checks for genuinely unclosed or non-mapping frontmatter.
- **Continue reading can return support material.** Running
  `npm run vault -- reading --context examples/reading/source.md --dry-run`
  returns `examples/reading/reading-notes.md` as existing writing. The
  [CLI reader](../scripts/io.cjs) returns before the creator's content-scope
  check. Both its context and candidate Notes need the live-content boundary;
  the [Obsidian reader](../scripts/obsidian.cjs) already filters contexts but
  also needs that boundary on candidate Notes. This contradicts the
  [example isolation rule](../examples/README.md).

## Practice and Design Observations

The author treats personal note-taking habits as part of long-term
maintenance. Review concrete experiences before deciding whether a problem
calls for a model, tool, or practice change. The following are discussion
prompts, not adopted routines, additional metadata, or first-use gates:

- When an idea appears again, can existing writing be found and developed?
  Consider whether separate explanations have distinct purposes or have
  become duplicate maintenance work.
- When a conclusion changes, can the relevant explanation and affected
  references be found? The meaning of the correction remains a writing judgment.
- When the original title or project is forgotten, which clues help return
  to the writing? Try search, aliases, Guides, and Activity/Domain routes as
  needed rather than prescribe a new search mechanism in advance.

Keep the current command actions for observation; command-palette use is the
author's preferred route. A legal raw Capture without `kind` is absent from
Home's default Recent writing view but appears in All content and Maintenance
Captures. Whether that distinction causes missed writing remains a use question.

The proposed separate restore exercise was not adopted. Obsidian remains the
primary reader. Git coverage is described in [Operations](operations.md#git-and-file-coverage);
no recurring recovery routine or reader-parity requirement follows from it.

## Deferred Extensions

| Candidate | Reopen when | Known boundary |
| --- | --- | --- |
| Live selected-item Zotero import | The author explicitly resumes integration work | Selection failed before export or writes; the raw mapping was not retained. Obtain actual selection/export samples before changing the adapter. See [evidence](verification.md#source-integration). |
| Domain list flattened through Activities | Direct Notes plus Activity entry points cause a concrete retrieval problem | Cross-file `file.properties` and `file.backlinks` have refresh limitations in the documented API; the proposed combined query and refresh strategy are unverified. See [references](references.md). |
| Additional Source identity/locator profiles | Actual material cannot use the supported snapshot identity or direct locators | Define identity, ownership, and affected consumers before extending the contract. |
| New formal formats or generated support files | An identifiable writing or maintenance action benefits | Apply the format admission rule or specify authoritative inputs, outputs, preview, and ownership; no generic framework is planned. |
| Old-vault access and selective migration | Requested separately | Legacy layout and obsolete skills do not constrain this vault. |
