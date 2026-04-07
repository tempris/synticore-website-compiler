# Synticore Builder Guide - File Include Guide

This guide focuses on the file-include features most site builders actually use.

Synticore uses its own fork of `gulp-file-include` called `cure-gulp-file-include`.

If you need evaluation order, integration behavior, or implementation notes, use the developer-facing [Synticore Developer Docs - File Include Notes](/wiki/developer/file-include.md).

---

## Most Common Use Cases

### Reuse A Shared Partial With `@@include`

Use this when you want to reuse a shared component and optionally pass local values just for that include call.

```html
@@include('_html/component/card.html', {
  "title": "Card Title"
})
```

### Include Something Only Once With `@@include_once`

Use this when a file may be requested multiple times in one page but should only render once.

```html
@@include_once('_html/common/banner.html')
@@include_once('_html/common/banner.html')
```

### Repeat A Partial With `@@loop`

Use this when one partial should be rendered for every item in a list.

```html
@@loop('_html/component/item.html', 'example/data/items.json')
```

You can also pass loop options:

```html
@@loop('_html/component/item.html', 'example/data/items.json', {
  "loop": {
    "item_max": 3
  }
})
```

### Use Conditionals With `@@if`, `@@elseif`, and `@@else`

Use conditional blocks to include or skip markup based on context values.

```html
@@if (context.showNav) {
  <nav>...</nav>
}
@@elseif (context.showFooter) {
  <footer>...</footer>
}
@@else {
  <p>No optional section enabled.</p>
}
```

### Use Basic Variables

Use variables for simple token replacement from context into templates.

```html
@@title
@@site.name
```

---

## More Advanced Patterns

### Collection-Selection Include

Use collection-selection `@@include` when the output should render once from a matched item in a collection, rather than repeating for every item.

```html
@@include('_html/component/article-footer.html', {
  "from": "example/data/articles.json",
  "select": "item.link === context.article_link",
  "neighbors": true,
  "context": {
    "article_link": "/example/article-two"
  }
})
```

### Filesystem-Driven Loop Source

Use filesystem source objects when the data already exists as directories or files and you want compile-time discovery.

```html
@@loop('_html/component/item.html', {
  "source": {
    "type": "dirs",
    "dir": "asset/font-icon"
  }
})
```

---

## Practical Guidance

- Use `@@include` for shared layout pieces
- Use `@@include_once` for one-time output blocks
- Use `@@loop` when markup should repeat
- Use collection-selection `@@include` when output should render once from a matched item
- Use `@@if` chains for optional sections
- Keep context values simple and predictable

---

## Related

- Live file-include example: [Synticore Example Site - File Include Example](https://example.synticore.cureinteractive.com/example/file-include)
- Developer reference: [Synticore Developer Docs - File Include Notes](/wiki/developer/file-include.md)
