import Clock from './Clock'
import './Taskbar.css'

function Taskbar() {
  function handleNebulaButtonClick() {
    // Start Menu behavior belongs to Phase 4.
  }

  return (
    <footer className="taskbar" aria-label="NebulaDesk taskbar" onClick={(event) => event.stopPropagation()}>
      <button
        className="taskbar-nebula-button"
        type="button"
        aria-label="Nebula menu - coming in Phase 4"
        onClick={handleNebulaButtonClick}
      >
        <span className="taskbar-nebula-mark" aria-hidden="true" />
      </button>
      <div className="taskbar-center" aria-hidden="true" />
      <Clock />
    </footer>
  )
}

export default Taskbar
