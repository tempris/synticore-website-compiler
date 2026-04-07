# Synticore Builder Guide - Log Guide

## Purpose

This page explains where logs are written and how to use them during normal project debugging.

If you need formatter implementation details, use [Synticore Developer Docs - Cure Time](/wiki/developer/cure-time.md).

---

## Log Locations

### Compiler-Root Logs

Located in `<compiler-root>/_log/`:

- `_log/gulpfile.log` for compiler and gulp pipeline output
- `_log/gui.log` for GUI runtime output
- `_log/setup.log` for setup script output

### Project-Root Logs

Located in `<project-root>/_log/`:

- `_log/task_<task-name>.log` for per-task execution logs

Examples:

- `_log/task_build.log`
- `_log/task_watch.log`
- `_log/task_project_update_full.log`

---

## Which Log To Read First

### Build Or Task Failures

1. `<project>/_log/task_<task>.log`
2. `<compiler>/_log/gulpfile.log`

### GUI Issues

1. `<compiler>/_log/gui.log`
2. `<compiler>/_log/gulpfile.log` if the issue occurs while launching a task

### Setup Issues

1. `<compiler>/_log/setup.log`

---

## Project Logging Config

`cure-log` supports configurable timestamp formatting through `config/log.json`.

Example:

```json
{
  "timestamp": {
    "format": "YYYY-MM-DD HH:mm:ss z",
    "zone": "local",
    "locale": "auto"
  }
}
```

`config/log.json` can also be empty:

```json
{}
```

For project task runs, you can provide a project-specific logger config at:

- `<project-root>/log.json`

This lets one project use different log formatting without changing compiler-wide config.

For a short mental model of which config/state files are builder-owned versus tool-owned, use [Synticore Builder Guide - Config Ownership](/wiki/builder/config-ownership.md).

Ownership summary:

- `config/log.json` is compiler-checkout-level log config
- `<project>/log.json` is project-specific log config
- `_log/` files are output, not config

Useful format examples:

- `iso`
- `YYYY-MM-DD HH:mm:ss z`
- `dddd, MMMM D, YYYY [at] h:mm:ss A z`

For formatter internals and token behavior, see [Synticore Developer Docs - Cure Time](/wiki/developer/cure-time.md).

---

## Common Debugging Workflows

### Reproduce And Read The Task Log

Run the failing task directly, then inspect the matching task log.

Example:

```bash
npm run gulp build -- --project "<path>"
```

Then inspect:

- `<project>/_log/task_build.log`
- `<compiler>/_log/gulpfile.log` if needed

### PowerShell Tail

```powershell
Get-Content .\\project\\example\\min\\_log\\task_build.log -Tail 200
```

For live tail while a task runs:

```powershell
Get-Content .\\project\\example\\min\\_log\\task_watch.log -Wait
```

### Baseline Diagnostics

```bash
npm run gulp about -- --project "<path>"
npm run gulp build -- --project "<path>"
```

### Migration Diagnostics

```bash
npm run gulp project_update_full -- --project "<path>"
```

Then inspect:

- `<project>/_log/task_project_update_full.log`
- `<compiler>/_log/gulpfile.log`

---

## Cleanup

Safe to delete any time:

- `<compiler-root>/_log/*`
- `<project-root>/_log/*`

Logs are recreated on the next GUI, task, or setup run.

This makes logs safe to inspect and safe to clear, but not a place to store lasting configuration.

---

## When Reporting An Issue

Include:

1. the exact command you ran
2. the selected project path
3. the relevant `<project>/_log/task_<task>.log`
4. `<compiler>/_log/gulpfile.log`
5. the `config.json` excerpt around the affected option namespace

If you are still in the "what should I try first?" stage rather than reporting a bug yet, use [Synticore Builder Guide - Troubleshooting](/wiki/builder/troubleshooting.md).
