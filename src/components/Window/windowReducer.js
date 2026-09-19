import {
  clampWindowBounds,
  clampWindowPosition,
  getDefaultWindowBounds,
} from '../../utils/windowBounds'

export const WINDOW_ACTION = {
  OPEN_WINDOW: 'OPEN_WINDOW',
  CLOSE_WINDOW: 'CLOSE_WINDOW',
  FOCUS_WINDOW: 'FOCUS_WINDOW',
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW',
  RESTORE_MINIMIZED_WINDOW: 'RESTORE_MINIMIZED_WINDOW',
  MAXIMIZE_WINDOW: 'MAXIMIZE_WINDOW',
  RESTORE_WINDOW: 'RESTORE_WINDOW',
  MOVE_WINDOW: 'MOVE_WINDOW',
  CLAMP_WINDOWS: 'CLAMP_WINDOWS',
}

export const initialWindowState = {
  windows: {},
  activeWindowId: null,
  topZIndex: 20,
  openedCount: 0,
}

function getNextVisibleWindowId(windows, ignoredWindowId) {
  return (
    Object.values(windows)
      .filter(
        (windowState) =>
          windowState.appId !== ignoredWindowId &&
          windowState.isOpen &&
          !windowState.isMinimized,
      )
      .sort((a, b) => b.zIndex - a.zIndex)[0]?.appId || null
  )
}

function focusWindow(state, appId) {
  const windowState = state.windows[appId]

  if (!windowState || !windowState.isOpen) {
    return state
  }

  const nextZIndex = state.topZIndex + 1

  return {
    ...state,
    activeWindowId: appId,
    topZIndex: nextZIndex,
    windows: {
      ...state.windows,
      [appId]: {
        ...windowState,
        zIndex: nextZIndex,
      },
    },
  }
}

export function windowReducer(state, action) {
  switch (action.type) {
    case WINDOW_ACTION.OPEN_WINDOW: {
      const existingWindow = state.windows[action.app.id]
      const nextZIndex = state.topZIndex + 1

      if (existingWindow?.isOpen) {
        return {
          ...state,
          activeWindowId: action.app.id,
          topZIndex: nextZIndex,
          windows: {
            ...state.windows,
            [action.app.id]: {
              ...existingWindow,
              isMinimized: false,
              zIndex: nextZIndex,
            },
          },
        }
      }

      const bounds = getDefaultWindowBounds(action.app, action.desktopBounds, state.openedCount)

      return {
        ...state,
        activeWindowId: action.app.id,
        topZIndex: nextZIndex,
        openedCount: state.openedCount + 1,
        windows: {
          ...state.windows,
          [action.app.id]: {
            appId: action.app.id,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: nextZIndex,
            position: bounds.position,
            size: bounds.size,
            restoreBounds: null,
          },
        },
      }
    }

    case WINDOW_ACTION.CLOSE_WINDOW: {
      if (!state.windows[action.appId]) {
        return state
      }

      const nextWindows = { ...state.windows }
      delete nextWindows[action.appId]

      return {
        ...state,
        windows: nextWindows,
        activeWindowId:
          state.activeWindowId === action.appId
            ? action.returnToDesktop
              ? null
              : getNextVisibleWindowId(nextWindows, action.appId)
            : state.activeWindowId,
      }
    }

    case WINDOW_ACTION.FOCUS_WINDOW:
      return focusWindow(state, action.appId)

    case WINDOW_ACTION.MINIMIZE_WINDOW: {
      const windowState = state.windows[action.appId]

      if (!windowState) {
        return state
      }

      const nextWindows = {
        ...state.windows,
        [action.appId]: {
          ...windowState,
          isMinimized: true,
        },
      }

      return {
        ...state,
        windows: nextWindows,
        activeWindowId:
          state.activeWindowId === action.appId
            ? action.returnToDesktop
              ? null
              : getNextVisibleWindowId(nextWindows, action.appId)
            : state.activeWindowId,
      }
    }

    case WINDOW_ACTION.RESTORE_MINIMIZED_WINDOW: {
      const windowState = state.windows[action.appId]

      if (!windowState) {
        return state
      }

      const nextZIndex = state.topZIndex + 1

      return {
        ...state,
        activeWindowId: action.appId,
        topZIndex: nextZIndex,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...windowState,
            isMinimized: false,
            zIndex: nextZIndex,
          },
        },
      }
    }

    case WINDOW_ACTION.MAXIMIZE_WINDOW: {
      const windowState = state.windows[action.appId]

      if (!windowState || windowState.isMaximized) {
        return focusWindow(state, action.appId)
      }

      const nextZIndex = state.topZIndex + 1

      return {
        ...state,
        activeWindowId: action.appId,
        topZIndex: nextZIndex,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...windowState,
            isMaximized: true,
            isMinimized: false,
            zIndex: nextZIndex,
            position: {
              x: 0,
              y: 0,
            },
            size: {
              width: action.desktopBounds.width,
              height: action.desktopBounds.height,
            },
            restoreBounds: {
              position: windowState.position,
              size: windowState.size,
            },
          },
        },
      }
    }

    case WINDOW_ACTION.RESTORE_WINDOW: {
      const windowState = state.windows[action.appId]

      if (!windowState) {
        return state
      }

      const restoredBounds = windowState.restoreBounds
        ? clampWindowBounds(windowState.restoreBounds, action.desktopBounds)
        : clampWindowBounds(windowState, action.desktopBounds)
      const nextZIndex = state.topZIndex + 1

      return {
        ...state,
        activeWindowId: action.appId,
        topZIndex: nextZIndex,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...windowState,
            isMaximized: false,
            isMinimized: false,
            zIndex: nextZIndex,
            position: restoredBounds.position,
            size: restoredBounds.size,
            restoreBounds: null,
          },
        },
      }
    }

    case WINDOW_ACTION.MOVE_WINDOW: {
      const windowState = state.windows[action.appId]

      if (!windowState || windowState.isMaximized) {
        return state
      }

      return {
        ...state,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...windowState,
            position: clampWindowPosition(
              action.position,
              windowState.size,
              action.desktopBounds,
            ),
          },
        },
      }
    }

    case WINDOW_ACTION.CLAMP_WINDOWS: {
      const nextWindows = Object.fromEntries(
        Object.entries(state.windows).map(([appId, windowState]) => {
          if (windowState.isMaximized) {
            return [
              appId,
              {
                ...windowState,
                position: {
                  x: 0,
                  y: 0,
                },
                size: {
                  width: action.desktopBounds.width,
                  height: action.desktopBounds.height,
                },
              },
            ]
          }

          const nextBounds = clampWindowBounds(windowState, action.desktopBounds)

          return [
            appId,
            {
              ...windowState,
              position: nextBounds.position,
              size: nextBounds.size,
            },
          ]
        }),
      )

      return {
        ...state,
        windows: nextWindows,
      }
    }

    default:
      return state
  }
}
