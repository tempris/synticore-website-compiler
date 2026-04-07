# Synticore Builder Guide - Project Structure

## Purpose

This page documents the structure a normal Synticore website project uses, including what each folder is for, what gets generated, and what is safe to delete.

If you need compiler-repository internals rather than project structure, use the [Synticore Developer Docs](/wiki/developer.md).

---

## Start With The Project Root

The selected project is the website content directory Synticore builds.

This repo includes one bundled example project at `project/example` and many starter templates under `template/`.

The example project is a working reference project you can build immediately.

The template directories are scaffold sources for creating new projects and are not themselves normal working project directories.

Typical layout:

```text
<project>/
  config.json
  config.schema.json          (optional)
  info.json
  font-icon-template.scss     (optional override)
  in/
    _html/
    asset/
      audio/
      brand/
      css/
      file/
      font/
      font-icon/
      image/
      js/
      module/
      video/
    *.html
    browserconfig.xml
    manifest.webmanifest
    favicon.ico
  out/                        (generated)
  _cache/                     (generated)
  _log/                       (generated)
  _package/                   (generated when packaging)
```

---

## What Each Project File Does

### `config.json`

- Primary project configuration file
- Controls build behavior for this project

### `config.schema.json` (Optional)

- Project-level schema extensions for custom keys
- Used by the GUI config editor for custom typing and widgets

### `info.json`

- Project metadata, including project version
- Used by version checks and migration logic

### `font-icon-template.scss` (Optional)

- Project-level override for font icon CSS template generation
- If missing, Synticore falls back to the compiler default
- See [Synticore Builder Guide - Font Icon Guide](/wiki/builder/font-icon.md) for the user-facing font icon pipeline overview

### `in/`

- Source input tree
- Synticore compiles and transforms from here into `out/`

### `out/`

- Generated build output
- Deployable static site output
- Safe to delete

### `_cache/`

- Incremental build cache and derived metadata
- Safe to delete
- May also contain project-local GUI or browser-tool state owned by tooling rather than by authored site content

### `_log/`

- Per-project task logs
- Safe to delete

### `_package/`

- Package output location
- Used for zip and/or directory packaging outputs

---

## Compiler Root At A Glance

The compiler repository itself contains:

- `gulpfile.js` for task definitions and compiler pipeline logic
- `gui.cmd` / `gui.sh` for browser GUI launch
- `setup.cmd` / `setup.sh` for repository npm setup
- `config/` for tool-level defaults and settings
- `source/` for bundled resources, custom modules, migrations, and test data
- `project/example/` for the bundled example project
- `template/` for starter templates and shared scaffold content
- `wiki/builder.md` for the builder docs landing page
- `wiki/developer.md` for the developer docs landing page
- `wiki/builder/` for builder-facing documentation pages
- `wiki/developer/` for developer-facing documentation pages
- `_log/` for compiler-level logs such as `gulpfile.log` and `gui.log`

Most site builders should care about the project root first and only visit compiler-root details when troubleshooting or extending the tool.

For a shorter explanation of which config/state files you normally edit versus ignore, use [Synticore Builder Guide - Config Ownership](/wiki/builder/config-ownership.md).
