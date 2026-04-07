# Synticore Config Schema Notes (Structure Guide)

This document explains how `config.schema.json` describes the *shape* of config keys, how to interpret path syntax, and what each schema field means when building UI or validating config.

---

## 1) What this schema is

`config.schema.json` is a **flat registry of key definitions** (not a nested JSON Schema document).

- The top-level structure is:
  - `keys`: an array of objects
  - each object describes **one config key path** and (optionally) the structure beneath it

The schema is designed to drive:

- GUI config editors (build a tree from dot-path keys)
- validation and typing hints
- tooltips (from `description`)
- rendering of arrays/maps/unions via `structure`

---

## 2) Anatomy of a schema entry

Each entry is an object with (commonly) these fields:

### `key` (string)

The fully-qualified config key path, using dot-notation plus special segments like `[]` and `*`.

Examples:

- `option`
- `option.brand.adjust.background.alignment.x`
- `option.image.watermark[].layers[].gravity`
- `option.brand.size.image.*.width`

### `description` (string)

Human-readable text for tooltips/docs. Treat as:

- the primary tooltip text for the key itself
- also a “section blurb” for group keys (like `option.brand`)

### `type` (optional string)

A UI/typing hint for leaf values (commonly):

- `enum` — values are constrained to `enum: [...]`
- `path` — string that represents a filesystem/glob-ish path (still a string, but UI can use path widgets)
- `color` — string color value (GUI can expose a color picker + hex input)

If omitted, the key is typically a plain primitive (string/number/bool) OR a pure “group” key whose shape is defined by `structure`.

### `enum` (optional string[])

Only meaningful when `type: "enum"`. Defines the allowed values.

- UI should render a dropdown.
- Validation should reject values not in the list.

### `enum_names` / `enumNames` (optional object)

Optional display-name map for enum-like values.

- Keys are the stored raw values.
- Values are human-readable labels.
- UI may render these as suffixed labels such as `value (name)` while still storing only the raw value.

Example:

```json
{
  "type": "enum",
  "enum": ["local", "utc"],
  "enum_names": {
    "local": "system timezone",
    "utc": "Coordinated Universal Time"
  }
}
```

### `enum_names_kind` / `enumNamesKind` (optional string)

Named display-name provider for enum-like values.

- Useful when option values come from a generated suggestion/enum source rather than a short inline list.
- Explicit `enum_names` entries still take priority over provider-generated names.
- Current browser GUI provider:
  - `locale`: derive locale display names for BCP 47 locale tags

### `enum_editable` / `enumEditable` (optional boolean)

If true, enum values should render as an **editable combo box** (dropdown + free text).

- UI should still show the `enum` suggestions.
- Users can type values outside the preset list.
- Useful for package-driven IDs that may vary across installed versions.

### `suggestions` (optional string[])

Non-restrictive suggested values for string-like inputs.

- UI should render these as dropdown suggestions while still allowing custom text.
- Unlike `enum`, values outside the list remain valid.
- Useful for fields such as locale tags where common options are known but not exhaustive.

### `suggestions_kind` / `suggestionsKind` (optional string)

Named suggestion provider for large or generated suggestion sets.

- UI should resolve the provider to a suggestion list while still allowing custom text.
- Current browser GUI provider:
  - `locale`: BCP 47 locale suggestions, including `auto`

### `presets` (optional string[])

Non-restrictive preset values for string-like inputs where the UI should surface a dedicated preset picker.

- UI should render these through the preset affordance rather than the generic option/suggestion dropdown.
- Values outside the list remain valid unless the schema also constrains them some other way.
- Useful for template strings such as `option.navigation.toc.wrap_emoji`.

### `presets_kind` / `presetsKind` (optional string)

Named preset provider for generated preset lists.

- UI should resolve the provider through the preset-picker path rather than the generic suggestion path.
- Current browser GUI provider:
  - `task`: known browser-GUI task ids from the current bootstrap task catalog

### `format_kind` / `formatKind` (optional string)

Named editor contract for specialized string formats.

- UI may render a dedicated editor instead of a plain text input.
- Current browser GUI editors:
  - `datetime-token-pattern`: token-based date/time format editor with presets, token insert controls, and preview
  - `glob-pattern`: glob source editor with live sample-match preview
  - `regex-pattern`: regex source editor with live validation and optional schema-driven sample preview

### `regex_mode` / `regexMode` (optional string)

Optional regex-editor behavior hint used with `format_kind: "regex-pattern"`.

- Current browser GUI modes:
  - `split`: treat the regex as a split pattern and preview sample tokens after splitting

### `test_input` / `testInput` (optional string)

Optional schema-provided sample text used by specialized editors for live preview/testing.

- Most useful with `format_kind: "regex-pattern"`.
- Does not affect stored config values; it only seeds the GUI preview input.

### `preview_mode` / `previewMode` (optional string)

Optional specialized-preview hint for format-aware editors.

- Current browser GUI regex preview modes:
  - `joined-words`: join regex split results back into one display value using `preview_joiner`

### `preview_label` / `previewLabel` (optional string)

Optional label text shown ahead of a specialized preview result.

- Useful when a generic editor should still describe the result in domain language such as `Result` instead of `Split preview`.

### `preview_joiner` / `previewJoiner` (optional string)

Optional joiner used by preview modes that combine multiple tokens/fragments into one displayed value.

- Current browser GUI use:
  - regex `joined-words` preview mode

### `tokens` (optional string[] or object[])

Token list associated with a format-aware editor.

- Used to drive token insertion controls and token-aware validation/help.
- Most useful alongside `format_kind`.
- Each token may be:
  - a string, such as `"YYYY"`
  - or an object with:
    - `value` (required string): the inserted token text
    - `name` (optional string): human-readable label for GUI display
    - `preview` (optional string): schema-owned sample output for the token

Example:

```json
{
  "tokens": [
    "YYYY",
    { "value": "MMM", "name": "short month", "preview": "Apr" }
  ]
}
```

### `parts` (optional string[] or object[])

Pattern-fragment list for specialized string editors such as regex and glob fields.

- Used to drive insert-at-caret part buttons in the browser GUI.
- Most useful alongside `format_kind`.
- Each part may be:
  - a string, such as `"**"`
  - or an object with:
    - `value` (required string): the inserted fragment text
    - `name` (optional string): human-readable label for GUI display
    - `preview` (optional string): optional schema-owned sample text

Example:

```json
{
  "parts": [
    "*",
    { "value": "**/*.md", "name": "markdown files" }
  ]
}
```

### `structure` (optional object)

Defines how to interpret children beneath this key:

- array (list)
- object (properties)
- union (oneOf multiple shapes)

This is what makes the schema “structural” rather than just descriptive.

---

## 3) Path grammar: how to read key strings

The `key` field uses a compact grammar to represent nested structures.

### 3.1 Dot segments: `a.b.c`

Each `.` indicates a nested object level.

Example:

- `option.brand.adjust.background.blur`
  - `option` → object
  - `brand` → object
  - `adjust` → object
  - `background` → object
  - `blur` → value

### 3.2 Arrays: `[]`

`[]` means “this key is an array item”.

Two common patterns:

#### A) Array container

A key that defines the list as a whole, and points to an item key:

- `option.image.watermark` with `structure.kind: "array"`
- `structure.items_key: "option.image.watermark[]"`

#### B) Array item

A key that describes the shape of each element:

- `option.image.watermark[]` often has `structure.kind: "object"`
- and `structure.properties_keys: [...]` describing the item’s fields

UI implication:

- Render a list editor for the container key.
- Render an “item editor” using the `[]` item key definition.

### 3.3 Wildcard object keys: `*`

`*` means “arbitrary property name at this level” (dictionary/map).

Example:

- `option.brand.size.image` is an object map
- `option.brand.size.image.*` describes a single entry value for any filename key

UI implication:

- Render a “map editor” (add/remove arbitrary keys).
- Each map value is edited using the `*.{child}` definitions.

### 3.4 Combined patterns

These can nest:

- `option.image.watermark[].layers[]` → array inside array item
- `option.brand.size.image.*.width` → map entry has object fields

---

## 4) The `structure` object (the important part)

### 4.1 `structure.kind: "array"`

Fields:

- `kind: "array"`
- `items_key`: the schema key that describes a single element

Example pattern:

- `<container key>` has `structure.kind = "array"`
- `items_key = "<container key>[]"`
- `<container key>[]` describes the item

UI behavior:

- show list controls (Add / Remove / Reorder)
- each element is edited according to `items_key`

### 4.2 `structure.kind: "object"`

Fields:

- `kind: "object"`
- `properties_keys`: array of schema keys that are valid children *under this object*

Important:

- `properties_keys` is the “child list” for GUI grouping.
- It does **not** necessarily mean “only these keys exist” if a wildcard (`*`) is used.

Two object patterns:

#### A) Fixed properties object

`properties_keys` lists concrete child keys.
Example:

- `option.image.minify.svgo.plugins[]` lists `...name` and `...active`

#### B) Map/dictionary object

`properties_keys` includes wildcard children.
Example:

- `option.brand.size.image` lists `option.brand.size.image.*`
- and `option.brand.size.image.*` lists `...width` / `...height`

UI behavior:

- fixed properties: render known fields
- map: render “key/value entry” rows with add/remove keys

### 4.3 `structure.kind: "union"`

Fields:

- `kind: "union"`
- `oneOf`: array of alternative shapes
  - each option is an inline structure descriptor (not always a schema `key`)

Example union shapes used in this schema:

- string OR object
- null OR array
- string OR array of strings

Possible inline fields you may see inside `oneOf`:

- `{ "kind": "string" }`
- `{ "kind": "null" }`
- `{ "kind": "object", "properties_keys": [...] }`
- `{ "kind": "array", "items_kind": "string" }`
- `{ "kind": "array", "items_key": "some.key[]" }` (when item schema key is defined)

UI behavior:

- show a type switcher (radio/dropdown) for the union choices
- render the selected choice’s editor
- store the value as the selected type

---

## 5) Practical UI rules (recommended)

### 5.1 Build a tree from flat keys

Even though the schema is flat, you can derive a tree by splitting on dots and treating:

- `[]` and `*` as special segments
- “group keys” as nodes (keys that only exist to organize children)

### 5.2 Child discovery comes from `structure`

To know what children to show under a node:

- if it has `structure.kind: "object"`, use `structure.properties_keys`
- if it has `structure.kind: "array"`, use `structure.items_key`
- if it has `structure.kind: "union"`, use `oneOf` to decide render paths

If a key has no `structure`:

- treat it as a leaf value
- render based on `type`/`enum` if present
- otherwise render a primitive input (string/number/bool) based on the actual config value type

### 5.3 Tooltips

Tooltip text should come from:

- the exact key’s `description` if present
- if missing, fall back to the closest ancestor with a `description`

### 5.4 Arrays

For arrays:

- container key renders the list
- item key (`[]`) renders the per-item editor
- if item key has object `properties_keys`, render those subfields

### 5.5 Maps (wildcard `*`)

For wildcard maps:

- container key renders a table:
  - column 1: arbitrary property name (the map key)
  - column 2: value editor for `key.*` (or whatever wildcard child is defined)
- each entry’s value is edited using the wildcard definition:
  - `option.brand.size.image.*` → object with `.width` and `.height`

---

## 6) Examples (how to interpret common patterns)

### 6.1 Enum leaf

- `type: "enum"`
- has `enum: [...]`

UI: dropdown.

### 6.2 Object with fixed children

- `structure.kind: "object"`
- `properties_keys: [ "a.b.c", "a.b.d" ]`

UI: render fields `c` and `d`.

### 6.3 Array of objects

- container: `some.list` with `structure.kind: "array"`
- item: `some.list[]` with `structure.kind: "object"` and `properties_keys`

UI: list editor; each row expands to show the object fields.

### 6.4 Union: string OR array

- `structure.kind: "union"`
- `oneOf: [{kind:"string"}, {kind:"array", items_kind:"string"}]`

UI: a type toggle + editor (single-line vs list).

### 6.5 Map/dictionary: dynamic keys

- container object lists `*.`
- wildcard key defines the shape of the entry’s value

UI: add/remove arbitrary keys; value editor comes from wildcard key definition.

---

## 7) Schema conventions you should follow when adding new keys

- Every user-facing key should have a `description`.
- Group keys (like `option.brand.adjust`) should also have a `description` to label sections.
- If a key has children, it should usually define `structure` so the GUI can discover them.
- Arrays should define:
  - `<key>` with `structure.kind: "array"` + `items_key`
  - `<key>[]` for the item definition (and its children)
- Maps should define:
  - `<key>` with `structure.kind: "object"` + `properties_keys` including `<key>.*`
  - `<key>.*` definition describing the entry’s shape
  - `<key>.*.<field>` for entry fields (if entry is an object)
- Unions should use `structure.kind: "union"` and keep choices simple and UI-friendly.

---

## 8) Glossary

- **Container key**: a key that “holds” a collection (array/map) and provides `structure` for it.
- **Item key**: the `[]` key describing one element in an array.
- **Wildcard key**: the `*` key describing one entry under a map/dictionary.
- **Leaf key**: a key with no `structure` (represents an actual value).
- **Group key**: a non-leaf key used mostly for organization and discovery of children.
