import { useEffect, useRef, useState } from 'react'
import WindowChrome from './WindowChrome'

function Window({
  app,
  windowState,
  isActive,
  isMobile,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  onMove,
  children,
}) {
  const windowRef = useRef(null)
  const dragRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const titleId = `window-title-${app.id}`

  useEffect(() => {
    if (isActive) {
      windowRef.current?.focus({ preventScroll: true })
    }
  }, [isActive])

  function handleWindowPointerDown(event) {
    event.stopPropagation()
    onFocus(app.id)
  }

  function handleDragPointerDown(event) {
    if (event.button !== 0 || isMobile || windowState.isMaximized) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    onFocus(app.id)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialPosition: windowState.position,
    }
    setIsDragging(true)
  }

  function handleDragPointerMove(event) {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) {
      return
    }

    const nextPosition = {
      x: dragRef.current.initialPosition.x + event.clientX - dragRef.current.startX,
      y: dragRef.current.initialPosition.y + event.clientY - dragRef.current.startY,
    }

    onMove(app.id, nextPosition)
  }

  function handleDragPointerUp(event) {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) {
      return
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    dragRef.current = null
    setIsDragging(false)
  }

  function handleTitleDoubleClick() {
    if (isMobile) {
      return
    }

    if (windowState.isMaximized) {
      onRestore(app.id)
    } else {
      onMaximize(app.id)
    }
  }

  const windowStyle = isMobile
    ? undefined
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      }

  return (
    <article
      ref={windowRef}
      className={[
        'window',
        isActive ? 'window-active' : '',
        windowState.isMaximized ? 'window-maximized' : '',
        isDragging ? 'window-dragging' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={windowStyle}
      tabIndex="-1"
      aria-labelledby={titleId}
      data-active={isActive ? 'true' : 'false'}
      data-mobile={isMobile ? 'true' : 'false'}
      onPointerDown={handleWindowPointerDown}
      onClick={(event) => event.stopPropagation()}
    >
      <WindowChrome
        app={app}
        titleId={titleId}
        isActive={isActive}
        isMaximized={windowState.isMaximized}
        onMinimize={() => onMinimize(app.id)}
        onMaximize={() => onMaximize(app.id)}
        onRestore={() => onRestore(app.id)}
        onClose={() => onClose(app.id)}
        onDragPointerDown={handleDragPointerDown}
        onDragPointerMove={handleDragPointerMove}
        onDragPointerUp={handleDragPointerUp}
        onTitleDoubleClick={handleTitleDoubleClick}
      />
      <section className="window-content" aria-labelledby={titleId}>
        {children}
      </section>
    </article>
  )
}

export default Window
