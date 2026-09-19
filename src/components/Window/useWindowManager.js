import { useCallback, useEffect, useReducer } from 'react'
import { applications } from '../../data/applications'
import { MOBILE_MEDIA_QUERY } from '../../hooks/useMediaQuery'
import { getUsableDesktopBounds } from '../../utils/windowBounds'
import { initialWindowState, WINDOW_ACTION, windowReducer } from './windowReducer'

const applicationById = new Map(applications.map((app) => [app.id, app]))

function useWindowManager(desktopRef) {
  const [state, dispatch] = useReducer(windowReducer, initialWindowState)

  const getDesktopBounds = useCallback(
    () => getUsableDesktopBounds(desktopRef.current),
    [desktopRef],
  )

  const openWindow = useCallback(
    (appId) => {
      const app = applicationById.get(appId)

      if (!app) {
        return
      }

      dispatch({
        type: WINDOW_ACTION.OPEN_WINDOW,
        app,
        desktopBounds: getDesktopBounds(),
      })
    },
    [getDesktopBounds],
  )

  const closeWindow = useCallback((appId, returnToDesktop = false) => {
    dispatch({
      type: WINDOW_ACTION.CLOSE_WINDOW,
      appId,
      returnToDesktop,
    })
  }, [])

  const focusWindow = useCallback((appId) => {
    dispatch({
      type: WINDOW_ACTION.FOCUS_WINDOW,
      appId,
    })
  }, [])

  const minimizeWindow = useCallback((appId, returnToDesktop = false) => {
    dispatch({
      type: WINDOW_ACTION.MINIMIZE_WINDOW,
      appId,
      returnToDesktop,
    })
  }, [])

  const restoreMinimizedWindow = useCallback((appId) => {
    dispatch({
      type: WINDOW_ACTION.RESTORE_MINIMIZED_WINDOW,
      appId,
    })
  }, [])

  const maximizeWindow = useCallback(
    (appId) => {
      dispatch({
        type: WINDOW_ACTION.MAXIMIZE_WINDOW,
        appId,
        desktopBounds: getDesktopBounds(),
      })
    },
    [getDesktopBounds],
  )

  const restoreWindow = useCallback(
    (appId) => {
      dispatch({
        type: WINDOW_ACTION.RESTORE_WINDOW,
        appId,
        desktopBounds: getDesktopBounds(),
      })
    },
    [getDesktopBounds],
  )

  const moveWindow = useCallback(
    (appId, position) => {
      dispatch({
        type: WINDOW_ACTION.MOVE_WINDOW,
        appId,
        position,
        desktopBounds: getDesktopBounds(),
      })
    },
    [getDesktopBounds],
  )

  useEffect(() => {
    let animationFrameId = null

    function handleResize() {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null

        if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
          return
        }

        dispatch({
          type: WINDOW_ACTION.CLAMP_WINDOWS,
          desktopBounds: getDesktopBounds(),
        })
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [getDesktopBounds])

  return {
    windows: state.windows,
    activeWindowId: state.activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    restoreMinimizedWindow,
    moveWindow,
  }
}

export default useWindowManager
