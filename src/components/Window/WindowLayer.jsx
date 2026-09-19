import { applications } from '../../data/applications'
import ApplicationRenderer from '../../apps/ApplicationRenderer'
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
  onOpenApplication,
}) {
  const openWindows = Object.values(windows).filter((windowState) => windowState.isOpen)
  const visibleWindows = openWindows.filter((windowState) => !windowState.isMinimized)
  const activeVisibleWindow = visibleWindows.find(
    (windowState) => windowState.appId === activeWindowId,
  )
  const fallbackVisibleWindow = [...visibleWindows].sort(
    (a, b) => b.zIndex - a.zIndex,
  )[0]
  const renderedWindows = isMobile
    ? activeWindowId === null
      ? []
      : [activeVisibleWindow || fallbackVisibleWindow].filter(Boolean)
    : visibleWindows

  if (renderedWindows.length === 0) {
    return null
  }

  return (
    <div
      className="window-layer"
      data-mobile={isMobile ? 'true' : 'false'}
      role="region"
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
          >
            <ApplicationRenderer
              appId={app.id}
              onOpenApplication={onOpenApplication}
            />
          </Window>
        )
      })}
    </div>
  )
}

export default WindowLayer
