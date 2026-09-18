import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ACCENT_IDS,
  DEFAULT_PREFERENCES,
  THEME_IDS,
} from '../data/preferences'
import { loadPreferences, savePreferences } from '../utils/preferencesStorage'
import PreferencesContext from './preferencesContextValue'

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(loadPreferences)
  const lastPersistedPreferences = useRef(preferences)

  useEffect(() => {
    if (preferences === lastPersistedPreferences.current) {
      return
    }

    savePreferences(preferences)
    lastPersistedPreferences.current = preferences
  }, [preferences])

  const setTheme = useCallback((theme) => {
    if (!THEME_IDS.includes(theme)) {
      return
    }

    setPreferences((current) =>
      current.theme === theme ? current : { ...current, theme },
    )
  }, [])

  const setAccent = useCallback((accent) => {
    if (!ACCENT_IDS.includes(accent)) {
      return
    }

    setPreferences((current) =>
      current.accent === accent ? current : { ...current, accent },
    )
  }, [])

  const setAnimationsEnabled = useCallback((animationsEnabled) => {
    if (typeof animationsEnabled !== 'boolean') {
      return
    }

    setPreferences((current) =>
      current.animationsEnabled === animationsEnabled
        ? current
        : { ...current, animationsEnabled },
    )
  }, [])

  const setSoundEnabled = useCallback((soundEnabled) => {
    if (typeof soundEnabled !== 'boolean') {
      return
    }

    setPreferences((current) =>
      current.soundEnabled === soundEnabled
        ? current
        : { ...current, soundEnabled },
    )
  }, [])

  const resetPreferences = useCallback(() => {
    setPreferences({ ...DEFAULT_PREFERENCES })
  }, [])

  const contextValue = useMemo(
    () => ({
      preferences,
      setTheme,
      setAccent,
      setAnimationsEnabled,
      setSoundEnabled,
      resetPreferences,
    }),
    [
      preferences,
      resetPreferences,
      setAccent,
      setAnimationsEnabled,
      setSoundEnabled,
      setTheme,
    ],
  )

  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
    </PreferencesContext.Provider>
  )
}
