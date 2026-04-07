# Synticore Browser GUI Project

This directory is a Synticore project used to build the browser GUI.

## Intended Purpose

- Build the browser-served GUI page from normal Synticore project inputs under `in/`.
- Keep GUI page assets authored in project form instead of ad hoc root-level static files.
- Emit the built browser GUI into `source/project/gui/out/`, which is what the Node launcher serves.
- Emit a separate built LAN auth page at `source/project/gui/out/lan-access/`, which the Node launcher redirects to for unauthorized LAN requests.
- Emit the GUI `404.html` page into `source/project/gui/out/404.html` for unmatched browser-GUI routes.

## Contract

- `source/project/gui/in/` is the source-of-truth for the browser GUI page and assets.
- `source/project/gui/out/` is the built output served by the browser GUI launcher.
- This project is the source-of-truth for the shipped browser GUI surface.

Implementation details for the browser GUI project belong in maintainer-facing docs, not here. Use `wiki/developer/browser.md` and `_development/wiki/gui.md` for internals.
