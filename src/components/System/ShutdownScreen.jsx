import { useEffect } from 'react'

function ShutdownScreen({ onShutdownComplete }) {
  useEffect(() => {
    const shutdownTimer = window.setTimeout(onShutdownComplete, 900)

    return () => window.clearTimeout(shutdownTimer)
  }, [onShutdownComplete])

  return (
    <main className="system-screen shutdown-screen" aria-labelledby="shutdown-title">
      <section className="system-panel compact-panel">
        <p className="system-eyebrow">Power sequence</p>
        <h1 id="shutdown-title">Shutting down...</h1>
        <p className="system-copy">NebulaDesk is closing the current session.</p>
      </section>
    </main>
  )
}

export default ShutdownScreen
