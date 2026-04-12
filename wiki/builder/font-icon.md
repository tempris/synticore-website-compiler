# Synticore Builder Guide - Font Icon Guide

## Purpose

This page documents how font icons are sourced, generated, named, overridden, rebuilt, and styled in Synticore projects.

---

## Input And Output Paths

Source SVG icons are read from:

- `<project>/in/asset/font-icon/<set>/*.svg`

Generated artifacts are written to:

- `<project>/out/asset/font-icon/<set>/` for font files such as `ttf`, `eot`, `woff`, `woff2`, and `svg`
- `<project>/out/asset/css/font-icon/font-icon--<set>.min.css` for compiled set stylesheets
- `<project>/in/asset/css/_variable-font-icon/_<set>.scss` for generated SCSS variables
- `<project>/in/asset/css/_variable-font-icon/_include-all.scss` for the generated aggregate `@use` list

---

## Naming Model

Set and icon names are normalized to lower-hyphen and emitted in canonical form:

- Font family: `font-icon--<set>`
- Icon class: `font-icon--<set>--<icon>`
- Color helper class: `font-icon--color--<set>--<icon>`

If an SVG filename ends with `-RRGGBB`, Synticore also generates color utility variables and classes for that icon.

---

## Rebuild

Useful commands:

```bash
npm run gulp build_font_icon -- --project "<project-dir>"
npm run gulp rebuild_font_icon -- --project "<project-dir>"
```

For active development, normal `watch` mode also tracks font-icon inputs and rebuilds them when related source files change.

---

## Template Override

Font icon CSS is produced through the standard template path:

- `config/default/project/font-icon-template.scss`

Projects can override that template by adding:

- `<project>/font-icon-template.scss`

Resolution order:

1. `<project>/font-icon-template.scss`
2. `config/default/project/font-icon-template.scss`

---

## Troubleshooting

If expected icons or classes are missing:

1. Confirm icon files exist under `in/asset/font-icon/<set>/`.
2. Confirm naming follows expected lower-hyphen patterns.
3. Run `npm run gulp rebuild_font_icon -- --project "<project-dir>"`.
4. Inspect:
- `<project>/_log/task_build_font_icon.log`
- `<compiler>/_log/gulpfile.log`
