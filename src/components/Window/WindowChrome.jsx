import WindowControls from './WindowControls'

function WindowChrome({
  app,
  titleId,
  isActive,
  isMobile,
  isMaximized,
  onBack,
  onMinimize,
  onMaximize,
  onRestore,
  onClose,
  onDragPointerDown,
  onDragPointerMove,
  onDragPointerUp,
  onTitleDoubleClick,
}) {
  return (
    <header
      className="window-chrome"
      data-active={isActive ? 'true' : 'false'}
      data-mobile={isMobile ? 'true' : 'false'}
    >
      {isMobile && (
        <button
          className="window-control window-mobile-back"
          type="button"
          data-control="back"
          aria-label={`Back to desktop from ${app.name}`}
          title="Back to desktop"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onBack}
        >
          <span aria-hidden="true" />
        </button>
      )}
      <div
        className="window-drag-region"
        onDoubleClick={onTitleDoubleClick}
        onPointerDown={onDragPointerDown}
        onPointerMove={onDragPointerMove}
        onPointerUp={onDragPointerUp}
        onPointerCancel={onDragPointerUp}
      >
        <span className={`window-app-mark window-app-mark-${app.icon}`} aria-hidden="true" />
        <span id={titleId} className="window-title">
          {app.name}
        </span>
      </div>
      <WindowControls
        appName={app.name}
        isMobile={isMobile}
        isMaximized={isMaximized}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onRestore={onRestore}
        onClose={onClose}
      />
    </header>
  )
}

export default WindowChrome
