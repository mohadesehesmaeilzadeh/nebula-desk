# NebulaDesk

**NebulaDesk &mdash; Completed Portfolio Project**

## About

NebulaDesk is a frontend-only interactive portfolio presented as a fictional
desktop operating system. It combines a reusable window manager, local
applications, responsive mobile behavior, browser persistence, and accessible
keyboard interaction in one React application.

![NebulaDesk startup sequence](src/assets/gallery/startup-sequence.png)

## Features

- Boot, lock, sleep, restart, shutdown, and power-on system states
- Desktop launchers, draggable windows, taskbar, Start Menu, and app switching
- Floating desktop windows and focused fullscreen mobile applications
- Dark and light themes with cyan, purple, and blue accents
- Local persistence for preferences, notes, Music volume, and Memory best score
- Global keyboard shortcuts, visible focus states, and reduced-motion support
- Frontend-only operation with no backend, account, or external API dependency

## Applications

- About Me
- Projects
- Skills
- Terminal
- Settings
- Notes
- Gallery
- Music Player
- Paint
- Memory Game
- Trash

## Tech Stack

- React 19
- JavaScript
- CSS
- Vite
- Native browser APIs including Canvas, Audio, Pointer Events, and LocalStorage

## Architecture

Application metadata is defined in a shared registry. The desktop, Start Menu,
Taskbar, Terminal `open` command, Window Manager, and application renderer all
use that registry rather than app-specific shell logic. Applications own their
internal state while shared system state stays in the desktop and preferences
layers.

## Getting Started

```bash
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run lint     # Run oxlint
npm run build    # Create the production build in dist/
npm run preview  # Preview the production build locally
```

## Project Structure

```text
src/
|-- apps/        Application interfaces and app-local logic
|-- assets/      Local audio, gallery imagery, and favicon
|-- components/  Desktop, system, taskbar, Start Menu, and windows
|-- context/     Persistent interface preferences
|-- data/        Portfolio content and application registry
|-- hooks/       Clock, media-query, preferences, and shortcuts
|-- styles/      Global tokens, themes, and motion rules
`-- utils/       Storage and window-bound helpers
```

## Persistence

NebulaDesk uses versioned LocalStorage records for interface preferences and
Notes, plus small records for Music volume and the Memory Game best score.
Invalid or unavailable browser storage falls back safely. Open windows and
other runtime desktop state intentionally reset with a new system session.

## Responsive Behavior

Desktop layouts use movable, minimizable, and maximizable windows. At mobile
widths, applications become fullscreen below the system taskbar and expose a
clear Back control. Launchers, app controls, Paint pointer input, and the Start
Menu remain touch-friendly and safe-area aware.

## Accessibility

Interactive controls use native elements and accessible names. Desktop apps,
window controls, forms, Start Menu search, Gallery navigation, Music controls,
and Memory cards are keyboard operable. Focus returns to sensible launchers,
selected states include non-color cues, and motion follows both the operating
system preference and the in-app Animations setting.

Global shortcuts:

- `Ctrl/Cmd + Space` toggles the Start Menu
- `Alt + 1` opens About Me
- `Alt + 2` opens Projects
- `Alt + 3` opens Terminal
- `Alt + 4` opens Settings

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to any static
host, including Vercel, Netlify, Cloudflare Pages, or GitHub Pages. The project
is provider-neutral and requires no runtime environment variables or secrets.
For a GitHub Pages project subpath, configure Vite's `base` value for that
repository path before building.

## License

No license file is currently included.
