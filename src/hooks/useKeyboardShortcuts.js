import { useEffect } from 'react'

const APPLICATION_SHORTCUTS = Object.freeze({
  Digit1: 'about',
  Digit2: 'projects',
  Digit3: 'terminal',
  Digit4: 'settings',
})

function isEditableTarget(target) {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"])',
    ),
  )
}

function useKeyboardShortcuts({
  isStartMenuOpen,
  onCloseStartMenu,
  onOpenApplication,
  onToggleStartMenu,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.defaultPrevented || event.isComposing || event.repeat) {
        return
      }

      if (event.key === 'Escape') {
        if (isStartMenuOpen) {
          event.preventDefault()
          onCloseStartMenu()
        }

        return
      }

      const targetIsEditable = isEditableTarget(event.target)
      const isStartMenuShortcut =
        event.code === 'Space' &&
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        !event.shiftKey

      if (isStartMenuShortcut) {
        const isEditingStartMenuSearch = Boolean(
          event.target instanceof Element &&
            event.target.closest('[data-start-menu-root="true"]'),
        )

        if (targetIsEditable && !isEditingStartMenuSearch) {
          return
        }

        event.preventDefault()
        onToggleStartMenu()
        return
      }

      if (
        targetIsEditable ||
        !event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return
      }

      const appId = APPLICATION_SHORTCUTS[event.code]

      if (appId) {
        event.preventDefault()
        onOpenApplication(appId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isStartMenuOpen,
    onCloseStartMenu,
    onOpenApplication,
    onToggleStartMenu,
  ])
}

export default useKeyboardShortcuts
