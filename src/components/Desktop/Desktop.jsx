import { useCallback, useRef, useState } from 'react'
import { applications } from '../../data/applications'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import StartMenu from '../StartMenu/StartMenu'
import Taskbar from '../Taskbar/Taskbar'
import WindowLayer from '../Window/WindowLayer'
import useWindowManager from '../Window/useWindowManager'
import './Desktop.css'
import DesktopIcon from './DesktopIcon'

const applicationById = new Map(applications.map((app) => [app.id, app]))

function Desktop({ onSleep, onRestart, onShutdown }) {
  const desktopRef = useRef(null)
  const startButtonRef = useRef(null)
  const [selectedAppId, setSelectedAppId] = useState(null)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [recentAppIds, setRecentAppIds] = useState([])
  const isMobileWindowMode = useMediaQuery('(max-width: 767px)')
  const windowManager = useWindowManager(desktopRef)
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

  const closeStartMenu = useCallback(() => {
    setIsStartMenuOpen(false)
  }, [])

  function updateRecentApps(appId) {
    setRecentAppIds((currentAppIds) =>
      [appId, ...currentAppIds.filter((currentAppId) => currentAppId !== appId)].slice(0, 4),
    )
  }

  function launchApplication(appId) {
    windowManager.openWindow(appId)
    updateRecentApps(appId)
    closeStartMenu()
  }

  function handleDesktopClick() {
    setSelectedAppId(null)
    closeStartMenu()
  }

  function handleToggleStartMenu() {
    setIsStartMenuOpen((isOpen) => !isOpen)
  }

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
      windowManager.minimizeWindow(appId)
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

  return (
    <main
      ref={desktopRef}
      className="desktop"
      aria-labelledby="desktop-title"
      onClick={handleDesktopClick}
    >
      <section className="desktop-workspace" aria-label="Desktop workspace">
        <header className="desktop-brand" aria-labelledby="desktop-title">
          <p>NebulaDesk</p>
          <h1 id="desktop-title">Desktop shell ready</h1>
        </header>

        <div className="desktop-icon-grid" aria-label="Desktop applications">
          {desktopApplications.map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              selected={selectedAppId === app.id}
              openOnSingleClick={isMobileWindowMode}
              onSelect={handleSelectApplication}
              onOpen={handleOpenApplication}
            />
          ))}
        </div>
      </section>
      <WindowLayer
        windows={windowManager.windows}
        activeWindowId={windowManager.activeWindowId}
        isMobile={isMobileWindowMode}
        onClose={windowManager.closeWindow}
        onFocus={windowManager.focusWindow}
        onMinimize={windowManager.minimizeWindow}
        onMaximize={windowManager.maximizeWindow}
        onRestore={windowManager.restoreWindow}
        onMove={windowManager.moveWindow}
        onInteract={handleWindowInteract}
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
          onClose={closeStartMenu}
        />
      )}
      <Taskbar
        runningApps={runningApps}
        activeWindowId={windowManager.activeWindowId}
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
