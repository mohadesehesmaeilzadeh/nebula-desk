import { createContext, useContext } from 'react'

export const defaultPreferences = {
  theme: 'dark',
  accent: 'cyan',
  animationsEnabled: true,
  soundEnabled: false,
}

export const PreferencesContext = createContext({
  preferences: defaultPreferences,
  setTheme: () => {},
  setAccent: () => {},
  setAnimationsEnabled: () => {},
  setSoundEnabled: () => {},
})

export function usePreferences() {
  return useContext(PreferencesContext)
}
