# Synticore Developer Docs - Config Internals

This page is for compiler-maintainer details behind project configuration handling.

If you need the full project-side key reference, use the main [Synticore Builder Guide - Configuration Reference](/wiki/builder/config.md).

---

## Schema Sources

The user-facing config surface is defined primarily by:

- `config/default/project/config.schema.json`
- `config/default/project/config.json`
- optional project-level `config.schema.json` extensions inside a selected project

When changing config behavior, update schema, defaults, implementation, and user docs together.

Keep the boundary clear:

- compiler-owned keys/defaults belong in the repo-level default schema/default files
- project-specific schema extensions belong in the project and should not be documented here as if they were compiler-shipped defaults

---

## `task_chain` Behavior

Schema keys can optionally define `task_chain` to control config-driven rebuild behavior.

- Format: a single array of task IDs, for example `["rebuild_html", "rebuild_data"]`
- IDs: must match registered task names created by the compiler task layer
- Resolution: when config changes are detected, the most specific matching schema key path is used
- Fallback: if no mapping resolves, compiler behavior falls back to the broader config rebuild path

This is compiler-maintainer behavior, not something a normal project author should need to reason about directly.

---

## Maintainer Responsibilities

When adding or changing a config key:

1. Update schema and defaults together.
2. Confirm the GUI-facing behavior still matches the schema contract.
3. Decide whether config changes need a `task_chain`.
4. Check whether migration support is required for older projects.
5. Update the user-facing [Synticore Builder Guide - Configuration Reference](/wiki/builder/config.md) if the visible contract changed.
