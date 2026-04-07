# Synticore Developer Docs - File Include Notes

This page covers implementation-aware and advanced behavior notes for Synticore's `cure-gulp-file-include` integration.

If you primarily need feature usage and syntax examples, use the builder-facing [Synticore Builder Guide - File Include Guide](/wiki/builder/file-include.md).

---

## Behavior Notes

- `@@if` and `@@for` in `cure-gulp-file-include` use dynamic evaluation through `new Function` with context-scoped access.
- `@@if` supports branch chains with optional `@@elseif` blocks and an optional `@@else` fallback.
- In `@@if` and `@@for` expressions, prefer explicit `context.*` access.
- Inside `@@for` output markup, prefer backtick interpolation for item values.
- Variable replacement is direct token lookup such as `@@title` or `@@site.name`, rather than `@@context.title`.
- `include_once` dedupe is path-string keyed and scoped by source file.
- Recursion protection includes a self-include check.
- Some parse or read failures may `console.error(...)` and return instead of throwing richer diagnostics.
- In Synticore task integration, HTML-include-affecting inputs include `in/_html/**/*.json` in addition to `in/_html/**/*.html` and `in/_html/**/*.md`.

---

## Evaluation Order

Processing order is:

1. Strip HTML-commented `@@include(...)`
2. `@@if`
3. `@@for`
4. Variable replacement
5. `@@include_once`
6. `@@include`
7. `@@loop`

Why this order matters:

- Conditionals and `for` blocks run before include and loop expansion, so top-level control flow is decided early.
- Variable replacement runs before include and loop calls in the current text scope.
- Includes and loops recurse into their own content, so nested directives still resolve.

---

## When To Use This Page

Use this page when you need to:

- debug why include syntax resolves in a certain order
- inspect `cure-gulp-file-include` integration behavior
- reason about recursion, scoping, or dynamic evaluation details
- understand watch and cache implications around include inputs
