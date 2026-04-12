# Synticore Builder Guide - Browser And Watch Tools

## Purpose

This page explains the browser-side development experience: `build`, `watch`, `browser`, BrowserSync, and the in-browser dev tools.

If you need compiler implementation details behind these features, use the developer-facing [Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md).

---

## Build Vs Watch Vs Browser

- `build` runs tasks once and writes output.
- `watch` runs a full build once, then watches source paths and live-reloads BrowserSync on changes.
- `browser` starts BrowserSync only, without build or watch steps.

For normal day-to-day editing, `watch` is the usual starting point.

Use `browser` only when you intentionally want the BrowserSync-serving layer without kicking off a fresh build/watch cycle first.

Example:

```bash
npm run gulp watch -- --project "<project-dir>"
```

---

## When To Use `watch` Vs `browser`

Use `watch` when:

- you are actively editing source files
- you want rebuilds to happen automatically
- you want browser refreshes to follow file changes

Use `browser` when:

- you already have built output you want to serve
- you want the BrowserSync-serving layer without starting a new watch session
- you are debugging the browser-side development surface itself

For most builders, `watch` is the correct day-to-day command.

---

## What BrowserSync Adds

When BrowserSync is active, Synticore serves your project locally and can:

- refresh the browser after rebuilds
- expose a BrowserSync UI page on the BrowserSync UI port
- inject the Synticore browser developer tools during watch/browser sessions

Those tools are for local development only. They are not part of packaged site output.

---

## What You Should Expect To See

In a normal watch/session flow, expect:

- your site served locally through BrowserSync
- automatic page refresh after relevant rebuilds
- a floating Synticore developer panel on served pages
- a BrowserSync controls link from inside the panel when that UI is available

If you only ran `build`, do not expect the BrowserSync/dev-panel experience. That browser tooling belongs to watch/browser serving, not to packaged output.

---

## Dev Panel

During watch/browser sessions, the served page can show a floating dev panel.

The current panel can include:

- a `Tools` view for browser-side development helpers
- a `Log` view for browser console output captured inside the page
- shared controls such as grid settings and log filters/search

Use it when you want fast visual debugging without leaving the browser.

What you can currently do there:

- switch between the `Tool` and `Log` tabs
- toggle heatmap view
- toggle grid overlay and open its extra options
- open BrowserSync controls when available
- inspect browser log output without leaving the page

---

## Browser Console View

The browser-side log view is useful for:

- checking `console.log/info/warn/error` output
- filtering browser-side messages by severity
- searching the captured log surface
- copying the visible log text

This is most useful while iterating in watch mode and comparing page behavior with compiler logs from [Synticore Builder Guide - Log Guide](/wiki/builder/log.md).

What you can currently do in the log area:

- filter visible levels (`Log`, `Info`, `Warn`, `Error`)
- search the captured log text
- copy the visible log output
- clear the current captured output

---

## Shared Vs Local State

Not all browser-tool state behaves the same way.

- Project-scoped shared settings are intended to persist for the project during local development.
- Browser-local state stays with one browser/session and is not meant to be shared across all connected clients.

In the current repo, shared project-side state is stored in `_cache/project/dev-panel.json` through the BrowserSync route `/__synticore_dev_panel_state__`.

In the current implementation:

Practical example:

- grid settings are shared project-side dev state
- log filters/search are also persisted as shared dev-tool state
- panel dock side, hidden state, active tab, and similar personal UI behavior are browser-local

---

## HTTPS And Browser UI

BrowserSync behavior can be influenced through `option.browser.*` in project config.

Typical reasons to touch that config:

- you need local HTTPS
- you need specific certificate paths
- you need to adjust browser-serving behavior during watch/browser tasks

The BrowserSync controls link shown in the dev panel is derived from the served page location so it can follow the current host/port setup.

The current browser-tool overlay is served from built browser-tool assets rather than authored project assets. The active watch/browser session uses:

- `/asset/css/dev/dev-page.min.css`
- `/asset/css/dev/dev-panel.min.css`
- `/asset/js/dev-overlay.min.js`

Use [Synticore Builder Guide - Configuration Reference](/wiki/builder/config.md) for the exact keys.

---

## Quick Trouble Signs

If the browser-side development experience does not look right:

- no dev panel at all: confirm you are using `watch` or `browser`, not just `build`
- stale page behavior: try a normal `rebuild` flow and reload the page
- odd browser-tool state: remember some state is cached for local development and may persist across sessions
- BrowserSync/UI confusion: open the panel link instead of guessing the controls URL manually

Use [Synticore Builder Guide - Log Guide](/wiki/builder/log.md) when you need the compiler/task-side evidence.

---

## Typical Workflow

1. Run `watch` against an explicit project.
2. Open the served page.
3. Use the dev panel only for local inspection and debugging.
4. If needed, open the BrowserSync controls link from the panel.
5. Use [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md) for rebuild patterns and [Synticore Builder Guide - Log Guide](/wiki/builder/log.md) for task/compiler logs.

---

## Related

- [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md)
- [Synticore Builder Guide - Terminal Task Reference](/wiki/builder/terminal.md)
- [Synticore Builder Guide - Configuration Reference](/wiki/builder/config.md)
- [Synticore Builder Guide - Log Guide](/wiki/builder/log.md)
