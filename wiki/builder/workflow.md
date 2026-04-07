# Synticore Builder Guide - Workflow

## Purpose

This page provides practical, repeatable workflows for common day-to-day site-building tasks after your environment already works.

If you need compiler maintenance, migration internals, or low-level debugging flows, use the [Synticore Developer Docs](/wiki/developer.md).

---

## Before You Use This Page

Use this page when your environment already works and you want a repeatable operating routine.

For the shortest first-install and first-build path, use [Synticore Builder Guide - Build Your First Site](/wiki/builder/first-site.md).

If you need the browser-side development model, dev panel, or BrowserSync context, use [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md).

If you want to scaffold a fresh project instead of working from the bundled example project, use [Synticore Builder Guide - New Project](/wiki/builder/new-project.md).

If you want help choosing a starting point before scaffolding, use [Synticore Builder Guide - Templates](/wiki/builder/templates.md).

---

## Daily Local Development Workflow

Use watch mode for active development:

```bash
npm run gulp watch -- --project "./project/example"
```

Typical loop:

1. Edit source files under `<project>/in/`
2. Let watch rebuild affected assets and pages
3. Verify output in the browser
4. Repeat

If behavior looks stale:

```bash
npm run gulp rebuild -- --project "./project/example"
```

For project-specific watch trigger rules, see the user-facing [Synticore Builder Guide - Watch Triggers Guide](/wiki/builder/example-watch-triggers.md).

---

## Config-Change Workflow

Use this when `config.json` changes and you want the lowest-friction refresh path before escalating to a full rebuild.

When changing `config.json`:

```bash
npm run gulp sort_config -- --project "./project/example"
npm run gulp build_config -- --project "./project/example"
npm run gulp build -- --project "./project/example"
```

If needed, force a clean config refresh:

```bash
npm run gulp rebuild_config -- --project "./project/example"
```

---

## Asset-Focused Workflow

Use these scoped rebuilds when only one asset family changed and you want faster feedback than a full rebuild.

Use scoped rebuild tasks to keep feedback fast:

```bash
npm run gulp rebuild_stylesheet -- --project "./project/example"
npm run gulp rebuild_javascript -- --project "./project/example"
npm run gulp rebuild_image -- --project "./project/example"
```

Other common targets:

- `rebuild_html`
- `rebuild_font_icon`
- `rebuild_favicon`
- `rebuild_mirror`

For font icon template override details, see [Synticore Builder Guide - Font Icon Guide](/wiki/builder/font-icon.md).

---

## Release Packaging Workflow

Use this when you want a clean package artifact from known-good project output rather than an incremental watch/build state.

1. Run a clean full build:

```bash
npm run gulp reset -- --project "./project/example"
npm run gulp build -- --project "./project/example"
```

2. Produce package outputs:

```bash
npm run gulp package -- --project "./project/example"
```

3. Collect artifacts from project `_package/` or other configured package outputs.

---

## Related

- [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md)
- [Synticore Builder Guide - Terminal Task Reference](/wiki/builder/terminal.md)
- [Synticore Builder Guide - Troubleshooting](/wiki/builder/troubleshooting.md)
- [Synticore Builder Guide - Log Guide](/wiki/builder/log.md)
