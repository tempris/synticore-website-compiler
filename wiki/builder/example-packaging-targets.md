# Synticore Builder Guide - Packaging Targets Example

## Purpose

This page explains how to configure multiple package targets from `out/`.

## Example

```json
{
  "option": {
    "package": {
      "output": {
        "zip": true,
        "directory": true
      },
      "targets": [
        {
          "suffix": "",
          "paths": [
            {
              "source": "out",
              "destination": "",
              "ignore": [],
              "no_ignore": false
            }
          ]
        },
        {
          "suffix": "static",
          "paths": [
            {
              "source": "out/asset",
              "destination": "asset",
              "ignore": ["**/*.map"],
              "no_ignore": false
            }
          ]
        }
      ]
    }
  }
}
```

## Notes

- `targets[]` lets you create multiple package variants.
- `suffix` differentiates package outputs.
- Each target can map multiple source paths.
