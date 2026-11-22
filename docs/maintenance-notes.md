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
| GitHub copy | When implementing the backup arrangement, identify the remote and which content is committed and pushed | This checkout has no configured remote. Git is the intended approach; remote setup is not an added first-use gate. |

## Pilot plan for Obsidian Bases

The author observed that opening agent-created Bases in desktop Obsidian
rewrote the files. On 2026-11-22, all eight working copies under
`bases/` parsed to the same YAML data as their versions at `4ea90ea`.
The desktop copies lost a header comment and some outer YAML quotes.
In [Recent writing](../bases/content.base), `sort` and `limit` moved
below `order`. These differences obscure later edits in Git. The comparison
covers the saved data. Desktop results and first-save stability for a new
agent edit still need a trial.

The proposed trial applies the [on-demand approach](design.md#design-scale)
to one Base.

1. When a task creates or edits a Base, route it from
   [vault-maintain](../.agents/skills/vault-maintain/SKILL.md) to a short
   section in [Tooling](tooling.md). Put the upstream
   [Bases skill](https://github.com/obsidianmd/obsidian-skills/tree/main/plugins/obsidian/skills/obsidian-bases)
   beside the Bases syntax reference in [References](references.md).
   Start with a link. A local copy can be considered if offline access is
   needed. Consult the CLI skill only when the task uses the desktop CLI.
2. Start the edit from a desktop-saved Base of the same kind. Use the
   [metadata contract](metadata.md#relationships) for relationships and
   content scope. Keep durable rationale in the tooling guidance. Preserve
   any YAML quoting the expression needs, as in the filter beginning with
   `!kind` in [Maintenance](../bases/maintenance.base).
3. Try one representative edit in a temporary copy. Run the
   [repository checks](tooling.md#checks-and-their-limits) and capture
   the file before opening it. Embed the copy in a temporary host Note in
   the target desktop vault and inspect its rows. For
   [Direct notes](../bases/related.base), a Note directly linked to the
   host Domain should appear and one linked only to its Activity should
   stay out. Compare the file after the first native save with the captured
   copy. If opening alone produces no write, change a view
   name in the UI and restore it to exercise the desktop writer.
4. The pilot passes when the rows match the intended relationships and the
   native save adds no file diff. If it rewrites the file, keep the diff,
   adjust the local example, and retry. Record any untested desktop step
   alongside the offline result.

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

## Recoverable Obsidian Preferences

The [app configuration](../.obsidian/app.json) records the editing defaults
carried forward. Minimal and its companion settings were deferred. These
observations keep useful prior settings available after the temporary
configuration snapshot is removed.

| When it helps | Previous setting |
| --- | --- |
| Scanning and editing Markdown source | In Editor settings, the author enabled line numbers, indentation guides, heading and indent folding, and readable line length. |
| Reducing interface controls | The previous appearance hid the Ribbon and view header. These controls are available in Obsidian's native settings. |
| Switching how Markdown is displayed | `Mod+Shift+M` was bound to `editor:toggle-source`. Obsidian uses `Ctrl+E` or `Cmd+E` for switching between Reading and Editing views. |
| Returning to a note or rearranging text | In Hotkeys, `Alt+Left/Right` navigated backward and forward, `Alt+L/R` toggled the sidebars, and `Alt+Up/Down` moved lines. |
| Inserting fragments and navigating template placeholders | `Mod+M` invoked core Templates. Templater had automatic cursor jump enabled and used `Shift+Enter` for the next cursor position. The current vault menu places the cursor through its own script. |
| Finding links and attachments | Backlinks showed results at the bottom of the note. Quick Switcher showed attachments and other file types. |
| Working in Canvas | The scroll wheel panned the canvas, with snapping to grid and objects enabled. |
| Exporting a Note as PDF | The previous export used A4 portrait, included the file name as the title, and kept the scale at 100 percent. |
| Naming pasted screenshots | Paste Image Rename automatically renamed images using `{{fileName}}` and always appended a number with `-` as the separator. This affects the saved attachment name. |
| Editing Markdown tables | Advanced Tables bound `Tab` and `Enter` and used normal formatting. Check whether the table behavior fits the current editing bindings before adding it. |

Use the [Obsidian settings reference](https://obsidian.md/help/settings) and
[Hotkeys help](https://obsidian.md/help/hotkeys) to find the native controls.
[Git coverage](operations.md#git-and-file-coverage) applies when a preference
becomes part of regular use.

## Deferred Extensions

| Candidate | Reopen when | Known boundary |
| --- | --- | --- |
| Live selected-item Zotero import | The author explicitly resumes integration work | Zotero remains part of the Source workflow. Live import and its portable settings are deferred. The last selection failed before export or writes. Obtain actual selection and export samples before changing the adapter. See [evidence](verification.md#source-integration). |
| Domain list flattened through Activities | Direct Notes plus Activity entry points cause a concrete retrieval problem | Cross-file `file.properties` and `file.backlinks` have refresh limitations in the documented API; the proposed combined query and refresh strategy are unverified. See [references](references.md). |
| Additional Source identity/locator profiles | Actual material cannot use the supported snapshot identity or direct locators | Define identity, ownership, and affected consumers before extending the contract. |
| New formal formats or generated support files | An identifiable writing or maintenance action benefits | Apply the format admission rule or specify authoritative inputs, outputs, preview, and ownership; no generic framework is planned. |
| Old-vault content access and migration | Requested separately | The [recoverable preferences](#recoverable-obsidian-preferences) cover the settings snapshot. Legacy layout and obsolete skills do not constrain this vault. |
