# Synticore Developer Docs - Validation

## Purpose

This page defines the maintainer validation matrix for repository changes.

Use it to decide what to run before merging or versioning work inside the shipped compiler surface.

If you need the list of one-off maintenance tasks, use [Synticore Developer Docs - Maintenance Tasks](/wiki/developer/maintenance.md).

---

## Baseline Sanity Checks

Start here for most behavior changes:

```bash
npm run gulp about -- --project "./project/example"
npm run gulp rebuild -- --project "./project/example"
npm run gulp package -- --project "./project/example"
```

Inspect:

- `project/example/_log/task_*.log`
- `_log/gulpfile.log`

Use these as the default minimum when a change touches project-facing behavior and you do not yet have a narrower validation reason to skip them.

---

## If You Changed Bundled Templates Or Project Scaffolding

Run:

```bash
npm run project:new -- --dir "<target-dir>" --template basic
npm run gulp build -- --project "<target-dir>"
```

Repeat the scaffold check with the specific template you changed when the work is template-specific:

```bash
npm run project:new -- --dir "<target-dir>" --template "<template-name>"
```

Inspect:

- the created scaffold under `<target-dir>`
- a normal build against that scaffolded project
- the resulting project structure and versioned metadata

Use this whenever the change touches bundled templates, template metadata, new-project behavior, or scaffold output assumptions.

---

## If You Changed Migration Behavior

Run:

```bash
npm run gulp project_update -- --project "./project/example"
npm run gulp project_update_full -- --project "./project/example"
```

Then confirm:

- resulting project version state
- migration-related task logs
- updated project output through a normal `build` or `rebuild`

If the change affects version coordination, also re-check [📝 Synticore Changelog](/wiki/changelog.md).

---

## If You Changed Config Or Schema Behavior

Run:

```bash
npm run gulp sort_config -- --project "./project/example"
npm run gulp build_config -- --project "./project/example"
npm run gulp build -- --project "./project/example"
```

Then confirm:

- the relevant schema and default files still match behavior
- task-chain effects still make sense
- user-facing docs and examples still describe the same surface

Use this whenever the change touches configuration semantics, config defaults, config schema, or config-derived behavior.

---

## If You Changed Browser Tooling Or Watch Behavior

Run:

```bash
npm run gulp watch -- --project "./project/example"
```

Then verify:

- BrowserSync startup behavior
- reload timing and rebuild behavior
- dev-panel visibility and state behavior
- relevant watch logs and compiler logs

Use [Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md) when you need the subsystem-specific boundaries or expected local state behavior.

---

## If You Changed Packaging Or Versioned Metadata

Run:

```bash
npm run gulp rebuild -- --project "./project/example"
npm run gulp package -- --project "./project/example"
```

Then confirm:

- the expected package output exists
- package contents still match the intended release shape
- relevant docs and versioned metadata still agree

Use this when the change affects package shape, versioned metadata, or other surfaces that users will see directly in the shipped compiler checkout.

---

## Skip Logic

Not every change needs every check.

Good examples:

- docs-only wording changes do not need a full validation matrix
- template metadata changes should at least justify a fresh `project:new` scaffold pass
- narrow config-doc edits may only need schema/default/docs alignment checks rather than browser-tool validation

When in doubt, start from the baseline sanity checks and add the narrower change-specific checks that match the subsystem you touched.

---

## Related

- [Synticore Developer Docs - Maintainer Guide](/wiki/developer/maintainer-guide.md)
- [Synticore Developer Docs - Maintenance Tasks](/wiki/developer/maintenance.md)
- [Synticore Developer Docs - Migration Internals](/wiki/developer/migration.md)
- [Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md)
