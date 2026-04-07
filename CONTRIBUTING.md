# Contributing

## Development workflow
- Create a branch for your work.
- Keep changes focused and atomic.
- Run relevant build/tests before opening a PR.
- Run `npm run check:encoding` after text-file edits to catch UTF-8 BOM and mojibake issues.
- Run `python _development/script/hooks-install/hooks-install.py` once per clone to enable repo-managed git hooks (`.githooks/`), including pre-commit encoding checks.
- Use clear commit messages and describe behavior changes in PRs.

## Codex project metadata (`.codex/`)

This repository includes a versioned `.codex/` directory used by Codex (in VS Code) to keep project-specific guidance and working notes close to the codebase.

### What's inside
- `.codex/AGENTS.md`
  - Project-specific instructions that Codex follows while working in this repo.
- `.codex/config.toml`
  - Project-local Codex configuration (applies when the workspace is trusted).
- `.codex/notes/`
  - Working notes maintained during development (status, decisions, TODO, scratch).

### Policy
- `.codex/` is intentionally **versioned** in git.
- Do **not** add `.codex/` or `.codex/notes/` to `.gitignore`.
- Do not rename or relocate `.codex/`; Codex discovers project config by walking upward from the working directory looking for `.codex/`.
- Treat `.codex/notes/` updates as normal, commit-worthy changes.
- Prefer small, focused commits for notes-only updates:
  - `docs(codex-notes): ...` for notes-only commits
  - `docs(codex): ...` for `.codex/` process/policy changes

### Rationale
Keeping `.codex/` in the repo makes Codex behavior consistent across machines and contributors, and preserves an auditable trail of decisions and project state.

> Note: In VS Code, trust the workspace so project-local `.codex/config.toml` can apply.
