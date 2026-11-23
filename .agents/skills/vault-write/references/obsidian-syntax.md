# Obsidian syntax for paired writing

## Links and embeds

For a passage the author may want to revisit, prefer a heading link such as
`[[domains/ai-systems#Direct notes|direct notes in AI Systems]]`. The author
usually hovers to preview the source. In a table cell, escape the label
separator as `\|`. Follow the [target naming convention](../../../../docs/metadata.md#names-and-headings)
if several Notes share a name.

To show the section alongside the explanation, use `![[domains/ai-systems#Direct notes]]`.
In `![[bases/related.base#Direct notes]]`, the fragment selects a Base view.
The [AI Systems Guide](../../../../domains/ai-systems.md) embeds two views of the same Base.

## Properties and tags

In YAML, `domains: ["[[domains/ai-systems]]"]` is a list with one link.
Using `moe/routing` as an example, `tags: [moe/routing]` illustrates
the property spelling and `#moe/routing` the body spelling. Use the
[relationship contract](../../../../docs/metadata.md#relationships) for what a link means
and [native properties](../../../../docs/metadata.md#native-properties) for tag ownership.

## Annotations and technical writing

- **Callouts.** `> [!tip]- Writing cue` starts a collapsed prompt. Prefix the
  following body lines with `>` as in the [writing cue](../../../../templates/fragments/writing-cue.md).
  For an author-adopted refinement candidate, use the [refinement convention](../../../../docs/operations.md#refinement).
- **Editorial comments.** `%%The reading guide links to this heading. Update its link if the heading changes.%%`
  is useful when that link has been checked. The author sees the comment in
  source mode. Reading view hides it, and the vault inspector skips task and
  refinement markers inside it. Use the [authorship guidance](../../../../docs/design.md#authorship-and-collaborative-writing)
  to decide what belongs in a comment, in the visible text, or in the conversation.
- **Math.** Use `$n_e$` for an inline quantity. For a displayed equation, put
  `$$` on its own line above and below the expression, e.g. `n_{\max}=\max_e n_e`.
  Obsidian renders both with MathJax.
- **Diagrams.** Put a relationship the passage already establishes in a
  `mermaid` fence as shown below.

  ```mermaid
  flowchart LR
      Router --> Expert
  ```

- **Footnotes.** Pair a marker such as `[^scope]` with a definition on a
  separate line, e.g. `[^scope]: Counts refer to a single batch.` For a short
  aside, `^[Counts refer to a single batch.]` is valid in Reading view.

[Upstream syntax reference](https://github.com/obsidianmd/obsidian-skills/blob/b110b2f8e9eb1f287892f937050dfd40af862cbb/plugins/obsidian/skills/obsidian-markdown/SKILL.md)
