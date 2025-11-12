# Release Checklist

Ensure the packaged zip exposes a folder named `confluence-integration` so it matches `manifest.json`'s `id`. Obsidian refuses to load plugins when the directory name and manifest id disagree.

1. `npm install` (once per clone).
2. `npm run build` (writes `dist/main.js`).
3. Create a clean release staging area:
   ```sh
   rm -rf release && mkdir -p release/confluence-integration
   cp manifest.json release/confluence-integration/
   cp dist/main.js release/confluence-integration/
   [ -f styles.css ] && cp styles.css release/confluence-integration/
   ```
4. Zip the staging folder so the archive structure is `confluence-integration/…` at the top level:
   ```sh
   cd release && zip -r confluence-integration confluence-integration
   ```
5. Attach `release/confluence-integration.zip` to the GitHub release (along with `manifest.json` / `versions.json` if requested).
6. When editing an existing release (e.g., 0.0.4), delete the old asset and upload the new zip.

Tip: keep the `confluence-integration` directory around while testing in Obsidian—just copy it straight into `.obsidian/plugins/` to mirror what users will receive.
