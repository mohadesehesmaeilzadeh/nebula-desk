import { applications } from '../../data/applications'
import Window from './Window'
import './Window.css'

const applicationById = new Map(applications.map((app) => [app.id, app]))

function WindowLayer({
  windows,
  activeWindowId,
  isMobile,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onRestore,
  onMove,
  onInteract,
}) {
  const openWindows = Object.values(windows).filter((windowState) => windowState.isOpen)
  const visibleWindows = openWindows.filter((windowState) => !windowState.isMinimized)
  const renderedWindows = isMobile
    ? visibleWindows.filter((windowState) => windowState.appId === activeWindowId).slice(-1)
    : visibleWindows

  if (renderedWindows.length === 0) {
    return null
  }

  return (
    <div
      className="window-layer"
      data-mobile={isMobile ? 'true' : 'false'}
      aria-label="Open application windows"
      onPointerDownCapture={onInteract}
    >
      {renderedWindows.map((windowState) => {
        const app = applicationById.get(windowState.appId)

        if (!app) {
          return null
        }

        return (
          <Window
            key={windowState.appId}
            app={app}
            windowState={windowState}
            isActive={windowState.appId === activeWindowId}
            isMobile={isMobile}
            onClose={onClose}
            onFocus={onFocus}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onRestore={onRestore}
            onMove={onMove}
          />
        )
      })}
    </div>
  )
}

export default WindowLayer
