# Synticore Developer Docs - Maintainer Guide

## Purpose

This page is the best starting point for people maintaining or extending the compiler itself.

Use it as the high-level path before diving into the maintainer-only reference pages.

---

## Start Here

Read these in order:

1. [📝 Synticore Changelog](/wiki/changelog.md)
   Re-anchor yourself on what changed recently before touching implementation.

2. [Synticore Developer Docs - Config Internals](/wiki/developer/config.md)
   Use this when you need schema-source behavior, task-chain rules, or compiler-side config resolution.

3. [Synticore Developer Docs - Migration Internals](/wiki/developer/migration.md)
   Use this when a change affects project upgrades, version coordination, or migration fixtures.

4. [Synticore Developer Docs - Validation](/wiki/developer/validation.md)
   Use this to choose the right verification commands for the subsystem you changed before broadening into versioned package checks.

5. [Synticore Developer Docs - Maintenance Tasks](/wiki/developer/maintenance.md)
   Use this when the work involves shipped maintainer tasks such as migration, path normalization, or browser-data upkeep.

6. [Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md)
   Use this when a change touches BrowserSync, injected browser tools, or browser-tool state behavior.

7. [Synticore Developer Docs - File Include Notes](/wiki/developer/file-include.md)
   Use this when you are inside one of the more behavior-sensitive HTML processing paths.

---

## Typical Maintainer Workflows

### Change Compiler Behavior

1. Identify the affected task or subsystem.
2. Reproduce it against an explicit project path.
3. Validate the project-facing behavior through the normal user docs flow.
4. Inspect compiler logs and subsystem behavior.
5. Re-run a broader build or package pass before considering the change done.

Typical commands:

```bash
npm run gulp about -- --project "<project-dir>"
npm run gulp rebuild -- --project "<project-dir>"
npm run gulp package -- --project "<project-dir>"
```

### Change Config-Oriented Behavior

1. Update the implementation.
2. Re-check the relevant config behavior against schema and defaults.
3. Confirm any `task_chain` or config-resolution effects still make sense.
4. Rebuild config and then rebuild the project.
5. Confirm logs and output match the intended behavior.

Typical commands:

```bash
npm run gulp sort_config -- --project "<project-dir>"
npm run gulp build_config -- --project "<project-dir>"
npm run gulp build -- --project "<project-dir>"
```

### Investigate Watch Problems

1. Reproduce the issue under watch mode.
2. Check whether the behavior is normal dependency handling, a custom watch trigger, or stale cache state.
3. Inspect compiler logs and any subsystem notes that apply.
4. Rebuild cleanly before assuming the issue is scheduler-level.

### Prepare A Versioned Change

1. Update or verify release notes in [📝 Synticore Changelog](/wiki/changelog.md).
2. Use [Synticore Developer Docs - Validation](/wiki/developer/validation.md) to choose the minimum checks that match the touched areas.
3. Run a clean build.
4. Run package output generation.
5. Validate that versioned docs and metadata still agree.

---

## Companion Developer Notes

Use the narrower developer pages when you are inside one subsystem:

- [Synticore Developer Docs - File Include Notes](/wiki/developer/file-include.md)
- [Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md)
- [Synticore Developer Docs - Watch Trigger Notes](/wiki/developer/watch-triggers.md)
- [Synticore Developer Docs - Cure Time](/wiki/developer/cure-time.md)
- [Synticore Developer Docs - Maintenance Tasks](/wiki/developer/maintenance.md)
- [Synticore Developer Docs - Validation](/wiki/developer/validation.md)

---

## Rule Of Thumb

- Use the user docs when validating how the compiler should feel to a site builder.
- Use the developer docs when validating how the compiler actually behaves internally.
- Prefer explicit project-path validation over guessing, then narrow into compiler internals only where needed.
