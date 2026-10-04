---
kind: note
format: guide
aliases: [Maintenance and refinement]
---
# Maintenance and refinement

Choose work that helps the learning or Activity you are pursuing. Captures,
unassociated Notes, and optional suggestions are not automatically Tasks.

## Captures and structure

![[bases/maintenance.base]]

## Refinement discovery

```query
path:/^(inbox|knowledge|activities|domains|sources|journals)\// "[!refine]" -[managed-by:zotero]
```

Search can include quoted examples. For scoped inspection with exact source
locations, use **Templater: Insert inspect** or `npm run vault -- candidates`.
That scanner excludes code fences, comments, nested quote examples, and
importer-owned Sources. Review the original passage before deciding its use.

## Open actions

```query
path:/^(inbox|knowledge|activities|domains|sources|journals)\// task-todo: -[managed-by:zotero]
```

Maintain each action's checkbox in its original Note. For the shared inspector's
standalone Markdown checklist scope, use `npm run vault -- tasks`.

[[docs/refinement|Refinement workflow]] · [[docs/operations|Tool operations]]
