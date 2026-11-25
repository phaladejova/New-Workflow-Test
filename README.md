# New-Workflow-Test
┌────────────┐   MCP (design context,   ┌────────────┐   git push / PR   ┌────────────┐   Actions    ┌──────────────┐
│   Figma    │──variables, screenshots)─▶│   Cursor   │──────────────────▶│   GitHub   │─────────────▶│  Storybook   │
│ frames +   │                           │ agent +    │                   │ review +   │  build +     │ (GitHub Pages│
│ variables  │◀── Code Connect mappings ─│ rules      │                   │ CI checks  │  deploy      │  / Chromatic)│
└────────────┘                           └────────────┘                   └────────────┘              └──────────────┘
