import { AppIconGlyph } from '../Desktop/DesktopIcon'

function TaskbarAppButton({ app, state, onClick }) {
  const isActive = state === 'active'
  const isMinimized = state === 'minimized'
  const action = isActive ? 'Minimize' : isMinimized ? 'Restore' : 'Focus'

  return (
    <button
      className="taskbar-app-button"
      type="button"
      data-state={state}
      aria-label={`${action} ${app.name}`}
      aria-pressed={isActive}
      onClick={() => onClick(app.id)}
    >
      <AppIconGlyph icon={app.icon} />
      <span className="taskbar-app-label">{app.name}</span>
    </button>
  )
}

export default TaskbarAppButton
