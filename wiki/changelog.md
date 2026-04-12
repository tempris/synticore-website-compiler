# 📝 Synticore Changelog

Current documented release: `1.1.5`.

## [1.1.5] - 2026-04-10

### Summary

#### For Compiler Users

- Added a `1.1.5` project migration that moves legacy `_html/config/template/*.hbs` files into `_html/config/` so config include templates live where the current compiler expects them.
- Fixed the HTML pipeline so `_html/config/*.hbs` files are materialized into sibling `_html/config/*.html` files before normal page compilation, restoring config-include regeneration during builds and watch runs.
- Fixed watch-mode ownership around `_html/config/*` includes so generated sibling `.html` files no longer self-trigger rebuild loops when a same-name `.hbs` source owns that include.

#### For Developers

- Documented the new `1.1.5` migration step and aligned shipped version metadata with the restored config-template compilation flow.

## [1.1.4] - 2026-04-07

### Summary

#### For Compiler Users

- Expanded the browser GUI into a more complete local control surface with a dedicated Wiki tab, live repo-doc rendering, breadcrumb navigation, in-page TOC support, Prism-highlighted code blocks, and cleaner LAN/not-found page handling.
- Improved browser GUI project editing with better custom-key/schema behavior, safer missing-schema fallback, reduced config-watch churn, and more deterministic config/schema save ordering.
- Strengthened project migration and upgrade support, especially around 1.1.0, including automatic rewrites for moved `CONFIG_*` and `AUTOMATIC_*` tokens and migration of `font_icon` naming to `font-icon`.
- Added comprehensive path normalization support to convert project paths to lowercase kebab-case and update related in-file references, SCSS imports, font-icon references, URLs, manifests, cache keys, and sourcemaps.
- Improved URL and output generation with cleaner URL settings, trailing-slash support, directory-index routing support, sitemap behavior that respects URL settings, and automatic helpers such as `AUTOMATIC_PAGE_URL` and `AUTOMATIC_FILE_PATH`.
- Expanded file-include capabilities with `@@elseif`, `@@else`, collection-aware single-item selection, loop `prev` and `next`, richer loop filters, and safer include-path parsing on Windows.
- Improved image handling with metadata stripping, EXIF auto-orient, thumbnail support, interlacing controls, richer watermark options, image-dimension caching, and include/exclude controls for minification.
- Improved packaging and output workflows with custom zip source/destination support, mirror rename support, more reliable packaging behavior, and cache-aware skipping of unchanged package outputs.
- Fixed many HTML/build edge cases involving markdown, automatic/manual titles, breadcrumbs, ignored files, deleted/moved pages, sequential processing, and stale output cleanup.
- Improved watch/build correctness with better config-change handling, dependency-triggered rebuilds, cache invalidation, external change detection, output pruning, and fixes for missed triggers, loops, and incomplete rebuilds.
- Expanded syntax-highlighting support with configurable Prism inclusion, Prism Live support/fixes, and improved example/demo coverage.
- Updated gallery/media behavior with newer PhotoSwipe integration, cleaner URL-history behavior for galleries, optional mobile background-tap close behavior, and added slideshow/example coverage.

#### For Developers

- Added a dedicated internal browser GUI wiki surface and continued moving browser-GUI implementation details out of user-facing docs and into developer/internal documentation.
- Improved browser GUI maintainability with clearer stylesheet separation for the wiki surface, tighter Prism asset wiring, and multiple GUI wiki interaction/polish fixes.
- Changed browser GUI task-group population so the `Test` group only appears when the Synticore compiler repository itself resolves as a Git repository, and the GUI emits a notice only when that group is added.
- Added a BrowserSync debugging overlay, browser dev panel, and in-browser console for faster local debugging.
- Improved the dev panel with better log controls, clearer tab navigation, project-local option persistence, startup-position fixes, and animation/flicker fixes.
- Hardened local watch and reload behavior with serialized scheduling, queued and deduplicated rebuilds, retry handling, better queue-drain status reporting, safer reload timing, and improved BrowserSync/sitemap lock diagnostics.
- Expanded and stabilized the GUI with a schema-driven config editor, better tooltips, loading states, a cleaner new-project flow, improved recent-project handling, and fixes for Python/Node bridge startup hangs.
- Added a minimal starter template and decentralized template metadata to improve project creation and maintenance.
- Improved logging and diagnostics with more readable output, better multiline/ANSI handling, configurable timestamps, fuller error stacks, and clearer tooltip/log instrumentation.
- Improved repository and setup workflows with explicit project-path task execution, encoding audits, faster pre-commit encoding checks, newline/versioning fixes, and broader file/layout cleanup.
- Added or improved maintenance tooling for migrations, browser baseline updates, and documentation/wiki alignment with actual compiler behavior.

### Details

#### Detailed For Compiler Users

##### Browser GUI Wiki, LAN Access, and Not-Found Improvements

The browser GUI now includes a real local Wiki tab instead of relying only on task/config surfaces. It can render the repo `README.md` and `wiki/*` pages live, keep internal wiki navigation inside the GUI, generate breadcrumbs and an in-page table of contents, and highlight code blocks with the same Prism language set used by the source docs. The related GUI LAN-access and GUI-specific not-found flows were also tightened up so the browser GUI behaves more like a complete local app surface rather than a thin launcher page.

##### Better Browser GUI Config Editing and Persistence

The browser GUI config editor became more dependable for real project work. Custom-key schema editing is safer, missing project schema state now falls back to a valid starter shape, config-watch polling is lighter, and GUI-driven config/config-schema saves now use deterministic ordering that matches the normal compiler-side JSON handling more closely.

##### Stronger Migration and Upgrade Support

Project upgrade support is much more robust, especially for the 1.1.0-era migration path. The compiler now handles more automatic rewrites for moved `CONFIG_*` and `AUTOMATIC_*` tokens, performs better migration of `font_icon` naming to `font-icon`, and reduces the amount of manual cleanup required after moving an older project forward.

##### Comprehensive Path Normalization

Path normalization is now a major supported workflow rather than an ad hoc cleanup step. It can convert project paths to lowercase kebab-case and update related references across SCSS imports, font-icon assets, HTML references, URLs, manifests, cache keys, and sourcemaps so projects stay internally consistent after normalization.

##### Improved URL and Output Generation

Generated output is more flexible and more predictable. Clean URL settings, trailing-slash support, directory-index routing behavior, sitemap generation that respects URL configuration, and helpers such as `AUTOMATIC_PAGE_URL` and `AUTOMATIC_FILE_PATH` make the compiler easier to use across different URL strategies.

##### Expanded File-Include Capabilities

The file-include system now supports more expressive conditional and iterative behavior. `@@elseif`, `@@else`, collection-aware single-item selection, `prev`/`next` loop references, richer filters, and safer Windows path parsing give template authors a broader and more reliable include feature set.

##### Improved Image Handling

Image processing now covers more real-world cases. Metadata stripping, EXIF auto-orient, thumbnail support, interlacing controls, richer watermark options, image-dimension caching, and include/exclude minification controls improve both output quality and configuration flexibility for sites with heavier media needs.

##### Better Packaging and Output Workflows

Packaging and deploy-oriented output handling are more capable. Custom zip source/destination behavior, mirror rename support, stronger packaging reliability, and cache-aware skipping of unchanged package outputs help reduce unnecessary rebuild/package work and make artifact generation more configurable.

##### HTML and Build Edge-Case Fixes

A large set of HTML/build correctness issues were addressed. These include markdown behavior, title generation, breadcrumb handling, ignored-file treatment, moved/deleted page behavior, sequential processing issues, and stale output cleanup, all of which improve confidence in generated site output.

##### Watch and Build Correctness Improvements

Incremental build behavior is more dependable overall. Config-change handling is better, dependency-triggered rebuilds are more accurate, cache invalidation is stronger, external changes are detected more reliably, output pruning is cleaner, and several missed-trigger and rebuild-loop cases were resolved.

##### Expanded Syntax-Highlighting Support

Syntax-highlighting support is broader and easier to configure. Prism inclusion is more flexible, Prism Live support and related fixes are stronger, and example/demo coverage is better, which is especially useful for documentation or tutorial-heavy projects.

##### Updated Gallery and Media Behavior

Gallery behavior is cleaner for end users. PhotoSwipe integration was updated, gallery interactions no longer pollute browser URL history unnecessarily, optional mobile background-tap close behavior was added, and slideshow/example coverage was expanded so the media tooling is both stronger and better demonstrated.

#### Detailed For Developers

##### Browser GUI Internal Wiki and Surface Maintenance

Browser GUI maintainers now have a larger internal documentation/testing surface to work with. The GUI wiki tab gained numbering, TOC interaction polish, sticky-layout fixes, Prism language/plugin support, and dedicated styling separation in `_wiki.scss`, which makes the wiki surface easier to iterate on without mixing it into unrelated status/log styles.

##### Developer/Internal Docs Boundary Cleanup

The browser GUI docs were also rebalanced so user-facing pages stay focused on using the GUI, while implementation details now live in the maintainer-facing docs. `wiki/developer/browser.md` now explicitly owns the browser-GUI internal boundary, and `_development/wiki/gui.md` remains the detailed internal reference for source layout, hidden tooling, and GUI-specific maintainer notes.

##### Browser GUI Git-Aware Test Task Group

The browser GUI task surface now treats the `Test` task group as conditional instead of unconditional. When the Synticore compiler repository itself resolves as a Git working tree, the GUI includes the `Test` group and records a notice that it was added; when the compiler repository is not a Git repository, the group is omitted and no extra GUI log entry is produced.

##### BrowserSync Debugging Overlay, Dev Panel, and In-Browser Console

Local development now includes a larger browser-side debugging surface. The BrowserSync overlay, dedicated dev panel, and in-browser console make it easier to inspect runtime behavior, watch events, and live output without bouncing constantly between the browser and terminal logs.

##### Dev Panel Log Controls, Navigation, Persistence, and Visual Polish

The dev panel itself received meaningful quality-of-life work. Log controls are clearer, tab navigation is easier to read, option persistence is more predictable, initial positioning is more reliable, and startup animation/flicker issues were cleaned up so the panel feels more stable on page load.

##### Hardened Watch and Reload Behavior

Watch mode and BrowserSync reload behavior were strengthened to reduce noisy or unstable rebuild cycles. The scheduler is more serialized, duplicate rebuilds are reduced, failed chains are handled more gracefully, queue-drain status reporting is clearer, reload timing is safer, and sitemap-lock diagnostics are better when Windows file-handle conflicts occur.

##### GUI Improvements and Stability Work

The desktop GUI was expanded and stabilized with a schema-driven config editor, better tooltips, loading states, a cleaner project-creation flow, improved recent-project handling, and fixes around Python/Node bridge startup hangs. This makes the GUI more usable as a day-to-day task runner rather than just a thin launcher.

##### Minimal Starter Template and Decentralized Template Metadata

Project creation was improved both functionally and structurally. The new minimal starter template gives a simpler baseline for new projects, while decentralized template metadata makes templates easier to maintain and extend over time.

##### Logging and Diagnostics Improvements

Developer diagnostics are broader and easier to read. Log output is more beginner-friendly, multiline and ANSI handling is cleaner, timestamp formatting is more configurable, error stacks are fuller, and related tooltip/log instrumentation is clearer when debugging runtime or build issues.

##### Repository and Setup Workflow Improvements

The repo and setup flow were tightened up to reduce environmental drift. Tasks now rely more cleanly on explicit project-path execution, encoding audits and faster pre-commit encoding checks were added, newline/versioning inconsistencies were addressed, and surrounding file/layout cleanup reduced friction in routine maintenance.

##### Maintenance Tooling and Documentation Alignment

Maintenance support improved through stronger migration utilities, browser baseline update tooling, and better alignment between docs/wiki guidance and actual compiler behavior. This lowers the cost of maintaining the repo and reduces mismatch between written guidance and shipped behavior.
