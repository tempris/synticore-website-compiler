# Synticore Builder Guide - Build Your First Site

## Purpose

This page is the shortest path from a ready environment to a working site build.

Finish the [Synticore Builder Guide - Setup Guide](/wiki/builder/setup.md) first if you have not already installed dependencies and validated the toolchain.

---

## Step 1: Pick A Project

For the fastest onboarding path, start with the bundled example project:

- `project/example`

Synticore also ships multiple starter templates under `template/`, but those are scaffold sources for creating a new project rather than additional working sample sites. If you want to start from a template instead, use [Synticore Builder Guide - New Project](/wiki/builder/new-project.md).

If you use the GUI, select the example project from the project chooser.

If you use the terminal, pass the project path explicitly:

```bash
npm run gulp build -- --project "./project/example"
```

---

## Step 2: Build Once

Run:

```bash
npm run gulp build -- --project "./project/example"
```

This compiles the project from `in/` to `out/`.

What to check after the build:

- output files exist under `<project>/out/`
- no unexpected task errors appeared
- your project structure still matches the expectations in [Synticore Builder Guide - Project Structure](/wiki/builder/structure.md)

---

## Step 3: Start Watch Mode

When you are ready to work interactively:

```bash
npm run gulp watch -- --project "./project/example"
```

Typical loop:

1. Edit files under `<project>/in/`
2. Let watch rebuild affected output
3. Refresh or inspect the site in the browser
4. Repeat

---

## Step 4: Change Something Real

A good first pass is:

1. change `require.site.title` in `config.json`
2. edit one HTML file under `in/`
3. edit one stylesheet under `in/asset/css/`
4. rebuild or let watch update output

If you need configuration snippets, use the [Synticore Builder Guide - Configuration Example](/wiki/builder/example.md).

---

## Step 5: Package Output

When the site builds the way you want:

```bash
npm run gulp package -- --project "./project/example"
```

Packaged artifacts are written under `<project>/_package/` unless your config changes the package destinations.

---

## Next Reads

- [Synticore Builder Guide - Setup Guide](/wiki/builder/setup.md) for full environment and platform notes
- [Synticore Builder Guide - Templates](/wiki/builder/templates.md) to compare bundled starter templates
- [Synticore Builder Guide - New Project](/wiki/builder/new-project.md) to scaffold a fresh project
- [Synticore Builder Guide - GUI Guide](/wiki/builder/gui.md) to drive the same flow through the desktop app
- [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md) for repeatable day-to-day usage
- [Synticore Builder Guide - File Include Guide](/wiki/builder/file-include.md) for template composition
- [Synticore Builder Guide - Packaging Targets Example](/wiki/builder/example-packaging-targets.md) for deployment-oriented output setup
