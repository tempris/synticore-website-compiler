# Synticore Developer Docs - Browser Tooling Notes

## Purpose

This page explains the maintainer-facing view of the BrowserSync-powered browser tooling used during watch/browser sessions.

If you only need to use the browser tools during project work, use the builder-facing [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md).

---

## Scope

The browser tooling in this repo includes:

- BrowserSync serving during watch/browser tasks
- the browser GUI launcher and browser GUI runtime surface
- the injected Synticore browser dev panel
- browser-side log capture surfaces
- BrowserSync UI integration and styling

These are local development tools, not packaged site features.

---

## Maintainer Mental Model

- The builder docs own the user-facing explanation of `build` vs `watch` vs `browser`.
- This page owns the tooling-side model: injection, persistence boundaries, and BrowserSync-specific behavior.

In practice, browser tooling behavior is centered in `gulpfile.js` plus assets under `source/project/browser/`.

The current browser-tool asset project also carries its own version file at `source/project/browser/info.json`, which should stay aligned with `source/resource/info.json` when release/version work touches the browser tooling bundle.

The source-side contract is also documented in `source/project/browser/README.md`, including the non-layout-affecting overlay rule for debug tooling.

Browser GUI implementation details are split between:

- `source/node_modules_custom/compiler-gui-browser/index.js` for launcher/backend behavior
- `source/project/gui/` for the GUI project source and built payload
- `_development/wiki/gui.md` for the repo-internal GUI notes that should not be duplicated in builder docs

---

## Browser GUI Boundary

- Builder docs should explain how to use the browser GUI.
- Developer docs and `_development/wiki/gui.md` should explain how the browser GUI is built, routed, configured, and tested.

When GUI implementation changes touch source layout, runtime logging, hidden dev tooling, LAN auth routing, or GUI-project-specific config/schema keys, update the developer/internal docs instead of pushing that detail into `readme.md` or `wiki/builder/*.md`.

---

## Persistence Boundaries

Browser tooling uses more than one kind of state.

- Some state is browser-local and should stay personal to one client.
- Some state is project-scoped shared tooling state.
- None of this should be treated like normal authored site content.

When changing these features, preserve the distinction between personal UI state and shared project-scoped dev defaults.

In the current implementation, shared state is persisted in `_cache/project/dev-panel.json` and exposed through the BrowserSync-side route `/__synticore_dev_panel_state__`.

The current split is:

- browser-local panel state in `localStorage` for panel position/dock/hidden/tab state
- shared project-side state for grid settings and log-filter/search state via `/__synticore_dev_panel_state__`

---

## Injection And Routes

Browser tooling behavior depends on BrowserSync-side serving and injected assets/routes rather than on authored project HTML alone.

That means maintainer changes in this area should consider:

- BrowserSync middleware behavior
- served asset paths for browser tooling
- compatibility between injected routes and the current watch/browser session

The current repo also injects custom BrowserSync UI client behavior and styling from the BrowserSync side rather than patching third-party UI files directly.

The current browser-tool bundle uses separate built assets for the page overlay and the panel UI:

- `source/project/browser/out/asset/css/dev/dev-page.min.css`
- `source/project/browser/out/asset/css/dev/dev-panel.min.css`
- `source/project/browser/out/asset/js/dev-overlay.min.js`

The panel markup comes from `source/project/browser/out/dev-panel.html`, and the live panel mounts into a Shadow DOM host so panel styling does not leak into the served page.

The browser-tool asset project currently includes a console playground page under `source/project/browser/in/console-playground.html`, which is useful when validating the dev-panel log capture surface.

---

## When To Use This Page

Use this page when you need to:

- reason about browser-tool persistence boundaries
- change BrowserSync injection or serving behavior
- inspect the dev-panel/tooling architecture instead of just using it

---

## Related

- [Synticore Developer Docs - Maintainer Guide](/wiki/developer/maintainer-guide.md)
- [Synticore Developer Docs - Watch Trigger Notes](/wiki/developer/watch-triggers.md)
- [Synticore Builder Guide - Browser And Watch Tools](/wiki/builder/browser.md)
