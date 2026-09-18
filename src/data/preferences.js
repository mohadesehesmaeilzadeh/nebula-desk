export const PREFERENCES_STORAGE_KEY = 'nebuladesk-preferences'
export const PREFERENCES_VERSION = 1

export const THEMES = Object.freeze([
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
])

export const ACCENTS = Object.freeze([
  { id: 'cyan', label: 'Cyan' },
  { id: 'purple', label: 'Purple' },
  { id: 'blue', label: 'Blue' },
])

export const THEME_IDS = Object.freeze(THEMES.map((theme) => theme.id))
export const ACCENT_IDS = Object.freeze(ACCENTS.map((accent) => accent.id))

export const DEFAULT_PREFERENCES = Object.freeze({
  theme: 'dark',
  accent: 'cyan',
  soundEnabled: true,
  animationsEnabled: true,
})
