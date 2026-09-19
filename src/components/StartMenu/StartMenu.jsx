import { useEffect, useMemo, useRef, useState } from 'react'
import { AppIconGlyph } from '../Desktop/DesktopIcon'
import './StartMenu.css'

function normalizeSearchValue(value) {
  return value.trim().toLowerCase()
}

function appMatchesQuery(app, query) {
  const normalizedQuery = normalizeSearchValue(query)

  if (!normalizedQuery) {
    return true
  }

  const searchableText = [app.name, ...(app.keywords || [])].join(' ').toLowerCase()

  return searchableText.includes(normalizedQuery)
}

function StartMenu({
  id,
  applications,
  recentApps,
  isMobile,
  onLaunchApp,
  onSleep,
  onRestart,
  onShutdown,
  onClose,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const closeButtonRef = useRef(null)
  const filteredApplications = useMemo(
    () => applications.filter((app) => appMatchesQuery(app, searchQuery)),
    [applications, searchQuery],
  )

  useEffect(() => {
    const initialFocusTarget = isMobile ? closeButtonRef.current : searchInputRef.current

    initialFocusTarget?.focus({ preventScroll: true })
  }, [isMobile])

  function handlePowerAction(action) {
    onClose()
    action()
  }

  return (
    <>
      {isMobile && (
        <div
          className="start-menu-backdrop"
          aria-hidden="true"
          onPointerDown={onClose}
        />
      )}
      <section
        id={id}
        className="start-menu"
        aria-label="NebulaDesk Start Menu"
        data-start-menu-root="true"
        data-mobile={isMobile ? 'true' : 'false'}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="start-menu-header">
          <div className="start-menu-avatar" aria-hidden="true">
            ND
          </div>
          <div className="start-menu-heading">
            <p>NebulaDesk</p>
            <h2>Developer workspace</h2>
          </div>
          {isMobile && (
            <button
              ref={closeButtonRef}
              className="start-menu-close"
              type="button"
              aria-label="Close Start Menu"
              title="Close Start Menu"
              onClick={onClose}
            >
              <span aria-hidden="true" />
            </button>
          )}
        </header>

        <div className="start-menu-search">
          <label className="visually-hidden" htmlFor="start-menu-search-input">
            Search applications
          </label>
          <input
            ref={searchInputRef}
            id="start-menu-search-input"
            type="search"
            value={searchQuery}
            placeholder="Search apps..."
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <section className="start-menu-section" aria-labelledby="start-menu-apps-title">
          <h3 id="start-menu-apps-title">Applications</h3>
          {filteredApplications.length > 0 ? (
            <div className="start-menu-app-grid">
              {filteredApplications.map((app) => (
                <button
                  key={app.id}
                  className="start-menu-app-button"
                  type="button"
                  onClick={() => onLaunchApp(app.id)}
                >
                  <AppIconGlyph icon={app.icon} />
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="start-menu-empty">No applications found</p>
          )}
        </section>

        {recentApps.length > 0 && (
          <section className="start-menu-section" aria-labelledby="start-menu-recents-title">
            <h3 id="start-menu-recents-title">Recently opened</h3>
            <div className="start-menu-recent-list">
              {recentApps.map((app) => (
                <button
                  key={app.id}
                  className="start-menu-recent-button"
                  type="button"
                  onClick={() => onLaunchApp(app.id)}
                >
                  <AppIconGlyph icon={app.icon} />
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="start-menu-power" aria-label="Power controls">
          <h3>Power</h3>
          <div>
            <button type="button" onClick={() => handlePowerAction(onSleep)}>
              Sleep
            </button>
            <button type="button" onClick={() => handlePowerAction(onRestart)}>
              Restart
            </button>
            <button type="button" onClick={() => handlePowerAction(onShutdown)}>
              Shut Down
            </button>
          </div>
        </section>
      </section>
    </>
  )
}

export default StartMenu
