# Using the Vault

The vault remains ordinary Markdown. Templates fill a new Note once; changing
a template does not rewrite existing writing. The [metadata contract](metadata.md)
and its marked registry are readable source files, not generated output.

## Obsidian Setup

Open this repository folder as a separate vault. Install Templater from the
community plugin directory and enable it. The committed configuration sets:

- Template commands: `templates/commands`.
- User scripts: `scripts/templater` (desktop Obsidian).
- No automatic execution on file creation, folder rules, or startup.
- Native Daily Notes: `journals/daily`, format `YYYY/YYYY-MM-DD`, template
  `templates/daily`. Core Daily Notes opens an existing day without replacing it.
- New manual Notes go to `inbox`; attachments go to the containing folder's
  `attachments/`; native internal-link updates are enabled.

Start from [[home]]. In an existing Markdown Note, use the command palette:

| Command | Use |
| --- | --- |
| Templater: Insert vault-menu | Creation, reading, periods, inspection, rename, and selected snapshot import |
| Templater: Insert capture | Quick capture; blank name is allowed |
| Templater: Insert inspect | Read-only findings, refinement candidates, and open standalone checklist items |

The menu shortcut is Ctrl/Cmd+Shift+N; capture is Ctrl/Cmd+Shift+C. Use the
**Insert** commands, not Templater's separate **Create from template** commands.
The launcher preserves selected text and opens the destination after template
execution finishes. Its supported insert flow cancels before creating files.
Using Create from template may leave Templater's own initial draft; the helper
refuses that mode rather than repurpose an unknown file.

Create a Domain, Activity, or Source entry before selecting it as creation
context. A context is deliberate; unrelated Notes open in another tab do not
supply inherited relationships. Add other meaningful relationships through
Properties or the command-line options below.

Native Bases supply discovery. The inspection command supplies structural
checks and scoped body inspection. Base tables are editable Obsidian views;
their display itself does not rewrite the authored Guide.

## Command-line Operations

Install the locked YAML dependency once with `npm ci` in this repository.
Node 22 or later is required. Helpers select the repository containing their
scripts by default; use `--root PATH` deliberately when operating on a copy.

```sh
npm run vault -- capture
npm run vault -- activity --name "Kernel study"
npm run vault -- note --name "Run comparison" --context activities/kernel-study/introduction.md
npm run vault -- note --name "Independent explanation" --domain domains/ai-systems.md --source sources/example/source.md --dry-run
npm run vault -- reading --context sources/example/source.md
npm run vault -- period --period week --date 2027-01-01
npm run audit
npm run vault -- candidates
npm run vault -- tasks
npm run vault -- inventory
npm test
npm run check
```

These are command examples, not a claim those example targets exist. All
structural targets must exist before creation. Repeat `--domain`, `--activity`,
or `--source` for multiple independent associations. `--context` chooses
placement and one association; relationship-only options do not change placement.
Use `--body-file PATH` to supply a draft without shell quoting its content.

Creation prints the path or a read-only preview. A period command reopens a
matching existing record; ordinary-name collisions fail without replacement.
Reading returns an existing related personal Note, offers candidate paths if
several exist, or creates an initial reading Note. `--name` explicitly creates
another. Audits return exit code 1 for structural errors and leave files alone.

Offline link resolution is conservative: ambiguous short targets are reported
for review rather than silently choosing one. In Obsidian, the adapter uses
the app's resolver. Neither audit proves the author's understanding.

## Source Import

The controlled importer accepts one explicit item snapshot with a stable
synced Zotero URI, a title, and available creators, tags, notes, and annotations.
Use Templater's menu to paste the JSON, or:

```sh
npm run vault -- import-zotero --input /path/to/selected-item.json --dry-run
npm run vault -- import-zotero --input /path/to/selected-item.json
```

It writes `sources/zotero-<users-or-groups>-<library-id>-<item-key>/source.md`.
The URI's library scope and key determine the location. A changed title or
citation key changes reproducible metadata, not the path. Re-import requires
matching `managed-by: zotero` and `source-id`; an unowned target is refused.
Personal reading files are never part of that write.

Zotero tags are retained as `zotero-tags`, not automatically copied into
native `tags`. Zotero comments remain labelled as such. Unknown or local-only
identities are rejected until a portable profile is established; a manual
Source record remains possible. An unsynced library is not silently assigned
a made-up stable identity. Original documents remain in Zotero.

A direct selection adapter is retained in `scripts/zotero-transport.cjs`,
but is not exposed as a working menu action. Live verification stopped at an
unsupported selection response before any Source write, and the author asked
to retain the findings rather than keep retrying. The snapshot route remains
available. See [verification](verification.md) for the precise evidence and
the boundary for resuming that integration later.

## Maintenance and Rename

For an intentional move or rename, use the helper menu, the Obsidian file
explorer, or native CLI with an explicit vault and exact path. Check the
target vault first. FileManager/native rename uses Obsidian's link-update
setting; a shell rename does not offer that assurance.

```sh
obsidian vault=new-vault vault info=path
obsidian vault=new-vault move path=inbox/example.md to=knowledge/example.md
```

The helper refuses managed Source renames because their locations follow
import identity. Source retirement/migration needs an explicit maintenance
operation, not a normal personal-Note rename.

Review findings where useful. Preserve provisional fields while deciding
their purpose, keep valid historical references to retired Domains, and
adopt refinement suggestions deliberately. The inspector recognizes standalone
root-level callouts and checklist items outside code and comments; it does not
infer author intent from every Markdown quotation or embedded document.

When changing a shared convention, update its semantic explanation and marked
registry, then run tests/checks and inspect affected templates/views. Custom
tool failures do not prevent manual writing. See [primary references](references.md)
and [verification](verification.md) for implementation evidence and limits.
