# Synticore Builder Guide - Configuration Example

## Purpose

This page provides practical, copy-ready configuration examples for common use cases.

All examples use current key namespaces for Synticore `v1.1.5`.

---

## Minimal Project Config

```json
{
  "require": {
    "site": {
      "title": "My Site",
      "url": "https://example.com"
    }
  },
  "option": {
    "url": {
      "clean": true,
      "trailing_slash": true
    }
  }
}
```

---

## Navigation: Breadcrumb And ToC

```json
{
  "option": {
    "navigation": {
      "shared": {
        "ignore_patterns": ["index.html", "404.html", "503.html"]
      },
      "breadcrumb": {
        "enable": true,
        "base_path": "",
        "ignore_patterns": null,
        "replace_text": "<!-- breadcrumb -->",
        "root_content": "Home"
      },
      "toc": {
        "enable": true,
        "depth": 4,
        "collapsible": false,
        "selectors": "h1,h2,h3,h4,h5,h6",
        "header_prepend": "<span class=\"counter\"></span>",
        "header_prepend_selectors": "h2,h3,h4,h5,h6",
        "ignore_class": "toc-ignore",
        "ignore_patterns": null,
        "replace_text": "<!-- toc -->",
        "wrap_emoji": null
      }
    }
  }
}
```

---

## JavaScript Minification Profile

```json
{
  "option": {
    "js": {
      "minify": {
        "compress": true,
        "mangle": false,
        "keep_classnames": false,
        "keep_fnames": false
      }
    }
  }
}
```

---

## Syntax Highlight With Generated Imports

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "enable": true,
        "generateImports": true,
        "path": {
          "css": "css/module",
          "js": "js/module"
        },
        "theme": {
          "enable": true,
          "include": ["prism"]
        },
        "language": {
          "enable": true,
          "include": ["html", "css", "javascript"]
        },
        "plugin": {
          "enable": true,
          "include": ["line-numbers", "toolbar", "copy-to-clipboard"]
        }
      }
    }
  }
}
```

---

## Mirror Files Into Output

```json
{
  "option": {
    "mirrors": [
      {
        "source": "in/robots",
        "destination": "",
        "match_pattern": "**/*"
      },
      {
        "source": "in/asset/vendor",
        "destination": "asset/vendor",
        "match_pattern": ["**/*", "!**/*.map"]
      }
    ]
  }
}
```

---

## Packaging: Zip And Directory Output With Custom Target

```json
{
  "option": {
    "package": {
      "output": {
        "zip": true,
        "directory": true
      },
      "ignore": ["example"],
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

---

## Watermark Images By Filename Pattern

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "pattern": "**/*.watermark.*",
          "layers": [
            {
              "image": "brand/_watermark.png",
              "gravity": "Center",
              "opacity": 37.5,
              "resize": 1.0,
              "background": "none",
              "gmOptions": "-tile"
            }
          ]
        }
      ]
    }
  }
}
```

---

## Title Composition From Path And Filename

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
      },
      "name": {
        "case": {
          "preserve": false,
          "enforceCamel": true
        },
        "separator": {
          "separatorsToSpace": ["_", "-"],
          "stripPatterns": [],
          "wordSplitPattern": "[\\s_\\-]+",
          "wordJoinSeparator": " "
        },
        "word": {
          "acronyms": ["HTML", "CSS", "JS", "API", "URL"],
          "lowercases": ["a", "an", "and", "the", "of", "to"],
          "propercases": ["JavaScript", "Synticore"]
        }
      }
    }
  }
}
```

---

## Build And Validate Examples

After applying config changes:

```bash
npm run gulp sort_config -- --project "<project-dir>"
npm run gulp build_config -- --project "<project-dir>"
npm run gulp build -- --project "<project-dir>"
```

For a full refresh when testing config-heavy changes:

```bash
npm run gulp rebuild -- --project "<project-dir>"
```
