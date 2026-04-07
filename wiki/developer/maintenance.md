# Synticore Developer Docs - Maintenance Tasks

## Purpose

This page explains the shipped maintainer tasks and one-off upkeep workflows that exist outside the normal build/watch flow.

---

---

## Baseline And Browser Data Updates

Update browser compatibility support data with:

```bash
npm run gulp compiler_update_caniuse
npm run gulp compiler_update_baseline
```

Use these when:

- browser target data becomes stale
- dependency warnings point at outdated compatibility data
- you are preparing a maintenance-oriented update

What to expect:

- `compiler_update_caniuse` updates the `caniuse-lite` browser support data used by stylesheet targeting/autoprefixing
- `compiler_update_baseline` updates the Baseline browser mapping data used by the compiler

What to inspect afterward:

- dependency lockfile changes if package data was updated
- removal of stale-data warnings in follow-up task runs
- a normal build or `about` run if you want to confirm the checkout still behaves normally

---

## Project Path Normalization

Run carefully:

```bash
npm run gulp project_normalize_paths -- --project "<path>"
```

This task is maintenance-oriented and can rewrite references while normalizing project paths.

Use it only when:

- you intentionally want path normalization
- you have reviewed the project state first
- you are prepared to inspect the result carefully

What to inspect afterward:

- renamed files and directories under `in/`
- rewritten references in text files
- a follow-up build or rebuild against the normalized project

Treat this as a review-required task, not a casual cleanup command.

---

## Project Migration Tasks

Standard project update:

```bash
npm run gulp project_update -- --project "<path>"
```

Use this first when you want the normal migration flow toward the current compiler version.

Full project update:

```bash
npm run gulp project_update_full -- --project "<path>"
```

Directed migration:

```bash
npm run gulp project_update_manual -- --project "<path>"
```

Use these when:

- testing project upgrade behavior
- validating migration work
- helping older projects move to the current compiler version

Task intent:

- `project_update` is the standard upgrade path
- `project_update_manual` is the directed/manual migration path between selected versions
- `project_update_full` is the broader full-update path for deeper upgrade coverage from older project states

What to inspect afterward:

- the resulting project version state
- migration-related task logs
- the updated project behavior through a normal `about`, `build`, or `rebuild` run

For migration-specific responsibilities, use [Synticore Developer Docs - Migration Internals](/wiki/developer/migration.md).

---

## Related

- [Synticore Developer Docs - Maintainer Guide](/wiki/developer/maintainer-guide.md)
- [Synticore Developer Docs - Migration Internals](/wiki/developer/migration.md)
- [Synticore Developer Docs - Validation](/wiki/developer/validation.md)
