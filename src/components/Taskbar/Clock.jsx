import { useMemo } from 'react'
import { useClock } from '../../hooks/useClock'

function Clock() {
  const now = useClock()

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [],
  )

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        day: '2-digit',
        month: 'short',
      }),
    [],
  )

  return (
    <time className="taskbar-clock" dateTime={now.toISOString()} aria-label="Current local time">
      <span>{timeFormatter.format(now)}</span>
      <span>{dateFormatter.format(now)}</span>
    </time>
  )
}

export default Clock
