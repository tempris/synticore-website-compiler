# Synticore Website Compiler

Synticore is a static-site build pipeline for HTML, CSS/SCSS, JavaScript, and assets.

This repository contains the compiler itself, the browser GUI, bundled resources, project templates, and the documentation source.

## Documentation

- Builder docs: [Synticore Builder Guide](/wiki/builder.md)
- Developer docs: [Synticore Developer Docs](/wiki/developer.md)
- Changelog: [Synticore Changelog](/wiki/changelog.md)

Use the builder docs if you are trying to get a site running.

Use the developer docs if you are maintaining or extending the compiler itself.

## Quick Entry Points

Repository root commands:

```bash
./setup.sh
setup.cmd
```

After dependencies are installed:

- GUI-first usage: [Synticore Builder Guide - GUI Guide](/wiki/builder/gui.md)
- First successful build: [Synticore Builder Guide - Build Your First Site](/wiki/builder/first-site.md)
- Terminal task reference: [Synticore Builder Guide - Terminal Task Reference](/wiki/builder/terminal.md)

Node-only browser GUI entry points:

```bash
npm run gui:web
./gui.sh
gui.cmd
```

For browser GUI usage, start with [Synticore Builder Guide - GUI Guide](/wiki/builder/gui.md).

For browser GUI internals and maintainer-facing details, use [Synticore Developer Docs - Browser Tooling Notes](/wiki/developer/browser.md) and [Synticore Internal Docs - GUI](/_development/wiki/gui.md).

## Repository Layout

- `gulpfile.js` - compiler pipeline and task registration
- `gui.cmd` / `gui.sh` - browser GUI launchers
- `setup.cmd` / `setup.sh` - repository npm setup helpers
- `config/` - compiler defaults and app settings
- `source/` - bundled resources, custom modules, migration/test data
- `project/` - example and template projects
- `wiki/builder/` - builder-facing documentation pages
- `wiki/developer/` - developer-facing documentation pages

## Related

- [Synticore Example Site](https://example.synticore.cureinteractive.com)
- [Synticore Website Compiler Releases](https://github.com/cureinteractive/synticore-website-compiler/releases)
- [Synticore Website Compiler Issue Tracker](https://github.com/cureinteractive/synticore-website-compiler/issues)
