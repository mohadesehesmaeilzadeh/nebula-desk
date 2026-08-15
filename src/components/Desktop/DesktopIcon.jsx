function AppIconGlyph({ icon }) {
  const iconClassName = `desktop-icon-glyph desktop-icon-glyph-${icon}`

  return (
    <span className={iconClassName} aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {icon === 'about' && (
          <>
            <circle cx="24" cy="18" r="7" />
            <path d="M12 39c1.9-8 6.4-12 12-12s10.1 4 12 12" />
          </>
        )}
        {icon === 'projects' && (
          <>
            <path d="M8 17h13l4 5h15v18H8z" />
            <path d="M8 17v-6h13l4 5h15v6" />
          </>
        )}
        {icon === 'skills' && (
          <>
            <path d="M24 7l14 8v18l-14 8-14-8V15z" />
            <path d="M17 25l5 5 10-12" />
          </>
        )}
        {icon === 'terminal' && (
          <>
            <rect x="8" y="10" width="32" height="28" rx="5" />
            <path d="M15 20l6 5-6 5" />
            <path d="M24 31h10" />
          </>
        )}
        {icon === 'settings' && (
          <>
            <circle cx="24" cy="24" r="6" />
            <path d="M24 7v7M24 34v7M7 24h7M34 24h7M12 12l5 5M31 31l5 5M36 12l-5 5M17 31l-5 5" />
          </>
        )}
      </svg>
    </span>
  )
}

function DesktopIcon({ app, selected, onSelect, onOpen }) {
  function handleClick(event) {
    event.stopPropagation()
    onSelect(app.id)
  }

  function handleDoubleClick(event) {
    event.stopPropagation()
    onOpen(app.id)
  }

  return (
    <button
      className="desktop-icon"
      type="button"
      aria-label={`${app.name} application`}
      aria-pressed={selected}
      data-selected={selected ? 'true' : 'false'}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <AppIconGlyph icon={app.icon} />
      <span className="desktop-icon-label">{app.name}</span>
    </button>
  )
}

export default DesktopIcon
