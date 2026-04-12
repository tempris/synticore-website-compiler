# Synticore Builder Guide - Terminal Task Reference

## Purpose

This page is the command and task reference for terminal-driven project usage.

Use it when you already know you want the terminal and need the right task name, command pattern, or task boundary quickly.

If you want recommended day-to-day flows, use [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md).

If you want compiler-maintainer reading order and internals, use the [Synticore Developer Docs - Maintainer Guide](/wiki/developer/maintainer-guide.md).

---

## Command Pattern

Primary pattern:

```bash
npm run gulp <task>
```

Task with explicit project path:

```bash
npm run gulp <task> -- --project "<absolute-or-relative-project-path>"
```

Alias also supported:

```bash
npm run gulp <task> -- --project-dir "<path>"
```

Equivalent direct Gulp invocation:

```bash
npx gulp <task>
```

`npm run gulp` is preferred because this repo already defines the script alias in `package.json`.

---

## Project Path Rule

- Run tasks from repository root.
- Prefer explicit `--project` or `--project-dir` flags over implicit recent-project behavior.
- Use `about` when debugging path, config, or project-version mismatches.
- Use [Synticore Builder Guide - GUI Guide](/wiki/builder/gui.md) instead if you would rather select projects and edit config through the desktop app.

Example:

```bash
npm run gulp build -- --project "<project-dir>"
```

---

## Pick The Right Task

Use this quick rule before scanning the full task list:

- `build` when you want one normal build pass
- `watch` when you want build plus file watching plus BrowserSync live reload
- `browser` when you want BrowserSync only, without triggering build/watch
- `rebuild` when output or cache state looks stale and you want a clean rebuild
- `reset` when you only want to clear cache/output before deciding what to run next
- `package` when you want zip/package output from already built project output
- `about` when the selected project, version, or config resolution looks wrong

For the browser-side watch experience, use [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md).

---

## Task Groups

### General

- `default`
- `watch`
- `browser`
- `package`
- `sort_config`
- `about`

### Build

- `build`
- `build_audio`
- `build_brand`
- `build_config`
- `build_data`
- `build_favicon`
- `build_file`
- `build_font`
- `build_font_icon`
- `build_highlight_syntax`
- `build_html`
- `build_image`
- `build_javascript`
- `build_mirror`
- `build_module`
- `build_stylesheet`
- `build_video`

### Rebuild

- `rebuild`
- `rebuild_audio`
- `rebuild_brand`
- `rebuild_config`
- `rebuild_data`
- `rebuild_favicon`
- `rebuild_file`
- `rebuild_font`
- `rebuild_font_icon`
- `rebuild_highlight_syntax`
- `rebuild_html`
- `rebuild_image`
- `rebuild_javascript`
- `rebuild_mirror`
- `rebuild_module`
- `rebuild_stylesheet`
- `rebuild_video`

### Reset

- `reset`
- `reset_audio`
- `reset_brand`
- `reset_config`
- `reset_data`
- `reset_favicon`
- `reset_file`
- `reset_font`
- `reset_font_icon`
- `reset_highlight_syntax`
- `reset_html`
- `reset_image`
- `reset_javascript`
- `reset_mirror`
- `reset_module`
- `reset_stylesheet`
- `reset_video`

### Maintenance

- `project_normalize_paths`
- `project_update`
- `project_update_manual`
- `project_update_full`
- `compiler_update_caniuse`
- `compiler_update_baseline`

### Test

- `test_config`
- `test_file_match`
- `test_ansi_standard`
- `test_ansi_color256`
- `test_ansi_screen`
- `test_ansi_cursor`
- `test_ansi_reveal`
- `test_ansi_clean`
- `test_ansi_all`
- `test_log_type`
- `test_log_hook_console`
- `test_log_hook_process_warning`
- `test_log_hook_error_uncaught_exception`
- `test_log_hook_error_unhandled_rejection`
- `test_log_hook_error_async_throw`
- `test_log_hook_error_late_catch`
- `test_log_hook_error_next_tick`
- `test_log_hook_error_immediate`
- `test_log_hook_signal_sigint`
- `test_log_hook_signal_sigterm`

---

## Task Semantics

- `default` and `build` are the broad one-pass build entries. Use `build` when you want the clearest explicit command.
- `watch` is the normal interactive development entry: it builds once, then watches and live-reloads.
- `browser` is not a replacement for `watch`; it starts BrowserSync only.
- `rebuild` means reset relevant cache/output and then build again.
- `reset` means clear cache/output only. It does not rebuild by itself.
- `package` packages compiled project output in the target directory. Run a normal build first if you want predictable release artifacts.

---

## Builder Vs Maintainer Tasks

Usually builder-facing:

- `build`
- `watch`
- `browser`
- `package`
- targeted `build_*`
- targeted `rebuild_*`
- `about`
- `sort_config`
- `build_config`
- `rebuild_config`

Mostly maintainer-facing:

- `project_normalize_paths`
- `project_update`
- `project_update_manual`
- `project_update_full`
- `compiler_update_caniuse`
- `compiler_update_baseline`
- `test_*`

If a task sounds like migration, normalization, compatibility-data upkeep, or internal testing, treat it as maintainer-oriented unless you know you need it.

---

## Notes

- `browser` is the browser-focused local serving path for BrowserSync-driven development. Use [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md) if you need the browser-side behavior explained.
- `about` is the safest first diagnostic task when project path, version, or config resolution looks wrong.
- `sort_config` normalizes project config ordering before deeper config checks or edits.
- `build_config` rebuilds config-derived output/state without implying a full project rebuild.
- `rebuild_config` is the clean config-refresh path when config state looks stale.
- `project_update` runs the standard project migration flow toward the current compiler version.
- `project_update_manual` is the directed/manual migration path between selected versions.
- `project_update_full` is the broader full-update path intended for deeper upgrade work from older project states.
- `project_normalize_paths` is a maintenance task, not a normal day-to-day builder task. Review the project carefully before using it because it rewrites paths and related references.
- `compiler_update_caniuse` and `compiler_update_baseline` are maintainer-facing upkeep tasks for browser-compatibility data rather than normal project-build tasks.
- For stale-cache behavior, start with `rebuild` or a targeted `rebuild_*` task before digging deeper.
- For project upgrades, use [Synticore Builder Guide - Migration Guide](/wiki/builder/migration.md).
- For debugging logs, use [Synticore Builder Guide - Log Guide](/wiki/builder/log.md).
