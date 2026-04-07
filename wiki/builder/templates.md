# Synticore Builder Guide - Templates

## Purpose

This page explains the project templates bundled with the compiler and how they differ from the example project.

If you want the fastest path to a working build, use the bundled example project and start with [Synticore Builder Guide - Build Your First Site](/wiki/builder/first-site.md).

If you want to start a new site from a scaffold, use [Synticore Builder Guide - New Project](/wiki/builder/new-project.md).

---

## Example Project Vs Templates

Synticore ships:

- one bundled example project at `project/example`
- multiple starter templates under `template/`

Use the example project when you want:

- the fastest possible first successful build
- a reference project that already contains real pages, assets, and examples
- a place to inspect how features work in a fully populated site

Use a template when you want:

- a fresh project scaffold
- a starter focused on a specific site shape
- a cleaner baseline than the larger example project

---

## Available Templates

- `basic` - General marketing/site starter with homepage, error pages, and shared basics
- `minimal` - Smallest practical site starter with one page and very light framing
- `landing` - Single-page campaign or product-launch starter
- `content` - Blog/docs/content-heavy starter
- `docs-versioned` - Versioned documentation starter with docs pages, migration notes, and changelog patterns
- `app-shell` - Dashboard or web-app shell starter with stronger UI framing
- `commerce-lite` - Lightweight catalog/product starter
- `event-campaign` - Event or conference campaign starter
- `local-business` - Service-area business starter with local-SEO-friendly sections
- `portfolio-studio` - Portfolio or agency starter with project/case-study presentation
- `saas-marketing` - SaaS marketing site starter with pricing and conversion-oriented sections

Shared template content also exists under `template/_shared`, but that is internal scaffold material rather than a selectable template.

---

## How Templates Are Defined

Each template lives under:

- `template/<template>/`

Each selectable template includes:

- `template.schema.json` for template metadata such as id, label, and description
- the scaffold files copied into a new project

The standalone new-project flow and the GUI both discover templates from that metadata.

---

## Choose A Starting Point

- Use `basic` if you want a general-purpose multi-page starter
- Use `minimal` if you want the smallest scaffold possible
- Use `content` or `docs-versioned` if your site is documentation or article heavy
- Use `landing`, `event-campaign`, or `saas-marketing` when the site is campaign-first
- Use `portfolio-studio` or `local-business` when the site shape is domain-specific enough to benefit from a tailored starter

If you are unsure, start with `basic` or `minimal`.

---

## Next Reads

- [Synticore Builder Guide - New Project](/wiki/builder/new-project.md)
- [Synticore Builder Guide - Project Structure](/wiki/builder/structure.md)
- [Synticore Builder Guide - Build Your First Site](/wiki/builder/first-site.md)
