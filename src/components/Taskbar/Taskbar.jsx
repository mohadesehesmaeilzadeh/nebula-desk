import Clock from './Clock'
import TaskbarAppButton from './TaskbarAppButton'
import './Taskbar.css'

function Taskbar({
  runningApps,
  activeWindowId,
  isStartMenuOpen,
  startMenuId,
  startButtonRef,
  onToggleStartMenu,
  onTaskbarAppClick,
}) {
  return (
    <nav className="taskbar" aria-label="NebulaDesk taskbar" onClick={(event) => event.stopPropagation()}>
      <button
        ref={startButtonRef}
        className="taskbar-nebula-button"
        type="button"
        aria-label={isStartMenuOpen ? 'Close NebulaDesk Start Menu' : 'Open NebulaDesk Start Menu'}
        aria-expanded={isStartMenuOpen}
        aria-controls={startMenuId}
        onClick={onToggleStartMenu}
      >
        <span className="taskbar-nebula-mark" aria-hidden="true" />
      </button>
      <div className="taskbar-running-apps" aria-label="Running applications">
        {runningApps.map(({ app, windowState }) => {
          const state = windowState.isMinimized
            ? 'minimized'
            : windowState.appId === activeWindowId
              ? 'active'
              : 'inactive'

          return (
            <TaskbarAppButton
              key={app.id}
              app={app}
              state={state}
              onClick={onTaskbarAppClick}
            />
          )
        })}
      </div>
      <Clock />
    </nav>
  )
}

export default Taskbar
