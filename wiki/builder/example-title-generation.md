# Synticore Builder Guide - Title Generation Example

## Purpose

This page explains automatic page-title generation from filenames or headers.

## Example

```json
{
  "option": {
    "title": {
      "source": "filename",
      "compose": {
        "dirDepth": -1,
        "dirOrder": "leafToRoot",
        "dirJoiner": " - ",
        "titleJoiner": " - "
      }
    }
  }
}
```

## Notes

- `source: filename` derives titles from file names.
- `source: header` uses the first `<h1>`.
- Word handling is controlled via `option.title.name.word` lists such as `acronyms`, `lowercases`, and `propercases`.
