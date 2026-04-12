# Synticore Builder Guide - Setup Guide

## Purpose

This page is for environment setup only: prerequisites, installation, and toolchain validation.

Use it when your machine is not ready yet or when you need to re-validate the local toolchain.

If you want the shortest path to a successful first build, start with [Synticore Builder Guide - Build Your First Site](/wiki/builder/first-site.md).

If your environment is already working and you want repeatable project workflows, use [Synticore Builder Guide - Workflow](/wiki/builder/workflow.md).

---

## Requirements

### Operating System

- Windows or Linux
- macOS code paths exist in GUI helpers, but macOS is not a primary tested platform for this repo

### Required Tools

- Node.js 20+ and npm
- GraphicsMagick for brand and watermark image workflows
- Python 3.12+ for repo-maintenance helpers such as the shipped git hooks

### Repo-Shipped Install Media

- Windows installers in `source/setup/windows/install/`
- Linux Node tarball in `source/setup/linux/install/`

If you already have compatible versions installed globally, you can use those instead.

---

## Install Steps

### Windows

1. Install Python 3.12 or newer.
2. Install Node.js 20 or newer.
3. Ensure both are on `PATH`.
4. Install GraphicsMagick or make sure it is available to the shell.
5. Open a terminal in the repository root.

Verify:

```bash
python --version
node -v
npm -v
```

### Linux

1. Install Python and `pip`:

```bash
sudo apt update
sudo apt install -y python3 python3-pip
```

2. Install Node.js 20 or newer.
3. Install GraphicsMagick:

```bash
sudo apt install -y graphicsmagick
```

Verify:

```bash
python3 --version
node -v
npm -v
```

---

## Install Repository Dependencies

From repository root:

```bash
./setup.sh
setup.cmd
```

These root setup helpers install the repository's Node/npm dependencies only. Git-hook setup remains a maintainer-only step under `_development/script/hooks-install/`.

---

## Validate The Toolchain

Use this checklist after setup:

1. `python --version` or `python3 --version`
2. `node -v`
3. `npm -v`
4. `npm run gulp about -- --project "<project-dir>"` exits cleanly

Use a real checked-out project for `<project-dir>`, such as the [Synticore Website Compiler Example Repository](https://github.com/tempris/synticore-website-compiler-example) or a project you created through the new-project flow.

If those checks pass, continue with [Synticore Builder Guide - Build Your First Site](/wiki/builder/first-site.md).

---

## Git Attributes For Stable Caching

Synticore cache signatures are content-byte hashes. If two machines check out the same text file with different line endings, signatures can differ even when visible text is identical.

For shared projects or cross-platform contributors, add a repo-root `.gitattributes` such as:

```gitattributes
* text=auto eol=lf

*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.webp binary
*.ico binary
*.pdf binary
*.zip binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary
*.mp3 binary
*.mp4 binary
*.webm binary
*.ogg binary
```

After adding rules:

```bash
git add --renormalize .
git commit -m "Normalize line endings via .gitattributes"
```

---

## Troubleshooting

### Python Not Found

- Windows: install Python and ensure `PATH` was enabled
- Linux: use `python3` explicitly if `python` is not available

### Node Or Npm Problems

- Reinstall Node.js 20 or newer
- Re-run `npm install`

### GraphicsMagick Issues

- Install or repair GraphicsMagick
- Retry image-related tasks such as `build_image`, `build_brand`, or `build_favicon`

### Toolchain Validation Fails

- Run `npm run gulp about -- --project "<project-dir>"` directly
- If that still fails, use [Synticore Builder Guide - Log Guide](/wiki/builder/log.md) to inspect the relevant logs
- Use [Synticore Builder Guide - Troubleshooting](/wiki/builder/troubleshooting.md) if you need the symptom-first recovery path after the basic toolchain checks
