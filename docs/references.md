# Implementation References

Use these primary sources for application behavior. The vault's content
model is defined by its own contracts. Check relevant runtime behavior in
the application; documentation alone does not establish successful use.

| Area | Primary reference | Implementation consequence |
| --- | --- | --- |
| Frontmatter and native properties | [Properties](https://obsidian.md/help/properties) | Flat values, quoted YAML links, consistent property types |
| Bases | [Syntax](https://obsidian.md/help/bases/syntax), [functions](https://obsidian.md/help/bases/functions), [pinned skill and local changes](../.agents/skills/vault-bases/README.md) | Native fields and explicit filters; direct associations use the host Note; cross-file property refresh is limited |
| Creation and rename APIs | [Obsidian API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) | Use native link resolution and FileManager rename for app-aware changes; filesystem renames alone do not promise reference updates |
| Templater adapters | [User scripts](https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html), [Obsidian module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/obsidian-module.html), [system prompts](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/system-module.html) | Explicitly pass tp; expose a user-script function; use the app APIs rather than obsolete template conventions |
| Periods | [Daily Notes](https://obsidian.md/help/plugins/daily-notes), [Templater dates](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/date-module.html), [Moment](https://momentjs.com/docs/) | Calendar date is separate from creation time; ISO week-year must handle January correctly |
| Refinement | [Callouts](https://obsidian.md/help/callouts), [Search](https://obsidian.md/help/plugins/search) | Custom callouts are supported; search is discovery, while scoped inspection distinguishes markers from quoted examples |
| CLI verification | [Obsidian CLI](https://obsidian.md/help/cli), [pinned skill and platform notes](../.agents/skills/vault-obsidian-cli/README.md) | Consult for native CLI tasks. Verify the target vault path before making changes. |
| Agent skills | [Agent Skills specification](https://agentskills.io/specification) | SKILL.md name/description, focused instructions, references to the maintained local contracts |
| YAML parsing | [yaml package](https://eemeli.org/yaml/) | Use a real parser, including malformed and duplicate-key detection, instead of inventing a frontmatter parser |
| Git coverage | [Recording changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository), [remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) | Distinguish files present locally, committed history, and commits pushed to another copy |
| Maintenance tool environment | [mise installation](https://mise.jdx.dev/installing-mise.html), [Node selection](https://mise.jdx.dev/lang/node.html), [task configuration](https://mise.jdx.dev/tasks/task-configuration.html), [Node releases](https://nodejs.org/en/about/previous-releases) | Select a supported LTS release, pin its exact version, and wrap the existing npm commands with portable tasks |
| Obsidian settings and vault registration | [Data storage](https://obsidian.md/help/data-storage), [Manage vaults](https://obsidian.md/help/manage-vaults) | Keep machine-local vault registration separate from portable vault settings; remove stale list entries without deleting vault files |
| Zotero adapter | [Integration templates](https://github.com/community-archive/obsidian-zotero-integration/blob/main/docs/Templating.md), [Zotero resource identity](https://www.zotero.org/support/dev/web_api/v3/basics#resources) | Explicit per-file ownership and library-scoped stable identity; never assume title-based re-import paths are stable |

Verification coverage and environment limits belong in
[Verification](verification.md).
The [tooling guide](tooling.md) identifies the maintained implementations.
