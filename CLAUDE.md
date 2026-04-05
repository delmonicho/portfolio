# Portfolio — CLAUDE.md

A single-page bash terminal UI portfolio built with Next.js 14, styled-components, and Pages Router. The entire app is one fullscreen terminal component.

## Dev server

```bash
npm run dev      # starts on http://localhost:3000
npm run build    # production build
```

> Next.js 14 + Node.js v24. SWC compiler handles styled-components (no Babel).

---

## Architecture

### How the terminal works

```
User types → InputLine → Terminal.handleKeyDown (Enter)
  → handleCommand(raw) → runCommand(raw) from commands/index.js
    → normalize input (trim, strip leading /, lowercase)
    → route to handler → returns string output
  → pushOutput() → history array → HistoryBlock re-renders
```

**Special commands:**
- `clear` — dispatches `CLEAR` to the history reducer, resetting to welcome state
- `contact` — activates the contact form state machine (see below)

### Contact form state machine

```
null → { step: 'name' } → { step: 'email' } → { step: 'message' } → { step: 'confirm' }
  └─ on 'y': POST /api/contact → success/error → null
  └─ on 'n' or Escape: cancelled → null
```

`/api/contact.js` currently logs to console only — no email provider integrated.

### Keyboard handling (Terminal.js)

| Key | Context | Action |
|-----|---------|--------|
| Enter | normal | run command |
| Enter | contact form | advance step |
| Escape | contact form | cancel form |
| ArrowUp/Down | normal only | navigate cmdHistory |

---

## File map

```
src/
├── commands/
│   ├── index.js          # runCommand(raw) — router + normalizer
│   ├── help.js           # ASCII box: all commands
│   ├── whoami.js         # One-liner bio
│   ├── about.js          # Full bio from constants
│   ├── work.js           # Work history table
│   ├── projects.js       # Project cards
│   ├── skills.js         # 3-column skills table
│   └── clear.js          # Returns CLEAR_SENTINEL
│
├── components/Terminal/
│   ├── Terminal.js       # State, reducer, keyboard handling
│   ├── TerminalHeader.js # macOS dots + "nicho@portfolio: ~"
│   ├── InputLine.js      # Prompt + blinking cursor
│   ├── OutputBlock.js    # Single history entry renderer
│   ├── HistoryBlock.js   # Maps history[] → OutputBlock
│   └── AsciiAvatar.js    # ASCII art banner (nebula scene)
│
├── constants/
│   └── constants.js      # All personal data (see below)
│
├── pages/
│   ├── _app.js           # ThemeProvider wrapper
│   ├── _document.js      # SSR styled-components + JetBrains Mono font
│   ├── index.js          # Single page — renders <Terminal />
│   └── api/contact.js    # POST: { name, email, message }
│
├── styles/
│   ├── globals.js        # createGlobalStyle — scrollbar, selection, viewport
│   └── theme.js          # ThemeProvider + GlobalStyles wrapper
│
└── themes/
    └── default.js        # All theme tokens (colors, font, breakpoints)
```

---

## Adding a new command

1. Create `src/commands/mycommand.js` — export a function returning a string
2. Register it in `src/commands/index.js` in the `commands` object
3. Add an entry to the help text in `src/commands/help.js`

Commands use ASCII box-drawing characters for formatting. Match the style of existing commands:
- Light boxes (`┌ ─ ┐ │ └ ┘`) for help/about/contact
- Double boxes (`╔ ═ ╗ ║ ╚ ╝`) for projects/work

---

## Personal data

All content lives in **`src/constants/constants.js`**. Edit here to update the portfolio:

| Export | Used by |
|--------|---------|
| `about` | `about.js`, `whoami.js` — name, role, location, email, social links |
| `workHistory` | `work.js` — array of `{ year, title, description }` |
| `projects` | `projects.js` — array of `{ title, description, stack, link }` |
| `skills` | `skills.js` — `{ frontend: [], backend: [], datascience: [] }` |

---

## Theme

**`src/themes/default.js`** — all styling tokens:

| Token | Value | Used for |
|-------|-------|----------|
| `bg` | `#0d0d0d` | Background |
| `text` | `#00ff41` | Primary green text, borders |
| `dimText` | `#00aa2b` | Secondary / dim elements |
| `mutedText` | `#005f17` | Subtle separators |
| `accent` | `#ffffff` | White accents |
| `accentYellow` | `#ffff00` | Contact form prompts |
| `error` | `#ff4444` | Error messages |
| `font` | JetBrains Mono | All monospace text |

Access in styled-components via `${props => props.theme.text}`.

---

## State

- **No localStorage** — all state is ephemeral, resets on page refresh
- History managed with `useReducer` in `Terminal.js`
- Contact form state: `useState` → `{ step, data }` object or `null`

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `next@14` | Framework, routing, SSR |
| `react@18` | UI library |
| `styled-components@5` | CSS-in-JS (SWC compiler, no Babel) |
| `styled-normalize` | CSS reset (used in globals.js) |
| `react-icons@4` | Installed but currently unused |
| `@babel/runtime` | Runtime helpers |

---

## Key notes for future development

- **No TypeScript** — plain JS throughout
- **Pages Router only** — do not migrate to App Router without a plan
- **SWC handles styled-components** via `compiler.styledComponents` in `next.config.js` — do not add a `.babelrc`
- **`/api/contact.js`** only logs submissions — wire up an email provider (Resend, SendGrid, Nodemailer) to actually send emails
- **`react-icons` is installed but unused** — safe to add icon usage or remove
- The terminal is the entire app — there is no navigation, no other pages
