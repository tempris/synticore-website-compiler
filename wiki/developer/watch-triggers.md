# Synticore Developer Docs - Watch Trigger Notes

This page covers the compiler-facing view of config-driven watch triggers.

If you only need a practical configuration example, use the builder-facing [Synticore Builder Guide - Watch Triggers Guide](/wiki/builder/example-watch-triggers.md).

---

## Purpose

Watch triggers let projects enqueue additional task chains when matched files emit certain filesystem events during watch mode.

This page is for maintainer-facing behavior notes, not for first-time configuration walkthroughs.

---

## Maintainer View

- The user-facing config surface is `option.watch.triggers`.
- Each entry can declare `match`, `events`, and `tasks`.
- The builder docs should own syntax examples and project-side usage guidance.

Use this page when you need to reason about how the compiler should interpret or schedule those triggers.

---

## Scheduling Notes

- `tasks` must resolve to real registered task IDs.
- Triggered tasks still go through the normal watch scheduler and queue behavior.
- Trigger matching should stay narrow so changed files do not enqueue disproportionately expensive rebuild chains.
- Watch triggers are an extension point for gaps in normal dependency handling, not a substitute for core dependency-aware rebuild behavior.

---

## When To Use This Page

Use this page when you need to:

- reason about compiler-side watch scheduling behavior
- inspect how project trigger rules should interact with the queue
- decide whether a behavior belongs in core dependency logic or in optional trigger config

---

## Related

- [Synticore Builder Guide - Watch Triggers Guide](/wiki/builder/example-watch-triggers.md)
- [Synticore Developer Docs - File Include Notes](/wiki/developer/file-include.md)
- [Synticore Developer Docs - Migration Internals](/wiki/developer/migration.md)
