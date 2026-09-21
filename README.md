# 🪐 NebulaDesk

**A frontend-only interactive portfolio disguised as a fictional desktop operating system.**

NebulaDesk is a React-based desktop experience built to explore advanced frontend architecture, state management, browser APIs, responsive interfaces, accessibility, and reusable UI systems.

Instead of presenting portfolio content as a traditional website, NebulaDesk turns it into an operating-system-inspired environment with windows, applications, system states, persistent preferences, keyboard shortcuts, and desktop interactions.

> **Project Status:** Feature-complete portfolio experience — currently moving toward production-level engineering quality.

---

## ✨ Demo

A production deployment will be added as part of the upcoming release process.

```text
Live Demo: Coming soon
```

The final release will include:

- Production deployment
- Optimized build
- PWA installation
- Automated testing
- CI validation
- Performance auditing

---

## 📸 Screenshots

Project screenshots and a short demo GIF will be added alongside the production deployment.

Planned preview content:

- Desktop environment
- Start Menu
- Multiple application windows
- Terminal
- Settings and themes
- Notes
- Gallery
- Music Player
- Paint
- Memory Game
- Mobile application mode

---

# 🚀 Features

## 🖥 Desktop Experience

NebulaDesk recreates the behavior of a lightweight desktop operating system directly in the browser.

It includes:

- Boot screen
- Lock screen
- Desktop environment
- Sleep mode
- Restart flow
- Shutdown flow
- Power-on state
- Desktop application launchers
- Taskbar
- Start Menu
- Active application switching

---

## 🪟 Window Manager

Applications run inside reusable desktop windows.

The window system supports:

- Opening applications
- Closing applications
- Minimizing windows
- Restoring minimized windows
- Maximizing windows
- Moving windows
- Window focus management
- Active window tracking
- Multiple open applications

The window manager is reusable and does not contain application-specific logic.

---

## 📱 Responsive Application System

NebulaDesk adapts its interaction model depending on the device.

### Desktop

Applications appear as floating windows that can be moved, minimized, maximized, focused, and closed.

### Mobile

Applications switch to a fullscreen experience designed for touch interaction, including clear Back navigation, touch-friendly controls, safe-area-aware layouts, and responsive application interfaces.

---

# 🧩 Applications

NebulaDesk currently includes:

- 👤 **About Me** — Personal and professional information
- 💼 **Projects** — Selected portfolio work
- 🛠 **Skills** — Technologies and development skills
- 💻 **Terminal** — Command-inspired portfolio interface
- ⚙️ **Settings** — Theme, accent color, and animation preferences
- 📝 **Notes** — Persistent browser-based notes
- 🖼 **Gallery** — Interactive image gallery
- 🎵 **Music Player** — Audio player with persistent volume
- 🎨 **Paint** — Canvas-based drawing app
- 🧠 **Memory Game** — Memory game with persistent best score
- 🗑 **Trash** — Desktop-inspired Trash application

---

# 🎨 Customization

### Themes

- Dark
- Light

### Accent Colors

- Cyan
- Purple
- Blue

Preferences are persisted locally so the interface can restore the user's configuration after a refresh.

---

# 💾 Persistence

NebulaDesk uses versioned browser storage for selected persistent state.

Currently persisted data includes:

- Interface preferences
- Theme
- Accent color
- Animation preference
- Notes
- Music volume
- Memory Game best score

Runtime desktop state such as currently opened windows intentionally resets when a new system session begins.

Storage operations include safe fallback behavior when browser storage is unavailable or contains invalid data.

---

# 🏗 Architecture

NebulaDesk is structured around separation between **system behavior**, **applications**, and **portfolio data**.

```text
                    NebulaDesk
                        │
                  System Shell
                        │
        ┌───────────────┼───────────────┐
        │               │               │
      Desktop        Taskbar        Start Menu
        │               │               │
        └───────────────┼───────────────┘
                        │
                  App Registry
                        │
                 Window Manager
                        │
        ┌───────────────┼───────────────┐
        │               │               │
      App A           App B           App C
```

## Shared Application Registry

Application metadata is defined through a shared registry consumed by the Desktop, Start Menu, Taskbar, Terminal `open` command, Window Manager, and application renderer.

This avoids duplicating application-specific logic throughout the desktop shell.

## State Ownership

```text
System State
│
├── Desktop / Window State
├── System Status
├── Active Applications
└── Window Focus

Preference State
│
├── Theme
├── Accent Color
└── Animation Preference

Application State
│
├── Notes
├── Music
├── Paint
├── Gallery
└── Memory Game
```

Applications are responsible for their internal state while shared system behavior remains inside the desktop and preference layers.

---

# 🛠 Tech Stack

## Core

- React 19
- JavaScript
- CSS
- Vite

## Browser APIs

- LocalStorage
- Canvas API
- Audio API
- Pointer Events
- Keyboard Events
- Media Queries

## Tooling

- Vite
- oxlint
- npm
- Git
- GitHub

---

# 📂 Project Structure

```text
src/
│
├── apps/          # Application interfaces and app-specific logic
├── assets/        # Images, audio files and local assets
├── components/    # Desktop, system, taskbar, Start Menu and windows
├── context/       # Shared persistent preferences
├── data/          # Portfolio content and application registry
├── hooks/         # Clock, media-query, preferences and shortcuts
├── styles/        # Global styles, design tokens, themes and motion
└── utils/         # Storage and window-related utilities
```

---

# ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl / Cmd + Space` | Toggle Start Menu |
| `Alt + 1` | Open About Me |
| `Alt + 2` | Open Projects |
| `Alt + 3` | Open Terminal |
| `Alt + 4` | Open Settings |

Keyboard support is designed as part of the application architecture rather than as an afterthought.

---

# ♿ Accessibility

Current accessibility work includes:

- Semantic native controls
- Accessible names for interactive elements
- Keyboard-operable desktop applications
- Keyboard-accessible Start Menu
- Keyboard-accessible Gallery
- Keyboard-accessible Music controls
- Keyboard-accessible Memory Game
- Visible focus states
- Non-color-only selected states
- Sensible focus restoration
- Reduced-motion support
- In-app animation preference

The interface respects both the operating system's reduced-motion preference and NebulaDesk's internal animation setting.

---

# 🧪 Testing

Automated testing is the next major engineering milestone for NebulaDesk.

## Unit & Component Testing

Planned stack:

- Vitest
- React Testing Library
- jest-dom
- user-event

Initial test coverage will focus on:

- Storage utilities
- Preference persistence
- Application registry
- Settings behavior
- Start Menu interactions
- Window lifecycle
- Window minimize / restore behavior

## End-to-End Testing

Playwright will be introduced for critical user journeys.

```text
Boot
  ↓
Lock Screen
  ↓
Desktop
  ↓
Open Application
  ↓
Minimize
  ↓
Restore
  ↓
Close
```

Additional scenarios will cover Start Menu behavior, keyboard shortcuts, preference persistence, mobile navigation, and restart behavior.

---

# ⚡ Performance

Future performance work will focus on measurable improvements rather than unnecessary abstractions.

Planned improvements include:

- React lazy loading
- Dynamic application loading
- Suspense boundaries
- Reduced initial JavaScript execution
- Bundle-size analysis
- Asset optimization
- Application-level code splitting
- Lighthouse auditing
- Rendering optimization where profiling identifies a real bottleneck

Performance optimizations will be driven by measurement rather than premature optimization.

---

# 🛡 Error Handling

Planned production-hardening improvements include:

- React Error Boundaries
- Application crash isolation
- Safe fallback UI
- Storage failure handling
- Defensive application loading

The goal is to prevent a failure inside one application from crashing the entire desktop environment.

---

# 🔄 CI/CD

Continuous integration will be introduced through GitHub Actions.

```text
Install
   ↓
Lint
   ↓
Unit Tests
   ↓
E2E Tests
   ↓
Production Build
```

Planned checks:

```bash
npm run lint
npm run test
npm run build
```

Playwright validation will be added after the E2E setup is complete.

---

# 📲 PWA

A future PWA phase will add:

- Web App Manifest
- Installable application experience
- Application icons
- Standalone display mode
- Basic offline support
- Cached application shell

The goal is to allow NebulaDesk to behave more like an installed application without introducing a backend.

---

# 🌐 Deployment

NebulaDesk is completely frontend-only and requires no backend, database, API keys, authentication service, or runtime secrets.

A production build can be generated with:

```bash
npm run build
```

The generated production files are placed inside:

```text
dist/
```

A public production deployment will be added before the `v1.0.0` release.

---

# 🧭 Roadmap

NebulaDesk has reached the point where adding more applications provides less value than improving the engineering quality of the existing system.

Future development therefore focuses on **reliability, testing, performance, deployment, accessibility, and maintainability**.

## Phase 1 — Automated Testing

- [ ] Add Vitest
- [ ] Add React Testing Library
- [ ] Test storage utilities
- [ ] Test persistent preferences
- [ ] Test application registry
- [ ] Test Start Menu
- [ ] Test Window Manager behavior

## Phase 2 — End-to-End Testing

- [ ] Add Playwright
- [ ] Test boot-to-desktop flow
- [ ] Test application lifecycle
- [ ] Test minimize / restore behavior
- [ ] Test keyboard shortcuts
- [ ] Test persistence
- [ ] Test mobile navigation

## Phase 3 — CI/CD

- [ ] Add GitHub Actions
- [ ] Run lint automatically
- [ ] Run tests automatically
- [ ] Validate production builds
- [ ] Run E2E tests in CI

## Phase 4 — Reliability

- [ ] Add Error Boundaries
- [ ] Isolate application failures
- [ ] Improve fallback interfaces
- [ ] Strengthen defensive storage handling

## Phase 5 — Performance

- [ ] Introduce lazy-loaded applications
- [ ] Add code splitting
- [ ] Analyze bundle size
- [ ] Optimize heavy assets
- [ ] Run Lighthouse audits
- [ ] Improve measurable performance bottlenecks

## Phase 6 — PWA

- [ ] Add Web App Manifest
- [ ] Add install support
- [ ] Add application icons
- [ ] Add standalone mode
- [ ] Add basic offline support

## Phase 7 — Production Release

- [ ] Deploy production version
- [ ] Add Live Demo link
- [ ] Add screenshots
- [ ] Add demo GIF
- [ ] Final accessibility audit
- [ ] Final responsive audit
- [ ] Final performance audit
- [ ] Publish `v1.0.0`

---

# 🎯 Project Scope

A deliberate part of NebulaDesk's roadmap is knowing **what not to build**.

NebulaDesk already contains enough applications to demonstrate its desktop architecture. The project is therefore **not focused on continuously adding small novelty applications**.

Examples that are intentionally not part of the current roadmap include:

- Calculator
- Weather
- Calendar
- Chat application
- Additional mini-games
- Large numbers of small utility apps

Adding ten more applications would increase the size of the project without significantly demonstrating new frontend engineering skills.

The priority instead is:

```text
More Features ❌

Better Engineering ✅
Better Testing ✅
Better Accessibility ✅
Better Performance ✅
Better Reliability ✅
Better Documentation ✅
Better Deployment ✅
```

NebulaDesk is intended to become a polished engineering portfolio project rather than simply a collection of mini applications.

---

# 🧠 Challenges

## Building a Reusable Window System

One of the main challenges was designing windows that could support multiple independent applications while sharing common behaviors such as focus, minimize, restore, maximize, close, and positioning.

The solution was to separate application metadata and application UI from the window-management system.

## Desktop and Mobile Interaction Models

A desktop window interface does not translate directly to mobile devices.

```text
Desktop → Window-based applications
Mobile  → Fullscreen applications
```

This keeps the operating-system concept while maintaining usability across device sizes.

## Persistent State vs Runtime State

NebulaDesk intentionally persists preferences, notes, music volume, and game score while resetting runtime system state such as open windows, window positions, and current focus.

This distinction keeps persistence predictable and avoids restoring stale desktop sessions unexpectedly.

## Accessibility in an OS-Like Interface

NebulaDesk required careful handling of keyboard navigation, focus management, accessible control names, selected-state communication, reduced motion, and touch interactions.

This made accessibility part of the architecture instead of a final visual adjustment.

---

# 📚 What I Learned

Building NebulaDesk strengthened my understanding of:

- Designing reusable React components
- Separating application and system responsibilities
- Managing shared and local state
- Building reusable UI architecture
- Designing configuration-driven systems
- Browser persistence
- Native browser APIs
- Responsive interaction design
- Keyboard accessibility
- Focus management
- Pointer-based interfaces
- Canvas interactions
- Audio handling
- Designing desktop and mobile experiences from the same application architecture
- Knowing when **not** to add another feature

One of the most important lessons from the project has been that a project does not become more impressive simply by having more features.

After reaching a strong functional scope, improving **testing, maintainability, performance, accessibility, and reliability** provides significantly more engineering value.

---

# ▶️ Getting Started

Clone the project and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

---

# 📜 Available Scripts

### Development

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

Testing commands will be documented here once the automated testing phase is completed.

---

# 📌 Project Philosophy

NebulaDesk started as a creative frontend portfolio experiment.

Its long-term goal is:

> **Build a small but polished frontend system that demonstrates thoughtful architecture, interaction design, accessibility, and engineering quality.**

The next milestone is therefore not another desktop application. It is making the existing desktop more reliable, testable, performant, and production-ready.

---

## 👩‍💻 Author

**Mohadese Esmaeilzadeh**

Frontend Developer focused on React, JavaScript, responsive interfaces, and building polished user experiences.

---

## 📄 License

A license has not been added yet.

License selection will be finalized before the first stable release.
