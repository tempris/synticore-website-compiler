# Synticore Developer Docs - Migration Internals

This page covers the maintainer-side responsibilities behind project migration support.

If you need to upgrade a project, use the main [Synticore Builder Guide - Migration Guide](/wiki/builder/migration.md).

---

## Migration Registry

Project migration exists to bring older project layouts and config shapes forward to the current compiler contract.

In this repository there are two distinct migration surfaces:

- project migrations in `gulpfile.js`, which upgrade selected site projects
- GUI-global migrations in `source/node_modules_custom/compiler-default/index.js` and `source/node_modules_custom/compiler-gui-browser/index.js`, which upgrade tool-owned `config/gui.json` state for this compiler checkout

When maintainer changes affect:

- project file layout
- generated cache locations
- config key locations or meanings
- token names used in source content

you must decide whether a migration step is required.

---

## When To Add A Migration

Add or extend migration behavior when a normal project update would otherwise require manual file edits to stay compatible.

Typical triggers:

- renamed project paths or artifacts
- moved config keys
- changed token names
- generated-file location changes
- compatibility fixes for older starter layouts
- GUI config filename/state migrations when tool-owned GUI state changes

## Current Migration Surfaces

### Project Migrations (`gulpfile.js`)

The current project migration list runs versioned upgrade steps through `project_update`, `project_update_manual`, `project_update_full`, and the normal project-scoped version-check path.

Current `to` versions:

- `1.1.0`
- `1.1.1`
- `1.1.2`
- `1.1.3`
- `1.1.4`

Each step persists `<project>/info.json` as it advances.

### GUI Migrations (`compiler-default` / `compiler-gui-browser`)

The GUI also has its own migration registry for tool-owned state in `config/gui.json`.

Current GUI migration examples include:

- legacy `config/settings.json` -> `config/gui.json`
- migration of legacy recent-project paths from `./example/*` to `./project/example/*`

These are not project migrations and should not be documented as part of the builder-facing project upgrade flow unless they affect user expectations directly.

---

## Fixture And Release Coordination

When changing migration behavior:

1. Verify the target compiler version and release notes agree.
2. Check any migration fixtures or test projects that encode old layouts.
3. Validate a realistic before-and-after project path, not only isolated helper logic.
4. Update the user-facing [Synticore Builder Guide - Migration Guide](/wiki/builder/migration.md) if project operators need to know about the change.
5. Update GUI docs too if the change touches GUI-owned migration/state behavior rather than project upgrade behavior.

---

## Rule Of Thumb

User docs explain how to run migrations.

Developer docs explain when the compiler must provide them.
