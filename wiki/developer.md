# Synticore Developer Docs

This section is for compiler maintainers and implementation-facing reference material.

If you are trying to build your own website, start with the main [Synticore Builder Guide](/wiki/builder.md).

---

## When To Use This Section

Use these docs when you need to:

- inspect compiler-only behavior
- work on migration or schema internals
- trace implementation-facing package behavior
- track versioned implementation changes in the shipped compiler surface

For normal project authoring, page building, and packaging, go back to the main [Synticore Builder Guide](/wiki/builder.md).

---

## Operations And Maintenance

1. **[Synticore Developer Docs - Maintainer Guide](/wiki/developer/maintainer-guide.md)**
   Follow the recommended reading order and day-to-day maintainer workflows.

2. **[📝 Synticore Changelog](/wiki/changelog.md)**
   Release notes and shipped version summaries.

3. **[Synticore Developer Docs - Validation](/wiki/developer/validation.md)**
   Change-type validation matrix for scaffolding, migration, config, browser-tool, packaging, and versioned work.

4. **[Synticore Developer Docs - Maintenance Tasks](/wiki/developer/maintenance.md)**
   Shipped maintainer tasks and upkeep workflows outside normal build/watch use.

---

## Deep Reference

5. **[Synticore Developer Docs - Config Internals](/wiki/developer/config.md)**
   Schema-source, task-chain, and compiler-side config behavior notes.

6. **[Synticore Developer Docs - Migration Internals](/wiki/developer/migration.md)**
   Migration-registry responsibilities, fixture expectations, and release coordination notes.

7. **[Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md)**
   Maintainer-facing notes for BrowserSync, browser GUI internals, dev-panel behavior, and browser-tool state boundaries.

8. **[Synticore Developer Docs - Watch Trigger Notes](/wiki/developer/watch-triggers.md)**
   Compiler-facing behavior notes for config-driven watch task chaining.

9. **[Synticore Developer Docs - File Include Notes](/wiki/developer/file-include.md)**
   Evaluation order, integration behavior, and implementation-oriented notes.

10. **[Synticore Developer Docs - Cure Time](/wiki/developer/cure-time.md)**
   Shared package behavior used by compiler-side timestamp and duration formatting.
