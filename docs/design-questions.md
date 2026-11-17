# Open Questions and Observations

Use this file for consequential unresolved choices and factual checks.
Accepted workflows live in [Design](design.md), fields in [Metadata](metadata.md),
and actual runtime results in [Verification](verification.md). Resolved items
leave this list; Git retains the earlier design interview and setup history.

## Current Readiness Discussion

The selected [MoE research task](first-use.md) has an agreed Workspace
boundary and one-cycle readiness criterion. English-only content is not a
stage gate. The current task is to make the documentation usable and then
exercise that real writing and retrieval path.

| Open item | Evidence or decision needed | Scope |
| --- | --- | --- |
| First real use | A real question, the author's writing, successful return, and continuation in the intended desktop vault | Initial usability; does not prove long-term effectiveness |
| Current desktop environment | Identify the intended runtime vault before relying on the historical `P:\new-vault` checks | Relevant creation and view behavior; no assumption that an old copy matches this checkout |
| GitHub copy | When implementing the backup arrangement, identify the remote and which content is committed and pushed | Git is the intended approach; this checkout had no configured remote on 2026-11-17. This is not an added first-use gate. |

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
