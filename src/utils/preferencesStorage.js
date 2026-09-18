import {
  ACCENT_IDS,
  DEFAULT_PREFERENCES,
  PREFERENCES_STORAGE_KEY,
  PREFERENCES_VERSION,
  THEME_IDS,
} from '../data/preferences.js'

function getDefaultPreferences() {
  return { ...DEFAULT_PREFERENCES }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function normalizePreferences(value) {
  if (!isRecord(value)) {
    return getDefaultPreferences()
  }

  return {
    theme: THEME_IDS.includes(value.theme)
      ? value.theme
      : DEFAULT_PREFERENCES.theme,
    accent: ACCENT_IDS.includes(value.accent)
      ? value.accent
      : DEFAULT_PREFERENCES.accent,
    soundEnabled:
      typeof value.soundEnabled === 'boolean'
        ? value.soundEnabled
        : DEFAULT_PREFERENCES.soundEnabled,
    animationsEnabled:
      typeof value.animationsEnabled === 'boolean'
        ? value.animationsEnabled
        : DEFAULT_PREFERENCES.animationsEnabled,
  }
}

export function loadPreferences() {
  try {
    const storedValue = window.localStorage.getItem(PREFERENCES_STORAGE_KEY)

    if (!storedValue) {
      return getDefaultPreferences()
    }

    const storedData = JSON.parse(storedValue)

    if (
      !isRecord(storedData) ||
      storedData.version !== PREFERENCES_VERSION ||
      !isRecord(storedData.preferences)
    ) {
      return getDefaultPreferences()
    }

    return normalizePreferences(storedData.preferences)
  } catch {
    return getDefaultPreferences()
  }
}

export function savePreferences(preferences) {
  try {
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({
        version: PREFERENCES_VERSION,
        preferences: normalizePreferences(preferences),
      }),
    )
    return true
  } catch {
    console.warn('NebulaDesk could not save interface preferences.')
    return false
  }
}

export function clearPreferences() {
  try {
    window.localStorage.removeItem(PREFERENCES_STORAGE_KEY)
    return true
  } catch {
    console.warn('NebulaDesk could not clear interface preferences.')
    return false
  }
}
