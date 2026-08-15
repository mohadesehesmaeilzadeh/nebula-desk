import { useMemo } from 'react'
import { useClock } from '../../hooks/useClock'

function LockScreen({ onUnlock }) {
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
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    [],
  )

  return (
    <main className="system-screen lock-screen" aria-labelledby="lock-title">
      <section className="lock-content">
        <p className="lock-date">{dateFormatter.format(now)}</p>
        <h1 id="lock-title" className="lock-time">
          {timeFormatter.format(now)}
        </h1>
        <p className="system-copy">Welcome back to NebulaDesk.</p>
        <button className="system-button" type="button" onClick={onUnlock}>
          Enter Desktop
        </button>
        <p className="system-hint">Press Enter or click to continue</p>
      </section>
    </main>
  )
}

export default LockScreen
