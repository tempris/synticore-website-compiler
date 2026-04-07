# Synticore Builder Guide - GUI Guide

## Purpose

This page explains how to use the browser GUI as a project launcher, task runner, config editor, and local documentation viewer.

Primary entry:

```bash
npm run gui:web
```

Shell launcher entries:

```bash
./gui.sh
gui.cmd
```

The browser GUI must be available before the launcher can serve it. If you are maintaining the GUI itself rather than using it, use the developer-facing GUI/browser docs instead of this page.

---

## GUI Surface

Synticore exposes the browser GUI through `npm run gui:web` and the root `gui.cmd` / `gui.sh` launchers.

The browser GUI mirrors the main launcher/config workflow closely enough to use as a real day-to-day tool for:

- project selection and recent-project recall
- grouped task launching
- project-config editing
- log-config editing
- repo-root wiki reading
- runtime status and log inspection
- new-project scaffolding
- local theme switching

---

## Before You Start

Complete environment setup first:

- run `./setup.sh` or `setup.cmd`
- choose a valid project directory containing `config.json` and `in/`

See [Synticore Builder Guide - Setup Guide](/wiki/builder/setup.md).

---

## Main UI Areas

### Project Selection

- recent-project dropdown
- browse button to choose a project directory
- open-directory button
- open-terminal button
- new-project button to create a project from `template/*`

The selected project is the path used for launched tasks and config editing.

### Task Buttons

The GUI exposes grouped compiler tasks and runs them against the selected project.

Equivalent terminal pattern:

```text
npm run gulp <task> -- --project "<selected-project-path>"
```

### Config Editor

The config editor lets you change project settings through schema-driven controls instead of editing JSON manually for every change.

In normal use, this means project-facing settings from `<project>/config.json`. If a project provides `config.schema.json`, the editor can also reflect project-specific schema extensions.

The GUI also has a mode switch between:

- `Project` for the selected project's `config.json`
- `Log` for the tool-level `config/log.json`

### Runtime Log Surface

The browser GUI includes a log tab for runtime GUI events and status output.

This log surface is for the browser GUI itself. For compiler-task output and persistent tool logs, keep using [Synticore Builder Guide - Log Guide](/wiki/builder/log.md).

### Local Wiki Surface

The browser GUI includes a wiki tab that renders repository docs live from disk.

Routing rules:

- `README.md` renders as the wiki home
- `wiki/*.md` and `wiki/**/*.md` render as their matching wiki paths
- internal markdown wiki links continue to work through the GUI tab

The wiki tab is intended for local builder documentation, not end-user content authoring. Reloading happens when you navigate or use the reload action.

The wiki surface also includes:

- breadcrumb navigation for the current doc path
- an in-page table of contents generated from markdown headings
- README home-page routing back to the repo root docs

### Browser GUI Access Notes

The browser GUI launcher can also expose a LAN-gated browser path with a separate access screen for unauthorized LAN requests.

In practical terms:

- unauthorized LAN clients are redirected to the access page
- unmatched GUI routes resolve to a GUI-specific not-found page
- implementation details for those pages belong in the maintainer docs, not this builder guide

### Version Status

The GUI shows whether the selected project is:

- up to date
- older than the compiler
- newer than the compiler

---

## Typical GUI Flow

1. Launch `npm run gui:web`, `./gui.sh`, or `gui.cmd`.
2. Select a project directory.
3. Confirm the version status.
4. Run a task such as `build` or `watch`.
5. Open the Config tab and choose `Project` or `Log` mode if needed.
6. Save changes and rerun the affected task.

### New Project Flow

Use the New Project action when you want to scaffold a new site from one of the bundled templates.

The popup:

- chooses a destination directory
- lets you pick a template from `template/*`
- reads template metadata from each template's `template.schema.json`
- runs `npm run project:new -- --dir ... --template ...`
- can pass `--force` when overwrite is explicitly enabled

---

## Common Problems

### Invalid Project Selection

- confirm the directory contains `config.json`
- confirm the directory contains `in/`

### Task Launch Errors

- install missing Node dependencies with `npm install`
- check PATH issues for Node or GraphicsMagick

### Config Editor Load Or Save Errors

- check for malformed project JSON
- check project schema extensions if you use them
- check whether you are editing `Project` config or `Log` config mode

### Need More Detailed Runtime Evidence

Use [Synticore Builder Guide - Log Guide](/wiki/builder/log.md) for the relevant log files.

---

## GUI Vs Terminal

Use the GUI when you want:

- fast task selection
- visual config editing
- visible version status

Use the terminal when you want:

- scriptable automation
- direct command control
- CI-friendly execution

See [Synticore Builder Guide - Terminal Task Reference](/wiki/builder/terminal.md).

---

## Advanced Notes

### Version Status

The version indicator is there to help you notice when a selected project is older or newer than the current compiler. Use [Synticore Builder Guide - Migration Guide](/wiki/builder/migration.md) when the selected project needs upgrade work.

### Config Save Scope

The GUI is primarily a safer way to edit project-facing config without hand-editing JSON for every change.

- project build behavior belongs in `<project>/config.json`
- optional project schema extensions belong in `<project>/config.schema.json`
- GUI app state belongs in `config/gui.json`
- tool log-config editing writes to `config/log.json`
- project-local config editor UI state is cached in `<project>/_cache/project/gui.json`

The project-local GUI cache is UI-only state such as collapsed-section preferences. It is not the authored source of truth for project behavior.

When debugging ownership questions, use [Synticore Builder Guide - Config Ownership](/wiki/builder/config-ownership.md).

For browser GUI internals, implementation layout, and hidden maintainer-only tools, use [Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md) and `_development/wiki/gui.md`.
