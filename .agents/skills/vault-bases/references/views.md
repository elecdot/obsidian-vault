# Base views

## Schema

This annotated schema illustrates available properties. For file formatting
use the [desktop-saved example](../../../../docs/tooling.md#native-base-saves).

```yaml
# Global filters apply to ALL views in the base
filters:
  # Can be a single filter string
  # OR a recursive filter object with exactly ONE key: and, or, or not
  and:
    - 'status == "active"'
    - not:
        - 'file.hasTag("archived")'

# Define formula properties that can be used across all views
formulas:
  formula_name: 'expression'

# Configure display names and settings for properties.
# Note properties need the `note.` prefix here, or the setting is ignored.
properties:
  note.property_name:
    displayName: "Display Name"
  formula.formula_name:
    displayName: "Formula Display Name"
  file.ext:
    displayName: "Extension"

# Define custom summary formulas
summaries:
  custom_summary_name: 'values.mean().round(3)'

# Define one or more views
views:
  - type: table | cards | list | map | kanban
    name: "View Name"
    limit: 10                    # Optional: limit results
    groupBy:                     # Optional: group results
      property: property_name
      direction: ASC | DESC
    groupOrder:                  # Optional: only these groups, in this order
      - value_one
      - null                     # Files with no value for the groupBy property
    sort:                        # Optional: sort results (supports multiple properties)
      - property: property_name
        direction: ASC | DESC
    filters:                     # View-specific filters follow the same rules
      and:
        - 'status == "active"'
    order:                       # Properties to display in order
      - file.name
      - property_name
      - formula.formula_name
    summaries:                   # Map properties to summary formulas
      property_name: Average
```

## View Types

### Table View

```yaml
views:
  - type: table
    name: "My Table"
    order:
      - file.name
      - status
      - due_date
    summaries:
      price: Sum
      count: Average
```

### Cards View

```yaml
views:
  - type: cards
    name: "Gallery"
    order:
      - file.name
      - cover_image
      - description
```

### List View

```yaml
views:
  - type: list
    name: "Simple List"
    order:
      - file.name
      - status
```

### Kanban View

Requires Obsidian 1.14+. Cards are grouped into columns by the `groupBy` property, which a kanban view needs. `groupOrder` sets which columns show and in what order; use `null` to include files with no value. Without `groupOrder`, every value gets a column. Dragging a card to another column updates that property in the note. Only Markdown notes can be moved, except when grouping by `file.folder`, where moving a card moves the file to that folder. When grouping by a formula or by a file property other than `file.folder`, cards and columns can't be moved and notes can't be created from a column.

```yaml
views:
  - type: kanban
    name: "Projects"
    groupBy:
      property: note.status
      direction: ASC
    groupOrder:
      - Planned
      - In progress
      - Done
    order:
      - file.name
      - due_date
```

### Map View

Requires latitude/longitude properties and the Maps community plugin.

```yaml
views:
  - type: map
    name: "Locations"
    # Map-specific settings for lat/lng properties
```

## Sorting

Sort results by one or more properties. Each sort entry specifies a `property` and `direction`, which must be uppercase `ASC` or `DESC`; an entry with any other value, or a sort written as a string, is silently ignored. Multiple sort entries are applied in order — the first entry is the primary sort key, subsequent entries break ties.

```yaml
views:
  - type: table
    name: "Sorted Tasks"
    sort:
      - property: due
        direction: ASC
      - property: file.name
        direction: ASC
    order:
      - file.name
      - due
      - status
```

Sort options depend on the property type:

| Property Type | ASC | DESC |
|---------------|-----|------|
| Text | A→Z | Z→A |
| Number | 0→9 | 9→0 |
| Date | Old→New | New→Old |

You can sort by any property including formulas (`formula.my_formula`), file properties (`file.mtime`), and note properties.

## Default Summary Formulas

| Name | Input Type | Description |
|------|------------|-------------|
| `Average` | Number | Mathematical mean |
| `Min` | Number | Smallest number |
| `Max` | Number | Largest number |
| `Sum` | Number | Sum of all numbers |
| `Range` | Number | Max - Min |
| `Median` | Number | Mathematical median |
| `Stddev` | Number | Standard deviation |
| `Earliest` | Date | Earliest date |
| `Latest` | Date | Latest date |
| `Range` | Date | Latest - Earliest |
| `Checked` | Boolean | Count of true values |
| `Unchecked` | Boolean | Count of false values |
| `Empty` | Any | Count of empty values |
| `Filled` | Any | Count of non-empty values |
| `Unique` | Any | Count of unique values |

## Embedding Bases

### Embed a `.base` file

Embed an external `.base` file in any Markdown note:

```markdown
![[MyBase.base]]

<!-- Specific view -->
![[MyBase.base#View Name]]
```

### Embed inline with a code block

Bases can also be embedded **inline** directly inside a note using a `base` fenced code block. This is useful for note-level filters (e.g. using `this.file.links`) and avoids creating a separate `.base` file:

````markdown
```base
filters:
  and:
    - file.hasTag("example")
views:
  - type: table
    name: Table
    order:
      - file.name
      - status
```
````

When embedded inline this way, the `this` keyword refers to the containing note, so you can build per-note views such as showing all notes linked from the current file.

For column labels, `properties` uses `note.` for frontmatter fields.
Give `displayName` a nonempty value to override the default column name.
