const DEFAULT_TASKBAR_HEIGHT = 64
const WINDOW_MARGIN = 12
const MIN_WINDOW_WIDTH = 320
const MIN_WINDOW_HEIGHT = 240

function parsePixelValue(value, fallback) {
  const parsed = Number.parseFloat(value)

  return Number.isFinite(parsed) ? parsed : fallback
}

export function getTaskbarHeight() {
  const styles = window.getComputedStyle(document.documentElement)

  return parsePixelValue(styles.getPropertyValue('--taskbar-height'), DEFAULT_TASKBAR_HEIGHT)
}

export function getUsableDesktopBounds(desktopElement) {
  const rect = desktopElement?.getBoundingClientRect()
  const width = rect?.width || window.innerWidth
  const height = rect?.height || window.innerHeight

  return {
    x: 0,
    y: 0,
    width,
    height: Math.max(MIN_WINDOW_HEIGHT, height - getTaskbarHeight()),
  }
}

export function clampWindowSize(size, bounds) {
  return {
    width: Math.max(
      Math.min(size.width, Math.max(MIN_WINDOW_WIDTH, bounds.width - WINDOW_MARGIN * 2)),
      Math.min(MIN_WINDOW_WIDTH, bounds.width),
    ),
    height: Math.max(
      Math.min(size.height, Math.max(MIN_WINDOW_HEIGHT, bounds.height - WINDOW_MARGIN * 2)),
      Math.min(MIN_WINDOW_HEIGHT, bounds.height),
    ),
  }
}

export function clampWindowPosition(position, size, bounds) {
  const safeSize = clampWindowSize(size, bounds)
  const maxX = Math.max(WINDOW_MARGIN, bounds.width - safeSize.width - WINDOW_MARGIN)
  const maxY = Math.max(WINDOW_MARGIN, bounds.height - safeSize.height - WINDOW_MARGIN)

  return {
    x: Math.min(Math.max(position.x, WINDOW_MARGIN), maxX),
    y: Math.min(Math.max(position.y, WINDOW_MARGIN), maxY),
  }
}

export function clampWindowBounds(windowBounds, desktopBounds) {
  const size = clampWindowSize(windowBounds.size, desktopBounds)
  const position = clampWindowPosition(windowBounds.position, size, desktopBounds)

  return {
    position,
    size,
  }
}

export function getDefaultWindowBounds(app, desktopBounds, cascadeIndex) {
  const defaultSize = {
    width: app.window?.width || 680,
    height: app.window?.height || 480,
  }
  const size = clampWindowSize(defaultSize, desktopBounds)
  const offset = (cascadeIndex % 8) * 30
  const position = clampWindowPosition(
    {
      x: 128 + offset,
      y: 72 + offset,
    },
    size,
    desktopBounds,
  )

  return {
    position,
    size,
  }
}
