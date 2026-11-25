# Vault Maintenance Notes

Use this working record for day-to-day observations and investigations about
the vault itself. The [maintenance workflow](design.md#vault-maintenance)
defines its scope and when items leave. Accepted workflows live in
[Design](design.md) and field definitions in [Metadata](metadata.md).
[Verification](verification.md) records coverage and runtime limits.

## Open Checks

| Open item | Evidence or decision needed | Scope |
| --- | --- | --- |
| First real use | Complete the [MoE writing and retrieval cycle](first-use.md#agreed-use-and-first-assessment) in the intended desktop vault. | Initial usability of the vault. |
| Portable plugin preferences | On 2026-11-23, GitHub `main` and local HEAD both pointed to `f1ac0c9`, which includes Home, Maintenance, AI Systems, and the tracked Obsidian settings. The local plugin list also enabled `open-vscode` and `obsidian-zotero-desktop-connector`. Revisit their inclusion in Git if the author wants those preferences on another setup. | [Git coverage](operations.md#git-and-file-coverage). |

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
- **An internal Source reference can resolve to a Base.** Running
  `node scripts/vault.cjs note --name Probe --source bases/related.base --dry-run`
  previews a Note with `[[bases/related.base]]` in `sources`. The shared
  [validator](../scripts/core.cjs) accepts that target without a finding.
  The [relationship contract](metadata.md#existing-targets-and-exploratory-links)
  requires an existing Note for an internal structural reference. A reader
  following this citation would reach a view definition instead of the
  intended research material.

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

**Documentation ownership.** [Design](design.md#design-scale) and this
section both say to keep the current command menu while observing use.
The author finds Design demanding to review end to end. Familiarity with
the design and agent-assisted search help the author find relevant sections
during daily use.

Use the next change to a documentation rule to see how easily its owner
can be found. Open a focused maintenance pass if finding the owner
repeatedly requires searching several files or if an update leaves a second
copy of the guidance out of date. Consider an architecture decision record
in `docs/adr/` when a specific change requires revisiting a decision that is
costly to reverse and the current documents leave the original trade-off
unclear.

## Recoverable Obsidian Preferences

The [tracked settings](operations.md#git-and-file-coverage) carry forward the
preferences already adopted. The older settings below are available to
reconsider when they help with a specific action during regular use. Minimal
and its companion settings remain deferred.

| When it helps | Previous setting |
| --- | --- |
| Scanning and editing Markdown source | In Editor settings, the author enabled indentation guides, heading and indent folding, and readable line length. |
| Switching how Markdown is displayed | `Mod+Shift+M` was bound to `editor:toggle-source`. Obsidian uses `Ctrl+E` or `Cmd+E` for switching between Reading and Editing views. |
| Rearranging text | In Hotkeys, `Alt+Up/Down` moved lines. |
| Inserting fragments and navigating template placeholders | `Mod+M` invoked core Templates. Templater had automatic cursor jump enabled and used `Shift+Enter` for the next cursor position. The current vault menu places the cursor through its own script. |
| Moving around a Canvas | The scroll wheel panned the canvas. |
| Exporting a Note as PDF | The previous export used A4 portrait, included the file name as the title, and kept the scale at 100 percent. |

Use the [Obsidian settings reference](https://obsidian.md/help/settings) and
[Hotkeys help](https://obsidian.md/help/hotkeys) to find the native controls.
[Git coverage](operations.md#git-and-file-coverage) applies when a preference
becomes part of regular use.

## Deferred Extensions

| Candidate | Reopen when | Known boundary |
| --- | --- | --- |
| Obsidian CLI from WSL | The author is working in WSL and wants to choose a route for the intended action. | For opening a Note or inspecting a rendered view, evaluate the Windows desktop app via `Obsidian.com` or a Linux desktop instance in WSL. [Obsidian Headless](https://obsidian.md/help/headless) is a candidate for Sync or Publish. These routes are untested here. |
| Live selected-item Zotero import | The author explicitly resumes integration work. | Collect the actual selection mapping and an exporter sample before changing the adapter. Portable settings for live import are also deferred. See the [failed selection](verification.md#source-integration). |
| Domain list flattened through Activities | Direct Notes plus Activity entry points cause a concrete retrieval problem | Cross-file `file.properties` and `file.backlinks` have refresh limitations in the documented API; the proposed combined query and refresh strategy are unverified. See [references](references.md). |
| Additional Source identity/locator profiles | Actual material cannot use the supported snapshot identity or direct locators | Define identity, ownership, and affected consumers before extending the contract. |
| New formal formats or generated support files | An identifiable writing or maintenance action benefits | Apply the format admission rule or specify authoritative inputs, outputs, preview, and ownership; no generic framework is planned. |
| Old-vault content access and migration | Requested separately | The [recoverable preferences](#recoverable-obsidian-preferences) cover the settings snapshot. Legacy layout and obsolete skills do not constrain this vault. |
