# Synticore Builder Guide - Configuration Reference

## About This Document

This is the compiler-shipped project-side key-by-key configuration reference for the current compiler version.

- Schema source: `config/default/project/config.schema.json`
- Default value source: `config/default/project/config.json`
- Compiler version context: `source/resource/info.json` (`v1.1.5`)

This page covers the default config surface shipped by the compiler itself.

If a project adds its own optional `config.schema.json`, that project can extend the GUI/editor config surface beyond what is listed here.

Each entry includes:

- **Type**
- **Required**
- **Default**
- **Allowed values**
- **Description**
- **Example**

## How To Use This Reference

- Use this page when you need the exact meaning of a key.
- Change only the options that solve a real project need.
- Rebuild and verify output after changing one group at a time.
- Treat this page as the reference for compiler-owned config keys; project-local schema extensions can add more keys or editor metadata on top.

If you want practical starter snippets first, use [Synticore Builder Guide - Configuration Example](/wiki/builder/example.md).

If you want a short explanation of which config/state files you usually edit versus ignore, use [Synticore Builder Guide - Config Ownership](/wiki/builder/config-ownership.md).

If you need compiler-side config internals, use [Synticore Developer Docs - Config Internals](/wiki/developer/config.md).

Common reading order:

1. `require.site.*`
2. `option.url.*`
3. `option.navigation.*`
4. `option.title.*`
5. `option.package.*`
6. `option.watch.*`

## Table Of Contents

- [require](#require)
- [require.site](#requiresite)
- [option](#option)
- [option.brand](#optionbrand)
- [option.cache](#optioncache)
- [option.config](#optionconfig)
- [option.highlight](#optionhighlight)
- [option.html](#optionhtml)
- [option.image](#optionimage)
- [option.js](#optionjs)
- [option.markdown](#optionmarkdown)
- [option.mirrors](#optionmirrors)
- [option.mirrors[]](#optionmirrors)
- [option.navigation](#optionnavigation)
- [option.package](#optionpackage)
- [option.path](#optionpath)
- [option.replace](#optionreplace)
- [option.title](#optiontitle)
- [option.url](#optionurl)
- [option.browser](#optionbrowser)
- [option.browser.https](#optionbrowserhttps)
- [option.browser.key](#optionbrowserkey)
- [option.browser.cert](#optionbrowsercert)
- [option.watch](#optionwatch)
- [option.watch.triggers](#optionwatchtriggers)

## Require

Required configuration block.

### `require`

- **Type:** object
- **Required:** Yes
- **Default:** {"site": {"title": "Synticore Website Compiler - Default Config", "url": "https://www.example.com"}}
- **Allowed values:** N/A
- **Description:** Required configuration section. Values here must be provided for correct site generation.
- **Example:**

```json
{
  "require": {
    "site": {
      "title": "Synticore Website Compiler - Default Config",
      "url": "https://www.example.com"
    }
  }
}
```

## Require.Site

Required configuration block.

### `require.site`

- **Type:** object
- **Required:** Yes
- **Default:** {"title": "Synticore Website Compiler - Default Config", "url": "https://www.example.com"}
- **Allowed values:** N/A
- **Description:** Required site metadata used for URLs, titles, and generated tags.
- **Example:**

```json
{
  "require": {
    "site": {
      "title": "Synticore Website Compiler - Default Config",
      "url": "https://www.example.com"
    }
  }
}
```

### `require.site.title`

- **Type:** string
- **Required:** Yes
- **Default:** "Synticore Website Compiler - Default Config"
- **Allowed values:** N/A
- **Description:** Default site title used for HTML `<title>` and metadata when generating pages.
- **Example:**

```json
{
  "require": {
    "site": {
      "title": "Synticore Website Compiler - Default Config"
    }
  }
}
```

### `require.site.url`

- **Type:** string
- **Required:** Yes
- **Default:** "https://www.example.com"
- **Allowed values:** N/A
- **Description:** Base URL of the website, used for canonical/og:url meta tags and sitemap absolute links.
- **Example:**

```json
{
  "require": {
    "site": {
      "url": "https://www.example.com"
    }
  }
}
```

## Option

Optional configuration block.

### `option`

- **Type:** object
- **Required:** No
- **Default:** {"brand": {"adjust": {"foreground": {"alignment": {"x": "center", "y": "center"}, "blur": 0, "modulate": {}}, "background": {"alignment": {"x": "center", "y"...
- **Allowed values:** N/A
- **Description:** Optional configuration section controlling compiler behavior and output features.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "blur": 0,
          "modulate": {}
        },
        "background": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "apply": {
            "square": true,
            "wide": true
          },
          "blur": 0,
          "modulate": {}
        }
      },
      "size": {
        "ico": [
          16,
          32,
          48,
          64,
          96,
          128
        ],
        "image": {
          "apple-touch-icon-57x57.png": {
            "width": 57,
            "height": 57
          },
          "apple-touch-icon-60x60.png": {
            "width": 60,
            "height": 60
          },
          "apple-touch-icon-72x72.png": {
            "width": 72,
            "height": 72
          },
          "apple-touch-icon-76x76.png": {
            "width": 76,
            "height": 76
          },
          "apple-touch-icon-114x114.png": {
            "width": 114,
            "height": 114
          },
          "apple-touch-icon-120x120.png": {
            "width": 120,
            "height": 120
          },
          "apple-touch-icon-144x144.png": {
            "width": 144,
            "height": 144
          },
          "apple-touch-icon-152x152.png": {
            "width": 152,
            "height": 152
          },
          "mstile-70x70.png": {
            "width": 70,
            "height": 70
          },
          "favicon-192.png": {
            "width": 192,
            "height": 192
          },
          "favicon-196.png": {
            "width": 196,
            "height": 196
          },
          "favicon-512.png": {
            "width": 512,
            "height": 512
          },
          "mstile-128x128.png": {
            "width": 128,
            "height": 128
          },
          "mstile-144x144.png": {
            "width": 144,
            "height": 144
          },
          "mstile-150x150.png": {
            "width": 150,
            "height": 150
          },
          "mstile-270x270.png": {
            "width": 270,
            "height": 270
          },
          "mstile-310x150.png": {
            "width": 310,
            "height": 150
          },
          "mstile-310x310.png": {
            "width": 310,
            "height": 310
          },
          "mstile-558x270.png": {
            "width": 558,
            "height": 270
          },
          "mstile-558x558.png": {
            "width": 558,
            "height": 558
          },
          "pagethumb.png": {
            "width": 512,
            "height": 256
          }
        }
      }
    },
    "config": {
      "sort": false
    },
    "cache": {
      "enable": true,
      "filter": true,
      "sort": true,
      "store": true
    },
    "highlight": {
      "syntax": {
        "enable": false,
        "generateImports": true,
        "path": {
          "css": "css/module",
          "js": "js/module"
        },
        "theme": {
          "enable": true,
          "include": [
            "prism"
          ]
        },
        "language": {
          "enable": true,
          "include": [
            "html",
            "css",
            "javascript"
          ]
        },
        "plugin": {
          "enable": true,
          "include": [
            "autolinker",
            "copy-to-clipboard",
            "data-uri-highlight",
            "inline-color",
            "line-numbers",
            "match-braces",
            "show-language"
          ]
        }
      }
    },
    "html": {
      "minify": {
        "removeComments": true,
        "collapseWhitespace": true,
        "minifyCSS": true,
        "minifyJS": true
      }
    },
    "image": {
      "interlace": [],
      "minify": {
        "gifsicle": {
          "interlaced": true
        },
        "jpegoptim": {
          "progressive": true,
          "stripAll": true
        },
        "mozjpeg": {
          "quality": 75,
          "progressive": true
        },
        "optipng": {
          "optimizationLevel": 5,
          "strip": "all"
        },
        "pngcrush": {
          "reduce": true,
          "strip": true
        },
        "svgo": {
          "plugins": [
            {
              "name": "removeViewBox",
              "active": true
            },
            {
              "name": "removeMetadata",
              "active": true
            },
            {
              "name": "removeDesc",
              "active": true
            },
            {
              "name": "removeTitle",
              "active": true
            },
            {
              "name": "removeUselessDefs",
              "active": true
            }
          ]
        }
      },
      "threads": null,
      "variant": [],
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
    },
    "js": {
      "minify": {
        "keep_classnames": false,
        "keep_fnames": false,
        "compress": true,
        "mangle": false
      }
    },
    "markdown": {
      "include_path": "in/_html/markdown"
    },
    "mirrors": [],
    "navigation": {
      "breadcrumb": {
        "base_path": "",
        "enable": true,
        "ignore_patterns": null,
        "replace_text": "<!-- breadcrumb -->",
        "root_content": "Home"
      },
      "shared": {
        "ignore_patterns": [
          "index.html",
          "404.html",
          "503.html"
        ]
      },
      "toc": {
        "collapsible": false,
        "depth": 4,
        "enable": true,
        "header_prepend": "<span class=\"counter\"></span>",
        "header_prepend_selectors": "h2,h3,h4,h5,h6",
        "ignore_class": "toc-ignore",
        "ignore_patterns": null,
        "replace_text": "<!-- toc -->",
        "selectors": "h1,h2,h3,h4,h5,h6",
        "wrap_emoji": null
      }
    },
    "package": {
      "html": {
        "ignore_class": [
          "no-package"
        ]
      },
      "ignore": [
        "no-package"
      ],
      "output": {
        "directory": false,
        "zip": true
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
        }
      ]
    },
    "path": {
      "ignore_prefix": "_",
      "ignore_sitemap": [
        "404",
        "503"
      ]
    },
    "replace": {
      "delimiter": {
        "open": "[[",
        "close": "]]"
      }
    },
    "title": {
      "compose": {
        "dirDepth": -1,
        "dirOrder": "leafToRoot",
        "dirJoiner": " - ",
        "titleJoiner": " - "
      },
      "name": {
        "word": {
          "acronyms": [
            "API",
            "CPU",
            "CSS",
            "DB",
            "DOM",
            "FAQ",
            "FTP",
            "GPU",
            "HTML",
            "HTTP",
            "HTTPS",
            "ID",
            "IP",
            "JS",
            "JSON",
            "OS",
            "PDF",
            "RAM",
            "REST",
            "SQL",
            "SSH",
            "SVG",
            "UI",
            "URL",
            "UUID",
            "UX",
            "XML",
            "2D",
            "3D"
          ],
          "lowercases": [
            "a",
            "an",
            "and",
            "as",
            "at",
            "but",
            "by",
            "for",
            "from",
            "in",
            "into",
            "like",
            "near",
            "nor",
            "of",
            "off",
            "on",
            "onto",
            "or",
            "out",
            "over",
            "so",
            "the",
            "to",
            "up",
            "upon",
            "with",
            "yet"
          ],
          "propercases": [
            "JavaScript",
            "Synticore"
          ]
        },
        "case": {
          "preserve": false,
          "enforceCamel": true
        },
        "separator": {
          "separatorsToSpace": [
            "_",
            "-"
          ],
          "stripPatterns": [],
          "wordSplitPattern": "[\\s_\\-]+",
          "wordJoinSeparator": " "
        }
      },
      "source": "filename"
    },
    "url": {
      "clean": true,
      "trailing_slash": true
    },
    "watch": {
      "delay_browser": 1250,
      "delay_change": 750
    }
  }
}
```

## Option.Brand

Optional configuration block.

### `option.brand`

- **Type:** object
- **Required:** No
- **Default:** {"adjust": {"foreground": {"alignment": {"x": "center", "y": "center"}, "blur": 0, "modulate": {}}, "background": {"alignment": {"x": "center", "y": "center"...
- **Allowed values:** N/A
- **Description:** Branding configuration used for favicon/touch icon generation and brand image composition.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "blur": 0,
          "modulate": {}
        },
        "background": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "apply": {
            "square": true,
            "wide": true
          },
          "blur": 0,
          "modulate": {}
        }
      },
      "size": {
        "ico": [
          16,
          32,
          48,
          64,
          96,
          128
        ],
        "image": {
          "apple-touch-icon-57x57.png": {
            "width": 57,
            "height": 57
          },
          "apple-touch-icon-60x60.png": {
            "width": 60,
            "height": 60
          },
          "apple-touch-icon-72x72.png": {
            "width": 72,
            "height": 72
          },
          "apple-touch-icon-76x76.png": {
            "width": 76,
            "height": 76
          },
          "apple-touch-icon-114x114.png": {
            "width": 114,
            "height": 114
          },
          "apple-touch-icon-120x120.png": {
            "width": 120,
            "height": 120
          },
          "apple-touch-icon-144x144.png": {
            "width": 144,
            "height": 144
          },
          "apple-touch-icon-152x152.png": {
            "width": 152,
            "height": 152
          },
          "mstile-70x70.png": {
            "width": 70,
            "height": 70
          },
          "favicon-192.png": {
            "width": 192,
            "height": 192
          },
          "favicon-196.png": {
            "width": 196,
            "height": 196
          },
          "favicon-512.png": {
            "width": 512,
            "height": 512
          },
          "mstile-128x128.png": {
            "width": 128,
            "height": 128
          },
          "mstile-144x144.png": {
            "width": 144,
            "height": 144
          },
          "mstile-150x150.png": {
            "width": 150,
            "height": 150
          },
          "mstile-270x270.png": {
            "width": 270,
            "height": 270
          },
          "mstile-310x150.png": {
            "width": 310,
            "height": 150
          },
          "mstile-310x310.png": {
            "width": 310,
            "height": 310
          },
          "mstile-558x270.png": {
            "width": 558,
            "height": 270
          },
          "mstile-558x558.png": {
            "width": 558,
            "height": 558
          },
          "pagethumb.png": {
            "width": 512,
            "height": 256
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust`

- **Type:** object
- **Required:** No
- **Default:** {"foreground": {"alignment": {"x": "center", "y": "center"}, "blur": 0, "modulate": {}}, "background": {"alignment": {"x": "center", "y": "center"}, "apply":...
- **Allowed values:** N/A
- **Description:** Configures how foreground and background images are processed, including alignment, blur, and visual effects.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "blur": 0,
          "modulate": {}
        },
        "background": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "apply": {
            "square": true,
            "wide": true
          },
          "blur": 0,
          "modulate": {}
        }
      }
    }
  }
}
```

### `option.brand.adjust.background`

- **Type:** object
- **Required:** No
- **Default:** {"alignment": {"x": "center", "y": "center"}, "apply": {"square": true, "wide": true}, "blur": 0, "modulate": {}}
- **Allowed values:** N/A
- **Description:** Settings applied to the brand background layer during composition.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "apply": {
            "square": true,
            "wide": true
          },
          "blur": 0,
          "modulate": {}
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.alignment`

- **Type:** object
- **Required:** No
- **Default:** {"x": "center", "y": "center"}
- **Allowed values:** N/A
- **Description:** Alignment settings for positioning the background layer.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "alignment": {
            "x": "center",
            "y": "center"
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.alignment.x`

- **Type:** string (enum)
- **Required:** No
- **Default:** "center"
- **Allowed values:** `left`, `center`, `right`
- **Description:** Horizontal alignment of the background brand image during composition (left/center/right).
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "alignment": {
            "x": "center"
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.alignment.y`

- **Type:** string (enum)
- **Required:** No
- **Default:** "center"
- **Allowed values:** `top`, `center`, `bottom`
- **Description:** Vertical alignment of the background brand image during composition (top/center/bottom).
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "alignment": {
            "y": "center"
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.apply`

- **Type:** object
- **Required:** No
- **Default:** {"square": true, "wide": true}
- **Allowed values:** N/A
- **Description:** Controls which output aspect ratios the background adjustments apply to.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "apply": {
            "square": true,
            "wide": true
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.apply.square`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Apply background adjustments to square icon outputs.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "apply": {
            "square": true
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.apply.wide`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Apply background adjustments to wide icon outputs.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "apply": {
            "wide": true
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.blur`

- **Type:** integer
- **Required:** No
- **Default:** 0
- **Allowed values:** N/A
- **Description:** Blur intensity applied to the background brand layer during composition.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "blur": 0
        }
      }
    }
  }
}
```

### `option.brand.adjust.background.modulate`

  - **Type:** object
  - **Required:** No
  - **Default:** {}
  - **Allowed values:** N/A
  - **Description:** Sharp modulate overrides for the background brand layer.
  - **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "background": {
          "modulate": {}
        }
      }
    }
  }
  }
  ```

### `option.brand.adjust.background.modulate.brightness`

  - **Type:** number
  - **Required:** No
  - **Default:** 1
  - **Allowed values:** N/A
  - **Description:** Brightness multiplier for the background brand layer modulate adjustment. Use 1 for no change.

### `option.brand.adjust.background.modulate.saturation`

  - **Type:** number
  - **Required:** No
  - **Default:** 1
  - **Allowed values:** N/A
  - **Description:** Saturation multiplier for the background brand layer modulate adjustment. Use 1 for no change.

### `option.brand.adjust.background.modulate.hue`

  - **Type:** number
  - **Required:** No
  - **Default:** 0
  - **Allowed values:** N/A
  - **Description:** Hue shift in degrees for the background brand layer modulate adjustment. Use 0 for no change.

### `option.brand.adjust.background.modulate.lightness`

  - **Type:** number
  - **Required:** No
  - **Default:** 1
  - **Allowed values:** N/A
  - **Description:** Lightness multiplier for the background brand layer modulate adjustment. Use 1 for no change.

### `option.brand.adjust.foreground`

- **Type:** object
- **Required:** No
- **Default:** {"alignment": {"x": "center", "y": "center"}, "blur": 0, "modulate": {}}
- **Allowed values:** N/A
- **Description:** Settings applied to the brand foreground layer during composition.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "alignment": {
            "x": "center",
            "y": "center"
          },
          "blur": 0,
          "modulate": {}
        }
      }
    }
  }
}
```

### `option.brand.adjust.foreground.alignment`

- **Type:** object
- **Required:** No
- **Default:** {"x": "center", "y": "center"}
- **Allowed values:** N/A
- **Description:** Alignment settings for positioning the foreground layer.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "alignment": {
            "x": "center",
            "y": "center"
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.foreground.alignment.x`

- **Type:** string (enum)
- **Required:** No
- **Default:** "center"
- **Allowed values:** `left`, `center`, `right`
- **Description:** Horizontal alignment of the foreground brand image during composition (left/center/right).
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "alignment": {
            "x": "center"
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.foreground.alignment.y`

- **Type:** string (enum)
- **Required:** No
- **Default:** "center"
- **Allowed values:** `top`, `center`, `bottom`
- **Description:** Vertical alignment of the foreground brand image during composition (top/center/bottom).
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "alignment": {
            "y": "center"
          }
        }
      }
    }
  }
}
```

### `option.brand.adjust.foreground.blur`

- **Type:** integer
- **Required:** No
- **Default:** 0
- **Allowed values:** N/A
- **Description:** Blur intensity applied to the foreground brand layer during composition.
- **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "blur": 0
        }
      }
    }
  }
}
```

### `option.brand.adjust.foreground.modulate`

  - **Type:** object
  - **Required:** No
  - **Default:** {}
  - **Allowed values:** N/A
  - **Description:** Sharp modulate overrides for the foreground brand layer.
  - **Example:**

```json
{
  "option": {
    "brand": {
      "adjust": {
        "foreground": {
          "modulate": {}
        }
      }
    }
  }
  }
  ```

### `option.brand.adjust.foreground.modulate.brightness`

  - **Type:** number
  - **Required:** No
  - **Default:** 1
  - **Allowed values:** N/A
  - **Description:** Brightness multiplier for the foreground brand layer modulate adjustment. Use 1 for no change.

### `option.brand.adjust.foreground.modulate.saturation`

  - **Type:** number
  - **Required:** No
  - **Default:** 1
  - **Allowed values:** N/A
  - **Description:** Saturation multiplier for the foreground brand layer modulate adjustment. Use 1 for no change.

### `option.brand.adjust.foreground.modulate.hue`

  - **Type:** number
  - **Required:** No
  - **Default:** 0
  - **Allowed values:** N/A
  - **Description:** Hue shift in degrees for the foreground brand layer modulate adjustment. Use 0 for no change.

### `option.brand.adjust.foreground.modulate.lightness`

  - **Type:** number
  - **Required:** No
  - **Default:** 1
  - **Allowed values:** N/A
  - **Description:** Lightness multiplier for the foreground brand layer modulate adjustment. Use 1 for no change.

### `option.brand.size`

- **Type:** object
- **Required:** No
- **Default:** {"ico": [16, 32, 48, 64, 96, 128], "image": {"apple-touch-icon-57x57.png": {"width": 57, "height": 57}, "apple-touch-icon-60x60.png": {"width": 60, "height":...
- **Allowed values:** N/A
- **Description:** Specifies the sizes for various branding images including favicons and touch icons.
- **Example:**

```json
{
  "option": {
    "brand": {
      "size": {
        "ico": [
          16,
          32,
          48,
          64,
          96,
          128
        ],
        "image": {
          "apple-touch-icon-57x57.png": {
            "width": 57,
            "height": 57
          },
          "apple-touch-icon-60x60.png": {
            "width": 60,
            "height": 60
          },
          "apple-touch-icon-72x72.png": {
            "width": 72,
            "height": 72
          },
          "apple-touch-icon-76x76.png": {
            "width": 76,
            "height": 76
          },
          "apple-touch-icon-114x114.png": {
            "width": 114,
            "height": 114
          },
          "apple-touch-icon-120x120.png": {
            "width": 120,
            "height": 120
          },
          "apple-touch-icon-144x144.png": {
            "width": 144,
            "height": 144
          },
          "apple-touch-icon-152x152.png": {
            "width": 152,
            "height": 152
          },
          "mstile-70x70.png": {
            "width": 70,
            "height": 70
          },
          "favicon-192.png": {
            "width": 192,
            "height": 192
          },
          "favicon-196.png": {
            "width": 196,
            "height": 196
          },
          "favicon-512.png": {
            "width": 512,
            "height": 512
          },
          "mstile-128x128.png": {
            "width": 128,
            "height": 128
          },
          "mstile-144x144.png": {
            "width": 144,
            "height": 144
          },
          "mstile-150x150.png": {
            "width": 150,
            "height": 150
          },
          "mstile-270x270.png": {
            "width": 270,
            "height": 270
          },
          "mstile-310x150.png": {
            "width": 310,
            "height": 150
          },
          "mstile-310x310.png": {
            "width": 310,
            "height": 310
          },
          "mstile-558x270.png": {
            "width": 558,
            "height": 270
          },
          "mstile-558x558.png": {
            "width": 558,
            "height": 558
          },
          "pagethumb.png": {
            "width": 512,
            "height": 256
          }
        }
      }
    }
  }
}
```

### `option.brand.size.ico`

- **Type:** array (items: `option.brand.size.ico[]`)
- **Required:** No
- **Default:** [16, 32, 48, 64, 96, 128]
- **Allowed values:** N/A
- **Description:** ICO size list for generating favicon.ico (multiple embedded resolutions).
- **Example:**

```json
{
  "option": {
    "brand": {
      "size": {
        "ico": [
          16,
          32,
          48,
          64,
          96,
          128
        ]
      }
    }
  }
}
```

### `option.brand.size.ico[]`

- **Type:** integer
- **Required:** No
- **Default:** 16
- **Allowed values:** N/A
- **Description:** List of favicon.ico layer sizes (in pixels) to generate.
- **Example:**

```json
{
  "option": {
    "brand": {
      "size": {
        "ico": [
          16
        ]
      }
    }
  }
}
```

### `option.brand.size.image`

- **Type:** object (1 documented child key(s))
- **Required:** No
- **Default:** {"apple-touch-icon-57x57.png": {"width": 57, "height": 57}, "apple-touch-icon-60x60.png": {"width": 60, "height": 60}, "apple-touch-icon-72x72.png": {"width"...
- **Allowed values:** N/A
- **Description:** Per-file output dimensions for generated favicon/touch icon images. This is a map keyed by output filename (e.g. 'apple-touch-icon-57x57.png').
- **Example:**

```json
{
  "option": {
    "brand": {
      "size": {
        "image": {
          "apple-touch-icon-57x57.png": {
            "width": 57,
            "height": 57
          },
          "apple-touch-icon-60x60.png": {
            "width": 60,
            "height": 60
          },
          "apple-touch-icon-72x72.png": {
            "width": 72,
            "height": 72
          },
          "apple-touch-icon-76x76.png": {
            "width": 76,
            "height": 76
          },
          "apple-touch-icon-114x114.png": {
            "width": 114,
            "height": 114
          },
          "apple-touch-icon-120x120.png": {
            "width": 120,
            "height": 120
          },
          "apple-touch-icon-144x144.png": {
            "width": 144,
            "height": 144
          },
          "apple-touch-icon-152x152.png": {
            "width": 152,
            "height": 152
          },
          "mstile-70x70.png": {
            "width": 70,
            "height": 70
          },
          "favicon-192.png": {
            "width": 192,
            "height": 192
          },
          "favicon-196.png": {
            "width": 196,
            "height": 196
          },
          "favicon-512.png": {
            "width": 512,
            "height": 512
          },
          "mstile-128x128.png": {
            "width": 128,
            "height": 128
          },
          "mstile-144x144.png": {
            "width": 144,
            "height": 144
          },
          "mstile-150x150.png": {
            "width": 150,
            "height": 150
          },
          "mstile-270x270.png": {
            "width": 270,
            "height": 270
          },
          "mstile-310x150.png": {
            "width": 310,
            "height": 150
          },
          "mstile-310x310.png": {
            "width": 310,
            "height": 310
          },
          "mstile-558x270.png": {
            "width": 558,
            "height": 270
          },
          "mstile-558x558.png": {
            "width": 558,
            "height": 558
          },
          "pagethumb.png": {
            "width": 512,
            "height": 256
          }
        }
      }
    }
  }
}
```

### `option.brand.size.image.*`

- **Type:** object (2 documented child key(s))
- **Required:** No
- **Default:** {"width": 57, "height": 57}
- **Allowed values:** N/A
- **Description:** A single per-file image size entry under `option.brand.size.image`. The key name is the output filename (any string). The value must be an object with `width` and `height`.
- **Example:**

```json
{
  "option": {
    "brand": {
      "size": {
        "image": {
          "<dynamic-key>": {
            "width": 57,
            "height": 57
          }
        }
      }
    }
  }
}
```

### `option.brand.size.image.*.width`

- **Type:** integer
- **Required:** No
- **Default:** 57
- **Allowed values:** N/A
- **Description:** Target width (in pixels) for this generated brand image entry (keyed by filename).
- **Example:**

```json
{
  "option": {
    "brand": {
      "size": {
        "image": {
          "<dynamic-key>": {
            "width": 57
          }
        }
      }
    }
  }
}
```

### `option.brand.size.image.*.height`

- **Type:** integer
- **Required:** No
- **Default:** 57
- **Allowed values:** N/A
- **Description:** Target height (in pixels) for this generated brand image entry (keyed by filename).
- **Example:**

```json
{
  "option": {
    "brand": {
      "size": {
        "image": {
          "<dynamic-key>": {
            "height": 57
          }
        }
      }
    }
  }
}
```

## Option.Cache

Optional configuration block.

### `option.cache`

- **Type:** object
- **Required:** No
- **Default:** {"enable": true, "filter": true, "sort": true, "store": true}
- **Allowed values:** N/A
- **Description:** Cache controls for enabling and tuning incremental build behavior.
- **Example:**

```json
{
  "option": {
    "cache": {
      "enable": true,
      "filter": true,
      "sort": true,
      "store": true
    }
  }
}
```

### `option.cache.enable`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable the compiler cache system (allows skipping unchanged work between runs).
- **Example:**

```json
{
  "option": {
    "cache": {
      "enable": true
    }
  }
}
```

### `option.cache.filter`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Filter build streams using cache so only changed inputs are processed.
- **Example:**

```json
{
  "option": {
    "cache": {
      "filter": true
    }
  }
}
```

### `option.cache.sort`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable deterministic sorting behavior within cache-backed pipelines.
- **Example:**

```json
{
  "option": {
    "cache": {
      "sort": true
    }
  }
}
```

### `option.cache.store`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Persist cache entries to disk after successful processing.
- **Example:**

```json
{
  "option": {
    "cache": {
      "store": true
    }
  }
}
```

## Option.Config

Optional configuration block.

### `option.config`

- **Type:** object
- **Required:** No
- **Default:** {"sort": false}
- **Allowed values:** N/A
- **Description:** General config-file behavior settings (for example key ordering when saving).
- **Example:**

```json
{
  "option": {
    "config": {
      "sort": false
    }
  }
}
```

### `option.config.sort`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** When writing/printing config, sort object keys for stable, deterministic output.
- **Example:**

```json
{
  "option": {
    "config": {
      "sort": false
    }
  }
}
```

## Option.Highlight

Optional configuration block.

### `option.highlight`

- **Type:** object
- **Required:** No
- **Default:** {"syntax": {"enable": false, "generateImports": true, "path": {"css": "css/module", "js": "js/module"}, "theme": {"enable": true, "include": ["prism"]}, "lan...
- **Allowed values:** N/A
- **Description:** Highlighting-related configuration (e.g., syntax highlighting).
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "enable": false,
        "generateImports": true,
        "path": {
          "css": "css/module",
          "js": "js/module"
        },
        "theme": {
          "enable": true,
          "include": [
            "prism"
          ]
        },
        "language": {
          "enable": true,
          "include": [
            "html",
            "css",
            "javascript"
          ]
        },
        "plugin": {
          "enable": true,
          "include": [
            "autolinker",
            "copy-to-clipboard",
            "data-uri-highlight",
            "inline-color",
            "line-numbers",
            "match-braces",
            "show-language"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax`

- **Type:** object
- **Required:** No
- **Default:** {"enable": false, "generateImports": true, "path": {"css": "css/module", "js": "js/module"}, "theme": {"enable": true, "include": ["prism"]}, "language": {"e...
- **Allowed values:** N/A
- **Description:** PrismJS and Prism Live highlighting settings (Prism assets + optional Prism Live vendored module files).
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "enable": false,
        "generateImports": true,
        "path": {
          "css": "css/module",
          "js": "js/module"
        },
        "theme": {
          "enable": true,
          "include": [
            "prism"
          ]
        },
        "language": {
          "enable": true,
          "include": [
            "html",
            "css",
            "javascript"
          ]
        },
        "plugin": {
          "enable": true,
          "include": [
            "autolinker",
            "copy-to-clipboard",
            "data-uri-highlight",
            "inline-color",
            "line-numbers",
            "match-braces",
            "show-language"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.enable`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** Enable/disable PrismJS syntax highlighting asset generation.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "enable": false
      }
    }
  }
}
```

### `option.highlight.syntax.generateImports`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Generate prism.js and prism.scss index files to simplify importing PrismJS assets.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "generateImports": true
      }
    }
  }
}
```

### `option.highlight.syntax.live`

- **Type:** object
- **Required:** No
- **Default:** {"enable": false, "path": "module/prism-live", "include": ["css", "javascript", "markup"]}
- **Allowed values:** N/A
- **Description:** Prism Live asset generation settings. Files are copied from vendored resources into `in/asset/{path}`.
- **Runtime note:** Prism Live requires Prism base assets at runtime. The vendored `prism-live.min.js` build checks `window.Bliss` and, if missing, attempts to load Bliss from CDN; include local `bliss.shy.min.js` for CSP/offline-safe builds.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "live": {
          "enable": false,
          "path": "module/prism-live",
          "include": ["css", "javascript", "markup"]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.live.enable`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** Enable/disable Prism Live vendored file generation.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "live": {
          "enable": false
        }
      }
    }
  }
}
```

### `option.highlight.syntax.live.include`

- **Type:** array (items: `option.highlight.syntax.live.include[]`)
- **Required:** No
- **Default:** ["css", "javascript", "markup"]
- **Allowed values:** N/A
- **Description:** List container for Prism Live language modules to copy (`prism-live-{id}.min.js`).
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "live": {
          "include": ["css", "javascript", "markup"]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.live.include[]`

- **Type:** string (enum)
- **Required:** No
- **Default:** "css"
- **Allowed values:** `css`, `javascript`, `markup`
- **Description:** Prism Live language module IDs to include (maps to `prism-live-{id}.min.js`).
- **Note:** This list is intentionally limited to the three official Prism Live language modules currently provided upstream (`css`, `javascript`, `markup`). Additional syntax grammars are supplied by PrismJS itself, not by separate Prism Live language-module files.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "live": {
          "include": ["css"]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.live.path`

- **Type:** string (path)
- **Required:** No
- **Default:** "module/prism-live"
- **Allowed values:** N/A
- **Description:** Base output directory for Prism Live files. Minified files such as `*.min.css` and `*.min.js` are copied directly under `in/asset/<path>`, while non-minified CSS and JS files are copied under `in/asset/css/<path>` and `in/asset/js/<path>` so they use the normal asset pipelines.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "live": {
          "path": "module/prism-live"
        }
      }
    }
  }
}
```

### `option.highlight.syntax.language`

- **Type:** object
- **Required:** No
- **Default:** {"enable": true, "include": ["html", "css", "javascript"]}
- **Allowed values:** N/A
- **Description:** Language inclusion settings for PrismJS syntax highlighting.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "language": {
          "enable": true,
          "include": [
            "html",
            "css",
            "javascript"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.language.enable`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable/disable PrismJS language component inclusion.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "language": {
          "enable": true
        }
      }
    }
  }
}
```

### `option.highlight.syntax.language.include`

- **Type:** array (items: `option.highlight.syntax.language.include[]`)
- **Required:** No
- **Default:** ["html", "css", "javascript"]
- **Allowed values:** N/A
- **Description:** List container for PrismJS language IDs to include in generated syntax assets.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "language": {
          "include": [
            "html",
            "css",
            "javascript"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.language.include[]`

- **Type:** string (enum)
- **Required:** No
- **Default:** "html"
- **Allowed values:** `markup`, `css`, `clike`, `javascript`, `abap`, `abnf`, `actionscript`, `ada`, `agda`, `al`, `antlr4`, `apacheconf`, `apex`, `apl`, `applescript`, `aql`, `arduino`, `arff`, `armasm`, `arturo`, `asciidoc`, `aspnet`, `asm6502`, `asmatmel`, `autohotkey`, `autoit`, `avisynth`, `avro-idl`, `awk`, `bash`, `basic`, `batch`, `bbcode`, `bbj`, `bicep`, `birb`, `bison`, `bnf`, `bqn`, `brainfuck`, `brightscript`, `bro`, `bsl`, `c`, `csharp`, `cpp`, `cfscript`, `chaiscript`, `cil`, `cilkc`, `cilkcpp`, `clojure`, `cmake`, `cobol`, `coffeescript`, `concurnas`, `csp`, `cooklang`, `coq`, `crystal`, `css-extras`, `csv`, `cue`, `cypher`, `d`, `dart`, `dataweave`, `dax`, `dhall`, `diff`, `django`, `dns-zone-file`, `docker`, `dot`, `ebnf`, `editorconfig`, `eiffel`, `ejs`, `elixir`, `elm`, `etlua`, `erb`, `erlang`, `excel-formula`, `fsharp`, `factor`, `false`, `firestore-security-rules`, `flow`, `fortran`, `ftl`, `gml`, `gap`, `gcode`, `gdscript`, `gedcom`, `gettext`, `gherkin`, `git`, `glsl`, `gn`, `linker-script`, `go`, `go-module`, `gradle`, `graphql`, `groovy`, `haml`, `handlebars`, `haskell`, `haxe`, `hcl`, `hlsl`, `hoon`, `http`, `hpkp`, `hsts`, `ichigojam`, `icon`, `icu-message-format`, `idris`, `ignore`, `inform7`, `ini`, `io`, `j`, `java`, `javadoc`, `javadoclike`, `javastacktrace`, `jexl`, `jolie`, `jq`, `jsdoc`, `js-extras`, `json`, `json5`, `jsonp`, `jsstacktrace`, `js-templates`, `julia`, `keepalived`, `keyman`, `kotlin`, `kumir`, `kusto`, `latex`, `latte`, `less`, `lilypond`, `liquid`, `lisp`, `livescript`, `llvm`, `log`, `lolcode`, `lua`, `magma`, `makefile`, `markdown`, `markup-templating`, `mata`, `matlab`, `maxscript`, `mel`, `mermaid`, `metafont`, `mizar`, `mongodb`, `monkey`, `moonscript`, `n1ql`, `n4js`, `nand2tetris-hdl`, `naniscript`, `nasm`, `neon`, `nevod`, `nginx`, `nim`, `nix`, `nsis`, `objectivec`, `ocaml`, `odin`, `opencl`, `openqasm`, `oz`, `parigp`, `parser`, `pascal`, `pascaligo`, `psl`, `pcaxis`, `peoplecode`, `perl`, `php`, `phpdoc`, `php-extras`, `plant-uml`, `plsql`, `powerquery`, `powershell`, `processing`, `prolog`, `promql`, `properties`, `protobuf`, `pug`, `puppet`, `pure`, `purebasic`, `purescript`, `python`, `qsharp`, `q`, `qml`, `qore`, `r`, `racket`, `cshtml`, `jsx`, `tsx`, `reason`, `regex`, `rego`, `renpy`, `rescript`, `rest`, `rip`, `roboconf`, `robotframework`, `ruby`, `rust`, `sas`, `sass`, `scss`, `scala`, `scheme`, `shell-session`, `smali`, `smalltalk`, `smarty`, `sml`, `solidity`, `solution-file`, `soy`, `sparql`, `splunk-spl`, `sqf`, `sql`, `squirrel`, `stan`, `stata`, `iecst`, `stylus`, `supercollider`, `swift`, `systemd`, `t4-templating`, `t4-cs`, `t4-vb`, `tap`, `tcl`, `tt2`, `textile`, `toml`, `tremor`, `turtle`, `twig`, `typescript`, `typoscript`, `unrealscript`, `uorazor`, `uri`, `v`, `vala`, `vbnet`, `velocity`, `verilog`, `vhdl`, `vim`, `visual-basic`, `warpscript`, `wasm`, `web-idl`, `wgsl`, `wiki`, `wolfram`, `wren`, `xeora`, `xml-doc`, `xojo`, `xquery`, `yaml`, `yang`, `zig`
- **Description:** List of PrismJS language ids to include. Dropdown values are sourced from local `node_modules/prismjs/components.json`, and custom text values are also allowed.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "language": {
          "include": [
            "html"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.path`

- **Type:** object
- **Required:** No
- **Default:** {"css": "css/module", "js": "js/module"}
- **Allowed values:** N/A
- **Description:** Output directories for PrismJS assets.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "path": {
          "css": "css/module",
          "js": "js/module"
        }
      }
    }
  }
}
```

### `option.highlight.syntax.path.css`

- **Type:** string (path)
- **Required:** No
- **Default:** "css/module"
- **Allowed values:** N/A
- **Description:** Output directory for generated PrismJS CSS modules (themes/plugins).
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "path": {
          "css": "css/module"
        }
      }
    }
  }
}
```

### `option.highlight.syntax.path.js`

- **Type:** string (path)
- **Required:** No
- **Default:** "js/module"
- **Allowed values:** N/A
- **Description:** Output directory for generated PrismJS JavaScript modules (languages/plugins).
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "path": {
          "js": "js/module"
        }
      }
    }
  }
}
```

### `option.highlight.syntax.plugin`

- **Type:** object
- **Required:** No
- **Default:** {"enable": true, "include": ["autolinker", "copy-to-clipboard", "data-uri-highlight", "inline-color", "line-numbers", "match-braces", "show-language"]}
- **Allowed values:** N/A
- **Description:** Plugin inclusion settings for PrismJS syntax highlighting.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "plugin": {
          "enable": true,
          "include": [
            "autolinker",
            "copy-to-clipboard",
            "data-uri-highlight",
            "inline-color",
            "line-numbers",
            "match-braces",
            "show-language"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.plugin.enable`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable/disable PrismJS plugin inclusion.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "plugin": {
          "enable": true
        }
      }
    }
  }
}
```

### `option.highlight.syntax.plugin.include`

- **Type:** array (items: `option.highlight.syntax.plugin.include[]`)
- **Required:** No
- **Default:** ["autolinker", "copy-to-clipboard", "data-uri-highlight", "inline-color", "line-numbers", "match-braces", "show-language"]
- **Allowed values:** N/A
- **Description:** List container for PrismJS plugin IDs to include in generated syntax assets.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "plugin": {
          "include": [
            "autolinker",
            "copy-to-clipboard",
            "data-uri-highlight",
            "inline-color",
            "line-numbers",
            "match-braces",
            "show-language"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.plugin.include[]`

- **Type:** string (enum)
- **Required:** No
- **Default:** "autolinker"
- **Allowed values:** `line-highlight`, `line-numbers`, `show-invisibles`, `autolinker`, `wpd`, `custom-class`, `file-highlight`, `show-language`, `jsonp-highlight`, `highlight-keywords`, `remove-initial-line-feed`, `inline-color`, `previewers`, `autoloader`, `keep-markup`, `command-line`, `unescaped-markup`, `normalize-whitespace`, `data-uri-highlight`, `toolbar`, `copy-to-clipboard`, `download-button`, `match-braces`, `diff-highlight`, `filter-highlight-all`, `treeview`
- **Description:** List of PrismJS plugin ids to include. Dropdown values are sourced from local `node_modules/prismjs/components.json`, and custom text values are also allowed.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "plugin": {
          "include": [
            "autolinker"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.theme`

- **Type:** object
- **Required:** No
- **Default:** {"enable": true, "default": "prism", "include": ["prism"], "bundle": ["prism"]}
- **Allowed values:** N/A
- **Description:** Theme settings for PrismJS syntax highlighting. `theme.include`, `theme.bundle`, and `theme.default` can be set together; when one is omitted, the compiler resolves the missing value through the documented fallback behavior for that key.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "theme": {
          "enable": true,
          "include": [
            "prism"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.theme.enable`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable/disable PrismJS theme inclusion.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "theme": {
          "enable": true
        }
      }
    }
  }
}
```

### `option.highlight.syntax.theme.include`

- **Type:** array (items: `option.highlight.syntax.theme.include[]`)
- **Required:** No
- **Default:** ["prism"]
- **Allowed values:** N/A
- **Description:** List container for PrismJS theme IDs to include in generated syntax assets. Legacy/canonical key: when only this key is set, `theme.bundle` and `theme.default` fall back from it.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "theme": {
          "include": [
            "prism"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.theme.include[]`

- **Type:** string (enum)
- **Required:** No
- **Default:** "prism"
- **Allowed values:** `prism`, `prism-dark`, `prism-funky`, `prism-okaidia`, `prism-twilight`, `prism-coy`, `prism-solarizedlight`, `prism-tomorrow`
- **Description:** List of PrismJS theme ids to include. Dropdown values are sourced from local `node_modules/prismjs/components.json`, and custom text values are also allowed.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "theme": {
          "include": [
            "prism"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.theme.default`

- **Type:** string (enum)
- **Required:** No
- **Default:** "prism"
- **Allowed values:** `prism`, `prism-dark`, `prism-funky`, `prism-okaidia`, `prism-twilight`, `prism-coy`, `prism-solarizedlight`, `prism-tomorrow`
- **Description:** Preferred default PrismJS theme id. If omitted, resolves from `theme.include[0]`, then `theme.bundle[0]`, then `prism`.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "theme": {
          "default": "prism-okaidia"
        }
      }
    }
  }
}
```

### `option.highlight.syntax.theme.bundle`

- **Type:** array (items: `option.highlight.syntax.theme.bundle[]`)
- **Required:** No
- **Default:** ["prism"]
- **Allowed values:** N/A
- **Description:** List container for PrismJS theme IDs bundled into generated `prism.scss` / `prism.min.css`. If omitted, resolves from `theme.include`, then `theme.default`, then `prism`.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "theme": {
          "bundle": [
            "prism-okaidia"
          ]
        }
      }
    }
  }
}
```

### `option.highlight.syntax.theme.bundle[]`

- **Type:** string (enum)
- **Required:** No
- **Default:** "prism"
- **Allowed values:** `prism`, `prism-dark`, `prism-funky`, `prism-okaidia`, `prism-twilight`, `prism-coy`, `prism-solarizedlight`, `prism-tomorrow`
- **Description:** List of PrismJS theme ids bundled into the generated main Prism stylesheet. This can be the only theme key set; `theme.include` and `theme.default` will fall back from it.
- **Example:**

```json
{
  "option": {
    "highlight": {
      "syntax": {
        "theme": {
          "bundle": [
            "prism-dark",
            "prism-okaidia"
          ]
        }
      }
    }
  }
}
```

## Option.HTML

Optional configuration block.

### `option.html`

- **Type:** object
- **Required:** No
- **Default:** {"minify": {"removeComments": true, "collapseWhitespace": true, "minifyCSS": true, "minifyJS": true}}
- **Allowed values:** N/A
- **Description:** HTML processing options (e.g., minification).
- **Example:**

```json
{
  "option": {
    "html": {
      "minify": {
        "removeComments": true,
        "collapseWhitespace": true,
        "minifyCSS": true,
        "minifyJS": true
      }
    }
  }
}
```

### `option.html.minify`

- **Type:** object
- **Required:** No
- **Default:** {"removeComments": true, "collapseWhitespace": true, "minifyCSS": true, "minifyJS": true}
- **Allowed values:** N/A
- **Description:** HTML minification options applied during compilation.
- **Example:**

```json
{
  "option": {
    "html": {
      "minify": {
        "removeComments": true,
        "collapseWhitespace": true,
        "minifyCSS": true,
        "minifyJS": true
      }
    }
  }
}
```

### `option.html.minify.collapseWhitespace`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** When minifying HTML, collapse unnecessary whitespace.
- **Example:**

```json
{
  "option": {
    "html": {
      "minify": {
        "collapseWhitespace": true
      }
    }
  }
}
```

### `option.html.minify.minifyCSS`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** When minifying HTML, also minify inline `<style>` blocks / CSS.
- **Example:**

```json
{
  "option": {
    "html": {
      "minify": {
        "minifyCSS": true
      }
    }
  }
}
```

### `option.html.minify.minifyJS`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** When minifying HTML, also minify inline `<script>` blocks / JavaScript.
- **Example:**

```json
{
  "option": {
    "html": {
      "minify": {
        "minifyJS": true
      }
    }
  }
}
```

### `option.html.minify.removeComments`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** When minifying HTML, remove HTML comments.
- **Example:**

```json
{
  "option": {
    "html": {
      "minify": {
        "removeComments": true
      }
    }
  }
}
```

## Option.Image

Optional configuration block.

### `option.image`

- **Type:** object
- **Required:** No
- **Default:** {"interlace": [], "minify": {"gifsicle": {"interlaced": true}, "jpegoptim": {"progressive": true, "stripAll": true}, "mozjpeg": {"quality": 75, "progressive"...
- **Allowed values:** N/A
- **Description:** Image processing options (minification, interlacing, variants, watermarking).
- **Example:**

```json
{
  "option": {
    "image": {
      "interlace": [],
      "minify": {
        "gifsicle": {
          "interlaced": true
        },
        "jpegoptim": {
          "progressive": true,
          "stripAll": true
        },
        "mozjpeg": {
          "quality": 75,
          "progressive": true
        },
        "optipng": {
          "optimizationLevel": 5,
          "strip": "all"
        },
        "pngcrush": {
          "reduce": true,
          "strip": true
        },
        "svgo": {
          "plugins": [
            {
              "name": "removeViewBox",
              "active": true
            },
            {
              "name": "removeMetadata",
              "active": true
            },
            {
              "name": "removeDesc",
              "active": true
            },
            {
              "name": "removeTitle",
              "active": true
            },
            {
              "name": "removeUselessDefs",
              "active": true
            }
          ]
        }
      },
      "threads": null,
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

### `option.image.interlace`

- **Type:** array (items: `option.image.interlace[]`)
- **Required:** No
- **Default:** []
- **Allowed values:** N/A
- **Description:** Interlace rule list (may be empty).
- **Example:**

```json
{
  "option": {
    "image": {
      "interlace": []
    }
  }
}
```

### `option.image.interlace[]`

- **Type:** unspecified
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** A single interlace rule entry.
- **Example:**

```json
{
  "option": {
    "image": {
      "interlace": [
        "<value>"
      ]
    }
  }
}
```

### `option.image.minify`

- **Type:** object
- **Required:** No
- **Default:** {"gifsicle": {"interlaced": true}, "jpegoptim": {"progressive": true, "stripAll": true}, "mozjpeg": {"quality": 75, "progressive": true}, "optipng": {"optimi...
- **Allowed values:** N/A
- **Description:** Image minification options per optimizer/codec.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "gifsicle": {
          "interlaced": true
        },
        "jpegoptim": {
          "progressive": true,
          "stripAll": true
        },
        "mozjpeg": {
          "quality": 75,
          "progressive": true
        },
        "optipng": {
          "optimizationLevel": 5,
          "strip": "all"
        },
        "pngcrush": {
          "reduce": true,
          "strip": true
        },
        "svgo": {
          "plugins": [
            {
              "name": "removeViewBox",
              "active": true
            },
            {
              "name": "removeMetadata",
              "active": true
            },
            {
              "name": "removeDesc",
              "active": true
            },
            {
              "name": "removeTitle",
              "active": true
            },
            {
              "name": "removeUselessDefs",
              "active": true
            }
          ]
        }
      }
    }
  }
}
```

### `option.image.minify.gifsicle`

- **Type:** object
- **Required:** No
- **Default:** {"interlaced": true}
- **Allowed values:** N/A
- **Description:** Settings container for gifsicle GIF optimization.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "gifsicle": {
          "interlaced": true
        }
      }
    }
  }
}
```

### `option.image.minify.gifsicle.interlaced`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Image minification option 'interlaced' for gifsicle (GIF optimizer).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "gifsicle": {
          "interlaced": true
        }
      }
    }
  }
}
```

### `option.image.minify.jpegoptim`

- **Type:** object
- **Required:** No
- **Default:** {"progressive": true, "stripAll": true}
- **Allowed values:** N/A
- **Description:** Settings container for jpegoptim JPEG optimization.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "jpegoptim": {
          "progressive": true,
          "stripAll": true
        }
      }
    }
  }
}
```

### `option.image.minify.jpegoptim.progressive`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Image minification option 'progressive' for jpegoptim (JPEG optimizer).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "jpegoptim": {
          "progressive": true
        }
      }
    }
  }
}
```

### `option.image.minify.jpegoptim.stripAll`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Image minification option 'stripAll' for jpegoptim (JPEG optimizer).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "jpegoptim": {
          "stripAll": true
        }
      }
    }
  }
}
```

### `option.image.minify.mozjpeg`

- **Type:** object
- **Required:** No
- **Default:** {"quality": 75, "progressive": true}
- **Allowed values:** N/A
- **Description:** Settings container for mozjpeg JPEG encoding/optimization.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "mozjpeg": {
          "quality": 75,
          "progressive": true
        }
      }
    }
  }
}
```

### `option.image.minify.mozjpeg.progressive`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Image minification option 'progressive' for mozjpeg (JPEG encoder).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "mozjpeg": {
          "progressive": true
        }
      }
    }
  }
}
```

### `option.image.minify.mozjpeg.quality`

- **Type:** integer
- **Required:** No
- **Default:** 75
- **Allowed values:** N/A
- **Description:** Image minification option 'quality' for mozjpeg (JPEG encoder).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "mozjpeg": {
          "quality": 75
        }
      }
    }
  }
}
```

### `option.image.minify.optipng`

- **Type:** object
- **Required:** No
- **Default:** {"optimizationLevel": 5, "strip": "all"}
- **Allowed values:** N/A
- **Description:** Settings container for optipng PNG optimization.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "optipng": {
          "optimizationLevel": 5,
          "strip": "all"
        }
      }
    }
  }
}
```

### `option.image.minify.optipng.optimizationLevel`

- **Type:** integer
- **Required:** No
- **Default:** 5
- **Allowed values:** N/A
- **Description:** Image minification option 'optimizationLevel' for optipng (PNG optimizer).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "optipng": {
          "optimizationLevel": 5
        }
      }
    }
  }
}
```

### `option.image.minify.optipng.strip`

- **Type:** string
- **Required:** No
- **Default:** "all"
- **Allowed values:** N/A
- **Description:** Image minification option 'strip' for optipng (PNG optimizer).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "optipng": {
          "strip": "all"
        }
      }
    }
  }
}
```

### `option.image.minify.pngcrush`

- **Type:** object
- **Required:** No
- **Default:** {"reduce": true, "strip": true}
- **Allowed values:** N/A
- **Description:** Settings container for pngcrush PNG optimization.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "pngcrush": {
          "reduce": true,
          "strip": true
        }
      }
    }
  }
}
```

### `option.image.minify.pngcrush.reduce`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Image minification option 'reduce' for pngcrush (PNG optimizer).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "pngcrush": {
          "reduce": true
        }
      }
    }
  }
}
```

### `option.image.minify.pngcrush.strip`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Image minification option 'strip' for pngcrush (PNG optimizer).
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "pngcrush": {
          "strip": true
        }
      }
    }
  }
}
```

### `option.image.minify.svgo`

- **Type:** object
- **Required:** No
- **Default:** {"plugins": [{"name": "removeViewBox", "active": true}, {"name": "removeMetadata", "active": true}, {"name": "removeDesc", "active": true}, {"name": "removeT...
- **Allowed values:** N/A
- **Description:** SVG optimization options via SVGO.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "svgo": {
          "plugins": [
            {
              "name": "removeViewBox",
              "active": true
            },
            {
              "name": "removeMetadata",
              "active": true
            },
            {
              "name": "removeDesc",
              "active": true
            },
            {
              "name": "removeTitle",
              "active": true
            },
            {
              "name": "removeUselessDefs",
              "active": true
            }
          ]
        }
      }
    }
  }
}
```

### `option.image.minify.svgo.plugins`

- **Type:** array (items: `option.image.minify.svgo.plugins[]`)
- **Required:** No
- **Default:** [{"name": "removeViewBox", "active": true}, {"name": "removeMetadata", "active": true}, {"name": "removeDesc", "active": true}, {"name": "removeTitle", "acti...
- **Allowed values:** N/A
- **Description:** SVGO plugin configuration list.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "svgo": {
          "plugins": [
            {
              "name": "removeViewBox",
              "active": true
            },
            {
              "name": "removeMetadata",
              "active": true
            },
            {
              "name": "removeDesc",
              "active": true
            },
            {
              "name": "removeTitle",
              "active": true
            },
            {
              "name": "removeUselessDefs",
              "active": true
            }
          ]
        }
      }
    }
  }
}
```

### `option.image.minify.svgo.plugins[]`

- **Type:** object (2 documented child key(s))
- **Required:** No
- **Default:** {"name": "removeViewBox", "active": true}
- **Allowed values:** N/A
- **Description:** SVGO plugin list applied during SVG optimization.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "svgo": {
          "plugins": [
            {
              "name": "removeViewBox",
              "active": true
            }
          ]
        }
      }
    }
  }
}
```

### `option.image.minify.svgo.plugins[].active`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Whether this SVGO plugin is enabled for SVG optimization.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "svgo": {
          "plugins": [
            {
              "active": true
            }
          ]
        }
      }
    }
  }
}
```

### `option.image.minify.svgo.plugins[].name`

- **Type:** string
- **Required:** No
- **Default:** "removeViewBox"
- **Allowed values:** N/A
- **Description:** SVGO plugin name for this plugin entry.
- **Example:**

```json
{
  "option": {
    "image": {
      "minify": {
        "svgo": {
          "plugins": [
            {
              "name": "removeViewBox"
            }
          ]
        }
      }
    }
  }
}
```

### `option.image.threads`

- **Type:** unspecified
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Maximum parallelism for image optimization. Null/undefined typically means auto/default.
- **Example:**

```json
{
  "option": {
    "image": {
      "threads": "<value>"
    }
  }
}
```

### `option.image.variant`

- **Type:** array (items: `option.image.variant[]`)
- **Required:** No
- **Default:** []
- **Allowed values:** N/A
- **Description:** Defines generated image variants (e.g., thumbnails). Each rule matches source images and emits a suffixed resized copy. Watermark rules (if matched) are applied independently to each output image.
- **Example:**

```json
{
  "option": {
    "image": {
      "variant": []
    }
  }
}
```

### `option.image.variant[]`

- **Type:** object (3 documented child key(s))
- **Required:** No
- **Default:** {"pattern": "asset/image/content/**/*.{png,jpg,jpeg}", "size": 25, "suffix": ".thumb"}
- **Allowed values:** N/A
- **Description:** A single image variant rule entry.
- **Example:**

```json
{
  "option": {
    "image": {
      "variant": [
        {
          "pattern": "asset/image/content/**/*.{png,jpg,jpeg}",
          "size": 25,
          "suffix": ".thumb"
        }
      ]
    }
  }
}
```

### `option.image.variant[].pattern`

- **Type:** string (path)
- **Required:** No
- **Default:** "asset/image/content/**/*.{png,jpg,jpeg}"
- **Allowed values:** N/A
- **Description:** Glob pattern used to select source images this variant rule applies to.
- **Example:**

```json
{
  "option": {
    "image": {
      "variant": [
        {
          "pattern": "asset/image/content/**/*.{png,jpg,jpeg}"
        }
      ]
    }
  }
}
```

### `option.image.variant[].size`

- **Type:** number or string
- **Required:** No
- **Default:** 25
- **Allowed values:** N/A
- **Description:** Variant max bound. Number form is max pixels (applies to both width and height with fit-inside). String form is a percentage of the source image max side (e.g., '25%').
- **Example:**

```json
{
  "option": {
    "image": {
      "variant": [
        {
          "size": "25%"
        }
      ]
    }
  }
}
```

### `option.image.variant[].suffix`

- **Type:** string
- **Required:** No
- **Default:** ".thumb"
- **Allowed values:** N/A
- **Description:** Suffix inserted before extension for generated variant files (default '.thumb').
- **Example:**

```json
{
  "option": {
    "image": {
      "variant": [
        {
          "suffix": ".thumb"
        }
      ]
    }
  }
}
```

### `option.image.watermark`

- **Type:** array (items: `option.image.watermark[]`)
- **Required:** No
- **Default:** [{"pattern": "**/*.watermark.*", "layers": [{"image": "brand/_watermark.png", "gravity": "Center", "opacity": 37.5, "resize": 1.0, "background": "none", "gmO...
- **Allowed values:** N/A
- **Description:** Defines a list of **watermark rules**. Each rule specifies:
- **Example:**

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

### `option.image.watermark[]`

- **Type:** object (2 documented child key(s))
- **Required:** No
- **Default:** {"pattern": "**/*.watermark.*", "layers": [{"image": "brand/_watermark.png", "gravity": "Center", "opacity": 37.5, "resize": 1.0, "background": "none", "gmOp...
- **Allowed values:** N/A
- **Description:** A single watermark rule entry.
- **Example:**

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

### `option.image.watermark[].layers`

- **Type:** array (items: `option.image.watermark[].layers[]`)
- **Required:** No
- **Default:** [{"image": "brand/_watermark.png", "gravity": "Center", "opacity": 37.5, "resize": 1.0, "background": "none", "gmOptions": "-tile"}]
- **Allowed values:** N/A
- **Description:** List of layers applied by a watermark rule (composited in order).
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
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

### `option.image.watermark[].layers[]`

- **Type:** object (6 documented child key(s))
- **Required:** No
- **Default:** {"image": "brand/_watermark.png", "gravity": "Center", "opacity": 37.5, "resize": 1.0, "background": "none", "gmOptions": "-tile"}
- **Allowed values:** N/A
- **Description:** A single watermark layer entry.
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
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

### `option.image.watermark[].layers[].background`

- **Type:** string
- **Required:** No
- **Default:** "none"
- **Allowed values:** N/A
- **Description:** Background color/setting used when resizing/tiling watermark layers (e.g., 'none').
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "layers": [
            {
              "background": "none"
            }
          ]
        }
      ]
    }
  }
}
```

### `option.image.watermark[].layers[].gmOptions`

- **Type:** string
- **Required:** No
- **Default:** "-tile"
- **Allowed values:** N/A
- **Description:** Extra GraphicsMagick options passed to the composite step (e.g., -tile).
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "layers": [
            {
              "gmOptions": "-tile"
            }
          ]
        }
      ]
    }
  }
}
```

### `option.image.watermark[].layers[].gravity`

- **Type:** string (enum)
- **Required:** No
- **Default:** "Center"
- **Allowed values:** `Center`, `top`, `TopLeft`, `TopRight`, `Bottom`, `BottomLeft`, `BottomRight`, `Left`, `Right`, `NorthWest`, `North`, `NorthEast`, `West`, `East`, `SouthWest`, `South`, `SouthEast`
- **Description:** Placement of a watermark layer on the target image (GraphicsMagick composite gravity; e.g., Center, SouthEast).
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "layers": [
            {
              "gravity": "Center"
            }
          ]
        }
      ]
    }
  }
}
```

### `option.image.watermark[].layers[].image`

- **Type:** string (path)
- **Required:** No
- **Default:** "brand/_watermark.png"
- **Allowed values:** N/A
- **Description:** Project-relative path to the watermark image file used for a watermark layer.
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "layers": [
            {
              "image": "brand/_watermark.png"
            }
          ]
        }
      ]
    }
  }
}
```

### `option.image.watermark[].layers[].opacity`

- **Type:** number
- **Required:** No
- **Default:** 37.5
- **Allowed values:** N/A
- **Description:** Opacity (percentage) for the watermark layer when composited onto the target image.
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "layers": [
            {
              "opacity": 37.5
            }
          ]
        }
      ]
    }
  }
}
```

### `option.image.watermark[].layers[].resize`

- **Type:** number
- **Required:** No
- **Default:** 1.0
- **Allowed values:** N/A
- **Description:** Scale factor applied to the watermark layer before compositing (1.0 = unchanged).
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "layers": [
            {
              "resize": 1.0
            }
          ]
        }
      ]
    }
  }
}
```

### `option.image.watermark[].pattern`

- **Type:** string (path)
- **Required:** No
- **Default:** "**/*.watermark.*"
- **Allowed values:** N/A
- **Description:** Glob pattern used to select which images a watermark rule applies to.
- **Example:**

```json
{
  "option": {
    "image": {
      "watermark": [
        {
          "pattern": "**/*.watermark.*"
        }
      ]
    }
  }
}
```

## Option.JS

Optional configuration block.

### `option.js`

- **Type:** object
- **Required:** No
- **Default:** {"minify": {"keep_classnames": false, "keep_fnames": false, "compress": true, "mangle": false}}
- **Allowed values:** N/A
- **Description:** JavaScript processing options (e.g., minification).
- **Example:**

```json
{
  "option": {
    "js": {
      "minify": {
        "keep_classnames": false,
        "keep_fnames": false,
        "compress": true,
        "mangle": false
      }
    }
  }
}
```

### `option.js.minify`

- **Type:** object
- **Required:** No
- **Default:** {"keep_classnames": false, "keep_fnames": false, "compress": true, "mangle": false}
- **Allowed values:** N/A
- **Description:** JavaScript minification options (typically passed to the minifier).
- **Example:**

```json
{
  "option": {
    "js": {
      "minify": {
        "keep_classnames": false,
        "keep_fnames": false,
        "compress": true,
        "mangle": false
      }
    }
  }
}
```

### `option.js.minify.compress`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable JavaScript compression optimizations during minification.
- **Example:**

```json
{
  "option": {
    "js": {
      "minify": {
        "compress": true
      }
    }
  }
}
```

### `option.js.minify.keep_classnames`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** When minifying JS, preserve class names (useful for reflection/debugging).
- **Example:**

```json
{
  "option": {
    "js": {
      "minify": {
        "keep_classnames": false
      }
    }
  }
}
```

### `option.js.minify.keep_fnames`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** When minifying JS, preserve function names (useful for stack traces/debugging).
- **Example:**

```json
{
  "option": {
    "js": {
      "minify": {
        "keep_fnames": false
      }
    }
  }
}
```

### `option.js.minify.mangle`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** Enable JavaScript identifier mangling during minification.
- **Example:**

```json
{
  "option": {
    "js": {
      "minify": {
        "mangle": false
      }
    }
  }
}
```

## Option.Markdown

Optional configuration block.

### `option.markdown`

- **Type:** object
- **Required:** No
- **Default:** {"include_path": "in/_html/markdown"}
- **Allowed values:** N/A
- **Description:** Markdown processing options.
- **Example:**

```json
{
  "option": {
    "markdown": {
      "include_path": "in/_html/markdown"
    }
  }
}
```

### `option.markdown.include_path`

- **Type:** string (path)
- **Required:** No
- **Default:** "in/_html/markdown"
- **Allowed values:** N/A
- **Description:** Project-relative directory that contains markdown/HTML include fragments used during compilation.
- **Example:**

```json
{
  "option": {
    "markdown": {
      "include_path": "in/_html/markdown"
    }
  }
}
```

## Option.Mirrors

Optional configuration block.

### `option.mirrors`

- **Type:** array (items: `option.mirrors[]`)
- **Required:** No
- **Default:** []
- **Allowed values:** N/A
- **Description:** Mirror rule list for copying arbitrary project files into output.
- **Example:**

```json
{
  "option": {
    "mirrors": []
  }
}
```

## Option.Mirrors[]

Optional configuration block.

### `option.mirrors[]`

- **Type:** object (5 documented child key(s))
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** A single mirror rule entry.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {}
    ]
  }
}
```

### `option.mirrors[].source`

- **Type:** string (path)
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Project-relative source path (file or directory) to mirror into output.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "source": "<value>"
      }
    ]
  }
}
```

### `option.mirrors[].destination`

- **Type:** string (path)
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Project-relative destination directory (under out/) where mirrored files are copied.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "destination": "<value>"
      }
    ]
  }
}
```

### `option.mirrors[].match_pattern`

- **Type:** union (string, array<string>)
- **Required:** No
- **Default:** N/A
- **Allowed values:** `string`, `array<string>`
- **Description:** Glob pattern(s) controlling which files under `source` are mirrored. Supports negated patterns starting with '!'.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "match_pattern": "<value>"
      }
    ]
  }
}
```

### `option.mirrors[].rename`

- **Type:** union (string, array (items: option.mirrors[].rename[]))
- **Required:** No
- **Default:** N/A
- **Allowed values:** `string`, `array (option.mirrors[].rename[])`
- **Description:** Optional rename rule(s) applied to mirrored relative paths. String form is a single-file target path; array form is rule-based.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "rename": "<value>"
      }
    ]
  }
}
```

### `option.mirrors[].rename[]`

- **Type:** object (4 documented child key(s))
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** A single mirror rename rule object used when `option.mirrors[].rename` is an array.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "rename": [
          {}
        ]
      }
    ]
  }
}
```

### `option.mirrors[].rename[].pattern`

- **Type:** unspecified
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Glob pattern used to match source-relative paths for this rename rule.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "rename": [
          {
            "pattern": "<value>"
          }
        ]
      }
    ]
  }
}
```

### `option.mirrors[].rename[].regex`

- **Type:** unspecified
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Regex source string used in regex mode instead of glob mode.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "rename": [
          {
            "regex": "<value>"
          }
        ]
      }
    ]
  }
}
```

### `option.mirrors[].rename[].flags`

- **Type:** unspecified
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Regex flags (e.g., 'g', 'i') used with `regex` in regex mode.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "rename": [
          {
            "flags": "<value>"
          }
        ]
      }
    ]
  }
}
```

### `option.mirrors[].rename[].to`

- **Type:** unspecified
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Target relative path/filename to rename matched paths to.
- **Example:**

```json
{
  "option": {
    "mirrors": [
      {
        "rename": [
          {
            "to": "<value>"
          }
        ]
      }
    ]
  }
}
```

## Option.Navigation

Optional configuration block.

### `option.navigation`

- **Type:** object
- **Required:** No
- **Default:** {"breadcrumb": {"base_path": "", "enable": true, "ignore_patterns": null, "replace_text": "<!-- breadcrumb -->", "root_content": "Home"}, "shared": {"ignore_...
- **Allowed values:** N/A
- **Description:** Navigation feature settings (breadcrumb, ToC, shared nav).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "base_path": "",
        "enable": true,
        "ignore_patterns": null,
        "replace_text": "<!-- breadcrumb -->",
        "root_content": "Home"
      },
      "shared": {
        "ignore_patterns": [
          "index.html",
          "404.html",
          "503.html"
        ]
      },
      "toc": {
        "collapsible": false,
        "depth": 4,
        "enable": true,
        "header_prepend": "<span class=\"counter\"></span>",
        "header_prepend_selectors": "h2,h3,h4,h5,h6",
        "ignore_class": "toc-ignore",
        "ignore_patterns": null,
        "replace_text": "<!-- toc -->",
        "selectors": "h1,h2,h3,h4,h5,h6",
        "wrap_emoji": null
      }
    }
  }
}
```

### `option.navigation.breadcrumb`

- **Type:** object
- **Required:** No
- **Default:** {"base_path": "", "enable": true, "ignore_patterns": null, "replace_text": "<!-- breadcrumb -->", "root_content": "Home"}
- **Allowed values:** N/A
- **Description:** Breadcrumb injection settings.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "base_path": "",
        "enable": true,
        "ignore_patterns": null,
        "replace_text": "<!-- breadcrumb -->",
        "root_content": "Home"
      }
    }
  }
}
```

### `option.navigation.breadcrumb.base_path`

- **Type:** string (path)
- **Required:** No
- **Default:** ""
- **Allowed values:** N/A
- **Description:** Base path prefix used when generating breadcrumb link URLs (e.g., to mount output under a subdirectory).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "base_path": ""
      }
    }
  }
}
```

### `option.navigation.breadcrumb.enable`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable/disable breadcrumb injection into generated HTML.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "enable": true
      }
    }
  }
}
```

### `option.navigation.breadcrumb.ignore_patterns`

- **Type:** union (null, array (items: option.navigation.breadcrumb.ignore_patterns[]))
- **Required:** No
- **Default:** N/A
- **Allowed values:** `null`, `array (option.navigation.breadcrumb.ignore_patterns[])`
- **Description:** Optional ignore patterns for breadcrumb generation (null to use shared defaults).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "ignore_patterns": null
      }
    }
  }
}
```

### `option.navigation.breadcrumb.ignore_patterns[]`

- **Type:** string (path)
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Paths/glob patterns excluded from breadcrumb generation.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "ignore_patterns": [
          "<value>"
        ]
      }
    }
  }
}
```

### `option.navigation.breadcrumb.replace_text`

- **Type:** string
- **Required:** No
- **Default:** "<!-- breadcrumb -->"
- **Allowed values:** N/A
- **Description:** HTML marker string that will be replaced with the generated breadcrumb HTML.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "replace_text": "<!-- breadcrumb -->"
      }
    }
  }
}
```

### `option.navigation.breadcrumb.root_content`

- **Type:** string
- **Required:** No
- **Default:** "Home"
- **Allowed values:** N/A
- **Description:** Label/content used for the breadcrumb root link (e.g., 'Home').
- **Example:**

```json
{
  "option": {
    "navigation": {
      "breadcrumb": {
        "root_content": "Home"
      }
    }
  }
}
```

### `option.navigation.shared`

- **Type:** object
- **Required:** No
- **Default:** {"ignore_patterns": ["index.html", "404.html", "503.html"]}
- **Allowed values:** N/A
- **Description:** Shared navigation settings used as defaults for other nav sections.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "shared": {
        "ignore_patterns": [
          "index.html",
          "404.html",
          "503.html"
        ]
      }
    }
  }
}
```

### `option.navigation.shared.ignore_patterns`

- **Type:** array (items: `option.navigation.shared.ignore_patterns[]`)
- **Required:** No
- **Default:** ["index.html", "404.html", "503.html"]
- **Allowed values:** N/A
- **Description:** List container for shared navigation ignore patterns.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "shared": {
        "ignore_patterns": [
          "index.html",
          "404.html",
          "503.html"
        ]
      }
    }
  }
}
```

### `option.navigation.shared.ignore_patterns[]`

- **Type:** string (path)
- **Required:** No
- **Default:** "index.html"
- **Allowed values:** N/A
- **Description:** Paths/patterns that should be excluded from shared navigation features (e.g., index/404/503 pages).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "shared": {
        "ignore_patterns": [
          "index.html"
        ]
      }
    }
  }
}
```

### `option.navigation.toc`

- **Type:** object
- **Required:** No
- **Default:** {"collapsible": false, "depth": 4, "enable": true, "header_prepend": "<span class=\"counter\"></span>", "header_prepend_selectors": "h2,h3,h4,h5,h6", "ignore...
- **Allowed values:** N/A
- **Description:** Table-of-contents (ToC) generation and injection settings.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "collapsible": false,
        "depth": 4,
        "enable": true,
        "header_prepend": "<span class=\"counter\"></span>",
        "header_prepend_selectors": "h2,h3,h4,h5,h6",
        "ignore_class": "toc-ignore",
        "ignore_patterns": null,
        "replace_text": "<!-- toc -->",
        "selectors": "h1,h2,h3,h4,h5,h6",
        "wrap_emoji": null
      }
    }
  }
}
```

### `option.navigation.toc.collapsible`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** Whether the ToC UI should be collapsible (if the template/CSS supports it).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "collapsible": false
      }
    }
  }
}
```

### `option.navigation.toc.depth`

- **Type:** integer
- **Required:** No
- **Default:** 4
- **Allowed values:** N/A
- **Description:** Maximum heading depth to include in the ToC (e.g., 4 includes up to h4).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "depth": 4
      }
    }
  }
}
```

### `option.navigation.toc.enable`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** Enable/disable table-of-contents (ToC) generation/injection.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "enable": true
      }
    }
  }
}
```

### `option.navigation.toc.header_prepend`

- **Type:** string
- **Required:** No
- **Default:** "<span class=\"counter\"></span>"
- **Allowed values:** N/A
- **Description:** HTML inserted at the start of each ToC entry label (e.g., a counter span).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "header_prepend": "<span class=\"counter\"></span>"
      }
    }
  }
}
```

### `option.navigation.toc.header_prepend_selectors`

- **Type:** string
- **Required:** No
- **Default:** "h2,h3,h4,h5,h6"
- **Allowed values:** N/A
- **Description:** Selectors that receive header_prepend injection.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "header_prepend_selectors": "h2,h3,h4,h5,h6"
      }
    }
  }
}
```

### `option.navigation.toc.ignore_class`

- **Type:** string
- **Required:** No
- **Default:** "toc-ignore"
- **Allowed values:** N/A
- **Description:** CSS class that marks headings to be excluded from the ToC.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "ignore_class": "toc-ignore"
      }
    }
  }
}
```

### `option.navigation.toc.ignore_patterns`

- **Type:** union (null, array (items: option.navigation.toc.ignore_patterns[]))
- **Required:** No
- **Default:** N/A
- **Allowed values:** `null`, `array (option.navigation.toc.ignore_patterns[])`
- **Description:** Optional ignore patterns for ToC generation (null to use shared defaults).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "ignore_patterns": null
      }
    }
  }
}
```

### `option.navigation.toc.ignore_patterns[]`

- **Type:** string (path)
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Paths/glob patterns excluded from ToC generation.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "ignore_patterns": [
          "<value>"
        ]
      }
    }
  }
}
```

### `option.navigation.toc.replace_text`

- **Type:** string
- **Required:** No
- **Default:** "<!-- toc -->"
- **Allowed values:** N/A
- **Description:** HTML marker string that will be replaced with the generated ToC HTML.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "replace_text": "<!-- toc -->"
      }
    }
  }
}
```

### `option.navigation.toc.selectors`

- **Type:** string
- **Required:** No
- **Default:** "h1,h2,h3,h4,h5,h6"
- **Allowed values:** N/A
- **Description:** Heading CSS selectors used to build the ToC (e.g., h1,h2,h3...).
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "selectors": "h1,h2,h3,h4,h5,h6"
      }
    }
  }
}
```

### `option.navigation.toc.wrap_emoji`

- **Type:** union (null, string)
- **Required:** No
- **Default:** N/A
- **Allowed values:** `null`, `string`
- **Description:** Optional HTML template used to wrap emoji clusters in visible ToC heading text. Use `*` as the emoji placeholder; null disables wrapping.
- **Example:**

```json
{
  "option": {
    "navigation": {
      "toc": {
        "wrap_emoji": "<span class=\"emoji\">*</span>"
      }
    }
  }
}
```

## Option.Package

Optional configuration block.

### `option.package`

- **Type:** object
- **Required:** No
- **Default:** {"html": {"ignore_class": ["no-package"]}, "ignore": ["no-package"], "output": {"directory": false, "zip": true}, "targets": [{"suffix": "", "paths": [{"sou...
- **Allowed values:** N/A
- **Description:** Packaging settings for producing deployable bundles (zip and/or directory).
- **Example:**

```json
{
  "option": {
    "package": {
      "html": {
        "ignore_class": [
          "no-package"
        ]
      },
      "ignore": [
        "no-package"
      ],
      "output": {
        "directory": false,
        "zip": true
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
        }
      ]
    }
  }
}
```

### `option.package.html`

- **Type:** object
- **Required:** No
- **Default:** {"ignore_class": ["no-package"]}
- **Allowed values:** N/A
- **Description:** HTML-driven packaging rules (e.g., ignore classes).
- **Example:**

```json
{
  "option": {
    "package": {
      "html": {
        "ignore_class": [
          "no-package"
        ]
      }
    }
  }
}
```

### `option.package.html.ignore_class`

- **Type:** array (items: `option.package.html.ignore_class[]`)
- **Required:** No
- **Default:** ["no-package"]
- **Allowed values:** N/A
- **Description:** List container for HTML class names used by packaging exclusion rules (default includes `"no-package"`).
- **Example:**

```json
{
  "option": {
    "package": {
      "html": {
        "ignore_class": [
          "no-package"
        ]
      }
    }
  }
}
```

### `option.package.html.ignore_class[]`

- **Type:** string
- **Required:** No
- **Default:** "no-package"
- **Allowed values:** N/A
- **Description:** HTML class names that indicate content/pages should be excluded from package outputs (default item: `"no-package"`).
- **Example:**

```json
{
  "option": {
    "package": {
      "html": {
        "ignore_class": [
          "no-package"
        ]
      }
    }
  }
}
```

### `option.package.ignore`

- **Type:** array (items: `option.package.ignore[]`)
- **Required:** No
- **Default:** ["no-package"]
- **Allowed values:** N/A
- **Description:** Top-level package ignore pattern list applied across package targets (unless disabled per path, default includes `"no-package"`).
- **Example:**

```json
{
  "option": {
    "package": {
      "ignore": [
        "no-package"
      ]
    }
  }
}
```

### `option.package.ignore[]`

- **Type:** string (path)
- **Required:** No
- **Default:** "no-package"
- **Allowed values:** N/A
- **Description:** Top-level ignore patterns applied when building package outputs (default item: `"no-package"`).
- **Example:**

```json
{
  "option": {
    "package": {
      "ignore": [
        "no-package"
      ]
    }
  }
}
```

### `option.package.output`

- **Type:** object
- **Required:** No
- **Default:** {"directory": false, "zip": true}
- **Allowed values:** N/A
- **Description:** Controls which package output formats are produced.
- **Example:**

```json
{
  "option": {
    "package": {
      "output": {
        "directory": false,
        "zip": true
      }
    }
  }
}
```

### `option.package.output.directory`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** When packaging, also emit an unpacked directory output.
- **Example:**

```json
{
  "option": {
    "package": {
      "output": {
        "directory": false
      }
    }
  }
}
```

### `option.package.output.zip`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** When packaging, emit a .zip archive output.
- **Example:**

```json
{
  "option": {
    "package": {
      "output": {
        "zip": true
      }
    }
  }
}
```

### `option.package.targets`

- **Type:** array (items: `option.package.targets[]`)
- **Required:** No
- **Default:** [{"suffix": "", "paths": [{"source": "out", "destination": "", "ignore": [], "no_ignore": false}]}]
- **Allowed values:** N/A
- **Description:** List of package target definitions.
- **Example:**

```json
{
  "option": {
    "package": {
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
        }
      ]
    }
  }
}
```

### `option.package.targets[]`

- **Type:** object (3 documented child key(s))
- **Required:** No
- **Default:** {"suffix": "", "paths": [{"source": "out", "destination": "", "ignore": [], "no_ignore": false}]}
- **Allowed values:** N/A
- **Description:** A single package target definition.
- **Example:**

```json
{
  "option": {
    "package": {
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
        }
      ]
    }
  }
}
```

### `option.package.targets[].paths`

- **Type:** array (items: `option.package.targets[].paths[]`)
- **Required:** No
- **Default:** [{"source": "out", "destination": "", "ignore": [], "no_ignore": false}]
- **Allowed values:** N/A
- **Description:** List of source-to-destination mappings for a package target.
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "paths": [
            {
              "source": "out",
              "destination": "",
              "ignore": [],
              "no_ignore": false
            }
          ]
        }
      ]
    }
  }
}
```

### `option.package.targets[].paths[]`

- **Type:** object (5 documented child key(s))
- **Required:** No
- **Default:** {"source": "out", "destination": "", "ignore": [], "no_ignore": false}
- **Allowed values:** N/A
- **Description:** A single source-to-destination mapping for a package target.
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "paths": [
            {
              "source": "out",
              "destination": "",
              "ignore": [],
              "no_ignore": false
            }
          ]
        }
      ]
    }
  }
}
```

### `option.package.targets[].paths[].destination`

- **Type:** string (path)
- **Required:** No
- **Default:** ""
- **Allowed values:** N/A
- **Description:** Destination subdirectory inside the packaged output (zip or folder) where the source files are placed.
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "paths": [
            {
              "destination": ""
            }
          ]
        }
      ]
    }
  }
}
```

### `option.package.targets[].paths[].ignore`

- **Type:** array (items: `option.package.targets[].paths[].ignore[]`)
- **Required:** No
- **Default:** []
- **Allowed values:** N/A
- **Description:** Per-path package ignore pattern list for this target mapping.
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "paths": [
            {
              "ignore": []
            }
          ]
        }
      ]
    }
  }
}
```

### `option.package.targets[].paths[].ignore[]`

- **Type:** string (path)
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Ignore patterns applied within a package path mapping.
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "paths": [
            {
              "ignore": [
                "<value>"
              ]
            }
          ]
        }
      ]
    }
  }
}
```

### `option.package.targets[].paths[].no_ignore`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** If true, disables ignore processing for this path mapping.
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "paths": [
            {
              "no_ignore": false
            }
          ]
        }
      ]
    }
  }
}
```

### `option.package.targets[].paths[].source`

- **Type:** string (path)
- **Required:** No
- **Default:** "out"
- **Allowed values:** N/A
- **Description:** Project-relative source directory to include in a package target.
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "paths": [
            {
              "source": "out"
            }
          ]
        }
      ]
    }
  }
}
```

### `option.package.targets[].suffix`

- **Type:** string
- **Required:** No
- **Default:** ""
- **Allowed values:** N/A
- **Description:** Suffix appended to the package name for this target (useful for variants).
- **Example:**

```json
{
  "option": {
    "package": {
      "targets": [
        {
          "suffix": ""
        }
      ]
    }
  }
}
```

## Option.Path

Optional configuration block.

### `option.path`

- **Type:** object
- **Required:** No
- **Default:** {"ignore_prefix": "_", "ignore_sitemap": ["404", "503"]}
- **Allowed values:** N/A
- **Description:** Path-related settings (ignore prefixes and sitemap exclusions).
- **Example:**

```json
{
  "option": {
    "path": {
      "ignore_prefix": "_",
      "ignore_sitemap": [
        "404",
        "503"
      ]
    }
  }
}
```

### `option.path.ignore_prefix`

- **Type:** string
- **Required:** No
- **Default:** "_"
- **Allowed values:** N/A
- **Description:** Files/directories starting with this prefix are ignored by default (commonly '_' for partials).
- **Example:**

```json
{
  "option": {
    "path": {
      "ignore_prefix": "_"
    }
  }
}
```

### `option.path.ignore_sitemap`

- **Type:** array
- **Required:** No
- **Default:** ["404", "503"]
- **Allowed values:** N/A
- **Description:** List container for paths/slugs excluded from sitemap generation.
- **Example:**

```json
{
  "option": {
    "path": {
      "ignore_sitemap": [
        "404",
        "503"
      ]
    }
  }
}
```

### `option.path.ignore_sitemap[]`

- **Type:** string (path)
- **Required:** No
- **Default:** "404"
- **Allowed values:** N/A
- **Description:** Page slugs/paths to exclude from sitemap generation (commonly error pages like 404/503).
- **Example:**

```json
{
  "option": {
    "path": {
      "ignore_sitemap": [
        "404"
      ]
    }
  }
}
```

## Option.Replace

Optional configuration block.

### `option.replace`

- **Type:** object
- **Required:** No
- **Default:** {"delimiter": {"open": "[[", "close": "]]"}}
- **Allowed values:** N/A
- **Description:** Token replacement settings (delimiters used for placeholder replacement).
- **Example:**

```json
{
  "option": {
    "replace": {
      "delimiter": {
        "open": "[[",
        "close": "]]"
      }
    }
  }
}
```

### `option.replace.delimiter`

- **Type:** union (string, object)
- **Required:** No
- **Default:** {"open": "[[", "close": "]]"}
- **Allowed values:** `string`, `object`
- **Description:** Delimiter strings used to detect replacement tokens in content.
- **Example:**

```json
{
  "option": {
    "replace": {
      "delimiter": {
        "open": "[[",
        "close": "]]"
      }
    }
  }
}
```

### `option.replace.delimiter.close`

- **Type:** string
- **Required:** No
- **Default:** "]]"
- **Allowed values:** N/A
- **Description:** Closing delimiter for config token replacement in templates/content (e.g., '...]]').
- **Example:**

```json
{
  "option": {
    "replace": {
      "delimiter": {
        "close": "]]"
      }
    }
  }
}
```

### `option.replace.delimiter.open`

- **Type:** string
- **Required:** No
- **Default:** "[["
- **Allowed values:** N/A
- **Description:** Opening delimiter for config token replacement in templates/content (e.g., '[[...').
- **Example:**

```json
{
  "option": {
    "replace": {
      "delimiter": {
        "open": "[["
      }
    }
  }
}
```

## Option.Title

Optional configuration block.

### `option.title`

- **Type:** object
- **Required:** No
- **Default:** {"compose": {"dirDepth": -1, "dirOrder": "leafToRoot", "dirJoiner": " - ", "titleJoiner": " - "}, "name": {"word": {"acronyms": ["API", "CPU", "CSS", "DB", "...
- **Allowed values:** N/A
- **Description:** Automatic title generation settings.
- **Example:**

```json
{
  "option": {
    "title": {
      "compose": {
        "dirDepth": -1,
        "dirOrder": "leafToRoot",
        "dirJoiner": " - ",
        "titleJoiner": " - "
      },
      "name": {
        "word": {
          "acronyms": [
            "API",
            "CPU",
            "CSS",
            "DB",
            "DOM",
            "FAQ",
            "FTP",
            "GPU",
            "HTML",
            "HTTP",
            "HTTPS",
            "ID",
            "IP",
            "JS",
            "JSON",
            "OS",
            "PDF",
            "RAM",
            "REST",
            "SQL",
            "SSH",
            "SVG",
            "UI",
            "URL",
            "UUID",
            "UX",
            "XML",
            "2D",
            "3D"
          ],
          "lowercases": [
            "a",
            "an",
            "and",
            "as",
            "at",
            "but",
            "by",
            "for",
            "from",
            "in",
            "into",
            "like",
            "near",
            "nor",
            "of",
            "off",
            "on",
            "onto",
            "or",
            "out",
            "over",
            "so",
            "the",
            "to",
            "up",
            "upon",
            "with",
            "yet"
          ],
          "propercases": [
            "JavaScript",
            "Synticore"
          ]
        },
        "case": {
          "preserve": false,
          "enforceCamel": true
        },
        "separator": {
          "separatorsToSpace": [
            "_",
            "-"
          ],
          "stripPatterns": [],
          "wordSplitPattern": "[\\s_\\-]+",
          "wordJoinSeparator": " "
        }
      },
      "source": "filename"
    }
  }
}
```

### `option.title.compose`

- **Type:** object
- **Required:** No
- **Default:** {"dirDepth": -1, "dirOrder": "leafToRoot", "dirJoiner": " - ", "titleJoiner": " - "}
- **Allowed values:** N/A
- **Description:** Rules for composing titles from directory + filename/header pieces.
- **Example:**

```json
{
  "option": {
    "title": {
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

### `option.title.compose.dirDepth`

- **Type:** integer
- **Required:** No
- **Default:** -1
- **Allowed values:** N/A
- **Description:** How many directory segments to include when composing titles. -1 typically means 'all'.
- **Example:**

```json
{
  "option": {
    "title": {
      "compose": {
        "dirDepth": -1
      }
    }
  }
}
```

### `option.title.compose.dirJoiner`

- **Type:** string
- **Required:** No
- **Default:** " - "
- **Allowed values:** N/A
- **Description:** String used to join directory segments when composing titles.
- **Example:**

```json
{
  "option": {
    "title": {
      "compose": {
        "dirJoiner": " - "
      }
    }
  }
}
```

### `option.title.compose.dirOrder`

- **Type:** string (enum)
- **Required:** No
- **Default:** "leafToRoot"
- **Allowed values:** `leafToRoot`, `rootToLeaf`
- **Description:** Order to arrange directory segments when composing automatic document titles ('leafToRoot' reverses the directory chain; 'rootToLeaf' keeps natural order).
- **Example:**

```json
{
  "option": {
    "title": {
      "compose": {
        "dirOrder": "leafToRoot"
      }
    }
  }
}
```

### `option.title.compose.titleJoiner`

- **Type:** string
- **Required:** No
- **Default:** " - "
- **Allowed values:** N/A
- **Description:** String used to join the directory-derived portion with the page title portion.
- **Example:**

```json
{
  "option": {
    "title": {
      "compose": {
        "titleJoiner": " - "
      }
    }
  }
}
```

### `option.title.name`

- **Type:** object
- **Required:** No
- **Default:** {"word": {"acronyms": ["API", "CPU", "CSS", "DB", "DOM", "FAQ", "FTP", "GPU", "HTML", "HTTP", "HTTPS", "ID", "IP", "JS", "JSON", "OS", "PDF", "RAM", "REST", ...
- **Allowed values:** N/A
- **Description:** Rules for converting raw names (filenames/headers) into human-readable titles.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "acronyms": [
            "API",
            "CPU",
            "CSS",
            "DB",
            "DOM",
            "FAQ",
            "FTP",
            "GPU",
            "HTML",
            "HTTP",
            "HTTPS",
            "ID",
            "IP",
            "JS",
            "JSON",
            "OS",
            "PDF",
            "RAM",
            "REST",
            "SQL",
            "SSH",
            "SVG",
            "UI",
            "URL",
            "UUID",
            "UX",
            "XML",
            "2D",
            "3D"
          ],
          "lowercases": [
            "a",
            "an",
            "and",
            "as",
            "at",
            "but",
            "by",
            "for",
            "from",
            "in",
            "into",
            "like",
            "near",
            "nor",
            "of",
            "off",
            "on",
            "onto",
            "or",
            "out",
            "over",
            "so",
            "the",
            "to",
            "up",
            "upon",
            "with",
            "yet"
          ],
          "propercases": [
            "JavaScript",
            "Synticore"
          ]
        },
        "case": {
          "preserve": false,
          "enforceCamel": true
        },
        "separator": {
          "separatorsToSpace": [
            "_",
            "-"
          ],
          "stripPatterns": [],
          "wordSplitPattern": "[\\s_\\-]+",
          "wordJoinSeparator": " "
        }
      }
    }
  }
}
```

### `option.title.name.case`

- **Type:** object
- **Required:** No
- **Default:** {"preserve": false, "enforceCamel": true}
- **Allowed values:** N/A
- **Description:** Case-handling rules used during title generation.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "case": {
          "preserve": false,
          "enforceCamel": true
        }
      }
    }
  }
}
```

### `option.title.name.case.enforceCamel`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** If true, split CamelCase/PascalCase words into separate words when generating titles.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "case": {
          "enforceCamel": true
        }
      }
    }
  }
}
```

### `option.title.name.case.preserve`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** N/A
- **Description:** If true, preserve original casing from the source instead of enforcing title casing rules.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "case": {
          "preserve": false
        }
      }
    }
  }
}
```

### `option.title.name.separator`

- **Type:** object
- **Required:** No
- **Default:** {"separatorsToSpace": ["_", "-"], "stripPatterns": [], "wordSplitPattern": "[\\s_\\-]+", "wordJoinSeparator": " "}
- **Allowed values:** N/A
- **Description:** Separator/regex rules for splitting and joining title words.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "separator": {
          "separatorsToSpace": [
            "_",
            "-"
          ],
          "stripPatterns": [],
          "wordSplitPattern": "[\\s_\\-]+",
          "wordJoinSeparator": " "
        }
      }
    }
  }
}
```

### `option.title.name.separator.separatorsToSpace`

- **Type:** array
- **Required:** No
- **Default:** ["_", "-"]
- **Allowed values:** N/A
- **Description:** List container for separator characters converted to spaces before title formatting.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "separator": {
          "separatorsToSpace": [
            "_",
            "-"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.separator.separatorsToSpace[]`

- **Type:** string
- **Required:** No
- **Default:** "_"
- **Allowed values:** N/A
- **Description:** Characters that should be replaced with spaces before title generation (e.g., '_' and '-').
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "separator": {
          "separatorsToSpace": [
            "_"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.separator.stripPatterns`

- **Type:** array
- **Required:** No
- **Default:** []
- **Allowed values:** N/A
- **Description:** List container for regex/string patterns stripped during title formatting.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "separator": {
          "stripPatterns": []
        }
      }
    }
  }
}
```

### `option.title.name.separator.stripPatterns[]`

- **Type:** unspecified
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** Regex/string patterns to strip from titles before final formatting.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "separator": {
          "stripPatterns": [
            "<value>"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.separator.wordJoinSeparator`

- **Type:** string
- **Required:** No
- **Default:** " "
- **Allowed values:** N/A
- **Description:** Separator used to join words into the final title string.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "separator": {
          "wordJoinSeparator": " "
        }
      }
    }
  }
}
```

### `option.title.name.separator.wordSplitPattern`

- **Type:** string
- **Required:** No
- **Default:** "[\\s_\\-]+"
- **Allowed values:** N/A
- **Description:** Regex used to split raw text into words for title generation.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "separator": {
          "wordSplitPattern": "[\\s_\\-]+"
        }
      }
    }
  }
}
```

### `option.title.name.word`

- **Type:** object
- **Required:** No
- **Default:** {"acronyms": ["API", "CPU", "CSS", "DB", "DOM", "FAQ", "FTP", "GPU", "HTML", "HTTP", "HTTPS", "ID", "IP", "JS", "JSON", "OS", "PDF", "RAM", "REST", "SQL", "S...
- **Allowed values:** N/A
- **Description:** Word-level casing rules used during title generation.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "acronyms": [
            "API",
            "CPU",
            "CSS",
            "DB",
            "DOM",
            "FAQ",
            "FTP",
            "GPU",
            "HTML",
            "HTTP",
            "HTTPS",
            "ID",
            "IP",
            "JS",
            "JSON",
            "OS",
            "PDF",
            "RAM",
            "REST",
            "SQL",
            "SSH",
            "SVG",
            "UI",
            "URL",
            "UUID",
            "UX",
            "XML",
            "2D",
            "3D"
          ],
          "lowercases": [
            "a",
            "an",
            "and",
            "as",
            "at",
            "but",
            "by",
            "for",
            "from",
            "in",
            "into",
            "like",
            "near",
            "nor",
            "of",
            "off",
            "on",
            "onto",
            "or",
            "out",
            "over",
            "so",
            "the",
            "to",
            "up",
            "upon",
            "with",
            "yet"
          ],
          "propercases": [
            "JavaScript",
            "Synticore"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.word.acronyms`

- **Type:** array
- **Required:** No
- **Default:** ["API", "CPU", "CSS", "DB", "DOM", "FAQ", "FTP", "GPU", "HTML", "HTTP", "HTTPS", "ID", "IP", "JS", "JSON", "OS", "PDF", "RAM", "REST", "SQL", "SSH", "SVG", "...
- **Allowed values:** N/A
- **Description:** List container for words that should stay uppercase in generated titles.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "acronyms": [
            "API",
            "CPU",
            "CSS",
            "DB",
            "DOM",
            "FAQ",
            "FTP",
            "GPU",
            "HTML",
            "HTTP",
            "HTTPS",
            "ID",
            "IP",
            "JS",
            "JSON",
            "OS",
            "PDF",
            "RAM",
            "REST",
            "SQL",
            "SSH",
            "SVG",
            "UI",
            "URL",
            "UUID",
            "UX",
            "XML",
            "2D",
            "3D"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.word.acronyms[]`

- **Type:** string
- **Required:** No
- **Default:** "API"
- **Allowed values:** N/A
- **Description:** Acronyms that should remain uppercase when generating human-readable titles.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "acronyms": [
            "API"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.word.lowercases`

- **Type:** array
- **Required:** No
- **Default:** ["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "like", "near", "nor", "of", "off", "on", "onto", "or", "out", "over", "so", "the", ...
- **Allowed values:** N/A
- **Description:** List container for words that should stay lowercase in generated titles.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "lowercases": [
            "a",
            "an",
            "and",
            "as",
            "at",
            "but",
            "by",
            "for",
            "from",
            "in",
            "into",
            "like",
            "near",
            "nor",
            "of",
            "off",
            "on",
            "onto",
            "or",
            "out",
            "over",
            "so",
            "the",
            "to",
            "up",
            "upon",
            "with",
            "yet"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.word.lowercases[]`

- **Type:** string
- **Required:** No
- **Default:** "a"
- **Allowed values:** N/A
- **Description:** Words that should remain lowercase in generated titles (unless first/last).
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "lowercases": [
            "a"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.word.propercases`

- **Type:** array
- **Required:** No
- **Default:** ["JavaScript", "Synticore"]
- **Allowed values:** N/A
- **Description:** List container for words that should keep exact casing in generated titles.
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "propercases": [
            "JavaScript",
            "Synticore"
          ]
        }
      }
    }
  }
}
```

### `option.title.name.word.propercases[]`

- **Type:** string
- **Required:** No
- **Default:** "JavaScript"
- **Allowed values:** N/A
- **Description:** Words that should use exact casing when generating titles (e.g., JavaScript).
- **Example:**

```json
{
  "option": {
    "title": {
      "name": {
        "word": {
          "propercases": [
            "JavaScript"
          ]
        }
      }
    }
  }
}
```

### `option.title.source`

- **Type:** string (enum)
- **Required:** No
- **Default:** "filename"
- **Allowed values:** `filename`, `header`
- **Description:** Where automatic page titles come from: 'filename' uses the file name; 'header' uses the first `<h1>` in the HTML when present.
- **Example:**

```json
{
  "option": {
    "title": {
      "source": "filename"
    }
  }
}
```

## Option.URL

Optional configuration block.

### `option.url`

- **Type:** object
- **Required:** No
- **Default:** {"clean": true, "trailing_slash": true}
- **Allowed values:** N/A
- **Description:** URL formatting settings (clean URLs, trailing slash).
- **Example:**

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

### `option.url.clean`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** If true, generate clean URLs (omit the .html extension).
- **Example:**

```json
{
  "option": {
    "url": {
      "clean": true
    }
  }
}
```

### `option.url.trailing_slash`

- **Type:** boolean
- **Required:** No
- **Default:** true
- **Allowed values:** N/A
- **Description:** If true, include a trailing slash on directory index URLs.
- **Example:**

```json
{
  "option": {
    "url": {
      "trailing_slash": true
    }
  }
}
```

## Option.Browser

Optional configuration block.

### `option.browser`

- **Type:** object
- **Required:** No
- **Default:** {"https": false, "key": "", "cert": ""}
- **Allowed values:** N/A
- **Description:** Browsersync server settings for watch/browser tasks, including ports, HTTPS, and local TLS certificate file paths.
- **Example:**

```json
{
  "option": {
    "browser": {
      "https": false,
      "key": "",
      "cert": ""
    }
  }
}
```

### `option.browser.https`

- **Type:** boolean
- **Required:** No
- **Default:** false
- **Allowed values:** `true`, `false`
- **Description:** Enables HTTPS for Browsersync local preview. Defaults to `false`. When enabled and `key`/`cert` are blank, Browsersync uses a self-signed certificate.
- **Example:**

```json
{
  "option": {
    "browser": {
      "https": true
    }
  }
}
```

### `option.browser.key`

- **Type:** path (string)
- **Required:** No
- **Default:** ""
- **Allowed values:** N/A
- **Description:** Project-relative or absolute path to a PEM private key file for Browsersync HTTPS. Used only when both `key` and `cert` are provided.
- **Example:**

```json
{
  "option": {
    "browser": {
      "key": "cert/localhost-key.pem"
    }
  }
}
```

### `option.browser.cert`

- **Type:** path (string)
- **Required:** No
- **Default:** ""
- **Allowed values:** N/A
- **Description:** Project-relative or absolute path to a PEM certificate file for Browsersync HTTPS. Used only when both `key` and `cert` are provided.
- **Example:**

```json
{
  "option": {
    "browser": {
      "cert": "cert/localhost.pem"
    }
  }
}
```

## Option.Watch

Optional configuration block.

### `option.watch`

- **Type:** object
- **Required:** No
- **Default:** {"delay_browser": 1250, "delay_change": 750, "triggers": []}
- **Allowed values:** N/A
- **Description:** Watch-mode debounce/delay settings for change detection, dependent rebuild triggering, and browser reload.
- **Example:**

```json
{
  "option": {
    "watch": {
      "delay_browser": 1250,
      "delay_change": 750,
      "triggers": []
    }
  }
}
```

### `option.watch.delay_browser`

- **Type:** integer
- **Required:** No
- **Default:** 1250
- **Allowed values:** N/A
- **Description:** Browser reload debounce/delay in milliseconds after changes are detected.
- **Example:**

```json
{
  "option": {
    "watch": {
      "delay_browser": 1250
    }
  }
}
```

### `option.watch.delay_change`

- **Type:** integer
- **Required:** No
- **Default:** 750
- **Allowed values:** N/A
- **Description:** Change-detection debounce/delay in milliseconds for watch mode event batching and follow-up dependent task scheduling.
- **Example:**

```json
{
  "option": {
    "watch": {
      "delay_change": 750
    }
  }
}
```

### `option.watch.triggers`

- **Type:** array
- **Required:** No
- **Default:** []
- **Allowed values:** N/A
- **Description:** Config-driven watch trigger rules. Each rule maps file match patterns and filesystem events to one or more task IDs to enqueue.
- **Example:**

```json
{
  "option": {
    "watch": {
      "triggers": [
        {
          "match": [
            "in/LICENSE",
            "in/**/LICENSE",
            "in/**/LICENSE_*"
          ],
          "events": [
            "add",
            "change",
            "unlink"
          ],
          "tasks": [
            "rebuild_html"
          ]
        }
      ]
    }
  }
}
```

### `option.watch.triggers[]`

- **Type:** object
- **Required:** No
- **Default:** N/A
- **Allowed values:** N/A
- **Description:** A single watch trigger rule defining `match`, `events`, and `tasks`.

### `option.watch.triggers[].match`

- **Type:** array
- **Required:** No
- **Default:** []
- **Allowed values:** Glob/path patterns (project-relative or absolute).
- **Description:** Glob/path patterns used by the trigger rule to match changed files.
- **Example:**

```json
{
  "option": {
    "watch": {
      "triggers": [
        {
          "match": [
            "in/LICENSE",
            "in/**/LICENSE",
            "in/**/LICENSE_*"
          ]
        }
      ]
    }
  }
}
```

### `option.watch.triggers[].events`

- **Type:** array
- **Required:** No
- **Default:** ["add", "change", "unlink"]
- **Allowed values:** `add`, `change`, `unlink`, `addDir`, `unlinkDir`
- **Description:** Filesystem events that can fire this rule.
- **Example:**

```json
{
  "option": {
    "watch": {
      "triggers": [
        {
          "events": [
            "add",
            "change",
            "unlink"
          ]
        }
      ]
    }
  }
}
```

### `option.watch.triggers[].tasks`

- **Type:** array
- **Required:** No
- **Default:** []
- **Allowed values:** Task IDs that map to registered task chains (for example `build_html`, `rebuild_html`).
- **Description:** Task IDs to enqueue when a trigger rule matches a path+event.
- **Example:**

```json
{
  "option": {
    "watch": {
      "triggers": [
        {
          "tasks": [
            "rebuild_html"
          ]
        }
      ]
    }
  }
}
```
