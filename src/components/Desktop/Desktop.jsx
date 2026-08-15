import { useState } from 'react'
import { applications } from '../../data/applications'
import Taskbar from '../Taskbar/Taskbar'
import './Desktop.css'
import DesktopIcon from './DesktopIcon'

function Desktop({ onSleep, onRestart, onShutdown }) {
  const [selectedAppId, setSelectedAppId] = useState(null)
  const desktopApplications = applications.filter((app) => app.showOnDesktop)

  function handleClearSelection() {
    setSelectedAppId(null)
  }

  function handleSelectApplication(appId) {
    setSelectedAppId(appId)
  }

  function handleOpenApplication() {
    // Application windows are intentionally deferred to Phase 3.
  }

  return (
    <main className="desktop" aria-labelledby="desktop-title" onClick={handleClearSelection}>
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
              onSelect={handleSelectApplication}
              onOpen={handleOpenApplication}
            />
          ))}
        </div>

        {/* Temporary Phase 2 system controls.
            These will move into Start Menu power controls in a later phase. */}
        <section
          className="desktop-dev-controls"
          aria-label="Temporary system controls"
          onClick={(event) => event.stopPropagation()}
        >
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
        </section>
      </section>
      <Taskbar />
    </main>
  )
}

export default Desktop
