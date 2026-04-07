# Synticore Builder Guide - New Project

## Purpose

This page explains how to create a new project from one of the bundled templates.

If you want the fastest path to a successful build without creating a new project yet, use [Synticore Builder Guide - Build Your First Site](/wiki/builder/first-site.md).

---

## Ways To Create A Project

You can create a new project through:

- the GUI new-project flow
- the standalone terminal scaffold command

Both paths use the same template registry under `template/`.

---

## GUI Flow

The GUI exposes a new-project flow that:

- lets you pick a destination directory
- lets you choose from the discovered templates
- shows template labels and descriptions from each template's `template.schema.json`
- runs the standalone scaffold command under the hood
- adds the created project to `config/gui.json` recent projects

Launch the GUI with:

```bash
npm run gui:web
```

Then use the new-project action in the interface to select a template and destination path.

---

## Terminal Flow

Primary command:

```bash
npm run project:new -- --dir "<target-dir>" --template basic
```

Direct script form:

```bash
node source/script/project_new.js --dir "<target-dir>" --template basic
```

Optional flag:

- `--force` to allow overwrite into an existing non-empty target directory

If `--template` is omitted, the default is `basic`.

---

## What The Scaffold Command Does

The standalone new-project script:

- validates the target directory
- copies shared scaffold files from `template/_shared/`
- copies the selected template files from `template/<template>/`
- syncs the new project's `info.json` from the compiler version
- updates `config/gui.json` recent projects

It does not require an existing project and intentionally does not load the main `gulpfile.js`.

---

## Choosing A Template

Template summaries:

- `basic` - general-purpose starter
- `minimal` - smallest starter
- `landing` - single-page campaign/product starter
- `content` - article/docs starter
- `docs-versioned` - versioned docs starter
- `app-shell` - app/dashboard shell starter
- `commerce-lite` - product/catalog starter
- `event-campaign` - event/campaign starter
- `local-business` - local-service starter
- `portfolio-studio` - portfolio/studio starter
- `saas-marketing` - SaaS marketing starter

For fuller template context, use [Synticore Builder Guide - Templates](/wiki/builder/templates.md).

---

## After Creation

Once the scaffold is created:

1. open the project in the GUI or pass it explicitly with `--project`
2. run a build
3. verify output in `out/`
4. start watch mode if needed

Typical first commands:

```bash
npm run gulp build -- --project "<target-dir>"
npm run gulp watch -- --project "<target-dir>"
```

---

## Related

- [Synticore Builder Guide - Templates](/wiki/builder/templates.md)
- [Synticore Builder Guide - Project Structure](/wiki/builder/structure.md)
- [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md)
