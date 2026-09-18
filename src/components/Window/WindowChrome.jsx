import WindowControls from './WindowControls'

function WindowChrome({
  app,
  titleId,
  isActive,
  isMaximized,
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
    <header className="window-chrome" data-active={isActive ? 'true' : 'false'}>
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
