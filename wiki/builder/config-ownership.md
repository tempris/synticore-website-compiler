# Synticore Builder Guide - Config Ownership

## Purpose

This page explains which config and state files a normal site builder should care about, and which ones are mostly tooling-owned.

If you need compiler-side merge and schema internals, use [Synticore Developer Docs - Config Internals](/wiki/developer/config.md).

---

## Files You Usually Edit

### `<project>/config.json`

This is the main project config file.

Use it for:

- site metadata
- URL behavior
- navigation rules
- packaging targets
- watch trigger rules
- other project build options

### `<project>/log.json`

Optional project-local log config.

Use it when one project needs different logging behavior without changing compiler-wide defaults.

### `<project>/config.schema.json` (Optional)

Optional project-local schema extension file.

Use it when the GUI config editor needs project-specific schema additions for custom keys or editor behavior.

---

## Files The Compiler Owns

### `config/default/project/config.json`

Compiler-shipped default project config.

Treat this as reference and fallback data, not as your normal project config file.

### `config/default/project/config.schema.json`

Compiler-shipped schema source for project config editing and validation.

Most site builders should read it only indirectly through the docs or GUI.

### `config/default/log.json`

Compiler-wide default logging behavior.

Useful as a reference when deciding what to override in project `log.json`.

---

## Files The GUI Owns

### `config/gui.json`

GUI application state for this compiler checkout.

Typical examples:

- recent projects
- GUI-specific preferences
- GUI-side section state used by the log-config editor

Treat this as tool state, not as site content.

---

## Files You Usually Do Not Edit

### `<project>/_cache/project/*`

Project-local generated or cached state used by tooling.

These files help the compiler or GUI remember derived state, but they are not the primary authored source of truth.

Examples can include:

- GUI project-local state
- browser-tool shared dev state
- compiler-derived cache data

### Compiler `_log/` and project `_log/`

Log output, safe to inspect and safe to delete.

Use these for debugging evidence, not as configuration.

### Browser dev-tool state

Browser/watch sessions can persist some local development state for the browser tools. Treat that as temporary tooling state, not authored project configuration.

---

## Ownership Model

- Project behavior belongs in `<project>/config.json`.
- Project-specific log formatting belongs in `<project>/log.json` only when needed.
- GUI app state belongs in `config/gui.json`.
- Compiler-wide default log behavior belongs in `config/log.json` and `config/default/log.json`.
- Generated project state belongs under `<project>/_cache/` and `<project>/_log/`.
- Browser/watch dev-tool state is tooling state, not authored site content.

---

## Practical Rule

- Edit `<project>/config.json` when you want to change site behavior.
- Edit `<project>/log.json` only when you want project-specific log output.
- Edit `<project>/config.schema.json` only when you intentionally need project-side schema extension behavior for the GUI/editor flow.
- Let `config/gui.json`, `config/log.json`, `_cache/project/*`, `_log/*`, and dev-tool state exist as tooling-owned state unless you are debugging them specifically.

---

## Related

- [Synticore Builder Guide - Configuration Reference](/wiki/builder/config.md)
- [Synticore Builder Guide - GUI Guide](/wiki/builder/gui.md)
- [Synticore Builder Guide - Log Guide](/wiki/builder/log.md)
- [Synticore Builder Guide - Project Structure](/wiki/builder/structure.md)
