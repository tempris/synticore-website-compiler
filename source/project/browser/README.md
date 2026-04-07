# Synticore Browser Developer Tools

This directory contains Browsersync-only development assets for Synticore watch mode.

## Intended Purpose

The Browsersync toolkit exists to support watch-time development without changing the built site's authored layout behavior.

- Add debugging helpers during Browsersync watch and serve sessions.
- Add editing-oriented utilities that make live development easier.
- Provide the Browsersync fallback page built from `in/404.html` into `out/404.html`.
- Keep these helpers development-only so normal built site rendering does not depend on them.

## Contract

### Non-Negotiable Rules

- Debug tools must not change document flow or layout metrics.
- Debug tools must not add margin, padding, border-box size, width, height, or positioning offsets to page content.
- Debug tools may use non-layout visual treatments such as `outline`, `box-shadow`, translucent backgrounds, and fixed-position overlays.
- The debug panel itself must be rendered as a viewport overlay (`position: fixed`) so it does not reflow the page.
- Toggling a debug feature on or off must not shift authored content.
- Browsersync debug assets are development-only helpers and must not become required for normal page rendering.
- Panel behaviors such as dragging, momentum, docking, and hide/show sliding are allowed only when they move the overlay itself and never reserve or reclaim space in page content.

### Practical Implications

- Do not add rules like `html.synticore-dev-* body { padding-top: ... }`.
- Do not reserve space for the debug panel inside the document.
- If panel overlap becomes inconvenient, solve it with panel sizing, placement, collapse behavior, or opacity rather than reflowing the page.
- PiP-style motion is acceptable, but the moving element must remain a fixed overlay layer rather than changing any authored element's layout box.
- Heatmap and similar tools should prefer `outline`, `box-shadow`, and translucent overlays over layout-affecting properties.
- Dev-tool-owned UI subtrees should opt out of heatmap-style tools with `.synticore-dev-heatmap-exclude`, and heatmap rules should exclude them by selector match rather than by painting then resetting afterward.
