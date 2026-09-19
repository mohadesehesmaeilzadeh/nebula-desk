import { useCallback, useEffect, useRef, useState } from 'react'
import { applications } from '../../data/applications'
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts'
import { MOBILE_MEDIA_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import StartMenu from '../StartMenu/StartMenu'
import Taskbar from '../Taskbar/Taskbar'
import WindowLayer from '../Window/WindowLayer'
import useWindowManager from '../Window/useWindowManager'
import './Desktop.css'
import DesktopIcon from './DesktopIcon'

const applicationById = new Map(applications.map((app) => [app.id, app]))
const applicationKeyboardShortcuts = Object.freeze({
  about: 'Alt+1',
  projects: 'Alt+2',
  terminal: 'Alt+3',
  settings: 'Alt+4',
})

function Desktop({ onSleep, onRestart, onShutdown }) {
  const desktopRef = useRef(null)
  const startButtonRef = useRef(null)
  const desktopIconRefs = useRef(new Map())
  const launchFocusTargetsRef = useRef(new Map())
  const focusFrameRef = useRef(null)
  const [selectedAppId, setSelectedAppId] = useState(null)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [recentAppIds, setRecentAppIds] = useState([])
  const isMobileWindowMode = useMediaQuery(MOBILE_MEDIA_QUERY)
  const windowManager = useWindowManager(desktopRef)
  const openWindow = windowManager.openWindow
  const desktopApplications = applications.filter((app) => app.showOnDesktop)
  const startMenuApplications = applications.filter((app) => app.showInStartMenu)
  const runningApps = Object.values(windowManager.windows)
    .filter((windowState) => windowState.isOpen)
    .map((windowState) => ({
      app: applicationById.get(windowState.appId),
      windowState,
    }))
    .filter((entry) => entry.app)
    .sort((a, b) => a.windowState.zIndex - b.windowState.zIndex)
  const recentApps = recentAppIds
    .map((appId) => applicationById.get(appId))
    .filter(Boolean)

  const scheduleFocus = useCallback((getTarget) => {
    if (focusFrameRef.current !== null) {
      window.cancelAnimationFrame(focusFrameRef.current)
    }

    focusFrameRef.current = window.requestAnimationFrame(() => {
      focusFrameRef.current = null
      const target = getTarget()

      if (target instanceof HTMLElement && target.isConnected) {
        target.focus({ preventScroll: true })
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      if (focusFrameRef.current !== null) {
        window.cancelAnimationFrame(focusFrameRef.current)
      }
    }
  }, [])

  const closeStartMenu = useCallback(() => {
    setIsStartMenuOpen(false)
  }, [])

  const dismissStartMenu = useCallback(() => {
    setIsStartMenuOpen(false)
    scheduleFocus(() => startButtonRef.current)
  }, [scheduleFocus])

  const updateRecentApps = useCallback((appId) => {
    setRecentAppIds((currentAppIds) =>
      [appId, ...currentAppIds.filter((currentAppId) => currentAppId !== appId)].slice(0, 4),
    )
  }, [])

  const launchApplication = useCallback((appId) => {
    if (document.activeElement instanceof HTMLElement) {
      launchFocusTargetsRef.current.set(appId, document.activeElement)
    }

    openWindow(appId)
    updateRecentApps(appId)
    closeStartMenu()
  }, [closeStartMenu, openWindow, updateRecentApps])

  function handleDesktopClick() {
    setSelectedAppId(null)
    closeStartMenu()
  }

  const handleToggleStartMenu = useCallback(() => {
    if (isStartMenuOpen) {
      dismissStartMenu()
      return
    }

    setIsStartMenuOpen(true)
  }, [dismissStartMenu, isStartMenuOpen])

  useKeyboardShortcuts({
    isStartMenuOpen,
    onCloseStartMenu: dismissStartMenu,
    onOpenApplication: launchApplication,
    onToggleStartMenu: handleToggleStartMenu,
  })

  function handleTaskbarAppClick(appId) {
    const windowState = windowManager.windows[appId]

    closeStartMenu()

    if (!windowState) {
      return
    }

    if (windowState.isMinimized) {
      windowManager.restoreMinimizedWindow(appId)
      return
    }

    if (windowManager.activeWindowId === appId) {
      windowManager.minimizeWindow(appId, isMobileWindowMode)
      return
    }

    windowManager.focusWindow(appId)
  }

  const handleWindowInteract = useCallback(
    () => {
      closeStartMenu()
    },
    [closeStartMenu],
  )

  function handleSelectApplication(appId) {
    setSelectedAppId(appId)
  }

  function handleOpenApplication(appId) {
    launchApplication(appId)
  }

  function handleCloseWindow(appId) {
    windowManager.closeWindow(appId, isMobileWindowMode)
    scheduleFocus(() => {
      const launchTarget = launchFocusTargetsRef.current.get(appId)

      launchFocusTargetsRef.current.delete(appId)

      if (launchTarget instanceof HTMLElement && launchTarget.isConnected) {
        return launchTarget
      }

      return desktopIconRefs.current.get(appId) || startButtonRef.current
    })
  }

  function handleMinimizeWindow(appId) {
    windowManager.minimizeWindow(appId, isMobileWindowMode)
    scheduleFocus(() => desktopIconRefs.current.get(appId) || startButtonRef.current)
  }

  return (
    <main
      ref={desktopRef}
      className="desktop"
      aria-labelledby="desktop-title"
      data-mobile={isMobileWindowMode ? 'true' : 'false'}
      data-start-menu-open={isStartMenuOpen ? 'true' : 'false'}
      onClick={handleDesktopClick}
    >
      <section className="desktop-workspace" aria-label="Desktop workspace">
        <header className="desktop-brand" aria-labelledby="desktop-title">
          <p>NebulaDesk</p>
          <h1 id="desktop-title">Desktop shell ready</h1>
        </header>

        <nav className="desktop-icon-grid" aria-label="Desktop applications">
          {desktopApplications.map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              buttonRef={(element) => {
                if (element) {
                  desktopIconRefs.current.set(app.id, element)
                } else {
                  desktopIconRefs.current.delete(app.id)
                }
              }}
              keyboardShortcut={applicationKeyboardShortcuts[app.id]}
              selected={selectedAppId === app.id}
              openOnSingleClick={isMobileWindowMode}
              onSelect={handleSelectApplication}
              onOpen={handleOpenApplication}
            />
          ))}
        </nav>
      </section>
      <WindowLayer
        windows={windowManager.windows}
        activeWindowId={windowManager.activeWindowId}
        isMobile={isMobileWindowMode}
        onClose={handleCloseWindow}
        onFocus={windowManager.focusWindow}
        onMinimize={handleMinimizeWindow}
        onMaximize={windowManager.maximizeWindow}
        onRestore={windowManager.restoreWindow}
        onMove={windowManager.moveWindow}
        onInteract={handleWindowInteract}
        onOpenApplication={launchApplication}
      />
      {isStartMenuOpen && (
        <StartMenu
          id="nebuladesk-start-menu"
          applications={startMenuApplications}
          recentApps={recentApps}
          isMobile={isMobileWindowMode}
          onLaunchApp={launchApplication}
          onSleep={onSleep}
          onRestart={onRestart}
          onShutdown={onShutdown}
          onClose={dismissStartMenu}
        />
      )}
      <Taskbar
        runningApps={runningApps}
        activeWindowId={windowManager.activeWindowId}
        isMobile={isMobileWindowMode}
        isStartMenuOpen={isStartMenuOpen}
        startMenuId="nebuladesk-start-menu"
        startButtonRef={startButtonRef}
        onToggleStartMenu={handleToggleStartMenu}
        onTaskbarAppClick={handleTaskbarAppClick}
      />
    </main>
  )
}

export default Desktop
