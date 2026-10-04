# Refinement Workflow

Preserve a selected passage, question, or connection close to its context,
then make it easy to find during review. A Refinement Candidate is a
possibility to develop, not a committed Task.

The author accepted in-place capture and reliable collection in Q49.
The initial marker and discovery design below implements that direction;
Its core rendering and scoped native inspection have runtime coverage; see
[Verification](verification.md) for the observed limits.

## Mark a Candidate

Use a standalone `refine` callout near the relevant passage:

```markdown
> [!refine] Explain the boundary
> The example above seems to depend on an unstated assumption; that boundary would be useful in a reusable explanation.
```

State what may be worth developing and why. A short sentence is enough when
the surrounding passage supplies the context. Preserve a source link when
the material being discussed is elsewhere.

Place the marker in authored content, outside quoted source material and
code examples. When reading a generated Source file, put the candidate in
an authored Note that references the material.

An agent can propose a candidate in its review output. Adoption by the
author, or an explicit request to record the candidate, permits placing the
marker in the author's notes.

## Find Candidates Again

Provide one shared refinement entry accessible from the main navigation and
periodic reviews. The original markers remain authoritative; the entry
collects them rather than maintaining a second manual list.

Use native Search as the initial body-marker entry. Scope it to authored
content and exclude templates, documentation, examples, generated sources,
and generated reports. Include authored reading Notes inside Source
contexts; excluding the whole `sources/` tree would hide valid candidates.
The implemented home is `maintenance.md`; it combines native discovery with
the scoped inspector and the registered content/ownership rules.

An agent or read-only command should report the source path, location, cue,
and enough surrounding context to make the finding useful. Revisit the
source before interpreting an apparent match.

Bases serves metadata, relationship, and lifecycle views. This workflow
does not depend on it reading callout bodies, and does not add a mirrored
frontmatter flag solely to make a body marker appear in a Base.

## Review and Resolve

Choose candidates relevant to the current learning or work. Keeping a
candidate does not impose a deadline or require an empty queue.

- Develop a stable, independently reusable concept into its own Note.
- Improve an existing Note when the insight belongs there.
- Keep the marker when the idea remains worth revisiting.
- Remove or rephrase the marker when it is no longer useful.

After development, replace the marker with a normal result link or short
explanation when that preserves useful context. The original reasoning and
the resulting Note should remain connected.

An action that the author chooses to pursue can become a Task with one
maintained completion record. An unanswered agent suggestion remains a
suggestion.

## Technical Evidence and Validation

An unstyled custom callout type falls back to Obsidian's note style, so the
marker does not require custom CSS.
See [Callouts](https://obsidian.md/help/callouts#Supported%20types).

Search supports embedded `query` blocks, body matching, regular expressions,
and path filters. It is a discovery surface; ordinary text matching alone
does not establish the author's intent.
See [Search](https://obsidian.md/help/plugins/search).

The scoped inspector distinguishes markers from fenced code, comments, nested
quotations, templates, examples, and managed Sources. Native search remains a
broader discovery surface. Offline cases and a native marker-location check
are recorded in [Verification](verification.md). Reinspect the actual passage
when interpreting a match; the scanner does not certify author intent.
