---
name: figma-cursor-storybook
description: Guide a UX designer through the Allplan workflow that already works in this repo. Implement a Figma component with the Figma MCP, push it to GitHub main, show it in Storybook, connect the live preview in Figma through the Chromatic permalink, and keep Chromatic publishing on every GitHub push. Use when the user shares a Figma URL, asks to add or implement a component, set up Storybook, connect Figma to Storybook, publish to Chromatic, or make Storybook update when the GitHub repo changes.
---

# Figma, Cursor, GitHub, Storybook, Chromatic

Follow this path. It is the one that produced the primary, secondary, and tertiary buttons in this repo. Do the work. Explain each step to the designer in plain language.

This repo is already set up. Do not reinitialize Storybook, do not create a second Chromatic project, and do not rewrite `.github/workflows/chromatic.yml` when those files already match this skill.

## What the designer needs once

Say this before the first component, and skip anything already done:

1. In Cursor, connect the Figma MCP and sign in. The agent cannot approve that login.
2. Use this GitHub repo: `https://github.com/phaladejova/New-Workflow-Test.git`. The designer looks at `main`. A component that exists only on another branch is invisible to them.
3. In Chromatic, open this project, then Manage, then Configure, and copy the project token. In GitHub, open Settings, Secrets and variables, Actions, and save it as `CHROMATIC_PROJECT_TOKEN`. Never commit the token, never paste it into a file, and never repeat it back in chat.
4. Storybook and the Chromatic workflow are already in this repo. The designer does not install them again.

Published Storybook for `main`:

`https://main--6b06ed86f5a4b6142ed7ee95.chromatic.com`

Figma library file:

`https://www.figma.com/design/xDwAzoyEni1cp2iUa51n41/Allplan-2028-UI-Library---Tokens`

The file key is `xDwAzoyEni1cp2iUa51n41`.

## 1. Read the Figma node

The designer supplies a link that includes `node-id`. Do not guess a node.

- Convert `node-id=12907-21881` to node id `12907:21881`.
- Read and follow the `figma-design-to-code` skill before `get_design_context`.
- Call `create_session` for this file, then reuse that `sessionId`.
- Call `get_design_context` with `clientLanguages` `typescript,css`, `clientFrameworks` `react`, and `skillNames` `figma-design-to-code`. Keep the screenshot. It is the visual target, not an asset to embed.
- Call `get_variable_defs` for the same node. Bind CSS to those variables. A tertiary label in this library uses `color/text/buttons/secondary-enabled`. Use the variable the node actually binds.

If the response is sparse, fetch the visible child nodes before writing code.

## 2. Implement it like the buttons already here

Match `src/components/ButtonPrimary`, `ButtonSecondary`, and `ButtonTertiary`. Do not install Tailwind. Do not paste the generated Tailwind.

For a new variant:

- Folder: `src/components/Button<Variant>/`
- Files: `Button<Variant>.tsx`, `Button<Variant>.css`, `Button<Variant>.stories.tsx`, and the downloaded SVG
- Export the component and its props from `src/index.ts`
- Render it in `src/App.tsx` next to the other buttons
- Add only the new tokens to `src/styles/tokens.css`. Comment each one with the Figma variable path. Reuse a token that already has the same name.

Download every SVG with `curl -L` into the component folder. Replace the temporary `figma.com/api/mcp/asset` URL. Keep the SVG's root `width` and `height`. An identical SVG already in the repo may be copied. Do not redraw it.

Size S text buttons in this library are 20px tall: 2px vertical padding, a 16px label row, 12px horizontal padding, an 8px gap, an 8px radius, and an 11px Semibold label. The font stack is `"Segoe UI", Selawik, sans-serif` at weight 600. Selawik is the bundled fallback. A 1px inside border comes out of the padding, as `ButtonSecondary.css` does. A tertiary button has no fill and no border.

Story file, same shape as `ButtonTertiary.stories.tsx`:

```tsx
const meta = {
  title: "Button/Tertiary",
  component: ButtonTertiary,
  tags: ["ai-generated"],
  args: { icon: true, label: "Label" },
} satisfies Meta<typeof ButtonTertiary>;

export const TextSmallEnabledIconFirst: Story = {
  name: "Type=Text, Size=S, State=Enabled, Order=icon first",
};
```

Use the Figma variant as `name`. The story id used in URLs comes from the export name, not from `name`. `TextSmallEnabledIconFirst` under `Button/Tertiary` is `button-tertiary--text-small-enabled-icon-first`.

There is already one `CssCheck` story, on the primary button. Do not add a second one.

Run `npx tsc --noEmit`. Then render the component and check the computed box against the screenshot: height, padding, gap, radius, label color, icon size, background, and border. Fix mismatches before pushing.

## 3. Push to main

The designer reviews GitHub `main`. Commit on `main` and push `origin main` unless they name another branch.

If git does not know an author, commit with:

```bash
GIT_AUTHOR_NAME="phaladejova" GIT_AUTHOR_EMAIL="phaladejova@allplan.com" \
GIT_COMMITTER_NAME="phaladejova" GIT_COMMITTER_EMAIL="phaladejova@allplan.com"
```

Do not change git config. If the push is rejected, fetch `origin main`, rebase with those same identity variables, then push. If authentication fails, ask for access to `https://github.com/phaladejova/New-Workflow-Test.git`. Do not invent credentials.

## 4. Show Storybook

Storybook is already configured. `.storybook/main.ts` loads `src/**/*.stories.tsx`. `.storybook/preview.tsx` loads `src/styles/tokens.css` and `src/styles/preview.css`.

Start it only when the designer asks to view it, or when you must verify a story:

```bash
npm run storybook
```

Leave that process running. Wait until the log says `Storybook ready`. The address is `http://127.0.0.1:6006/`.

Tell the designer to open that address from this agent's forwarded port. `127.0.0.1` on their own computer is a different machine and shows `ERR_CONNECTION_REFUSED`.

`No story files found for the specified pattern: src/**/*.mdx` is expected. Stories in this repo are `.tsx`. Do not add sample files under `src/stories/`. Those samples failed `tsc` and were removed.

Give the designer the sidebar path and the story URL, for example:

`http://127.0.0.1:6006/?path=/story/button-tertiary--text-small-enabled-icon-first`

## 5. Connect the live preview in Figma

The preview Figma shows is one Storybook story, hosted by Chromatic. Local Storybook does not load inside Figma.

1. The designer installs the Storybook Connect plugin in Figma.
2. They link the component variant to the stable story URL, not a localhost URL and not a one-build URL.

Stable story URL:

`https://main--6b06ed86f5a4b6142ed7ee95.chromatic.com/?path=/story/button-tertiary--text-small-enabled-icon-first`

A host like `6b06ed86f5a4b6142ed7ee95-vflasttejb.chromatic.com` is frozen on that publish. The `main--` host updates after a later successful publish.

A one-off local publish, only when the GitHub Action is not available yet:

```bash
CI=true CHROMATIC_PROJECT_TOKEN="$CHROMATIC_PROJECT_TOKEN" npx chromatic
```

The token must already be in the environment. An empty token fails the publish. Do not put the token in the command you show the designer.

## 6. Keep Chromatic updating from GitHub

Every push publishes Storybook. The workflow that runs is `.github/workflows/chromatic.yml`. A file named `Chromatic` at the repository root does not run. Leave that root file alone unless the designer asks to remove it.

The workflow must stay:

```yaml
name: Chromatic

on:
  push:
    branches: ['**']   # every branch, including main
  workflow_dispatch:   # adds a manual "Run workflow" button

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0   # Chromatic needs the git history

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - name: Publish to Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitZeroOnChanges: true   # visual changes won't fail the build
```

`fetch-depth: 0` is required. `npm ci` requires `package-lock.json`, so commit the lockfile when dependencies change. `exitZeroOnChanges` keeps a visual change from failing the check.

After a push, the run is under the repository Actions tab. The designer can also open Actions, choose Chromatic, and use Run workflow. The Figma preview on the `main--` URL changes when that run succeeds. If it still shows the old component, the check to make is whether the Action finished and whether `CHROMATIC_PROJECT_TOKEN` exists. A missing secret fails the publish.

## Before you finish

- The new component is on `main`, with a story, and `npx tsc --noEmit` passes.
- The rendered size, color, icon, border, and background match the Figma screenshot.
- The designer has the story path and, for Figma, the `main--` story URL.
- No Chromatic token appears in the diff.
