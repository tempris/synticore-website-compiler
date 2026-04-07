# Synticore Builder Guide - Watch Triggers Guide

## Purpose

This page shows how to use project-level watch triggers when a source change should force additional rebuild work during `watch`.

Use watch triggers sparingly. They are for project-specific dependencies that the normal compiler dependency rules do not already cover.

---

## Example

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
          "events": ["add", "change", "unlink"],
          "tasks": ["rebuild_html"]
        }
      ]
    }
  }
}
```

---

## Notes

- `match` supports glob patterns.
- `events` filters filesystem event types.
- `tasks` must match registered gulp task IDs.
- Prefer narrow `match` patterns so one file change does not trigger an unnecessarily large rebuild chain.

---

## When To Use This

Typical use cases:

- license or policy files that should force HTML rebuilds
- shared nonstandard inputs that should trigger a specific rebuild task
- project-side content dependencies that sit outside the compiler's built-in watched relationships

If you need the compiler-internal scheduler view of watch triggers, use the developer-facing [Synticore Developer Docs - Watch Trigger Notes](/wiki/developer/watch-triggers.md).
