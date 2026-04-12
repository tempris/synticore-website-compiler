# Synticore Builder Guide - Migration Guide

## Purpose

This page explains how project upgrades work, how to run them, and what kinds of project changes current migrations handle.

If you need migration-registry responsibilities or release-side migration internals, use [Synticore Developer Docs - Migration Internals](/wiki/developer/migration.md).

---

## How Migration Is Triggered

Synticore compares:

- project version in `<project>/info.json`
- compiler version in `source/resource/info.json`

When the project version is older, Synticore can perform in-place migration before continuing tasks.

Version status categories:

- `Equal`: no migration needed
- `Old`: migration available and expected
- `New`: project was built with a newer compiler, so compatibility is uncertain

---

## Migration Tasks You Can Run Manually

### Full Upgrade Path

```bash
npm run gulp project_update_full -- --project "<path>"
```

Use this for the normal upgrade path from an older project to the current compiler.

### Directed Upgrade Path

```bash
npm run gulp project_update_manual -- --project "<path>"
```

Use this for controlled upgrade testing between specific version ranges. The task prompts for a start version and an end version from the currently supported migration set.

---

## What Current Migrations Handle

The current project-migration set in `gulpfile.js` covers these concrete upgrade steps:

- `1.1.0`
  - project layout updates such as moving legacy package/cache outputs into current locations
  - targeted path and filename renames such as `font_icon` -> `font-icon`
  - legacy config-key moves into current namespaces
  - compatibility rewrites for affected template/config placeholders
- `1.1.1`
  - cleanup of stale font-icon template checksum entries in the project file cache
- `1.1.2`
  - merge of older HTML-related project cache namespaces into the unified HTML namespace
- `1.1.3`
  - syntax-highlight config migration for the newer theme bundle/default behavior
- `1.1.4`
  - ensure `_cache/project/dev-panel.json` is ignored in project `.gitignore`
- `1.1.5`
  - move legacy `_html/config/template/*.hbs` project templates into `_html/config/`
  - regenerate sibling `_html/config/*.html` include files from `_html/config/*.hbs` during the HTML pipeline

This migration flow is intentionally compatibility-focused. Broader cleanup tasks such as path normalization are separate maintenance commands, not part of the normal migration chain.

---

## Recommended Migration Workflow

1. Back up the project directory.
2. Inspect current version state and then run the standard update path:

```bash
npm run gulp about -- --project "<path>"
npm run gulp project_update -- --project "<path>"
```

3. Verify:

```bash
npm run gulp build -- --project "<path>"
npm run gulp package -- --project "<path>"
```

4. Spot-check:

- `config.json` for expected key locations
- `<project>/info.json` for the updated project version
- renamed files under `in/asset/`
- `_cache/` regeneration behavior
- project `.gitignore` for migration-added ignore rules
- task logs in `<project>/_log/`

### Automatic Upgrade During Normal Tasks

Project-scoped tasks also run a version check before the main task chain.

If the selected project is older than the compiler, Synticore can perform the normal in-place migration flow before continuing the requested task. This is why `build`, `watch`, and similar project-scoped tasks may prompt before continuing when version status is `Old` or `New`.

---

## Troubleshooting

### Migration Says No Work Is Needed

- Check the project version in `info.json`.
- Compare it with the compiler version in `source/resource/info.json`.
- If versions already match, `project_update` will correctly report that no project upgrade is required.

### Task Fails After Migration

- Run `npm run gulp rebuild -- --project "<path>"`.
- If it still fails, inspect `<project>/_log/task_rebuild.log` and `<compiler>/_log/gulpfile.log`.

### Template Placeholders Are Not Resolving

- Confirm migrated config keys now exist in the expected namespace.
- Re-run the migration task and inspect the migration logs.
