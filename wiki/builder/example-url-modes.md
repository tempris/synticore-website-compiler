# Synticore Builder Guide - URL Modes Example

## Purpose

This page shows how `option.url.clean` and `option.url.trailing_slash` affect generated links.

## Example

```json
{
  "option": {
    "url": {
      "clean": true,
      "trailing_slash": true
    }
  }
}
```

## Behavior

- `clean: true` generates links without `.html`.
- `trailing_slash: true` emits directory-style URLs.
- For mixed hosting setups, make sure server rewrite rules match the generated URL style.
