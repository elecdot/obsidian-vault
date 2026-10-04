# Implementation References

The author declared the enclosing vault's old skills obsolete on 2026-10-04.
They are not implementation instructions or authorities for this vault.
The adopted content model is the author's design; application behavior is
checked against primary documentation and then against the actual runtime.

| Area | Primary reference | Implementation consequence |
| --- | --- | --- |
| Frontmatter and native properties | [Properties](https://obsidian.md/help/properties) | Flat values, quoted YAML links, consistent property types |
| Bases | [Syntax](https://obsidian.md/help/bases/syntax), [functions](https://obsidian.md/help/bases/functions) | Native fields and explicit filters; direct associations use the host Note; cross-file property refresh is limited |
| Creation and rename APIs | [Obsidian API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) | Use native link resolution and FileManager rename for app-aware changes; filesystem renames alone do not promise reference updates |
| Templater adapters | [User scripts](https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html), [Obsidian module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/obsidian-module.html), [system prompts](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/system-module.html) | Explicitly pass tp; expose a user-script function; use the app APIs rather than obsolete template conventions |
| Periods | [Daily Notes](https://obsidian.md/help/plugins/daily-notes), [Templater dates](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/date-module.html), [Moment](https://momentjs.com/docs/) | Calendar date is separate from creation time; ISO week-year must handle January correctly |
| Refinement | [Callouts](https://obsidian.md/help/callouts), [Search](https://obsidian.md/help/plugins/search) | Custom callouts are supported; search is discovery, while scoped inspection distinguishes markers from quoted examples |
| CLI verification | [Obsidian CLI](https://obsidian.md/help/cli) | Explicit vault targeting; installed executable alone is not proof that a vault is configured |
| Agent skills | [Agent Skills specification](https://agentskills.io/specification) | SKILL.md name/description, focused instructions, references to the maintained local contracts |
| YAML parsing | [yaml package](https://eemeli.org/yaml/) | Use a real parser, including malformed and duplicate-key detection, instead of inventing a frontmatter parser |
| Zotero adapter | [Integration templates](https://github.com/community-archive/obsidian-zotero-integration/blob/main/docs/Templating.md), [Zotero resource identity](https://www.zotero.org/support/dev/web_api/v3/basics#resources) | Explicit per-file ownership and library-scoped stable identity; never assume title-based re-import paths are stable |

The earlier design's native-property, link, callout, period, and Bases claims
were rechecked against these sources before implementation. No obsolete
requirements for mandatory topic tags, format on every Note, one template
per kind, or filename/alias synchronization are adopted. Existing human
decisions do not need to be replaced simply because the old skills are retired.

Runtime results and reproducible commands belong in the operating/verification
documentation; a documentation reference is not a claim of a passing UI test.
