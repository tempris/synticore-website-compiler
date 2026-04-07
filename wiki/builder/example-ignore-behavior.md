# Synticore Builder Guide - Ignore Behavior Example

## Purpose

This page explains path ignore behavior used by compilation and sitemap generation.

## Example

```json
{
  "option": {
    "path": {
      "ignore_prefix": "_",
      "ignore_sitemap": ["404", "503"]
    }
  }
}
```

## Notes

- Files and folders with `ignore_prefix` are excluded from normal page processing.
- `ignore_sitemap` excludes selected routes from generated sitemap output.
- Use these settings for internal partials and non-indexable pages.
