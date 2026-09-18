import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  defaultPreferences,
  PreferencesContext,
} from '../../context/PreferencesContext'
import Desktop from '../Desktop/Desktop'
import BootScreen from './BootScreen'
import LockScreen from './LockScreen'
import PoweredOffScreen from './PoweredOffScreen'
import ShutdownScreen from './ShutdownScreen'
import SleepScreen from './SleepScreen'
import { SYSTEM_STATUS } from './systemStatus'
import './System.css'

const BOOT_SESSION_KEY = 'nebuladesk-has-booted'

function hasCompletedSessionBoot() {
  try {
    return window.sessionStorage.getItem(BOOT_SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

function markSessionBootComplete() {
  try {
    window.sessionStorage.setItem(BOOT_SESSION_KEY, 'true')
  } catch {
    // SessionStorage may be unavailable in private or restricted browsing modes.
  }
}

function getInitialSystemStatus() {
  return hasCompletedSessionBoot() ? SYSTEM_STATUS.LOCKED : SYSTEM_STATUS.BOOTING
}

function SystemShell() {
  const [status, setStatus] = useState(getInitialSystemStatus)
  const [desktopSessionId, setDesktopSessionId] = useState(0)
  const [hasDesktopSession, setHasDesktopSession] = useState(false)
  const [preferences, setPreferences] = useState(defaultPreferences)

  const preferencesContextValue = useMemo(
    () => ({
      preferences,
      setTheme: (theme) => setPreferences((current) => ({ ...current, theme })),
      setAccent: (accent) => setPreferences((current) => ({ ...current, accent })),
      setAnimationsEnabled: (animationsEnabled) =>
        setPreferences((current) => ({ ...current, animationsEnabled })),
      setSoundEnabled: (soundEnabled) =>
        setPreferences((current) => ({ ...current, soundEnabled })),
    }),
    [preferences],
  )

  const handleBootComplete = useCallback(() => {
    markSessionBootComplete()
    setStatus(SYSTEM_STATUS.LOCKED)
  }, [])

  const handleUnlock = useCallback(() => {
    setHasDesktopSession(true)
    setStatus(SYSTEM_STATUS.DESKTOP)
  }, [])

  const handleSleep = useCallback(() => {
    setStatus(SYSTEM_STATUS.SLEEPING)
  }, [])

  const handleWake = useCallback(() => {
    setStatus(SYSTEM_STATUS.LOCKED)
  }, [])

  const handleRestart = useCallback(() => {
    setHasDesktopSession(false)
    setDesktopSessionId((sessionId) => sessionId + 1)
    setStatus(SYSTEM_STATUS.BOOTING)
  }, [])

  const handleShutdown = useCallback(() => {
    setHasDesktopSession(false)
    setDesktopSessionId((sessionId) => sessionId + 1)
    setStatus(SYSTEM_STATUS.SHUTTING_DOWN)
  }, [])

  const handleShutdownComplete = useCallback(() => {
    setStatus(SYSTEM_STATUS.POWERED_OFF)
  }, [])

  const handlePowerOn = useCallback(() => {
    setStatus(SYSTEM_STATUS.BOOTING)
  }, [])

  useEffect(() => {
    function handleSystemKeyDown(event) {
      if (status === SYSTEM_STATUS.LOCKED && event.key === 'Enter') {
        event.preventDefault()
        handleUnlock()
      }

      if (
        status === SYSTEM_STATUS.SLEEPING &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault()
        handleWake()
      }
    }

    if (status !== SYSTEM_STATUS.LOCKED && status !== SYSTEM_STATUS.SLEEPING) {
      return undefined
    }

    window.addEventListener('keydown', handleSystemKeyDown)

    return () => {
      window.removeEventListener('keydown', handleSystemKeyDown)
    }
  }, [handleUnlock, handleWake, status])

  function renderSystemScreen() {
    switch (status) {
      case SYSTEM_STATUS.BOOTING:
        return <BootScreen onComplete={handleBootComplete} />
      case SYSTEM_STATUS.LOCKED:
        return <LockScreen onUnlock={handleUnlock} />
      case SYSTEM_STATUS.DESKTOP:
        return null
      case SYSTEM_STATUS.SLEEPING:
        return <SleepScreen onWake={handleWake} />
      case SYSTEM_STATUS.SHUTTING_DOWN:
        return <ShutdownScreen onShutdownComplete={handleShutdownComplete} />
      case SYSTEM_STATUS.POWERED_OFF:
        return <PoweredOffScreen onPowerOn={handlePowerOn} />
      default:
        return <BootScreen onComplete={handleBootComplete} />
    }
  }

  return (
    <PreferencesContext.Provider value={preferencesContextValue}>
      <div
        className="system-root"
        data-theme={preferences.theme}
        data-accent={preferences.accent}
        data-animations={preferences.animationsEnabled ? 'on' : 'off'}
        data-sound={preferences.soundEnabled ? 'on' : 'off'}
      >
        {hasDesktopSession && (
          <div
            className="system-desktop-stage"
            hidden={status !== SYSTEM_STATUS.DESKTOP}
            aria-hidden={status !== SYSTEM_STATUS.DESKTOP}
          >
            <Desktop
              key={desktopSessionId}
              onSleep={handleSleep}
              onRestart={handleRestart}
              onShutdown={handleShutdown}
            />
          </div>
        )}
        {renderSystemScreen()}
      </div>
    </PreferencesContext.Provider>
  )
}

export default SystemShell
