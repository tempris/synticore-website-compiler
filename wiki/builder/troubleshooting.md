# Synticore Builder Guide - Troubleshooting

## Purpose

This page helps diagnose common project-side problems quickly.

Use it when a normal build, watch, browser, GUI, or migration flow is failing and you need the fastest likely next step.

If you need the full task list, use [Synticore Builder Guide - Terminal Task Reference](/wiki/builder/terminal.md).

If you need the full log-location reference, use [Synticore Builder Guide - Log Guide](/wiki/builder/log.md).

---

## Start With The Symptom

### Build Fails Immediately

Start with:

```bash
npm run gulp about -- --project "<path>"
npm run gulp build -- --project "<path>"
```

Check:

- whether the project path resolved to the project you expected
- whether version status is `Equal`, `Old`, or `New`
- `<project>/_log/task_build.log`
- `<compiler>/_log/gulpfile.log`

Use [Synticore Builder Guide - Migration Guide](/wiki/builder/migration.md) if the failure is really a project-version mismatch rather than a normal build error.

### Output Looks Stale

When output exists but does not reflect the latest source changes, start with:

```bash
npm run gulp rebuild -- --project "<path>"
```

Then verify the affected file under `<project>/out/`.

If the stale behavior is limited to one asset family, try a narrower rebuild such as:

- `rebuild_html`
- `rebuild_stylesheet`
- `rebuild_javascript`
- `rebuild_image`

Use [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md) for the normal targeted rebuild patterns.

### Watch Does Not Rebuild

Check:

- that you started `watch`, not `browser`
- that you are editing files under `<project>/in/`
- whether the project depends on custom watch-trigger rules

Then try:

```bash
npm run gulp rebuild -- --project "<path>"
npm run gulp watch -- --project "<path>"
```

Inspect:

- `<project>/_log/task_watch.log`
- `<compiler>/_log/gulpfile.log`

Use [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md) for the expected watch/browser behavior and [Synticore Builder Guide - Watch Triggers Guide](/wiki/builder/example-watch-triggers.md) if the project depends on custom trigger rules.

### BrowserSync Or Dev Panel Looks Wrong

Check:

- whether you meant to use `watch` or `browser`
- whether the browser is loading from the expected local server
- whether browser-tool state is stale rather than the compiled project output

Then inspect:

- `<project>/_cache/project/dev-panel.json`
- `<project>/_log/task_watch.log`
- `<compiler>/_log/gulpfile.log`

If project output itself looks wrong, step back to a normal `rebuild` before assuming the browser tooling is broken.

### GUI Starts But Task Execution Fails

Check:

- Python on `PATH`
- Node and npm on `PATH`
- GraphicsMagick when image, brand, favicon, or watermark tasks fail
- the selected project path in the GUI

Then compare the same task from a terminal run:

```bash
npm run gulp about -- --project "<path>"
```

If the direct terminal run fails the same way, the problem is probably toolchain or project state rather than the GUI itself.

### Migration Or Version Prompt Confusion

Run:

```bash
npm run gulp about -- --project "<path>"
```

Check:

- project `info.json`
- compiler `source/resource/info.json`
- reported version status

Use [Synticore Builder Guide - Migration Guide](/wiki/builder/migration.md) when the selected project is older than the compiler and needs upgrade work before normal task execution.

### Image, Brand, Favicon, Or Watermark Tasks Fail

Image-oriented failures often come from missing or broken GraphicsMagick rather than from the project files themselves.

Check:

- that GraphicsMagick is installed and available to the shell
- whether the failing task is `build_image`, `build_brand`, `build_favicon`, or another image-related task
- `<project>/_log/task_<task>.log`
- `<compiler>/_log/gulpfile.log`

Use [Synticore Builder Guide - Setup Guide](/wiki/builder/setup.md) for the environment-side GraphicsMagick steps.

---

## Fast Recovery Sequence

When you do not yet know the failure category, use this order:

1. Run `about`
2. Run `rebuild`
3. Re-run the failing task directly
4. Read the matching project task log
5. Read compiler `gulpfile.log`

This sequence separates path/version problems from stale-output problems before you start chasing narrower symptoms.

---

## Common Causes

- wrong project path
- stale cache or output
- project migration needed
- missing GraphicsMagick
- editing files outside `<project>/in/`
- using `browser` when `watch` was expected
- reading the wrong log file first

---

## Related

- [Synticore Builder Guide - Setup Guide](/wiki/builder/setup.md)
- [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md)
- [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md)
- [Synticore Builder Guide - Terminal Task Reference](/wiki/builder/terminal.md)
- [Synticore Builder Guide - Log Guide](/wiki/builder/log.md)
- [Synticore Builder Guide - Migration Guide](/wiki/builder/migration.md)
