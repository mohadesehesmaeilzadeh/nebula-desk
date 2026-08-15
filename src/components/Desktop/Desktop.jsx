import { useRef, useState } from 'react'
import { applications } from '../../data/applications'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import Taskbar from '../Taskbar/Taskbar'
import WindowLayer from '../Window/WindowLayer'
import useWindowManager from '../Window/useWindowManager'
import './Desktop.css'
import DesktopIcon from './DesktopIcon'

const applicationById = new Map(applications.map((app) => [app.id, app]))

function Desktop({ onSleep, onRestart, onShutdown }) {
  const desktopRef = useRef(null)
  const [selectedAppId, setSelectedAppId] = useState(null)
  const isMobileWindowMode = useMediaQuery('(max-width: 767px)')
  const windowManager = useWindowManager(desktopRef)
  const desktopApplications = applications.filter((app) => app.showOnDesktop)
  const minimizedWindows = Object.values(windowManager.windows).filter(
    (windowState) => windowState.isOpen && windowState.isMinimized,
  )

  function handleClearSelection() {
    setSelectedAppId(null)
  }

  function handleSelectApplication(appId) {
    setSelectedAppId(appId)
  }

  function handleOpenApplication(appId) {
    windowManager.openWindow(appId)
  }

  return (
    <main
      ref={desktopRef}
      className="desktop"
      aria-labelledby="desktop-title"
      onClick={handleClearSelection}
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
      />
      {/* Temporary Phase 3 system and minimized-window controls.
          These will move into Start Menu and Taskbar surfaces in later phases. */}
      <section
        className="desktop-dev-controls"
        aria-label="Temporary Phase 3 controls"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="desktop-dev-control-group" aria-label="Temporary system controls">
          <span>System</span>
          <button type="button" onClick={onSleep}>
            Sleep
          </button>
          <button type="button" onClick={onRestart}>
            Restart
          </button>
          <button type="button" onClick={onShutdown}>
            Shut Down
          </button>
        </div>
        {minimizedWindows.length > 0 && (
          <div className="desktop-dev-control-group" aria-label="Temporary minimized app restore controls">
            <span>Restore</span>
            {minimizedWindows.map((windowState) => {
              const app = applicationById.get(windowState.appId)

              if (!app) {
                return null
              }

              return (
                <button
                  key={windowState.appId}
                  type="button"
                  onClick={() => windowManager.restoreMinimizedWindow(windowState.appId)}
                >
                  {app.name}
                </button>
              )
            })}
          </div>
        )}
      </section>
      <Taskbar />
    </main>
  )
}

export default Desktop
