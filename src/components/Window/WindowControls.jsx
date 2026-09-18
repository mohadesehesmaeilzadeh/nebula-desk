function WindowControls({
  appName,
  isMobile,
  isMaximized,
  onMinimize,
  onMaximize,
  onRestore,
  onClose,
}) {
  function stopPointerDown(event) {
    event.stopPropagation()
  }

  return (
    <div className="window-controls" aria-label={`${appName} window controls`}>
      {!isMobile && (
        <>
          <button
            className="window-control"
            type="button"
            data-control="minimize"
            aria-label={`Minimize ${appName}`}
            title={`Minimize ${appName}`}
            onPointerDown={stopPointerDown}
            onClick={onMinimize}
          >
            <span aria-hidden="true" />
          </button>
          <button
            className="window-control"
            type="button"
            data-control={isMaximized ? 'restore' : 'maximize'}
            aria-label={isMaximized ? `Restore ${appName}` : `Maximize ${appName}`}
            title={isMaximized ? `Restore ${appName}` : `Maximize ${appName}`}
            onPointerDown={stopPointerDown}
            onClick={isMaximized ? onRestore : onMaximize}
          >
            <span aria-hidden="true" />
          </button>
        </>
      )}
      <button
        className="window-control window-control-close"
        type="button"
        data-control="close"
        aria-label={`Close ${appName}`}
        title={`Close ${appName}`}
        onPointerDown={stopPointerDown}
        onClick={onClose}
      >
        <span aria-hidden="true" />
      </button>
    </div>
  )
}

export default WindowControls
