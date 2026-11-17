# Using the Vault

Read and write in Obsidian. Use ordinary search, links, and file browsing
alongside the helpers. [Design](design.md) explains workflow choices;
[Metadata](metadata.md) owns field semantics.

## Choose Where to Write

Continue an existing relevant Note when possible. For reading, use its chosen
Source or Activity context. If context or placement is undecided, capture in
`inbox/`; a quick-capture name is optional. An intentionally independent
explanation can start in `knowledge/`. These defaults do not require moving
every retained idea out of its original context.

Search or enter through [Home](../home.md), a Domain, or an Activity. A Note
with only an Activity association is reached through that Activity. The
[Maintenance entry](../maintenance.md) includes Captures and unassociated
writing; a legal raw Capture without `kind` does not appear in Home's default
Recent writing view, but is present in All content and Maintenance Captures.

## Obsidian Setup

Open this repository folder as a separate vault. Install and enable Templater
from the community plugin directory. The maintained configuration uses:

- Commands in `templates/commands` and desktop user scripts in `scripts/templater`.
- No script autorun on startup or file creation, and no folder rules.
- Native Daily Notes in `journals/daily`, format `YYYY/YYYY-MM-DD`, using `templates/daily`.
- New manual Notes in `inbox`, attachments in the containing folder's
  `attachments/`, and native internal-link updates enabled.

From an existing Markdown Note, use the command palette:

| Command | Use |
| --- | --- |
| Templater: Insert capture | Quick capture; blank name is allowed |
| Templater: Insert vault-menu | Contextual writing, reading, periods, entries, inspection, rename, and snapshot import |
| Templater: Insert inspect | Read-only findings, refinement candidates, and standalone checklist items |

The current menu actions remain available for observation. Menu and capture
shortcuts are Ctrl/Cmd+Shift+N and Ctrl/Cmd+Shift+C. Other menu actions are
choices within the menu, not separately registered palette commands.

Use **Insert**, not Templater's **Create from template**. The supported flow
preserves selected text, cancels before creating files, and opens new authored
Notes for editing after the heading. Imported material opens for reading.
Create from template may leave Templater's own draft; the helper refuses
that mode rather than repurpose an unknown file.

Create an entry before selecting it as structural context. The selected
context supplies placement and its association, without inheriting unrelated
relationships from open tabs. Other associations can be added in Properties.
Base tables can edit properties; their display does not rewrite authored Guides.

## Periods

Use native Daily Notes or the menu's day/week/month actions. Existing entries
reopen without replacing writing. Choose an explicit represented date when
needed; missing periods and unfinished tasks are not automatically backfilled.

These illustrative defaults all correspond to the date 2027-01-01:

| Entry | Path | Values beyond `kind: note` |
| --- | --- | --- |
| Daily | `journals/daily/2027/2027-01-01.md` | `format: journal`, `period: day`, `date: 2027-01-01` |
| Weekly | `journals/weekly/2026/2026-W53.md` | `format: review`, `period: week`, `date: 2026-12-28` |
| Monthly | `journals/monthly/2027/2027-01.md` | `format: review`, `period: month`, `date: 2027-01-01` |

Weeks start Monday; their folder and filename use the ISO week-year, which
can differ from the calendar year. The registry timezone is Asia/Shanghai.
`date` records the period's first day. Other valid form/period combinations
are allowed; these defaults impose no review cadence.

## Tool Setup and Upgrades

Install [mise](https://mise.jdx.dev/installing-mise.html). On Windows, use
PowerShell and `scoop install mise`, or another installation method from
the mise guide, then reopen the terminal. Work in the Windows-native vault
directory. WSL/Linux uses its own checkout and its own mise installation.

From the repository root, run the same commands on Windows and Linux:

```sh
mise trust
mise install node
mise run setup
mise run verify
```

[mise.toml](../mise.toml) pins the maintenance Node version; npm comes with
that Node installation. `setup` installs the locked project dependency
tree using `npm ci`. Tasks select the project tools without requiring
shell activation. Inspect them with `mise tasks`; check the selected tools
with `mise exec -- node --version` and `mise exec -- npm --version`.

| Command | Behavior |
| --- | --- |
| `mise run setup` | Install locked npm dependencies; run after cloning or dependency changes |
| `mise run test` | Run behavioral tests in temporary vaults |
| `mise run check` | Check the contract, support links, YAML assets, and content |
| `mise run audit` | Report structural findings without changing files |
| `mise run vault -- ACTION OPTIONS` | Run a helper with its action and options |
| `mise run verify` | Run both tests and structural checks; does not reinstall dependencies |

The existing npm scripts remain available. To run one explicitly in the
project environment, use `mise exec -- npm test`, for example. The package's
Node compatibility range is separate from the exact maintenance pin.

For a deliberate tool upgrade, choose a supported LTS release and write its
exact version. The following selects the current LTS release at upgrade
time, rather than leaving an `lts` alias in the project:

```sh
mise use --pin node@lts
mise run setup
mise run verify
```

Review and commit the `mise.toml` change with its verification. A tool
upgrade does not itself update project libraries. Use npm for deliberate
library dependency changes, and review `package.json` and `package-lock.json`
together. Shared JavaScript also needs compatibility with Obsidian's runtime.

Ordinary Obsidian actions use the application's runtime and YAML parser;
the command-line npm dependency is not required to run the Templater menu.
Install and verify Templater separately as described in
[Obsidian setup](#obsidian-setup).

## Command-line Operations

Helpers select the repository containing their scripts; `--root PATH`
explicitly targets another copy. Run these examples from that repository
using the pinned tools:

```sh
mise run vault -- capture
mise run vault -- activity --name "Kernel study" --status active
mise run vault -- note --name "Run comparison" --context activities/kernel-study/introduction.md
mise run vault -- note --name "Independent explanation" --domain domains/ai-systems.md --source sources/example/source.md --dry-run
mise run vault -- reading --context sources/example/source.md
mise run vault -- period --period week --date 2027-01-01
mise run audit
mise run vault -- candidates
mise run vault -- tasks
mise run vault -- inventory
```

These are command examples, not existing research records. Referenced entries
must already exist. Repeat `--domain`, `--activity`, or `--source` for multiple
associations. `--context` chooses placement and one association; the other
relationship options do not change placement. Use `--body-file PATH` for a
draft and `--dry-run` to preview creation.

Ordinary-name collisions fail without replacement. Reading returns existing
related personal writing, offers candidates when several exist, or creates
a Note when needed; `--name` explicitly creates another. Periods reopen.
Audits return exit code 1 for structural errors and leave files unchanged.
Ambiguous offline links are reported for review; the native adapter resolves
through Obsidian. Neither result establishes the author's understanding.

## Refinement

Mark an adopted candidate near its passage in an authored Note:

```markdown
> [!refine] Explain the boundary
> The example above seems to depend on an unstated assumption; explaining it could help later reuse.
```

State what may be worth developing and why. Keep the marker outside quoted
material and code; include a source route when the passage is elsewhere.
For generated Source material, put the candidate in a separate authored Note
that references it. Agent suggestions enter Notes only when adopted or when
recording them was explicitly requested.

Use Maintenance, native Search, or the inspector to return to candidates.
The marker in the original Note is the maintained record; the discovery view
is not a second manual list. Include personal reading under `sources/` while
excluding managed Sources, templates, docs, examples, and generated reports.
Native Search can match quoted examples; the inspector excludes code,
comments, nested quotations, and managed material. Revisit the actual passage
before interpreting a match. Bases handles metadata, not these body markers.

Choose candidates relevant to current work. Improve the existing Note,
develop an independently useful explanation, retain the marker, or remove it
when no longer useful. After development, a result link or short explanation
can preserve the connection. Candidates impose no deadline or empty-queue
requirement. An adopted action can become a Task with one completion record.

## Source Import

The controlled importer takes one explicit JSON snapshot with a stable synced
Zotero URI, title, and available creators, tags, notes, and annotations.
Paste it through the menu or use:

```sh
mise run vault -- import-zotero --input selected-item.json --dry-run
mise run vault -- import-zotero --input selected-item.json
```

Output is `sources/zotero-<users-or-groups>-<library-id>-<item-key>/source.md`.
Re-import requires matching `managed-by` and `source-id` and preserves personal
reading. [Metadata](metadata.md#generated-source-files) defines ownership and
identity. Unknown/local-only identities are refused; manual Source records
and direct citations remain possible. Originals stay in Zotero. Numbered
annotation headings can change on import; prefer a precise Zotero locator.

Live selection is stopped and is not a working menu action. Its failure
preceded any Source write; resume only on an explicit integration request
with actual selection/export samples. See [Verification](verification.md#source-integration).

## Maintenance and Rename

Use the helper menu, native file explorer, or native CLI with an explicit
vault and exact path for moves. Confirm the target vault first:

```sh
obsidian vault=new-vault vault info=path
obsidian vault=new-vault move path=inbox/example.md to=knowledge/example.md
```

Native rename follows Obsidian's link-update setting; a shell rename has no
such assurance. Check affected references. Managed Source renames are refused
by the helper because their paths follow import identity; migration requires
an explicit operation. References maintained in other repositories require
separate attention when a linked vault path changes.

For tool or convention changes, follow [Tooling](tooling.md#change-tools-or-conventions).
Use `mise run verify` and `mise run audit` as appropriate to the change.
These are maintenance checks, not prerequisites for ordinary writing.

## Git and File Coverage

The intended approach is local Git history plus a GitHub copy for notes and
core configuration. Remote setup and coverage remain an
[open check](maintenance-notes.md#first-use-checks).

Git history covers committed files; a remote copy covers the commits pushed
to it. Untracked, ignored, and uncommitted material is outside that committed
copy. Use `git status --short`, `git ls-files`, and `git remote` to inspect
coverage when setting up or changing the arrangement.

Core `.obsidian` settings are tracked. [Ignore rules](../.gitignore) exclude
workspace state, caches, trash, dependencies, and plugin runtime files.
A fresh environment installs Templater; CLI tools and dependencies follow
[tool setup](#tool-setup-and-upgrades).
Vault history does not include original documents kept outside it in Zotero.

The Windows vault list is machine-local state in
`%APPDATA%\obsidian\obsidian.json`, outside this repository. It is distinct
from the portable, vault-relative settings tracked in `.obsidian`.
When moving to another machine, open the intended Windows directory as a
vault rather than copying the global registration file. Remove obsolete
test locations through **Manage Vaults > More options > Remove from list**;
this removes the registration without deleting the vault files. See the
[settings and vault-management references](references.md).

Obsidian remains the primary reader, and no recurring restore exercise is
required. A future device setup can establish the normal clone, dependency,
and plugin setup path when it is actually needed.
