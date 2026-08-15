import './Desktop.css'

function Desktop({ onSleep, onRestart, onShutdown }) {
  return (
    <main className="desktop-placeholder" aria-labelledby="desktop-title">
      <section className="desktop-status-panel">
        <p className="desktop-eyebrow">Phase 1 Desktop Placeholder</p>
        <h1 id="desktop-title">NebulaDesk</h1>
        <p>Desktop shell ready</p>

        {/* Temporary Phase 1 controls until real Taskbar and Start Menu power actions exist. */}
        <div className="desktop-action-row" aria-label="Temporary system controls">
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
      </section>
    </main>
  )
}

export default Desktop
