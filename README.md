# NebulaDesk

NebulaDesk is a frontend-only interactive web operating system and personal
React portfolio. The project will present portfolio content through a fictional
desktop environment instead of a traditional multi-section page.

## Current Status

Phase 8C &mdash; Memory Game &amp; Trash

The repository now includes the core NebulaDesk system shell, desktop
environment, window manager, taskbar, Start Menu, functional MVP applications,
and persistent interface personalization. Desktop viewports retain floating,
draggable windows, while mobile viewports use focused fullscreen applications,
touch-sized controls, a compact taskbar, and a dismissible Start Menu sheet.

Notes adds versioned LocalStorage persistence for plain-text writing. Gallery
uses local NebulaDesk imagery with a responsive grid and an in-app viewer.
Music Player uses original local WAV samples with native browser playback,
while Paint provides a responsive pointer-enabled HTML Canvas workspace.
Memory Game adds a local card-matching challenge with a persisted best result.
Trash is a fictional runtime-only view of demo deleted items.

NebulaDesk stores theme, accent, sound, and animation preferences locally in
the browser using LocalStorage. No preference data is sent to a server.

## Planned MVP

- Boot Screen
- Lock Screen
- Desktop
- Taskbar
- Start Menu
- Reusable windows
- About
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
- Responsive mobile behavior

## Technology

- React
- JavaScript
- HTML
- CSS
- Vite

## Frontend-Only Constraints

NebulaDesk does not require:

- Backend
- Database
- Authentication
- External API

Local static data and browser storage may be used for portfolio content,
preferences, and lightweight persistence.

## Local Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Roadmap

- Phase 0 &mdash; Repository Preparation
- Phase 1 &mdash; System Flow
- Phase 2 &mdash; Desktop Shell
- Phase 3 &mdash; Window Manager
- Phase 4 &mdash; Taskbar and Start Menu
- Phase 5 &mdash; MVP Applications
- Phase 6 &mdash; Themes and Persistence
- Phase 7 &mdash; Responsive Mobile Behavior
- Phase 8 &mdash; Additional Applications
- Phase 9 &mdash; Accessibility and Keyboard Support
- Phase 10 &mdash; Testing and Performance
- Phase 11 &mdash; Portfolio Content and Deployment

## License

No license file is currently included.
