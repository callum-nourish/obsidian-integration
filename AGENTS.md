# Repository Guidelines

## Project Structure & Module Organization
Runtime code lives in `src/`: `main.ts` owns the plugin lifecycle, `ConfluenceSettingTab.ts` handles the React settings UI, and `adaptors/obsidian.ts` encapsulates vault/file IO. Visual references sit under `docs/`, while `manifest.json` and `versions.json` describe release metadata consumed by Obsidian. Build orchestration (`esbuild.config.mjs`, `version-bump.mjs`, `tsconfig.json`) resides at the root—treat edits there as coordinated changes and tag a reviewer familiar with the toolchain.

## Build, Test, and Development Commands
- `npm run dev` – esbuild watcher; point Obsidian at `dist/` for hot reloads.
- `npm run build` – strict `tsc` pass plus production bundle; run before every PR.
- `npm run fmt` – Prettier write on `src/`; keep diffs noise-free.
- `npm run lint` – ESLint (React + TS profile) for logic and accessibility guardrails.
- `npm run prettier-check` – read-only formatter gate for CI or pre-push hooks.
- `npm run version` – bumps `manifest.json`/`versions.json`; commit those files together.

## Coding Style & Naming Conventions
Indent with tabs (per the recent “Cleaning up tabs vs. spaces” commits) and keep modules under 300 lines where possible. Use PascalCase for components (`CompletedModal`), camelCase elsewhere, and reserve UPPER_SNAKE_CASE for exported constants. Favor `async`/`await`, keep imports grouped (Obsidian → third-party → local), and rely on TypeScript’s strict null checks instead of sprinkling `any`.

## Testing Guidelines
Automated tests are not yet wired up; when introducing them, co-locate `*.test.ts` files beside the code they cover and wire an `npm test` script that mirrors CI. Meanwhile, manual verification is required: run `npm run build`, load the plugin in an Obsidian sandbox vault, publish a note (ideally with Mermaid content), and confirm the rendered Confluence page plus console output. Document the checklist in your PR description.

## Commit & Pull Request Guidelines
Git history favors concise, imperative subjects (`Clean tabs in main`, `Fix version bump hook`). Keep each commit focused, squash local fixups, and ensure PR descriptions include motivation, validation commands, and screenshots when UI changes affect `docs/screenshots`. Always link related issues or Jira tickets and request review from someone familiar with the Confluence publishing flow.

## Security & Configuration Tips
Store Atlassian credentials only in Obsidian’s encrypted settings, never in source or logs, and redact tokens from screenshots. After running `npm run version`, double-check `manifest.json` for accuracy so users receive the proper release. Run `npm audit` periodically to track vulnerabilities in `@markdown-confluence/*` packages and upgrade promptly.
